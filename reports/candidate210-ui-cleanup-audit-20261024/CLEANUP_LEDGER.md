# Candidate 210 — Old Feature Cleanup Ledger

Status: initial evidence ledger; no production code deleted.

Classification:
- **KEEP**: confirmed product requirement or necessary data/service.
- **INTEGRATE**: capability remains, but duplicated implementations should converge to one owner after dependency proof.
- **DELETE**: obsolete and proven to have no callers, dynamic references, persisted-data responsibility, or runtime role.
- **NEEDS CONFIRMATION**: evidence insufficient; state the proof required and keep unchanged until it exists.

## A. Product-level decisions

| Area | Initial disposition | Required treatment |
|---|---|---|
| Candidate210 Song Select visual structure | KEEP | Preserve layout and visual behavior as the comparison reference; UI changes require before/after evidence. |
| Song rows, selection, search, sort, filter | KEEP | One canonical data/query path; preserve keyboard and mouse behavior. |
| AMQ / EMQ / MIX modes and audio/player dock | KEEP | Preserve shared candidate-pool semantics; validate actual media separately from button clickability. |
| Custom lists | KEEP | Preserve create/add/remove/rename/delete, per-list isolation, filtering and stored data. |
| Learning records, history, blacklist and learning state | KEEP | Treat as user data; do not rename/delete keys or schema without migration and backup proof. |
| Scene backgrounds and IndexedDB Blob data | KEEP | Validate save/restore/export before any storage cleanup. |
| Importers (AniList, MAL, VNDB) | KEEP, then INTEGRATE | Keep source-specific parsing/removal, unify validation, timeout, deduplication and write boundaries only after schema checks. |
| Learning center and learning analysis | KEEP/INTEGRATE | Preserve useful study flow and existing records; remove duplicate presentation/logic only after mapping callers. |
| Homepage legacy cards/old workspace entry points | CANDIDATE FOR DELETE | Confirm they are not part of Candidate210's intended UI and that no required route or data operation depends on their scripts. |
| Batch organization | INTEGRATE or DELETE | User previously identified it as redundant after merging into list management. Retain only unique required actions; otherwise remove its UI, handlers and initialization together. |
| “圖鑑” and “資料品質” navigation | NEEDS CONFIRMATION / likely remove or merge | Do not preserve empty or misleading entry points. First trace whether they own essential catalogue or import validation behavior; move necessary behavior into Song Select/import flow, then remove redundant navigation. |

## B. Implementation groups to inspect in Candidate210

These are audit targets, not claims that Candidate210 contains the same code as later candidates.

| Candidate group | Initial disposition | Proof required before change |
|---|---|---|
| Repeated app/workspace initialization | INTEGRATE | Establish canonical entry point, execution order, route re-entry behavior and all side effects. |
| Repeated route/panel DOM builders | INTEGRATE | Trace every creator/consumer, dynamic template and removal path; verify exactly one active panel. |
| Repeated click/keydown handlers | INTEGRATE | Count effective handlers through mount/unmount/re-entry; prove keyboard input moves/activates exactly once. |
| Repeated volume-control construction | INTEGRATE | Test quiz view present/absent, fallback mount, navigation, single DOM ID, persisted value and actual audio sync. |
| Mutation/Resize/IntersectionObserver instances | NEEDS CONFIRMATION | Record owner, target, disconnect path and counts across repeated workspace cycles. |
| Timers and animation frames | NEEDS CONFIRMATION | Map each handle to owner and teardown. Do not delete multiplayer heartbeat without session-lifecycle policy. |
| Storage wrappers and duplicated settings access | INTEGRATE | Build key/schema owner map; preserve existing keys and migration compatibility. |
| Duplicate CSS selectors and hidden legacy rules | NEEDS CONFIRMATION | Resolve static and runtime class usage, pseudo-elements and dynamic DOM before deleting rules. |
| TODO/FIXME/XXX markers and apparently unreferenced functions | NEEDS CONFIRMATION | Search direct, indirect, string-based, event, template and global references; verify runtime coverage. |

## C. Direct deletion policy
No Candidate210 source element is currently approved for direct deletion. A delete candidate must include:
1. Exact source location and owning module.
2. Direct and indirect caller/reference search.
3. Dynamic template, event, route and initialization checks.
4. Data/schema impact review.
5. Focused regression test and rollback checkpoint.

## D. Known Candidate210 test evidence (from existing report)
PASS: page reaches readyState complete with no captured startup page errors; Song Select creates a stage/tracklist and 180 rows; search and clear behavior; repeated AMQ/EMQ/MIX switches; import, batch organizer, custom lists and learning plan open/close cycles; selected-row and autoplay path invocation; mouse-wheel scrolling; player controls accept clicks; synthetic loadedmetadata random-seek hook; geometry at 2555×1438 and 1920×1080; visible cover fallback marker.

NOT RUN/BLOCKED: native file launch and durable persistence; full custom-list CRUD/reload; real media playback/seek; live cover/API success and recovery; exhaustive back navigation/no-stale-component checks; pixel comparison against osu!stable.

The full source report is the authority for these limits: `reports/candidate210-songselect-rebuild-from-207-20261024/VALIDATION.md`. A passing synthetic hook is not proof of real audio.

## E. Next evidence gate
Restore byte-identical Candidate210 source access, freshly compute SHA-256 and compare with the recorded value. Then produce source-level HTML/CSS/JS/DOM/event/storage/route/observer/timer inventories from that exact file. Do not apply Candidate212 findings to Candidate210 without a source diff.
