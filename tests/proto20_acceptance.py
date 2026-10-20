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
        storage=await page.evaluate("""async()=>{let indexed=false;try{await new Promise((resolve,reject)=>{let r=indexedDB.open('proto20-probe',1);r.onsuccess=()=>{indexed=true;r.result.close();indexedDB.deleteDatabase('proto20-probe');resolve()};r.onerror=()=>reject(r.error)})}catch{};localStorage.setItem('p20','ok');sessionStorage.setItem('p20','ok');return {local:localStorage.getItem('p20')==='ok',session:sessionStorage.getItem('p20')==='ok',indexed}}""")
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
        await page.screenshot(path="proto20-desktop.png",full_page=True)
        actions=await page.locator("[data-home-action]").evaluate_all("(els)=>[...new Set(els.map(e=>e.getAttribute('data-home-action')))]")
        expected=["quiz","practiceExplore","practiceWeak","multiplayer","catalog","watchlist","learningPlan","dashboard"]
        assert all(a in actions for a in expected),{"expected":expected,"actual":actions}
        for action in expected:
            await page.locator('[data-home-action="'+action+'"]').first.click(timeout=10000)
            await page.wait_for_timeout(350)
            state=await page.evaluate("window.__aniGetActiveViewV82?.()||null")
            if action=="multiplayer":
                assert state=="multiplayer",{"action":action,"state":state}
            else:
                assert state,{"action":action,"state":state}
            report["checks"].append("homepage route "+action+": "+str(state))
            back=page.locator("#uiBackHome").first
            if await back.count() and await back.is_visible():
                await back.click(timeout=8000)
                await page.wait_for_timeout(250)
        # Settings layer must be operable and not throw.
        settings=page.locator("#uiHomeSettings")
        await settings.click(timeout=8000)
        await page.wait_for_timeout(250)
        report["settings_state"]=await settings.get_attribute("aria-expanded")
        report["checks"].append("settings entry clicked: PASS (expanded="+str(report["settings_state"])+")")
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
        await page.screenshot(path="proto20-mobile.png",full_page=True)
        report["elapsed_seconds"]=round(time.time()-start,2)
        report["console_errors"]=report["console_errors"][:80]
        await browser.close()
    assert not report["errors"],report["errors"]
    assert not report["console_errors"],report["console_errors"]
    Path("acceptance-report.json").write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding="utf-8")
    print(json.dumps(report,ensure_ascii=False,indent=2))
asyncio.run(main())
