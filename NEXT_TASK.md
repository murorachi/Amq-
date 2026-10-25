# NEXT_TASK.md — Stage 5

Current evidence: local real-catalog structural audit returned PASS. Keep Candidate295 as the formal baseline.

1. 確認實際 `data.js`／`emq-data.js` 的建置來源及版本關係；目前的檔案雜湊已記錄，但尚不能證明它們與 Candidate295/Candidate302 的建置來源相符。
2. 追查 AMQ 中 495 首未被本工具辨識到音訊欄位的歌曲：核對原始欄位 schema、音源 fallback 與失效音源處理，不修改原始資料、不把「無欄位」直接當作錯誤。
3. 執行瀏覽器初始化及 AMQ/EMQ/MIX 模式、出題、跳過、下一題與實際音訊播放驗收；記錄明確斷言及 PASS/FAIL/NOT RUN/BLOCKED。
4. 執行 Candidate299 路由矩陣及 Candidate301 CRUD、匯入／匯出、備份／還原回歸。
5. 核對 Candidate302 HTML 的版本、路徑與本機 SHA-256；上傳前不得覆蓋原始基準，上傳後驗證遠端檔案與雜湊。
6. 更新測試報告與交付紀錄。Candidate295 仍為正式基準；未取得足夠驗收證據前不得升格 Candidate302。
