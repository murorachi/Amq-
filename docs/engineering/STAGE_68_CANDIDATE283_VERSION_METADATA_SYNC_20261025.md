# Stage 68 — Candidate283 版本標記同步與靜態回歸（2026-10-25）

## 目標與基準
本階段只修正正式 HTML 的自我識別標記，不改變 UI、CSS、JavaScript、路由或資料邏輯。

- Parent: Candidate282
- Parent SHA-256: `66e97e9963c115a3e3f853e83bc0e6616c9d0bea57007c6fd766cadd44640e49`
- Immutable Candidate277 SHA-256: `b628bfb5b4aec30a34935bcf5aaac095ab405a71ebe482f9a666c2f91a019371`
- New version: `v82.85.97-candidate283-version-metadata-sync-20261025`
- File: `amq_learning_tool_v82_85_97_candidate283_version_metadata_sync_20261025.html`
- Size: `9,379,765` bytes
- SHA-256: `aa1af13d2ff9419968ba92f382c75e0fd65d0ae4b72957331a1b488f65d74a0b`

## 修改內容
1. 將 HTML 第一個 AMQ build 註解更新為 Candidate283，記錄 Candidate282 parent SHA 與 Candidate277 immutable baseline SHA。
2. 將 `<title>` 從 Candidate279 改為 `AMQ學習工具 · Candidate283 版本標記同步`。
3. 未修改其餘 HTML 內容。這只同步版本識別資訊，不代表互動功能已驗收。

## 測試結果
- PASS：來源 Candidate282 SHA-256 重算，符合記錄值。
- PASS：Candidate283 產物大小與 SHA-256 已重算。
- PASS：69 個 script tags 分類為 67 個非空可執行 JavaScript 區塊與 2 個非 JS payload。
- PASS：67/67 可執行 JavaScript 區塊通過 Node.js `--check` 語法檢查。
- PASS：109 個 style blocks、2,819 個 CSS rules；CSS parser errors = 0。
- PASS：272 個 literal IDs，重複 ID = 0。
- PASS：Candidate283 build 註解、title 與 Candidate282 parent SHA 靜態斷言各出現一次。
- BLOCKED：Candidate283 HTML 尚未在遠端可執行位置，無法透過 TinyFish 對該檔案進行頁面操作。
- NOT RUN：computed styles、route switching、Dock expand/collapse、VNDB import、song-batch lifecycle、custom-list persistence、audio、multiplayer、screenshot/pixel comparison。

## 風險與限制
- GitHub 候選分支目前只公開 v82.85.30 與 v82.85.46 HTML，未包含 Candidate282/283。
- 本階段沒有清理 CSS、改寫 JS 或更動功能；完整瀏覽器回歸仍未執行。
- Candidate283 是新版本檔案，不覆蓋 Candidate282。

## 回滾
退回 Candidate282 檔案，並以 parent SHA `66e97e9963c115a3e3f853e83bc0e6616c9d0bea57007c6fd766cadd44640e49` 驗證。Candidate277 immutable baseline SHA 為 `b628bfb5b4aec30a34935bcf5aaac095ab405a71ebe482f9a666c2f91a019371`。

## 下一步
1. 找到可可靠傳遞 9.38 MB HTML 至公開測試環境的支援上傳通道；上傳後必須遠端核對版本、大小及 SHA-256。
2. 使用 TinyFish 對實際 Candidate283 HTML 做頁面初始化、Song Select、Dock、VNDB/song-batch 路由與 console/error 驗收。
3. 再驗證自訂清單 CRUD 與 reload persistence，並測試匯入錯誤處理。
4. 瀏覽器證據到位後，才進行 Dock display 單一 owner 重構與 CSS 重複規則整合。
