# AMQ 死功能清理與架構收斂進度 — Candidate223 稽核階段

日期：2026-10-24

## 基準
- 起點 Candidate222：9,348,268 bytes
- SHA-256：`39d9962c38ab928f51969237063230e8f77dc6f9416f8bf9691b12c48522c723`
- Candidate222 保持不變，仍是下一階段起點。

## 本階段完成
- [x] 逐項盤點 quicktools 主要控制項與資料範圍。
- [x] 確認 `applyBulkPracticeAction` 是唯一正式 dispatcher。
- [x] 區分作品狀態、歌曲熟悉度、待聽佇列、自訂清單、手動補強、作品黑名單與 SRS 的 owner。
- [x] 識別選取模式／CSS 同步及 catalog/watchlist 清除語意為後續整合候選。
- [x] 建立依賴稽核報告並更新 GitHub 狀態文件。
- [ ] 瀏覽器互動驗收：NOT RUN，Chromium runtime 不可用。
- [ ] 本階段沒有修改 HTML；避免在未能互動驗收時重構跨視圖 handler。

## 決策
不為了產生新版本而製造無意義的 Candidate223 HTML。Candidate222 維持唯一工作起點，直到有足夠證據可安全整合或刪除實作。
