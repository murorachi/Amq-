# Next task: EMQ Chinese-title cache precedence and alias contract

Current accepted branch: `v82.85.32-chinese-title-loader-contract-01`.
Next stage should use a separate branch based on this checkpoint.

## Completed Chinese-title loader stage

- Added `tests/unit/chinese_title_loader_cache_contract.test.cjs`: 20 exact-source cases for normalization/alias filtering, identifier ambiguity, source merge priority, independent source failure, fetch abort, IndexedDB cache version/key, partial readiness and concurrent load behavior.
- Product `src/scripts/script_031.htmlpart` unchanged.
- Initial CI [39239399557](https://github.com/murorachi/Amq-/actions/runs/39239399557) found one harness timing assumption; corrected without changing production code.
- Corrected CI [39239470902](https://github.com/murorachi/Amq-/actions/runs/39239470902): source/unit, Chinese-title 20/20, SRS 17/17, scene-background 18/18, package reproducibility, deterministic build and Firefox responsive passed. Chromium native-origin failed only at known final audio monitor capture (peak=0, rms=0); all preceding storage, IndexedDB/input, suggestion, quiz and multiplayer lifecycle steps passed.

## Ordered next work

1. Start a separate contract stage for `src/scripts/script_041.htmlpart`: cache precedence, alias merge/filtering, VNDB/Bangumi fallback and fail-soft request behavior.
2. Preserve VNDB work IDs as cache keys, existing source provenance, alias normalization and OpenCC fallback behavior.
3. Register tests in CI and deterministic package; record actual results.
4. Then consider `src/scripts/script_039.htmlpart` VNDB request failures, imported ID domains, cover retry races and render limits.
5. Do not claim live upstream freshness from synthetic tests.

## Rollback

Revert the Chinese-title loader test, workflow/package registration, report and checkpoint-document changes. Keep V82.85.31 scene-background test/report, V82.85.30 SRS test/report, V82.85.28 product source and immutable V82.82 unchanged.
