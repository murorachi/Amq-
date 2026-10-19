# Current engineering checkpoint: V82.85.26 suggestion cache invalidation dedup

- Branch: `v82.85.26-suggestion-cache-invalidation-dedup-01`, based on the V82.85.25 multiplayer audio callback dedup checkpoint.
- Immutable V82.82 product baseline remains 8,787,490 bytes / SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`.
- Production change: removed one redundant anime suggestion-cache invalidation loop from the multiplayer display-language change listener. It immediately calls `window.__aniRefreshChineseSuggestionsV8237`, which already clears the same anime cache entries and refreshes anime, artist, and title suggestions.
- Change size: 95 source characters removed; only one invalidation loop remains.
- Added `tests/unit/multiplayer_suggestion_cache_invalidation_dedup_contract.test.cjs` and wired it into the source/unit workflow.
- Fragment fingerprint: 139,664 bytes / SHA-256 `c349421f2a4759677669079d5e37a212795958ec6e556b56f36cadddeb56d018`.
- Candidate V82.85.26 is pinned at 8,787,009 bytes / SHA-256 `1745600f52de09983ca3b66e45341a27acbd463e233fc77719e42f4673d4abad`. CI run [39224624431](https://github.com/murorachi/Amq-/actions/runs/39224624431) passed verifier 132/132, the new cache contract, package completeness/reproducibility, and candidate build/upload. Candidate: 8,787,009 bytes / SHA-256 `1745600f52de09983ca3b66e45341a27acbd463e233fc77719e42f4673d4abad`. Firefox responsive passed in run [39224733975](https://github.com/murorachi/Amq-/actions/runs/39224733975). Browser-native-origin remains in progress at the CI audio output gate. Source/build/package checks pass; do not reopen audio investigation unless real product playback regresses.
- Stage report: `reports/V82_85_26_SUGGESTION_CACHE_INVALIDATION_DEDUP_01.md`.

## Next direction

After the candidate passes, continue historical-code deduplication. Prefer removing duplicated work when an existing shared function already guarantees the same behavior. Do not merge similarly named functions with different semantics or expand into broad lifecycle changes.

## Rollback

Restore the removed loop in the `mpNameLanguage` listener and revert the focused test, workflow/package/report metadata, and manifest changes together. V82.82 remains immutable.


## V82.85.27 checkpoint: room pool bounds validation dedup

- Branch: `v82.85.27-room-pool-validation-dedup-01`; parent V82.85.26 head: `85ffb06b360b73fa4a84015a8c95623345b21545`.
- Extracted repeated year/difficulty bounds validation from multiplayer `createSettings()` and `configureFromUi()` into one `validateRoomPoolBounds()` helper. Input collection stays in each caller; error text and validation precedence remain centralized.
- Added `tests/unit/multiplayer_room_pool_bounds_validation_contract.test.cjs` (14 assertions) and wired it into CI. Contract and source/unit job passed in run [39228325204](https://github.com/murorachi/Amq-/actions/runs/39228325204); a follow-up run checks the corrected printed assertion count.
- Modified fragment: 139,501 bytes / SHA-256 `0461515bbf8615bfe943f078238aaa9851e9845b62b53a79365fae6061dc9fff`. Candidate V82.85.27: 8,786,846 bytes / SHA-256 `cf89981db7241e929fb0c1f36f6919911e4abb069140b1e5dbe12f935ec3a251`. Source verifier, deterministic build, package completeness/reproducibility, Firefox responsive and non-audio browser acceptance passed in run [39228325204](https://github.com/murorachi/Amq-/actions/runs/39228325204). Only the known CI audio output capture failed; actual product playback was user-confirmed.
- Stage report: `reports/V82_85_27_ROOM_POOL_BOUNDS_VALIDATION_DEDUP_01.md`.
- Immutable V82.82 baseline remains 8,787,490 bytes / SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`.
- No audio, UI, storage, room protocol, or song-pool policy changes are intended. User-confirmed product audio playback remains the reference; do not reopen the unrelated CI audio capture mismatch.

## Rollback

Revert the V82.85.27 helper, focused test, workflow/package versioning, manifest update, and checkpoint documentation as one stage. Do not overwrite V82.85.26 or V82.82.


## V82.85.28 checkpoint: next-audio state reset dedup

- Branch: `v82.85.28-next-audio-state-reset-dedup-01`; parent V82.85.27.
- Extracted identical next-audio state assignments into `resetNextAudioState()`, used by `stopAudio()`, `clearNextAudio()`, and `activateNextAudio()`. Media pause/unload and active-audio transfer remain caller-owned.
- Added `tests/unit/multiplayer_next_audio_state_reset_dedup_contract.test.cjs` with 12 assertions and wired it into CI. The focused contract passed with 12 assertions; source/unit job passed with verifier 132/132 in run [39229842012](https://github.com/murorachi/Amq-/actions/runs/39229842012). Firefox responsive passed; Chromium native-origin acceptance is still running.
- Versioned standalone candidate and source package to V82.85.28. Modified fragment: 139,202 bytes / SHA-256 `24d805495ba443bd8e927d3b3ae37dcd581cb2b1d9c7ab872e223234849e1a50`. Candidate V82.85.28: 8,786,547 bytes / SHA-256 `7284c4ca5625886d913f55ab19a0076d1a5be46a88504dd8de724ae8f5bd274d`. Source fingerprint, deterministic build, package completeness/reproducibility and Firefox responsive passed; Chromium native-origin browser acceptance remains in progress.
- Stage report: `reports/V82_85_28_NEXT_AUDIO_STATE_RESET_DEDUP_01.md`.
- Immutable V82.82 baseline remains 8,787,490 bytes / SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`.

## Rollback

Revert the V82.85.28 helper, test, workflow/package versioning, manifest fingerprint and checkpoint documentation together. Keep V82.85.27 and V82.82 intact.


## V82.85.29 source audit matrix

- Branch: `v82.85.29-source-audit-matrix-01`, based on V82.85.28.
- Added `reports/SOURCE_BLOCK_AUDIT_MATRIX_V82_85_28.md`: 91 registered fragments (50 CSS, 41 JS), each listed with baseline size/fingerprint, priority, audit state and initial review focus.
- First-pass file-specific review completed for `src/scripts/script_004.htmlpart`; report: `reports/AUDIT_SCRIPT_004_QUIZ_LIFECYCLE_V82_85_29.md`. No production source changed. Quiz lifecycle, timers, settings migrations, module markers and listener ownership remain risk areas; no broad refactor recommended.
- Matrix count: 1 first-pass file audit complete, 1 partially reviewed known-risk fragment (`script_028`), 89 awaiting file-specific review. This is evidence-based audit status, not a claim that all unreviewed fragments contain defects.
- V82.85.28 run [39230015840](https://github.com/murorachi/Amq-/actions/runs/39230015840) completed: source/unit passed 132/132; Firefox responsive passed; Chromium native-origin job failed only at the known non-silent CI audio output capture assertion (peak=0, rms=0.0). Other quiz and multiplayer lifecycle assertions in that job passed. Actual product playback was user-confirmed. Manual interactive acceptance was not performed.
- Immutable V82.82 baseline remains unchanged: 8,787,490 bytes / SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`.


## V82.85.29 audit milestone — first pass complete

- Branch: `v82.85.29-source-audit-matrix-01`.
- Audit matrix: `reports/SOURCE_BLOCK_AUDIT_MATRIX_V82_85_28.md`.
- First-pass status: **91/91 registered fragments reviewed**, including 41 script fragments and 50 style fragments. Initial-review queue: 0.
- CSS review is static selector/cascade inventory only. It does not claim pixel-diff or computed-style equivalence for every viewport/state.
- Added actual embedded EMQ payload integrity test (6,645 works, 16,839 songs, 8,383,856 decompressed bytes) and AniList ID map integrity test (9,400 entries). Corrected manifest roles for data payloads; product payload/runtime source unchanged.
- Summary: `reports/V82_85_29_SOURCE_AUDIT_SUMMARY.md`.
- Latest completed full source/unit + Firefox run: [39232821248](https://github.com/murorachi/Amq-/actions/runs/39232821248), source/unit 132/132 and Firefox responsive passed; both new payload tests passed. Chromium native-origin failed only at known audio output capture assertion (peak=0, rms=0.0). Newer audit commits are still running CI; verify the newest run before closing CI acceptance.
- Highest-value follow-up: focused SRS state-transition/persistence contract, followed by scene-background IndexedDB/object-URL lifecycle coverage. Do not broaden into a general rewrite.
- Immutable V82.82 baseline remains 8,787,490 bytes / SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`.


## SRS characterization stage in progress

- Added `tests/unit/srs_state_transition_persistence_contract.test.cjs` and wired it into `.github/workflows/v82-85-4-engineering-acceptance.yml`.
- Test scope: new-card Again/Hard/Good/Easy transitions, learning progression, review lapse/relearning, invalid rating, interval bounds, schema validation, valid reload preservation, invalid-data quarantine ordering, failed quarantine and failed-read fail-closed behavior.
- Report: `reports/V82_85_29_SRS_STATE_TRANSITION_PERSISTENCE_CONTRACT.md`.
- Production `script_020.htmlpart`, FSRS formula, weights and storage schema are unchanged. Test runs extracted production functions in a deterministic VM with synthetic storage; it does not establish external FSRS conformance or real-browser storage behavior.
- Automated execution is pending a CI result. Do not mark this stage passed until the focused test and full source/unit job complete.
- Next after acceptance: add focused scene-background IndexedDB/object-URL lifecycle coverage for `script_036.htmlpart`.


## SRS contract accepted; scene-background lifecycle test queued

- SRS contract: `tests/unit/srs_state_transition_persistence_contract.test.cjs` passed **41 assertions** in run [39248332291](https://github.com/murorachi/Amq-/actions/runs/39248332291). The source/unit job completed successfully (132/132 source verifier checks plus all unit steps), and Firefox responsive passed. Chromium native-origin was still running at the last check; the full three-job workflow was not yet closed.
- SRS report: `reports/V82_85_29_SRS_STATE_TRANSITION_PERSISTENCE_CONTRACT.md`. Production `script_020.htmlpart`, formula, weights and schema remain unchanged.
- Next focused test added: `tests/unit/scene_background_idb_object_url_lifecycle_contract.test.cjs`, wired into CI. It covers transaction commit/error/abort semantics, IndexedDB open failure/upgrade, scene URL replacement/revocation and temporary preview cleanup. Report: `reports/V82_85_29_SCENE_BACKGROUND_IDB_OBJECT_URL_LIFECYCLE_CONTRACT.md`.
- Scene test automated execution is pending CI. No pass claim until logs show its assertion count and the source/unit job succeeds.
- Product source/CSS and immutable V82.82 baseline remain unchanged.


## Scene-background lifecycle contract accepted

- `tests/unit/scene_background_idb_object_url_lifecycle_contract.test.cjs` passed **29 assertions** in run [39248616623](https://github.com/murorachi/Amq-/actions/runs/39248616623).
- Same run: source/unit completed successfully (132/132 source verifier checks; SRS contract 41/41; scene lifecycle contract 29/29 and remaining unit steps passed), Firefox responsive passed. Chromium native-origin remained in progress at last check; overall workflow is not yet closed.
- Report: `reports/V82_85_29_SCENE_BACKGROUND_IDB_OBJECT_URL_LIFECYCLE_CONTRACT.md`. Production `script_036.htmlpart` unchanged.
- The two targeted lifecycle characterization stages are complete. Next bounded task: inspect existing tests for external-source/cache boundaries in `script_031`, `script_039`, and `script_041`; add only a concrete missing contract, without changing runtime behavior.


## EMQ Chinese-title cache contract in progress

- Added `tests/unit/emq_chinese_title_cache_precedence_contract.test.cjs` and its CI step. It characterizes title normalization/filtering, VNDB Traditional Chinese title preference, cache alias deduplication/limit, source provenance, and work-ID-scoped alias export using synthetic data only.
- Report: `reports/V82_85_29_EMQ_CHINESE_TITLE_CACHE_PRECEDENCE_CONTRACT.md`.
- Production `script_041.htmlpart` is unchanged. Automated execution is pending CI; no pass claim yet.
- SRS and scene-background contracts already passed 41 and 29 assertions respectively; source/unit and Firefox responsive passed on their recorded runs. Full Chromium-native workflow continues to show the known audio-output capture failure separately from product playback.


## Chinese-title source mapping contract in progress

- Added `tests/unit/chinese_title_source_mapping_partial_failure_contract.test.cjs` for `script_031.htmlpart`, wired into CI, with report `reports/V82_85_29_CHINESE_TITLE_SOURCE_MAPPING_PARTIAL_FAILURE_CONTRACT.md`.
- Scenarios: unique/ambiguous AniList and MAL ID resolution, fail-closed conflicting mappings, AniList-only/Bangumi-only partial success, and both-source failure.
- Automated execution pending CI; no pass claim yet. Production title loader, source URLs, cache version and IndexedDB schema unchanged.
- EMQ title cache contract step passed 25 assertions in run [39249715083](https://github.com/murorachi/Amq-/actions/runs/39249715083); source/unit was still completing at last check. The current source mapping test must also pass before closing this task.


## Chinese-title contracts accepted; VNDB cover lifecycle next

- `tests/unit/emq_chinese_title_cache_precedence_contract.test.cjs`: **25 assertions passed**.
- `tests/unit/chinese_title_source_mapping_partial_failure_contract.test.cjs`: **19 assertions passed**.
- Both focused tests passed in run [39250170041](https://github.com/murorachi/Amq-/actions/runs/39250170041); source verifier passed 132/132. Source/unit job was still completing its remaining steps, while Firefox responsive and Chromium native-origin were in progress at last check.
- Reports: `reports/V82_85_29_EMQ_CHINESE_TITLE_CACHE_PRECEDENCE_CONTRACT.md` and `reports/V82_85_29_CHINESE_TITLE_SOURCE_MAPPING_PARTIAL_FAILURE_CONTRACT.md`.
- Noted deferred semantic difference: `cacheRecord` and `allKnownAliases` normalize alias duplicates, but `serverAliasMap` only removes exact duplicates. Recorded in the EMQ title report; no production behavior changed.
- Next bounded task: add deterministic contract for VNDB cover detail batching, failed-ID cleanup/retry state and cover fallback behavior in `script_039.htmlpart`.


## VNDB cover lifecycle contract in progress

- Added `tests/unit/vndb_cover_batch_retry_lifecycle_contract.test.cjs` and wired it into CI.
- Report: `reports/V82_85_29_VNDB_COVER_BATCH_RETRY_LIFECYCLE_CONTRACT.md`.
- It covers 30-ID request batching, missing-record placeholders, HTTP failure cleanup, loaded/loading/failed skip behavior and explicit retry state reset, using mocked responses only.
- Automated execution pending CI. Production `script_039.htmlpart` is unchanged.
- Chinese-title tests passed 25 and 19 assertions in run [39250170041](https://github.com/murorachi/Amq-/actions/runs/39250170041); verify the final source/unit and browser job conclusions separately.


## VNDB cover lifecycle contract accepted

- `tests/unit/vndb_cover_batch_retry_lifecycle_contract.test.cjs` passed **26 assertions** in run [39250489886](https://github.com/murorachi/Amq-/actions/runs/39250489886).
- Same run: source verifier 132/132 and all source/unit steps passed; Firefox responsive passed. Chromium native-origin was still running at last check, so overall workflow closure remains separate.
- Report: `reports/V82_85_29_VNDB_COVER_BATCH_RETRY_LIFECYCLE_CONTRACT.md`. Production `script_039.htmlpart` unchanged.
- Next bounded review: assess whether `script_041` alias deduplication differences between `serverAliasMap` and `allKnownAliases` are intentional/meaningful before proposing any behavior change.


## Alias semantics decision recorded

- Added `reports/V82_85_29_EMQ_ALIAS_DEDUP_SEMANTICS_DECISION.md`.
- Decision: defer production change. Inspected multiplayer sync uses `allKnownAliases`, which normalizes duplicates; no demonstrated user-facing defect or payload issue justifies changing the separately exported `serverAliasMap` behavior.
- VNDB cover contract passed 26 assertions in run [39250489886](https://github.com/murorachi/Amq-/actions/runs/39250489886); source/unit and Firefox passed, native-origin was still running at last check.
- Remaining explicit gap in this group: script_031 IndexedDB cache version/read/write contract. Next add a small deterministic test for cache version validation and write-failure behavior.


## Chinese-title IndexedDB cache contract in progress

- Added `tests/unit/chinese_title_indexeddb_cache_version_contract.test.cjs` and CI step; report `reports/V82_85_29_CHINESE_TITLE_INDEXEDDB_CACHE_VERSION_CONTRACT.md`.
- Covers current-version reads, stale/malformed cache fallback, read/write failures, stable cache key/version, and current acceptance of array-shaped records.
- Automated execution pending CI. Production source, DB/store/key/version unchanged.
- The array acceptance is recorded as a possible hardening issue, not fixed in this characterization stage.


## Chinese-title cache contract accepted

- `tests/unit/chinese_title_indexeddb_cache_version_contract.test.cjs` passed **14 assertions** in run [39251152871](https://github.com/murorachi/Amq-/actions/runs/39251152871).
- Same run: source verifier 132/132 and all source/unit steps passed; Firefox responsive passed. Chromium native-origin remained in progress at the last check.
- Report: `reports/V82_85_29_CHINESE_TITLE_INDEXEDDB_CACHE_VERSION_CONTRACT.md`. Production title-loader source and cache schema unchanged.
- Known cache-hardening observation: array-shaped `records` currently passes the loader's object-type guard. Recorded but not fixed in this test-only stage.
- The bounded SRS, scene-background, Chinese-title and VNDB cover characterization group is complete. Next: update the historical technical-debt inventory with evidence-based dispositions, distinguishing closed, tested/managed and deferred items.


## V82.85.30 cache-shape hardening stage

- Branch: `v82.85.30-chinese-title-cache-shape-guard-01`, based on V82.85.29 audit branch.
- Production fix: `src/scripts/script_031.htmlpart` rejects array-shaped `records` from the versioned IndexedDB title cache. This closes the demonstrated malformed-cache path without changing cache version/schema or source-fetch logic.
- Fragment fingerprint: 13,842 bytes / SHA-256 `bf6d46591ef75830fb6fa51ccdc55e061f6ac8b71c0848b08c27d35e245b4bb1`.
- Candidate fingerprint: 8,786,577 bytes / SHA-256 `e76c4a35a406b20b055e91278e3c917832f9a9cb662280ea3d7d3211a69b8bb5`.
- Report: `reports/V82_85_30_CHINESE_TITLE_CACHE_SHAPE_GUARD_01.md`.
- Updated manifest release pin, workflow candidate/artifact names and checkpoint package naming/required paths. CI acceptance is pending for this version; do not claim release acceptance yet.
- Immutable V82.82 remains 8,787,490 bytes / SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`.


## V82.85.30 acceptance checkpoint

- Run [39252468802](https://github.com/murorachi/Amq-/actions/runs/39252468802): source/unit **PASS** (132/132 source verifier checks and all unit steps), Firefox responsive **PASS**. Chromium native-origin is still running; real-origin storage/custom-list checks and isolated custom-list UI regression have passed, while the real-origin IndexedDB/quiz input acceptance is in progress.
- Deterministic source package: two builds matched; SHA-256 `d1eab00af3bb59955bdcc11650a8edf5a8653df3c46912c08b725b60c7aea56a`; 14,691,859 bytes uploaded as `AMQ_V82_85_30_SOURCE_PACKAGE_CACHE_GUARD_01`.
- Standalone candidate uploaded as `AMQ_V82_85_30_STANDALONE_HTML`; reconstructed output fingerprint 8,786,577 bytes / SHA-256 `e76c4a35a406b20b055e91278e3c917832f9a9cb662280ea3d7d3211a69b8bb5`.
- Final acceptance is not closed until browser-native job completes. If only the known audio-output capture assertion fails, report it separately; inspect any other failure on its own evidence.


## V82.85.30 CI result recorded

- Run [39252741670](https://github.com/murorachi/Amq-/actions/runs/39252741670): source/unit **PASS** (132/132 verifier checks and all unit tests), Firefox responsive **PASS**.
- Browser-native: native storage/custom-list, custom-list UI, IndexedDB/quiz input, quiz suggestions, quiz answer/playback lifecycle and multiplayer lifecycle passed. Only the final audio output capture assertion failed (`peak=0, rms=0.0`); the PulseAudio self-test passed. This is the known CI capture mismatch, not a demonstrated product playback regression.
- Artifacts on this run: `AMQ_V82_85_30_SOURCE_PACKAGE_CACHE_GUARD_01` (14,692,769 bytes) and `AMQ_V82_85_30_STANDALONE_HTML` (4,343,635-byte compressed artifact; reconstructed HTML is 8,786,577 bytes).
- Deterministic source package SHA-256 from the build step: `d1eab00af3bb59955bdcc11650a8edf5a8653df3c46912c08b725b60c7aea56a` on the earlier equivalent package build; the newest report/status commits trigger a final run so verify the newest artifact metadata before declaring the branch checkpoint closed.
