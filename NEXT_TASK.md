# Current task: validate Chinese-title source/cache contracts

Current branch: `v82.85.29-source-audit-matrix-01`.

## Completed characterization

- SRS state-transition/persistence: 41 assertions passed.
- Scene-background IndexedDB/object-URL lifecycle: 29 assertions passed.
- EMQ Chinese-title cache precedence/filtering: 25 assertions passed in [run 39249715083](https://github.com/murorachi/Amq-/actions/runs/39249715083); focused step passed, but verify source/unit job completion.
- Reports: `reports/V82_85_29_SRS_STATE_TRANSITION_PERSISTENCE_CONTRACT.md`, `reports/V82_85_29_SCENE_BACKGROUND_IDB_OBJECT_URL_LIFECYCLE_CONTRACT.md`, `reports/V82_85_29_EMQ_CHINESE_TITLE_CACHE_PRECEDENCE_CONTRACT.md`.

## Current stage

- Added `tests/unit/chinese_title_source_mapping_partial_failure_contract.test.cjs` and its CI step.
- Report: `reports/V82_85_29_CHINESE_TITLE_SOURCE_MAPPING_PARTIAL_FAILURE_CONTRACT.md`.
- Verify the focused test assertion count and source/unit job. Fix harness defects without changing production title resolution or cache schema.

## Next after acceptance

Inspect `script_039.htmlpart` cover batching/retry and cache behavior. Add one focused contract only if a concrete gap remains; do not contact live external services in unit tests.

## Rollback

Remove the new test/workflow steps and revert their reports/status references. No production source or immutable V82.82 baseline rollback is needed.
