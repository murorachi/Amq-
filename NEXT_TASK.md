# 下一步工作：完成批次三必要互動驗收後才開始批次四

## 最新本機候選
- Candidate255：`amq_learning_tool_v82_85_69_candidate255_remove_last_quicktools_refs_20261024.html`
- 9,355,697 bytes；SHA-256 `bd620e42e677ddbc8d48cf84da5773f3a51e42978c20ecbaa07761e467a7630d`。
- 回滾 Candidate254：SHA-256 `e7fa38897fcec376153b4a8a979ba3fe44775df8e8266a1e17f2d5ecc24934a9`。
- GitHub 分支：`amq-candidate255-last-quicktools-reference-cleanup-20261024`。此分支存放本階段文件；HTML 本身未上傳，遠端 HTML SHA 未驗證。

## 批次三未完成工作
1. 取得可用的非 opaque-origin 瀏覽器測試環境，允許 localStorage 並可重載頁面；不得修改系統 managed policy。
2. 驗證首頁初始化、四工作區切換／返回／重複切換、DOM 清理與無重複事件。
3. 實測作品批次所有看番狀態、歌曲熟悉度、待聽佇列、自訂清單加入／移出、弱點、黑名單、SRS；驗證作品與歌曲選取隔離。
4. 從「我的清單」開啟批次，驗證僅作用於當前清單；測試空清單、零搜尋結果及路由切換。
5. 實測自訂清單建立、加入、移除、篩選、重新命名、刪除及真正 reload 持久化。
6. 實測 AniList／MAL 與 VNDB 匯入入口、錯誤處理、格式及去重。
7. 嘗試上傳 Candidate255 HTML；遠端讀回版本、檔案大小與 SHA-256。
8. 更新完整測試報告與狀態文件。只在必要 P0/P1 回歸通過且遠端產物已核對後，才通知批次三完成。

## 已完成的靜態清理
- 舊 catalog 批次 UI 及已確認相關 listeners、CSS、初始化與 Observer 已移除。
- Candidate255 修正最後兩處 quicktools 殘留引用。
- 67 JS syntax、109 CSS parse、272 DOM IDs、16 個舊名稱零引用：PASS。

## 阻塞與未執行
- Playwright opaque origin 無法讀取 localStorage，完整 runtime 驗收 BLOCKED。
- 原生 file URL 受 Chromium managed URLBlocklist 阻擋。
- 完整 E2E、durable reload、真實音訊、即時 API、多人及 osu!stable 像素比對 NOT RUN。
- GitHub HTML 上傳與遠端 SHA NOT VERIFIED。
