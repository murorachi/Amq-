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


## V82.85.29 checkpoint: Chromium PulseAudio stream diagnostics

- Branch: v82.85.29-chromium-pulse-stream-diagnostics-01; parent V82.85.28. Immutable V82.82 baseline remains 8,787,490 bytes / SHA-256 227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b.
- Test-only change: tests/browser/real_audio_output_acceptance.py now records HTMLMediaElement mute/volume/source/readiness state and samples PulseAudio sink inputs ten times during native playback and records actual monotonic elapsed time for each sample. It also logs detailed sink-input properties. Production playback code and standalone candidate are unchanged.
- Rationale: V82.85.28 logs showed Chromium as a PulseAudio client but no sink-input, an IDLE sink, and captured PCM peak=0/RMS=0. The one-time snapshot could not distinguish a missing/short-lived output stream from muted/zero-volume media.
- Existing evidence from run 39229842012: source/unit verifier 132/132, focused state-reset contract 12 assertions, deterministic package/build and Firefox responsive passed. Native playback lifecycle assertions passed, but non-silent PCM output failed.
- New diagnostic run has not yet been verified. No root cause or repair is claimed at this checkpoint.
- Rollback: revert the V82.85.29 test-only diagnostics and checkpoint documents; preserve V82.85.28 and immutable V82.82.
