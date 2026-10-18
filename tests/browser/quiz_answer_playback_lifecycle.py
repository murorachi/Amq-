#!/usr/bin/env python3
"""Deterministic real-browser acceptance for quiz answer settlement and audio lifecycle.

Loads the unchanged standalone production HTML, blocks external network requests, and
uses an isolated storage shim plus an HTMLMediaElement stub. It verifies both the
successful-playback answer path and the fail-closed unplayed-question path.
"""
import argparse
import json
from pathlib import Path
from playwright.sync_api import sync_playwright

STORAGE_SHIM = r"""<script>(() => {
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
  Object.defineProperty(window, 'indexedDB', {configurable:true, value:{open(){throw new Error('IndexedDB disabled for isolated quiz lifecycle test')}}});
})();</script>"""

MEDIA_SHIM = r"""<script>(() => {
  const probe = {mode: __QUIZ_MEDIA_MODE__, playCalls: 0, pauseCalls: 0};
  window.__quizMediaProbe = probe;
  // Prevent the real media loader from racing this deterministic playback stub.
  Object.defineProperty(HTMLMediaElement.prototype, 'src', {
    configurable:true,
    get(){return this.__quizTestSrc || '';},
    set(value){this.__quizTestSrc = String(value || '');}
  });
  const nativeSetAttribute = Element.prototype.setAttribute;
  Element.prototype.setAttribute = function(name, value) {
    if (this instanceof HTMLMediaElement && String(name).toLowerCase() === 'src') { this.src = value; return; }
    return nativeSetAttribute.call(this, name, value);
  };
  const nativeRemoveAttribute = Element.prototype.removeAttribute;
  Element.prototype.removeAttribute = function(name) {
    if (this instanceof HTMLMediaElement && String(name).toLowerCase() === 'src') { this.src = ''; return; }
    return nativeRemoveAttribute.call(this, name);
  };
  HTMLMediaElement.prototype.load = function() {};
  HTMLMediaElement.prototype.play = function() {
    probe.playCalls++;
    if (probe.mode === 'playing') {
      try { Object.defineProperty(this, 'paused', {configurable:true, value:false}); } catch (_) {}
      queueMicrotask(() => this.dispatchEvent(new Event('playing')));
    }
    return Promise.resolve();
  };
  HTMLMediaElement.prototype.pause = function() {
    probe.pauseCalls++;
    try { Object.defineProperty(this, 'paused', {configurable:true, value:true}); } catch (_) {}
    this.dispatchEvent(new Event('pause'));
  };
})();</script>"""


def check(condition, message):
    if not condition:
        raise AssertionError(message)
    print("PASS " + message, flush=True)


def make_html(path, mode):
    html = path.read_text(encoding="utf-8")
    marker = html.lower().find("<head>")
    if marker < 0:
        raise AssertionError("HTML head element not found")
    insert_at = marker + len("<head>")
    media = MEDIA_SHIM.replace("__QUIZ_MEDIA_MODE__", json.dumps(mode))
    return html[:insert_at] + STORAGE_SHIM + media + html[insert_at:]


def open_page(browser, html, errors, target="title"):
    page = browser.new_page()
    page.on("pageerror", lambda exc: errors.append(str(exc)))
    page.route("https://**/*", lambda route: route.abort())
    page.route("http://**/*", lambda route: route.abort())
    page.set_content(html, wait_until="domcontentloaded", timeout=60000)
    page.wait_for_timeout(700)
    check(page.title() == "AMQ學習工具", "standalone production application initializes")
    page.evaluate("""() => {
      window.__quizLifecycleEvents = {submitted:[], answered:[], unplayed:[]};
      document.addEventListener('ani-quiz-answer-submitted', e => window.__quizLifecycleEvents.submitted.push(e.detail || {}));
      document.addEventListener('quiz-v35-answered', e => window.__quizLifecycleEvents.answered.push(e.detail || {}));
      document.addEventListener('ani-quiz-unplayed', e => window.__quizLifecycleEvents.unplayed.push(e.detail || {}));
    }""")
    page.evaluate("window.__aniNavigateApp?.('quiz'); window.__aniEnterQuizV82?.()")
    page.wait_for_function("!document.getElementById('quizView')?.classList.contains('hidden')", timeout=5000)
    page.locator("#quizTarget").select_option(target, timeout=10000)
    return page


def start_question(page, require_playback):
    page.locator("#quizStart").click(timeout=10000)
    page.wait_for_function("window.__aniQuizStateV45?.quizSong", timeout=15000)
    song = page.evaluate("""() => {
      const s = window.__aniQuizStateV45?.quizSong;
      return s ? {id:String(s[1]), title:String(s[4] || '').trim()} : null;
    }""")
    if not song or not song["id"] or not song["title"]:
        raise AssertionError("quiz did not select a catalog song with a title")
    if require_playback:
        try:
            page.wait_for_function("window.__aniQuizStateV45?.quizAudioStarted === true", timeout=5000)
        except Exception:
            manual = page.locator("#quizManualPlayV8262")
            if manual.count():
                manual.evaluate("el => {el.hidden=false; el.disabled=false}")
                manual.click(timeout=5000)
            page.wait_for_function("window.__aniQuizStateV45?.quizAudioStarted === true", timeout=5000)
    return song


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--html", type=Path, default=Path(__file__).resolve().parents[2] / "dist" / "amq_learning_tool_v82_82.html")
    parser.add_argument("--chromium", default="/usr/bin/chromium")
    args = parser.parse_args()
    html_path = args.html.resolve()
    check(html_path.is_file(), "V82.82 standalone HTML exists")

    with sync_playwright() as pw:
        browser = pw.chromium.launch(headless=True, executable_path=args.chromium,
                                     args=["--no-sandbox", "--disable-dev-shm-usage"])
        errors = []
        try:
            # Successful playback: submitting a correct title records one answer and
            # history entry, while answer reveal does not pause the current audio.
            page = open_page(browser, make_html(html_path, "playing"), errors)
            song = start_question(page, True)
            check(page.evaluate("window.__aniQuizStateV45?.quizAudioStarted === true"),
                  "quiz timer/audio gate opens only after the media playing event")
            page.evaluate("window.__quizMediaProbe.pauseCalls = 0")
            page.locator("#quizAnswer").fill(song["title"])
            button_state = page.evaluate("""() => { const e=document.getElementById("quizManualSubmitV42"),r=e?.getBoundingClientRect(),s=e?getComputedStyle(e):null; return {exists:!!e,disabled:!!e?.disabled,hidden:!!e?.hidden,display:s?.display,visibility:s?.visibility,rect:r?{x:r.x,y:r.y,width:r.width,height:r.height}:null,viewClass:document.getElementById("quizView")?.className,bodyClass:document.body.className,parentClass:e?.parentElement?.className}; }""")
            print("DIAGNOSTIC quiz submit " + json.dumps(button_state), flush=True)
            check(button_state["exists"] and not button_state["disabled"], "quiz submit control is enabled after successful playback")
            page.locator("#quizManualSubmitV42").click(timeout=5000)
            page.wait_for_function("window.__aniQuizStateV45?.quizFinished === true", timeout=5000)
            events = page.evaluate("window.__quizLifecycleEvents")
            print("DIAGNOSTIC events " + json.dumps({"song":song,"events":events}), flush=True)
            check(len(events["submitted"]) == 1 and events["submitted"][0].get("answer") == song["title"],
                  "submit event preserves the exact submitted answer exactly once")
            check(len(events["answered"]) == 1 and events["answered"][0].get("correct") is True,
                  "correct title answer settles exactly once as correct")
            check(events["answered"][0].get("target") == "title" and events["answered"][0].get("validAudio") is True,
                  "settlement carries the title target and valid-audio contract")
            history = page.evaluate("window.__aniHistoryAPIv51?.getHistory?.() || []")
            row = next((x for x in reversed(history) if str(x.get("songId")) == song["id"]), None)
            check(bool(row) and row.get("correct") is True and row.get("target") == "title" and row.get("answer") == song["title"],
                  "successful answer is recorded in quiz history with matching song, target and answer")
            check(page.evaluate("window.__quizMediaProbe.pauseCalls === 0"),
                  "answer submission and reveal do not stop the current audio")
            page.locator("#quizExit").click(timeout=5000)
            page.wait_for_function("window.__aniQuizStateV45?.quizSong === null", timeout=5000)
            check(page.evaluate("window.__quizMediaProbe.pauseCalls > 0 && window.__aniQuizStateV45?.quizActive === false"),
                  "leaving quiz tears down playback and clears active round state")
            page.close()

            # Silent playback: a normal submit must not settle a wrong answer. A forced
            # empty submit follows the existing unplayed/skip path and must not write
            # answer history or familiarity state.
            page = open_page(browser, make_html(html_path, "silent"), errors)
            song = start_question(page, False)
            check(page.evaluate("window.__aniQuizStateV45?.quizAudioStarted === false"),
                  "resolved play promise without a playing event does not start quiz timing")
            check(page.locator("#quizAnswer").is_disabled(),
                  "answer input remains disabled until successful playback")
            before = page.evaluate("""() => ({
              history:(window.__aniHistoryAPIv51?.getHistory?.() || []).length,
              familiarity:localStorage.getItem('aniCollection_v2')
            })""")
            page.evaluate("(answer) => window.__aniQuizSubmitV47(false,{rawAnswer:answer})", song["title"])
            events = page.evaluate("window.__quizLifecycleEvents")
            check(not events["submitted"] and not events["answered"] and
                  page.evaluate("window.__aniQuizStateV45?.quizFinished === false"),
                  "answer submission without successful playback is rejected without settling")
            page.evaluate("window.__aniQuizSubmitV47(false,{force:true,rawAnswer:''})")
            page.wait_for_function("window.__aniQuizStateV45?.quizFinished === true", timeout=5000)
            events = page.evaluate("window.__quizLifecycleEvents")
            check(len(events["unplayed"]) == 1 and not events["answered"] and not events["submitted"],
                  "forced skip of unplayed audio emits only the unplayed event")
            after = page.evaluate("""() => ({
              history:(window.__aniHistoryAPIv51?.getHistory?.() || []).length,
              familiarity:localStorage.getItem('aniCollection_v2')
            })""")
            check(after == before, "unplayed skip does not add history or mutate familiarity storage")
            page.close()

            # Incorrect answer for a title target must settle as wrong without touching
            # anime familiarity, while still recording the answer in history.
            page = open_page(browser, make_html(html_path, "playing"), errors, target="title")
            song = start_question(page, True)
            wrong = "definitely-not-a-real-anime-song-title-v828510"
            before_status = page.evaluate("localStorage.getItem('aniCollection_v2')")
            page.locator("#quizAnswer").fill(wrong)
            page.locator("#quizManualSubmitV42").click(timeout=5000)
            page.wait_for_function("window.__aniQuizStateV45?.quizFinished === true", timeout=5000)
            events = page.evaluate("window.__quizLifecycleEvents")
            check(len(events["answered"]) == 1 and events["answered"][0].get("correct") is False,
                  "incorrect title answer settles as wrong")
            check(events["answered"][0].get("target") == "title" and events["answered"][0].get("familiarityUpdated") is False,
                  "title-target settlement does not claim an anime familiarity update")
            history = page.evaluate("window.__aniHistoryAPIv51?.getHistory?.() || []")
            row = next((x for x in reversed(history) if str(x.get("songId")) == song["id"]), None)
            check(bool(row) and row.get("correct") is False and row.get("target") == "title" and row.get("answer") == wrong,
                  "incorrect title answer is recorded with the submitted text")
            check(page.evaluate("localStorage.getItem('aniCollection_v2')") == before_status,
                  "incorrect title-target answer leaves anime familiarity unchanged")
            page.close()

            # Explicit skip after successful playback follows the ordinary answer
            # history/familiarity path, unlike the no-audio skip tested above.
            page = open_page(browser, make_html(html_path, "playing"), errors, target="anime")
            song = start_question(page, True)
            page.locator("#quizSkip").click(timeout=5000)
            page.wait_for_function("window.__aniQuizStateV45?.quizFinished === true", timeout=5000)
            events = page.evaluate("window.__quizLifecycleEvents")
            check(not events["submitted"] and len(events["answered"]) == 1 and events["answered"][0].get("correct") is False,
                  "explicit skip settles without inventing a submitted answer")
            check(events["answered"][0].get("target") == "anime" and events["answered"][0].get("familiarityUpdated") is True,
                  "anime-target skip records a familiarity update")
            familiarity = page.evaluate("(id) => JSON.parse(localStorage.getItem('aniCollection_v2')||'{}')[id]", song["id"])
            check(float(familiarity or 0) == 1, "anime-target skip sets familiarity to heard")
            history = page.evaluate("window.__aniHistoryAPIv51?.getHistory?.() || []")
            row = next((x for x in reversed(history) if str(x.get("songId")) == song["id"]), None)
            check(bool(row) and row.get("correct") is False and row.get("target") == "anime" and row.get("answer") == "",
                  "explicit skip is recorded in quiz history")
            page.close()

            # Use the real five-second clip timer rather than calling the timer bridge
            # directly, so the actual timer-to-submit wiring is covered.
            page = open_page(browser, make_html(html_path, "playing"), errors, target="title")
            page.evaluate("""() => {
              document.getElementById('qsClip').value='5';
              document.getElementById('qsCount').value='5';
              document.getElementById('qsAutoNext').checked=false;
            }""")
            song = start_question(page, True)
            page.wait_for_function("window.__aniQuizStateV45?.quizFinished === true", timeout=8000)
            events = page.evaluate("window.__quizLifecycleEvents")
            check(len(events["submitted"]) == 1 and events["submitted"][0].get("answer") == "" and
                  events["submitted"][0].get("forced") is False,
                  "clip timer submits an empty non-forced answer exactly once")
            check(len(events["answered"]) == 1 and events["answered"][0].get("correct") is False and
                  events["answered"][0].get("validAudio") is True,
                  "timer expiry settles the played question as wrong rather than unplayed")
            history = page.evaluate("window.__aniHistoryAPIv51?.getHistory?.() || []")
            row = next((x for x in reversed(history) if str(x.get("songId")) == song["id"]), None)
            check(bool(row) and row.get("correct") is False and row.get("target") == "title",
                  "timer-driven settlement records the question in history")
            page.close()

            # Auto-next must start a new question only after answer reveal and its
            # configured delay; no-repeat keeps the next song distinct.
            page = open_page(browser, make_html(html_path, "playing"), errors, target="title")
            page.evaluate("""() => {
              document.getElementById('qsClip').value='20';
              document.getElementById('qsCount').value='5';
              document.getElementById('qsAutoNext').checked=true;
              const delay=document.getElementById('qsAutoNextDelay');
              if(!delay)throw new Error('auto-next delay control missing');
              delay.value='1';
            }""")
            song = start_question(page, True)
            page.locator("#quizAnswer").fill(song["title"])
            page.locator("#quizManualSubmitV42").click(timeout=5000)
            page.wait_for_function("window.__aniQuizStateV45?.quizFinished === true", timeout=5000)
            page.wait_for_function("""id => {
              const s=window.__aniQuizStateV45;
              return s?.quizSong && String(s.quizSong[1])!==id && s.quizAudioStarted===true && s.quizFinished===false;
            }""", song["id"], timeout=10000)
            check(True, "auto-next starts a distinct playable question after the reveal delay")
            page.close()
            check(not errors, "no uncaught browser page errors during quiz lifecycle acceptance")
        finally:
            browser.close()


if __name__ == "__main__":
    main()
