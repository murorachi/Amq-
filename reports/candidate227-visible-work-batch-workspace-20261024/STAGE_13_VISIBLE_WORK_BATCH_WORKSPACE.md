# Stage 13：可見作品批次工作區整合與互動驗收

日期：2026-10-24

## 基準、產物與回滾
- 父版本 Candidate226：9,348,469 bytes；SHA-256 `d3940fb1a6edaf67454621023c704783fc9fd8ab1b598238bdbe5735305c4c9c`。
- Candidate227：`amq_learning_tool_v82_85_46_candidate227_visible_work_batch_workspace_20261024.html`
- Candidate227：9,360,586 bytes；SHA-256 `2c0b8154b95fbe0685a19e50e185646eedb06f978be211e9eeb06eebb956529d`。
- 回滾檔：`amq_learning_tool_v82_85_46_candidate226_rollback_before_candidate227_20261024.html`，9,348,469 bytes；SHA-256 與 Candidate226 一致。
- Candidate226 原檔未修改。

## 實際修改
1. 在可見 C99 左側 rail 新增「作品批次整理」入口，導向 Song Select 既有共用工作面板。
2. 新增工作範圍選擇器，可搜尋作品名稱、日文名、年份及類型；列出作品 ID 對應的名稱、年份、類型與歌曲數。
3. 支援單部作品選取、選取目前顯示、選取全部搜尋結果（超過 300 部會要求確認）、清除選取及分頁顯示更多作品。
4. 透過 `__amqWorkBatchBridgeV227` 將作品 ID 選取狀態交回既有正式批次函式；沒有新增第二套持久化資料層。
5. 可從工作區執行看番狀態、所選作品全部歌曲的熟悉度、自訂清單加入／移出、手動補強加入／移出、作品黑名單與 SRS 操作。
6. 歌曲批次仍使用 Candidate210 的歌曲 ID Set。作品選取仍使用原有作品 ID Set。兩者不共用選取集合。
7. 沒有移除舊 `#quicktools`、舊監聽器或 CSS；這些只有在替代入口完整驗收後才可清理。

## 測試結果

### 靜態檢查
- PASS：67 個可執行 inline JavaScript 區塊通過 `node --check`。
- PASS：109 個 CSS 區塊通過 tinycss2 解析，0 個 parser error。
- PASS：候選版本標記、bridge 與 C99 action 入口各只新增一個正式位置。
- PASS：Candidate226 父檔 SHA-256 重算一致；回滾副本 byte-identical。
- 排除：2 個非 JavaScript payload script（JSON 與 gzip/base64 payload），沒有錯當成 JavaScript 檢查。

### Playwright 實際互動（`page.set_content()` + 測試用記憶體 storage shim）
| 案例 | 結果 | 斷言 |
|---|---|---|
| 初始化與 bridge | PASS | title 正確、readyState complete、作品批次 bridge 存在 |
| 正常首頁導覽 | PASS | 點擊主圖示，再點「歌曲選擇」進入 Song Select |
| 可見 rail 入口 | PASS | 新增的「作品批次整理」入口具有非零可見尺寸 |
| 工作區開啟 | PASS | 面板顯示「作品批次整理」，初始載入 60 個作品項目 |
| 作品搜尋 | PASS | 搜尋 `Angel Links` 從 9,516 部作品中得到 1 筆 |
| 作品選取 | PASS | 選取後計數為 1，bridge 作品 ID 集合為 `[1]` |
| 批次看番狀態 | PASS | 套用後既有 `watchStatus(1)` 回傳 `completed` |
| 批次歌曲熟悉度 | PASS | 對作品 ID 1 套用「有印象」後，其兩首歌曲狀態均為 2 |
| 自訂清單加入 | PASS | 測試清單的 `animeIds` 從空集合變成 `["1"]` |
| 自訂清單移出 | PASS | 再次移出後 `animeIds` 回到空集合，未刪除清單本身 |
| 歌曲／作品選取隔離 | PASS | 開啟歌曲批次後歌曲選取數為 0，作品 ID 選取仍維持 `[1]` |
| JavaScript 執行錯誤 | PASS | pageerror 0、console error 0 |

本輪操作寫入測試用記憶體 storage，不是使用者原有瀏覽器資料。測試沒有修改正式資料。

## 未完成與限制
- BLOCKED：原生 `file://` 開啟及真實重新載入持久化。Chromium managed URLBlocklist 仍阻擋 URL 導覽。
- NOT RUN：真實音訊、即時 AniList／MAL／VNDB API、多人流程、osu!stable 參考圖像素比對。
- NOT RUN：實際使用者資料下的自訂清單 CRUD／備份還原；本輪只在記憶體 shim 中使用合成清單驗證批次加入與移出。
- 待驗收：SRS、黑名單、所有看番狀態分支與超過 300 部作品的確認流程。
- 待清理：舊隱藏 `#quicktools` 及 workspace sidebar 作品批次入口仍保留，以免在更全面驗收前移除回退路徑。

## 回滾與交付
- 回滾至 Candidate226 即可；Candidate226 原檔未修改。
- GitHub 本階段提交測試報告與狀態文件。大型 HTML 尚未上傳，遠端 HTML 存在性與 SHA-256 未驗證。


## Stage 13 補充回歸：黑名單與 SRS（追加，2026-10-24）
在同一個隔離記憶體 storage 的 Playwright 執行中，補測前一版報告列為待驗收的兩種操作：
- PASS：黑名單加入後，`__aniIsAnimeWorkBlacklistedV825(songId)` 對所選作品的歌曲回傳 true。
- PASS：黑名單解除後，同一 API 回傳 false。
- PASS：接受既有 SRS 確認對話後，所選作品的兩首歌曲都出現在 `__aniSRSAPI.snapshot().cards`。
- PASS：切換到歌曲批次面板後，歌曲選取數為 0，作品選取仍維持 `[1]`。
- PASS：整輪補充測試 pageerror 0、console error 0。

這些結果只驗證記憶體 shim 下既有 API 的呼叫與狀態轉換；真實持久化與重載仍 BLOCKED。超過 300 部作品的確認／取消分支、所有看番狀態分支尚未逐一測完。
