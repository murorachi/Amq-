# Candidate230：批次工作區執行驗收與舊功能依賴稽核

日期：2026-10-24

## 範圍與基準

- 程式檢查基準：Candidate229
- 檔案：`amq_learning_tool_v82_85_46_candidate229_workspace_result_handling_20261024.html`
- 大小：9,366,832 bytes
- SHA-256：`8d9c9c9fff823d3e333875aeb07ada9fd73976dd64d55e6cdc2c6471f06e0448`
- 本階段未修改 HTML，因此不建立假裝有程式差異的 Candidate230 HTML。Candidate229 保持唯一待驗收程式版本。

## 執行環境與實測結果

- PASS：以 Playwright `page.set_content()` 載入 Candidate229，標題為「AMQ學習工具」，`readyState=complete`，`__aniBatchBusinessAPIv228` 與 `__amqWorkBatchBridgeV227` 均存在。
- BLOCKED：本輪測試文件使用 opaque origin；即使在 `add_init_script` 中安裝記憶體型 `localStorage` shim，仍出現 `Failed to read the 'localStorage' property from 'Window': Access is denied for this document.`。因此本輪沒有把批次 API 的儲存操作、確認流程或可見 UI 結果回報列為 PASS。
- BLOCKED：原生 `file://`、`data:`、`http://127.0.0.1` 導覽仍受 Chromium managed policy `URLBlocklist: ["*"]` 阻擋。未修改政策。
- NOT RUN：音訊、即時 API、多人、像素比對、原生儲存重新載入驗收。

## 靜態依賴稽核

### 已確認仍有活躍依賴，不能整組刪除

1. `#quicktools` 與 `.quicktools`：不只是舊的重複入口。樣式明確將它放入 `#watchlistWork`，並有多段頁面樣式依賴；全域樣式也仍定義 `.quicktools` 及其子元素。
2. `#bulkPracticeAction`、`#bulkCustomList`、`#applyBulkPracticeAction`：舊圖鑑批次管理仍由 `addBulkControls()` 綁定事件；`applyBulkPracticeAction()` 直接使用 `selectedAnime`、清單選擇器及 `applyPracticeActionForIdsV228()`。這不是只有字串殘留。
3. `#applyBulkPracticeAction`：有其他工具透過 ID 尋找、定位及引導操作的引用；另有按鈕後的狀態刷新攔截器。刪除前必須逐一將這些呼叫改到明確的新 API 或確認其確實棄用。
4. 自訂清單選擇器會由 `syncListSelectors()` 更新，不能只移除一個 select 就假設資料清單功能仍完整。
5. VNDB 匯入、AniList/MAL 匯入與 Candidate210 歌曲批次必須保留。全文 `vndb` 計數無法區分設定欄位、資料鍵、匯入入口與批次入口。

### 本階段清理決策

- 保留：現有可見作品批次工作區、Candidate228 業務 API、Candidate210 歌曲批次、AniList/MAL 與 VNDB 匯入。
- 整合：舊圖鑑批次 handler 與可見工作區的結果回報，待執行時驗收完成後再收斂為單一正式入口。
- 刪除：本階段沒有任何候選程式被證明可安全刪除，因此沒有刪除 HTML/CSS/JS、listener 或 Observer。
- 待確認：舊圖鑑批次 UI 是否可整體移除、`#quicktools` 的 watchlist 顯示是否仍為正式功能、C99 導覽與自動化攔截器是否仍需要舊 ID。

## 下一步

1. 取得允許測試來源／持久化 storage 的核准瀏覽器環境，或找到不依賴 opaque-origin localStorage 的受控測試環境；不更改 managed policy。
2. 對可見作品批次 UI 測試確認接受／取消、301 部作品、所有看番狀態、歌曲熟悉度、所有 practice actions、缺少清單、空選取、寫入失敗、選取隔離、反覆開關面板及 listener/Observer 數量。
3. 逐一遷移仍依賴 `#applyBulkPracticeAction` 的自動化與刷新攔截器，再確認舊圖鑑批次 UI 可否完整刪除。
4. 只有在執行時測試證明沒有依賴後，才刪除對應 markup、listeners、observers 和 CSS。
5. 最後重試原生檔案開啟、持久化 reload、音訊及正式 HTML 遠端上傳／雜湊驗證。

## GitHub

本階段報告與狀態文件可提交為文件檢查點。Candidate229 HTML 尚未上傳，遠端 HTML SHA-256 未驗證。文件提交不能替代正式產物上傳。


## 追加靜態驗證（Candidate229 基準）

- PASS：69 個 script tags 中，67 個可執行 JavaScript 區塊全部通過 `node --check`；2 個非執行資料 payload（AniList JSON 與 gzip Base64）未當作程式解析。
- PASS：109 個 CSS 區塊，0 個 CSS parser error。
- 以上是語法／解析測試，不代表事件流程、資料持久化或原生瀏覽器使用者流程已通過。
