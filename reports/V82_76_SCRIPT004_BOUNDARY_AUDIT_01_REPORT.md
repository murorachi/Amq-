# V82.76 SCRIPT004 BOUNDARY AUDIT 01

Date: 2026-10-18
Type: engineering-only dependency inventory; no production behavior change.

## Objective

Continue semantic modularization without moving quiz settings, candidate selection, playback, answer submission or history code before shared-state and lifecycle dependencies are better understood.

## Source integrity

- `src/scripts/script_004.htmlpart`: 98,849 bytes
- SHA-256: `23dacccdc25538416c4ddba91f4e044df7c4491924d1099d8cdf0a60fb4f4bdc`
- TypeScript parser diagnostics: 0
- Existing module count: 6
- Product HTML: `dist/amq_learning_tool_v82_72.html`, 8,787,018 bytes
- Product SHA-256: `fb075ed4e68eca454051ecd22cc10d3e7a5def193bf2852bf91547d5465da0d8`
- Immutable V82.65 baseline remains 8,786,930 bytes / `abd202a6f96cc08e0969ad05ab8574cc71001733d655bcb5cff6b1a1a5b33a33`.

## Changes

- Added `tools/script004_boundary_audit.cjs`, a TypeScript-parser-backed evidence generator for outer-IIFE shared state, recognized browser/API calls, direct `window` exports, listener call sites and timer/animation call sites.
- Added `reports/CORE_SCRIPT_004_BOUNDARY_AUDIT.md`.
- Added `reports/CORE_SCRIPT_004_SHARED_STATE.csv` and `reports/CORE_SCRIPT_004_API_TOUCHPOINTS.csv`.
- Added `tests/unit/script004_boundary_audit_contract.test.cjs` and integrated it into `tools/run_all_checks.py`.
- Updated architecture, baseline, README, current status, next task and modularization checklist.
- No production source fragment, module body, module marker, runtime order, or product HTML was modified.

## Findings

- High-coupling closure state includes `quizSong`, `quizSettings`, `quizFinished`, `quizActive`, `quizAudioStarted`, `quizStartedAt`, focus-mode state, repeat-prevention state and answer-settlement timing.
- `document.getElementById` appears at 190 call sites in the current source; `localStorage.getItem` and `localStorage.setItem` are also used within multiple function owners.
- Listener registrations include delegated document click handlers, answer-input suggestion wiring, theme/settings listeners, quiz lifecycle events and familiarity-update events.
- Timer sites include playback clip timeouts, auto-next interval/timers and focus-restoration timeouts.
- These are conservative static indicators. The owner/reference counts are heuristic, not a full lexical resolver or dynamic lifecycle trace.

## Validation

- `node tools/script004_boundary_audit.cjs`: 6/6 self-checks passed.
- `node tests/unit/script004_boundary_audit_contract.test.cjs`: 15 assertions passed.
- `python tools/build.py`: passed; product output matched V82.72 expected hash.
- `python tools/run_all_checks.py`: 18 commands passed, 0 failed.
- Unit/contract assertions: 237 passed, 0 failed.
- Browser suggestion integration: 29 assertions passed in the existing constrained `about:blank` fixture-backed test.
- `tools/verify.py`: 112 checks passed, 0 failed; two independent builds matched V82.72 output hash.

## Acceptance boundaries

- This is a static dependency audit, not a runtime behavior acceptance.
- Real-origin localhost acceptance remains blocked in this environment by `ERR_BLOCKED_BY_ADMINISTRATOR`; IndexedDB persistence, live audio/network recovery, Firefox and multiplayer multi-client reconnect remain unverified.
- GitHub still lacks the coherent full source/build/test publication. This checkpoint does not claim otherwise.

## Next task

Create a production-source characterization contract for `getQuizPool()` before moving any candidate-pool code. Cover exact candidate IDs and order, title/anime validity, policy composition, source mode, focus and repeat behavior, custom-list scope, audio eligibility and empty-pool handling. Reuse existing fixtures rather than duplicating them. Only extract a bounded block after the contract demonstrates equivalence.

## Rollback

This checkpoint changes engineering tools, tests and documentation only. To roll back the audit, remove `tools/script004_boundary_audit.cjs`, `tests/unit/script004_boundary_audit_contract.test.cjs`, the three `CORE_SCRIPT_004_*` reports, remove its runner entry and revert the V82.76 documentation overlays. The product HTML and module/source fragments remain at their prior V82.72-compatible state.
