# 下一步：完成批次三持久化與遠端產物驗收

最新本機候選：Candidate255，`amq_learning_tool_v82_85_69_candidate255_remove_last_quicktools_refs_20261024.html`，9,355,697 bytes，SHA-256 `bd620e42e677ddbc8d48cf84da5773f3a51e42978c20ecbaa07761e467a7630d`。回滾 Candidate254 SHA-256 `e7fa38897fcec376153b4a8a979ba3fe44775df8e8266a1e17f2d5ecc24934a9`。

## 已通過
- 67 JavaScript 區塊語法、109 CSS 區塊解析、272 DOM IDs 唯一。
- 16 個已刪除舊 UI／控制項／Observer／初始化識別字零殘留引用。
- Playwright 測試用記憶體 storage shim 下的批次 UI、16 種批次 API 動作、自訂清單 CRUD、看番範圍、獨立歌曲批次、匯入入口、路由切換。
- 篩選 5 案例：空搜尋、大小寫不敏感標題、年份 1999、原名、無匹配結果；所有可見結果均符合查詢。未重現篩選 bug，暫不修改篩選程式碼。

## 批次三剩餘項目
1. 在允許持久化的瀏覽器 origin 實測自訂清單建立、加入、移除、篩選、改名、刪除與 reload 保存。
2. 在同一環境重複驗證首頁初始化與四工作區切換／返回。
3. 驗證真實 AniList/MAL 與 VNDB API 的錯誤處理、資料格式及去重。
4. 嘗試上傳 Candidate255 HTML，讀回遠端版本、大小與 SHA-256。
5. 更新最終驗收報告。只有必要互動、持久化與遠端產物核對完成後，才通知批次三完成並等待批次四。

限制：Chromium managed URLBlocklist 阻擋 file://／localhost；不修改系統政策。測試用 storage shim 不得標成持久化 PASS。
