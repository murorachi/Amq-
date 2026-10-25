# Candidate296 路由整併階段報告

日期：2026-10-25

## 基準與候選
- 基準 Candidate295：`index-old.html`
- 基準版本：`v82.86.06-candidate295-db-extraction-20261025`
- 基準大小：1,720,917 bytes
- 基準 SHA-256：`aef896eee98c10bcb9fb1f10d6650b8e26067426f43b086e1b69fa12e3674a81`
- 候選檔：`amq_learning_tool_v82_86_07_candidate296_route_guard_consolidation_20261025.html`
- 候選版本：`v82.86.07-candidate296-route-guard-consolidation-20261025`
- 候選大小：1,719,843 bytes
- 候選 SHA-256：`ec94f1daabdcc0b3151ba45b50d1e42d5ed5ddbf9ff4861050285cb44e94bddc`
- Candidate295 原始檔未覆寫。

## 修改
移除早期 Song Select route wrapper（27 行、1,278 bytes），保留 final Song Select guard 與 generic workspace/body-class guard。六個路由映射完全相同：watchlist、practice、explore、learningPlan、dashboard、vnList。Final guard 額外關閉 home menu，且位於 generic guard 外層，攔截時提前返回；這個既有副作用及攔截時的 body-class 行為均保留。頁面內嵌 build marker 與 title 已更新為 Candidate296。

此為靜態呼叫順序支持的最小整併；因瀏覽器執行環境受阻，不能宣稱執行時等價已驗收。

## 測試
- PASS：67/67 executable inline JavaScript blocks 通過 Node.js `--check`。
- PASS：109 個 style 區塊、2,808 個 qualified CSS rules，stylesheet/declaration parse errors 均為 0。
- PASS：HTMLParser 解析 271 個 DOM ID，無重複。
- PASS：Song Select route map 由兩份降為一份；早期 guard marker 0；final guard 與 generic guard 保留。
- PASS：Candidate295 原檔雜湊未變。
- BLOCKED：瀏覽器路由、body class、home menu、返回/切換及重複初始化驗收（環境曾回報 ERR_BLOCKED_BY_ADMINISTRATOR）。
- BLOCKED：完整 AMQ/EMQ 資料載入驗證，因工作目錄缺少 data.js、emq-data.js。
- NOT RUN：CRUD、儲存/重載、備份還原、音訊及多人遊戲回歸。

## 仍需保留的資料依賴
- AMQ 主資料由 `data.js` 提供 `DB.anime` 與 `DB.songs`；`useDB()` 會驗證作品/歌曲 ID 唯一性並先保存 IndexedDB，再替換記憶體資料。
- EMQ 由 `emq-data.js` 提供資料來源，後續 API 維護 rows/works 與 ID 索引；EMQ 清單 keys 為 `aniEmqWorkListsV8254`、`aniEmqWorkListsSelectedV8254`、`aniEmqAudioOverridesV8254`。AMQ 的 `animeIds` 與 EMQ 的 `workIds`/`vndbIds`/`songIds` 不可直接合併。
- AMQ 自訂清單 canonical key 為 `aniCustomPracticeListsV1`，store 為 `window.__aniCustomListsStoreV1`，membership adapter 為 `window.__aniCustomListMembershipV1`。四處 runtime fallback 仍在，不能在缺少互動測試時直接刪除；下一步設計單一相容 adapter，明確區分讀取失敗與合法空清單。
- 備份匯入/匯出對 AMQ 與 EMQ keys 的直接存取屬於備份邊界，應保留並測試。

## 回滾
使用原始 Candidate295 檔案；Candidate295 未被覆寫。不要將 Candidate296 覆蓋回基準。

## 下一步
1. 驗證 Candidate296 的 route matrix、攔截事件次數、dashboard body class、home menu 關閉與返回流程。
2. 集中四處 AMQ fallback reader，先定義 canonical-store 故障與空清單的差異。
3. 取得 data.js、emq-data.js 後驗證 loader schema、ready 狀態、實際筆數及跨模式歌曲池。
4. 再做 CRUD/持久化/備份回歸後評估進一步整併。
