# Stage 09：quicktools 控制項與依賴歸屬稽核

日期：2026-10-24

## 基準
- 起點 Candidate222：`amq_learning_tool_v82_85_46_candidate222_unreachable_batch_bridge_cleanup_20261024.html`
- 大小：9,348,268 bytes
- SHA-256：`39d9962c38ab928f51969237063230e8f77dc6f9416f8bf9691b12c48522c723`
- 本階段以 Candidate222 為唯一檢查起點；不修改 Candidate222，也不改資料 schema。

## 稽核結果與決策

| 控制項 | 目前 owner / handler | 資料範圍 | 決策 |
|---|---|---|---|
| `syncOpenBtn` | 主程式 `openSync` | AniList/MAL 匯入 UI | 保留；不是批次操作，應在後續 UI 整理中與批次工具視覺分組分開，但不在本階段搬動 |
| `selectModeBtn` | 主程式 `onclick` 切換 `selectionMode`；custom-list 模組另同步 `v825-bulk-mode`；V843 在 watchlist 視圖接管 | 作品／看番清單選取模式 | 整合候選；三處跨視圖行為不同，先保留 |
| `selectVisibleBtn` | 主程式選取目前 `visible.slice(0, renderLimit)`；custom-list 模組阻擋歌手圖鑑批次；V843 在 watchlist 視圖改選 watch cards | 目前畫面／目前可見作品 | 保留；不是單純重複 handler |
| `selectFilteredBtn` | custom-list 模組選取完整篩選結果；V843 在 watchlist 視圖使用 capture handler 攔截並選取 watch cards | 全部符合篩選的作品，或看番清單目前卡片 | 保留；兩個視圖的資料來源不同 |
| `clearSelectionBtn` | 主程式清除 `selectedAnime`；custom-list 模組同步 CSS 狀態；V843 在 watchlist 視圖同時退出選取模式 | 共用選取 Set | 整合候選；catalog 與 watchlist 的「清除」語意目前略有差異，需互動驗收後統一 |
| `applyBulkWatchBtn` | 主程式直接處理 | `aniAnimeWatch_v1` 作品狀態 | 保留；作品層級唯一 owner |
| `applyBulkSongBtn` | 主程式直接處理 | 歌曲熟悉度 `status` | 保留；歌曲狀態操作以所選作品的關聯歌曲展開 |
| `queueSelectedBtn` | 主程式直接處理 | `aniPlayQueue_v1` | 保留；待聽佇列是歌曲 ID，不能與作品狀態合併 |
| `bulkCustomList` | custom-list 模組同步清單選項；與 `bulkPracticeAction` change handler 聯動 | 自訂清單 ID | 保留；唯一清單選擇器 |
| `bulkPracticeAction` | custom-list 模組讀取 action；`applyBulkPracticeAction` 分支處理 | 自訂清單、手動補強、作品黑名單、SRS | 保留；單一業務 dispatcher，涵蓋不同資料 owner |
| `applyBulkPracticeAction` | custom-list 模組 `addBulkControls` 綁定一次 | 依 action 分派至清單／補強／黑名單／SRS API | 保留；未發現第二個相同業務 dispatcher |
| `createListFromCatalog` | custom-list 模組 prompt + `createList` + 更新選取器 | 自訂清單資料 | 保留；建立清單與批次套用是不同操作 |
| `bulkWatchStatus` | `applyBulkWatchBtn` 讀取 | 作品看番狀態 | 保留 |
| `bulkSongStatus` | `applyBulkSongBtn` 讀取 | 歌曲熟悉度 | 保留 |
| `selectionHint` / `batchScopeSummaryV844` | 主程式 `updateSelectionHint`；V843 僅在 watchlist 視圖包裝提示 | 共用選取數與影響範圍提示 | 保留；V843 包裝是視圖差異，不是可直接刪除的重複 UI |

## 已確認的重點
1. `applyBulkPracticeAction` 只有一個正式業務 dispatcher。沒有證據支持再建立第二套處理器。
2. 作品狀態、歌曲熟悉度、待聽佇列、自訂清單、手動補強、作品黑名單與 SRS 的資料粒度不同。它們不能只因共用「批次」一詞就合併。
3. `selectModeBtn`、`selectVisibleBtn`、`selectFilteredBtn`、`clearSelectionBtn` 的多個 handler 大多是視圖切換／狀態同步，不能等同於重複執行業務操作。
4. `syncOpenBtn` 是 AniList/MAL 匯入入口，雖然目前放在批次工具列，功能本身並非批次操作。移動 UI 屬於另一項有使用者可見影響的調整，本階段不擅自改版。
5. 目前可確定的下一個整合候選是「選取模式與 CSS 狀態同步」以及 catalog/watchlist 的清除選取語意；需要瀏覽器驗收後再動手，不能從靜態程式碼推定行為完全等價。

## 測試
- PASS：Candidate222 本機 SHA-256 與大小已重新核對。
- PASS：靜態稽核確認 14 個主要控制項 ID 在 DOM 定義存在，相關 owner/handler 關鍵符號存在。
- PASS：`applyBulkPracticeAction` 函式定義 1 個；custom-list 模組中 click 綁定 1 個。
- NOT RUN：瀏覽器點擊／切換視圖／持久化驗收，因執行環境沒有可用 Chromium binary。
- NOT RUN：原生 `file://`、真實音訊、外部 API、多人與 osu!stable 像素比對。

## 本階段決策
本階段是依賴稽核，不產生修改版 HTML。沒有足夠證據可以安全刪除其他 quicktools 控制項或業務 handler。Candidate222 仍是下一階段正式起點，不被覆蓋。

## 下一項最高價值工作
在 Chromium 可用的環境驗收選取模式、選取可見／全部篩選結果、清除選取、各批次套用及 watchlist 視圖接管；依驗收結果整合重複的 UI 狀態同步，然後再繼續檢查 catalog 卡片批次 checkbox 與舊 `selectionMode` 的責任是否能收斂。
