# V82.85.12 EMQ list normalization checkpoint report

## Scope
Audit EMQ custom-list normalization and adjacent helper boundaries. Keep the V82.82 standalone product fingerprint locked.

## Baseline
- Parent branch: `v82.85.11-amq-list-normalization-01`
- Parent commit: `8de8ab357f985542981e974e1c113731cf5bd537`
- Product: V82.82, 8,787,490 bytes, SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`
- Immutable V82.65 is not modified.

## Changes
- `readEmqLists()` in `src/scripts/script_028.htmlpart` remains in place because it couples storage access through `readJson()` to normalization. Nine tests characterize its current contract.
- Extracted the pure `unique(v)` helper from `src/scripts/script_040.htmlpart` into `src/modules/emq_list_normalization.htmlpart` byte-for-byte at the same insertion position.
- Added five behavior tests and an exact-source equality assertion for the extracted helper.
- Added the test to engineering CI and updated manifest/source fingerprints and checkpoint documents.
- No intended runtime behavior, storage schema, UI, CSS, quiz lifecycle, or multiplayer lifecycle change.

## Test results
- GitHub Actions run [39131137249](https://github.com/murorachi/Amq-/actions/runs/39131137249): both jobs completed successfully.
- New EMQ normalization contract: 14/14 passed (nine `readEmqLists()` cases and five `unique()` cases).
- Existing contracts: native-storage snapshot 7/7; custom-list CRUD 11/11; AMQ validation 12/12; AMQ normalization 8/8; backup/restore 6/6.
- Integrity and deterministic build verifier: 124/124 passed. Two independent builds matched V82.82 at 8,787,490 bytes / SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`.
- Browser-native-origin job passed: native storage/custom-list acceptance, custom-list UI regression, IndexedDB/quiz input, quiz suggestions, quiz answer/playback lifecycle, and multiplayer lifecycle/reconnect.
- Initial CI run 39131037357 failed because the existing CRUD contract extracted `unique()` from the old source fragment. Updated that test to load the new module, then reran the full workflow successfully. The initial failure is fixed, not hidden.

## Risks and limitations
- This source-only modularization does not prove Firefox, production-domain storage behavior, real audio playback, or multi-client multiplayer reconnect.
- Do not call the stage accepted until GitHub Actions succeeds and the branch head is verified.

## Rollback
Return to `v82.85.11-amq-list-normalization-01` at `8de8ab357f985542981e974e1c113731cf5bd537`. Product baseline remains V82.82.
