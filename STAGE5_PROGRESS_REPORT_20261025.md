# Stage 5 — 本機真實資料驗收進度報告

日期：2026-10-25。正式基準仍為 Candidate295；Candidate302 不升格。

## 已交付
- 本機資料稽核工具，支援檔案大小與 SHA-256、AMQ/EMQ ID 唯一性、跨來源 ID 衝突、EMQ 作品關聯、標題／歌手／音訊候選欄位檢查。
- 工具不會上傳檔案或輸出曲庫資料列、歌曲／作品名稱及音訊 URL。
- README 說明如何只回傳小型 JSON 結果。
- 使用者已在本機成功執行工具並提供真實資料 JSON。

## 真實資料檔案指紋
- `data.js`: 4,975,244 bytes；SHA-256 `692f69f56079d6cc0b30bd1951ab625f53799b87525c1bd52a27f29274703cf3`。
- `emq-data.js`: 2,684,266 bytes；SHA-256 `88441b4a6090c01db1dae23c970a6fa24d457a54f4b915be3e23c3799b3794cc`。
- 這些是資料檔的雜湊，不是 HTML 候選版本雜湊；目前尚未由此證明它們與 Candidate295/Candidate302 的建置來源相符。

## 真實資料稽核結果
### AMQ
- Works: 9,516 rows；有效且唯一 ID 9,516；無效 ID 0；重複 ID 0。
- Songs: 38,821 rows；有效且唯一 ID 38,821；無效 ID 0；重複 ID 0。
- 缺少標題 0；缺少歌手 0。
- 具有至少一個工具可辨識音訊欄位的歌曲 38,326；其餘 495 首未被工具辨識到音訊欄位。這是待追查項目，不可直接等同資料錯誤或無法播放。

### EMQ
- Payload version: 1。
- Works: 6,645 rows；有效且唯一 ID 6,645；無效 ID 0；重複 ID 0。
- Songs: 16,839 rows；有效且唯一 ID 16,839；無效 ID 0；重複 ID 0。
- 缺少作品關聯 0；空標題 0；空歌手 0；沒有音訊候選 0；非 HTTPS 音訊候選 0。

### 跨來源
- Work ID collisions: 0。
- Song ID collisions: 0。
- Tool verdict: PASS；issues: []。

## 測試狀態
- Node.js syntax check：PASS。
- 合成 AMQ/EMQ fixture 執行：PASS。
- 真實 AMQ/EMQ 結構與欄位稽核：PASS（以上述本機輸出的 JSON 為證）。
- AMQ 495 首未被辨識到音訊欄位的歌曲：待確認實際音源規則與執行時處理，不能直接判定 FAIL。
- 瀏覽器 E2E、實際音訊播放、AMQ/EMQ/MIX 模式與出題流程：NOT RUN。
- Candidate299 路由矩陣、Candidate301 CRUD／匯入匯出／備份還原：NOT RUN。
- Candidate302 HTML 上傳及遠端 SHA-256 核對：NOT RUN。
- 本階段沒有修改正式 HTML，沒有建立 Candidate303，沒有升格候選。

## 保護基準
- Candidate295 SHA-256：`aef896eee98c10bcb9fb1f10d6650b8e26067426f43b086e1b69fa12e3674a81`。
- Candidate302 SHA-256：`f718a744057be0a33d371306f1742aaeede90e84f33d9e62ab45f5e6db488abd`。
- Candidate295 仍是唯一正式維護基準。

## 下一步
1. 確認資料檔的實際建置來源／版本關係；不能只靠檔名推斷它們配對 Candidate295。
2. 對 AMQ 495 首未被辨識到音訊欄位的歌曲，檢查資料欄位規則與程式的音源 fallback，避免把合法的無音源項目誤判成壞資料。
3. 進行瀏覽器初始化、AMQ/EMQ/MIX、實際音訊、路由、CRUD 與備份還原測試。
4. 上傳 Candidate302 HTML 前先核對路徑、版本及本機 SHA-256；上傳後驗證遠端內容。
