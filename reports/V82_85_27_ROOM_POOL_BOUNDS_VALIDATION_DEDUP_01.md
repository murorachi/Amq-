# V82.85.27 multiplayer room pool bounds validation deduplication

## Scope

- Base checkpoint: `v82.85.26-suggestion-cache-invalidation-dedup-01`, base commit `85ffb06b360b73fa4a84015a8c95623345b21545`.
- Immutable product baseline remains V82.82: 8,787,490 bytes / SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`.
- Change is limited to `src/scripts/script_028.htmlpart`: extract the duplicate year/difficulty bound checks from `createSettings()` and `configureFromUi()` into `validateRoomPoolBounds()`.
- Input collection remains in each caller. The shared validator preserves the existing error messages and check precedence: invalid year, invalid difficulty, inverted year range, inverted difficulty range.
- No UI, stored preference shape, room API payload, song pool policy, audio behavior, or protocol changes are intended.

## Focused test

Added `tests/unit/multiplayer_room_pool_bounds_validation_contract.test.cjs`. It checks that the validator is defined once and called by both consumers, each validation message has one owner, valid inclusive bounds pass, missing/invalid values fail, inverted bounds fail, and validation precedence remains stable.

The test contains 14 assertions. It passed in [GitHub Actions run 39228325204](https://github.com/murorachi/Amq-/actions/runs/39228325204). The current branch revision corrects the printed assertion count and is queued for repeat verification.

## Verification status

- Source change: committed to the versioned branch.
- Focused contract and source/unit job: **PASS** in run [39228325204](https://github.com/murorachi/Amq-/actions/runs/39228325204).
- Modified fragment: 139,501 bytes / SHA-256 `0461515bbf8615bfe943f078238aaa9851e9845b62b53a79365fae6061dc9fff`.
- Candidate V82.85.27: 8,786,846 bytes / SHA-256 `cf89981db7241e929fb0c1f36f6919911e4abb069140b1e5dbe12f935ec3a251`; deterministic build, source verifier, package completeness/reproducibility and Firefox responsive: **PASS**.
- Native-origin storage/custom-list, IndexedDB/quiz input, suggestion integration, answer/playback lifecycle and multiplayer lifecycle: **PASS**. Real browser audio output capture: **FAIL**, same known CI capture mismatch; actual product playback was user-confirmed and no audio code changed.
- Manual interactive acceptance: not performed.

## Rollback

Revert the V82.85.27 room-pool validation commit series as a unit, including the helper, focused contract, workflow/package versioning, manifest fingerprint, and checkpoint documents. Do not alter the V82.82 baseline or overwrite V82.85.26.
