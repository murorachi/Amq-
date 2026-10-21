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
        assert await page.evaluate("window.__amqWorkspaceRouteGuardReady===true"),"workspace route lifecycle module must execute in the built candidate"
        await page.wait_for_timeout(1800)
        storage=await page.evaluate("""async()=>{let db=false;try{await new Promise((resolve,reject)=>{let r=indexedDB.open('proto24_probe',1);r.onsuccess=()=>{db=true;r.result.close();indexedDB.deleteDatabase('proto24_probe');resolve()};r.onerror=()=>reject(r.error)})}catch{};localStorage.setItem('proto24','1');sessionStorage.setItem('proto24','1');return {local:localStorage.getItem('proto24')==='1',session:sessionStorage.getItem('proto24')==='1',indexedDB:db}}""")
        assert all(storage.values()),storage
        report["checks"].append("Native-origin storage APIs: PASS")
        await page.screenshot(path="proto24-desktop.png",full_page=True)
        layout=await page.evaluate("""()=>{const q=s=>document.querySelector(s);const r=e=>{const x=e.getBoundingClientRect();return {x:Math.round(x.x),y:Math.round(x.y),w:Math.round(x.width),h:Math.round(x.height)}};return {topFrame:r(q('.amqHomeTopFrame')),topFrameOverflow:getComputedStyle(q('.amqHomeTopFrame')).overflow,profile:r(q('#amqProfileCard')),player:r(q('.amqPlayerFrame')),landing:r(q('.amqHomeLandingV851')),logo:getComputedStyle(q('.amqHomeLandingV851'),'::before').display,primary:r(q('.amqHomeLandingPrimary')),actions:[...q('.amqHomeLandingPrimary').children].map(r),groups:r(q('.amqHomeLandingGroups')),legacy:[getComputedStyle(q('.hero.view-home')).display,getComputedStyle(q('.discover.view-home')).display],catalogToolbar:getComputedStyle(q('.toolbar.view-catalog')).display,quicktools:getComputedStyle(q('#quicktools')).display,profileHeight:r(q('#amqProfileCard')).h,playerHeight:r(q('.amqPlayerFrame')).h}}""")
        assert layout["profile"]["x"] < layout["player"]["x"],layout
        assert layout["topFrame"]["y"]<=48 and layout["profile"]["y"]<=49 and layout["player"]["y"]<=49,layout
        assert layout["primary"]["x"] > layout["landing"]["x"]+layout["landing"]["w"]*.30,layout
        assert len(layout["actions"])==3 and all(a["h"]>=40 for a in layout["actions"]),layout
        assert layout["legacy"]==["none","none"],layout
        assert layout["catalogToolbar"]=="none" and layout["quicktools"]=="none",layout
        assert layout["profileHeight"]<=90 and layout["playerHeight"]<=90,layout
        assert layout["landing"]["h"]>=600,layout
        assert layout["profile"]["y"] >= layout["topFrame"]["y"] and layout["profile"]["y"]+layout["profile"]["h"] <= layout["topFrame"]["y"]+layout["topFrame"]["h"],layout
        assert layout["player"]["y"] >= layout["topFrame"]["y"] and layout["player"]["y"]+layout["player"]["h"] <= layout["topFrame"]["y"]+layout["topFrame"]["h"],layout
        visual=await page.evaluate("""()=>({logo:getComputedStyle(document.querySelector('.amqHomeLandingV851'),'::before').content,cookieBackgroundImage:getComputedStyle(document.querySelector('.amqHomeLandingV851'),'::before').backgroundImage,wrapBackgroundImage:getComputedStyle(document.querySelector('.wrap')).backgroundImage,body:getComputedStyle(document.body).backgroundColor,wrap:getComputedStyle(document.querySelector('.wrap')).backgroundColor,profileText:getComputedStyle(document.querySelector('#amqProfileName')).color,profileBackground:getComputedStyle(document.querySelector('#amqProfileCard')).backgroundColor,profileBackgroundImage:getComputedStyle(document.querySelector('#amqProfileCard')).backgroundImage,profileNameVisible:!!(document.querySelector('#amqProfileName').getClientRects().length),profileNameDisplay:getComputedStyle(document.querySelector('#amqProfileName')).display,profileNameFontSize:parseFloat(getComputedStyle(document.querySelector('#amqProfileName')).fontSize),profileAvatarWidth:document.querySelector('#amqProfileCard .amqAvatarButton').getBoundingClientRect().width,profilePpFontSize:parseFloat(getComputedStyle(document.querySelector('#amqProfileCard .ppLine strong')).fontSize),playerCaptionFontSize:parseFloat(getComputedStyle(document.querySelector('.amqPlayerCaption')).fontSize),playerTrackTitleFontSize:parseFloat(getComputedStyle(document.querySelector('#audioDock .dockMeta b')).fontSize),footerHeading:getComputedStyle(document.querySelector('.amqHomeLandingGroupHead h3')).color,actionBackgroundImage:getComputedStyle(document.querySelector('.amqHomeLandingAction')).backgroundImage,actionClipPath:getComputedStyle(document.querySelector('.amqHomeLandingAction')).clipPath,actionFontStyle:getComputedStyle(document.querySelector('.amqHomeLandingAction strong')).fontStyle,actionFontSize:parseFloat(getComputedStyle(document.querySelector('.amqHomeLandingAction strong')).fontSize),mainActionBackgroundImage:getComputedStyle(document.querySelector('.amqHomeLandingActionMain')).backgroundImage,audioPlayerDisplay:getComputedStyle(document.querySelector('#audioPlayer')).display,audioPlayerHeight:document.querySelector('#audioPlayer').getBoundingClientRect().height,audioPlayerWidth:document.querySelector('#audioPlayer').getBoundingClientRect().width,dockButtonsDisplay:getComputedStyle(document.querySelector('#audioDock .dockBtns')).display,homePlayerSlotHeight:document.querySelector('#amqHomePlayerSlot').getBoundingClientRect().height,logoDiameter:parseFloat(getComputedStyle(document.querySelector('.amqHomeLandingV851'),'::before').width),logoTransform:getComputedStyle(document.querySelector('.amqHomeLandingV851'),'::before').transform,actionHeights:[...document.querySelectorAll('.amqHomeLandingPrimary .amqHomeLandingAction')].map(e=>Math.round(e.getBoundingClientRect().height))})""")
        assert "osu!" in visual["logo"],visual
        assert layout["logo"]=="grid",layout
        assert visual["logoDiameter"]>=400 and "matrix(" in visual["logoTransform"],visual
        assert visual["cookieBackgroundImage"].count("linear-gradient")>=2,visual
        assert "repeating-conic-gradient" in visual["wrapBackgroundImage"],visual
        assert len(visual["actionHeights"])==3 and all(h>=68 for h in visual["actionHeights"]),visual
        assert visual["body"]=="rgb(40, 33, 43)" and visual["wrap"]=="rgb(40, 33, 43)",visual
        assert visual["footerHeading"]=="rgb(255, 255, 255)",visual
        assert "linear-gradient" in visual["actionBackgroundImage"] and "linear-gradient" in visual["mainActionBackgroundImage"],visual
        assert visual["actionFontStyle"]=="italic" and visual["actionFontSize"]>=20,visual
        assert visual["actionClipPath"] != "none",visual
        assert visual["audioPlayerDisplay"]!="none" and visual["audioPlayerHeight"]>=28 and visual["audioPlayerWidth"]>=200,visual
        assert visual["dockButtonsDisplay"]=="none" and visual["homePlayerSlotHeight"]<=54,visual
        assert visual["profileNameVisible"] and visual["profileNameDisplay"]!="none",visual
        assert 14<=visual["profileNameFontSize"]<=16 and 42<=visual["profileAvatarWidth"]<=46,visual
        assert 19<=visual["profilePpFontSize"]<=21 and visual["playerCaptionFontSize"]>=9 and visual["playerTrackTitleFontSize"]>=12,visual
        assert "linear-gradient" in visual["profileBackgroundImage"],visual
        assert visual["profileBackground"] not in ("rgb(255, 255, 255)","rgb(255, 250, 255)"),visual
        report["visual_tokens"]=visual
        report["desktop_layout"]=layout
        cover=await page.evaluate("""()=>{const e=document.querySelector('#dockCoverV33');return !e||getComputedStyle(e).display==='none'||e.hidden}""")
        assert cover, "hidden dock cover must not show a broken image icon"
        report["checks"].append("Desktop osu composition: compact profile/player strip, circular osu-style mark left, compact horizontal menu rows right, utility links minimized, catalog hidden on home: PASS")
        report["checks"].append("No broken hidden cover icon: PASS")
        expected=["quiz","practiceExplore","practiceWeak","catalog","watchlist","learningPlan","dashboard"]
        actions=await page.locator("[data-home-action]").evaluate_all("(els)=>[...new Set(els.map(e=>e.getAttribute('data-home-action')))]")
        assert all(x in actions for x in expected),actions
        for action in expected:
            selector = ('.amqHomeLandingPrimary' if action in ('quiz','practiceExplore','practiceWeak') else '.amqHomeLandingLinks') + ' [data-home-action="'+action+'"]'
            await page.locator(selector).click(timeout=8000)
            await page.wait_for_timeout(180)
            if action=="quiz":
                shade=page.locator("#amqStablePlayShade")
                await page.screenshot(path="proto25-play-menu.png",full_page=False)
                assert await shade.is_visible(),"Play action must open Stable-style Play menu"
                assert await page.locator("#amqStableSinglePlayer").inner_text()=="Single Player"
                assert not await page.locator("#amqStableMultiplayer").is_disabled(),"Multiplayer must remain available through the existing AMQ route"
                assert await page.locator("#amqStableMultiplayer").inner_text()=="Multiplayer"
                play_desktop=await page.evaluate("({columns:getComputedStyle(document.querySelector('#amqStablePlayPanel')).gridTemplateColumns,height:document.querySelector('#amqStablePlayPanel').getBoundingClientRect().height})")
                assert len(play_desktop["columns"].split())==2,play_desktop
                report["play_menu_desktop"]=play_desktop
                play_visual=await page.evaluate("""()=>({shadeBackgroundImage:getComputedStyle(document.querySelector('#amqStablePlayShade')).backgroundImage,background:getComputedStyle(document.querySelector('#amqStableSinglePlayer')).backgroundImage,clipPath:getComputedStyle(document.querySelector('#amqStableSinglePlayer')).clipPath,buttonHeight:document.querySelector('#amqStableSinglePlayer').getBoundingClientRect().height,buttonFontStyle:getComputedStyle(document.querySelector('#amqStableSinglePlayer')).fontStyle,buttonFontSize:parseFloat(getComputedStyle(document.querySelector('#amqStableSinglePlayer')).fontSize),logoDiameter:parseFloat(getComputedStyle(document.querySelector('#amqStablePlayPanel'),'::before').width),logoTransform:getComputedStyle(document.querySelector('#amqStablePlayPanel'),'::before').transform,cookieBackgroundImage:getComputedStyle(document.querySelector('#amqStablePlayPanel'),'::before').backgroundImage,buttonHeights:[...document.querySelectorAll('#amqStablePlayChoices button')].map(e=>Math.round(e.getBoundingClientRect().height)),buttonWidth:document.querySelector('#amqStableSinglePlayer').getBoundingClientRect().width,buttonWidths:[...document.querySelectorAll('#amqStablePlayChoices button')].map(e=>Math.round(e.getBoundingClientRect().width)),noticeDisplay:getComputedStyle(document.querySelector('#amqStablePlayNotice')).display})""")
                assert "linear-gradient" in play_visual["background"] and play_visual["clipPath"]!="none" and play_visual["buttonHeight"]>=88,play_visual
                assert "repeating-conic-gradient" in play_visual["shadeBackgroundImage"],play_visual
                assert play_visual["buttonFontStyle"]=="italic" and play_visual["buttonFontSize"]>=20,play_visual
                assert play_visual["logoDiameter"]>=450 and "matrix(" in play_visual["logoTransform"],play_visual
                assert play_visual["cookieBackgroundImage"].count("linear-gradient")>=2,play_visual
                assert len(play_visual["buttonHeights"])==3 and all(h>=88 for h in play_visual["buttonHeights"]),play_visual
                assert play_visual["buttonWidth"]>=480 and len(set(play_visual["buttonWidths"]))==1,play_visual
                assert play_visual["noticeDisplay"]=="none",play_visual
                report["play_menu_visual"]=play_visual
                await page.set_viewport_size({"width":390,"height":844});await page.wait_for_timeout(120)
                play_mobile=await page.evaluate("({viewport:innerWidth,document:document.documentElement.scrollWidth,shade:document.querySelector('#amqStablePlayShade').getBoundingClientRect().width,panel:document.querySelector('#amqStablePlayPanel').getBoundingClientRect().width,columns:getComputedStyle(document.querySelector('#amqStablePlayPanel')).gridTemplateColumns})")
                assert play_mobile["document"]<=play_mobile["viewport"] and play_mobile["panel"]<=play_mobile["viewport"] and len(play_mobile["columns"].split())==1,play_mobile
                report["play_menu_mobile"]=play_mobile
                await page.screenshot(path="proto25-play-menu-mobile.png",full_page=False)
                await page.locator("#amqStablePlayClose").click(timeout=5000)
                assert not await shade.is_visible(),"Back must close the Play menu"
                await page.set_viewport_size({"width":1440,"height":900});await page.wait_for_timeout(100)
                await page.locator('.amqHomeLandingPrimary [data-home-action="quiz"]').click(timeout=8000)
                await page.locator("#amqStableSinglePlayer").click(timeout=5000)
                await page.wait_for_timeout(180)
                await page.screenshot(path="proto25-quiz.png",full_page=False)
            state=await page.evaluate("window.__aniGetActiveViewV82?.()||null")
            report.setdefault("home_route_states",{})[action]=state
            assert state,action
            back=page.locator("#uiBackHome").first
            if await back.count() and await back.is_visible():
                await back.click(timeout=5000);await page.wait_for_timeout(120)
            report["checks"].append("Home action and return: "+action+" PASS")
        # Verify Play -> Multiplayer reaches the existing room setup without claiming server connectivity.
        await page.locator('[data-home-action="quiz"]').first.click(timeout=8000)
        await page.locator("#amqStableMultiplayer").click(timeout=5000);await page.wait_for_timeout(250)
        multiplayer_state=await page.evaluate("window.__aniGetActiveViewV82?.()||null")
        assert multiplayer_state=="multiplayer",{"active_view":multiplayer_state}
        multiplayer_visual=await page.evaluate("()=>({background:getComputedStyle(document.querySelector('#multiplayerView')).backgroundColor,border:getComputedStyle(document.querySelector('#multiplayerView')).borderTopColor})")
        assert multiplayer_visual["background"]=="rgb(48, 38, 50)",multiplayer_visual
        report["multiplayer_visuals"]=multiplayer_visual
        report["checks"].append("Play menu Multiplayer route and room UI palette: PASS (server connectivity not tested)")
        await page.locator("#mpBackHome").click(timeout=8000);await page.wait_for_timeout(150)
        # Settings panel opens the existing real controls without hiding or replacing them.
        await page.locator("#uiHomeSettings").click(timeout=8000);await page.wait_for_timeout(100)
        settings_desktop=await page.evaluate("({x:document.querySelector('.top .actions').getBoundingClientRect().x,width:document.querySelector('.top .actions').getBoundingClientRect().width,background:getComputedStyle(document.querySelector('.top .actions')).backgroundColor})")
        assert settings_desktop["x"]<=10 and 336<=settings_desktop["width"]<=344,settings_desktop
        report["settings_desktop"]=settings_desktop
        await page.screenshot(path="proto25-settings-desktop.png",full_page=False)
        await page.locator("#uiHomeSettings").click(timeout=8000);await page.wait_for_timeout(100)
        await page.set_viewport_size({"width":390,"height":844});await page.wait_for_timeout(100)
        await page.locator("#uiHomeSettings").click(timeout=8000);await page.wait_for_timeout(100)
        settings_mobile=await page.evaluate("({viewport:innerWidth,document:document.documentElement.scrollWidth,panel:document.querySelector('.top .actions').getBoundingClientRect().width})")
        assert settings_mobile["document"]<=settings_mobile["viewport"] and settings_mobile["panel"]<=settings_mobile["viewport"],settings_mobile
        report["settings_mobile"]=settings_mobile
        await page.screenshot(path="proto25-settings-mobile.png",full_page=False)
        assert await page.locator("body").evaluate("(e)=>e.classList.contains('ui-settings-open')")
        assert await page.locator("#themeToggle").is_visible()
        assert await page.locator("#sceneBackgroundOpen").is_visible()
        settings_style=await page.locator(".top .actions").evaluate("(e)=>({backgroundColor:getComputedStyle(e).backgroundColor,backgroundImage:getComputedStyle(e).backgroundImage})")
        assert "linear-gradient" in settings_style["backgroundImage"],settings_style
        report["settings_visuals"]={**settings_style,"themeToggleVisible":True,"sceneBackgroundVisible":True}
        await page.locator("#sceneBackgroundOpen").click(timeout=8000);await page.wait_for_timeout(150)
        assert await page.locator("#amqSceneBgShade").is_visible(),"scene-background dialog should open"
        scene_mobile=await page.evaluate("({viewport:innerWidth,document:document.documentElement.scrollWidth,dialog:document.querySelector('#amqSceneBgDialog').getBoundingClientRect().width,background:getComputedStyle(document.querySelector('#amqSceneBgDialog')).backgroundColor})")
        assert scene_mobile["document"]<=scene_mobile["viewport"] and scene_mobile["dialog"]<=scene_mobile["viewport"],scene_mobile
        assert scene_mobile["background"]=="rgb(40, 33, 43)",scene_mobile
        report["scene_background_mobile"]=scene_mobile
        await page.locator("#sceneBgClose").click(timeout=8000);await page.wait_for_timeout(100)
        report["checks"].append("Home Settings and scene-background dialog: PASS")
        await page.locator("#uiHomeSettings").click(timeout=8000);await page.wait_for_timeout(100)
        await page.set_viewport_size({"width":1440,"height":900});await page.wait_for_timeout(100)
        await page.evaluate("localStorage.setItem('proto24reload','ok')")
        await page.reload(wait_until="domcontentloaded",timeout=45000)
        assert await page.evaluate("localStorage.getItem('proto24reload')")=="ok"
        report["checks"].append("Native storage persistence after reload: PASS")
        await page.set_viewport_size({"width":390,"height":844});await page.wait_for_timeout(500)
        await page.screenshot(path="proto24-mobile.png",full_page=True)
        mobile=await page.evaluate("""()=>{const r=e=>{const x=e.getBoundingClientRect();return {x:Math.round(x.x),y:Math.round(x.y),w:Math.round(x.width),h:Math.round(x.height)}};return {viewport:innerWidth,document:document.documentElement.scrollWidth,profileAvatarWidth:document.querySelector('#amqProfileCard .amqAvatarButton').getBoundingClientRect().width,profileNameFontSize:parseFloat(getComputedStyle(document.querySelector('#amqProfileName')).fontSize),topFrame:r(document.querySelector('.amqHomeTopFrame')),profile:r(document.querySelector('#amqProfileCard')),player:r(document.querySelector('.amqPlayerFrame')),audio:r(document.querySelector('#audioPlayer')),audioDisplay:getComputedStyle(document.querySelector('#audioPlayer')).display,primary:document.querySelector('.amqHomeLandingPrimary').getBoundingClientRect().width,actions:[...document.querySelectorAll('.amqHomeLandingPrimary>*')].map(e=>Math.round(e.getBoundingClientRect().height))}}""")
        assert mobile["document"]<=mobile["viewport"],mobile
        assert 38<=mobile["profileAvatarWidth"]<=42 and 13<=mobile["profileNameFontSize"]<=15,mobile
        assert mobile["profile"]["w"]<=mobile["viewport"],mobile
        assert mobile["player"]["y"]>mobile["profile"]["y"] and mobile["player"]["h"]==78,mobile
        assert mobile["profile"]["y"]+mobile["profile"]["h"]<=mobile["topFrame"]["y"]+mobile["topFrame"]["h"] and mobile["player"]["y"]+mobile["player"]["h"]<=mobile["topFrame"]["y"]+mobile["topFrame"]["h"],mobile
        assert mobile["audioDisplay"]!="none" and mobile["audio"]["w"]>=300 and mobile["audio"]["h"]>=28,mobile
        report["mobile_layout"]=mobile
        report["checks"].append("Mobile layout and horizontal overflow: PASS")
        # Test distinct workspaces and capture them at desktop reference dimensions.
        await page.set_viewport_size({"width":1440,"height":900});await page.wait_for_timeout(300)
        await page.locator('.amqHomeLandingLinks [data-home-action="dashboard"]').click(timeout=8000);await page.wait_for_timeout(200)
        for ws,heading,screenshot in [("learning","學習中心","proto24-learning-workspace.png"),("analysis","學習概況","proto24-analysis-workspace.png")]:
            button=page.locator('[data-ws="'+ws+'"]');await button.click(timeout=8000);await page.wait_for_timeout(180)
            assert await button.get_attribute("aria-pressed")=="true",ws
            assert heading in await page.locator("#wsActions").inner_text(),ws
            await page.screenshot(path=screenshot,full_page=True)
            styles=await page.evaluate("""()=>({body:getComputedStyle(document.body).backgroundColor,sidebar:getComputedStyle(document.querySelector('#amqWorkspaceSidebar')).backgroundImage,dock:getComputedStyle(document.querySelector('#amqWorkspaceDock')).height,dockBackground:getComputedStyle(document.querySelector('#amqWorkspaceDock')).backgroundColor,active:getComputedStyle(document.querySelector('#amqWorkspaceDock [aria-pressed="true"]')).backgroundImage,title:getComputedStyle(document.querySelector('#wsTitle')).color,legacyPanel:getComputedStyle(document.querySelector('.v10Panel')).backgroundColor,actions:document.querySelectorAll('#wsActions .wsAction').length,audioDockHeight:document.querySelector('#audioDock').getBoundingClientRect().height,audioPlayerHeight:document.querySelector('#audioPlayer').getBoundingClientRect().height,wrapPaddingBottom:parseFloat(getComputedStyle(document.querySelector('.wrap')).paddingBottom),dashIntro:getComputedStyle(document.querySelector('.dashIntro')).backgroundColor,dashMetric:getComputedStyle(document.querySelector('.dashMetric')).backgroundColor,dashSection:getComputedStyle(document.querySelector('.dashSection')).backgroundColor})""")
            assert "linear-gradient" in styles["sidebar"],styles
            assert "linear-gradient" in styles["active"],styles
            assert styles["body"]=="rgb(40, 33, 43)",styles
            assert styles["legacyPanel"]=="rgb(48, 38, 50)",styles
            assert styles["dashIntro"]=="rgb(48, 38, 50)" and styles["dashMetric"]=="rgb(53, 44, 57)" and styles["dashSection"]=="rgb(48, 38, 50)",styles
            assert "rgb(112, 64, 92)" in styles["active"],styles
            assert styles["actions"]>=5,styles
            assert styles["audioDockHeight"]<=60 and styles["audioPlayerHeight"]>=28 and styles["wrapPaddingBottom"]>=150,styles
            await page.emulate_media(reduced_motion="reduce")
            motion=await page.locator("#wsActions .wsAction").first.evaluate("(e)=>getComputedStyle(e).transitionDuration")
            assert motion in ("0s","0s, 0s"),{"workspace":ws,"transitionDuration":motion}
            await page.emulate_media(reduced_motion="no-preference")
            report.setdefault("workspace_visuals",{})[ws]=styles
            light_panels=await page.evaluate("""()=>[...document.querySelectorAll('body *')].map(e=>{const r=e.getBoundingClientRect(),c=getComputedStyle(e),m=c.backgroundColor.match(/\\d+/g)?.map(Number)||[],pale=m.length>=3&&m.slice(0,3).every(v=>v>=220),lightImage=c.backgroundImage.includes('rgb(255')||c.backgroundImage.includes('#fff');return {tag:e.tagName.toLowerCase(),id:e.id||'',className:typeof e.className==='string'?e.className:'',text:(e.innerText||'').trim().slice(0,90),background:c.backgroundColor,backgroundImage:c.backgroundImage,pale,lightImage,x:Math.round(r.x),y:Math.round(r.y),w:Math.round(r.width),h:Math.round(r.height),area:Math.round(r.width*r.height)}}).filter(e=>e.w>=400&&e.h>=28&&e.area>=12000&&(e.pale||e.lightImage)&&e.id!=='amqWorkspaceSidebar').sort((a,b)=>b.area-a.area).slice(0,20)""")
            report.setdefault("workspace_light_panels",{})[ws]=light_panels
            report.setdefault("accessibility",{})[ws]={"reduced_motion_transition_duration":motion}
        report["checks"].append("Learning Center and Analysis workspace separation and visual styling: PASS")
        # Catalog/song-selection surface and single-player quiz theme assertions.
        await page.locator("#uiBackHome").click(timeout=8000);await page.wait_for_timeout(180)
        assert await page.evaluate("window.__aniGetActiveViewV82?.()")=="home","Workspace return must restore the actual home view before catalog routing"
        assert not await page.locator("body").evaluate("(e)=>e.classList.contains('amq-workspace-active')"),"Returning home must deactivate the workspace shell"
        assert not await page.locator("#amqWorkspaceSidebar").is_visible(),"Workspace sidebar must not cover standalone home/catalog routes"
        assert not await page.locator("#amqWorkspaceDock").is_visible(),"Workspace dock must not cover standalone home/catalog routes"
        await page.locator('.amqHomeLandingLinks [data-home-action="catalog"]').click(timeout=8000);await page.wait_for_timeout(220)
        assert await page.evaluate("window.__aniGetActiveViewV82?.()")=="catalog","Catalog action must navigate to the catalog view"
        assert await page.locator("#grid.view-catalog").is_visible(),"Catalog action must open the visible catalog grid"
        catalog=await page.evaluate("""()=>({quicktools:getComputedStyle(document.querySelector('#quicktools')).backgroundColor,toolbar:getComputedStyle(document.querySelector('.toolbar.view-catalog')).backgroundColor,toolbarDisplay:getComputedStyle(document.querySelector('.toolbar.view-catalog')).display,tabs:getComputedStyle(document.querySelector('.tabs.view-catalog')).backgroundColor,audioDockHeight:document.querySelector('#audioDock').getBoundingClientRect().height,audioPlayerHeight:document.querySelector('#audioPlayer').getBoundingClientRect().height,audioPlayerDisplay:getComputedStyle(document.querySelector('#audioPlayer')).display,wrapPaddingBottom:parseFloat(getComputedStyle(document.querySelector('.wrap')).paddingBottom),summaryHeight:document.querySelector('.hero.view-home .heroDashboard').getBoundingClientRect().height,quicktoolsHeight:document.querySelector('#quicktools').getBoundingClientRect().height,toolbarHeight:document.querySelector('.toolbar.view-catalog').getBoundingClientRect().height,tabsHeight:document.querySelector('.tabs.view-catalog').getBoundingClientRect().height,headHeight:document.querySelector('.head.view-catalog').getBoundingClientRect().height,gridTop:document.querySelector('#grid.view-catalog').getBoundingClientRect().top,toolrowWidths:[...document.querySelectorAll('#quicktools .toolrow')].map(e=>({client:e.clientWidth,scroll:e.scrollWidth})),unresolvedVisibleCoverImages:[...document.querySelectorAll('#grid.view-catalog img.realcover')].filter(img=>!img.getAttribute('src')&&getComputedStyle(img).display!=='none').length})""")
        assert catalog["quicktools"]=="rgb(48, 38, 50)",catalog
        assert catalog["audioDockHeight"]<=60 and catalog["audioPlayerHeight"]>=28 and catalog["audioPlayerDisplay"]!="none",catalog
        assert catalog["wrapPaddingBottom"]>=80,catalog
        assert catalog["summaryHeight"]<=160 and catalog["quicktoolsHeight"]<=240 and catalog["toolbarHeight"]<=120 and catalog["tabsHeight"]<=52 and catalog["headHeight"]<=50,catalog
        assert catalog["gridTop"]<=740,catalog
        assert all(row["scroll"]<=row["client"]+2 for row in catalog["toolrowWidths"]),catalog
        assert catalog["unresolvedVisibleCoverImages"]==0,catalog
        assert catalog["toolbar"] not in ("rgb(255, 255, 255)","rgb(255, 250, 255)") and catalog["toolbarDisplay"]=="grid",catalog
        await page.set_viewport_size({"width":390,"height":844});await page.wait_for_timeout(120)
        catalog_mobile=await page.evaluate("({viewport:innerWidth,document:document.documentElement.scrollWidth,toolbar:document.querySelector('.toolbar.view-catalog').getBoundingClientRect().width,quicktools:document.querySelector('#quicktools').getBoundingClientRect().width})")
        assert catalog_mobile["document"]<=catalog_mobile["viewport"] and catalog_mobile["toolbar"]<=catalog_mobile["viewport"],catalog_mobile
        report["catalog_mobile"]=catalog_mobile
        await page.set_viewport_size({"width":1440,"height":900});await page.wait_for_timeout(100)
        report["catalog_visuals"]=catalog
        catalog_state=await page.evaluate("window.__aniGetActiveViewV82?.()||null")
        assert catalog_state=="catalog",{"active_view":catalog_state}
        assert await page.locator("#grid.view-catalog").is_visible(),"catalog grid must be visible before catalog screenshot"
        catalog_shell=await page.evaluate("""()=>({bodyClass:document.body.className,sidebarDisplay:getComputedStyle(document.querySelector('#amqWorkspaceSidebar')).display,dockDisplay:getComputedStyle(document.querySelector('#amqWorkspaceDock')).display,gridDisplay:getComputedStyle(document.querySelector('#grid.view-catalog')).display,gridHidden:document.querySelector('#grid.view-catalog').hidden,homeMenuDisplay:getComputedStyle(document.querySelector('#homeMenu')).display,activeView:window.__aniGetActiveViewV82?.()})""")
        assert "amq-standalone-route" in catalog_shell["bodyClass"],f"catalog route guard did not mark standalone route: {catalog_shell}"
        assert not await page.locator("#amqWorkspaceSidebar").is_visible(),f"workspace sidebar must not cover standalone catalog: {catalog_shell}"
        await page.screenshot(path="proto25-catalog.png",full_page=False)
        report["checks"].append("Catalog route, visible catalog grid and standalone layout: PASS")
        await page.wait_for_function("document.querySelectorAll('#grid.view-catalog .card').length>0",timeout=20000)
        await page.evaluate("window.scrollTo(0,document.documentElement.scrollHeight)")
        await page.wait_for_timeout(150)
        catalog_bottom=await page.evaluate("""()=>{const card=document.querySelector('#grid.view-catalog .card:last-child'),dock=document.querySelector('#audioDock'),c=card.getBoundingClientRect(),d=dock.getBoundingClientRect();return {lastCardBottom:Math.round(c.bottom),lastCardTop:Math.round(c.top),dockTop:Math.round(d.top),dockHeight:Math.round(d.height),viewport:innerHeight,scrollY:scrollY,documentHeight:document.documentElement.scrollHeight,wrapperPaddingBottom:parseFloat(getComputedStyle(document.querySelector('.wrap')).paddingBottom),atDocumentEnd:Math.abs(scrollY+innerHeight-document.documentElement.scrollHeight)<=2}}""")
        assert catalog_bottom["atDocumentEnd"], f"scroll clearance check must run at document end: {catalog_bottom}"
        assert catalog_bottom["lastCardBottom"] <= catalog_bottom["dockTop"]-2, f"last catalog row must remain fully above the fixed audio dock after scrolling to the end: {catalog_bottom}"
        assert catalog_bottom["wrapperPaddingBottom"] >= catalog_bottom["dockHeight"]+80, catalog_bottom
        report["catalog_bottom_clearance"]=catalog_bottom
        report["checks"].append("Catalog final-row scroll clearance above fixed audio dock: PASS")
        await page.evaluate("window.scrollTo(0,0)")
        await page.locator("#grid.view-catalog .card").first.click(timeout=10000);await page.wait_for_timeout(250)
        await page.wait_for_function("document.querySelector('#overlay')?.classList.contains('open')",timeout=8000)
        song_select=await page.evaluate("()=>({width:document.querySelector('#overlay .drawer').getBoundingClientRect().width,columns:getComputedStyle(document.querySelector('#overlay .drawer')).gridTemplateColumns,rows:document.querySelectorAll('#songlist .songrow').length,overlayZ:Number(getComputedStyle(document.querySelector('#overlay')).zIndex),sidebarZ:Number(getComputedStyle(document.querySelector('#amqWorkspaceSidebar')).zIndex),dockZ:Number(getComputedStyle(document.querySelector('#amqWorkspaceDock')).zIndex)})")
        assert song_select["width"]>=1400 and len(song_select["columns"].split())==2,song_select
        assert song_select["overlayZ"]>max(song_select["sidebarZ"],song_select["dockZ"]),song_select
        report["catalog_detail_visuals"]=song_select
        await page.screenshot(path="proto25-catalog-detail.png",full_page=False)
        await page.set_viewport_size({"width":390,"height":844});await page.wait_for_timeout(120)
        song_mobile=await page.evaluate("({viewport:innerWidth,document:document.documentElement.scrollWidth,drawer:document.querySelector('#overlay .drawer').getBoundingClientRect().width,columns:getComputedStyle(document.querySelector('#overlay .drawer')).gridTemplateColumns})")
        assert song_mobile["document"]<=song_mobile["viewport"] and song_mobile["drawer"]<=song_mobile["viewport"],song_mobile
        report["catalog_detail_mobile"]=song_mobile
        await page.locator("#close").click(timeout=8000);await page.wait_for_timeout(120)
        await page.set_viewport_size({"width":1440,"height":900});await page.wait_for_timeout(100)
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
