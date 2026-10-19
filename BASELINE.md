# Baseline checkpoint: V82.85.29 first-pass source audit

- Branch: `v82.85.29-source-audit-matrix-01`.
- Product/source parent: `v82.85.28-next-audio-state-reset-dedup-01`.
- Audit matrix: `reports/SOURCE_BLOCK_AUDIT_MATRIX_V82_85_28.md`.
- First-pass audit: 91/91 fragments; 41/41 script fragments reviewed and 50/50 style fragments statically scanned. Initial-review queue is 0.
- CSS visual/pixel equivalence remains outside this static pass. No CSS or product runtime source changed.
- Added tests for actual embedded EMQ gzip payload and AniList JSON mapping; corrected their manifest roles. EMQ payload: 6,645 works, 16,839 songs, 8,383,856 decompressed bytes. AniList map: 9,400 entries, 9,364 unique target IDs.
- Latest completed source/unit + Firefox run: [39232821248](https://github.com/murorachi/Amq-/actions/runs/39232821248), verifier 132/132, both payload tests and Firefox responsive passed. Native-origin failed only at known non-silent audio capture; a newer audit-only run is pending final status.
- Immutable V82.82 baseline remains 8,787,490 bytes / SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`.
- Rollback: revert audit reports/matrix, the two integrity tests, workflow/package registration and manifest-role changes. No product-source rollback is required.


## SRS characterization test checkpoint

- Branch remains `v82.85.29-source-audit-matrix-01`.
- Added `tests/unit/srs_state_transition_persistence_contract.test.cjs` and its workflow step; report: `reports/V82_85_29_SRS_STATE_TRANSITION_PERSISTENCE_CONTRACT.md`.
- Scope is limited to characterization of existing `script_020.htmlpart` behavior: rating/learning transitions, interval bounds, schema validation, reload preservation and storage quarantine/failure behavior.
- Production source, formula, weights and storage schema unchanged.
- CI execution pending; no pass claim until the new test is observed passing.
- Immutable V82.82 baseline unchanged: 8,787,490 bytes / SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`.


## Runtime lifecycle contract checkpoint

- SRS characterization test passed 41 assertions in run [39248332291](https://github.com/murorachi/Amq-/actions/runs/39248332291); source/unit job and Firefox responsive passed. Chromium native-origin was still in progress at the last check.
- Added `tests/unit/scene_background_idb_object_url_lifecycle_contract.test.cjs` and CI step, with report `reports/V82_85_29_SCENE_BACKGROUND_IDB_OBJECT_URL_LIFECYCLE_CONTRACT.md`. Its execution is pending CI.
- Production `script_020.htmlpart` and `script_036.htmlpart` remain unchanged; this stage adds characterization tests only.
- Immutable V82.82 baseline remains 8,787,490 bytes / SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`.


## Characterization results

- SRS contract: 41 assertions passed in run [39248332291](https://github.com/murorachi/Amq-/actions/runs/39248332291); source/unit and Firefox responsive passed.
- Scene-background IndexedDB/object-URL contract: 29 assertions passed in run [39248616623](https://github.com/murorachi/Amq-/actions/runs/39248616623); source/unit and Firefox responsive passed.
- Both runs' Chromium native-origin job was still in progress at the last check. The known audio output capture assertion must remain separately classified if it fails.
- No production source/formula/schema/CSS changes in these stages. Immutable V82.82 baseline remains 8,787,490 bytes / SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`.


## External-source/cache contract stage

- Added `tests/unit/emq_chinese_title_cache_precedence_contract.test.cjs` for `script_041.htmlpart` and wired it into the engineering acceptance workflow.
- Report: `reports/V82_85_29_EMQ_CHINESE_TITLE_CACHE_PRECEDENCE_CONTRACT.md`.
- Automated execution pending CI. Production source and cache schema are unchanged.
- Previously accepted characterization: SRS 41/41 and scene-background lifecycle 29/29; source/unit and Firefox responsive passed. Known audio output capture failure remains a separate browser-native acceptance limitation.


## Chinese title source-mapping contract

- Added `tests/unit/chinese_title_source_mapping_partial_failure_contract.test.cjs` and CI step for `script_031.htmlpart`; report `reports/V82_85_29_CHINESE_TITLE_SOURCE_MAPPING_PARTIAL_FAILURE_CONTRACT.md`.
- CI execution pending. Production source and cache/schema unchanged.
- EMQ Chinese-title cache contract passed 25 assertions in run [39249715083](https://github.com/murorachi/Amq-/actions/runs/39249715083); confirm source/unit job completion before marking the full stage accepted.


## Chinese-title characterization results

- EMQ title cache precedence/filtering: 25 assertions passed.
- General Chinese-title source mapping and partial-source failures: 19 assertions passed.
- Both focused tests passed in run [39250170041](https://github.com/murorachi/Amq-/actions/runs/39250170041); source verifier 132/132 passed. Remaining source/unit steps and browser jobs were still in progress at the last check.
- Deferred observation: serverAliasMap uses exact duplicate removal while cacheRecord/allKnownAliases use normalized duplicate removal. No production change made.
- Next task: script_039 VNDB cover batching/retry contract. Immutable V82.82 and production source remain unchanged.


## VNDB cover lifecycle stage

- Added `tests/unit/vndb_cover_batch_retry_lifecycle_contract.test.cjs` for `script_039.htmlpart`, plus CI step and report `reports/V82_85_29_VNDB_COVER_BATCH_RETRY_LIFECYCLE_CONTRACT.md`.
- Automated execution pending. Production source unchanged; requests are mocked in unit tests.
- Prior title tests passed 25/19 assertions; source verifier 132/132 passed in run 39250170041. Full browser-native result remains separately tracked.


## VNDB cover lifecycle result

- VNDB cover batch/retry contract passed 26 assertions in run [39250489886](https://github.com/murorachi/Amq-/actions/runs/39250489886). Source verifier 132/132, all source/unit steps and Firefox responsive passed; Chromium native-origin remained in progress at last check.
- Production source unchanged. Next review is a decision-only assessment of script_041 alias deduplication semantics, not an automatic code change.


## Alias semantics decision

- Review report: `reports/V82_85_29_EMQ_ALIAS_DEDUP_SEMANTICS_DECISION.md`.
- No production change. Existing inspected consumers use normalized `allKnownAliases`; no reproduced bug demonstrates the exported `serverAliasMap` difference is harmful.
- Next: add a focused script_031 IndexedDB cache version/read/write contract to cover the remaining explicit gap.


## Chinese-title IndexedDB cache contract

- Added `tests/unit/chinese_title_indexeddb_cache_version_contract.test.cjs`, workflow step and report `reports/V82_85_29_CHINESE_TITLE_INDEXEDDB_CACHE_VERSION_CONTRACT.md`.
- CI execution pending. The test records the current behavior that an array passes the `typeof records === 'object'` cache guard; no production behavior changed.


## Chinese-title cache contract result

- Cache version/read/write contract passed 14 assertions in run [39251152871](https://github.com/murorachi/Amq-/actions/runs/39251152871); source verifier 132/132, all source/unit steps and Firefox responsive passed. Chromium native-origin remained in progress at last check.
- Array-shaped records currently pass the cache guard; documented for possible hardening, no production change.
- Next task: evidence-based disposition update for the historical technical-debt inventory.


## Chinese-title malformed-cache guard fix

- `script_031.htmlpart` now rejects array-shaped cache records so malformed `[]` cannot masquerade as a successful cache hit. Existing download fallback handles the miss. DB/store/key/version and other runtime behavior are unchanged.
- Regression test now asserts array rejection. Final CI pending after updating the manifest.
- New fragment fingerprint: 13,842 bytes / SHA-256 `bf6d46591ef75830fb6fa51ccdc55e061f6ac8b71c0848b08c27d35e245b4bb1`.


## Accepted V82.85.29 cache guard candidate

- Candidate: 8,786,577 bytes / SHA-256 `e76c4a35a406b20b055e91278e3c917832f9a9cb662280ea3d7d3211a69b8bb5`.
- `script_031.htmlpart` rejects array-shaped title cache records. Cache contract passed 14 assertions; source verifier 132/132 passed in [run 39257936940](https://github.com/murorachi/Amq-/actions/runs/39257936940).
- Deterministic source package SHA-256: `e3448648c49dfcc4e2153c7825f016ab7b1fabfef2c57b868664ef524c13c913`.
- Firefox responsive, native storage/custom list, IndexedDB/quiz, suggestions, quiz playback lifecycle and multiplayer lifecycle passed. The only full-workflow failure remains the known audio monitor non-silent assertion (`peak=0, rms=0.0`), despite actual playback being user-confirmed.
- Immutable V82.82 baseline unchanged.
