# Current task: historical technical-debt disposition review

Current branch: `v82.85.29-source-audit-matrix-01`.

## Completed focused characterization

- SRS transitions/persistence: 41 assertions passed.
- Scene-background IndexedDB/object-URL lifecycle: 29 assertions passed.
- EMQ Chinese-title cache precedence/filtering: 25 assertions passed.
- Chinese-title source mapping/partial-source failures: 19 assertions passed.
- Chinese-title IndexedDB cache version/read/write: 14 assertions passed in [run 39251152871](https://github.com/murorachi/Amq-/actions/runs/39251152871).
- VNDB cover batching/retry lifecycle: 26 assertions passed.
- The source verifier (132/132), all source/unit steps and Firefox responsive passed in the latest recorded cache run; Chromium native-origin was still in progress.
- Reports for each contract are under `reports/V82_85_29_*_CONTRACT.md`. No production runtime source changed.

## Current stage

- Refresh `reports/HISTORICAL_TECHNICAL_DEBT_INVENTORY_2026-10-19.md` with a concise evidence-based disposition table.
- Classify items as fixed/closed, covered by tests but still architecturally coupled, deferred by design, or still unverified. Do not label a risk fixed just because a contract exists.
- Record the known alias dedup and cache-array observations as deferred, not production bugs unless a consumer impact is demonstrated.
- Verify current CI conclusions separately from the known audio-output capture issue.

## Rollback

Revert only the inventory/status documentation updates. No production source or immutable V82.82 baseline rollback is needed.
