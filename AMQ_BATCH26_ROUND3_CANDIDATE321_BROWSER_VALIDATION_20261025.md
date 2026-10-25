# Batch26 第三輪：Candidate321 瀏覽器驗證與阻塞定位

## 基準與產物
- 測試對象：`amq_learning_tool_v82_86_32_candidate321_batch26_round2_songselect_ownership_cleanup_20261025.html`
- Candidate321：1,645,516 bytes；SHA-256 `5b4ac7bdbe92f1b1a1b7056e543b065a0829d266a5f4b4fd2a1e9f7a5347e83a`
- 回滾 Candidate320：1,645,470 bytes；SHA-256 `134020658ac272916bdd503c0ebdbe8cdbafcf0c15cff96cc0d45ddf63c8a66c`
- 正式維護基準仍為 Candidate302；SHA-256 `f718a744057be0a33d371306f1742aaeede90e84f33d9e62ab45f5e6db488abd`。
- Candidate321 未修改、未升格。

## 瀏覽器環境調查
1. Chromium `/usr/bin/chromium` 可由 Playwright 啟動：PASS。
2. 直接導覽 `file://` 與 `http://127.0.0.1` 均被瀏覽器管理政策回應 `ERR_BLOCKED_BY_ADMINISTRATOR`：環境限制，不是應用程式錯誤證據。
3. 透過 Playwright `page.set_content()` 載入完整 HTML 後，DOM 可建立，但兩個外部資料腳本 `data.js`、`emq-data.js` 沒有被載入；在目前 GitHub 分支以 `fetch_file` 查找這兩個路徑皆回 404。無資料層時，頁面出現 `DB is not defined`、`anime is not defined` 等啟動錯誤，並因 opaque document origin 無法使用 localStorage。
4. 因此完整應用的正式資料載入、真實封面 URL、真實播放與路由 E2E：BLOCKED。不能把合成資料測試冒充正式資料驗收。

## Chromium 隔離模組測試
以實際 Candidate321 中 Candidate106、114、115、137、158 的原始腳本建立最小 DOM harness；資料 API 使用 6 筆明確標記為合成的 AMQ/EMQ 記錄。未修改 Candidate321 檔案。

| 案例 | 斷言 | 結果 |
|---|---|---|
| AMQ 模式 | 只顯示 3 筆 AMQ；每列恰有一個 `.amq-song-art` | PASS |
| EMQ 模式 | 只顯示 3 筆 EMQ | PASS |
| MIX 模式 | 顯示 6 筆，來源統計 AMQ=3、EMQ=3 | PASS |
| 搜尋 | 搜尋 `Gamma` 後只顯示 `Gamma OP`，總數 1 | PASS |
| 排序 | `name` 排序結果為 Alpha、Beta、Gamma；與初始年份排序不同 | PASS |
| Candidate115 artwork 分工 | 主 `#amqSongSelectTracklist` 每列只留 Candidate137 建立的單一 placeholder；外部 AMQ/EMQ inline list 各仍有一個 artwork placeholder | PASS |
| Candidate106 / Candidate158 overflow | 桌面 Song Select 狀態下 catalog 與 mount 最終皆為 `overflow: visible`；Candidate106 不再寫入互相衝突的 overflow 值 | PASS |
| Candidate114 離開路由復原 | 移除 Song Select 狀態後，audioDock 回到 `position:relative; width:100%; height:46px; grid-template-rows:18px 25px`；home frame=68px、slot=46px | PASS（隔離 harness） |
| 隔離 harness JavaScript 執行錯誤 | 0 page errors、0 console errors | PASS |

## 尚未驗收 / 不做推論
- 真實資料下 AMQ/EMQ/MIX：BLOCKED（`data.js`、`emq-data.js` 缺失）。上表是合成資料隔離測試，不等同正式曲庫驗收。
- 真實封面下載、載入失敗 fallback、Candidate210 IntersectionObserver lazy-load：NOT RUN。
- 真實點選歌曲後播放音訊／影片：NOT RUN。
- Candidate114 多個延遲 reset 是否能合併：待確認。隔離測試證明最終復原結果正確，但無法證明正式應用中後續 timer 沒有修補其他模組延遲覆寫。
- Candidate158 subtree Observer 縮小觀察範圍：待確認。隔離測試確認 overflow 結果，但尚未用正式應用資料及路由確認動態 mount/catalog 生命週期。

## 決策
1. 保留 Candidate114 所有延遲 reset；不在缺少完整應用資料的情況下刪 timer。
2. 保留 Candidate158 subtree Observer；目前只證明輸出正確，尚未證明縮小範圍後不漏掉動態 DOM 更新。
3. 保留 Candidate321，不升格；Candidate320 仍是回滾點，Candidate302 仍是正式基準。
4. Candidate321 HTML 上傳與遠端 SHA-256 仍 NOT VERIFIED。GitHub 目前未提供本機檔案位元組直傳通道；本輪已更新文件，但不宣稱 HTML 已上傳。

## 回滾
若後續整合測試出現回歸，回到 Candidate320（SHA-256 `134020658ac272916bdd503c0ebdbe8cdbafcf0c15cff96cc0d45ddf63c8a66c`）。Candidate321 未覆蓋 Candidate320，正式基準 Candidate302 未變更。

## 下一步
1. 找回／取得與 Candidate321 相同基準的 `data.js` 與 `emq-data.js`，或確認正式打包流程應如何內嵌這兩個資料層；不可自行造資料替代正式曲庫。
2. 在可正常載入資料與 localStorage 的受支援瀏覽器環境完成正式 AMQ/EMQ/MIX、搜尋／篩選／排序、封面載入／fallback、選取播放及離開 Song Select 復原驗收。
3. 再判斷 Candidate114 timers 與 Candidate158 Observer 是否可縮減。
4. 將 Candidate321 HTML 本體上傳 GitHub，讀回位元組後核對 SHA-256，再考慮升格。
