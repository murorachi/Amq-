#!/usr/bin/env python3
"""Normal-origin browser acceptance for the pinned AMQ Proto17 HTML."""
from __future__ import annotations
import argparse, asyncio, hashlib, subprocess, sys
from datetime import datetime, timezone
from html.parser import HTMLParser
from pathlib import Path
from playwright.async_api import async_playwright

ROOT = Path(__file__).resolve().parents[2]
HTML = ROOT / "amq_learning_tool_v82_85_30_workspace_proto17.html"

class Scripts(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=False)
        self.items, self.kind, self.parts = [], "", None
    def handle_starttag(self, tag, attrs):
        if tag.lower() == "script":
            self.kind = (dict(attrs).get("type") or "").lower()
            self.parts = []
    def handle_data(self, data):
        if self.parts is not None:
            self.parts.append(data)
    def handle_endtag(self, tag):
        if tag.lower() == "script" and self.parts is not None:
            if self.kind not in {"application/json", "application/octet-stream"}:
                self.items.append("".join(self.parts))
            self.parts, self.kind = None, ""

async def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--url", required=True)
    ap.add_argument("--report", default="tests/reports/PROTO17_UI_ACCEPTANCE.md")
    args = ap.parse_args()
    results = []
    def check(name, ok, detail=""):
        results.append((name, bool(ok), str(detail)))
        print(("PASS" if ok else "FAIL") + ": " + name + ((" | " + str(detail)) if detail else ""), flush=True)

    raw = HTML.read_bytes()
    digest = hashlib.sha256(raw).hexdigest()
    parser = Scripts()
    parser.feed(raw.decode("utf-8-sig"))
    syntax_errors = []
    for n, source in enumerate(parser.items):
        r = subprocess.run(["node", "--check", "-"], input=source, text=True, capture_output=True)
        if r.returncode:
            syntax_errors.append(f"script {n}: {r.stderr.strip()[:250]}")
    check("Embedded JavaScript syntax", not syntax_errors,
          f"checked {len(parser.items)} inline scripts" if not syntax_errors else "; ".join(syntax_errors))

    page_errors = []
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True, args=["--no-sandbox", "--disable-dev-shm-usage"])
        context = await browser.new_context(viewport={"width": 1440, "height": 1000})
        origin = "/".join(args.url.split("/", 3)[:3])
        async def route_request(route):
            if route.request.url.startswith(origin):
                await route.continue_()
            else:
                await route.abort()
        await context.route("**/*", route_request)
        page = await context.new_page()
        page.on("pageerror", lambda error: page_errors.append(str(error)))
        try:
            await page.goto(args.url, wait_until="domcontentloaded", timeout=120000)
            await page.wait_for_function("document.readyState === 'complete'", timeout=30000)
            await page.wait_for_timeout(900)
            basics = await page.evaluate("""() => ({ready:document.readyState,
              workspace:!!document.getElementById('amqWorkspaceDock'),
              returnHome:!!document.getElementById('wsReturnHome'),
              homeActions:document.querySelectorAll('#homeMenu [data-home-action]').length,
              scopeTarget:!!document.getElementById('wsBatchScopeText')})""")
            check("Full page initializes on normal HTTP origin",
                  basics["ready"] == "complete" and basics["workspace"] and basics["returnHome"] and basics["scopeTarget"],
                  basics)

            storage = await page.evaluate("""async () => {
              const key='__amq_proto17_storage_acceptance__';
              localStorage.setItem(key,'persisted');
              const local=localStorage.getItem(key)==='persisted';
              localStorage.removeItem(key);
              const name='__amq_proto17_idb_acceptance__';
              const db=await new Promise((resolve,reject)=>{
                const req=indexedDB.open(name,1);
                req.onupgradeneeded=()=>req.result.createObjectStore('probe');
                req.onsuccess=()=>resolve(req.result);
                req.onerror=()=>reject(req.error);
              });
              const value=await new Promise((resolve,reject)=>{
                const tx=db.transaction('probe','readwrite');
                tx.objectStore('probe').put('ok','key');
                tx.oncomplete=()=>{
                  const read=db.transaction('probe','readonly').objectStore('probe').get('key');
                  read.onsuccess=()=>resolve(read.result);
                  read.onerror=()=>reject(read.error);
                };
                tx.onerror=()=>reject(tx.error);
              });
              db.close();
              await new Promise(resolve=>{
                const req=indexedDB.deleteDatabase(name);
                req.onsuccess=req.onerror=req.onblocked=()=>resolve();
              });
              return {localStorage:local,indexedDB:value==='ok'};
            }""")
            check("Native localStorage read/write", storage["localStorage"], storage)
            check("Native IndexedDB open/write/read", storage["indexedDB"], storage)
            delay = await page.evaluate("() => new Promise(resolve => {const t=performance.now();setTimeout(()=>resolve(performance.now()-t),100)})")
            check("Event loop remains responsive after initialization", delay < 1200, f"100 ms timer completed in {delay:.1f} ms")

            entries = [("quiz","quiz"),("practiceExplore","practice"),("practiceWeak","practice"),
                       ("catalog","catalog"),("watchlist","watchlist"),("learningPlan","learningPlan"),
                       ("dashboard","dashboard")]
            entry_results = []
            for action, expected in entries:
                try:
                    await page.locator(f'#homeMenu [data-home-action="{action}"]').first.click(timeout=5000)
                    await page.wait_for_function("expected => window.__aniGetActiveViewV82?.() === expected", expected, timeout=8000)
                    actual = await page.evaluate("window.__aniGetActiveViewV82?.() || 'home'")
                    entry_results.append(f"{action}->{actual}")
                    await page.evaluate("window.__aniSetHomeMenuOpenV846?.(false);window.__aniNavigateApp?.('home')")
                    await page.wait_for_function("(window.__aniGetActiveViewV82?.() || 'home') === 'home'", timeout=5000)
                except Exception as e:
                    entry_results.append(f"{action}:FAIL:{type(e).__name__}:{str(e)[:100]}")
            check("Seven homepage entries navigate to expected views",
                  len(entry_results)==7 and all("->" in x for x in entry_results), "; ".join(entry_results))

            await page.evaluate("window.__aniNavigateApp?.('catalog')")
            await page.wait_for_function("window.__aniGetActiveViewV82?.() === 'catalog' && document.body.classList.contains('amq-workspace-active')", timeout=8000)
            workspace_results = []
            for key, title in [("lists","清單管理"),("batch","批次整理"),("learning","學習中心"),("analysis","學習分析")]:
                try:
                    await page.locator(f'#amqWorkspaceDock [data-ws="{key}"]').click(timeout=5000)
                    actual = (await page.locator("#wsTitle").inner_text()).strip()
                    count = await page.locator("#amqWorkspaceSidebar [data-ws-action]").count()
                    workspace_results.append(f"{key}:{actual}:{count}")
                    if actual != title or count == 0:
                        raise AssertionError(f"expected {title}; got {actual}; actions={count}")
                except Exception as e:
                    workspace_results.append(f"{key}:FAIL:{type(e).__name__}:{str(e)[:100]}")
            check("Four workspace sections render their action lists",
                  len(workspace_results)==4 and all(":FAIL:" not in x for x in workspace_results),
                  "; ".join(workspace_results))

            mode_results = []
            for action, mode in [("practiceExplore","explore"),("practiceWeak","weak"),("practice-self","self"),("practice-srs","srs")]:
                try:
                    await page.evaluate("window.__aniNavigateApp?.('catalog')")
                    await page.wait_for_function("window.__aniGetActiveViewV82?.() === 'catalog' && document.body.classList.contains('amq-workspace-active')", timeout=5000)
                    await page.locator('#amqWorkspaceDock [data-ws="learning"]').click()
                    await page.locator(f'#amqWorkspaceSidebar [data-ws-action="{action}"]').click()
                    await page.wait_for_function("window.__aniGetActiveViewV82?.() === 'practice'", timeout=5000)
                    await page.wait_for_function("m => {const b=document.querySelector('[data-practice-mode=\"'+m+'\"]');return !!b&&b.getAttribute('aria-pressed')==='true'}", mode, timeout=5000)
                    mode_results.append(f"{action}->{mode}:selected")
                except Exception as e:
                    mode_results.append(f"{action}:FAIL:{type(e).__name__}:{str(e)[:100]}")
            check("Learning workspace shortcuts select the correct practice mode",
                  len(mode_results)==4 and all(":FAIL:" not in x for x in mode_results),
                  "; ".join(mode_results))

            try:
                await page.evaluate("window.__aniNavigateApp?.('catalog')")
                await page.wait_for_function("window.__aniGetActiveViewV82?.() === 'catalog' && document.body.classList.contains('amq-workspace-active')", timeout=5000)
                await page.locator('#amqWorkspaceDock [data-ws="learning"]').click()
                await page.locator('#amqWorkspaceSidebar [data-ws-action="learningCenter"]').click()
                await page.wait_for_function("window.__aniGetActiveViewV82?.() === 'home' && !!document.querySelector('#amqHomeSubmenuV8249:not([hidden])')", timeout=5000)
                title = (await page.locator("#vn49SubTitle").inner_text()).strip()
                check("Learning Center shortcut opens the existing menu group", title=="學習中心", title)
                await page.evaluate("window.__aniSetHomeMenuOpenV846?.(false)")
            except Exception as e:
                check("Learning Center shortcut opens the existing menu group", False, f"{type(e).__name__}: {str(e)[:150]}")

            try:
                await page.evaluate("window.__aniNavigateApp?.('catalog')")
                await page.wait_for_function("window.__aniGetActiveViewV82?.() === 'catalog' && document.body.classList.contains('amq-workspace-active')", timeout=5000)
                await page.locator('#amqWorkspaceDock [data-ws="analysis"]').click()
                await page.locator('#amqWorkspaceSidebar [data-ws-action="dashboard"]').click()
                await page.wait_for_function("window.__aniGetActiveViewV82?.() === 'dashboard'", timeout=5000)
                check("Learning Analysis shortcut opens the dashboard", True, "active view = dashboard")
            except Exception as e:
                check("Learning Analysis shortcut opens the dashboard", False, f"{type(e).__name__}: {str(e)[:150]}")

            try:
                await page.evaluate("window.__aniNavigateApp?.('catalog')")
                await page.wait_for_function("window.__aniGetActiveViewV82?.() === 'catalog' && document.body.classList.contains('amq-workspace-active')", timeout=5000)
                await page.locator("#wsReturnHome").click(timeout=5000)
                await page.wait_for_function("(window.__aniGetActiveViewV82?.() || 'home') === 'home' && !document.body.classList.contains('amq-workspace-active')", timeout=5000)
                check("Return-home control restores the independent homepage", True, "active view = home; workspace hidden")
            except Exception as e:
                check("Return-home control restores the independent homepage", False, f"{type(e).__name__}: {str(e)[:150]}")

            critical = [e for e in page_errors if not any(x in e.lower() for x in ("failed to fetch","networkerror","load failed","aborted"))]
            check("No uncaught non-network JavaScript exceptions", not critical,
                  "; ".join(critical[:4]) if critical else f"{len(page_errors)} network-only errors filtered")
        except Exception as e:
            check("Browser test runner completed", False, f"{type(e).__name__}: {str(e)[:250]}")
        finally:
            await browser.close()

    passed = sum(ok for _,ok,_ in results)
    failed = len(results)-passed
    report = [
        "# Proto17 UI Acceptance Report", "",
        f"- Run time UTC: {datetime.now(timezone.utc).strftime('%Y-%m-%dT%H:%M:%SZ')}",
        "- Baseline: v82.85.30 / Proto17",
        f"- Tested HTML size: {len(raw)} bytes",
        f"- Tested HTML SHA-256: {digest}",
        f"- Result: {'PASS' if failed==0 else 'FAIL'} ({passed} passed, {failed} failed)", "",
        "| Result | Case | Details |", "|---|---|---|"
    ]
    report += [f"| {'PASS' if ok else 'FAIL'} | {name} | {detail.replace('|','/').replace(chr(10),' ')} |" for name,ok,detail in results]
    report += ["", "## Scope and limitations", "",
        "- Loaded through a local HTTP origin; not file:// or opaque about:blank.",
        "- Native localStorage and IndexedDB were tested with real browser APIs.",
        "- External requests were blocked for deterministic acceptance; remote covers, third-party APIs, and real audio playback were not tested.",
        "- This is functional acceptance, not a pixel-diff visual review.", ""]
    out = ROOT / args.report
    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_text("\n".join(report), encoding="utf-8")
    return 0 if failed == 0 else 1

if __name__ == "__main__":
    sys.exit(asyncio.run(main()))
