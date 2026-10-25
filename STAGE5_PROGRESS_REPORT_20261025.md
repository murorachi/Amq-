# Stage 5 — 啟動與本機資料驗收工具交付

日期：2026-10-25。正式基準仍為 Candidate295，Candidate302 不升格。

## 已交付
- 本機資料稽核工具，支援檔案大小與 SHA-256、AMQ/EMQ ID 唯一性、跨來源 ID 衝突、EMQ 作品關聯、標題／歌手／音訊候選欄位檢查。
- 工具不會上傳檔案或輸出曲庫資料列、歌曲／作品名稱及音訊 URL。
- README 說明如何只回傳小型 JSON 結果。

## 測試
- Node.js syntax check：PASS。
- 合成 AMQ/EMQ fixture 執行：PASS，計數及關聯結果符合預期。
- 真實資料執行：NOT RUN，需使用者在本機執行後提供 JSON。
- 瀏覽器 E2E、實際音訊、Candidate299 路由及 Candidate301 CRUD／備份還原：NOT RUN。
- 本階段沒有修改正式 HTML，沒有建立 Candidate303，沒有升格候選。

## 基準
Candidate295 SHA-256：`aef896eee98c10bcb9fb1f10d6650b8e26067426f43b086e1b69fa12e3674a81`。
Candidate302 SHA-256：`f718a744057be0a33d371306f1742aaeede90e84f33d9e62ab45f5e6db488abd`。

## 下一步
在本機執行工具並回傳 JSON。依實際雜湊及資料驗證結果確認檔案配對，再進行真實資料和瀏覽器驗收。
