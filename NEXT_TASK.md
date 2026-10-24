# 下一步工作：完成批次三驗收，再開始批次四

## 最新本機候選（不是已驗收正式基準）
- Candidate252：`amq_learning_tool_v82_85_66_candidate252_watchlist_scoped_work_batch_20261024.html`
- 大小 9,355,704 bytes；SHA-256 `f210d987495aeb52ca11e958fe2ff9942c32457f054b81d792309c14e9fb78d1`。
- 直接回滾 Candidate251：9,354,587 bytes；SHA-256 `4467de1ed6330c51929e783b662d95cd5ad6847dd12edb3a6fde8f49fb94849e`。
- 目前 GitHub 分支：`amq-candidate252-batch3-legacy-panel-removal-20261024`。此分支已存批次三報告、manifest 與測試狀態；HTML 尚未上傳。

## 批次三剩餘驗收
1. 在可正常啟動的瀏覽器環境執行完整頁面初始化、四工作區切換、返回導覽及重複切換，確認無殘留 DOM、重複事件或卡死。
2. 實測正式作品批次工作區的所有看番狀態、歌曲熟悉度、待聽佇列、自訂清單加入／移出、弱點補強、黑名單、SRS；驗證作品與歌曲選取不互相污染。
3. 從「我的清單」開啟批次工作區，驗證只作用於目前清單範圍；確認清單為空、搜尋結果為空、切換路由後的選取行為。
4. 實測自訂清單建立、加入、移除、篩選、重新命名、刪除與重新載入持久化。記憶體 storage shim 不得冒充 durable persistence。
5. 實測 AniList／MAL 與 VNDB 匯入入口仍可達、錯誤處理及資料格式／去重；不得因刪除舊入口而失去匯入能力。
6. 若瀏覽器環境仍受政策阻擋，保留 BLOCKED 證據並找可用的允許環境；不得修改 managed policy。
7. 更新測試報告與狀態文件，嘗試上傳 Candidate252 HTML，讀回遠端檔案、版本及 SHA-256。文件提交不等於 HTML 上傳成功。

## 批次四啟動條件
只有批次三上述必要互動與資料持久化驗收完成、沒有未解的 P0／P1 回歸，且正式 HTML 與遠端版本／SHA 已核對後，才通知使用者批次三完成並等待其開始批次四。

## 環境限制
- Chromium managed policy `URLBlocklist=["*"]` 阻擋 file://、data: 與 localhost 導覽。
- 本輪 Playwright／Chromium 完整頁面測試未在期限內啟動／完成；瀏覽器 E2E 與持久化尚未驗收。
- 不修改系統政策；未驗證項目不得標為 PASS。
