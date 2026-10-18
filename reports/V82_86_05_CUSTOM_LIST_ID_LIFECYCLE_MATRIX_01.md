# V82.86.05 AMQ／EMQ 自訂清單 ID 生命週期驗收矩陣

- 基準：`v82.86.04-critical-cross-fragment-ownership-01`，commit `3916761ddcb98bbc90f5e09570f78c4ff446db57`。
- 本階段：`v82.86.05-custom-list-id-lifecycle-matrix-01`。
- 產品鎖定：V82.82，8,787,490 bytes，SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`。
- 範圍：只擴充既有 exact-source 單元測試與工程紀錄；不修改產品 JS/CSS、fragment、manifest 或正式 HTML。

## 摘要

此階段將 AMQ／EMQ 清單識別碼及持久化失敗情境整理成明確矩陣，並擴充 `tests/unit/custom_list_crud_reload_contract.test.cjs`。新增測試透過 VM 執行從正式來源擷取的實際函式，不是重新實作同名邏輯。

## 測試矩陣

| ID | 案例 | 斷言 | 本階段狀態 |
|---|---|---|---|
| AMQ-ID-01 | 建立清單 | 名稱正規化、穩定清單 ID、寫入 localStorage | 既有測試 |
| AMQ-ID-02 | 加入／移除作品 | anime ID 轉字串、去重、只修改目標清單 | 既有測試 |
| AMQ-ID-03 | 重新載入 | 清單 ID、名稱、animeIds 保留 | 既有測試 |
| AMQ-ID-04 | 儲存失敗 | 新增清單回傳 false，記憶體及原儲存值不變 | 新增測試 |
| AMQ-ID-05 | UI 刪除／選取範圍清理 | 保留刪除控制及 scope 更新接線 | 既有來源契約 |
| EMQ-ID-01 | 建立清單 | 名稱正規化、大小寫不敏感的重名拒絕 | 既有測試 |
| EMQ-ID-02 | work／VNDB 對應 | workIds 與 vndbIds 分別儲存，轉換歌曲候選時才映射 | 既有測試 |
| EMQ-ID-03 | 直接 song ID | songIds 去重、重新載入後仍是 song ID，能解析為歌曲候選 | 新增測試 |
| EMQ-ID-04 | 移除成員／重新載入 | 目標清單成員變更持久化，其他清單不受影響 | 既有測試 |
| EMQ-ID-05 | 儲存失敗 | 新增清單回傳空 ID，記憶體及原儲存值不變 | 新增測試 |
| EMQ-ID-06 | 損毀 JSON | loadDb 回傳空清單，不產生虛構 ID | 新增測試 |
| EMQ-ID-07 | UI 刪除／選取範圍清理 | 保留刪除控制、已刪除選取清理與 invalid-scope 清理接線 | 既有來源契約 |
| STORE-ID-01 | 真實瀏覽器 reload／原生儲存 | 由既有 real-origin acceptance 覆蓋部分路徑 | 既有 CI 案例；本階段尚未重跑確認 |
| BACKUP-ID-01 | 自訂清單備份／還原往返 | 尚無本階段專屬的完整 AMQ／EMQ backup→restore→reload 端到端矩陣 | 未完成，保留外部驗收門檻 |
| SCOPE-ID-01 | 無效 scope fail-closed | 既有獨立瀏覽器測試涵蓋部分行為 | 既有 CI 案例；本階段尚未重跑確認 |

## ID 所有權規則

- AMQ 的 `animeIds` 指作品 ID；`validAnimeIds` 負責將候選 ID 正規化並依作品目錄驗證。
- EMQ 的 `workIds`、`vndbIds`、`songIds` 是不同欄位。VNDB 可對應作品，作品或 VNDB 再映射成歌曲；直接 song ID 不得被當成 work ID。
- 清單選取狀態是另一層資料，不等於清單內容。刪除清單時需要清理選取 ID 及 invalid-scope 狀態。
- 儲存失敗時不得先發布未持久化的記憶體狀態；新增的兩項失敗測試鎖定這個契約。
- 損毀 JSON fallback 只證明目前 loadDb 的回傳行為；它不證明資料已被隔離、恢復或安全備份。

## 測試報告界線

新增四個案例：
1. AMQ 清單寫入失敗不變更記憶體清單。
2. EMQ 直接 song ID 經正規化及 reload 後保留識別碼種類，並映射至歌曲候選。
3. EMQ 清單寫入失敗不發布新記憶體清單。
4. EMQ 損毀 JSON fallback 為空清單。

本地未執行；GitHub Actions run [39162546062](https://github.com/murorachi/Amq-/actions/runs/39162546062) 已實際執行這些測試，`custom_list_crud_reload_contract.test.cjs` 報告 15 passed、0 failed。首次執行曾因測試檔尾端的字面 `\\n` 造成 SyntaxError；已修正並以 commit `41bec9560a419693bff2a2f3edb829112588ca24` 重跑，最終兩個 job 均成功。V82.82 deterministic build 128 項檢查通過，輸出 8,787,490 bytes，SHA-256 仍為 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`。真實原生儲存、完整備份還原及生產網域政策仍不由 VM 單元測試替代。

## 風險與回滾

- 沒有產品程式變更；本階段不會直接改變使用者資料或 UI。
- 風險：損毀資料 fallback 為空清單，可能隱藏資料格式問題；這裡只記錄現行行為，不宣稱已修復資料復原。
- 回滾：撤銷本分支的測試、報告與狀態文件提交即可，不需要產品回滾。
- 下一步：補上自訂清單備份匯出／匯入的端到端測試與真實瀏覽器 reload，並獨立追蹤損毀資料隔離／復原策略。
