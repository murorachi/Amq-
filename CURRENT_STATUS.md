# Current Status

## Latest verified checkpoint: Proto28 default-state fix (2026-10-21)

- Working branch: `v82.85.30-proto28-song-select-default-state-fix-01`
- CI source commit: `52e1677ae3f6385fec577dce3609ee7511cc73c4`
- Generated artifact/report commit: `fbf48765d07401e8b87494eec7c3c84015db7867`
- GitHub Actions: https://github.com/murorachi/Amq-/actions/runs/39570523908 — **SUCCESS**
- Candidate: `dist/amq_learning_tool_v82_85_30_workspace_proto26_song_select_06.html`
- Size: 8,943,047 bytes
- SHA-256: `3b1626b825ca223d6ff18dc5fb0927ed275f3fd58314782bdec4fe1b1919c08a`
- Static acceptance: **PASS**
- Playwright browser acceptance: **PASS**
- Pinned reference identity and matched-viewport evidence generation: **PASS**
- Page errors / console errors: **0 / 0**
- Baseline hash verification: **PASS**, unchanged.

### Verified Proto28 changes
- Hides the home collection hero while the Song Select route is active.
- Hides batch tools until the user selects the batch workspace.
- Hides the workspace action sidebar until one of the four workspace modes is selected.
- Keeps the four-button dock visible without falsely marking a workspace selected.
- Synchronizes dock selection, sidebar visibility, and batch-tool visibility with the selected workspace.
- Adds browser assertions for default state and all four workspace modes.
- Fixed an iterator error found by the first browser run; the successful rerun includes the corrected code.

### Visual comparison: evidence generated, visual acceptance NOT VERIFIED
- Official osu!-wiki reference commit: `ae2c6443a4264e5429ea7bcd2f3503be8a518a50`
- Reference image Git blob SHA: `1e927a00a1984a5ba20fa5efec639410f349607a`
- Matched viewport: 1280 × 720
- Diagnostic normalized MAE: `0.285936`
- Pixels with max-channel difference ≥ 24: 768,947 / 921,600 (83.44%); this is **not** a similarity score.
- Confirmed visual defect: after hiding the left workspace sidebar, the body still reserves about 260–288 px of left padding, leaving a large blank column and narrowing the catalog.
- The candidate still differs structurally from the Stable reference: the main content is a generic grid/catalog with AMQ filters rather than the reference's ranking panel, background composition, right-side song/beatmap list and bottom control layout.
- Exact osu!stable client source commit matching Stable `20260924.1`: **NOT VERIFIED**. Do not substitute osu!lazer.

### Remaining gates
- Fix the reserved left padding in default Song Select without breaking the workspace modes.
- Generate a uniquely named next standalone HTML candidate; preserve candidate 06 unchanged as this checkpoint.
- Continue evidence-backed geometry/layout comparison and corrections.
- Search edge cases, sort-result assertions, Enter/double-event regression, and real audio-output acceptance: **NOT RUN** in this stage.
- Full quiz answer lifecycle and multiplayer server lifecycle: **NOT RUN** in this stage.
- Home, Play, Settings, profile/statistics visual acceptance: **NOT RUN**.

## Immutable baseline and rollback

- Immutable baseline branch: `v82.85.30-proto25-ui-refactor-stage-24`
- Baseline file: `dist/amq_learning_tool_v82_85_30_workspace_proto25_stage24.html`
- Baseline source commit: `3aea33e7137b7e3e3105c76ed896a515a335c2a3`
- Baseline SHA-256: `5a0f18f47fb059427b385484086c66dd14716a03843fcba37f9eb5fe89a7d66f`
- Earlier accepted rollback candidate: `dist/amq_learning_tool_v82_85_30_workspace_proto26_song_select_04.html`
- Rollback candidate SHA-256: `c1155dc7969613bbc20914816a7833842ba8384fd25f2a4611917ee7d2dd5950`
- Draft PRs #10 and #11 remain unmerged. Do not overwrite the immutable baseline or prior candidates.

## Next task

Fix the default Song Select left-padding/layout defect on a new isolated branch and produce a uniquely named standalone candidate. Keep workspace behavior unchanged and rerun static, browser, and matched-viewport visual evidence. Do not move to homepage polish before Song Select's layout and remaining functional gates are addressed.
