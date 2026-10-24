# Stage 66 — Dock 顯示狀態所有權稽核

## 基準
- Candidate282: `v82.85.96-candidate282-batch-routing-lifecycle-fix-20261025`
- HTML SHA-256: `66e97e9963c115a3e3f853e83bc0e6616c9d0bea57007c6fd766cadd44640e49`
- 本階段未修改 HTML。目的為確認 Stage65 的 Dock 衝突範圍與瀏覽器測試阻擋是否可繞過。

## 新增驗證
- 以本機 HTTP server 提供 Candidate282，`curl -I` 得到 HTTP 200，檔案大小 9,379,673 bytes。
- Playwright Chromium 導覽 `http://127.0.0.1:8765/...` 仍回報 `net::ERR_BLOCKED_BY_ADMINISTRATOR`。
- 因而不只是 `file://` 限制；目前執行環境的 Chromium 導覽受政策阻擋。無法取得 DOM、console、computed styles、截圖或實際互動結果。

## 靜態所有權證據
- Script 11 `syncDockVisibility()` 透過 body class 觀察器同步 Dock 可見狀態。
- Script 55 在 Song Select route 下對 `#amqWorkspaceDock` 設定 inline `display:none!important`。
- Script 57 route/layout callback 會對 Dock 寫入 inline `display:grid!important` 或 `display:none!important`；同一模組亦控制 Sidebar。
- Script 61 `normalizeDock()` 在 Song Select route 下對 Dock 寫入 inline `display:flex!important`，並在 body class/data-view 變更與 resize 時重跑。
- Script 46 另有 panel 開啟/關閉控制，但主要操作的是 panel 的 display 與 Dock selected state，不應與 Dock 本身 display 混為一談。
- CSS 還有多組 `#amqWorkspaceDock` selector；靜態 selector 次數本身不能證明可刪，因為有些負責位置、尺寸、子項目與 route 狀態。

## 結論與決策
這不是單純「三條 CSS 重複」問題，而是至少三個 JavaScript 模組直接寫入同一個元素的 inline `display!important`，另有 CSS route 規則。移除任一 writer 可能改變初始化順序、route 進出、resize 或返回首頁時的狀態。由於瀏覽器執行遭封鎖，本階段不做推測性刪除。
- 保留：Dock 元素、按鈕及必要的 route/layout 能力。
- 整合：Dock 的 `display` 唯一寫入者；其他模組改為呼叫狀態 API，不直接寫 `display`。
- 待確認：正式狀態應由 `amq-songselect-route-active`、`amq-workspace-active` 與 `amq-dock-expanded` 的哪一個組合決定。須從真實路由狀態及截圖確認。
- 不刪除：目前沒有足夠證據證明任一 writer 完全無用。

## 測試結果
- PASS：Candidate282 SHA-256 與已記錄基準一致。
- PASS：HTTP server 對 HTML 回傳 200，大小與本地檔案一致。
- PASS：靜態定位 Script 11、55、57、61 的 Dock display writer。
- BLOCKED：Playwright Chromium 經 HTTP localhost 導覽仍回報 `net::ERR_BLOCKED_BY_ADMINISTRATOR`。
- NOT RUN：computed style、route transitions、resize、返回首頁、dock expand/collapse、截圖比較及瀏覽器回歸。
- NOT RUN：HTML 修改與建置，因本階段不修改 HTML。

## 下一階段
1. 在允許瀏覽器執行的環境取得 route/resize/expand/collapse 的 computed styles 和截圖；若無此環境，明確將視覺驗收標記 BLOCKED。
2. 定義單一 Dock display owner/API，其他模組只送出狀態意圖。
3. 在可測試的分支進行最小重構，加入靜態斷言，並執行瀏覽器回歸後才刪除舊 writer。
4. 再處理歌曲批次遷移與 Observer teardown，避免同時改動多個高耦合區域。
