# Current Status

## Proto26: Song Select integration

Status: **Proto26.3 source-mode integration passes static and browser acceptance; persistent osu!stable-style workspace and visual comparison remain incomplete.**

### Verified baseline
- Baseline branch: `v82.85.30-proto25-ui-refactor-stage-24`
- Baseline HTML: `dist/amq_learning_tool_v82_85_30_workspace_proto25_stage24.html`
- Baseline SHA-256: `5a0f18f47fb059427b385484086c66dd14716a03843fcba37f9eb5fe89a7d66f`
- Baseline is read-only for this stage.

### Changes committed on isolated branch
- Added `engineering/proto26-song-select/song-select-integration.js` with AMQ / EMQ / MIX / Singer controls.
- Fixed MIX-mode rendering so the existing AMQ catalog is restored before AMQ and EMQ cards are combined.
- Fixed a verified initialization race: the EMQ API returns an empty work list until its gzip library finishes asynchronous loading. Proto26 now waits for `api.ready`, refreshes the work list, and rerenders an already-active EMQ/MIX view.
- Hardened browser acceptance to wait up to 30 seconds for the actual EMQ API readiness flag and assert that the API exposes work records, instead of relying on a fixed five-second sleep.
- Added a deterministic builder that rejects a baseline SHA-256 mismatch and writes a unique output path.
- Added static assertions, Playwright acceptance code, GitHub Actions workflow, and project tracking documents.
- Opened draft PR: https://github.com/murorachi/Amq-/pull/10. It remains unmerged.
- No baseline or production branch files were overwritten.

### Actual verification
- Remote source existence: PASS. GitHub contents API returned the integration JS, builder, static tests, browser test, workflow, and status documents.
- JavaScript syntax: PASS. The latest remote source parsed successfully with `new Function`; the CI static suite also passed.
- API-shape inspection: PASS. Existing API confirms `getWorks()` returns `[]` before `ready`, `getWorks()` returns work objects after load, and `getSongsForWork(work.i)` returns song-row arrays. The previous one-time snapshot was therefore a real race, not a guess.
- MIX-mode regression correction: PASS in browser acceptance. AMQ, EMQ, MIX, and Singer mode activation checks passed.
- Previous candidate browser acceptance: FAIL, caused by the EMQ asynchronous initialization race. That candidate is rejected; SHA-256 `b43a446dd8019e21b7db255e0adf56256ebffd499a12f381c0f3364210e0757c`.
- Corrected candidate browser acceptance: PASS in GitHub Actions run https://github.com/murorachi/Amq-/actions/runs/39547940204. EMQ readiness and real work records passed; EMQ cards rendered; AMQ/MIX/Singer/AMQ restoration passed; no uncaught page errors or console errors; mobile horizontal overflow check passed.
- Root cause found in API inspection: `getWorks()` returns an empty array until the EMQ loader completes asynchronous gzip decompression. Proto26 now polls `api.ready` and refreshes the work list. The fix has syntax/static source assertions, but it still requires a fresh real browser run.
- CI false-success bug found and fixed: test commands now use `set -o pipefail`. The push path filter excludes report-only commits, preventing endless reruns. The unnecessary `pull_request` trigger was removed after a duplicate PR run became approval-gated; the verified branch-push workflow is the authoritative acceptance path.
- GitHub Actions execution: PASS. Run #21 completed successfully, including static tests, Chromium installation, browser acceptance, report generation, artifact upload, and commit of the generated candidate and reports. The later PR-triggered duplicate run was `action_required`; the PR trigger has now been removed to keep acceptance on the working branch-push path.
- Corrected standalone HTML exists remotely at `dist/amq_learning_tool_v82_85_30_workspace_proto26_song_select_01.html`, size 8,933,730 bytes, SHA-256 `fae6492da52d5e1389e9b2d0122496843697d1fa42088a2805593420a296ff4f`. The GitHub contents API confirms the path exists (blob SHA `06c48b378183ce217bfa6f25762a6275fe5c89f8`); the SHA-256 comes from the CI build report.
- Official osu!stable visual comparison: NOT RUN.
- Full integrated Song Select workspace: NOT COMPLETE. The current source adds mode controls; the legacy detail overlay is still in use, and four workspaces have not been proven integrated into the same persistent view.

### Next engineering step
Continue with the persistent Song Select layout and four-workspace integration. Preserve this accepted Proto26.3 checkpoint and perform the osu!stable visual comparison before claiming visual parity. Keep PR #10 in draft until the generated HTML, browser tests, and visual comparison are verified.
