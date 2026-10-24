# Stage 29 — Candidate256 原生瀏覽器驗收（2026-10-24）

## 產物識別
- Candidate256：`amq_learning_tool_v82_85_70_candidate256_song_batch_preserve_selection_20261024.html`
- Size：9,355,585 bytes
- SHA-256：`e5c65158ebee5ca69f051366a095e50f0d5f8992f5e89cef3209767adccc77d1`
- 原生測試 origin：`http://127.0.0.1:18765`
- App：`candidate256.html`
- 報告時間：2026-10-24T12:16:10.477Z 至 2026-10-24T12:16:18.541Z

## 結果摘要
- PASS 7 / FAIL 0 / NOT RUN 1 / BLOCKED 0
- 原生儲存：`localStorageType=native-read-write`。
- 初始化：readyState complete、title AMQ學習工具、pageReady true、quicktools false。
- 工作區內容面板：catalog、watchlist、dashboard、learningPlan、返回 catalog、home 的面板／active-view 結果符合目前的共享面板設計。此結果不代表每個工作區都改變主 active route。
- 匯入入口：匯入 API 為 function，動畫選擇及 VNDB 入口存在。
- 歌曲批次選取保留：180 個歌曲 checkbox；開啟面板前已選 1 首，開啟後仍顯示「已選取 1 首歌曲」，checkbox 仍勾選。
- 作品／歌曲選取隔離：作品 checkbox 共 60 個，作品 ID `1` 保留於作品選取集合；切換面板後歌曲選取仍為 1，作品集合亦未被覆寫。
- 自訂清單持久化：`aniCustomPracticeListsV1` 測試清單建立成功，重新載入後仍存在，最後透過 UI 刪除且確認清理成功。
- NOT RUN：外部資源／API 功能驗收。Resource Timing 觀察到 Anime News Network `api.xml` 請求，但沒有網路回應解析、匯入結果、去重或錯誤復原的實際證據。

## 判定與限制
Candidate256 已通過本報告列出的原生瀏覽器驗收。不得將外部 API 標記為 PASS。GitHub 正式 HTML 上傳及遠端 SHA-256 讀回核對仍未完成，故 Candidate256 尚非正式基準；Batch 3 未完成，不開始 Batch 4。
