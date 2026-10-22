# Candidate 116 — 左側導覽與資訊層級

基準 Candidate 115 SHA-256 `7e24020480515fd8a4fad34907de9a4da1694abf998c2ae933a005b64f5ff1b1`.

產物 `amq_learning_tool_v82_85_46_workspace_proto44-osu-songselect-ui_116.html`; 9,235,279 bytes; SHA-256 `78e665ad23ee21c9b0ab5c644f0bba2be3d311d8fee0e2015cf5fbaab06fe756`.

修改：固定左側入口由 8 個混合操作縮減為 AniList/MAL 匯入、VNDB 匯入、自訂清單管理、學習計畫四個目的地；以「資料來源與清單」和「學習工作區」分組；移除常駐批次勾選與探索/弱點/自選練習/間隔複習捷徑；移除只有佔位文字的統計彈窗，改接既有儀表板入口；統計卡改放在導覽項目下方，避免與底部播放器重疊。

測試：9 PASS / 0 FAIL；62 個內嵌腳本語法檢查 0 錯誤；90 個 style blocks、2,569 條 CSS 規則、0 解析錯誤；自訂清單入口實際打開既有清單頁。統計儀表板點擊流程 NOT VERIFIED，隔離瀏覽器測試逾時，不算通過。

未驗證：AniList/MAL、VNDB 真實 API；真實音訊；重新載入後資料持久性；完整 osu!stable 像素比對；HTML 二進位上傳與遠端 SHA-256。Candidate 116 是部分候選版，不是正式驗收版。