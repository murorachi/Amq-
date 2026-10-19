# Baseline checkpoint: V82.85.28 next-audio state reset dedup

- Parent checkpoint: V82.85.27 room pool bounds validation dedup.
- Current branch: `v82.85.28-next-audio-state-reset-dedup-01`.
- Immutable V82.82 product baseline remains 8,787,490 bytes / SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`.
- Production change: centralize the identical next-audio state reset assignments in `resetNextAudioState()`, consumed by `stopAudio()`, `clearNextAudio()`, and `activateNextAudio()`. Media teardown and audio promotion remain in their existing callers.
- Focused test: `tests/unit/multiplayer_next_audio_state_reset_dedup_contract.test.cjs`, 12 assertions; CI verification pending.
- Source fragment and V82.85.28 candidate fingerprints must be recorded from actual CI output.
- Rollback: revert the V82.85.28 helper, test, workflow/package versioning, manifest update and checkpoint documents together. Keep V82.85.27 and V82.82 immutable.
