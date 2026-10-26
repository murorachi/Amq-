# Candidate366 單次最終瀏覽器驗收清單

- 候選檔：amq_learning_tool_v82_86_77_candidate366_finalize_songselect_song_only_view_20261026.html
- 大小：1,608,200 bytes
- SHA-256：38e345a12a396cbd8bcaeaa55e6e903c591517a1fab5aaa8cc99ed8b4d17859d
- 正式基準：Candidate302（不可覆寫）
- 狀態：NOT RUN（真實資料環境）。隔離測試曲庫的 16 項自動探測已 PASS，但不能代替此清單。

## Song Select 頁面
- [ ] NOT RUN：真實曲庫載入，歌曲標題、歌手、歌曲類型正確。
- [ ] NOT RUN：搜尋作品／歌曲，清除搜尋後完整清單恢復。
- [ ] NOT RUN：年代、作品類型、排序、熟悉度、看番狀態及標籤篩選可用。
- [ ] NOT RUN：選取歌曲後選取狀態與播放器資訊同步。
- [ ] NOT RUN：AMQ、EMQ、MIX 模式切換正確，來源符合設定。
- [ ] NOT RUN：真實音訊播放、暫停／繼續、上一首／下一首及佇列操作正常。
- [ ] NOT RUN：熟悉度、標籤、黑名單及批次整理入口正常，沒有誤改資料。
- [ ] NOT RUN：清單匯入、VNDB 匯入、自訂清單與學習工作區入口可開啟，返回／關閉正常。
- [ ] NOT RUN：Escape 只關閉預期面板；返回與工作區切換不會卡住。
- [ ] NOT RUN：桌面、390px 與 320px 版面控制均可操作，沒有裁切或水平溢出。
- [ ] NOT RUN：舊版重複 Back 與場景背景 quick-open 不復活；弧線裝飾在工作區狀態隱藏正確。
- [ ] NOT RUN：控制台沒有新的未處理錯誤。

## 核心整合抽查
- [ ] NOT RUN：回首頁再進入 Song Select，清單與模式可重新初始化。
- [ ] NOT RUN：重新載入後，原有清單、熟悉度與標籤資料保留。
- [ ] NOT RUN：多人服務器不可用時，將多人生命週期標為 BLOCKED。

## 結果
- PASS：___  FAIL：___  BLOCKED：___  NOT RUN：___
- 瀏覽器／作業系統：___
- 已確認測試檔 SHA-256 與本清單一致：YES / NO
- 整體狀態：PASS / FAIL / BLOCKED / NOT RUN

只有實際操作成功的項目才能標記 PASS。Candidate346 的舊測試紀錄不自動適用於 Candidate366。
