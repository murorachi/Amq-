# AMQ Candidate342 Batch46：移除未使用的 v60 modes 常數

## 基準與產物
- 修改前候選：Candidate341
- 修改前 SHA-256：7abb6635b90254d666620953397c7d56f02e537bde997c523eb163203a15bd1a
- 新候選檔：amq_learning_tool_v82_86_53_candidate342_batch46_remove_unused_v60_modes_20261026.html
- 新候選大小：1,627,191 bytes
- 新候選 SHA-256：85651bff600de2a3441aab64fee8d38299872d47a0d76473691334f9aa0fb2fe
- 正式基準未變更：Candidate302

## 修改
- 只移除 v60-player-quiz-cleanup 內未被讀取的 modes 常數宣告。
- 修改前確認該腳本作用域內沒有任何 modes 識別字讀取；播放模式仍由既有 setMode() 等函式直接以字串判斷。
- 未修改其他程式碼、CSS、資料格式或初始化流程。

## 測試證據
- PASS：修改前後只移除指定宣告，輸出大小減少 111 bytes。
- PASS：目標腳本內 modes 識別字剩餘讀取數為 0，宣告已移除。
- PASS：65 個可執行 inline JavaScript 區塊均通過 node --check，0 個語法錯誤。JSON 資料 script 不當作 JavaScript 檢查。
- NOT RUN：完整功能回歸測試。
- BLOCKED：瀏覽器互動測試。先前環境對 file:// 與 localhost 測試頁均回傳 ERR_BLOCKED_BY_ADMINISTRATOR。
- NOT RUN：GitHub HTML 上傳與遠端 SHA-256 驗證。

## 風險與限制
這是靜態確認的死常數移除，未執行真實瀏覽器播放流程。本候選不代表正式驗收，也不取代 Candidate302 基準。

## 回滾
回到 Candidate341 原檔，SHA-256：7abb6635b90254d666620953397c7d56f02e537bde997c523eb163203a15bd1a。

## 下一項
繼續核對其他候選死代碼的完整函式邊界、呼叫者與條件。不得將 C94 整塊刪除、不得刪除仍有實際節點依賴的 updateQuizSource()，也不得在缺乏執行證據時移除 v33 的 showToast 呼叫。
