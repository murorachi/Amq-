# Candidate257：統一公開清單匯入 UI 試點

- Candidate257：amq_learning_tool_v82_85_71_candidate257_unified_public_list_import_ui_20261024.html
- Bytes：9,356,282
- SHA-256：4769f24b643f3a044e75795b36222dfa3e7681232d0d93db4300b09e475acb6a
- 回滾：Candidate256，SHA-256 e5c65158ebee5ca69f051366a095e50f0d5f8992f5e89cef3209767adccc77d1

## 修改
- 左側工作區的 AniList、MyAnimeList、VNDB 改為同一個清單同步面板。
- 每個來源各有「匯入公開清單」及「移除本機清單」兩個主要操作，共六個按鈕。
- 試點面板不顯示 Token 欄位，AniList 純數字 ID 會被拒絕。
- 沿用既有匯入與移除處理，不新增儲存鍵／資料 schema。

## 測試
- PASS：67 個 inline JS 區塊語法、109 個 CSS 區塊解析、272 個 DOM ID 無重複。
- PASS：隔離 UI／事件接線測試；三個來源、六個按鈕、無 Token 欄位、輸入驗證、匯入／移除橋接、0 pageerror。
- BLOCKED：完整頁面 Playwright 測試超時／瀏覽器管線中斷。
- NOT RUN：Candidate257 原生瀏覽器 reload、真實 API 成功解析／去重／錯誤復原。
- NOT VERIFIED：HTML 上傳與遠端 SHA-256。

Candidate257 僅為試點，尚未接受為正式基準；其他左側功能暫不修改。