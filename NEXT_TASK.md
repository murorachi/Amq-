# Next task

Current checkpoint: **V82.86.06 custom-list backup/restore acceptance**. Branch `v82.86.06-custom-list-backup-restore-acceptance-01`.

## Current scope
- Extend the real-localhost Chromium acceptance around the actual export/import UI.
- Verify malformed JSON is rejected before any localStorage mutation.
- Verify a valid backup restores deleted AMQ/EMQ lists and those IDs/names plus EMQ work/VNDB memberships survive a fresh document reload.
- Product source and generated V82.82 HTML remain unchanged.
- Latest branch CI: pending; verify both jobs before claiming completion.

## Next bounded task after CI
1. Check the final CI run and verify the branch head and remote artifacts.
2. Reproduce a storage write/quota failure during multi-key import.
3. Assert whether any earlier keys were already mutated. If partial application is reproducible, document it as a confirmed defect and prepare a separate minimal product-fix stage with explicit product-version/fingerprint handling.
4. Keep Firefox, production-origin storage policy, IndexedDB corruption/quota, real audio provider and live multiplayer gates separate.

## Rollback
Revert the V82.86.06 browser test and engineering-record commits. Product rollback is not required because no product source or HTML was changed.
