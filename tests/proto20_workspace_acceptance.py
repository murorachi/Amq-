import asyncio, json, time
from pathlib import Path
from playwright.async_api import async_playwright

async def main():
    report={"checks": [], "errors": [], "console_errors": [], "native_origin": True}
    started=time.time()
    async with async_playwright() as p:
        browser=await p.chromium.launch()
        page=await browser.new_page(viewport={"width":1440,"height":900}, device_scale_factor=1)
        page.on("pageerror", lambda e: report["errors"].append(str(e)))
        page.on("console", lambda m: report["console_errors"].append(m.text) if m.type=="error" else None)
        response=await page.goto("http://127.0.0.1:8765/candidate.html",wait_until="domcontentloaded",timeout=45000)
        report["http_status"]=response.status if response else None
        await page.wait_for_function("document.readyState==='complete'",timeout=45000)
        await page.wait_for_timeout(2500)
        report["origin"]=await page.evaluate("location.origin")
        report["storage_apis"]=await page.evaluate("""async()=>{let dbOk=false;try{await new Promise((resolve,reject)=>{let r=indexedDB.open('amq_acceptance_probe',1);r.onsuccess=()=>{dbOk=true;r.result.close();indexedDB.deleteDatabase('amq_acceptance_probe');resolve()};r.onerror=()=>reject(r.error)})}catch{};localStorage.setItem('amq_acceptance_probe','ok');sessionStorage.setItem('amq_acceptance_probe','ok');return {localStorage:localStorage.getItem('amq_acceptance_probe')==='ok',sessionStorage:sessionStorage.getItem('amq_acceptance_probe')==='ok',indexedDB:dbOk}}""")
        assert report["origin"]=="http://127.0.0.1:8765", report["origin"]
        assert all(report["storage_apis"].values()), report["storage_apis"]
        report["checks"].append("normal-origin native localStorage/sessionStorage/IndexedDB: PASS")
        await page.wait_for_function("document.querySelectorAll('[data-home-action]').length >= 7",timeout=45000)
        legacy=await page.evaluate("""()=>({hero:getComputedStyle(document.querySelector('.hero.view-home')).display,discover:getComputedStyle(document.querySelector('.discover.view-home')).display,home:document.body.classList.contains('ui-home-menu')})""")
        assert legacy=={"hero":"none","discover":"none","home":True}, legacy
        report["checks"].append("home landing suppresses duplicate legacy dashboard/discovery sections: PASS")
        await page.screenshot(path="proto20-desktop.png",full_page=True)
        actions=await page.locator("[data-home-action]").evaluate_all("(els)=>[...new Set(els.map(e=>e.getAttribute('data-home-action')))]")
        report["home_actions"]=actions
        expected=["quiz","practiceExplore","practiceWeak","catalog","watchlist","learningPlan","dashboard"]
        assert all(x in actions for x in expected), {"expected":expected,"actual":actions}
        for action in expected:
            el=page.locator('[data-home-action="'+action+'"]').first
            await el.click(timeout=8000)
            await page.wait_for_timeout(250)
            state=await page.evaluate("window.__aniGetActiveViewV82?.() || null")
            assert state, f"no active view after {action}"
            report["checks"].append(f"homepage action {action}: active view {state}")
            back=page.locator("#uiBackHome").first
            if await back.count() and await back.is_visible():
                await back.click(timeout=5000)
                await page.wait_for_timeout(150)
        # Reload persistence on native origin: verify browser storage survives reload.
        await page.evaluate("localStorage.setItem('amq_acceptance_reload_probe','persisted');sessionStorage.setItem('amq_acceptance_reload_probe','persisted')")
        await page.reload(wait_until="domcontentloaded",timeout=45000)
        await page.wait_for_function("document.readyState==='complete'",timeout=45000)
        persisted=await page.evaluate("({local:localStorage.getItem('amq_acceptance_reload_probe'),session:sessionStorage.getItem('amq_acceptance_reload_probe')})")
        assert persisted=={"local":"persisted","session":"persisted"}, persisted
        report["checks"].append("native storage survives reload: PASS")
        await page.set_viewport_size({"width":390,"height":844})
        await page.wait_for_timeout(500)
        await page.screenshot(path="proto20-mobile.png",full_page=True)
        widths=await page.evaluate("({viewport:innerWidth,document:document.documentElement.scrollWidth})")
        report["mobile_widths"]=widths
        assert widths["document"]<=widths["viewport"], widths
        report["checks"].append("mobile no horizontal overflow: PASS")
        # Enter dashboard at desktop dimensions and capture the real workspace surface.
        await page.set_viewport_size({"width":1440,"height":900})
        await page.locator('[data-home-action="dashboard"]').last.click(timeout=8000)
        await page.wait_for_timeout(350)
        await page.screenshot(path="proto20-dashboard-workspace.png",full_page=False)
        assert await page.locator('#amqWorkspaceDock [data-ws="analysis"]').get_attribute("aria-pressed")=="true", "dashboard route must select Analysis workspace"
        assert await page.locator("#amqWorkspaceDock").is_visible()
        assert await page.locator("#amqWorkspaceSidebar").is_visible()
        # Dedicated workspace navigation: Learning Center and Analysis stay separate.
        for ws, expected_text in [("learning","學習中心"),("analysis","學習概況")]:
            button=page.locator('[data-ws="'+ws+'"]')
            await button.click(timeout=8000)
            await page.wait_for_timeout(200)
            pressed=await button.get_attribute("aria-pressed")
            assert pressed=="true", f"workspace {ws} not active"
            text=await page.locator("#wsActions").inner_text()
            assert expected_text in text, {"workspace":ws,"text":text[:500]}
            report["checks"].append(f"workspace {ws} active and correct panel content: PASS")
        await page.locator('[data-ws="learning"]').click()
        learning_text=await page.locator("#wsActions").inner_text()
        for required in ["探索新歌","弱點補強","自選清單練習","間隔複習","學習計畫"]:
            assert required in learning_text, {"missing":required,"text":learning_text[:600]}
        await page.locator('[data-ws="analysis"]').click()
        analysis_text=await page.locator("#wsActions").inner_text()
        for required in ["統計儀表板","查看動畫圖鑑進度","查看清單與學習資料","學習計畫"]:
            assert required in analysis_text, {"missing":required,"text":analysis_text[:600]}
        report["checks"].append("Learning Center and Analysis panels remain separate with expected actions: PASS")
        await page.locator("#wsReturnHome").click(timeout=8000)
        await page.wait_for_timeout(200)
        await page.locator('[data-home-action="learningPlan"]').last.click(timeout=8000)
        await page.wait_for_timeout(500)
        await page.screenshot(path="proto20-learning-center.png",full_page=False)
        assert await page.locator('#amqWorkspaceDock [data-ws="learning"]').get_attribute("aria-pressed")=="true", "learningPlan route must select Learning workspace"
        await page.locator('[data-ws="analysis"]').click()
        await page.wait_for_timeout(200)
        await page.screenshot(path="proto20-analysis-workspace.png",full_page=False)
        # Verify the final appended UI layer is active and no horizontal overflow is introduced.
        ui_layer=await page.locator("#amq-proto20-workspace-ui-pass").count()
        assert ui_layer==1, f"Proto20 UI stylesheet missing: {ui_layer}"
        desktop_widths=await page.evaluate("({viewport:innerWidth,document:document.documentElement.scrollWidth})")
        assert desktop_widths["document"]<=desktop_widths["viewport"], desktop_widths
        report["checks"].append("Proto20 workspace visual layer present; desktop no horizontal overflow: PASS")
        report["elapsed_seconds"]=round(time.time()-started,2)
        report["console_errors"]=report["console_errors"][:50]
        await browser.close()
    assert not report["errors"], report["errors"]
    Path("acceptance-report.json").write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding="utf-8")
    print(json.dumps(report,ensure_ascii=False,indent=2))

asyncio.run(main())
