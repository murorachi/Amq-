# Baseline checkpoint: V82.85.25 multiplayer audio failure handler deduplication

- Parent checkpoint: V82.85.23 callback contract, commit `32f46b00f13dcf8e2741d0e019e6111758e7d64d`.
- Current branch: `v82.85.25-multiplayer-audio-callback-dedup-01`.
- Immutable V82.82 remains 8,787,490 bytes / SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`.
- Production change is limited to consolidating two identical audio failure callbacks into `handleAudioFailure(id,a,watchdog)`; the original call sites and their lexical variables remain in place.
- Callback contract was passing before extraction in CI. Post-refactor contract and deterministic build must pass before accepting V82.85.25.
- The fragment manifest now records `script_028.htmlpart` at 139,759 bytes / SHA-256 `1112d964951abde8cfcb8e389aa4b601709f90cd049778b4d8423472d0347297`. Candidate V82.85.25 is pinned at 8,787,104 bytes / SHA-256 `075068b01a6429629315157a4e412a0c28c8d58c920313dada607584234c71c1`; the next CI run must verify this fingerprint.
- User manually verified audible playback in the current application. The unrelated CI audio capture discrepancy is noted, not treated as a blocker for this small dedup stage; the audio test was not weakened.
- Rollback: restore the previous helper bodies and manifest fingerprints together. Never overwrite V82.82.
