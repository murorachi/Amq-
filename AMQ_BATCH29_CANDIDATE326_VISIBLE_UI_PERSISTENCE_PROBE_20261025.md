# AMQ Batch29：Candidate326 可見 UI、路由與環境驗收探測

日期：2026-10-25

## 基準與資料
- Candidate326：`amq_learning_tool_v82_86_37_candidate326_batch28_songselect_lifecycle_ownership_cleanup_20261025.html`
- 大小：1,645,785 bytes
- SHA-256：`9fee7d3a68c0833b6e84d6f0a3a3beca1ab09902bdb3ec2f8b76f5e60d5db3ba`
- AMQ data.js：4,975,244 bytes，SHA-256 `692f69f56079d6cc0b30bd1951ab625f53799b87525c1bd52a27f29274703cf3`
- EMQ emq-data.js：2,684,266 bytes，SHA-256 `88441b4a6090c01db1dae23c970a6fa24d457a54f4b915be3e23c3799b3794cc`
- 本輪沒有修改應用程式碼。

## 測試環境限制
使用 Chromium + Playwright，在 `page.set_content()` 的 opaque `about:blank` 測試副本中嵌入原始資料檔，並使用記憶體版 storage shim。這可測試實際 DOM 與可見按鈕操作，但不能驗證瀏覽器原生持久化。
- `http://127.0.0.1:8766/index.html` 導航：BLOCKED，`net::ERR_BLOCKED_BY_ADMINISTRATOR`。
- `file:///mnt/data/amq_candidate326_localhost_test/index.html` 導航：BLOCKED，`net::ERR_BLOCKED_BY_ADMINISTRATOR`。
- 外部 ANN / VNDB API：DNS 解析失敗 `net::ERR_NAME_NOT_RESOLVED`。

## 結果

| 測試 | 狀態 | 證據 |
|---|---|---|
| 可見 UI 進入 Song Select | **PASS** | 點擊可見 `#amqMainIcon`，再點擊可見 `#amqHomePrimaryNav [data-home-action="catalog"]`；activeView=`catalog`、route class 啟用、stage 可見、180 列歌曲、選單關閉。 |
| AMQ 模式 | **PASS** | 180 列全部 `source=amq`。 |
| EMQ 模式 | **PASS** | 180 列全部 `source=emq`。 |
| MIX 跨來源搜尋 | **PASS** | 搜尋 `Shiosai no Melody` 回傳 ID `2000000001`、`source=emq`。MIX 預設首批 180 列顯示 AMQ 不代表 EMQ 未加入，列表為分批渲染。 |
| 年代篩選 | **PASS** | 選擇 1980 後結果計數由先前 Movie 篩選的 5,137 首變成 2,813 首，前列作品亦變更。 |
| Movie 類型篩選 | **PASS** | 選擇 Movie 後狀態顯示 5,137 首歌曲。DOM 固定分批顯示 180 列，因此不能用 DOM 列數代替總結果數。 |
| 歌曲列選取 | **PASS** | 點擊可見歌曲列後，選取 ID `45305`，`currentSong` 更新為 `Usagi to Kame`。 |
| 返回主頁／退出路由 | **PASS** | 點擊可見 `#c99Back`；activeView 回到 home、Song Select route class 移除、audioDock 回到 relative／46px、home player slot 為 46px。 |
| 封面載入與 fallback | **BLOCKED** | 外部 API DNS 失敗；圖片 `src`／成功載入數為 0。fallback 視覺狀態未能確認，不宣稱 PASS。 |
| 真實音訊／影片播放 | **BLOCKED** | 測試 origin 沒有可播放 `currentSrc`，外部網路/DNS 不可用；只驗證歌曲選取，未驗證真實播放。 |
| 原生持久化 | **BLOCKED** | 只能使用記憶體 shim；localhost 與 file URL 均被瀏覽器政策封鎖，未驗證重載後持久化。 |
| 未捕捉 JavaScript 錯誤 | **PASS** | 0 個 uncaught page errors；console errors 為外部資源載入失敗。 |

## 判讀
1. 可見 UI 進入 Song Select 已在實際點擊測試副本中通過。先前把可見 UI 路徑標成 BLOCKED 的判定由本報告修正。
2. Candidate326 的 AMQ/EMQ/MIX、搜尋、篩選、歌曲選取及可見返回流程通過隔離瀏覽器測試。
3. 外部封面、fallback 呈現、真實媒體播放及原生儲存仍未完成可信 origin 驗收；不能把環境阻擋當成程式通過。
4. Candidate326、Candidate320、Candidate302 與兩份資料檔均未修改。
5. Candidate326 仍是實驗候選，不升格為正式基準。
