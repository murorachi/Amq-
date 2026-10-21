# Current Status

## Latest verified checkpoint

- Verified branch: `v82.85.30-proto31-scene-background-integration-01`
- Tested source commit: `a8bec92c8549d6fcc2cf13ffc0401c150ce247ed`
- Generated artifact/report commit: `6eda007f92417c8bc3614d8451ae0379e3943d4b`
- Passing CI: https://github.com/murorachi/Amq-/actions/runs/39581069788
- Candidate 08: `dist/amq_learning_tool_v82_85_30_workspace_proto26_song_select_08.html`
- Size: 8,952,996 bytes
- SHA-256: `4fcf49520729584e9353f3779551c5f1cd0dc88799aa2ae8cfb69f36c2f4853f`
- Static acceptance: PASS; browser acceptance: PASS; visual evidence generation: PASS.
- Visual acceptance: **NOT VERIFIED**. Matched reference diff is diagnostic only; changed-pixel ratio 91.02%, not a similarity score.

## Current in-progress stage: Proto32 candidate 09

- Branch: `v82.85.30-proto32-song-select-reference-composition-01`
- Current source commit: `8a209316f4b000b4fba767019fc1b28556e963bc`
- Current CI run: https://github.com/murorachi/Amq-/actions/runs/39584392554
- Latest observed run status: **IN PROGRESS** during Playwright dependency installation. Candidate 09 has not passed acceptance and has not been committed as a formal artifact.
- Candidate output path: `dist/amq_learning_tool_v82_85_30_workspace_proto26_song_select_09.html`
- Candidate 09 SHA-256: **NOT VERIFIED** for the current source commit.
- Previous candidate 09 build from an earlier failing source commit had SHA-256 `bc8a727b7dcea34e01c63fb16588f02a2461a100e3ae190fcab192d62d75e8fc`; do not reuse that hash for the current build.

### Proto32 changes already implemented

- Replaced the placeholder-note hero with a scene-backed central composition, selected-work title, left selected-song information panel, and right-side catalog.
- Moved the existing catalog toolbar, search, filters, tabs, source-mode controls, header and work grid into the right catalog region.
- Selected-song panel reads the actual song row, playback-count store, quiz-history summary and retained wrong-answer records. Missing detail is shown as an honest empty/unavailable state.
- Added browser assertions for selected-song title, actual playback count and wrong-answer empty/summary-only states.
- Added responsive sizing for the relocated toolbar and stage.

### Known blocker and attempted correction

- Browser acceptance on source commit `9c5f944df1adefc7ad0b094ba31a19df0aa02e93` failed the 1000×562 no-horizontal-overflow assertion.
- Diagnostics showed stage width 718px with grid tracks `220px 240px 300px` plus gaps, which exceed the available stage width. This came from minimum track sizes under the sidebar-constrained viewport, not the search control itself.
- Reduced the <=1120px grid track minimums to `minmax(170px,24%) minmax(180px,1fr) minmax(250px,32%)` in source commit `8a209316f4b000b4fba767019fc1b28556e963bc`.
- A follow-up CI run is in progress; this correction remains **NOT VERIFIED** until that run completes.
- Diagnostic logging now includes stage/parent rectangles, computed grid tracks, body padding and offending elements.

## Immutable baseline

- Branch: `v82.85.30-proto25-ui-refactor-stage-24`
- HTML: `dist/amq_learning_tool_v82_85_30_workspace_proto25_stage24.html`
- Source commit: `3aea33e7137b7e3e3105c76ed896a515a335c2a3`
- SHA-256: `5a0f18f47fb059427b385484086c66dd14716a03843fcba37f9eb5fe89a7d66f`
- Never overwrite the immutable baseline or earlier candidates.

## osu!stable reference status

- Official Wiki commit: `ae2c6443a4264e5429ea7bcd2f3503be8a518a50`
- Song Select screenshot Git blob SHA: `1e927a00a1984a5ba20fa5efec639410f349607a`
- Matched viewport: 1280×720, device scale factor 1.
- Exact Stable client source commit matching release label `20260924.1`: **NOT VERIFIED**. Do not substitute osu!lazer source.
- Current visual similarity target: **NOT VERIFIED**. The current candidate is still far from the reference and needs further visual correction.

## Next action

1. Wait for CI run 39584392554 to complete.
2. If the overflow test passes, review the fresh screenshot and visual evidence; if it fails, use the newly captured grid/parent geometry rather than guessing.
3. Verify the candidate 09 SHA-256 from the generated acceptance report and remote artifact commit.
4. Only then update the latest verified checkpoint to Proto32. Until then, candidate 08 remains the latest verified artifact.
