# Next Task

**Priority 1: complete and validate the Proto26 Song Select integration.**

Current checkpoint:
- Draft PR: https://github.com/murorachi/Amq-/pull/10
- Branch: `v82.85.30-proto26-song-select-integration-01`
- Integration JS latest commit: `5ef90689de080c897f8adfb299fff5810e9ef0c7`
- Latest source commit: `9e2a09bb365ae80d8e234ffb6f70f6767816ef97` fixes the EMQ asynchronous initialization race; rerun parse/static tests for this revision.
- CI run: not observed; commit status currently has no checks. Do not assume GitHub Actions executed.
- Browser acceptance: NOT RUN / BLOCKED in local container because Chromium is not installed; CI browser run not observed.
- Current scope is still an incremental source-mode integration, not final osu!stable replica.

Next actions:
1. Run static assertions and verify the branch-push workflow/build outcome. The Actions connector only exposes PR-triggered runs, so absence from its PR-run lookup does not prove a push workflow did not execute.
2. Run Playwright browser acceptance in CI; if blocked, record the actual limitation rather than inferring success.
3. Verify the readiness-race fix in a browser and ensure MIX merges actual AMQ and EMQ records without losing AMQ cards.
4. Rework Song Select into a persistent workspace with selected-work/song information, and integrate the four existing workspaces without fake controls.
5. Inspect official osu!stable reference images and perform fixed viewport screenshots/diff. Do not claim visual parity before evidence.
6. Update reports, calculate SHA-256 from the generated HTML, verify the file remotely, and keep this draft PR unmerged until all gates pass.
