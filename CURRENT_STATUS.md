# CURRENT_STATUS.md

Updated: 2026-10-25
Stage: Batch 3 route/storage isolated verification complete; full-app runtime verification remains open.
Stage: Batch 2 dependency trace complete; runtime verification and cleanup remain in progress.
Stage: Batch 1 — Candidate302 feature inventory (static evidence).
State: **Candidate302 is the formal baseline. Batch 1 has produced a first evidence-backed inventory; the six-goal cleanup is not complete.**

## Formal baseline
- File: `amq_learning_tool_v82_86_13_candidate302_emq_loader_state_validation_20261025.html`
- Size: 1,720,249 bytes
- SHA-256: `f718a744057be0a33d371306f1742aaeede90e84f33d9e62ab45f5e6db488abd`
- User authorized promotion after local verification.
- Candidate295 remains immutable rollback: SHA-256 `aef896eee98c10bcb9fb1f10d6650b8e26067426f43b086e1b69fa12e3674a81`.

## Batch 1 — feature inventory
- Report: `FEATURE_INVENTORY_BATCH1_CANDIDATE302_20261025.md`.
- Local machine-readable inventory: `FEATURE_INVENTORY_BATCH1_CANDIDATE302_20261025.json`.
- Verified Candidate302 local bytes/hash against baseline.
- Static audit rerun: 67 executable inline JS blocks, 0 syntax errors; 109 style blocks; 2,808 top-level CSS rules; 271 HTML IDs, 0 duplicates.
- Identified 30 literal local/session storage keys; 383 repeated CSS selector strings (665 extra occurrences); 480 addEventListener text occurrences, 4 removeEventListener, 54 MutationObserver, 3 ResizeObserver, 5 IntersectionObserver, 137 setTimeout, 10 setInterval and 35 requestAnimationFrame occurrences. These are text counts, not live runtime instances.
- Classified key feature domains as KEEP / INTEGRATE / DELETE / NEEDS CONFIRMATION. No item met the evidence threshold for direct DELETE.
- Highest-risk integration areas: multi-layer Song Select/workspace route wrappers; CSS cascade overrides; legacy/anonymous script blocks; storage ownership and schema.
- No application source code was modified or deleted in Batch 1.

## Six-goal cleanup progress
1. Feature inventory: **PARTIAL — first static evidence-backed inventory created; dynamic references and full runtime reachability remain.**
2. Dependency tracing: **PARTIAL — previous route/list/storage findings exist; full dependency map not complete.**
3. Duplicate implementation consolidation: **NOT COMPLETE.**
4. Confirmed obsolete code deletion: **NOT COMPLETE; zero direct deletions in Batch 1.**
5. Regression testing: **PARTIAL — static/synthetic/catalog audits exist; this batch did not run browser E2E.**
6. Formal delivery: **PARTIAL — report committed; Candidate302 HTML itself still not found on this branch, so remote HTML/hash verification is BLOCKED.**

## Test status
- Static JS/CSS/HTML-ID audit on Candidate302: PASS.
- Existing isolated Candidate302 tests: 40/40 PASS (previously executed).
- Real catalog structural audit: PASS (previously provided; not rerun in this batch).
- Browser E2E, live audio, route/CRUD/backup runtime flows: NOT RUN in this batch.
- Candidate302 remote HTML body/hash: BLOCKED / NOT VERIFIED.

## Next
Batch 2: map route wrappers and side effects, storage key owners and read/write paths, custom-list store/API boundaries, event/listener/observer/timer lifecycles, and CSS selector-to-DOM ownership. Use the Batch 1 inventory as the index; do not start deleting based only on names or repeated selectors.


## Batch 2 dependency trace
- Static source evidence extraction: PASS; baseline hash and size unchanged.
- Route finding: Candidate193's final guard intercepts selected destinations while Song Select is active, opens workspace content and returns without invoking core `showView` or dispatching `ani-app-navigation`. Generic wrapper side effects are bypassed on this path; destination strings alone do not establish equivalent behavior.
- Storage finding: `aniCustomPracticeListsV1` canonical writer/store is `v82-25-custom-lists-and-practice-hub`; compatibility fallback readers and backup/restore consumers remain.
- AMQ custom lists use `animeIds`; EMQ lists use `workIds`, `vndbIds`, and `songIds`. Do not merge schemas.
- Static extraction located 383 listener registration/removal patterns, 57 observer constructors and 182 timer/RAF calls. These counts do not prove leaks.
- No application source changes/deletions; DELETE=0.
- NOT RUN: browser route/workspace E2E, computed-style verification, runtime lifecycle instrumentation, synthetic custom-list CRUD/import/export/backup/restore.
- BLOCKED: Candidate302 HTML artifact still NOT_FOUND; remote hash not verified.


## Batch 3 results
- Route isolated Chromium harness: 14/14 PASS, 0 page errors; uses Candidate302 scripts 3/62/70 with stubbed dependencies, not full app E2E.
- Storage repository isolated Chromium harness: 6/6 PASS, 0 page errors; synthetic in-memory storage only, no user data.
- Confirmed Song Select guard interception bypasses core navigation event and generic standalone class wrapper.
- Confirmed malformed/non-allowlisted legacy import refusal, source-key preservation and transaction rollback after injected write failure.
- No application source changes/deletions; DELETE=0.
- Full AMQ/EMQ/MIX E2E, observer/timer runtime instrumentation and computed-style tests NOT RUN.
- Candidate302 HTML remote artifact remains NOT_FOUND; remote SHA-256 verification BLOCKED.


## Batch 4 — 2026-10-25
- Expanded isolated Chromium route matrix: **15/15 PASS, 0 FAIL, 0 page errors**. Coverage includes six Song Select workspace intercept destinations, the VNDB special branch, and eight normal routes. Actual extracted Candidate302 navigation scripts were tested with stubbed DOM/API; this is not full-app E2E.
- Completed static caller/writer map for `aniCustomPracticeListsV1`, AMQ recovery snapshots, `aniEmqWorkListsV8254`, and `aniEmqWorkListsSelectedV8254`. Confirmed AMQ/EMQ schemas remain separate; recovery snapshots are required safety data. The anonymous AMQ fallback reader is an integration candidate, not approved for deletion.
- Candidate302 local baseline hash unchanged. Matching `data.js` and `emq-data.js` were not found under `/mnt/data`; full-app E2E, lifecycle runtime monitoring and computed-style checks remain NOT RUN.
- Remote Candidate302 HTML fetch still returns 404; remote artifact/hash verification is BLOCKED. Text reports/docs existing remotely do not establish that the HTML artifact exists.
- No app source edits/deletions; DELETE=0.


## Batch 5 — 2026-10-25
- User agreed to skip remote Candidate302 artifact transfer and full-app E2E attempts for now; those remain BLOCKED/NOT RUN rather than being repeatedly retried.
- Candidate302 reverified locally: 1,720,249 bytes; SHA-256 `f718a744057be0a33d371306f1742aaeede90e84f33d9e62ab45f5e6db488abd`.
- Static lifecycle audit scanned 70 inline script blocks and produced a 14-script high-priority review shortlist. Static call-site counts do not prove leaks.
- Chromium computed-style probe PASS for the static DOM at 1440x900, using real Candidate302 markup/CSS with inline scripts removed; 0 page errors. Dynamic Song Select/workspace elements absent before initialization remain NOT RUN.
- No app source modified or deleted; DELETE=0. Full app E2E, runtime lifecycle pairing, and remote HTML hash verification remain NOT RUN/BLOCKED.
- Batch 5 report and local evidence package are available as deliverables; GitHub report/summary and docs updated separately.


## Batch 6 — 2026-10-25 runtime lifecycle stress probe
- Tested 12 selected Candidate302 inline scripts individually in Chromium with actual static markup/CSS, inline app scripts disabled, synthetic APIs and minimal workspace scaffolding.
- 12/12 selected scripts initialized without uncaught errors; 0 browser page errors.
- Each script received 20 synthetic route/body-class/navigation/resize cycles. No net increase in active listener registrations or active observers was observed in this isolated harness; scheduled RAF/timeouts settled.
- Manual reinjection added registrations for eight scripts, but this is not evidence that normal route changes reinject them or that a production leak exists. Treat as INTEGRATE/NEEDS_CONFIRMATION only.
- Multiplayer UI created two page-level intervals; active-room poll/socket shutdown with synthetic session/fake server remains NOT RUN.
- Full-app E2E NOT RUN; remote Candidate302 HTML remains BLOCKED/NOT_FOUND. No app source changed; DELETE=0.
- Report: `BATCH6_RUNTIME_LIFECYCLE_REPORT_20261025.md`; probe JSON: `BATCH6_RUNTIME_LIFECYCLE_PROBE_RESULTS.json`; summary: `BATCH6_VALIDATION_SUMMARY.json`.
