# NEXT_TASK.md — Stage 5

1. 使用者在本機執行 `stage5_local_catalog_audit.cjs`，只回傳 JSON，不上傳大型資料檔。
2. 核對實際 `data.js`／`emq-data.js` 的版本、大小、SHA-256 是否配對。
3. 依實際報告處理格式不相容、ID 衝突、作品關聯或音訊欄位問題；不猜格式、不改原始資料。
4. 完成真實資料驗證後，執行瀏覽器初始化、AMQ/EMQ/MIX、播放、路由、CRUD、備份還原驗收。
5. 完成 Candidate302 HTML 上傳及遠端下載 SHA-256 比對。
6. Candidate295 仍為正式基準；未取得驗收證據前不升格 Candidate302。
