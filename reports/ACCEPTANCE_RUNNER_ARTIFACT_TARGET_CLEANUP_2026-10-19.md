# Acceptance runner artifact-target cleanup report

- Date: 2026-10-19
- Branch: `v82.85.13-real-audio-acceptance-gate-01`
- Source checkpoint: `1e153a1b8b51d04a532ffcd26103bb28f4c86379`
- Acceptance run: [39191769254](https://github.com/murorachi/Amq-/actions/runs/39191769254)
- Product HTML/source logic changed: **No**.
- Immutable V82.82 baseline: unchanged.

## Changes

1. `tools/run_all_checks.py` now builds the V82.85.12 candidate to `dist/amq_learning_tool_v82_85_12.html` before current-version browser integration.
2. Quiz suggestion integration uses the versioned candidate instead of a stale V82.80 path.
3. Removed the default-runner invocation of the V82.80/V82.81 historical CSS geometry baseline. Its test script remains available for deliberate use with the archived matching HTML; it is not silently run against the current candidate.
4. Removed the final build target that wrote the current release into the V82.82-named output path. `tools/verify.py` remains the deterministic build/integrity gate.
5. Added `tests/unit/run_all_checks_config_contract.py` and wired it into the source/unit CI job to guard the output target and current-version test path.

## Test results

- Acceptance-runner configuration contract: **PASS**.
- Source fingerprints and deterministic build verification: **PASS**.
- Firefox responsive acceptance: **PASS**.
- Quiz suggestion/input browser integration: **PASS** against V82.85.12 candidate.
- Multiplayer room/phase/live-draft/reconnect: **PASS**.
- CI real-browser audio output capture: **FAIL / previously deferred**. The only failed step was the final PCM output assertion; the browser monitor capture issue remains separate from this cleanup.
- Entire `tools/run_all_checks.py` command list: **NOT RUN end-to-end** in this task. The CI run exercised the focused configuration contract and current acceptance workflow; do not claim that every default runner command was executed.

## Risk and rollback

The change is limited to engineering test orchestration and a guard test. Product behavior and the standalone product HTML were not changed. If rollback is required, revert the runner/config-contract/workflow commits together; do not overwrite or rename the immutable V82.82 artifact.
