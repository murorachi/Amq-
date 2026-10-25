# Batch26 第四輪補充：Candidate321 初始化競態與 Candidate324 修正驗收

## 基準與候選
- 正式維護基準 Candidate302 SHA-256：`f718a744057be0a33d371306f1742aaeede90e84f33d9e62ab45f5e6db488abd`
- Candidate321：1,645,516 bytes；SHA-256 `5b4ac7bdbe92f1b1a1b7056e543b065a0829d266a5f4b4fd2a1e9f7a5347e83a`
- Candidate324：`amq_learning_tool_v82_86_35_candidate324_defer_songselect_init_observer_until_route_20261025.html`
  - 1,646,101 bytes
  - SHA-256 `3308f0a97a0a8aaa63a464a0d49bee2dffa5219cb6c59add85cf3d62523d6075`
- Candidate320 回滾點 SHA-256：`134020658ac272916bdd503c0ebdbe8cdbafcf0c15cff96cc0d45ddf63c8a66c`
- Candidate321、Candidate320、Candidate302 均未覆寫。

## 根本原因
Candidate210 在解析期直接查詢 Song Select stage 並嘗試綁定主歌曲列表；但列表可能在正式路由切換後才建立。Candidate137 建立 `#amqSongSelectTracklist` 的時機與 Candidate210 初始化時機有競態。

Candidate321 使用實際資料的 Chromium 測試重複 4 次：2/4 次正常，2/4 次歌曲列存在但沒有封面 img 節點及 Candidate210 點選處理。這不是資料缺失，而是初始化時序不穩定。

## Candidate324 修改
只修改 Candidate210 初始化生命週期：將 Song Select stage Observer 的安裝延後到正式路由啟動後的 `apply()`，而非解析期直接查詢可能尚未存在的節點。Observer 監看 stage 子樹；發現主歌曲列表後補齊 `installCenteredSelection()`、`observeList()`、`installRowCovers()`。沒有刪除 Candidate114 timers，也沒有修改 Candidate158 Observer。

Candidate322／323 是未升格的中間試驗版，未能穩定解決競態；Candidate324 是依失敗證據修正後的候選版。

## Candidate324 測試結果

| 案例 | 結果 | 實際斷言 |
|---|---|---|
| AMQ 資料載入 | PASS（測試副本） | 9,516 部作品、38,821 首歌曲 |
| EMQ 資料載入 | PASS（測試副本） | 6,645 部作品 |
| Song Select 正式按鈕導航 | PASS（隔離瀏覽器副本） | 透過「歌曲選擇」按鈕進入，route active=true |
| 初始化競態回歸 | PASS | 6/6 次：180 列、180 個 artwork img 節點、Candidate210 click handler 已綁定 |
| 歌曲列選取 | PASS | 6/6 次點列後設定 `currentSong`，首列歌曲 ID 45305 |
| AMQ／EMQ 模式 | PASS（已渲染頁面） | AMQ 可見列 source=amq；EMQ 可見列 source=emq |
| MIX 跨來源搜尋 | PASS | 搜尋實際 EMQ 歌曲 `Shiosai no Melody`，回傳 1 列且 source=emq |
| 搜尋 | PASS | `Cowboy Bebop` 回傳 32 首匹配歌曲 |
| 名稱排序 | PASS | 名稱排序首列 `_summer`，可見列數 180（分批渲染） |
| 年代篩選 | PASS | 選 1980 年代後，可見 180 列年份範圍 1980–1981，無不符合列 |
| 作品類型篩選 | PASS | 選 Movie 後可見 180 列均為 Movie |
| 離開 Song Select 後播放器版面 | PASS（隔離測試） | route active=false；audioDock `position:relative`、height=46px、grid rows=18px 25px；home slot=46px |
| JavaScript 語法 | PASS | 65 個可執行 inline scripts，0 語法錯誤 |
| CSS 解析 | PASS | 109 style blocks、2,648 rules、9,693 declarations、0 parse errors |
| HTML ID | PASS | 269 IDs、0 duplicates |

## 尚未完成
- 真實封面下載與 fallback：BLOCKED／未驗證。列表建立 180 個 img 節點，但本輪沒有確認成功載入；外部 `cdn.animenewsnetwork.com` 曾回報 `ERR_NAME_NOT_RESOLVED`。不能據此判定正式封面服務正常或失效。
- 真實音訊／影片播放：NOT RUN。選取可設定 `currentSong`，但測試副本的 media `currentSrc` 仍為空；opaque origin 不足以驗證正式單檔環境中的媒體 URL。
- localStorage 持久化：NOT RUN。測試副本使用記憶體 shim。
- Candidate114 timer 精簡：NOT RUN，保留。
- Candidate158 subtree Observer 縮小：NOT RUN，保留。
- Candidate324 HTML 遠端上傳與 SHA-256：NOT VERIFIED。
- Candidate324 未升格，Candidate302 仍為正式基準。

## 回滾與下一步
- 若 Candidate324 有回歸，回到 Candidate321（SHA-256 `5b4ac7bdbe92f1b1a1b7056e543b065a0829d266a5f4b4fd2a1e9f7a5347e83a`）；Candidate320 仍保留作更早回滾點。
- 下一步先在可用外部網路與媒體 URL 的可信 origin 驗證封面下載／fallback 與真實播放，之後才處理 Candidate114 timers、Candidate158 Observer。
- 完整驗收及遠端 hash 驗證前，不升格 Candidate324。
