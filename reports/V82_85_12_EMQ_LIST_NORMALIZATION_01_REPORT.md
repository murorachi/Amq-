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
- New EMQ normalization contract: PENDING CI.
- Existing source/build verifier and test suite: PENDING CI.
- Browser-native-origin acceptance: PENDING CI.
- Product fingerprint: PENDING deterministic build result.

## Risks and limitations
- This source-only modularization does not prove Firefox, production-domain storage behavior, real audio playback, or multi-client multiplayer reconnect.
- Do not call the stage accepted until GitHub Actions succeeds and the branch head is verified.

## Rollback
Return to `v82.85.11-amq-list-normalization-01` at `8de8ab357f985542981e974e1c113731cf5bd537`. Product baseline remains V82.82.
