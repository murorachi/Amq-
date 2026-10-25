# NEXT_TASK — Candidate295 基準／Candidate299 第一階段驗收閘門（2026-10-25）

## 工作方式
依使用者決定，後續以一個階段為單位連續完成與驗收；不再把工程拆成需要逐次確認的小步驟。已完成的盤點不重做，僅對新候選執行必要回歸測試。

## 基準與最新候選
- 正式基準仍是 Candidate295：`index-old.html`，1,720,917 bytes，SHA-256 `aef896eee98c10bcb9fb1f10d6650b8e26067426f43b086e1b69fa12e3674a81`。
- 最新第一階段候選：`amq_learning_tool_v82_86_10_candidate299_route_acceptance_20261025.html`，1,719,884 bytes，SHA-256 `1e7a37cef7a7d791c5dd40f09c2143b2e507dac76c73951e5060b82f5c44c2e4`。
- Candidate295 不得覆寫；Candidate299 尚非正式基準。

## 第一階段（R01–R08）狀態
- PASS：路由守衛初始化／重複包裝修正、首頁覆蓋選單關閉、body-class 單一責任、六個工作區映射、一般 home/quiz/multiplayer 路由、VN 清單正常路由、面板返回／關閉。
- PASS：受控 Chromium DOM harness 36/36 assertions，0 failures，0 page errors。
- PASS：67/67 inline JS syntax；109 CSS blocks／2,808 rules／0 stylesheet-level parse errors；271 unique IDs。
- BLOCKED：本環境直接開啟 file:// 與 localhost 都被 Chromium 回報 `ERR_BLOCKED_BY_ADMINISTRATOR`；工作目錄缺少 `data.js`、`emq-data.js`，無法用實際曲庫完成端到端驗收。
- BLOCKED：Candidate299 HTML 尚未上傳 GitHub，遠端檔案／SHA-256 尚未驗證。
- 因此第一階段工程修正與受控測試已完成，但正式本機驗收仍未結案。

## 下一個執行動作
1. 在本機把 Candidate299 與同版本配套 `data.js`、`emq-data.js` 放在同一資料夾，驗證六個工作區、首頁選單、返回與 VN 清單。
2. 在取得本機驗收結果前，不開始第二階段。
3. 第一階段通過後，才進入第二階段：AMQ 自訂清單 fallback reader 整合、錯誤與合法空清單語義、CRUD／成員操作／播放池／重新載入／備份還原驗收。
4. Candidate299 HTML GitHub 上傳與遠端 SHA 驗證仍是交付待辦；若工具環境仍無法上傳大型檔案，需明確記錄 BLOCKED，不得宣稱已上傳。

## 其他已知待辦（保留原順序）
- 第三階段：取得資料檔後驗證 AMQ／EMQ schema、ready 時序、ID 完整性、AMQ／EMQ／MIX 候選池與黑名單。
- 第四階段：答題歷史／摘要／目標統計的重建、去重、flush 與持久化回歸。
- 第五階段：正式 HTML 建置來源一致性、全回歸、文件／交付紀錄、GitHub 上傳與遠端 hash 驗證。

## 回滾
回到未修改的 Candidate295 原始檔 `index-old.html`。不得用任何候選覆蓋它。
