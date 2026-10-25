# Batch36 — Candidate333 Candidate15 visibility listener cleanup

## 基準與產物
- Parent Candidate332 SHA-256: `dd4b9ca46fe3303232f8f455e1461c3e638fc339fa7440819d55df86a737f10d`
- Candidate333: `amq_learning_tool_v82_86_44_candidate333_candidate15_visibility_listener_cleanup_20261026.html`
- Candidate333 SHA-256: `56308f2c168c8344281ee75e23ce4a87c6a927aa56367448f0140206b81b247d`
- Size: 1,631,927 -> 1,631,769 bytes (-158 bytes)
- Status: experimental candidate only. Formal baseline Candidate302; rollback checkpoint Candidate320.

## 修改及依據
只修改 `amq-workspace-prototype-15-script`，移除該模組自行註冊的 `hashchange` 與 `popstate` 兩個 `syncWorkspaceVisibility` listener，並移除不再使用的 `observer` 變數與函式回傳值。

依據：主路由 `showView()` 透過 `__aniNavigateApp` 更新 `activeView`，同時切換 `.view-catalog`、`#watchlistView` 等元素的 `hidden`／`class`；Candidate15 的 subtree MutationObserver 已觀察這些變化。整份 HTML 未找到 `location.hash`、`history.pushState` 或 `history.replaceState` 路由；`hashchange`／`popstate` 仍由 Song Select route synchronizer 等其他模組自行處理，沒有刪除其他模組的 listener。

## 保留原因
- 保留 Candidate15 的 MutationObserver：`#vnCatalogView`、`#vnListView` 由 VN 模組動態建立；`#customListsWork` 與 VN 子視圖會透過 `hidden`／`class` 變更切換。observer 仍需處理子視圖與主路由狀態。
- 保留 Candidate76 的面板幾何、ARIA 與 close state；保留 Candidate77 的 dock 開關及導航收合。它們與 Candidate15 的 `amq-workspace-active` 路由分類不是同一責任。
- 未修改自訂清單資料層、成員 API、storage/session key。

## 測試
- PASS — Candidate332 SHA-256 核對。
- PASS — 65 個可執行 inline scripts 語法檢查，0 errors；1 個 application/json 資料 script 略過語法檢查。
- PASS — 只改動 Candidate15 script body；Candidate76／77／82 script body 完全相同。
- PASS — Candidate15 不再註冊 `hashchange`／`popstate` listener；`syncWorkspaceVisibility()`、三個子視圖判斷及 subtree observer 保留。
- PASS — 731 個 ID 屬性、16 種重複 ID（額外 20 次）與父版一致；109 個 style blocks 與父版一致。
- NOT RUN — 真實瀏覽器路由／子視圖切換、自訂清單新增移除及重載持久化、媒體播放。
- NOT RUN — Candidate333 HTML 上傳 GitHub 及遠端 SHA-256 核驗。

## 風險與回滾
- 若未來改成 hash-based 或 History API 路由，需重新評估被移除的 Candidate15 listener；目前主路由以 DOM 狀態變化作為同步訊號。
- 回滾至 Candidate332；未覆蓋 Candidate332、Candidate320 或 Candidate302。
- 不宣稱瀏覽器驗收完成。

## 下一步
1. 進一步盤點 Candidate15 Observer 的實際 mutation 來源與必要觀察範圍；先保留 `childList`，因 VN view 是動態建立。
2. 若無法證明可安全縮小 observer 範圍，轉查其他有明確無呼叫端的舊 workspace 初始化／事件綁定，不為了刪除量改寫 Observer。
