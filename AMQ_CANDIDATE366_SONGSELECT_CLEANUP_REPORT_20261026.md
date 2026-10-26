# Candidate366：Song Select 收斂清理與手機版控制修正

## 版本與基準
- 正式基準：Candidate302，不變。
- 候選檔：amq_learning_tool_v82_86_77_candidate366_finalize_songselect_song_only_view_20261026.html
- 大小：1,608,200 bytes
- SHA-256：38e345a12a396cbd8bcaeaa55e6e903c591517a1fab5aaa8cc99ed8b4d17859d
- 已知可回滾版本：Candidate364，1,609,811 bytes，SHA-256 88fd4422dcf8ed1782e2090da89a67b9802ec216aa853f5a5e4b7c24570be449。
- Candidate365 被棄用，因為 fixture 瀏覽器測試發現 view is not defined。Candidate366 已移除最後一個舊狀態判斷並重新通過測試。

## 本輪實際修改
1. 移除 Candidate72 對 body class 的弧線觀察器與重複 inline display 寫入；保留弧線 DOM 建立及 CSS 顯示規則。
2. 刪除舊版 Song Select Back 按鈕與重複場景背景 quick-open 入口，保留目前 C99 Back/Home、Escape 與正式場景背景設定入口。
3. 移除不可由使用者操作的舊 workspace dock 點擊處理器；保留 Candidate185 的舊 dock 隱藏／清理，以及 C99 可見工作區入口。
4. 修正 Candidate106 既有版面負責程式：搜尋框位於第一列，六個篩選器在第二列排列；沒有新增覆蓋式 CSS 區塊。
5. 修正 C99 行動版入口列，四個入口可在 320px 寬度內同時顯示。
6. 移除 Candidate137 已退休的作品視圖／切換按鈕與相關分支；Candidate210 不再建立後立刻移除該按鈕，專用 CSS 一併移除。保留歌曲列、搜尋、熟悉度、標籤、選取與播放行為，以及舊 singer 偏好復原到 AMQ 的安全護欄。

## 驗證
- JavaScript 靜態檢查：63 個可執行內嵌區塊，0 語法錯誤，PASS。
- CSS 靜態檢查：87 個 style 區塊，0 解析錯誤，PASS；3,396 條規則、11,341 個宣告。
- HTML ID：245 個，0 重複，PASS。
- Fixture Chromium 探測：16/16 PASS，0 個未捕捉 JS 例外。
- 320px 探測：六個篩選器同列、四個 C99 入口皆在視窗內、文件寬度 320px、0 個未捕捉 JS 例外。
- 真實曲庫、真實音訊、正式持久化與完整 E2E：NOT RUN。測試使用 fixture 取代 data.js，不能代表正式資料驗收。

## 尚未完成
- Candidate366 HTML 本身尚未完成 GitHub 上傳及遠端 SHA-256 讀回驗證。
- 需要在真實資料／音訊環境完成一次整合驗收；清單見 AMQ_CANDIDATE366_CONSOLIDATED_BROWSER_ACCEPTANCE_20261026.md。
