#!/usr/bin/env python3
"""Constrained Chromium UI smoke test for environments blocking file:// and localhost.

This loads the HTML through page.set_content with in-memory storage and no IndexedDB.
It checks UI wiring only; it is not standalone-origin, persistence, audio, or multiplayer acceptance.
"""
import argparse
from pathlib import Path
from playwright.sync_api import sync_playwright

SHIM = r"""<script>(() => {
  const values = new Map();
  const storage = {
    get length() { return values.size; },
    key: i => [...values.keys()][i] ?? null,
    getItem: k => values.has(String(k)) ? values.get(String(k)) : null,
    setItem: (k, v) => values.set(String(k), String(v)),
    removeItem: k => values.delete(String(k)),
    clear: () => values.clear()
  };
  Object.defineProperty(window, 'localStorage', {configurable:true, value:storage});
  Object.defineProperty(window, 'sessionStorage', {configurable:true, value:storage});
  Object.defineProperty(window, 'indexedDB', {configurable:true, value:{open(){throw new Error('IndexedDB intentionally unavailable in opaque-origin smoke test')}}});
  window.__AMQ_SMOKE_STORAGE__ = values;
})();</script>"""

def check(condition, message):
    if not condition:
        raise AssertionError(message)
    print("PASS " + message)

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--html", type=Path, default=Path(__file__).resolve().parents[2] / "dist" / "amq_learning_tool_v82_66.html")
    parser.add_argument("--chromium", default="/usr/bin/chromium")
    args = parser.parse_args()
    path = args.html.resolve()
    check(path.is_file(), "HTML file exists")
    html = path.read_text(encoding="utf-8")
    check("<head>" in html.lower(), "HTML has head element for test shim")
    at = html.lower().find("<head>") + len("<head>")
    html = html[:at] + SHIM + html[at:]
    with sync_playwright() as pw:
        browser = pw.chromium.launch(headless=True, executable_path=args.chromium, args=["--no-sandbox", "--disable-dev-shm-usage"])
        page = browser.new_page()
        errors = []
        page.on("pageerror", lambda e: errors.append(str(e)))
        page.route("https://**/*", lambda route: route.abort())
        page.route("http://**/*", lambda route: route.abort())
        try:
            page.set_content(html, wait_until="domcontentloaded", timeout=60000)
            page.wait_for_timeout(1000)
            check(page.title() == "AMQ學習工具", "app document initializes in Chromium")
            check(page.evaluate("window.__aniGetActiveViewV82?.()") == "home", "home is initial view")
            check(page.locator("#quizStart").count() == 1, "practice controls exist")
            check(page.evaluate("typeof window.__aniNavigateApp") == "function", "navigation bridge initializes")
            page.evaluate("window.__aniNavigateApp('practice')")
            page.wait_for_timeout(150)
            check(page.evaluate("window.__aniGetActiveViewV82?.()") == "practice", "practice navigation works")
            check(page.get_by_text("練習工作台", exact=False).count() > 0, "practice workbench mounts")
            page.evaluate("window.__aniNavigateApp('quiz')")
            page.wait_for_timeout(150)
            check(page.evaluate("window.__aniGetActiveViewV82?.()") == "quiz", "single-player quiz navigation works")
            page.locator("#quizStart").click()
            page.wait_for_timeout(300)
            first = page.evaluate("window.__aniQuizStateV45?.quizSong?.[1] ?? null")
            check(first is not None, "round start selects a question")
            check(page.locator("#quizAnswer").is_disabled(), "answer input stays disabled before playback")
            history_before = page.evaluate("window.__AMQ_SMOKE_STORAGE__.get('aniQuizHistory_v1') ?? null")
            page.locator("#quizSkip").click()
            page.wait_for_timeout(150)
            check("音訊未成功播放" in page.locator("#quizStatus").inner_text(), "skip before playback uses unplayed path")
            check(page.evaluate("window.__aniQuizStateV45?.quizFinished") is True, "unplayed question settles")
            history_after = page.evaluate("window.__AMQ_SMOKE_STORAGE__.get('aniQuizHistory_v1') ?? null")
            check(history_after == history_before, "unplayed skip does not add history")
            page.locator("#quizNext").click()
            page.wait_for_timeout(250)
            second = page.evaluate("window.__aniQuizStateV45?.quizSong?.[1] ?? null")
            check(second is not None and str(second) != str(first), "next question advances to another song ID")
            page.evaluate("window.__aniVnLibraryV8249?.openEmqLists?.()")
            page.wait_for_timeout(350)
            check(page.evaluate("window.__aniGetActiveViewV82?.()") == "watchlist", "solo EMQ handoff opens list view")
            check("EMQ 自訂清單" in page.locator("#emqListsModeTabV8254").inner_text(), "EMQ list mode is selected")
            check(page.evaluate("window.__aniEmqAPI?.ready === true && window.__aniEmqAPI?.getRows?.().length > 0"), "embedded EMQ API is ready")
            check(not errors, "no uncaught browser page errors")
        finally:
            browser.close()
    print("LIMITATION UI smoke only: opaque about:blank origin, in-memory storage, IndexedDB unavailable, network blocked.")
    print("NOT TESTED standalone file navigation, real persistence, IndexedDB round-trip, audio, Firefox, multiplayer.")
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
