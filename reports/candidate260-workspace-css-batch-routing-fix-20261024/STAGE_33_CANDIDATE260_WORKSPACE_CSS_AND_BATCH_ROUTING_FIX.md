# Stage 33 — Candidate260 Workspace CSS & Batch Routing Fix

Date: 2026-10-24 (UTC)

## Baseline and rollback
- Parent Candidate259: `amq_learning_tool_v82_85_73_candidate259_workspace_horizontal_layout_search_20261024.html`
- Parent SHA-256: `28f940dbc8ce2c1b4de0dbf4734d9fe7b6d98d7ecef6149652849b76aaebd370`
- Candidate260 HTML: `amq_learning_tool_v82_85_74_candidate260_workspace_css_and_batch_routing_fix_20261024.html`
- Size: 9,358,373 bytes
- SHA-256: `a19be956afdf10b50dc15bbc10b3c69408e42c8751a838fb8e61313d0d98ed1f`
- Candidate258 and Candidate256 are preserved rollback candidates.

## Root causes fixed
1. The Candidate258 capture listener treated `data-c99-action="vndb"` as import. The left rail reused that action for the song-batch entry, so the importer intercepted the existing batch handler. Candidate260 now intercepts only the actual `import` action.
2. Removed obsolete `.amq210-import-choice` CSS from the existing workspace stylesheet instead of layering another override on top.
3. Removed the duplicated legacy import-hub UI construction. The old alias forwards to the single shared import UI.
4. Edited the canonical workspace panel CSS and existing `geometry()` implementation in place. Panel placement now follows the visible left rail edge plus a small gap, with viewport bounds; it no longer forces a minimum left offset of 480px.

## Tests
- PASS: 67 executable inline JavaScript blocks checked with `node --check`; zero syntax errors.
- PASS: 110 CSS blocks parsed with `tinycss2`; zero parse errors.
- PASS: 273 actual HTML start-tag IDs; zero duplicates.
- PASS: obsolete import CSS removed; static import-vs-batch routing assertions pass.
- BLOCKED: browser visual/click acceptance; Chromium navigation to `file://` and localhost was previously blocked by environment policy.
- NOT RUN: real AniList/MAL/VNDB API behavior, source-scoped removal, dedupe, persistence and error recovery.
- BLOCKED: GitHub HTML upload and remote SHA-256 readback. The connector write API does not accept the local HTML file reference; no HTML upload is claimed.

## Risks / next work
- Real browser validation is still required for panel placement and button routing.
- Batch search currently filters loaded/rendered song rows only. Validate selection ID/checkbox synchronization through filtering, close/reopen and workspace switching.
- Complete Batch 3 acceptance before Batch 4.
