# AMQ 第二階段：AMQ 自訂清單整合與驗收報告

日期：2026-10-25  
階段：第二階段，原清單 L01–L12  
結論：**第二階段工程與受控測試完成。真實曲庫端到端測試列為 BLOCKED，不因此停住本階段。**

## 1. 基準與候選鏈

### 正式基準 Candidate295（不可覆寫）
- 檔案：`index-old.html`
- 版本：`v82.86.06-candidate295-db-extraction-20261025`
- 大小：1,720,917 bytes
- SHA-256：`aef896eee98c10bcb9fb1f10d6650b8e26067426f43b086e1b69fa12e3674a81`
- 本階段前後均核對相同。

### 第一階段已由使用者確認
- Candidate299：`amq_learning_tool_v82_86_10_candidate299_route_acceptance_20261025.html`
- SHA-256：`1e7a37cef7a7d791c5dd40f09c2143b2e507dac76c73951e5060b82f5c44c2e4`
- 使用者已確認第一階段操作；此狀態更新以使用者確認為依據。

### 第二階段候選
- Candidate300 中間檢查點：`amq_learning_tool_v82_86_11_candidate300_custom_list_store_integration_20261025.html`
- Candidate300 大小：1,717,671 bytes
- Candidate300 SHA-256：`5fea42650ede3b8b779afdf7b61e42365388d41b34e4231988065eb2fb7d34a5`
- Candidate301 階段交付候選：`amq_learning_tool_v82_86_12_candidate301_custom_list_error_state_hardening_20261025.html`
- 內嵌版本：`v82.86.12-candidate301-custom-list-error-state-hardening-20261025`
- 大小：1,720,241 bytes
- SHA-256：`e8eb07ccab26b6e424eda9aed11d1c21b90cca9c544ed2b6843096e3b6762454`
- Candidate301 是 Candidate300 的子候選，不取代 Candidate295 正式基準。

## 2. 實際修改

### A. 共用讀取相容層
- 建立唯一 AMQ 自訂清單讀取邊界 `readCustomListsCompatV1()`，供四個既有消費端使用。
- 只保留一個消費端對 `aniCustomPracticeListsV1` 的直接 fallback 讀取；此讀取位於相容層。正式 store 仍保有自己的 canonical storage 讀取與寫入責任。
- 舊版 array payload 正規化成 `{version:1, lists:[...]}`，ID 與作品 ID 轉成字串並去重。
- 明確區分 `empty`、`ready`、`invalid`、`unavailable`、`recovered-invalid`。
- canonical store 已存在時優先採用 canonical 結果；canonical 讀取失敗時不偷偷降級讀取舊 key，以免掩蓋儲存故障或讀到不同步資料。

### B. 寫入、CRUD 與成員操作
- 保留 `aniCustomPracticeListsV1` 作為 AMQ 作品層級清單的 canonical key。
- 統一使用 `__aniCustomListsStoreV1` 的 `readResult`、`write`、`mutate`、`toggleMembership`。
- 建立、改名、刪除、加入作品、移除作品均走相同驗證與持久化路徑。
- 增加 membership API 的 result 版本，讓讀取失敗與「不屬於清單」不再被同一個 `false` 混為一談。
- Song Select 批次整理先檢查 store 的 read result；讀取失敗時不把它當空清單繼續修改。

### C. 播放池與選擇器
- Dock 自訂清單播放池改用共用 adapter，清單仍按 `animeIds` 作品 ID 篩選歌曲。
- 合法空清單回報「沒有可播放歌曲」；儲存讀取失敗回報獨立錯誤，不再把儲存故障當成空清單。
- 新增、改名後同步更新練習清單多選器與舊版單選器。
- 遇到儲存讀取失敗時，主要清單 UI 與練習選擇器會顯示明確錯誤狀態，提供重新讀取入口，不顯示誤導性的「尚無清單」。

### D. 備份與還原
- 移除早期重複的匯出／匯入事件 handler 指派，保留正式完整備份流程。
- 完整備份 manifest 涵蓋 AMQ 自訂清單 key。
- 完整還原與舊格式合併匯入都會驗證 AMQ 清單 payload；無效 payload 在寫入前拒絕，不破壞目前清單。
- 損毀資料 quarantine 先保留原始內容至 recovery key，再清除無效 primary key；若儲存失敗則阻止後續覆寫。

### E. 資料隔離
- 沒有合併 AMQ 與 EMQ 的清單 schema。AMQ 仍使用作品層級 `animeIds`；EMQ 的 `workIds`、`vndbIds`、`songIds` 保持獨立。
- 沒有改動歌曲答題歷史、音訊生命週期或多人房間狀態機。

## 3. 測試結果

### 靜態檢查：PASS
- Node.js `--check`：67/67 個可執行 inline JavaScript 區塊通過。
- CSS：109 個 style 區塊、2,808 個頂層 qualified rules，0 stylesheet/declaration parser errors。
- HTML ID：271 個 ID，271 個唯一值，0 重複 ID。

### 受控 Chromium 測試：PASS
- 相容層：7/7 assertions PASS，包括空值、舊 array 正規化、invalid JSON、invalid payload、storage read failure、canonical precedence、canonical failure 不 fallback。
- Store/UI：7/7 assertions PASS，包括 CRUD、membership API、UI 建立／改名／刪除、重新初始化後持久化、損毀資料隔離、讀取失敗阻止寫入、UI 顯示錯誤而非空清單。
- 播放池：3/3 assertions PASS，包括只播放清單成員作品的歌曲、合法空清單、儲存讀取失敗的獨立狀態。
- 選擇器：PASS，練習多選器與舊單選器都收到新清單及作品數量。
- 備份：5/5 assertions PASS，包括完整匯出與 manifest、完整還原、無效完整還原保留原資料、舊格式合併匯入、無效舊格式備份保留原資料。
- 測試使用 Playwright/Chromium 實際執行，使用替身 storage 與合成空資料庫；播放池測試另外注入兩首合成歌曲。這些是功能邏輯測試，不是使用者真實曲庫下的端到端驗收。

## 4. BLOCKED / NOT RUN
- `data.js` 與 `emq-data.js` 不在本工作目錄，因此未用真實 AMQ/EMQ 曲庫驗證播放池與所有非空面板。
- 直接導覽 `file://` 與本機 HTTP 測試網址均被 Chromium 回報 `ERR_BLOCKED_BY_ADMINISTRATOR`。本階段以受控 DOM harness 執行邏輯測試，不能冒充雙擊正式 HTML 的全頁端到端驗收。
- Candidate301 HTML 尚未上傳 GitHub；遠端 SHA-256 尚未驗證。文件及測試報告可上傳，但目前 connector 不提供從此執行環境直接把本機大型 HTML 位元組推送到 GitHub 的可用路徑。已明確保留為 BLOCKED，未宣稱上傳成功。
- 真實曲庫下的全頁視覺、音訊播放與多人連線不屬於本階段已證明的範圍，未宣稱通過。

## 5. L01–L12 階段狀態
- L01–L04：PASS，canonical store、key、讀取 API、fallback 相容層與錯誤／空值語義已統一。
- L05–L07：PASS，消費端改用 adapter，選擇器／批次管理／Song Select 讀取錯誤不再默默當空值。
- L08：PASS，建立、改名、刪除 UI 與 store 測試通過。
- L09：PASS，加入／移除作品成員與 membership API 測試通過。
- L10：PASS，播放池按作品 ID 篩選並保留空值／錯誤區別。
- L11：PASS，新的頁面初始化讀取已保存的清單。
- L12：PASS，完整備份匯出、完整還原、舊格式合併匯入與無效資料保護測試通過。
- 真實資料檔整合另列 BLOCKED，不阻塞本階段的程式與受控驗收結案。

## 6. 回滾
- Candidate301 若回歸，回退至 Candidate300：SHA-256 `5fea42650ede3b8b779afdf7b61e42365388d41b34e4231988065eb2fb7d34a5`。
- 若整個第二階段出現資料安全問題，回到使用者已確認的 Candidate299：SHA-256 `1e7a37cef7a7d791c5dd40f09c2143b2e507dac76c73951e5060b82f5c44c2e4`。
- 最終安全基準仍是未修改的 Candidate295：SHA-256 `aef896eee98c10bcb9fb1f10d6650b8e26067426f43b086e1b69fa12e3674a81`。

## 7. 下一階段
第三階段：AMQ／EMQ 資料與初始化驗證。優先取得 `data.js`、`emq-data.js`，檢查真實資料結構、載入 ready 時序、ID 關聯、AMQ／EMQ／MIX pool 邊界與黑名單。缺少檔案時先完成可由原始碼驗證的部分，將實際資料驗收明確標示 BLOCKED，不停止其他安全工作。
