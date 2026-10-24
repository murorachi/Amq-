# NEXT_TASK — AMQ 100-item engineering continuation

Working baseline: Candidate212 (unchanged). Candidate207 is the recorded recovery source. Candidate216 and Candidate218 remain separate experimental artifacts. Their prior recorded sizes/hashes are in `BASELINE.md`; current runtime could not export their original bytes, so no fresh original-byte hash verification is claimed.

- FAIL (reproduced): after batch familiarity changes, the selection Set and counter retain 180 selected songs but row rerender recreates unchecked checkboxes. A disposable single-owner selection Set prototype restores checkbox/counter consistency across both `聽過` and `有印象` actions; report: `BATCH_SELECTION_ACCEPTANCE.md`.
- PASS: controlled in-memory removal tests verify AniList and MAL each remove only their own imported watch-status records, while preserving manual/other-source records; VNDB removal clears only its own local list key. See `IMPORT_REMOVAL_ACCEPTANCE.md`. Live API import and persistent reload remain NOT RUN/BLOCKED.
- PASS: custom-list isolation test verifies unique list IDs, deduplicated membership, per-list removal isolation, rename preserving IDs, and deleting one list without damaging another. Native reload persistence remains blocked; see `CUSTOM_LIST_ISOLATION_ACCEPTANCE.md`.
- PASS (adapter-level only): custom-list, learning-center, quiz and multiplayer panels mount and restore through one shared panel without leaving Song Select. FAIL / incomplete user flow: the visible dock has no multiplayer entry. See `FOUR_WORKSPACE_PANEL_ACCEPTANCE.md`.
- PASS (after warm-up): observer instance/active counts stayed stable across the remaining 11 of 12 workspace transitions. First lazy mount adds two MutationObservers and one IntersectionObserver observing 180 targets; exact owner and teardown are still unverified. See `OBSERVER_MOUNT_CYCLE_ACCEPTANCE.md`.
- PASS: mocked AniList/MAL/VNDB 429, malformed response, offline and VNDB 401 errors produce recoverable status. GAP: baseline import paths lack explicit timeout handling. Disposable shared timeout helper passes delayed-request abort/UI restoration tests; port only after byte-preserving source access is restored. See `IMPORT_API_ERROR_ACCEPTANCE.md`.
- PASS (prototype only): final Song Select row-size clamp at 110.156 px yields about 7.55 visible cards with a 54.6%-visible bottom card; hover shift 3 px, selected shift 7 px and selected-song update remain correct. Pixel comparison is NOT RUN because no usable full Song Select reference image is currently available. See `SONGSELECT_GEOMETRY_ACCEPTANCE.md`.
- PASS: responsive Song Select list remains scrollable without horizontal document overflow at five tested viewports. P1 issue: at 390×844, list width is only 145 px; treat mobile layout as a separate follow-up from fixed 1920×1080 geometry. See `SONGSELECT_GEOMETRY_ACCEPTANCE.md`.
- FAIL (reproduced): Song Select keyboard handling has overlapping direct-list/document handlers and a dynamic-DOM binding gap; ArrowDown can double-step and Enter can duplicate or fail playback depending on listener timing. A stable-stage single-owner prototype passes one-step ArrowDown and exactly-one Enter playback invocation. Port only after baseline byte integrity is restored; see `SONGSELECT_KEYBOARD_ACCEPTANCE.md`.
- FAIL (reproduced): scene-background backup preflight accepts invalid PNG bytes and an image wider than 8192 px. A disposable `createImageBitmap` + dimension/pixel-limit validation prototype passes valid/invalid image assertions. Actual IndexedDB save/restore remains blocked; see `SCENE_BACKUP_VALIDATION_ACCEPTANCE.md`.
- FAIL (reproduced): MAL importer maps ambiguous top-level `entry.status` to a user watch status and can overwrite manual data. A disposable prototype removes that fallback and passes explicit-listStatus/manual-preservation assertions. Apply only after source integrity is restored; see `MAL_IMPORT_STATUS_ACCEPTANCE.md`.
- PASS: Candidate212 watch/custom-mode tabs register one direct listener each and survive 10 repeated switches without binding growth. Candidate218 artifact itself remains unavailable for exact runtime comparison; see `WATCH_MODE_TAB_ACCEPTANCE.md`.
- PASS (mocked routes): cover fallback loads after primary-source failure; a Jikan 429 leaves the cover hidden and does not crash the page. Live API/CDN behavior remains NOT RUN; see `COVER_FALLBACK_ACCEPTANCE.md`.
- PASS: mocked MAL pagination/dedup across two pages writes each matched anime once and skips duplicate IDs; first explicit user-list status wins. Separate ambiguous top-level `status` fallback still risks overwriting manual state. See `MAL_IMPORT_STATUS_ACCEPTANCE.md`.
## Latest confirmed results
- PASS: 68 executable inline JavaScript blocks from the readable Candidate212 export passed Node syntax checking; 2 embedded payload blocks excluded.
- PASS: 108 CSS style blocks parsed with zero stylesheet/declaration errors in the current scan.
- PASS: initial markup has 296 unique IDs; measured dynamic startup DOM has 631 IDs and no duplicate live IDs.
- PASS: Chromium `page.set_content()` startup, watch/custom tab click counts, 10 workspace panel open/close transitions, custom-list create/add/remove/delete, batch selection/status update, AMQ/EMQ/MIX switches, search, decade/type filters and name sort.
- PASS: primary V44 volume slider storage/property sync, zero-volume mute and audio-node replacement behavior in isolated fixture.
- FAIL: forced V82.35 volume fallback changes audio but not video and fails mute-at-zero parity.
- PASS (prototype only): a disposable fixture routes both V44 and forced V82.35 fallback through one shared volume controller; both paths pass single-control, 35% audio/video sync, audio replacement reapplication, zero-volume mute, and no-page-error assertions. Updating output text only when it differs is required to prevent a MutationObserver self-loop. This is not a source edit and not release acceptance.
- FAIL: Song Select geometry shows about 7 rows and a 33%-visible bottom card, not the target of about 7.5 cards / half-visible bottom card.
- PASS: hover shift 3 px is smaller than selected shift 7 px; selected row and right-side title update together.
- BLOCKED: original Candidate212 raw-byte materialization and native `file://`/localhost browser navigation.
- NOT RUN: persistent-origin reload, IndexedDB Blob backup/restore, real sound output, live API recovery, full answer/score/history checks, owner-instrumented observer teardown and masked pixel comparison.

- Added `reports/candidate212-100-item-continuation-20261024/DEPENDENCY_EDGE_INVENTORY.md`: 70 script blocks and 268 heuristic window-API dependency edges. It is a text-scan inventory, not AST-complete; use it to guide owner tracing, not to authorize deletions.

- Current per-item acceptance ledger: `reports/candidate212-100-item-continuation-20261024/100_ITEM_PROGRESS.md`. Use it as the source of truth for remaining work and preserve the four required test states.
## Next work, in order
1. **Source integrity:** obtain a byte-preserving Candidate212 copy. The current readable reconstruction is 26 bytes shorter and must not be used for release output.
2. **Volume root fix:** port the shared-controller prototype into the verified source when byte-preserving Candidate212 access is restored. Preserve the fallback until route absence, replacement nodes, audio/video sync, mute-at-zero and retry behavior all pass; retain the output-text change guard to prevent observer feedback loops.
3. **Song Select geometry:** identify the canonical geometry owner and quantify the row pitch/offset curve. Target about 7.5 visible cards and a half-visible bottom card at the fixed 1920×1080 reference viewport; preserve hover shift < selected shift and selected-song details synchronization.
4. **Workspace navigation gap:** the static dock has lists/learning buttons and a quiz action but no multiplayer entry despite a `multiplayer` workspace definition. Resolve the intended official entry and route contract, then test the four workspace transitions and teardown. Do not create a new button until the correct existing multiplayer entry point is identified.
5. **Initialization and dynamic ownership:** instrument actual watch/custom tab creation, binding counts and repeated mounts. Candidate218's idempotent assignment is defensive; do not call it a proven root-cause fix until the duplicate behavior is reproduced or its prevention is validated.
6. **Observer/timer lifecycle:** map owner, observed target, callbacks, activation, cleanup and route teardown. Measure counts before/after repeated workspace transitions; do not delete based on counts alone.
7. **P0 data/workspace acceptance:** test custom-list create/edit/delete, add/remove membership, search/filter and persistence after real reload; test four official workspaces and back navigation without leftover panels, listeners, timers or observers.
8. **Persistence/game acceptance:** verify local/session storage, IndexedDB stores/versioning/Blob backup/restore, AMQ/EMQ/MIX real audio and consistent answer/score/history behavior. Clearly label blocked external APIs and multiplayer cases.
9. **Dependency-led cleanup:** classify each candidate Keep / Integrate then delete / Delete / Needs confirmation with call-chain and runtime evidence. Batch organizer is live and must be integrated before its entry/runtime can be removed.
10. **Reference comparison:** register the fixed osu!stable reference, normalize viewport/scaling, compare aligned masked regions and report measured errors. Do not claim a pixel-similarity percentage without a real comparison.
11. **Release and GitHub:** after source integrity is restored, produce a uniquely named candidate, run the affected regression suite, update status/baseline/next-task and test reports, then upload and read back the exact HTML and verify version, byte size and SHA-256.

## Safety gate
No executable source has been changed in this continuation. Do not promote a candidate built from the reconstructed export. Preserve Candidate212/207/216/218 originals and all existing user data.


## 2026-10-24 Candidate213 cleanup checkpoint
- User re-uploaded Candidate212 as a complete local file. Fresh SHA-256 is `52376c693c5c0701d77e80a6076620623ef9ef5decadd11265d6b57bcf6c6952`, size 9,352,632 bytes; it matches the recorded baseline exactly. The original is unchanged.
- Created a byte-identical rollback HTML locally: `amq_learning_tool_v82_85_46_candidate212_checkpoint_20261024.html`.
- Candidate213 local deliverable: `amq_learning_tool_v82_85_46_candidate213_safe_dead_code_cleanup_20261024.html`, size 9,352,274 bytes, SHA-256 `e409fcef642224e27d53baf0bc830e2ca34d32a4f38e6394891fb6ff4d2d9375`.
- Removed only two tightly scoped script elements: `candidate84-workspace-merge-dashboard` (a relabel-only script that renamed Learning Analysis to the misleading “資料品質”) and `candidate105-marker` (an unreferenced document dataset marker). No data keys, schemas, song logic, visual layout, audio, or importer code was intentionally changed.
- Static checks: parent JavaScript syntax 68/68 PASS; parent CSS blocks 108 with zero parse errors. Candidate213 JavaScript syntax 66/66 PASS (two payload blocks excluded), CSS 108 blocks with zero parse errors. The two removed script IDs are absent from Candidate213.
- Browser runtime: BLOCKED in this sandbox. Chromium denied `file://` with `ERR_BLOCKED_BY_ADMINISTRATOR`; localhost server access was refused. Native persistence, real audio, background Blob save/restore, live APIs and pixel comparison remain NOT RUN.
- GitHub branch for this checkpoint: `amq-candidate213-safe-cleanup-20261024`. This branch currently carries the audit/documentation checkpoint. The GitHub connector exposed text file operations but no action that can upload a local 9.35 MB HTML file by path; remote HTML upload and SHA verification remain BLOCKED, not claimed complete.


## Candidate219 cleanup + Song Select ownership checkpoint (2026-10-24)
- Verified original Candidate212 bytes: 9,352,632 bytes; SHA-256 52376c693c5c0701d77e80a6076620623ef9ef5decadd11265d6b57bcf6c6952. Original remains unchanged and a byte-identical local rollback exists.
- Candidate213 safe cleanup: 9,352,274 bytes; SHA-256 e409fcef642224e27d53baf0bc830e2ca34d32a4f38e6394891fb6ff4d2d9375. Removed only Candidate84 relabel-only “資料品質” script and Candidate105 no-reader marker.
- Candidate215: 9,352,402 bytes; SHA-256 4d57290bf3026d011ec0e29f2d0067a4b43756f85b00be8895a3f85b0e7ed4f0. Candidate214 was an intermediate FAIL because a Set remained in inner scope; Candidate215 moved it to the shared IIFE scope and passed runtime checks.
- Candidate219 local artifact: amq_learning_tool_v82_85_46_candidate219_songselect_keyboard_completion_20261024.html, 9,352,752 bytes; SHA-256 4a20b0eee8ecaa4b8d7ac5b55e1fc602c4335c9ad892ef901dc672ac719b40ea.
- Changes: remove duplicate Song Select list-level key handler; retain delegated owner; use the single batch-selection Set to render checked state; Enter calls the canonical row selection/playback function once.
- PASS: 66/66 executable JS blocks parse; 108 CSS blocks have zero parse errors; Chromium page.set_content() with in-memory storage shim loads without page/console errors; Song Select route creates 180 rows; ArrowDown moves index 0→1; isolated Enter test invokes listenSong exactly once; batch checkbox remains checked after search rerender and counter remains 1.
- BLOCKED/NOT RUN: native file launch and durable storage reload, real audio output, IndexedDB Blob backup/restore, live imports, multiplayer lifecycle, osu!stable pixel comparison.
- GitHub branch: amq-candidate219-songselect-ownership-20261024. Documentation is being checkpointed; the HTML upload action is not exposed by the available GitHub connector. Remote HTML path returned 404, so no remote HTML existence or hash verification is claimed.
