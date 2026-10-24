# CURRENT_STATUS — AMQ 100-item engineering continuation (2026-10-24)

- Full 100-item progress matrix committed at `reports/candidate212-100-item-continuation-20261024/100_ITEM_PROGRESS.md`; every item has PASS/FAIL/NOT RUN/BLOCKED and evidence/remaining work.
## Verified baseline and artifacts
- Target branch: `amq-candidate104-songselect-layout-fix`.
- Branch head before this documentation update: `31b111d3e5530a268d66b10743556cc71770985f` (commit message: `Prioritize shared volume handler after reproduced fallback failure`).
- Candidate212 recorded baseline: 9,352,632 bytes; recorded SHA-256 `52376c693c5c0701d77e80a6076620623ef9ef5decadd11265d6b57bcf6c6952`.
- Candidate207 rollback record: 9,310,496 bytes; recorded SHA-256 `2f3a092a139628daa48bc113d2a192f41e2d7474182471ed926de3de49fd6100`.
- Candidate216 record: 9,352,541 bytes; recorded SHA-256 `70d0b99e069d34bba174f278d8e09c6c3f508841aa3ec25d014f0970e30ad05f`.
- Candidate218 record: 9,352,817 bytes; recorded SHA-256 `5e1bd34e1bc49fe606fc8b9989cfaab26d00f2eee5e12ca0541d16a5ae63099c`.
- All four candidate artifact records were found in the user's AMQ學習工具 Library. The raw-byte materialization action is not authorized in this runtime. Candidate207's and Candidate212's recorded SHA-256 values have not been freshly recomputed from their original bytes here.
- Candidate212 reconstructed readable export: 9,352,606 bytes; SHA-256 `07f2d2428b308d6449e561b9d68cc890932d36089694cdecbff561d092b11636`. It is 26 bytes shorter than the recorded original and is NOT a release source.
- The target branch Git Tree does not contain Candidate207/212/216/218 HTML. No candidate HTML upload or remote HTML SHA-256 verification is claimed.

- Static dependency edge inventory committed and read back: `reports/candidate212-100-item-continuation-20261024/DEPENDENCY_EDGE_INVENTORY.md`. It records 70 script blocks and 268 heuristic cross-script window-API references plus event/storage hints. It is explicitly a text-scan map, not a complete AST call graph and not sufficient by itself to justify deletion.

- Batch selection rerender defect reproduced and documented in `reports/candidate212-100-item-continuation-20261024/BATCH_SELECTION_ACCEPTANCE.md`: after selecting 180 songs and applying familiarity, the selection Set still contains 180 IDs and the counter still says 180, but rerendered row checkboxes become unchecked. A disposable prototype moved the Set to the Candidate210 IIFE scope and rendered checkbox state from that Set; both `聽過` and `有印象` actions then passed with 180 visible checks, matching counter, 180 stored status updates, and no page errors. No source candidate was modified.

- Imported-list removal acceptance committed in `reports/candidate212-100-item-continuation-20261024/IMPORT_REMOVAL_ACCEPTANCE.md`: seeded in-memory tests passed for AniList-only removal, MAL-only removal, and VNDB local-list-key removal; manual watch status and unrelated records remained intact; all three controls prompted confirmation; zero page errors. Live API/import and native persistence remain untested.
- Custom-list isolation acceptance committed in `reports/candidate212-100-item-continuation-20261024/CUSTOM_LIST_ISOLATION_ACCEPTANCE.md`: PASS for two unique list IDs, duplicate-membership deduplication, per-list remove isolation, rename preserving ID, deleting one list while preserving the other list and its membership, and zero page errors. All checks used in-memory storage; reload persistence remains blocked.
- Four-workspace panel lifecycle report committed in `reports/candidate212-100-item-continuation-20261024/FOUR_WORKSPACE_PANEL_ACCEPTANCE.md`: direct adapter tests pass for custom-list, learning-center, quiz and multiplayer panels, single-panel uniqueness, Song Select route preservation, DOM parent/hidden-state restoration and zero page errors. Important limit: the test bypasses visible navigation; the multiplayer entry is still missing from the dock, so user-flow acceptance is not complete.
- Observer mount-cycle acceptance committed in `reports/candidate212-100-item-continuation-20261024/OBSERVER_MOUNT_CYCLE_ACCEPTANCE.md`: after first lazy mount, observer counts stayed stable across the remaining 11 of 12 workspace transitions. Startup 47/46 MutationObserver created/active, 2/2 ResizeObserver, 1/1 IntersectionObserver; first lazy mount added 2 active MutationObservers and 1 active IntersectionObserver observing 180 additional targets; counts then remained stable. No errors. Owner/target lifetime tracing remains NOT RUN; this does not prove all observers leak-free.
- Import API error acceptance committed in `reports/candidate212-100-item-continuation-20261024/IMPORT_API_ERROR_ACCEPTANCE.md`: mocked 429, invalid JSON/schema, offline and VNDB 401 paths pass with recoverable UI status and button restoration. Static review found no explicit timeout wrapper in the baseline AniList/MAL/VNDB fetch paths. A disposable shared `AbortController` timeout helper prototype passes AniList, MAL, VNDB user lookup and VNDB list-request timeout assertions. No source change was applied.
- Song Select geometry prototype appended to `reports/candidate212-100-item-continuation-20261024/SONGSELECT_GEOMETRY_ACCEPTANCE.md`: reducing the final row-size clamp from 130 px minimum to 110.156 px at 1080p yields 8 intersecting rows with 54.6% of the bottom row visible (about 7.55 cards). Hover remains 3 px and selected shift 7 px; click/selected-song state passes. Fixed-reference pixel comparison remains NOT RUN because the available images are not full Song Select screenshots.
- Responsive geometry smoke on the disposable CSS fixture passes list presence, scrollability, no horizontal document overflow and no page errors at 1920×1080, 1366×768, 1280×720, 768×1024 and 390×844. Remaining issue: at 390×844 the tracklist is only 145 px wide and the bottom-row cue is 7% visible; mobile layout needs separate treatment. See `SONGSELECT_GEOMETRY_ACCEPTANCE.md`.
- Song Select keyboard event ownership defect reproduced and documented in `reports/candidate212-100-item-continuation-20261024/SONGSELECT_KEYBOARD_ACCEPTANCE.md`: the main tracklist shares `.amq-inline-song-list` with inline work lists, while a direct listener can be lost when the list node is replaced. Depending on binding timing, ArrowDown can move two rows and Enter can invoke playback multiple times, or Enter can fail to invoke playback. A disposable single-owner stable-stage handler prototype passes one-row ArrowDown and exactly-one playback invocation on Enter. No source change was applied.
- Scene-background backup validation report committed in `reports/candidate212-100-item-continuation-20261024/SCENE_BACKUP_VALIDATION_ACCEPTANCE.md`: baseline preflight accepts invalid image bytes labelled PNG and an 8193 px-wide PNG, despite file input enforcing decode/dimension limits. A disposable prototype adds `createImageBitmap` validation plus the same dimension/pixel checks; valid PNG, malformed base64, duplicate scene, invalid bytes and oversized dimensions all pass expected assertions. Native IndexedDB export/write/restore remains BLOCKED by opaque-origin restrictions; no source change was applied.
- MAL import conflict defect reproduced in `reports/candidate212-100-item-continuation-20261024/MAL_IMPORT_STATUS_ACCEPTANCE.md`: the importer falls back to ambiguous top-level `entry.status`, which may describe anime airing state, and overwrites an existing manual watch status. A disposable prototype removes that ambiguous fallback while preserving explicit `listStatus` handling; both assertions pass. No source change was applied.
- Watch/custom-mode tabs: current Candidate212 fixture registers exactly one direct click listener per tab, passes 10 repeated mode switches, preserves active/hidden states, and shows no page errors. Candidate218's own artifact still cannot be runtime-compared because its original bytes are unavailable. See `WATCH_MODE_TAB_ACCEPTANCE.md`.
- Cover fallback acceptance committed in `reports/candidate212-100-item-continuation-20261024/COVER_FALLBACK_ACCEPTANCE.md`: with mocked routes, a failed primary cover source falls back to Jikan and loads a valid image; a 429 fallback leaves the cover hidden without a broken image or page error. Live provider availability and CDN behavior remain untested.
- MAL pagination/dedup follow-up: a mocked 301-entry import requests pages 1 and 2, writes the matched anime once, skips 300 duplicate records, preserves the first explicit user-list status across pages, re-enables the button, and produces no page errors. The separate ambiguous top-level `status` overwrite remains FAIL. See `MAL_IMPORT_STATUS_ACCEPTANCE.md`.
## Actual checks executed against the reconstructed text export
- PASS: Node `node --check` for 68 executable inline JavaScript blocks; 2 embedded payload blocks excluded.
- PASS: 108 CSS style blocks parsed with tinycss2; 2,763 top-level qualified rules counted by this scan; zero stylesheet/declaration parse errors. The rule count is scanner-scope-specific and is not comparable to nested-rule totals from other reports.
- PASS: initial HTML parse found 296 ID attributes, all unique.
- PASS: Chromium `page.set_content()` initialization; title and core roots present; dynamic startup DOM had 631 IDs and no duplicate live IDs.
- PASS: watch/custom-list tab click probe observed one click per action.
- PASS: workspace panel lifecycle: import, batch, lists, learning and dashboard × 2 rounds = 10 successful open/close transitions; one panel instance; no page errors.
- PASS: custom-list create, membership add/remove, and delete in isolated in-memory storage.
- PASS: batch selection selected 180 loaded rows; batch familiarity update wrote to isolated mock storage.
- PASS: AMQ/EMQ/MIX mode switches; search; decade/type filtering; name sorting.
- PASS: primary V44 volume control stores values, synchronizes current audio/video elements in the tested fixture, mutes at zero, and reapplies volume after replacing the audio node.
- FAIL (reproduced): forced V82.35 fallback builder updates audio volume but not video volume, and zero volume does not mute audio/video consistently.
- PASS (prototype only): a disposable Playwright fixture routes both V44 and V82.35 fallback through one shared volume controller. Both paths pass single-control, 35% audio/video sync, audio-node replacement reapplication, zero-volume mute, and no-page-error assertions. The controller updates output text only when changed; omitting that guard triggered a MutationObserver self-loop and hung the first prototype. No HTML source was modified.
- FAIL: Song Select geometry target. At 1920×1080, tracklist height is about 830 px, row height 130 px, average pitch about 126 px; only 7 rows intersect the viewport and the last is about 33% visible. Target is about 7.5 cards with a half-visible bottom card.
- PASS: hover shift 3 px is smaller than selected shift 7 px; clicking a row updates selected styling and the right-side title.
- One additional workspace-dock script reported FAIL because it attempted to click controls inside a dock whose computed display was `none`; the test did not exercise visible controls and is not evidence of a user-flow failure. Use the separately passing visible workspace-panel lifecycle test for the verified scope.

## NOT RUN / BLOCKED
- BLOCKED: native `file://` and localhost navigation in Chromium (`ERR_BLOCKED_BY_ADMINISTRATOR`).
- BLOCKED: real persistent-origin localStorage/sessionStorage reload acceptance.
- NOT RUN: IndexedDB object-store/version migration and Blob backup/restore.
- BLOCKED: live AniList/MAL/VNDB API and cover retry/failure behavior; external network was aborted or unavailable in the test environment.
- NOT RUN: real AMQ/EMQ/MIX sound output, seeking, and complete answer/score/history acceptance.
- NOT RUN: fixed-region masked pixel comparison against osu!stable reference.
- NOT RUN: owner-instrumented observer/timer counts across route teardown.
- Candidate218's idempotent tab assignment is a defensive change; the normal initial call graph did not reproduce the claimed duplicate-binding root cause. Browser repeated-mount acceptance remains incomplete.

- Workspace-entry review added to `reports/candidate212-100-item-continuation-20261024/DEPENDENCY_EDGE_INVENTORY.md`: `動畫圖鑑` is live core catalog functionality and should remain an internal mode; `資料品質` is a dead relabel script with no matching live dock button; `批次整理` is live and must be integrated before standalone removal; the four-workspace dock is incomplete because the current markup exposes lists, learning and quiz but no multiplayer entry.

## Engineering disposition
- No executable code has been deleted in this continuation. Duplicate names/IDs and CSS rules alone are not proof of dead code.
- Keep custom-list data keys/schema, learning records, IndexedDB/Blob data, AMQ/EMQ/MIX selection/audio, Song Select route/list/covers/player, and required fallback behavior until dependent behavior is verified.
- Integrate the V44 and V82.35 volume builders behind one shared controller; retain fallback recovery until parity and replacement-node tests pass.
- The `批次整理` module is live and provides familiarity, tag, blacklist and custom-list batch operations. Integrate these into the official list-management surface before removing its standalone entry.
- Candidate212, Candidate207, Candidate216 and Candidate218 originals remain untouched. No release candidate has been created.

## Next action
Continue the 100-item plan using the reconstructed source only for analysis/prototypes. Prepare and test the shared volume-controller change in a disposable fixture, continue owner/call-graph and Song Select geometry diagnostics, and apply source changes only after byte-preserving Candidate212 access is restored. Then rerun affected regression tests, update all reports, create a uniquely named candidate from verified bytes, and read back/verify the remote artifact.


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


## Candidate220 — 清單管理與歌曲批次整合（2026-10-24）
- Parent Candidate219：9,352,752 bytes，SHA-256 4a20b0eee8ecaa4b8d7ac5b55e1fc602c4335c9ad892ef901dc672ac719b40ea。
- Local Candidate220：amq_learning_tool_v82_85_46_candidate220_list_management_batch_integration_20261024.html，9,353,264 bytes，SHA-256 d36160782d785c9f23adb5d217aefe1fa4c1d80c1dd309bf54670753e5a9d80a。原始 Candidate219 未修改，另有本機 byte-identical rollback。
- 修改：正式「清單管理」新增「歌曲維護 → 歌曲批次整理」，呼叫既有 Candidate210 批次 runtime；移除把 C99 rail 的 VNDB action 錯誤改標為「批次整理」的覆寫。
- PASS：65/65 executable inline JS blocks 通過 node --check；3 個資料 payload blocks 排除；108 個 CSS blocks 解析、0 errors；靜態斷言確認入口、handler、既有 runtime API 與 VNDB relabel 移除。
- NOT RUN：完整 Chromium 使用者流程未能完成。Playwright 的 Chromium launch 在此環境逾時；不可宣稱 UI 點擊驗收通過。Native file launch、真實持久化重載、音訊、live APIs、多人生命週期及 osu!stable 像素比較仍 NOT RUN/BLOCKED。
- DEFER：舊 quicktools 與 wsBatchListAdder 是作品層級操作，和歌曲列批次操作的選取粒度不同，尚未刪除。
- GitHub：建立本分支並提交文件紀錄；本地 9.35 MB HTML 無法透過目前 connector 的檔案路徑上傳介面傳送，因此遠端 HTML 上傳與 SHA-256 驗證仍 BLOCKED。


## Candidate221 — 作品／歌曲批次入口分流（2026-10-24）
- Parent Candidate220: 9,353,264 bytes; SHA-256 `d36160782d785c9f23adb5d217aefe1fa4c1d80c1dd309bf54670753e5a9d80a`.
- Local Candidate221: `amq_learning_tool_v82_85_46_candidate221_work_and_song_batch_entry_20261024.html`; 9,353,751 bytes; SHA-256 `77a754fce6117153063d7f00f44640c88f553a6893b78804f4b3573e162749f5`.
- Change: List Management now exposes separate `作品批次整理` and `歌曲批次整理` actions. Work-level action reuses existing `quicktools`; song-level action retains Candidate210's canonical batch runtime. No storage keys/schema changed.
- PASS: 63 executable inline JS blocks pass `node --check`; 4 large data/payload blocks excluded. 108 CSS blocks parse with zero errors. Seven static assertions pass, including single `applyBulkPracticeAction` owner and no VNDB relabel override.
- BLOCKED: browser interaction tests; Playwright is installed but matching Chromium binary is absent in this runtime. Native file launch and persistent reload NOT RUN. Audio, live APIs, multiplayer lifecycle and osu!stable pixel comparison NOT RUN.
- Rollback: Candidate220 byte-identical local copy, 9,353,264 bytes; SHA-256 `d36160782d785c9f23adb5d217aefe1fa4c1d80c1dd309bf54670753e5a9d80a`.
- GitHub: Candidate221 documentation checkpoint branch created. Large local HTML upload and remote SHA verification remain BLOCKED; no remote HTML upload claimed.


## Candidate222 — 不可達作品清單橋接層清理（2026-10-24）
- Candidate221 parent：9,353,751 bytes，SHA-256 `77a754fce6117153063d7f00f44640c88f553a6893b78804f4b3573e162749f5`。
- Candidate222 local artifact：`amq_learning_tool_v82_85_46_candidate222_unreachable_batch_bridge_cleanup_20261024.html`，9,348,268 bytes，SHA-256 `39d9962c38ab928f51969237063230e8f77dc6f9416f8bf9691b12c48522c723`。
- 根因：`wsBatchListAdder` 只在標題含「批次整理」時顯示；正式四個工作區標題沒有此值。已移除不可達面板、專屬同步器/listeners/observers/CSS。
- 保留作品批次 `quicktools`、歌曲批次 Candidate210 runtime、VNDB handler 與資料 schema。
- PASS：65 個 JS blocks；108 CSS blocks 無 parse errors；10/10 靜態斷言。Browser interaction NOT RUN，Chromium 不可用。
- GitHub HTML 上傳與遠端 SHA 驗證仍 BLOCKED，未宣稱完成。
