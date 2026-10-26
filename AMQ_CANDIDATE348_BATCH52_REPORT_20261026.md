# AMQ Candidate348 Batch52：移除已確認未使用的函式

- 輸入 Candidate347: `amq_learning_tool_v82_86_58_candidate347_batch51_remove_unused_emq_helpers_20261026.html`
- 輸入大小 / SHA-256: 1625144 bytes / `beb0526519ac0319a9830f73e84c9fc1655869366a41440944c9d8a1daba6ffa`
- 輸出 Candidate348: `amq_learning_tool_v82_86_59_candidate348_batch52_remove_unused_vn_navigation_helpers_20261026.html`
- 輸出大小 / SHA-256: 1622458 bytes / `5885731d9f73e788cba77a8ba6a24f4bdf057a646fca00c43fabbf818c29bf47`
- 修改範圍: v82-49-vn-library-navigation-script
- 移除: `addHomeGroups`, `saveMode`
- 安全證據: 目標函式在所屬 script／文件範圍內只有宣告，沒有引用點或全域匯出。
- 保留: showHomeGroups、openVnCatalog、openVnList、goTo 及現行路由／清單導覽。
- 靜態驗收: **PASS**，只有指定 script body 改變；65 個 executable inline JS 區塊通過 `node --check`，0 語法錯誤。
- 瀏覽器互動: **BLOCKED**，先前環境對 `file://`／localhost 回傳 `ERR_BLOCKED_BY_ADMINISTRATOR`。
- 完整功能回歸: **NOT RUN**；不可將靜態 PASS 當成功能 PASS。
- 回滾: Candidate347，SHA-256 `beb0526519ac0319a9830f73e84c9fc1655869366a41440944c9d8a1daba6ffa`。
- 正式基準仍為 Candidate302；此候選未升格。
