# Stage 4 — Candidate295 核心靜態驗收

- 日期：2026-10-25
- 檢查對象：使用者提供的 index-old.html，內嵌版本 v82.86.06-candidate295-db-extraction-20261025。
- 檔案大小：1,720,917 bytes。
- SHA-256：aef896eee98c10bcb9fb1f10d6650b8e26067426f43b086e1b69fa12e3674a81。
- 本階段只做靜態追蹤與文件更新，未修改 HTML、CSS、JavaScript、資料或儲存格式。

## 結果

- PASS（靜態）：loadDB、IndexedDB cache/catalog 讀取與快照驗證、useDB 寫入／套用順序已定位。
- PASS（靜態）：EMQ 的 base64 + gzip 解碼流程、version/schema/ID/作品關聯驗證已定位。
- PASS（靜態）：songSourceV857、songPoolForModeV857、randomSong 的 AMQ/EMQ/MIX 選池與黑名單／音訊資格過濾已定位。
- PASS（靜態）：自訂清單 store 與 membership API 已定位。
- PASS（靜態）：Song Select Proto 模組、兩個包裝 __aniNavigateApp 的 route guard，以及 Candidate210 標記對應的實際行為模組已定位。
- NOT RUN：瀏覽器互動、IndexedDB 真實持久化、EMQ 解碼與筆數核對、三種模式實際出題、音訊播放／失敗恢復、自訂清單 CRUD、路由反覆切換。
- BLOCKED：目前工作環境沒有配套 data.js、emq-data.js；既有瀏覽器執行環境曾對 file:// 與本機 HTTP 導航回報 ERR_BLOCKED_BY_ADMINISTRATOR。

## 重要判斷

1. 不可把靜態流程存在當作執行期驗收通過。
2. 兩個 route guard 都包裝導航函式，存在順序耦合風險；現有證據不足以刪除其中任何一個。
3. Candidate210 標記所屬區塊包含實際選歌、dock、工作區及 observer 行為，不可僅憑舊版本標記刪除。
4. Candidate295 仍是待驗收候選，不是正式接受的單檔發行版；Candidate277 歷史基準紀錄不得被 Candidate295 覆蓋。

## 下一步

最高價值的下一步是取得與此 HTML 配套且版本匹配的 data.js、emq-data.js，並在使用者本機的可用瀏覽器中先執行資料載入與來源 ID 斷言，再執行 AMQ/EMQ/MIX 候選池與自訂清單持久化驗收。遇到執行環境阻擋即標記 BLOCKED，不重複耗時嘗試。

## 回滾

本階段只增加報告與狀態文件。回滾方式是還原本階段文件提交；Candidate295 HTML 與其本機凍結快照均未修改。