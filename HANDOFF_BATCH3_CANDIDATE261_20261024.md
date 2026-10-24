# AMQ 學習工具 Batch 3 交接（Candidate261，2026-10-24）

Batch 3 尚未完成，禁止開始 Batch 4。Candidate261 是修正候選，不是已驗收正式基準。

## 最新本機候選
- 檔案：`amq_learning_tool_v82_85_75_candidate261_dedicated_song_batch_route_20261024.html`
- 版本：`v82.85.75-candidate261-dedicated-song-batch-route-20261024`
- 大小：9,358,614 bytes
- SHA-256：`b1e1e25bbf6125fd9b7a075a962f91e5cc9a01a30d67b5da1bc37361e092d77d`
- 父版本 Candidate260 SHA-256：`a19be956afdf10b50dc15bbc10b3c69408e42c8751a838fb8e61313d0d98ed1f`
- Candidate260/258/256/259 原檔均未覆寫。

## 路由根因與修正
可見「歌曲批次整理」入口重用 `data-c99-action="vndb"`，舊 `runAction('vndb')` 會開 VNDB 匯入。Candidate260 依賴 capture listener 攔截這個共用識別值；當 listener 因路由尚未 active 而提早返回，點擊會落入舊 VNDB handler。

Candidate261 改用獨立 `song-batch` action，並在 active-route guard 前把舊 `vndb` action 遷移成 `song-batch`。專用路由呼叫既有歌曲批次 renderer；清單匯入仍由 `import` action 連到共用匯入 renderer。

## 測試
- PASS：Candidate260 SHA-256 重算一致。
- PASS：67 個可執行 inline JavaScript 區塊語法檢查，0 錯誤。
- PASS：110 個 CSS 區塊解析，0 錯誤。
- PASS：273 個 HTML ID，0 重複。
- PASS：靜態路由契約檢查。
- BLOCKED：原生瀏覽器點擊驗收。Chromium headless 載入候選 HTML 時逾時，未產生 DOM 輸出。
- BLOCKED：Candidate261 HTML 尚未上傳 GitHub，遠端 SHA 未驗證。
- NOT RUN：真實 AniList/MAL/VNDB API、資料持久化與來源限定移除測試。

## GitHub
- 分支：`amq-candidate261-dedicated-song-batch-route-20261024`
- 已更新 `CURRENT_STATUS.md`、`BASELINE.md`、`NEXT_TASK.md`，並上傳階段報告與靜態測試 JSON。
- Candidate261 HTML 本體未上傳：connector 寫入介面不能直接接收本機 9.36 MB HTML artifact 參照。不得聲稱遠端產物存在或 SHA 一致。

## 下一步
1. 在允許的原生瀏覽器實際點擊清單匯入與歌曲批次整理，驗證兩個面板互不混用。
2. 反覆切換四個工作區，檢查殘留內容與重複事件。
3. 完成歌曲批次搜尋／選取、自訂清單 CRUD 與 reload 持久化。
4. 實測 AniList/MAL/VNDB 匯入、取消／確認移除、錯誤復原與來源限定資料安全。
5. 解決大型 HTML 上傳方式並回讀核對版本、位元組數與 SHA-256。
6. Batch 3 完成後才能規劃 Batch 4。

## 回滾
使用未修改的 Candidate260，SHA-256 `a19be956afdf10b50dc15bbc10b3c69408e42c8751a838fb8e61313d0d98ed1f`。
