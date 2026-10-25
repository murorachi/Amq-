# Batch37 — Candidate334 Candidate15 observer scope reduction

## 基準與產物
- Parent Candidate333 SHA-256: `56308f2c168c8344281ee75e23ce4a87c6a927aa56367448f0140206b81b247d`
- Candidate334: `amq_learning_tool_v82_86_45_candidate334_candidate15_observer_scope_20261026.html`
- Candidate334 SHA-256: `e19b8b6ee79cf988b89f84c4e33a1bbcf83fcc90e9a85d60828db76c01e62eeb`
- Size: 1,631,769 -> 1,632,000 bytes (+231 bytes; scope/ownership change, not a size-reduction batch)
- Status: experimental candidate only. Formal baseline Candidate302; rollback checkpoint Candidate320.

## 修改及原因
只修改 `amq-workspace-prototype-15-script`：
1. 將 MutationObserver 的觀察根節點由整個 `document.body` 縮小到主應用 `.wrap`，仍保留 subtree、childList、`hidden`／`class` attributes，以接收 VN 子視圖動態建立與切換。
2. 新增 `ani-app-navigation` 事件監聽，直接同步主路由狀態。這補足 home 與 explore 之間可能只改 body class、但不一定造成 `.wrap` 內元素 attribute mutation 的情況。

根據實際原始碼，`showView()` 會 dispatch `ani-app-navigation`；VN 模組的 `appendViews()` 將 `#vnCatalogView`、`#vnListView` append 到 `.wrap`；`#customListsWork` 與主要 view 容器也在 `.wrap` 內。因此，主路由交給導航事件，子視圖狀態由局部 observer 處理，避免觀察整個 body 下無關區域的變動。

## 保留項目
- Candidate15 的 `syncWorkspaceVisibility()`、view 分類與 `amq-workspace-active` toggle。
- `.wrap` subtree MutationObserver：動態建立的 VN view 與自訂清單／VN 子視圖 hidden/class 變更仍需要它。
- Candidate76／77 面板與 dock 生命週期；Candidate16 自訂清單成員 API、storage/session key 均未修改。

## 測試
- PASS — Candidate333 SHA-256 核對。
- PASS — 65 個可執行 inline scripts 語法檢查，0 errors；1 個 application/json script 略過。
- PASS — 只有 Candidate15 script body 改變；Candidate76／77／82／16 script body 完全相同。
- PASS — observer root 為 `.wrap`；保留 `childList`／`hidden`／`class`，並註冊 `ani-app-navigation` listener。
- PASS — 731 個 ID 屬性、16 種重複 ID（額外 20 次）及 109 個 style blocks 與父版一致。
- NOT RUN — 瀏覽器主路由／VN 子視圖／自訂清單切換端到端測試、資料重載持久化、媒體播放。
- NOT RUN — Candidate334 HTML 上傳 GitHub 及遠端 SHA-256 核驗。

## 風險與回滾
- 若未來把 VN view 移出 `.wrap`，或新增不發 `ani-app-navigation` 且不在 `.wrap` 內改變 view 狀態的路由，需重新評估觀察根節點。
- 回滾至 Candidate333；Candidate333、Candidate320、Candidate302 均未覆蓋。
- 不宣稱瀏覽器驗收完成。

## 下一步
1. 檢查 Candidate15 是否還有不再使用的 DOM helper／狀態，並確認 `workspaceViews` 中的每個 view 都有實際入口。
2. 若沒有更多可證明的整段廢棄實作，轉向盤點 Candidate76／77 的初始化順序與事件重複綁定；不要繼續縮小 observer 到可能漏事件的程度。
