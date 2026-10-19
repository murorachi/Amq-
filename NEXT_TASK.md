# Current task: validate EMQ Chinese-title cache contract

Current branch: `v82.85.29-source-audit-matrix-01`.

## Completed characterization

- SRS state-transition/persistence: 41 assertions passed; source/unit and Firefox responsive passed.
- Scene-background IndexedDB/object-URL lifecycle: 29 assertions passed; source/unit and Firefox responsive passed.
- Reports: `reports/V82_85_29_SRS_STATE_TRANSITION_PERSISTENCE_CONTRACT.md` and `reports/V82_85_29_SCENE_BACKGROUND_IDB_OBJECT_URL_LIFECYCLE_CONTRACT.md`.
- Full workflow browser-native job still needs status reporting; known non-silent audio capture failure is not to be conflated with source/unit results or user-confirmed product playback.

## Current stage

- Added `tests/unit/emq_chinese_title_cache_precedence_contract.test.cjs` and CI step.
- Report: `reports/V82_85_29_EMQ_CHINESE_TITLE_CACHE_PRECEDENCE_CONTRACT.md`.
- Verify focused test assertion count and source/unit job. If the test fails, fix only the harness unless the evidence demonstrates a real production defect. Do not change cache precedence as a test convenience.

## Next after acceptance

Inspect `script_031` partial-source/cache behavior and `script_039` cover batching/retry behavior. Add further tests only where a specific high-value gap remains; do not contact live external services in unit tests.

## Rollback

Remove the EMQ title test and workflow step, then revert its report/status references. No production source or immutable V82.82 baseline rollback is needed.
