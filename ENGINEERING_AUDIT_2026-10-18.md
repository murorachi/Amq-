# 工程盤點報告：AMQ 練習工具（2026-10-18）

## 盤點範圍與方法

依據實際可讀回的 GitHub 儲存庫 `murorachi/Amq-`、分支 `v82.65-resume-checkpoint`，以及專案 Library 中的 `PROJECT_HANDOFF.md`、`MODULARIZATION_PLAN_V82_65.md`。本次也讀回 GitHub 上的 `BASELINE.md`、`CURRENT_STATUS.md`、`NEXT_TASK.md`、`V82_65_RESUME_CHECKPOINT.md` 與最新文件提交。

注意：本次是工程盤點，不修改正式 HTML、Python 伺服器或曲庫，也未重新執行測試。報告會區分「工程紀錄聲稱且可追溯」與「本次獨立重跑」，避免把舊報告當成本次執行結果。

## 1. 基準、交付與目前狀態

- 正式直接基準：V82.64 Release ZIP，53,366,951 bytes，SHA-256 `260b2ab31d82b37b8af8df6e080fd547b780bb9204e15f87acaced92d153c2b7`。原始基準不得覆蓋。
- V82.65：候選檢查點，不是整體完成版或正式 Release。
- 最新已確認文件提交：`2480408bc0c3a7cdf529503bd09c8685c008781d`（2026-10-17，更新 ZIP checksum sidecar）。本次更新模組化計畫後的新提交另見 GitHub 驗證結果。
- 分支：`v82.65-resume-checkpoint`，已確認存在且可讀回核心工程文件。
- 候選資產：HTML 8,786,930 bytes，SHA-256 `abd202a6f96cc08e0969ad05ab8574cc71001733d655bcb5cff6b1a1a5b33a33`；Python server 88,403 bytes，SHA-256 `41e79fbabcbc037aef9d2b27076450217673935ede629c16caa956d737ff1736`；曲庫 36,540,011 bytes、54,778 筆，SHA-256 `2a045731b9a478e68e88f1965f010f0d7512990344d1d194ef44262f11c5c652`；失效音源登記 40 bytes，SHA-256 `a6c6539e68f67e30ef4c0976b04280234352f1b0d61e907138af39050350023a`。
- 檢查點 ZIP：124,658,780 bytes，SHA-256 `db7918affcfbb6a15b0dc3265877623d9646532c7597bf2acaa85060f5a701b5`；既有紀錄為 CRC PASS、291 entries、內部 290/290 SHA-256 PASS。
- ZIP 本體尚未上傳到 GitHub Release。GitHub 已提交並讀回的是文件及 sidecar，不是二進位 ZIP。
- 整體狀態：PARTIAL。

## 2. 模組、功能與資料流

### 主應用與候選題池

主應用為約 8.79 MB 的單檔 HTML，CSS、JavaScript、IIFE、DOM 事件、學習狀態、LocalStorage、AMQ/EMQ adapter、測驗與音訊生命週期都在同一檔案。已記錄的候選版改動包括共享 metadata policy、AMQ 清單正式入口 adapter、失效範圍 fail-closed 與來源適用性差異處理。

主要資料流：

1. UI 控制項形成來源模式、年份／難度等範圍及個人條件。
2. AMQ／EMQ／Mixed adapter 正規化來源與 metadata 能力。
3. 必要限制與個人條件（熟悉度、tag、focus、觀看狀態、VNDB／自訂清單、黑名單等）過濾候選。
4. 多人模式再與房間條件、玩家候選 ID、server-side metadata 驗證互動。
5. no-repeat 與抽選選出題目；答題、跳過、超時更新回合狀態與學習歷史。
6. 音訊層解析音源、查健康狀態、播放並處理失效／備援。
7. LocalStorage／IndexedDB 保存設定、歷史、清單及部分 Blob；備份與遷移流程讀寫持久化資料。

這是依工程文件和功能分層整理的架構圖，不是對每一條執行路徑的動態追蹤結果。

### 多人伺服器與曲庫

Python 房間伺服器負責房間狀態、候選 song ID、metadata 最終驗證及音源健康相關工作。曲庫約 36.5 MB、54,778 筆，供前端與伺服器使用。重構時必須保護 song ID、穩定排序、來源欄位及音訊引用。已知契約缺口是 server 無法單憑候選 ID 還原原始個人熟悉度、tag、觀看狀態；不能直接假設由伺服器權威執行所有個人篩選。

## 3. 測試、建置及自動化

既有工程紀錄列出的工具／能力：

- `run_regression_tests.py`：22 個固定命令，8 批執行紀錄；保留退出碼、stdout/stderr 及資產指紋。
- `tests/aggregate_v82_65_runs.py`：測試結果彙總，應拒絕缺批次、逾時、指紋不一致或報告錯誤。
- 完整 HTML + Playwright Chromium：隔離儲存並封鎖外部 HTTP／音訊的頁面測試。
- Python unittest／資料腳本、Node 執行抽取 production JS、JS/Python metadata parity、曲庫完整性檢查。
- `tools/rebuild_integrity_manifest.py`、`tools/build_v82_65_package.py`、`VERSION.json`、`SHA256SUMS.txt)、外部 ZIP sidecar。
- `requirements-test.txt` 與 Windows BAT 啟動入口。

可讀回的歷史驗收紀錄為：8 批、22/22 命令 PASS，0 FAIL、0 TIMEOUT、0 彙總錯誤；完整 HTML 個人條件 5/5；EMQ-only/Mixed 2/2；metadata 固定案例覆蓋 54,778 筆曲庫。這些結果只對報告綁定的精確資產指紋有效。本次沒有重跑，因此不宣稱本次測試 PASS。

尚未驗收：真實外網音訊／第三方 API、IndexedDB Blob 完整匯出還原、兩台裝置 LAN/WebSocket／斷線重連。也尚未確認正式 npm/webpack/vite 前端建置流程。

## 4. 文件與已完成工作

已確認存在且可讀回：
- `PROJECT_HANDOFF.md`：基準、資產指紋、測試摘要、交付 ZIP 狀態。
- `BASELINE.md`：正式基準與候選資產指紋。
- `CURRENT_STATUS.md`：已驗證項目、未完成項目與 PARTIAL 判定。
- `NEXT_TASK.md`：個人篩選交叉測試、多人的權威契約及真實環境驗收清單。
- `V82_65_RESUME_CHECKPOINT.md`：續接錨點、指紋與不可重做的有效測試。
- `MODULARIZATION_PLAN.md`：概念性模組邊界與階段路線，本次已更新為更完整的盤點與驗收計畫。
- `MODULARIZATION_PLAN_V82_65.md`：Library 中的歷史／交接副本，不能當成 GitHub 最新內容的唯一依據。

已完成的工程基礎包括：正式基準指紋、候選檢查點、資料／完整性 manifest 與打包流程、固定回歸測試及彙總、完整頁面案例、跨語言 metadata 比對、候選題池部分規則改善與可續接工程文件。

## 5. 風險清單

### 已由工程紀錄支持的缺口
- 個人條件及來源模式的全部交叉組合未完成。
- 多人 server-authoritative 個人狀態 schema／隱私／向後相容契約未完成。
- 空候選池缺少完整機器可讀的階段計數與排除理由規格。
- 真實外網音訊、IndexedDB Blob 往返、多裝置 LAN/WebSocket/重連未驗收。
- 大型單檔造成全域、初始化與事件生命週期耦合。
- 尚未確認正式前端模組化建置方案。

### 待調查，不能直接稱為已發生的 bug
- 缺失、null、空陣列、明確不限、非法值是否在所有 UI 入口一致。
- 前後端對 hard constraints、EMQ 專用清單例外及玩家隔離是否所有情境一致。
- 聚合器是否在每一種失敗模式下 fail-closed。
- 真實音訊、IndexedDB、多人重連是否有可重現故障。
- 模組化後的單檔建置是否能在乾淨環境可重現並維持雙擊使用。

## 6. 修訂後路線與驗收標準

- **M0 語義封口（下一階段）**：新增缺失/null/空陣列/不限/非法值矩陣；補 focus、VNDB、EMQ list、Mixed、黑名單與 no-repeat 交叉案例；輸出候選池各階段計數與排除原因；對聚合器做失敗／逾時／缺批次／指紋錯誤測試。驗收為固定 song ID、順序、計數、排除原因符合 fixture，且錯誤執行不能被報成 PASS。
- **M1 純政策模組**：抽離無副作用規則，以 golden tests 比較舊／新輸出；候選 ID、順序、拒絕原因完全一致。
- **M2 source adapters／候選 pipeline**：分步抽離 AMQ/EMQ/Mixed、個人篩選與候選流程；每一步比對 ID、順序及排除理由。
- **M3 多人契約、持久化、音訊**：定義版本化 room/player schema；舊資料 fixtures、備份回滾、真實 IndexedDB Blob、音訊及兩裝置測試完成後才能標 PASS。
- **M4 可重現單檔建置**：在模組契約穩定後才決定最小建置器；乾淨環境重建、雙擊使用、manifest、測試、回滾說明全部驗收。

不立即全面重寫、不新增無必要框架、不重跑指紋未變且證據有效的既有測試，不清除真實 LocalStorage、IndexedDB、學習歷史或伺服器狀態。

## 7. 本次測試與修改紀錄

- 正式程式碼修改：未執行。
- 測試重跑：未執行。原因是本階段為盤點，且無本機工作樹可直接執行原始測試；不以歷史報告代替本次執行。
- 文件修改：更新 GitHub 分支中的 `MODULARIZATION_PLAN.md)，並新增本報告；同步更新狀態與下一工作清單。
- 下一工作：M0-A 候選篩選語義矩陣與缺口交叉測試，並驗證聚合器 fail-closed。
