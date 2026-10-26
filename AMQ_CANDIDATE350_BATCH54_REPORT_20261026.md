# AMQ Candidate350 Batch54：移除已確認未使用的函式

- 輸入 Candidate349: `amq_learning_tool_v82_86_60_candidate349_batch53_remove_unused_title_helpers_20261026.html`
- 輸入大小 / SHA-256: 1621983 bytes / `bd0baf7450b857ca3a2fd6d3c449a2cb5c02877f0f2314dd52fd1db53535f017`
- 輸出 Candidate350: `amq_learning_tool_v82_86_61_candidate350_batch54_remove_orphan_action_helpers_20261026.html`
- 輸出大小 / SHA-256: 1620982 bytes / `ef575a167bae104b254d05e6a37b891cffb4aedd1c08ab5c8c13e19a9f4f857e`
- 修改範圍: v77-interval-repetition、v82-34-multiplayer-ui、v82-45-scene-background-settings
- 移除: `showActionPrompt`, `saveConfigAndStart`, `currentDetailOpen`
- 安全證據: 目標函式在所屬 script／文件範圍內只有宣告，沒有引用點或全域匯出。
- 保留: showRatingPanel、leaveRoom、openDb 與其餘事件／資料處理流程。
- 靜態驗收: **PASS**，只有指定 script body 改變；65 個 executable inline JS 區塊通過 `node --check`，0 語法錯誤。
- 瀏覽器互動: **BLOCKED**，先前環境對 `file://`／localhost 回傳 `ERR_BLOCKED_BY_ADMINISTRATOR`。
- 完整功能回歸: **NOT RUN**；不可將靜態 PASS 當成功能 PASS。
- 回滾: Candidate349，SHA-256 `bd0baf7450b857ca3a2fd6d3c449a2cb5c02877f0f2314dd52fd1db53535f017`。
- 正式基準仍為 Candidate302；此候選未升格。
