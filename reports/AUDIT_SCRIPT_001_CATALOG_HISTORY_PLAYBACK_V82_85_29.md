# First-pass audit: script_001 catalogue, history and playback

Baseline: V82.85.28. File: src/scripts/script_001.htmlpart. Source blob: efd57dfe1bead7178726d6a879035687aaa9b990.

Disposition: first-pass file review complete; no production source change. This is a high-risk integration fragment, and the storage/history portions should not be merged into a generic repository during a cleanup pass.

## Static profile

- 98,154 characters; 486 lines; 97 named function declarations detected by a conservative pattern.
- 34 addEventListener calls; no general removeEventListener call; 10 timeouts; 2 IndexedDB references; 40 localStorage references.
- Main persisted keys include familiarity status, favorites, blacklist, quiz history, settings, cover cache, catalog mode, play history, backup settings and song tags.

## Responsibilities found

1. Build and query the AMQ anime/song catalog indexes.
2. Read/write familiarity status, favorites and blacklist.
3. Maintain detailed quiz history plus compact summary and target-summary records, including migration, processed-ID deduplication and recovery copies.
4. Load/save IndexedDB catalog snapshots and validate IDs before replacing in-memory catalog data.
5. Render catalog, artist/anime detail, random discovery and cover queue.
6. Manage audio source candidates, fallback, playback-success recording and quiz/manual playback handoff.
7. Watch status, favorites, song tags, play history and import/export integration.
8. Coordinate events across quiz, EMQ, SRS, backup/restore and navigation modules.

## Boundaries and risks

- History details, history summary and target summary are separate persistence layers with different deduplication and recovery rules. Preserve source/song IDs, target semantics, processed IDs and restore-suppression guards.
- localStorage and IndexedDB have distinct roles. IndexedDB catalog snapshot replacement validates incoming structure and protects existing song rows; do not change its schema or transaction behavior as a refactor.
- Media fallback and successful-playback recording use selection serials/tokens to avoid stale callbacks and duplicate history. Keep token invalidation and current-element checks together.
- Many listeners are registered during singleton startup. No general removeEventListener calls were found, but that alone does not prove a leak; repeated script initialization is the condition that would need reproduction.
- This fragment shares cross-cutting responsibilities with script_004, script_023, script_025 and script_038. Changes must preserve their existing event/API contracts.

## Existing evidence reviewed

- tests/unit/history_status_isolation.test.cjs: exact-source history bridge and EMQ status/tag isolation.
- tests/unit/storage_repository_contract.test.cjs: storage repository contract with synthetic in-memory storage.
- tests/unit/native_storage_reload_snapshot_contract.test.cjs: existing keys survive reload byte-for-byte except the documented default-empty SRS initialization key.
- tests/unit/backup_restore_contract.test.cjs: full-backup allowlist/manifest and restore boundaries in script_023.
- reports/LIFECYCLE_STORAGE_INVENTORY.csv: historical static inventory of listeners, timers, storage keys and IndexedDB calls. Its own notes warn that dynamic calls can be missed.
- Latest completed source/unit evidence before this audit: run 39232121712 passed verifier 132/132; the actual EMQ payload test also passed. This report does not claim a new standalone manual storage or browser-profile test.

## Findings

| ID | Finding | Risk | Disposition |
|---|---|---|---|
| CAT-01 | History details and two summary stores have migration, deduplication and recovery paths. | Critical | Keep exact-source history contracts and storage reload checks; no schema cleanup. |
| CAT-02 | Catalog snapshot validation and IndexedDB replacement protect user-owned data. | Critical | Preserve transaction/rollback behavior; only change with restore/reload regression tests. |
| CAT-03 | Audio fallback and playback-success recording coordinate asynchronous events. | High | Keep serial/token checks and current-element guard; test stale callbacks before extraction. |
| CAT-04 | Catalog UI, random discovery, cover queue and persistence coexist in one fragment. | Medium/high | Defer broad decomposition; choose a pure boundary only when a concrete change needs it. |
| CAT-05 | Event listeners have startup lifetime and no general teardown function. | Medium | Track as an initialization ownership question, not a proven leak. |

## Coverage gaps

Partially covered: real profile behavior across every legacy migration combination, storage quota failures, repeated app initialization, all media-fallback race orderings and very large history datasets. Synthetic contracts do not replace a full real-profile backup/restore acceptance.

## Recommendation and rollback

No production source change. Continue with the next large logic fragment, script_030, then script_025/script_023 persistence boundaries. Roll back by reverting this report and matrix/status references; source and V82.82 baseline remain unchanged.
