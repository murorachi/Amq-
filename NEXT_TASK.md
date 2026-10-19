# Next task: continue historical-code deduplication

Branch: `v82.85.26-suggestion-cache-invalidation-dedup-01`.

## Current checkpoint

- V82.85.26 removes one redundant anime suggestion-cache invalidation loop from the multiplayer display-language change listener. The shared refresh function already performs this invalidation and refreshes anime, artist and title fields.
- Change size: 95 source characters removed; one invalidation loop remains.
- Immutable V82.82 baseline: 8,787,490 bytes / SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`.
- Modified fragment: 139,664 bytes / SHA-256 `c349421f2a4759677669079d5e37a212795958ec6e556b56f36cadddeb56d018`.
- Release fingerprint verified by CI: 8,787,009 bytes / SHA-256 `1745600f52de09983ca3b66e45341a27acbd463e233fc77719e42f4673d4abad`. Source/unit checks, cache contract, package completeness/reproducibility and candidate build/upload passed. Firefox responsive passed in run [39224733975](https://github.com/murorachi/Amq-/actions/runs/39224733975). Browser-native-origin remains in progress at the real-browser audio output gate; do not spend further time diagnosing it unless actual playback regresses.
- User confirmed current product audio playback works; do not resume investigation of the unrelated CI audio-capture mismatch.

## Steps

1. Record the final browser-native-origin result when available, without reopening the known CI audio-output mismatch. Core source/build/package and Firefox checks have passed.
2. Continue the historical technical-debt inventory; select the next repeated logic with a clear single owner and no semantic ambiguity.
3. Do not merge same-name helpers with different behavior, rework quiz lifecycle boundaries, rename storage keys, or reorder CSS during a dedup pass.

## Rollback

Restore the removed cache invalidation loop and revert this stage's test, workflow/package/report metadata and manifest changes as one unit. Keep V82.82 immutable.
