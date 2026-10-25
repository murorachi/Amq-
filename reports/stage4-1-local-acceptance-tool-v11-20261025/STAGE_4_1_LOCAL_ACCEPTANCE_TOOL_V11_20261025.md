# Stage 4.1 — Candidate295 本機驗收工具 v1.1

- 日期：2026-10-25
- 新工具：AMQ_Local_Acceptance_Tool_v1_1_Candidate295.html
- 工具大小：19,462 bytes
- 工具 SHA-256：8272523986420abef4f1820856fc2c81021941d28b67178b3130687e9f5e2b06
- ZIP：AMQ_Local_Acceptance_Tool_v1_1_Candidate295_20261025.zip
- ZIP 大小：10,204 bytes
- ZIP SHA-256：285dac12c163a55ef1ed08213fc02743d6c4b60d4bfdeea09635aa2f0368bb37

## 修改

- 將舊版工具的泛用核心函式名稱替換為 Candidate295 實際靜態找到的 loadDB、useDB、randomSong、songPoolForModeV857、songSourceV857。
- 增加唯讀診斷：主曲庫 anime/songs 可讀數量、__aniEmqAPI ready/count/workCount/getRows、一組 AMQ/EMQ/MIX 候選池大小、自訂清單 store/membership API。
- 保留原 v1.0 工具檔案不變，新增唯一版本 v1.1。
- 沒有自動建立、改名、刪除或修改任何自訂清單；沒有播放音訊或實際抽題。

## 測試結果

- PASS：工具內嵌 JavaScript 通過 Node.js node --check。
- PASS：靜態斷言確認工具已引用 Candidate295 實際 API 名稱，並移除不適用的 showView 假設。
- PASS：ZIP 完整性檢查，壓縮檔內兩個檔案均可讀。
- PASS：重新計算 Candidate295 原始檔與凍結快照的大小均為 1,720,917 bytes，SHA-256 均為 aef896eee98c10bcb9fb1f10d6650b8e26067426f43b086e1b69fa12e3674a81。
- NOT RUN：在使用者本機以真實 data.js、emq-data.js 執行工具。
- NOT RUN/BLOCKED：完整瀏覽器互動、IndexedDB 持久化、音訊、CRUD 與路由驗收。

## 限制與回滾

工具使用 iframe srcdoc，儲存來源可能與直接開啟正式 HTML 不同。主曲庫的 anime/songs 若位於詞法作用域，工具可能回報 BLOCKED，需結合頁面狀態人工確認。工具 PASS 不等於整個專案通過驗收。

回滾只需停用 v1.1，改回既有 v1.0 工具；Candidate295 HTML 與凍結快照未修改。