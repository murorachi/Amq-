# Stage 10：Song Select 工作區批次入口可達性驗收

日期：2026-10-24

## 基準與保護
- 唯一程式起點：Candidate222
- 檔案：`amq_learning_tool_v82_85_46_candidate222_unreachable_batch_bridge_cleanup_20261024.html`
- 大小：9,348,268 bytes
- SHA-256：`39d9962c38ab928f51969237063230e8f77dc6f9416f8bf9691b12c48522c723`
- 本階段未修改 HTML、資料 schema、儲存鍵或正式業務處理器。Candidate222 原檔保持不變。

## 執行環境與方法
- PASS：確認 `/usr/bin/chromium` 可啟動，版本 144.0.7559.96。
- BLOCKED：Chromium 導覽 `file://` 與 `http://127.0.0.1` 均回報 `ERR_BLOCKED_BY_ADMINISTRATOR`。
- 因導覽限制，改以 Playwright `page.set_content()` 載入 Candidate222 HTML，並在 HTML 開頭注入僅供測試的記憶體型 localStorage/sessionStorage shim。這能執行 DOM 與事件流程，但不是原生 file:// 或持久化來源驗收。

## 實際驗收結果

| 案例 | 結果 | 證據／限制 |
|---|---|---|
| Candidate222 初始化與錯誤監聽 | PASS | 記憶體儲存 shim 下無 pageerror、無 console error |
| 進入 Song Select 路由 | PASS | `window.__aniGetActiveViewV82()` 回傳 `catalog`；Song Select stage 可見；歌曲列 180 筆 |
| 使用者可見的舊 C99 左欄 | PASS | 左欄有清單匯入、VNDB 匯入、自訂清單管理、學習計畫等入口，但沒有作品批次整理入口 |
| Workspace dock/sidebar 可見性 | FAIL | Song Select 路由中 `#amqWorkspaceDock` 與 `#amqWorkspaceSidebar` 均不可見；dock 執行時有 inline `display:none!important` |
| 舊作品批次 `#quicktools` 可見性 | FAIL | Song Select 路由中 `#quicktools` 不可見；CSS 明確以 `body.amq-workspace-active #quicktools` 及 `body.amq-songselect-route-active ... #quicktools, .quicktools` 隱藏 |
| 隱藏 workspace action `list-batch-works` | FAIL | 在隔離頁面以程式事件觸發後，狀態回報「作品批次工具尚未載入；沒有修改資料。」；底層 quicktools 不可見，且該 action 本身位於不可見的 workspace sidebar |
| 隱藏 workspace action `list-batch-songs` | PASS（handler fixture） | 觸發後建立 `#amq210BatchList`，Song Select tracklist 仍有 180 個歌曲批次 checkbox；但 action 所在 sidebar 不可見，故不能視為使用者流程 PASS |
| 隱藏 workspace action `list-custom-manager` | PASS（handler fixture） | 可呼叫共用自訂清單管理面板；但 action 所在 sidebar 不可見，故不能視為使用者流程 PASS |
| 以上隔離流程的 JS 錯誤 | PASS | 三個獨立 browser page 均未記錄 pageerror 或 console error |
| 原生 `file://`、真正持久化 reload、音訊／API／多人／像素比較 | NOT RUN / BLOCKED | 導覽被環境管理政策攔截；記憶體 shim 不代表持久化驗收 |

## 根因判定
1. Candidate221 新增的 `list-batch-works`、`list-batch-songs` 入口放在 `#amqWorkspaceSidebar`，但該 sidebar/dock 已由後續 UI 階段隱藏，與實際可見的 `#c99LeftRail` 不是同一個導航 owner。
2. `list-batch-works` 仍嘗試開啟舊 `#quicktools`；Song Select route 的 CSS 明確隱藏該區，因此即使 handler 被觸發也無法使用。
3. 歌曲批次的 Candidate210 runtime 能建立歌曲列操作 UI，但入口仍掛在不可見的 workspace sidebar。其底層 handler 可用，不代表使用者可達。
4. 這不是再加一條 CSS 覆蓋就能完整修好的問題。作品批次是作品 ID 粒度，歌曲批次是歌曲 ID 粒度；不能把舊作品批次控制項直接塞到歌曲列旁邊，否則「選取目前顯示」會讓使用者誤以為選取的是畫面中的歌曲。

## 本階段決策
- 不刪除作品層級批次業務能力：它仍涵蓋作品狀態、自訂清單、手動補強、作品黑名單與 SRS，且與歌曲熟悉度／待聽佇列不是同一資料粒度。
- 不重新啟用整個舊 workspace dock/sidebar：Candidate172/Candidate185 的後續 UI 階段明確將其作為舊導航隱藏；直接反向覆蓋會復活另一套導航。
- 不再為不可見 sidebar 增加入口，也不把 `#quicktools` 強行顯示在 Song Select。
- Candidate222 保持唯一程式基線；本階段沒有新的 HTML 版本，避免製造沒有根本修正的候選版。

## 下一階段最高價值工作
建立一個正式、可見的作品批次入口，掛在目前可見的清單管理/C99 rail，並使用明確的作品選取範圍與既有業務 API。先驗證選取可見／篩選結果、清除、作品狀態、自訂清單、手動補強、黑名單與 SRS；再把歌曲批次入口接至既有 Candidate210 runtime。完成新 owner 的可見互動與資料隔離驗收後，才移除不可達的 `#amqWorkspaceSidebar`/dock action 定義與舊 `#quicktools` 重複 UI，逐項檢查 listener、observer、timer、CSS 及動態引用。
