# AMQ Batch39：Candidate76／77 側欄狀態所有權收斂

日期：2026-10-26

## 基準與產物
- 正式基準：Candidate302，SHA-256 `f718a744057be0a33d371306f1742aaeede90e84f33d9e62ab45f5e6db488abd`。
- 回滾檢查點：Candidate320，SHA-256 `134020658ac272916bdd503c0ebdbe8cdbafcf0c15cff96cc0d45ddf63c8a66c`。
- 父候選：Candidate335，SHA-256 `6b06c72d769204f38f836c8c5e9d4d15af798258d4772fb27d72dd820d830331`。
- 新候選：`amq_learning_tool_v82_86_47_candidate336_batch39_sidebar_state_ownership_20261026.html`
- Candidate336 SHA-256：`b38efba9422e81bc160bf7f66f2b4cd487bcfeafb86c6c49c8e6034283c9459a`；1,631,660 bytes。

## 根因
Candidate77 的 `showPanel()` 在一般工作區路由設定側欄顯示、位置與 `aria-hidden=false`。Candidate76 的 `syncState()` 原先即使離開 Song Select 路由，仍會依 `amq-dock-expanded` 重算 `aria-hidden` 和 dock 按鈕 `aria-expanded`。當 body class 觸發 Candidate76 的 MutationObserver，可能將 Candidate77 剛設定的 ARIA 狀態覆寫為收合狀態。

## 修改
只修改 Candidate76 的 `syncState()`：當 `body.amq-songselect-route-active` 不存在時立即返回。一般工作區側欄的狀態由 Candidate77 管理；Candidate76 只處理 Song Select popup 的 ARIA／幾何同步。未刪除任何模組，未改 CSS 或 Candidate77，HTML 其他內容未變。

## 路由／狀態矩陣（靜態控制流程）
| 狀態 | Candidate77 | Candidate76 修改後 |
|---|---|---|
| 一般路由收合 | hidePanel 寫 display 與 ARIA | 不介入 |
| 一般路由展開 | showPanel 寫顯示、位置、ARIA、按鈕狀態 | 不介入 |
| Home 導航 | hidePanel | 不介入 |
| Song Select 收合 | dock 操作控制展開 class | syncState 寫 aria-hidden=true |
| Song Select 展開 | showPanel 先設定通用狀態 | syncState 寫 aria-hidden=false 並規整 popup 幾何 |
| resize | 整理 dock 佈局 | 僅 Song Select 路由更新 popup 幾何 |

## 驗收
- PASS：父候選 SHA-256 符合預期。
- PASS：修改錨點精確命中一次。
- PASS：只有 Candidate76 inline script body 改變，外部 HTML 完全相同。
- PASS：65 個 executable inline scripts 執行 `node --check`，0 錯誤。
- PASS：Candidate77 未修改；Candidate302／Candidate320 未修改。
- NOT RUN：瀏覽器路由／展開收合／resize 視覺回歸、儲存持久化、媒體與多人遊戲 E2E。
- NOT RUN：Candidate336 HTML GitHub 上傳及遠端 SHA-256 核對。

## 風險與回滾
CSS 仍有多組 `!important` 側欄定位／顯示規則，必須在瀏覽器狀態矩陣中驗證 computed style 與點擊行為。回滾至 Candidate335；Candidate302 仍是正式基準，Candidate320 仍是回滾檢查點。Candidate336 不自動升級。
