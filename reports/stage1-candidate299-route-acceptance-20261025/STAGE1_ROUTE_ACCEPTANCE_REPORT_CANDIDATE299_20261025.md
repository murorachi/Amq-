# AMQ 第一階段：Song Select／工作區路由整體驗收報告

日期：2026-10-25  
階段：第一階段，原清單 R01–R08  
狀態：**程式修改與受控路由矩陣 PASS；正式本機資料環境驗收仍 BLOCKED，尚不能宣告整個階段完全驗收。**

## 1. 基準與產物

### 正式維護基準（保持不變）
- Candidate295：`index-old.html`
- 版本：`v82.86.06-candidate295-db-extraction-20261025`
- 大小：1,720,917 bytes
- SHA-256：`aef896eee98c10bcb9fb1f10d6650b8e26067426f43b086e1b69fa12e3674a81`
- Candidate295 未覆寫，雜湊重新核對一致。

### 第一階段候選
- 檔案：`amq_learning_tool_v82_86_10_candidate299_route_acceptance_20261025.html`
- 版本：`v82.86.10-candidate299-route-acceptance-20261025`
- 大小：1,719,884 bytes
- SHA-256：`1e7a37cef7a7d791c5dd40f09c2143b2e507dac76c73951e5060b82f5c44c2e4`
- 父候選：Candidate298，SHA-256 `5fa8f137c9aa6b3fdaafbadff44fec846673bcc1617ad94b2d6f484e8d74ac4a`
- Candidate299 尚未取代 Candidate295 成為正式基準。

## 2. 根本原因與修改

1. **延遲初始化會重新包裝 Song Select 路由守衛。** 通用守衛在 0ms／80ms 重試安裝，而最外層 Song Select 守衛未標記 `__amqWorkspaceGuarded`。在 Song Select 攔截分支提前返回後，外層通用守衛仍可能套用 `amq-standalone-route` 等副作用。Candidate299 為最外層守衛加上既有守衛標記，阻止重複包裝。
2. **被攔截的路由沒有先關閉首頁覆蓋選單。** 關閉選單原本只在非攔截路徑執行。Candidate299 在成功攔截前先呼叫現有 `__aniSetHomeMenuOpenV846(false)`。
3. **工作區 body class 有兩個互相競爭的寫入者。** 舊路由守衛以延遲計時器移除 `amq-workspace-active`，而工作區可見性觀察器依目前路由重新計算該 class。Candidate299 刪除舊的延遲移除器與重複寫入，將 `amq-workspace-active` 交由既有 `syncWorkspaceVisibility` 單一負責；路由守衛只管理 `amq-standalone-route`。
4. **非 Song Select 狀態下 `vnList` 不是基礎 navigator 的合法 view。** 原始 `showView` 會把它退回首頁。Candidate299 改走現有 `__aniVnLibraryV8249.openList()`，重用既有 VN 清單路由，不複製清單邏輯。

沒有刪除 AMQ／EMQ 資料、清單、答題或多人遊戲功能；沒有修改 Candidate295 原始檔。

## 3. 驗收結果

### PASS
- **JavaScript 語法：67/67** 個可執行 inline script 通過 Node.js `--check`。
- **CSS 靜態解析：** 109 個 style 區塊、2,808 個 top-level qualified rules；stylesheet-level parser errors = 0。
- **HTML ID：** 271 個 ID、271 個唯一值，重複 ID = 0。
- **路由矩陣：36/36 assertions PASS，0 FAIL，0 page errors**，在 Chromium 受控 DOM harness 執行；測試以空的合成 `DB={anime:[],songs:[]}`、無 EMQ payload 及測試用儲存替身隔離路由邏輯。
  - Song Select 啟用時六個路由：`watchlist`、`practice`、`explore`、`learningPlan`、`dashboard`、`vnList`，均開啟正確面板標題、每次派發一個攔截事件、關閉首頁覆蓋選單。
  - Song Select 啟用時六個路由不殘留 `amq-standalone-route` 或 `amq-workspace-active`。
  - 六個路由在 Song Select 停用時均不派發攔截事件；`vnList` 走既有 VN 清單 API，開啟 VN 清單而不是退回首頁。
  - `dashboard` 的 standalone class 規則正確。
  - `home`、`quiz`、`multiplayer` 在 Song Select 啟用時仍走正常 navigator，沒有被工作區攔截，首頁覆蓋選單關閉。
  - 六個工作區面板的「功能列表」返回均關閉面板，且不重複派發攔截事件。
  - 延遲守衛安裝後連續導向兩個工作區，仍各派發一次事件，沒有重新引入 standalone class。
- **基準完整性：** Candidate295 大小與 SHA-256 未變。

### BLOCKED
- 直接導覽 `file:///...html` 與本機 HTTP 測試網址皆遭此執行環境的 Chromium 回報 `ERR_BLOCKED_BY_ADMINISTRATOR`。因此上述 PASS 是 `set_content` 受控 DOM harness 的實際執行結果，不是使用者雙擊正式 HTML 的端到端驗收。
- 工作目錄缺少 `data.js`、`emq-data.js`。真實 AMQ／EMQ 曲庫載入、實際 VN 資料、非空學習統計與真實資料下的面板渲染仍 BLOCKED。
- Candidate299 HTML 的 GitHub 上傳與遠端 SHA-256 驗證尚未完成；目前只可確認文字報告可透過 GitHub connector 更新，執行環境無法直接連線 GitHub 上傳大型 HTML。

### NOT RUN
- 真實資料下的全頁視覺驗收、瀏覽器歷史返回／前進、實際音訊播放、多人連線及資料持久化。這些不屬於受控路由矩陣可證明的範圍。

## 4. 第一階段 R01–R08 狀態

- R01 路由入口／六個映射盤點：PASS（依既有盤點，未重做整份依賴盤點）。
- R02 重複 Song Select guard 整併：PASS（Candidate296 已移除早期重複 wrapper；Candidate299 修正延遲重包裝）。
- R03 選單關閉、事件、body class 責任：受控 harness PASS。
- R04 六個工作區路由：受控 harness PASS。
- R05 首頁／答題／多人模式正常導向：路由層 PASS；實際多人連線 NOT RUN。
- R06 啟用／停用時的 route class：受控 harness PASS。
- R07 延遲守衛安裝與重複事件：受控 harness PASS。
- R08 工作區面板返回／關閉：受控 harness PASS；正式本機瀏覽器返回流程仍 BLOCKED。

## 5. 回滾

若 Candidate299 出現回歸，捨棄 Candidate299，回到未修改的 Candidate295：`index-old.html`，SHA-256 `aef896eee98c10bcb9fb1f10d6650b8e26067426f43b086e1b69fa12e3674a81`。不得將 Candidate299 覆蓋回 Candidate295。

## 6. 下一步

先在使用者本機將 Candidate299 與正確配套的 `data.js`、`emq-data.js` 放在同一資料夾，確認六個工作區、首頁選單、返回與 VN 清單路由。這項本機驗收完成前不啟動第二階段。之後才處理 AMQ 自訂清單 fallback adapter 與 CRUD／持久化。
