# Current Status

## Proto26: Song Select integration

Status: **Proto26.5 source modes, persistent detail pane, and four-workspace shell coexistence pass static and browser acceptance. In-place workspace-action integration and osu!stable visual comparison remain incomplete.**

### Verified baseline
- Baseline branch: `v82.85.30-proto25-ui-refactor-stage-24`
- Baseline HTML: `dist/amq_learning_tool_v82_85_30_workspace_proto25_stage24.html`
- Baseline SHA-256: `5a0f18f47fb059427b385484086c66dd14716a03843fcba37f9eb5fe89a7d66f`
- Baseline is read-only for this stage.

### Changes committed on isolated branch
- Added `engineering/proto26-song-select/song-select-integration.js` with AMQ / EMQ / MIX / Singer controls.
- Proto26.4 adds a persistent desktop right-side selected-work details pane while retaining a full-screen, closable mobile drawer. Proto26.5 keeps the existing workspace sidebar and bottom dock visible alongside Song Select on desktop, and verifies that all four workspace panels activate. The legacy detail data/actions remain reused rather than duplicated.
- Fixed MIX-mode rendering so the existing AMQ catalog is restored before AMQ and EMQ cards are combined.
- Fixed a verified initialization race: the EMQ API returns an empty work list until its gzip library finishes asynchronous loading. Proto26 now waits for `api.ready`, refreshes the work list, and rerenders an already-active EMQ/MIX view.
- Hardened browser acceptance to wait up to 30 seconds for the actual EMQ API readiness flag and assert that the API exposes work records, instead of relying on a fixed five-second sleep.
- Fixed injection ordering: the builder now appends Proto26 after the legacy document's trailing styles/scripts, so old `#overlay.open` rules no longer override the new pane CSS.
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
- Proto26.3 candidate browser acceptance: PASS in GitHub Actions run https://github.com/murorachi/Amq-/actions/runs/39547940204.
- Proto26.4 browser acceptance: PASS in GitHub Actions run https://github.com/murorachi/Amq-/actions/runs/39549067049.
- Proto26.5 browser acceptance: PASS in GitHub Actions run https://github.com/murorachi/Amq-/actions/runs/39550068389. The workspace sidebar and dock are visible in catalog; four workspace buttons activate their existing panels; AMQ/EMQ/MIX/Singer and the right-side details pane still work; console error list is empty; no page errors or mobile horizontal overflow. Screenshot/report artifact: https://github.com/murorachi/Amq-/actions/runs/39550068389/artifacts/12322684082.
- Earlier browser failures were real and corrected: EMQ readiness race; test clicks against a hidden home-view catalog; legacy `#overlay.open` CSS overriding the side pane; and legacy CSS hiding the workspace shell despite the active catalog route. Proto26.5 now synchronizes the sidebar/dock display against the active workspace state and browser tests exercise all four workspace buttons.
- CI false-success bug found and fixed: test commands use `set -o pipefail`. Report-only commits are excluded from the push path filter. A concurrency group serializes runs, and the artifact commit step now fetches/reset-to-remote before reapplying generated files, preventing non-fast-forward pushes.
- GitHub Actions execution: PASS. Run #46, https://github.com/murorachi/Amq-/actions/runs/39549067049, completed static acceptance, Chromium installation, browser acceptance, report/artifact upload, and remote artifact commit successfully. Run #43 had browser acceptance PASS but its concurrent push failed; the race-safe commit path fixed that issue. A follow-up PR-triggered duplicate run is `action_required`, but it is not the successful acceptance run.
- Accepted Proto26.5 standalone HTML exists remotely at `dist/amq_learning_tool_v82_85_30_workspace_proto26_song_select_03.html`, size 8,938,405 bytes, SHA-256 `aa7da030b6324526cbdd0497b71b1607b8c832497940f5041a1dad559f6e7d06`. GitHub contents lookup confirms the path exists (blob SHA `d80138b44fdbff298735a4fe7f8853089a1aa570`); size/hash are from the passing CI report.
- Proto26.4 remains a prior accepted rollback checkpoint at `dist/amq_learning_tool_v82_85_30_workspace_proto26_song_select_02.html`, SHA-256 `9d052a0557a021309a596bf0fcdb127389107dc9b08878e63d13b31c4d6d15af`.
- Official osu!stable visual comparison: NOT RUN.
- Full integrated Song Select workspace: NOT COMPLETE. The current source adds mode controls; the legacy detail overlay is still in use, and four workspaces have not been proven integrated into the same persistent view.

### Next engineering step
Continue integrating workspace actions into the same Song Select view instead of navigating away to separate pages, while preserving each existing action/data path. Then compare fixed-viewport screenshots against official osu!stable references. Proto26.5 is accepted for continued development, not final UI sign-off. Keep PR #10 in draft until those remaining gates pass. Keep PR #10 in draft until the generated HTML, browser tests, and visual comparison are verified.
