# Next task

Current checkpoint: **V82.86.06 backup/restore acceptance**. Branch `v82.86.06-backup-restore-acceptance-01`.

## This stage
- Extend `tests/browser/native_storage_custom_lists_acceptance.py`.
- Verify AMQ and EMQ custom-list backup restore followed by a real localhost document reload.
- Assert AMQ member IDs and EMQ work/VNDB memberships remain intact.
- Feed a JSON-valid but invalid backup envelope and assert the complete localStorage snapshot is unchanged.
- Keep product source and generated HTML unchanged.
- Final acceptance requires both `source-and-unit` and `browser-native-origin` jobs to pass on the final branch HEAD.

## After this stage is verified
1. Record the final GitHub Actions run and check both jobs.
2. Continue with the bounded IndexedDB quota/corruption and rollback matrix (AMQ-TODO-011).
3. Keep production-origin policy, Firefox, real audio-provider playback and live multiplayer reconnect as separate gates.

## Product baseline
V82.82, 8,787,490 bytes, SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`. V82.65 remains immutable.

## Rollback
Revert the V82.86.06 browser test and engineering-record commits. Product rollback is not required.
