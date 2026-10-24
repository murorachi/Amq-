# Stage57：Batch2 依賴盤點缺口補查（沿用 Stage55，不重做）

日期：2026-10-25  
對象：使用者授權的 Candidate277 唯讀快照  
版本：`v82.85.91-candidate277-custom-list-name-normalization-20261025`  
大小：9,373,238 bytes  
SHA-256：`b628bfb5b4aec30a34935bcf5aaac095ab405a71ebe482f9a666c2f91a019371`

## 結論

**Batch2 靜態盤點：PASS（限定範圍）**。沿用 Stage55 的 Keep / Integrate / Delete / Defer 分類，只補查尚未覆蓋的依賴邊，沒有重做全份盤點，也沒有修改 HTML/CSS/JavaScript 或使用者資料。這不等於完整動態依賴圖完成，也不代表 Batch3 瀏覽器驗收通過。

## 本輪補查

### 1. Workspace / route ownership
- `amqWorkspaceSidebar` 字面引用 125 次；`amqWorkspaceDock` 132 次；`amqWorkspaceContentBody` 35 次。計數涵蓋 CSS、註解及程式碼，不等於執行時呼叫數。
- 可見多層 owner：workspace 可見性同步（`workspaceViews` / `syncWorkspaceVisibility`，含 MutationObserver、hashchange、popstate）、workspace mode 切換、Candidate210 共享匯入/批次工作區入口、Candidate227 work-batch bridge、Candidate258 unified import workspace。
- Candidate227 bridge 依 Song Select 路由選取卡片容器，並以 grid observer 排程 `applyCards()`。這是作品批次狀態套用與 Song Select 卡片容器間的直接依賴。
- **判定：Integrate / Defer**。不可按候選編號批量刪除；需先確立唯一 route/controller contract。

### 2. Custom-list selector / storage ownership
- `syncListSelectors()` 有 7 次字面引用，分布於持久化後同步、清單渲染、練習工作區初始化及測驗自訂清單篩選初始化。
- `aniCustomPracticeListsV1` 出現在備份/恢復 key 清單與讀取路徑；相關邏輯包含 `listData`、`persist`、`customListById`、`renderCustomLists`、`installQuizCustomFilter`。
- `aniDockCustomListIdV99` 保存目前選取狀態，與清單資料不是同一個責任。AMQ `aniCustomPracticeListsV1` 與 EMQ `aniEmqWorkListsV8254` 仍分離，沒有證據支持直接合併 schema。
- **判定：Keep + Integrate**。所有 storage reader/writer、備份/匯入/還原及遷移分支仍需完整追蹤。

### 3. CSS cascade / dynamic styles
- Stage55 計數維持：109 個 style blocks、3,628 個 CSS qualified rules、2,244 種 selector 字串、647 種重複 selector；解析錯誤為 0。
- Workspace 與 Song Select 樣式分布於多個帶版本/候選標籤的 style block，並受 route class、`data-amq-workspace-mode`、`hidden`/ `class` 變動及 `!important` 規則影響。
- **判定：Integrate / Defer**。重複 selector 只是 cascade 熱點，不是 dead CSS 證據；未取得 computed style 與參考圖像素比對，本輪不刪 CSS。

### 4. Observer / timer lifecycle
- Stage55 字面計數：MutationObserver 54、ResizeObserver 3、IntersectionObserver 5；setTimeout 144、setInterval 10、clearTimeout 38、clearInterval 9；addEventListener 479、removeEventListener 4。
- 補查可辨識 workspace visibility observer、Song Select DOM/artwork observer、work-batch grid observer 與 debounce timer、音訊媒體事件 finish() 清理路徑，以及部分模組 route/hash/popstate listener。
- 部分 observer 在初始化後直接建立，片段中未見 teardown；但不能單憑這點宣稱 leak，因為模組可能只初始化一次或生命週期等同整頁。
- **判定：Defer**。需逐項列出 owner → target → callback → route → disconnect/clear；路由切換測試尚未執行。

### 5. Dynamic templates / legacy entries
- 初始 HTML 272 個 ID 唯一（Stage55 已測），但多個工作區/匯入面板由 JavaScript 動態建立。
- 作品批次面板透過 Candidate210 共享入口呼叫，呼叫後還會輪詢確認面板是否掛載；不能只搜尋舊按鈕 ID 判定整組功能已刪除。
- Candidate277 未找到 `#quicktools`、`bulkPracticeAction`、`bulkCustomList`、`applyBulkPracticeAction` 的 runtime 字面引用（quicktools 僅歷史註記）。這只證明名稱未直接引用，不代表所有舊批次行為均已無依賴。
- **判定：已確認的歷史刪除項不復活；其他動態入口待確認**。

## 測試結果

| 項目 | 結果 | 證據 / 限制 |
|---|---|---|
| 基準完整性 | PASS | 本輪重算大小與 SHA-256；未修改來源檔 |
| Stage55 靜態檢查沿用 | PASS | 67/67 JS node --check、109 CSS blocks parse、272 初始 ID 唯一；為先前已實際執行檢查 |
| Workspace / route 補查 | PASS（靜態） | 找到 workspace visibility、mode switch、Candidate210 shared workspace、Candidate227 batch bridge、Candidate258 import workspace |
| Custom-list 補查 | PASS（靜態） | syncListSelectors() 7 次；區分清單資料與目前選取狀態責任 |
| CSS / observer / timer 補查 | PASS（僅盤點） | 代表性 cascade 與生命週期路徑已記錄，未宣稱無 leak |
| 原生瀏覽器互動、路由反覆切換、reload persistence | BLOCKED / NOT RUN | 既有 managed Chromium 導覽限制，未更動環境政策 |
| 完整 AST 呼叫圖、computed style、像素比對 | NOT RUN | 非本輪範圍 |
| 真實 API、音訊、多人、IndexedDB Blob 還原 | NOT RUN | 未執行端到端驗收 |
| HTML/CSS/JS 修改 | NOT RUN | Candidate277 保持不變 |

## Batch2 收尾與交接
1. Stage55 保留為主要全域分類報告；Stage57 是缺口補查，不取代或重複 Stage55。
2. 有足夠證據的 Keep / Integrate 方向已清楚；目前沒有足夠證據把大範圍動態功能或 CSS 安全分類為 Delete。
3. **Batch2 靜態依賴盤點結案；動態依賴及瀏覽器驗收移交 Batch3/P0 驗收**。Batch3 優先處理候選版 metadata 不一致、P0 路由/自訂清單操作與持久化、工作區切換與清理。新增功能需求待使用者於 Batch3 討論，不在本輪自行擴大範圍。
4. Candidate277 為工作基準，Candidate276 為直接回滾父版本。Candidate277 原檔未修改。

## 回滾
本輪沒有源碼變更，無需程式碼回滾。後續候選需從 Candidate277 原檔建立唯一新版本，不可覆寫 Candidate277 或 Candidate276。
