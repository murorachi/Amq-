# AMQ Candidate349 Batch53：移除已確認未使用的函式

- 輸入 Candidate348: `amq_learning_tool_v82_86_59_candidate348_batch52_remove_unused_vn_navigation_helpers_20261026.html`
- 輸入大小 / SHA-256: 1622458 bytes / `5885731d9f73e788cba77a8ba6a24f4bdf057a646fca00c43fabbf818c29bf47`
- 輸出 Candidate349: `amq_learning_tool_v82_86_60_candidate349_batch53_remove_unused_title_helpers_20261026.html`
- 輸出大小 / SHA-256: 1621983 bytes / `bd0baf7450b857ca3a2fd6d3c449a2cb5c02877f0f2314dd52fd1db53535f017`
- 修改範圍: ani-chinese-title-system-v8237、ani-emq-chinese-titles-v8259
- 移除: `openccConverter`, `cacheRecord`
- 安全證據: 目標函式在所屬 script／文件範圍內只有宣告，沒有引用點或全域匯出。
- 保留: __aniOpenCCLoaderV1 共用載入器、recordFromVndb、fetchVndbBatch 與標題快取讀寫。
- 靜態驗收: **PASS**，只有指定 script body 改變；65 個 executable inline JS 區塊通過 `node --check`，0 語法錯誤。
- 瀏覽器互動: **BLOCKED**，先前環境對 `file://`／localhost 回傳 `ERR_BLOCKED_BY_ADMINISTRATOR`。
- 完整功能回歸: **NOT RUN**；不可將靜態 PASS 當成功能 PASS。
- 回滾: Candidate348，SHA-256 `5885731d9f73e788cba77a8ba6a24f4bdf057a646fca00c43fabbf818c29bf47`。
- 正式基準仍為 Candidate302；此候選未升格。
