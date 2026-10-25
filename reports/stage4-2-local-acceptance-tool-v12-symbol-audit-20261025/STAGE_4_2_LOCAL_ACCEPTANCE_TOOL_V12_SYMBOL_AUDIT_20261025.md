# Stage 4.2 — Candidate295 驗收工具 v1.2 符號診斷

- 日期：2026-10-25
- 觸發依據：使用者提供的 Candidate295 執行期全域符號清單。
- 新工具：AMQ_Local_Acceptance_Tool_v1_2_Candidate295.html
- 工具大小：22,781 bytes
- 工具 SHA-256：f42dde260c25215fb93b21b76806ed1457edb1fce0b2e861b476777181f811b4
- ZIP：AMQ_Local_Acceptance_Tool_v1_2_Candidate295_20261025.zip
- ZIP 大小：11,286 bytes
- ZIP SHA-256：db88b70fabd226bf4998215f3a1e8c6a6b9313c7466808400e66f88c2f4de19c

## 新增內容

- 依照使用者提供的符號清單增加出題、答題提交／下一題、音訊失敗處理、清單範圍與黑名單 API 的存在性檢查。
- 增加答題歷史／目標摘要 API 的存在性檢查。
- 增加 Song Select 模組、工作區切換 API、兩個 route guard 標記及 Candidate210 模組標記的可見性診斷。
- 所有新增檢查只讀取符號類型與標記值，不呼叫 randomSong、提交答案、清除 watchlist、修改黑名單或切換工作區。

## 測試

- PASS：工具 JavaScript 通過 Node.js node --check。
- PASS：ZIP 完整性檢查，HTML 與 README 均可讀取。
- PASS：工具新增檢查引用的符號名稱已由使用者提供的清單支持。
- NOT RUN：工具尚未在使用者瀏覽器搭配同版 Candidate295、data.js、emq-data.js 實際執行。
- NOT RUN：路由行為、答題歷史持久化、音訊失敗恢復、清單 CRUD 與 reload persistence。

## 解讀限制

符號存在只證明可見性，不證明功能正確。`BLOCKED` 可能來自全域詞法作用域不可讀，不應直接視為程式缺陷。路由 guard 標記與 Candidate210 模組標記仍不得僅憑名稱刪除。Candidate295 原始 HTML 未修改，也未被提升為正式基準。

## 回滾

改用 v1.1 工具即可回滾本次驗收工具變更。應用程式 HTML、資料檔及 IndexedDB 均未由此工具版本修改。