# Batch 4 summary — Candidate302 route and storage audit

Date: 2026-10-25

## Baseline protection
Candidate302 remains the formal, immutable baseline: 1,720,249 bytes; SHA-256 `f718a744057be0a33d371306f1742aaeede90e84f33d9e62ab45f5e6db488abd`. Candidate295 rollback remains unchanged.

## Results
- Expanded isolated Chromium route matrix: **15/15 PASS**, 0 FAIL, 0 page errors.
- Coverage: Song Select intercepts for watchlist/practice/explore/learningPlan/dashboard/vnList; VNDB special branch; normal practice/quiz/multiplayer/explore/learningPlan/dashboard/catalog/watchlist routes.
- Tests used actual extracted navigation scripts with stubbed DOM/API. They are not full application E2E.
- Static caller/writer map completed for `aniCustomPracticeListsV1`, `aniCustomPracticeListsRecoveryV825[_N]`, `aniEmqWorkListsV8254`, and `aniEmqWorkListsSelectedV8254`.
- AMQ and EMQ schemas remain separate. AMQ recovery snapshots are required safety data. Anonymous fallback reader remains an integration candidate, not approved for deletion.
- No application source edits or deletions; DELETE=0.

## Blockers and unrun tests
- Candidate302 HTML fetch from this branch still returns 404; remote artifact and SHA-256 verification are **BLOCKED**.
- Matching `data.js` and `emq-data.js` were not found under the local work directory. Full-app AMQ/EMQ/MIX E2E, runtime observer/timer/listener lifecycle tests, and CSS computed-style comparisons are **NOT RUN**.
- The detailed local package includes `BATCH4_CANONICAL_STORAGE_ROUTE_REPORT_20261025.md`, `BATCH4_CANONICAL_STORAGE_CALLER_WRITER_MAP.json`, `BATCH4_EXPANDED_ROUTE_TEST_RESULTS.json`, and `AMQ_Batch4_Canonical_Storage_Route_Candidate302_20261025.zip`.

## Next
Resolve remote HTML artifact transfer, find hash-matching data assets, then run full-app smoke and runtime lifecycle/CSS checks before considering any deletion.
