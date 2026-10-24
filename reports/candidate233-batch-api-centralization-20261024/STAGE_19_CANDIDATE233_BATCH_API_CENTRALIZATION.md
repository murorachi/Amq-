# Stage 19 — Candidate233 批次 API 集中化與死函式清理

日期：2026-10-24
狀態：批次 3 的第一個可驗收子階段；不代表整個批次 3 已完成。

## 基準與產物

- 使用者確認的起始基準：Candidate231
- 起始檔：`amq_learning_tool_v82_85_46_candidate231_work_batch_entry_integration_20261024.html`
- 起始大小：9,367,325 bytes
- 起始 SHA-256：`74607e5344e0b993fb1e8d40c081285287071c236c9c92bac86cac98c5c9fecf`
- 新候選版本：`v82.85.47-candidate233-batch-api-centralization-20261024`
- 產物：`amq_learning_tool_v82_85_47_candidate233_batch_api_centralization_20261024.html`
- 產物大小：9,366,806 bytes
- 產物 SHA-256：`ae1d4794c8c6c1ad64726c7736d9d01a6a68ea9a84f81d704c0696df62594f45`
- 回滾檔：`amq_learning_tool_v82_85_46_candidate231_rollback_before_candidate233_20261024.html`
- 回滾檔 SHA-256：與起始 Candidate231 完全一致。

## 實際修改

### 1. 刪除四個無呼叫者的私有 helper

全 HTML 精確字串掃描確認下列名稱各只有定義一次，沒有其他呼叫點或動態引用：

- `customListSongIds(listId)`
- `currentPoolAnimeIds()`
- `renderListManagementSelector()`
- `startQuizCustomSelection(selectedListId)`

已移除定義，未移除它們所依賴的資料層、清單管理、猜歌候選範圍或其他公開 API。

### 2. 統一舊圖鑑批次按鈕的業務入口

- `applyBulkWatchBtn` 現在呼叫 `window.__aniBatchBusinessAPIv228.applyWatch(...)`，不再直接逐筆呼叫 `setWatchStatus`。
- `applyBulkSongBtn` 現在呼叫 `window.__aniBatchBusinessAPIv228.applySong(...)`，不再在按鈕 handler 內重複執行熟悉度資料修改、儲存與刷新。
- `applyBulkPracticeAction()` 現在呼叫 `window.__aniBatchBusinessAPIv228.applyPractice(...)`，不再繞過公開業務 API 直接呼叫內部 helper。
- 保留原有選取方式、按鈕、確認流程、狀態提示及資料鍵。若 API 未初始化，操作會停止並提示，不會退回另一套直接修改資料的實作。

這項修改是入口集中化，不是資料 schema 改動。公開 API 仍使用既有的內部業務函式作為唯一實作。

## 未修改／刻意保留

- 沒有刪除 `#quicktools` 或舊圖鑑批次介面。
- 沒有刪除 `#bulkPracticeAction`、`#bulkCustomList`、`#applyBulkPracticeAction`。
- 沒有刪除 `selectedAnime`／`selectionMode`。它們仍被 Song Select 工作區 bridge 與 watchlist 批次選取增強程式使用。
- 沒有刪除 `syncListSelectors()`；它仍更新自訂清單選擇器、猜歌清單篩選及設定同步。
- 沒有修改 CSS、儲存鍵、資料格式、匯入器、Candidate210 歌曲批次功能或工作區路由。

舊圖鑑介面尚未能安全移除，因為其他 runtime 仍會定位舊 ID、讀取 `selectionHint`／`batchScopeSummaryV844`、切換 watchlist 與 catalog 選取模式，並用舊按鈕做導覽定位。直接刪除會破壞現有行為。後續必須先遷移這些 caller，再移除 markup、事件、樣式及其觀察器。

## 測試結果

- PASS：67 個可執行 inline JavaScript 區塊全部通過 `node --check`。
- PASS：109 個 CSS blocks，stylesheet/declaration parser errors 為 0。
- PASS：初始 DOM 292 個 ID，292 個唯一值。
- PASS：四個移除 helper 在完整 HTML 中剩餘引用數皆為 0。
- PASS：受控記憶體儲存下，實際載入 9,516 部作品；`applyWatch`、`applySong`、`applyPractice(list-add)`、`applyPractice(weak-add)` 及空選取／無效狀態防護測試通過。
- PASS：實際點擊三個舊圖鑑批次按鈕，確認它們分別呼叫 `applyWatch`、`applySong`、`applyPractice`；空選取與模擬看番儲存失敗均顯示正確訊息；未捕捉頁面錯誤 0、console error 0。
- PASS：Candidate231 原始檔未修改；回滾檔與來源 byte-identical。
- BLOCKED：原生 `file://`、localhost 與重新載入持久化仍受 Chromium managed URLBlocklist 阻擋。本次受控儲存測試不代表真實持久化驗收。
- NOT RUN：四工作區完整切換、真實音訊、live API、多人、固定 osu!stable 像素差異。

## 風險與下一步

1. 這一階段尚未移除舊圖鑑批次 markup；只能稱為「業務入口集中化＋四個死 helper 刪除」。
2. 下一個最小安全步驟是盤點 Candidate231 中所有 `selectionHint`、`batchScopeSummaryV844`、`selectModeBtn`、`selectVisibleBtn`、`selectFilteredBtn`、`clearSelectionBtn`、`applyBulkWatchBtn`、`applyBulkSongBtn`、`queueSelectedBtn` 及批次導覽動作的讀寫者。
3. 將必要操作遷移到正式作品批次工作區。`queueSelectedBtn` 是目前可見工作區尚未承接的獨特能力，必須先遷移或明確保留入口。
4. 只有在所有 caller 已遷移且回歸測試通過後，才刪除舊 markup、listener、CSS、observer 與過時測試。
5. Candidate233 是候選產物，尚未替代使用者認可的基準，也尚未上傳 GitHub；遠端 HTML SHA-256 未驗證。
