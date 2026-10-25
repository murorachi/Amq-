# Stage 5 本機資料驗收工具

不需要把大型資料檔上傳到 ChatGPT。腳本在你的電腦上讀取 `data.js` 和 `emq-data.js`，只輸出小型 JSON 報告，不會輸出歌曲／作品名稱、資料列或音訊 URL，也不會上傳任何內容。

需要 Node.js 18 或更新版本：

```bash
node stage5_local_catalog_audit.cjs "完整路徑/data.js" "完整路徑/emq-data.js"
```

Windows 範例：

```bat
node stage5_local_catalog_audit.cjs "D:\AMQ\data.js" "D:\AMQ\emq-data.js"
```

把終端機輸出的 JSON 貼回對話即可。它會回報兩個檔案的大小與 SHA-256、AMQ/EMQ 筆數、ID 重複／無效、跨來源 ID 衝突、EMQ 歌曲的作品關聯、標題、歌手與音訊欄位。

注意：PASS 只代表資料結構與這支工具涵蓋的條件通過，不代表瀏覽器 E2E 或實際音訊播放已通過。若檔案格式與 Candidate302 不相符，工具會停止並回報 BLOCKED，不會猜格式。
