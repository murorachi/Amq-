# Baseline lock and current engineering checkpoint

## V82.86.06
- Branch: `v82.86.06-custom-list-backup-restore-acceptance-01`.
- Parent: `v82.86.05-custom-list-id-lifecycle-matrix-01`, commit `1b9b9a6e2e95bb2414968fe6aef1e119bd6ee8dc`.
- Report: `reports/V82_86_06_CUSTOM_LIST_BACKUP_RESTORE_ACCEPTANCE_01.md`.
- Browser acceptance: `tests/browser/native_storage_custom_lists_acceptance.py`.
- Change scope is test/report/status only. No product JS/CSS, source fragment, manifest or generated HTML changed.
- Product lock: V82.82, 8,787,490 bytes, SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`.
- V82.65 remains immutable.
- CI for the latest branch head is pending and must be checked before acceptance.

## Acceptance boundary
- Added assertions: malformed JSON import leaves the complete localStorage snapshot unchanged; valid backup restores AMQ/EMQ list IDs; a fresh document reload preserves list names and EMQ work/VNDB memberships.
- Not covered: quota/I/O failure midway through multi-key import, transactional rollback, Firefox, production-origin storage policy, real audio-provider and live multiplayer acceptance.
