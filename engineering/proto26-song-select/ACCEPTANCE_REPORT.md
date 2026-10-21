Proto26 Song Select acceptance summary
Commit under test: 176263ba94731a1bb3b3dd285f39dd3425decb2b
Date UTC: 2026-10-21T05:22:08Z
8937515 dist/amq_learning_tool_v82_85_30_workspace_proto26_song_select_02.html
9d052a0557a021309a596bf0fcdb127389107dc9b08878e63d13b31c4d6d15af  dist/amq_learning_tool_v82_85_30_workspace_proto26_song_select_02.html
--- static test report ---
PASS Song Select uses existing catalog tabs selector
PASS malformed tabs declaration is absent
PASS four source modes are present
PASS EMQ song details reuse existing data and song-row action
PASS EMQ work list refreshes after asynchronous library load
PASS active EMQ/MIX view rerenders when library becomes ready
PASS selected work uses a persistent right-side detail pane on desktop
PASS Song Select controls remain hidden outside the catalog view
PASS desktop split view and mobile detail layout rules are present
PASS immutable baseline file exists
BASELINE_SHA256=5a0f18f47fb059427b385484086c66dd14716a03843fcba37f9eb5fe89a7d66f
OUTPUT=dist/amq_learning_tool_v82_85_30_workspace_proto26_song_select_02.html
OUTPUT_BYTES=8937515
OUTPUT_SHA256=9d052a0557a021309a596bf0fcdb127389107dc9b08878e63d13b31c4d6d15af
BUILD=PASS
PASS new versioned standalone HTML was built
PASS integration injected exactly once
PASS integration runs after legacy trailing styles and scripts
PASS generated HTML includes source controls
PASS baseline was not modified
OUTPUT_SHA256=9d052a0557a021309a596bf0fcdb127389107dc9b08878e63d13b31c4d6d15af
STATIC_ACCEPTANCE=PASS
--- browser test report ---
PASS source mode controls initialize
PASS integration reports ready state
PASS catalog view is visible before interacting with song cards
PASS source controls are scoped to the catalog view
PASS EMQ library completes asynchronous initialization
PASS EMQ API exposes actual work records after initialization
PASS catalog and audio dock remain present
PASS EMQ mode activates
PASS EMQ mode renders actual work cards
PASS selecting an EMQ work opens its detail pane
PASS desktop detail pane is fixed at the right side
PASS desktop detail pane remains persistent while browsing
PASS catalog reserves horizontal space for the detail pane
PASS MIX mode activates
PASS Singer mode activates
PASS AMQ mode restores legacy catalog
PASS no uncaught page errors
PASS no browser console errors
PASS mobile layout has no horizontal overflow
PASS mobile detail drawer fits the viewport
PASS mobile detail drawer retains its close control
OUTPUT_SHA256=9d052a0557a021309a596bf0fcdb127389107dc9b08878e63d13b31c4d6d15af
BROWSER_ACCEPTANCE=PASS
