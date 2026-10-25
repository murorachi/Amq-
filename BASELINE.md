# BASELINE — User-authorized working baseline: Candidate295

## Current baseline decision
On 2026-10-25, the user explicitly directed that Candidate295 become the formal working baseline and instructed us to stop searching for Candidate277. This decision supersedes all earlier baseline references in this document. Do not block work on recovering Candidate277 and do not silently switch back to it.

- Local source file: `/mnt/data/index-old.html`
- Embedded version: `v82.86.06-candidate295-db-extraction-20261025`
- Size: 1,720,917 bytes
- SHA-256: `aef896eee98c10bcb9fb1f10d6650b8e26067426f43b086e1b69fa12e3674a81`
- Baseline status: user-authorized, locally verified
- Preserve the original file unchanged. All code changes must be saved as a uniquely named child candidate.
- Candidate277 and Candidate276 details below are retained only as historical records and are not active baselines.

## Candidate296 child checkpoint (2026-10-25)

- Child candidate: `amq_learning_tool_v82_86_07_candidate296_route_guard_consolidation_20261025.html`
- Embedded version: `v82.86.07-candidate296-route-guard-consolidation-20261025`
- Size: 1,719,843 bytes
- SHA-256: `ec94f1daabdcc0b3151ba45b50d1e42d5ed5ddbf9ff4861050285cb44e94bddc`
- Change: removed the earlier duplicate Song Select route wrapper; retained the final route guard and generic workspace/body-class guard. Candidate295 remains immutable.
- Static checks: JS 67/67 PASS; CSS 109 blocks / 2,808 rules / zero parser errors PASS; 271 DOM IDs unique PASS.
- Browser route regression: BLOCKED/NOT RUN; static results are not runtime acceptance.

## Known dependencies and limits
- Candidate295 references external `data.js` and `emq-data.js`. The user reports having these files locally, but they have not been independently inspected in this workspace. Do not claim full AMQ/EMQ data validation until both are available and checked.
- Node.js `--check`: PASS for 67/67 executable inline JavaScript blocks. The inline JSON data block `aniAnilistIdMapV8237` is data and was not included in that syntax check.
- Static duplicate DOM ID scan: PASS, no duplicate IDs reported.
- CSS parsing: PASS on 2026-10-25 with tinycss2 1.5.1: all 109 style blocks parsed with zero stylesheet-level and zero declaration-level parse errors (2,808 top-level qualified CSS rules counted). This is a parser-level check, not a visual/browser rendering test.
- Browser interaction, storage reload, audio, live API and multiplayer checks: NOT RUN/BLOCKED by the managed browser environment.
- Current dependency inventory is static analysis only. Do not delete uncertain code solely because it looks old or duplicated.

## Rollback
Keep `/mnt/data/index-old.html` unchanged as the baseline copy. If a child candidate regresses, discard that child and restart from the exact SHA-256 recorded above. Never overwrite the baseline or its rollback copy.

## Historical baseline record (inactive)
Candidate277 was previously recorded as a working baseline with SHA-256 `b628bfb5b4aec30a34935bcf5aaac095ab405a71ebe482f9a666c2f91a019371`; Candidate276 was recorded with SHA-256 `7a604c1d2d604b928d2ccb51dbb55d58ead2d34f73abfcba27693c794a4ddbd5`. These are historical references only after the user's Candidate295 decision on 2026-10-25. No further recovery search is requested or needed.


## Candidate299 第一階段路由驗收候選（2026-10-25）

- 候選檔：`amq_learning_tool_v82_86_10_candidate299_route_acceptance_20261025.html`
- 版本：`v82.86.10-candidate299-route-acceptance-20261025`
- 大小：1,719,884 bytes
- SHA-256：`1e7a37cef7a7d791c5dd40f09c2143b2e507dac76c73951e5060b82f5c44c2e4`
- 父候選 Candidate298 SHA-256：`5fa8f137c9aa6b3fdaafbadff44fec846673bcc1617ad94b2d6f484e8d74ac4a`
- 修改：防止延遲安裝重包裝 Song Select guard；攔截路由先關閉首頁覆蓋選單；移除與 `syncWorkspaceVisibility` 競爭的舊 body-class 清除計時器；非 Song Select 的 `vnList` 使用既有 VN 清單 API。
- PASS：67/67 inline JS syntax；109 CSS blocks／2,808 rules／0 stylesheet-level parse errors；271 unique IDs；Chromium 受控 DOM route matrix 36/36 assertions、0 failures、0 page errors。
- BLOCKED：直接開啟 HTML 被 Chromium 回報 `ERR_BLOCKED_BY_ADMINISTRATOR`；工作目錄缺少 `data.js`、`emq-data.js`；候選 HTML 的 GitHub 上傳及遠端 SHA 驗證未完成。
- 狀態：Candidate299 是階段候選，不取代 Candidate295 基準。只有使用者本機配套資料下的路由／返回驗收完成後，才可將第一階段標為完全驗收。
- 報告：`reports/stage1-candidate299-route-acceptance-20261025/STAGE1_ROUTE_ACCEPTANCE_REPORT_CANDIDATE299_20261025.md`
