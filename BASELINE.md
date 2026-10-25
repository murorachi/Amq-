# BASELINE.md

## 正式維護基準

- 檔案：`amq_learning_tool_v82_86_06_candidate295_db_extraction_20261025.html`
- 版本：`v82.86.06-candidate295-db-extraction-20261025`
- 大小：1,720,917 bytes
- SHA-256：`aef896eee98c10bcb9fb1f10d6650b8e26067426f43b086e1b69fa12e3674a81`
- 狀態：正式維護基準，唯讀保護；不可覆蓋。

## 最新第三階段候選（非正式基準）

- 檔案：`amq_learning_tool_v82_86_13_candidate302_emq_loader_state_validation_20261025.html`
- 版本：`v82.86.13-candidate302-emq-loader-state-validation-20261025`
- 父候選：Candidate301，SHA-256 `e8eb07ccab26b6e424eda9aed11d1c21b90cca9c544ed2b6843096e3b6762454`
- 大小：1,720,249 bytes
- SHA-256：`f718a744057be0a33d371306f1742aaeede90e84f33d9e62ab45f5e6db488abd`
- 狀態：候選，真實曲庫驗收 BLOCKED，不得升格。

## 第四階段驗收狀態（2026-10-25）

- Candidate302 來源池／音訊／黑名單合成測試：11/11 PASS。
- Candidate302 AMQ 快照驗證合成測試：11/11 PASS。
- Candidate302 EMQ 載入合成測試重跑：9/9 PASS。
- 真實 `data.js` / `emq-data.js` 缺失，瀏覽器 E2E 與真實曲庫驗收未通過驗收門檻；第四階段整體狀態為 BLOCKED。
- 不變更正式基準，不將 Candidate302 升格；詳見 `STAGE4_FINAL_ACCEPTANCE_REPORT_20261025.md`。

## 回滾

回滾至 Candidate295 時，使用上述正式基準快照並先核對 SHA-256。Candidate302 的回歸則先退回 Candidate301，SHA-256 `e8eb07ccab26b6e424eda9aed11d1c21b90cca9c544ed2b6843096e3b6762454`。不要覆寫原始檔。
