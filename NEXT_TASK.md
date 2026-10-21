# Next Task

**Priority 1: complete and validate the Proto26 Song Select integration.**

Current checkpoint:
- Draft PR: https://github.com/murorachi/Amq-/pull/10
- Branch: `v82.85.30-proto26-song-select-integration-01`
- Integration JS latest commit: `5ef90689de080c897f8adfb299fff5810e9ef0c7`
- Source fix commit: `9e2a09bb365ae80d8e234ffb6f70f6767816ef97` fixes the EMQ asynchronous initialization race.
- Browser acceptance commit: `ffcf706a8f65d5d8ef4c55ce43233b2fbdf15366` waits for `api.ready` and asserts the real work list.
- Prior GitHub Actions run produced a browser report. `EMQ mode renders actual work cards` FAILED. A false-success bug was found because piped tests lacked `set -o pipefail`; workflow corrected.
- Browser acceptance on prior candidate: FAILED on actual EMQ card rendering. The source now refreshes the EMQ work list after `api.ready`; a new CI run is required to validate it.
- Current scope is still an incremental source-mode integration, not final osu!stable replica.

Next actions:
1. Verify the latest CI run after the readiness-race fix, readiness-aware browser test, and workflow `pipefail` correction.
2. Confirm EMQ cards render after async load, and MIX contains both real AMQ cards and EMQ work cards.
3. Record the corrected standalone HTML size/SHA-256 and verify the remote file. Keep PR #10 draft until browser acceptance and osu!stable visual comparison pass.
4. Rework Song Select into a persistent workspace with selected-work/song information, and integrate the four existing workspaces without fake controls.
5. Inspect official osu!stable reference images and perform fixed viewport screenshots/diff. Do not claim visual parity before evidence.
6. Update reports, calculate SHA-256 from the generated HTML, verify the file remotely, and keep this draft PR unmerged until all gates pass.
