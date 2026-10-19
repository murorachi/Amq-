# Next task: verify V82.85.27 and continue bounded deduplication

Branch: `v82.85.27-room-pool-validation-dedup-01`.

## Current checkpoint

- V82.85.27 consolidates duplicate year/difficulty validation in multiplayer `createSettings()` and `configureFromUi()` into `validateRoomPoolBounds()`.
- Focused test: `tests/unit/multiplayer_room_pool_bounds_validation_contract.test.cjs`, 11 declared assertions. Await CI before marking passed.
- Immutable V82.82 baseline: 8,787,490 bytes / SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`.
- Stage report: `reports/V82_85_27_ROOM_POOL_BOUNDS_VALIDATION_DEDUP_01.md`.

## Steps

1. Finish the V82.85.27 source fragment manifest fingerprint and candidate release fingerprint using observed CI values, not guessed hashes.
2. Verify the focused contract, full source/unit checks, deterministic package, standalone build and browser suites. Record each pass/fail separately.
3. Do not investigate the known CI audio-output mismatch unless actual product playback regresses; user confirmed playback works.
4. After acceptance, resume the debt inventory and select only another exact duplicate with one clear owner. Avoid broad lifecycle changes, storage-key changes and CSS reordering.

## Rollback

Revert the V82.85.27 helper, focused test, workflow/package versioning, manifest update and checkpoint documents as one stage. Keep V82.85.26 and V82.82 immutable.
