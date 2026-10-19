# V82.85.33 EMQ Chinese-title cache precedence and fallback contract

- Branch: `v82.85.33-emq-title-cache-contract-01`
- Parent checkpoint: `v82.85.32-chinese-title-loader-contract-01`
- Product source baseline: V82.85.28; `src/scripts/script_041.htmlpart` unchanged (blob `0c5de62e62f36d35647b67825494a92b759a7c9f`).
- Immutable V82.82 product baseline remains 8,787,490 bytes, SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`.
- Scope: exact-source characterization only. No VNDB/Bangumi URL, cache key/schema, title priority, alias normalization or fallback behavior changed.

## Why this stage exists

The source audit identified a high-impact boundary between VNDB titles, Bangumi fallback, OpenCC conversion and the cached aliases exposed to quiz/multiplayer. A bad precedence change can replace a useful title or feed the wrong alias set into answer matching.

## Test design

Added `tests/unit/emq_chinese_title_cache_contract.test.cjs`. It extracts exact production functions from `src/scripts/script_041.htmlpart` and executes them in an isolated VM. Network, localStorage and script loading are synthetic; no live VNDB/Bangumi API is called.

The 19 named cases cover:
1. Unicode normalization, Han/Kana filtering, title length and VNDB ID validation.
2. Cache key/write failure behavior and alias normalization/deduplication/caps.
3. Existing OpenCC converter, script-load success/failure, timeout and concurrent load behavior.
4. Cached title/alias lookup, work ID mapping and server alias export.
5. VNDB batch request shape, response error and title ordering/conversion.
6. Exact normalized Bangumi fallback matching rather than accepting unrelated results.
7. Non-empty checked cache precedence, successful VNDB enrichment, empty-result Bangumi fallback, and fail-soft VNDB network failure.
8. Batch ID deduplication and known-alias export.

These are characterization tests, not evidence that upstream services are available or that every remote record is current. The OpenCC script loader's failure state remains cached for the current page lifetime; changing retry semantics is outside this test-only stage.

## Acceptance

- Static source-boundary inspection: PASS; test executes exact function bodies from the registered source fragment.
- Local execution in this authoring environment: NOT RUN; GitHub Actions is the execution authority.
- Initial run [39240395756](https://github.com/murorachi/Amq-/actions/runs/39240395756) exposed three harness assumptions: `getConverter()` is async, Hant priority preserves a Hans alias rather than converting every alias, and the converter is returned after awaiting. The test was corrected to match the actual production contract; production source was not changed.
- Corrected run [39240538829](https://github.com/murorachi/Amq-/actions/runs/39240538829): **source/unit PASS**, EMQ Chinese-title contract **19/19 PASS**, Chinese-title loader **20/20 PASS**, SRS **17/17 PASS**, scene-background **18/18 PASS**, checkpoint package contract/reproducibility **PASS** (408 entries, CRC and required paths pass; repeated ZIP SHA-256 `75d2dd241094bb6e73d9c47f584de662fde505d5ba7f428b0a3f0ab4a5189954`), deterministic standalone V82.85.28 build **PASS**, Firefox responsive **PASS**.
- Chromium native-origin: native storage/custom-list, IndexedDB/input, suggestion, quiz playback and multiplayer lifecycle steps passed. Only final non-silent audio monitor capture failed (peak=0, rms=0), the known environment capture limitation. Overall workflow is marked failed because of that step, not because of the title cache contract. Actual product playback was user-confirmed. Manual interactive acceptance was not performed.
- Known Chromium audio monitor capture limitation remains separate. Do not interpret it as a title-cache failure unless real title loading or actual playback regresses.

## Rollback and next work

Rollback by reverting this test, workflow/package registration, report and status references. No product source rollback is required. After acceptance, the next bounded stage is script_039 VNDB navigation: request failure handling, identifier domains, cover retries and render limits.
