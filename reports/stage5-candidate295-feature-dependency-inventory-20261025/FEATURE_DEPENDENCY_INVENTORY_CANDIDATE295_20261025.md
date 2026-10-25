# Candidate295 必要功能與全域符號依賴盤點（第一輪）

日期：2026-10-25

## 1. 檢查對象與邊界

- 實際檔案：使用者提供的 `index-old.html`，版本標記 `v82.86.06-candidate295-db-extraction-20261025`。
- 大小：1,720,917 bytes。
- SHA-256：`aef896eee98c10bcb9fb1f10d6650b8e26067426f43b086e1b69fa12e3674a81`。
- 本輪只做靜態文字引用盤點與功能歸類，沒有修改應用程式碼；文字命中次數/行號不等於完整呼叫圖，也不能單獨證明符號可刪。
- `data.js`、`emq-data.js` 缺席，真實資料載入與 AMQ/EMQ 筆數驗證仍 BLOCKED。

## 2. 正式功能基準

### A. 資料核心
主資料庫載入/驗證/更新；AMQ 歌曲及 EMQ 歌曲/作品資料；資料來源識別、ID 一致性與錯誤處理。

### B. 遊戲核心
AMQ、EMQ、MIX 出題及歌曲池；音訊播放/失敗處理；歌曲與作品黑名單、音訊資格；回合、計時、答案提交、下一題。

### C. 選歌與清單
Song Select 工作區、路由、歌曲列、搜尋/選取；自訂清單 CRUD、作品加入/移除、篩選、批次操作；必要工作區切換與 UI 同步。

### D. 紀錄與持久化
猜歌歷史、目標統計、回合彙整；資料驗證、保存、排程刷新、恢復與錯誤保護；清單及必要狀態持久化。

## 3. 已由原始碼支持的結論

- `loadDB()` 讀取 IndexedDB 的 `aniCollectionDB` / `cache` / `catalog`；`useDB()` 會驗證資料後更新記憶體資料。
- EMQ 載入流程解碼 base64/gzip JSON，檢查版本、歌曲/作品陣列、識別碼與歌曲到作品的引用關係。
- `songSourceV857` 使用 `__aniEmqAPI.isSong(song[1])` 區分來源。
- `songPoolForModeV857` 按模式建立歌曲池，並套用音訊資格、歌曲黑名單及作品黑名單。
- `randomSong` 支援 `amq`、`emq`、`mixed`；混合模式在兩池皆有歌曲時，抽取 AMQ 池的機率約為 2/3，EMQ 池約為 1/3，並優先選擇尚未出現的歌曲。
- 自訂清單相關 API 包含 `__aniCustomListsStoreV1` 與 `__aniCustomListMembershipV1`，需一併追蹤資料寫入、membership 與 UI 同步。
- 猜歌歷史與目標統計有分別的驗證、初始化、保存/排程保存及錯誤保護函式；必須追蹤資料 key 與讀寫來源後才能判定是否有重複實作。

## 4. 高風險整合候選

### Song Select 路由攔截

- `__amqSongSelectRouteGuardInstalled` 約在第 7,374–7,375 行包裝 `__aniNavigateApp`。
- `__amqSongSelectFinalRouteGuardInstalled` 約在第 11,650–11,653 行再次包裝相同導覽函式。
- 兩者對部分目的地有重疊映射；後一層另有關閉首頁選單的副作用，包裝順序可能影響行為。
- 決策：**整合候選／待動態驗證**。在確認進出工作區、返回、外部路由及重複初始化之前，不刪除任何一層。

### Candidate210 初始化守衛

- `__candidate210SongSelectInstalled` 保護的區塊涉及歌曲列、工作區操作、選取事件與批次清單相關行為。
- 決策：**保留必要能力、檢查模組邊界**。舊版號不是刪除證據。

## 5. 全域符號清單初步分類

| 功能群組 | 主要符號/符號族 | 初步決策 |
|---|---|---|
| A 資料核心 | `DB`, `loadDB`, `storeDB`, `useDB`, `indexedDB`, `__EMQ_PACKED_B64`, `__aniEmqAPI`, `__aniEmqChineseTitleAPIv8259`, `byAnime`, `findAnimeByMal`, `findAnimeByTitle`, `getSong` | 保留必要能力；追蹤儲存與資料來源 |
| B 遊戲核心 | `randomSong`, `songPoolForModeV857`, `songSourceV857`, `isBlacklistedSongV51`, `setBlacklistedSongV51`, `__aniIsAnimeWorkBlacklistedV825`, `listenSong`, `__aniQuizPlanV1`, `__aniQuizSubmitV47`, `__aniQuizNextV47`, `__aniQuizPauseClockV82`, `__aniQuizStopStateV82`, `__aniQuizHandleAudioFailureV857` | 保留必要能力；個別函式仍需核對引用與初始化 |
| C 選歌與清單 | `__amqProto26SongSelect`, `__amqSetSongSelectWorkspaceMode`, 兩個 route guard、`__candidate210SongSelectInstalled`, `__aniCustomListMembershipV1`, `__aniRefreshWatchlistBatchSelectionV843`, `__aniSelectedCustomListIdsV825`, `makeSongRow`, `renderWatchlistV5`, `removeImportedAnimeStatuses` | 保留必要能力；路由/入口重複需追蹤 |
| D 紀錄與持久化 | `recordQuizHistoryV51`, `saveQuizHistoryV51`, `beginQuizHistoryRoundV51`, `addQuizHistorySummaryEntryV1`, `addQuizTargetSummaryEntryV80`, `initQuizHistorySummaryV1`, `initQuizTargetSummaryV80`, `persistQuizHistorySummaryV1`, `persistQuizTargetSummaryV80`, `scheduleQuizHistorySummarySaveV1`, `scheduleQuizTargetSummarySaveV80`, `flushQuizHistorySummaryV1`, `flushQuizTargetSummaryV80` | 保留紀錄能力；查重複資料流及責任邊界 |
| 待確認 | `ondblclick`, `onformdata`, `onloadeddata`, `onloadedmetadata` | 原始碼沒有以這些名稱直接命中；可能是執行時屬性/事件鍵，不能據此判定未使用 |

使用者提供的全域符號清單已納入逐項盤點。完整清單、直接命中行號及命中次數另存於本地工作報告；對於零直接命中的事件屬性符號，仍需檢查 HTML 屬性、動態賦值及執行時來源。

## 6. 本輪決策

- **保留**：資料核心、三種出題模式、音訊資格/黑名單、猜歌流程、清單操作、猜歌歷史及目標統計的必要能力。
- **整合候選**：兩層 Song Select 路由攔截；歷史/目標統計可能重複維護的資料流；清單 API 與 UI 間可能重複的同步入口。
- **刪除**：本輪沒有符號達到安全刪除門檻。
- **待確認**：事件屬性、動態引用、初始化守衛、包裝順序及瀏覽器限定依賴。

## 7. 測試狀態

- PASS：重新核對 Candidate295 檔案大小、SHA-256 與版本標記。
- PASS（沿用前次已執行紀錄）：68/68 內嵌可執行 JavaScript 區塊通過 `node --check`；271 個 DOM ID 唯一。這些檢查不是本輪重新執行的瀏覽器測試。
- NOT RUN：本輪完整 AST/資料流分析、CSS 解析、瀏覽器路由/清單/出題/持久化操作測試。
- BLOCKED：配套 `data.js`、`emq-data.js` 缺席；先前受管瀏覽器導覽回報 `ERR_BLOCKED_BY_ADMINISTRATOR`。

## 8. 基準限制與下一步

- Candidate295 是本輪實際可檢查的驗證目標，不代表已正式升格為發行基準。
- 儲存庫既有 `BASELINE.md` 仍記錄 Candidate277 為使用者授權的工作基準；Candidate277 與 Candidate295 不可混用。
- 本輪沒有修改應用程式 HTML/CSS/JS，也沒有刪除程式。
- 下一步依序追蹤：(1) 兩層路由包裝與安裝順序；(2) 歷史/目標統計的 storage key、初始化、flush、排程保存與錯誤保護；(3) 自訂清單 store、membership、UI 選取狀態與所有持久化讀寫點。只有依賴證據完整的項目才進入刪除候選。
