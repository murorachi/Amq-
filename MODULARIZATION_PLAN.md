# V82.65 後續模組化計畫與工程盤點（2026-10-18）

狀態：**盤點完成；正式程式未修改；整體工程仍為 PARTIAL。**

## 基準與證據規則

- 唯一直接維護基準仍為 V82.64 Release ZIP，53,366,951 bytes，SHA-256 `260b2ab31d82b37b8af8df6e080fd547b780bb9204e15f87acaced92d153c2b7`。
- V82.65 是以該基準為起點的候選檢查點，不得將候選版描述成正式 Release，也不得用 V82.61/V82.62 歷史副本替代。
- V82.65 目前記錄的四項候選資產指紋：HTML 8,786,930 bytes / `abd202a6f96cc08e0969ad05ab8574cc71001733d655bcb5cff6b1a1a5b33a33`；server 88,403 bytes / `41e79fbabcbc037aef9d2b27076450217673935ede629c16caa956d737ff1736`；catalog 36,540,011 bytes、54,778 rows / `2a045731b9a478e68e88f1965f010f0d7512990344d1d194ef44262f11c5c652`；unavailable registry 40 bytes / `a6c6539e68f67e30ef4c0976b04280234352f1b0d61e907138af39050350023a`。
- 檢查點 ZIP：124,658,780 bytes，SHA-256 `db7918affcfbb6a15b0dc3265877623d9646532c7597bf2acaa85060f5a701b5`；記錄為 CRC PASS、291 entries、內部 290/290 SHA-256 PASS。ZIP 本體尚未上傳 GitHub Release，已上傳的是文件與 sidecar。
- 上述指紋與測試結果來自已提交工程紀錄。本次可直接讀回 GitHub 的文件包含 `BASELINE.md`、`CURRENT_STATUS.md`、`NEXT_TASK.md`、`PROJECT_HANDOFF.md`、`V82_65_RESUME_CHECKPOINT.md` 及本計畫。未能從 GitHub 直接取得的測試原始檔與執行環境，本次不重新宣稱已獨立重跑驗證。

## 現有架構盤點

| 區域 | 現況 | 主要依賴／資料流 | 風險與證據狀態 |
|---|---|---|---|
| 主應用 | 約 8.79 MB 單檔 HTML，CSS/JS 與多個 IIFE 內嵌 | DOM 設定 → 來源 adapter / 個人條件 → 候選題池 → 抽題與回合狀態 → 答題、跳過、超時與歷史 → 音訊播放 | 已知結構性風險：全域作用域、初始化順序、事件生命週期耦合；尚未有正式模組邊界 |
| 候選題池 | 已有共享 metadata policy、AMQ 清單入口 adapter、失效範圍 fail-closed 與來源適用性處理 | 曲庫 metadata + AMQ/EMQ/Mixed 模式 + hard constraints + 個人條件 + 房間條件 + no-repeat | 部分固定案例已驗收；全模式交叉語義仍未完成 |
| 個人狀態／持久化 | LocalStorage、IndexedDB、學習歷史、清單、備份／遷移與設定 | 使用者操作更新狀態；篩選器讀取個人狀態；匯出／匯入與版本遷移保護舊資料 | IndexedDB Blob 真實往返尚未驗收；不得用真實使用者資料做破壞性測試 |
| 音訊 | 多來源音訊引用、失效登記、健康狀態與備援機制 | 候選 song ID → 音源引用 → 可用性／健康狀態 → 播放與失敗處理 | 真實外網音訊/API 與恢復流程未驗收；封鎖外網的測試不能證明實際播放成功 |
| 多人伺服器 | Python 房間伺服器，房間狀態、候選 ID、metadata 最終驗證及音源健康 | 前端提交候選 ID／房間條件 → server validation → 最終選題／房間同步 | 已知契約缺口：單靠候選 ID 無法還原原始個人 tag、熟悉度、觀看狀態；版本化玩家篩選契約未完成 |
| 曲庫 | 約 36.5 MB JSON，54,778 筆 | ID、metadata、來源與音訊引用供個人題庫及多人 server 使用 | 資料改寫、ID/排序變化或前後端 metadata parity 漂移都可能造成回歸 |
| 自動化測試 | 記錄有 `run_regression_tests.py`、22 個固定命令／8 批結果、完整頁面 Chromium 測試及 JS/Python parity | 固定資產指紋 → 執行案例 → 保存退出碼/stdout/stderr → 聚合報告 | 紀錄報告 22/22 PASS、個人條件 5/5、EMQ/Mixed 2/2；本次未重跑，應以精確指紋限定其有效範圍 |
| 建置／交付 | 完整性 manifest、版本資訊、SHA 清單、ZIP 打包與 sidecar 工具；Windows BAT 啟動入口 | 源資產 + 文件 → manifest → package → CRC/SHA 驗證 | 未確認存在正式 npm/webpack/vite 模組化建置流程；單檔交付仍須可重現 |
| GitHub | `murorachi/Amq-`，工作分支 `v82.65-resume-checkpoint` | 基準文件、檢查點、狀態與測試紀錄 | 已確認 branch 存在且可讀回文件；ZIP 本體沒有上傳 Release asset 的工具，不可混淆 sidecar 與二進位本體 |

## 已有工程基礎與已完成工作

1. 已建立可追溯的 V82.64 正式基準及 SHA/大小/CRC 驗證流程，保留原始基準。
2. 已形成 V82.65 候選檢查點與四項產品指紋，並有 ZIP 完整性與內部 manifest 驗證紀錄。
3. 候選題池已有共享 metadata policy、AMQ 清單入口 adapter、失效範圍 fail-closed 與來源模式差異處理。
4. 已記錄 8 批／22 個命令 PASS、完整頁面個人條件 5/5、EMQ-only/Mixed 2/2，以及涵蓋 54,778 筆的 JS/Python metadata 固定案例比對。
5. 已有測試聚合、manifest 重建、ZIP 打包與續接檢查點工具；測試紀錄強調指紋綁定、逾時不算 PASS。
6. 已有模組化概念邊界及 M0-M4 路線；**正式程式尚未模組化**。

## 已驗證問題 vs 待查疑點

### 已由工程紀錄支持

- 整體狀態為 PARTIAL，不是完整交付完成。
- 個人條件、焦點、觀看狀態、VNDB／個人清單、EMQ 專用清單及黑名單的全部模式交叉組合尚未完整驗收。
- 多人 server-authoritative 個人狀態契約未完成；候選 ID 無法代表所有原始個人狀態。
- 真實外網音訊/API、IndexedDB Blob 完整匯出還原、兩台裝置 LAN/WebSocket/斷線重連未驗收。
- 前端仍為大型單檔；尚未確認正式前端模組化打包器。
- ZIP 本體尚未上傳 GitHub Release；已提交文件和 sidecar 不等於 ZIP 上傳成功。

### 尚待調查，不應先當成已發生的 bug

- 各 UI 控制項是否都將缺失、null、空陣列、明確不限及非法值轉成一致的設定語義。
- 候選題池每一階段是否能穩定輸出候選 ID、順序、排除原因及階段計數。
- 前端與 server 對房間／個人條件交集、EMQ 專用清單例外、黑名單與音源健康限制是否在所有輸入下完全一致。
- 真實 IndexedDB Blob、音訊播放與多人重連流程是否存在可重現故障；目前是未驗收，不代表已證實故障。
- 自動化測試工具是否在所有失敗、逾時、缺批次、指紋不一致時都 fail-closed；應檢視原始腳本並用故障注入測試，不以文件描述替代。
- 模組化之後是否需要 ESM 與打包器，須先確認瀏覽器支援、雙擊 file:// 使用限制及單檔產物的可重現性。

## 更新後的分階段計畫

### M0：候選語義與可觀測性封口（下一階段，P0）

工作：
- 沿用已驗收的 5 個個人條件與 2 個來源模式案例，不重做；新增焦點、VNDB、EMQ 專用清單、Mixed、黑名單及 no-repeat 的關鍵交叉組合。
- 為缺失、null、空陣列、明確不限、非法值、未知年份／難度定義表格化契約。
- 為候選池各階段記錄輸入數、輸出數、排除數與可機器讀取的排除原因；不允許空池時靜默放寬 hard constraints。
- 盤點並驗證聚合器的 fail-closed 行為。

產出：候選語義契約、固定 fixtures、測試報告、空池診斷格式、更新後的檢查點指紋。
驗收：固定 song ID、順序、每階段計數與排除理由均符合預期；既有案例無回歸；逾時／缺批次／指紋不一致均不可能被報成 PASS。

### M1：抽離純候選政策

工作：只抽取無 DOM/storage/audio 副作用的純函式；以同一 fixtures 比對舊內嵌邏輯與新模組輸出。
產出：獨立政策模組、golden tests、建置／對照腳本。
驗收：候選 ID、順序、拒絕原因與設定語義完全一致；單檔 HTML 可由可重現流程生成；不修改資料、UI 或持久化行為。

### M2：來源 adapter 與候選 pipeline

工作：逐一抽取 AMQ/EMQ/Mixed source adapters、個人篩選與候選 pipeline；保留明確的純資料介面。
產出：模組契約、來源 fixtures、pipeline 對照報告。
驗收：三種來源模式及硬限制在前端固定案例一致；排序、no-repeat、空池結果可重現。

### M3：多人契約、持久化與音訊生命週期

工作：先定義版本化 room/player filter schema、向後相容與隱私邊界；建立舊資料 fixtures，再驗證 IndexedDB Blob、音訊和兩裝置多人流程。
產出：schema/版本政策、server/frontend parity tests、匯出還原與多人驗收紀錄。
驗收：無效值拒絕規則一致、玩家狀態隔離、硬限制不可繞過；真實瀏覽器/裝置測試完成前不得標 PASS。

### M4：單檔建置與正式交付流程

工作：只有 M1-M3 的介面穩定後，才選擇最小可維護的模組化建置方案；固定依賴版本與建置命令。
產出：來源模組、鎖定依賴、可重現 build、單檔 HTML、manifest、測試與回滾說明。
驗收：乾淨環境可重建；輸出可雙擊使用；產品指紋及測試報告自動產生；原始基準不可被覆蓋。

## 刪除／延後的計畫項目

- 不把「立即重寫整個單檔」列為工作；沒有必要性或 golden tests 前不動 UI、CSS、storage、audio。
- 不重跑仍與四項指紋一致且證據完整的 22 個命令、5 個個人條件案例及 2 個 EMQ/Mixed 子案例。
- 不在 M0 前新增前端框架或建置器；先定義語義、資料契約及可重現測試。
- 不把真實網路、音訊、IndexedDB 或多裝置驗收以 mock 測試代替。

## 下一個最值得執行的工作

**M0-A：建立候選篩選語義矩陣與缺口交叉測試，並驗證測試聚合器 fail-closed。**

這能先把模糊的 UI/資料語義轉成可測契約，避免後續把錯誤規則抽進新模組；同時把每次回歸定位到具體篩選階段，減少人工比對與重複全量測試。


## Execution record — V82.68 CANDIDATE-POLICY-MODULE-01

- Completed the first low-risk source extraction: pure candidate-policy decisions are now in `src/modules/candidate_pool_policy.js`.
- Builder injects the exact module bytes at the original marker inside the existing classic script. It does not create a new runtime script element or asynchronous load.
- Added module hash/length/marker assertions and a module map.
- Latest checks: six Node suites 135/135; integrity verifier 101/101; 8/8 runner commands; output byte-identical to locked V82.65 HTML.
- Browser smoke rerun timed out / EPIPE after 11 preliminary assertions. This is an open validation issue, not a pass.
- The source tree and binary ZIP remain local; a docs-only remote update must not be represented as complete code publication.

Next: inspect the next side-effect-free policy/adapter boundary, add golden tests, then proceed to candidate pipeline. Persistence and multiplayer integration remain later stages.


## V82.69 execution update
- Extracted the storage repository as an exact-byte HTML fragment module; build-time injection keeps runtime order and output hash unchanged.
- Added storage repository, full-backup manifest/allowlist, and multiplayer session/reconnect contract tests.
- Results: 157 assertions passed; 11 runner commands passed; 103 integrity checks passed.
- One opaque-origin Chromium run passed 19 assertions on byte-identical output; later rerun failed with EPIPE. Direct file navigation is blocked. Full browser acceptance remains PARTIAL.
- Complete source fragments and ZIP binary are not on this remote branch.
