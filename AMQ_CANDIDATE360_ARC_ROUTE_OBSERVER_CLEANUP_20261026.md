# Candidate360：移除弧線重複路由觀察器

- 父候選版：Candidate359
- 正式基準：Candidate302（未變更）
- 檔案：amq_learning_tool_v82_86_71_candidate360_remove_redundant_arc_route_observer_20261026.html
- 大小：1,610,053 bytes
- SHA-256：9ac93c28ba456cfd4f5b7b1694d8178da9505c119fb52fff9fe8ae5bff31b923

## 本批修改
- 移除 Candidate72 弧線 runtime 對 body.class 的 MutationObserver。
- 移除每次路由變更時對 #amqSongSelectCurvedFrame.style.display 的重複寫入。
- 保留一次性建立弧線 DOM 的邏輯。弧線顯示狀態由既有 CSS 統一管理。
- Candidate115 artwork observer 與其他功能未修改。

## 驗證
- 內嵌可執行 JavaScript 語法：PASS，檢查 63 個 script，0 syntax errors。
- HTML ID 唯一性：PASS，0 duplicates。
- CSS 解析：PASS，0 errors；87 style blocks、2,627 qualified rules、9,620 declarations。
- 弧線 runtime 不再包含 MutationObserver 或 inline display 寫入：PASS。
- 真實瀏覽器回歸：NOT RUN。
- GitHub HTML 上傳與遠端 SHA-256 讀回：NOT VERIFIED。

## 回滾
回到 Candidate359：amq_learning_tool_v82_86_70_candidate359_remove_dead_songselect_shortcuts_20261026.html，1,610,257 bytes，SHA-256 e67498b5d3fbad2424ce06021d523a85a79370b09327022a77cadbd0ec6a28bd。

## 尚未處理
- Candidate115 是非主清單的 AMQ/EMQ 內嵌歌曲列表 artwork/選取行為，目前保留。
- Candidate360 仍為實驗候選版，未升格正式基準。
