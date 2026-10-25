# AMQ Batch40：Candidate336 側欄路由／展開狀態驗證

日期：2026-10-26

- Candidate336 SHA-256：`b38efba9422e81bc160bf7f66f2b4cd487bcfeafb86c6c49c8e6034283c9459a`
- 正式基準 Candidate302：`f718a744057be0a33d371306f1742aaeede90e84f33d9e62ab45f5e6db488abd`（未修改）
- 回滾點 Candidate320：`134020658ac272916bdd503c0ebdbe8cdbafcf0c15cff96cc0d45ddf63c8a66c`（未修改）
- 本批未修改 HTML，也未建立新候選。

## 測試結果

- BLOCKED：Chromium Playwright 載入 `file://` HTML，回傳 `net::ERR_BLOCKED_BY_ADMINISTRATOR`。
- BLOCKED：改用 `http://127.0.0.1:8765/` 本機 HTTP 伺服器仍回傳相同錯誤。
- NOT RUN：dock 開啟／收合、一般路由切換／返回 Home、Song Select 展開／關閉、桌面與窄視窗 resize、computed style 與實際點擊命中。
- NOT RUN：音訊、資料持久化、多人遊戲 E2E。

環境在頁面載入前就阻擋瀏覽器導覽，故不能把應用程式標記為 FAIL，也不能把互動驗收標記為 PASS。

## 靜態控制流程

- 一般工作區：Candidate77 的 `showPanel()`／`hidePanel()` 擁有顯示、位置、ARIA 與 dock 展開狀態；Candidate336 的 Candidate76 `syncState()` 在非 Song Select 路由立即返回。
- Song Select：Candidate76 仍負責路由專屬 ARIA／幾何同步；Candidate77 保留 dock 點擊、導航與 layout 責任。
- Home 導航：Candidate77 的 `ani-app-navigation` handler 在 `view==='home'` 時呼叫 `hidePanel()`。
- resize：Candidate77 整理 dock layout；Candidate76 僅在 Song Select route 執行專屬幾何同步。

上述為靜態程式流程，不是實際 computed style 或互動證據。

## 結論與下一步

Candidate336 保持實驗候選。先在未被環境政策阻擋的互動瀏覽器中測試：1440×900 展開／收合、非 Home 路由切換及返回 Home、Song Select 開關、390×844 resize、一般路由↔Song Select 往返。記錄 display、visibility、pointer-events、position、left/top、width/height、rect、aria-hidden、aria-expanded 與 console errors。取得證據前不再整併側欄程式碼。

回滾：退回 Candidate335 SHA-256 `6b06c72d769204f38f836c8c5e9d4d15af798258d4772fb27d72dd820d830331`。Candidate302 仍為正式基準，Candidate320 仍為回滾點。
