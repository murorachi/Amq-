# Current task: validate VNDB cover batching/retry lifecycle contract

Current branch: `v82.85.29-source-audit-matrix-01`.

## Previously accepted focused contracts

- SRS state transitions/persistence: 41 assertions.
- Scene-background IndexedDB/object-URL lifecycle: 29 assertions.
- EMQ Chinese-title cache precedence/filtering: 25 assertions.
- Chinese-title source mapping/partial-source failures: 19 assertions.
- Both title tests passed in [run 39250170041](https://github.com/murorachi/Amq-/actions/runs/39250170041); source verifier 132/132 passed. Confirm full source/unit and browser conclusions separately.

## Current stage

- Added `tests/unit/vndb_cover_batch_retry_lifecycle_contract.test.cjs` and CI step for `script_039.htmlpart`.
- Report: `reports/V82_85_29_VNDB_COVER_BATCH_RETRY_LIFECYCLE_CONTRACT.md`.
- Confirm the focused assertion count and source/unit result. Fix test harness defects without changing production behavior unless a concrete defect is reproduced.

## Next after acceptance

Review the deferred cache-dedup semantic difference between `script_041`'s `serverAliasMap` and `allKnownAliases`; decide whether it warrants a separate behavior-changing stage. Do not silently unify the outputs during this test stage.

## Rollback

Remove the VNDB cover test/workflow step and revert its report/status references. No production source or immutable V82.82 baseline rollback is needed.
