# Baseline checkpoint: V82.85.27 room pool bounds validation dedup

- Parent checkpoint: V82.85.26 suggestion cache invalidation dedup, commit `85ffb06b360b73fa4a84015a8c95623345b21545`.
- Current branch: `v82.85.27-room-pool-validation-dedup-01`.
- Immutable V82.82 product baseline remains 8,787,490 bytes / SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`.
- Production change: extracted repeated multiplayer room year/difficulty bound checks into `validateRoomPoolBounds()`, consumed by `createSettings()` and `configureFromUi()`. Input collection remains local to each caller.
- Preserved validation messages and order: invalid year, invalid difficulty, inverted year range, inverted difficulty range.
- Added focused contract `tests/unit/multiplayer_room_pool_bounds_validation_contract.test.cjs` with 11 declared assertions. CI result is pending; no test pass is claimed yet.
- Source fragment and V82.85.27 candidate fingerprints are pending clean CI verification.
- Rollback: revert the V82.85.27 helper, test, workflow/package versioning, manifest update and checkpoint documents together. Keep V82.85.26 and V82.82 intact.
