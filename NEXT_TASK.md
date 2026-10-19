# Current task: assess EMQ alias deduplication semantics

Current branch: `v82.85.29-source-audit-matrix-01`.

## Completed focused contracts

- SRS transitions/persistence: 41 assertions passed.
- Scene-background IndexedDB/object-URL lifecycle: 29 assertions passed.
- EMQ Chinese-title cache precedence/filtering: 25 assertions passed.
- General Chinese-title source mapping/partial-source failures: 19 assertions passed.
- VNDB cover batching/retry lifecycle: 26 assertions passed in [run 39250489886](https://github.com/murorachi/Amq-/actions/runs/39250489886). Source verifier 132/132, source/unit and Firefox responsive passed; Chromium native-origin was still running at last check.

## Current stage

- Review `script_041.htmlpart`'s `serverAliasMap`, `allKnownAliases` and their consumers to decide whether exact-vs-normalized deduplication is a real correctness issue or an intentional presentation/transport distinction.
- Trace current consumers and tests. Do not modify production behavior without evidence that the difference causes duplicate answers, payload overflow or inconsistent matching.
- If no reliable behavior defect is demonstrated, record the finding as deferred and move on.

## Rollback

This is a review-only stage. Revert its report/status references if necessary; no production source rollback is needed.
