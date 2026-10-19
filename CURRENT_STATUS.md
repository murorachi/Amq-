# Current engineering checkpoint: V82.85.24 Chromium audio output route probe

- Branch: `v82.85.24-chromium-audio-output-probe-01`, based on the completed V82.85.23 callback-contract checkpoint.
- Production baseline remains V82.85.22 candidate 8,787,300 bytes / SHA-256 `69909839f922b702635eec217fcbb836c388502f83d40b11021cd194de20cdc2`; immutable V82.82 remains 8,787,490 bytes / SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`.
- V82.85.23 callback contract passed in GitHub Actions run [39211912490](https://github.com/murorachi/Amq-/actions/runs/39211912490). Firefox responsive and multiplayer lifecycle acceptance passed.
- Prior required real-audio gate failed: media playback time advances, Chromium appears as a PulseAudio client, but PulseAudio reports no sink inputs and monitor output is silent (`peak=0, rms=0.0`).
- This stage adds a diagnostic-only matrix testing three Chromium audio-service launch configurations and logs sink inputs plus captured PCM peak/RMS. It is inserted before the existing audio gate so evidence remains available.
- No production code, standalone HTML, source fragment, or release fingerprint changed.
- Stage report: `reports/V82_85_24_CHROMIUM_PULSE_OUTPUT_ROUTE_PROBE_01.md`.

## Next direction

Read the diagnostic matrix results from CI. Apply a launch-configuration change only if the probe demonstrates non-silent output for that configuration. If every variant is silent, continue investigating Chromium/PulseAudio backend initialization. Do not weaken the existing output assertion.

## Rollback

Remove the diagnostic script and workflow step, then revert this stage report and checkpoint documents. No production rollback is required. Never overwrite V82.82.
