# Next task: VNDB navigation, request failure and cover retry contract

Current accepted branch: `v82.85.33-emq-title-cache-contract-01`.
Next stage should use a separate branch based on this checkpoint.

## Completed EMQ Chinese-title cache stage

- Added `tests/unit/emq_chinese_title_cache_contract.test.cjs`: 19 exact-source cases for cache precedence, alias normalization/filtering, OpenCC load/fallback, VNDB batch requests, Bangumi exact-match fallback and fail-soft errors.
- Product `src/scripts/script_041.htmlpart` unchanged.
- Initial CI [39240395756](https://github.com/murorachi/Amq-/actions/runs/39240395756) exposed test-harness assumptions; corrected without changing production code.
- Corrected CI [39240538829](https://github.com/murorachi/Amq-/actions/runs/39240538829): source/unit, EMQ Chinese-title 19/19, Chinese-title loader 20/20, SRS 17/17, scene-background 18/18, package reproducibility, deterministic build and Firefox responsive passed. Chromium native-origin failed only at known final audio monitor capture; all preceding storage, IndexedDB/input, suggestion, quiz and multiplayer lifecycle steps passed.

## Ordered next work

1. Start a separate contract stage for `src/scripts/script_039.htmlpart`: VNDB request failures, imported ID domains, cover retry races, render limits and navigation mounting idempotence.
2. Preserve VNDB work/song ID distinctions and current list import semantics.
3. Register tests in CI and deterministic package; record actual results.
4. Do not claim live upstream freshness from synthetic tests or modify production UI absent a reproduced defect.

## Rollback

Revert the EMQ Chinese-title test, workflow/package registration, report and checkpoint-document changes. Keep the V82.85.32 loader test/report, V82.85.31 scene-background test/report, V82.85.30 SRS test/report, V82.85.28 product source and immutable V82.82 unchanged.
