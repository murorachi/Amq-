# AMQ Candidate344 Batch48：移除未使用的 Quiz evaluator helper chain

## 基準與產物
- 輸入候選：Candidate343
- 輸入檔案：`amq_learning_tool_v82_86_54_candidate343_batch47_remove_orphan_candidate186_helper_20261026.html`
- 輸入大小：1,627,145 bytes
- 輸入 SHA-256：`fd9bf2536cf3aa73767c896040d460a742b3471a8cb3508133267f7c9508ee3f`
- 輸出候選：Candidate344
- 輸出檔案：`amq_learning_tool_v82_86_55_candidate344_batch48_remove_dead_quiz_evaluator_20261026.html`
- 輸出大小：1,625,750 bytes
- 輸出 SHA-256：`cf3860059b7987838cf0a61b63e943cd480202a01790f556794b62cac05dc1ac`
- 正式基準仍為 Candidate302；Candidate320 保持回滾檢查點。本版未升格。

## 修改前範圍與證據
1. **問題：** `v37-answer-and-layout-fixes` 保留一組舊答案評估 helper，但目前 Enter 提交路徑已透過 `window.__aniQuizSubmitV47` 執行提交。
2. **證據：** `evaluate` 在該 script 的識別字總共只出現一次，即宣告本身；沒有呼叫者。`aliasesForCurrent` 只在 `evaluate` 中使用；`clean` 只在兩個已無呼叫入口的 helper 中使用。
3. **修改範圍：** 移除同一段內的 `clean`、`aliasesForCurrent`、`evaluate` 三個局部 helper。
4. **必須保留：** Enter 鍵事件處理、建議答案選取、`__aniQuizSubmitV47` 提交橋接、答題鏡像、答題計數及題目事件處理。
5. **驗收與回滾：** 只允許 `v37-answer-and-layout-fixes` script body 改變；65 個可執行 inline JS 必須通過語法檢查；若有問題回滾 Candidate343。

## 實際修改
- 移除三個沒有活躍呼叫入口的局部 helper。
- 保留 Enter handler、建議選取、提交橋接及答題狀態事件。
- 靜態 diff 確認僅目標 script body 改變。

## 測試
- **PASS：** 輸入 Candidate343 SHA-256 與指定值一致。
- **PASS：** `evaluate` 僅有宣告，沒有呼叫者；`aliasesForCurrent` 與 `clean` 的引用全部位於被移除的 helper chain。
- **PASS：** 目標 script 仍包含 Enter handler、提交橋接、建議選取及題目事件處理。
- **PASS：** 只有 `v37-answer-and-layout-fixes` script body 改變。
- **PASS：** 65 個可執行 inline JavaScript 區塊通過 `node --check`，0 個語法錯誤。
- **BLOCKED：** 瀏覽器互動測試，環境先前對 file:// 與 localhost 回傳 `ERR_BLOCKED_BY_ADMINISTRATOR`。
- **NOT RUN：** 完整 Quiz / AMQ / EMQ / MIX 功能回歸。
- **NOT RUN：** Candidate344 HTML GitHub 上傳與遠端 SHA-256 讀回。

## 風險與保留
- 此次移除的是未被呼叫的局部 evaluator，不是正式提交 API。
- Quiz 提交及建議選取的真實互動仍未在瀏覽器驗收；不可將語法檢查視為功能驗收。
- C103、v47 hero、Candidate72 inline style、v33 `showToast` 仍需獨立證據，不在本批範圍。

## 回滾
回到 Candidate343：`amq_learning_tool_v82_86_54_candidate343_batch47_remove_orphan_candidate186_helper_20261026.html`，SHA-256 `fd9bf2536cf3aa73767c896040d460a742b3471a8cb3508133267f7c9508ee3f`。

## 下一步
繼續採用有界限的清理批次；若下一個候選沒有明確無呼叫者的程式碼，則不為了刪除量而冒險，轉入可執行的核心回歸或將執行時阻塞集中記錄。
