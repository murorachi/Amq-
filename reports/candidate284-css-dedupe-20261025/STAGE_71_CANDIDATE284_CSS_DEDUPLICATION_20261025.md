# Candidate284 CSS 清理階段報告

日期：2026-10-25
版本：`v82.85.98-candidate284-css-dedupe-20261025`

## 基準與回滾
- 修改前來源：Candidate283 `amq_learning_tool_v82_85_97_candidate283_version_metadata_sync_20261025.html`
- 修改前大小：9,379,765 bytes
- 修改前 SHA-256：`aa1af13d2ff9419968ba92f382c75e0fd65d0ae4b72957331a1b488f65d74a0b`
- 修改後本地產物：`amq_learning_tool_v82_85_98_candidate284_css_dedupe_20261025.html`
- 修改後大小：9,378,578 bytes
- 修改後 SHA-256：`253b712f16b7032f00135f254f40f6cd20caa7d3e3a0677ebfc8ce7602cc8089`
- 原始 Candidate283 未覆寫，可直接回滾。

## 實際修改
刪除 6 份經靜態比較確認為冗餘的完全重複 CSS 規則：quiz 控制按鈕最小高度、quiz skip 控制隱藏規則、Song Select 自訂清單 picker 隱藏規則，以及 Song Select 資訊面板、目錄工具列、搜尋框的重複宣告。沒有刻意修改 JS、路由、資料或功能設計。

## 檢查結果
- PASS：來源 SHA-256 與既有 Candidate283 紀錄相符。
- PASS：109 個 style 區塊仍存在。
- PASS：CSS qualified rules（含巢狀規則）由 3,656 降至 3,650。
- PASS：CSS parser errors = 0。
- PASS：67/67 個可執行 inline JavaScript 區塊通過 `node --check`。
- PASS：重複 HTML ID = 0。
- NOT RUN：瀏覽器 computed styles、路由切換、Dock 展開/收合、播放器、儲存持久化與像素比對。
- BLOCKED：HTML 尚未上傳；遠端大小及 SHA-256 未驗證。

## 尚未完成
CSS 所有權尚未全面重整。其他重複規則若位於 media query、前後有不同宣告或可能改變 cascade，這次跳過。舊 selector 若無法確認動態引用，也不會猜測刪除。Candidate210/212 完整原始位元組存取問題仍未解決，本次只使用雜湊已核實的 Candidate283 本地檔。

這是可回滾的保守去重階段，不代表整個 CSS 架構重構已完成。