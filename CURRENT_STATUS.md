# Current Status

## Proto26: Song Select integration

Status: **Incremental source-mode code committed; acceptance and full workspace UI remain incomplete.**

### Verified baseline
- Baseline branch: `v82.85.30-proto25-ui-refactor-stage-24`
- Baseline HTML: `dist/amq_learning_tool_v82_85_30_workspace_proto25_stage24.html`
- Baseline SHA-256: `5a0f18f47fb059427b385484086c66dd14716a03843fcba37f9eb5fe89a7d66f`
- Baseline is read-only for this stage.

### Changes committed on isolated branch
- Added `engineering/proto26-song-select/song-select-integration.js` with AMQ / EMQ / MIX / Singer controls.
- Fixed MIX-mode rendering so the existing AMQ catalog is restored before AMQ and EMQ cards are combined.
- Added a deterministic builder that rejects a baseline SHA-256 mismatch and writes a unique output path.
- Added static assertions, Playwright acceptance code, GitHub Actions workflow, and project tracking documents.
- Opened draft PR: https://github.com/murorachi/Amq-/pull/10. It remains unmerged.
- No baseline or production branch files were overwritten.

### Actual verification
- Remote source existence: PASS. GitHub contents API returned the integration JS, builder, static tests, browser test, workflow, and status documents.
- JavaScript syntax: PASS. Parsed the remotely fetched integration source using the JavaScript runtime `new Function`; no syntax exception. This is a parse check only, not execution or browser acceptance.
- MIX-mode regression correction: committed after code inspection; runtime interaction test still pending.
- Browser test: NOT RUN. The local environment has no installed Playwright Chromium; browser launch reported the missing executable. This is an environment limitation, not a passing test.
- GitHub Actions execution: NOT VERIFIED. The latest checked commit status had no status checks, and the PR-run lookup returned no workflow runs. Do not assume the newly added workflow executed.
- Official osu!stable visual comparison: NOT RUN.
- Generated standalone HTML and its SHA-256: NOT YET GENERATED/VERIFIED remotely.
- Full integrated Song Select workspace: NOT COMPLETE. The current source adds mode controls; the legacy detail overlay is still in use, and four workspaces have not been proven integrated into the same persistent view.

### Next engineering step
Resolve the workflow execution path and obtain a real browser run. Then fix runtime/API-shape failures before continuing the persistent Song Select layout and four-workspace integration. Keep PR #10 in draft until the generated HTML, browser tests, and visual comparison are verified.
