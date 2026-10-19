# Baseline checkpoint: V82.85.28 next-audio state reset dedup

- Parent checkpoint: V82.85.27 room pool bounds validation dedup.
- Current branch: `v82.85.28-next-audio-state-reset-dedup-01`.
- Immutable V82.82 product baseline remains 8,787,490 bytes / SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`.
- Production change: centralize the identical next-audio state reset assignments in `resetNextAudioState()`, consumed by `stopAudio()`, `clearNextAudio()`, and `activateNextAudio()`. Media teardown and audio promotion remain in their existing callers.
- Focused test: `tests/unit/multiplayer_next_audio_state_reset_dedup_contract.test.cjs`, 12 assertions; passed in run [39229842012](https://github.com/murorachi/Amq-/actions/runs/39229842012). Source/unit verifier passed 132/132; Firefox responsive passed; Chromium native-origin is still in progress.
- - Modified fragment: 139,202 bytes / SHA-256 `24d805495ba443bd8e927d3b3ae37dcd581cb2b1d9c7ab872e223234849e1a50`.
- Candidate: 8,786,547 bytes / SHA-256 `7284c4ca5625886d913f55ab19a0076d1a5be46a88504dd8de724ae8f5bd274d`. Source fingerprint, deterministic build, package reproducibility and Firefox responsive passed in run [39229842012](https://github.com/murorachi/Amq-/actions/runs/39229842012); Chromium native-origin acceptance is still running.
- Rollback: revert the V82.85.28 helper, test, workflow/package versioning, manifest update and checkpoint documents together. Keep V82.85.27 and V82.82 immutable.


## V82.85.29 checkpoint: Chromium PulseAudio stream diagnostics

- Branch: v82.85.29-chromium-pulse-stream-diagnostics-01; parent V82.85.28. Immutable V82.82 baseline remains 8,787,490 bytes / SHA-256 227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b.
- Test-only change: tests/browser/real_audio_output_acceptance.py now records HTMLMediaElement mute/volume/source/readiness state and samples PulseAudio sink inputs ten times during native playback and records actual monotonic elapsed time for each sample. It also logs detailed sink-input properties. Production playback code and standalone candidate are unchanged.
- Rationale: V82.85.28 logs showed Chromium as a PulseAudio client but no sink-input, an IDLE sink, and captured PCM peak=0/RMS=0. The one-time snapshot could not distinguish a missing/short-lived output stream from muted/zero-volume media.
- Existing evidence from run 39229842012: source/unit verifier 132/132, focused state-reset contract 12 assertions, deterministic package/build and Firefox responsive passed. Native playback lifecycle assertions passed, but non-silent PCM output failed.
- New diagnostic run has not yet been verified. No root cause or repair is claimed at this checkpoint.
- Rollback: revert the V82.85.29 test-only diagnostics and checkpoint documents; preserve V82.85.28 and immutable V82.82.
