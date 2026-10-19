# Current engineering checkpoint: V82.85.23 audio failure callback contract

- Branch: `v82.85.23-audio-failure-contract-01`, based on V82.85.22 commit `88642d2aa4e23ce91ff0ef9e186d12000f095eb7`.
- Production baseline is unchanged: V82.85.22 candidate 8,787,300 bytes / SHA-256 `69909839f922b702635eec217fcbb836c388502f83d40b11021cd194de20cdc2`; immutable V82.82 remains 8,787,490 bytes / SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`.
- This stage adds `tests/unit/multiplayer_audio_failure_callback_contract.test.cjs` and registers it in the source/unit workflow. No production audio code changed.
- Contract covers both currently identical `failed` callbacks: pending candidate fallback, active audio fallback, stale callback safety, and body equivalence. Local test execution was not performed; GitHub Actions run `39211912490` completed the source-and-unit job successfully, including this contract.
- Stage report: `reports/V82_85_23_MULTIPLAYER_AUDIO_FAILURE_CALLBACK_CONTRACT_01.md`.
- Prior V82.85.22 checks: verifier 132/132, checked-helper contract 7 assertions, package reproducibility and Firefox responsive passed. Native-origin storage/custom-list, IndexedDB/input, suggestion, quiz lifecycle and multiplayer lifecycle passed.
- The real-audio output assertion remains failed in the prior run (`peak=0, rms=0.0`; Chromium had no sink inputs). The audio gate remains unchanged and full acceptance is not passed.

## Next direction

The callback contract passed in CI. Code review found that a shared factory would add another layer around a small callback while still requiring release fingerprint/package updates; do not perform the production extraction unless a concrete maintenance benefit outweighs that risk. Prioritize the separate Chromium output failure: media playback advances, but PulseAudio reports no sink inputs and the monitor remains silent. Keep the output assertion unchanged.

## Rollback

Remove the focused test and workflow step and revert this stage's report/checkpoint documents. No production rollback is required. Never overwrite V82.82.
