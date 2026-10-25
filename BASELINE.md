# BASELINE.md

## 正式維護基準（已升格，2026-10-25）

- 檔案：`amq_learning_tool_v82_86_13_candidate302_emq_loader_state_validation_20261025.html`
- 版本：`v82.86.13-candidate302-emq-loader-state-validation-20261025`
- 大小：1,720,249 bytes
- SHA-256：`f718a744057be0a33d371306f1742aaeede90e84f33d9e62ab45f5e6db488abd`
- 狀態：正式維護基準；使用者已回報本機驗證完成並授權升格。基準檔唯讀保護，後續修改必須另存新候選，不得覆寫。
- 前一正式基準 Candidate295 保留為回滾點：1,720,917 bytes，SHA-256 `aef896eee98c10bcb9fb1f10d6650b8e26067426f43b086e1b69fa12e3674a81`。

## 版本沿革與回滾點

| 候選 | 大小 | SHA-256 | 用途 |
|---|---:|---|---|
| Candidate295 | 1,720,917 | `aef896eee98c10bcb9fb1f10d6650b8e26067426f43b086e1b69fa12e3674a81` | 前正式基準／第一回滾點 |
| Candidate299 | 1,719,884 | `1e7a37cef7a7d791c5dd40f09c2143b2e507dac76c73951e5060b82f5c44c2e4` | 中間候選 |
| Candidate300 | 1,717,671 | `5fea42650ede3b8b779afdf7b61e42365388d41b34e4231988065eb2fb7d34a5` | 中間候選 |
| Candidate301 | 1,720,241 | `e8eb07ccab26b6e424eda9aed11d1c21b90cca9c544ed2b6843096e3b6762454` | Candidate302 的直接回退點 |
| Candidate302 | 1,720,249 | `f718a744057be0a33d371306f1742aaeede90e84f33d9e62ab45f5e6db488abd` | **目前正式基準** |

## 已有驗收證據

- 使用者已回報 Candidate302 本機驗證完成，並明確授權升格；此處不推定使用者未列明的具體手動案例。
- 靜態檢查：Candidate295/299/300/301/302 均 PASS；每版 67 個可執行 inline JS 區塊、109 個 style 區塊、2,808 條頂層 CSS 規則、271 個唯一 HTML ID。
- Candidate302 來源衍生 EMQ loader 回歸：9/9 PASS；Candidate301 的舊缺陷可重現。
- 既有合成測試：EMQ loader 9/9、AMQ catalog validator 11/11、pool/audio/blacklist 11/11 PASS；Candidate302 隔離測試合計 40/40 PASS。
- 真實曲庫稽核 PASS：AMQ 9,516 works / 38,821 songs；EMQ 6,645 works / 16,839 songs；無無效／重複 ID、EMQ 關聯缺失或跨來源 ID 衝突。
- AMQ 有 495 首在 row slots 9/10/11 沒有媒體值；這表示目前 extractor 無法從這些欄位取得媒體候選，不代表已證明原始資料損壞。

## 尚未完成的工程終點

Candidate302 升格不代表六項清理工程已完成。全專案功能分類、完整依賴圖、重複實作整合、舊程式實際刪除及全域回歸仍須分項建立證據。瀏覽器自動化曾受環境逾時阻擋；使用者本機驗證已回報完成，但未提供逐項測試紀錄，故不把它偽裝成可重現的自動化 E2E 報告。

## GitHub 同步狀態

目前已更新 Stage 6 文件分支的基準文件；Candidate302 HTML 本體是否已在該分支遠端保存並完成下載回算 SHA-256，仍需另行確認。不得把文件中的 hash 當成遠端 HTML 已驗證的證據。

## 回滾

- 一般回滾：使用 Candidate295 原始快照，先核對 SHA-256，再另存為新的工作檔，不覆寫 Candidate302。
- 僅回退 Candidate302 的 EMQ loader 修正：參照 Candidate301（SHA-256 `e8eb07ccab26b6e424eda9aed11d1c21b90cca9c544ed2b6843096e3b6762454`），但它已知存在 loader 尚未 ready 時暴露暫存 workCount 的缺陷，不建議直接作為新的正式基準。
