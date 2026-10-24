# Candidate255 批次三殘留入口清理與中斷盤點

- 版本：v82.85.69-candidate255-remove-last-quicktools-refs-20261024
- 產物：amq_learning_tool_v82_85_69_candidate255_remove_last_quicktools_refs_20261024.html
- 大小：9,355,697 bytes
- SHA-256：bd620e42e677ddbc8d48cf84da5773f3a51e42978c20ecbaa07761e467a7630d
- 父候選／直接回滾檔 Candidate254：SHA-256 e7fa38897fcec376153b4a8a979ba3fe44775df8e8266a1e17f2d5ecc24934a9，原檔保留且 byte-identical。

## 盤點發現
Candidate252 以後已移除舊 #quicktools 面板與多組舊控制項，但 Candidate254 還有兩個殘留點：
1. batch-tools 自動化分支仍等待舊 quicktools 元素，會導致入口錯誤回報。
2. Song Select 動態掛載清單仍嘗試搬移 quicktools。

## Candidate255 修改
- 將 batch-tools 改為呼叫正式 window.__amqCandidate210OpenWorkBatchWorkspace；若工作區尚未初始化，先嘗試切回 catalog 並有限次等待；只在正式面板節點確實掛載時回報成功。
- 從 Song Select 動態掛載清單刪除 quicktools，保留 gridCounter、empty、loadMoreWrap。
- 不改動資料 schema、作品批次業務 API、歌曲批次模組、自訂清單資料層或匯入 modal。

## 驗收結果
- PASS：67 個可執行 inline JavaScript 區塊 node --check，0 syntax errors。
- PASS：109 個 CSS 區塊解析，0 parser errors。
- PASS：272 個 DOM ID，0 重複。
- PASS：16 個舊控制項／面板／初始化／Observer 名稱，在 HTML comments 以外引用數均為 0。
- PASS：靜態斷言確認 batch-tools 使用正式工作區、Song Select 不再引用 quicktools，且自訂清單儲存 key、Candidate210 歌曲批次、作品批次 API 與原有匯入 modal 結構仍在。
- BLOCKED：Playwright page.set_content() 的 DOMContentLoaded 約 3.49 秒完成，但文件是 opaque origin，Chromium 拒絕讀取 localStorage。觀察到 2 個 page errors 與 1 個 console error，作品批次／歌曲批次全域尚未初始化；此結果不能算作應用程式驗收 PASS。
- NOT RUN：四工作區完整互動、批次操作 UI、清單 CRUD、持久化 reload、真實音訊、即時 API、多人、osu!stable 像素差異。
- BLOCKED／NOT VERIFIED：原生 file:// 受 Chromium managed URLBlocklist=["*"] 阻擋；GitHub HTML 上傳與遠端 SHA-256 尚未驗證。未修改系統管理政策。

## 批次三未完成清單
1. 在可用且允許 storage 的瀏覽器 origin 完成首頁初始化與四工作區反覆切換、返回路由及 DOM 清理驗收。
2. 實測作品批次的看番狀態、熟悉度、佇列、自訂清單加入／移出、弱點、黑名單、SRS；驗證作品／歌曲選取集合隔離。
3. 從「我的清單」開啟批次時驗證範圍只限目前清單，並覆蓋空清單、搜尋零結果、路由切換。
4. 實測自訂清單建立、加入、移除、篩選、重新命名、刪除及真正 reload 持久化。
5. 實測 AniList／MAL 與 VNDB 匯入入口、錯誤處理、資料格式與去重。
6. 建立可重現的非 opaque-origin E2E 環境，並重新執行完整測試。
7. 嘗試上傳正式 HTML；讀回遠端檔案並核對版本與 SHA-256。

## 結論
舊批次介面及其已確認殘留引用已從本機 Candidate255 清除；靜態驗證 PASS。批次三整體仍未完成，因關鍵瀏覽器互動、資料持久化與遠端正式產物驗證未完成。不得開始批次四。

## 回滾
以同包 Candidate254 回滾 HTML 覆蓋 Candidate255，即回到修改前版本。
