# V82.85.4 Engineering Acceptance Report

- Product baseline remains V82.82 (`dist/amq_learning_tool_v82_82.html`, 8,787,490 bytes, SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`). Immutable V82.65 is unchanged. No product HTML was regenerated.
- Added `tests/browser/native_storage_custom_lists_acceptance.py`, using native browser storage on a localhost HTTP origin. It checks reload preservation, allows only a valid default-empty `aniSrsScheduleV1` initialization, exercises AMQ/EMQ custom-list creation, membership, rename, reload and full backup export/delete/restore.
- The original user-local-only script was not available to this repository session. The tracked harness is a reproducible equivalent, not a verbatim copy of that unavailable file.
- Added `tests/unit/custom_list_crud_reload_contract.test.cjs` for AMQ/EMQ CRUD persistence, ID mapping and source-level UI contracts. The existing seven-case native storage snapshot contract and backup manifest contract are retained.
- Low-risk modularization: exact `listWorkIds`, `listSongIds` and `listSongCount` helpers moved to `src/modules/emq_list_membership.htmlpart`; a unique marker preserves the original insertion point and runtime scope. Manifest fingerprints are updated. No answer submission, playback, multiplayer lifecycle or CSS cascade code was extracted.
- Added `.github/workflows/v82-85-4-engineering-acceptance.yml` to run the deterministic verifier, focused Node contracts, Chromium real-origin acceptance and existing custom-list UI regression.
- Previously recorded tests: snapshot contract 7/7 passed; user manually confirmed V82.82 opens and learning works. Newly added tests are pending the first workflow run at report authoring. Firefox, real audio, production-domain policy and multiplayer reconnect remain unverified.
- Rollback: return to `v82.85.3-native-storage-reload-assertion-fix-01`. V82.82 and immutable V82.65 remain preserved.
