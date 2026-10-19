# V82.85.24 Chromium PulseAudio output-route diagnostic probe

## Scope

Added `tests/browser/chromium_pulse_output_route_probe.py` and inserted it before the existing real-audio acceptance gate. It plays the same generated non-silent PCM WAV through three Chromium launch configurations:

1. Default Chromium audio service.
2. AudioServiceSandbox disabled.
3. Both AudioServiceSandbox and AudioServiceOutOfProcess disabled (the existing acceptance configuration).

For each configuration it records media timeline progress, PulseAudio sink-input state, and PCM monitor peak/RMS. This is a diagnostic-only probe: its successful exit means all variants were attempted and reported, not that audible output was produced.

## Safety constraints

- No production JavaScript, CSS, HTML, fragment manifest, or release fingerprint changed.
- The required `real_audio_output_acceptance.py` gate remains unchanged and still asserts non-silent PCM output.
- The probe is placed before that gate so diagnostic evidence is retained even when the authoritative gate fails.
- V82.82 remains immutable.

## Verification

- GitHub Actions run for this branch must be checked after completion.
- Local execution was not performed in this environment.
- Manual desktop/browser acceptance was not performed.
- The prior run showed Chromium connected as a PulseAudio client, but `sinkInputs` was empty while media time advanced; captured PCM was silent (`peak=0, rms=0.0`). The matrix is intended to distinguish a launch-configuration issue from a broader CI audio backend problem.

## Rollback

Remove the workflow step `Diagnose Chromium PulseAudio output routing` and `tests/browser/chromium_pulse_output_route_probe.py`; revert the stage report and checkpoint docs. No production rollback is required.

## Next task

Inspect the matrix results from CI. If one launch configuration creates a sink input and non-silent PCM, apply only that evidence-backed configuration to the existing real-audio acceptance browser and rerun the full gate. If all variants remain silent, investigate Chromium/PulseAudio backend initialization rather than changing application playback logic or weakening the assertion.
