import asyncio, json, time
from pathlib import Path
from playwright.async_api import async_playwright

async def main():
    report={"checks":[],"errors":[],"console_errors":[]}
    start=time.time()
    async with async_playwright() as p:
        browser=await p.chromium.launch()
        page=await browser.new_page(viewport={"width":1440,"height":900},device_scale_factor=1)
        page.on("pageerror",lambda e:report["errors"].append(str(e)))
        page.on("console",lambda m:report["console_errors"].append(m.text) if m.type=="error" else None)
        response=await page.goto("http://127.0.0.1:8765/candidate.html",wait_until="domcontentloaded",timeout=60000)
        report["http_status"]=response.status if response else None
        await page.wait_for_function("document.readyState==='complete'",timeout=60000)
        await page.wait_for_function("document.querySelectorAll('[data-home-action]').length>=8",timeout=60000)
        await page.wait_for_timeout(2000)
        report["origin"]=await page.evaluate("location.origin")
        storage=await page.evaluate("""async()=>{let indexed=false;try{await new Promise((resolve,reject)=>{let r=indexedDB.open('proto22-probe',1);r.onsuccess=()=>{indexed=true;r.result.close();indexedDB.deleteDatabase('proto22-probe');resolve()};r.onerror=()=>reject(r.error)})}catch{};localStorage.setItem('p20','ok');sessionStorage.setItem('p20','ok');return {local:localStorage.getItem('p20')==='ok',session:sessionStorage.getItem('p20')==='ok',indexed}}""")
        assert report["origin"]=="http://127.0.0.1:8765",report["origin"]
        assert all(storage.values()),storage
        report["checks"].append("native localStorage/sessionStorage/IndexedDB: PASS")
        # Check the intended osu-like geometry and real styling, not only selector existence.
        geom=await page.evaluate("""()=>{let logo=document.querySelector('#amqMainIcon'),menu=document.querySelector('.amqHomeLandingPrimary'),head=document.querySelector('.amqPlayerFrame'),style=getComputedStyle(document.querySelector('#homeMenu'));let r=logo.getBoundingClientRect(),m=menu.getBoundingClientRect();return {homeGrid:style.display,logo:{x:r.x,y:r.y,w:r.width,h:r.height},menu:{x:m.x,y:m.y,w:m.width,h:m.height},legacyHero:getComputedStyle(document.querySelector('.hero.view-home')).display,legacyDiscover:getComputedStyle(document.querySelector('.discover.view-home')).display,css:!!document.querySelector('#amq-osu-home-redesign-v20')}}""")
        assert geom["css"] and geom["homeGrid"]=="grid",geom
        assert geom["logo"]["w"]>=220 and abs(geom["logo"]["w"]-geom["logo"]["h"])<2,geom
        assert geom["menu"]["x"]>geom["logo"]["x"]+geom["logo"]["w"]*.65,geom
        assert geom["legacyHero"]=="none" and geom["legacyDiscover"]=="none",geom
        report["desktop_geometry"]=geom
        report["checks"].append("osu-inspired desktop composition: logo left, stacked menu right, duplicate legacy sections hidden: PASS")
        broken_images=await page.evaluate("""()=>[...document.querySelectorAll('body.ui-home-menu img')].filter(i=>{const r=i.getBoundingClientRect();return r.width>0&&r.height>0&&(!i.complete||i.naturalWidth===0)}).length""")
        assert broken_images==0, {"visible_broken_images":broken_images}
        report["checks"].append("no visible broken image placeholders on homepage: PASS")
        await page.screenshot(path="proto22-desktop.png",full_page=True)
        actions=await page.locator("[data-home-action]").evaluate_all("(els)=>[...new Set(els.map(e=>e.getAttribute('data-home-action')))]")
        expected=["quiz","practiceExplore","practiceWeak","multiplayer","catalog","watchlist","learningPlan","dashboard"]
        assert all(a in actions for a in expected),{"expected":expected,"actual":actions}
        for action in expected:
            # Each action may have a hidden legacy duplicate; resolve the visible live landing action.
            visible=page.locator('#homeMenu [data-home-action="'+action+'"]:visible')
            await visible.first.click(timeout=10000)
            await page.wait_for_timeout(500)
            state=await page.evaluate("window.__aniGetActiveViewV82?.()||null")
            if action=="multiplayer":
                assert state=="multiplayer",{"action":action,"state":state}
            else:
                assert state,{"action":action,"state":state}
            report["checks"].append("homepage route "+action+": "+str(state))
            # Return home through the app's own public navigation bridge when a route hides the back button.
            await page.evaluate("""()=>{if(window.__aniNavigateApp)window.__aniNavigateApp('home');else document.querySelector('#uiBackHome')?.click()}""")
            await page.wait_for_timeout(350)
            await page.wait_for_function("document.body.classList.contains('ui-home-menu')",timeout=10000)
        # The four-workspace shell is distinct and its navigation state is real.
        await page.locator('[data-home-action="dashboard"]:visible').first.click(timeout=8000)
        await page.wait_for_timeout(250)
        assert await page.locator("#amqWorkspaceSidebar").count()==1
        assert await page.locator("#amqWorkspaceDock").count()==1
        for ws, expected in [("learning","學習中心"),("analysis","學習概況")]:
            button=page.locator('#amqWorkspaceDock [data-ws="'+ws+'"]')
            await button.click(timeout=8000)
            await page.wait_for_timeout(200)
            assert await button.get_attribute("aria-pressed")=="true"
            panel=await page.locator("#wsActions").inner_text()
            assert expected in panel, {"workspace":ws,"text":panel[:400]}
            report["checks"].append("workspace "+ws+" active and distinct: PASS")
        await page.locator('[data-ws="learning"]').click()
        learning_text=await page.locator("#wsActions").inner_text()
        for label in ["探索新歌","弱點補強","自選清單練習","間隔複習","學習計畫"]:
            assert label in learning_text, {"missing":label}
        await page.locator('[data-ws="analysis"]').click()
        analysis_text=await page.locator("#wsActions").inner_text()
        for label in ["統計儀表板","查看動畫圖鑑進度","查看清單與學習資料","學習計畫"]:
            assert label in analysis_text, {"missing":label}
        report["checks"].append("Learning Center and Analysis action sets remain separate: PASS")
        await page.screenshot(path="proto22-analysis-workspace.png",full_page=False)
        await page.locator("#wsReturnHome").click(timeout=8000)
        await page.wait_for_timeout(200)
        # Settings layer must open a visible dialog and close cleanly.
        settings=page.locator("#uiHomeSettings")
        await settings.click(timeout=8000)
        await page.wait_for_timeout(250)
        report["settings_state"]=await settings.get_attribute("aria-expanded")
        settings_visible=await page.evaluate("""()=>{const candidates=[...document.querySelectorAll('[role=dialog],dialog,[data-settings-panel],#settingsModal,#settingsDialog')];return candidates.filter(e=>{const r=e.getBoundingClientRect();return r.width>0&&r.height>0&&getComputedStyle(e).visibility!=='hidden'}).map(e=>({id:e.id,role:e.getAttribute('role'),text:(e.innerText||'').slice(0,160)}))}""")
        report["settings_visible_panels"]=settings_visible
        assert report["settings_state"] in ("true","false",None) 
        layer=page.locator("#amqSettingsLayerV21")
        await page.wait_for_function("!!document.querySelector('#amqSettingsLayerV21')",timeout=8000)
        assert await layer.is_visible(), "settings layer did not open"
        await page.screenshot(path="proto22-settings.png",full_page=False)
        report["checks"].append("settings layer visible: PASS")
        await layer.locator("button[data-settings-close]").click(timeout=5000)
        await page.wait_for_timeout(150)
        assert not await layer.is_visible(), "settings layer did not close"
        report["checks"].append("settings layer closes cleanly: PASS")
        await page.evaluate("localStorage.setItem('p20reload','yes');sessionStorage.setItem('p20reload','yes')")
        await page.reload(wait_until="domcontentloaded",timeout=60000)
        await page.wait_for_function("document.readyState==='complete'",timeout=60000)
        persisted=await page.evaluate("({l:localStorage.getItem('p20reload'),s:sessionStorage.getItem('p20reload')})")
        assert persisted=={"l":"yes","s":"yes"},persisted
        report["checks"].append("native storage reload persistence: PASS")
        await page.set_viewport_size({"width":390,"height":844})
        await page.wait_for_timeout(500)
        mobile=await page.evaluate("""()=>{let l=document.querySelector('#amqMainIcon').getBoundingClientRect(),m=document.querySelector('.amqHomeLandingPrimary').getBoundingClientRect();return {vw:innerWidth,doc:document.documentElement.scrollWidth,logo:{x:l.x,y:l.y,w:l.width,h:l.height},menu:{x:m.x,y:m.y,w:m.width,h:m.height},cols:getComputedStyle(document.querySelector('#homeMenu')).gridTemplateColumns}}""")
        assert mobile["doc"]<=mobile["vw"],mobile
        assert mobile["menu"]["x"]<mobile["vw"] and mobile["menu"]["w"]>0,mobile
        report["mobile_geometry"]=mobile
        report["checks"].append("mobile layout 390x844 and no horizontal overflow: PASS")
        await page.screenshot(path="proto22-mobile.png",full_page=True)
        report["elapsed_seconds"]=round(time.time()-start,2)
        report["console_errors"]=report["console_errors"][:80]
        await browser.close()
    assert not report["errors"],report["errors"]
    assert not report["console_errors"],report["console_errors"]
    Path("acceptance-report.json").write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding="utf-8")
    print(json.dumps(report,ensure_ascii=False,indent=2))
asyncio.run(main())
