#!/usr/bin/env python3
"""Production-source integration tests for quiz suggestion DOM and input behavior.

Uses Chromium with in-memory storage and blocks network. Does not modify real user data.
"""
import argparse
import re
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
  Object.defineProperty(window, 'indexedDB', {configurable:true, value:{open(){throw new Error('IndexedDB disabled for isolated test')}}});
  window.__AMQ_TEST_STORAGE__ = values;
  window.__AMQ_TEST_SUGGESTIONS__ = ['A', 'Alpha', 'A Long Song', 'A☆Song', 'Another Song', 'Song A', 'A-B/C', 'ＡＢＣ Anime', '😀 A Song', ...Array.from({length:60}, (_, i) => `A Sample Song ${String(i).padStart(2, '0')}`)];
})();</script>"""


def check(page, condition, message):
    if not condition:
        raise AssertionError(message)
    print("PASS " + message, flush=True)


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--html", type=Path, default=Path(__file__).resolve().parents[2] / "dist" / "amq_learning_tool_v82_80.html")
    parser.add_argument("--chromium", default="/usr/bin/chromium")
    args = parser.parse_args()
    html_path = args.html.resolve()
    check(None, html_path.is_file(), "standalone HTML exists")
    html = html_path.read_text(encoding="utf-8")
    # Keep the production buildSuggestions/helpers/rendering code byte-for-byte, but
    # replace only targetOptions' large data scan with deterministic test fixtures.
    html, replaced = re.subn(
        r"function targetOptions\(\)\{[\s\S]*?return \[\.\.\.vals\]\}",
        "function targetOptions(){return window.__AMQ_TEST_SUGGESTIONS__||[]}", html, count=1)
    if replaced != 1:
        raise AssertionError("Could not isolate targetOptions data source in production HTML")
    head = html.lower().find("<head>")
    if head < 0:
        raise AssertionError("HTML head element not found")
    marker = head + len("<head>")
    html = html[:marker] + SHIM + html[marker:]

    with sync_playwright() as pw:
        browser = pw.chromium.launch(headless=True, executable_path=args.chromium,
                                     args=["--no-sandbox", "--disable-dev-shm-usage"])
        page = browser.new_page()
        page.route("https://**/*", lambda route: route.abort())
        page.route("http://**/*", lambda route: route.abort())
        try:
            page.set_content(html, wait_until="domcontentloaded", timeout=60000)
            page.wait_for_timeout(800)
            check(page, page.title() == "AMQ學習工具", "production application initializes")
            page.evaluate("window.__aniNavigateApp?.('quiz')")
            page.wait_for_timeout(100)
            check(page, page.locator("#quizAnswer").count() == 1 and page.locator("#quizSuggestions").count() == 1,
                  "quiz answer input and suggestion list mount")

            page.locator("#quizTarget").select_option("title", timeout=5000)
            answer = page.locator("#quizAnswer")
            answer.evaluate("el => { el.disabled = false; }")
            answer.fill("a", timeout=5000)
            page.wait_for_timeout(50)
            box = page.locator("#quizSuggestions")
            labels = box.locator(".quizSuggestion").all_text_contents()
            check(page, len(labels) == 25, "matching list is bounded to exactly 25 results for a broad query")
            check(page, "open" in (box.get_attribute("class") or "") and answer.get_attribute("aria-expanded") == "true",
                  "non-empty matching query opens list and updates aria-expanded")
            check(page, all(label.strip() for label in labels), "rendered suggestions have non-empty labels")

            sorted_ok = page.evaluate("""() => {
              const labels = [...document.querySelectorAll('#quizSuggestions .quizSuggestion')].map(x => x.textContent);
              const key = s => ({length: Array.from(s).length, raw: s.normalize('NFKC').toLocaleLowerCase(), label:s});
              const sorted = labels.map(key).sort((a,b) => a.length-b.length || (a.raw < b.raw ? -1 : a.raw > b.raw ? 1 : 0) || (a.label < b.label ? -1 : a.label > b.label ? 1 : 0)).map(x => x.label);
              return JSON.stringify(labels) === JSON.stringify(sorted);
            }""")
            check(page, sorted_ok, "top-25 results are deterministically ordered by production comparator contract")

            first_label = labels[0]
            before_count = len(labels)
            page.locator("#quizAnswer").evaluate("el => { el.dataset.imeComposing = '1'; el.value = 'zzzz'; el.dispatchEvent(new Event('input', {bubbles:true})); }")
            page.wait_for_timeout(30)
            ime_labels = page.locator("#quizSuggestions .quizSuggestion").all_text_contents()
            check(page, ime_labels == labels and len(ime_labels) == before_count,
                  "IME composition guard leaves existing list untouched while composing")
            page.locator("#quizAnswer").evaluate("el => { delete el.dataset.imeComposing; el.value = 'a'; el.dispatchEvent(new Event('input', {bubbles:true})); }")
            page.wait_for_timeout(30)
            check(page, page.locator("#quizSuggestions .quizSuggestion").count() == 25,
                  "input event rebuilds bounded results after composition guard clears")

            check(page, page.evaluate("typeof window.__aniSelectQuizSuggestionV8272 === 'function'"),
                  "shared suggestion selection contract is installed")
            # Instrument both input paths; the production listeners remain intact.
            page.evaluate("""() => {
              window.__suggestionContract = { inputEvents: 0, answeredEvents: 0, submitBridgeCalls: 0 };
              document.getElementById('quizAnswer').addEventListener('input', () => window.__suggestionContract.inputEvents++);
              document.addEventListener('quiz-v35-answered', () => window.__suggestionContract.answeredEvents++);
              const bridge = window.__aniQuizSubmitV47;
              if (typeof bridge === 'function') window.__aniQuizSubmitV47 = function(...args) {
                window.__suggestionContract.submitBridgeCalls++;
                return bridge.apply(this, args);
              };
            }""")

            # IME-composing input must not be overwritten by the shared selection contract.
            ime_before = answer.input_value()
            ime_result = page.evaluate("""() => {
              const input = document.getElementById('quizAnswer');
              input.dataset.imeComposing = '1';
              const result = window.__aniSelectQuizSuggestionV8272('MUST NOT REPLACE', 'keyboard');
              delete input.dataset.imeComposing;
              return result;
            }""")
            check(page, ime_result is False and answer.input_value() == ime_before,
                  "shared selection contract refuses to replace input during IME composition")
            check(page, page.evaluate("window.__suggestionContract.inputEvents") == 0,
                  "IME-guarded selection dispatches no input event")

            # Keyboard path: ArrowDown focuses a result; Enter selects it without submitting.
            answer.press("ArrowDown")
            focused = page.locator("#quizSuggestions .quizSuggestion.focus").count()
            check(page, focused == 1, "ArrowDown moves focus to one suggestion")
            keyboard_label = page.locator("#quizSuggestions .quizSuggestion.focus").inner_text()
            page.evaluate("window.__suggestionContract.inputEvents = 0")
            answer.press("Enter")
            check(page, answer.input_value() == keyboard_label, "Enter selects the focused suggestion")
            check(page, page.evaluate("window.__suggestionContract.inputEvents") == 1,
                  "keyboard selection dispatches exactly one bubbling input event")
            check(page, page.locator("#v36Answer").inner_text() == keyboard_label,
                  "keyboard selection updates answer mirror through input event")
            check(page, page.locator("#quizSuggestions .quizSuggestion").count() == 0 and
                  "open" not in (box.get_attribute("class") or "") and answer.get_attribute("aria-expanded") == "false",
                  "keyboard selection clears list and resets aria-expanded")
            check(page, page.evaluate("document.activeElement === document.getElementById('quizAnswer')"),
                  "keyboard selection preserves input focus")
            selection = answer.evaluate("el => [el.selectionStart, el.selectionEnd, el.value.length]")
            check(page, selection[0] == selection[2] and selection[1] == selection[2],
                  "keyboard selection caret moves to end of inserted label")
            keyboard_events = page.evaluate("window.__suggestionContract")
            check(page, keyboard_events["answeredEvents"] == 0 and keyboard_events["submitBridgeCalls"] == 0,
                  "keyboard selection does not submit or settle an answer")

            answer.fill("a")
            page.wait_for_timeout(30)
            chosen = page.locator("#quizSuggestions .quizSuggestion").first
            chosen_text = chosen.inner_text()
            page.evaluate("window.__suggestionContract.inputEvents = 0")
            pointerdown = chosen.evaluate("el => { const e = new PointerEvent('pointerdown', {bubbles:true, cancelable:true}); const prevented = !el.dispatchEvent(e); return prevented || e.defaultPrevented; }")
            check(page, pointerdown, "suggestion pointerdown prevents input blur before selection")
            chosen.click()
            check(page, answer.input_value() == chosen_text, "click handler copies selected suggestion into answer input")
            check(page, page.locator("#v36Answer").inner_text() == chosen_text,
                  "click selection updates answer mirror through input event")
            click_list_closed = page.locator("#quizSuggestions .quizSuggestion").count() == 0 and "open" not in (box.get_attribute("class") or "")
            check(page, click_list_closed, "click selection clears suggestion list")
            check(page, answer.get_attribute("aria-expanded") == "false",
                  "click selection resets aria-expanded after the legacy input handler rebuilds then clears the list")
            events = page.evaluate("window.__suggestionContract")
            check(page, events["inputEvents"] == 1,
                  "click selection dispatches exactly one bubbling input event")
            check(page, page.evaluate("document.activeElement === document.getElementById('quizAnswer')"),
                  "click selection restores focus to the answer input")
            selection = answer.evaluate("el => [el.selectionStart, el.selectionEnd, el.value.length]")
            check(page, selection[0] == selection[2] and selection[1] == selection[2],
                  "click selection caret moves to end of inserted label")
            check(page, events["answeredEvents"] == 0 and events["submitBridgeCalls"] == 0 and
                  "hidden" in (page.locator("#quizResult").get_attribute("class") or ""),
                  "click selection does not submit or settle an answer")

            answer.fill("   ")
            page.wait_for_timeout(30)
            check(page, page.locator("#quizSuggestions .quizSuggestion").count() == 0 and
                  "open" not in (box.get_attribute("class") or "") and answer.get_attribute("aria-expanded") == "false",
                  "empty normalized query clears list and closes suggestions")
        finally:
            browser.close()
    print("LIMITATION: Chromium about:blank with in-memory storage, IndexedDB disabled, external network blocked; targetOptions data enumeration is fixture-backed to isolate the production suggestion renderer/controller.")
    print("NOT TESTED: real-origin persistence, audio, Firefox, multiplayer, or full answer submission.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
