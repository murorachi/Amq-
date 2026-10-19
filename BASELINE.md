# Baseline checkpoint: V82.85.24 Chromium audio output route probe

- Parent engineering checkpoint: V82.85.23 callback-contract test, commit `32f46b00f13dcf8e2741d0e019e6111758e7d64d`.
- Current branch: `v82.85.24-chromium-audio-output-probe-01`.
- Production candidate remains V82.85.22, 8,787,300 bytes / SHA-256 `69909839f922b702635eec217fcbb836c388502f83d40b11021cd194de20cdc2`.
- Immutable V82.82 remains 8,787,490 bytes / SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`.
- Added `tests/browser/chromium_pulse_output_route_probe.py` and a workflow step before the authoritative real-audio output gate. The probe compares default audio service, sandbox-disabled, and sandbox-plus-OOP-disabled Chromium configurations.
- Production source and HTML fingerprint are unchanged. The required non-silent PCM assertion is unchanged.
- CI result for this new probe is pending; do not infer success from the script's diagnostic-only exit code.

## Rollback

Remove the probe and workflow step, and revert the stage report/checkpoint documents. No production rollback is required. V82.82 remains immutable.
