# Baseline checkpoint: V82.85.25 multiplayer audio failure handler deduplication

- Parent checkpoint: V82.85.23 callback contract, commit `32f46b00f13dcf8e2741d0e019e6111758e7d64d`.
- Current branch: `v82.85.25-multiplayer-audio-callback-dedup-01`.
- Immutable V82.82 remains 8,787,490 bytes / SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`.
- Production change is limited to consolidating two identical audio failure callbacks into `handleAudioFailure(id,a,watchdog)`; the original call sites and their lexical variables remain in place.
- Callback contract was passing before extraction in CI. Post-refactor contract and deterministic build must pass before accepting V82.85.25.
- The fragment manifest now records `script_028.htmlpart` at 139,754 bytes / SHA-256 `8a576848bf9a1528b801db3795996cf757679b44c9e5e2af34fc1e9fe7d18fa5`. Candidate release SHA-256 is pending the deterministic builder's CI output.
- User manually verified audible playback in the current application. The unrelated CI audio capture discrepancy is noted, not treated as a blocker for this small dedup stage; the audio test was not weakened.
- Rollback: restore the previous helper bodies and manifest fingerprints together. Never overwrite V82.82.
