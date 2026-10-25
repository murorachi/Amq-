# Batch 16 — Home / Song Select theme and stable-play modal CSS cleanup

## Baseline and output
- Working parent Candidate310: 1,664,118 bytes; SHA-256 `34ba5cf818de8984efbf986f53a3c9d5da673fd3fe1cae3ff2e8e67bc7fe65f9`.
- Candidate311: 1,662,516 bytes; SHA-256 `dbfac39ea961af4d761c25cc49d08ebdaea29fbaee0cd9225a720105a31d4996`.
- Formal baseline remains Candidate302, SHA-256 `f718a744057be0a33d371306f1742aaeede90e84f33d9e62ab45f5e6db488abd`.

## Changes
- Removed 55 superseded/duplicate CSS declarations, reducing the file by 1,602 bytes.
- Removed first duplicate `:root` theme-variable declarations in Home (`--amq-osu-*`) and workspace (`--ws-*`) style blocks; later same-selector `:root` rules remain the effective definitions.
- Removed four obsolete Home profile/player card sizing declarations superseded by later same-selector declarations.
- Removed old stable-play modal declarations only where Candidate99 later defines the same selector, property and matching media condition. Non-overridden properties such as button alignment, interaction states and cursor styling were retained.
- Changed style blocks: `amq-osu-home-composition-v23` and `amq-workspace-osu-composition-v24`. No JavaScript, non-style HTML, data, route, storage or app behavior code changed.
- `.relationCanvas`, `.mpReadyBar`, quiz, multiplayer and learning-system selectors were not touched.

## Verification
- PASS — JavaScript syntax: 68/68 executable scripts.
- PASS — CSS parse: 0 errors; rules unchanged at 3,423; declarations 12,135 → 12,080.
- PASS — duplicate DOM IDs: 0.
- PASS — script contents unchanged; non-style HTML byte-identical.
- PASS — isolated Chromium computed-style regression: 6/6 scenarios (Home settings open and Song Select at desktop 1440×900, tablet 768×1024, mobile 390×844), 47 properties per element, zero differences. Synthetic stable-play modal nodes included.
- NOT RUN — full-app E2E; this is an isolated CSS regression, not a live route/interaction test.
- BLOCKED — candidate HTML remote upload and remote SHA verification are not yet confirmed.

## Rollback
Restore Candidate310: `amq_learning_tool_v82_86_21_candidate310_home_settings_superseded_layout_css_cleanup_20261025.html`, SHA-256 `34ba5cf818de8984efbf986f53a3c9d5da673fd3fe1cae3ff2e8e67bc7fe65f9`.

## Next batch
Continue from Candidate311. Focus on remaining exact same-selector/same-condition overwritten declarations in Home/Song Select styles. Keep uncertain dynamic selectors, `.relationCanvas`, `.mpReadyBar`, and shared behavior styles. Prioritize resolving candidate HTML remote delivery verification. Do not promote Candidate311 without the required acceptance decision.
