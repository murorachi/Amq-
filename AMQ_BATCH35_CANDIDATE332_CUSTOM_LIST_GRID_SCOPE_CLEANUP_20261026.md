# Batch35 — Candidate332 Candidate16 grid scope cleanup

## 基準與產物
- Parent Candidate331 SHA-256: `1a17f6a940aa2248a40c56a15d91fe0d63df35da35948f15156fd261dea13565`
- Candidate332: `amq_learning_tool_v82_86_43_candidate332_custom_list_grid_scope_cleanup_20261026.html`
- Candidate332 SHA-256: `dd4b9ca46fe3303232f8f455e1461c3e638fc339fa7440819d55df86a737f10d`
- Size: 1,632,034 -> 1,631,927 bytes (-107 bytes)
- Status: experimental candidate only. Formal baseline Candidate302; rollback checkpoint Candidate320.

## 修改
只修改 `amq-workspace-prototype-16-custom-list-workflow-script`：
1. `getGrid()` 移除 `#catalogGrid`、`.grid`、`#animeGrid` fallback。Candidate331 HTML 有靜態 `#grid`，因此這些 selector 位於必定成功的 `#grid` 後方；Song Select 仍優先使用動態建立的 `#amqSongSelectTracklist`，尚未建立時回退至 `#grid`。
2. `getCards()` 移除全文件 `.card` 掃描 fallback。現有 HTML 保證 `#grid.view-catalog` 存在，Song Select 的 `.p32-catalog` 仍優先使用。這避免容器缺失時意外把其他區域的卡片當作候選作品。

## 明確保留
- 舊 catalog `.card` 管理面板路徑：正式 `render()` 仍建立這些卡片；卡片沒有直接 work ID，仍需 MAL／標題索引回查；`.cardManage` 與 `#practiceManageBackdrop` 仍存在。
- Song Select `.songrow[data-work-id]` 與 `__aniCustomListMembershipV1.toggleResult/hasResult`。
- `aniCustomPracticeListsV1` 相容讀取、canonical store 持久化、`amqCustomListMode85` session 狀態。
- Candidate15 可見性 Observer 與 Candidate76/77 生命週期。現有證據不足以證明責任重複，因此未刪除。

## 測試
- PASS — Candidate331 基準 SHA-256 核對。
- PASS — 68 個 script 標籤數量不變；只有 Candidate16 script body 改變。
- PASS — Node syntax: 65 個可執行 inline scripts，0 errors。
- PASS — 109 個 style blocks 的原始大括號平衡檢查。
- PASS — 729 個 ID 屬性、17 種重複 ID（額外出現 21 次）與 Candidate331 完全相同。
- PASS — 關鍵 membership API、舊管理面板、storage key 與 session key 仍存在。
- NOT RUN — 真實瀏覽器互動、自訂清單新增／移除及重載持久化、雙卡片來源 E2E、音訊／影片播放。
- NOT RUN — Candidate332 HTML 上傳與遠端 SHA-256 核驗。

## 風險與回滾
- 若未來移除靜態 `#grid` 或更改 catalog DOM，必須重新評估容器非空假設。
- 回滾至 Candidate331；沒有覆蓋 Candidate331、Candidate320 或 Candidate302。
- 不宣稱瀏覽器驗收完成。

## 下一步
1. 映射 Candidate15 `syncWorkspaceVisibility()` 所依賴的 view/class/hidden 變化來源，再決定 Observer 是否能縮小觀察範圍。
2. 若無法證明 Candidate15 Observer 可刪除，保留它；轉查其他可證明無呼叫端的舊 workspace 初始化或重複事件綁定。
