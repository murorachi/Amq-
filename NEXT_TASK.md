# Next task: verify V82.85.28 next-audio state reset dedup

Branch: `v82.85.28-next-audio-state-reset-dedup-01`.

## Current checkpoint

- Extracted repeated next-audio reset assignments into `resetNextAudioState()`, used by `stopAudio()`, `clearNextAudio()`, and `activateNextAudio()`.
- Focused contract: `tests/unit/multiplayer_next_audio_state_reset_dedup_contract.test.cjs`, 12 assertions. Await CI logs before marking passed.
- Immutable V82.82 baseline: 8,787,490 bytes / SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`.
- Stage report: `reports/V82_85_28_NEXT_AUDIO_STATE_RESET_DEDUP_01.md`.

## Steps

1. Verify focused contract, source/unit checks, deterministic package and standalone build.
2. Record Firefox and Chromium browser acceptance separately. Do not reopen the known CI audio-output capture mismatch unless actual playback regresses.
3. If accepted, continue the historical debt inventory with one small duplicate whose teardown/side-effect boundaries can be preserved.

## Rollback

Revert the V82.85.28 helper, test, workflow/package versioning, manifest update and checkpoint documentation as one stage. Keep V82.85.27 and V82.82 intact.
