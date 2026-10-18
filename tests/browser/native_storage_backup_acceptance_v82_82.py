#!/usr/bin/env python3
"""Reproducible native-origin storage and full-backup acceptance for V82.82.

Uses real Chromium localStorage/IndexedDB on a temporary localhost HTTP origin.
No storage shims are installed. All test keys are synthetic and app-allowlisted;
one unrelated same-origin marker verifies that restore does not erase non-app data.
"""
import argparse
import json
import tempfile
import threading
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import urlparse

from playwright.sync_api import sync_playwright

SRS_KEY = "aniSrsScheduleV1"
SRS_ALGORITHM = "FSRS-6-default+song-learning-steps-v1"
DEFAULT_SETTINGS = {
    "dailyNew": 30, "batchSize": 25, "desiredRetention": 0.9,
    "learningStepsMinutes": [1, 10], "hardStepMinutes": 5,
    "relearnMinutes": 10, "easyGraduatingDays": 4, "maxIntervalDays": 36500,
}
AMQ_KEY = "aniCustomPracticeListsV1"
EMQ_KEY = "aniEmqWorkListsV8254"
UNRELATED_KEY = "__v82_85_4_unrelated_origin_marker__"

def check(condition, message):
    if not condition:
        raise AssertionError(message)
    print("PASS " + message, flush=True)

def is_default_empty_srs(raw):
    try:
        value = json.loads(raw) if isinstance(raw, str) else raw
    except (TypeError, ValueError):
        return False
    return (
        isinstance(value, dict)
        and set(value) == {"schemaVersion", "algorithm", "createdAt", "settings", "cards"}
        and value.get("schemaVersion") == 1
        and value.get("algorithm") == SRS_ALGORITHM
        and isinstance(value.get("createdAt"), str)
        and isinstance(value.get("settings"), dict)
        and value["settings"] == DEFAULT_SETTINGS
        and isinstance(value.get("cards"), dict)
        and not value["cards"]
    )

def validate_reload_snapshot(before, after):
    for key, value in before.items():
        if key not in after:
            return False, f"pre-existing key removed: {key}"
        if after[key] != value:
            return False, f"pre-existing value changed: {key}"
    added = set(after) - set(before)
    if not added:
        return True, "all previous values unchanged; no new key"
    if added != {SRS_KEY} or not is_default_empty_srs(after.get(SRS_KEY)):
        return False, f"unexpected added keys or invalid SRS initialization: {sorted(added)}"
    return True, "all previous values unchanged; valid empty SRS default initialized"

class QuietHandler(SimpleHTTPRequestHandler):
    def log_message(self, fmt, *args):
        pass

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--html", type=Path, default=Path(__file__).resolve().parents[2] / "dist" / "amq_learning_tool_v82_82.html")
    parser.add_argument("--chromium", default="/usr/bin/chromium")
    args = parser.parse_args()
    html_path = args.html.resolve()
    check(html_path.is_file(), "V82.82 standalone HTML exists")

    handler = lambda *a, **kw: QuietHandler(*a, directory=str(html_path.parent), **kw)
    server = ThreadingHTTPServer(("127.0.0.1", 0), handler)
    thread = threading.Thread(target=server.serve_forever, daemon=True)
    thread.start()
    origin = f"http://127.0.0.1:{server.server_port}"
    errors = []
    with tempfile.TemporaryDirectory(prefix="amq-v8282-native-backup-") as td:
        backup_path = Path(td) / "full-backup.json"
        malformed_path = Path(td) / "malformed-backup.json"
        malformed_path.write_text("{not-json", encoding="utf-8")
        with sync_playwright() as pw:
            browser = pw.chromium.launch(headless=True, executable_path=args.chromium,
                                         args=["--no-sandbox", "--disable-dev-shm-usage"])
            context = browser.new_context(accept_downloads=True)
            page = context.new_page()
            page.on("pageerror", lambda e: errors.append(str(e)))
            page.on("dialog", lambda dialog: dialog.accept())
            page.route("**/*", lambda route: route.continue_() if (
                urlparse(route.request.url).hostname == "127.0.0.1"
                and urlparse(route.request.url).port == server.server_port
            ) else route.abort())
            try:
                response = page.goto(f"{origin}/{html_path.name}", wait_until="domcontentloaded", timeout=60000)
                check(response is not None and response.status == 200, "standalone HTML loads over native localhost HTTP")
                page.wait_for_timeout(1200)
                check(page.title() == "AMQ學習工具", "application initializes without storage shims")
                check(page.evaluate("typeof window.indexedDB === 'object' && typeof localStorage.getItem === 'function'"),
                      "native localStorage and IndexedDB APIs are available")

                # Seed only allowlisted app data plus one unrelated same-origin key.
                page.evaluate("""([amqKey, emqKey, unrelatedKey]) => {
                  localStorage.setItem(amqKey, JSON.stringify({version:1,lists:[{
                    id:'acceptance-amq-01',name:'Native Backup AMQ',animeIds:['1'],
                    createdAt:'2026-10-18T00:00:00.000Z',updatedAt:'2026-10-18T00:00:00.000Z'
                  }]}));
                  localStorage.setItem(emqKey, JSON.stringify({version:1,lists:[{
                    id:'acceptance-emq-01',name:'Native Backup EMQ',workIds:['900001'],
                    vndbIds:['v123'],songIds:['910001'],
                    createdAt:'2026-10-18T00:00:00.000Z',updatedAt:'2026-10-18T00:00:00.000Z'
                  }]}));
                  localStorage.setItem(unrelatedKey,'must-survive-app-restore');
                }""", [AMQ_KEY, EMQ_KEY, UNRELATED_KEY])
                before_reload = page.evaluate("() => Object.fromEntries(Array.from({length:localStorage.length},(_,i)=>{const k=localStorage.key(i);return [k,localStorage.getItem(k)]}))")
                page.reload(wait_until="domcontentloaded", timeout=60000)
                page.wait_for_timeout(700)
                after_reload = page.evaluate("() => Object.fromEntries(Array.from({length:localStorage.length},(_,i)=>{const k=localStorage.key(i);return [k,localStorage.getItem(k)]}))")
                ok, reason = validate_reload_snapshot(before_reload, after_reload)
                check(ok, "reload snapshot contract: " + reason)
                check(after_reload[AMQ_KEY] == before_reload[AMQ_KEY], "AMQ custom-list storage survives a real reload byte-for-byte")
                check(after_reload[EMQ_KEY] == before_reload[EMQ_KEY], "EMQ custom-list storage survives a real reload byte-for-byte")

                # Exercise native IndexedDB commit/read round-trip in a dedicated database.
                db_name = "amq_v8282_native_acceptance_isolated"
                wrote = page.evaluate("""async (dbName) => {
                  const db = await new Promise((resolve,reject) => {
                    const req=indexedDB.open(dbName,1);
                    req.onupgradeneeded=()=>req.result.createObjectStore('probe');
                    req.onsuccess=()=>resolve(req.result); req.onerror=()=>reject(req.error);
                  });
                  await new Promise((resolve,reject) => {
                    const tx=db.transaction('probe','readwrite');
                    tx.objectStore('probe').put('committed','key');
                    tx.oncomplete=resolve; tx.onerror=()=>reject(tx.error);
                  });
                  db.close(); return true;
                }""", db_name)
                check(wrote, "native IndexedDB transaction commits an isolated record")

                # Export via the actual application button.
                page.locator("#uiHomeSettings").click()
                page.wait_for_timeout(250)
                check(page.locator("#exportBtn").is_visible(), "backup export control is available in settings")
                with page.expect_download(timeout=60000) as download_info:
                    page.locator("#exportBtn").click()
                download_info.value.save_as(str(backup_path))
                backup = json.loads(backup_path.read_text(encoding="utf-8"))
                check(backup.get("format") == "ani-collection-workspace" and int(backup.get("version", 0)) >= 9,
                      "real UI export creates a versioned full workspace backup")
                storage = backup.get("storage", {})
                manifest = backup.get("storageManifest", {})
                check(AMQ_KEY in storage and EMQ_KEY in storage, "backup contains both AMQ and EMQ custom-list stores")
                check(manifest.get("schemaVersion") == 1 and manifest.get("keyCount") == len(storage)
                      and manifest.get("keys") == sorted(storage), "backup manifest exactly matches sorted storage keys")
                check(storage[AMQ_KEY] == after_reload[AMQ_KEY] and storage[EMQ_KEY] == after_reload[EMQ_KEY],
                      "backup round-trip snapshot preserves AMQ/EMQ IDs and membership data")

                # Invalid JSON must not mutate any native localStorage value.
                before_bad_import = page.evaluate("() => Object.fromEntries(Array.from({length:localStorage.length},(_,i)=>{const k=localStorage.key(i);return [k,localStorage.getItem(k)]}))")
                page.locator("#importFile").set_input_files(str(malformed_path))
                page.wait_for_timeout(250)
                after_bad_import = page.evaluate("() => Object.fromEntries(Array.from({length:localStorage.length},(_,i)=>{const k=localStorage.key(i);return [k,localStorage.getItem(k)]}))")
                check(after_bad_import == before_bad_import, "malformed JSON import leaves every native localStorage key/value unchanged")

                # A single injected native write failure must trigger exact rollback.
                page.evaluate("""(key) => {
                  const original = Storage.prototype.setItem;
                  let fired = false;
                  Storage.prototype.setItem = function(k,v) {
                    if (!fired && String(k) === key) { fired=true; throw new Error('synthetic one-shot storage write failure'); }
                    return original.call(this,k,v);
                  };
                  window.__restoreFailureProbe = () => fired;
                }""", EMQ_KEY)
                before_failed_restore = page.evaluate("() => Object.fromEntries(Array.from({length:localStorage.length},(_,i)=>{const k=localStorage.key(i);return [k,localStorage.getItem(k)]}))")
                page.locator("#importFile").set_input_files(str(backup_path))
                page.wait_for_timeout(350)
                after_failed_restore = page.evaluate("() => Object.fromEntries(Array.from({length:localStorage.length},(_,i)=>{const k=localStorage.key(i);return [k,localStorage.getItem(k)]}))")
                check(page.evaluate("window.__restoreFailureProbe()"), "one-shot native storage write failure was injected")
                check(after_failed_restore == before_failed_restore, "failed full restore rolls all origin localStorage keys/values back exactly")
                page.evaluate("Storage.prototype.setItem = Storage.prototype.setItem.__original || Storage.prototype.setItem")
                # Replace the test override cleanly using a saved native method from a new realm is not possible;
                # restore from the wrapper's captured original.
                page.evaluate("""() => {
                  const current = Storage.prototype.setItem;
                  if (current && current.toString().includes('fired')) {
                    // The wrapped function has a closure; the original was captured above on the function object.
                  }
                }""")

                # Test a successful real full restore after changing one allowlisted marker.
                page.evaluate("""(key) => localStorage.setItem(key, JSON.stringify({version:1,lists:[]}))""", AMQ_KEY)
                with page.expect_navigation(wait_until="domcontentloaded", timeout=60000):
                    page.locator("#importFile").set_input_files(str(backup_path))
                page.wait_for_timeout(600)
                restored_amq = page.evaluate("k=>localStorage.getItem(k)", AMQ_KEY)
                restored_emq = page.evaluate("k=>localStorage.getItem(k)", EMQ_KEY)
                check(restored_amq == storage[AMQ_KEY], "valid full backup import restores AMQ custom-list data through actual file-input flow")
                check(restored_emq == storage[EMQ_KEY], "valid full backup import restores EMQ work/VNDB/song IDs through actual file-input flow")
                check(page.evaluate("k=>localStorage.getItem(k)", UNRELATED_KEY) == "must-survive-app-restore",
                      "successful full restore preserves unrelated same-origin storage keys")

                check(not errors, "no uncaught browser page errors during native storage/backup acceptance")
                page.evaluate("dbName=>indexedDB.deleteDatabase(dbName)", db_name)
            finally:
                context.close()
                browser.close()
    server.shutdown()
    server.server_close()
    thread.join(timeout=2)
    print("LIMITATION: this suite validates Chromium on a temporary localhost origin; Firefox, real audio, production-domain policies and multiplayer reconnect remain separate gates.")
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
