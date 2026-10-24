# Stage 08：移除不可達的作品清單橋接層

日期：2026-10-24

## 基準與產物
- 父版本 Candidate221：9,353,751 bytes；SHA-256 `77a754fce6117153063d7f00f44640c88f553a6893b78804f4b3573e162749f5`。
- 本階段 Candidate222：`amq_learning_tool_v82_85_46_candidate222_unreachable_batch_bridge_cleanup_20261024.html`；9,348,268 bytes；SHA-256 `39d9962c38ab928f51969237063230e8f77dc6f9416f8bf9691b12c48522c723`。
- 回滾版本 Candidate221：9,353,751 bytes；SHA-256 `77a754fce6117153063d7f00f44640c88f553a6893b78804f4b3573e162749f5`，本機副本與父版本 byte-identical。

## 根因與依賴判定
`wsBatchListAdder` 的顯示函式只在 `#wsTitle` 文字包含「批次整理」時顯示面板。但正式工作區標題定義只有「清單管理」、「學習中心」、「猜歌練習」、「多人模式」，沒有任何正式工作區會符合此條件。作品批次入口實際上直接導向 `#quicktools`，歌曲批次入口則直接呼叫 Candidate210 `window.__amqCandidate210OpenBatchWorkspace`。因此這個橋接 UI 無正式可達狀態，其清單同步器、兩個按鈕 handler、標題 MutationObserver、清單 MutationObserver 與導航更新 listener 都只服務於不可達面板。

## 實際修改
- 刪除 `#wsBatchListAdder` 及其內部目標清單選擇器、加入／移除按鈕與提示文案。
- 刪除 `syncBatchListTarget`、`updateBatchListPanel`、`prepareBatchListAction` 及其專屬 observers/listeners。
- 移除只服務上述橋接 UI 的 CSS selector；保留共用工作區焦點樣式、響應式樣式、`#wsBatchScope` 和選取範圍 observer。
- 保留作品批次入口與 `#quicktools` / `applyBulkPracticeAction`。
- 保留歌曲批次入口與 Candidate210 唯一歌曲層級批次 runtime。
- 保留 VNDB 動作，不改資料鍵、儲存格式或業務邏輯。
- 源 Candidate221 未修改，並保存 byte-identical rollback。

## 測試結果
- PASS：65 個可執行 inline JavaScript 區塊通過 `node --check`；2 個大型資料/payload 區塊依既有策略排除。
- PASS：108 個 CSS blocks 解析，stylesheet/declaration parser errors = 0。
- PASS：10 項靜態斷言通過：橋接 markup/runtime/CSS 專屬引用已清除；作品與歌曲批次入口仍存在；既有 quicktools、批次處理器、選取範圍摘要、VNDB handler、工作區 shell 及 scope observer 均保留；沒有新增儲存鍵。
- NOT RUN：完整瀏覽器點擊與 DOM 生命週期驗收。本執行環境沒有可用 Chromium binary；本階段沒有把靜態檢查冒充互動測試。
- NOT RUN：原生 `file://` 啟動、持久化重載、真實音訊、外部 API、多人完整生命週期及 osu!stable 像素比對。

## 未解風險
- 尚未以可用瀏覽器實測作品批次入口的完整選取／套用流程，也未實測歌曲批次與作品批次互不干擾。
- GitHub 只提交階段文件；目前 connector 沒有可直接從本機路徑上傳 9 MB HTML 的動作。因此遠端 HTML 上傳、讀回與 SHA-256 驗證仍 BLOCKED。

## 回滾
以 Candidate221 回滾檔恢復橋接層；回滾檔 SHA-256 必須是 `77a754fce6117153063d7f00f44640c88f553a6893b78804f4b3573e162749f5`。

## 下一項最高價值工作
在具備 Chromium 的環境完成清單管理 → 作品批次整理、清單管理 → 歌曲批次整理兩條真實互動流程；驗證選取狀態、明確套用、資料持久化與切換後無殘留。之後再盤點舊 quicktools 的每一個 control、handler、observer 與 CSS，按依賴證據逐項整合或刪除。