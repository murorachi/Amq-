## Candidate224 後續工作順序修正：先處理阻塞，再跳過（2026-10-24）
- 已讀取 Chromium managed policy：`/etc/chromium/policies/managed/000_policy_merge.json` 中 `URLBlocklist` 為 `["*"]`；最小 `file://`、`data:` 頁面及 localhost 導覽都回報 `ERR_BLOCKED_BY_ADMINISTRATOR`。這是環境層阻擋，不是 AMQ 頁面錯誤。
- Candidate222 透過 Playwright `page.set_content()` + 測試用記憶體 storage shim 可在約 2.1 秒完成 DOMContentLoaded，`readyState=complete`，沒有 pageerror/console error。此測試不涵蓋原生 URL 導覽及持久化。
- 尚無證據可判定 AMQ 初始化本身卡死。先嘗試可行替代測試；若被政策阻擋，標記 BLOCKED 並繼續不依賴該環境的工作，最後再回頭處理。不得修改 managed policy 或把受限測試說成 PASS。
- 本階段沒有修改 HTML，Candidate222 仍為唯一程式基線：9,348,268 bytes，SHA-256 `39d9962c38ab928f51969237063230e8f77dc6f9416f8bf9691b12c48522c723`。


## Candidate225 批次 UI 互動探測（2026-10-24）
- 重新驗證 Candidate222 本機檔案：9,348,268 bytes，SHA-256 `39d9962c38ab928f51969237063230e8f77dc6f9416f8bf9691b12c48522c723`，一致。
- Playwright `page.set_content()` + 記憶體 storage shim：首頁初始化、首頁展開、進入 Song Select、可見自訂清單入口 PASS；pageerror 0、console error 0。
- FAIL：Song Select 的 `#amqWorkspaceSidebar` 與 `#quicktools` 都存在但不可見，作品批次 UI 不可達。
- 歌曲批次端到端流程 NOT RUN；隔離 handler 可呼叫 Candidate210 runtime 不等於使用者入口可達。
- 原生 file://、持久化 reload BLOCKED；真實音訊、即時 API、多人與像素比對 NOT RUN。
- 本階段未修改 HTML。詳細證據：`reports/candidate225-batch-ui-interaction-probe-20261024/STAGE_11_BATCH_UI_INTERACTION_PROBE.md`。
- GitHub 文件已提交至本分支；大型 HTML 未上傳，遠端 HTML hash 未驗證。


## Candidate226 歌曲批次入口標籤修正（2026-10-24）
- Candidate222 父版本仍保留：9,348,268 bytes，SHA-256 `39d9962c38ab928f51969237063230e8f77dc6f9416f8bf9691b12c48522c723`。
- Candidate226：9,348,469 bytes，SHA-256 `d3940fb1a6edaf67454621023c704783fc9fd8ab1b598238bdbe5735305c4c9c`；回滾檔為 Candidate222 的 byte-identical copy。
- 根因：C99 `vndb` 入口的實際 handler 是 Candidate210 歌曲批次整理，但畫面仍顯示 VNDB 匯入。已修正標題與說明，沒有更動資料層或業務邏輯。
- PASS：66/66 可執行 JS 區塊語法；108 CSS 區塊 0 parser error；Playwright shim 下首頁初始化、Song Select、匯入面板仍可開啟且包含 VNDB、批次入口開啟既有面板、180 首歌曲選取／清除、0 pageerror／console error。
- BLOCKED：原生 file:// 與持久化 reload。NOT RUN：真實音訊、即時 API、多人與像素比對。
- 作品批次入口仍不可達，未宣稱完成。詳見 `reports/candidate226-song-batch-entry-label-fix-20261024/STAGE_12_SONG_BATCH_ENTRY_LABEL_FIX.md`。
- GitHub 文件已提交至 Candidate226 分支；HTML 本機產物尚未上傳，遠端 HTML SHA 未驗證。


## Candidate227 可見作品批次工作區（2026-10-24）
- 父版本 Candidate226：9,348,469 bytes，SHA-256 `d3940fb1a6edaf67454621023c704783fc9fd8ab1b598238bdbe5735305c4c9c`。
- Candidate227：9,360,586 bytes，SHA-256 `2c0b8154b95fbe0685a19e50e185646eedb06f978be211e9eeb06eebb956529d`。
- 新增可見 C99「作品批次整理」入口與作品搜尋／選取面板；沿用既有作品層業務函式，歌曲批次仍由 Candidate210 管理。
- PASS：67/67 可執行 JS 區塊語法；109 CSS 區塊 0 parser error；Playwright shim 下首頁導覽、可見入口、作品搜尋、選取、批次看番狀態、批次歌曲熟悉度、自訂清單加入／移出與作品／歌曲選取隔離；pageerror 0、console error 0。
- BLOCKED：原生 file:// 與持久化 reload。NOT RUN：真實音訊、即時 API、多人、像素比對、完整 SRS／黑名單分支。
- 回滾檔 Candidate226 byte-identical，原檔未修改。舊隱藏 UI 尚未清理，等待完整回歸後再刪除。
- 詳見 `reports/candidate227-visible-work-batch-workspace-20261024/STAGE_13_VISIBLE_WORK_BATCH_WORKSPACE.md`。
- GitHub 文件已提交；大型 HTML 尚未上傳，遠端 HTML SHA 未驗證。
