# Batch 10 — Home / Song Select CSS cascade cleanup

Date: 2026-10-25

## Baseline and artifact
- Source: `amq_learning_tool_v82_86_15_candidate304_opencc_and_diagnostic_cleanup_20261025.html`
- Source SHA-256: `afec1555f4e6a56bb39ffac2622d16a148656ee5c4c5c50a3bb5aa7eab254f21` (1,720,215 bytes)
- Candidate: `amq_learning_tool_v82_86_16_candidate305_home_songselect_css_cleanup_20261025.html`
- Candidate SHA-256: `3bcaaa70fe05b130dd302462a1ef2aa41fbed855f2e12526d526c7675bd07e9f` (1,670,933 bytes)
- Formal baseline remains Candidate302; Candidate305 is not promoted.

## Changes
Removal was limited to earlier declarations proven superseded by a later declaration with the same selector and same applicable at-rule conditions, where later importance was equal or higher. Selector groups containing commas were excluded to avoid deleting declarations affecting other selectors.
- Superseded declarations removed: 1,432
- Empty rules removed after cleanup: 167
- CSS rules: 3,637 → 3,470
- CSS declarations: 13,750 → 12,318
- Style blocks: 109 total, 38 touched
- HTML size reduction: 49,282 bytes (2.86%)

## Validation
- JavaScript syntax: PASS, 66/66; JavaScript content unchanged.
- CSS parsing: PASS, 0 errors.
- Duplicate DOM IDs: PASS, 0.
- Non-style HTML and 69 script contents: unchanged.
- Chromium computed-style comparison: PASS, 6/6 scenarios, zero differences. Scenarios: Home and active Song Select at 1440×900, 768×1024, and 390×844; 412 static DOM elements per scenario.
- Full-app E2E and dynamic-DOM visual acceptance: NOT RUN.

## Limits / rollback
Static computed-style comparison does not cover every JS-generated DOM state, theme change, or full game flow. Uncertain selectors and non-exact cascade cases were retained. Roll back to formal Candidate302 (SHA-256 `f718a744057be0a33d371306f1742aaeede90e84f33d9e62ab45f5e6db488abd`) or regenerate from immutable Candidate304. Candidate305 HTML upload to GitHub is BLOCKED by available tooling; only text reports/status are published. No claim is made that the HTML is present remotely.
