# 下一步工作：批次 3 舊作品批次功能遷移與真正刪除

## 最新基準與回滾
- 使用 Candidate234 本機候選：amq_learning_tool_v82_85_48_candidate234_queue_api_integration_20261024.html
- 大小 9,368,097 bytes；SHA-256 16b387530b2dd9cd22d3e8aba5b23ef5fd276c1aecf87481c4c08d6b9d1d3641。
- Candidate233 回滾：9,366,806 bytes；SHA-256 ae1d4794c8c6c1ad64726c7736d9d01a6a68ea9a84f81d704c0696df62594f45。不得覆寫原始候選。

## P1 工作順序
1. 完成真實呼叫圖：selectionHint、batchScopeSummaryV844、selectModeBtn、selectVisibleBtn、selectFilteredBtn、clearSelectionBtn、applyBulkWatchBtn、applyBulkSongBtn、queueSelectedBtn、bulkCustomList、applyBulkPracticeAction、selectedAnime、selectionMode、#quicktools。
2. 將工作區／C99 導航及自動化逐一改接正式工作區 API，保留確認流程、結果回報與資料層級隔離。不能只按字串引用數判斷可刪除。
3. 追查 #quicktools 在 #watchlistWork 的共用用途，以及 syncListSelectors()、refresh interceptors、MutationObserver、動態引用與事件綁定。
4. Candidate210 歌曲批次保持唯一所有者；作品 ID 與歌曲 ID 集合分離。先遷移所有活躍呼叫點，再刪除舊 catalog batch markup、listeners、CSS、Observers、初始化與刷新 hook。
5. 每批刪除前記錄呼叫圖／間接依賴／資料契約；刪除後執行 JS syntax、CSS parse、靜態殘留引用、批次 API 單元測試、workspace switch 與必要功能回歸。
6. 不得以 display:none、停用或條件分支保留整套廢棄實作；不得刪除 AniList/MAL/VNDB 匯入、自訂清單、watchlist 或 Candidate210 歌曲批次的必要能力。
7. 完成後重試原生 file://、reload 持久化、真實音訊、線上 API、多人模式與 osu!stable 像素差異；環境阻擋需標 BLOCKED。
8. 更新 CURRENT_STATUS.md、BASELINE.md、NEXT_TASK.md、測試報告與回滾紀錄；嘗試 GitHub HTML 上傳及遠端 SHA-256 驗證，不可把文件提交當成 HTML 已上傳。

## 已知測試環境限制
- Chromium managed policy URLBlocklist=["*"] 阻擋 file://、data: 與 localhost 導覽。
- opaque-origin page.set_content() 的 localStorage shim 在本輪完整頁面 harness 不可靠；Node VM API 單元測試可驗證函式邏輯，但不代表完整瀏覽器持久化。
- 不修改系統管理政策；真實 reload 持久化目前 NOT RUN，瀏覽器 E2E BLOCKED。
