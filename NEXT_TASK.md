# Next Task

**Priority 1: complete and validate the Proto26 Song Select integration.**

Current checkpoint:
- Draft PR: https://github.com/murorachi/Amq-/pull/10
- Branch: `v82.85.30-proto26-song-select-integration-01`
- Integration JS latest commit: `5ef90689de080c897f8adfb299fff5810e9ef0c7`
- JavaScript parse check: PASS (executed against remotely fetched source in the JS runtime).
- CI run: not observed; commit status currently has no checks. Do not assume GitHub Actions executed.
- Browser acceptance: NOT RUN / BLOCKED in local container because Chromium is not installed; CI browser run not observed.
- Current scope is still an incremental source-mode integration, not final osu!stable replica.

Next actions:
1. Get a real CI execution path. Confirm whether repository Actions permissions allow the new workflow; if no run appears, use an existing authorized workflow or document the exact permission/trigger blocker.
2. Run static source assertions and Playwright in GitHub Actions; fix every failure and rerun.
3. Verify EMQ API return shapes and ensure MIX merges actual AMQ and EMQ records without losing AMQ cards.
4. Rework Song Select into a persistent workspace with selected-work/song information, and integrate the four existing workspaces without fake controls.
5. Inspect official osu!stable reference images and perform fixed viewport screenshots/diff. Do not claim visual parity before evidence.
6. Update reports, calculate SHA-256 from the generated HTML, verify the file remotely, and keep this draft PR unmerged until all gates pass.
