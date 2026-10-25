# Batch43 Candidate339：確認死代碼清理

- 日期：2026-10-26
- 輸入基準：Candidate338
- 輸入 SHA-256：30b20c90a766722b87e13b2e506ec0ab313d902c40258e23360249832260d28a
- 產物：amq_learning_tool_v82_86_50_candidate339_batch43_confirmed_dead_code_cleanup_20261026.html
- 產物大小：1,628,078 bytes
- 產物 SHA-256：8518449cff37050f67e9ae418f376e328f3219c784c179e9d0b178db8ade0bdd

## 實際修改
1. 從 candidate186-cover-recovery-runtime 移除觀察 #audioDock 的 MutationObserver。它只在 src 變更後把 #dockCoverV33.hidden 設為 false，與既有 audio dock updater 的狀態所有權重複。
2. 從 candidate94-last-writer-filter-fix 移除三條 #amqWorkspaceDock 覆蓋規則；保留同區塊的 #grid .card.amqListNotMember85 篩選規則。
3. 保留 Candidate186 的 modal 背景點擊關閉與 Escape 關閉處理；未刪除整個 runtime。

## 驗證
- 基準 SHA 與檔案存在：PASS
- 修改範圍斷言（observer 移除、modal handler 保留、Candidate94 dock 規則移除、清單篩選保留）：PASS
- JavaScript 語法檢查：PASS（65 個 inline scripts，0 syntax errors）
- ZIP 完整性：PASS
- 瀏覽器互動／視覺回歸：NOT RUN
- GitHub HTML 上傳與遠端 SHA-256：NOT RUN

## 風險與保留項
- Candidate84 的 dock/sidebar 規則未刪除，因為其 sidebar geometry 與 Candidate76/82 尚需統一所有權後才能安全清除。
- Candidate70/76/77/82、Candidate178、Prototype15 未整塊刪除；保留已確認的活躍節點建立、面板 API、路由及 action 分派行為。
- 本候選版不是正式基準；Candidate302 與 Candidate320 未修改。

## 回滾
直接回到 Candidate338：amq_learning_tool_v82_86_49_candidate338_batch42_remove_unreachable_cover_recovery_20261026.html，SHA-256 30b20c90a766722b87e13b2e506ec0ab313d902c40258e23360249832260d28a。
