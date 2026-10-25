# AMQ 學習工具第六階段結案報告

日期：2026-10-25  
分支：`amq-stage6-static-audit-regression-20261025`  
結論：**可由現有候選 HTML、靜態檢查及隔離測試驗證的工作已完成；全頁瀏覽器 E2E、真實音訊及真實資料完整 runtime 仍 NOT RUN/BLOCKED。**

## 1. 基準與候選核對

| 版本 | bytes | SHA-256 | 狀態 |
|---|---:|---|---|
| Candidate295 | 1,720,917 | `aef896eee98c10bcb9fb1f10d6650b8e26067426f43b086e1b69fa12e3674a81` | 唯一正式維護基準、唯讀 |
| Candidate299 | 1,719,884 | `1e7a37cef7a7d791c5dd40f09c2143b2e507dac76c73951e5060b82f5c44c2e4` | 路由候選 |
| Candidate300 | 1,717,671 | `5fea42650ede3b8b779afdf7b61e42365388d41b34e4231988065eb2fb7d34a5` | 清單整合中間候選 |
| Candidate301 | 1,720,241 | `e8eb07ccab26b6e424eda9aed11d1c21b90cca9c544ed2b6843096e3b6762454` | 已知 EMQ loader 回歸 |
| Candidate302 | 1,720,249 | `f718a744057be0a33d371306f1742aaeede90e84f33d9e62ab45f5e6db488abd` | 修正候選，未升格 |

五個 HTML 的本機副本均已重新計算雜湊；Candidate295 與正式基準指紋相符。Stage 6 未修改任何候選 HTML，也未建立 Candidate303。

## 2. 靜態檢查

五個候選的靜態檢查全部 PASS：
- 每個 HTML 有 67 個可執行 inline JavaScript 區塊，語法錯誤 0。
- 每個 HTML 有 109 個 style 區塊、2,808 個 top-level CSS rules，stylesheet parser errors 0、declaration parser errors 0。
- 每個 HTML 有 271 個 ID、271 個唯一值，重複 ID 0。

這是靜態檢查，不代表瀏覽器互動已通過。詳見 `STAGE6_STATIC_AUDIT_RESULTS.json`。

## 3. EMQ loader 回歸與根本原因

新增的 `stage6_emq_loader_regression_tests.cjs` 會從指定 HTML 本身抽取 EMQ loader script，再以合成 gzip/base64 payload 執行。這修正了舊 probe 把 Candidate301 程式硬編碼在測試檔內、換候選參數也不會真正測到該候選的問題。

- Candidate301：9 案例中 4 PASS、5 FAIL，預期重現已知回歸。無效 payload 下 `ready=false`，但公開 `workCount` 仍洩漏暫存 works 數量。
- Candidate302：9/9 PASS。合法 payload 正常載入；缺少 payload、錯誤版本、重複 work ID、AMQ/EMQ ID 衝突、錯誤作品關聯及 malformed song record 都不會進入 ready、不會暴露歌曲／作品數，也不會派發 ready 事件。
- Candidate302 的 `workCount` getter 現在以 `ready` 為閘門。 對 Candidate301 與 Candidate302 實際 HTML 的 unified diff 確認，兩者只有這一行程式碼差異。來源抽取式測試確認此修正有效。
- 合法 payload 但沒有符合 HTTPS 條件的可播放音源，仍視為 ready-empty pool；未擅自改變現有契約。

詳見 `STAGE6_EMQ_REGRESSION_RESULTS.json`。

## 4. 自動化測試

實際執行結果：
- `stage3_emq_loader_synthetic_tests.cjs`: 9/9 PASS。
- `stage4_catalog_validation_tests.cjs`: 11/11 PASS。
- `stage4_pool_regression_tests.cjs`: 11/11 PASS。
- 新的 Candidate302 source-derived EMQ loader suite：9/9 PASS。
- 上述測試腳本的 Node.js `--check`：PASS。

Candidate302 合成／隔離測試合計 40/40 PASS。Candidate301 對照組的五個失敗是預期回歸重現，不是 Candidate302 的測試失敗。這些結果不是完整瀏覽器 E2E。

## 5. 真實資料與 495 首無媒體欄位歌曲

使用者在本機執行資料稽核工具所得：
- `data.js`: 4,975,244 bytes；SHA-256 `692f69f56079d6cc0b30bd1951ab625f53799b87525c1bd52a27f29274703cf3`。
- `emq-data.js`: 2,684,266 bytes；SHA-256 `88441b4a6090c01db1dae23c970a6fa24d457a54f4b915be3e23c3799b3794cc`。
- AMQ：9,516 works / 38,821 songs；ID 有效且唯一、標題與歌手欄位完整。
- EMQ：6,645 works / 16,839 songs；ID 有效且唯一，作品關聯、標題、歌手與音訊候選檢查通過。
- 跨來源作品／歌曲 ID 衝突均為 0，真實資料結構稽核 PASS。

38,326 首 AMQ 歌曲在 row slots `[9]`、`[10]`、`[11]` 至少有一個非空媒體欄位，495 首三欄皆空。Candidate302 的 `mediaFiles()` 使用相同欄位，因此這 495 首不會被目前的媒體提取器視為可播放候選。這不證明原始資料損毀；可能本來就沒有音源。未修改資料，也未捏造逐首檢查結果。

資料檔 SHA-256 只能識別資料檔，不能單獨證明其建置來源對應 Candidate295 或 Candidate302。

## 6. 路由與清單既有證據

- Candidate299 既有受控 DOM 路由矩陣報告為 36/36 PASS。
- Candidate301 既有受控測試記錄清單 adapter、CRUD/UI、播放池及備份還原測試通過。
- 這些測試使用受控 DOM、合成資料或 storage 替身，不等同使用者真實資料下的全頁 E2E。
- Stage 6 沒有刪除歷史 route guards，因為現有靜態證據不足以安全移除。

## 7. 狀態總表

| 項目 | 狀態 | 說明 |
|---|---|---|
| 五個候選的大小／SHA-256 核對 | PASS | 本機實際檔案重算 |
| 五個候選 JS/CSS/HTML ID 靜態檢查 | PASS | 每個候選 67 scripts、109 styles、2,808 rules、271 unique IDs |
| Candidate302 EMQ loader synthetic regression | PASS | 9/9 |
| Candidate302 AMQ catalog validator | PASS | 11/11 |
| Candidate302 source pool/audio/blacklist | PASS | 11/11 |
| Stage 5 使用者本機真實資料結構稽核 | PASS | 使用者提供的 JSON 摘要 |
| Candidate301 invalid/unready workCount regression | FAIL（預期） | 5 個案例重現 |
| Chromium headless local smoke | BLOCKED | 執行環境嘗試逾時，沒有取得 DOM 結果 |
| 正式 HTML 全頁 E2E、真實音訊播放 | NOT RUN / BLOCKED | 不以合成測試代替 |
| 真實資料下 AMQ/EMQ/MIX 全流程 | NOT RUN | 本執行環境未載入使用者本機資料檔 |
| Candidate302 HTML 遠端上傳及 SHA-256 核對 | BLOCKED | Stage 6 遠端分支 tree 沒有候選 HTML；未宣稱上傳成功 |

## 8. 交付與回滾

- Stage 6 分支只新增報告、測試腳本與結果文件；沒有改動正式 HTML。
- Candidate295 保持唯一正式基準。回滾應用程式時使用 Candidate295 原始副本並核對 SHA-256 `aef896eee98c10bcb9fb1f10d6650b8e26067426f43b086e1b69fa12e3674a81`。
- 若不需要 Stage 6 文件，可忽略／刪除 Stage 6 分支，不影響正式 HTML。

## 9. 下一個最高價值工作

1. 在使用者本機用 Candidate302 搭配這兩份資料檔驗收全頁初始化、AMQ/EMQ/MIX、出題／跳過／下一題與實際播放；無需上傳大型資料檔。
2. 如需判斷 495 首無媒體欄位歌曲是否是來源缺陷，應核對上游 schema，不自動補值或猜音源。
3. 使用者或可用上傳通道將 Candidate302 HTML 放到指定 GitHub 分支後，下載遠端原始位元組重算 SHA-256；驗證前不得宣稱遠端產物存在。
4. Candidate295 不得覆蓋或自動升格 Candidate302。


## 後續更新：Candidate302 已依使用者授權升格（2026-10-25）

使用者已明確回報本機驗證完成並要求升格，因此正式維護基準更新為 Candidate302：1,720,249 bytes，SHA-256 `f718a744057be0a33d371306f1742aaeede90e84f33d9e62ab45f5e6db488abd`。Candidate295 保留為回滾基準，不覆寫原始版本。

此升格不代表六項專案清理終點已完成。功能盤點與依賴追蹤仍屬部分完成；重複實作整合與舊程式實際刪除尚未完成；回歸測試與交付驗證仍有缺口。使用者本機驗證是使用者回報的結果，沒有逐項案例紀錄，因此不將其改寫成此環境可重現的自動化 E2E。

Stage 6 分支上的 `BASELINE.md`、`CURRENT_STATUS.md`、`NEXT_TASK.md` 已更新並重新讀取驗證；Candidate302 HTML 本體仍回傳 NOT_FOUND，遠端 HTML 上傳及 SHA-256 對照尚未完成。
