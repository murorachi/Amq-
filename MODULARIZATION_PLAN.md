# V82.65 後續模組化計畫（僅盤點與規劃）

**本階段沒有開始模組化，沒有移動或重寫正式程式。** 先完成候選題池語義驗收，再考慮抽離模組，避免在缺少資料契約時把相同問題搬到不同檔案。

## 現有架構與工具

| 層 | 現況 | 主要風險 |
|---|---|---|
| 主應用 | 約 8.79 MB 單檔 HTML；CSS/JS、IIFE、LocalStorage、學習狀態、AMQ/EMQ adapter、測驗與音訊生命週期都內嵌 | 全域作用域、載入順序與事件生命週期相互依賴 |
| 多人伺服器 | Python 房間伺服器，負責房間狀態、玩家候選 ID、metadata 最終驗證及音源健康 | 由前端候選 ID 無法還原全部個人狀態；須明確定義房間／個人契約 |
| 曲庫 | 約 36.5 MB JSON，54,778 首歌曲的 metadata／來源資料 | 不可在重構時無意重排 ID 或改寫資料 |
| 自動化測試 | run_regression_tests.py，共 21 個命令；每項逾時、stdout/stderr、退出碼與指紋 | 舊測試檔名不代表測到舊版；按報告指紋判定 |
| 測試彙總 | tests/aggregate_v82_65_runs.py | 需 fail-closed，拒絕缺批次、逾時、指紋不一致 |
| 完整頁面測試 | Playwright Chromium，隔離 storage，封鎖外部 HTTP/音訊 | 不等於真實網路或音訊驗收 |
| 靜態與資料測試 | Python unittest/scripts、Node 執行抽取 production JS、JS/Python parity、曲庫驗證 | 抽取函式測試不能替代整頁端到端測試 |
| 完整性工具 | tools/rebuild_integrity_manifest.py、tools/build_v82_65_package.py、VERSION.json、SHA256SUMS.txt、ZIP 外部 sidecar | 文件更新後需重建清單及 ZIP，不能沿用舊雜湊 |
| 依賴／啟動 | requirements-test.txt、Windows BAT 啟動入口 | 尚無已確認的前端 npm/webpack/vite 正式建置流程 |

## 建議邊界（概念性）

1. candidate-policy：純規則；無 DOM/storage/audio 副作用。
2. source-adapters：AMQ／EMQ／Mixed 欄位能力、ID 與來源正規化。
3. personal-filters：熟悉度、標籤、focus、觀看狀態、VNDB 與自訂清單的玩家作用域。
4. candidate-pool-pipeline：必要限制、個人條件、房間共同條件、no-repeat、抽選與排除診斷。
5. quiz-session：回合 seen-ID、抽選後更新、答題／超時／跳過與歷史更新。
6. audio-health：可用音源、TTL、備援順序與健康狀態。
7. persistence-migration：LocalStorage、IndexedDB、備份白名單、版本化和回滾。
8. multiplayer-contract：房間／玩家 schema、伺服器驗證、舊版相容與隱私。
9. ui-bindings：DOM 轉成經驗證設定物件，避免事件各寫一套規則。
10. catalog-validation：來源資料、ID 衝突、schema、音訊引用與穩定排序。

## 分階段建議

- M0 語義穩定：完成 NEXT_TASK.md 的個人條件、focus、EMQ 專用清單與多人契約測試；釐清缺失/null/空陣列/非法值；提供空池排除計數。
- M1 抽離純政策：先以 golden tests 比對內嵌 JS 和獨立政策輸出，不碰 UI/storage/audio。
- M2 抽離來源 adapter／候選 pipeline：每一步保持外部契約穩定，比對候選 ID、順序、排除原因。
- M3 抽離 session/audio/persistence：須先有舊資料 fixture、備份回滾和真實 IndexedDB Blob 驗收。
- M4 多人契約／建置：定義版本化 room/player schema，驗證前端與伺服器固定案例一致，再考慮前端模組建置系統。

所有階段須另存版本、留回滾點、綁定精確指紋。不為縮短程式碼盲目刪除函式或 CSS，也不在本計畫內改動正式程式。
