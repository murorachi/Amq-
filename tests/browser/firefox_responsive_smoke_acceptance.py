#!/usr/bin/env python3
"""Focused Firefox responsive/UI smoke test for the locked V82.82 standalone product.

Uses an opaque-origin set_content harness with isolated in-memory storage and blocked
external network. This checks Firefox layout and navigation only; it is not native
storage, real-audio, production-domain, or pixel-perfect CSS acceptance.
"""
import argparse
from pathlib import Path
from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[2]
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
  Object.defineProperty(window, 'indexedDB', {configurable:true, value:{open(){throw new Error('IndexedDB disabled in isolated Firefox UI test')}}});
  window.__AMQ_FIREFOX_TEST_STORAGE__ = values;
})();</script>"""
VIEWPORTS = [
    ("mobile", 390, 844),
    ("tablet", 768, 1024),
    ("desktop", 1440, 1200),
]


def check(condition, message):
    if not condition:
        raise AssertionError(message)
    print("PASS " + message, flush=True)


def rect(page, selector):
    locator = page.locator(selector).first
    if locator.count() == 0:
        return None
    return locator.evaluate("""el => {
      const r = el.getBoundingClientRect(), s = getComputedStyle(el);
      return {x:+r.x.toFixed(2), y:+r.y.toFixed(2),
        width:+r.width.toFixed(2), height:+r.height.toFixed(2),
        display:s.display, visibility:s.visibility};
    }""")


def assert_no_horizontal_overflow(page, label):
    dims = page.evaluate("""() => ({
      viewport: innerWidth,
      document: document.documentElement.scrollWidth,
      body: document.body.scrollWidth
    })""")
    check(dims["document"] <= dims["viewport"] + 2 and dims["body"] <= dims["viewport"] + 2,
          f"{label} has no horizontal overflow ({dims['document']}/{dims['viewport']} document px)")
    return dims


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--html", type=Path, default=ROOT / "dist" / "amq_learning_tool_v82_82.html")
    args = parser.parse_args()
    html_path = args.html.resolve()
    check(html_path.is_file(), "V82.82 standalone HTML exists")
    html = html_path.read_text(encoding="utf-8")
    marker = html.lower().find("<head>")
    check(marker >= 0, "standalone HTML has a head element for isolated test shim")
    insert_at = marker + len("<head>")
    html = html[:insert_at] + SHIM + html[insert_at:]

    errors = []
    with sync_playwright() as pw:
        browser = pw.firefox.launch(headless=True)
        try:
            page = browser.new_page(viewport={"width": 1440, "height": 1200}, device_scale_factor=1)
            page.on("pageerror", lambda exc: errors.append(str(exc)))
            page.route("https://**/*", lambda route: route.abort())
            page.route("http://**/*", lambda route: route.abort())
            page.set_content(html, wait_until="domcontentloaded", timeout=60000)
            page.wait_for_timeout(900)
            check(page.title() == "AMQ學習工具", "production application initializes in Firefox")
            check(page.evaluate("typeof window.__aniNavigateApp === 'function'"),
                  "application navigation bridge initializes in Firefox")
            check(page.locator("#quizStart").count() == 1 and page.locator("#quizAnswer").count() == 1,
                  "quiz start and answer controls exist")
            assert_no_horizontal_overflow(page, "Firefox desktop home")

            page.evaluate("window.__aniNavigateApp?.('quiz')")
            page.wait_for_function("!document.getElementById('quizView')?.classList.contains('hidden')", timeout=5000)
            check(page.locator("#quizTarget").count() == 1 and page.locator("#quizSkip").count() == 1,
                  "quiz target and skip controls mount in Firefox")
            quiz_rect = rect(page, "#quizAnswer")
            check(bool(quiz_rect) and quiz_rect["width"] > 0 and quiz_rect["height"] > 0,
                  "quiz answer input has visible layout in Firefox desktop")
            assert_no_horizontal_overflow(page, "Firefox desktop quiz")

            for name, width, height in VIEWPORTS:
                page.set_viewport_size({"width": width, "height": height})
                page.wait_for_timeout(120)
                assert_no_horizontal_overflow(page, f"Firefox {name} quiz")
                answer_rect = rect(page, "#quizAnswer")
                check(bool(answer_rect) and answer_rect["width"] > 0,
                      f"Firefox {name} quiz answer input remains laid out")
            page.evaluate("window.__aniNavigateApp?.('home')")
            page.wait_for_timeout(120)
            check(page.evaluate("window.__aniGetActiveViewV82?.()") == "home",
                  "Firefox navigation returns from quiz to home")
            check(not errors, "no uncaught Firefox page errors during responsive/UI smoke")
        finally:
            browser.close()

    print("LIMITATION: opaque-origin UI harness with in-memory storage and blocked network.")
    print("NOT TESTED: native persistence, Firefox pixel-baseline comparison, real audio, production-domain policies, or multiplayer clients.")


if __name__ == "__main__":
    main()
