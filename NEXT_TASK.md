# 下一步工作：批次 3 舊作品批次功能遷移與真正刪除

## 最新基準與回滾
- Candidate235 本機候選：amq_learning_tool_v82_85_49_candidate235_workspace_automation_migration_20261024.html
- 大小 9,369,076 bytes；SHA-256 d2cb92a244197b254ac49920bb9b18f2c0649d8eb4060691b189d53ee1e2aaa4。
- Candidate234 回滾：9,368,097 bytes；SHA-256 16b387530b2dd9cd22d3e8aba5b23ef5fd276c1aecf87481c4c08d6b9d1d3641。不得覆寫原始候選。

## P1 工作順序
1. 追查 #quicktools 在 #watchlistWork 的共用用途、selectedAnime、selectionMode、updateSelectionHint、syncListSelectors()、refresh interceptors、MutationObserver、動態引用與事件綁定。
2. 將 batch-create-list 與其餘仍依賴舊 catalog UI 的操作遷移到正式工作區；逐一驗證資料範圍與使用者確認流程。
3. Candidate210 歌曲批次保持唯一所有者；作品 ID 與歌曲 ID 集合分離。
4. 遷移完所有活躍呼叫點後，才刪除舊 catalog batch markup、listeners、CSS、Observers、初始化與刷新 hook。不得以 display:none 或條件分支代替刪除。
5. 每批刪除前記錄呼叫圖／間接依賴／資料契約；刪除後執行 JS syntax、CSS parse、靜態殘留引用、批次 API 單元測試、workspace switch 與必要功能回歸。
6. 不得刪除 AniList/MAL/VNDB 匯入、自訂清單、watchlist 或 Candidate210 歌曲批次的必要能力。
7. 最後重試原生 file://、reload 持久化、真實音訊、線上 API、多人模式與 osu!stable 像素比對；環境阻擋需標 BLOCKED。
8. 更新 CURRENT_STATUS.md、BASELINE.md、NEXT_TASK.md、測試報告與回滾紀錄；嘗試 GitHub HTML 上傳及遠端 SHA-256 驗證。文件提交不等於 HTML 已上傳。

## 已知測試環境限制
- Chromium managed policy URLBlocklist=["*"] 阻擋 file://、data: 與 localhost 導覽。
- opaque-origin page.set_content() 的 localStorage shim 曾不可靠；Node／靜態測試不代表完整瀏覽器持久化。
- 不修改系統管理政策；完整頁面 E2E 與原生 reload 目前尚未通過驗收。
