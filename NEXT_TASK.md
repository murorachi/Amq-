# Next task: use CI evidence to resolve Chromium audio routing

Branch: `v82.85.24-chromium-audio-output-probe-01`.

## Current checkpoint

- Production baseline remains V82.85.22, 8,787,300 bytes / SHA-256 `69909839f922b702635eec217fcbb836c388502f83d40b11021cd194de20cdc2`.
- Immutable V82.82 remains 8,787,490 bytes / SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`.
- Callback failure-branch contract passed in CI run [39211912490](https://github.com/murorachi/Amq-/actions/runs/39211912490).
- New diagnostic probe compares three Chromium audio-service configurations and logs sink-input and captured PCM metrics. Its CI result must be retrieved before choosing a fix.
- The required real-audio gate remains unchanged and currently fails with silent captured PCM.

## Steps

1. Inspect the latest workflow run and read all `AUDIO_ROUTE_PROBE` lines.
2. If one variant has a sink input and non-silent PCM, apply only that proven launch configuration to the existing real-audio acceptance test and rerun the full gate.
3. If every variant is silent, inspect Chromium audio-service logs and PulseAudio connection state before changing more flags.
4. Keep production audio code and the non-silent PCM assertion unchanged until evidence points to an application defect.
5. Re-run native-origin and Firefox browser acceptance after any harness fix. Update the release candidate only if production source actually changes.

## Rollback

Remove `tests/browser/chromium_pulse_output_route_probe.py` and its workflow step if it adds no useful evidence. Never weaken the audio output assertion. Production source remains V82.85.22. Never overwrite V82.82.
