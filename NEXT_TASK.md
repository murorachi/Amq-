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
