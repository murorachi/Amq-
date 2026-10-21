# Current Status

## Active work: Proto26 Song Select integration

Status: **Proto26.6 is a verified development checkpoint, not final UI acceptance.** Four workspace buttons activate their existing side-panel content, and the shell remains visible next to Song Select. Full in-place workspace content/action integration and osu!stable screenshot comparison are still incomplete.

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
