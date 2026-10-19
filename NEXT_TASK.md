# Next task: diagnose Chromium audio output stream

Branch: v82.85.29-chromium-pulse-stream-diagnostics-01.

## Current checkpoint

- Parent: v82.85.28-next-audio-state-reset-dedup-01. Immutable V82.82 product baseline remains 8,787,490 bytes / SHA-256 227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b.
- Test-only change in tests/browser/real_audio_output_acceptance.py: capture media-element mute/volume/readiness/source state, sample PulseAudio sink-inputs ten times during active playback, record actual monotonic elapsed time for each sample, and print detailed sink-input properties.
- Reason: run 39229842012 showed the native playing event and advancing media timeline, but PulseAudio reported no sink-input and an IDLE sink; final monitor PCM had peak=0 and RMS=0. Root cause remains unconfirmed.

## Steps

1. Run the native-origin workflow on this branch and inspect PULSE_STREAM_DIAGNOSTIC.
2. Classify the evidence: (a) media muted/volume zero, (b) no PulseAudio sink-input despite active media, (c) sink-input present but monitor remains silent, or (d) stream appears only intermittently.
3. Make the smallest test-environment-only fix supported by the logs. Do not change production audio logic unless a separate product regression is demonstrated.
4. Re-run native audio output acceptance and verify non-silent PCM (peak >= 1000 and RMS >= 150), plus the existing lifecycle assertions. Report other CI jobs separately.
5. If the environment-level cause is not demonstrated, keep the issue open rather than weakening the PCM gate.

## Current test status

- Existing run 39229842012: source/unit and Firefox responsive passed; native audio lifecycle passed; non-silent PCM output failed.
- V82.85.29 diagnostic workflow result: pending verification.
- Local syntax/test execution: not run in this editing session.

## Rollback

Revert the V82.85.29 diagnostic-only test and checkpoint documentation. Preserve V82.85.28, V82.85.27, and immutable V82.82.
