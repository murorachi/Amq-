# Candidate351 最後高風險殘留與清理狀態

- 產物：`amq_learning_tool_v82_86_62_candidate351_batch55_remove_orphan_favorites_and_work_helper_20261026.html`
- 大小：1,620,042 bytes
- SHA-256：`52a7760d042260a14c31392c885b2dc6a31129f00663798514f968141f65dd55`
- 正式基準：Candidate302（未修改）；直接回滾 Candidate350。

## 結論
Batch51–55 完成 5 個有引用證據支持的清理批次，移除 11 個未使用函式。65 個可執行 inline JS 區塊語法檢查 PASS；269 個 ID 唯一；HTML 結構 PASS。

簡單函式宣告掃描只剩 `renderDashboardV10` 在所屬 script 內出現一次，但整份 HTML 有 5 處引用，且該 script 是頂層 classic script，因此分類 **KEEP**，不可按單一宣告直接刪除。

## 尚待新證據的項目
- C103 audio controls／幾何：**NEEDS CONFIRMATION**，需真實執行時與 computed-style 證據。
- v47 `.hero.view-home`：**NEEDS CONFIRMATION**，需首頁／路由狀態的 computed-style 證據。
- Candidate72 `#homeMenu #amqMainIcon` inline styles：**NEEDS CONFIRMATION**，需 resize／SVG 尺寸驗證。
- v33 `showToast`：**NEEDS CONFIRMATION**，需確認全域 binding 與使用者回饋。
- Candidate84 dock/sidebar CSS：**NEEDS CONFIRMATION**，需 selector／route／media 依賴與真實視覺回歸。
- Candidate60/base navigation 與 Candidate193 Song Select route guard：**KEEP / INTEGRATE LATER**，副作用不同；需 ordered dispatch map 與 route regression。
- Workspace state／geometry／Escape／resize：靜態整併已完成，真實瀏覽器互動仍 **NOT RUN/BLOCKED**。

## 測試分類
- **PASS:** Candidate351 父版本 SHA-256、65 個 inline JS 語法檢查、269 個唯一 ID、基本 HTML 結構。
- **NOT RUN:** Candidate351 針對 Batch51–55 的真實瀏覽器回歸。
- **BLOCKED:** 既有瀏覽器環境對 `file://`／localhost 回傳 `ERR_BLOCKED_BY_ADMINISTRATOR`。
- **BLOCKED / NOT VERIFIED:** Candidate351 HTML 的 GitHub 上傳與遠端 SHA-256 讀回。

下一步應先做 Candidate351 的 8 項針對性回歸，再根據實際失敗或新的 runtime 證據決定下一個清理項目。正式封版仍未完成。
