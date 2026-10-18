# Current engineering checkpoint: V82.86.06 custom-list backup/restore acceptance

- Branch: `v82.86.06-custom-list-backup-restore-acceptance-01`.
- Parent baseline: `v82.86.05-custom-list-id-lifecycle-matrix-01`, commit `1b9b9a6e2e95bb2414968fe6aef1e119bd6ee8dc`.
- New report: `reports/V82_86_06_CUSTOM_LIST_BACKUP_RESTORE_ACCEPTANCE_01.md`.
- Browser test extended: `tests/browser/native_storage_custom_lists_acceptance.py`.
- Scope: malformed backup must not mutate storage; valid AMQ/EMQ backup restore must survive fresh document reload with IDs and EMQ work/VNDB membership preserved.
- Product source/HTML: unchanged; no JS/CSS/fragments/manifest edits.
- CI for latest branch commit: pending at checkpoint update; do not treat test assertions as passed until the latest run is green.
- Product lock remains V82.82, 8,787,490 bytes, SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`; V82.65 remains immutable.
- Risk boundary: malformed JSON is rejected before mutation; multi-key storage quota/write failure and transaction-like rollback are not tested or claimed.
- Next: verify the final branch CI, then separately reproduce import-time write failure and determine whether a product fix is required.
