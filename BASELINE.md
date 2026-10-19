# Baseline checkpoint: V82.85.32 non-audio audit, no product changes

- Official branch: `v82.85.28-next-audio-state-reset-dedup-01`.
- Official HEAD before this documentation-only stage: `78ded6791e9591c4b4cce1529f10bb0f474a03bc`.
- V82.85.32 rejected consolidation of the answer-mirror input listeners in `script_008.htmlpart` and `script_009.htmlpart` because their new-question event behavior differs.
- Baseline docs CI [39296906101](https://github.com/murorachi/Amq-/actions/runs/39296906101) passed all three jobs.
- Product standalone candidate remains unchanged: V82.85.30, 8,786,609 bytes / SHA-256 `3eb23d8711b5c5d504513ad72595b6177392c6865abd49ae0a93dea1d2de14d2`.
- Immutable V82.82 remains 8,787,490 bytes / SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`.
- No product source, release manifest, generated HTML, or artifact was changed. This is a documentation-only checkpoint.

---

# Previous baseline checkpoint: V82.85.31 merged and verified

# Baseline checkpoint: V82.85.30 audio volume default fix

- Branch: `v82.85.30-audio-volume-default-fix-01`, based on the V82.85.29 Chromium/PulseAudio diagnostic checkpoint, itself based on V82.85.28.
- Immutable V82.82 product baseline remains 8,787,490 bytes / SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`.
- Confirmed root cause from CI run [39286354693](https://github.com/murorachi/Amq-/actions/runs/39286354693): the HTMLMediaElement was `muted=true`, `volume=0`, `paused=false`, `readyState=4`; PulseAudio had no sink-input across 10 samples and captured PCM was silent.
- Source cause: `Number(localStorage.getItem('aniQuizVolume'))` converts a missing `null` preference to zero, overriding the intended 70% default. This then mutes the shared audio player.
- Fix: only parse the saved volume when a non-empty stored value exists; preserve explicit saved 0 and other valid values. Added `tests/unit/quiz_volume_default_contract.test.cjs` for missing, zero, and nonzero preferences.
- First reconstructed V82.85.30 candidate fingerprint: 8,786,609 bytes / SHA-256 `3eb23d8711b5c5d504513ad72595b6177392c6865abd49ae0a93dea1d2de14d2`. The candidate is byte-identical to the CI rebuild; V82.85.28 and V82.82 remain untouched.
- Regression contract: local and CI both passed 10/10 assertions. Latest full CI run [39290498626](https://github.com/murorachi/Amq-/actions/runs/39290498626) passed all three jobs. Source/unit verifier: 132/132; volume-default regression: 10/10; deterministic candidate: 8,786,609 bytes / SHA-256 `3eb23d8711b5c5d504513ad72595b6177392c6865abd49ae0a93dea1d2de14d2`; package repeatability passed; Firefox responsive passed; Chromium native-origin passed. Browser media reported muted=false and volume=0.7; PulseAudio sink was RUNNING with sink-input present in all ten samples; captured PCM peak=4899 and RMS=2384.5 passed the unchanged thresholds. Artifact-name alignment also passed in run [39289986327](https://github.com/murorachi/Amq-/actions/runs/39289986327). One intermediate run [39289800143](https://github.com/murorachi/Amq-/actions/runs/39289800143) failed only at the existing fixed-delay media-timeline assertion even though PulseAudio had an active sink-input; the two subsequent full runs passed. This remains a test-timing risk, not evidence of recurring audio silence.
- Rollback: revert the V82.85.30 volume initialization change, focused contract, manifest/workflow/package metadata and checkpoint docs together. Preserve the V82.85.28 branch and immutable V82.82 baseline.

---

## Historical checkpoint: V82.85.28

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
