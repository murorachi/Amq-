# V82.85.32 Chinese-title loader cache and partial-source contract

- Branch: `v82.85.32-chinese-title-loader-contract-01`
- Parent checkpoint: `v82.85.31-scene-background-lifecycle-contract-01`
- Product source baseline: V82.85.28; `src/scripts/script_031.htmlpart` unchanged (reviewed blob `ca426049f341ffbac03783f5a49d59ca9d9c8f8d`).
- Immutable V82.82 product baseline remains 8,787,490 bytes, SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`.
- Scope: exact-source characterization only. No external URL, pinned source revision, IndexedDB schema/key, title priority, alias rule, or runtime behavior changed.

## Why this stage exists

The source audit identified three compatibility boundaries: two independent title sources can fail separately, the IndexedDB cache is tied to pinned source revisions, and title/alias filtering affects answer acceptance. This stage protects those boundaries without claiming that synthetic responses prove upstream freshness.

## Test design

Added `tests/unit/chinese_title_loader_cache_contract.test.cjs`. It extracts the production functions from `src/scripts/script_031.htmlpart` and executes them in an isolated VM. Fetch, timers, AbortController and IndexedDB are synthetic; no external API or real browser profile is used.

The 20 named test cases cover:
1. NFKC/lowercase normalization, list parsing and Han-without-Kana filtering.
2. Ambiguous MAL/AniList identifier mapping rejection.
3. Candidate merge precedence, alias deduplication and Kana filtering.
4. AniList-only and Bangumi-only partial-source behavior; both-source failure.
5. Native-title and Japanese-Kana rejection.
6. Fetch options, HTTP failure, timer cleanup and 20-second abort behavior.
7. IndexedDB-unavailable rejection, versioned cache hit/miss, cache read failure and fixed cache key/version on write.
8. Loader cache hit, cache write only when both sources and converter are ready, partial readiness without caching, empty/error retry state, and concurrent single-flight loading.

These tests characterize the existing implementation. They do not prove live CDN/API availability, source licensing changes, full OpenCC browser script behavior, or the freshness of pinned data.

## Acceptance

- Static source-boundary inspection: PASS; test uses exact function bodies from the registered fragment.
- Local execution in this authoring environment: NOT RUN; GitHub Actions is the execution authority.
- First run [39239399557](https://github.com/murorachi/Amq-/actions/runs/39239399557) exposed one test-harness timing assumption in the concurrent-load case (19/20 cases passed). The test was corrected to wait for the asynchronous loader startup; production source was not changed.
- Corrected run [39239470902](https://github.com/murorachi/Amq-/actions/runs/39239470902): **source/unit PASS**, Chinese-title loader contract **20/20 PASS**, SRS **17/17 PASS**, scene-background **18/18 PASS**, checkpoint package contract/reproducibility **PASS** (406 entries, CRC and required paths pass; repeated ZIP SHA-256 `2bb266f79ef44d41d4bd9d9d25c487eb88d7dac891894450f8b8350d68f25795`), deterministic standalone V82.85.28 build **PASS**, Firefox responsive **PASS**.
- Chromium native-origin: storage/custom-list, IndexedDB/input, suggestion, quiz playback and multiplayer lifecycle steps passed; only final non-silent audio monitor capture failed (peak=0, rms=0). This is the known environment capture limitation, not a title-loader regression. Actual product playback was user-confirmed. Manual interactive acceptance was not performed.
- Known Chromium audio monitor capture limitation remains separate. Do not interpret it as a title-cache failure unless real title loading or actual playback regresses.

## Rollback and next work

Rollback by reverting this test, workflow/package registration, report and status references. No product source rollback is required. After CI acceptance, next consider a separate script_041 title-cache precedence/alias contract, then script_039 VNDB fetch/cover retry contract.
