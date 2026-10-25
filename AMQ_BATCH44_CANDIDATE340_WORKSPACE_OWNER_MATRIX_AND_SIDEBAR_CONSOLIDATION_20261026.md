# AMQ Batch44 — Candidate340 工作區側欄所有權整併

- 日期：2026-10-26
- Parent Candidate339 SHA-256：`8518449cff37050f67e9ae418f376e328f3219c784c179e9d0b178db8ade0bdd`
- Candidate340：`amq_learning_tool_v82_86_51_candidate340_batch44_unified_workspace_sidebar_20261026.html`
- 大小：1,627,175 bytes
- SHA-256：`74e3d7eb0287cb04dcad0caf08d3d640abb32e21faa6fcc3be00e93a1438f158`
- Candidate302 正式基準及 Candidate320 回滾點均未修改；Candidate340 僅為實驗候選。

## 實際修改
1. Candidate76 改為側欄唯一狀態與幾何控制器，提供 `window.__amqWorkspaceSidebarGeometry`、`window.__amqWorkspaceSidebarOpen`、`window.__amqWorkspaceSidebarClose`。
2. 單一幾何 API 按路由分支：Song Select 依 `#amqSongSelectRankingPlaceholder` 與 catalog 定位；一般工作區保留左下方、310px 寬度上限及原高度限制。兩種幾何由同一 API 計算與套用。
3. Candidate77 只保留 dock 歸位至 body、清除 dock 舊 inline style；移除第二套 show/hide、側欄 inline style 寫入與重複 click handler。
4. `[data-ws]` 只負責切換側欄；Prototype15 的 `[data-ws-action]` action dispatcher 保留，沒有合併。capture-phase 只攔截 `[data-ws]`，用於阻止舊 target-level handler 搶先改狀態。
5. Candidate76 的 close button 呼叫正式 close API；Candidate82 內容面板 API 保留。

## 所有權矩陣
| 責任 | 正式所有者 | 規則 |
|---|---|---|
| Dock DOM 歸位與 dock 舊 inline style 清理 | Candidate77 layout | 不寫側欄狀態與幾何 |
| Sidebar open/close、模式與 ARIA | Candidate76 統一控制器 | 唯一正式寫入者 |
| Sidebar geometry | `__amqWorkspaceSidebarGeometry` | 同一 API 分支處理 Song Select / 一般工作區 |
| `[data-ws]` | 統一側欄控制器 | 面板切換 |
| `[data-ws-action]` | Prototype15 | 清單、批次、練習等具體操作 |
| Content panel | Candidate82 | 本批不重寫 park/restore API |

## 測試
- PASS：輸入 Candidate339 SHA-256 驗證一致。
- PASS：65 個可執行 inline JS 區塊通過 Node `--check`，0 語法錯誤。
- PASS：11 項靜態所有權與保留行為斷言全部通過。
- PASS：交付 ZIP 完整性檢查通過。
- NOT RUN：實際瀏覽器回歸，包括一般工作區、Song Select、內容面板、ESC、點擊狀態轉換及 resize。
- NOT RUN：Candidate340 HTML GitHub 上傳與遠端 SHA-256 讀回；不可宣稱已上傳或已驗證。

## 風險與回滾
瀏覽器尚未驗證 CSS cascade、路由時序及事件傳播。capture-phase 的必要性仍須 Batch45 用 listener 註冊順序與實際點擊驗證。若有回歸，丟棄 Candidate340，回到 Candidate339；Candidate302 與 Candidate320 不變。

## 下一步
Batch45：盤點 Candidate70/76/77/82/Prototype15 listener 註冊與傳播，驗證單次點擊只有一次狀態變更、ESC 關閉順序正確、`[data-ws-action]` 仍可正常分派，並測 Candidate82 park/restore。