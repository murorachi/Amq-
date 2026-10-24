# Candidate255 工作線 A：靜態驗收與測試補強

日期：2026-10-24

## 基準
- Candidate255：v82.85.69-candidate255-remove-last-quicktools-refs-20261024
- HTML：amq_learning_tool_v82_85_69_candidate255_remove_last_quicktools_refs_20261024.html
- 9,355,697 bytes；SHA-256 `bd620e42e677ddbc8d48cf84da5773f3a51e42978c20ecbaa07761e467a7630d`
- 回滾 Candidate254 SHA-256：`e7fa38897fcec376153b4a8a979ba3fe44775df8e8266a1e17f2d5ecc24934a9`
- 本輪未修改 HTML，Candidate255 仍是候選，不升格為正式基準。

## 驗收結果
1. **舊批次殘留引用 PASS**：16 個已刪除 UI／控制項／初始化／Observer 識別字在註解外均為 0 引用；`quicktools` 無殘留引用。作品批次自動化改接正式 workspace API，Song Select 動態掛載不再引用舊節點。
2. **正式作品批次 API 靜態契約 PASS**：`__aniBatchBusinessAPIv228` 提供 `applyQueue`、`applyWatch`、`applySong`、`applyPractice`；寫入後讀回比對與失敗回復路徑存在。既有記憶體 shim 測試的 16 種動作 PASS。
3. **作品／歌曲選取隔離**：靜態 PASS。作品選取走 work bridge／作品 ID 集合；Candidate210 歌曲批次使用 IIFE 私有 Set，歌曲 checkbox handler 只改歌曲 Set。新增直接跨面板互動測試程序逾時，該項互動驗證 **BLOCKED／NOT RUN**，不冒充 runtime PASS。
4. **自訂清單資料契約 PASS**：保留 `aniCustomPracticeListsV1`、`{lists:[...]}` 相容形狀與 `animeIds` 作品 ID 陣列；加入去重、目標清單存在檢查與儲存失敗訊息均存在。記憶體 shim 下 CRUD／成員篩選測試 PASS；真實 reload 未驗證。
5. **篩選 UI 測試 PASS 9/9**：空查詢 9516、大小寫不敏感標題 85、年份 1999 為 139、原名 513、類型 TV 為 5433、前後空白 85、部分標題 1、無匹配 0、標點哨兵 0。各案可見項目皆符合查詢，0 page errors。
6. **靜態品質 PASS**：67 個可執行 JS 區塊 0 語法錯誤；109 CSS 區塊 0 解析錯誤；272 DOM IDs、0 重複；HTML SHA 未變。

## 測試分類
- PASS：靜態殘留掃描、18 項原始碼契約、9/9 篩選 UI 案例、既有記憶體 shim 的 16 種批次 API 動作與清單 CRUD。
- BLOCKED：直接跨面板選取互動測試逾時；原生 `file://`／localhost 受 Chromium managed `URLBlocklist=["*"]` 阻擋。沒有修改系統政策。
- NOT RUN：真實 reload 持久化、外部 AniList/MAL/VNDB 網路錯誤／去重、真實音訊、多人、osu!stable 像素差異、HTML 遠端內容與 SHA 驗證。
- FAIL：本輪靜態契約與篩選案例無 FAIL；BLOCKED／NOT RUN 不計為 PASS。

批次三仍未完成。下一步是取得可持久化的測試 origin，完成自訂清單真實 reload 與直接跨面板互動驗證，再完成正式 HTML 遠端版本／SHA 核對。不得開始批次四。
