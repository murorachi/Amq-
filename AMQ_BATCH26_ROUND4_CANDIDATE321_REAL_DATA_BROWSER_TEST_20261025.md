# Batch26 第四輪：恢復資料依賴後的 Chromium 驗證

## 基準與輸入
- Candidate321：`amq_learning_tool_v82_86_32_candidate321_batch26_round2_songselect_ownership_cleanup_20261025.html`
  - 1,645,516 bytes
  - SHA-256 `5b4ac7bdbe92f1b1a1b7056e543b065a0829d266a5f4b4fd2a1e9f7a5347e83a`
- Candidate320 回滾點 SHA-256：`134020658ac272916bdd503c0ebdbe8cdbafcf0c15cff96cc0d45ddf63c8a66c`
- 正式基準 Candidate302 SHA-256：`f718a744057be0a33d371306f1742aaeede90e84f33d9e62ab45f5e6db488abd`
- 使用者提供資料檔：
  - `data(1).js`: 4,975,244 bytes; SHA-256 `692f69f56079d6cc0b30bd1951ab625f53799b87525c1bd52a27f29274703cf3`
  - `emq-data(3).js`: 2,684,266 bytes; SHA-256 `88441b4a6090c01db1dae23c970a6fa24d457a54f4b915be3e23c3799b3794cc`
- Candidate321 本體未修改。測試時只在記憶體測試副本中把兩個 `<script src>` 替換為使用者提供的資料腳本內容，沒有覆蓋候選 HTML 或改寫資料檔。

## 測試方法
- Chromium 由 Playwright 啟動。
- 以 `page.set_content()` 載入完整候選 HTML，測試副本內嵌兩個實際資料檔。
- 因 `about:blank` 是 opaque origin，測試副本在 `<head>` 最前方注入記憶體版 localStorage/sessionStorage shim。此 shim 僅供隔離測試，不屬於 Candidate321 產物，也不驗證真實瀏覽器持久化。
- 本輪可驗證正式資料載入和部分模組行為，但仍不能等同使用者正常開啟本機單檔 HTML 的完整端到端驗收。

## 實測結果

| 案例 | 結果 | 證據／限制 |
|---|---|---|
| Candidate321 + 實際 `data.js` 啟動 | PASS（測試副本） | `DB.anime=9,516`、`DB.songs=38,821` |
| EMQ packed data 解析／初始化 | PASS（測試副本） | Song Select API 回報 EMQ works = 6,645 |
| JavaScript 啟動錯誤 | PASS（測試副本） | 0 page errors、0 console errors；沒有 failed network requests |
| Song Select 模式 API 呼叫 | PASS（smoke test） | AMQ／EMQ／MIX API 呼叫皆完成且沒有 JS error；AMQ grid 180 cards、EMQ grid 180 cards、MIX grid 360 cards（模組採分批／分頁渲染，不能據此推斷完整曲庫總數） |
| 正式 UI 導航進入 Song Select | BLOCKED | 測試文件仍在 `about:blank`，主選單中的 Song Select 控制項不可見；直接添加 route class 未能保持，應用程式路由狀態管理會重置它。未把手動呼叫 API 當成 UI 導航驗收 |
| Candidate137 主歌曲列表渲染／搜尋／排序 | NOT RUN（完整 UI） | 尚未成功透過正式路由啟動 Song Select，不能宣稱已驗收 |
| Candidate210 真實封面載入／失敗 fallback | NOT RUN | 尚未完成真實 UI 路由與封面網路驗收 |
| 點選歌曲後音訊／影片播放 | NOT RUN | 未實際播放 |
| 離開 Song Select 後播放器版面復原 | NOT RUN（完整 UI） | Candidate114 仍未在正式路由生命週期中驗收 |
| Candidate114 timer 合併 | NOT RUN | 保留所有 timers |
| Candidate158 subtree Observer 縮小 | NOT RUN | 保留 Observer |
| Candidate321 HTML 上傳與遠端 SHA-256 | NOT VERIFIED | 本輪沒有宣稱 HTML 已上傳 |

## 決策
1. 兩份資料檔已成功恢復到測試環境，證明先前 `DB is not defined` 的主要阻塞是資料腳本缺失，而非 Candidate321 的 JS 啟動本身。
2. Candidate321 本體未修改，Candidate320 回滾點及 Candidate302 正式基準不變。
3. 不縮減 Candidate114 timers、不縮小 Candidate158 Observer。原因是正式 Song Select UI 路由與播放器生命週期尚未跑通。
4. 不將 API smoke test 誇大為 UI E2E。下一個阻塞點已縮小為：在允許的瀏覽器環境中建立有持久化儲存的可信 origin，並透過正式導航進入 Song Select。

## 回滾
無新 HTML 產物，因此無須回滾原始程式碼。若之後的 Candidate321 測試發現回歸，仍回到 Candidate320 SHA-256 `134020658ac272916bdd503c0ebdbe8cdbafcf0c15cff96cc0d45ddf63c8a66c`。正式基準 Candidate302 不變。

## 下一步
1. 先解決正式路由測試入口：使用允許的瀏覽器 origin／啟動方式，不要只靠 `about:blank` 或直接手動加 body class。
2. 通過正式 UI 導航後，依序測試 AMQ／EMQ／MIX、搜尋／篩選／排序、封面載入／fallback、選取播放與離開路由復原。
3. 再決定 Candidate114 timers 和 Candidate158 Observer 是否可縮減。
4. 最後上傳 Candidate321 HTML 並讀回核對 SHA-256，才可考慮升格。
