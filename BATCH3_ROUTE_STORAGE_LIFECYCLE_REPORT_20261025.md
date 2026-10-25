# 第三批：路由／資料持久化／生命週期驗證

日期：2026-10-25

## 基準
- Candidate302：`amq_learning_tool_v82_86_13_candidate302_emq_loader_state_validation_20261025.html`
- 1,720,249 bytes；SHA-256 `f718a744057be0a33d371306f1742aaeede90e84f33d9e62ab45f5e6db488abd`
- 未修改正式 HTML，未操作真實使用者資料。

## 已執行的隔離 Chromium 測試
- 路由 harness：14/14 PASS，0 page errors。使用 Candidate302 實際 script 3、62、70，依賴 DOM/API 為 stub；不是完整應用 E2E。
- Storage repository harness：6/6 PASS，0 page errors。使用 Candidate302 實際 script 28 與合成記憶體儲存層。
- 完整 AMQ/EMQ/MIX、音訊、清單 UI E2E：NOT RUN。
- Observer/listener/timer runtime instrumentation：NOT RUN。
- CSS computed-style/cascade browser check：NOT RUN。

## 核心發現
1. 正常 catalog 路徑更新 activeView、dispatch `ani-app-navigation`，generic wrapper 加上 `amq-standalone-route`。
2. dashboard 路徑更新 activeView、dispatch 核心事件，generic wrapper 移除 standalone class。
3. Song Select active 時，Candidate193 route guard 攔截 watchlist：activeView 不變、不發出核心導航事件，改開 workspace panel、關閉 home menu，並繞過 generic wrapper 的 standalone class 副作用。隔離測試已重現此差異。
4. Storage repository 隔離測試證實：錯誤 JSON 會被拒絕；合法 legacy AMQ 清單可匯入而保留來源 key；非 allowlist key 會被拒絕；注入寫入失敗時 transaction rollback 能恢復原值。
5. AMQ `aniCustomPracticeListsV1` 的 canonical store 與 fallback/backup consumers 仍須保留到完整呼叫者驗證。EMQ 的 `workIds/vndbIds/songIds` schema 必須與 AMQ `animeIds` 分離。

## 生命週期／CSS
靜態索引為 383 listener registration/removal patterns、57 observer constructors、182 timer/RAF calls；這些不是 leak 數量。高密度 script 已列入本地 JSON 登錄表，尚待逐項核對 create/rebind/disconnect/clear/cancel。重複 selector 需以 DOM、media context、specificity、`!important` 和 computed style 驗證，不能按次數刪除。

## 分類
- KEEP：核心導航事件、AMQ custom-list store、storage repository rollback、資料復原鍵、獨立 EMQ schema。
- INTEGRATE 候選：generic navigation wrapper、Song Select route guard、workspace panel state owner。
- NEEDS CONFIRMATION：高密度 observer/timer/listener、重複 CSS selector、EMQ selected-list key 的單一 writer。
- DELETE：0 項。

## 未完成與下一批
- Candidate302 HTML 在此分支仍 NOT_FOUND，遠端 hash 驗證 BLOCKED。
- 下一批：追查 custom-list 與 EMQ selected-list 所有 reader/writer；補齊完整資料檔後執行全應用 browser smoke/E2E；對 modal/grid/dock/route lifecycle 做 runtime 監測；選擇高影響 CSS 候選做 computed-style 比對。
