# AMQ 死功能清理與架構收斂進度 — Candidate222

日期：2026-10-24

## 本階段
- [x] 核對 Candidate221 父版本檔案大小與 SHA-256。
- [x] 確認 `wsBatchListAdder` 顯示條件與正式工作區標題不相容。
- [x] 移除不可達橋接 markup、專屬 handler、同步器、observers/listeners 與專屬 CSS。
- [x] 保留作品層級 `quicktools` 批次能力。
- [x] 保留歌曲層級 Candidate210 批次能力。
- [x] 保留 VNDB 動作、共用選取範圍摘要與既有儲存格式。
- [x] 產生 Candidate222 和 byte-identical Candidate221 rollback。
- [x] 執行 JS syntax、CSS parse、靜態依賴斷言。
- [ ] 瀏覽器互動驗收：BLOCKED / NOT RUN，環境缺少可用 Chromium binary。
- [ ] GitHub HTML 上傳及遠端 SHA-256 驗證：BLOCKED，connector 未提供本機大檔案路徑上傳。

## Candidate222
- 檔案：`amq_learning_tool_v82_85_46_candidate222_unreachable_batch_bridge_cleanup_20261024.html`
- 大小：9,348,268 bytes
- SHA-256：`39d9962c38ab928f51969237063230e8f77dc6f9416f8bf9691b12c48522c723`
- 父版本 Candidate221：9,353,751 bytes，SHA-256 `77a754fce6117153063d7f00f44640c88f553a6893b78804f4b3573e162749f5`
- 差異：刪除 5,483 bytes 的不可達橋接層，未刪除作品批次或歌曲批次正式實作。

## 下一步
1. 在可用 Chromium 環境驗收兩種批次入口及工作區切換。
2. 追蹤 `quicktools` 所有控制項的 listener、存取資料與唯一業務 owner。
3. 只有在 parity 測試通過後，才刪除其他重複的 markup、handler、observer 或 CSS。
4. 以可上傳本機大檔的 GitHub 工作流提交 HTML 並讀回驗證 SHA-256。