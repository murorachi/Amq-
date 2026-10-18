# V82.86.06 AMQ／EMQ 自訂清單備份還原驗收補強

- 基準分支：`v82.86.05-custom-list-id-lifecycle-matrix-01`
- 基準提交：`1b9b9a6e2e95bb2414968fe6aef1e119bd6ee8dc`
- 本階段：`v82.86.06-custom-list-backup-restore-acceptance-01`
- 產品鎖定：V82.82，8,787,490 bytes，SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`
- 範圍：僅加強既有 Chromium localhost 瀏覽器驗收；不修改產品 JavaScript、CSS、來源 fragment、manifest 或正式 HTML。

## 變更

檔案：`tests/browser/native_storage_custom_lists_acceptance.py`

1. 在真實 localhost HTTP origin 上匯出完整備份後，建立語法損毀的 JSON 備份並嘗試匯入。
2. 匯入前後比較完整 localStorage snapshot，斷言損毀備份被拒絕且任何既有儲存值都未改變。
3. 既有有效備份還原測試仍會先刪除 AMQ／EMQ 測試清單，再透過實際檔案匯入 UI 還原。
4. 新增完整文件重新載入後的斷言，確認 AMQ／EMQ 清單 ID、名稱，以及 EMQ work/VNDB 成員關係仍存在。

## 測試與斷言

- [PASS／FAIL 待 CI] 應用程式於真實 localhost HTTP origin 啟動，且未使用 localStorage shim。
- [PASS／FAIL 待 CI] 完整備份含 AMQ、EMQ 清單資料及備份 manifest。
- [PASS／FAIL 待 CI] 損毀 JSON 匯入前後 localStorage snapshot 完全相同。
- [PASS／FAIL 待 CI] 有效備份能恢復先前刪除的 AMQ／EMQ 清單及 ID。
- [PASS／FAIL 待 CI] 還原後重新載入頁面，清單識別碼、名稱及 EMQ work/VNDB 成員仍一致。
- [PASS／FAIL 待 CI] 瀏覽器執行期間沒有未捕捉的 page error。
- 本地執行：未執行；以分支最新提交的 GitHub Actions 結果為準。
- 產品指紋：預期不變；由 CI deterministic build gate 實際核對。

## 尚未涵蓋與風險

- 本階段的損毀備份案例在 JSON 解析階段失敗，因此驗證的是「拒絕前沒有修改資料」。
- 尚未模擬 localStorage 在多個鍵寫入途中發生 quota／I/O 失敗。現有匯入流程逐鍵寫入，不能據此宣稱跨鍵匯入具備交易式回滾；這仍是明確的未驗證風險。
- 目前瀏覽器驗收為 Chromium localhost，不等同 Firefox、正式網域政策或真實 IndexedDB 配額／損毀驗收。
- 真實音訊服務及多人連線外部門檻保持獨立。

## 回滾

撤銷本分支測試與工程紀錄變更即可；本階段未修改產品程式碼，因此不需要產品 HTML 回滾。

## 下一步

若本階段 CI 通過，下一個最有價值的工作是專門驗證「匯入過程中儲存寫入失敗」是否造成部分套用；先以可重現測試確認，再決定是否需要獨立的產品修正階段。
