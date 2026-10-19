# Current task: validate Chinese-title IndexedDB cache contract

Current branch: `v82.85.29-source-audit-matrix-01`.

## Previously accepted focused contracts

- SRS transitions/persistence: 41 assertions passed.
- Scene-background IndexedDB/object-URL lifecycle: 29 assertions passed.
- EMQ Chinese-title cache precedence/filtering: 25 assertions passed.
- Chinese-title source mapping/partial-source failures: 19 assertions passed.
- VNDB cover batching/retry lifecycle: 26 assertions passed.
- Alias semantics decision: production change deferred because no harmful consumer behavior was demonstrated.

## Current stage

- Added `tests/unit/chinese_title_indexeddb_cache_version_contract.test.cjs` and CI step.
- Report: `reports/V82_85_29_CHINESE_TITLE_INDEXEDDB_CACHE_VERSION_CONTRACT.md`.
- Verify focused test assertion count and source/unit result. Keep the current array acceptance as a documented observation; do not alter production cache validation in this test-only stage.

## After acceptance

Review the remaining historical debt categories and decide which need concrete follow-up. Preserve the V82.82 baseline and avoid broad refactors without a demonstrated behavior or maintainability benefit.

## Rollback

Remove the cache contract and workflow step and revert its report/status references. No production source or immutable V82.82 baseline rollback is needed.
