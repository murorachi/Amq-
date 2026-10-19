# Source block audit matrix — V82.85.28 baseline

- Audit branch: `v82.85.29-source-audit-matrix-01`
- Source baseline: `v82.85.28-next-audio-state-reset-dedup-01`
- Manifest source: `reports/FRAGMENT_MANIFEST.json`
- Registered fragments: 91 (50 style, 41 script); extracted modules: 15.
- Immutable product baseline: V82.82, 8,787,490 bytes, SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`.

## How to interpret this matrix

This is a **per-fragment audit ledger**, not a claim that every fragment has already been deeply reviewed. Prior work records bounded changes and known risks, not complete file-by-file sign-offs. Therefore, no fragment is marked fully audited merely because it appeared in a prior patch or passed a generic source verifier.

- `待逐檔排查`: no evidence of a complete, current, file-specific review.
- `已識別高風險，未完成整檔審查`: known concern is documented, but the fragment is not signed off.
- `局部審查，未完成整檔審查`: specific helpers were reviewed/changed, but the whole fragment remains open.
- P1: first review because of known lifecycle coupling, large size, or high cascade/maintenance risk. P2: normal source review. P3: smaller style fragment, still included in the ledger.

Fingerprint values and byte sizes are copied from the baseline manifest. This ledger does not itself re-compute the contents; CI's source verifier checks registered fragment fingerprints. Full audit completion requires a per-file finding, dependency/side-effect notes, relevant test mapping, and a disposition (no change, focused fix, or deferred risk).

## Counts

| Category | Count |
|---|---:|
| Registered fragments | 91 |
| Styles | 50 |
| Scripts | 41 |
| First-pass file audits completed | 91 |
| Partially reviewed / known risk, not full sign-off | 0 |
| Awaiting file-specific review | 0 |

These counts deliberately measure **full file-specific audit evidence**, not whether a fragment was ever touched. Previously reviewed helper contracts remain useful and are not repeated unless evidence suggests they are unreliable.

## CI checkpoint

Run [39230015840](https://github.com/murorachi/Amq-/actions/runs/39230015840): source/unit job passed; Firefox responsive passed; Chromium native-origin job failed only at `Run real browser audio decode and output acceptance`. Treat this as the known CI audio-output capture mismatch, not proof that actual product playback is broken. Manual interactive acceptance was not performed.

## Fragment-by-fragment ledger

| Kind / index | Fragment | Bytes | Manifest SHA-256 | Priority | Audit state | Initial focus / existing evidence |
|---|---|---:|---|---|---|---|
| CSS 001 | `src/styles/style_001.htmlpart` | 27128 | `281256a268fba93b…` | P1 | 首輪靜態 CSS 盤點完成；視覺等價未驗收 | 已統計 selector、media query 與 !important；重複文字不視為可安全合併。詳見 `reports/AUDIT_STYLES_001_020_STATIC_CASCADE_V82_85_29.md`。 |
| CSS 002 | `src/styles/style_002.htmlpart` | 182 | `e635065fa0c02640…` | P3 | 首輪靜態 CSS 盤點完成；視覺等價未驗收 | 已統計 selector、media query 與 !important；重複文字不視為可安全合併。詳見 `reports/AUDIT_STYLES_001_020_STATIC_CASCADE_V82_85_29.md`。 |
| CSS 003 | `src/styles/style_003.htmlpart` | 3706 | `ae112d85ea02b0d8…` | P2 | 首輪靜態 CSS 盤點完成；視覺等價未驗收 | 已統計 selector、media query 與 !important；重複文字不視為可安全合併。詳見 `reports/AUDIT_STYLES_001_020_STATIC_CASCADE_V82_85_29.md`。 |
| CSS 004 | `src/styles/style_004.htmlpart` | 2020 | `eb4c237cb464534c…` | P3 | 首輪靜態 CSS 盤點完成；視覺等價未驗收 | 已統計 selector、media query 與 !important；重複文字不視為可安全合併。詳見 `reports/AUDIT_STYLES_001_020_STATIC_CASCADE_V82_85_29.md`。 |
| CSS 005 | `src/styles/style_005.htmlpart` | 482 | `8f0301cd7d168f07…` | P3 | 首輪靜態 CSS 盤點完成；視覺等價未驗收 | 已統計 selector、media query 與 !important；重複文字不視為可安全合併。詳見 `reports/AUDIT_STYLES_001_020_STATIC_CASCADE_V82_85_29.md`。 |
| JS 001 | `src/scripts/script_001.htmlpart` | 102981 | `07e91622000ebfe9…` | P1 | 首輪逐檔審查完成；風險保留 | 目錄索引、熟悉度／收藏／黑名單、三層答題歷史、IndexedDB 快照、媒體 fallback 共存。已對照歷史隔離、儲存、重載與備份還原契約；未改產品程式。詳見 `reports/AUDIT_SCRIPT_001_CATALOG_HISTORY_PLAYBACK_V82_85_29.md`。 |
| JS 002 | `src/scripts/script_002.htmlpart` | 6038 | `4904e6862b21cd82…` | P2 | 首輪逐檔審查完成；風險保留 | 導覽／watchlist 顯示控制；保留離開猜歌時的 cleanup 呼叫順序。詳見 `reports/AUDIT_SCRIPTS_002_010_NAVIGATION_COVER_QUIZ_PATCHES_V82_85_29.md`。 |
| JS 003 | `src/scripts/script_003.htmlpart` | 8126 | `ce363810ef726c8b…` | P2 | 首輪逐檔審查完成；風險保留 | ANN 封面批次抓取與 XML 解析；需保留失敗診斷與非阻塞載入。詳見 `reports/AUDIT_SCRIPTS_002_010_NAVIGATION_COVER_QUIZ_PATCHES_V82_85_29.md`。 |
| JS 004 | `src/scripts/script_004.htmlpart` | 93004 | `f9dfcd2322a99bb1…` | P1 | 首輪逐檔審查完成；風險保留 | 35 個命名函式；答題／音訊／計時器／設定遷移／建議 UI 多職責耦合。既有 answer-flow、lifecycle 與瀏覽器測試已對照；未改產品程式。詳見 `reports/AUDIT_SCRIPT_004_QUIZ_LIFECYCLE_V82_85_29.md`。 |
| CSS 006 | `src/styles/style_006.htmlpart` | 4051 | `4ec3b240b5f86c52…` | P2 | 首輪靜態 CSS 盤點完成；視覺等價未驗收 | 已統計 selector、media query 與 !important；重複文字不視為可安全合併。詳見 `reports/AUDIT_STYLES_001_020_STATIC_CASCADE_V82_85_29.md`。 |
| CSS 007 | `src/styles/style_007.htmlpart` | 8867 | `c61171df09a2acc0…` | P2 | 首輪靜態 CSS 盤點完成；視覺等價未驗收 | 已統計 selector、media query 與 !important；重複文字不視為可安全合併。詳見 `reports/AUDIT_STYLES_001_020_STATIC_CASCADE_V82_85_29.md`。 |
| CSS 008 | `src/styles/style_008.htmlpart` | 991 | `25b0813a768a24f8…` | P3 | 首輪靜態 CSS 盤點完成；視覺等價未驗收 | 已統計 selector、media query 與 !important；重複文字不視為可安全合併。詳見 `reports/AUDIT_STYLES_001_020_STATIC_CASCADE_V82_85_29.md`。 |
| JS 005 | `src/scripts/script_005.htmlpart` | 1139 | `68f1ba7d7db6e010…` | P2 | 首輪逐檔審查完成；風險保留 | 音訊 Dock 顯示／熟悉度按鈕，依賴 script_001 全域狀態 API；未改程式。詳見 `reports/AUDIT_SCRIPTS_002_010_NAVIGATION_COVER_QUIZ_PATCHES_V82_85_29.md`。 |
| CSS 009 | `src/styles/style_009.htmlpart` | 326 | `f23f912148e78194…` | P3 | 首輪靜態 CSS 盤點完成；視覺等價未驗收 | 已統計 selector、media query 與 !important；重複文字不視為可安全合併。詳見 `reports/AUDIT_STYLES_001_020_STATIC_CASCADE_V82_85_29.md`。 |
| JS 006 | `src/scripts/script_006.htmlpart` | 1628 | `fe81b21d1a0a3f3b…` | P2 | 首輪逐檔審查完成；風險保留 | 猜歌模式音訊控制與計時標籤修正；需保留 seek 與計時器的既有所有權。詳見 `reports/AUDIT_SCRIPTS_002_010_NAVIGATION_COVER_QUIZ_PATCHES_V82_85_29.md`。 |
| CSS 010 | `src/styles/style_010.htmlpart` | 895 | `cea29a86147270b8…` | P3 | 首輪靜態 CSS 盤點完成；視覺等價未驗收 | 已統計 selector、media query 與 !important；重複文字不視為可安全合併。詳見 `reports/AUDIT_STYLES_001_020_STATIC_CASCADE_V82_85_29.md`。 |
| JS 007 | `src/scripts/script_007.htmlpart` | 4491 | `69f15478b96e81a2…` | P2 | 首輪逐檔審查完成；風險保留 | VNDB 角色頭像與外部請求；需留意失敗與過期回應，缺少專屬 exact-source 契約。詳見 `reports/AUDIT_SCRIPTS_002_010_NAVIGATION_COVER_QUIZ_PATCHES_V82_85_29.md`。 |
| CSS 011 | `src/styles/style_011.htmlpart` | 2976 | `7c629f4f0d10353e…` | P3 | 首輪靜態 CSS 盤點完成；視覺等價未驗收 | 已統計 selector、media query 與 !important；重複文字不視為可安全合併。詳見 `reports/AUDIT_STYLES_001_020_STATIC_CASCADE_V82_85_29.md`。 |
| JS 008 | `src/scripts/script_008.htmlpart` | 5458 | `bcd739f91064842d…` | P2 | 首輪逐檔審查完成；風險保留 | 答案鏡像及 AMQ／EMQ／中文別名匹配，屬答題正確性邊界。詳見 `reports/AUDIT_SCRIPTS_002_010_NAVIGATION_COVER_QUIZ_PATCHES_V82_85_29.md`。 |
| CSS 012 | `src/styles/style_012.htmlpart` | 525 | `490807a7172d6c15…` | P3 | 首輪靜態 CSS 盤點完成；視覺等價未驗收 | 已統計 selector、media query 與 !important；重複文字不視為可安全合併。詳見 `reports/AUDIT_STYLES_001_020_STATIC_CASCADE_V82_85_29.md`。 |
| JS 009 | `src/scripts/script_009.htmlpart` | 2000 | `afa906fffd624fb5…` | P2 | 首輪逐檔審查完成；風險保留 | 頭像與倒數／播放標籤 DOM 排版調整；需瀏覽器視覺回歸。詳見 `reports/AUDIT_SCRIPTS_002_010_NAVIGATION_COVER_QUIZ_PATCHES_V82_85_29.md`。 |
| CSS 013 | `src/styles/style_013.htmlpart` | 343 | `86521017b5d64e81…` | P3 | 首輪靜態 CSS 盤點完成；視覺等價未驗收 | 已統計 selector、media query 與 !important；重複文字不視為可安全合併。詳見 `reports/AUDIT_STYLES_001_020_STATIC_CASCADE_V82_85_29.md`。 |
| CSS 014 | `src/styles/style_014.htmlpart` | 1241 | `dfb9d183b07ceaf1…` | P3 | 首輪靜態 CSS 盤點完成；視覺等價未驗收 | 已統計 selector、media query 與 !important；重複文字不視為可安全合併。詳見 `reports/AUDIT_STYLES_001_020_STATIC_CASCADE_V82_85_29.md`。 |
| JS 010 | `src/scripts/script_010.htmlpart` | 1985 | `7f7290f9d4081d07…` | P2 | 首輪逐檔審查完成；風險保留 | 停用舊 submitSkipPhase 設定遷移與頭像對齊同處一檔；保留音訊連續播放規則。詳見 `reports/AUDIT_SCRIPTS_002_010_NAVIGATION_COVER_QUIZ_PATCHES_V82_85_29.md`. |
| JS 011 | `src/scripts/script_011.htmlpart` | 311 | `b0da897f5476ad0b…` | P2 | 首輪逐檔審查完成；風險保留 | 已檢查為猜歌 UI／事件／音訊整合補丁；不依表面相似就刪除或合併。詳見 `reports/AUDIT_SCRIPTS_011_019_021_024_QUIZ_UI_PATCHES_V82_85_29.md`。 |
| CSS 015 | `src/styles/style_015.htmlpart` | 464 | `48c8914d6b230c45…` | P3 | 首輪靜態 CSS 盤點完成；視覺等價未驗收 | 已統計 selector、media query 與 !important；重複文字不視為可安全合併。詳見 `reports/AUDIT_STYLES_001_020_STATIC_CASCADE_V82_85_29.md`。 |
| JS 012 | `src/scripts/script_012.htmlpart` | 7942 | `1ef550097de54373…` | P2 | 首輪逐檔審查完成；風險保留 | 已檢查為猜歌 UI／事件／音訊整合補丁；不依表面相似就刪除或合併。詳見 `reports/AUDIT_SCRIPTS_011_019_021_024_QUIZ_UI_PATCHES_V82_85_29.md`。 |
| JS 013 | `src/scripts/script_013.htmlpart` | 733 | `f67a8ef39d3a5516…` | P2 | 首輪逐檔審查完成；風險保留 | 已檢查為猜歌 UI／事件／音訊整合補丁；不依表面相似就刪除或合併。詳見 `reports/AUDIT_SCRIPTS_011_019_021_024_QUIZ_UI_PATCHES_V82_85_29.md`。 |
| CSS 016 | `src/styles/style_016.htmlpart` | 974 | `7ef060e224a3e7f4…` | P3 | 首輪靜態 CSS 盤點完成；視覺等價未驗收 | 已統計 selector、media query 與 !important；重複文字不視為可安全合併。詳見 `reports/AUDIT_STYLES_001_020_STATIC_CASCADE_V82_85_29.md`。 |
| JS 014 | `src/scripts/script_014.htmlpart` | 2740 | `fbe6f01ab40ba443…` | P2 | 首輪逐檔審查完成；風險保留 | 已檢查為猜歌 UI／事件／音訊整合補丁；不依表面相似就刪除或合併。詳見 `reports/AUDIT_SCRIPTS_011_019_021_024_QUIZ_UI_PATCHES_V82_85_29.md`。 |
| CSS 017 | `src/styles/style_017.htmlpart` | 3639 | `46b2a15eb6178ef7…` | P2 | 首輪靜態 CSS 盤點完成；視覺等價未驗收 | 已統計 selector、media query 與 !important；重複文字不視為可安全合併。詳見 `reports/AUDIT_STYLES_001_020_STATIC_CASCADE_V82_85_29.md`。 |
| JS 015 | `src/scripts/script_015.htmlpart` | 6872 | `89340718cae57d83…` | P2 | 首輪逐檔審查完成；風險保留 | 已檢查為猜歌 UI／事件／音訊整合補丁；不依表面相似就刪除或合併。詳見 `reports/AUDIT_SCRIPTS_011_019_021_024_QUIZ_UI_PATCHES_V82_85_29.md`。 |
| JS 016 | `src/scripts/script_016.htmlpart` | 10541 | `695634223ced2889…` | P2 | 首輪逐檔審查完成；風險保留 | 已檢查為猜歌 UI／事件／音訊整合補丁；不依表面相似就刪除或合併。詳見 `reports/AUDIT_SCRIPTS_011_019_021_024_QUIZ_UI_PATCHES_V82_85_29.md`。 |
| CSS 018 | `src/styles/style_018.htmlpart` | 1297 | `e5960a58096959c4…` | P3 | 首輪靜態 CSS 盤點完成；視覺等價未驗收 | 已統計 selector、media query 與 !important；重複文字不視為可安全合併。詳見 `reports/AUDIT_STYLES_001_020_STATIC_CASCADE_V82_85_29.md`。 |
| CSS 019 | `src/styles/style_019.htmlpart` | 1193 | `9854486c457a37ee…` | P3 | 首輪靜態 CSS 盤點完成；視覺等價未驗收 | 已統計 selector、media query 與 !important；重複文字不視為可安全合併。詳見 `reports/AUDIT_STYLES_001_020_STATIC_CASCADE_V82_85_29.md`。 |
| CSS 020 | `src/styles/style_020.htmlpart` | 364 | `87a33f88876ed180…` | P3 | 首輪靜態 CSS 盤點完成；視覺等價未驗收 | 已統計 selector、media query 與 !important；重複文字不視為可安全合併。詳見 `reports/AUDIT_STYLES_001_020_STATIC_CASCADE_V82_85_29.md`。 |
| JS 017 | `src/scripts/script_017.htmlpart` | 945 | `9ca0cbb241b25a10…` | P2 | 首輪逐檔審查完成；風險保留 | 已檢查為猜歌 UI／事件／音訊整合補丁；不依表面相似就刪除或合併。詳見 `reports/AUDIT_SCRIPTS_011_019_021_024_QUIZ_UI_PATCHES_V82_85_29.md`。 |
| CSS 021 | `src/styles/style_021.htmlpart` | 1267 | `e3fabe1bc2c8d679…` | P3 | 首輪靜態 CSS 盤點完成；視覺等價未驗收 | 已盤點 selector、media query、!important 與狀態覆寫；不因重複文字直接合併。詳見 `reports/AUDIT_STYLES_021_040_STATIC_CASCADE_V82_85_29.md`。 |
| JS 018 | `src/scripts/script_018.htmlpart` | 1459 | `89d6c0bbcf2ee823…` | P2 | 首輪逐檔審查完成；風險保留 | 已檢查為猜歌 UI／事件／音訊整合補丁；不依表面相似就刪除或合併。詳見 `reports/AUDIT_SCRIPTS_011_019_021_024_QUIZ_UI_PATCHES_V82_85_29.md`。 |
| JS 019 | `src/scripts/script_019.htmlpart` | 1665 | `502dd544413bcc14…` | P2 | 首輪逐檔審查完成；風險保留 | 已檢查為猜歌 UI／事件／音訊整合補丁；不依表面相似就刪除或合併。詳見 `reports/AUDIT_SCRIPTS_011_019_021_024_QUIZ_UI_PATCHES_V82_85_29.md`。 |
| CSS 022 | `src/styles/style_022.htmlpart` | 3209 | `c7ee3fecd57738a1…` | P2 | 首輪靜態 CSS 盤點完成；視覺等價未驗收 | 已盤點 selector、media query、!important 與狀態覆寫；不因重複文字直接合併。詳見 `reports/AUDIT_STYLES_021_040_STATIC_CASCADE_V82_85_29.md`。 |
| JS 020 | `src/scripts/script_020.htmlpart` | 39032 | `4cf04ec3e4668cfa…` | P1 | 首輪逐檔審查完成；關鍵風險保留 | SRS／FSRS 狀態轉移、排程公式、無效資料隔離與恢復；缺少公式／轉移專屬契約。詳見 `reports/AUDIT_SCRIPT_020_SRS_ENGINE_V82_85_29.md`。 |
| CSS 023 | `src/styles/style_023.htmlpart` | 1733 | `7758a7d56eeb26c2…` | P3 | 首輪靜態 CSS 盤點完成；視覺等價未驗收 | 已盤點 selector、media query、!important 與狀態覆寫；不因重複文字直接合併。詳見 `reports/AUDIT_STYLES_021_040_STATIC_CASCADE_V82_85_29.md`。 |
| CSS 024 | `src/styles/style_024.htmlpart` | 527 | `1e62b4a55a30d225…` | P3 | 首輪靜態 CSS 盤點完成；視覺等價未驗收 | 已盤點 selector、media query、!important 與狀態覆寫；不因重複文字直接合併。詳見 `reports/AUDIT_STYLES_021_040_STATIC_CASCADE_V82_85_29.md`。 |
| CSS 025 | `src/styles/style_025.htmlpart` | 1866 | `76ca4ec6dc09ac5d…` | P3 | 首輪靜態 CSS 盤點完成；視覺等價未驗收 | 已盤點 selector、media query、!important 與狀態覆寫；不因重複文字直接合併。詳見 `reports/AUDIT_STYLES_021_040_STATIC_CASCADE_V82_85_29.md`。 |
| JS 021 | `src/scripts/script_021.htmlpart` | 757 | `decf8081a2cbb3df…` | P2 | 首輪逐檔審查完成；風險保留 | 已檢查為猜歌 UI／事件／音訊整合補丁；不依表面相似就刪除或合併。詳見 `reports/AUDIT_SCRIPTS_011_019_021_024_QUIZ_UI_PATCHES_V82_85_29.md`。 |
| CSS 026 | `src/styles/style_026.htmlpart` | 424 | `b54d9295296f46b1…` | P3 | 首輪靜態 CSS 盤點完成；視覺等價未驗收 | 已盤點 selector、media query、!important 與狀態覆寫；不因重複文字直接合併。詳見 `reports/AUDIT_STYLES_021_040_STATIC_CASCADE_V82_85_29.md`。 |
| CSS 027 | `src/styles/style_027.htmlpart` | 258 | `fe83f9f1e1d1311a…` | P3 | 首輪靜態 CSS 盤點完成；視覺等價未驗收 | 已盤點 selector、media query、!important 與狀態覆寫；不因重複文字直接合併。詳見 `reports/AUDIT_STYLES_021_040_STATIC_CASCADE_V82_85_29.md`。 |
| CSS 028 | `src/styles/style_028.htmlpart` | 1496 | `6a5b78ead3940de0…` | P3 | 首輪靜態 CSS 盤點完成；視覺等價未驗收 | 已盤點 selector、media query、!important 與狀態覆寫；不因重複文字直接合併。詳見 `reports/AUDIT_STYLES_021_040_STATIC_CASCADE_V82_85_29.md`。 |
| CSS 029 | `src/styles/style_029.htmlpart` | 860 | `de9910b06deff293…` | P3 | 首輪靜態 CSS 盤點完成；視覺等價未驗收 | 已盤點 selector、media query、!important 與狀態覆寫；不因重複文字直接合併。詳見 `reports/AUDIT_STYLES_021_040_STATIC_CASCADE_V82_85_29.md`。 |
| JS 022 | `src/scripts/script_022.htmlpart` | 1367 | `d540d0d19b316641…` | P2 | 首輪逐檔審查完成；風險保留 | 已檢查為猜歌 UI／事件／音訊整合補丁；不依表面相似就刪除或合併。詳見 `reports/AUDIT_SCRIPTS_011_019_021_024_QUIZ_UI_PATCHES_V82_85_29.md`。 |
| CSS 030 | `src/styles/style_030.htmlpart` | 2317 | `8a9312389b1daeaa…` | P3 | 首輪靜態 CSS 盤點完成；視覺等價未驗收 | 已盤點 selector、media query、!important 與狀態覆寫；不因重複文字直接合併。詳見 `reports/AUDIT_STYLES_021_040_STATIC_CASCADE_V82_85_29.md`。 |
| JS 023 | `src/scripts/script_023.htmlpart` | 44496 | `b75a3e7a33ba2958…` | P1 | 首輪逐檔審查完成；風險保留 | 全備份／還原、舊版合併及學習洞察共存；回滾順序與匯出前摘要 flush 是關鍵邊界。已對照備份驗證與 round-trip 契約。詳見 `reports/AUDIT_SCRIPT_023_BACKUP_RESTORE_LEARNING_INSIGHTS_V82_85_29.md`。 |
| JS 024 | `src/scripts/script_024.htmlpart` | 3889 | `1a2d70d23d102ee8…` | P2 | 首輪逐檔審查完成；風險保留 | 已檢查為猜歌 UI／事件／音訊整合補丁；不依表面相似就刪除或合併。詳見 `reports/AUDIT_SCRIPTS_011_019_021_024_QUIZ_UI_PATCHES_V82_85_29.md`。 |
| JS 025 | `src/scripts/script_025.htmlpart` | 53270 | `9a875f3718004d35…` | P1 | 首輪逐檔審查完成；風險保留 | 自訂清單 CRUD、作品 ID 到歌曲 ID 範圍轉換、批次操作與 SRS 練習交接共存；已對照清單驗證、重載與 EMQ handoff 契約。詳見 `reports/AUDIT_SCRIPT_025_CUSTOM_LISTS_PRACTICE_HUB_V82_85_29.md`。 |
| JS 026 | `src/scripts/script_026.htmlpart` | 33347 | `9cd1bb16da042aa4…` | P1 | 首輪逐檔審查完成；風險保留 | 個人檔案、PP 計算、歷史摘要、模態焦點及手機答題恢復共存；缺少專屬 PP 公式契約。詳見 `reports/AUDIT_SCRIPT_026_PROFILE_PP_MOBILE_V82_85_29.md`。 |
| CSS 031 | `src/styles/style_031.htmlpart` | 75164 | `1b4e4cdc0ad23681…` | P1 | 首輪靜態 CSS 盤點完成；視覺等價未驗收 | 已盤點 selector、media query、!important 與狀態覆寫；不因重複文字直接合併。詳見 `reports/AUDIT_STYLES_021_040_STATIC_CASCADE_V82_85_29.md`。 |
| JS 027 | `src/scripts/script_027.htmlpart` | 44 | `4ba9c72cbba7d24d…` | P2 | 首輪逐檔審查完成；風險保留 | 介面／媒體整合補丁或模組標記；需保留 DOM 順序、fallback、idempotence 與 cleanup。詳見 `reports/AUDIT_SCRIPTS_027_029_032_035_UI_MEDIA_PATCHES_V82_85_29.md`。 |
| JS 028 | `src/scripts/script_028.htmlpart` | 139202 | `24d805495ba443bd…` | P1 | 首輪逐檔審查完成；風險保留 | 120 個命名函式；混合房間／重連、REST／WebSocket、AMQ／EMQ／VNDB 清單範圍、持久化、UI 與音訊／影片生命週期。既有單元及瀏覽器生命週期測試已對照；未改產品程式。詳見 `reports/AUDIT_SCRIPT_028_MULTIPLAYER_LIFECYCLE_V82_85_29.md`。 |
| CSS 032 | `src/styles/style_032.htmlpart` | 5061 | `53935154da57f393…` | P2 | 首輪靜態 CSS 盤點完成；視覺等價未驗收 | 已盤點 selector、media query、!important 與狀態覆寫；不因重複文字直接合併。詳見 `reports/AUDIT_STYLES_021_040_STATIC_CASCADE_V82_85_29.md`。 |
| JS 029 | `src/scripts/script_029.htmlpart` | 8373 | `d91ea61be8b60a48…` | P2 | 首輪逐檔審查完成；風險保留 | 介面／媒體整合補丁或模組標記；需保留 DOM 順序、fallback、idempotence 與 cleanup。詳見 `reports/AUDIT_SCRIPTS_027_029_032_035_UI_MEDIA_PATCHES_V82_85_29.md`。 |
| JS 030 | `src/scripts/script_030.htmlpart` | 125793 | `8a5888099591e329…` | P1 | 首輪資料負載審查完成；CI 契約待確認 | JSON AniList ID 對照表，共 9,400 組有效數值映射；已新增格式／ID 完整性契約，待最新 CI 確認。詳見 `reports/AUDIT_SCRIPT_030_ANILIST_ID_MAP_V82_85_29.md`。 |
| CSS 033 | `src/styles/style_033.htmlpart` | 671 | `a55bc38453df2022…` | P3 | 首輪靜態 CSS 盤點完成；視覺等價未驗收 | 已盤點 selector、media query、!important 與狀態覆寫；不因重複文字直接合併。詳見 `reports/AUDIT_STYLES_021_040_STATIC_CASCADE_V82_85_29.md`。 |
| JS 031 | `src/scripts/script_031.htmlpart` | 13812 | `ec242f20784f75ca…` | P1 | 首輪逐檔審查完成；風險保留 | 新增 source mapping／partial-source 19 assertions、cache version/read/write 14 assertions；涵蓋來源 ID 歧義、部分來源失敗、版本快取與寫入失敗。仍未涵蓋真實瀏覽器 IndexedDB upgrade。詳見 `reports/AUDIT_SCRIPT_031_CHINESE_TITLE_MAP_V82_85_29.md` 及 `reports/V82_85_29_CHINESE_TITLE_INDEXEDDB_CACHE_VERSION_CONTRACT.md`。 |
| CSS 034 | `src/styles/style_034.htmlpart` | 807 | `fc56b524aa62d0fd…` | P3 | 首輪靜態 CSS 盤點完成；視覺等價未驗收 | 已盤點 selector、media query、!important 與狀態覆寫；不因重複文字直接合併。詳見 `reports/AUDIT_STYLES_021_040_STATIC_CASCADE_V82_85_29.md`。 |
| CSS 035 | `src/styles/style_035.htmlpart` | 5028 | `02c72a5c6a80997c…` | P2 | 首輪靜態 CSS 盤點完成；視覺等價未驗收 | 已盤點 selector、media query、!important 與狀態覆寫；不因重複文字直接合併。詳見 `reports/AUDIT_STYLES_021_040_STATIC_CASCADE_V82_85_29.md`。 |
| JS 032 | `src/scripts/script_032.htmlpart` | 1307 | `9460a1bd64ceaec9…` | P2 | 首輪逐檔審查完成；風險保留 | 介面／媒體整合補丁或模組標記；需保留 DOM 順序、fallback、idempotence 與 cleanup。詳見 `reports/AUDIT_SCRIPTS_027_029_032_035_UI_MEDIA_PATCHES_V82_85_29.md`。 |
| CSS 036 | `src/styles/style_036.htmlpart` | 6341 | `c5ce1cddd6e25d78…` | P2 | 首輪靜態 CSS 盤點完成；視覺等價未驗收 | 已盤點 selector、media query、!important 與狀態覆寫；不因重複文字直接合併。詳見 `reports/AUDIT_STYLES_021_040_STATIC_CASCADE_V82_85_29.md`。 |
| JS 033 | `src/scripts/script_033.htmlpart` | 4284 | `dbecd226929499e6…` | P2 | 首輪逐檔審查完成；風險保留 | 介面／媒體整合補丁或模組標記；需保留 DOM 順序、fallback、idempotence 與 cleanup。詳見 `reports/AUDIT_SCRIPTS_027_029_032_035_UI_MEDIA_PATCHES_V82_85_29.md`。 |
| CSS 037 | `src/styles/style_037.htmlpart` | 5376 | `fd3ea81e18f6fbf0…` | P2 | 首輪靜態 CSS 盤點完成；視覺等價未驗收 | 已盤點 selector、media query、!important 與狀態覆寫；不因重複文字直接合併。詳見 `reports/AUDIT_STYLES_021_040_STATIC_CASCADE_V82_85_29.md`。 |
| CSS 038 | `src/styles/style_038.htmlpart` | 2002 | `1b2a184d9541cda5…` | P3 | 首輪靜態 CSS 盤點完成；視覺等價未驗收 | 已盤點 selector、media query、!important 與狀態覆寫；不因重複文字直接合併。詳見 `reports/AUDIT_STYLES_021_040_STATIC_CASCADE_V82_85_29.md`。 |
| CSS 039 | `src/styles/style_039.htmlpart` | 384 | `e964378641f336ac…` | P3 | 首輪靜態 CSS 盤點完成；視覺等價未驗收 | 已盤點 selector、media query、!important 與狀態覆寫；不因重複文字直接合併。詳見 `reports/AUDIT_STYLES_021_040_STATIC_CASCADE_V82_85_29.md`。 |
| CSS 040 | `src/styles/style_040.htmlpart` | 5184 | `4f6bc2e57503a255…` | P2 | 首輪靜態 CSS 盤點完成；視覺等價未驗收 | 已盤點 selector、media query、!important 與狀態覆寫；不因重複文字直接合併。詳見 `reports/AUDIT_STYLES_021_040_STATIC_CASCADE_V82_85_29.md`。 |
| JS 034 | `src/scripts/script_034.htmlpart` | 8270 | `7cec3458e413c509…` | P2 | 首輪逐檔審查完成；風險保留 | 介面／媒體整合補丁或模組標記；需保留 DOM 順序、fallback、idempotence 與 cleanup。詳見 `reports/AUDIT_SCRIPTS_027_029_032_035_UI_MEDIA_PATCHES_V82_85_29.md`。 |
| CSS 041 | `src/styles/style_041.htmlpart` | 4021 | `485750f234f8a74c…` | P2 | 首輪靜態 CSS 盤點完成；視覺等價未驗收 | 已盤點 selector、media query、!important 與狀態覆寫；重複文字不視為可安全合併。詳見 `reports/AUDIT_STYLES_041_050_STATIC_CASCADE_V82_85_29.md`。 |
| JS 035 | `src/scripts/script_035.htmlpart` | 4387 | `83ff2b64b838731a…` | P2 | 首輪逐檔審查完成；風險保留 | 介面／媒體整合補丁或模組標記；需保留 DOM 順序、fallback、idempotence 與 cleanup。詳見 `reports/AUDIT_SCRIPTS_027_029_032_035_UI_MEDIA_PATCHES_V82_85_29.md`。 |
| CSS 042 | `src/styles/style_042.htmlpart` | 7751 | `e6777341bd232098…` | P2 | 首輪靜態 CSS 盤點完成；視覺等價未驗收 | 已盤點 selector、media query、!important 與狀態覆寫；重複文字不視為可安全合併。詳見 `reports/AUDIT_STYLES_041_050_STATIC_CASCADE_V82_85_29.md`。 |
| JS 036 | `src/scripts/script_036.htmlpart` | 21078 | `7feae1adf93b2ef4…` | P1 | 首輪逐檔審查完成；資料風險保留 | 場景背景 IndexedDB、圖片尺寸限制與 Blob URL 生命週期；缺少專屬交易／清理契約。詳見 `reports/AUDIT_SCRIPT_036_SCENE_BACKGROUND_STORAGE_V82_85_29.md`。 |
| CSS 043 | `src/styles/style_043.htmlpart` | 7981 | `d88dc1d72e3c3367…` | P2 | 首輪靜態 CSS 盤點完成；視覺等價未驗收 | 已盤點 selector、media query、!important 與狀態覆寫；重複文字不視為可安全合併。詳見 `reports/AUDIT_STYLES_041_050_STATIC_CASCADE_V82_85_29.md`。 |
| CSS 044 | `src/styles/style_044.htmlpart` | 723 | `17db67007e27243d…` | P3 | 首輪靜態 CSS 盤點完成；視覺等價未驗收 | 已盤點 selector、media query、!important 與狀態覆寫；重複文字不視為可安全合併。詳見 `reports/AUDIT_STYLES_041_050_STATIC_CASCADE_V82_85_29.md`。 |
| JS 037 | `src/scripts/script_037.htmlpart` | 2684318 | `82af236544929fef…` | P1 | 首輪資料負載審查完成 | 確認為 gzip/Base64 EMQ 曲庫，不是應重構的程式邏輯；實際解壓為 8,383,856 bytes，6,645 works／16,839 songs，ID 唯一且歌曲作品引用有效。已更正 manifest 角色並新增實際資料完整性測試。詳見 `reports/AUDIT_SCRIPT_037_EMQ_PAYLOAD_V82_85_29.md`。 |
| JS 038 | `src/scripts/script_038.htmlpart` | 15277 | `82bcb7e50ee45cdb…` | P1 | 首輪逐檔審查完成；風險保留 | EMQ 壓縮曲庫載入、ID 碰撞保護、來源模式候選池、別名及音源 API；已對照真實 payload 與合成資料契約。詳見 `reports/AUDIT_SCRIPT_038_EMQ_API_POOL_LOADER_V82_85_29.md`。 |
| CSS 045 | `src/styles/style_045.htmlpart` | 4363 | `ddb36950d8bdbcdf…` | P2 | 首輪靜態 CSS 盤點完成；視覺等價未驗收 | 已盤點 selector、media query、!important 與狀態覆寫；重複文字不視為可安全合併。詳見 `reports/AUDIT_STYLES_041_050_STATIC_CASCADE_V82_85_29.md`。 |
| JS 039 | `src/scripts/script_039.htmlpart` | 33287 | `98c6b0014b6d7a37…` | P1 | 首輪逐檔審查完成；風險保留 | VNDB 封面批次／失敗狀態／重試 26 assertions；仍未涵蓋 live API 限流或真實瀏覽器圖片解碼。詳見 `reports/AUDIT_SCRIPT_039_VNDB_NAVIGATION_V82_85_29.md` 及 `reports/V82_85_29_VNDB_COVER_BATCH_RETRY_LIFECYCLE_CONTRACT.md`。 |
| CSS 046 | `src/styles/style_046.htmlpart` | 2350 | `b8e53bbabad03378…` | P3 | 首輪靜態 CSS 盤點完成；視覺等價未驗收 | 已盤點 selector、media query、!important 與狀態覆寫；重複文字不視為可安全合併。詳見 `reports/AUDIT_STYLES_041_050_STATIC_CASCADE_V82_85_29.md`。 |
| CSS 047 | `src/styles/style_047.htmlpart` | 4452 | `d74bc877ceffaece…` | P2 | 首輪靜態 CSS 盤點完成；視覺等價未驗收 | 已盤點 selector、media query、!important 與狀態覆寫；重複文字不視為可安全合併。詳見 `reports/AUDIT_STYLES_041_050_STATIC_CASCADE_V82_85_29.md`。 |
| JS 040 | `src/scripts/script_040.htmlpart` | 32350 | `6fb52a62ecf9bcba…` | P1 | 首輪逐檔審查完成；風險保留 | EMQ 清單以 workIds／vndbIds／songIds 分開儲存，並整合出題範圍及音源覆寫；已對照清單交接、API 與備份契約。詳見 `reports/AUDIT_SCRIPT_040_EMQ_LISTS_OVERRIDES_V82_85_29.md`。 |
| CSS 048 | `src/styles/style_048.htmlpart` | 3252 | `2f6355b5a6617fcc…` | P2 | 首輪靜態 CSS 盤點完成；視覺等價未驗收 | 已盤點 selector、media query、!important 與狀態覆寫；重複文字不視為可安全合併。詳見 `reports/AUDIT_STYLES_041_050_STATIC_CASCADE_V82_85_29.md`。 |
| CSS 049 | `src/styles/style_049.htmlpart` | 2534 | `bb2e86ff9630efbd…` | P3 | 首輪靜態 CSS 盤點完成；視覺等價未驗收 | 已盤點 selector、media query、!important 與狀態覆寫；重複文字不視為可安全合併。詳見 `reports/AUDIT_STYLES_041_050_STATIC_CASCADE_V82_85_29.md`。 |
| JS 041 | `src/scripts/script_041.htmlpart` | 9745 | `828791633111537a…` | P1 | 首輪逐檔審查完成；風險保留 | 新增 cache precedence/filtering 25 assertions；發現 serverAliasMap 僅 exact dedup、allKnownAliases 做 normalized dedup，決定暫緩行為變更；live API 限流仍未驗證。詳見 `reports/AUDIT_SCRIPT_041_EMQ_CHINESE_TITLE_FETCH_V82_85_29.md`、`reports/V82_85_29_EMQ_ALIAS_DEDUP_SEMANTICS_DECISION.md`。 |
| CSS 050 | `src/styles/style_050.htmlpart` | 1831 | `9b927e6c1d436bfc…` | P3 | 首輪靜態 CSS 盤點完成；視覺等價未驗收 | 已盤點 selector、media query、!important 與狀態覆寫；重複文字不視為可安全合併。詳見 `reports/AUDIT_STYLES_041_050_STATIC_CASCADE_V82_85_29.md`。 |

## Audit order

- First-pass inventory is complete for all 91 registered fragments.
- All 41 script fragments have a file-specific first-pass review or a documented grouped review.
- All 50 style fragments have a static selector/cascade scan.
- CSS pixel-diff and computed-style equivalence are not complete; do not treat static selector counts as visual acceptance.
- Highest-value follow-up is a focused SRS state-transition/persistence contract, then scene-background IndexedDB/resource-lifecycle coverage.
- Do not start broad refactors solely because a fragment is large or contains repeated selectors.

## Non-goals

- Do not rewrite the whole application.
- Do not merge same-name functions without proving semantic equivalence.
- Do not consolidate storage keys or alter persistence schemas as a cleanup exercise.
- Do not change CSS order solely to reduce duplicate-selector counts.
- Do not reopen the known CI audio capture mismatch unless actual playback regresses.
