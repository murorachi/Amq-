# AMQ Candidate347 Batch51：移除已確認未使用的函式

- 輸入 Candidate346: `amq_learning_tool_v82_86_57_candidate346_batch50_remove_orphaned_local_helpers_20261026.html`
- 輸入大小 / SHA-256: 1625225 bytes / `dfef81df1572219d2b96b5f8eeeb50696acfe99a0fced53b6c83371f930c99ca`
- 輸出 Candidate347: `amq_learning_tool_v82_86_58_candidate347_batch51_remove_unused_emq_helpers_20261026.html`
- 輸出大小 / SHA-256: 1625144 bytes / `beb0526519ac0319a9830f73e84c9fc1655869366a41440944c9d8a1daba6ffa`
- 修改範圍: v82-54-emq-audio-lists-batch
- 移除: `emqReady`, `escapeText`
- 安全證據: 目標函式在所屬 script／文件範圍內只有宣告，沒有引用點或全域匯出。
- 保留: EMQ API 取得、清單儲存、批次選擇器刷新及其餘清單管理邏輯。
- 靜態驗收: **PASS**，只有指定 script body 改變；65 個 executable inline JS 區塊通過 `node --check`，0 語法錯誤。
- 瀏覽器互動: **BLOCKED**，先前環境對 `file://`／localhost 回傳 `ERR_BLOCKED_BY_ADMINISTRATOR`。
- 完整功能回歸: **NOT RUN**；不可將靜態 PASS 當成功能 PASS。
- 回滾: Candidate346，SHA-256 `dfef81df1572219d2b96b5f8eeeb50696acfe99a0fced53b6c83371f930c99ca`。
- 正式基準仍為 Candidate302；此候選未升格。
