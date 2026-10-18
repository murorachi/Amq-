# 完整模組化進度清單（V82.79 工程盤點）

盤點目的：列出目前所有 41 個 script/data 片段、50 個 CSS 片段，以及已抽出的八個來源模組；區分「物理切片」與「語意模組化」，避免把拆成多個檔案誤算為完成模組化。

## 1. 目前結論

- **正式產品基準：** V82.65 單檔 HTML，保持不可覆寫。
- **目前工程檢查點：** V82.76 SCRIPT004-BOUNDARY-AUDIT-01；V82.72 仍是目前產品輸出。
- **物理切片：** 41 個 script/data 片段與 50 個 CSS 片段均已有獨立來源檔，且建置保持原文件順序。
- **語意模組化：** 目前有 8 個已抽出的來源模組：`candidate_pool_policy.js`、`storage_repository.htmlpart`、`quiz_suggestion_text.js`、`anime_song_database.htmlpart`、`quiz_suggestion_renderer.js`、`quiz_suggestion_controller.js`、`get_quiz_pool.htmlpart`、`quiz_answer_metadata.htmlpart`。
- **尚未完成：** 其餘業務邏輯仍多留在歷史 script 片段；CSS 仍以順序敏感的覆寫層為主，未完成元件分群；完整 AST 呼叫圖、DOM 寫入者、listener/timer 所有權也未完成。
- **輸出保護：** 本清單追蹤工程來源；AST-PASS-01 後新增 `quiz_suggestion_text.js`，只移動原有 helper 並在原位置插回。V82.65 原始基準保持不可覆寫；V82.70 起若有明確修正，使用 manifest 的 release 指紋驗證獨立輸出。

## 2. 進度統計

| 類別 | 數量 | 目前狀態 |
|---|---:|---|
| Script／資料片段 | 41 | 已物理切片；只有部分語意模組化 |
| CSS 片段 | 50 | 已物理切片；保留 cascade 順序，語意分群未完成 |
| 已抽出來源模組 | 8 | 有獨立測試／建置插入點；其中部分仍與 IIFE closure 耦合 |
| 已完全解耦且完成端到端驗收的模組 | 0（依目前證據） | 尚無足夠證據宣稱完成 |

## 3. 已完成的模組

| 模組 | 檔案 | 已確認範圍 | 尚未完成 |
|---|---|---|---|
| 候選題池政策 | `src/modules/candidate_pool_policy.js` | 純政策 helper；來源模式、數值正規化、metadata、熟悉度、標籤、watchlist、黑名單與重複題判斷；契約測試通過 | `getQuizPool()` 仍讀取大量全域／DOM 狀態；完整呼叫圖與所有篩選組合尚未證明完備 |
| Storage Repository | `src/modules/storage_repository.htmlpart` | 原 script_027 區塊精確抽出並於原位置插回；名稱空間、驗證、快照、交易／回滾、白名單匯入與 adapter 契約測試 | 真實 browser origin 的持久化、IndexedDB Blob round-trip／升級／失敗情境尚未完成；其他模組仍可能直接碰儲存 |
| 候選題池組裝 | `src/modules/get_quiz_pool.htmlpart` | 原 `getQuizPool()` 函式 2,824 bytes 精確抽出並於 script_004 原位置插回；候選池 27 項整合案例及 19 項來源契約通過；輸出 HTML byte-identical | 仍直接依賴大量 IIFE closure 狀態、候選政策 API 與 DOM 狀態訊息；不是獨立純模組，下一步應先定義適配介面 |
| 答案建議文字政策 | `src/modules/quiz_suggestion_text.js` | 從 script_004 原位置精確抽出符號正規化、Unicode／來源 offset mapping、highlight range helper；16 項 production-source contract assertions 通過；建置輸出 byte-identical | `buildSuggestions()` 的 UI／DOM／事件與 top-25 組裝仍在 script_004；目前測試不等於完整 UI 端到端驗收 |
| 答案 metadata helpers | `src/modules/quiz_answer_metadata.htmlpart` | `uniqueQuizNamesV8239`、`getQuizAnimeNameBundleV8239`、`quizSongRoleLabelV8239` 原位元組抽出；14 項契約斷言及逐位元組還原測試通過 | 仍使用外層 `byAnime` 與 Chinese-title API；尚未解耦 tooltip 的 DOM／資料整理 |

## 4. Script／資料片段逐項清單

下表的「責任」是根據現有 ID／開頭 token 與既有依賴紀錄建立的**初步分類**，不是 AST 呼叫圖的最終結論。所有拆分都必須保持原執行順序，且以逐位元組一致的建置作為安全條件。

| # | 來源 | 大小 | 初步責任 | 狀態 | 優先級 | 下一步 |
|---:|---|---:|---|---|---|---|
| 01 | `src/scripts/script_001.htmlpart` | 102,981 B | runtime 初始化／歷史狀態片段（DB initializer 已抽出） | DB initializer 已移至 `src/modules/anime_song_database.htmlpart`；保留剩餘 runtime 的原始順序，並以契約測試驗證重建位元組、資料列形狀與 consumer 順序 | P1 | 補完整 runtime 依賴追蹤；不把剩餘 runtime 當純資料模組 |
| 02 | `src/scripts/script_002.htmlpart` | 6,038 B | 主導覽與個人 watchlist | 已物理切片；尚未完成語意模組化／完整依賴追蹤 | P2 | 頁面狀態與 DOM 耦合，先確認所有讀寫者 |
| 03 | `src/scripts/script_003.htmlpart` | 8,126 B | 封面／ANN metadata 載入 | 已物理切片；尚未完成語意模組化／完整依賴追蹤 | P2 | 外部 API、快取、錯誤與非同步生命週期 |
| 04 | `src/scripts/script_004.htmlpart` | 95,160 B | 核心應用／題庫與候選池組裝 | 候選題池政策、getQuizPool、答案建議文字、renderer/controller 已抽出；其他核心仍未完成語意拆分 | P0 | 補 lexical／DOM／global／lifecycle 依賴；`buildSuggestions()` UI、播放、答題與設定仍待拆分 |
| 05 | `src/scripts/script_005.htmlpart` | 1,139 B | 答題流程／播放器／提示與 UI 修補 | 已物理切片；尚未完成語意模組化／完整依賴追蹤 | P2 | 多為後續覆寫層；先確認覆寫意圖、順序及回歸測試 |
| 06 | `src/scripts/script_006.htmlpart` | 1,628 B | 答題流程／播放器／提示與 UI 修補 | 已物理切片；尚未完成語意模組化／完整依賴追蹤 | P2 | 多為後續覆寫層；先確認覆寫意圖、順序及回歸測試 |
| 07 | `src/scripts/script_007.htmlpart` | 4,765 B | 答題流程／播放器／提示與 UI 修補 | 已物理切片；尚未完成語意模組化／完整依賴追蹤 | P2 | 多為後續覆寫層；先確認覆寫意圖、順序及回歸測試 |
| 08 | `src/scripts/script_008.htmlpart` | 5,576 B | 答題流程／播放器／提示與 UI 修補 | 已物理切片；尚未完成語意模組化／完整依賴追蹤 | P2 | 多為後續覆寫層；先確認覆寫意圖、順序及回歸測試 |
| 09 | `src/scripts/script_009.htmlpart` | 2,000 B | 待精確責任界定 | 已物理切片；尚未完成語意模組化／完整依賴追蹤 | P2 | 需結合函式、window export、DOM、storage 與 listener 索引人工追蹤 |
| 10 | `src/scripts/script_010.htmlpart` | 1,985 B | 答題流程／播放器／提示與 UI 修補 | 已物理切片；尚未完成語意模組化／完整依賴追蹤 | P2 | 多為後續覆寫層；先確認覆寫意圖、順序及回歸測試 |
| 11 | `src/scripts/script_011.htmlpart` | 311 B | 待精確責任界定 | 已物理切片；尚未完成語意模組化／完整依賴追蹤 | P2 | 需結合函式、window export、DOM、storage 與 listener 索引人工追蹤 |
| 12 | `src/scripts/script_012.htmlpart` | 7,942 B | 答題流程／播放器／提示與 UI 修補 | 已物理切片；尚未完成語意模組化／完整依賴追蹤 | P2 | 多為後續覆寫層；先確認覆寫意圖、順序及回歸測試 |
| 13 | `src/scripts/script_013.htmlpart` | 733 B | 答題流程／播放器／提示與 UI 修補 | 已物理切片；尚未完成語意模組化／完整依賴追蹤 | P2 | 多為後續覆寫層；先確認覆寫意圖、順序及回歸測試 |
| 14 | `src/scripts/script_014.htmlpart` | 2,740 B | 答題流程／播放器／提示與 UI 修補 | 已物理切片；尚未完成語意模組化／完整依賴追蹤 | P2 | 多為後續覆寫層；先確認覆寫意圖、順序及回歸測試 |
| 15 | `src/scripts/script_015.htmlpart` | 6,872 B | 歷史／黑名單 UI 與政策 | 已物理切片；尚未完成語意模組化／完整依賴追蹤 | P1 | 與題庫篩選及歷史 API 契約耦合 |
| 16 | `src/scripts/script_016.htmlpart` | 10,541 B | 答題流程／播放器／提示與 UI 修補 | 已物理切片；尚未完成語意模組化／完整依賴追蹤 | P2 | 多為後續覆寫層；先確認覆寫意圖、順序及回歸測試 |
| 17 | `src/scripts/script_017.htmlpart` | 945 B | 答題流程／播放器／提示與 UI 修補 | 已物理切片；尚未完成語意模組化／完整依賴追蹤 | P2 | 多為後續覆寫層；先確認覆寫意圖、順序及回歸測試 |
| 18 | `src/scripts/script_018.htmlpart` | 1,459 B | 答題流程／播放器／提示與 UI 修補 | 已物理切片；尚未完成語意模組化／完整依賴追蹤 | P2 | 多為後續覆寫層；先確認覆寫意圖、順序及回歸測試 |
| 19 | `src/scripts/script_019.htmlpart` | 1,665 B | 導覽／檢視切換 | 已物理切片；尚未完成語意模組化／完整依賴追蹤 | P2 | 需盤點 DOM、狀態與初始化時序 |
| 20 | `src/scripts/script_020.htmlpart` | 39,032 B | 間隔重複／複習排程 SRS | 已物理切片；尚未完成語意模組化／完整依賴追蹤 | P1 | 已存在獨立測試；先界定 storage 與 UI 邊界 |
| 21 | `src/scripts/script_021.htmlpart` | 757 B | 答題流程／播放器／提示與 UI 修補 | 已物理切片；尚未完成語意模組化／完整依賴追蹤 | P2 | 多為後續覆寫層；先確認覆寫意圖、順序及回歸測試 |
| 22 | `src/scripts/script_022.htmlpart` | 1,367 B | 答題流程／播放器／提示與 UI 修補 | 已物理切片；尚未完成語意模組化／完整依賴追蹤 | P2 | 多為後續覆寫層；先確認覆寫意圖、順序及回歸測試 |
| 23 | `src/scripts/script_023.htmlpart` | 44,496 B | 學習紀錄／熟悉度與個人化狀態 | 已物理切片；尚未完成語意模組化／完整依賴追蹤 | P1 | 與題庫、歷史、儲存耦合高，需契約測試 |
| 24 | `src/scripts/script_024.htmlpart` | 3,889 B | 已知稽核修正／相容性補丁 | 已物理切片；尚未完成語意模組化／完整依賴追蹤 | P2 | 先辨識仍生效的修正，避免錯誤刪除 |
| 25 | `src/scripts/script_025.htmlpart` | 53,780 B | 自訂歌單／練習中心 | 已物理切片；尚未完成語意模組化／完整依賴追蹤 | P1 | 先盤點歌單範圍與 AMQ/EMQ 身分隔離 |
| 26 | `src/scripts/script_026.htmlpart` | 33,347 B | 首頁／個人檔案／行動版 UI | 已物理切片；尚未完成語意模組化／完整依賴追蹤 | P2 | DOM 與全域狀態耦合需盤點 |
| 27 | `src/scripts/script_027.htmlpart` | 44 B | Storage Repository | 已拆分至 storage_repository 模組（原位置插回） | P1 | 已抽至 src/modules/storage_repository.htmlpart |
| 28 | `src/scripts/script_028.htmlpart` | 140,145 B | 多人房間 UI／連線與重連 | 已物理切片；尚未完成語意模組化／完整依賴追蹤 | P1 | 需真實伺服器及雙用戶端驗收 |
| 29 | `src/scripts/script_029.htmlpart` | 8,373 B | 答題流程／播放器／提示與 UI 修補 | 已物理切片；尚未完成語意模組化／完整依賴追蹤 | P2 | 多為後續覆寫層；先確認覆寫意圖、順序及回歸測試 |
| 30 | `src/scripts/script_030.htmlpart` | 125,793 B | AniList ID 對照資料（JSON data block） | 非 JavaScript 資料區塊；已由 parser inventory 正確排除 | P2 | 保持 JSON 結構與 ID mapping 不變；若抽取須 byte-preserving build 驗證 |
| 31 | `src/scripts/script_031.htmlpart` | 13,812 B | 中文標題／別名映射 | 已物理切片；尚未完成語意模組化／完整依賴追蹤 | P2 | 資料與正規化規則需分離並保持搜尋相容 |
| 32 | `src/scripts/script_032.htmlpart` | 1,307 B | 答題流程／播放器／提示與 UI 修補 | 已物理切片；尚未完成語意模組化／完整依賴追蹤 | P2 | 多為後續覆寫層；先確認覆寫意圖、順序及回歸測試 |
| 33 | `src/scripts/script_033.htmlpart` | 4,284 B | Watchlist／單人練習版面 | 已物理切片；尚未完成語意模組化／完整依賴追蹤 | P2 | 需盤點狀態所有權與 DOM 讀寫 |
| 34 | `src/scripts/script_034.htmlpart` | 8,270 B | Watchlist／單人練習版面 | 已物理切片；尚未完成語意模組化／完整依賴追蹤 | P2 | 需盤點狀態所有權與 DOM 讀寫 |
| 35 | `src/scripts/script_035.htmlpart` | 4,387 B | UI／互動修補層 | 已物理切片；尚未完成語意模組化／完整依賴追蹤 | P2 | 不得只因名稱或重複 selector 就合併 |
| 36 | `src/scripts/script_036.htmlpart` | 21,078 B | 場景背景設定／IndexedDB 資料 | 已物理切片；尚未完成語意模組化／完整依賴追蹤 | P1 | 需 IndexedDB round-trip、升級與失敗測試 |
| 37 | `src/scripts/script_037.htmlpart` | 2,684,318 B | EMQ 壓縮資料 payload | AST 已確認 DB initializer 4,975,240 B（anime 9,516 rows、songs 38,821 rows），後段含 runtime code；不可把整檔當純資料模組 | P2 | 資料資產，需保持與 AMQ song ID 隔離 |
| 38 | `src/scripts/script_038.htmlpart` | 15,277 B | EMQ 模式切換／來源組合 | 已物理切片；尚未完成語意模組化／完整依賴追蹤 | P2 | 需保持 AMQ/EMQ 分流與題庫順序 |
| 39 | `src/scripts/script_039.htmlpart` | 33,287 B | 導覽／檢視切換 | 已物理切片；尚未完成語意模組化／完整依賴追蹤 | P2 | 需盤點 DOM、狀態與初始化時序 |
| 40 | `src/scripts/script_040.htmlpart` | 32,856 B | EMQ 音訊／歌單／批次處理 | 已物理切片；尚未完成語意模組化／完整依賴追蹤 | P1 | 與來源身分、音訊可用性、歌單範圍耦合 |
| 41 | `src/scripts/script_041.htmlpart` | 9,745 B | 中文標題／別名映射 | 已物理切片；尚未完成語意模組化／完整依賴追蹤 | P2 | 資料與正規化規則需分離並保持搜尋相容 |

## 5. CSS 片段逐項清單

CSS 分片已具備獨立檔案與雜湊，但不代表它們已形成可獨立維護的元件樣式模組。因 CSS cascade 與載入順序會影響外觀，任何重組都必須先有 selector-to-view 映射與視覺回歸驗收。

| # | 來源 | 大小 | 初步責任／線索 | 狀態 | 優先級 | 下一步 |
|---:|---|---:|---|---|---|---|
| 01 | `src/styles/style_001.htmlpart` | 27,128 B | 基礎主題／全域 token 與主要元件樣式；線索：:root{--paper:#fff9fc;--ink:#34283c;--muted:#8b7b91;--l | 已物理切片且保留原 cascade 順序；尚未完成語意分群／重複規則驗證 | P2 | 先建立 selector→頁面／元件映射與 cascade 影響測試；不合併或刪除重複樣式，除非有視覺回歸證據。 |
| 02 | `src/styles/style_002.htmlpart` | 182 B | CSS 視覺／版面層（待 selector-to-view 分群）；線索：v5-layout-fix | 已物理切片且保留原 cascade 順序；尚未完成語意分群／重複規則驗證 | P2 | 先建立 selector→頁面／元件映射與 cascade 影響測試；不合併或刪除重複樣式，除非有視覺回歸證據。 |
| 03 | `src/styles/style_003.htmlpart` | 3,706 B | 目錄／封面樣式；線索：v6-cover-catalog | 已物理切片且保留原 cascade 順序；尚未完成語意分群／重複規則驗證 | P2 | 先建立 selector→頁面／元件映射與 cascade 影響測試；不合併或刪除重複樣式，除非有視覺回歸證據。 |
| 04 | `src/styles/style_004.htmlpart` | 2,020 B | 多人 UI 樣式；線索：mp-v8234-fixes | 已物理切片且保留原 cascade 順序；尚未完成語意分群／重複規則驗證 | P2 | 先建立 selector→頁面／元件映射與 cascade 影響測試；不合併或刪除重複樣式，除非有視覺回歸證據。 |
| 05 | `src/styles/style_005.htmlpart` | 482 B | 多人 UI 樣式；線索：mp-v8234-related-details | 已物理切片且保留原 cascade 順序；尚未完成語意分群／重複規則驗證 | P2 | 先建立 selector→頁面／元件映射與 cascade 影響測試；不合併或刪除重複樣式，除非有視覺回歸證據。 |
| 06 | `src/styles/style_006.htmlpart` | 4,051 B | 答題頁／播放器樣式與後續覆寫；線索：v19-quiz-reveal-layout-and-dark-fix | 已物理切片且保留原 cascade 順序；尚未完成語意分群／重複規則驗證 | P2 | 先建立 selector→頁面／元件映射與 cascade 影響測試；不合併或刪除重複樣式，除非有視覺回歸證據。 |
| 07 | `src/styles/style_007.htmlpart` | 8,867 B | 答題頁／播放器樣式與後續覆寫；線索：v30-quiz-redesign | 已物理切片且保留原 cascade 順序；尚未完成語意分群／重複規則驗證 | P2 | 先建立 selector→頁面／元件映射與 cascade 影響測試；不合併或刪除重複樣式，除非有視覺回歸證據。 |
| 08 | `src/styles/style_008.htmlpart` | 991 B | 目錄／封面樣式；線索：v33-player-cover-and-view-isolation | 已物理切片且保留原 cascade 順序；尚未完成語意分群／重複規則驗證 | P2 | 先建立 selector→頁面／元件映射與 cascade 影響測試；不合併或刪除重複樣式，除非有視覺回歸證據。 |
| 09 | `src/styles/style_009.htmlpart` | 326 B | 答題頁／播放器樣式與後續覆寫；線索：v34-quiz-fixes-style | 已物理切片且保留原 cascade 順序；尚未完成語意分群／重複規則驗證 | P2 | 先建立 selector→頁面／元件映射與 cascade 影響測試；不合併或刪除重複樣式，除非有視覺回歸證據。 |
| 10 | `src/styles/style_010.htmlpart` | 895 B | 答題頁／播放器樣式與後續覆寫；線索：v36-amq-avatar-style | 已物理切片且保留原 cascade 順序；尚未完成語意分群／重複規則驗證 | P2 | 先建立 selector→頁面／元件映射與 cascade 影響測試；不合併或刪除重複樣式，除非有視覺回歸證據。 |
| 11 | `src/styles/style_011.htmlpart` | 2,976 B | 答題頁／播放器樣式與後續覆寫；線索：v37-layout-fixes | 已物理切片且保留原 cascade 順序；尚未完成語意分群／重複規則驗證 | P2 | 先建立 selector→頁面／元件映射與 cascade 影響測試；不合併或刪除重複樣式，除非有視覺回歸證據。 |
| 12 | `src/styles/style_012.htmlpart` | 525 B | 答題頁／播放器樣式與後續覆寫；線索：v38-clean-quiz-ui | 已物理切片且保留原 cascade 順序；尚未完成語意分群／重複規則驗證 | P2 | 先建立 selector→頁面／元件映射與 cascade 影響測試；不合併或刪除重複樣式，除非有視覺回歸證據。 |
| 13 | `src/styles/style_013.htmlpart` | 343 B | 答題頁／播放器樣式與後續覆寫；線索：v39-final-layout | 已物理切片且保留原 cascade 順序；尚未完成語意分群／重複規則驗證 | P2 | 先建立 selector→頁面／元件映射與 cascade 影響測試；不合併或刪除重複樣式，除非有視覺回歸證據。 |
| 14 | `src/styles/style_014.htmlpart` | 1,241 B | 答題頁／播放器樣式與後續覆寫；線索：v40-layout-and-buffer-fixes | 已物理切片且保留原 cascade 順序；尚未完成語意分群／重複規則驗證 | P2 | 先建立 selector→頁面／元件映射與 cascade 影響測試；不合併或刪除重複樣式，除非有視覺回歸證據。 |
| 15 | `src/styles/style_015.htmlpart` | 464 B | 答題頁／播放器樣式與後續覆寫；線索：v42-quiz-controls | 已物理切片且保留原 cascade 順序；尚未完成語意分群／重複規則驗證 | P2 | 先建立 selector→頁面／元件映射與 cascade 影響測試；不合併或刪除重複樣式，除非有視覺回歸證據。 |
| 16 | `src/styles/style_016.htmlpart` | 974 B | 答題頁／播放器樣式與後續覆寫；線索：v44-volume-style | 已物理切片且保留原 cascade 順序；尚未完成語意分群／重複規則驗證 | P2 | 先建立 selector→頁面／元件映射與 cascade 影響測試；不合併或刪除重複樣式，除非有視覺回歸證據。 |
| 17 | `src/styles/style_017.htmlpart` | 3,639 B | 答題頁／播放器樣式與後續覆寫；線索：v51-history-blacklist-styles | 已物理切片且保留原 cascade 順序；尚未完成語意分群／重複規則驗證 | P2 | 先建立 selector→頁面／元件映射與 cascade 影響測試；不合併或刪除重複樣式，除非有視覺回歸證據。 |
| 18 | `src/styles/style_018.htmlpart` | 1,297 B | 答題頁／播放器樣式與後續覆寫；線索：v59-quiz-answer-feedback-style | 已物理切片且保留原 cascade 順序；尚未完成語意分群／重複規則驗證 | P2 | 先建立 selector→頁面／元件映射與 cascade 影響測試；不合併或刪除重複樣式，除非有視覺回歸證據。 |
| 19 | `src/styles/style_019.htmlpart` | 1,193 B | CSS 視覺／版面層（待 selector-to-view 分群）；線索：v61-buffer-answer-feedback-style | 已物理切片且保留原 cascade 順序；尚未完成語意分群／重複規則驗證 | P2 | 先建立 selector→頁面／元件映射與 cascade 影響測試；不合併或刪除重複樣式，除非有視覺回歸證據。 |
| 20 | `src/styles/style_020.htmlpart` | 364 B | 答題頁／播放器樣式與後續覆寫；線索：v62-cover-stays-on-top | 已物理切片且保留原 cascade 順序；尚未完成語意分群／重複規則驗證 | P2 | 先建立 selector→頁面／元件映射與 cascade 影響測試；不合併或刪除重複樣式，除非有視覺回歸證據。 |
| 21 | `src/styles/style_021.htmlpart` | 1,267 B | 答題頁／播放器樣式與後續覆寫；線索：v63-soft-answer-glow-style | 已物理切片且保留原 cascade 順序；尚未完成語意分群／重複規則驗證 | P2 | 先建立 selector→頁面／元件映射與 cascade 影響測試；不合併或刪除重複樣式，除非有視覺回歸證據。 |
| 22 | `src/styles/style_022.htmlpart` | 3,209 B | CSS 視覺／版面層（待 selector-to-view 分群）；線索：v77-spaced-repetition-style | 已物理切片且保留原 cascade 順序；尚未完成語意分群／重複規則驗證 | P2 | 先建立 selector→頁面／元件映射與 cascade 影響測試；不合併或刪除重複樣式，除非有視覺回歸證據。 |
| 23 | `src/styles/style_023.htmlpart` | 1,733 B | CSS 視覺／版面層（待 selector-to-view 分群）；線索：v64-same-ui-buffer | 已物理切片且保留原 cascade 順序；尚未完成語意分群／重複規則驗證 | P2 | 先建立 selector→頁面／元件映射與 cascade 影響測試；不合併或刪除重複樣式，除非有視覺回歸證據。 |
| 24 | `src/styles/style_024.htmlpart` | 527 B | 答題頁／播放器樣式與後續覆寫；線索：quizSuggestionsV31Style | 已物理切片且保留原 cascade 順序；尚未完成語意分群／重複規則驗證 | P2 | 先建立 selector→頁面／元件映射與 cascade 影響測試；不合併或刪除重複樣式，除非有視覺回歸證據。 |
| 25 | `src/styles/style_025.htmlpart` | 1,866 B | 答題頁／播放器樣式與後續覆寫；線索：v32-quiet-quiz-flow | 已物理切片且保留原 cascade 順序；尚未完成語意分群／重複規則驗證 | P2 | 先建立 selector→頁面／元件映射與 cascade 影響測試；不合併或刪除重複樣式，除非有視覺回歸證據。 |
| 26 | `src/styles/style_026.htmlpart` | 424 B | 答題頁／播放器樣式與後續覆寫；線索：v36-centering | 已物理切片且保留原 cascade 順序；尚未完成語意分群／重複規則驗證 | P2 | 先建立 selector→頁面／元件映射與 cascade 影響測試；不合併或刪除重複樣式，除非有視覺回歸證據。 |
| 27 | `src/styles/style_027.htmlpart` | 258 B | 答題頁／播放器樣式與後續覆寫；線索：v45-theme-volume-compat | 已物理切片且保留原 cascade 順序；尚未完成語意分群／重複規則驗證 | P2 | 先建立 selector→頁面／元件映射與 cascade 影響測試；不合併或刪除重複樣式，除非有視覺回歸證據。 |
| 28 | `src/styles/style_028.htmlpart` | 1,496 B | 多人 UI 樣式；線索：v47-home-redesign | 已物理切片且保留原 cascade 順序；尚未完成語意分群／重複規則驗證 | P2 | 先建立 selector→頁面／元件映射與 cascade 影響測試；不合併或刪除重複樣式，除非有視覺回歸證據。 |
| 29 | `src/styles/style_029.htmlpart` | 860 B | 答題頁／播放器樣式與後續覆寫；線索：v65-answer-glow-fix | 已物理切片且保留原 cascade 順序；尚未完成語意分群／重複規則驗證 | P2 | 先建立 selector→頁面／元件映射與 cascade 影響測試；不合併或刪除重複樣式，除非有視覺回歸證據。 |
| 30 | `src/styles/style_030.htmlpart` | 2,317 B | 多人 UI 樣式；線索：learning-system-v72-style | 已物理切片且保留原 cascade 順序；尚未完成語意分群／重複規則驗證 | P2 | 先建立 selector→頁面／元件映射與 cascade 影響測試；不合併或刪除重複樣式，除非有視覺回歸證據。 |
| 31 | `src/styles/style_031.htmlpart` | 75,164 B | CSS 視覺／版面層（待 selector-to-view 分群）；線索：v79-design-system | 已物理切片且保留原 cascade 順序；尚未完成語意分群／重複規則驗證 | P2 | 先建立 selector→頁面／元件映射與 cascade 影響測試；不合併或刪除重複樣式，除非有視覺回歸證據。 |
| 32 | `src/styles/style_032.htmlpart` | 5,061 B | 多人 UI 樣式；線索：v82-36-host-focus-handoff-style | 已物理切片且保留原 cascade 順序；尚未完成語意分群／重複規則驗證 | P2 | 先建立 selector→頁面／元件映射與 cascade 影響測試；不合併或刪除重複樣式，除非有視覺回歸證據。 |
| 33 | `src/styles/style_033.htmlpart` | 671 B | CSS 視覺／版面層（待 selector-to-view 分群）；線索：aniChineseTitleStyleV8237 | 已物理切片且保留原 cascade 順序；尚未完成語意分群／重複規則驗證 | P2 | 先建立 selector→頁面／元件映射與 cascade 影響測試；不合併或刪除重複樣式，除非有視覺回歸證據。 |
| 34 | `src/styles/style_034.htmlpart` | 807 B | CSS 視覺／版面層（待 selector-to-view 分群）；線索：v82-38-team-collaboration-fix | 已物理切片且保留原 cascade 順序；尚未完成語意分群／重複規則驗證 | P2 | 先建立 selector→頁面／元件映射與 cascade 影響測試；不合併或刪除重複樣式，除非有視覺回歸證據。 |
| 35 | `src/styles/style_035.htmlpart` | 5,028 B | 答題頁／播放器樣式與後續覆寫；線索：v82-39-quiz-ui-polish-style | 已物理切片且保留原 cascade 順序；尚未完成語意分群／重複規則驗證 | P2 | 先建立 selector→頁面／元件映射與 cascade 影響測試；不合併或刪除重複樣式，除非有視覺回歸證據。 |
| 36 | `src/styles/style_036.htmlpart` | 6,341 B | 答題頁／播放器樣式與後續覆寫；線索：v82-40-watchlist-and-solo-quiz-layout-style | 已物理切片且保留原 cascade 順序；尚未完成語意分群／重複規則驗證 | P2 | 先建立 selector→頁面／元件映射與 cascade 影響測試；不合併或刪除重複樣式，除非有視覺回歸證據。 |
| 37 | `src/styles/style_037.htmlpart` | 5,376 B | 多人 UI 樣式；線索：v82-41-multiplayer-solo-player-style | 已物理切片且保留原 cascade 順序；尚未完成語意分群／重複規則驗證 | P2 | 先建立 selector→頁面／元件映射與 cascade 影響測試；不合併或刪除重複樣式，除非有視覺回歸證據。 |
| 38 | `src/styles/style_038.htmlpart` | 2,002 B | 多人 UI 樣式；線索：v82-42-team-consensus-multilist-style | 已物理切片且保留原 cascade 順序；尚未完成語意分群／重複規則驗證 | P2 | 先建立 selector→頁面／元件映射與 cascade 影響測試；不合併或刪除重複樣式，除非有視覺回歸證據。 |
| 39 | `src/styles/style_039.htmlpart` | 384 B | 多人 UI 樣式；線索：v8242-multiplayer-answer-label-cleanup | 已物理切片且保留原 cascade 順序；尚未完成語意分群／重複規則驗證 | P2 | 先建立 selector→頁面／元件映射與 cascade 影響測試；不合併或刪除重複樣式，除非有視覺回歸證據。 |
| 40 | `src/styles/style_040.htmlpart` | 5,184 B | 多人 UI 樣式；線索：v8243-player-detail-watchlist-style | 已物理切片且保留原 cascade 順序；尚未完成語意分群／重複規則驗證 | P2 | 先建立 selector→頁面／元件映射與 cascade 影響測試；不合併或刪除重複樣式，除非有視覺回歸證據。 |
| 41 | `src/styles/style_041.htmlpart` | 4,021 B | CSS 視覺／版面層（待 selector-to-view 分群）；線索：v82-44-ux-intuition-cleanup-style | 已物理切片且保留原 cascade 順序；尚未完成語意分群／重複規則驗證 | P2 | 先建立 selector→頁面／元件映射與 cascade 影響測試；不合併或刪除重複樣式，除非有視覺回歸證據。 |
| 42 | `src/styles/style_042.htmlpart` | 7,751 B | CSS 視覺／版面層（待 selector-to-view 分群）；線索：v82-45-home-icon-and-scene-background-style | 已物理切片且保留原 cascade 順序；尚未完成語意分群／重複規則驗證 | P2 | 先建立 selector→頁面／元件映射與 cascade 影響測試；不合併或刪除重複樣式，除非有視覺回歸證據。 |
| 43 | `src/styles/style_043.htmlpart` | 7,981 B | 深色主題覆寫；線索：v82-46-home-menu-and-watchlist-dark-style | 已物理切片且保留原 cascade 順序；尚未完成語意分群／重複規則驗證 | P2 | 先建立 selector→頁面／元件映射與 cascade 影響測試；不合併或刪除重複樣式，除非有視覺回歸證據。 |
| 44 | `src/styles/style_044.htmlpart` | 723 B | 多人 UI 樣式；線索：emq-toggle-v8248-style | 已物理切片且保留原 cascade 順序；尚未完成語意分群／重複規則驗證 | P2 | 先建立 selector→頁面／元件映射與 cascade 影響測試；不合併或刪除重複樣式，除非有視覺回歸證據。 |
| 45 | `src/styles/style_045.htmlpart` | 4,363 B | 多人 UI 樣式；線索：v82-49-vn-catalogue-style | 已物理切片且保留原 cascade 順序；尚未完成語意分群／重複規則驗證 | P2 | 先建立 selector→頁面／元件映射與 cascade 影響測試；不合併或刪除重複樣式，除非有視覺回歸證據。 |
| 46 | `src/styles/style_046.htmlpart` | 2,350 B | 答題頁／播放器樣式與後續覆寫；線索：v82-53-quiz-compact-cleanup | 已物理切片且保留原 cascade 順序；尚未完成語意分群／重複規則驗證 | P2 | 先建立 selector→頁面／元件映射與 cascade 影響測試；不合併或刪除重複樣式，除非有視覺回歸證據。 |
| 47 | `src/styles/style_047.htmlpart` | 4,452 B | 答題頁／播放器樣式與後續覆寫；線索：v82-54-emq-list-tools-style | 已物理切片且保留原 cascade 順序；尚未完成語意分群／重複規則驗證 | P2 | 先建立 selector→頁面／元件映射與 cascade 影響測試；不合併或刪除重複樣式，除非有視覺回歸證據。 |
| 48 | `src/styles/style_048.htmlpart` | 3,252 B | 多人 UI 樣式；線索：v82-57-stability-ui-overrides | 已物理切片且保留原 cascade 順序；尚未完成語意分群／重複規則驗證 | P2 | 先建立 selector→頁面／元件映射與 cascade 影響測試；不合併或刪除重複樣式，除非有視覺回歸證據。 |
| 49 | `src/styles/style_049.htmlpart` | 2,534 B | 多人 UI 樣式；線索：v82-58-multiplayer-consensus-layout | 已物理切片且保留原 cascade 順序；尚未完成語意分群／重複規則驗證 | P2 | 先建立 selector→頁面／元件映射與 cascade 影響測試；不合併或刪除重複樣式，除非有視覺回歸證據。 |
| 50 | `src/styles/style_050.htmlpart` | 1,831 B | 多人 UI 樣式；線索：v82-61-multiplayer-answer-layout-fix | 已物理切片且保留原 cascade 順序；尚未完成語意分群／重複規則驗證 | P2 | 先建立 selector→頁面／元件映射與 cascade 影響測試；不合併或刪除重複樣式，除非有視覺回歸證據。 |

## 6. 建議工作順序（依風險與依賴，不依檔案編號）

### P0：先補齊依賴證據，再動核心

- [x] **核心主程式（script_004）首輪 AST**：已建立函式定義與直接 identifier-call 線索；70 個命名函式／函式值定義、12 個唯一跨片段呼叫命中及 9 個模糊同名候選。
- [ ] **核心主程式（script_004）完整依賴追蹤**：仍須補 property-call、window API、DOM 寫入、全域讀寫、listener/timer ownership 與 lexical resolution；再將初始化／設定／題庫／播放／結算分責任群，不立即搬動程式。
- [x] **大型目錄 payload（script_001）資料邊界確認**：DB initializer 為 4,975,240 bytes，包含 anime 9,516 rows、songs 38,821 rows。整個 script_001 仍包含約 103 KB runtime code，不能把整檔當純資料。
- [x] **大型目錄 payload（script_001）獨立抽取**：`DB` initializer 已原位元組移至 `src/modules/anime_song_database.htmlpart`；契約測試檢查 9,516 anime rows、38,821 song rows、row shapes、消費者順序及重建後原始 `script_001` SHA-256；完整單檔建置仍須由全套 runner 驗證。
- [ ] **重複定義與後續覆寫層**：逐一確認 31 組重複名稱是否為相容性覆寫，不能用名稱重複直接刪除。
- [ ] **契約先行**：每次移動一個責任區塊前，為原行為建立精準測試；保留原始執行順序與全域 API 相容性。

### P1：先處理資料與持久化／狀態邊界

- [ ] **學習紀錄、熟悉度、SRS（script_020、script_023）**：明確區分 domain policy、repository 與 UI adapter；先驗證跨頁／重載資料持續性。
- [ ] **自訂歌單與練習中心（script_025）**：定義歌單 schema、scope fail-closed 規則、AMQ/EMQ 身分隔離契約。
- [ ] **多人（script_028）**：拆分 session state、transport、room protocol、UI；需真實 server 與雙瀏覽器重連驗收後才可標為完成。
- [ ] **場景背景／IndexedDB（script_036）**：建立成功、升級、配額失敗、資料回滾及 Blob round-trip 測試。
- [ ] **EMQ 音訊／歌單／批次（script_038、script_040）**：分開 source identity、audio eligibility、list scope、batch orchestration。
- [ ] **歷史／黑名單（script_015）**：釐清儲存 API、候選池過濾與 UI 的責任邊界。

### P2：整理使用者介面與樣式

- [ ] **答題／播放器／音訊生命週期（script_005–018、script_021、script_029、script_032）**：建立明確的 player controller、quiz lifecycle、answer submission 與 UI view 邊界；每次只搬一個責任。
- [ ] **首頁／導航／個人檔案／watchlist（script_002、script_019、script_026、script_033–035、script_039）**：建立 view ownership 與初始化／銷毀流程，確認沒有重複 listener。
- [ ] **標題／ID 對照資料（script_030、script_031、script_041）**：分清靜態映射資料與標題正規化規則，保留現有搜尋與 fallback 行為。
- [ ] **CSS 50 片段**：先建立 selector→元件／頁面映射、重複 selector 分析、深色主題及窄螢幕視覺基準；不要先合併或刪除規則。
- [ ] **舊版 UI patch（script_005–014、script_017–018、script_021–022、script_024、script_029、script_032–035）**：以行為證據確認哪些仍生效、哪些是必要覆寫，不能僅依版本註解推斷可移除。

## 7. 每個模組完成的定義

只有全部符合下列條件，才可以標記「模組化完成」：

- [ ] 責任單一且命名清楚；模組輸入／輸出契約已文件化。
- [ ] 不依賴未記錄的隱含全域／DOM／storage 狀態，或明確列出相容性 adapter。
- [ ] 呼叫者、被呼叫者、事件／timer 生命週期及資料讀寫點已追蹤。
- [ ] 具備針對真實 production source 的單元／契約測試，含錯誤與回滾情境。
- [ ] 與相鄰模組的整合測試及相關 UI 回歸測試通過。
- [ ] 兩次獨立建置一致；若目標是純重構，產物仍與鎖定基準逐位元組一致。
- [ ] 無個人資料 schema、storage key、AMQ/EMQ 身分、題目選擇順序或播放時序的未核准變更。
- [ ] 文件、清單、測試報告、雜湊與回滾方式更新。

## 8. 測試／證據限制

- 已新增 TypeScript parser-backed AST 首輪盤點（`tools/ast_dependency_inventory.cjs`、`reports/AST_DEPENDENCY_MAP.md` 與配套 CSV）。它解析 39 個可執行 JS 片段且無語法診斷，將 2 個非 JS 資料區塊排除；但這仍不是完整 lexical resolver／runtime call graph。
- `window` 匯出、DOM ID 讀取、函式定義重複、listener／timer 與 storage 字串清單只是定位線索。
- 已有的 157 個契約斷言與 103 項建置／完整性檢查，不等於每個功能模組都已獨立或端到端驗收。
- 真實 file-origin／browser-origin localStorage reload、IndexedDB、實際音訊／外部網路、Firefox、多人雙客戶端仍有未完成驗收。
- GitHub 目前為部分發布；完整 91 個片段、所有測試來源與二進位工程包尚未完整發布／驗證。

## 9. AST 盤點與答案建議模組追加證據（V82.69）

- `reports/AST_DEPENDENCY_MAP.md`：parser-backed 摘要、`script_001`／`script_004` 發現、跨片段呼叫線索與限制。
- `reports/AST_DEPENDENCY_SUMMARY.csv`：41 個 script/data 片段的解析狀態、位元組數、函式數與大型資料初始化大小。
- `reports/AST_FUNCTION_DEFINITIONS.csv`：跨作用域函式／函式值定義與原始位置。
- `reports/AST_DIRECT_CALL_EDGES.csv`：直接 identifier-call edges 與保守的跨片段候選分類。
- `reports/AST_DECLARED_SYMBOL_REFERENCES.csv`、`reports/AST_API_TOUCHPOINTS.csv`、`reports/AST_PARSE_DIAGNOSTICS.csv`：符號參照與 API touchpoint 線索。
- `tools/ast_dependency_inventory.cjs`：重現上述 CSV/報告的解析工具；已納入 `tools/run_all_checks.py`。
- `src/modules/quiz_suggestion_text.js`：由 script_004 原位置抽出的純文字正規化／來源 offset／highlight helper，已由 16 項 production-source contract assertions 驗證，且兩次建置仍與 V82.65 byte-identical。

## 10. 檔案用途

- `reports/MODULARIZATION_PROGRESS_CHECKLIST.md`：本進度清單。
- `reports/MODULARIZATION_PROGRESS_CHECKLIST.csv`：可排序、可篩選的 97 項逐檔清單（41 scripts + 50 styles + 6 modules）。
- `reports/FRAGMENT_MAP.csv`：原始片段順序、位元組範圍與 SHA-256。
- `reports/FUNCTION_DEFINITION_INVENTORY.csv`、`reports/WINDOW_EXPORT_INVENTORY.csv`、`reports/DOM_ID_REFERENCE_INVENTORY.csv`、`reports/LIFECYCLE_STORAGE_INVENTORY.csv`：進一步依賴追蹤的線索。


## V82.70 release note
- V82.65 stays immutable. V82.70 changes only the final `aria-expanded` synchronization in the legacy suggestion click handler and has a separate output fingerprint.
- Build reproducibility is enforced against the manifest `release` fingerprint; the verifier separately hashes the immutable baseline file.


## V82.75 quiz suggestion renderer extraction

- 將 `renderQuizSuggestionLabelV824()` 與 `buildSuggestions()` 從 `src/scripts/script_004.htmlpart` 原位抽取至 `src/modules/quiz_suggestion_renderer.js`。
- 不改動函式內容、作用域、執行位置、排序方式、top-25 上限、DOM 事件或 aria 更新；仍以同一個 classic script 注入，不新增 runtime script tag。
- `tests/unit/quiz_suggestion_renderer_extraction_contract.test.cjs` 驗證原始 script_004 可逐位元組重建，並檢查 renderer 關鍵行為線索。完整 runner 與瀏覽器整合需在此 checkpoint 驗證後才能標記通過。


## V82.75 quiz suggestion controller extraction

- 將 `answerField()`、中文建議開關狀態、`targetOptions()`、`optionCache`、`closeQuizSuggestions()` 與 `selectQuizSuggestionV8272()` 等連續原始區塊抽取至 `src/modules/quiz_suggestion_controller.js`。
- 保留原位置、classic-script lexical scope、初始化與事件註冊順序；不更動 AMQ/EMQ 目錄選擇、IME guard、input 事件、focus/caret 或 aria 行為。
- `tests/unit/quiz_suggestion_controller_extraction_contract.test.cjs` 檢查抽取前 script_004 指紋與 selection contract 線索。


## V82.76 script_004 dependency boundary audit

- 新增 `tools/script004_boundary_audit.cjs`，使用 TypeScript parser 對 `script_004.htmlpart` 建立靜態邊界盤點，不修改任何執行碼。
- 產生 `reports/CORE_SCRIPT_004_BOUNDARY_AUDIT.md`、`CORE_SCRIPT_004_SHARED_STATE.csv`、`CORE_SCRIPT_004_API_TOUCHPOINTS.csv`，列出共享閉包狀態、DOM/browser API 呼叫、window exports、事件監聽與 timer/animation 呼叫線索。
- 本次輸入片段為 98,849 bytes，SHA-256 `23dacccdc25538416c4ddba91f4e044df7c4491924d1099d8cdf0a60fb4f4bdc`，TypeScript parser 語法診斷為 0。
- 最高耦合狀態包括 `quizSong`、`quizSettings`、`quizFinished`、`quizActive`、`quizAudioStarted` 與 `quizStartedAt`。這些是靜態參照計數，不是完整 lexical/data-flow 分析。
- 新增 `tests/unit/script004_boundary_audit_contract.test.cjs` 並納入完整 runner。後續應先為 `getQuizPool()` 建立 production-source characterization contract，再評估候選池組裝與 UI 設定讀取的責任邊界。
- 本次沒有修改 `script_004`、任何模組或產品行為；V82.72 建置輸出維持 byte-identical。


## V82.79 盤點補充

- 目前 8 個來源模組，仍有大量業務函式留在歷史 script 片段；請以 `reports/MODULARIZATION_REMAINING_WORK_AUDIT_V82_79.md` 為最新量化盤點。
- 模組數不代表完成百分比；需以依賴隔離、測試覆蓋、瀏覽器驗收與遠端可重建性判定。


## V82.80 模組化邊界審核與候選池純計算分離

- 正式產品輸出升至 `V82.80_GET_QUIZ_POOL_PURE_CALCULATION_01`；V82.72 檔案保留，不覆寫。V82.65 基準保持不可變。
- `get_quiz_pool.htmlpart` 現在包含 `calculateQuizPoolCandidatesV8280(ctx)` 純候選計算，以及 `getQuizPool()` 薄 DOM 診斷 adapter。對 V82.79 原始函式執行 20 組差異情境、40 項候選 ID／診斷斷言，全部通過。
- 新增儲存存取、歷史／SRS、AMQ／EMQ 來源邊界與 CSS selector 分群清單。盤點結果：41 個 script/data 片段中 23 個有直接 storage API 字串引用；23 個片段有 AMQ／EMQ 邊界引用；14 個歷史／SRS 候選片段；2,355 筆 selector 記錄覆蓋全部 50 個 CSS 片段。
- CSS selector 分群是供人工審查的啟發式結果，986 筆目前未能映射到明確元件。沒有移動、合併或刪除任何 CSS 規則。
- GitHub 完整工程同步仍未完成；遠端分支仍是 overlay，缺少完整 source tree／Manifest／測試建置樹。不能宣稱已完成遠端可重建驗收。
- 真實來源 localStorage／IndexedDB、音訊／網路、Firefox、多用戶端驗收仍未執行或受環境限制。
- 詳細盤點：`reports/V82_80_MODULARIZATION_BOUNDARY_AUDIT.md`、`reports/MODULARIZATION_REMAINING_WORK_AUDIT_V82_80.md`。
