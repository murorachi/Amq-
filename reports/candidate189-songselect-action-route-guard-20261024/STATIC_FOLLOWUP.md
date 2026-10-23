# Candidate 189 Follow-up Static Validation

Date: 2026-10-24
Branch: amq-candidate104-songselect-layout-fix
Status: EXPERIMENTAL / NOT ACCEPTED

## Artifact
- File: amq_learning_tool_v82_85_46_workspace_proto44-osu-songselect-ui_189_songselect_action_route_guard.html
- Size: 9,303,538 bytes
- SHA-256: 8fe6d3a4be97fb6be36f166ea6af425a7e7f8b4918788abadd45b91801cd8cbb

## Test results
- PASS: 65 JavaScript script blocks passed `node --check`.
- PASS: 0 syntax failures among the checked script blocks.
- NOT RUN: 3 large embedded data/compressed blocks were excluded from JavaScript syntax checking.
- FAIL: workspace route integration remains incomplete. Current dock markup has only two `data-ws` buttons (`lists`, `learning`), not four; action routing still contains legacy `watchlist` / `practice` paths.
- BLOCKED: native `file://` browser acceptance, due to environment-level navigation blocking.
- BLOCKED: localStorage persistence assertions in the `page.set_content` harness, because its opaque origin raises SecurityError. This is not evidence of persistence failure or success.
- NOT RUN: full CRUD/reload, external imports, real audio, cover retry, screenshot pixel comparison, multiplayer lifecycle, and full repeated workspace switching.

## Interpretation
Static syntax passing does not establish runtime correctness. Candidate 189 must not be treated as accepted or as a final HTML delivery. The next code change must address the shared workspace routing architecture rather than add another one-off route guard.

## GitHub delivery
- Candidate HTML: NOT UPLOADED / NOT VERIFIED.
- This report and handoff docs are tracked separately from the artifact.
