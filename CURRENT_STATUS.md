# Current Status

## Latest verified checkpoint (2026-10-21)
- Working branch: `v82.85.30-proto26-in-place-workspaces-01`
- Source/workflow fix commit: `1985431f5055c470633efee823ef74de4198d333`.
- CI acceptance run: https://github.com/murorachi/Amq-/actions/runs/39565629059 — **SUCCESS**.
- Generated artifact/report commit: `8228fd1d827551ee2fbff8ce3f1e5cfcf7e375c1`.
- Candidate: `dist/amq_learning_tool_v82_85_30_workspace_proto26_song_select_06.html`, 8,942,305 bytes, SHA-256 `abaf342050f0d73c0450544114b124e1f95be9cb109956f25189532e770e52ca`.
- Static assertions: PASS. Playwright Chromium acceptance: PASS. Artifact upload and generated HTML/report push: PASS.
- Browser assertions cover four workspace modes, existing list/batch/learning/analysis interactions, EMQ asynchronous load and work detail pane, AMQ/MIX/Singer mode switching, no uncaught page/console errors, and desktop/mobile overflow/drawer behavior.
- Still NOT DONE: official osu!stable screenshot visual diff; exact Stable client source commit verification; real audio-output acceptance; broader quiz and multiplayer lifecycle acceptance. Candidate 06 is a verified development checkpoint, not final UI sign-off.
- Rollback candidate remains `dist/amq_learning_tool_v82_85_30_workspace_proto26_song_select_04.html`, SHA-256 `c1155dc7969613bbc20914816a7833842ba8384fd25f2a4611917ee7d2dd5950`. Immutable Proto25 baseline SHA-256 remains `5a0f18f47fb059427b385484086c66dd14716a03843fcba37f9eb5fe89a7d66f` and must not be overwritten.


## Active work: Proto26 Song Select integration

Status: **Proto26.8 in-place workspace implementation committed; browser/static acceptance pending.** The four dock modes now target the existing watchlist, learning-plan and dashboard panels while preserving the app route as `catalog`. This is a candidate change, not final UI acceptance.

### Immutable AMQ baseline
- Branch: `v82.85.30-proto25-ui-refactor-stage-24`
- File: `dist/amq_learning_tool_v82_85_30_workspace_proto25_stage24.html`
- Source commit: `3aea33e7137b7e3e3105c76ed896a515a335c2a3`
- SHA-256: `5a0f18f47fb059427b385484086c66dd14716a03843fcba37f9eb5fe89a7d66f`
- Baseline is read-only and must not be overwritten.

### Latest accepted development candidate
- Branch: `v82.85.30-proto26-song-select-integration-01`
- Draft PR: https://github.com/murorachi/Amq-/pull/10
- Candidate: `dist/amq_learning_tool_v82_85_30_workspace_proto26_song_select_04.html`
- Candidate tested by CI commit: `a627c118e05ab1aef7ac9fb46304c0b075aebf8f`
- Final artifact/report commit: `be80c913beb7d3ec49b978d2c1d4169da0462a5f`
- Size: 8,938,670 bytes
- SHA-256: `c1155dc7969613bbc20914816a7833842ba8384fd25f2a4611917ee7d2dd5950`
- GitHub Actions acceptance run #72: https://github.com/murorachi/Amq-/actions/runs/39550068389 (PASS)
- Generated candidate and reports exist on the isolated branch. PR remains draft and unmerged.

### Verified changes
- Added AMQ / EMQ / MIX / Singer controls while reusing the existing catalog tabs and song-row renderer.
- Corrected MIX rendering to restore the existing AMQ catalog before composing mixed results.
- Corrected EMQ asynchronous initialization race by waiting for the existing API's readiness signal.
- Desktop selected-work details remain in a persistent right-side pane; mobile uses a closable drawer.
- Workspace sidebar and dock remain visible beside Song Select on desktop.
- Browser acceptance verified all four workspace buttons update the corresponding existing panel title.
- Search and filter toolbar, batch tools, catalog and audio dock remain available; tested viewports had no horizontal overflow.
- No uncaught page errors or browser console errors were reported in the accepted run.
- Builder rejects baseline hash mismatch, injects the source only once, and produces a uniquely versioned standalone HTML.

### Test status
- Static assertions: **PASS** (CI run #72).
- Playwright Chromium acceptance: **PASS** (CI run #72).
- Existing AMQ baseline hash unchanged: **PASS** (builder assertion).
- Official Stable reference identity: public stable release label Stable `20260924.1` previously pinned by Proto24 audit.
- Official osu!-wiki references: pinned commit `ae2c6443a4264e5429ea7bcd2f3503be8a518a50`.
- Exact client source commit matching osu!stable Stable `20260924.1`: **NOT VERIFIED**. Do not use `ppy/osu` lazer source as a substitute.
- Same-viewport visual diff against official Song Select screenshot: **NOT RUN**.
- Full in-place workspace content/action integration: **NOT COMPLETE**.
- Home, Play, Settings, profile/statistics visual acceptance against pinned references: **NOT RUN in this Proto26 stage**.
- Real audio-output acceptance, full quiz answer lifecycle and multiplayer server lifecycle: not covered by this stage's browser test.

### Proto26.8 in-progress change
- Added a route map in `song-select-integration.js`: lists → existing `watchlist` view; batch → existing `catalog` view; learning → existing `learningPlan` view; analysis → existing `dashboard` view. This uses the existing `window.__aniNavigateApp` router and does not duplicate business logic.
- Expanded browser acceptance to assert the expected active route and visible main content surface for each dock button.
- First CI attempt exposed a stale static assertion still expecting `proto26.6`. Fixed the assertion; static acceptance then passed on the next push run. Chromium install/browser acceptance are still in progress, so Proto26.7 is not yet accepted.

### Newly pinned reference audit
- `engineering/proto26-song-select/OSU_STABLE_REFERENCE_AUDIT.md`
- Commit: `615ef8b92452009285845bf96a5609d0c8216784`
- It records pinned Stable/Wiki identifiers and the exact remaining verification gates.

### Next engineering work
1. Trace actual `[data-ws]` and `#wsActions .wsAction` handlers and their destination DOM. Do not infer content targets from labels.
2. Integrate the existing list-management, batch, learning and analysis content into the Song Select main region without cloning business logic or disrupting playback.
3. Add assertions that prove the main content region changes, not merely the selected button/title.
4. Capture and compare the candidate against the pinned official Song Select reference at matching 1440x900 viewport. Report geometry/overlay evidence; do not claim a similarity percentage without measurement.
5. Only after those gates, return to homepage, Play and Settings work in the user's stated priority order.
