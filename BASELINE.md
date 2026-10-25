# BASELINE.md

## 正式維護基準
- Candidate295：`amq_learning_tool_v82_86_06_candidate295_db_extraction_20261025.html`
- 大小：1,720,917 bytes
- SHA-256：`aef896eee98c10bcb9fb1f10d6650b8e26067426f43b086e1b69fa12e3674a81`
- 狀態：唯讀正式維護基準，不可覆寫。

## 最新第三階段候選（非正式基準）
- Candidate302：`amq_learning_tool_v82_86_13_candidate302_emq_loader_state_validation_20261025.html`
- 大小：1,720,249 bytes
- SHA-256：`f718a744057be0a33d371306f1742aaeede90e84f33d9e62ab45f5e6db488abd`
- 父候選 Candidate301 SHA-256：`e8eb07ccab26b6e424eda9aed11d1c21b90cca9c544ed2b6843096e3b6762454`
- 真實曲庫驗收 BLOCKED；Candidate302 不升格。

## 回滾
Candidate302 回歸時退回 Candidate301。正式安全基準仍為 Candidate295，回滾前核對 SHA-256。