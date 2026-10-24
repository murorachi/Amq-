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
