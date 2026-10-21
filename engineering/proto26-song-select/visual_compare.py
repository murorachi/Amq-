#!/usr/bin/env python3
"""Capture a matched-viewport Song Select screenshot and produce objective diff evidence.

This script deliberately does not convert a pixel metric into a claimed similarity
percentage. The reference image is a pinned official osu!-wiki asset, not proof of
the exact Stable client build used to capture it.
"""
from __future__ import annotations

import hashlib
import json
import urllib.request
from pathlib import Path

from PIL import Image, ImageChops, ImageStat
from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / "engineering/proto26-song-select"
HTML = ROOT / "dist/amq_learning_tool_v82_85_30_workspace_proto26_song_select_40.html"
REFERENCE_URL = (
    "https://raw.githubusercontent.com/ppy/osu-wiki/"
    "ae2c6443a4264e5429ea7bcd2f3503be8a518a50/"
    "wiki/Client/Interface/img/song-selection.jpg"
)
EXPECTED_GIT_BLOB_SHA = "1e927a00a1984a5ba20fa5efec639410f349607a"


def git_blob_sha(data: bytes) -> str:
    return hashlib.sha1(b"blob " + str(len(data)).encode() + b"\0" + data).hexdigest()


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    request = urllib.request.Request(REFERENCE_URL, headers={"User-Agent": "AMQ-UI-Acceptance/1.0"})
    with urllib.request.urlopen(request, timeout=30) as response:
        reference_bytes = response.read()
    actual_blob_sha = git_blob_sha(reference_bytes)
    if actual_blob_sha != EXPECTED_GIT_BLOB_SHA:
        raise SystemExit(
            f"REFERENCE_IDENTITY_FAIL expected={EXPECTED_GIT_BLOB_SHA} actual={actual_blob_sha}"
        )
    reference_path = OUT / "osu-stable-song-selection-pinned.jpg"
    reference_path.write_bytes(reference_bytes)
    reference = Image.open(reference_path).convert("RGB")
    width, height = reference.size

    default_candidate_path = OUT / "proto26-song-select-default-viewport.png"
    candidate_path = OUT / "proto26-song-select-matched-viewport.png"
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page(viewport={"width": width, "height": height}, device_scale_factor=1)
        page_errors, console_errors = [], []
        page.on("pageerror", lambda error: page_errors.append(str(error)))
        page.on("console", lambda msg: console_errors.append(msg.text) if msg.type == "error" else None)
        page.goto(HTML.as_uri(), wait_until="domcontentloaded", timeout=60000)
        page.wait_for_timeout(500)
        page.evaluate("window.__aniNavigateApp?.('catalog')")
        page.wait_for_function(
            "() => window.__aniGetActiveViewV82?.() === 'catalog' && "
            "document.querySelector('#grid') && getComputedStyle(document.querySelector('#grid')).display !== 'none'",
            timeout=30000,
        )
        page.wait_for_function("""() => window.__amqProto26SongSelect?.getMode?.() === 'amq' &&
            document.querySelectorAll('#grid > .card').length > 0 &&
            document.querySelectorAll('#grid > .p26-work-card').length === 0""", timeout=30000)
        try:
            page.wait_for_function("""() => {
                const covers = [...document.querySelectorAll('#grid > .card .cover')].slice(0, 8);
                return covers.filter(cover => cover.classList.contains('has-real-cover')).length >= 3;
            }""", timeout=12000)
        except Exception:
            pass
        page.wait_for_timeout(200)
        cover_capture_state = page.evaluate("""() => {
            const covers = [...document.querySelectorAll('#grid > .card .cover')].slice(0, 8);
            const imgs = [...document.querySelectorAll('#grid > .card img')].filter(img => getComputedStyle(img).display !== 'none').slice(0, 8);
            return {
                coverCount: covers.length,
                realCoverCount: covers.filter(cover => cover.classList.contains('has-real-cover')).length,
                imageCount: imgs.length,
                loadedCount: imgs.filter(img => img.complete && img.naturalWidth > 0).length,
                images: imgs.map(img => ({
                    src: img.currentSrc || img.src,
                    complete: img.complete,
                    naturalWidth: img.naturalWidth,
                    naturalHeight: img.naturalHeight,
                    opacity: getComputedStyle(img).opacity,
                    filter: getComputedStyle(img).filter,
                    visibility: getComputedStyle(img).visibility,
                    display: getComputedStyle(img).display,
                    coverOpacity: getComputedStyle(img.closest('.cover') || img.parentElement).opacity
                }))
            };
        }""")
        page.screenshot(path=str(default_candidate_path), full_page=False)
        first_card = page.locator("#grid > .card").first
        if first_card.count() == 0:
            raise SystemExit("SELECTED_STATE_CAPTURE_FAIL no AMQ catalog cards")
        first_card.click()
        page.wait_for_function("() => document.querySelector('#overlay')?.classList.contains('open')", timeout=15000)
        page.wait_for_function("() => document.querySelectorAll('#songlist .songrow').length > 0", timeout=15000)
        page.locator("#songlist .songrow").first.click()
        page.wait_for_timeout(250)
        selected_state = page.evaluate("""() => ({
            workTitle: document.querySelector('#p32WorkTitle')?.textContent?.trim() || null,
            songTitle: document.querySelector('#p32SongTitle')?.textContent?.trim() || null,
            selectedSongRows: document.querySelectorAll('#songlist .songrow.proto26-song-selected').length,
            detailOpen: !!document.querySelector('#overlay.open')
        })""")
        if not selected_state["detailOpen"] or not selected_state["songTitle"] or selected_state["selectedSongRows"] != 1:
            raise SystemExit(f"SELECTED_STATE_CAPTURE_FAIL {json.dumps(selected_state, ensure_ascii=False)}")
        page.screenshot(path=str(candidate_path), full_page=False)
        active_view = page.evaluate("window.__aniGetActiveViewV82?.() ?? null")
        body_classes = page.locator("body").get_attribute("class") or ""
        default_state = page.evaluate("""() => ({
            homeHeroVisible: !!document.querySelector('section.hero.view-home') &&
                getComputedStyle(document.querySelector('section.hero.view-home')).display !== 'none',
            batchToolsVisible: !!document.querySelector('#quicktools') &&
                getComputedStyle(document.querySelector('#quicktools')).display !== 'none',
            workspaceSidebarVisible: !!document.querySelector('#amqWorkspaceSidebar') &&
                getComputedStyle(document.querySelector('#amqWorkspaceSidebar')).display !== 'none',
            selectedWorkspaceCount: document.querySelectorAll('#amqWorkspaceDock [data-ws][aria-pressed="true"]').length,
            activeWorkspaceMode: document.body.dataset.amqWorkspaceMode || null,
            viewportWidth: window.innerWidth,
            stageDisplay: document.querySelector('#amqSongSelectStage') ? getComputedStyle(document.querySelector('#amqSongSelectStage')).display : null,
            bodyPaddingLeft: getComputedStyle(document.body).paddingLeft,
            searchLeft: document.querySelector('#search')?.getBoundingClientRect().left ?? null,
            searchWidth: document.querySelector('#search')?.getBoundingClientRect().width ?? null,
            catalogLeft: document.querySelector('#grid')?.getBoundingClientRect().left ?? null,
            dockBottom: document.querySelector('#amqWorkspaceDock')?.getBoundingClientRect().bottom ?? null,
            sourceMode: window.__amqProto26SongSelect?.getMode?.() ?? null,
            amqCardCount: document.querySelectorAll('#grid > .card').length,
            emqWorkCardCount: document.querySelectorAll('#grid > .p26-work-card').length
        })""")
        browser.close()

    if (active_view != "catalog" or default_state["homeHeroVisible"] or
            default_state["batchToolsVisible"] or default_state["workspaceSidebarVisible"] or
            default_state["selectedWorkspaceCount"] != 0 or default_state["activeWorkspaceMode"] is not None or
            default_state["bodyPaddingLeft"] != "0px" or default_state["stageDisplay"] != "grid" or
            default_state["searchLeft"] is None or default_state["searchLeft"] < default_state["viewportWidth"] * 0.6 or
            default_state["searchLeft"] >= default_state["viewportWidth"] or default_state["searchWidth"] is None or
            default_state["searchWidth"] <= 250 or default_state["sourceMode"] != "amq" or default_state["amqCardCount"] == 0 or default_state["emqWorkCardCount"] != 0):
        raise SystemExit(f"DEFAULT_SONG_SELECT_STATE_FAIL {json.dumps(default_state, ensure_ascii=False)}")

    candidate = Image.open(candidate_path).convert("RGB")
    if candidate.size != reference.size:
        raise SystemExit(f"VIEWPORT_MISMATCH candidate={candidate.size} reference={reference.size}")
    overlay = Image.blend(reference, candidate, 0.5)
    diff = ImageChops.difference(reference, candidate)
    overlay.save(OUT / "proto26-song-select-overlay.png")
    diff.save(OUT / "proto26-song-select-pixel-diff.png")
    stat = ImageStat.Stat(diff)
    mae = sum(stat.mean) / (3 * 255)
    changed = sum(1 for pixel in diff.getdata() if max(pixel) >= 24)
    total = width * height
    report = {
        "status": "EVIDENCE_GENERATED",
        "reference_url": REFERENCE_URL,
        "reference_git_blob_sha": actual_blob_sha,
        "reference_dimensions": {"width": width, "height": height},
        "candidate_file": str(candidate_path.relative_to(ROOT)),
        "candidate_sha256": hashlib.sha256(HTML.read_bytes()).hexdigest(),
        "candidate_dimensions": {"width": candidate.width, "height": candidate.height},
        "active_app_view": active_view,
        "body_classes": body_classes,
        "default_state": default_state,
        "selected_state": selected_state,
        "cover_capture_state": cover_capture_state,
        "page_errors": page_errors,
        "console_errors": console_errors,
        "normalized_mean_absolute_pixel_difference": round(mae, 6),
        "pixels_with_max_channel_difference_at_least_24": changed,
        "pixel_count": total,
        "changed_pixel_ratio": round(changed / total, 6),
        "interpretation": (
            "Metrics are diagnostic only, not a visual similarity percentage. "
            "The reference is a pinned official osu!-wiki screenshot; its exact Stable capture build is unknown. "
            "Intentional AMQ content differences must be separated from layout defects during review."
        ),
    }
    (OUT / "visual-comparison-report.json").write_text(
        json.dumps(report, ensure_ascii=False, indent=2) + "\n", encoding="utf-8"
    )
    markdown = [
        "# Song Select visual comparison evidence",
        "",
        f"- Status: {report['status']}",
        f"- Reference: {REFERENCE_URL}",
        f"- Verified Git blob SHA: {actual_blob_sha}",
        f"- Matched viewport: {width} x {height} at device scale factor 1",
        f"- Candidate SHA-256: {report['candidate_sha256']}",
        f"- Normalized mean absolute pixel difference (diagnostic): {mae:.6f}",
        f"- Pixels with max-channel difference >= 24: {changed}/{total} ({changed / total:.2%})",
        f"- Active app view: {active_view}",
        f"- Catalog real covers before capture: {cover_capture_state['realCoverCount']}/{cover_capture_state['coverCount']}",
        f"- Loaded visible catalog images before capture: {cover_capture_state['loadedCount']}/{cover_capture_state['imageCount']}",
        f"- Page errors: {len(page_errors)}; console errors: {len(console_errors)}",
        "",
        "## Evidence files",
        "- osu-stable-song-selection-pinned.jpg",
        " - proto26-song-select-default-viewport.png",
        "- proto26-song-select-matched-viewport.png (selected-work and selected-song state)",
        "- proto26-song-select-overlay.png",
        "- proto26-song-select-pixel-diff.png",
        "- visual-comparison-report.json",
        "",
        "## Interpretation limits",
        "This report does not claim a similarity percentage or a visual pass. The reference is a pinned official osu!-wiki screenshot, but its exact osu!stable capture build is unknown. Review the overlay and pixel-difference image, separating required AMQ content changes from layout, scale, spacing, color, and hierarchy defects.",
    ]
    (OUT / "VISUAL_COMPARISON_REPORT.md").write_text("\n".join(markdown) + "\n", encoding="utf-8")
    print(f"PASS pinned official Wiki image identity {actual_blob_sha}")
    print(f"PASS candidate screenshot matches reference viewport {width}x{height}")
    print(f"DIAGNOSTIC normalized MAE={mae:.6f}; changed-pixel-ratio={changed / total:.6f}")
    print("VISUAL_ACCEPTANCE=NOT VERIFIED (evidence generated; human/design review and corrections remain required)")


if __name__ == "__main__":
    main()
