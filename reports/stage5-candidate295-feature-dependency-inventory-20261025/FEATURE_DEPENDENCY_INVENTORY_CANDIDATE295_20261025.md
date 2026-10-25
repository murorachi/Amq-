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


## 10. 第二輪 targeted gap audit：路由層數、清單資料所有權、紀錄責任

### 10.1 路由不是兩層，而是至少三層包裝

- 基礎導覽入口：`window.__aniNavigateApp=showView`，約第 891 行。
- 第一層 Song Select route guard：約第 7,373–7,376 行，將 Song Select 中部分目的地改送工作區面板。
- 通用 workspace guard：約第 10,594–10,607 行，包裝當時的導覽函式，依目的地同步 `amq-standalone-route`、`amq-workspace-active` 等 body class，並用 `__amqWorkspaceGuarded` 防止自身重複安裝。
- Final Song Select route guard：約第 11,650–11,654 行，再包裝目前的導覽函式；命中面板目的地時直接返回，否則先關閉首頁選單再轉交內層。
- 靜態安裝順序推論為：`final Song Select guard → generic workspace guard → earlier Song Select guard → base showView`。需要瀏覽器驗證實際呼叫、重複初始化及返回流程。
- 整合時必須保留三種責任：面板路由攔截、通用 route/body-class 同步、離開路由時關閉首頁選單。不可把三個 wrapper 直接視為同一功能。

### 10.2 AMQ 自訂清單有正式資料所有者，但存在多處相容性 fallback

- 正式 key：`aniCustomPracticeListsV1`。
- 正式 store：第 3,543 行附近建立 `customListsStoreV1`，透過 `window.__aniCustomListsStoreV1` 唯一公開，提供 `read`、`refresh`、`write`、`mutate`、`toggleMembership`，統一驗證、名稱正規化、持久化與 selector 同步。
- `__aniCustomListMembershipV1` 是同一 store 的 membership adapter，提供 `getLists`、`toggle`、`has`。
- 歌曲 dock、多人房間的 AMQ 清單選擇器、舊卡片操作模組等消費端在 store 不可用時仍直接讀取同一 localStorage key。這可能是初始化期間的相容性 fallback，也可能是可整合的重複讀取路徑；時序未驗證前不刪。
- 清單成員以作品 ID（`animeIds`）保存，不是歌曲 ID；批次操作也明確提示同作品的歌曲會一起納入/移除。

### 10.3 EMQ 清單是不同 schema，不可合併成同一儲存格式

- EMQ key：`aniEmqWorkListsV8254`；選取狀態：`aniEmqWorkListsSelectedV8254`；音訊覆寫：`aniEmqAudioOverridesV8254`。
- EMQ 列含 `workIds`、`vndbIds`、`songIds`，使用獨立 `loadDb` / `saveDb`。
- AMQ 清單使用 `aniCustomPracticeListsV1` 與 `animeIds`，具 recovery-aware store。
- 決策：兩種清單都必要，但資料模型不同。不可直接合併 storage key 或列結構；任何共用應保留 schema adapter 並提供遷移證據。

### 10.4 詳細歷史與兩種摘要是不同責任，不能直接視為重複

- 詳細歷史：`aniQuizHistory_v1`，最多保留最近 2,000 筆。
- 歷史摘要：`aniQuizHistorySummaryV1`，彙總正誤、耗時、歌曲/日期及去重狀態。
- 目標摘要：`aniQuizTargetSummaryV1`，按 anime/title/artist/unknown 維護另一組統計。
- `saveQuizHistoryV51` 更新詳細歷史後，分別更新歷史摘要與目標摘要；兩個摘要各自有驗證、初始化、去重、排程保存與無效資料保護流程。
- 初步結論：三份資料用途與 schema 不同。先確認重複掃描/保存成本，不刪除任何一份摘要。

### 10.5 更新後決策

- 保留：AMQ/EMQ 分開的資料 schema；AMQ 清單正式 store/membership API；詳細歷史與兩種摘要能力；路由三種不同責任。
- 整合候選：直接讀取 AMQ 清單 localStorage 的 fallback；三層路由 wrapper 的責任邊界；摘要初始化時重複掃描詳細歷史的成本。
- 刪除：本輪仍無足夠證據安全刪除任何項目。
- NOT RUN/BLOCKED：實際路由切換、清單 CRUD/重新載入、摘要持久化、EMQ 資料解碼與瀏覽器操作。


## 11. 第三輪 source-order audit：補充可用於最小修改的證據

### 11.1 導覽包裝實際順序已可從靜態原始碼建立

檔案執行順序的可見證據：
1. 約第 7373 行：第一個 Song Select route guard 捕捉當時的 `window.__aniNavigateApp`，在 Song Select route active 時攔截 watchlist/practice/explore/learningPlan/dashboard/vnList，並改呼叫 `__amqWorkspaceContentOpen`。
2. 約第 10594 行：generic workspace guard 捕捉當時已包裝的 navigator，成功安裝後標記 `guardedNavigate.__amqWorkspaceGuarded=true`。它在呼叫內層後更新 body class；dashboard 特別移除 `amq-standalone-route`，其他目的地加上該 class 並移除 `amq-workspace-active`。安裝流程還會在 0ms、80ms 重試。
3. 約第 11650 行：final guard 再捕捉目前 navigator。Song Select route active 時，對同一組目的地執行工作區面板攔截；未攔截時先關閉首頁選單，再呼叫內層 navigator。

因此靜態包裝順序為 final guard → generic workspace guard → first Song Select guard → 原始導覽。兩個 Song Select guard 的目的地集合目前看起來相同，但它們處於包裝鏈的不同層，且 generic guard另有 body-class 責任。這是**重複攔截候選**，尚不能直接移除任一 guard；需先確認事件派發、返回路由、首頁選單副作用及重複安裝的真實行為。

### 11.2 AMQ 自訂清單直接 localStorage fallback 的範圍已縮小

靜態命中顯示 AMQ 清單 key `aniCustomPracticeListsV1` 仍被多個消費端直接讀取：
- 約第 2359 行：播放器 dock 的 custom-list 播放模式，先讀正式 store，缺失時直接解析 localStorage。
- 約第 4983 行：學習/練習入口的 `readCustomLists()`，先讀正式 store，缺失時呼叫 `readJson(KEY,...)`。
- 約第 7410 行：Song Select 自訂清單工作流的 `read()`，先讀正式 store，缺失時直接解析 localStorage。
- 約第 11492 行：dock 新版模式選單填充清單選項，先讀正式 store，缺失時直接解析 localStorage。
- 約第 823 行附近的完整備份匯出/匯入明確列入 AMQ 清單 key；這是備份格式支援，不應視為重複業務 store。

正式 store 在約第 3543 行建立。上述讀取函式雖在源碼較早處定義，但其主要使用入口是事件回呼；「store 通常會先於使用者操作完成初始化」是合理推論，不是瀏覽器實測。故可列為**低風險整合候選，但仍需驗證初始化及 restore/import 路徑**。備份匯入/匯出對 localStorage 的直接操作屬資料交換責任，不能單純改成 store.read() 取代。

### 11.3 歷史資料流：可確認單次紀錄同時更新三種不同資料

- 啟動時先讀 `aniQuizHistory_v1` 詳細紀錄。
- `saveQuizHistoryV51(entry)` 將詳細紀錄寫回該 key，並呼叫 `addQuizHistorySummaryEntryV1(entry)` 及 `addQuizTargetSummaryEntryV80(entry)`。
- 兩個摘要的更新都以自己的 processed IDs 做去重，並各自排程保存；詳細紀錄上限為 2,000 筆。
- 初始化函式也會從詳細紀錄補建/同步摘要，因此可能有啟動時掃描成本；但這同時是遷移/復原能力，不能直接刪除。
- 決策：保留資料模型及資料恢復路徑。下一步可以檢查初始化是否在每次啟動都掃描完整 2,000 筆，以及兩摘要的初始化是否有可共享的單次讀取快照；這種效能整合不得改變摘要 schema 或 processed-ID 去重語意。

### 11.4 可進入候選修改設計、但本輪仍不改應用程式碼

1. 先在單一路由入口保留三種明確責任：Song Select 面板目的地攔截、通用 body-class 同步、離開首頁時關閉首頁選單。測試表先列出六個目的地及非面板路由。
2. 將四個 AMQ 清單讀取 fallback 先改成一個共用 reader/API 的設計候選；備份匯入/匯出維持對持久化格式的明確存取。
3. 研究摘要初始化能否共用一次排序後的詳細紀錄快照；先測試歷史為空、摘要缺失、摘要有效但落後、無效摘要已隔離、去重邊界五種資料狀態。
4. 在這三項設計完成依賴表與回歸案例前，不提交應用程式碼修改。

## 12. 本輪重新核對的靜態指標

- Candidate295 檔案仍為 1,720,917 bytes，SHA-256 仍為 `aef896eee98c10bcb9fb1f10d6650b8e26067426f43b086e1b69fa12e3674a81`。
- 字串命中次數（文字搜尋，非呼叫次數）：`__aniNavigateApp` 49；`aniCustomPracticeListsV1` 10；`__aniCustomListsStoreV1` 7；`aniQuizHistory_v1` 13；`aniQuizHistorySummaryV1` 8；`aniQuizTargetSummaryV1` 8。
- HTML 有 70 個 script 開啟標籤及 109 個 style 開啟標籤。這些計數只是盤點指標，不代表所有 script/style 都是獨立有效模組。
- 本輪沒有更動 Candidate295 HTML/CSS/JS，未刪除任何符號。


## 13. Route wrapper semantic comparison (important qualification)

The two Song Select guards have the same six route keys and the same panel destinations:
- `watchlist` → `watchlist` / 我的清單
- `practice` → `practice` / 學習中心
- `explore` → `practice` / 探索新歌
- `learningPlan` → `learning-plan` / 學習計畫
- `dashboard` → `dashboard` / 學習統計
- `vnList` → `vn-list` / VNDB 個人清單

Both dispatch `amq-workspace-route-intercepted` with the destination and panel. However, they are not behaviorally interchangeable in the current wrapper chain:
- The first guard is inside the generic workspace guard. When it intercepts a panel route and returns, the generic wrapper still runs its post-call body-class mutations.
- The final guard is outside the generic guard. When it intercepts one of those panel routes, it returns before the generic wrapper is called, thereby bypassing those body-class mutations. For non-intercepted routes it closes the home menu and delegates inward.

Therefore the guards share the interception mapping but their placement changes side effects. This is evidence of duplicated routing logic with an ordering-dependent compatibility effect, not proof that either whole block is safe to delete. A future integration should explicitly encode the desired body-class behavior for intercepted panel routes, then move the map to one owner and remove the duplicate only after the regression matrix passes. Runtime behavior remains NOT RUN.

## 14. Static-only regression matrix for the next code change

| Case | Expected behavior to preserve | Current verification |
|---|---|---|
| Song Select active + each of six panel destinations | Open correct panel, dispatch interception event once, remain in Song Select | NOT RUN |
| Song Select active + home/quiz/multiplayer | Navigate normally and close home menu as appropriate | NOT RUN |
| Song Select inactive + six destinations | Use normal app navigation | NOT RUN |
| Dashboard route | Preserve its special standalone body-class behavior | NOT RUN |
| Repeat initializer / guard installation | No nested duplicate wrapper or repeated event effect | NOT RUN |
| Generic route class synchronization after ordinary navigation | Preserve current body-class contract | NOT RUN |
| Browser back/return from workspace panel | Restore expected route and panel state | NOT RUN |

This matrix is design evidence only; it does not represent executed browser tests.


## 15. Re-run executable-script syntax check and correct prior count

The latest local re-check parsed script tags by type and excluded the embedded JSON data block `aniAnilistIdMapV8237` from JavaScript syntax testing:
- 70 total script tags in HTML.
- 2 external script tags.
- 1 inline JSON data block, not executable JavaScript.
- 67 executable inline JavaScript blocks.
- Node.js `--check`: PASS for all 67/67 executable inline JavaScript blocks.
- Candidate295 remained 1,720,917 bytes, SHA-256 `aef896eee98c10bcb9fb1f10d6650b8e26067426f43b086e1b69fa12e3674a81`.

Correction: earlier report text described 68/68 inline blocks as executable JavaScript. That count included the JSON data block. The accurate executable-JavaScript count is 67/67; the JSON payload was not part of the syntax test. This is a documentation correction only; no application source was changed.


## 16. Stage 5.5 — AMQ custom-list fallback reads: dependency and risk review (2026-10-25)

### Evidence from Candidate295 source
Canonical store owner:
- window.__aniCustomListsStoreV1 is defined once in the custom-list/practice module (around lines 3535–3543).
- It exposes read, refresh, write, mutate, and toggleMembership. The read API returns a cloned normalized snapshot from the store's in-memory listData.
- The same module owns schema validation, normalization, safe persistence, recovery/quarantine behavior, and selector synchronization. It is the appropriate canonical owner for runtime consumers.

Fallback consumers still read aniCustomPracticeListsV1 directly when the canonical API is absent:
1. Dock random playback custom-list pool, around line 2359 (eligiblePool('custom-list')).
2. Learning/practice consumer readCustomLists(), around line 4983.
3. Song Select custom-list workflow, previously located around line 7410. Recheck exact line after any source edit.
4. Candidate295 bottom dock mode dropdown, around line 11492.

The four fallbacks are not confirmed dead code. Their runtime necessity depends on initialization order and whether a consumer can execute before the store is installed. A direct storage read also does not necessarily have the same normalization/recovery guarantees as store.read().

### Classification
- Canonical store: KEEP.
- Four runtime direct-read fallback branches: INTEGRATE candidate / NEEDS CONFIRMATION before deletion. Replace only after proving all consumers run after store initialization and that a missing store should fail closed or display a clear unavailable state.
- Backup import/export reads and writes of aniCustomPracticeListsV1: KEEP. They operate on the explicit backup boundary and must remain compatible with persisted data; they are not duplicate runtime business-store consumers.
- EMQ keys and work-list schema (aniEmqWorkListsV8254, aniEmqWorkListsSelectedV8254, aniEmqAudioOverridesV8254): KEEP separate. Do not merge with AMQ animeIds work-level lists without a migration/adapter and compatibility tests.

### Safe consolidation plan
1. Add a startup/consumer-order check proving the canonical store is installed before each consumer can execute.
2. Add a single read adapter with an explicit unavailable/error result; do not silently interpret store failure as an empty list if that would hide valid saved lists.
3. Exercise each consumer with: normal store, empty valid store, malformed persisted payload quarantined, storage read/write exception, and store API unavailable.
4. Only then remove duplicated localStorage fallback branches in a new child candidate. Preserve backup import/export direct storage handling.
5. Verify custom-list create/rename/delete, membership add/remove, playback pool selection, selectors, reload persistence, and restore/import behavior.

### Test status
- Static source-location/dependency inspection: PASS for identifying the four fallback sites and canonical store API.
- Browser initialization-order and consumer behavior: NOT RUN.
- CRUD, selector synchronization, playback, reload persistence and backup/restore: NOT RUN.
- Application source changes/deletions: NONE.

## 17. Stage 5.5 — Route-owner consolidation design (static; no source edits) (2026-10-25)

### Current wrapper chain
The current source-order chain is:
1. Base showView exposed as window.__aniNavigateApp (around line 891).
2. First Song Select route guard (around lines 7373–7400).
3. Generic workspace/body-class guard (around lines 10594–10607).
4. Final Song Select route guard (around lines 11650–11666), which becomes the outermost wrapper.

Both Song Select guards map the same six destinations:
- watchlist → panel watchlist / 我的清單
- practice → panel practice / 學習中心
- explore → panel practice / 探索新歌
- learningPlan → panel learning-plan / 學習計畫
- dashboard → panel dashboard / 學習統計
- vnList → panel vn-list / VNDB 個人清單

The two guards are not behaviorally interchangeable. The inner guard's intercepted return still returns through the generic wrapper, allowing its post-call body-class synchronization to run. The outer final guard's intercepted return bypasses the generic wrapper entirely. Both guards dispatch amq-workspace-route-intercepted, but the outer guard currently intercepts mapped routes first, so its early return normally prevents the inner guard from running for those mapped calls. The maps are redundant in shape, but their removal must preserve intended body-class behavior.

### Proposed single-owner design
Do not simply delete one wrapper. Replace the layered route mutations with one explicit route owner that:
1. Checks whether Song Select is active.
2. For the six mapped destinations, opens the appropriate workspace panel and dispatches exactly one amq-workspace-route-intercepted event.
3. Explicitly applies the intended body-class state for the intercepted panel route rather than relying on accidental wrapper post-effects.
4. For non-intercepted destinations, closes the home menu exactly once and delegates to the base navigator.
5. Preserves the generic workspace guard's special handling for dashboard and non-Song-Select route class transitions.
6. Installs idempotently and does not stack wrappers after repeated initialization.

### Required regression matrix before removing either guard
- Song Select active + each of six panel destinations: correct panel, one interception event, Song Select remains active, expected body classes.
- Song Select active + home, quiz, and multiplayer: base navigation works, menu closes once, route classes are correct.
- Song Select inactive + all six destinations: ordinary navigation works, no panel interception event.
- dashboard: verify its special amq-standalone-route behavior and dashboard/workspace visibility.
- Repeated initializer/guard installation: exactly one active owner and one event per mapped navigation.
- Return/back from each panel to Song Select and from Song Select to home.
- Generic route class synchronization and home-menu state after navigation.

### Test status and decision
- Static wrapper-order and side-effect comparison: PASS.
- Browser route/back/return regressions: NOT RUN (managed browser restrictions previously blocked runtime interaction).
- Safe deletion now: NO. The next implementation candidate must first make intended side effects explicit and then pass the matrix. No route guard was removed in this stage.

## 18. Stage 5.5 — Candidate295 inventory decision (2026-10-25)
- Candidate295 remains a validation target, not the formal working baseline.
- Formal baseline remains Candidate277 as recorded in BASELINE.md; do not silently replace it with Candidate295.
- Candidate295 source integrity rechecked: 1,720,917 bytes; SHA-256 aef896eee98c10bcb9fb1f10d6650b8e26067426f43b086e1b69fa12e3674a81.
- No HTML/CSS/JS or application storage schema was modified.
- No deletion is authorized by the evidence gathered so far. Route guards and fallback readers remain INTEGRATE / NEEDS CONFIRMATION, not DELETE.
- Next priority: recover/verify the formal Candidate277 source in the active workspace, then run the route and custom-list regression suite against that baseline before implementing consolidation. If Candidate277 cannot be obtained, record the block and continue only with source-independent analysis or a separately authorized Candidate295 child candidate.


## 19. Stage 5.6 — Custom-list fallback initialization timing and baseline retrieval (2026-10-25)

### Script-order evidence
- The playback/dock module that defines the first fallback consumer appears before the custom-list store script in document order (playback logic around lines 1752–2463; canonical store script starts around line 3503).
- In the inspected playback initialization segment, the mode selector is synchronized and change handlers are registered; no immediate call to setMode(custom-list) was found. The custom-list pool function is called by interaction-driven playback paths.
- The other three runtime consumers appear after the canonical store script in document order (multiplayer consumer around line 4983; Song Select workflow around line 7410; bottom dock around line 11492).
- This makes normal user-interaction-before-store-initialization unlikely in a successfully parsed page. It does not prove that the store always initializes successfully, nor does it justify deleting all fallback behavior without runtime tests.

### Revised fallback decision
- Normal initialization-order dependency: **not demonstrated by static evidence**.
- Fallback purpose: likely degraded read compatibility when the canonical store API is absent or failed to initialize; this remains an inference.
- Preferred eventual integration: centralize the legacy read fallback behind one explicit compatibility adapter and expose whether the canonical store or fallback was used. Do not silently allow a failed canonical store to masquerade as a fully healthy CRUD subsystem.
- Deletion decision: **NOT AUTHORIZED** until tests cover canonical-store startup failure, malformed payload quarantine, read-only playback/list rendering, and CRUD operations with the store unavailable.

### Formal baseline retrieval attempt
- GitHub branch search for Candidate277 returned no matching branch.
- GitHub code search for the exact Candidate277 filename/version and the term Candidate277 returned no indexed results.
- Fetching the expected Candidate277 HTML path from the current inventory branch returned HTTP 404 / NOT_FOUND.
- Therefore the formal Candidate277 source is not present at the expected repository path and could not be verified from this branch. The baseline decision remains unchanged; Candidate295 is not promoted.
- Candidate277-source-dependent edits are **BLOCKED** until the actual file or a verifiable repository location is available. Source-independent analysis of Candidate295 may continue, but any Candidate295 code change requires separate authorization and a uniquely named child version.


## 20. Stage 5.7 — Formal baseline decision updated by user (2026-10-25)
- The user explicitly designated Candidate295 as the formal working baseline and instructed us to stop searching for Candidate277.
- Local source was rechecked: /mnt/data/index-old.html, 1,720,917 bytes, SHA-256 aef896eee98c10bcb9fb1f10d6650b8e26067426f43b086e1b69fa12e3674a81.
- Candidate295 is no longer validation-only. It is the sole active baseline for the next child candidate.
- Candidate277/Candidate276 are historical records only. No further recovery search is required.
- No application source edits or deletions occurred in this baseline-decision stage.
- Existing test status is unchanged: 67/67 executable inline JS syntax checks PASS (previously executed); duplicate DOM ID scan PASS (previously executed); Candidate295 CSS parsing and browser runtime checks NOT RUN/BLOCKED; external data.js/emq-data.js validation BLOCKED because those files are not in this workspace.


## 21. Stage 5.8 — Re-run static validation of the adopted baseline (2026-10-25)

### Source integrity
- Local file: /mnt/data/index-old.html
- Size: 1,720,917 bytes.
- SHA-256: aef896eee98c10bcb9fb1f10d6650b8e26067426f43b086e1b69fa12e3674a81.
- Hash and size are unchanged by the read-only checks.

### Actual test results
- **PASS** — Node.js --check for 67/67 executable inline JavaScript blocks. There are 70 script tags total, including 2 external script references and 1 application/json payload; these three were not counted as executable inline JavaScript blocks.
- **PASS** — tinycss2 1.5.1 parsed all 109 style blocks. Counted 2,808 top-level qualified CSS rules; zero stylesheet-level parse errors and zero declaration-level parse errors.
- **PASS** — DOM ID scan: 271 IDs, 271 unique; zero duplicates.
- **NOT RUN/BLOCKED** — browser rendering, route interaction, Song Select return/back, custom-list CRUD and persistence, audio/live API/multiplayer.
- **BLOCKED** — external data validation. The HTML references data.js and emq-data.js, but neither file is present at /mnt/data/data.js or /mnt/data/emq-data.js in this workspace.

### Interpretation
These results establish syntax and parser-level consistency only. They do not prove that the page renders correctly, that runtime dependencies initialize, or that AMQ/EMQ data load. No application source was edited or deleted in this stage.
