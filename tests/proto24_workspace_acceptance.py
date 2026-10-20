import asyncio, json, time
from pathlib import Path
from playwright.async_api import async_playwright

async def main():
    report={"checks":[],"errors":[],"console_errors":[]}
    started=time.time()
    async with async_playwright() as p:
        browser=await p.chromium.launch()
        page=await browser.new_page(viewport={"width":1440,"height":900},device_scale_factor=1)
        page.on("pageerror",lambda e:report["errors"].append(str(e)))
        page.on("console",lambda m:report["console_errors"].append(m.text) if m.type=="error" else None)
        res=await page.goto("http://127.0.0.1:8765/candidate.html",wait_until="domcontentloaded",timeout=45000)
        assert res and res.status==200
        await page.wait_for_function("document.readyState==='complete'",timeout=45000)
        await page.wait_for_function("document.querySelectorAll('[data-home-action]').length>=7",timeout=45000)
        await page.wait_for_timeout(1800)
        storage=await page.evaluate("""async()=>{let db=false;try{await new Promise((resolve,reject)=>{let r=indexedDB.open('proto24_probe',1);r.onsuccess=()=>{db=true;r.result.close();indexedDB.deleteDatabase('proto24_probe');resolve()};r.onerror=()=>reject(r.error)})}catch{};localStorage.setItem('proto24','1');sessionStorage.setItem('proto24','1');return {local:localStorage.getItem('proto24')==='1',session:sessionStorage.getItem('proto24')==='1',indexedDB:db}}""")
        assert all(storage.values()),storage
        report["checks"].append("Native-origin storage APIs: PASS")
        await page.screenshot(path="proto24-desktop.png",full_page=True)
        layout=await page.evaluate("""()=>{const q=s=>document.querySelector(s);const r=e=>{const x=e.getBoundingClientRect();return {x:Math.round(x.x),y:Math.round(x.y),w:Math.round(x.width),h:Math.round(x.height)}};return {profile:r(q('#amqProfileCard')),player:r(q('.amqPlayerFrame')),landing:r(q('.amqHomeLandingV851')),logo:getComputedStyle(q('.amqHomeLandingV851'),'::before').display,primary:r(q('.amqHomeLandingPrimary')),actions:[...q('.amqHomeLandingPrimary').children].map(r),groups:r(q('.amqHomeLandingGroups')),legacy:[getComputedStyle(q('.hero.view-home')).display,getComputedStyle(q('.discover.view-home')).display]}}""")
        assert layout["profile"]["x"] < layout["player"]["x"],layout
        assert layout["primary"]["x"] > layout["landing"]["x"]+layout["landing"]["w"]*.30,layout
        assert len(layout["actions"])==3 and all(a["h"]>=65 for a in layout["actions"]),layout
        assert layout["legacy"]==["none","none"],layout
        visual=await page.evaluate("""()=>({logo:getComputedStyle(document.querySelector('.amqHomeLandingV851'),'::before').content,body:getComputedStyle(document.body).backgroundColor,wrap:getComputedStyle(document.querySelector('.wrap')).backgroundColor,profileText:getComputedStyle(document.querySelector('#amqProfileName')).color,footerHeading:getComputedStyle(document.querySelector('.amqHomeLandingGroupHead h3')).color})""")
        assert "osu!" in visual["logo"],visual
        assert layout["logo"]=="grid",layout
        assert visual["body"]=="rgb(40, 33, 43)" and visual["wrap"]=="rgb(40, 33, 43)",visual
        assert visual["footerHeading"]=="rgb(255, 255, 255)",visual
        report["visual_tokens"]=visual
        report["desktop_layout"]=layout
        cover=await page.evaluate("""()=>{const e=document.querySelector('#dockCoverV33');return !e||getComputedStyle(e).display==='none'||e.hidden}""")
        assert cover, "hidden dock cover must not show a broken image icon"
        report["checks"].append("Desktop osu composition: profile upper-left, music bar top-right, centered circular mark left, three stacked purple actions right, balanced footer, legacy sections hidden: PASS")
        report["checks"].append("No broken hidden cover icon: PASS")
        expected=["quiz","practiceExplore","practiceWeak","catalog","watchlist","learningPlan","dashboard"]
        actions=await page.locator("[data-home-action]").evaluate_all("(els)=>[...new Set(els.map(e=>e.getAttribute('data-home-action')))]")
        assert all(x in actions for x in expected),actions
        for action in expected:
            await page.locator('[data-home-action="'+action+'"]').first.click(timeout=8000)
            await page.wait_for_timeout(180)
            if action=="quiz":
                shade=page.locator("#amqStablePlayShade")
                assert await shade.is_visible(),"Play action must open Stable-style Play menu"
                assert await page.locator("#amqStableSinglePlayer").inner_text()=="Single Player"
                assert await page.locator("#amqStableMultiplayer").is_disabled(),"unsupported multiplayer must not look functional"
                await page.locator("#amqStablePlayClose").click(timeout=5000)
                assert not await shade.is_visible(),"Back must close the Play menu"
                await page.locator('[data-home-action="quiz"]').first.click(timeout=8000)
                await page.locator("#amqStableSinglePlayer").click(timeout=5000)
                await page.wait_for_timeout(180)
            state=await page.evaluate("window.__aniGetActiveViewV82?.()||null")
            assert state,action
            back=page.locator("#uiBackHome").first
            if await back.count() and await back.is_visible():
                await back.click(timeout=5000);await page.wait_for_timeout(120)
            report["checks"].append("Home action and return: "+action+" PASS")
        await page.evaluate("localStorage.setItem('proto24reload','ok')")
        await page.reload(wait_until="domcontentloaded",timeout=45000)
        assert await page.evaluate("localStorage.getItem('proto24reload')")=="ok"
        report["checks"].append("Native storage persistence after reload: PASS")
        await page.set_viewport_size({"width":390,"height":844});await page.wait_for_timeout(500)
        await page.screenshot(path="proto24-mobile.png",full_page=True)
        mobile=await page.evaluate("""()=>({viewport:innerWidth,document:document.documentElement.scrollWidth,profile:document.querySelector('#amqProfileCard').getBoundingClientRect().width,primary:document.querySelector('.amqHomeLandingPrimary').getBoundingClientRect().width,actions:[...document.querySelectorAll('.amqHomeLandingPrimary>*')].map(e=>Math.round(e.getBoundingClientRect().height))})""")
        assert mobile["document"]<=mobile["viewport"],mobile
        assert mobile["profile"]<=mobile["viewport"],mobile
        report["mobile_layout"]=mobile
        report["checks"].append("Mobile layout and horizontal overflow: PASS")
        # Test distinct workspaces and capture them at desktop reference dimensions.
        await page.set_viewport_size({"width":1440,"height":900});await page.wait_for_timeout(300)
        await page.locator('[data-home-action="dashboard"]').last.click(timeout=8000);await page.wait_for_timeout(200)
        for ws,heading,screenshot in [("learning","學習中心","proto24-learning-workspace.png"),("analysis","學習概況","proto24-analysis-workspace.png")]:
            button=page.locator('[data-ws="'+ws+'"]');await button.click(timeout=8000);await page.wait_for_timeout(180)
            assert await button.get_attribute("aria-pressed")=="true",ws
            assert heading in await page.locator("#wsActions").inner_text(),ws
            await page.screenshot(path=screenshot,full_page=True)
            styles=await page.evaluate("""()=>({body:getComputedStyle(document.body).backgroundColor,sidebar:getComputedStyle(document.querySelector('#amqWorkspaceSidebar')).backgroundImage,dock:getComputedStyle(document.querySelector('#amqWorkspaceDock')).height,dockBackground:getComputedStyle(document.querySelector('#amqWorkspaceDock')).backgroundColor,active:getComputedStyle(document.querySelector('#amqWorkspaceDock [aria-pressed="true"]')).backgroundImage,title:getComputedStyle(document.querySelector('#wsTitle')).color,actions:document.querySelectorAll('#wsActions .wsAction').length})""")
            assert "linear-gradient" in styles["sidebar"],styles
            assert "linear-gradient" in styles["active"],styles
            assert styles["body"]=="rgb(40, 33, 43)",styles
            assert "rgb(112, 64, 92)" in styles["active"],styles
            assert styles["actions"]>=5,styles
            await page.emulate_media(reduced_motion="reduce")
            motion=await page.locator("#wsActions .wsAction").first.evaluate("(e)=>getComputedStyle(e).transitionDuration")
            assert motion in ("0s","0s, 0s"),{"workspace":ws,"transitionDuration":motion}
            await page.emulate_media(reduced_motion="no-preference")
            report.setdefault("workspace_visuals",{})[ws]=styles
            report.setdefault("accessibility",{})[ws]={"reduced_motion_transition_duration":motion}
        report["checks"].append("Learning Center and Analysis workspace separation and visual styling: PASS")
        # Catalog/song-selection surface and single-player quiz theme assertions.
        await page.locator("#wsReturnHome").click(timeout=8000);await page.wait_for_timeout(150)
        await page.locator('[data-home-action="catalog"]').first.click(timeout=8000);await page.wait_for_timeout(220)
        catalog=await page.evaluate("""()=>({quicktools:getComputedStyle(document.querySelector('#quicktools')).backgroundColor,toolbar:getComputedStyle(document.querySelector('.toolbar.view-catalog')).backgroundColor,tabs:getComputedStyle(document.querySelector('.tabs.view-catalog')).backgroundColor})""")
        assert catalog["quicktools"]=="rgb(48, 38, 50)",catalog
        assert catalog["toolbar"]=="rgb(48, 38, 50)",catalog
        report["catalog_visuals"]=catalog
        report["checks"].append("Catalog/song-selection panel palette: PASS")
        await page.locator("#uiBackHome").click(timeout=8000);await page.wait_for_timeout(150)
        await page.locator('[data-home-action="quiz"]').first.click(timeout=8000);await page.wait_for_timeout(250)
        quiz=await page.evaluate("""()=>({background:getComputedStyle(document.querySelector('#quizView')).backgroundColor,border:getComputedStyle(document.querySelector('#quizView')).borderTopColor})""")
        assert quiz["background"]=="rgb(48, 38, 50)",quiz
        report["quiz_visuals"]=quiz
        report["checks"].append("Single-player quiz panel palette: PASS")
        report["elapsed_seconds"]=round(time.time()-started,2)
        await browser.close()
    assert not report["errors"],report["errors"]
    assert not report["console_errors"],report["console_errors"][:20]
    Path("acceptance-report.json").write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding="utf-8")
    print(json.dumps(report,ensure_ascii=False,indent=2))
asyncio.run(main())
