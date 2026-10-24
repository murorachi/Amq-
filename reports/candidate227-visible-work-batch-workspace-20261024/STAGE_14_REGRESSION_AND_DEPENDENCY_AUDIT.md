# Candidate227 Stage 14: Regression and Dependency Audit
Date: 2026-10-24

## Baseline
Candidate227 local HTML: 9,360,586 bytes.
SHA-256: 2c0b8154b95fbe0685a19e50e185646eedb06f978be211e9eeb06eebb956529d.
No HTML was changed in this stage.

## Regression results
- PASS: page.set_content() initialization; title AMQ學習工具; 9,516 anime records; Candidate227 bridge exists.
- PASS: existing handlers set watch statuses completed/current/planning/paused/dropped/none correctly.
- PASS: empty selection did not mutate work 1's watch status.
- PASS: 301 selected works triggered one confirmation; cancel preserved the selection set.
- PASS: repeated batch-entry activation retained selected IDs [1,2] and did not leave a batch panel in the measured DOM.
- BLOCKED: this test run's storage shim did not override opaque-origin localStorage; storage errors invalidate persistence conclusions.
- NOT RUN: accepted >300 path, native file://, durable reload persistence, audio, live APIs, multiplayer and pixel comparison.

## Dependency audit
The following controls still have active references and must not be deleted yet:
- selectModeBtn (10 references), selectVisibleBtn (8), selectFilteredBtn (7), clearSelectionBtn (7)
- applyBulkWatchBtn (6), applyBulkSongBtn (4), bulkWatchStatus (3), bulkSongStatus (3)
- bulkPracticeAction (4), bulkCustomList (7), applyBulkPracticeAction (8), createListFromCatalog (4)
- batchScopeSummaryV844 (10), syncOpenBtn (5), selectionHint (3), practiceBulkRow (10)
Counts are literal source-string references, not a complete AST call graph. syncOpenBtn is required for AniList/MAL import. Other old controls are still used by handlers, refresh hooks or wrappers.

## Decision
- KEEP: AniList/MAL import, custom-list persistence, work watch status, song familiarity, weak-set, blacklist and SRS business behavior.
- INTEGRATE: extract explicit APIs taking IDs/action/status/list ID; new workspace should call APIs directly, not click hidden DOM controls.
- DELETE: no legacy markup, listeners, observers or CSS deleted this stage because references remain.
- DEFER: batchScopeSummaryV844 sync ownership and old selection listeners until caller/runtime ownership is traced.

## Next stage
1. Extract applyWatchStatus(ids,status), applySongFamiliarity(ids,status), applyPracticeAction(ids,action,listId) with explicit success/cancel/invalid-input/storage-failure results.
2. Test every action and failure path using a valid storage test context.
3. Move Candidate227 bridge to direct API calls.
4. Remove old controls/listeners/CSS only after reference audit and regression pass.
5. Retry native URL and persistence tests last; managed Chromium URLBlocklist remains an environment blocker.

## GitHub / rollback
This branch contains documentation only. Candidate227 HTML has NOT been uploaded; remote HTML SHA is NOT verified.
No rollback needed because no HTML changed. Candidate226 rollback SHA-256: d3940fb1a6edaf67454621023c704783fc9fd8ab1b598238bdbe5735305c4c9c.
