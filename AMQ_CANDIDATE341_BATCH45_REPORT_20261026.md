# Candidate341 Batch45 工作區點擊事件整併報告

- 輸入版本：Candidate340 Batch44
- 輸入 SHA-256：`74e3d7eb0287cb04dcad0caf08d3d640abb32e21faa6fcc3be00e93a1438f158`
- 輸出版本：Candidate341 Batch45
- 輸出檔案：`amq_learning_tool_v82_86_52_candidate341_batch45_workspace_click_owner_20261026.html`
- 輸出 SHA-256：`7abb6635b90254d666620953397c7d56f02e537bde997c523eb163203a15bd1a`
- 輸出大小：1,627,302 bytes

## 修改
1. 移除 Candidate76 對 `#amqWorkspaceDock [data-ws]` 的 capture-phase click 攔截。
2. 在 Prototype15 加入單一 delegated bubbling click owner，透過既有 `__amqWorkspaceSidebarOpen/Close` API 更新狀態與幾何。
3. 保留 `[data-ws-action]` 獨立事件路由及 Candidate76 的幾何/狀態 API。
4. Candidate70 與 Candidate77 在 Candidate340 中已沒有指定的 `[data-ws]`／document click 攔截，故不做無效刪除。
5. 保留 Candidate94 的 `#grid .card.amqListNotMember85` 正式 CSS 規則。Candidate84 CSS 尚未降級：本批只完成事件所有權，不在未完成選擇器依賴盤點前停用整段樣式。

## 驗證
- PASS：Candidate340 輸入 SHA-256 已核對。
- PASS：Candidate76 不再攔截 `[data-ws]` click。
- PASS：Prototype15 成為 `[data-ws]` delegated click owner。
- PASS：`[data-ws-action]` 路由保留獨立。
- PASS：Candidate76 sidebar state/geometry API 保留。
- PASS：Candidate94 membership CSS 保留。
- PASS：Candidate70 與 Candidate77 在本版已沒有指定的重複攔截。
- PASS：9/9 靜態所有權斷言。
- PASS：65 個 inline JavaScript 區塊通過 `node --check`，0 個語法錯誤。
- PASS：交付 ZIP 完整性檢查。
- NOT RUN：真實瀏覽器操作、Song Select/一般工作區點擊與鍵盤回歸。
- NOT RUN：正式 HTML 上傳及遠端 SHA-256 驗證。

## 風險與回滾
- Candidate341 為候選版，未提升為正式基準。
- 回滾到 Candidate340：`amq_learning_tool_v82_86_51_candidate340_batch44_unified_workspace_sidebar_20261026.html`，SHA-256 `74e3d7eb0287cb04dcad0caf08d3d640abb32e21faa6fcc3be00e93a1438f158`。
- 原始 HTML 結尾未以 `</html>` 收尾；本批未擅自修補此既存格式問題。
