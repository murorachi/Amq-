# Candidate231 全專案依賴盤點與清理方案

日期：2026-10-24。使用者已確認 Candidate231 為目前最新版本。

## 基準

- 本機來源：`amq_learning_tool_v82_85_46_candidate231_work_batch_entry_integration_20261024.html`
- 大小：9,367,325 bytes
- SHA-256：`74607e5344e0b993fb1e8d40c081285287071c236c9c92bac86cac98c5c9fecf`
- 本批只做盤點與規劃，未修改 HTML、CSS、JavaScript 或資料 schema。

## 盤點摘要

| 範圍 | 實際掃描結果 | 結論 |
|---|---|---|
| 初始 DOM | 292 個 ID，292 個唯一值 | 初始 HTML 沒有重複 ID；不代表動態 render 後也唯一 |
| Script | 69 個 tags，其中 67 個可執行、2 個資料載荷 | 兩個載荷為 AniList ID map JSON 與 EMQ gzip/base64 資料，不可當作死程式刪除 |
| JavaScript | 67/67 可執行區塊通過 `node --check` | PASS，僅代表語法正確 |
| CSS | 109 個 style blocks；stylesheet/declaration parser errors 均為 0 | PASS，解析成功不代表 cascade 可直接合併 |
| CSS cascade | 3,570 個 qualified rules（含支援的巢狀條件）；2,162 個 selector 字串；654 個 selector 重複出現，額外 1,408 次出現 | 高優先整合區域，不能只按 selector 重複刪除 |
| Observer | MutationObserver 52、ResizeObserver 3、IntersectionObserver 5 處提及 | 需追查 owner、target 與 teardown，不可直接推論為 leak |
| Timer | setTimeout 141、setInterval 10、clearTimeout 38、clearInterval 9 處提及 | 逐一建立生命週期表 |
| 事件 | addEventListener 489、removeEventListener 4 處字面提及 | 靜態字面計數不等於活躍 listener 數 |
| Storage/API | 28 個可辨識固定 storage keys；IndexedDB 6 處；fetch 19 處 | 需建立 key 的 reader/writer、匯入匯出與資料相容性表 |
| Build/repo | 分支樹中未找到 package.json、Vite/Webpack/Rollup 設定或一般化 source 目錄；Candidate231 HTML 未在遠端分支樹中 | 尚無 Candidate231 可重現建置及遠端產物驗證證據 |

## 保留 Keep

- Song Select：歌曲搜尋、排序、篩選、選取、鍵盤、歌曲資訊與封面。
- AMQ/EMQ/MIX/Singer、EMQ 資料載荷、音訊/影片播放器、佇列、音量/靜音及失敗復原。
- 自訂清單 CRUD、匯入/匯出、資料隔離。
- 學習中心、猜歌、歷史、錯題/未作答、熟悉度、黑名單、SRS/練習計畫。
- Candidate210 歌曲批次唯一所有權、Candidate228 `__aniBatchBusinessAPIv228`、Candidate231 可見作品批次入口。
- AniList/MAL/VNDB 匯入與移除、場景背景/IndexedDB、多人功能、使用者設定及既有資料 keys/schema。

## 整合 Integrate

### A. Route/workspace owner
候選群：Candidate70、76、77、82、99、103、106、193 相關 runtime，以及 workspace prototype 15/16。多代腳本可能同時處理路由、面板、焦點、幾何與 DOM mutation。目標是建立唯一正式 workspace controller，其他模組透過明確 API/事件協作。版本名稱不是刪除證據。

### B. 作品批次舊入口
追查 `#quicktools`、`#bulkPracticeAction`、`#bulkCustomList`、`#applyBulkPracticeAction`、`syncListSelectors()`、`selectedAnime`。Candidate231 已把主入口接至可見面板，但 quicktools/舊控制項仍有其他引用。逐一遷移 caller 後，才可刪除對應 markup、listener、observer 與 CSS。作品 ID 與歌曲 ID 必須保持隔離。

### C. CSS cascade
高風險熱點：
- `body.amq-songselect-route-active #amqSongSelectStage .p32-catalog`：23 次，bottom 11 種變體、top 9 種、height/width 各 8 種。
- `body.amq-songselect-route-active #audioDock`：22 次，多項幾何、display、grid、padding、z-index 互相競爭。
- `body.ui-home-menu #homeMenu .amqHomeTopFrame`：16 次。
- `body.amq-songselect-route-active #amqSongSelectStage .p32-info`：16 次。
- `body.ui-home-menu #homeMenu .amqHomeLandingAction`：16 次。
- `#quizView .quizMystery`：15 次。
- `body.amq-songselect-route-active #amqWorkspaceDock`：15 次。
- `#amqWorkspaceDock`：13 次。

按首頁、Song Select、猜歌、播放器、工作區分區建立 property/condition/source-order map，對比 computed styles 與截圖後再合併。

### D. 其他 owner 整合候選
- 音量控制主要 factory 與 fallback builder：確認故障復原契約後合併成 idempotent ensure/mount API。
- `#amqSongSelectRankingPlaceholder`、watch/custom tabs 等 fallback/template owners：確認是否互斥，建立單一 canonical creator。
- Observer/timer：先映射 owner、target、啟動與 teardown，再決定哪些可合併或移除。

## 刪除 Delete

本輪沒有新增任何完整程式碼群可僅憑靜態證據安全刪除。這不代表不存在死碼，而是還需完成 caller/DOM/data contract 證據。

- `v41-classification-diagnostic` 只有 259 bytes 且使用歷史命名，但仍引用 quiz state/event，先確認實際用途。
- 舊版命名 CSS 可能仍提供最後生效的覆寫，不可按 Candidate 編號批量刪除。
- 靜態掃描未找到直接 JS 引用的初始 DOM ID，可能由 CSS、label、template、delegation 或動態字串使用，先列待確認。
- `$ / init / api / sync / closePanel` 等同名函式可能分屬不同 IIFE，不代表重複實作。
- 歷史 Candidate213 已記錄移除的「資料品質」重標籤 script/no-reader marker，不得當作本輪新刪除，也不得復活。

## 待確認 Defer

1. quicktools 在 watchlist 的實際用途，以及舊批次 controls 的所有真實 caller。
2. `syncListSelectors()` 更新範圍與呼叫者。
3. 52 個 MutationObserver、3 個 ResizeObserver、5 個 IntersectionObserver 的 owner/target/disconnect。
4. 每個 interval 的停止條件、跨 route timeout 是否觸碰 detached DOM。
5. 28 個 storage keys 的 reader/writer/backup/import/export 關係；IndexedDB Blob 備份/還原。
6. AniList/MAL/VNDB live API、去重、來源移除、手動狀態保護與失敗復原。
7. Candidate231 專屬建置流程及遠端 HTML 上傳。
8. 動態 DOM ID、CSS selector、template、ARIA/label 的交叉引用。

## 最小刪除順序

1. 建立 source block → DOM owner → caller → storage/event/timer/observer → tests 的依賴表。
2. 先整合 route/workspace owner，再遷移作品批次 caller。
3. caller 全部遷移且測試通過後，刪除對應舊 markup/listener/observer/CSS。
4. 再按視覺區域收斂 CSS，對比固定 viewport 的 default/hover/selected/keyboard/workspace 狀態。
5. 最後清理 timer/observer 及資料包裝層。
6. 每組共用核心回歸：初始化、四工作區切換/返回、自訂清單 CRUD、作品/歌曲批次隔離、AMQ/EMQ、匯入、播放器、背景資料。

## 驗收狀態

- PASS：67/67 JS 語法、109 CSS blocks 解析、初始 ID 唯一、CSS cascade 靜態索引建立。
- NOT RUN：完整 runtime call graph、四工作區端到端、自訂清單原生 reload、真實音訊/live API/多人、固定 osu!stable 像素比對。
- BLOCKED：原生 file:///localhost 導覽及 reload 持久化，已知 Chromium managed policy 的 URLBlocklist 阻擋；未修改政策。
- NOT DONE：Candidate231 HTML 尚未上傳 GitHub，遠端 SHA 未驗證。

本批沒有修改 Candidate231 HTML，無需回滾。Candidate229 byte-identical 回滾副本仍保留於本機。
