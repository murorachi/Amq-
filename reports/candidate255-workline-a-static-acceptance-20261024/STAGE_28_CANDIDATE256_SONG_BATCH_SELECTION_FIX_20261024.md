# Candidate256 修正與驗收報告

日期：2026-10-24

## 基準與變更
- 基準 Candidate255 SHA-256：`bd620e42e677ddbc8d48cf84da5773f3a51e42978c20ecbaa07761e467a7630d`
- 新候選：`v82.85.70-candidate256-song-batch-preserve-selection-20261024`
- 新 HTML：`amq_learning_tool_v82_85_70_candidate256_song_batch_preserve_selection_20261024.html`
- 新 HTML 大小：9,355,585 bytes
- 新 HTML SHA-256：`e5c65158ebee5ca69f051366a095e50f0d5f8992f5e89cef3209767adccc77d1`
- 回滾檔：`amq_learning_tool_v82_85_69_candidate255_rollback_before_candidate256_20261024.html`
- 回滾 SHA-256：`bd620e42e677ddbc8d48cf84da5773f3a51e42978c20ecbaa07761e467a7630d`
- 根本原因：`openBatch()` 在開啟模態面板前清空私有 `selected` Set 並取消歌曲勾選，與「先勾選歌曲再開啟批次整理」的 UI 指引矛盾。
- 最小修正：只移除 `openBatch()` 的自動清空／取消勾選步驟。保留既有選取資料來源、批次操作、清除選取按鈕與其他邏輯。

## 測試結果
- PASS：67 個 inline JavaScript 區塊語法無錯。
- PASS：109 個 CSS 區塊解析無錯。
- PASS：272 個 DOM ID 無重複。
- PASS：16 個已退役 Quick Tools 識別字在註解外零引用。
- PASS：篩選 UI 9/9 案例；使用記憶體儲存替身。
- PASS：共用工作區內容面板反覆切換及返回 15 項斷言，3 輪，無頁面錯誤、無重複 DOM ID、只有一個面板根節點；使用記憶體儲存替身。
- PASS：先勾選歌曲再開啟批次整理後，歌曲仍保持勾選，計數維持 1；使用記憶體儲存替身。
- PASS：作品與歌曲選取在切換面板後各自保留，不互相覆寫；使用記憶體儲存替身。
- NOT RUN：Candidate256 在使用者瀏覽器中的原生 localStorage reload 持久化。Candidate255 的持久化 PASS 不直接替代新版本驗收。
- NOT RUN：AniList/MAL/VNDB 真實 API 回應、解析、去重與錯誤恢復。
- BLOCKED：正式 HTML GitHub 上傳與遠端 SHA-256 核對；目前可用 GitHub 工具無法直接讀取本機 9 MB 檔案作為上傳內容。

## 狀態
Candidate256 是待驗收候選，不是正式接受基準。Batch 3 未完成，不能開始 Batch 4。
