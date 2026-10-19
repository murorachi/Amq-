# Current task: VNDB cover batching and retry contract

Current branch: `v82.85.29-source-audit-matrix-01`.

## Completed characterization

- SRS transitions/persistence: 41 assertions passed.
- Scene-background IndexedDB/object-URL lifecycle: 29 assertions passed.
- EMQ Chinese-title cache precedence/filtering: 25 assertions passed.
- General Chinese-title source mapping/partial-source failures: 19 assertions passed.
- The two title contracts passed in [run 39250170041](https://github.com/murorachi/Amq-/actions/runs/39250170041); source verifier 132/132 passed. Check full source/unit and browser job conclusions before finalizing overall CI status.

## Current stage

- Inspect `src/scripts/script_039.htmlpart` and add a deterministic exact-source contract for VNDB cover request batching (30 IDs per request), failed-ID/loading-set cleanup, missing cover detail handling, and retry-state reset.
- Mock all external fetches. Do not call live VNDB.
- No production change unless the tests expose a reproduced defect with a clear minimal fix; current stage is characterization first.

## Rollback

Remove the new test/workflow step and revert its report/status references. No production source or immutable V82.82 baseline rollback is needed.
