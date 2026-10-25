# NEXT_TASK.md

## 最高優先工作：解除第三階段 BLOCKED
1. 找回與目前 HTML 配套的真實 `data.js`、`emq-data.js`，記錄來源、大小與 SHA-256；不可用其他版本替代。
2. 驗證真實 schema、版本、ID 唯一性、AMQ/EMQ 跨來源 ID 衝突、song-to-work 關聯及音訊資格。
3. 實測 AMQ、EMQ、MIX 出題池，以及歌曲黑名單、作品黑名單、音訊失效標記的交互。
4. 驗證初始化 ready 時序、空資料、格式錯誤、載入失敗與重複初始化。
5. 重跑 Candidate299 路由矩陣及 Candidate301 自訂清單 CRUD／備份還原回歸。
6. 上傳 Candidate302 HTML 至 GitHub，下載遠端檔案並核對 SHA-256。
7. 第三階段正式結案前不得開始第四階段。