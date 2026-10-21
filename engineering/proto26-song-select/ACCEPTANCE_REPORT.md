Proto26 Song Select acceptance summary
Commit under test: c8ad782ef88b5091ba66a6f6bc61abffb3b14f54
Date UTC: 2026-10-21T06:39:11Z
8938670 dist/amq_learning_tool_v82_85_30_workspace_proto26_song_select_04.html
c1155dc7969613bbc20914816a7833842ba8384fd25f2a4611917ee7d2dd5950  dist/amq_learning_tool_v82_85_30_workspace_proto26_song_select_04.html
--- static test report ---
PASS Song Select uses existing catalog tabs selector
PASS malformed tabs declaration is absent
PASS four source modes are present
PASS EMQ song details reuse existing data and song-row action
PASS EMQ work list refreshes after asynchronous library load
PASS active EMQ/MIX view rerenders when library becomes ready
PASS selected work uses a persistent right-side detail pane on desktop
PASS Song Select controls remain hidden outside the catalog view
PASS existing workspace sidebar and dock are kept visible on desktop
PASS all catalog controls reserve the detail pane column
PASS desktop split view and mobile detail layout rules are present
PASS immutable baseline file exists
BASELINE_SHA256=5a0f18f47fb059427b385484086c66dd14716a03843fcba37f9eb5fe89a7d66f
OUTPUT=dist/amq_learning_tool_v82_85_30_workspace_proto26_song_select_04.html
OUTPUT_BYTES=8938670
OUTPUT_SHA256=c1155dc7969613bbc20914816a7833842ba8384fd25f2a4611917ee7d2dd5950
BUILD=PASS
PASS new versioned standalone HTML was built
PASS integration injected exactly once
PASS integration runs after legacy trailing styles and scripts
PASS generated HTML includes source controls
PASS baseline was not modified
OUTPUT_SHA256=c1155dc7969613bbc20914816a7833842ba8384fd25f2a4611917ee7d2dd5950
STATIC_ACCEPTANCE=PASS
--- browser test report ---
PASS source mode controls initialize
PASS integration reports ready state
WORKSPACE_DEBUG={"innerWidth": 1440, "bodyClasses": "dark-theme amq-workspace-prototype amq-standalone-route amq-workspace-active", "activeView": "catalog", "sidebarDisplay": "block", "sidebarRect": {"x": 0, "y": 0, "width": 244, "height": 922}, "dockDisplay": "grid", "dockRect": {"x": 0, "y": 922, "width": 1440, "height": 78}}
PASS app navigation state is catalog
PASS catalog view is visible before interacting with song cards
PASS source controls are scoped to the catalog view
PASS existing workspace sidebar is visible in Song Select
PASS existing workspace dock is visible in Song Select
PASS all four existing workspaces remain available
PASS workspace lists activates its existing panel
PASS workspace batch activates its existing panel
PASS workspace learning activates its existing panel
PASS workspace analysis activates its existing panel
PASS EMQ library completes asynchronous initialization
PASS EMQ API exposes actual work records after initialization
PASS catalog and audio dock remain present
PASS EMQ mode activates
PASS EMQ mode renders actual work cards
PASS selecting an EMQ work opens its detail pane
PASS desktop detail pane is fixed at the right side
PASS desktop detail pane remains persistent while browsing
PASS catalog reserves horizontal space for the detail pane
PASS batch tools reserve horizontal space for the detail pane
PASS search and filter controls reserve horizontal space for the detail pane
PASS 1000x562 Song Select viewport has no horizontal overflow
PASS MIX mode activates
PASS Singer mode activates
PASS AMQ mode restores legacy catalog
PASS no uncaught page errors
CONSOLE_ERRORS=[]
PASS no browser console errors
PASS mobile layout has no horizontal overflow
PASS mobile detail drawer fits the viewport
PASS mobile detail drawer retains its close control
OUTPUT_SHA256=c1155dc7969613bbc20914816a7833842ba8384fd25f2a4611917ee7d2dd5950
BROWSER_ACCEPTANCE=PASS
