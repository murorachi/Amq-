# 下一步：完成批次三持久化與遠端產物驗收

目前本機候選 Candidate255：`amq_learning_tool_v82_85_69_candidate255_remove_last_quicktools_refs_20261024.html`，9,355,697 bytes，SHA-256 `bd620e42e677ddbc8d48cf84da5773f3a51e42978c20ecbaa07761e467a7630d`。回滾 Candidate254 SHA-256 `e7fa38897fcec376153b4a8a979ba3fe44775df8e8266a1e17f2d5ecc24934a9`。

## 工作線 A 已完成的靜態工作
- PASS：67 個可執行 JS 區塊語法、109 CSS 區塊解析、272 DOM IDs 唯一。
- PASS：16 個已刪除舊 UI／控制項／Observer／初始化識別字零殘留引用。
- PASS：18 項批次 API、作品／歌曲選取程式碼所有權、自訂清單資料結構與失敗處理靜態契約。
- PASS：9/9 篩選 UI 測試；記憶體 shim 下 16 種批次 API 動作、自訂清單 CRUD／篩選、工作區路由測試。
- 限制：跨面板選取隔離的新增直接互動探測逾時，僅有靜態所有權 PASS；不得稱為 runtime PASS。所有 shim 測試不代表 durable persistence。

## 批次三剩餘工作
1. 取得允許持久化的測試 origin，實測自訂清單建立、加入、移除、篩選、改名、刪除與 reload 保存。
2. 在可用環境重做作品／歌曲跨面板選取隔離互動測試，並驗證四工作區反覆切換／返回及 DOM 清理。
3. 驗證 AniList/MAL 與 VNDB 實際 API 的錯誤處理、資料格式與去重。
4. 嘗試上傳 Candidate255 HTML，讀回遠端版本、大小與 SHA-256；目前仍未驗證。
5. 更新最終驗收報告。只有必要互動、持久化與遠端產物核對完成後，才通知批次三完成並等待批次四。

限制：Chromium managed URLBlocklist 阻擋 file://／localhost；不修改系統政策。不得把記憶體 shim 測試標成持久化 PASS。批次三未完成前不得開始批次四。

## 執行順序更新（2026-10-24）
1. 原生瀏覽器環境盤點已完成：容器只有受 URLBlocklist 封鎖的 Chromium，沒有其他瀏覽器或 Playwright browser bundles。
2. 已製作 `Candidate255_native_browser_acceptance_kit_20261024.zip`，等待在使用者一般 Windows 瀏覽器執行並回收 JSON 報告。原生 localStorage 持久化仍 NOT RUN/BLOCKED。
3. 根據原生測試結果完成工作區切換、作品／歌曲選取狀態隔離回歸測試。
4. 實際操作 AniList／MAL 與 VNDB 匯入，分開記錄 UI 入口、外部請求、回應解析、錯誤恢復；不得用資源載入紀錄代替 API 成功證據。
5. 將 Candidate255 HTML 上傳至本分支唯一正式路徑，回讀遠端檔案並計算 SHA-256，必須與本機 `bd620e42e677ddbc8d48cf84da5773f3a51e42978c20ecbaa07761e467a7630d` 相符。
6. 更新測試報告、`CURRENT_STATUS.md`、`BASELINE.md`、`NEXT_TASK.md` 與交付紀錄；所有未實測項目維持 NOT RUN/BLOCKED。Batch 3 未完成前不可開始 Batch 4。

## 原生瀏覽器回報後的更新（2026-10-24）
- PASS：使用者一般瀏覽器原生 localStorage 可讀寫；透過 UI 建立暫存自訂清單，重新載入後仍存在，最後透過 UI 刪除。
- PASS（有限範圍）：工作區內容面板切換與動畫／VNDB 匯入入口存在。
- NOT RUN：正式路由、返回行為、DOM 清理及作品／歌曲選取隔離。切換 watchlist/dashboard/learningPlan 後 active view 仍為 catalog，因此原報告的 PASS 不能代表正式路由已驗收。
- NOT RUN：AniList/MAL 與 VNDB 真實 API 回應、資料解析、去重及錯誤恢復。Resource Timing 不構成 API 成功證據。
- 待辦：上傳 Candidate255 正式 HTML 至此分支，回讀遠端內容並核對大小與 SHA-256 `bd620e42e677ddbc8d48cf84da5773f3a51e42978c20ecbaa07761e467a7630d`。
- Batch 3 未完成；完成互動驗收、真實 API 與遠端產物核對前不得開始 Batch 4。

## Candidate256 追加修正（2026-10-24）
- Candidate255 原生瀏覽器驗收：自訂清單建立、reload 持久化、UI 清理 PASS。
- 追加回歸發現歌曲批次整理在開啟模態面板時清空選取。Candidate256 已移除該自動清空；候選 SHA-256 `e5c65158ebee5ca69f051366a095e50f0d5f8992f5e89cef3209767adccc77d1`。
- Candidate256 測試：JS/CSS/DOM 靜態檢查 PASS；篩選 9/9 PASS；工作區面板 3 輪共 15 項斷言 PASS；歌曲選取保留與作品／歌曲選取隔離 PASS。這些互動測試使用記憶體 shim。
- NOT RUN：Candidate256 原生儲存、真實 AniList/MAL/VNDB API。
- BLOCKED：正式 HTML GitHub 上傳與遠端 SHA-256。Batch 3 未完成。
