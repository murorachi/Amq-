#!/usr/bin/env python3
"""Localhost-origin acceptance for V82.72 browser storage and suggestion flow.

Uses a fresh isolated Chromium context and a temporary localhost origin. The app's
own localStorage and IndexedDB are not shimmed. External requests are blocked, and
all test data is namespaced/dedicated and removed at the end.
"""
import argparse
import threading
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import urlparse
from playwright.sync_api import sync_playwright


def check(condition, message):
    if not condition:
        raise AssertionError(message)
    print("PASS " + message, flush=True)


class QuietHandler(SimpleHTTPRequestHandler):
    def log_message(self, fmt, *args):
        pass


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--html", type=Path, default=Path(__file__).resolve().parents[2] / "dist" / "amq_learning_tool_v82_72.html")
    parser.add_argument("--chromium", default="/usr/bin/chromium")
    args = parser.parse_args()
    html_path = args.html.resolve()
    check(html_path.is_file(), "V82.72 standalone HTML exists")

    handler = lambda *a, **kw: QuietHandler(*a, directory=str(html_path.parent), **kw)
    server = ThreadingHTTPServer(("127.0.0.1", 0), handler)
    thread = threading.Thread(target=server.serve_forever, daemon=True)
    thread.start()
    origin = f"http://127.0.0.1:{server.server_port}"
    db_name = "amq_v8272_acceptance_isolated"
    storage_key = "__amq_v8272_acceptance_isolated__"
    storage_value = "roundtrip-verified"

    try:
        with sync_playwright() as pw:
            browser = pw.chromium.launch(headless=True, executable_path=args.chromium,
                                         args=["--no-sandbox", "--disable-dev-shm-usage"])
            context = browser.new_context()
            page = context.new_page()
            errors = []
            page.on("pageerror", lambda e: errors.append(str(e)))

            def route_request(route):
                parsed = urlparse(route.request.url)
                if parsed.hostname == "127.0.0.1" and parsed.port == server.server_port:
                    route.continue_()
                else:
                    route.abort()
            page.route("**/*", route_request)
            try:
                response = page.goto(f"{origin}/{html_path.name}", wait_until="domcontentloaded", timeout=60000)
                check(response is not None and response.status == 200, "HTML loads over a real localhost HTTP origin")
                page.wait_for_timeout(1200)
                check(page.title() == "AMQ學習工具", "application initializes without storage shims")
                check(page.evaluate("typeof window.indexedDB === 'object' && typeof localStorage.getItem === 'function'"),
                      "native localStorage and IndexedDB are available")

                page.evaluate("([k,v]) => localStorage.setItem(k,v)", [storage_key, storage_value])
                check(page.evaluate("k => localStorage.getItem(k)", storage_key) == storage_value,
                      "native localStorage writes and reads isolated acceptance key")

                wrote = page.evaluate("""async (dbName) => {
                  const db = await new Promise((resolve, reject) => {
                    const req = indexedDB.open(dbName, 1);
                    req.onupgradeneeded = () => req.result.createObjectStore('probe');
                    req.onsuccess = () => resolve(req.result);
                    req.onerror = () => reject(req.error);
                  });
                  await new Promise((resolve, reject) => {
                    const tx = db.transaction('probe', 'readwrite');
                    tx.objectStore('probe').put('indexeddb-roundtrip-verified', 'probe-key');
                    tx.oncomplete = resolve; tx.onerror = () => reject(tx.error);
                  });
                  db.close(); return true;
                }""", db_name)
                check(wrote is True, "native IndexedDB creates isolated database and commits a write")

                page.reload(wait_until="domcontentloaded", timeout=60000)
                page.wait_for_timeout(800)
                check(page.evaluate("k => localStorage.getItem(k)", storage_key) == storage_value,
                      "localStorage value persists across a document reload on the same origin")
                read = page.evaluate("""async (dbName) => {
                  const db = await new Promise((resolve, reject) => {
                    const req = indexedDB.open(dbName);
                    req.onsuccess = () => resolve(req.result); req.onerror = () => reject(req.error);
                  });
                  const value = await new Promise((resolve, reject) => {
                    const tx = db.transaction('probe', 'readonly');
                    const req = tx.objectStore('probe').get('probe-key');
                    req.onsuccess = () => resolve(req.result); req.onerror = () => reject(req.error);
                  });
                  db.close(); return value;
                }""", db_name)
                check(read == "indexeddb-roundtrip-verified", "IndexedDB value persists across reload and can be read back")

                page.evaluate("window.__aniNavigateApp?.('quiz')")
                page.wait_for_timeout(150)
                check(page.locator("#quizAnswer").count() == 1 and page.locator("#quizSuggestions").count() == 1,
                      "quiz view and suggestion controls mount on localhost origin")
                page.locator("#quizTarget").select_option("title")
                answer = page.locator("#quizAnswer")
                answer.evaluate("el => { el.disabled = false; }")
                answer.fill("naruto", timeout=10000)
                page.wait_for_timeout(500)
                count = page.locator("#quizSuggestions .quizSuggestion").count()
                check(count > 0, "real embedded song database yields suggestions for a title query")
                chosen = page.locator("#quizSuggestions .quizSuggestion").first
                label = chosen.inner_text()
                chosen.click()
                check(answer.input_value() == label, "localhost-origin click selects a real database suggestion")
                check(answer.get_attribute("aria-expanded") == "false" and
                      page.locator("#quizSuggestions .quizSuggestion").count() == 0,
                      "localhost-origin selection closes list and resets ARIA state")
                check(page.evaluate("document.activeElement === document.getElementById('quizAnswer')"),
                      "localhost-origin selection restores focus")
                caret = answer.evaluate("el => [el.selectionStart, el.selectionEnd, el.value.length]")
                check(caret[0] == caret[2] and caret[1] == caret[2], "localhost-origin selection places caret at end")
                check(not errors, "no uncaught browser page errors during local-origin acceptance")
            finally:
                try:
                    page.evaluate("k => localStorage.removeItem(k)", storage_key)
                    page.evaluate("dbName => indexedDB.deleteDatabase(dbName)", db_name)
                except Exception:
                    pass
                context.close()
                browser.close()
    finally:
        server.shutdown()
        server.server_close()
        thread.join(timeout=2)

    print("LIMITATION: localhost HTTP origin only; external network/audio, production-domain policies, Firefox and multiplayer multi-client reconnect are not validated.")
    print("CLEANUP: isolated localStorage key and dedicated IndexedDB database were removed in the test context.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
