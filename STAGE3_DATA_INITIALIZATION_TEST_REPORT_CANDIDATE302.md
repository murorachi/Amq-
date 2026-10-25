# AMQ 第三階段資料載入與初始化驗收報告

日期：2026-10-25
候選：amq_learning_tool_v82_86_13_candidate302_emq_loader_state_validation_20261025.html
狀態：可安全修正項目完成；真實 AMQ／EMQ 曲庫驗收 BLOCKED。

## 基準與產物
- 正式維護基準仍是 Candidate295，不覆寫、不升格其他候選。
- Candidate295 SHA-256：aef896eee98c10bcb9fb1f10d6650b8e26067426f43b086e1b69fa12e3674a81，1,720,917 bytes。
- Candidate302 由 Candidate301 派生，修改 EMQ API 的 workCount getter，只有 ready=true 才回報作品數。
- Candidate302 大小：1,720,249 bytes；SHA-256：f718a744057be0a33d371306f1742aaeede90e84f33d9e62ab45f5e6db488abd。
- Candidate295、299、300、301 原始檔未修改。

## 交接包
ZIP SHA-256：e2a65acb986a784d76ea87e14c380f74120ed23ed678745a7e8603a9b9c041ae；大小 1,826,746 bytes。
PACKAGE_MANIFEST.json 的 14 個列管檔案大小與 SHA-256 全部一致，0 mismatch。
遞迴搜尋 /mnt/data 未找到 data.js 或 emq-data.js。

## 測試
### PASS
- Candidate302 inline JavaScript 語法：67/67，Node.js --check。
- Manifest：14/14。
- 合成 EMQ loader runtime：9/9 案例，包括合法 payload、缺 payload、版本錯誤、重複作品 ID、AMQ/EMQ 作品 ID 衝突、歌曲 ID 衝突、無效作品關聯、損毀歌曲記錄、合法但沒有音訊資格歌曲的 ready-empty 行為。
- Candidate301 的重複作品 ID 回歸探針會失敗，因為 ready=false 時 workCount 仍暴露未驗證作品數；Candidate302 通過。

### BLOCKED
- 真實資料檔缺失，真實 schema、ID 空間、作品關聯與音訊資格無法驗證。
- 真實 AMQ／EMQ／MIX 出題池、黑名單、音訊失效標記端到端交互無法驗證。
- Candidate302 HTML 的 GitHub 上傳與遠端 SHA-256 尚未完成。
- Chromium file://／localhost 完整 E2E 未執行。

### NOT RUN
- Candidate299 路由矩陣、Candidate301 CRUD／備份還原回歸本輪未重跑。
- 真實音訊播放、多人連線及真實資料下全頁初始化未執行。

## 原始碼資料流盤點
- AMQ 由 data.js 提供 DB；isValidCatalogSnapshotV8239 檢查 anime/songs 陣列、正整數 ID、重複 ID 與必要標題欄位。初始化會嘗試載入 IndexedDB aniCollectionDB/cache/catalog。
- EMQ loader 讀取內嵌 gzip Base64 payload，驗證 version=1、songs/works 陣列、作品與歌曲 ID、跨 AMQ ID 衝突及 song-to-work 關聯。
- EMQ row 需有標題、歌手及 HTTPS 音訊候選才加入可用 rows；真實資料缺失，無法確認過濾比例是否合理。
- songSourceV857 區分來源；songPoolForModeV857 分流 AMQ／EMQ 並套用音訊資格、歌曲黑名單與作品黑名單；MIX 隨機來源比例約 2/3 AMQ、1/3 EMQ，單側無候選時退回另一側。
- EMQ combinePool 另套用年份、歌曲類型、熟悉度、標籤、黑名單、不重複與 AMQ 專屬範圍限制。
- 上述資料流屬原始碼靜態追蹤；不代表真實曲庫端到端 PASS。

## 回滾
Candidate302 回歸時退回 Candidate301，SHA-256 e8eb07ccab26b6e424eda9aed11d1c21b90cca9c544ed2b6843096e3b6762454。正式維護基準仍為 Candidate295。

## 下一步
取得配套 data.js、emq-data.js，記錄來源／大小／SHA-256，完成真實 schema、ID 關聯、音訊資格、三種模式選池及黑名單驗收；重跑前兩階段回歸；上傳候選 HTML 並核對遠端 SHA-256。第三階段正式結案前不得開始第四階段。
