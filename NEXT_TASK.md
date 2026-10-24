# 下一步工作：先處理卡住／測試導覽阻擋

## P0：先確認阻塞原因，不要先清理功能
1. 已確認執行環境的 Chromium managed policy 設定 `URLBlocklist: ["*"]`，連最小的 `file://`、`data:` 頁面與 `http://127.0.0.1` 都回報 `ERR_BLOCKED_BY_ADMINISTRATOR`。這是執行環境政策，不是 AMQ HTML 的載入錯誤。
2. 不要嘗試修改系統政策或把政策阻擋偽裝成應用程式測試成功。先嘗試不需要 URL 導覽的替代測試方式；若仍無法覆蓋某項測試，標記 BLOCKED，跳過並繼續其他工作，最後再回頭處理環境問題。
3. Candidate222 透過 Playwright `page.set_content()` 載入並注入記憶體型 storage shim，可在約 2.1 秒完成 DOMContentLoaded；初始頁面 readyState 為 complete，沒有 pageerror 或 console error。這只能驗證 DOM/JS 初始化，不等於原生檔案開啟或持久化測試。
4. 目前仍沒有證據證明 AMQ 初始化本身會卡死。不可把 Chromium 的管理政策錯誤歸因於產品程式。

## P1：在可用的替代環境繼續主要工作
- 基線固定為 Candidate222，9,348,268 bytes，SHA-256 `39d9962c38ab928f51969237063230e8f77dc6f9416f8bf9691b12c48522c723`。
- 先使用 set_content + 測試用記憶體 storage shim 驗證可測的 UI/事件路徑；每個測試清楚標示限制。
- 優先修正可見 Song Select 入口與批次工具可達性；不要先刪除未驗證的業務邏輯。
- 對持久化 reload、原生 file://、真實音訊等依賴瀏覽器導覽的案例，若無法繞過環境政策，先標 BLOCKED，於最後的環境修復階段重試。

## P2：最後回頭處理
- 取得允許本機 URL 導覽的 browser runtime，或在允許的測試環境執行原生 file://／localhost 驗收。
- 重跑持久化、重新載入、音訊、API 與完整使用者流程；不可用記憶體 shim 代替。
- 完成後再做最後的舊功能刪除與遠端正式 HTML 上傳驗證。


## P1：下一步，先釐清批次選取資料契約
1. 固定 Candidate222 為唯一 HTML 基線，先核對本機 SHA-256；不得改用未確認的遠端 HTML。
2. 追查 C99 選歌卡片的作品 ID、歌曲 ID、選取狀態，與 Candidate210 歌曲批次控制器的資料契約。
3. 明確分離「作品批次」的作品 ID 集合與「歌曲批次」的歌曲 ID 集合；不得直接共用 Set 或把歌曲操作錯套到作品。
4. 將作品批次 UI 整合到可見的 C99／清單管理容器，重用既有業務 API；歌曲批次繼續由 Candidate210 唯一控制器管理。
5. 先在 page.set_content + 記憶體 storage shim 實測可見入口、選取／取消、篩選後選取狀態、套用結果與資料粒度隔離。若 API／狀態契約仍不明，繼續追查，不做猜測性 UI。
6. 通過替代測試後才移除已證明無用的隱藏入口、監聽器、CSS 和舊 UI；每次修改產生獨立版本及回滾檔。
7. 最後重試原生 file://、持久化 reload、真實音訊、API 與完整流程；若 URLBlocklist 仍阻擋，保留 BLOCKED 狀態並回報。


## P1：下一步，作品批次整理可達性與資料契約
1. Candidate226 僅修正歌曲批次入口標籤，作品批次仍未完成；不可將此階段視為整體批次管理驗收。
2. 以 Candidate226 本機 HTML 為待測候選，先重算 SHA-256，再確認 C99 Song Select 卡片／歌曲列的作品 ID、歌曲 ID 和選取狀態。
3. 為作品批次明確定義作品 ID 集合；歌曲批次維持 Candidate210 歌曲 ID Set。作品清單加入／移除的影響範圍要清楚告知使用者，不得把歌曲層操作直接套用作品層。
4. 追查 `#quicktools` 的實際控制器、`selectedAnime`、`applyBulkPracticeAction()` 及清單／弱點／黑名單／SRS 資料契約，設計最小可見入口並重用既有正式 API。
5. 先做可見入口與選取範圍整合，再測篩選、選取持續性、每種操作資料隔離。只有通過後才刪除隱藏的重複入口／監聽器／CSS。
6. 最後重試原生 file://、持久化 reload、真實音訊與 API；URLBlocklist 若仍阻擋，標記 BLOCKED，不得用 shim 冒充。


## P1：Candidate227 作品批次完整回歸與舊 UI 清理前置
1. 先以本機 Candidate227 重算 SHA-256；保持 Candidate226 回滾檔不變。
2. 在記憶體 shim 下黑名單加入／解除與 SRS 加入已在記憶體 shim 下 PASS；接著補齊看番狀態所有分支、選取超過 300 部的確認／取消流程與無選取／無清單的安全失敗測試。
3. 驗證工作面板重複開啟／關閉、搜尋後選取保持、切換歌曲批次後作品選取不串用，且不存在重複 click listener 或 MutationObserver 增長。
4. 檢查自訂清單管理與匯入面板是否仍能正常開啟，確認批次操作只寫入對應既有資料鍵。
5. 通過回歸後才刪除已確認不再需要的隱藏作品批次入口／重複 UI、監聽器與 CSS；不要只加 display:none。
6. 最後重試原生 file://、持久化 reload、真實音訊與 API；URLBlocklist 若仍阻擋則保留 BLOCKED。
7. 嘗試上傳正式單檔 HTML 並驗證遠端 SHA-256；目前已知 GitHub 文字檔操作不代表大型 HTML 已上傳。


## P1: Candidate228 direct batch API extraction (2026-10-24)
1. Use local Candidate227 as parent and re-verify SHA-256 before editing; keep Candidate226 rollback untouched.
2. Extract explicit operations for work watch status, song familiarity and practice actions. APIs must accept IDs/action/status/list ID, return explicit success/cancel/invalid-input/storage-failure results, and not depend on hidden DOM controls.
3. Move Candidate227 bridge to direct APIs; preserve separate work-ID and song-ID selection Sets and existing storage schemas.
4. Test all watch statuses, all practice actions, empty selection, missing list, confirmation accept/cancel, persistence failure and selection isolation in a valid test storage context.
5. Only then remove old quicktools controls, listeners, observers and CSS whose references are demonstrably eliminated. Do not merely hide them.
6. Retry native file URL and reload persistence at the end; if managed URLBlocklist still blocks, keep BLOCKED status.
7. GitHub docs branch currently does not contain Candidate227 HTML. Do not claim remote artifact upload/hash verification.


## P1: Candidate229 workspace result handling and legacy batch cleanup (2026-10-24)
1. Use local Candidate228 as parent; recheck SHA-256 `9d696a307d4e02ef8270da41936920f1b26d9eca9a70b230a1088de4f8466f22`. Keep Candidate227 rollback unchanged.
2. Update visible workspace action handlers to consume structured API results and report success, cancellation, invalid input and storage failure truthfully; avoid optimistic success messages.
3. Audit every remaining caller of legacy quicktools IDs and the exact C99 wrappers/interceptors. Separate actual runtime callers from literal-string counts.
4. Test accepted/cancelled confirmation paths, >300 work selection, every practice action, custom-list persistence failures, selection isolation, repeated panel open/close and listener/observer stability.
5. Remove old markup/listeners/observers/CSS only when runtime and caller evidence proves they are unreachable; preserve AniList/MAL import and Candidate210 song-batch ownership.
6. Retry native `file://`, durable reload and audio at the end; managed URLBlocklist currently blocks native navigation.
7. GitHub branch currently contains documentation only. Do not claim Candidate228 HTML upload or remote SHA verification.


## P1: Candidate230 batch workspace runtime acceptance and dependency audit (2026-10-24)
1. Re-verify Candidate229 local artifact SHA-256 `8d9c9c9fff823d3e333875aeb07ada9fd73976dd64d55e6cdc2c6471f06e0448`; keep Candidate228 rollback byte-identical and untouched.
2. Resolve the approved browser test-origin/storage limitation without changing managed Chromium policy. Re-run the visible workspace UI through the real result handler; if unavailable, mark runtime acceptance BLOCKED and do not claim PASS.
3. Exercise confirmation accept/cancel, >300 work selection, each watch status, song familiarity, all practice actions, missing list, empty selection, storage failure, selection isolation and repeated open/close.
4. Audit actual callers/wrappers of `#quicktools`, `bulkPracticeAction`, `bulkCustomList`, `applyBulkPracticeAction`, C99 import/VNDB/work-batch entry points, listeners and observers. Source-string counts alone are not deletion evidence.
5. Remove legacy markup/listeners/observers/CSS only after the call graph and runtime tests prove no required path depends on them. Preserve AniList/MAL import and Candidate210 song-batch ownership.
6. Retry native `file://`, durable reload and audio at the end; current managed URLBlocklist blocks navigation. Record BLOCKED if unchanged.
7. GitHub Candidate229 branch currently has docs only. Do not claim HTML upload or remote SHA verification.
