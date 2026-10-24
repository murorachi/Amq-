# Stage 37 — Candidate264 四個工作區 UI 重設

- Candidate：`amq_learning_tool_v82_85_78_candidate264_four_workspace_ui_redesign_20261024.html`
- Version：`v82.85.78-candidate264-four-workspace-ui-redesign-20261024`
- Size：9,368,922 bytes
- SHA-256：`e15f0ff99930b522f2151dd9ccca54ba77a4cfcd52a340323ad55afa91970a88`
- Parent Candidate263 SHA-256：`751114b94fa9897f6f380129a8dd97b90dceab1ef23d20907ca791e318081eb4`

## 修改範圍
1. 自訂清單整理：縮短標題與說明；建立欄位和清單卡片採緊湊橫向配置；常用操作改成圖示＋短標籤；清單內容改成兩欄可捲動列表。既有建立、改名、刪除、加入/移除作品、練習事件與保存邏輯不變。
2. 學習計畫：簡化標題及四種模式的文字；目標、題數、清單與開始操作採響應式控制列。保留探索、補強、自選、間隔複習的原有邏輯與狀態回報。
3. 統計儀表板：原本粉白卡片改用共用深色設計 token；指標卡依可用寬度排列；簡化標題與冗長說明。統計資料計算不變。
4. 歌曲批次整理：標題、搜尋、熟悉度、標籤、黑名單及清單操作改成圖示＋短標籤；工具列使用桌面三欄、窄螢幕兩欄網格。保留所有原有 data-batch action 識別值與處理函式。
5. 共用樣式整合至既有 candidate210-workspace-unification；同時修改舊儀表板與學習系統樣式來源，不新增獨立尾端 CSS 覆蓋區。

## 測試結果
- PASS：67 個可執行 inline JavaScript 區塊語法檢查，錯誤 0。
- PASS：109 個 CSS 區塊解析，錯誤 0。
- PASS：272 個 HTML ID，重複 0。
- PASS：四區模板與共用樣式靜態不變條件。
- NOT RUN：瀏覽器視覺與互動驗收、完整資料操作回歸。
- NOT RUN：GitHub HTML 上傳及遠端 SHA 回讀。

## 未解風險
四區已完成第一輪模板與樣式重設，但尚未在瀏覽器實測多種視窗尺寸、事件及 DOM 行為。靜態檢查不能證明視覺達標。

## 回滾
回到 Candidate263，SHA-256 `751114b94fa9897f6f380129a8dd97b90dceab1ef23d20907ca791e318081eb4`。原檔未覆寫。

## 下一步
在可操作瀏覽器環境驗收四區互動、響應式排列及資料保存；修改完成後再做一次整合回歸，之後才處理 GitHub HTML 上傳與遠端 SHA 驗證。
