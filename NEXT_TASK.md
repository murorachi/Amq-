# Next task: verify V82.85.27 and continue bounded deduplication

Branch: `v82.85.27-room-pool-validation-dedup-01`.

## Current checkpoint

- V82.85.27 consolidates duplicate year/difficulty validation in multiplayer `createSettings()` and `configureFromUi()` into `validateRoomPoolBounds()`.
- Focused test: `tests/unit/multiplayer_room_pool_bounds_validation_contract.test.cjs`, 14 assertions, passed in run [39228325204](https://github.com/murorachi/Amq-/actions/runs/39228325204). A follow-up run is queued to verify the corrected printed assertion count.
- Immutable V82.82 baseline: 8,787,490 bytes / SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`.
- Stage report: `reports/V82_85_27_ROOM_POOL_BOUNDS_VALIDATION_DEDUP_01.md`.

## Steps

1. Confirm the latest run after the assertion-count correction, including source/unit, package reproducibility, standalone build and browser suites. Record each pass/fail separately.
2. If it passes, continue the debt inventory with one exact duplicate and a clear owner; avoid expanding scope.
3. Do not investigate the known CI audio-output mismatch unless actual product playback regresses; user confirmed playback works.
4. After acceptance, resume the debt inventory and select only another exact duplicate with one clear owner. Avoid broad lifecycle changes, storage-key changes and CSS reordering.

## Rollback

Revert the V82.85.27 helper, focused test, workflow/package versioning, manifest update and checkpoint documents as one stage. Keep V82.85.26 and V82.82 immutable.
