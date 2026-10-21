# Candidate 76 Test Report

Artifact: `amq_learning_tool_v82_85_30_workspace_proto28_song_select_76-workspace-panel-shell.html`

SHA-256: `2586036ce96d4c3fc0be6df2fb482a280936465e0ec51f45ed97c7a7475e136d`
Size: 9,105,137 bytes.

## Passed
- JavaScript syntax: 51/51 executable inline scripts passed `node --check`.
- CSS parse: 76/76 inline style blocks parsed without parser errors.
- HTML IDs: 0 duplicates across 245 IDs.
- Targeted source assertions: 6/6 passed.
- Chromium + Playwright desktop route tests at 1440x900: all four workspace buttons selected the matching mode/title; popup began 8px after frame; popup right edge (757px) stayed before catalog left edge (864px); black background computed to `rgba(0, 0, 0, 0.88)`; all dock buttons remained on one horizontal row; Escape closed popup and preserved Song Select route. 4/4 modes passed these assertions.
- Re-clicking the active workspace button closed the popup.
- Chromium + Playwright mobile route test at 390x844: all four workspace buttons remained in one row; popup stayed inside viewport; catalog visibility switched to hidden only while popup was open and returned after Escape.
- Screenshots captured: `CANDIDATE76_DESKTOP_EXPANDED.png`, `CANDIDATE76_DESKTOP_COLLAPSED.png`, `CANDIDATE76_MOBILE_EXPANDED.png`, plus per-mode desktop screenshots.

## Limitations / not run
- `page.set_content` produces two `localStorage` access errors because it has an opaque origin. Persistent storage and normal-origin startup are not verified.
- Direct navigation to `file://` / local HTTP is blocked in this environment.
- Individual workspace action outcomes were not exhaustively tested; the old action menu still contains actions that need functional audit and migration.
- Real audio, external cover loading, and pixel-level comparison with a running osu!stable client were not tested.
- GitHub HTML binary upload and remote HTML hash/size verification are not complete.

## Acceptance boundary
Candidate 76 is a validated layout/interaction-shell checkpoint, not full workspace feature acceptance.
