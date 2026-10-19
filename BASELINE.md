# Baseline checkpoint: V82.85.23 audio failure callback contract

- Parent baseline: V82.85.22 commit `88642d2aa4e23ce91ff0ef9e186d12000f095eb7`.
- Current branch: `v82.85.23-audio-failure-contract-01`.
- Production HTML/source remains pinned to V82.85.22; candidate HTML 8,787,300 bytes / SHA-256 `69909839f922b702635eec217fcbb836c388502f83d40b11021cd194de20cdc2`.
- Immutable V82.82 remains 8,787,490 bytes / SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`.
- Added `tests/unit/multiplayer_audio_failure_callback_contract.test.cjs` and wired it into source/unit CI. No production code or HTML fingerprint changed.
- Contract checks both duplicate callback bodies and their pending-failure, active-failure, and stale-event branches. CI run `39211912490` source-and-unit job passed; Firefox responsive passed. Browser-native-origin job failed only at the required real-audio output assertion (`peak=0, rms=0.0`), while its other listed acceptance steps passed.
- Existing unresolved gate: Chromium real-audio output assertion previously returned `peak=0, rms=0.0`. Keep the assertion intact. Review decision: defer callback extraction for now; the helper's incremental maintainability benefit does not justify altering release metadata until the separate audio gate is addressed.

## Rollback

Revert the test, workflow registration, stage report and checkpoint docs. V82.82 and the V82.85.22 production source remain untouched.
