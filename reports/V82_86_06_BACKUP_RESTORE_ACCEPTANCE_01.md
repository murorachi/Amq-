# V82.86.06 AMQ／EMQ 備份還原與回滾驗收

- 基準分支：`v82.86.05-custom-list-id-lifecycle-matrix-01`
- 基準提交：`1b9b9a6e2e95bb2414968fe6aef1e119bd6ee8dc`
- 本階段分支：`v82.86.06-backup-restore-acceptance-01`
- 產品鎖定：V82.82，8,787,490 bytes，SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`
- 範圍：擴充既有 Chromium localhost 原生儲存驗收；不修改產品 JS/CSS、來源片段、manifest 或正式 HTML。

## 修改原因與實作

V82.86.05 已有真實瀏覽器匯出備份、刪除 AMQ／EMQ 清單、匯入備份的基本案例，但匯入後主要檢查即時 localStorage 值，未在同一輪驗收中再次重新載入文件；也未驗證格式錯誤但 JSON 語法有效的備份是否會在寫入前被拒絕。

本階段擴充 `tests/browser/native_storage_custom_lists_acceptance.py`，沿用既有的正式 V82.82 HTML、Chromium、localhost HTTP origin 與原生 localStorage，不引入 storage shim。

## 新增案例與實際斷言

| 案例 | 斷言 | 狀態 |
|---|---|---|
| BACKUP-RESTORE-01 | 還原後重新載入文件，AMQ 清單名稱及原始成員 ID 保留 | PASS：run 39163991326 |
| BACKUP-RESTORE-02 | 還原後重新載入文件，EMQ 清單名稱、原始清單 ID、workIds 與 vndbIds 保留且不混淆 | PASS：run 39163991326 |
| BACKUP-INVALID-01 | 對 JSON 語法有效但備份 envelope 不合法的檔案，匯入前後完整 localStorage snapshot 相同 | PASS：run 39163991326 |
| BACKUP-INVALID-02 | 無效備份匯入後，AMQ／EMQ 清單仍可在 UI 中看到 | PASS：run 39163991326 |

無效備份測試帶入哨兵值，並要求匯入失敗時整份 localStorage snapshot 不變；因此若匯入程式先寫入備份資料再驗證 envelope，測試會失敗。

## 測試與驗收界線

- 靜態檢查：CI 內的 source/unit 工作通過。
- 自動化測試：run [39163991326](https://github.com/murorachi/Amq-/actions/runs/39163991326) 的 `source-and-unit` 與 `browser-native-origin` 均 PASS；本階段新增的 browser assertions 均執行完成。
- 現有 `backup_restore_contract.test.cjs` 與 `full_backup_restore_roundtrip_contract_v82_83.test.cjs` 已加入 CI 指令；run [39164060206](https://github.com/murorachi/Amq-/actions/runs/39164060206) 的 `source-and-unit` 工作 PASS。
- 實際 UI 驗收：使用 Chromium localhost HTTP origin；不是 `file://`，也沒有替換 localStorage。
- 未涵蓋：正式部署網域的儲存政策、Firefox、IndexedDB quota／損毀、實際音訊 provider 及多人連線。這些不因本測試通過而視為完成。
- 產品指紋：本階段只改測試與工程文件；CI 必須再次確認 V82.82 產物大小及 SHA-256 未變。

## 測試修正紀錄

第一次新增的無效備份 fixture 未帶有完整備份的 `format`／`version` 欄位，因此進入舊格式合併匯入路徑，並非本階段要驗證的完整備份 manifest validator。該次 browser test 失敗，未被記為產品缺陷。fixture 已修正為完整備份格式（version 10）且 manifest key 清單不一致，再次執行 run 39163991326 後兩個 job 均通過。這個修正縮小了測試所代表的行為，不代表所有舊格式備份都已完成驗證。

## 風險與回滾

- 本階段不修改產品邏輯，因此不需要產品程式回滾。
- 若新增斷言發現匯入先寫入後驗證，先保留失敗證據，再另立最小產品修正階段；不得以放寬斷言掩蓋資料覆寫。
- 回滾方式：撤銷本分支的 browser test、backlog 與工程紀錄提交即可。

## 下一步

待 CI 證實本地原生儲存的 round-trip 與 no-mutation 斷言後，再單獨評估正式部署環境政策及 IndexedDB quota／損毀恢復測試。不要把 Chromium localhost 的結果外推成所有瀏覽器或正式網域皆通過。
