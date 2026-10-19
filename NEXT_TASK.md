# Next task: continue historical-code deduplication

Branch: `v82.85.25-multiplayer-audio-callback-dedup-01`.

## Current checkpoint

- V82.85.25 consolidates two identical multiplayer audio failure callback bodies into one parameterized helper; both original flows retain their own song ID, media element and watchdog ownership.
- Immutable V82.82 remains 8,787,490 bytes / SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`.
- Candidate V82.85.25: 8,787,104 bytes / SHA-256 `075068b01a6429629315157a4e412a0c28c8d58c920313dada607584234c71c1`.
- CI run [39223441076](https://github.com/murorachi/Amq-/actions/runs/39223441076): verifier 132/132, focused handler contract 14 assertions, package completeness/reproducibility, candidate build/upload, and Firefox responsive passed. Browser-native-origin acceptance was still running at checkpoint update.
- Source package SHA-256: `d1c7b2ba2477710900573602fd1faae5c8cf6a494ea6933e79fec884291cb722`.
- User confirmed real app playback works. The CI audio capture mismatch is not a blocker for this dedup stage.

## Steps

1. Finish reading the current CI run's browser-native-origin result, recording any failures without reopening the audio investigation.
2. Continue the historical technical-debt inventory. Inspect remaining exact duplicates and prioritize small helpers with shared scope and observable contracts.
3. Do not merge same-name helpers with different semantics; avoid broad quiz lifecycle, persistence, CSS-order, or multiplayer state refactors without a concrete need.
4. For the next dedup, add a focused contract, update manifest/release candidate, run source/unit and relevant browser regression, then publish the source package and standalone artifact.

## Rollback

Revert the helper extraction, test, workflow step, package/report metadata and manifest fingerprints as a unit. Keep V82.82 immutable.
