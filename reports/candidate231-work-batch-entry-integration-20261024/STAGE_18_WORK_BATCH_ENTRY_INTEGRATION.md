# Candidate231：作品批次入口整合與執行驗收

日期：2026-10-24

## 基準與產物

- 父程式 Candidate229：9,366,832 bytes，SHA-256 8d9c9c9fff823d3e333875aeb07ada9fd73976dd64d55e6cdc2c6471f06e0448。
- Candidate229 原始檔未修改。回滾副本已用 cmp 確認與父程式逐位元相同。
- Candidate231：amq_learning_tool_v82_85_46_candidate231_work_batch_entry_integration_20261024.html，9,367,325 bytes，SHA-256 74607e5344e0b993fb1e8d40c081285287071c236c9c92bac86cac98c5c9fecf。

## 根本原因與修改

主工作區 list-batch-works 原本導向 Catalog 後等待舊 quicktools 並捲動至該區塊。quicktools 在 Song Select 路由下不保證可見，入口可能回報已開啟，卻沒有顯示可操作的作品批次面板。

Candidate231 將 Candidate210 已存在的 openWorkBatch 公開為明確入口，並讓 list-batch-works 直接開啟既有作品批次面板。若模組尚未初始化，先導向 Catalog 並等待既有模組完成初始化。只有在面板節點真正掛載後才回報成功。

沒有複製業務邏輯、改動資料 schema 或儲存鍵，也沒有刪除 quicktools、舊圖鑑控制項、listener、Observer 或 CSS。Candidate210 歌曲批次與 AniList/MAL/VNDB 匯入保持原狀。

## 測試結果

- PASS：父程式與回滾檔大小、SHA-256 核對；回滾檔 byte-identical。
- PASS：67/67 可執行 inline JavaScript 區塊通過 node --check；2 個非執行 payload 排除。
- PASS：109 個 CSS 區塊，0 parser errors。
- PASS：Playwright 記憶體儲存測試中，主工作區動作實際掛載作品批次面板並列出 9,516 部作品。
- PASS：可見面板選取 2 部作品加入測試清單，顯示「已加入 2 部作品的自訂清單」，資料包含 ID 1、2。
- PASS：模擬儲存失敗時，面板明確顯示保存失敗，未顯示成功訊息。
- PASS：空選取被拒絕；取消選取全部 9,516 部作品後，選取數維持 0。
- PASS：12 次反覆關閉／重新開啟作品批次面板。
- PASS：業務 API 六種看番狀態、四種熟悉度、七種作品操作、缺少清單／空選取／非法狀態、301 部作品確認接受與取消、儲存失敗回滾、作品選取集合替換。
- PASS：0 uncaught page errors、0 console errors。
- 限制：測試使用 HTML head 前置注入的記憶體型 storage shim 和合成測試清單，不等同原生檔案開啟或重新載入持久化驗收。
- BLOCKED：原生 file:// 與 reload 持久化仍受 Chromium managed URLBlocklist 封鎖；沒有修改系統政策。
- NOT RUN：真實音訊、即時 API、多人連線、固定 osu!stable 參考圖像素比對。
- NOT DONE：Candidate231 HTML 未上傳 GitHub，遠端 HTML SHA-256 未驗證。

## 依賴決策

保留可見作品批次面板、Candidate228 業務 API、Candidate210 歌曲批次及 AniList/MAL/VNDB 匯入。quicktools、bulkPracticeAction、bulkCustomList、applyBulkPracticeAction 與相關 listener/Observer/CSS 仍有其他呼叫點，不能整組刪除。需在後續逐一遷移或證明棄用後才可刪除。

## 回滾與下一步

使用 Candidate229 byte-identical 回滾檔即可撤銷本階段變更，原始 Candidate229 保持不動。

下一步：將仍定位舊 applyBulkPracticeAction 的工作區動作改接正式 API 或可見面板；追查 quicktools 在 watchlist 的實際用途及 syncListSelectors 的依賴；最後在允許原生 URL 的環境驗收持久化，再嘗試正式 HTML 遠端上傳與 SHA 驗證。
