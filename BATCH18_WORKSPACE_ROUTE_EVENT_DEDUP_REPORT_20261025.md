# 第十八批：工作區路由與 Song Select 事件去重

## 基準與候選
- 來源 Candidate312：`amq_learning_tool_v82_86_23_candidate312_cross_module_css_js_dedup_20261025.html`
- 來源大小：1,648,144 bytes
- 來源 SHA-256：`12e8fbc4c00c2459dd3af2d7c1b099893e144958f5171ad9721c7bc01ebd20cb`
- 新候選 Candidate313：`amq_learning_tool_v82_86_24_candidate313_workspace_route_event_dedup_20261025.html`
- 候選大小：1,647,687 bytes
- 候選 SHA-256：`bd5d82c6d1a03e3d0e62622ebf22cf63d7636435bed469ed44efd9f8eba21c6a`
- 本批縮減：457 bytes
- 正式基準仍是 Candidate302，Candidate313 未升格。

## 實際修改
1. **移除工作區 dock 的不可達 click listener**：`candidate77-frame-owned-workspace-runtime` 在 `document` capture phase 對 `#amqWorkspaceDock [data-ws]` 呼叫 `stopImmediatePropagation()`，事件不會傳到目標按鈕。因而 `candidate76-workspace-panel-shell-runtime` 的按鈕 click listener 不會執行，其 `priorFocus` 也沒有其他寫入點。移除該 listener、無法到達的焦點還原狀態與分支；保留 `aria-controls`、關閉按鈕、Escape、幾何同步及 body Observer。
2. **移除 ranking frame bootstrap 的不可達 click listener**：同樣被 document capture listener 阻斷。保留 frame 建立與 body class Observer，後者仍可在 dock 開關時同步面板顯示狀態。
3. **移除兩個多餘的 navigation guard retry timer**：`installNavigationGuard()` 在 script 執行時已立即安裝；目前文件中後續的 final Song Select route guard 會標記外層 wrapper 為 `__amqWorkspaceGuarded`，因此 0ms/80ms 重試均不會再安裝或修正任何東西。保留立即安裝及 standalone action click handler。
4. 只改動上述 3 個 script block。未更改資料載荷、儲存格式、AMQ/EMQ schema、路由目的地映射、核心 `ani-app-navigation` 事件、出題、音訊或多人遊戲邏輯。

## 測試結果
- JavaScript syntax：**PASS 68/68**。
- CSS parse：**PASS**，0 個錯誤；3,423 CSS rules、11,425 declarations。
- 重複 DOM ID：**PASS**，0 個。
- 修改範圍：**PASS**，只有 3 個預期 script block 改變。
- 工作區 dock 隔離 Chromium：**PASS**，修改前後觀察狀態完全相同；點擊可開啟 Lists panel，再點擊可關閉。驗證 `amq-dock-expanded`、workspace mode、`aria-hidden`、`aria-controls`、display 與 `aria-pressed`。
- 路由 wrapper 隔離 Chromium：**PASS**，修改前後 5 個路徑情境結果相同：一般 catalog、一般 dashboard、Song Select dashboard 攔截、Song Select watchlist 攔截、非 Song Select VNDB 特殊分支。
- 完整應用 E2E：**NOT RUN**。本批是使用實際受影響 runtime script、stub DOM/core navigation 的隔離 Chromium 測試，未驗證完整資料、音訊、CRUD、AMQ/EMQ/MIX 遊戲回合或多人伺服器。

## 未完成／待確認
- 完整應用 E2E 仍未執行。
- 其他 Observer、timer 與 route wrapper 未在本批全面刪除；它們的副作用不完全相同，不能僅按數量或命名推定冗餘。
- Candidate313 HTML 的 GitHub 遠端上傳及遠端 SHA-256 尚未驗證。

## 回滾
- 本批回滾：Candidate312 SHA-256 `12e8fbc4c00c2459dd3af2d7c1b099893e144958f5171ad9721c7bc01ebd20cb`。
- 不可變正式基準：Candidate302 SHA-256 `f718a744057be0a33d371306f1742aaeede90e84f33d9e62ab45f5e6db488abd`。

## 下一步
- 從 Candidate313 繼續，優先追查 Song Select 初始化中可證明重複的 Observer／resize/navigation handlers，以及 modal/grid/dock 的生命週期；逐項建立註冊入口、目標、觸發條件與清理配對表。
- 先處理可以證明無副作用差異的項目，對不確定的 Observer/timer 標記 `NEEDS CONFIRMATION` 並跳過，不阻塞其他安全刪除。
- 同時處理完整應用瀏覽器驗收的依賴缺口；不要把隔離測試宣稱為完整 E2E。
