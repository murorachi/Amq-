# Candidate 208 Validation — 2026-10-24

Status: EXPERIMENTAL, NOT ACCEPTED.

## Baseline and artifact
- Recovery baseline remains Candidate 178: SHA-256 `b91109c7c660be064cedf76b20e473b12ca415be8e0650f16d8086339c2a9f80`.
- Immediate source: Candidate 207: 9,310,496 bytes; SHA-256 `2f3a092a139628daa48bc113d2a192f41e2d7474182471ed926de3de49fd6100`.
- Candidate 208 artifact: `amq_learning_tool_v82_85_46_workspace_proto44-osu-songselect-ui_208_stable_frame_player_workspace_consolidation.html`.
- Candidate 208 size: 9,324,981 bytes.
- Candidate 208 SHA-256: `15cfd2caa7045e3cc585bfd6e4bc8c35b72e2e70e3d97a7a3111c0228d67f892`.
- Candidate 207 is preserved unchanged.

## Changes
- Added a black, blue-accented Song Select top filter frame and a transparent search bar with the requested placeholder.
- Moved the existing search/filter controls into the Song Select frame while preserving their DOM nodes/listeners.
- Corrected selected-row width styling to avoid the selected row being widened only on one edge; added centered scrolling on direct row selection.
- Added selected-song autoplay on direct row selection and a random seek point after media metadata loads for clips longer than 45 seconds.
- Added a dock action bar for familiarity states, tags, and blacklist toggling, reusing existing row controls/APIs where present.
- Removed the work-catalog toggle from the visible mode row and normalized the hidden singer-mode path to the song list.
- Replaced the visible VNDB rail entry with a batch-organization entry wired to the existing selection-mode action. This does NOT yet unify VNDB import into the AniList/MAL import modal; that remains unfinished.

## Tests
- PASS: 68 executable inline JavaScript blocks passed `node --check`; 0 syntax failures. Two data/payload blocks were excluded.
- PASS: CSS parse check across 105 style blocks, 2,715 qualified rules, 0 parse errors.
- BLOCKED: Full Playwright browser harness timed out with a Node EPIPE while processing the 9.3 MB document. No UI interaction assertions can be counted from that run.
- NOT RUN: Native `file://` acceptance; durable storage/reload; real AniList/MAL/VNDB imports; real audio and random seek behavior; cover loading/retry; actual batch selection operations; pixel comparison against IMAGE1–IMAGE5.
- NOT VERIFIED: Search filtering in the actual browser, selected row centering/playback, and the new dock action bar. Static syntax is not behavioral acceptance.

## Risks / unfinished
- Need an approved non-opaque browser context for full interaction and persistence tests.
- Confirm the new top frame does not clip at target resolutions and that relocated filters remain usable.
- Verify the new action bar's tag/blacklist operations against the real data store.
- Implement a shared import workspace for AniList/MAL and VNDB without losing either importer.
- Validate the requested player placement against IMAGE4/IMAGE5 and fix bottom line alignment using screenshots.
- Fix animation-cover loading only after confirming source data and the existing cover API.
- Investigate long waits/hidden background modals when EMQ/MIX controls are clicked.
- Replace the current app icon only as a separate, testable visual change after the main Song Select regressions.

## GitHub
- Documentation checkpoint is being updated on `amq-candidate104-songselect-layout-fix`.
- Candidate 208 HTML upload and remote SHA-256 readback: NOT VERIFIED. Do not treat this candidate as accepted.
