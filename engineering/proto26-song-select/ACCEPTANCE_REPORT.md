Proto26 Song Select acceptance summary
Commit under test: f04210833a0ea87d7e0e2f8e23d086d14919c3fd
Date UTC: 2026-10-21T09:13:37Z
8952209 dist/amq_learning_tool_v82_85_30_workspace_proto26_song_select_08.html
bb56c70202b90c9926eb9299fa863048fb71fe0edc402460ddfda8f0a2f6c3ff  dist/amq_learning_tool_v82_85_30_workspace_proto26_song_select_08.html
--- static test report ---
PASS Song Select uses existing catalog tabs selector
PASS malformed tabs declaration is absent
PASS four source modes are present
PASS EMQ song details reuse existing data and song-row action
PASS EMQ work list refreshes after asynchronous library load
PASS active EMQ/MIX view rerenders when library becomes ready
PASS selected work uses a persistent right-side detail pane on desktop
PASS Song Select controls remain hidden outside the catalog view
PASS workspace sidebar is conditional and dock remains available on desktop
PASS default Song Select hides home hero and batch tools
PASS default Song Select releases reserved workspace sidebar padding
PASS dock selected state follows the active workspace mode
PASS workspace dock switches existing panels inside Song Select
PASS workspace panel visibility is scoped to the active Song Select mode
PASS desktop split view and mobile detail layout rules are present
PASS immutable baseline file exists
BASELINE_SHA256=5a0f18f47fb059427b385484086c66dd14716a03843fcba37f9eb5fe89a7d66f
OUTPUT=dist/amq_learning_tool_v82_85_30_workspace_proto26_song_select_08.html
OUTPUT_BYTES=8952209
OUTPUT_SHA256=bb56c70202b90c9926eb9299fa863048fb71fe0edc402460ddfda8f0a2f6c3ff
BUILD=PASS
PASS new versioned standalone HTML was built
PASS integration injected exactly once
PASS integration runs after legacy trailing styles and scripts
PASS generated HTML includes source controls
PASS baseline was not modified
OUTPUT_SHA256=bb56c70202b90c9926eb9299fa863048fb71fe0edc402460ddfda8f0a2f6c3ff
STATIC_ACCEPTANCE=PASS
--- browser test report ---
PASS source mode controls initialize
PASS integration reports ready state
WORKSPACE_DEBUG={"innerWidth": 1440, "bodyClasses": "dark-theme amq-workspace-prototype amq-standalone-route amq-workspace-active", "activeView": "catalog", "sidebarDisplay": "none", "sidebarRect": {"x": 0, "y": 0, "width": 0, "height": 0}, "dockDisplay": "grid", "dockRect": {"x": 0, "y": 922, "width": 1440, "height": 78}}
PASS app navigation state is catalog
PASS catalog view is visible before interacting with song cards
PASS source controls are scoped to the catalog view
PASS home collection hero is hidden in Song Select
PASS batch tools do not dominate the default Song Select view
PASS workspace action sidebar is hidden until a workspace is selected
PASS existing workspace dock is visible in Song Select
PASS all four existing workspaces remain available
PASS no unrelated workspace is falsely selected in default Song Select
DEFAULT_GEOMETRY_1440x900={"bodyPaddingLeft": "0px", "searchLeft": 28, "catalogLeft": 28, "dockBottom": 900}
PASS default Song Select releases reserved workspace sidebar padding at 1440x900
PASS default Song Select search uses the full available width at 1440x900
PASS workspace lists updates its existing action panel
PASS workspace lists keeps the app route inside Song Select
PASS workspace lists shows its existing main content surface in place
PASS workspace lists preserves all four dock controls
PASS workspace lists records the active internal mode
PASS workspace lists reveals its matching action sidebar
PASS workspace lists marks only its own dock button selected
PASS workspace lists shows batch tools only in batch mode
PASS workspace lists hides the unrelated catalog grid
PASS workspace batch updates its existing action panel
PASS workspace batch keeps the app route inside Song Select
PASS workspace batch shows its existing main content surface in place
PASS workspace batch preserves all four dock controls
PASS workspace batch records the active internal mode
PASS workspace batch reveals its matching action sidebar
PASS workspace batch marks only its own dock button selected
PASS workspace batch shows batch tools only in batch mode
PASS workspace learning updates its existing action panel
PASS workspace learning keeps the app route inside Song Select
PASS workspace learning shows its existing main content surface in place
PASS workspace learning preserves all four dock controls
PASS workspace learning records the active internal mode
PASS workspace learning reveals its matching action sidebar
PASS workspace learning marks only its own dock button selected
PASS workspace learning shows batch tools only in batch mode
PASS workspace learning hides the unrelated catalog grid
PASS workspace analysis updates its existing action panel
PASS workspace analysis keeps the app route inside Song Select
PASS workspace analysis shows its existing main content surface in place
PASS workspace analysis preserves all four dock controls
PASS workspace analysis records the active internal mode
PASS workspace analysis reveals its matching action sidebar
PASS workspace analysis marks only its own dock button selected
PASS workspace analysis shows batch tools only in batch mode
PASS workspace analysis hides the unrelated catalog grid
PASS custom-list action stays inside Song Select
PASS custom-list action reveals the existing list-management panel
PASS custom-list tab remains available
PASS custom-list action reports successful completion
PASS batch selection action stays inside Song Select
PASS batch selection control remains available
PASS batch action really toggles selection mode
PASS batch selection mode is restored after test
PASS learning workspace renders the existing learning panel in place
PASS explicit explore action opens the existing practice flow
PASS existing explore mode control remains available
PASS dashboard action stays inside Song Select
PASS dashboard panel is visible in the analysis workspace
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
PAGE_ERRORS=[]
PASS no uncaught page errors
CONSOLE_ERRORS=[]
PASS no browser console errors
PASS mobile layout has no horizontal overflow
PASS mobile detail drawer fits the viewport
PASS mobile detail drawer retains its close control
OUTPUT_SHA256=bb56c70202b90c9926eb9299fa863048fb71fe0edc402460ddfda8f0a2f6c3ff
BROWSER_ACCEPTANCE=PASS
--- visual comparison report ---
PASS pinned official Wiki image identity 1e927a00a1984a5ba20fa5efec639410f349607a
PASS candidate screenshot matches reference viewport 1280x720
DIAGNOSTIC normalized MAE=0.286490; changed-pixel-ratio=0.782809
VISUAL_ACCEPTANCE=NOT VERIFIED (evidence generated; human/design review and corrections remain required)
