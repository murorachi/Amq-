"""Candidate 82 three-stage workbench smoke test.
Usage: python test_candidate82_workbench.py /path/to/candidate82.html
Requires Playwright Python and Chromium. The in-memory storage shim is test-only;
this test does not validate persistent browser storage.
"""
from pathlib import Path
import json, sys
from playwright.sync_api import sync_playwright

if len(sys.argv) != 2:
    raise SystemExit("usage: python test_candidate82_workbench.py /path/to/candidate82.html")
html = Path(sys.argv[1]).read_text(encoding="utf-8")
shim = """<script>(()=>{const m=new Map();const s={get length(){return m.size},key(i){return [...m.keys()][i]??null},getItem(k){return m.has(String(k))?m.get(String(k)):null},setItem(k,v){m.set(String(k),String(v))},removeItem(k){m.delete(String(k))},clear(){m.clear()}};Object.defineProperty(window,'localStorage',{configurable:true,value:s});})();</script>"""
html = html.replace("<head>", "<head>" + shim, 1)
workspaces = {
 "lists": ["watchlist-custom","create-custom-list","watchlist","catalog","vn-list","watchlist-watch"],
 "batch": ["catalog","batch-select","batch-visible","batch-filtered","batch-clear","batch-tools","batch-apply-target","batch-watch-target","batch-create-list"],
 "learning": ["practiceExplore","practiceWeak","practice-self","quiz","practice-srs","learningPlan","learningCenter"],
 "analysis": ["dashboard","catalog","watchlist","practice-srs","learningPlan","learningCenter"],
}
result = {"cases": [], "page_errors": []}
with sync_playwright() as p:
 browser = p.chromium.launch(headless=True, executable_path="/usr/bin/chromium", args=["--no-sandbox"])
 page = browser.new_page(viewport={"width":1365,"height":900})
 page.on("pageerror", lambda e: result["page_errors"].append(str(e)))
 page.set_content(html, wait_until="domcontentloaded", timeout=60000)
 page.wait_for_timeout(1000)
 for workspace, actions in workspaces.items():
  page.locator(f'#amqWorkspaceDock [data-ws="{workspace}"]').evaluate("el=>el.click()")
  discovered = page.locator("#wsActions [data-ws-action]").evaluate_all("els=>els.map(el=>el.dataset.wsAction)")
  for action in actions:
   assert action in discovered, f"missing action: {workspace}/{action}"
   route_before = page.evaluate("()=>window.__aniGetActiveViewV82?.()||null")
   page.locator(f'#wsActions [data-ws-action="{action}"]').evaluate("el=>el.click()")
   page.wait_for_timeout(60)
   opened = page.locator("body").evaluate("el=>el.classList.contains('amq-ws-content-open')")
   chars = page.locator("#amqWorkspaceContentBody").evaluate("el=>el.innerText.length")
   route_during = page.evaluate("()=>window.__aniGetActiveViewV82?.()||null")
   page.keyboard.press("Escape")
   page.wait_for_timeout(30)
   closed = not page.locator("body").evaluate("el=>el.classList.contains('amq-ws-content-open')")
   passed = opened and closed and route_before == route_during and chars > 0
   result["cases"].append({"workspace":workspace,"action":action,"opened":opened,"closed":closed,"route_unchanged":route_before == route_during,"content_chars":chars,"passed":passed})
 browser.close()
result["summary"] = {"passed":sum(x["passed"] for x in result["cases"]),"total":len(result["cases"]),"page_errors":len(result["page_errors"])}
print(json.dumps(result, ensure_ascii=False, indent=2))
if result["summary"]["passed"] != result["summary"]["total"] or result["page_errors"]:
 raise SystemExit(1)
