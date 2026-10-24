# 下一步：完成批次三持久化與遠端產物驗收

目前本機候選 Candidate255：`amq_learning_tool_v82_85_69_candidate255_remove_last_quicktools_refs_20261024.html`，9,355,697 bytes，SHA-256 `bd620e42e677ddbc8d48cf84da5773f3a51e42978c20ecbaa07761e467a7630d`。回滾 Candidate254 SHA-256 `e7fa38897fcec376153b4a8a979ba3fe44775df8e8266a1e17f2d5ecc24934a9`。

## 工作線 A 已完成的靜態工作
- PASS：67 個可執行 JS 區塊語法、109 CSS 區塊解析、272 DOM IDs 唯一。
- PASS：16 個已刪除舊 UI／控制項／Observer／初始化識別字零殘留引用。
- PASS：18 項批次 API、作品／歌曲選取程式碼所有權、自訂清單資料結構與失敗處理靜態契約。
- PASS：9/9 篩選 UI 測試；記憶體 shim 下 16 種批次 API 動作、自訂清單 CRUD／篩選、工作區路由測試。
- 限制：跨面板選取隔離的新增直接互動探測逾時，僅有靜態所有權 PASS；不得稱為 runtime PASS。所有 shim 測試不代表 durable persistence。

## 批次三剩餘工作
1. 取得允許持久化的測試 origin，實測自訂清單建立、加入、移除、篩選、改名、刪除與 reload 保存。
2. 在可用環境重做作品／歌曲跨面板選取隔離互動測試，並驗證四工作區反覆切換／返回及 DOM 清理。
3. 驗證 AniList/MAL 與 VNDB 實際 API 的錯誤處理、資料格式與去重。
4. 嘗試上傳 Candidate255 HTML，讀回遠端版本、大小與 SHA-256；目前仍未驗證。
5. 更新最終驗收報告。只有必要互動、持久化與遠端產物核對完成後，才通知批次三完成並等待批次四。

限制：Chromium managed URLBlocklist 阻擋 file://／localhost；不修改系統政策。不得把記憶體 shim 測試標成持久化 PASS。批次三未完成前不得開始批次四。
