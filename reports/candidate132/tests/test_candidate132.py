#!/usr/bin/env python3
"""Candidate 132 smoke checks. Requires playwright, beautifulsoup4, tinycss2, Node, and Chromium."""
from pathlib import Path
import hashlib, json, re, subprocess, sys
from bs4 import BeautifulSoup
import tinycss2
from playwright.sync_api import sync_playwright

path = Path(sys.argv[1] if len(sys.argv) > 1 else "amq_learning_tool_v82_85_46_workspace_proto44-osu-songselect-ui_132.html")
html = path.read_text(encoding="utf-8")
soup = BeautifulSoup(html, "html.parser")
js_pass = 0
js_fail = []
for i, tag in enumerate(soup.find_all("script")):
    body = tag.string or tag.get_text()
    typ = (tag.get("type") or "").lower()
    if not body.strip() or (typ and typ not in ("text/javascript", "application/javascript", "module")):
        continue
    tmp = Path(f"/tmp/amq132-inline-{i}.js")
    tmp.write_text(body, encoding="utf-8")
    check = subprocess.run(["node", "--check", str(tmp)], capture_output=True, text=True)
    if check.returncode == 0:
        js_pass += 1
    else:
        js_fail.append({"script": i, "stderr": check.stderr[:300]})
css_errors = []
css_rules = 0
for i, tag in enumerate(soup.find_all("style")):
    for token in tinycss2.parse_stylesheet(tag.string or tag.get_text(), skip_comments=True, skip_whitespace=True):
        if token.type == "error":
            css_errors.append({"style": i, "line": token.source_line, "message": token.message})
        elif token.type == "qualified-rule":
            css_rules += 1

report = {
    "file": path.name, "bytes": path.stat().st_size,
    "sha256": hashlib.sha256(path.read_bytes()).hexdigest(),
    "static": {"executable_js_pass": js_pass, "js_failures": js_fail,
               "css_blocks": len(soup.find_all("style")), "css_rules": css_rules,
               "css_errors": css_errors,
               "candidate_marker": '132-osu-songselect-75-card-viewport-distance-focus' in html,
               "parent_marker": '<meta name="amq-parent-candidate" content="130">' in html},
    "viewports": {}, "interaction": {}
}
with sync_playwright() as pw:
    browser = pw.chromium.launch(headless=True, args=["--no-sandbox", "--disable-dev-shm-usage"])
    for width, height in [(1648, 928), (1440, 900), (1280, 720)]:
        page = browser.new_page(viewport={"width": width, "height": height}, device_scale_factor=1)
        page.route("**/*", lambda route: route.abort() if route.request.url.startswith(("http://", "https://")) else route.continue_())
        page.set_content(html, wait_until="commit", timeout=20000)
        page.wait_for_timeout(200)
        page.evaluate("window.__aniNavigateApp('catalog')")
        page.wait_for_timeout(200)
        result = page.locator("#grid").evaluate("""e => {
          const r=e.getBoundingClientRect(), cards=[...e.children].filter(x=>x.matches('.card,.p26-work-card'));
          const h=cards[0].getBoundingClientRect().height;
          const visible=cards.map(x=>{const q=x.getBoundingClientRect();return {v:Math.max(0,Math.min(r.bottom,q.bottom)-Math.max(r.top,q.top)),h:q.height}}).filter(x=>x.v>0);
          return {gridHeight:e.clientHeight,cardHeight:h,catalogCards:cards.length,
                  fullCards:visible.filter(x=>x.v>=x.h-1).length,
                  eighthFraction:visible.at(-1).v/visible.at(-1).h};
        }""")
        report["viewports"][f"{width}x{height}"] = result
        if width == 1648:
            page.locator("#grid > .card").nth(109).evaluate("(e)=>e.click()")
            page.wait_for_timeout(150)
            rows = page.locator("#grid .amq-inline-song-list .songrow")
            rows.nth(10).evaluate("(e)=>e.click()")
            page.wait_for_timeout(100)
            report["interaction"]["selected"] = rows.nth(10).evaluate("""e=>({
              distance:e.dataset.songDistance, transform:getComputedStyle(e).transform,
              opacity:getComputedStyle(e).opacity, marginTop:getComputedStyle(e).marginTop,
              marginBottom:getComputedStyle(e).marginBottom})""")
            rows.nth(11).hover()
            page.wait_for_timeout(100)
            report["interaction"]["hover"] = rows.nth(11).evaluate("""e=>({
              distance:e.dataset.songDistance, transform:getComputedStyle(e).transform,
              opacity:getComputedStyle(e).opacity})""")
        page.close()
    browser.close()
print(json.dumps(report, ensure_ascii=False, indent=2))
