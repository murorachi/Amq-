# AMQ 工作區所有者矩陣 — Candidate340 / Batch45 前置文件

- 核對來源：`amq_learning_tool_v82_86_51_candidate340_batch44_unified_workspace_sidebar_20261026.html`
- 大小：1,627,175 bytes
- SHA-256：`74e3d7eb0287cb04dcad0caf08d3d640abb32e21faa6fcc3be00e93a1438f158`
- 本文件為實際來源盤點；本批未修改應用程式 HTML。

## 建立／事件／幾何所有者

| 節點／責任範圍 | 建立者 | 事件所有者 | 幾何所有者 | 判定 |
|---|---|---|---|---|
| `#amqWorkspaceDock` | 原始 HTML；Candidate77 只移至 body | 目標：Prototype15 唯一處理 `[data-ws]`；目前仍由 Candidate76 capture handler 攔截 | Candidate77 僅負責歸位與清理 dock inline style；Candidate84/94 舊 dock CSS 待隔離 | Batch45 待完成事件移交 |
| `#amqWorkspaceSidebar` | 原始 HTML | Candidate76 close button；Candidate76 目前攔截 dock `[data-ws]` | Candidate76 `__amqWorkspaceSidebarGeometry`，依 Song Select／一般工作區分支 | 幾何已統一，事件 owner 尚未移交 |
| `#amqWorkspacePanelClose` | Candidate76 動態建立 | Candidate76 closePanel → `__amqWorkspaceSidebarClose` | 隨側欄，無獨立幾何 | 保留 |
| `#amqSongSelectRankingPlaceholder` | Candidate70 動態建立 | 無 click owner | Candidate76 讀取 rect 作為幾何錨點 | 保留 |
| `#amqSongSelectBackButton` | Candidate70 動態建立 | Candidate70 返回首頁 click | Dock 內部節點，受 dock layout/CSS 影響 | 保留；ESC/返回需回歸 |
| `#amqSceneBgQuickOpen` | Candidate70 動態建立 | Candidate70 click 轉送到 `#sceneBackgroundOpen` | `.wrap>.top .actions` 版面 | 保留 |
| `#wsActions [data-ws-action]` | Prototype15 `setWorkspace()` 動態建立 | Candidate82 capture 處理其映射 action；Prototype15 bubbling 處理其餘 action；Candidate258 capture 攔截部分匯入 action | Candidate76 側欄幾何及 workspace CSS | 與 `[data-ws]` 分層保留 |
| `#amqWorkspaceContentPanel` | Candidate82 動態建立 | Candidate82 close/back/Escape/actionHandler；Candidate193 路由 guard 可呼叫 API | Candidate82 content panel geometry/resize | 保留，與側欄狀態分開 |
| `#c99LeftRail` | Candidate99 動態建立 | Candidate99 rail actions；部分匯入由 Candidate258 capture 攔截 | Candidate99 與 Song Select CSS | 保留 |
| `#amqSongSelectTracklist` | Candidate137 歌曲清單 runtime | Candidate137 row/selection；Candidate99 另訂閱歌曲選取事件，待 Batch46 核對 | Candidate137 與 Song Select CSS | Batch46 追蹤，不刪 |
| `[data-home-action]` | 多個首頁/選單模組建立 | Candidate82 有 workspace-active 條件式攔截；Candidate60 有 standalone-route capture；Candidate193 是導航包裝器，非直接 click listener | 各 route UI 所屬模組 | 必須分開記錄事件與導航 wrapper |
| `#grid .card.amqListNotMember85` | 動態作品卡片 renderer | 正式 membership/filter flow | Candidate94 style 中的 membership selector | Candidate94 不可整塊降級 |

## 已核對的差異
1. Candidate70 在 Candidate340 中沒有 `[data-ws]` 綁定；其 click handlers 是返回按鈕與背景快捷按鈕。
2. Candidate77 在 Candidate340 中沒有 document click 攔截；只保留 dock 歸位、清理 inline style、resize 與導航時 layout。
3. Candidate76 仍有 `dock.addEventListener('click', ..., true)`，是目前 `[data-ws]` 的 capture-phase 攔截點。
4. Prototype15 `setWorkspace()` 目前更新面板內容、aria-pressed 與 sessionStorage，但尚未註冊 `[data-ws]` click handler，也尚未 toggle `amq-dock-expanded`。
5. Candidate94 同時包含 `#grid .card.amqListNotMember85` membership filter。只能抽取已確認的 dock selector，不能移走整個 style block。
6. Candidate193 是 `window.__aniNavigateApp` wrapper；目前沒有直接註冊 `[data-home-action]` click handler。需比較 Candidate60/Candidate82 的實際 capture listener 與路由條件。

## 下一步安全順序
1. Batch45 將 `[data-ws]` click owner 移交 Prototype15；同步重構 Candidate76 API，避免 toggle class 後又被 open/close API 重複改寫。
2. 移除 Candidate76 dock click listener。Candidate70/77 維持現況，不刪不存在的綁定。
3. 從 Candidate84 與 Candidate94 只抽出已確認的 dock CSS 到 `style#legacy-dock-regression`，加 `media="not all"` 使其不參與正式 cascade；Candidate94 membership filter 留在正式 style。
4. 分別追蹤 Candidate60/Candidate82/Candidate193 的 click capture、導航包裝與路由條件，再決定去重。
5. 靜態斷言與瀏覽器回歸分開記錄。瀏覽器受阻時，互動測試標記 NOT RUN。

## 版本安全
- Candidate340 是本次盤點來源，未覆蓋。
- 新程式候選必須使用唯一版本名。
- 回滾到 Candidate340；Candidate302 正式基準與 Candidate320 回滾點保持不變。
