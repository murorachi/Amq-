# V82.86.01 Structural Issue Inventory 01

Date: 2026-10-18  
Engineering baseline: `v82.85.22-closeout-disposition-matrix-01` at `b42ddee31db8becae02b9822dd44bdcb0c4f9cee`.  
Acceptance evidence: [GitHub Actions run 39141992306](https://github.com/murorachi/Amq-/actions/runs/39141992306), both `source-and-unit` and `browser-native-origin` succeeded.  
Product baseline: V82.82, 8,787,490 bytes, SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`. V82.65 remains immutable.

## Purpose and status

This checkpoint begins the code-quality and structural-risk inventory before broad cleanup. It is **evidence-led triage, not a claim that every line has already been manually audited**. It consolidates the parser-backed dependency inventory, the 104-row modularization closeout matrix, the V82.85.15 boundary audit, the V82.85.21 `script_004` decision, and the current CI acceptance evidence.

No production source, module, manifest, CSS, generated HTML, or runtime behavior is changed in this checkpoint.

## Baseline decision

- Accepted engineering starting point: branch `v82.85.22-closeout-disposition-matrix-01`, commit `b42ddee31db8becae02b9822dd44bdcb0c4f9cee`.
- Product output remains locked to V82.82 at the exact fingerprint above.
- Immutable historical baseline V82.65 remains untouched.
- The V82.85.22 CI result is now confirmed successful; older `CI pending` labels in the prior documentation are stale and are corrected in this checkpoint.
- This inventory branch is a documentation/audit overlay and does not replace the product baseline.

## Evidence already available

1. Source manifest contains 91 fragments: 50 CSS and 41 script/data fragments; the closeout inventory covers those plus 13 modules, 104 unique rows total.
2. Parser-backed inventory `reports/AST_DEPENDENCY_MAP.md` reports 818 named function/function-valued definitions and 2,143 direct identifier-call edge records: 1,132 same-file, 75 cross-fragment, 577 unresolved/external/global, and 359 ambiguous. These are leads, not a complete call graph.
3. `script_004.htmlpart` is 95,160 bytes and its SHA-256 is `8f9d41977463d0e1c211948f9c615f116309ec96c556013954c29f5f0222ec9e`. Existing audit evidence reports shared ownership counts: `quizSettings` 32 functions, `quizSong` 30, `quizFinished` 19, `quizActive` 14, `quizAudioStarted` 10; 205 `document.getElementById` calls across 43 owners. This supports high-risk coupling review, not a proven user-facing defect.
4. `script_001.htmlpart` is a mixed data/runtime fragment. The database initializer is already separated, but the remainder still contains executable initialization/history/status behavior and must not be mislabeled as pure data.
5. Existing bounded audits found no justified low-risk extraction from the reviewed `script_002`, `script_003`, `script_040`, or the selected remaining `script_004` candidates. Their dependencies include DOM/storage, mutable state, live APIs, caches, and asynchronous lifecycle.
6. The closeout matrix explicitly keeps 50 CSS fragments behind a CSS cascade/environment gate, preserves 2 payload rows, marks 1 IndexedDB gate and 1 live multiplayer gate, and records 13 modules whose CI contracts do not imply full decoupling.
7. The last CI run passed source/build/inventory/module contracts and the browser-native-origin suites, including storage/custom-list, IndexedDB/input, quiz suggestion/input, quiz answer/playback lifecycle, and mocked multiplayer lifecycle. These tests do not prove Firefox CSS parity, real audio-provider playback, production-domain storage policy, or a live two-client multiplayer reconnect.

## Inventory rules

- **CONFIRMED_DEFECT** means a reproducible incorrect behavior has been demonstrated. No new confirmed production defect is asserted by this audit-only checkpoint.
- **EVIDENCE_BACKED_RISK** means the structure and dependency evidence are documented, but an actual user-visible failure is not yet proven.
- **AUDIT_REQUIRED** means more source-level ownership tracing or targeted tests are needed.
- **EXTERNAL_GATE** means the required validation needs an environment or real service not represented by current CI.
- **MAINTAINABILITY_CANDIDATE** means readability/duplication cleanup may help but must not be changed until behavior and callers are understood.
- A matching name, repeated source pattern, unresolved call, or listener/timer API hit alone is not proof of dead code or a defect.
- Never delete compatibility code until its historical purpose, data inputs, callers, and regression conditions are established.
- Performance claims require a before/after measurement, not a shorter diff.

## Prioritized issue register

The companion CSV is the row-oriented tracker. Priority meanings: P0 = investigate before broad refactor; P1 = high-value structural risk; P2 = bounded audit/maintainability; P3 = external acceptance prerequisite or low urgency.

| ID | Priority | Category | Finding / evidence | Classification | Next action |
|---|---|---|---|---|---|
| AMQ-STR-001 | P0 | Shared state / quiz lifecycle | `script_004` has many shared owners for quiz state and mixes settings, suggestion, answer, playback and timer behavior. | EVIDENCE_BACKED_RISK | Map reads/writes and lifecycle transitions; add tests for any uncovered transitions before refactoring. |
| AMQ-STR-002 | P0 | DOM ownership | 205 `getElementById` calls across 43 owners in `script_004`. | EVIDENCE_BACKED_RISK | Build selector/write ownership map for quiz lifecycle and UI teardown. |
| AMQ-STR-003 | P0 | Timer/listener lifecycle | Existing audit identifies timer, animation, event-listener and window-export touchpoints in `script_004`; ownership/cleanup is not proven exhaustively. | AUDIT_REQUIRED | Inventory registrations, matching removals, re-entry behavior and teardown. |
| AMQ-STR-004 | P1 | Mixed data/runtime | `script_001` remains a partial extraction; it is not a pure database payload. | AUDIT_REQUIRED | Trace remaining initialization and persistence consumers; preserve order and exact build fingerprint. |
| AMQ-STR-005 | P1 | External API/cache lifecycle | `script_003` ANN cover flow and `script_040` EMQ index/list operations depend on live APIs, caches, storage and DOM. | EVIDENCE_BACKED_RISK | Map async cancellation, stale responses, retry and cache invalidation behavior. |
| AMQ-STR-006 | P1 | Cross-fragment dependencies | AST records 75 cross-fragment direct-call edges and 359 ambiguous name-resolution records. | AUDIT_REQUIRED | Resolve high-risk call sites with lexical/context-aware review; do not treat counts as defects. |
| AMQ-STR-007 | P1 | Unresolved/global calls | AST records 577 unresolved/external/global direct-call edges. | AUDIT_REQUIRED | Prioritize high-impact lifecycle/state functions and document expected globals/API ownership. |
| AMQ-STR-008 | P1 | Event-handler overlap | Existing suggestion UI audit found overlapping handlers across `script_004`, `script_007`, and `script_008`, including a known `aria-expanded` mismatch in the legacy click path. | EVIDENCE_BACKED_RISK | Reconfirm current behavior against current branch; define a single owner and regression test before changing handlers. |
| AMQ-STR-009 | P1 | Native storage policy | CI covers native-origin storage/custom-list flows, but production-domain policy and full IndexedDB failure modes remain open. | EXTERNAL_GATE | Define allowed storage mutations and test blocked/quota/corrupt database cases in an approved environment. |
| AMQ-STR-010 | P1 | Multiplayer lifecycle | CI exercises mocked room/phase/draft/reconnect behavior, not a live two-client server session. | EXTERNAL_GATE | Run a controlled live two-client reconnect/phase test before lifecycle extraction. |
| AMQ-STR-011 | P1 | Audio lifecycle | Browser contracts cover mocked playback lifecycle, not real provider/network playback. | EXTERNAL_GATE | Add real-provider acceptance with failure, delayed start, pause/resume and teardown cases. |
| AMQ-STR-012 | P1 | CSS cascade | 50 CSS fragments remain order-locked; Firefox/cascade comparison is not complete. | EXTERNAL_GATE | Preserve order; establish Chromium/Firefox visual and computed-style baselines before CSS cleanup. |
| AMQ-STR-013 | P2 | Override layers | Several early script fragments are classified as later override layers whose intent and ordering need verification. | AUDIT_REQUIRED | Trace definitions and load order; only remove an override with caller and browser regression evidence. |
| AMQ-STR-014 | P2 | Legacy coupling | `script_002` was retained because of page state/DOM coupling; `script_003` and `script_040` likewise lack a safe pure boundary in the audited scope. | EVIDENCE_BACKED_RISK | Treat as bounded ownership audits, not a mandate to split. |
| AMQ-STR-015 | P2 | Module contract vs decoupling | 13 module rows have CI contracts but are explicitly not all fully decoupled. | AUDIT_REQUIRED | Review each module's hidden globals, mutable state and side effects; preserve exact-source/build contracts. |
| AMQ-STR-016 | P2 | Payload preservation | Two data payload rows are intentionally preserved; JS parsing/cleanup is not appropriate for them. | MAINTAINABILITY_CANDIDATE | Keep byte fingerprints and exclude from generic JS cleanup. |
| AMQ-STR-017 | P2 | Test gaps | Current CI passes its covered paths, but environment-specific acceptance gates remain unverified. | EXTERNAL_GATE | Track each external gate independently; never equate CI success with full product acceptance. |
| AMQ-STR-018 | P2 | Duplicate/obsolete code | The available evidence does not yet prove which apparent duplicates or compatibility branches are dead. | AUDIT_REQUIRED | Build caller/data-format history evidence first; do not mass-delete by text similarity. |
| AMQ-STR-019 | P2 | Readability | No full line-by-line readability audit has been performed across all source fragments in this checkpoint. | AUDIT_REQUIRED | Record concrete high-complexity functions during bounded audits; avoid cosmetic churn. |
| AMQ-STR-020 | P2 | Performance | No baseline performance profile was collected as part of this static inventory. | AUDIT_REQUIRED | Measure startup, candidate-pool generation, suggestion input latency and rendering before optimizing. |

## Immediate execution order

1. Correct stale acceptance status in the engineering docs and keep the V82.82 product fingerprint locked.
2. Audit the quiz lifecycle ownership cluster (AMQ-STR-001 to 003) without changing production code; turn uncovered behaviors into deterministic tests.
3. Revalidate the suggestion UI ownership issue (AMQ-STR-008) against the current exact source and existing browser tests.
4. Audit one bounded non-lifecycle fragment at a time, beginning with a clear question and a testable acceptance condition.
5. Keep CSS, payload, storage schema, real audio and multiplayer lifecycle out of broad cleanup until their gates are explicit.

## Validation limits for this checkpoint

- GitHub acceptance evidence was rechecked for run 39141992306: both jobs completed successfully.
- Static findings are derived from the existing parser-backed report, closeout matrix, and prior bounded audits; this checkpoint does not claim a new full repository scan or a new runtime execution.
- No new unit, browser, performance, Firefox, real-audio, production-domain or live-multiplayer test was executed by the act of writing this report.
- Product HTML/source fingerprints remain locked; this checkpoint only adds engineering inventory and updates engineering status records.

## Rollback

Revert this documentation-only checkpoint or return to parent commit `b42ddee31db8becae02b9822dd44bdcb0c4f9cee`. No product rollback is required because production artifacts are unchanged.
