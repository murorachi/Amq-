# Current engineering checkpoint: V82.85.25 multiplayer audio failure handler deduplication

- Branch: `v82.85.25-multiplayer-audio-callback-dedup-01`, based on the latest V82.85.23 callback-contract checkpoint.
- Immutable V82.82 product remains 8,787,490 bytes / SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`.
- Production source change: the two identical `failed` callback bodies in `src/scripts/script_028.htmlpart` now delegate to one `handleAudioFailure(id,a,watchdog)` helper. Both call sites preserve their local song ID, media element, and watchdog ownership.
- Updated `tests/unit/multiplayer_audio_failure_callback_contract.test.cjs` to test the shared handler's pending, active, and stale-event branches and assert exactly two call sites.
- Updated the fragment fingerprint and created the V82.85.25 candidate metadata. The deterministic standalone candidate hash is awaiting CI output; do not call the stage accepted until verifier/build and contract checks pass.
- User manually confirmed the current app plays audio. The CI real-audio output capture mismatch is recorded as a known environment issue and is not a blocker for this bounded dedup refactor; the assertion itself remains unchanged.
- Stage report: `reports/V82_85_25_MULTIPLAYER_AUDIO_FAILURE_HANDLER_DEDUP_01.md`.

## Next direction

Finish source/unit fingerprint and deterministic-build verification for V82.85.25. Once verified, continue the historical technical-debt inventory with one small, demonstrably equivalent duplicate at a time. Do not return to deep CI audio-routing investigation unless actual product playback regresses.

## Rollback

Revert the helper extraction, restore the two original callback bodies and V82.85.22 manifest/release fingerprint, and remove this stage's test/workflow/report changes. V82.82 remains immutable.
