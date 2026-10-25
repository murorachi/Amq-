# Batch 17 — Cross-module CSS / JS deduplication

- Source: Candidate311, 1,662,516 bytes, SHA-256 dbfac39ea961af4d761c25cc49d08ebdaea29fbaee0cd9225a720105a31d4996.
- Candidate312: amq_learning_tool_v82_86_23_candidate312_cross_module_css_js_dedup_20261025.html, 1,648,144 bytes, SHA-256 12e8fbc4c00c2459dd3af2d7c1b099893e144958f5171ad9721c7bc01ebd20cb.
- Formal baseline remains Candidate302: f718a744057be0a33d371306f1742aaeede90e84f33d9e62ab45f5e6db488abd. Candidate312 is not promoted.

## Changes
- Removed 655 superseded CSS declarations across 35 style blocks. Deletion required the exact same selector, nested at-rule condition and property, with a later declaration of equal or stronger !important priority.
- CSS rule count remains 3,423; declarations reduced from 12,080 to 11,425.
- Removed one duplicate V39 quiz answer-mirror input listener; V37 already performs the same update. Remaining V39 behavior is preserved.
- No data payload, storage schema, route, quiz rules, audio, multiplayer or learning-plan logic was intentionally changed.

## Validation
- JavaScript syntax: PASS, 68/68.
- CSS parse: PASS, zero errors.
- Duplicate DOM IDs: PASS, zero.
- Chromium computed-style regression: PASS, 5/5 scenarios with zero differences (Home desktop/mobile, Song Select desktop/tablet, quiz desktop).
- Full-app E2E: NOT RUN. Real audio, persistence/CRUD, multiplayer server and full route workflow remain unverified.

## Remaining work
Route/workspace wrappers, Song Select initialization ownership, observer/timer lifecycles and custom-list fallback integration remain open. Candidate312 HTML upload and remote SHA verification are not verified.

## Rollback
Use immutable formal Candidate302; immediate pre-batch rollback is Candidate311.
