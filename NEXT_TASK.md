# NEXT_TASK.md — Batch 4 canonical reader/writer audit + browser evidence

## Current baseline
Candidate302 remains formal baseline:
- `amq_learning_tool_v82_86_13_candidate302_emq_loader_state_validation_20261025.html`
- 1,720,249 bytes; SHA-256 `f718a744057be0a33d371306f1742aaeede90e84f33d9e62ab45f5e6db488abd`.
- Candidate295 rollback SHA-256 `aef896eee98c10bcb9fb1f10d6650b8e26067426f43b086e1b69fa12e3674a81`.

## Batch 3 completed
- Isolated Chromium route harness: 14/14 PASS, 0 page errors; Candidate302 scripts 3/62/70 with stubbed dependencies.
- Isolated Chromium storage repository harness: 6/6 PASS, 0 page errors; synthetic in-memory storage only.
- Confirmed route guard early-return side effects and storage import/rollback behavior.
- No application source edits/deletions; DELETE=0.
- Full-app E2E, runtime lifecycle instrumentation and computed-style checks NOT RUN.
- Candidate302 remote HTML remains NOT_FOUND; remote hash verification BLOCKED.

## Batch 4 actions
1. Resolve remote Candidate302 HTML artifact gap; verify exact remote contents/hash.
2. Trace every read/write/mutate path for `aniCustomPracticeListsV1`, recovery snapshots and `aniEmqWorkListsSelectedV8254`; document caller and dynamic references.
3. Obtain/run the complete HTML with matching `data.js` and `emq-data.js` in isolated browser environment; do not replace production data with stubs for full E2E.
4. Run browser smoke for home/catalog/watchlist/quiz/skip/next/Solo EMQ list and safe import/export/restore using synthetic profile only.
5. Add runtime observer/timer/listener lifecycle instrumentation for modal/grid/dock/route hot spots.
6. Compare high-impact repeated CSS candidates against actual computed style and media/route context.
7. Produce consolidation/deletion ledger only when the dependency and runtime evidence supports it; no deletion by count alone.

## Known limits
- User-reported Candidate302 local verification has no case-by-case manual log.
- 495 AMQ songs lack media values in extractor slots 9/10/11; do not patch without upstream schema evidence.
- Never overwrite Candidate302 or Candidate295.


## Batch 4 completed / Batch 5 next
- Expanded isolated Chromium route matrix: 15/15 PASS, 0 page errors.
- Static caller/writer map created for AMQ custom-list data, recovery snapshots, EMQ list data and selected EMQ scope.
- Local report: `BATCH4_CANONICAL_STORAGE_ROUTE_REPORT_20261025.md`; detailed map: `BATCH4_CANONICAL_STORAGE_CALLER_WRITER_MAP.json`; test results: `BATCH4_EXPANDED_ROUTE_TEST_RESULTS.json`; ZIP: `AMQ_Batch4_Canonical_Storage_Route_Candidate302_20261025.zip`.
- Candidate302 HTML remains 404 on the target branch. Do not claim remote upload/hash verification.

## Batch 5 priority
1. Resolve the remote binary artifact upload path or obtain an explicit user-provided repository upload route; keep the baseline local and immutable meanwhile.
2. Locate the exact hash-matching `data.js` and `emq-data.js`; otherwise keep full-app E2E BLOCKED.
3. Run lifecycle pairing/runtime checks for the highest-risk modal/grid/dock/route scripts.
4. Run CSS computed-style comparisons for a small high-impact shortlist.
5. Continue only evidence-backed consolidation; no deletions approved yet.
