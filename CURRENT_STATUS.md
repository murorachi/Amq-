# Current engineering checkpoint: V82.86.06 backup/restore acceptance

- Branch: `v82.86.06-backup-restore-acceptance-01`.
- Parent: `v82.86.05-custom-list-id-lifecycle-matrix-01`, commit `1b9b9a6e2e95bb2414968fe6aef1e119bd6ee8dc`.
- Report: `reports/V82_86_06_BACKUP_RESTORE_ACCEPTANCE_01.md`.
- Browser test: `tests/browser/native_storage_custom_lists_acceptance.py`.
- Scope: test and engineering records only. Product source, manifest and generated HTML are unchanged.
- Added assertions: restored AMQ/EMQ IDs and memberships survive a second real localhost reload; invalid full-backup manifest is rejected before localStorage mutation; both restored lists remain visible after rejection.
- Verified browser acceptance: run `39163991326`, both `source-and-unit` and `browser-native-origin` PASS.
- Existing backup validator and synthetic write-failure rollback contracts are now explicitly run by CI; run `39164060206` `source-and-unit` PASS.
- First fixture attempt failed because it entered the legacy merge path instead of the full-backup validator. Corrected fixture now explicitly targets version 10 with an inconsistent manifest; no product defect is claimed from the first test fixture.
- Product lock: V82.82, 8,787,490 bytes, SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`. V82.65 remains immutable.
- Open gates: production-origin policy, Firefox, IndexedDB quota/corruption, real audio provider, live multiplayer reconnect.
