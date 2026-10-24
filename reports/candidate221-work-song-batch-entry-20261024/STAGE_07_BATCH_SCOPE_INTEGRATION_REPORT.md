# Stage 07 — 作品／歌曲批次功能分流入口

日期：2026-10-24

## 基準與產物
- Parent Candidate220：9,353,264 bytes；SHA-256 `d36160782d785c9f23adb5d217aefe1fa4c1d80c1dd309bf54670753e5a9d80a`。
- Candidate221：`amq_learning_tool_v82_85_46_candidate221_work_and_song_batch_entry_20261024.html`；9,353,751 bytes；SHA-256 `77a754fce6117153063d7f00f44640c88f553a6893b78804f4b3573e162749f5`。
- Rollback Candidate220：9,353,264 bytes；SHA-256 `d36160782d785c9f23adb5d217aefe1fa4c1d80c1dd309bf54670753e5a9d80a`，本機副本 byte-identical。

## 修改
1. 清單管理新增「批次維護」分組，分開顯示「作品批次整理」與「歌曲批次整理」。
2. 作品批次入口回到既有動畫圖鑑並定位 `#quicktools`，沿用原有看番狀態、歌曲熟悉度、待聽佇列、自訂清單、手動補強、黑名單及 SRS handler。
3. 歌曲批次入口仍使用 Candidate210 唯一歌曲列批次 runtime。未複製業務邏輯、未刪除舊工作區、未改動儲存 schema。

## 依賴矩陣
| 能力 | 操作範圍 | 正式 owner | 決策 |
|---|---|---|---|
| 看番狀態批次修改 | 動畫作品 ID | v82-25 custom-lists-and-practice-hub / quicktools | 保留；新增正式入口 |
| 歌曲熟悉度（作品工具） | 所選作品關聯歌曲 | quicktools + bulk handler | 保留；影響範圍不同於單列歌曲選取 |
| 加入待聽佇列 | 動畫作品 | quicktools | 保留 |
| 自訂清單加入／移除 | 動畫作品 ID | `applyBulkPracticeAction` | 保留 |
| 手動補強加入／移除 | 動畫作品 | `applyBulkPracticeAction` | 保留 |
| 作品黑名單加入／解除 | 作品及關聯歌曲 | `applyBulkPracticeAction` + blacklist bridge | 保留；不等同歌曲 ID 黑名單 |
| 間隔複習加入 | 動畫作品 | `applyBulkPracticeAction` | 保留 |
| 歌曲熟悉度／標籤／黑名單／清單 | 勾選歌曲列 | Candidate210 `openBatch` / `applyStatus` | 保留為唯一歌曲層級 owner |
| `wsBatchListAdder` | 作品層級清單橋接 | Proto15 bridge -> existing bulk action | 待確認冗餘；需先驗證 observer、清單同步與選取範圍 |
| `quicktools` DOM/CSS/runtime | 作品批次 | 舊 catalog owner | 暫不刪除；正式入口已接通 |

## 測試結果
- PASS：63 個可執行 inline JavaScript 區塊通過 `node --check`；4 個大型資料/payload 區塊排除。
- PASS：108 個 CSS blocks 解析，0 個 stylesheet parse errors。
- PASS：7 項靜態斷言通過，涵蓋入口、handler、既有 Candidate210 API、單一 `applyBulkPracticeAction` owner、無新增資料鍵與 VNDB 錯誤標籤不存在。
- BLOCKED：Playwright Chromium 啟動，執行環境缺少對應 Chromium binary；互動驗收未執行。
- NOT RUN：原生 `file://`、持久化重載、真實音訊、live API、多人完整生命週期、osu!stable 像素比對。

## 刪除決策
本階段不刪除 `quicktools`、`wsBatchListAdder`、`bulkPracticeAction` 或其 listener。作品批次與歌曲批次資料粒度不同，需避免錯誤合併。下一階段應驗證 `wsBatchListAdder` 是否僅是重複 UI bridge，並追蹤 Observer、清單選項同步及選取範圍後再決定移除。
