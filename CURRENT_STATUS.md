## Candidate224 後續工作順序修正：先處理阻塞，再跳過（2026-10-24）
- 已讀取 Chromium managed policy：`/etc/chromium/policies/managed/000_policy_merge.json` 中 `URLBlocklist` 為 `["*"]`；最小 `file://`、`data:` 頁面及 localhost 導覽都回報 `ERR_BLOCKED_BY_ADMINISTRATOR`。這是環境層阻擋，不是 AMQ 頁面錯誤。
- Candidate222 透過 Playwright `page.set_content()` + 測試用記憶體 storage shim 可在約 2.1 秒完成 DOMContentLoaded，`readyState=complete`，沒有 pageerror/console error。此測試不涵蓋原生 URL 導覽及持久化。
- 尚無證據可判定 AMQ 初始化本身卡死。先嘗試可行替代測試；若被政策阻擋，標記 BLOCKED 並繼續不依賴該環境的工作，最後再回頭處理。不得修改 managed policy 或把受限測試說成 PASS。
- 本階段沒有修改 HTML，Candidate222 仍為唯一程式基線：9,348,268 bytes，SHA-256 `39d9962c38ab928f51969237063230e8f77dc6f9416f8bf9691b12c48522c723`。
