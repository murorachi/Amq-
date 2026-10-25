# 第一批：Candidate302 全專案功能盤點（靜態證據版）

日期：2026-10-25

## 1. 基準與範圍

- 正式基準：`amq_learning_tool_v82_86_13_candidate302_emq_loader_state_validation_20261025.html`
- 大小：1,720,249 bytes
- SHA-256：`f718a744057be0a33d371306f1742aaeede90e84f33d9e62ab45f5e6db488abd`
- Candidate295 保留為唯讀回滾點：`aef896eee98c10bcb9fb1f10d6650b8e26067426f43b086e1b69fa12e3674a81`
- 本批只盤點與分類，未修改應用程式 HTML/CSS/JS，未刪除功能。
- 本機 Candidate302 檔案大小及 SHA-256 已重新核對，與正式基準一致。

## 2. 靜態盤點結果

| 項目 | 實際結果 | 解讀 |
|---|---:|---|
| HTML | 1,720,249 bytes | hash 已核對 |
| Script tags | 70 | 含外部資料來源與 JSON payload |
| 可執行 inline JS | 67 | 本次靜態語法檢查 PASS |
| 外部 script | 2 | `data.js`、`emq-data.js`，皆為執行期依賴 |
| JSON payload | 1 | AniList ID map 資料，不是死程式 |
| Style blocks | 109 | 多層樣式來源需逐層追蹤 |
| CSS qualified rules | 2,808 | parser errors=0 |
| CSS 重複 selector 字串 | 383 | 額外重複出現 665 次；不是直接刪除證據 |
| HTML IDs | 271 / unique 271 | 重複 ID=0 |
| Button / input / select | 56 / 10 / 7 | 反映初始 DOM，不代表動態狀態 |
| literal local/session storage keys | 30 | 需逐 key 追蹤讀寫與 schema |
| Observer 字串命中 | Mutation 54、Resize 3、Intersection 5 | 命中次數不等於實際存活實例 |
| Timer 字串命中 | setTimeout 137、setInterval 10、requestAnimationFrame 35 | 必須追蹤建立與清除路徑 |
| 事件字串命中 | addEventListener 480、removeEventListener 4 | 不等於執行時 listener 實例數 |
| fetch 字串命中 | 19 | 需逐一確認 API/來源及錯誤處理 |

## 3. 功能分類（第一版）

| 功能領域 | 分類 | 證據與決策 |
|---|---|---|
| 主曲庫載入與 AMQ catalog | **KEEP** | `data.js`、資料/DB 核心符號及 Stage 5 真實曲庫稽核；保留資料來源、schema 與 ID 驗證 |
| EMQ packed data loader、歌曲/作品關聯、ready state | **KEEP** | `emq-data.js`；Candidate302 source-derived loader regression 9/9 PASS；不可移除 ready gating 與關聯驗證 |
| AMQ／EMQ／MIX 模式及歌曲池 | **KEEP** | 來源模式選單及 Stage 4 pool suite；全頁模式切換仍須保留回歸測試 |
| 猜歌流程：開始、送出、跳過、下一題、計時、暫停、答案回饋 | **KEEP** | quiz DOM 與多個 quiz/learning scripts；需逐項建立操作測試 |
| 音訊播放、音量/靜音、佇列、失效音源處理 | **KEEP** | audioPlayer/audioDock、volume/queue/source-mode keys；實際播放不能由靜態 PASS 代替 |
| 曲庫瀏覽、搜尋、篩選、排序、封面與作品資訊 | **KEEP** | grid/search、decade/type/sort/watchSort 控件與 Song Select runtime |
| 觀看狀態、自訂練習清單、成員及批次操作 | **KEEP** | watchlistView/watchTabs、`aniCustomPracticeListsV1`；AMQ/EMQ schema 必須分別保護 |
| 學習計畫、間隔重複、弱點練習、猜歌歷史與統計 | **KEEP** | interval repetition、learning-system、dashboard/history symbols；不同歷史/摘要責任不可直接合併 |
| 首頁、工作區導覽、Song Select 路由、sidebar/dock | **INTEGRATE** | 多個 route/layout/runtime 層；先前 Candidate295 來源盤點記錄至少三層 wrapper，副作用與順序不同 |
| CSS cascade 與歷史版面覆寫 | **INTEGRATE** | 109 個 style blocks、383 個重複 selector 字串；須比對 declaration、specificity、media context 及 DOM 命中 |
| Storage repository、IndexedDB、匯入/匯出與備份還原 | **KEEP** | storage repository、IndexedDB references 及備份 UI；涉及使用者資料，破壞性測試只用合成資料 |
| AniList/MAL 匯入、別名、中文標題與 ID map | **KEEP** | 匯入 UI、JSON ID map payload、Chinese title scripts；資料 payload 不是死程式 |
| 多人／團隊協作、共識答題 | **KEEP** | multiplayer UI 與對應樣式；線上服務 runtime 尚未在本批重跑 |
| VNDB 個人清單、場景背景設定 | **KEEP** | VN library navigation、scene-background settings；需保護 Blob/IndexedDB 與資料 owner |
| 舊版 patch、diagnostic、匿名 script/style blocks | **NEEDS CONFIRMATION** | 67 個可執行 inline JS 區塊中有匿名區塊與歷史增量；須查 callers/events/observers/mount order |
| 已確認不可達的廢棄功能 | **DELETE：目前 0 項** | 本批沒有任何項目達到安全刪除門檻；不以名稱老舊、CSS 重複或搜尋零命中直接判死刑 |

分類說明：KEEP 表示必要能力應保留，不表示目前只有一份實作；INTEGRATE 表示需要先釐清責任與依賴，再整合；DELETE 必須有不可達/無必要依賴證據；NEEDS CONFIRMATION 表示目前證據不足。

## 4. 主要整合熱點

### A. Song Select / workspace 路由
既有 Candidate295 盤點指出至少三層 route wrapper：Song Select panel guard、generic workspace/body-class guard、final Song Select guard。相同目的地的攔截可能因 wrapper 位置不同而改變 body class 同步及首頁選單關閉行為。決策為 INTEGRATE，但不得直接刪掉任何一層。

### B. CSS 歷史覆寫
相同 selector 可能是刻意 cascade、media query、specificity 修正或不同 route 的樣式。下一步先比對 selector、declaration、媒體條件及 DOM 命中，再選擇最小整併。

### C. Script 歷史增量
版本編號、檔案位置或程式碼年齡不足以證明不可達。重疊的 route/layout/runtime 實作列入 INTEGRATE；匿名及語義不足區塊列入 NEEDS CONFIRMATION。

### D. 持久化與資料安全
目前掃描到 30 個 literal storage keys，包括 `aniCustomPracticeListsV1`、`aniQuizHistory_v1`、`aniQuizSettingsV14`、`aniCollection_v2`、音量/佇列/黑名單等。下一批需記錄每個 key 的 read/write/remove/backup/restore 路徑、schema、owner 與遷移風險。

## 5. 測試狀態

- **PASS**：Candidate302 本機大小/hash 與正式基準一致。
- **PASS**：重新執行 `stage6_static_audit.py --candidate302 <file>`：67 個可執行 inline JS 區塊語法錯誤 0；109 個 style blocks；2,808 個頂層 CSS rules；271 個 HTML IDs 全部唯一。
- **PASS（沿用前批實際結果）**：Candidate302 EMQ loader 9/9；既有合成套件 9/9 + 11/11 + 11/11，隔離測試合計 40/40。
- **PASS（沿用 Stage 5 提供資料稽核）**：真實 AMQ/EMQ 曲庫結構稽核；本批未重新掃描資料檔。
- **NOT RUN**：瀏覽器 E2E、實際音訊、動態 listener 綁定/解除、路由操作、清單 CRUD、備份/還原操作。
- **NOT RUN**：完整 AST/控制流程/動態依賴圖；函式與 selector 數量均是靜態指標。
- **BLOCKED**：GitHub 分支尚未找到 Candidate302 HTML 本體；遠端原始內容及 SHA-256 尚未核對。

## 6. 第一批結論

**第一版功能盤點已建立，但尚未宣告全專案盤點完成。** 主要必要功能、資料安全邊界及高風險整合區已列明。本批沒有修改應用程式，也沒有直接刪除任何項目。

下一批依序追蹤：
1. route wrapper 呼叫順序、副作用及 workspace 狀態。
2. storage keys 的唯一 owner、讀寫/刪除/備份路徑及 schema。
3. custom-list store/API、UI 選取、批次操作與 AMQ/EMQ schema 邊界。
4. Observer/timer/event listener 的建立、重複綁定、disconnect/clear/remove 路徑。
5. CSS selector 到實際 DOM 與 route/media context 的命中關係。

配套 JSON：`FEATURE_INVENTORY_BATCH1_CANDIDATE302_20261025.json`，包含逐一 script/style block metadata、暫定分類、storage keys、DOM references、重複 selectors 與靜態指標。
