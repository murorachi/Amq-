# V82.65 後續模組化計畫（僅盤點與規劃）

**本階段沒有開始模組化，沒有移動或重寫正式程式。** 先完成候選題池語義和多人個人狀態契約，再抽離模組，避免把未確定的規則搬到不同檔案。

## 現有架構與工具

| 層 | 現況 | 主要風險 |
|---|---|---|
| 主應用 | 約 8.79 MB 單檔 HTML；CSS/JS、IIFE、LocalStorage、學習狀態、AMQ/EMQ adapter、測驗與音訊生命週期都內嵌 | 全域作用域、載入順序與事件生命週期相互依賴 |
| 多人伺服器 | Python 房間伺服器；房間狀態、玩家候選 ID、metadata 驗證、來源及音訊健康 | 從候選 ID 無法還原所有個人狀態 |
| 曲庫 | 約 36.5 MB JSON，54,778 筆歌曲資料 | 重構不得無意改寫 ID、順序、來源或音訊引用 |
| 自動化測試 | `run_regression_tests.py`，22 個固定命令，8 批證據；額外有完整頁面個人條件 5/5 與來源模式 2/2 | 依檔案指紋判斷證據有效性，不以舊版號推斷 |
| 測試彙總 | `tests/aggregate_v82_65_runs.py` | 必須 fail-closed，拒絕缺批次、逾時或指紋不一致 |
| 完整頁面測試 | Playwright Chromium、隔離儲存、封鎖外部 HTTP/媒體 | 不等於真實網路與音訊輸出驗收 |
| 靜態／資料測試 | Python unittest/scripts、Node 執行正式邏輯、JS/Python parity、曲庫驗證 | 單元測試不能替代正式頁面流程 |
| 完整性工具 | `tools/rebuild_integrity_manifest.py`、`tools/build_v82_65_package.py`、`VERSION.json`、`SHA256SUMS.txt`、外部 sidecar | 更新任何包內文件後必須重建 ZIP 並重驗雜湊 |
| 啟動／依賴 | `requirements-test.txt`、Windows BAT 啟動入口 | 沒有確認正式 npm/webpack/vite 前端建置流程 |

## 建議模組邊界（概念性）

1. candidate-policy：純規則，不做 DOM/storage/audio 副作用。
2. source-adapters：AMQ／EMQ／Mixed 能力、ID 與來源正規化。
3. personal-filters：熟悉度、tag、focus、觀看狀態、VNDB 與清單作用域。
4. candidate-pool-pipeline：必要限制、個人條件、房間共同條件、no-repeat、抽選及排除診斷。
5. quiz-session：回合 seen-ID、抽選後更新、答題／超時／跳過與歷史更新。
6. audio-health：音源來源、TTL、備援順序與健康狀態。
7. persistence-migration：LocalStorage、IndexedDB、備份白名單、版本化和回滾。
8. multiplayer-contract：房間／玩家 schema、伺服器驗證、舊版相容和隱私。
9. ui-bindings：DOM 到經驗證設定物件的單一轉換入口。
10. catalog-validation：來源資料、ID 衝突、schema、音訊引用與穩定排序。

## 分階段建議

- M0 語義穩定：補齊 NEXT_TASK.md 所列完整頁面個人條件與多人資料權威性測試。
- M1 抽離純政策：以 golden tests 對比內嵌 JS 和獨立政策輸出，不碰 UI/storage/audio。
- M2 抽離來源 adapter／候選 pipeline：逐階段比較候選 ID、順序和排除理由。
- M3 抽離 session/audio/persistence：先有舊資料 fixture、備份回滾與真實 IndexedDB Blob 驗收。
- M4 多人契約／建置：定義版本化 room/player schema，通過固定案例後才評估前端建置系統。

每階段需另存版本、留回滾點、綁定精確指紋。不盲目刪除程式，不在本計畫內修改正式程式。
