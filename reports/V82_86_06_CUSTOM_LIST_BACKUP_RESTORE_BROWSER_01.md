# V82.86.06 AMQ／EMQ 自訂清單備份還原瀏覽器驗收

- 基準分支：`v82.86.05-custom-list-id-lifecycle-matrix-01`
- 基準 commit：`1b9b9a6e2e95bb2414968fe6aef1e119bd6ee8dc`
- 本階段分支：`v82.86.06-custom-list-backup-restore-browser-01`
- 本階段產品基準：V82.82，8,787,490 bytes，SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`
- 不可變基準 V82.65 未修改。
- 產品 HTML、產品 JS/CSS、來源 fragments 與 manifest 均未修改；只擴充瀏覽器驗收程式。

## 變更內容

擴充 `tests/browser/native_storage_custom_lists_acceptance.py`，使用 Chromium、臨時 localhost HTTP origin、原生 localStorage／IndexedDB 與隔離的全新瀏覽器 context，沿用實際應用程式的備份 UI：

1. 從正式 UI 匯出完整備份，確認備份同時包含 `aniCustomPracticeListsV1`（AMQ）與 `aniEmqWorkListsV8254`（EMQ）以及 storage manifest。
2. 修改 manifest 使其與 storage key 不一致，嘗試匯入並斷言 localStorage 的完整快照完全不變。
3. 刪除測試清單後，在還原寫入 `aniEmqWorkListsV8254` 時注入一次性 `QuotaExceededError`，斷言完整應用程式 storage 快照精確回復到還原前狀態。
4. 重新匯入有效備份，斷言 AMQ／EMQ 清單 ID 與名稱均恢復。
5. 實際重新載入文件，斷言兩個清單儲存值保持一致，且兩個清單都能重新顯示於 UI。
6. 保留原本的 AMQ／EMQ 建立、成員、重新命名、reload、錯誤收集與其他瀏覽器回歸案例。

## 驗收結果

GitHub Actions run [39166474674](https://github.com/murorachi/Amq-/actions/runs/39166474674) 已在 commit `cbc5fed2d513fa4c01761cd640ea65c160a76146` 上通過兩個 job：

- `source-and-unit`: PASS。V82.82 deterministic build／fingerprint、模組契約、工程 backlog、依賴所有權等既有檢查通過。
- `browser-native-origin`: PASS。新增的備份還原案例及同一 job 中既有的 invalid-scope、IndexedDB／quiz input、quiz suggestion、answer/playback lifecycle、multiplayer reconnect 等步驟全部通過。
- 新增瀏覽器斷言：備份含雙清單與 manifest、損毀 manifest 不改變資料、還原寫入失敗精確 rollback、有效備份還原雙清單、AMQ／EMQ ID 與名稱恢復、還原後 reload 保留資料、reload 後 UI 重新顯示清單。
- 產品指紋 gate 通過，產品 HTML 未改動；V82.82 大小與 SHA-256 維持上述值。

第一次 CI 在 Python 語法檢查階段失敗，原因是測試程式中的 JSON fallback 字串跳脫錯誤。已修正並在 commit `cbc5fed2d513fa4c01761cd640ea65c160a76146` 的完整 workflow 重新執行，兩個 job 均通過。失敗紀錄保留，不把首次失敗抹除。

## 測試界線與未涵蓋範圍

- 寫入故障是可重現的一次性測試注入，不代表真實磁碟已滿或瀏覽器配額故障已被觸發。
- 已驗證 Chromium localhost HTTP origin；Firefox CSS cascade、真實音訊供應商播放、正式部署網域儲存政策、真實 IndexedDB 損毀／配額案例仍是獨立驗收門檻。
- 本階段證明 AMQ／EMQ 清單可透過正式完整備份流程往返還原，不代表所有使用者資料 schema 都已全面審核。
- 不宣稱模組化已完成；此階段不做產品重構。

## 回滾與下一步

- 回滾：撤銷本分支的 `tests/browser/native_storage_custom_lists_acceptance.py` 與工程紀錄變更即可，不需要產品回滾。
- 下一步：將已驗證的 backup/restore 契約納入穩定的專項測試命令，並繼續處理 IndexedDB quota／corruption 的獨立失敗矩陣；在證據不足前不移動產品程式碼。
