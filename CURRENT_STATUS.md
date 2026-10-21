# Current Status

## Proto26: Song Select integration

Status: **Integration source and reproducible CI pipeline committed; browser acceptance pending.**

### Verified baseline
- Baseline branch: `v82.85.30-proto25-ui-refactor-stage-24`
- Baseline HTML: `dist/amq_learning_tool_v82_85_30_workspace_proto25_stage24.html`
- Baseline SHA-256: `5a0f18f47fb059427b385484086c66dd14716a03843fcba37f9eb5fe89a7d66f`
- Baseline is read-only for this stage.

### Current implementation
- Added `engineering/proto26-song-select/song-select-integration.js` with corrected catalog tab selector and AMQ/EMQ/MIX/Singer mode controls.
- Added a deterministic builder that rejects a baseline SHA-256 mismatch and writes a new versioned output:
  `dist/amq_learning_tool_v82_85_30_workspace_proto26_song_select_01.html`.
- Added source assertions, Playwright browser acceptance, and a GitHub Actions workflow intended to build, test, capture screenshots, and commit the candidate only after successful acceptance.
- Existing embedded AMQ data, EMQ API, song-row creation and audio dock are reused. The selected work still uses the existing detail overlay; converting that into a persistent osu!-style integrated detail pane remains unfinished.

### Test status
- Initial root cause found in the abandoned local prototype: malformed JavaScript declaration `tabs = ,`. It was not present in the official baseline and has been corrected in the new integration source by selecting `$('.tabs.view-catalog')`.
- GitHub contents API verification: integration source, builder, static tests, browser acceptance script, workflow and project status documents exist on the isolated branch.
- Local Chromium browser test: **blocked by this execution environment** (`ERR_BLOCKED_BY_ADMINISTRATOR` for local file and localhost navigation); do not treat as a pass.
- CI browser acceptance: **pending verification**. Do not call the UI accepted until the workflow is observed to pass and its generated HTML/hash are verified remotely.
- Official osu!stable image comparison: not yet performed.

### Safety
- No baseline HTML overwritten.
- No production branch updated.
- Do not promote the candidate until the real CI run and visual comparison pass.
