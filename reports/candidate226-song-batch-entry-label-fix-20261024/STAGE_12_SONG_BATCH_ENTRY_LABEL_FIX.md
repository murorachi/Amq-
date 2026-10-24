# Stage 12：修正歌曲批次入口標籤與互動驗收

日期：2026-10-24

## 基準、產物與回滾
- 父版本 Candidate222：9,348,268 bytes；SHA-256 `39d9962c38ab928f51969237063230e8f77dc6f9416f8bf9691b12c48522c723`。
- 新候選 Candidate226：`amq_learning_tool_v82_85_46_candidate226_song_batch_entry_label_fix_20261024.html`
- Candidate226 大小：9,348,469 bytes。
- Candidate226 SHA-256：`d3940fb1a6edaf67454621023c704783fc9fd8ab1b598238bdbe5735305c4c9c`。
- 回滾檔：`amq_learning_tool_v82_85_46_candidate222_rollback_before_candidate226_20261024.html`，9,348,268 bytes，SHA-256 與 Candidate222 完全一致。
- Candidate222 原檔未修改。

## 根因與修改
Candidate210 的 C99 click handler 將可見的 `[data-c99-action="vndb"]` 入口攔截後呼叫 `openBatch()`，實際功能是歌曲批次整理，但入口仍顯示 VNDB 匯入。這造成 UI 標籤與實際動作不一致。

Candidate226 只在既有 Candidate210 `apply()` 中，將該入口的標題改為「歌曲批次整理」，說明改為「熟悉度／標籤／黑名單／清單操作」。沒有新增第二套 handler、沒有更動資料 schema、沒有改動批次業務邏輯或儲存格式。VNDB 匯入仍由可見「清單匯入」入口中的既有匯入來源面板提供。

## 測試案例與結果

### 靜態檢查
- PASS：66 個可執行 inline JavaScript 區塊通過 `node --check`。
- PASS：108 個 CSS 區塊解析，0 個 parser error。
- PASS：Candidate226 標籤替換只命中 1 個正式位置。
- PASS：候選大小與 SHA-256 已重新計算。
- 排除：2 個非 JavaScript payload script（`application/json` 與 `application/octet-stream`），未將它們當成 JavaScript 測試。

### Playwright 替代環境（`page.set_content()` + 記憶體 storage shim）
| 案例 | 結果 | 斷言 |
|---|---|---|
| 頁面初始化 | PASS | title 正確、readyState complete |
| 進入 Song Select | PASS | `amq-songselect-route-active` 存在 |
| 清單匯入入口 | PASS | 匯入來源面板仍列出 AniList／MyAnimeList 與 VNDB |
| 批次入口標籤 | PASS | 顯示「歌曲批次整理」，不再顯示 VNDB |
| 點擊批次入口 | PASS | 打開既有 Candidate210「歌曲批次整理」面板 |
| 歌曲列初始化 | PASS | 180 首已載入歌曲列存在 |
| 選取目前載入歌曲 | PASS | 計數變成 180 首 |
| 清除選取 | PASS | 計數回到 0 首 |
| 執行時錯誤 | PASS | pageerror 0、console error 0 |

以上為記憶體 shim 的 DOM／事件測試，不是原生檔案啟動或持久化測試。

## 未完成／風險
- BLOCKED：原生 `file://` 啟動、重新載入持久化，Chromium managed URLBlocklist 仍阻擋 URL 導覽。
- NOT RUN：真實音訊、即時 AniList／MAL／VNDB API、多人體驗、osu!stable 像素比對。
- 尚未修正：作品批次入口仍不可達；舊作品層 `#quicktools` 和 workspace sidebar 在 Song Select 路由中不可見。Candidate226 只修正已存在的歌曲批次入口標籤，不代表作品批次已完成。
- 尚未上傳 Candidate226 HTML；GitHub connector 沒有已驗證的本機大檔路徑上傳流程，因此遠端 HTML 存在性與 SHA-256 均未驗證。

## 回滾
將使用版本退回 Candidate222 即可；Candidate222 原始檔未被覆寫。不要以 Candidate226 的標籤修正推論其他批次功能已驗收。
