# Stage 31 — Candidate258 可見的共用清單同步工作區

- 版本：v82.85.72-candidate258-visible-unified-import-workspace-20261024
- 產物：amq_learning_tool_v82_85_72_candidate258_visible_unified_import_workspace_20261024.html
- 大小：9,356,071 bytes
- SHA-256：82ce2b8d851cd2b0b9b7bd08c9ca648cd82d900f94a218ddfe7ab2499a449579
- 回滾：Candidate256，SHA-256 e5c65158ebee5ca69f051366a095e50f0d5f8992f5e89cef3209767adccc77d1

## 根因與修正
Candidate257 把新面板插入 `#amqWorkspaceSidebar`，但後續舊 CSS 對 Song Select 路由使用 `display:none!important` 隱藏該側欄；因此新 UI 存在於 DOM，卻不可見。Candidate258 移除這個錯誤的側欄掛載實作，改為由可見的 C99 左側入口與舊工作區入口共同開啟 `#amqWorkspaceContentPanel`，並將三個來源與六個操作直接渲染在 `#amqWorkspaceContentBody`。沒有用新增 `display:block!important` 覆蓋舊側欄隱藏規則。

## 測試
- PASS：67 個可執行 inline JS 區塊語法，0 錯誤。
- PASS：110 個 CSS 區塊解析，0 parser error。
- PASS：273 個 DOM ID，全部唯一。
- PASS：移除舊隱藏側欄面板、新共用面板掛載、六個來源操作、無 Token 欄位（靜態契約）。
- NOT RUN：原生瀏覽器點擊驗收、真實 API 匯入／去重／錯誤復原及刪除範圍。
- NOT VERIFIED：HTML 遠端上傳與 SHA-256。

Candidate258 是候選版本，不是正式基準；Candidate256 保留作回滾。其他左側工作區暫不修改。
