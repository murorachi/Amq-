# V82.86.02 全專案工程盤點與代辦清單

日期：2026-10-19  
父基準：`v82.86.01-structural-issue-inventory-01`，`7bbbd8eb883db6b97822fac5e32a2a2ff903bde9`  
本次分支：`v82.86.02-engineering-backlog-01`  
產品基準：V82.82，8,787,490 bytes，SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`。V82.65 不可變。

## 範圍與限制

本盤點整合目前 AST 依賴報告、104 列模組化 closeout matrix、13 個模組的 CI 合約、結構問題清單、瀏覽器測試與歷史驗收報告。主追蹤表 `reports/ENGINEERING_BACKLOG.csv` 有 **34 項**，每項都有唯一 ID、優先級、證據、依賴、行動、驗收條件與建議自動化方式。

這是依現有證據建立的全專案工程待辦，**不宣稱已逐行人工審閱全部原始碼**。靜態計數不是缺陷數；風險不是已確認 bug；未執行測試不能標成通過。

## 已知基礎證據

- Source manifest / closeout matrix：91 個 fragments（50 CSS、41 script/data）及 13 modules，共 104 列。
- AST：818 個具名函式/函式值定義；2,143 個直接 identifier-call edge records，其中 1,132 same-file、75 cross-fragment、577 unresolved/external/global、359 ambiguous。Property calls、動態引用、callback 與反射是已知盲區。
- `script_004.htmlpart`：95,160 bytes；quizSettings 32 個函式擁有者、quizSong 30、quizFinished 19、quizActive 14、quizAudioStarted 10；205 個 getElementById 呼叫分布於 43 個 owner。這支持耦合風險判定，不代表已證實故障。
- `script_001.htmlpart` 抽離 DB 初始化後仍含 runtime 初始化、歷史/狀態持久化，不能視為純資料。
- 13 個 module 的 CI 合約已納入流程，但合約通過不代表執行期完全解耦。
- 50 個 CSS fragments 保持順序鎖定；selector 分類不是搬動 CSS 的授權。
- 現有 Chromium/mock 測試覆蓋多條流程。Firefox cascade、真實音訊 provider、真實雙客戶端 multiplayer，以及擴充的 IndexedDB 故障/正式網域政策仍是獨立驗收門檻。
- 產品指紋固定為 V82.82；工程整理需持續驗證產物不漂移。若刻意改產品，必須另立版本與驗收。

## 執行順序

### P0：先建立測驗生命週期所有權
- AMQ-TODO-001：共享測驗狀態
- AMQ-TODO-002：DOM 寫入所有權
- AMQ-TODO-003：事件、計時器、動畫註冊與清理
- AMQ-TODO-004：建議答案點擊/鍵盤/IME/ARIA 行為

這四項完成前，不做 `script_004` 大改寫，也不為了增加模組數硬抽離。

### P1：關鍵依賴與外部風險
- AMQ-TODO-005 至 AMQ-TODO-018：混合 runtime/data、非同步 API/cache、跨片段呼叫、模組解耦、AMQ/EMQ ID、IndexedDB/備份、多人連線、真實音訊、Firefox/CSS、乾淨 checkout 重建、payload 保護及產品指紋。

外部環境被阻擋時保留 Open，記錄 NOT RUN。Mock 測試不能替代真實服務或瀏覽器驗收。

### P2：在證據完整後做清理與品質改善
- AMQ-TODO-019 至 AMQ-TODO-032：覆寫層、疑似死碼、可讀性、效能基準、測試追蹤、套件重現性、可及性、響應式、非同步錯誤、瀏覽器相容性、文件一致性、manifest disposition、CSS 清理及測試結果紀錄。

不因 grep 無引用、名稱重複或 AST unresolved 就刪除相容碼。效能改善必須有前後測量。

### P3：讓清單本身可驗收
- AMQ-TODO-033：CI 驗證代辦表格與報告一致。
- AMQ-TODO-034：關閉工作必須附驗收證據與回滾點。

## 完整代辦索引

- **AMQ-TODO-001 [P0] Trace shared quiz state**：EVIDENCE_BACKED_RISK。驗收：Critical state has owner map and transition tests.
- **AMQ-TODO-002 [P0] Map DOM mutation ownership**：EVIDENCE_BACKED_RISK。驗收：Key nodes have mutation owner and teardown behavior.
- **AMQ-TODO-003 [P0] Reconcile event/timer cleanup**：AUDIT_REQUIRED。驗收：Every registration has owner, cleanup and regression assertion.
- **AMQ-TODO-004 [P0] Revalidate suggestion click/keyboard ownership**：AUDIT_REQUIRED。驗收：Current behavior is tested; mismatches reproduced before fixes.
- **AMQ-TODO-005 [P1] Audit remaining script_001 runtime**：AUDIT_REQUIRED。驗收：Order documented; product fingerprint unchanged.
- **AMQ-TODO-006 [P1] Map API/cache lifecycle**：EVIDENCE_BACKED_RISK。驗收：Async flows have error/stale-result contracts.
- **AMQ-TODO-007 [P1] Resolve critical cross-fragment calls**：AUDIT_REQUIRED。驗收：Critical edges have verified owners.
- **AMQ-TODO-008 [P1] Classify unresolved/global calls**：AUDIT_REQUIRED。驗收：Critical calls have documented contracts.
- **AMQ-TODO-009 [P1] Review module decoupling**：AUDIT_REQUIRED。驗收：Every module has dependency/side-effect disposition.
- **AMQ-TODO-010 [P1] Verify AMQ/EMQ ID boundaries**：EVIDENCE_BACKED_RISK。驗收：Invalid scope fails closed; IDs remain distinct.
- **AMQ-TODO-011 [P1] Complete IndexedDB failure matrix**：EXTERNAL_GATE。驗收：Each case has result and rollback assertion.
- **AMQ-TODO-012 [P1] Verify backup restore on real origin**：EXTERNAL_GATE。驗收：Round-trip passes; corrupt backup rejected before mutation.
- **AMQ-TODO-013 [P1] Run live two-client acceptance**：EXTERNAL_GATE。驗收：Both clients stay consistent; logs retained.
- **AMQ-TODO-014 [P1] Run real provider playback acceptance**：EXTERNAL_GATE。驗收：Real-provider cases pass or failures recorded.
- **AMQ-TODO-015 [P1] Establish Firefox/cascade gate**：EXTERNAL_GATE。驗收：No unexplained visual/style regression before cleanup.
- **AMQ-TODO-016 [P1] Verify clean checkout rebuild/readback**：AUDIT_REQUIRED。驗收：Clean rebuild matches V82.82 fingerprint; required files present.
- **AMQ-TODO-017 [P1] Protect opaque data payloads**：MAINTAINABILITY_CANDIDATE。驗收：Payload bytes and hashes unchanged.
- **AMQ-TODO-018 [P1] Preserve V82.82 product fingerprint**：EVIDENCE_BACKED_RISK。驗收：Build byte-identical unless separately versioned product change approved.
- **AMQ-TODO-019 [P2] Map duplicate definitions/load-order overrides**：AUDIT_REQUIRED。驗收：Each override classified with evidence.
- **AMQ-TODO-020 [P2] Build evidence-backed obsolete-code candidates**：AUDIT_REQUIRED。驗收：No deletion without caller/data evidence and regression tests.
- **AMQ-TODO-021 [P2] Rank complexity/readability hotspots**：AUDIT_REQUIRED。驗收：Scoped shortlist; behavior-preserving changes only.
- **AMQ-TODO-022 [P2] Measure startup/pool/suggestion latency**：AUDIT_REQUIRED。驗收：Metrics show improvement without regression.
- **AMQ-TODO-023 [P2] Map requirements/failures to tests**：AUDIT_REQUIRED。驗收：Each P0/P1 has test evidence or external gate.
- **AMQ-TODO-024 [P2] Verify package reproducibility from clean checkout**：AUDIT_REQUIRED。驗收：Packages byte-identical; source hashes match.
- **AMQ-TODO-025 [P2] Consolidate keyboard/focus/ARIA tests**：AUDIT_REQUIRED。驗收：Critical controls have deterministic assertions.
- **AMQ-TODO-026 [P2] Maintain responsive geometry baseline**：AUDIT_REQUIRED。驗收：No unexplained geometry delta.
- **AMQ-TODO-027 [P2] Audit stale responses/rejections/cleanup**：AUDIT_REQUIRED。驗收：High-impact paths have error/stale-result tests.
- **AMQ-TODO-028 [P2] Document browser/runtime support**：AUDIT_REQUIRED。驗收：Support matrix names versions, flows and limitations.
- **AMQ-TODO-029 [P2] Reconcile stale status notes**：AUDIT_REQUIRED。驗收：No current doc contradicts verified acceptance.
- **AMQ-TODO-030 [P2] Reconcile all fragments/modules to disposition**：AUDIT_REQUIRED。驗收：Exactly one disposition per manifest row.
- **AMQ-TODO-031 [P2] Review CSS duplication only after gate**：MAINTAINABILITY_CANDIDATE。驗收：Each deletion has computed-style/screenshot proof.
- **AMQ-TODO-032 [P2] Separate failures from environment blocks**：AUDIT_REQUIRED。驗收：Blocked tests never count as pass.
- **AMQ-TODO-033 [P3] Automate backlog integrity checks**：MAINTAINABILITY_CANDIDATE。驗收：Contract passes in source/unit CI.
- **AMQ-TODO-034 [P3] Require evidence and rollback before closing**：MAINTAINABILITY_CANDIDATE。驗收：No closure based on prose or exit code alone.

## 禁止捷徑

1. 不為模組數量而抽離一行 getter 或依賴共享狀態的函式。
2. 不只因函式重名、grep 沒找到引用或 AST unresolved 就刪除程式。
3. Firefox/cascade 門檻未通過前不搬動 CSS。
4. 不以 in-memory Storage shim 取代真正的 IndexedDB/localStorage/reload 驗收。
5. 不以 mocked media 或 mocked multiplayer 取代真實 provider/雙客戶端驗收。
6. 不把 GitHub 上傳成功、CI 通過與乾淨 checkout 可重建混為一談。
7. 每項關閉時記錄測試案例、實際斷言、結果、未涵蓋範圍、產品指紋影響及回滾方式。

## 風險分類

- `EVIDENCE_BACKED_RISK`：結構證據存在，但使用者可見故障未證實。
- `AUDIT_REQUIRED`：仍需來源追蹤或針對性測試。
- `EXTERNAL_GATE`：需要真實瀏覽器/服務/允許的網域或第二客戶端。
- `MAINTAINABILITY_CANDIDATE`：證據支持後才處理。
- 未執行測試一律寫 `NOT RUN`；不得將環境阻擋算成 PASS。

## 本次變更與回滾

本次只新增工程待辦、驗證程式與狀態文件，不修改產品 JS/CSS、manifest 或 V82.82 HTML。代辦 contract 只驗證清單結構與報告一致，不代表 34 項工程工作已完成。

回滾至父提交 `7bbbd8eb883db6b97822fac5e32a2a2ff903bde9` 或 revert 本次提交；產品回滾不需要。

## 下一階段

按順序完成 AMQ-TODO-001 至 AMQ-TODO-004 的測驗生命週期盤點與缺漏測試。沒有所有權證據前，不重構生產碼。
