# BASELINE.md

## 正式維護基準

- 檔案：`amq_learning_tool_v82_86_06_candidate295_db_extraction_20261025.html`
- 版本：`v82.86.06-candidate295-db-extraction-20261025`
- 大小：1,720,917 bytes
- SHA-256：`aef896eee98c10bcb9fb1f10d6650b8e26067426f43b086e1b69fa12e3674a81`
- 狀態：正式維護基準，唯讀保護；不可覆蓋。

## 最新第三階段候選（非正式基準）

- 檔案：`amq_learning_tool_v82_86_13_candidate302_emq_loader_state_validation_20261025.html`
- 大小：1,720,249 bytes
- SHA-256：`f718a744057be0a33d371306f1742aaeede90e84f33d9e62ab45f5e6db488abd`
- 狀態：候選；未升格。

## 第五階段狀態（2026-10-25）

- 本機資料驗收工具的語法檢查、合成資料測試與真實 AMQ/EMQ 結構稽核均 PASS。
- 真實 `data.js`：4,975,244 bytes；SHA-256 `692f69f56079d6cc0b30bd1951ab625f53799b87525c1bd52a27f29274703cf3`。
- 真實 `emq-data.js`：2,684,266 bytes；SHA-256 `88441b4a6090c01db1dae23c970a6fa24d457a54f4b915be3e23c3799b3794cc`。
- AMQ：9,516 works、38,821 songs；ID 有效且唯一，標題／歌手欄位完整；38,326 首有至少一個被工具辨識的音訊欄位，另有 495 首待核對欄位 schema 與 fallback。
- EMQ：6,645 works、16,839 songs；ID 有效且唯一，作品關聯與標題／歌手／音訊候選檢查通過，音訊候選均為 HTTPS。
- 跨來源作品／歌曲 ID 衝突皆為 0，工具 verdict PASS，issues 空陣列。
- 資料檔雜湊不等於 HTML 雜湊；尚未證明資料檔與 Candidate295/Candidate302 的建置來源配對關係。
- 瀏覽器 E2E、實際音訊、AMQ/EMQ/MIX 模式流程、Candidate299 路由、Candidate301 CRUD／備份還原仍 NOT RUN。
- Candidate295 仍為正式基準；Candidate302 不得升格，直到完整回歸驗收有證據。
- 詳見 `STAGE5_PROGRESS_REPORT_20261025.md`。
