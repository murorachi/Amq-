# CSS cascade audit follow-up

Candidate 163 SHA-256: `8cef531d25e97c9af19d7335b96b87856848186490d48d9797975592f2a6d0a5`

## Static inventory
- 96 style blocks
- 1,974 distinct exact selector strings
- 375 selectors appear more than once
- 1,364 selector/property pairs are defined more than once
- No duplicate property declarations with identical values were found inside a single qualified rule.
- The first-pass Candidate 163 cleanup removed 11 fully identical qualified rules and preserved screenshot pixels in the tested states.

## High-priority cascade hotspots
- Song Select catalog: `body.amq-songselect-route-active #amqSongSelectStage .p32-catalog` appears in 10 rule occurrences. Conflicting values include height, overflow, top/bottom geometry, and positioning.
- Song metadata: `body.amq-songselect-route-active #amqSongSelectStage .p32-info` appears in 6 rule occurrences with conflicting width, position, max-height, overflow, background and padding.
- Song Select workspace dock: route-scoped `#amqWorkspaceDock` appears in 7 occurrences; width, height, max-width, position and alignment differ.
- General workspace dock: `#amqWorkspaceDock` appears in 6 occurrences, including legacy layout and later osu-style composition.
- Homepage: `body.ui-home-menu #homeMenu` and `.amqHomeTopFrame` each appear in 9 occurrences.
- Quiz UI: `#quizView .quizMystery` appears in 11 occurrences; `.quizVisualizerV30` appears in 8.

## Safe next approach
Do not bulk-delete these rules yet. The cascade map is a source-order inventory, not a complete computed-style proof. Consolidate one area at a time, first resolving route/state and responsive conditions. Preserve behavior by comparing screenshots and computed styles for default, hover, selected, keyboard, and workspace-open states.

Nested @media/@supports rules were excluded from this first pass and need a condition-aware audit. Real-origin browser and durable storage checks remain blocked in the current environment.
