# Candidate 203 Validation Report — Workspace Routing and Custom-list Integration

Date: 2026-10-24
Branch: amq-candidate104-songselect-layout-fix
Status: EXPERIMENTAL / NOT ACCEPTED

## Artifact
- File: `amq_learning_tool_v82_85_46_workspace_proto44-osu-songselect-ui_203_priority_custom_list_clicks.html`
- Size: 9,309,775 bytes
- SHA-256: `d5c8c19d52671e05f9d2f9a578c853bb8c0cf4123abc0d27c8d4fa5dc9bf26e6`

## Changes
1. Keep the visible C99 rail as the actual four-entry workspace UI: AniList/MAL import, VNDB, custom lists, learning plan. The old dock remains hidden.
2. Preserve the late-bound route interceptor for legacy watchlist/practice/explore/learningPlan/dashboard/vnList calls only while Song Select is active.
3. Anchor shared-panel geometry to the visible C99 rail where applicable and retain a stable focus invoker.
4. Expose a narrow adapter to the existing `aniCustomPracticeListsV1` data layer; no parallel storage was added.
5. Scope custom-list mode to Song Select's `#amqSongSelectTracklist .songrow[data-work-id]`, add work-ID indexing, and debounce a grid-scoped MutationObserver rather than observing all of document.body.

## Tests
- PASS: 66 executable inline JS blocks passed `node --check`; 0 syntax failures. One JSON data block and two compressed/base64-related blocks excluded.
- PASS: CSS parse: 104 style blocks, 2,689 qualified rules, 0 parse errors.
- PASS: C99 rail renders four visible action buttons in the Playwright catalog context.
- PASS: AniList/MAL modal opens in place; Song Select route remains catalog.
- PASS: VNDB, custom-list and learning-plan panels open in place; no panel/rail overlap in the 2555x1438 harness.
- PASS: focus restoration to the invoking C99 button after VNDB/custom-list/learning panel close.
- PASS: 18 legacy-route panel open/close cycles; Back and Escape close the shared panel; no duplicate panel nodes.
- PASS: custom-list create, duplicate rejection, rename, delete; 0 page errors with in-memory storage shim.
- PASS: direct adapter test adds and removes work ID `4938` from the existing custom-list data object.
- NOT VERIFIED: clicking a visible Song Select row to toggle membership. The set_content harness's synthetic event did not reach the tested listener as expected; adapter test alone is not UI acceptance.
- BLOCKED: durable reload persistence and native file:// browser navigation.
- NOT RUN: live external imports, import failure/retry, cover retry, real audio, full 26-case regression suite, pixel comparison, multiplayer lifecycle regression.

## Recovered test source assessment
- `engineering/test_candidate82_workbench.py` and `engineering/CANDIDATE82_CUSTOM_LIST_CRUD_TEST.json` exist on the branch.
- Candidate 82 smoke test expects obsolete `batch` and `analysis` workspace keys. Those expectations conflict with current user requirements and must be replaced with current C99 rail assertions.
- Candidate 120 provides 12 persistence/workspace operations and a 17-pass stage-2 report. These are evidence records, not a single executable 26-test suite. Build an explicit adapted 26-case suite and document its case mapping.

## GitHub artifact delivery
- HTML upload: NOT UPLOADED / NOT VERIFIED.
- Candidate 203 remains experimental, not accepted.
