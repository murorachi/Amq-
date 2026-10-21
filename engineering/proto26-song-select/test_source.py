import hashlib
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
JS = ROOT / "engineering/proto26-song-select/song-select-integration.js"
BUILDER = ROOT / "engineering/proto26-song-select/build_single_file.py"
SOURCE = ROOT / "dist/amq_learning_tool_v82_85_30_workspace_proto25_stage24.html"
OUTPUT = ROOT / "dist/amq_learning_tool_v82_85_30_workspace_proto26_song_select_09.html"

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
    check("proto26.8" in js and "#overlay.open .drawer" in js, "selected work uses a persistent right-side detail pane on desktop")
    check("modes.classList.add('view-catalog')" in js, "Song Select controls remain hidden outside the catalog view")
    check("const syncWorkspaceShell=()=>" in js and "sidebar.style.setProperty('display','block','important')" in js and "dock.style.setProperty('display','grid','important')" in js, "workspace sidebar is conditional and dock remains available on desktop")
    check("body.amq-workspace-active .view-home{display:none!important}" in js and "body.amq-workspace-active:not([data-amq-workspace-mode]) #quicktools{display:none!important}" in js, "default Song Select hides home hero and batch tools")
    check("body.amq-workspace-prototype.amq-workspace-active:not([data-amq-workspace-mode]){padding-left:0!important}" in js, "default Song Select releases reserved workspace sidebar padding")
    check("String(Boolean(workspaceMode)&&button.dataset.ws===workspaceMode)" in js and "'data-amq-workspace-mode']" in js, "dock selected state follows the active workspace mode")
    check("const workspaceViews={lists:'watchlist',batch:'catalog',learning:'learningPlan',analysis:'dashboard'}" in js and "window.__amqSetSongSelectWorkspaceMode=setWorkspaceMode" in js, "workspace dock switches existing panels inside Song Select")
    check('body[data-amq-workspace-mode="lists"] .view-catalog' in js and 'body[data-amq-workspace-mode="analysis"] #dashboardPanel' in js, "workspace panel visibility is scoped to the active Song Select mode")
    check("grid-template-columns:repeat(2,minmax(0,1fr))" in js and "max-height:94dvh" in js, "desktop split view and mobile detail layout rules are present")
    check('body.amq-custom-bg-active[data-amq-scene="catalog"] #amqSongSelectStage .p32-scene' in js and "backdrop-filter:blur(2px)" in js, "Song Select feature stage integrates the existing Catalog scene background with a fallback")
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
