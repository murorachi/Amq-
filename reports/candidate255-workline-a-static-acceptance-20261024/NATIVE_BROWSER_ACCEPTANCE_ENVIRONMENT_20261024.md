# Candidate255 原生瀏覽器驗收環境盤點與替代方案

日期：2026-10-24

## Candidate 基準
- 版本：v82.85.69-candidate255-remove-last-quicktools-refs-20261024
- 檔案：amq_learning_tool_v82_85_69_candidate255_remove_last_quicktools_refs_20261024.html
- 大小：9,355,697 bytes
- SHA-256：bd620e42e677ddbc8d48cf84da5773f3a51e42978c20ecbaa07761e467a7630d
- 回滾檔：amq_learning_tool_v82_85_68_candidate254_rollback_before_candidate255_20261024.html
- 回滾 SHA-256：e7fa38897fcec376153b4a8a979ba3fe44775df8e8266a1e17f2d5ecc24934a9

## 瀏覽器環境盤點
- PASS：確認 /usr/bin/chromium 存在。
- PASS：確認 Chromium managed policy /etc/chromium/policies/managed/000_policy_merge.json 設定 URLBlocklist=["*"]。
- PASS：檢查常見替代瀏覽器執行檔；未找到 Firefox、Edge、Google Chrome、Opera 或 Brave。
- PASS：檢查 Playwright browser cache；Chromium、Firefox、WebKit bundles 均不存在。
- PASS：檢查已安裝 browser packages 與 apt cache；只找到 Chromium 套件，沒有可用替代瀏覽器安裝包。
- 決策：不修改系統政策、不繞過 URLBlocklist；在此容器無法進行原生儲存驗收。

## 替代驗收工具包
- 檔案：Candidate255_native_browser_acceptance_kit_20261024.zip（本機生成，尚未上傳 GitHub）。
- 方式：Windows Python 3 標準庫 HTTP 伺服器只綁定 127.0.0.1:8765，透過同源 iframe 載入候選 HTML，直接使用瀏覽器原生 localStorage。
- 設計測試：初始化與 storage 讀寫、工作區路由切換、AniList/MAL 與 VNDB 入口、自訂清單建立、iframe 重新載入後確認保存、嘗試清理測試清單、資源 timing 觀察。
- 產物 SHA-256：候選 HTML 的 SHA-256 已在工具包 manifest 記錄；ZIP SHA-256：f92ec64ec2e19ab503fa9d1600a20bbbd96e668576c076c37767330e16e96ce3。
- 尚未執行：使用者 Windows 瀏覽器實際操作，故所有工具包測試結果均不能預先標為 PASS。

## 既有互動測試的證據界線
- Playwright 測試記錄 16 組應用層操作，並測到工作區切換、匯入入口與自訂清單 CRUD 的部分路徑。
- 這些測試注入 test-only in-memory localStorage shim；它們不是持久化測試。
- 靜態檢查：67 個 inline JS 區塊通過 node --check；109 個 CSS 區塊解析無錯；272 個 DOM ID 無重複；指定舊 Quick Tools 控制項在 HTML 註解以外為零引用。
- 外部 API、真實音訊、多人連線、osu!stable 像素比較：NOT RUN。

## GitHub 狀態
- 目標 repo：murorachi/Amq-
- 分支：amq-candidate255-last-quicktools-reference-cleanup-20261024
- 已查詢正式 HTML 路徑 dist/amq_learning_tool_v82_85_69_candidate255_remove_last_quicktools_refs_20261024.html：404 NOT FOUND。
- 正式 HTML 尚未上傳；遠端檔案版本與 SHA-256 尚未驗證。

## 結論
- 原生瀏覽器環境盤點：PASS。
- 原生儲存與重新載入持久化：BLOCKED / NOT RUN，等待工具包在一般 Windows 瀏覽器執行。
- Batch 3：未完成。不得開始 Batch 4。
