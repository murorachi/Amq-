from pathlib import Path
import hashlib
import json
from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[2]
SCREENSHOT_DIR = ROOT / "engineering/proto26-song-select"
SCREENSHOT_DIR.mkdir(parents=True, exist_ok=True)
HTML = ROOT / "dist/amq_learning_tool_v82_85_30_workspace_proto26_song_select_13.html"
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
    try:
        page.wait_for_function("""() => window.__amqProto26SongSelect?.getMode?.() === 'amq' &&
            document.querySelectorAll('#grid > .card').length > 0""", timeout=12000)
    except Exception:
        pass
    check(page.evaluate("window.__amqProto26SongSelect?.getMode?.() === 'amq'"), "initial Song Select source mode is AMQ")
    check(page.locator("#grid > .card").count() > 0, "default AMQ mode renders the real legacy catalog cards")
    check(page.locator("#grid > .p26-work-card").count() == 0, "default AMQ mode does not leak EMQ-only work cards")
    check(page.locator("#grid > .card").count() >= 3, "default AMQ catalog contains multiple real AMQ cards")
    page.set_viewport_size({"width": 1280, "height": 720})
    page.wait_for_timeout(250)
    density = page.evaluate("""() => {
        const grid=document.querySelector('#grid'), cards=[...grid.querySelectorAll(':scope > .card')];
        const stage=document.querySelector('#amqSongSelectStage');
        const player=document.querySelector('#amqAudioPlayer, #audioPlayer, .audio-player, #playerBar');
        const gr=grid.getBoundingClientRect(), sr=stage.getBoundingClientRect();
        const mount=document.querySelector('#p32Mount'), catalog=grid.closest('.p32-catalog');
        const mr=mount?.getBoundingClientRect(), cr=catalog?.getBoundingClientRect();
        const mountChildren=mount?[...mount.children].map(el=>{const r=el.getBoundingClientRect(),cs=getComputedStyle(el);return {tag:el.tagName,id:el.id,cls:typeof el.className==='string'?el.className:'',y:Math.round(r.y),height:Math.round(r.height),display:cs.display,flex:cs.flex,heightStyle:cs.height,overflow:cs.overflowY,gridColumns:cs.gridTemplateColumns,flexWrap:cs.flexWrap,children:[...el.children].map(ch=>{const cr=ch.getBoundingClientRect(),cc=getComputedStyle(ch);return {tag:ch.tagName,id:ch.id,cls:typeof ch.className==='string'?ch.className:'',y:Math.round(cr.y),h:Math.round(cr.height),w:Math.round(cr.width),gridColumn:cc.gridColumn,display:cc.display}})}}):[];
        const visible=cards.filter(el=>{const r=el.getBoundingClientRect();return r.bottom>gr.top && r.top<gr.bottom && r.top<window.innerHeight && r.bottom>0;});
        return {cardCount:cards.length,visibleCardCount:visible.length,gridHeight:Math.round(gr.height),gridScrollHeight:grid.scrollHeight,gridOverflow:getComputedStyle(grid).overflowY,gridStyle:{display:getComputedStyle(grid).display,flex:getComputedStyle(grid).flex,height:getComputedStyle(grid).height,parent:grid.parentElement?.id,parentDisplay:getComputedStyle(grid.parentElement).display},mountRect:mr?{y:Math.round(mr.y),height:Math.round(mr.height)}:null,mountStyle:mount?{display:getComputedStyle(mount).display,flex:getComputedStyle(mount).flex,height:getComputedStyle(mount).height}:null,mountChildren,catalogRect:cr?{y:Math.round(cr.y),height:Math.round(cr.height)}:null,catalogStyle:catalog?{display:getComputedStyle(catalog).display,flex:getComputedStyle(catalog).flex,height:getComputedStyle(catalog).height}:null,stageHeight:Math.round(sr.height),stageBottom:Math.round(sr.bottom),viewportHeight:window.innerHeight,playerBottom:player?Math.round(player.getBoundingClientRect().bottom):null};
    }""")
    print("CATALOG_DENSITY_1280x720=" + json.dumps(density, ensure_ascii=False))
    check(density["visibleCardCount"] >= 6, "at least six real AMQ catalog cards intersect the internal scroll viewport at 1280x720")
    check(density["gridOverflow"] in ("auto", "scroll"), "catalog grid owns vertical scrolling instead of extending behind the player")
    check(page.locator("#proto26SongModes").is_visible(), "source controls are scoped to the catalog view")
    # The central feature art should remain complete without a saved background, then reveal the
    # existing scene image gently when the Catalog background setting is active.
    fallback_style = page.locator("#amqSongSelectStage .p32-scene").evaluate("(el) => ({backgroundImage:getComputedStyle(el).backgroundImage,backdropFilter:getComputedStyle(el).backdropFilter})")
    check("radial-gradient" in fallback_style["backgroundImage"], "feature stage keeps its designed fallback when no scene background is configured")
    had_scene_bg = page.locator("body").evaluate("(el) => el.classList.contains('amq-custom-bg-active')")
    page.locator("body").evaluate("(el) => { el.classList.add('amq-custom-bg-active'); el.dataset.amqScene='catalog'; }")
    configured_style = page.locator("#amqSongSelectStage .p32-scene").evaluate("(el) => ({backgroundImage:getComputedStyle(el).backgroundImage,backdropFilter:getComputedStyle(el).backdropFilter})")
    print("SCENE_BACKGROUND_STYLE_DEBUG=" + json.dumps({"fallback":fallback_style,"configured":configured_style,"element":page.locator("#amqSongSelectStage .p32-scene").evaluate("(el) => ({tag:el.tagName,id:el.id,cls:el.className,parent:el.parentElement?.id,matched:el.matches(\'#amqSongSelectStage .p32-scene\'),display:getComputedStyle(el).display,styleTag:document.querySelector(\'#amq-proto32-song-select-css\')?.textContent.length||0,ruleCount:document.querySelector(\'#amq-proto32-song-select-css\')?.sheet?.cssRules.length||0})")}, ensure_ascii=False))
    check(configured_style["backgroundImage"] != fallback_style["backgroundImage"], "feature stage blends with the configured Catalog scene background")
    if not had_scene_bg:
        page.locator("body").evaluate("(el) => el.classList.remove('amq-custom-bg-active')")

    check(not page.locator("section.hero.view-home").is_visible(), "home collection hero is hidden in Song Select")
    check(not page.locator("#quicktools").is_visible(), "batch tools do not dominate the default Song Select view")
    check(not page.locator("#amqWorkspaceSidebar").is_visible(), "workspace action sidebar is hidden until a workspace is selected")
    check(page.locator("#amqWorkspaceDock").is_visible(), "existing workspace dock is visible in Song Select")
    check(page.locator("#uiHomeSettings").is_visible() and page.locator("#uiBackHome").is_visible(), "Song Select retains compact Settings and Home navigation")
    check(page.locator("#sceneBackgroundOpen").is_visible(), "existing scene background manager remains accessible in Song Select")
    check(not page.locator("#themeToggle").is_visible() and not page.locator("#updateBtn").is_visible() and not page.locator("#exportBtn").is_visible() and not page.locator("#importBtn").is_visible(), "unrelated theme/database/backup actions are hidden from the default Song Select header")
    check(page.locator("#amqWorkspaceDock [data-ws]").count() == 4, "all four existing workspaces remain available")
    check(page.locator("#amqWorkspaceDock [data-ws][aria-pressed='true']").count() == 0, "no unrelated workspace is falsely selected in default Song Select")
    page.set_viewport_size({"width": 1440, "height": 900})
    page.wait_for_timeout(120)
    default_geometry = page.evaluate("""() => ({
        bodyPaddingLeft: getComputedStyle(document.body).paddingLeft,
        searchLeft: document.querySelector('#search')?.getBoundingClientRect().left ?? null,
        searchWidth: document.querySelector('#search')?.getBoundingClientRect().width ?? null,
        catalogLeft: document.querySelector('#grid')?.getBoundingClientRect().left ?? null,
        stageDisplay: document.querySelector('#amqSongSelectStage') ? getComputedStyle(document.querySelector('#amqSongSelectStage')).display : null,
        dockBottom: document.querySelector('#amqWorkspaceDock')?.getBoundingClientRect().bottom ?? null
    })""")
    print("DEFAULT_GEOMETRY_1440x900=" + json.dumps(default_geometry, ensure_ascii=False))
    scene_geometry = page.evaluate("""() => {
        const rect = (selector) => { const e=document.querySelector(selector); if(!e)return null; const r=e.getBoundingClientRect(); return {left:Math.round(r.left),right:Math.round(r.right),top:Math.round(r.top),bottom:Math.round(r.bottom),width:Math.round(r.width),height:Math.round(r.height),display:getComputedStyle(e).display}; };
        return {stage:rect('#amqSongSelectStage'),scene:rect('#amqSongSelectStage .p32-scene'),info:rect('#amqSongSelectStage .p32-info'),title:rect('#amqSongSelectStage .p32-scene-content'),catalog:rect('#amqSongSelectStage .p32-catalog'),search:rect('#search'),grid:rect('#grid')};
    }""")
    print("SCENE_GEOMETRY_1440x900=" + json.dumps(scene_geometry, ensure_ascii=False))
    cover_diagnostics = page.evaluate("""() => [...document.querySelectorAll('#grid .card img,#grid .p26-work-card img')].slice(0,8).map(img=>({src:(img.getAttribute('src')||'').slice(0,160),currentSrc:(img.currentSrc||'').slice(0,160),complete:img.complete,naturalWidth:img.naturalWidth,naturalHeight:img.naturalHeight,objectFit:getComputedStyle(img).objectFit,visibility:getComputedStyle(img).visibility,display:getComputedStyle(img).display}))""")
    print("CATALOG_COVER_DIAGNOSTICS=" + json.dumps(cover_diagnostics, ensure_ascii=False))
    check(scene_geometry["title"] is not None and scene_geometry["catalog"] is not None and scene_geometry["title"]["right"] <= scene_geometry["catalog"]["left"] + 2, "central work title does not overlap the right catalog panel at 1440x900")
    check(default_geometry["bodyPaddingLeft"] == "0px", "default Song Select releases reserved workspace sidebar padding at 1440x900")
    check(default_geometry["stageDisplay"] == "grid", "default Song Select three-zone composition is visible at 1440x900")
    check(default_geometry["searchLeft"] is not None and default_geometry["searchLeft"] >= 1440 * 0.6 and default_geometry["searchLeft"] < 1440, "default Song Select search is positioned in the right catalog region at 1440x900")
    check(default_geometry["searchWidth"] is not None and default_geometry["searchWidth"] > 250, "right catalog search retains usable width at 1440x900")
    audio_box = page.locator("#audioDock").bounding_box()
    workspace_dock_box = page.locator("#amqWorkspaceDock").bounding_box()
    check(audio_box is not None and audio_box["x"] > 1440 * 0.45 and audio_box["x"] + audio_box["width"] <= 1440 and audio_box["y"] + audio_box["height"] <= 900, "audio player controls occupy the bottom-right region without viewport overflow")
    check(workspace_dock_box is not None and workspace_dock_box["x"] <= 20 and workspace_dock_box["x"] + workspace_dock_box["width"] < 1440 * 0.55 and workspace_dock_box["y"] + workspace_dock_box["height"] <= 900, "four-workspace dock occupies the bottom-left region")
    page.set_viewport_size({"width":1280,"height":720})
    page.wait_for_timeout(180)
    card_locator = page.locator("#grid .card, #grid .p26-work-card").first
    card_box = card_locator.bounding_box() if page.locator("#grid .card, #grid .p26-work-card").count() else None
    player_box = page.locator("#audioDock").bounding_box()
    visible_cards = 0
    for idx in range(page.locator("#grid .card, #grid .p26-work-card").count()):
        box = page.locator("#grid .card, #grid .p26-work-card").nth(idx).bounding_box()
        if box and box["y"] < 720 and player_box and box["y"] + box["height"] <= player_box["y"]:
            visible_cards += 1
    check(card_box is not None and card_box["y"] < 720 and player_box is not None and card_box["y"] + card_box["height"] <= player_box["y"], "at least one catalog card is visible above the bottom player at 1280x720")
    check(visible_cards >= 6, "at least six catalog cards are fully visible above the bottom player at 1280x720")
    page.set_viewport_size({"width":1440,"height":900})
    page.wait_for_timeout(120)
    page.set_viewport_size({"width": 1440, "height": 1000})
    page.wait_for_timeout(120)
    if page.locator("#amqWorkspaceDock").is_visible():
        workspace_cases = [
            ("lists", "清單管理", "#watchlistView"),
            ("batch", "批次整理", "#grid"),
            ("learning", "學習中心", "#learningPlanPanel"),
            ("analysis", "學習分析", "#dashboardPanel"),
        ]
        for key, title, main_selector in workspace_cases:
            page.locator(f'#amqWorkspaceDock [data-ws="{key}"]').click()
            page.wait_for_timeout(350)
            check(page.locator("#wsTitle").inner_text().strip() == title, f"workspace {key} updates its existing action panel")
            check(page.evaluate("window.__aniGetActiveViewV82?.() === 'catalog'"), f"workspace {key} keeps the app route inside Song Select")
            check(page.locator(main_selector).is_visible(), f"workspace {key} shows its existing main content surface in place")
            check(page.locator("#amqWorkspaceDock [data-ws]").filter(has=page.locator("span")).count() == 4, f"workspace {key} preserves all four dock controls")
            check(page.evaluate("document.body.dataset.amqWorkspaceMode") == key, f"workspace {key} records the active internal mode")
            check(page.locator("#amqWorkspaceSidebar").is_visible(), f"workspace {key} reveals its matching action sidebar")
            check(page.locator(f'#amqWorkspaceDock [data-ws="{key}"]').get_attribute("aria-pressed") == "true", f"workspace {key} marks only its own dock button selected")
            check(page.locator("#quicktools").is_visible() == (key == "batch"), f"workspace {key} shows batch tools only in batch mode")
            if key != "batch":
                check(not page.locator("#grid").is_visible(), f"workspace {key} hides the unrelated catalog grid")
        # Existing actions must also preserve the in-place shell while invoking the real handler.
        page.locator('#amqWorkspaceDock [data-ws="lists"]').click()
        page.locator('#wsActions [data-ws-action="watchlist-custom"]').click()
        page.wait_for_timeout(350)
        check(page.evaluate("window.__aniGetActiveViewV82?.() === 'catalog'"), "custom-list action stays inside Song Select")
        check(page.locator("#watchlistView").is_visible(), "custom-list action reveals the existing list-management panel")
        check(page.locator("#customModeTab").is_visible(), "custom-list tab remains available")
        check(page.locator("#wsStatus").get_attribute("data-state") == "success", "custom-list action reports successful completion")

        page.locator('#amqWorkspaceDock [data-ws="batch"]').click()
        page.locator('#wsActions [data-ws-action="batch-select"]').click()
        page.wait_for_timeout(250)
        check(page.evaluate("window.__aniGetActiveViewV82?.() === 'catalog'"), "batch selection action stays inside Song Select")
        check(page.locator("#selectModeBtn").is_visible(), "batch selection control remains available")
        check(page.locator("#selectModeBtn").inner_text().strip().startswith("✓"), "batch action really toggles selection mode")
        page.locator("#selectModeBtn").click()
        page.wait_for_timeout(100)
        check(page.locator("#selectModeBtn").inner_text().strip().startswith("□"), "batch selection mode is restored after test")

        page.locator('#amqWorkspaceDock [data-ws="learning"]').click()
        check(page.locator("#learningPlanPanel").is_visible(), "learning workspace renders the existing learning panel in place")
        page.locator('#wsActions [data-ws-action="practiceExplore"]').click()
        page.wait_for_timeout(500)
        check(page.evaluate("window.__aniGetActiveViewV82?.() === 'practice'"), "explicit explore action opens the existing practice flow")
        check(page.locator('[data-practice-mode="explore"]').count() > 0, "existing explore mode control remains available")

        page.locator('#amqWorkspaceDock [data-ws="analysis"]').click()
        page.locator('#wsActions [data-ws-action="dashboard"]').click()
        page.wait_for_timeout(250)
        check(page.evaluate("window.__aniGetActiveViewV82?.() === 'catalog'"), "dashboard action stays inside Song Select")
        check(page.locator("#dashboardPanel").is_visible(), "dashboard panel is visible in the analysis workspace")

        # Return to the catalog mode before testing source modes.
        page.locator('#amqWorkspaceDock [data-ws="batch"]').click()
        page.wait_for_timeout(250)
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
            work_index = page.evaluate("""() => {
                const works = window.__aniEmqAPI?.getWorks?.() || [];
                return works.slice(0, 48).findIndex(w => {
                    try { return (window.__aniEmqAPI?.getSongsForWork?.(w.i) || []).length > 0; }
                    catch { return false; }
                });
            }""")
            if work_index >= 0 and work_index < page.locator("#grid .p26-work-card").count():
                page.locator("#grid .p26-work-card").nth(work_index).click()
            else:
                page.locator("#grid .p26-work-card").first.click()
            page.wait_for_timeout(300)
            check(page.locator("#overlay.open").count() == 1, "selecting an EMQ work opens its detail pane")
            song_rows = page.locator("#songlist .songrow")
            check(song_rows.count() > 0, "selected work exposes real song rows for history display")
            if song_rows.count() > 0:
                selected_row = song_rows.first
                selected_song_id = selected_row.get_attribute("data-id")
                selected_song_title = selected_row.locator(".songname").inner_text().strip()
                initial_selected_x = selected_row.evaluate("(el) => el.getBoundingClientRect().left")
                selected_row.hover(position={"x": 5, "y": 5})
                page.wait_for_timeout(120)
                hover_x = selected_row.evaluate("(el) => el.getBoundingClientRect().left")
                check(hover_x < initial_selected_x - 1, "hovered unselected song row shifts slightly left")
                selected_row.click(position={"x": 5, "y": 5})
                selected_row = page.locator("#songlist .songrow.proto26-song-selected").first
                page.wait_for_timeout(120)
                after_selected_x = selected_row.evaluate("(el) => el.getBoundingClientRect().left")
                check(selected_row.count() == 1 and after_selected_x < hover_x - 1, "selected song row shifts farther left than hover state")
                check(page.locator("#p32SongTitle").inner_text().strip() == selected_song_title, "selected-song panel uses the actual song-row title")
                expected_play_count = page.evaluate("(id) => Number(window.__aniHistoryAPIv51?.getPersonalSnapshot?.().playHistory?.[id]?.count) || 0", selected_song_id)
                actual_play_text = page.locator("#p32PlayCount").inner_text().strip()
                check((str(expected_play_count) in actual_play_text) if expected_play_count > 0 else actual_play_text == "尚無播放紀錄", "selected-song panel reads the real playback-count store")
                wrong_record = page.evaluate("""(id) => (window.__aniHistoryAPIv51?.getHistory?.() || [])
                    .filter(entry => String(entry?.songId) === String(id) && entry?.correct === false)
                    .sort((a,b) => (Date.parse(b?.at)||0) - (Date.parse(a?.at)||0))[0] || null""", selected_song_id)
                wrong_summary = page.evaluate("(id) => window.__aniHistoryAPIv51?.getSongHistorySummary?.(id)?.wrong || 0", selected_song_id)
                actual_wrong_text = page.locator("#p32LastWrong").inner_text().strip()
                if wrong_record:
                    check((str(wrong_record.get("answer") or "").strip() in actual_wrong_text) if str(wrong_record.get("answer") or "").strip() else bool(actual_wrong_text), "selected-song panel uses the latest real wrong-answer record")
                elif wrong_summary > 0:
                    check("詳細紀錄目前不可用" in actual_wrong_text, "selected-song panel distinguishes summary-only wrong-answer history")
                else:
                    check(actual_wrong_text == "尚無錯題紀錄", "selected-song panel shows an honest empty state for wrong-answer history")
            check(page.locator("#overlay .drawer").evaluate("(el) => getComputedStyle(el).position") == "fixed", "desktop detail pane is fixed at the right side")
            check(page.locator("#overlay .close").evaluate("(el) => getComputedStyle(el).display") == "none", "desktop detail pane remains persistent while browsing")
            page.keyboard.press("Escape")
            page.wait_for_timeout(150)
            check(page.locator("#overlay.open").count() == 0, "Escape closes the selected-work detail pane and restores catalog controls")
            check(page.locator("#grid").evaluate("(el) => el.getBoundingClientRect().width < window.innerWidth * 0.8"), "catalog reserves horizontal space for the detail pane")
            check(page.locator("#quicktools").evaluate("(el) => el.getBoundingClientRect().width < window.innerWidth * 0.8"), "batch tools reserve horizontal space for the detail pane")
            check(page.locator(".toolbar.view-catalog").evaluate("(el) => el.getBoundingClientRect().width < window.innerWidth * 0.8"), "search and filter controls reserve horizontal space for the detail pane")
            page.set_viewport_size({"width": 1000, "height": 562})
            page.wait_for_timeout(250)
            overflow_debug = page.evaluate("""() => ({
                viewport: window.innerWidth,
                documentWidth: document.documentElement.scrollWidth,
                bodyWidth: document.body.scrollWidth,
                bodyPaddingLeft: getComputedStyle(document.body).paddingLeft,
                stage: (() => { const el=document.querySelector("#amqSongSelectStage"); const r=el.getBoundingClientRect(); return {left:Math.round(r.left),right:Math.round(r.right),width:Math.round(r.width),inlineWidth:el.style.width,computedWidth:getComputedStyle(el).width,gridColumns:getComputedStyle(el).gridTemplateColumns,parent:(()=>{const p=el.parentElement,pr=p.getBoundingClientRect();return {tag:p.tagName,cls:String(p.className||""),left:Math.round(pr.left),right:Math.round(pr.right),width:Math.round(pr.width)}})()}; })(),
                overflowing: [...document.querySelectorAll('body *')].map(el => {
                    const r = el.getBoundingClientRect();
                    return {tag:el.tagName,id:el.id,cls:String(el.className||'').slice(0,70),left:Math.round(r.left),right:Math.round(r.right),width:Math.round(r.width),display:getComputedStyle(el).display};
                }).filter(x => x.width > 0 && (x.left < -1 || x.right > window.innerWidth + 1)).slice(0,30)
            })""")
            print("OVERFLOW_DEBUG_1000x562=" + json.dumps(overflow_debug, ensure_ascii=False))
            check(overflow_debug["documentWidth"] <= overflow_debug["viewport"], "1000x562 Song Select viewport has no horizontal overflow")
            page.set_viewport_size({"width": 1440, "height": 900})
            page.wait_for_timeout(200)
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
    print("PAGE_ERRORS=" + json.dumps(page_errors, ensure_ascii=False))
    check(not page_errors, "no uncaught page errors")
    print("CONSOLE_ERRORS=" + json.dumps(console_errors, ensure_ascii=False))
    check(not console_errors, "no browser console errors")
    page.screenshot(path=str(ROOT / "engineering/proto26-song-select/proto26-desktop.png"), full_page=False)
    # Re-open a real work detail to verify the responsive mobile drawer after Escape dismissal.
    page.locator('[data-p26-mode="emq"]').click()
    page.wait_for_timeout(500)
    if page.locator("#grid .p26-work-card").count() > 0:
        page.locator("#grid .p26-work-card").first.click()
        page.wait_for_timeout(250)
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
