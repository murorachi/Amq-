# 下一步：驗收 Candidate257 清單同步 UI 試點（2026-10-24）

## 本次試點
- 候選：`amq_learning_tool_v82_85_71_candidate257_unified_public_list_import_ui_20261024.html`，9,356,282 bytes，SHA-256 `4769f24b643f3a044e75795b36222dfa3e7681232d0d93db4300b09e475acb6a`。
- 回滾：Candidate256，9,355,585 bytes，SHA-256 `e5c65158ebee5ca69f051366a095e50f0d5f8992f5e89cef3209767adccc77d1`。
- 先在原生瀏覽器確認左側 AniList／MyAnimeList／VNDB 入口都進入同一頁面，三個來源各只有匯入公開清單及移除本機清單兩個主要操作；確認沒有彈出舊視窗或切到獨立 VNDB 頁。
- 實測空值、錯誤 Username、匯入成功、取消移除、確認移除；確認 AniList/MAL 只刪除各自來源寫入的看番狀態，VNDB 只清除 VNDB 本機清單，手動狀態及其他來源不受影響。
- 然後再測試真實 AniList/MAL/VNDB API 的回應解析、去重、失敗復原；不得要求使用者提供密碼或私人 Token。
- 最後嘗試上傳大型 HTML 並讀回核對版本、大小、SHA-256；無法上傳就明確標記 BLOCKED／NOT VERIFIED。
- Candidate257 是 UI 風格試點，不是已接受正式基準；其他左側工作區功能先不改，等使用者確認風格後再規劃。
- Batch 3 尚未完成，不得提前開始 Batch 4。

---

# 下一步：完成批次三外部 API 與遠端產物驗收

## 最新候選與回滾
- Candidate256：`amq_learning_tool_v82_85_70_candidate256_song_batch_preserve_selection_20261024.html`，9,355,585 bytes，SHA-256 `e5c65158ebee5ca69f051366a095e50f0d5f8992f5e89cef3209767adccc77d1`。
- Candidate255 回滾：`amq_learning_tool_v82_85_69_candidate255_remove_last_quicktools_refs_20261024.html`，9,355,697 bytes，SHA-256 `bd620e42e677ddbc8d48cf84da5773f3a51e42978c20ecbaa07761e467a7630d`。
- Candidate256 僅修正歌曲批次面板開啟時清空歌曲選取的根因；保留 Candidate255 作回滾，不覆蓋原檔。

## 最新驗收證據（使用者原生瀏覽器，2026-10-24 12:16 UTC）
- PASS 7、FAIL 0、NOT RUN 1、BLOCKED 0。
- PASS：頁面初始化；共用內容面板切換；匯入入口存在；歌曲批次選取保留；作品／歌曲選取隔離；`aniCustomPracticeListsV1` 原生 localStorage reload 持久化；暫存測試清單經 UI 刪除。
- 選取證據：180 個歌曲核取方塊，開啟批次面板後仍保留 1 首已選歌曲；作品 ID `1` 的選取狀態同時維持且互相隔離。
- NOT RUN：外部 API 實際功能。Resource Timing 的 `api.xml` 請求不代表解析／匯入／去重／錯誤復原通過。
- GitHub HTML 上傳及遠端大小、版本、SHA-256 核對仍未完成。Candidate256 仍是候選而非正式基準。

## 後續順序
1. 在隔離瀏覽器工作階段，分別實測 AniList/MAL 與 VNDB 匯入：成功回應、資料解析、去重、無效輸入、網路／CORS／服務端錯誤及 UI 復原；記錄實際請求與結果，不要求使用者提供密碼或私人 token。
2. 重新確認目標分支與遠端檔案路徑，再尋找可承載 9.36 MB HTML 的上傳方式。上傳後讀回遠端內容，核對版本、位元組數及 SHA-256，否則標記 BLOCKED／NOT VERIFIED。
3. 保存原生瀏覽器 JSON 報告，更新工程紀錄並核對三份狀態文件。
4. 只有上述必要 API 驗收與遠端產物核對完成後，才考慮關閉 Batch 3；不得提前開始 Batch 4。

## 狀態分類
- Candidate256 原生初始化、選取回歸、清單 reload 持久化：PASS（依使用者提供的原生瀏覽器報告）。
- 真實 AniList/MAL/VNDB API 功能：NOT RUN。
- GitHub 正式 HTML 上傳與遠端 SHA-256：NOT VERIFIED；目前尚無遠端 HTML 證據。
- Batch 3：未完成。
