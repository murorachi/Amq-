# Stage 11：批次入口互動探測與整合前置驗收

日期：2026-10-24

## 基準與保護
- 唯一程式起點：Candidate222
- 本機檔案：`/mnt/data/amq_cleanup_stage_08/amq_learning_tool_v82_85_46_candidate222_unreachable_batch_bridge_cleanup_20261024.html`
- 大小：9,348,268 bytes
- SHA-256：`39d9962c38ab928f51969237063230e8f77dc6f9416f8bf9691b12c48522c723`
- 已在測試前重新計算 SHA-256，與既有紀錄一致。
- 本階段未修改 HTML，沒有新候選產物；沒有資料 schema 或正式資料寫入。

## 測試環境與方法
- Chromium：`144.0.7559.96`
- 使用 Playwright `page.set_content()` 與記憶體型 localStorage/sessionStorage shim。
- 此方法可驗證 DOM、路由與部分事件流程；不能代表原生 `file://` 啟動、真正持久化、重新載入或真實音訊。
- URLBlocklist 的環境阻擋沿用 Stage 10 結論，本階段沒有修改系統政策。

## 測試案例與結果

| 案例 | 結果 | 證據／限制 |
|---|---|---|
| 初始頁初始化 | PASS | title 為「AMQ學習工具」，readyState 為 complete。 |
| 首頁展開選單 | PASS | 點擊主圖示後顯示「開始遊戲／歌曲選擇／設定」。 |
| 首頁進入 Song Select | PASS | 點擊「歌曲選擇」後 body 出現 `amq-songselect-route-active`。 |
| 初始化期間 JS 錯誤 | PASS | 本輪互動測試 pageerror 0、console error 0。 |
| Song Select 中 workspace sidebar 可見 | FAIL | `#amqWorkspaceSidebar` 存在，但沒有可見尺寸。 |
| Song Select 中舊 `#quicktools` 可見 | FAIL | 元素存在，但路由下不可見。 |
| 可見自訂清單入口 | PASS | 點擊 `[data-c99-action="lists"]` 後，`#amqCustomListWorkflowPanel85` 成功建立並可見。 |
| 作品批次端到端入口 | FAIL | 目前入口位於隱藏 sidebar；目標 quicktools 也隱藏，無法構成可操作流程。 |
| 歌曲批次端到端入口 | NOT RUN | 舊入口位於隱藏 sidebar；先前隔離 handler 測試只證明 handler 可呼叫 Candidate210 runtime，不證明使用者可達。 |
| 原生 file:// 啟動／重新載入持久化 | BLOCKED | Chromium managed URLBlocklist 阻擋 URL 導覽。 |
| 真實音訊、即時 API、多人體驗、像素比對 | NOT RUN | 不屬於本輪替代環境已覆蓋範圍。 |

## 根因判定
1. 目前證據支持「批次功能入口不可達」，不支持「AMQ 初始化卡死」。
2. 作品批次操作所需的 `#quicktools` 與舊 workspace sidebar 都存在於 DOM，但在 Song Select 路由不可見。只檢查元素存在，不能視為使用者流程可用。
3. 可見的 C99「自訂清單管理」入口能打開既有共用面板，證明目前可見導覽層可承載整合入口；但這不代表可以直接搬動 `#quicktools`。其選取狀態使用作品層 `selectedAnime`，Song Select 的歌曲選取則屬歌曲層，兩者不能直接混用。
4. 在沒有確認歌曲選取與作品層選取的資料轉換契約前，不新增會誤導使用者的假入口，也不刪除現有批次業務邏輯。

## 下一階段最小方案
1. 追查 C99 選歌卡片的作品 ID、歌曲 ID、選取狀態與 Candidate210 批次控制器的資料契約。
2. 先定義清楚兩種範圍：作品批次（作品 ID 集合）與歌曲批次（歌曲 ID 集合），不要用一個 Set 混裝。
3. 將作品批次 UI 整合到可見的 C99／清單管理容器，或為既有作品層選取提供可見入口；歌曲批次仍由 Candidate210 唯一控制器負責。
4. 在 shim 環境測試可見入口、選取／取消、篩選後狀態、套用結果與資料粒度隔離，再移除已確認無用的隱藏入口和舊 UI。
5. 最後再重試被環境政策阻擋的原生導覽／持久化驗收。

## 回滾與交付
- 無需回滾：本階段未修改 HTML。
- Candidate222 原檔及 Candidate221 回滾檔均未修改。
- GitHub 本階段只提交報告與狀態文件；沒有上傳大型 HTML，沒有宣稱遠端 HTML 存在或 SHA 已驗證。
