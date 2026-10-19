# Current task: Chinese-title IndexedDB cache version contract

Current branch: `v82.85.29-source-audit-matrix-01`.

## Completed focused contracts

- SRS transitions/persistence: 41 assertions passed.
- Scene-background IndexedDB/object-URL lifecycle: 29 assertions passed.
- EMQ Chinese-title cache precedence/filtering: 25 assertions passed.
- Chinese-title source mapping/partial-source failures: 19 assertions passed.
- VNDB cover batching/retry lifecycle: 26 assertions passed.
- Alias semantics decision documented; no production change justified by current evidence.

## Current stage

- Add a deterministic contract for `script_031.htmlpart` cache version validation, valid cache read, invalid/stale cache rejection, write payload shape and write-failure behavior.
- Stub IndexedDB interactions at the cache boundary. Do not change DB name, store name, cache key, version or production behavior.
- Confirm focused test and source/unit CI before acceptance.

## After acceptance

Review the remaining historical debt categories and decide whether they need a concrete follow-up or can remain documented risks. Do not start a broad rewrite solely to reduce audit debt counts.

## Rollback

Remove the cache contract and workflow step and revert its report/status references. No production source or immutable V82.82 baseline rollback is required.
