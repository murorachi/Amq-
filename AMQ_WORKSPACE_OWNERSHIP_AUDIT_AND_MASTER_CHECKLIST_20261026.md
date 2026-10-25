# AMQ Workspace Ownership Audit and Master Checklist — 2026-10-26

## Baseline and scope
- Audit target: Candidate334 `amq_learning_tool_v82_86_45_candidate334_candidate15_observer_scope_20261026.html`
- SHA-256: `e19b8b6ee79cf988b89f84c4e33a1bbcf83fcc90e9a85d60828db76c01e62eeb`
- Formal baseline: Candidate302 `f718a744057be0a33d371306f1742aaeede90e84f33d9e62ab45f5e6db488abd`
- Immutable rollback: Candidate320 `134020658ac272916bdd503c0ebdbe8cdbafcf0c15cff96cc0d45ddf63c8a66c`
- No HTML modification in this audit; Candidate334 remains experimental.

## Candidate15 workspaceViews audit
| Key | Evidence | Verdict |
|---|---|---|
| catalog | showView('catalog'), .view-catalog/#grid | KEEP |
| vnCatalog | VN open/toggle flow; #vnCatalogView visibility under catalog | KEEP, dynamic subview |
| watchlist | showView('watchlist'), #watchlistView/renderWatchlist | KEEP |
| vnList | VN open/toggle flow; #vnListView visibility under watchlist | KEEP, dynamic subview |
| customLists | #customListsWork visibility inside #watchlistView; Candidate16 data owner | KEEP, subview |
| explore | showView allowlist, .view-home and ui-explore-open | KEEP; workspace-active visual behavior needs browser regression |
| practice | showView('practice'), #learningPlanPanel, practice hub renderer | KEEP |
| learningPlan | showView('learningPlan'), shared #learningPlanPanel | KEEP |
| dashboard | showView('dashboard'), #dashboardPanel and insights renderer | KEEP |

All nine keys have a live route or visibility-derived subview. No entry is proven dead. VN/custom entries must not be removed merely because they are not in showView()'s primary-route allowlist.

## Candidate15 dead-path candidate
Candidate15's current defs generate ten action values. The explicit unique branches for list-import-anime, list-import-vndb, list-custom-manager, open-quiz, and open-multiplayer remain required. Candidate82's document capture handler maps dashboard and practiceExplore/practiceWeak/practice-self/practice-srs and invokes preventDefault/stopImmediatePropagation before Candidate15's bubble listener. Therefore Candidate15's clickHome() helper and terminal fallback appear unreachable for the current generated action set. Classification: DELETE CANDIDATE, strong static evidence; not yet modified. Next code batch should remove only that helper/fallback and assert that all unique actions remain.

## Candidate76/77/82 ownership matrix
- Candidate15: generates workspace action buttons, filters actions, stores selected panel key in sessionStorage, owns body.amq-workspace-active calculation.
- Candidate76: Song Select sidebar geometry based on #amqSongSelectRankingPlaceholder/catalog; reflects route/expanded state into sidebar aria-hidden, close tabindex and aria-expanded; observes body class/data-amq-workspace-mode, resize, navigation.
- Candidate77: dock parent/layout and click capture; owns expanded/collapsed and data-amq-workspace-mode state, and writes sidebar display/visibility/position/aria-hidden.
- Candidate82: separate content panel, park/restore of existing views, Escape capture, action map and content open/close lifecycle.
- Candidate76 and Candidate77 both write #amqWorkspaceSidebar[aria-hidden]. This is an overlapping-property ownership issue, not proof either whole module is obsolete. Need state matrix and real browser validation for non-Song Select route, dock collapsed/expanded, content panel open, Home navigation, and resize. Candidate82's content panel is a separate element and must not be conflated with the sidebar.
- Candidate16 custom-list storage/membership and both card sources remain protected. Candidate185 stale-overlay cleanup remains a dependency.

## Single master checklist
Status meanings: DONE-STATIC does not mean browser PASS. NOT RUN means no actual test was executed for this audit.

| ID | Scope | Status | Exit criteria |
|---|---|---|---|
| BASE-01 | Candidate302/Candidate320 hashes and immutable rollback | DONE-STATIC (prior records) | Recheck parent/output hashes each code batch |
| WS-01 | Candidate15 workspaceViews, all nine keys | DONE-STATIC | Browser subview/visual behavior still required |
| WS-02 | Candidate15 clickHome/runAction fallback | IN PROGRESS | Remove in isolated batch; syntax and action assertions |
| WS-03 | Candidate76/77 sidebar ARIA/display/geometry writes | IN PROGRESS | State matrix and route/resize browser transitions |
| WS-04 | Candidate82/185 content park/restore, Escape, stale/nested overlays | IN PROGRESS | Close/reopen/Escape/Home route E2E |
| WS-05 | Candidate16 catalog .card and Song Select .songrow paths | IN PROGRESS | CRUD, refresh and persistence on both sources |
| CORE-01 | Main DB/data bundle loading and error handling | NOT RUN this audit | Cold start, key counts/fields, failure recovery |
| CORE-02 | AMQ/EMQ/MIX modes, question sources and settings | NOT RUN this audit | Positive/negative cases and switching |
| CORE-03 | Quiz start/stop/next, timers, audio/player sync | NOT RUN | Real playback and route leave/re-enter |
| CORE-04 | Song Select search/filter/sort/select/pagination/workspace | NOT RUN | Browser E2E; no lost state or duplicate events |
| DATA-01 | Custom-list create/rename/delete/membership/reload | NOT RUN | Both card paths and persistence |
| DATA-02 | Backup/restore, migration and storage key read/write/delete inventory | IN PROGRESS (inventory only) | Data-flow map and recovery test |
| DATA-03 | AniList/MAL/VNDB import success/cancel/error | NOT RUN | Explicit user confirmation; failures do not corrupt data |
| CORE-05 | Multiplayer server/connect/create/join/leave/recovery | NOT RUN | Local playable flow and error handling |
| CORE-06 | VN catalog/list dynamic views, search/import/isolation | NOT RUN | Repeated route switching and independent data |
| CORE-07 | Learning hub/SRS/dashboard/progress consistency | NOT RUN | Mutation, grading and reload consistency |
| UI-01 | Duplicate CSS selectors/cascade/media specificity | IN PROGRESS | Prove superseded declarations and visual regression |
| JS-01 | Duplicate function names and unreachable code | IN PROGRESS | Scope-aware references and syntax checks |
| LIFE-01 | Observer targets, effects, disconnect and route ownership | IN PROGRESS | Owner and stop-condition map |
| LIFE-02 | Timer/RAF retries, cancellation and route exit | IN PROGRESS | No orphan polling or duplicate schedules |
| LIFE-03 | Event listener lifecycle / repeated initialization | IN PROGRESS | No accumulated handlers after repeated navigation |
| API-01 | window.__* global definitions/readers/writers/callers | IN PROGRESS | Complete API reference map before deletion |
| SS-01 | Song Select layout/player/list/filter runtime owners | IN PROGRESS, HIGH RISK | DOM/CSS/event/observer/timer owner map and E2E |
| MODAL-01 | Candidate185 and feature-specific modal lifecycle | IN PROGRESS, HIGH RISK | Exclusions, nested modal, Escape and route exit |
| BUILD-01 | Single-file HTML source/asset consistency | NOT RUN for Candidate334 | Standalone open and source/output consistency |
| GH-01 | Candidate334 HTML upload and remote SHA verification | NOT RUN | Read remote file and verify version/hash |
| DOC-01 | Status/baseline/next-task/changelog/report updates | IN PROGRESS | Append-only docs updated and read back |
| USER-01 | Local browser/native storage/media acceptance | NOT RUN | Record user's actual test results; do not infer |

## Prior global scan candidate counts
Candidate320 scan recorded 65 executable inline scripts, 109 style blocks, 2,648 CSS qualified rules, 9,693 declarations, 0 CSS parser errors, 269 IDs, 342 duplicate-selector candidates, 11 cross-script repeated function names, 54 Observer constructor occurrences, 474 addEventListener / 4 removeEventListener call sites, 176 timer/RAF calls, and about 605 window.__* references. These are candidate counts, not deletable-item counts. Latest Candidate334 must be rescanned before final acceptance.

## Next work order
1. Isolated Candidate15 clickHome fallback removal with static assertions and new unique candidate.
2. Candidate76/77 sidebar property-owner state matrix, then focused browser tests if available; do not delete whole modules.
3. Candidate16 dual-source custom-list CRUD/persistence.
4. Continue owner-grouped Song Select Observer/timer/listener cleanup.
5. Complete data/storage, core-mode and import/multiplayer regression.
6. CSS cascade and scope-aware JS dead-code batches.
7. Single-file build, HTML GitHub upload, remote SHA readback and final docs.

## Test status
- PASS: static route mapping for all nine workspaceViews entries.
- PASS: Candidate82 capture ownership covers Candidate15 dashboard/practice fallback actions.
- PASS: Candidate76/77 distinct geometry/state responsibilities identified; shared sidebar aria-hidden writes recorded.
- PASS: Node `--check` executed against 65 executable inline scripts; 0 syntax errors. One application/json data script was excluded from JS syntax checks. Static ID scan: 729 id attributes, 708 unique values, 16 duplicate-ID value kinds (pre-existing in candidate; not changed).\n- NOT RUN: browser E2E, Candidate76/77 state-order transitions, persistence, real media, multiplayer E2E, Candidate334 HTML upload/hash.
- Unresolved: explore visual workspace state; sidebar aria-hidden timing; persistence/media behavior.

## Rollback
No source was changed in this audit. For future changes, create a unique candidate derived from the confirmed parent; never overwrite Candidate302, Candidate320 or Candidate334. Candidate320 rollback SHA is `134020658ac272916bdd503c0ebdbe8cdbafcf0c15cff96cc0d45ddf63c8a66c`.
