# Current Status

## Proto26: Song Select integration

Status: **EMQ startup race fix committed; previous browser acceptance failed and the CI pipeline’s false-success bug is being corrected. Full workspace UI remains incomplete.**

### Verified baseline
- Baseline branch: `v82.85.30-proto25-ui-refactor-stage-24`
- Baseline HTML: `dist/amq_learning_tool_v82_85_30_workspace_proto25_stage24.html`
- Baseline SHA-256: `5a0f18f47fb059427b385484086c66dd14716a03843fcba37f9eb5fe89a7d66f`
- Baseline is read-only for this stage.

### Changes committed on isolated branch
- Added `engineering/proto26-song-select/song-select-integration.js` with AMQ / EMQ / MIX / Singer controls.
- Fixed MIX-mode rendering so the existing AMQ catalog is restored before AMQ and EMQ cards are combined.
- Fixed a verified initialization race: the EMQ API returns an empty work list until its gzip library finishes asynchronous loading. Proto26 now waits for `api.ready`, refreshes the work list, and rerenders an already-active EMQ/MIX view.
- Added a deterministic builder that rejects a baseline SHA-256 mismatch and writes a unique output path.
- Added static assertions, Playwright acceptance code, GitHub Actions workflow, and project tracking documents.
- Opened draft PR: https://github.com/murorachi/Amq-/pull/10. It remains unmerged.
- No baseline or production branch files were overwritten.

### Actual verification
- Remote source existence: PASS. GitHub contents API returned the integration JS, builder, static tests, browser test, workflow, and status documents.
- JavaScript syntax: previous revision passed a `new Function` parse check. The new readiness-race revision still requires a fresh parse/static run.
- API-shape inspection: PASS. Existing API confirms `getWorks()` returns `[]` before `ready`, `getWorks()` returns work objects after load, and `getSongsForWork(work.i)` returns song-row arrays. The previous one-time snapshot was therefore a real race, not a guess.
- MIX-mode regression correction: committed after code inspection; runtime interaction test still pending.
- Browser acceptance on the prior generated candidate: FAIL. The GitHub Actions browser report showed `FAIL EMQ mode renders actual work cards`; other listed checks passed. Prior output SHA-256 was `b43a446dd8019e21b7db255e0adf56256ebffd499a12f381c0f3364210e0757c`, but that artifact predates the readiness-race fix and is not accepted.
- Root cause found in API inspection: `getWorks()` returns an empty array until the EMQ loader completes asynchronous gzip decompression. Proto26 now polls `api.ready` and refreshes the work list. The fix has syntax/static source assertions, but it still requires a fresh real browser run.
- CI false-success bug found: test commands were piped through `tee` without `set -o pipefail`, allowing a failing browser test to leave the step successful. This is fixed in the workflow. The push path filter was narrowed so report commits do not retrigger the workflow indefinitely.
- GitHub Actions execution: a prior run definitely executed because it produced the browser report and generated HTML. Its browser assertion failed, but the workflow incorrectly treated the piped command as success. The corrected workflow now enables `pipefail` and excludes report-only commits from its push path filter. A fresh run for the corrected revision is not yet verified.
- Official osu!stable visual comparison: NOT RUN.
- Prior generated standalone HTML exists remotely (8,932,924 bytes, SHA-256 `b43a446dd8019e21b7db255e0adf56256ebffd499a12f381c0f3364210e0757c`), but it predates the race fix and failed browser acceptance. It is explicitly not accepted as the current candidate. The corrected revision’s HTML hash remains pending.
- Full integrated Song Select workspace: NOT COMPLETE. The current source adds mode controls; the legacy detail overlay is still in use, and four workspaces have not been proven integrated into the same persistent view.

### Next engineering step
Verify a fresh CI run with `pipefail`, confirm the EMQ work cards render after async library load, and record the new output hash. Only then continue the persistent Song Select layout and four-workspace integration. Keep PR #10 in draft until the generated HTML, browser tests, and visual comparison are verified.
