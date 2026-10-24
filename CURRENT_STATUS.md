## Candidate224 後續工作順序修正：先處理阻塞，再跳過（2026-10-24）
- 已讀取 Chromium managed policy：`/etc/chromium/policies/managed/000_policy_merge.json` 中 `URLBlocklist` 為 `["*"]`；最小 `file://`、`data:` 頁面及 localhost 導覽都回報 `ERR_BLOCKED_BY_ADMINISTRATOR`。這是環境層阻擋，不是 AMQ 頁面錯誤。
- Candidate222 透過 Playwright `page.set_content()` + 測試用記憶體 storage shim 可在約 2.1 秒完成 DOMContentLoaded，`readyState=complete`，沒有 pageerror/console error。此測試不涵蓋原生 URL 導覽及持久化。
- 尚無證據可判定 AMQ 初始化本身卡死。先嘗試可行替代測試；若被政策阻擋，標記 BLOCKED 並繼續不依賴該環境的工作，最後再回頭處理。不得修改 managed policy 或把受限測試說成 PASS。
- 本階段沒有修改 HTML，Candidate222 仍為唯一程式基線：9,348,268 bytes，SHA-256 `39d9962c38ab928f51969237063230e8f77dc6f9416f8bf9691b12c48522c723`。


## Candidate225 批次 UI 互動探測（2026-10-24）
- 重新驗證 Candidate222 本機檔案：9,348,268 bytes，SHA-256 `39d9962c38ab928f51969237063230e8f77dc6f9416f8bf9691b12c48522c723`，一致。
- Playwright `page.set_content()` + 記憶體 storage shim：首頁初始化、首頁展開、進入 Song Select、可見自訂清單入口 PASS；pageerror 0、console error 0。
- FAIL：Song Select 的 `#amqWorkspaceSidebar` 與 `#quicktools` 都存在但不可見，作品批次 UI 不可達。
- 歌曲批次端到端流程 NOT RUN；隔離 handler 可呼叫 Candidate210 runtime 不等於使用者入口可達。
- 原生 file://、持久化 reload BLOCKED；真實音訊、即時 API、多人與像素比對 NOT RUN。
- 本階段未修改 HTML。詳細證據：`reports/candidate225-batch-ui-interaction-probe-20261024/STAGE_11_BATCH_UI_INTERACTION_PROBE.md`。
- GitHub 文件已提交至本分支；大型 HTML 未上傳，遠端 HTML hash 未驗證。


## Candidate226 歌曲批次入口標籤修正（2026-10-24）
- Candidate222 父版本仍保留：9,348,268 bytes，SHA-256 `39d9962c38ab928f51969237063230e8f77dc6f9416f8bf9691b12c48522c723`。
- Candidate226：9,348,469 bytes，SHA-256 `d3940fb1a6edaf67454621023c704783fc9fd8ab1b598238bdbe5735305c4c9c`；回滾檔為 Candidate222 的 byte-identical copy。
- 根因：C99 `vndb` 入口的實際 handler 是 Candidate210 歌曲批次整理，但畫面仍顯示 VNDB 匯入。已修正標題與說明，沒有更動資料層或業務邏輯。
- PASS：66/66 可執行 JS 區塊語法；108 CSS 區塊 0 parser error；Playwright shim 下首頁初始化、Song Select、匯入面板仍可開啟且包含 VNDB、批次入口開啟既有面板、180 首歌曲選取／清除、0 pageerror／console error。
- BLOCKED：原生 file:// 與持久化 reload。NOT RUN：真實音訊、即時 API、多人與像素比對。
- 作品批次入口仍不可達，未宣稱完成。詳見 `reports/candidate226-song-batch-entry-label-fix-20261024/STAGE_12_SONG_BATCH_ENTRY_LABEL_FIX.md`。
- GitHub 文件已提交至 Candidate226 分支；HTML 本機產物尚未上傳，遠端 HTML SHA 未驗證。


## Candidate227 可見作品批次工作區（2026-10-24）
- 父版本 Candidate226：9,348,469 bytes，SHA-256 `d3940fb1a6edaf67454621023c704783fc9fd8ab1b598238bdbe5735305c4c9c`。
- Candidate227：9,360,586 bytes，SHA-256 `2c0b8154b95fbe0685a19e50e185646eedb06f978be211e9eeb06eebb956529d`。
- 新增可見 C99「作品批次整理」入口與作品搜尋／選取面板；沿用既有作品層業務函式，歌曲批次仍由 Candidate210 管理。
- PASS：67/67 可執行 JS 區塊語法；109 CSS 區塊 0 parser error；Playwright shim 下首頁導覽、可見入口、作品搜尋、選取、批次看番狀態、批次歌曲熟悉度、自訂清單加入／移出與作品／歌曲選取隔離；pageerror 0、console error 0。
- BLOCKED：原生 file:// 與持久化 reload。NOT RUN：真實音訊、即時 API、多人、像素比對、完整 SRS／黑名單分支。
- 回滾檔 Candidate226 byte-identical，原檔未修改。舊隱藏 UI 尚未清理，等待完整回歸後再刪除。
- 詳見 `reports/candidate227-visible-work-batch-workspace-20261024/STAGE_13_VISIBLE_WORK_BATCH_WORKSPACE.md`。
- GitHub 文件已提交；大型 HTML 尚未上傳，遠端 HTML SHA 未驗證。


### Candidate227 補充回歸（2026-10-24）
- 追加 PASS：作品批次黑名單加入／解除的既有 API 狀態分別變成 true／false。
- 追加 PASS：確認後 SRS 對所選作品的兩首歌曲均建立卡片。
- 追加 PASS：切到歌曲批次面板時歌曲選取為 0，作品選取仍維持原集合。
- pageerror 0、console error 0。以上均為記憶體 shim 測試；持久化仍 BLOCKED。
- 待測：看番狀態所有分支、超過 300 部作品的確認／取消分支、完整資料持久化。


## Candidate227 Stage 14 regression and dependency audit (2026-10-24)
- Candidate227 remains unchanged: 9,360,586 bytes; SHA-256 `2c0b8154b95fbe0685a19e50e185646eedb06f978be211e9eeb06eebb956529d`.
- PASS: page.set_content init/bridge/data count; watch status variants completed/current/planning/paused/dropped/none; empty selection safety; 301-item confirmation and cancel; selection retention across repeated panel entry.
- BLOCKED: this round's opaque-origin localStorage shim failed, so persistence conclusions are invalid. Native file URL and reload persistence remain blocked by Chromium managed URLBlocklist.
- Dependency audit: legacy batch controls still have live references. No legacy markup/listeners/observers/CSS were deleted. Next: extract explicit business APIs, migrate bridge, then remove only proven-unreferenced controls.
- Stage 14 report: `reports/candidate227-visible-work-batch-workspace-20261024/STAGE_14_REGRESSION_AND_DEPENDENCY_AUDIT.md`.
- HTML is not uploaded to GitHub; remote HTML SHA remains unverified.


## Candidate228 direct batch API extraction (2026-10-24)
- Parent Candidate227: 9,360,586 bytes; SHA-256 `2c0b8154b95fbe0685a19e50e185646eedb06f978be211e9eeb06eebb956529d`.
- Candidate228: 9,364,981 bytes; SHA-256 `9d696a307d4e02ef8270da41936920f1b26d9eca9a70b230a1088de4f8466f22`. Candidate227 rollback is byte-identical to parent.
- Added explicit-ID `__aniBatchBusinessAPIv228` for watch status, song familiarity and practice actions; bridge no longer clicks legacy hidden controls. Existing keys/schema retained.
- PASS: 67 executable JS blocks, 109 CSS blocks; Playwright shim tests for all six watch statuses, four familiarity states, list add/remove, weak set, blacklist, SRS, invalid/empty/missing-list and storage-failure rollback; 0 page errors.
- BLOCKED: native file URL and durable reload persistence due to managed Chromium URLBlocklist. NOT RUN: real audio, live APIs, multiplayer, pixel comparison and accepted >300-item path.
- Old quicktools UI/listeners/CSS were not removed because references remain. Next: migrate all visible actions to API results, complete dependency audit, then delete only proven-unreferenced code.
- Report: `reports/candidate228-direct-batch-api-extraction-20261024/STAGE_15_DIRECT_BATCH_API_EXTRACTION.md`. Candidate228 HTML is not uploaded to GitHub; remote HTML SHA not verified.


## Candidate229 workspace result handling (2026-10-24)
- Parent Candidate228 re-verified before edit: 9,364,981 bytes; SHA-256 `9d696a307d4e02ef8270da41936920f1b26d9eca9a70b230a1088de4f8466f22`.
- Candidate229 local artifact: 9,366,832 bytes; SHA-256 `8d9c9c9fff823d3e333875aeb07ada9fd73976dd64d55e6cdc2c6471f06e0448`.
- Visible work-batch handler now reports structured success counts and explicit cancellation/failure messages instead of optimistic generic success. Selection synchronization result is checked.
- PASS: 67 executable inline JS blocks pass `node --check`; static assertions pass. BLOCKED: runtime result handling because the opaque-origin localStorage shim failed; native file URL and durable reload are blocked by managed Chromium URLBlocklist. NOT RUN: actual UI confirmation paths, audio, live APIs, multiplayer, pixel comparison.
- Legacy quicktools references remain active; no markup/listener/observer/CSS deletion was performed.
- Report: `reports/candidate229-workspace-result-handling-20261024/STAGE_16_WORKSPACE_RESULT_HANDLING.md`. Candidate229 HTML is local only; GitHub HTML upload and remote SHA verification are not complete.


## Candidate230 執行驗收與依賴稽核（2026-10-24）
- Candidate229 本機基準重新核對：9,366,832 bytes，SHA-256 `8d9c9c9fff823d3e333875aeb07ada9fd73976dd64d55e6cdc2c6471f06e0448`。
- PASS：Playwright `page.set_content()` 初始化完成，標題正確，批次 API 與 bridge 存在。
- BLOCKED：opaque-origin localStorage 存取失敗；本輪沒有把批次 API 儲存操作或可見 UI 流程列為 PASS。原生 file URL／reload 仍受 Chromium managed URLBlocklist 阻擋。
- 靜態依賴稽核確認 `#quicktools`、`#bulkPracticeAction`、`#bulkCustomList`、`#applyBulkPracticeAction` 仍有實際 handler、資料更新及導航／刷新呼叫。沒有證據支持整組刪除，因此本階段未修改 HTML。
- Candidate230 為文件稽核檢查點，不另造無程式差異的 HTML 版本。HTML 尚未上傳 GitHub，遠端 SHA 未驗證。
- 報告：`reports/candidate230-runtime-dependency-audit-20261024/STAGE_17_RUNTIME_ACCEPTANCE_AND_DEPENDENCY_AUDIT.md`。


## Candidate231 作品批次入口整合（2026-10-24）
- 父版本 Candidate229 已重新核對：9,366,832 bytes，SHA-256 8d9c9c9fff823d3e333875aeb07ada9fd73976dd64d55e6cdc2c6471f06e0448。
- Candidate231：9,367,325 bytes，SHA-256 74607e5344e0b993fb1e8d40c081285287071c236c9c92bac86cac98c5c9fecf；Candidate229 回滾副本 byte-identical，SHA 相同。
- 根因：主工作區作品批次入口只捲動到舊 quicktools，該區塊在 Song Select 路由不保證可見。現在改接 Candidate210 既有作品批次面板，且只有確認面板節點掛載才回報成功。
- PASS：67 個可執行 JS 區塊語法、109 個 CSS 區塊解析；可見面板列出 9,516 部作品；測試清單加入、儲存失敗、空選取、取消確認、12 次開關循環及所有批次 API 分支；0 pageerror、0 console error。
- BLOCKED：原生 file:// 與 reload 持久化仍受 Chromium managed URLBlocklist 阻擋。NOT RUN：真實音訊、即時 API、多人及像素比對。
- 舊 quicktools 及其控制項尚有其他有效依賴，未刪除。Candidate231 HTML 尚未上傳 GitHub，遠端 HTML SHA 未驗證。
- 詳細報告：reports/candidate231-work-batch-entry-integration-20261024/STAGE_18_WORK_BATCH_ENTRY_INTEGRATION.md。


## Candidate232 全專案依賴盤點（2026-10-24）
- 使用者已確認 Candidate231 為目前最新版本；本輪以本機 Candidate231 HTML（9,367,325 bytes，SHA-256 `74607e5344e0b993fb1e8d40c081285287071c236c9c92bac86cac98c5c9fecf`）為掃描基準。
- 本輪未修改 HTML/CSS/JS 或資料 schema。PASS：初始 DOM 292/292 IDs 唯一；67/67 可執行 inline JS 語法；109 個 CSS blocks 無 stylesheet/declaration parser errors；CSS cascade 靜態索引已建立。
- 主要整合熱點：workspace/router 多代 runtime、舊作品批次呼叫點、Song Select/home/quiz/player CSS cascade、volume-control fallback、observer/timer 生命週期。
- 本輪未找到可單靠靜態證據安全刪除的完整程式碼群；不得按版本編號、同名函式或重複 selector 直接刪除。
- NOT RUN：完整 runtime call graph、四工作區完整端到端、自訂清單原生 reload、真實音訊/live API/多人/固定參考圖像素比對。
- BLOCKED：原生 file:// / localhost 與 reload 持久化受 Chromium managed URLBlocklist 阻擋；未更改政策。
- Candidate231 HTML 尚未上傳 GitHub，遠端 HTML SHA-256 未驗證。詳細盤點：`reports/candidate232-full-dependency-inventory-20261024/DEPENDENCY_AUDIT.md`。