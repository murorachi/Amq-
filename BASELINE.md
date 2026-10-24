# BASELINE — AMQ Song Select cleanup (2026-10-24)

- Current 100-item checklist status: `reports/candidate212-100-item-continuation-20261024/100_ITEM_PROGRESS.md`. This matrix does not imply completion; source integrity and native-browser constraints remain blockers.
## User-authorized working baseline
- Candidate212: `amq_learning_tool_v82_85_46_workspace_proto44-osu-songselect-ui_212_mutation_loop_fix.html`; recorded size 9,352,632 bytes; recorded SHA-256 `52376c693c5c0701d77e80a6076620623ef9ef5decadd11265d6b57bcf6c6952`.
- Candidate207 recovery source: `amq_learning_tool_v82_85_46_workspace_proto44-osu-songselect-ui_207_home_menu_initial_state_fix.html`; recorded size 9,310,496 bytes; recorded SHA-256 `2f3a092a139628daa48bc113d2a192f41e2d7474182471ed926de3de49fd6100`.
- Candidate216 experimental artifact: `amq_learning_tool_v82_85_46_workspace_proto44-osu-songselect-ui_216_remove_unreferenced_candidate_marker.html`; recorded size 9,352,541 bytes; recorded SHA-256 `70d0b99e069d34bba174f278d8e09c6c3f508841aa3ec25d014f0970e30ad05f`.
- Candidate218 experimental artifact: `amq_learning_tool_v82_85_46_workspace_proto44-osu-songselect-ui_218_idempotent_watch_mode_binding.html`; recorded size 9,352,817 bytes; recorded SHA-256 `5e1bd34e1bc49fe606fc8b9989cfaab26d00f2eee5e12ca0541d16a5ae63099c`.
- These four artifact records exist in the user's AMQ學習工具 Library. Raw-byte materialization was denied in this runtime, so the recorded hashes/sizes are preserved as prior records, not freshly verified original-byte hashes.
- None of Candidate207/212/216/218 HTML exists in the target branch's current Git Tree. No remote HTML upload/hash validation has been performed.

## Analysis-only reconstructed source
- Local file: `/mnt/data/amq_work/candidate212_reconstructed.html`.
- Size: 9,352,606 bytes.
- SHA-256: `07f2d2428b308d6449e561b9d68cc890932d36089694cdecbff561d092b11636`.
- It differs from the recorded Candidate212 source by 26 bytes. Do not overwrite the Library artifact, create a release candidate from it, or claim source equivalence. It may be used for static inspection and explicitly labelled disposable browser prototypes only.

## Existing candidate dispositions
- Candidate212 remains the user-authorized baseline; unchanged.
- Candidate207 remains the recovery source; unchanged.
- Candidate216 remains experimental and unaccepted; unchanged.
- Candidate218 remains experimental and unaccepted; unchanged. The `onclick` assignment is idempotent, but normal-init call-graph inspection did not reproduce the claimed duplicate-listener root cause.
- No source cleanup or volume fix has been applied to any candidate HTML in this continuation.

- Batch selection state defect: the Candidate210 row factory always creates unchecked batch checkboxes while the batch controller's selection Set persists across search-triggered rerender. A disposable prototype with one outer-scope Set and checked-state rendering passes repeat-action assertions; see `BATCH_SELECTION_ACCEPTANCE.md`. Not applied to any candidate because the original source bytes remain unavailable.

- Imported-list removal: in-memory Chromium tests pass for AniList and MAL source-specific watch-status removal and VNDB local-list-key removal, including confirmation prompts and preservation of manual/unrelated data. This does not validate live imports or native persistence; see `IMPORT_REMOVAL_ACCEPTANCE.md`.
- Custom-list CRUD/isolation: in-memory Chromium tests pass for create two lists, unique IDs, duplicate-add deduplication, removing from one list without affecting another, rename preserving ID, and deletion preserving other-list membership. Native reload persistence is not verified; see `CUSTOM_LIST_ISOLATION_ACCEPTANCE.md`.
- Four-workspace lifecycle: direct adapter tests pass for mounting and restoring the existing custom-list, learning-center, quiz and multiplayer nodes inside one shared panel. This does not validate navigation reachability; the multiplayer entry is missing from the visible dock. See `FOUR_WORKSPACE_PANEL_ACCEPTANCE.md`.
- Observer lifecycle: after one-time lazy initialization, counts remain stable across 12 workspace open/close transitions. The first custom-list mount adds 2 MutationObservers and 1 IntersectionObserver observing 180 targets; ownership/lifetime remains unproven, and active observers remain. See `OBSERVER_MOUNT_CYCLE_ACCEPTANCE.md`.
- Import error handling: mocked rate-limit, malformed-response, offline and VNDB unauthorized paths pass. Existing source has no explicit timeout wrapper; a disposable shared `AbortController` timeout helper passes timeout tests for AniList, MAL and both VNDB request stages. See `IMPORT_API_ERROR_ACCEPTANCE.md`; no source change was applied.
- Song Select geometry: baseline has 7 intersecting rows with a 33%-visible bottom card. A disposable CSS-only fixture changes the final row size to 110.156 px at 1080p and reaches about 7.55 cards with a 54.6%-visible bottom card; hover/selected shift and click state remain correct. Full reference pixel comparison is NOT RUN. See `SONGSELECT_GEOMETRY_ACCEPTANCE.md`.
- Responsive Song Select smoke passes basic list/scroll/overflow assertions at five viewports, but the 390×844 tracklist is only 145 px wide. This is a separate mobile-layout issue and the desktop 7.5-card target should remain tied to the 1920×1080 reference. See `SONGSELECT_GEOMETRY_ACCEPTANCE.md`.
- Song Select keyboard: baseline has overlapping direct-list and document-level key handlers, with the document handler misclassifying the main tracklist as an inline list. Dynamic list replacement can remove the direct listener. A disposable stable-stage single-owner prototype passes ArrowDown and Enter exactly-once assertions; see `SONGSELECT_KEYBOARD_ACCEPTANCE.md`.
- Scene backup preflight defect: `prepareBackupRestore()` accepts arbitrary bytes labelled PNG and an 8193 px image, while file input applies decode/dimension limits. A disposable `createImageBitmap` + dimension-check prototype rejects both; native IndexedDB transactions remain blocked. See `SCENE_BACKUP_VALIDATION_ACCEPTANCE.md`.
- MAL import conflict: a mocked entry with only top-level `status: completed` overwrites an existing manual planning status, despite code comments warning that this field may represent airing status. A disposable narrow fallback removal passes while explicit `listStatus` remains correct; see `MAL_IMPORT_STATUS_ACCEPTANCE.md`.
- Current Candidate212 watch/custom-mode tab lifecycle passes 10 repeated switches with one direct listener per tab and no binding growth. Candidate218's separate artifact remains unverified; do not assume its change fixes a reproduced baseline defect. See `WATCH_MODE_TAB_ACCEPTANCE.md`.
- Cover fallback: mocked Chromium tests pass primary-source failure → Jikan fallback image success and Jikan 429 → hidden-cover/no-page-error behavior. Live network behavior remains untested; see `COVER_FALLBACK_ACCEPTANCE.md`.
- MAL pagination/dedup: mocked 301-entry, two-page import writes one local anime record and skips 300 duplicate IDs; first explicit list status wins. Ambiguous top-level status handling remains a separate defect. See `MAL_IMPORT_STATUS_ACCEPTANCE.md`.
## Verified analysis findings
- Static JS: 68 executable inline blocks pass `node --check`; two payload blocks are excluded.
- CSS: 108 style blocks parse without errors in the current tinycss2 scan.
- Initial DOM: 296 unique IDs; runtime-injected fixture: 631 live IDs with no duplicates at the measured startup point.
- Custom-list create/add/remove/delete and workspace panel open/close interactions pass in isolated in-memory storage; real reload persistence is still blocked.
- Primary V44 volume behavior passes the tested DOM/property assertions. Forced V82.35 fallback has a reproduced audio/video synchronization and mute-at-zero defect. A temporary fixture proves that applying volume and mute to all audio/video elements fixes those two assertions, but the source is unchanged.
- Song Select geometry still fails the 7.5-card / half-visible bottom-card target. Do not change source geometry until byte-preserving baseline access is restored.

- Workspace-entry static review found the catalog is a live dependency, the `資料品質` relabel script has no matching live dock entry, batch organization is live and must be integrated before removal, and the multiplayer workspace definition has no visible dock entry. Details are in `DEPENDENCY_EDGE_INVENTORY.md`.

## Dependency inventory checkpoint
- `reports/candidate212-100-item-continuation-20261024/DEPENDENCY_EDGE_INVENTORY.md` records 70 script blocks and heuristic cross-script window-API references. Treat it as a navigation aid only; it is not a complete AST call graph and must not be used alone to delete code.

## Rollback and data safety
- Discard any disposable prototype and continue from the unchanged Candidate212 artifact.
- Candidate207 is the earlier recovery source if the user-authorized rollback is required.
- Preserve all original Library artifacts, localStorage/sessionStorage keys, IndexedDB schemas/data, learning records, custom-list data and Blob backups. Do not promote Candidate216/218 without their own acceptance.


## 2026-10-24 Candidate213 cleanup checkpoint
- User re-uploaded Candidate212 as a complete local file. Fresh SHA-256 is `52376c693c5c0701d77e80a6076620623ef9ef5decadd11265d6b57bcf6c6952`, size 9,352,632 bytes; it matches the recorded baseline exactly. The original is unchanged.
- Created a byte-identical rollback HTML locally: `amq_learning_tool_v82_85_46_candidate212_checkpoint_20261024.html`.
- Candidate213 local deliverable: `amq_learning_tool_v82_85_46_candidate213_safe_dead_code_cleanup_20261024.html`, size 9,352,274 bytes, SHA-256 `e409fcef642224e27d53baf0bc830e2ca34d32a4f38e6394891fb6ff4d2d9375`.
- Removed only two tightly scoped script elements: `candidate84-workspace-merge-dashboard` (a relabel-only script that renamed Learning Analysis to the misleading “資料品質”) and `candidate105-marker` (an unreferenced document dataset marker). No data keys, schemas, song logic, visual layout, audio, or importer code was intentionally changed.
- Static checks: parent JavaScript syntax 68/68 PASS; parent CSS blocks 108 with zero parse errors. Candidate213 JavaScript syntax 66/66 PASS (two payload blocks excluded), CSS 108 blocks with zero parse errors. The two removed script IDs are absent from Candidate213.
- Browser runtime: BLOCKED in this sandbox. Chromium denied `file://` with `ERR_BLOCKED_BY_ADMINISTRATOR`; localhost server access was refused. Native persistence, real audio, background Blob save/restore, live APIs and pixel comparison remain NOT RUN.
- GitHub branch for this checkpoint: `amq-candidate213-safe-cleanup-20261024`. This branch currently carries the audit/documentation checkpoint. The GitHub connector exposed text file operations but no action that can upload a local 9.35 MB HTML file by path; remote HTML upload and SHA verification remain BLOCKED, not claimed complete.
