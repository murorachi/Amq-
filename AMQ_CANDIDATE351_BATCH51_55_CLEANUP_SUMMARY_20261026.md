# Candidate346 → Candidate351：安全清理批次摘要

- 起點 Candidate346：1,625,225 bytes；SHA-256 `dfef81df1572219d2b96b5f8eeeb50696acfe99a0fced53b6c83371f930c99ca`
- 最新 Candidate351：1,620,042 bytes；SHA-256 `52a7760d042260a14c31392c885b2dc6a31129f00663798514f968141f65dd55`
- 檔案減少：5,183 bytes；實際移除 11 個已確認無引用的函式宣告。
- 靜態驗證：65 個 executable inline JS 語法 PASS；269 個 ID 全唯一；0 重複 ID。
- 完整瀏覽器功能驗收：Candidate351 **NOT RUN**；Candidate346 的手動 PASS 不自動沿用。

| Batch | Candidate | Removed |
|---|---|---|
| 51 | 347 | `emqReady`, `escapeText` |
| 52 | 348 | `addHomeGroups`, `saveMode` |
| 53 | 349 | `openccConverter`, `cacheRecord` |
| 54 | 350 | `showActionPrompt`, `saveConfigAndStart`, `currentDetailOpen` |
| 55 | 351 | `saveFav`, `showWork` |

所有批次均保留直接父版本作回滾。Candidate302 仍是正式基準；Candidate351 仍是實驗候選版。
