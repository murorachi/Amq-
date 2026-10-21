from pathlib import Path
import hashlib
import json
from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[2]
HTML = ROOT / "dist/amq_learning_tool_v82_85_30_workspace_proto26_song_select_04.html"
failures = []
def check(ok, label):
    print(("PASS " if ok else "FAIL ") + label)
    if not ok: failures.append(label)

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1440, "height": 1000})
    page_errors, console_errors = [], []
    page.on("pageerror", lambda e: page_errors.append(str(e)))
    page.on("console", lambda m: console_errors.append(m.text) if m.type == "error" else None)
    page.goto(HTML.as_uri(), wait_until="domcontentloaded", timeout=60000)
    page.wait_for_timeout(300)
    check(page.locator("#proto26SongModes").count() == 1, "source mode controls initialize")
    check(page.locator("html").get_attribute("data-proto26-init") == "ready", "integration reports ready state")
    page.evaluate("window.__aniNavigateApp?.('catalog')")
    page.wait_for_timeout(500)
    workspace_debug = page.evaluate("""() => ({
        innerWidth: window.innerWidth,
        bodyClasses: document.body.className,
        activeView: window.__aniGetActiveViewV82?.() ?? null,
        sidebarDisplay: getComputedStyle(document.querySelector('#amqWorkspaceSidebar')).display,
        sidebarRect: (() => { const r=document.querySelector('#amqWorkspaceSidebar').getBoundingClientRect(); return {x:r.x,y:r.y,width:r.width,height:r.height}; })(),
        dockDisplay: getComputedStyle(document.querySelector('#amqWorkspaceDock')).display,
        dockRect: (() => { const r=document.querySelector('#amqWorkspaceDock').getBoundingClientRect(); return {x:r.x,y:r.y,width:r.width,height:r.height}; })()
    })""")
    print("WORKSPACE_DEBUG=" + json.dumps(workspace_debug, ensure_ascii=False))
    check(page.evaluate("window.__aniGetActiveViewV82?.() === 'catalog'"), "app navigation state is catalog")
    check(page.locator("#grid").is_visible(), "catalog view is visible before interacting with song cards")
    check(page.locator("#proto26SongModes").is_visible(), "source controls are scoped to the catalog view")
    check(page.locator("#amqWorkspaceSidebar").is_visible(), "existing workspace sidebar is visible in Song Select")
    check(page.locator("#amqWorkspaceDock").is_visible(), "existing workspace dock is visible in Song Select")
    check(page.locator("#amqWorkspaceDock [data-ws]").count() == 4, "all four existing workspaces remain available")
    if page.locator("#amqWorkspaceDock").is_visible():
        for key, title in [("lists", "清單管理"), ("batch", "批次整理"), ("learning", "學習中心"), ("analysis", "學習分析")]:
            page.locator(f'#amqWorkspaceDock [data-ws="{key}"]').click()
            page.wait_for_timeout(100)
            check(page.locator("#wsTitle").inner_text().strip() == title, f"workspace {key} activates its existing panel")
    try:
        page.wait_for_function("window.__aniEmqAPI?.ready === true", timeout=30000)
    except Exception:
        pass
    check(page.evaluate("!!window.__aniEmqAPI?.ready"), "EMQ library completes asynchronous initialization")
    check(page.evaluate("window.__aniEmqAPI?.getWorks?.().length > 0"), "EMQ API exposes actual work records after initialization")
    check(page.locator("#grid").count() == 1 and page.locator("#audioDock").count() == 1, "catalog and audio dock remain present")
    if page.locator("#proto26SongModes").count():
        page.locator('[data-p26-mode="emq"]').click()
        page.wait_for_timeout(1200)
        check(page.evaluate("window.__amqProto26SongSelect.getMode()") == "emq", "EMQ mode activates")
        check(page.locator("#grid .p26-work-card").count() > 0, "EMQ mode renders actual work cards")
        if page.locator("#grid .p26-work-card").count() > 0:
            page.locator("#grid .p26-work-card").first.click()
            page.wait_for_timeout(300)
            check(page.locator("#overlay.open").count() == 1, "selecting an EMQ work opens its detail pane")
            check(page.locator("#overlay .drawer").evaluate("(el) => getComputedStyle(el).position") == "fixed", "desktop detail pane is fixed at the right side")
            check(page.locator("#overlay .close").evaluate("(el) => getComputedStyle(el).display") == "none", "desktop detail pane remains persistent while browsing")
            check(page.locator("#grid").evaluate("(el) => el.getBoundingClientRect().width < window.innerWidth * 0.8"), "catalog reserves horizontal space for the detail pane")
            check(page.locator("#quicktools").evaluate("(el) => el.getBoundingClientRect().width < window.innerWidth * 0.8"), "batch tools reserve horizontal space for the detail pane")
            check(page.locator(".toolbar.view-catalog").evaluate("(el) => el.getBoundingClientRect().width < window.innerWidth * 0.8"), "search and filter controls reserve horizontal space for the detail pane")
            page.set_viewport_size({"width": 1000, "height": 562})
            page.wait_for_timeout(250)
            check(page.evaluate("document.documentElement.scrollWidth <= window.innerWidth"), "1000x562 Song Select viewport has no horizontal overflow")
            page.screenshot(path=str(SCREENSHOT_DIR / "proto26-stable-reference-viewport.png"), full_page=False)
            page.set_viewport_size({"width": 1440, "height": 1000})
            page.wait_for_timeout(150)
        page.locator('[data-p26-mode="mix"]').click()
        page.wait_for_timeout(800)
        check(page.evaluate("window.__amqProto26SongSelect.getMode()") == "mix", "MIX mode activates")
        page.locator('[data-p26-mode="singer"]').click()
        page.wait_for_timeout(800)
        check(page.evaluate("window.__amqProto26SongSelect.getMode()") == "singer", "Singer mode activates")
        page.locator('[data-p26-mode="amq"]').click()
        page.wait_for_timeout(800)
        check(page.evaluate("window.__amqProto26SongSelect.getMode()") == "amq", "AMQ mode restores legacy catalog")
    check(not page_errors, "no uncaught page errors")
    print("CONSOLE_ERRORS=" + json.dumps(console_errors, ensure_ascii=False))
    check(not console_errors, "no browser console errors")
    page.screenshot(path=str(ROOT / "engineering/proto26-song-select/proto26-desktop.png"), full_page=True)
    page.set_viewport_size({"width":390,"height":844})
    page.wait_for_timeout(800)
    check(page.evaluate("document.documentElement.scrollWidth <= window.innerWidth"), "mobile layout has no horizontal overflow")
    check(page.locator("#overlay.open .drawer").evaluate("(el) => el.getBoundingClientRect().width <= window.innerWidth"), "mobile detail drawer fits the viewport")
    check(page.locator("#overlay.open .close").evaluate("(el) => getComputedStyle(el).display") == "block", "mobile detail drawer retains its close control")
    page.screenshot(path=str(ROOT / "engineering/proto26-song-select/proto26-mobile.png"), full_page=True)
    browser.close()
print("OUTPUT_SHA256=" + hashlib.sha256(HTML.read_bytes()).hexdigest())
if failures:
    raise SystemExit("BROWSER_ACCEPTANCE=FAIL: " + "; ".join(failures))
print("BROWSER_ACCEPTANCE=PASS")
