# Next task

Current checkpoint: **V82.86.06 backup/restore acceptance**. Branch `v82.86.06-backup-restore-acceptance-01`.

## Verified result
- Browser acceptance run [39163991326](https://github.com/murorachi/Amq-/actions/runs/39163991326): both `source-and-unit` and `browser-native-origin` PASS.
- Restored AMQ/EMQ IDs and memberships survive another real localhost document reload.
- An invalid version-10 backup manifest is rejected without changing the localStorage snapshot.
- Existing backup manifest validation and synthetic write-failure rollback tests are now explicitly executed by CI; source/unit in run [39164060206](https://github.com/murorachi/Amq-/actions/runs/39164060206) PASS.
- No product source or generated HTML changed. V82.82 fingerprint remains locked at 8,787,490 bytes, SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`.

## Next bounded task
1. Continue AMQ-TODO-011: IndexedDB blocked/open/upgrade, quota/write failure, corruption, rollback and reload matrix.
2. Keep the synthetic localStorage restore-write rollback test separate from actual IndexedDB quota/corruption; they are different failure surfaces.
3. Keep production-origin policy, Firefox, real audio-provider playback and live multiplayer reconnect as separate gates.
4. Verify final branch HEAD CI after the engineering-record updates in this stage.

## Rollback
Revert the V82.86.06 browser test and engineering-record commits. Product rollback is not required.
