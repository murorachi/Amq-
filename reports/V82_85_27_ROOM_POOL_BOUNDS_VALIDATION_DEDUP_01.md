# V82.85.27 multiplayer room pool bounds validation deduplication

## Scope

- Base checkpoint: `v82.85.26-suggestion-cache-invalidation-dedup-01`, base commit `85ffb06b360b73fa4a84015a8c95623345b21545`.
- Immutable product baseline remains V82.82: 8,787,490 bytes / SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`.
- Change is limited to `src/scripts/script_028.htmlpart`: extract the duplicate year/difficulty bound checks from `createSettings()` and `configureFromUi()` into `validateRoomPoolBounds()`.
- Input collection remains in each caller. The shared validator preserves the existing error messages and check precedence: invalid year, invalid difficulty, inverted year range, inverted difficulty range.
- No UI, stored preference shape, room API payload, song pool policy, audio behavior, or protocol changes are intended.

## Focused test

Added `tests/unit/multiplayer_room_pool_bounds_validation_contract.test.cjs`. It checks that the validator is defined once and called by both consumers, each validation message has one owner, valid inclusive bounds pass, missing/invalid values fail, inverted bounds fail, and validation precedence remains stable.

The test declares 14 assertions. Execution status must be taken from the linked CI run after this branch's workflow starts; static creation of the test is not a test pass.

## Verification status

- Source change: committed to the versioned branch.
- Focused contract: pending CI.
- Source fingerprint / deterministic build: pending manifest refresh and CI.
- Existing unit tests, package reproducibility, standalone candidate build, Firefox responsive and browser acceptance: pending CI.
- Manual interactive acceptance: not performed.
- Known CI audio-output capture mismatch remains out of scope because actual product playback was user-confirmed; no audio code changed.

## Rollback

Revert the V82.85.27 room-pool validation commit series as a unit, including the helper, focused contract, workflow/package versioning, manifest fingerprint, and checkpoint documents. Do not alter the V82.82 baseline or overwrite V82.85.26.
