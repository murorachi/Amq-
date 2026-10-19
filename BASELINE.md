# Baseline checkpoint: V82.85.28 next-audio state reset dedup

- Parent checkpoint: V82.85.27 room pool bounds validation dedup.
- Current branch: `v82.85.28-next-audio-state-reset-dedup-01`.
- Immutable V82.82 product baseline remains 8,787,490 bytes / SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`.
- Production change: centralize the identical next-audio state reset assignments in `resetNextAudioState()`, consumed by `stopAudio()`, `clearNextAudio()`, and `activateNextAudio()`. Media teardown and audio promotion remain in their existing callers.
- Focused test: `tests/unit/multiplayer_next_audio_state_reset_dedup_contract.test.cjs`, 12 assertions; passed in run [39229842012](https://github.com/murorachi/Amq-/actions/runs/39229842012). Source/unit verifier passed 132/132; Firefox responsive passed; Chromium native-origin is still in progress.
- - Modified fragment: 139,202 bytes / SHA-256 `24d805495ba443bd8e927d3b3ae37dcd581cb2b1d9c7ab872e223234849e1a50`.
- Candidate: 8,786,547 bytes / SHA-256 `7284c4ca5625886d913f55ab19a0076d1a5be46a88504dd8de724ae8f5bd274d`. Source fingerprint, deterministic build, package reproducibility and Firefox responsive passed in run [39229842012](https://github.com/murorachi/Amq-/actions/runs/39229842012); Chromium native-origin acceptance is still running.
- Rollback: revert the V82.85.28 helper, test, workflow/package versioning, manifest update and checkpoint documents together. Keep V82.85.27 and V82.82 immutable.
