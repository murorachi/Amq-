# Next task: accept VNDB navigation contract and reassess remaining audit gaps

Current branch: `v82.85.34-vndb-navigation-contract-01`.

## Current stage

- Added `tests/unit/vndb_navigation_contract.test.cjs`: 15 exact-source cases for cover request batching/retry, URL fallback, cache cap, render limit, list import, VNDB ID preservation, token non-persistence and the 10,000-item cap.
- Test is registered in CI and deterministic checkpoint package. Production `src/scripts/script_039.htmlpart` unchanged.
- Local execution: NOT RUN. Inspect newest workflow, confirm the contract test/package reproducibility, and report Firefox/native-origin separately. The known audio monitor capture failure is unrelated unless actual playback regresses.

## Ordered next work

1. Resolve any test harness issues without changing product behavior merely to satisfy the tests.
2. Confirm source/unit, package contract/reproducibility, deterministic build, Firefox responsive and Chromium native-origin.
3. After acceptance, review the remaining audit matrix and pick the next uncovered high-risk boundary from concrete evidence, not file size alone.
4. Do not begin a broad UI refactor or claim live VNDB API availability from synthetic tests.

## Rollback

Revert the VNDB navigation test, workflow/package registration, report and checkpoint-document changes. Keep the V82.85.33 EMQ title test/report, V82.85.32 loader test/report, V82.85.31 scene-background test/report, V82.85.30 SRS test/report, V82.85.28 product source and immutable V82.82 unchanged.
