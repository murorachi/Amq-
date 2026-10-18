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
- GitHub Actions run [39133558958](https://github.com/murorachi/Amq-/actions/runs/39133558958): both jobs passed.
- New selection contract: 8/8 passed.
- Existing unit contracts passed; source/build verifier 124/124 passed.
- Browser-native-origin acceptance passed, including custom-list UI, IndexedDB/quiz input, quiz suggestion, quiz answer/playback lifecycle, and multiplayer lifecycle/reconnect.
- Deterministic V82.82 reconstruction matched exactly: 8,787,490 bytes / SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`.

## Risks and limitations
These tests characterize selection logic; they do not replace real browser persistence checks in the existing browser suite. The acceptance workflow passed; the branch head is being verified after the checkpoint-document update.

## Rollback
Return to v82.85.12-emq-list-normalization-01 at 0d1ec323bb927c03538f20672b8f17cce8b2fa6c.
