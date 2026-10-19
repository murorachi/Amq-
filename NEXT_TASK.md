# Next task: accept EMQ title-cache contract, then VNDB navigation contract

Current branch: `v82.85.33-emq-title-cache-contract-01`.

## Current stage

- Added `tests/unit/emq_chinese_title_cache_contract.test.cjs`: 19 exact-source cases for cache precedence, alias normalization/filtering, OpenCC load/fallback, VNDB batch requests, Bangumi exact-match fallback, and fail-soft errors.
- Test is registered in CI and deterministic checkpoint package. Production `src/scripts/script_041.htmlpart` unchanged.
- Local execution: NOT RUN. Inspect the newest workflow run, verify the test output/package reproducibility and report Firefox/native-origin separately. Known audio monitor capture failure is unrelated unless actual product playback regresses.

## Ordered next work

1. Resolve any test-harness failures without changing production title/cache behavior merely to satisfy tests.
2. Confirm source/unit, package contract/reproducibility, deterministic build, Firefox responsive and Chromium native-origin.
3. After acceptance, add a separate contract for `src/scripts/script_039.htmlpart`: VNDB request failures, imported ID domains, cover retry races and render limits.
4. Do not claim live upstream freshness from synthetic tests.

## Rollback

Revert the EMQ Chinese-title test, workflow/package registration, report and checkpoint-document changes. Keep the V82.85.32 loader test/report, V82.85.31 scene-background test/report, V82.85.30 SRS test/report, V82.85.28 product source and immutable V82.82 unchanged.
