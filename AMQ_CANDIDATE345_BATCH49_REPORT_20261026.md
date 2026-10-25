# AMQ Candidate345 Batch49：移除三個未使用的 Quiz 局部綁定

## 基準與產物
- 輸入候選 Candidate344，SHA-256 `cf3860059b7987838cf0a61b63e943cd480202a01790f556794b62cac05dc1ac`.
- 輸出候選 Candidate345：`amq_learning_tool_v82_86_56_candidate345_batch49_remove_unused_quiz_bindings_20261026.html`
- 大小：1,625,630 bytes
- SHA-256：`de4b96d355763015e747b72d25f3feabd40e6b2edfec69d2a4a19469bd9414f3`
- Candidate302 仍為正式基準；Candidate320 回滾檢查點未修改。

## 實際修改
- `v36-quiz-fixes`：移除只宣告未讀取的 `input=$('quizAnswer')`，保留 suggestions click handler。
- `v39-enter-and-avatar-fix`：移除只宣告未讀取的 `box`。
- `v40-buffer-setting-and-avatar-alignment`：移除只宣告未讀取的 `settingsBody`。
- 只改變上述三個 script body；答題輸入、建議選取、設定讀寫與其他流程保留。

## 驗證
- PASS：Candidate344 父版本 SHA-256 核對。
- PASS：三個 binding 在各自 script 內均只有宣告一次。
- PASS：只改變三個指定 script body，必要 handler / storage path 保留。
- PASS：65 個可執行 inline JavaScript 區塊通過 `node --check`，0 個語法錯誤。
- PASS：交付 ZIP 完整性檢查。
- BLOCKED：瀏覽器互動測試，環境先前對 file:// 與 localhost 回傳 `ERR_BLOCKED_BY_ADMINISTRATOR`。
- NOT RUN：完整 Quiz / AMQ / EMQ / MIX 回歸。
- NOT RUN：Candidate345 HTML 上傳與遠端 SHA-256 讀回。

## 回滾
Candidate344，SHA-256 `cf3860059b7987838cf0a61b63e943cd480202a01790f556794b62cac05dc1ac`.
