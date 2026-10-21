import hashlib
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
JS = ROOT / "engineering/proto26-song-select/song-select-integration.js"
BUILDER = ROOT / "engineering/proto26-song-select/build_single_file.py"
SOURCE = ROOT / "dist/amq_learning_tool_v82_85_30_workspace_proto25_stage24.html"
OUTPUT = ROOT / "dist/amq_learning_tool_v82_85_30_workspace_proto26_song_select_29.html"

def check(condition, label):
    print(("PASS " if condition else "FAIL ") + label)
    if not condition:
        raise AssertionError(label)

def main():
    js = JS.read_text(encoding="utf-8")
    check("tabs=$('.tabs.view-catalog')" in js, "Song Select uses existing catalog tabs selector")
    check("tabs = ," not in js, "malformed tabs declaration is absent")
    check("data-p26-mode=\"amq\"" in js and "data-p26-mode=\"emq\"" in js and "data-p26-mode=\"mix\"" in js and "data-p26-mode=\"singer\"" in js, "four source modes are present")
    check("api.getSongsForWork" in js and "makeSongRow" in js, "EMQ song details reuse existing data and song-row action")
    check("api.ready" in js and "readinessPoll" in js and "readEmqWorks()" in js, "EMQ work list refreshes after asynchronous library load")
    check("mode==='emq'||mode==='mix'" in js, "active EMQ/MIX view rerenders when library becomes ready")
    check("proto32.1" in js and "#overlay.open .drawer" in js, "selected work uses a persistent right-side detail pane on desktop")
    check("modes.classList.add('view-catalog')" in js, "Song Select controls remain hidden outside the catalog view")
    check("const syncWorkspaceShell=()=>" in js and "sidebar.style.setProperty('display','block','important')" in js and "dock.style.setProperty('display','grid','important')" in js, "workspace sidebar is conditional and dock remains available on desktop")
    check("body.amq-workspace-active .view-home{display:none!important}" in js and "body.amq-workspace-active:not([data-amq-workspace-mode]) #quicktools{display:none!important}" in js, "default Song Select hides home hero and batch tools")
    check("body.amq-workspace-prototype.amq-workspace-active:not([data-amq-workspace-mode]){padding-left:0!important}" in js, "default Song Select releases reserved workspace sidebar padding")
    check("String(Boolean(workspaceMode)&&button.dataset.ws===workspaceMode)" in js and "'data-amq-workspace-mode']" in js, "dock selected state follows the active workspace mode")
    check("const workspaceViews={lists:'watchlist',batch:'catalog',learning:'learningPlan',analysis:'dashboard'}" in js and "window.__amqSetSongSelectWorkspaceMode=setWorkspaceMode" in js, "workspace dock switches existing panels inside Song Select")
    check('body[data-amq-workspace-mode="lists"] .view-catalog' in js and 'body[data-amq-workspace-mode="analysis"] #dashboardPanel' in js, "workspace panel visibility is scoped to the active Song Select mode")
    check("grid-template-columns:repeat(2,minmax(0,1fr))" in js and "max-height:94dvh" in js, "desktop split view and mobile detail layout rules are present")
    check('body.amq-custom-bg-active[data-amq-scene="catalog"] #amqSongSelectStage .p32-scene' in js and "backdrop-filter:blur(2px)" in js, "Song Select feature stage integrates the existing Catalog scene background with a fallback")
    check("height:clamp(380px,calc(100vh - 120px),600px)" in js, "Song Select stage height is constrained to the viewport")
    check("Proto36: explicit non-overlapping scene geometry" in js and "#amqSongSelectStage .p32-scene{position:absolute!important;left:0!important;right:0!important;top:0!important;bottom:0!important;inset:0!important;grid-column:auto!important" in js and "width:auto!important;height:auto!important" in js, "desktop Song Select scene fills its grid stage without over-constrained dimensions")
    check("#amqSongSelectStage #grid{display:flex!important;flex:1 1 0px!important;flex-direction:column!important" in js and "min-height:52px!important;padding:3px 6px!important" in js, "desktop catalog preserves a compact single-column song list")
    check("const syncCatalogEmptyState=()=>{if(mode!=='amq'&&mode!=='singer')return" in js and "new MutationObserver(updateP32).observe(grid,{childList:true,subtree:true})" in js, "AMQ empty state synchronizes after asynchronous catalog rendering")
    check("p26-filter-strip" in js and "overflow-x" in js and "height:24px;min-height:24px" in js, "catalog filters remain reachable in a compact horizontal strip")
    check("p26-mode-tabs-row" in js and "position:absolute;top:0;right:0;bottom:0;width:44%" in js, "catalog overlays the central scene with combined compact source/category controls")
    check("#amqSongSelectStage #p32Mount{display:flex;flex-direction:column" in js and "flex:1 1 auto!important" in js and "#amqSongSelectStage #grid{" in js and "flex:1 1 0px!important" in js and "height:0px!important;min-height:0!important" in js and "overflow:auto!important" in js and "#amqSongSelectStage #empty.hidden{display:none!important}" in js and "#amqSongSelectStage .tabs.view-catalog{display:flex!important;flex-wrap:nowrap!important" in js and "#amqSongSelectStage #loadMoreWrap{height:22px!important;min-height:0!important" in js, "catalog viewport sizing reserves scroll space by compacting hidden and auxiliary controls")
    check(".songrow.proto26-song-selected" in js and "translateX(-6px)" in js and "row.classList.add('proto26-song-selected')" in js, "selected song row is visibly highlighted and shifts slightly left")
    check("min-height:60px;padding:4px 6px" in js, "base catalog cards retain their original density profile")
    check("central work title does not overlap the right catalog panel" in Path(__file__).with_name("browser_acceptance.py").read_text(encoding="utf-8"), "browser acceptance includes a central-title overlap assertion")
    check("naturalWidth>=80&&el.naturalHeight>=50" in js and "grid.addEventListener" in js, "scene artwork uses a genuinely loaded cover image and refreshes when covers load")
    check("applySceneCover=(card,img)" in js and "selectedWorkCard?.contains(event.target)" in js, "selected-work scene art handles delayed cover-image loading")
    check("#amqSongSelectStage #grid>.card:hover .cardManage" in js and "opacity:0!important;pointer-events:none!important" in js, "catalog quick-management controls do not obscure every cover at rest")
    check(".cover .symbol,#amqSongSelectStage #grid>.card .cover .year,#amqSongSelectStage #grid>.card .cover .sticker{display:none!important}" in js and ".cover:not(.has-real-cover) .coverFallback{font-size:16px!important" in js, "cover decorations stay quiet while a compact fallback remains available without network art")
    check("const first=cards[0]" in js and "作品預覽 · " in js, "default Song Select previews the first visible work without falsely marking it selected")
    check("proto26-song-select-default-viewport.png" in Path(__file__).with_name("visual_compare.py").read_text(encoding="utf-8") and "SELECTED_STATE_CAPTURE_FAIL" in Path(__file__).with_name("visual_compare.py").read_text(encoding="utf-8"), "visual comparison captures both default and selected-song states")
    check("body:has(#overlay.open) #overlay.open .drawer .detailHero{display:none!important}" in js and "body:has(#overlay.open) #overlay.open .drawer .songlist .songrow{display:grid!important" in js, "desktop selected-song drawer overrides legacy detail styles with a compact scrollable song list")
    check("songrow:hover:not(.proto26-song-selected){position:relative!important;transform:translateX(-3px)!important" in js and "songrow.proto26-song-selected{position:relative!important;transform:translateX(-6px)!important" in js, "hover and selected song rows have explicit distinct left-shift states")
    check("proto26-song-select-matched-viewport.png" in Path(__file__).with_name("visual_compare.py").read_text(encoding="utf-8") and "SELECTED_STATE_CAPTURE_FAIL" in Path(__file__).with_name("visual_compare.py").read_text(encoding="utf-8"), "visual comparison requires a selected work and selected song state")
    check("minmax(0,24%) minmax(0,39.5%) minmax(0,36.5%)" in js and "left:24.5%!important;right:36.8%!important" in js, "scene proportions prioritize the center artwork while preserving side panels")
    check(SOURCE.is_file(), "immutable baseline file exists")
    before = hashlib.sha256(SOURCE.read_bytes()).hexdigest()
    result = subprocess.run([sys.executable, str(BUILDER)], cwd=ROOT, text=True, capture_output=True)
    print(result.stdout, end="")
    if result.returncode:
        print(result.stderr, file=sys.stderr)
        raise AssertionError("single-file builder failed")
    check(OUTPUT.is_file(), "new versioned standalone HTML was built")
    html = OUTPUT.read_text(encoding="utf-8")
    check(html.count("Proto26 Song Select integration: generated") == 1, "integration injected exactly once")
    check(html.index("Proto26 Song Select integration: generated") > html.index("</body>"), "integration runs after legacy trailing styles and scripts")
    check("proto26SongModes" in html and "data-p26-mode=\"singer\"" in html, "generated HTML includes source controls")
    after = hashlib.sha256(SOURCE.read_bytes()).hexdigest()
    check(before == after, "baseline was not modified")
    print(f"OUTPUT_SHA256={hashlib.sha256(OUTPUT.read_bytes()).hexdigest()}")
    print("STATIC_ACCEPTANCE=PASS")

if __name__ == "__main__":
    main()
