# Next task: diagnose Chromium audio backend initialization in CI

Current checkpoint: V82.85.21 real-audio capture investigation.
Branch: `v82.85.18-source-inventory-gate-01`.
User-designated base commit: `715e7a6d734a487a21f8c866093431edd2f4938d`.

## Completed stage

The test-only ALSA default-device routing experiment did not fix the real-audio output failure and was reverted in `192481509c20fa26ba1f994def0224285f76cb12`. Report: `reports/V82_85_21_REAL_AUDIO_CAPTURE_INVESTIGATION_01.md`. No product source changed.

## Next bounded investigation

Inspect Chromium audio backend/device initialization in the failing CI job from [run 39194836859](https://github.com/murorachi/Amq-/actions/runs/39194836859), especially `tests/browser/real_audio_output_acceptance.py` and the `browser-native-origin` job.

Known evidence:
- PulseAudio monitor self-test captures known non-silent PCM.
- Chromium media decode, native playing events, media timeline, pause/resume, answer reveal, and exit cleanup pass.
- PulseAudio lists a `chrome` client but no sink inputs while playback is active.
- Final monitor PCM is silent (`peak=0, rms=0.0`).
- ALSA config routing through `ALSA_CONFIG_PATH` was tested and did not change the outcome.

Next, make Chromium's audio-service diagnostics visible in CI (capture browser stderr or enable an equivalent explicit diagnostic channel), determine the selected output backend/device and why no stream is created, and only then implement a narrowly scoped fix. Preserve the non-silent PCM assertion.

## Stop conditions

- No production playback changes without evidence of a product defect.
- Do not weaken, skip, or remove the output assertion.
- No further speculative audio routing switches without backend evidence.
- After a fix, rerun the isolated real-audio acceptance and the full native-origin job; separately record source/unit and Firefox results.

## Immutable baseline and rollback

V82.82 remains immutable at 8,787,490 bytes / SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`. The failed test-only experiment is already reverted. Roll back only a later targeted harness fix and its documentation if needed.
