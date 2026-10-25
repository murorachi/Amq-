# Batch 8 — Shared OpenCC loader integration

Date: 2026-10-25

## Baseline and candidate
- Baseline: `amq_learning_tool_v82_86_13_candidate302_emq_loader_state_validation_20261025.html`
- Baseline: 1,720,249 bytes; SHA-256 `f718a744057be0a33d371306f1742aaeede90e84f33d9e62ab45f5e6db488abd`.
- Candidate: `amq_learning_tool_v82_86_14_candidate303_opencc_shared_loader_20261025.html`
- Candidate: 1,720,527 bytes; SHA-256 `ffb223a37f2ba7f243430c7e0a643f8916ebae13f809d83cc2b8cbd9153df1c8`.
- Baseline preserved unchanged.

## Root cause and change
AMQ `ani-chinese-title-system-v8237` and EMQ `ani-emq-chinese-titles-v8259` each independently created a script element for the same pinned OpenCC CDN file. Added page-level singleton `window.__aniOpenCCLoaderV1`; EMQ now uses the shared loader while preserving its local six-second consumer timeout. The shared loader retains the AMQ caller's 15-second overall timeout.

Only script blocks 31 and 41 changed. The other 68/70 script blocks and all 109 CSS blocks remain unchanged. The OpenCC URL appears once. No storage, routing, quiz, catalog or data schema changed; no features deleted.

## Tests
- Inline JavaScript syntax: 67/67 PASS.
- Concurrent AMQ/EMQ callers share one converter and trigger one external script request: PASS.
- CDN failure resolves to null with one request attempt and no page error: PASS.
- Preloaded OpenCC factory path: PASS.
- Duplicate DOM IDs: 0; CSS blocks changed: 0.
- Full application E2E: NOT RUN.

## Risks and status
This is a small integration candidate, not a promoted formal baseline. Real CDN behavior and complete AMQ/EMQ title workflows remain unverified in full-app E2E. Remote HTML candidate upload and remote SHA verification are BLOCKED.

## Rollback
Use immutable Candidate302 SHA-256 `f718a744057be0a33d371306f1742aaeede90e84f33d9e62ab45f5e6db488abd`.

## Next
Expand synthetic AMQ/EMQ title workflow tests for cache hit/miss, concurrent conversion and failure fallback. Do not promote Candidate303 until broader validation is available.
