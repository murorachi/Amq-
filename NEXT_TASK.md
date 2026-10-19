# Next task: accept Chinese-title loader contract, then EMQ title cache precedence

Current branch: `v82.85.32-chinese-title-loader-contract-01`.

## Current stage

- Added `tests/unit/chinese_title_loader_cache_contract.test.cjs`: 20 exact-source cases for normalization/alias filtering, identifier ambiguity, source merge priority, independent source failure, fetch abort, IndexedDB cache version/key, partial readiness and concurrent load behavior.
- Test is registered in CI and deterministic checkpoint package. Production `src/scripts/script_031.htmlpart` unchanged.
- Local execution: NOT RUN. Inspect the newest workflow run, confirm test output/package reproducibility and report Firefox/native-origin separately. Known audio output capture failure is unrelated unless real product playback regresses.

## Ordered next work

1. Resolve any contract test failures without changing production title/cache behavior merely to satisfy the test.
2. Confirm source/unit, package contract/reproducibility, deterministic build, Firefox responsive and Chromium native-origin.
3. After acceptance, create a separate contract stage for `src/scripts/script_041.htmlpart`: title cache precedence, alias merge/filtering and fail-soft external request behavior.
4. Then consider `src/scripts/script_039.htmlpart` VNDB request failures, imported ID domains, cover retry races and render limits.
5. Do not claim live upstream freshness from synthetic tests.

## Rollback

Revert the Chinese-title loader test, workflow/package registration, report and checkpoint-document changes. Keep the V82.85.31 scene-background test/report, V82.85.30 SRS test/report, V82.85.28 product source and immutable V82.82 unchanged.
