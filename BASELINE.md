# BASELINE — AMQ Song Select cleanup (updated 2026-10-24)

## Current candidate for Batch 3 continuation
- Candidate235 local artifact: amq_learning_tool_v82_85_49_candidate235_workspace_automation_migration_20261024.html
- Size: 9,369,076 bytes.
- SHA-256: d2cb92a244197b254ac49920bb9b18f2c0649d8eb4060691b189d53ee1e2aaa4.
- Candidate234 rollback: 9,368,097 bytes; SHA-256 16b387530b2dd9cd22d3e8aba5b23ef5fd276c1aecf87481c4c08d6b9d1d3641; byte-identical to Candidate234 source.
- Candidate235 is local-only. GitHub HTML upload and remote HTML SHA validation are NOT VERIFIED.
- Batch automation navigation now targets the official visible work-batch workspace; legacy catalog batch UI remains and Batch 3 is incomplete.
- Tests: JS syntax PASS (67 blocks); CSS parse PASS (109 blocks); DOM IDs PASS (292 unique); static selector assertions PASS; full-page Playwright NOT RUN; native browser navigation/reload BLOCKED.

---

## Current candidate for Batch 3 continuation
- Candidate234 local artifact: amq_learning_tool_v82_85_48_candidate234_queue_api_integration_20261024.html
- Size: 9,368,097 bytes.
- SHA-256: 16b387530b2dd9cd22d3e8aba5b23ef5fd276c1aecf87481c4c08d6b9d1d3641.
- Candidate233 rollback: 9,366,806 bytes; SHA-256 ae1d4794c8c6c1ad64726c7736d9d01a6a68ea9a84f81d704c0696df62594f45; byte-identical to Candidate233 source.
- Candidate234 is local-only. GitHub HTML upload and remote HTML SHA validation are NOT VERIFIED.
- Candidate234 changes only queueSelectedBtn dispatch and the shared applyQueue business API; storage key/schema unchanged. Legacy catalog batch UI remains because dependencies have not yet been eliminated.
- Test state: JS syntax PASS; CSS parse PASS; DOM IDs PASS; Node VM queue API unit tests PASS; full browser runtime BLOCKED; native reload persistence NOT RUN.

## Candidate233 immediately previous checkpoint
- Size: 9,366,806 bytes; SHA-256 ae1d4794c8c6c1ad64726c7736d9d01a6a68ea9a84f81d704c0696df62594f45.
- Candidate231 original is retained separately and unchanged.

---
# BASELINE — AMQ Song Select cleanup (updated 2026-10-24)

## Current audit baseline confirmed by user
- Candidate231 is confirmed by the user as the latest version for this work.
- Local artifact: `amq_learning_tool_v82_85_46_candidate231_work_batch_entry_integration_20261024.html`.
- Size: 9,367,325 bytes.
- SHA-256: `74607e5344e0b993fb1e8d40c081285287071c236c9c92bac86cac98c5c9fecf`.
- Candidate231 is available as a local artifact; it has NOT been uploaded to the Candidate231 GitHub branch and no remote HTML hash has been verified. Do not imply otherwise.
- Candidate229 rollback copy remains local and byte-identical to its recorded parent: 9,366,832 bytes; SHA-256 `8d9c9c9fff823d3e333875aeb07ada9fd73976dd64d55e6cdc2c6471f06e0448`.
- Candidate232 is documentation/audit only; no HTML/CSS/JS or data schema changed.

## Historical baseline record (prior to user's Candidate231 confirmation)
# BASELINE — AMQ Song Select cleanup (2026-10-24)

- Current 100-item checklist status: `reports/candidate212-100-item-continuation-20261024/100_ITEM_PROGRESS.md`. This matrix does not imply completion; source integrity and native-browser constraints remain blockers.
## Previously recorded user-authorized working baseline (historical record; superseded for this audit by Candidate231 confirmation)
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


## Candidate219 cleanup + Song Select ownership checkpoint (2026-10-24)
- Verified original Candidate212 bytes: 9,352,632 bytes; SHA-256 52376c693c5c0701d77e80a6076620623ef9ef5decadd11265d6b57bcf6c6952. Original remains unchanged and a byte-identical local rollback exists.
- Candidate213 safe cleanup: 9,352,274 bytes; SHA-256 e409fcef642224e27d53baf0bc830e2ca34d32a4f38e6394891fb6ff4d2d9375. Removed only Candidate84 relabel-only “資料品質” script and Candidate105 no-reader marker.
- Candidate215: 9,352,402 bytes; SHA-256 4d57290bf3026d011ec0e29f2d0067a4b43756f85b00be8895a3f85b0e7ed4f0. Candidate214 was an intermediate FAIL because a Set remained in inner scope; Candidate215 moved it to the shared IIFE scope and passed runtime checks.
- Candidate219 local artifact: amq_learning_tool_v82_85_46_candidate219_songselect_keyboard_completion_20261024.html, 9,352,752 bytes; SHA-256 4a20b0eee8ecaa4b8d7ac5b55e1fc602c4335c9ad892ef901dc672ac719b40ea.
- Changes: remove duplicate Song Select list-level key handler; retain delegated owner; use the single batch-selection Set to render checked state; Enter calls the canonical row selection/playback function once.
- PASS: 66/66 executable JS blocks parse; 108 CSS blocks have zero parse errors; Chromium page.set_content() with in-memory storage shim loads without page/console errors; Song Select route creates 180 rows; ArrowDown moves index 0→1; isolated Enter test invokes listenSong exactly once; batch checkbox remains checked after search rerender and counter remains 1.
- BLOCKED/NOT RUN: native file launch and durable storage reload, real audio output, IndexedDB Blob backup/restore, live imports, multiplayer lifecycle, osu!stable pixel comparison.
- GitHub branch: amq-candidate219-songselect-ownership-20261024. Documentation is being checkpointed; the HTML upload action is not exposed by the available GitHub connector. Remote HTML path returned 404, so no remote HTML existence or hash verification is claimed.


## Candidate220 local integration checkpoint (2026-10-24)
- Parent Candidate219 local file: 9,352,752 bytes; SHA-256 4a20b0eee8ecaa4b8d7ac5b55e1fc602c4335c9ad892ef901dc672ac719b40ea.
- Candidate220 local file: amq_learning_tool_v82_85_46_candidate220_list_management_batch_integration_20261024.html; 9,353,264 bytes; SHA-256 d36160782d785c9f23adb5d217aefe1fa4c1d80c1dd309bf54670753e5a9d80a.
- Rollback: byte-identical copy of Candidate219 at amq_learning_tool_v82_85_46_candidate219_rollback_20261024.html.
- Scope: adds a List Management action wired to the existing Candidate210 batch workspace; removes the incorrect relabel of the C99 VNDB action. No data keys/schema or legacy work-level batch implementation deleted.
- Static checks: 65 executable JS blocks PASS; 3 payload blocks excluded; 108 CSS blocks PASS with zero parser errors. Browser action flow NOT RUN because Chromium launch timed out in this runtime.
- Remote HTML upload/hash verification: BLOCKED; only documentation checkpoint is on this branch.


## Candidate221 local integration checkpoint (2026-10-24)
- Parent Candidate220: 9,353,264 bytes; SHA-256 `d36160782d785c9f23adb5d217aefe1fa4c1d80c1dd309bf54670753e5a9d80a`.
- Candidate221: `amq_learning_tool_v82_85_46_candidate221_work_and_song_batch_entry_20261024.html`; 9,353,751 bytes; SHA-256 `77a754fce6117153063d7f00f44640c88f553a6893b78804f4b3573e162749f5`.
- Rollback Candidate220: 9,353,264 bytes; SHA-256 `d36160782d785c9f23adb5d217aefe1fa4c1d80c1dd309bf54670753e5a9d80a`; byte-identical local copy confirmed.
- Changes only add a work-level batch entry that routes to existing `quicktools`; song-level batch remains Candidate210 owner. No data schema changes.
- Static tests PASS: 63 executable JS blocks; 108 CSS blocks; 7 assertions. Browser flow BLOCKED because Chromium binary is unavailable. Remote HTML upload/hash verification BLOCKED.


## Candidate222 baseline checkpoint (2026-10-24)
- Parent Candidate221：9,353,751 bytes；SHA-256 `77a754fce6117153063d7f00f44640c88f553a6893b78804f4b3573e162749f5`。
- Candidate222：9,348,268 bytes；SHA-256 `39d9962c38ab928f51969237063230e8f77dc6f9416f8bf9691b12c48522c723`。
- Change scope: remove unreachable `wsBatchListAdder` bridge markup/runtime/CSS only; retain work-level quicktools and song-level Candidate210 batch owners.
- Rollback Candidate221 is byte-identical: 9,353,751 bytes; SHA-256 `77a754fce6117153063d7f00f44640c88f553a6893b78804f4b3573e162749f5`.
- Tests: 65 JS syntax PASS; 108 CSS blocks PASS; 10/10 static assertions PASS. Browser interaction NOT RUN. Remote HTML upload/hash verification BLOCKED.


## Candidate223 ownership audit checkpoint (2026-10-24)
- 唯一起點仍是 Candidate222：9,348,268 bytes；SHA-256 `39d9962c38ab928f51969237063230e8f77dc6f9416f8bf9691b12c48522c723`。
- Candidate223 是依賴稽核文件階段，未修改 HTML，也沒有新的候選產物。
- 16 個主要 quicktools DOM 控制項皆存在；`applyBulkPracticeAction` 定義及正式 click binding 各 1 個。
- 不同資料粒度維持分離；跨視圖 selection handler 待瀏覽器驗收後再決定整合。


## Candidate224 可達性稽核 checkpoint（2026-10-24）
- 唯一程式基線 Candidate222：9,348,268 bytes；SHA-256 `39d9962c38ab928f51969237063230e8f77dc6f9416f8bf9691b12c48522c723`。
- Candidate224 是瀏覽器可達性稽核階段，沒有修改 HTML，沒有新候選版本。
- FAIL：Song Select 路由的舊作品批次 `#quicktools` 隱藏；workspace dock/sidebar 不可見；`list-batch-works` handler 無法開啟可見作品批次工具。
- PASS（隔離 handler fixture）：歌曲批次入口能呼叫 Candidate210 runtime；自訂清單管理入口能呼叫既有共用面板。但兩個入口所在的 workspace sidebar 不可見，不能視為端到端使用者流程 PASS。
- 回滾：無需回滾，Candidate222 原檔未修改。
- GitHub：本階段只更新文件與測試報告；大型 HTML 未上傳，沒有遠端 HTML hash 驗證。


## Candidate225 互動探測 checkpoint（2026-10-24）
- 唯一程式基線仍為 Candidate222：9,348,268 bytes；SHA-256 `39d9962c38ab928f51969237063230e8f77dc6f9416f8bf9691b12c48522c723`，本輪已重算驗證。
- Candidate225 是互動探測與整合前置驗收文件階段，沒有修改 HTML，也沒有新候選產物。
- PASS：首頁初始化、首頁選單展開、Song Select 路由、可見自訂清單入口。
- FAIL：Song Select 內 workspace sidebar 與 quicktools 不可見，作品批次端到端流程不可達。
- BLOCKED：原生 file:// 與持久化 reload。NOT RUN：真實音訊、即時 API、多人流程、像素比對。
- 回滾：無需回滾，Candidate222 與 Candidate221 原檔未修改。
- GitHub：Stage 11 報告已提交；未上傳大型 HTML，未驗證遠端 HTML SHA。


## Candidate226 歌曲批次入口標籤 checkpoint（2026-10-24）
- 父版本 Candidate222：9,348,268 bytes；SHA-256 `39d9962c38ab928f51969237063230e8f77dc6f9416f8bf9691b12c48522c723`。
- Candidate226：9,348,469 bytes；SHA-256 `d3940fb1a6edaf67454621023c704783fc9fd8ab1b598238bdbe5735305c4c9c`。
- 變更僅修正 C99 `vndb` 動作入口的標題／說明，與 Candidate210 實際執行的歌曲批次整理一致；VNDB 匯入仍在共用匯入面板。
- PASS：66 個 executable JS blocks；108 CSS blocks；shim 互動測試的歌曲批次入口、180 首選取／清除與 VNDB 匯入可達性。
- BLOCKED：原生 file://、持久化 reload。NOT RUN：真實音訊、即時 API、多人、像素比對。
- 回滾：Candidate222 原始檔未修改；使用 `amq_learning_tool_v82_85_46_candidate222_rollback_before_candidate226_20261024.html` 即可回復。
- GitHub：只有文件已提交；Candidate226 HTML 未上傳，遠端 HTML SHA 未驗證。


## Candidate227 可見作品批次工作區 checkpoint（2026-10-24）
- 父版本 Candidate226：9,348,469 bytes；SHA-256 `d3940fb1a6edaf67454621023c704783fc9fd8ab1b598238bdbe5735305c4c9c`。
- Candidate227：9,360,586 bytes；SHA-256 `2c0b8154b95fbe0685a19e50e185646eedb06f978be211e9eeb06eebb956529d`。
- 新增 C99 可見作品批次入口、作品搜尋／選取及透過 bridge 呼叫原有正式作品批次函式；沒有新增持久化 schema。
- PASS：67 個可執行 JS 區塊、109 CSS 區塊；shim 下作品搜尋／選取、看番狀態、歌曲熟悉度、自訂清單加入／移出及作品／歌曲選取隔離。
- BLOCKED：原生 file://、持久化 reload。NOT RUN：真實音訊、即時 API、多人、像素比對與部分操作分支。
- 回滾：`amq_learning_tool_v82_85_46_candidate226_rollback_before_candidate227_20261024.html`，9,348,469 bytes，SHA-256 `d3940fb1a6edaf67454621023c704783fc9fd8ab1b598238bdbe5735305c4c9c`。
- GitHub：Stage 13 報告與狀態文件已提交；Candidate227 HTML 未上傳，遠端 HTML SHA 未驗證。


## Candidate227 補充回歸結果（2026-10-24）
- PASS：作品黑名單加入／解除；SRS 對所選作品歌曲建立卡片；切換到歌曲批次後作品與歌曲選取集合維持隔離。
- 以上僅為 Playwright 記憶體 storage shim 結果，不代表持久化驗收。
- 待測：看番狀態全部分支、超過 300 部作品的確認／取消分支、原生 file:// 與重新載入。


## Candidate227 Stage 14 dependency audit checkpoint (2026-10-24)
- Candidate227 remains the current local working artifact: 9,360,586 bytes; SHA-256 `2c0b8154b95fbe0685a19e50e185646eedb06f978be211e9eeb06eebb956529d`.
- Stage 14 did not modify HTML. Runtime regression: PASS for watch status variants, empty selection safety, 301-item confirmation/cancel, and repeated panel selection retention. Storage shim failed to override opaque-origin localStorage, so persistence tests are not valid and are marked BLOCKED.
- Static reference counts show old controls are still referenced: selectModeBtn 10; selectVisibleBtn 8; selectFilteredBtn 7; clearSelectionBtn 7; applyBulkWatchBtn 6; applyBulkSongBtn 4; bulkCustomList 7; applyBulkPracticeAction 8; batchScopeSummaryV844 10; syncOpenBtn 5. Counts are heuristic source-string counts, not a full AST call graph.
- No old controls, listeners, observers or CSS deleted. Extract direct APIs before cleanup. See `reports/candidate227-visible-work-batch-workspace-20261024/STAGE_14_REGRESSION_AND_DEPENDENCY_AUDIT.md`.
- GitHub documentation branch only; HTML not uploaded and remote HTML hash not verified.


## Candidate228 direct batch API extraction checkpoint (2026-10-24)
- Current local candidate: `amq_learning_tool_v82_85_46_candidate228_direct_batch_api_extraction_20261024.html`, 9,364,981 bytes; SHA-256 `9d696a307d4e02ef8270da41936920f1b26d9eca9a70b230a1088de4f8466f22`.
- Parent Candidate227 remains unchanged: 9,360,586 bytes; SHA-256 `2c0b8154b95fbe0685a19e50e185646eedb06f978be211e9eeb06eebb956529d`. Rollback copy byte-identical.
- Candidate228 adds explicit-ID APIs for watch status, familiarity and practice actions. Existing storage keys/schema retained; visible work bridge calls direct APIs rather than clicking legacy buttons.
- PASS: 67 executable JS blocks; 109 CSS blocks; in-memory Playwright interactions cover all watch/familiarity variants, list add/remove, weak-set, blacklist, SRS, invalid input and write-failure rollback.
- BLOCKED: native file launch and durable reload persistence. Old controls/listeners/CSS still have active references and were not deleted.
- GitHub branch contains documentation only; HTML upload and remote HTML SHA verification remain uncompleted. See `reports/candidate228-direct-batch-api-extraction-20261024/STAGE_15_DIRECT_BATCH_API_EXTRACTION.md`.


## Candidate229 workspace result handling checkpoint (2026-10-24)
- Parent Candidate228: 9,364,981 bytes; SHA-256 `9d696a307d4e02ef8270da41936920f1b26d9eca9a70b230a1088de4f8466f22`.
- Candidate229: `amq_learning_tool_v82_85_46_candidate229_workspace_result_handling_20261024.html`, 9,366,832 bytes; SHA-256 `8d9c9c9fff823d3e333875aeb07ada9fd73976dd64d55e6cdc2c6471f06e0448`.
- Rollback is byte-identical Candidate228: `amq_learning_tool_v82_85_46_candidate228_rollback_before_candidate229_20261024.html`, SHA-256 `9d696a307d4e02ef8270da41936920f1b26d9eca9a70b230a1088de4f8466f22`.
- Candidate229 changes visible batch status reporting only: success/cancel/failure outcomes now consume structured API results. Existing data keys/schema unchanged. No legacy quicktools code was deleted because caller references remain.
- Static JS syntax PASS (67 executable blocks). Runtime result handling BLOCKED by opaque-origin localStorage access failure; native file/reload persistence BLOCKED by managed URLBlocklist. GitHub branch holds documentation only; HTML upload and remote HTML SHA verification remain incomplete.


## Candidate230 runtime/dependency audit checkpoint (2026-10-24)
- Code baseline remains Candidate229: 9,366,832 bytes; SHA-256 `8d9c9c9fff823d3e333875aeb07ada9fd73976dd64d55e6cdc2c6471f06e0448`.
- No HTML edit was justified: runtime storage tests are blocked by opaque-origin localStorage access, and static audit found active callers for legacy batch controls. Candidate229 is unchanged and remains the only current code candidate.
- Candidate228 rollback remains the known parent rollback artifact; Candidate229 HTML has not been uploaded to GitHub, and remote HTML SHA is not verified.


## Candidate231 工作批次入口整合檢查點（2026-10-24）
- Candidate229 父程式：9,366,832 bytes；SHA-256 8d9c9c9fff823d3e333875aeb07ada9fd73976dd64d55e6cdc2c6471f06e0448。
- Candidate231 候選產物：amq_learning_tool_v82_85_46_candidate231_work_batch_entry_integration_20261024.html，9,367,325 bytes；SHA-256 74607e5344e0b993fb1e8d40c081285287071c236c9c92bac86cac98c5c9fecf。
- 回滾副本：amq_learning_tool_v82_85_46_candidate229_rollback_before_candidate231_20261024.html，9,366,832 bytes；SHA-256 與 Candidate229 相同，已確認 byte-identical。原始 Candidate229 未修改。
- 變更僅把主工作區作品批次入口接到既有 Candidate210 可見面板，並在掛載成功後才回報成功；不改資料 schema，不刪除仍有依賴的 quicktools 舊控制項。
- 執行證據與限制見 reports/candidate231-work-batch-entry-integration-20261024/STAGE_18_WORK_BATCH_ENTRY_INTEGRATION.md。Candidate231 HTML 未上傳 GitHub，遠端 HTML hash 未驗證。


## Candidate233 批次 API 集中化候選（2026-10-24，未驗收為正式基準）
- 使用者確認的原始基準仍為 Candidate231：9,367,325 bytes；SHA-256 `74607e5344e0b993fb1e8d40c081285287071c236c9c92bac86cac98c5c9fecf`。
- Candidate233 是由本機 Candidate231 派生的工作候選，不取代原始基準：`amq_learning_tool_v82_85_47_candidate233_batch_api_centralization_20261024.html`，9,366,806 bytes；SHA-256 `ae1d4794c8c6c1ad64726c7736d9d01a6a68ea9a84f81d704c0696df62594f45`。
- Candidate231 byte-identical rollback copy：`amq_learning_tool_v82_85_46_candidate231_rollback_before_candidate233_20261024.html`，SHA-256 與 Candidate231 相同。
- 修改範圍：刪除四個全 HTML 零引用私有 helper，並將舊圖鑑 watch/song/practice handlers 接到既有 `__aniBatchBusinessAPIv228`。未修改 storage keys/schema、CSS 或必要 UI。
- Candidate233 尚未被使用者驗收為新正式基準；GitHub 分支只有報告與狀態文件，HTML 未上傳，遠端 HTML SHA 未驗證。本輪 `git ls-remote` 因環境 DNS 無法解析 github.com 而失敗。


## Candidate252 本機候選（2026-10-24；尚未驗收為正式基準）
- 既有正式基準仍維持本文件先前記錄的 Candidate231；Candidate252 不覆蓋原始基準。
- Candidate252 本機候選：`amq_learning_tool_v82_85_66_candidate252_watchlist_scoped_work_batch_20261024.html`，9,355,704 bytes；SHA-256 `f210d987495aeb52ca11e958fe2ff9942c32457f054b81d792309c14e9fb78d1`。
- Candidate252 以 Candidate251 為直接父候選；Candidate251 回滾檔 9,354,587 bytes，SHA-256 `4467de1ed6330c51929e783b662d95cd5ad6847dd12edb3a6fde8f49fb94849e`。
- Candidate236 與其後 Candidate237–252 的 HTML 尚未在 GitHub 遠端驗證 SHA；GitHub 文件分支不等於 HTML 已上傳。
- Candidate252 已移除舊 catalog batch panel 和已證明不再使用的控制項／監聽器／CSS，但瀏覽器 E2E 與持久化驗收仍 BLOCKED／NOT RUN，因此不提升為正式基準。


## Candidate255 本機候選（2026-10-24；未驗收為正式基準）
- Candidate255：`amq_learning_tool_v82_85_69_candidate255_remove_last_quicktools_refs_20261024.html`，9,355,697 bytes；SHA-256 `bd620e42e677ddbc8d48cf84da5773f3a51e42978c20ecbaa07761e467a7630d`。
- 直接回滾 Candidate254 byte-identical：`amq_learning_tool_v82_85_68_candidate254_rollback_before_candidate255_20261024.html`，SHA-256 `e7fa38897fcec376153b4a8a979ba3fe44775df8e8266a1e17f2d5ecc24934a9`。
- Candidate255 修正 batch-tools 仍等待舊 quicktools，以及 Song Select 動態掛載清單仍含 quicktools 的殘留引用。
- 靜態測試 PASS；opaque-origin Playwright 因 localStorage 權限受阻，完整互動及持久化未驗收。HTML 尚未上傳 GitHub，遠端 SHA 未驗證，因此 Candidate255 仍是未驗收候選，不取代原始正式基準。
