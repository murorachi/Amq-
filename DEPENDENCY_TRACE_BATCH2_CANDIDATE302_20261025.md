# 第二批：Candidate302 依賴關係追查（靜態證據版）

日期：2026-10-25

## 基準
- `amq_learning_tool_v82_86_13_candidate302_emq_loader_state_validation_20261025.html`
- 1,720,249 bytes；SHA-256 `f718a744057be0a33d371306f1742aaeede90e84f33d9e62ab45f5e6db488abd`
- 本批沒有修改或刪除正式 HTML/CSS/JS。

## 掃描摘要
- 70 script tags：67 個 inline executable JS、2 個外部 script、1 個 JSON payload。
- 109 style blocks；Candidate302 靜態稽核 2,808 個頂層 CSS rules，0 JS syntax errors、0 CSS parser/declaration errors，271 個唯一 ID。
- 靜態抽取：41 個 literal/constant storage key 操作線索、383 個 listener registration/removal patterns、36 個 CustomEvent dispatch、57 個 observer constructors、182 個 timer/RAF 呼叫。
- CSS 本批遞迴解析 at-rules 並拆分 selector lists，得到 870 個重複 selector；第一批的 383 使用不同統計口徑，不能直接比較。重複 selector 不等於可刪 CSS。

## 路由／工作區
- Script 3 的 `showView` 是核心 app navigation，更新 activeView/body classes 並 dispatch `ani-app-navigation`。
- Script 62 的 generic wrapper 在原導航後切換 `amq-standalone-route`。
- Script 59 的 Song Select workspace mode 以 body/html `data-amq-workspace-mode` 和 route class 同步，屬於原地切換，不是 app route。
- Script 70 的 Candidate193 final guard 在 Song Select route 中攔截 watchlist/practice/explore/learningPlan/dashboard/vnList，關閉 home menu、開啟 workspace content、dispatch `amq-workspace-route-intercepted` 後直接 return。此路徑不呼叫原始 navigator，因此不發出核心 `ani-app-navigation`，並繞過 generic wrapper side effects。
- 結論：這些 wrapper 不能只按相同目的地名稱合併。暫定 INTEGRATE，需瀏覽器 state-transition matrix 驗證。

## 儲存與清單
- AMQ `aniCustomPracticeListsV1` 的 canonical writer/store 位於 `v82-25-custom-lists-and-practice-hub`：`KEYS.lists`、`readListData`、`persistLists`、`customListsStoreV1`，API 提供 read/readResult/refresh/write/mutate/toggleMembership。
- Anonymous script 5 仍有 canonical store 不可用時的 direct localStorage fallback；Candidate210 批次成員操作使用 canonical API。不能在未驗證啟動時序/錯誤狀態前刪除 fallback。
- Backup allowlist 包含 AMQ 清單及 recovery keys；restore 會先驗證 payload，舊版 appStorage restore 只接受已驗證的清單資料及受限 recovery snapshots。
- AMQ schema 使用 `animeIds`；EMQ `aniEmqWorkListsV8254` 使用 `workIds`、`vndbIds`、`songIds`。兩者必須保持分離。

## 生命週期與 CSS
- 57 observer constructors、182 timer/RAF 呼叫是靜態定位結果，不證明存在 leak。
- 需要逐個確認 observer target、rebind/disconnect/unobserve、timer clear/cancel、route change 和 stale-state guard。
- CSS 需要比對實際 DOM、computed style、media/supports context、specificity、route class 與 `!important`，不能按重複次數直接刪除。

## 測試
- PASS：Candidate302 hash/size；10/10 source-evidence assertions；靜態 JS/CSS/ID audit。
- NOT RUN：browser route/workspace E2E、computed style、runtime listener/observer/timer instrumentation、synthetic custom-list CRUD/import/export/backup/restore。
- BLOCKED：Candidate302 HTML 本體在本分支仍 NOT_FOUND，遠端 SHA-256 未驗證。
- 本批 DELETE=0；六項清理工程尚未完成。

詳細的機器可讀 evidence index 與可重現抽取工具另存於本機交付 ZIP。
