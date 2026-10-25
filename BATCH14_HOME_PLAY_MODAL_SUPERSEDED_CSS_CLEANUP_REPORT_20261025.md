# Batch 14 — Home stable-play modal superseded CSS cleanup

## Baseline and output
- Working parent: Candidate308, 1,665,019 bytes, SHA-256 `89e7829e8228e3b4ed1061657e6c2f7245496e4dd6e158344a6c6c76518b4d67`.
- Candidate309: 1,664,430 bytes, SHA-256 `922b21b30661b81c7dd343a6e09a22a016c166dea0ead9d24ba521742b141c5f`.
- Formal baseline remains Candidate302; Candidate309 is not promoted.

## Changes
- Edited one style block: `amq-workspace-osu-composition-v24` (style index 91).
- Removed 17 declarations / 589 bytes from the first unconditional occurrences of `#amqStablePlayPanel`, `#amqStablePlayChoices`, `#amqStablePlayChoices button`, and `#amqStablePlayChoices button:first-child`.
- These properties are superseded by later same-selector rules and the later Candidate99 correction block. Properties not proven redundant were retained, including panel text color, button layout/alignment, and interaction styling.
- CSS rule count unchanged at 3,423; declaration count 12,161 → 12,144.
- No JavaScript, non-style HTML, data, route, storage, multiplayer, or learning-system code changed.

## Verification
- PASS — JavaScript syntax: 68/68 executable scripts.
- PASS — CSS parsing: 0 errors.
- PASS — duplicate DOM IDs: 0.
- PASS — all script contents unchanged.
- PASS — non-style HTML exactly unchanged.
- PASS — isolated Chromium computed-style regression: 6/6 desktop/tablet/mobile Home and Song Select scenarios; 47 properties per element; zero differences. Representative synthetic Home stable-play modal nodes were included in the Home scenario.
- NOT RUN — full-app E2E. CSS-only comparison does not validate live user interactions or dynamic route transitions.
- BLOCKED — remote upload of Candidate309 HTML has not been completed/verified.

## Rollback
Restore Candidate308: `amq_learning_tool_v82_86_19_candidate308_home_mobile_orphan_css_cleanup_20261025.html`, SHA-256 `89e7829e8228e3b4ed1061657e6c2f7245496e4dd6e158344a6c6c76518b4d67`.

## Next batch
Continue Home / Song Select CSS review from Candidate309. Check exact orphan selectors and same-condition duplicate declarations; preserve uncertain/dynamic selectors and avoid expanding into unrelated modules.
