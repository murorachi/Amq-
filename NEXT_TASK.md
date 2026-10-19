# Current task: validate scene-background IndexedDB/object-URL contract

Current branch: `v82.85.29-source-audit-matrix-01`.

## Completed in this sequence

- First-pass audit completed for all 91 fragments: 41 scripts and 50 styles.
- SRS characterization test `tests/unit/srs_state_transition_persistence_contract.test.cjs` passed 41 assertions in [run 39248332291](https://github.com/murorachi/Amq-/actions/runs/39248332291). Source/unit and Firefox responsive passed; Chromium native-origin was still in progress at last check.
- SRS report: `reports/V82_85_29_SRS_STATE_TRANSITION_PERSISTENCE_CONTRACT.md`. No production SRS formula/schema/source changed.

## Current stage

- Added `tests/unit/scene_background_idb_object_url_lifecycle_contract.test.cjs` and its CI step.
- Report: `reports/V82_85_29_SCENE_BACKGROUND_IDB_OBJECT_URL_LIFECYCLE_CONTRACT.md`.
- First inspect the newest workflow run, then confirm the focused scene test assertion count and source/unit job. Fix the test harness if it fails; do not change production scene code merely to make the test pass.

## After acceptance

1. Consider targeted external-source/cache contracts for `script_031`, `script_039` and `script_041`.
2. Run CSS visual comparison only when a concrete style change is proposed; static duplicate selectors alone are not a reason to edit.

## Rollback

Remove the two new characterization tests and their workflow steps and revert their reports/status references. No production source or immutable V82.82 baseline rollback is needed.
