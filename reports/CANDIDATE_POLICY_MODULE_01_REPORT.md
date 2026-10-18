# V82.68 CANDIDATE-POLICY-MODULE-01：低風險純政策模組抽離

日期：2026-10-18（Asia/Taipei）
狀態：**程式碼與建置測試通過；受限瀏覽器 smoke 本次逾時，端到端驗收仍為 PARTIAL。**

## 基準與範圍

- 不可覆寫的 V82.65 HTML 基準：8,786,930 bytes，SHA-256 `abd202a6f96cc08e0969ad05ab8574cc71001733d655bcb5cff6b1a1a5b33a33`。
- 工作來源：V82.67 `BROWSER-UI-SMOKE-08` 檢查點。
- 本階段只抽離候選題池的純政策程式碼；不重寫候選池、不改 UI、資料、storage schema、音訊或多人協議。

## 修改

1. 新增 `src/modules/candidate_pool_policy.js`，收納原先位於 `script_004.htmlpart` 的候選政策區塊。
2. `script_004.htmlpart` 使用單一 source marker；建置器在原本的同一個 classic `<script>`、原始執行位置注入模組 bytes。沒有新增 runtime script tag、ES module、外部載入或非同步執行。
3. `tools/build.py` 對 module marker、長度與 SHA-256 驗證，並將預設產物改為新的唯一名稱 `dist/amq_learning_tool_v82_68.html`。
4. `tools/verify.py` 增加 module count、module hash 與 marker 斷言。
5. 純政策、候選池整合、EMQ API 與歷史隔離測試改為讀取抽離後的政策來源；候選池整合仍直接執行原始 `getQuizPool` 函式。
6. 新增 `reports/MODULE_MAP.csv`，記錄模組來源、位元組長度、SHA-256 及插入位置。

## 實際測試

- `python tools/run_all_checks.py`：**8/8 命令通過**。
- 六組 Node 測試：135 通過、0 失敗（政策 70、候選池整合 27、EMQ API/list 19、歷史/狀態隔離 7、單人 EMQ 清單交接 4、答題流程 8）。
- `tools/verify.py`：**101 通過、0 失敗**。新增 module count、module hash、module marker 三項斷言；兩次獨立重建一致，且與 V82.65 基準逐位元相同。
- 建置產物：8,786,930 bytes，SHA-256 `abd202a6f96cc08e0969ad05ab8574cc71001733d655bcb5cff6b1a1a5b33a33`。
- `python tests/browser/browser_ui_smoke_opaque_origin.py`：本次執行逾時，Playwright/Chromium driver 出現 `EPIPE`。重試日誌只印出前 11 個初步 assertions（到答題輸入框在播放前維持 disabled），之後卡住且沒有最終摘要；整體標記為 TIMED OUT/FAIL，不算通過。既有 V82.67 的 19 assertions 歷史報告只作為先前證據，不替代本次失敗執行。由於建置輸出與原基準完全相同，尚無證據顯示此逾時由政策模組抽離造成。
- 真實 `file://`／localhost、持久化、IndexedDB、外網音訊、Firefox、多裝置多人驗收仍未執行。

## 基準保護與回滾

- 原始 V82.65 HTML、正式 ZIP、V82.67 產物均未覆寫。
- 回滾方式：還原 `src/scripts/script_004.htmlpart`、`tools/build.py`、`tools/verify.py`、四個相關 Node 測試、`reports/FRAGMENT_MANIFEST.json` 至 V82.67 檢查點；移除 `src/modules/candidate_pool_policy.js` 與 `reports/MODULE_MAP.csv` 即可。V82.68 的新輸出與 ZIP 可保留作為不可變檢查點，不需覆蓋舊檔。

## GitHub 上傳狀態

本地來源目錄包含完整 91 個既有 CSS/JS fragments；目前 GitHub 工程分支未包含完整 source tree。即使本階段把變更檔與報告推送至 GitHub，也不能把遠端分支描述成可獨立重建的完整工作樹。需分開記錄文件／文字檔上傳與完整 source tree／二進位 ZIP 發布狀態。

## 下一階段

繼續低風險純模組盤點：檢查候選政策的呼叫邊界與測試引用，再抽離無 DOM/storage/audio 副作用的下一個明確模組。只有在 golden tests 保持一致後，才進入核心候選 pipeline；持久化與多人模式延後至契約穩定。
