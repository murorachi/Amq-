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

## Candidate233 批次 API 集中化與死函式清理（2026-10-24）
- 起始 Candidate231 已核對：9,367,325 bytes，SHA-256 `74607e5344e0b993fb1e8d40c081285287071c236c9c92bac86cac98c5c9fecf`；原始檔未修改。
- Candidate233 候選產物：`amq_learning_tool_v82_85_47_candidate233_batch_api_centralization_20261024.html`，9,366,806 bytes，SHA-256 `ae1d4794c8c6c1ad64726c7736d9d01a6a68ea9a84f81d704c0696df62594f45`。
- 刪除四個全 HTML 零引用的私有 helper：`customListSongIds`、`currentPoolAnimeIds`、`renderListManagementSelector`、`startQuizCustomSelection`。
- 舊圖鑑看番、歌曲熟悉度與練習批次入口現在統一呼叫 `__aniBatchBusinessAPIv228`；不再在 UI handler 內直接重複修改資料。
- PASS：67/67 JS syntax、109 CSS blocks 0 parser errors、292/292 initial IDs unique、四個移除名稱零引用；受控 storage 下 9,516 部作品與 watch/song/list-add/weak-add/invalid/empty 操作測試通過；三個舊按鈕皆已確認走共享 API；0 pageerror、0 console error。
- BLOCKED：原生 file://／localhost／reload persistence 仍受 Chromium managed URLBlocklist 阻擋。NOT RUN：四工作區完整 E2E、真實音訊、live API、多人、osu!stable pixel diff。
- 舊圖鑑批次 markup 尚未刪除：仍有 watchlist selection、導覽定位、automation、scope summary 與 queueSelected 依賴。這是批次 3 的第一個子階段，不宣稱整個批次 3 完成。
- Candidate233 HTML 尚未上傳 GitHub，遠端 HTML SHA 未驗證；`git ls-remote` 因環境 DNS 無法解析 github.com 而失敗。詳細報告：`reports/candidate233-batch-api-centralization-20261024/STAGE_19_CANDIDATE233_BATCH_API_CENTRALIZATION.md`。

## Candidate234 待聽佇列納入正式批次 API（2026-10-24）
- Candidate233 基準：9,366,806 bytes，SHA-256 ae1d4794c8c6c1ad64726c7736d9d01a6a68ea9a84f81d704c0696df62594f45。
- Candidate234：9,368,097 bytes，SHA-256 16b387530b2dd9cd22d3e8aba5b23ef5fd276c1aecf87481c4c08d6b9d1d3641；回滾檔與 Candidate233 byte-identical。
- queueSelectedBtn 已改接正式批次 API applyQueue()，新增空選取、確認、歌曲去重、aniPlayQueue_v1 讀回驗證與儲存失敗回復。
- PASS：67 個可執行 JS 區塊語法、109 CSS 區塊解析、292 DOM ID 唯一、Node VM API 單元測試。
- BLOCKED：完整頁面 localStorage runtime；opaque origin 測試限制及 Chromium managed URLBlocklist 阻擋原生 file://／localhost。NOT RUN：原生 reload、音訊、線上 API、多人與像素比對。
- 舊 catalog batch UI 尚未刪除，因仍有選取、watchlist、導航及自動化依賴。HTML 本機產物未上傳 GitHub，遠端 HTML SHA 未驗證。
- 報告：reports/candidate234-queue-api-integration-20261024/STAGE_20_CANDIDATE234_QUEUE_API_INTEGRATION.md。


## Candidate235 工作區自動化改接（2026-10-24）
- Candidate234 基準：9,368,097 bytes，SHA-256 16b387530b2dd9cd22d3e8aba5b23ef5fd276c1aecf87481c4c08d6b9d1d3641。
- Candidate235：9,369,076 bytes，SHA-256 d2cb92a244197b254ac49920bb9b18f2c0649d8eb4060691b189d53ee1e2aaa4；回滾檔與 Candidate234 byte-identical。
- batch-tools 與選取／套用目標自動化改接正式可見作品批次工作區，不再定位舊 #quicktools 或舊套用按鈕；尚未移除舊批次 UI。
- PASS：67 個 JS 區塊語法、109 個 CSS 區塊解析、292 個 DOM ID 唯一、靜態選擇器斷言。
- NOT RUN：完整頁面 Playwright E2E。BLOCKED：原生 file://／localhost／reload，受 Chromium managed URLBlocklist 阻擋。音訊、線上 API、多人與像素比對 NOT RUN。
- GitHub 文件已提交並將讀回驗證；大型 HTML 尚未上傳，遠端 HTML SHA 未驗證。批次三仍未完成。
- 報告：reports/candidate235-workspace-automation-migration-20261024/STAGE_21_CANDIDATE235_WORKSPACE_AUTOMATION_MIGRATION.md。


## Candidate252 批次三舊批次介面刪除候選（2026-10-24）
- 本機最新候選：`amq_learning_tool_v82_85_66_candidate252_watchlist_scoped_work_batch_20261024.html`，9,355,704 bytes；SHA-256 `f210d987495aeb52ca11e958fe2ff9942c32457f054b81d792309c14e9fb78d1`。
- Candidate251 直接回滾檔：9,354,587 bytes；SHA-256 `4467de1ed6330c51929e783b662d95cd5ad6847dd12edb3a6fde8f49fb94849e`。
- 已真正移除舊 `#quicktools` 面板、舊選取／批次控制列、重複建立清單／待聽入口、舊事件處理器、初始化包裝器、範圍摘要 Observer 及其 CSS；必要操作改由正式作品批次工作區和匯入工作區承接。
- 從「我的清單」開啟作品批次時，工作範圍限制為目前看番清單顯示的作品；Candidate210 歌曲批次仍保持獨立。
- PASS：67 JS blocks syntax、109 CSS blocks parse、274 DOM IDs unique；舊控制項與 CSS 殘留引用為 0；Node VM bridge API 與靜態路由斷言 PASS。
- BLOCKED：Playwright／Chromium 完整頁面互動未取得有效結果；原生 file URL／reload 仍受 managed URLBlocklist 限制。NOT RUN：瀏覽器清單 CRUD、durable reload、真實音訊、即時 API、多人、像素比對。
- Candidate252 是本機候選，尚未驗收為正式基準；GitHub 分支目前只存報告／manifest／測試狀態，HTML 尚未上傳，遠端 HTML SHA 未驗證。
- 批次三仍未完成；不得開始批次四。報告：`reports/candidate252-batch3-legacy-panel-removal-20261024/STAGE_25_CANDIDATE252_BATCH3_LEGACY_PANEL_REMOVAL.md`。


## Candidate255 最後一組 quicktools 殘留引用清理（2026-10-24）
- Candidate254 重新掃描發現 batch-tools 自動化仍等待已刪除的 quicktools，Song Select 動態掛載清單也仍含 quicktools；Candidate255 已修正這兩處。
- Candidate255 本機候選：`amq_learning_tool_v82_85_69_candidate255_remove_last_quicktools_refs_20261024.html`，9,355,697 bytes；SHA-256 `bd620e42e677ddbc8d48cf84da5773f3a51e42978c20ecbaa07761e467a7630d`。
- Candidate254 回滾檔 SHA-256 `e7fa38897fcec376153b4a8a979ba3fe44775df8e8266a1e17f2d5ecc24934a9`。
- PASS：67 JS blocks syntax、109 CSS blocks parse、272 DOM IDs unique；16 個已刪除控制項／初始化／Observer 名稱的殘留引用均為 0；靜態斷言 PASS。
- BLOCKED：Playwright opaque-origin storage denial，兩個 page errors、1 個 console error；完整應用程式 runtime 不可視為 PASS。NOT RUN：完整工作區 E2E、CRUD／reload persistence、音訊／線上 API／多人／像素比對。
- Candidate255 HTML 尚未上傳 GitHub；遠端 SHA 未驗證。報告：`reports/candidate255-last-quicktools-reference-cleanup-20261024/STAGE_26_CANDIDATE255_LAST_QUICKTOOLS_REFERENCE_CLEANUP.md`。批次三仍未完成。


## Candidate255 批次三補充驗證（2026-10-24）
- 最新本機候選 Candidate255：9,355,697 bytes；SHA-256 `bd620e42e677ddbc8d48cf84da5773f3a51e42978c20ecbaa07761e467a7630d`。
- PASS：67 JS blocks、109 CSS blocks、272 unique DOM IDs、16 個已刪除舊 UI／控制項／Observer／初始化識別字零殘留引用。
- PASS：使用明確標示的測試用記憶體 storage shim 完成批次 UI 操作、16 種業務 API 動作、自訂清單 CRUD、看番範圍、獨立歌曲批次、匯入入口及路由切換。這不等於 durable persistence。
- PASS：篩選 5 案例（空搜尋 9516／顯示 60、大小寫不敏感標題 85、1999 年份 139、原名 513、無結果 0），所有顯示結果均符合查詢，無 page errors；未重現篩選程式錯誤，故沒有做無證據的篩選補丁。
- BLOCKED／NOT RUN：真實 reload 持久化、真實外部 API／音訊／多人／像素比對仍未完成；Chromium managed URLBlocklist 阻擋原生 file／localhost 測試。
- GitHub 報告與測試文件已更新並需讀回驗證；Candidate255 HTML 未上傳，遠端 SHA 未驗證。批次三未完成。


## Candidate255 工作線 A 靜態驗收（2026-10-24）
- Candidate255 HTML 未修改：9,355,697 bytes；SHA-256 `bd620e42e677ddbc8d48cf84da5773f3a51e42978c20ecbaa07761e467a7630d`。回滾 Candidate254 SHA-256 `e7fa38897fcec376153b4a8a979ba3fe44775df8e8266a1e17f2d5ecc24934a9`。
- PASS：16 個舊 UI／控制項／Observer／初始化識別字零殘留引用；67 JS 區塊語法、109 CSS 區塊解析、272 DOM ID 唯一；18 項 API／資料契約靜態斷言。
- PASS：篩選 UI 案例擴充至 9/9；既有記憶體 shim 的 16 種作品批次 API 動作、自訂清單 CRUD／篩選、路由切換測試 PASS。
- 作品／歌曲選取集合的程式碼所有權靜態檢查 PASS；直接跨面板互動測試逾時，標記 BLOCKED，不算 runtime PASS。
- BLOCKED／NOT RUN：原生 file／localhost、真實 reload 持久化、外部 API、音訊、多人、像素比對；HTML 遠端內容與 SHA 尚未驗證。
- Candidate255 仍是未驗收候選，批次三未完成。詳見 `reports/candidate255-workline-a-static-acceptance-20261024/STAGE_27_WORKLINE_A_STATIC_ACCEPTANCE.md`。

## Candidate255 原生瀏覽器驗收結果（2026-10-24）
- 使用者提供的實際瀏覽器報告：origin `http://127.0.0.1:18765`；5 PASS、0 FAIL、1 NOT RUN、0 BLOCKED。
- PASS：頁面初始化、原生 localStorage 讀寫、自訂清單建立、重新載入後以相同 ID/名稱確認持久化、透過 UI 刪除臨時清單。
- PASS（有限範圍）：工作區內容面板顯示切換、動畫匯入與 VNDB 入口存在。
- 必要更正：工作區內容面板測試期間，watchlist/dashboard/learningPlan 的請求仍回報 active view 為 catalog。原報告的 PASS 只支持內容面板切換，不支持正式路由切換；正式路由、返回及 DOM 清理仍 NOT RUN。
- NOT RUN：AniList/MAL 與 VNDB 真實 API 回應、解析、去重、錯誤恢復；Resource Timing 不作為 API 成功證據。
- Candidate255 本機 HTML：9,355,697 bytes；SHA-256 `bd620e42e677ddbc8d48cf84da5773f3a51e42978c20ecbaa07761e467a7630d`。
- GitHub 正式 HTML 尚未上傳；遠端版本與 SHA-256 尚未驗證。Batch 3 未完成。

## Candidate255 原生瀏覽器驗收替代路徑（歷史盤點）

## Candidate256 待驗收候選（2026-10-24）
- 原生瀏覽器已確認 Candidate255 自訂清單能在重新載入後保留，並已由介面刪除測試清單。
- Candidate256 修正歌曲批次面板開啟時清空選取的問題；SHA-256 `e5c65158ebee5ca69f051366a095e50f0d5f8992f5e89cef3209767adccc77d1`。
- 記憶體 shim 互動回歸 PASS；Candidate256 原生儲存與外部 API 尚未測試。
- 正式 HTML 尚未上傳與核對遠端 SHA-256。Batch 3 未完成。
