# V82.85.13 EMQ selection contract report

## Scope
Audit EMQ persistence and selection boundaries; characterize the existing selected-list contract without changing production behavior.

## Baseline
- Parent: v82.85.12-emq-list-normalization-01 at 0d1ec323bb927c03538f20672b8f17cce8b2fa6c.
- Product lock: V82.82, 8,787,490 bytes, SHA-256 227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b.
- V82.65 immutable; CSS separate.

## Audit finding
- loadDb() and saveDb() access browser storage and mutable database/rendering state.
- getSelectedIds() reads either DOM checkbox state or persisted selection, normalizes IDs, and filters against mutable db.lists.
- listWorkIds() and listSongIds() call the live EMQ API; listSongCount() depends on listSongIds().
- No safe existing pure helper boundary was found in this cluster. No extraction was forced and no production fragment or manifest was changed.

## Changes
- Added tests/unit/emq_selection_contract.test.cjs with eight cases against the exact source of getSelectedIds().
- Added the test to engineering acceptance workflow.
- Updated checkpoint documents.

## Test results
- New selection contract: pending CI.
- Existing unit suite: pending CI.
- Browser-native-origin acceptance: pending CI.
- Deterministic build/fingerprint: pending CI.

## Risks and limitations
These tests characterize selection logic; they do not replace real browser persistence checks in the existing browser suite. Do not mark accepted until GitHub Actions passes and the remote branch HEAD is verified.

## Rollback
Return to v82.85.12-emq-list-normalization-01 at 0d1ec323bb927c03538f20672b8f17cce8b2fa6c.
