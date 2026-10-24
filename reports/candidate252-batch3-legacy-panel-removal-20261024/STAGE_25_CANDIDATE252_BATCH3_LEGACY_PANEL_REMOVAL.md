# Candidate252：批次三舊作品批次介面真正移除與範圍整合

- 版本：v82.85.66-candidate252-watchlist-scoped-work-batch-20261024
- 本機產物：9,355,704 bytes；SHA-256 `f210d987495aeb52ca11e958fe2ff9942c32457f054b81d792309c14e9fb78d1`。
- 直接回滾點 Candidate251：9,354,587 bytes；SHA-256 `4467de1ed6330c51929e783b662d95cd5ad6847dd12edb3a6fde8f49fb94849e`。
- 本文件所在 GitHub 分支從 `amq-candidate235-workspace-automation-migration-20261024` 建立。Candidate252 HTML 本身尚未上傳，遠端 HTML SHA 未驗證。

## 實際修改
1. 將看番狀態、歌曲熟悉度、待聽佇列、自訂清單、手動補強、黑名單及間隔複習操作集中到正式作品批次工作區，重用 `__aniBatchBusinessAPIv228`。
2. 真正刪除舊 catalog `#quicktools` 面板、舊選取按鈕、舊狀態／熟悉度／練習控制列、重複建立清單與待聽按鈕、相關事件處理器、初始化包裝器、範圍摘要 Observer 及相關 CSS。沒有以 display:none 取代刪除。
3. AniList／MAL 入口改由正式匯入工作區直接開啟原有匯入 modal；C99 匯入快捷入口亦直接開啟 modal，不再依賴已刪除的 `#syncOpenBtn`。VNDB 匯入能力保留。
4. 保留 `selectedAnime` 與 `selectionMode`，因其仍供圖鑑卡片及我的清單卡片選取共用。重寫 watchlist patch，移除舊面板動態搬移，保留看番卡片逐項勾選。
5. 正式作品批次工作區依目前頁面情境選擇範圍：從「我的清單」開啟時，只使用目前 `#watchGrid .watchCard[data-anime-id]` 的作品；其他情況使用完整動畫曲庫。工作範圍外的既有選取不會被帶入。
6. 保留自訂清單資料 schema `aniCustomPracticeListsV1`、猜歌設定的清單篩選、Candidate210 歌曲批次工作區及音訊播放器收合功能。

## 測試
- PASS：67 個可執行 inline JavaScript 區塊通過 `node --check`，0 errors。
- PASS：109 個 CSS 區塊解析，0 parser errors。
- PASS：274 個 DOM ID 唯一，0 duplicates。
- PASS：舊面板／控制項／CSS 殘留引用檢查；`#quicktools`、`syncOpenBtn`、舊選取按鈕、舊批次控制項、`addBulkControls`、`refreshBatchScope`、`.toolrow`、`.bulkField` 均為 0。
- PASS：Node VM 測試確認 watchlist ID 去重、共用待聽佇列 API、自訂清單 API、看番狀態／歌曲熟悉度／練習動作橋接。
- PASS：靜態路由斷言確認建立清單、批次選取、AniList／MAL 匯入不再引用已刪除控制項。
- BLOCKED：本輪 Playwright／Chromium 完整頁面測試未能在期限內啟動／完成，沒有取得有效互動結果。原生 file URL 也未完成；已知 Chromium managed policy 的 `URLBlocklist=["*"]` 會阻擋 file://、data: 與 localhost。未更改系統政策。
- NOT RUN：完整頁面 E2E、瀏覽器中的自訂清單 CRUD／批次操作、reload 後持久化、真實音訊、即時 API、多人及 osu!stable 像素差異。
- NOT VERIFIED：GitHub HTML 上傳與遠端 HTML SHA-256。

## 回滾
使用同包 Candidate251 HTML 完整取代 Candidate252。原始 Candidate236 候選仍在本機 `/mnt/data/amq_candidate236/`，SHA-256 `9958f1c1ac798ac72733edd0e24c00686e8e06e7c3faf1605cb7753cd562f7ff`。

## 批次三狀態
**舊程式碼清理：靜態檢查 PASS。批次三整體：尚未完成驗收。** 舊批次介面及其程式依賴已實際移除，但完整瀏覽器路由、清單 CRUD／重新載入持久化與必要功能回歸尚未驗收；因此不能宣告批次三完成，也不能開始批次四。
