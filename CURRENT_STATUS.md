# V82.65 目前工程狀態

## 判定

**PARTIAL：候選題池一致性改善檢查點，不是整體工程完成版。**

## 已驗證

- 唯一直接基準 V82.64 Release ZIP 已重新下載，大小、SHA-256、ZIP CRC 都驗證通過；原始檔與歷史回滾檔保留。
- 前端共享 metadata policy、單人 AMQ 清單正式入口 adapter、失效範圍 fail-closed，以及來源適用性差異已加入候選版。
- 8 批、22/22 個正式測試命令通過，0 失敗、0 逾時、0 彙總錯誤。所有批次使用相同 HTML/server/catalog/registry 指紋。
- 完整 HTML + Chromium 個人條件測試 5/5：熟悉度＋標籤＋觀看狀態＋我的清單＋年份＋自訂清單交集、黑名單硬限制、遷移後明確空選取、焦點模式保留黑名單、焦點全被排除後 fail-closed。
- 完整 HTML + Chromium 來源模式測試 2/2：EMQ-only 與 Mixed。
- JS/Python metadata 固定案例比對涵蓋完整 54,778 筆曲庫；測試報告保留退出碼、日誌與指紋。
- 交付包：124658780 bytes，SHA-256 `db7918affcfbb6a15b0dc3265877623d9646532c7597bf2acaa85060f5a701b5`；ZIP CRC PASS、286 個前期封裝項目數已不適用。現行最終 ZIP 有 291 entries，其中 290 個檔案由內部 SHA256SUMS.txt 逐項驗證；290/290 PASS。

## 尚未完成／未驗證

- 熟悉度、標籤、焦點、觀看狀態、VNDB／個人清單、AMQ 自訂清單、EMQ 專用清單與黑名單的全部模式端到端交叉組合尚未完成。
- 多人伺服器仍無法由前端候選 song ID 反推出使用者的原始 tag、熟悉度與觀看狀態；server-authoritative 個人資料契約尚待設計與驗收。
- 真實外網音訊／第三方 API、IndexedDB 場景／背景 Blob 真實備份還原、兩台裝置 LAN/WebSocket/斷線重連未驗收。
- 八項工程整頓工作流仍全部標記 PARTIAL。

測試只使用隔離或合成資料，沒有清除真實 LocalStorage、IndexedDB、學習歷史、清單或伺服器狀態。22/22 測試命令加上個人條件 5/5 子案例，不等於整體工具完工。
