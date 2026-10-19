# Current task: validate SRS state-transition and persistence contract

Current branch: `v82.85.29-source-audit-matrix-01`.

## Current stage

- Added `tests/unit/srs_state_transition_persistence_contract.test.cjs` and the corresponding CI step.
- Report: `reports/V82_85_29_SRS_STATE_TRANSITION_PERSISTENCE_CONTRACT.md`.
- Production `src/scripts/script_020.htmlpart` is unchanged. Test exercises extracted production functions with synthetic in-memory storage.
- CI is pending. First confirm the focused test itself passes and inspect the source/unit job; do not infer success from the workflow file.
- Known unrelated browser-native audio capture assertion may still fail; report it separately from source/unit results.

## After SRS acceptance

1. Add scene-background IndexedDB transaction and object-URL lifecycle characterization for `src/scripts/script_036.htmlpart`.
2. Then consider targeted external-source/cache contracts for `script_031`, `script_039` and `script_041`.
3. Only run CSS visual comparisons when a concrete style change is proposed; static duplicate selectors alone are not a reason to edit.

## Rollback

Remove the SRS test and its workflow step and revert its report/status references. No production source or immutable V82.82 baseline rollback is needed.
