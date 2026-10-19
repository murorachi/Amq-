# Next task: diagnose Chromium audio output routing

Branch: `v82.85.23-audio-failure-contract-01`.

## Current checkpoint

- Production baseline remains V82.85.22, 8,787,300 bytes / SHA-256 `69909839f922b702635eec217fcbb836c388502f83d40b11021cd194de20cdc2`.
- Immutable V82.82 remains 8,787,490 bytes / SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`.
- The callback contract is registered in CI and passed in run [39211912490](https://github.com/murorachi/Amq-/actions/runs/39211912490). Local execution was not performed.
- Firefox responsive and multiplayer lifecycle acceptance passed. The browser-native-origin job failed at real audio output: Chromium media time advances, but PulseAudio reports no sink inputs and captured PCM is silent (`peak=0, rms=0.0`).
- No production code or standalone HTML fingerprint changed in V82.85.23.

## Steps

1. Investigate why Chromium registers as a PulseAudio client but creates no sink input while native media playback advances. Keep audio output assertion unchanged.
2. Add or adjust only test-harness diagnostics/launch configuration based on evidence, then rerun the real audio gate.
3. Re-run the full browser-native-origin and Firefox jobs after any harness change; distinguish test-environment fixes from actual application behavior.
4. Defer the duplicate callback extraction unless later maintenance evidence makes it worthwhile; preserve the passing callback contract.
5. Update release fingerprints and standalone artifacts only for a production-source change.

## Rollback

For any future audio-harness change, revert only the relevant test/workflow change if it makes the output test less reliable. Do not weaken the non-silent PCM assertion. Production source remains V82.85.22 and needs no rollback. Never overwrite V82.82.
