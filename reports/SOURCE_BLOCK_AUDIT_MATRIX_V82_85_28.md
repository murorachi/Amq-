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
| First-pass file audits completed | 1 |
| Partially reviewed / known risk, not full sign-off | 1 |
| Awaiting file-specific review | 89 |

These counts deliberately measure **full file-specific audit evidence**, not whether a fragment was ever touched. Previously reviewed helper contracts remain useful and are not repeated unless evidence suggests they are unreliable.

## CI checkpoint

Run [39230015840](https://github.com/murorachi/Amq-/actions/runs/39230015840): source/unit job passed; Firefox responsive passed; Chromium native-origin job failed only at `Run real browser audio decode and output acceptance`. Treat this as the known CI audio-output capture mismatch, not proof that actual product playback is broken. Manual interactive acceptance was not performed.

## Fragment-by-fragment ledger

| Kind / index | Fragment | Bytes | Manifest SHA-256 | Priority | Audit state | Initial focus / existing evidence |
|---|---|---:|---|---|---|---|
| CSS 001 | `src/styles/style_001.htmlpart` | 27128 | `281256a268fba93b…` | P1 | 待逐檔排查 | 大型樣式片段；盤點 selector、重複宣告、媒體查詢與載入順序，保留 cascade 順序。 |
| CSS 002 | `src/styles/style_002.htmlpart` | 182 | `e635065fa0c02640…` | P3 | 待逐檔排查 | 盤點 selector 所屬頁面／元件、重複宣告及覆寫來源；未證明等價前不合併或調序。 |
| CSS 003 | `src/styles/style_003.htmlpart` | 3706 | `ae112d85ea02b0d8…` | P2 | 待逐檔排查 | 盤點 selector 所屬頁面／元件、重複宣告及覆寫來源；未證明等價前不合併或調序。 |
| CSS 004 | `src/styles/style_004.htmlpart` | 2020 | `eb4c237cb464534c…` | P3 | 待逐檔排查 | 盤點 selector 所屬頁面／元件、重複宣告及覆寫來源；未證明等價前不合併或調序。 |
| CSS 005 | `src/styles/style_005.htmlpart` | 482 | `8f0301cd7d168f07…` | P3 | 待逐檔排查 | 盤點 selector 所屬頁面／元件、重複宣告及覆寫來源；未證明等價前不合併或調序。 |
| JS 001 | `src/scripts/script_001.htmlpart` | 102981 | `07e91622000ebfe9…` | P1 | 待逐檔排查 | 大型腳本，優先盤點主要職責、全域狀態、事件註冊、計時器／媒體副作用與測試覆蓋。 |
| JS 002 | `src/scripts/script_002.htmlpart` | 6038 | `4904e6862b21cd82…` | P2 | 待逐檔排查 | 尚無本版完整逐檔審查紀錄；先完成職責辨識、依賴盤點與相關測試對照。 |
| JS 003 | `src/scripts/script_003.htmlpart` | 8126 | `ce363810ef726c8b…` | P2 | 待逐檔排查 | 尚無本版完整逐檔審查紀錄；先完成職責辨識、依賴盤點與相關測試對照。 |
| JS 004 | `src/scripts/script_004.htmlpart` | 93004 | `f9dfcd2322a99bb1…` | P1 | 首輪逐檔審查完成；風險保留 | 35 個命名函式；答題／音訊／計時器／設定遷移／建議 UI 多職責耦合。既有 answer-flow、lifecycle 與瀏覽器測試已對照；未改產品程式。詳見 `reports/AUDIT_SCRIPT_004_QUIZ_LIFECYCLE_V82_85_29.md`。 |
| CSS 006 | `src/styles/style_006.htmlpart` | 4051 | `4ec3b240b5f86c52…` | P2 | 待逐檔排查 | 盤點 selector 所屬頁面／元件、重複宣告及覆寫來源；未證明等價前不合併或調序。 |
| CSS 007 | `src/styles/style_007.htmlpart` | 8867 | `c61171df09a2acc0…` | P2 | 待逐檔排查 | 盤點 selector 所屬頁面／元件、重複宣告及覆寫來源；未證明等價前不合併或調序。 |
| CSS 008 | `src/styles/style_008.htmlpart` | 991 | `25b0813a768a24f8…` | P3 | 待逐檔排查 | 盤點 selector 所屬頁面／元件、重複宣告及覆寫來源；未證明等價前不合併或調序。 |
| JS 005 | `src/scripts/script_005.htmlpart` | 1139 | `68f1ba7d7db6e010…` | P2 | 待逐檔排查 | 尚無本版完整逐檔審查紀錄；先完成職責辨識、依賴盤點與相關測試對照。 |
| CSS 009 | `src/styles/style_009.htmlpart` | 326 | `f23f912148e78194…` | P3 | 待逐檔排查 | 盤點 selector 所屬頁面／元件、重複宣告及覆寫來源；未證明等價前不合併或調序。 |
| JS 006 | `src/scripts/script_006.htmlpart` | 1628 | `fe81b21d1a0a3f3b…` | P2 | 待逐檔排查 | 尚無本版完整逐檔審查紀錄；先完成職責辨識、依賴盤點與相關測試對照。 |
| CSS 010 | `src/styles/style_010.htmlpart` | 895 | `cea29a86147270b8…` | P3 | 待逐檔排查 | 盤點 selector 所屬頁面／元件、重複宣告及覆寫來源；未證明等價前不合併或調序。 |
| JS 007 | `src/scripts/script_007.htmlpart` | 4491 | `69f15478b96e81a2…` | P2 | 待逐檔排查 | 尚無本版完整逐檔審查紀錄；先完成職責辨識、依賴盤點與相關測試對照。 |
| CSS 011 | `src/styles/style_011.htmlpart` | 2976 | `7c629f4f0d10353e…` | P3 | 待逐檔排查 | 盤點 selector 所屬頁面／元件、重複宣告及覆寫來源；未證明等價前不合併或調序。 |
| JS 008 | `src/scripts/script_008.htmlpart` | 5458 | `bcd739f91064842d…` | P2 | 待逐檔排查 | 尚無本版完整逐檔審查紀錄；先完成職責辨識、依賴盤點與相關測試對照。 |
| CSS 012 | `src/styles/style_012.htmlpart` | 525 | `490807a7172d6c15…` | P3 | 待逐檔排查 | 盤點 selector 所屬頁面／元件、重複宣告及覆寫來源；未證明等價前不合併或調序。 |
| JS 009 | `src/scripts/script_009.htmlpart` | 2000 | `afa906fffd624fb5…` | P2 | 待逐檔排查 | 尚無本版完整逐檔審查紀錄；先完成職責辨識、依賴盤點與相關測試對照。 |
| CSS 013 | `src/styles/style_013.htmlpart` | 343 | `86521017b5d64e81…` | P3 | 待逐檔排查 | 盤點 selector 所屬頁面／元件、重複宣告及覆寫來源；未證明等價前不合併或調序。 |
| CSS 014 | `src/styles/style_014.htmlpart` | 1241 | `dfb9d183b07ceaf1…` | P3 | 待逐檔排查 | 盤點 selector 所屬頁面／元件、重複宣告及覆寫來源；未證明等價前不合併或調序。 |
| JS 010 | `src/scripts/script_010.htmlpart` | 1985 | `7f7290f9d4081d07…` | P2 | 待逐檔排查 | 尚無本版完整逐檔審查紀錄；先完成職責辨識、依賴盤點與相關測試對照。 |
| JS 011 | `src/scripts/script_011.htmlpart` | 311 | `b0da897f5476ad0b…` | P2 | 待逐檔排查 | 尚無本版完整逐檔審查紀錄；先完成職責辨識、依賴盤點與相關測試對照。 |
| CSS 015 | `src/styles/style_015.htmlpart` | 464 | `48c8914d6b230c45…` | P3 | 待逐檔排查 | 盤點 selector 所屬頁面／元件、重複宣告及覆寫來源；未證明等價前不合併或調序。 |
| JS 012 | `src/scripts/script_012.htmlpart` | 7942 | `1ef550097de54373…` | P2 | 待逐檔排查 | 尚無本版完整逐檔審查紀錄；先完成職責辨識、依賴盤點與相關測試對照。 |
| JS 013 | `src/scripts/script_013.htmlpart` | 733 | `f67a8ef39d3a5516…` | P2 | 待逐檔排查 | 尚無本版完整逐檔審查紀錄；先完成職責辨識、依賴盤點與相關測試對照。 |
| CSS 016 | `src/styles/style_016.htmlpart` | 974 | `7ef060e224a3e7f4…` | P3 | 待逐檔排查 | 盤點 selector 所屬頁面／元件、重複宣告及覆寫來源；未證明等價前不合併或調序。 |
| JS 014 | `src/scripts/script_014.htmlpart` | 2740 | `fbe6f01ab40ba443…` | P2 | 待逐檔排查 | 尚無本版完整逐檔審查紀錄；先完成職責辨識、依賴盤點與相關測試對照。 |
| CSS 017 | `src/styles/style_017.htmlpart` | 3639 | `46b2a15eb6178ef7…` | P2 | 待逐檔排查 | 盤點 selector 所屬頁面／元件、重複宣告及覆寫來源；未證明等價前不合併或調序。 |
| JS 015 | `src/scripts/script_015.htmlpart` | 6872 | `89340718cae57d83…` | P2 | 待逐檔排查 | 尚無本版完整逐檔審查紀錄；先完成職責辨識、依賴盤點與相關測試對照。 |
| JS 016 | `src/scripts/script_016.htmlpart` | 10541 | `695634223ced2889…` | P2 | 待逐檔排查 | 尚無本版完整逐檔審查紀錄；先完成職責辨識、依賴盤點與相關測試對照。 |
| CSS 018 | `src/styles/style_018.htmlpart` | 1297 | `e5960a58096959c4…` | P3 | 待逐檔排查 | 盤點 selector 所屬頁面／元件、重複宣告及覆寫來源；未證明等價前不合併或調序。 |
| CSS 019 | `src/styles/style_019.htmlpart` | 1193 | `9854486c457a37ee…` | P3 | 待逐檔排查 | 盤點 selector 所屬頁面／元件、重複宣告及覆寫來源；未證明等價前不合併或調序。 |
| CSS 020 | `src/styles/style_020.htmlpart` | 364 | `87a33f88876ed180…` | P3 | 待逐檔排查 | 盤點 selector 所屬頁面／元件、重複宣告及覆寫來源；未證明等價前不合併或調序。 |
| JS 017 | `src/scripts/script_017.htmlpart` | 945 | `9ca0cbb241b25a10…` | P2 | 待逐檔排查 | 尚無本版完整逐檔審查紀錄；先完成職責辨識、依賴盤點與相關測試對照。 |
| CSS 021 | `src/styles/style_021.htmlpart` | 1267 | `e3fabe1bc2c8d679…` | P3 | 待逐檔排查 | 盤點 selector 所屬頁面／元件、重複宣告及覆寫來源；未證明等價前不合併或調序。 |
| JS 018 | `src/scripts/script_018.htmlpart` | 1459 | `89d6c0bbcf2ee823…` | P2 | 待逐檔排查 | 尚無本版完整逐檔審查紀錄；先完成職責辨識、依賴盤點與相關測試對照。 |
| JS 019 | `src/scripts/script_019.htmlpart` | 1665 | `502dd544413bcc14…` | P2 | 待逐檔排查 | 尚無本版完整逐檔審查紀錄；先完成職責辨識、依賴盤點與相關測試對照。 |
| CSS 022 | `src/styles/style_022.htmlpart` | 3209 | `c7ee3fecd57738a1…` | P2 | 待逐檔排查 | 盤點 selector 所屬頁面／元件、重複宣告及覆寫來源；未證明等價前不合併或調序。 |
| JS 020 | `src/scripts/script_020.htmlpart` | 39032 | `4cf04ec3e4668cfa…` | P2 | 待逐檔排查 | 尚無本版完整逐檔審查紀錄；先完成職責辨識、依賴盤點與相關測試對照。 |
| CSS 023 | `src/styles/style_023.htmlpart` | 1733 | `7758a7d56eeb26c2…` | P3 | 待逐檔排查 | 盤點 selector 所屬頁面／元件、重複宣告及覆寫來源；未證明等價前不合併或調序。 |
| CSS 024 | `src/styles/style_024.htmlpart` | 527 | `1e62b4a55a30d225…` | P3 | 待逐檔排查 | 盤點 selector 所屬頁面／元件、重複宣告及覆寫來源；未證明等價前不合併或調序。 |
| CSS 025 | `src/styles/style_025.htmlpart` | 1866 | `76ca4ec6dc09ac5d…` | P3 | 待逐檔排查 | 盤點 selector 所屬頁面／元件、重複宣告及覆寫來源；未證明等價前不合併或調序。 |
| JS 021 | `src/scripts/script_021.htmlpart` | 757 | `decf8081a2cbb3df…` | P2 | 待逐檔排查 | 尚無本版完整逐檔審查紀錄；先完成職責辨識、依賴盤點與相關測試對照。 |
| CSS 026 | `src/styles/style_026.htmlpart` | 424 | `b54d9295296f46b1…` | P3 | 待逐檔排查 | 盤點 selector 所屬頁面／元件、重複宣告及覆寫來源；未證明等價前不合併或調序。 |
| CSS 027 | `src/styles/style_027.htmlpart` | 258 | `fe83f9f1e1d1311a…` | P3 | 待逐檔排查 | 盤點 selector 所屬頁面／元件、重複宣告及覆寫來源；未證明等價前不合併或調序。 |
| CSS 028 | `src/styles/style_028.htmlpart` | 1496 | `6a5b78ead3940de0…` | P3 | 待逐檔排查 | 盤點 selector 所屬頁面／元件、重複宣告及覆寫來源；未證明等價前不合併或調序。 |
| CSS 029 | `src/styles/style_029.htmlpart` | 860 | `de9910b06deff293…` | P3 | 待逐檔排查 | 盤點 selector 所屬頁面／元件、重複宣告及覆寫來源；未證明等價前不合併或調序。 |
| JS 022 | `src/scripts/script_022.htmlpart` | 1367 | `d540d0d19b316641…` | P2 | 待逐檔排查 | 尚無本版完整逐檔審查紀錄；先完成職責辨識、依賴盤點與相關測試對照。 |
| CSS 030 | `src/styles/style_030.htmlpart` | 2317 | `8a9312389b1daeaa…` | P3 | 待逐檔排查 | 盤點 selector 所屬頁面／元件、重複宣告及覆寫來源；未證明等價前不合併或調序。 |
| JS 023 | `src/scripts/script_023.htmlpart` | 44496 | `b75a3e7a33ba2958…` | P2 | 待逐檔排查 | 尚無本版完整逐檔審查紀錄；先完成職責辨識、依賴盤點與相關測試對照。 |
| JS 024 | `src/scripts/script_024.htmlpart` | 3889 | `1a2d70d23d102ee8…` | P2 | 待逐檔排查 | 尚無本版完整逐檔審查紀錄；先完成職責辨識、依賴盤點與相關測試對照。 |
| JS 025 | `src/scripts/script_025.htmlpart` | 53270 | `9a875f3718004d35…` | P2 | 待逐檔排查 | 尚無本版完整逐檔審查紀錄；先完成職責辨識、依賴盤點與相關測試對照。 |
| JS 026 | `src/scripts/script_026.htmlpart` | 33347 | `9cd1bb16da042aa4…` | P2 | 待逐檔排查 | 尚無本版完整逐檔審查紀錄；先完成職責辨識、依賴盤點與相關測試對照。 |
| CSS 031 | `src/styles/style_031.htmlpart` | 75164 | `1b4e4cdc0ad23681…` | P1 | 待逐檔排查 | 大型樣式片段；盤點 selector、重複宣告、媒體查詢與載入順序，保留 cascade 順序。 |
| JS 027 | `src/scripts/script_027.htmlpart` | 44 | `4ba9c72cbba7d24d…` | P2 | 待逐檔排查 | 尚無本版完整逐檔審查紀錄；先完成職責辨識、依賴盤點與相關測試對照。 |
| JS 028 | `src/scripts/script_028.htmlpart` | 139202 | `24d805495ba443bd…` | P1 | 局部審查，未完成整檔審查 | 已有多人模式 checked helper、範圍驗證及下一首音訊狀態重設等局部整理；仍混合設定遷移、房間／重連、篩選、持久化、UI 與音訊生命週期。 |
| CSS 032 | `src/styles/style_032.htmlpart` | 5061 | `53935154da57f393…` | P2 | 待逐檔排查 | 盤點 selector 所屬頁面／元件、重複宣告及覆寫來源；未證明等價前不合併或調序。 |
| JS 029 | `src/scripts/script_029.htmlpart` | 8373 | `d91ea61be8b60a48…` | P2 | 待逐檔排查 | 尚無本版完整逐檔審查紀錄；先完成職責辨識、依賴盤點與相關測試對照。 |
| JS 030 | `src/scripts/script_030.htmlpart` | 125793 | `8a5888099591e329…` | P1 | 待逐檔排查 | 大型腳本，優先盤點主要職責、全域狀態、事件註冊、計時器／媒體副作用與測試覆蓋。 |
| CSS 033 | `src/styles/style_033.htmlpart` | 671 | `a55bc38453df2022…` | P3 | 待逐檔排查 | 盤點 selector 所屬頁面／元件、重複宣告及覆寫來源；未證明等價前不合併或調序。 |
| JS 031 | `src/scripts/script_031.htmlpart` | 13812 | `ec242f20784f75ca…` | P2 | 待逐檔排查 | 尚無本版完整逐檔審查紀錄；先完成職責辨識、依賴盤點與相關測試對照。 |
| CSS 034 | `src/styles/style_034.htmlpart` | 807 | `fc56b524aa62d0fd…` | P3 | 待逐檔排查 | 盤點 selector 所屬頁面／元件、重複宣告及覆寫來源；未證明等價前不合併或調序。 |
| CSS 035 | `src/styles/style_035.htmlpart` | 5028 | `02c72a5c6a80997c…` | P2 | 待逐檔排查 | 盤點 selector 所屬頁面／元件、重複宣告及覆寫來源；未證明等價前不合併或調序。 |
| JS 032 | `src/scripts/script_032.htmlpart` | 1307 | `9460a1bd64ceaec9…` | P2 | 待逐檔排查 | 尚無本版完整逐檔審查紀錄；先完成職責辨識、依賴盤點與相關測試對照。 |
| CSS 036 | `src/styles/style_036.htmlpart` | 6341 | `c5ce1cddd6e25d78…` | P2 | 待逐檔排查 | 盤點 selector 所屬頁面／元件、重複宣告及覆寫來源；未證明等價前不合併或調序。 |
| JS 033 | `src/scripts/script_033.htmlpart` | 4284 | `dbecd226929499e6…` | P2 | 待逐檔排查 | 尚無本版完整逐檔審查紀錄；先完成職責辨識、依賴盤點與相關測試對照。 |
| CSS 037 | `src/styles/style_037.htmlpart` | 5376 | `fd3ea81e18f6fbf0…` | P2 | 待逐檔排查 | 盤點 selector 所屬頁面／元件、重複宣告及覆寫來源；未證明等價前不合併或調序。 |
| CSS 038 | `src/styles/style_038.htmlpart` | 2002 | `1b2a184d9541cda5…` | P3 | 待逐檔排查 | 盤點 selector 所屬頁面／元件、重複宣告及覆寫來源；未證明等價前不合併或調序。 |
| CSS 039 | `src/styles/style_039.htmlpart` | 384 | `e964378641f336ac…` | P3 | 待逐檔排查 | 盤點 selector 所屬頁面／元件、重複宣告及覆寫來源；未證明等價前不合併或調序。 |
| CSS 040 | `src/styles/style_040.htmlpart` | 5184 | `4f6bc2e57503a255…` | P2 | 待逐檔排查 | 盤點 selector 所屬頁面／元件、重複宣告及覆寫來源；未證明等價前不合併或調序。 |
| JS 034 | `src/scripts/script_034.htmlpart` | 8270 | `7cec3458e413c509…` | P2 | 待逐檔排查 | 尚無本版完整逐檔審查紀錄；先完成職責辨識、依賴盤點與相關測試對照。 |
| CSS 041 | `src/styles/style_041.htmlpart` | 4021 | `485750f234f8a74c…` | P2 | 待逐檔排查 | 盤點 selector 所屬頁面／元件、重複宣告及覆寫來源；未證明等價前不合併或調序。 |
| JS 035 | `src/scripts/script_035.htmlpart` | 4387 | `83ff2b64b838731a…` | P2 | 待逐檔排查 | 尚無本版完整逐檔審查紀錄；先完成職責辨識、依賴盤點與相關測試對照。 |
| CSS 042 | `src/styles/style_042.htmlpart` | 7751 | `e6777341bd232098…` | P2 | 待逐檔排查 | 盤點 selector 所屬頁面／元件、重複宣告及覆寫來源；未證明等價前不合併或調序。 |
| JS 036 | `src/scripts/script_036.htmlpart` | 21078 | `7feae1adf93b2ef4…` | P2 | 待逐檔排查 | 尚無本版完整逐檔審查紀錄；先完成職責辨識、依賴盤點與相關測試對照。 |
| CSS 043 | `src/styles/style_043.htmlpart` | 7981 | `d88dc1d72e3c3367…` | P2 | 待逐檔排查 | 盤點 selector 所屬頁面／元件、重複宣告及覆寫來源；未證明等價前不合併或調序。 |
| CSS 044 | `src/styles/style_044.htmlpart` | 723 | `17db67007e27243d…` | P3 | 待逐檔排查 | 盤點 selector 所屬頁面／元件、重複宣告及覆寫來源；未證明等價前不合併或調序。 |
| JS 037 | `src/scripts/script_037.htmlpart` | 2684318 | `82af236544929fef…` | P1 | 待逐檔排查 | 片段體積極大，先辨識是否為資料／字典負載或執行邏輯，再決定適用的檢查方式；不可只因大小直接重構。 |
| JS 038 | `src/scripts/script_038.htmlpart` | 15277 | `82bcb7e50ee45cdb…` | P2 | 待逐檔排查 | 尚無本版完整逐檔審查紀錄；先完成職責辨識、依賴盤點與相關測試對照。 |
| CSS 045 | `src/styles/style_045.htmlpart` | 4363 | `ddb36950d8bdbcdf…` | P2 | 待逐檔排查 | 盤點 selector 所屬頁面／元件、重複宣告及覆寫來源；未證明等價前不合併或調序。 |
| JS 039 | `src/scripts/script_039.htmlpart` | 33287 | `98c6b0014b6d7a37…` | P2 | 待逐檔排查 | 尚無本版完整逐檔審查紀錄；先完成職責辨識、依賴盤點與相關測試對照。 |
| CSS 046 | `src/styles/style_046.htmlpart` | 2350 | `b8e53bbabad03378…` | P3 | 待逐檔排查 | 盤點 selector 所屬頁面／元件、重複宣告及覆寫來源；未證明等價前不合併或調序。 |
| CSS 047 | `src/styles/style_047.htmlpart` | 4452 | `d74bc877ceffaece…` | P2 | 待逐檔排查 | 盤點 selector 所屬頁面／元件、重複宣告及覆寫來源；未證明等價前不合併或調序。 |
| JS 040 | `src/scripts/script_040.htmlpart` | 32350 | `6fb52a62ecf9bcba…` | P2 | 待逐檔排查 | 尚無本版完整逐檔審查紀錄；先完成職責辨識、依賴盤點與相關測試對照。 |
| CSS 048 | `src/styles/style_048.htmlpart` | 3252 | `2f6355b5a6617fcc…` | P2 | 待逐檔排查 | 盤點 selector 所屬頁面／元件、重複宣告及覆寫來源；未證明等價前不合併或調序。 |
| CSS 049 | `src/styles/style_049.htmlpart` | 2534 | `bb2e86ff9630efbd…` | P3 | 待逐檔排查 | 盤點 selector 所屬頁面／元件、重複宣告及覆寫來源；未證明等價前不合併或調序。 |
| JS 041 | `src/scripts/script_041.htmlpart` | 9745 | `828791633111537a…` | P2 | 待逐檔排查 | 尚無本版完整逐檔審查紀錄；先完成職責辨識、依賴盤點與相關測試對照。 |
| CSS 050 | `src/styles/style_050.htmlpart` | 1831 | `9b927e6c1d436bfc…` | P3 | 待逐檔排查 | 盤點 selector 所屬頁面／元件、重複宣告及覆寫來源；未證明等價前不合併或調序。 |

## Audit order

1. `src/scripts/script_004.htmlpart`: map quiz lifecycle and existing contracts before any refactor.
2. `src/scripts/script_028.htmlpart`: map multiplayer lifecycle and persistence boundaries; preserve existing room/audio behavior.
3. Large scripts: determine code vs data payload, then map state, side effects, and existing tests.
4. Remaining scripts: review in manifest order, reusing existing tests and recording only uncovered risks.
5. Styles: inspect selectors and cascade in load order; do not reorder CSS during the audit.
6. Close each fragment with evidence and explicit disposition. Recalculate the remaining count only from those sign-offs.

## Non-goals

- Do not rewrite the whole application.
- Do not merge same-name functions without proving semantic equivalence.
- Do not consolidate storage keys or alter persistence schemas as a cleanup exercise.
- Do not change CSS order solely to reduce duplicate-selector counts.
- Do not reopen the known CI audio capture mismatch unless actual playback regresses.
