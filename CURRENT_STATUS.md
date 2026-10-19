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


## V82.85.30 SRS transition characterization — accepted with known CI limitation

- Branch: `v82.85.30-srs-transition-contract-01`, based on `v82.85.29-source-audit-matrix-01`.
- Added `tests/unit/srs_rating_transition_contract.test.cjs`: 17 exact-source cases covering schema validation, invalid-record quarantine/recovery, new/learning/review/relearning transitions, interval bounds, review-log cap, invalid grades and failed persistence.
- Test registered in `.github/workflows/v82-85-4-engineering-acceptance.yml` and required by the reproducible checkpoint package.
- Product script `src/scripts/script_020.htmlpart` unchanged. No scheduling formula, storage key, schema or UI changes.
- GitHub Actions [39237555930](https://github.com/murorachi/Amq-/actions/runs/39237555930): source/unit PASS; SRS 17/17 PASS; package contract PASS; deterministic package reproducibility PASS (402 entries, repeated SHA-256 `882d44845ff52f070326558327423878981ff1c0ff35bf086127a065fc04ab6d`); deterministic standalone build PASS; Firefox responsive PASS.
- Chromium native-origin: native storage/custom-list, IndexedDB/input, suggestion, quiz playback lifecycle and multiplayer lifecycle steps passed. Only final non-silent audio monitor capture failed (peak=0, rms=0). Overall workflow is red due to this known capture limitation, not due to SRS. Actual product playback was user-confirmed. Manual interactive acceptance remains unperformed.
- Local execution outside CI: NOT RUN.
- Immutable V82.82 baseline unchanged: 8,787,490 bytes / SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`.



## V82.85.31 scene-background lifecycle contract — accepted with known CI limitation

- Branch: `v82.85.31-scene-background-lifecycle-contract-01`, based on accepted SRS checkpoint V82.85.30.
- Added `tests/unit/scene_background_lifecycle_contract.test.cjs`: 18 exact-source cases for IndexedDB open/transaction/read paths, error/abort handling, object URL replacement/revocation, preview cleanup, image MIME/size/dimension limits and backup-restore source guards.
- Registered in CI and deterministic checkpoint package requirements. Production `src/scripts/script_036.htmlpart` unchanged; no IndexedDB schema, image limits, backup format or UI changes.
- CI [39238306059](https://github.com/murorachi/Amq-/actions/runs/39238306059): source/unit PASS; scene-background 18/18 PASS; SRS 17/17 PASS; package contract/reproducibility PASS (404 entries, repeated SHA-256 `43515ff8fbd44651cb558cb5a35c3464bc85b601fc97311d507efcdffed1296a`); deterministic standalone build PASS; Firefox responsive PASS.
- Chromium native-origin: native storage/custom-list, IndexedDB/input, suggestion, quiz playback and multiplayer lifecycle steps passed. Only final non-silent audio monitor capture failed (peak=0, rms=0). Overall workflow is red due to the known capture limitation; actual product playback was user-confirmed. Manual interactive acceptance was not performed.
- Local execution outside CI: NOT RUN.
- Immutable V82.82 baseline unchanged: 8,787,490 bytes / SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`.



## V82.85.32 Chinese-title loader cache contract

- Branch: `v82.85.32-chinese-title-loader-contract-01`, based on scene-background contract checkpoint V82.85.31.
- Added `tests/unit/chinese_title_loader_cache_contract.test.cjs` with 20 exact-source cases for normalization/alias filtering, ambiguous ID rejection, candidate priority, partial source failures, fetch timeout/abort, IndexedDB cache version/key, loader readiness and single-flight behavior.
- Registered the test in CI and deterministic checkpoint package requirements. Production `src/scripts/script_031.htmlpart` unchanged; no URL, source revision, cache schema/key, title priority or alias behavior changed.
- Local execution: NOT RUN in this authoring environment. Latest branch CI must be inspected before acceptance.
- Prior scene-background CI [39238306059](https://github.com/murorachi/Amq-/actions/runs/39238306059): source/unit, scene-background 18/18, SRS 17/17, package reproducibility and Firefox passed. Chromium native-origin failed only at the known final audio monitor capture assertion (peak=0, rms=0); preceding storage, IndexedDB/input, quiz and multiplayer checks passed. Actual playback was user-confirmed.
- Immutable V82.82 baseline unchanged: 8,787,490 bytes / SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`.
