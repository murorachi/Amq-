# AMQ Candidate320 全域候選清單（第一輪摘要）
日期：2026-10-25

## 基準核對
- 掃描對象：`amq_learning_tool_v82_86_31_candidate320_remove_dead_songselect_catalog_observer_20261025.html`
- 大小：1,645,470 bytes
- SHA-256：`134020658ac272916bdd503c0ebdbe8cdbafcf0c15cff96cc0d45ddf63c8a66c`
- 正式基準 Candidate302 未變；Candidate320 本輪只讀，無應用程式碼修改。

## 實際靜態檢查
- JavaScript：65 個可執行 inline scripts 經 Node `--check`，PASS，0 語法錯誤。
- CSS：109 style blocks、2,648 qualified rules、9,693 declarations；tinycss2 解析 PASS，0 errors。
- HTML：269 IDs，0 duplicate IDs。
- Selector：逗號分割後 2,450 個 selector 字串，其中 536 組重複出現。這是 selector 字串統計，不代表可直接刪除。
- 114 個字面 ID 引用在初始 HTML 找不到對應 ID；可能是動態建立或條件式 DOM，全部只列為待追蹤候選，不視為死碼。
- 本輪完整候選 JSON 已在本地交付；此 GitHub 文件為摘要，並非完整 JSON 的替代品。

## 全域候選分類
1. CSS cascade 重複：按 selector、media/supports、specificity、source order 與 computed style 核對。
2. Observer lifecycle：靜態掃描 54 個 constructor occurrences；追蹤 target、callback、disconnect 及 route ownership。
3. Timer/RAF lifecycle：176 個 timer/RAF call sites；追蹤取消、重試與初始化後是否仍存活。
4. Event listener lifecycle：474 個 addEventListener、4 個 removeEventListener call sites；數量差異不是 leak 證據。
5. Dynamic/global APIs：605 個 window.__* API 參照；追蹤動態呼叫及跨模組消費者。
6. Song Select 多 owner：Candidate103/106/114/115/137/158/210/193/99/71/72 與 Proto26 integration。
7. Workspace 重疊：Candidate76/77/82/227、Workspace Prototype 15/16、Candidate258。
8. Quiz/player patch stack：v32-v65 與 v82-35/39/40/44 等歷史補丁。
9. Storage/data migration：AMQ/EMQ custom-list schema、storage repository、recovery、scene background IndexedDB。
10. Modal/overlay lifecycle：Candidate185 與 feature-specific modal builders。
11. 重複函式名稱：11 組；先確認 IIFE/local scope，不按同名直接合併。

## 生命週期優先群
- LC-01 Candidate106：80/300/900ms queue、body observer、resize listener。
- LC-02 Candidate114：0/180/500/900ms reset retries、route/body observers。
- LC-03 Candidate137：render debounce、250ms retry/interval。
- LC-04 Candidate103：body class 與 audioPlayer observers 共用 RAF(fix)。
- LC-05 Candidate158：mount/catalog overflow writers。
- LC-06 Candidate210：列表、媒體、route observers；同時承載批次選取及 workspace 行為。
- LC-07 Candidate71：grid/VNDB lazy sentinels 與初始化 interval。
- LC-08 Candidate99：dock metadata、route observer，以及 progress/volume/mode sync。
- LC-09 Candidate115：documentElement subtree observer 與 delegated click。
- LC-10 Candidate185：modal exclusion/close/reopen/nested dialog。
- LC-11 Workspace Prototype 16：grid observer binding 和 refresh lifecycle。
- LC-12 Candidate76/77/82：workspace shell/frame/sidebar/actions ownership。

## 分類結論
- 直接刪除：本輪沒有新增符合證據門檻的項目。
- 整合後刪除：以上 Song Select、Workspace、CSS cascade、modal 與 timer/listener 候選需先完成 owner/依賴矩陣。
- 暫緩：資料 schema、recovery/backup、動態引用、外部媒體、modal 巢狀流程與未驗證執行時行為。
- Browser full-app E2E、persistent storage、實際媒體播放及 cover fallback：本輪 NOT RUN。
- Candidate320 與 Candidate302 均未修改。
