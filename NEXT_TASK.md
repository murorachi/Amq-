## Current stage: V82.86.06 backup/restore acceptance

Branch: v82.86.06-backup-restore-acceptance-01

1. Verify final branch-head GitHub Actions, including native-origin browser acceptance and deterministic V82.82 product fingerprint.
2. If CI passes, record run ID, job outcomes, test assertions and SHA-256; if it fails, fix the test or investigate product behavior without weakening assertions.
3. Keep production-origin policy, Firefox, IndexedDB quota/corruption, real audio-provider playback and live multiplayer reconnect as separate external gates.
4. Next bounded task after acceptance: inspect IndexedDB quota/corruption failure handling and define rollback assertions. Do not change product behavior without a reproduced defect.

## Rollback
Revert the V82.86.06 browser-test and engineering-document commits. Product rollback is not required.
