# Batch 14 — Home stable-play modal superseded CSS cleanup

- Source Candidate308: 1,665,019 bytes, SHA-256 `89e7829e8228e3b4ed1061657e6c2f7245496e4dd6e158344a6c6c76518b4d67`.
- Candidate309: 1,664,430 bytes, SHA-256 `922b21b30661b81c7dd343a6e09a22a016c166dea0ead9d24ba521742b141c5f`.
- Removed 17 superseded declarations / 589 bytes from the first unconditional occurrences of `#amqStablePlayPanel`, `#amqStablePlayChoices`, `#amqStablePlayChoices button`, and `#amqStablePlayChoices button:first-child` in `amq-workspace-osu-composition-v24`. Kept properties not proven redundant.
- CSS rules unchanged at 3,423; declarations 12,161 → 12,144. JavaScript, non-style HTML, data, route, storage, multiplayer and learning-system code unchanged.
- PASS: JS syntax 68/68; CSS parsing 0 errors; duplicate DOM IDs 0; scripts unchanged; non-style HTML unchanged; Chromium computed styles 6/6 desktop/tablet/mobile Home/Song Select scenarios, zero differences (47 properties per element; synthetic stable-play modal nodes included).
- Full-app E2E NOT RUN. Candidate309 HTML remote upload BLOCKED. Candidate309 is not promoted; formal baseline remains Candidate302.
- Rollback: Candidate308 SHA-256 `89e7829e8228e3b4ed1061657e6c2f7245496e4dd6e158344a6c6c76518b4d67`.
