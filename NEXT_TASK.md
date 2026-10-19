# Next task: continue historical-code deduplication

Branch: `v82.85.25-multiplayer-audio-callback-dedup-01`.

## Current checkpoint

- Immutable V82.82 remains 8,787,490 bytes / SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`.
- V82.85.25 consolidates two identical multiplayer audio failure callback bodies into one parameterized helper. Both original flows retain their own `id`, media object and watchdog closure.
- Focused contract checks the helper's pending candidate fallback, active audio fallback, stale event safety, and the two call sites.
- Finish deterministic build fingerprint verification before treating this stage as accepted.
- The user confirmed actual audio playback works. Do not spend more time on the known CI-only audio capture mismatch unless product playback regresses.

## Steps

1. Retrieve CI output and finalize V82.85.25 release fingerprint.
2. Confirm source verifier, callback contract, package completeness/reproducibility, and Firefox responsive acceptance.
3. Update the historical debt inventory with the completed dedup and its actual test results.
4. Select the next exact/semantic duplicate with meaningful maintenance value; do not merge same-name helpers with different behavior.
5. Keep the quiz lifecycle, persistence, CSS ordering, and multiplayer state boundaries intact unless a specific change requires touching them.

## Rollback

Revert the helper extraction, test, workflow step, package/report metadata, and manifest fingerprints as a unit. Keep V82.82 immutable.
