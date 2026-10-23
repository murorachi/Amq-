#!/usr/bin/env python3
"""Focused Candidate 130 Song Select interaction probe.
Uses Playwright page.set_content with a test-only in-memory Storage shim.
Does not test file:// or durable storage persistence.
"""
from pathlib import Path
import hashlib, json, re
from playwright.sync_api import sync_playwright

HTML = Path("/mnt/data/amq_learning_tool_v82_85_46_workspace_proto44-osu-songselect-ui_130.html")
OUT = Path("/mnt/data/amq_songselect_work/investigation_20261023")
SHIM = """<script>(()=>{const mk=()=>{const m=new Map();return{getItem:k=>m.get(String(k))??null,setItem:(k,v)=>m.set(String(k),String(v)),removeItem:k=>m.delete(String(k)),clear:()=>m.clear(),key:i=>[...m.keys()][i]??null,get length(){return m.size}}};Object.defineProperty(window,'localStorage',{configurable:true,value:mk()});Object.defineProperty(window,'sessionStorage',{configurable:true,value:mk()})})();</script>"""

def tx(value):
    nums = re.findall(r"-?\d+(?:\.\d+)?", value or "")
    return float(nums[4]) if len(nums) >= 5 else 0.0

raw = HTML.read_text(encoding="utf-8").replace("<head>", "<head>" + SHIM, 1)
report = {"candidate": HTML.name, "bytes": HTML.stat().st_size,
          "sha256": hashlib.sha256(HTML.read_bytes()).hexdigest(),
          "method": "Chromium + Playwright page.set_content + in-memory Storage shim",
          "tests": [], "limits": ["file:// BLOCKED_BY_ADMINISTRATOR", "localhost BLOCKED_BY_ADMINISTRATOR",
          "durable storage/reload NOT RUN"]}

def check(name, passed, detail):
    report["tests"].append({"name": name, "status": "PASS" if passed else "FAIL", "detail": detail})

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True, executable_path="/usr/bin/chromium",
                                args=["--no-sandbox", "--disable-web-security"])
    page = browser.new_page(viewport={"width": 1648, "height": 928}, device_scale_factor=1)
    errors = []
    page.on("pageerror", lambda e: errors.append(str(e)))
    page.on("console", lambda m: errors.append(m.text) if m.type == "error" else None)
    page.set_content(raw, wait_until="domcontentloaded", timeout=30000)
    page.wait_for_timeout(700)
    check("document initialized", page.evaluate("document.readyState") == "complete",
          {"readyState": page.evaluate("document.readyState"), "title": page.title()})
    page.locator('[data-home-action="catalog"]').first.evaluate("(e)=>e.click()")
    page.wait_for_timeout(900)
    cards = page.locator("#amqSongSelectStage .p32-catalog .card")
    check("catalog data population", cards.count() == 180, {"count": cards.count()})
    card = cards.nth(1)
    card.hover(force=True)
    page.wait_for_timeout(100)
    hover = card.evaluate("e=>getComputedStyle(e).transform")
    check("catalog hover shift ~ -3px", abs(tx(hover) + 3) < .1, {"transform": hover, "translateX": tx(hover)})

    multi = None
    for i in range(min(cards.count(), 25)):
        cards.nth(i).evaluate("(e)=>e.click()")
        page.wait_for_timeout(80)
        inline = page.locator("#amqSongSelectStage .amq-inline-song-list").first
        count = inline.locator(".songrow").count() if inline.count() else 0
        if count >= 3:
            multi = {"index": i, "song_rows": count}
            break
        cards.nth(i).evaluate("(e)=>e.click()")
        page.wait_for_timeout(40)
    inline = page.locator("#amqSongSelectStage .amq-inline-song-list").first
    rows = inline.locator(".songrow") if inline.count() else page.locator(".songrow")
    check("work click opens multi-song list", bool(multi and rows.count() >= 3),
          {"inline_lists": page.locator("#amqSongSelectStage .amq-inline-song-list").count(),
           "song_rows": rows.count(), "work": multi})
    if rows.count() >= 2:
        first, second = rows.nth(0), rows.nth(1)
        first.click(force=True)
        page.wait_for_timeout(80)
        selected = page.locator("#amqSongSelectStage .songrow.proto26-song-selected")
        selected_transform = selected.first.evaluate("e=>getComputedStyle(e).transform") if selected.count() else ""
        check("click selects exactly one song", selected.count() == 1 and abs(tx(selected_transform) + 7) < .1,
              {"selected_count": selected.count(), "transform": selected_transform})
        second.hover(force=True)
        page.wait_for_timeout(120)
        hover_transform = second.evaluate("e=>getComputedStyle(e).transform")
        check("hovered song shifts -3px, less than selected -7px",
              abs(tx(hover_transform) + 3) < .1 and abs(tx(selected_transform) + 7) < .1,
              {"hover_transform": hover_transform, "selected_transform": selected_transform})
        old_text = selected.first.inner_text()[:60]
        second.focus()
        second.press("ArrowDown")
        page.wait_for_timeout(100)
        selected = page.locator("#amqSongSelectStage .songrow.proto26-song-selected")
        new_text = selected.first.inner_text()[:60] if selected.count() else ""
        check("ArrowDown advances song selection", selected.count() == 1 and new_text != old_text,
              {"selected_count": selected.count(), "before": old_text, "after": new_text})
    search = page.locator("#amqSongSelectStage #search").first
    if search.count():
        search.fill("Usagi")
        page.wait_for_timeout(300)
        result_count = page.locator("#amqSongSelectStage .p32-catalog .card").count()
        check("search filters catalog", 0 < result_count < 180, {"query": "Usagi", "results": result_count})
    else:
        report["tests"].append({"name": "search filters catalog", "status": "BLOCKED", "detail": "search input not found"})
    dom = page.evaluate("""()=>{const ids=[...document.querySelectorAll('[id]')].map(x=>x.id);
      return {stageCount:document.querySelectorAll('#amqSongSelectStage').length,
      duplicateIds:[...new Set(ids.filter((x,i)=>ids.indexOf(x)!==i))],
      document:[document.documentElement.scrollWidth,document.documentElement.scrollHeight],
      viewport:[innerWidth,innerHeight]}}""")
    check("DOM stable/no duplicate IDs/overflow", dom["stageCount"] == 1 and not dom["duplicateIds"]
          and dom["document"] == dom["viewport"], dom)
    check("no uncaught page/console errors", not errors, errors)
    page.screenshot(path=str(OUT / "candidate130_extended_interactions.png"))
    browser.close()

(OUT / "TEST_REPORT.json").write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding="utf-8")
print(json.dumps({t["name"]: t["status"] for t in report["tests"]}, ensure_ascii=False, indent=2))
