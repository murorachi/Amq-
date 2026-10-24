# Candidate 209 Validation — 2026-10-24

Status: EXPERIMENTAL, NOT ACCEPTED. Rebuilt directly from Candidate 207; Candidate 208 was intentionally not used as a source.

## Baseline and artifact
- Recovery baseline remains Candidate 178: SHA-256 `b91109c7c660be064cedf76b20e473b12ca415be8e0650f16d8086339c2a9f80`.
- Direct source: Candidate 207: 9,310,496 bytes; SHA-256 `2f3a092a139628daa48bc113d2a192f41e2d7474182471ed926de3de49fd6100`.
- Candidate 209: `amq_learning_tool_v82_85_46_workspace_proto44-osu-songselect-ui_209_rebuilt_songselect_from_207.html`.
- Size: 9,324,855 bytes.
- SHA-256: `8a38e08cfb904703c02b7911b7974c8c3d6fc3617bacc6b6b85ef29e8d90ded1`.

## Changes from Candidate 207
- Removed the Song Select works-catalog toggle and forced the list runtime to remain song-first.
- Rebuilt the top area into a dark, blue-edged frame containing the existing search and filter controls; the search placeholder is now “打字即可搜尋！” and the existing input node is preserved to retain listeners.
- Replaced the actual row “更多” disclosure markup with inline tag/reset/blacklist actions; removed the dropdown rather than merely hiding it.
- Added a compact action bar next to the bottom player controls for tag and blacklist operations.
- Repositioned the bottom player as a centered osu!stable-inspired dock with a blue line on its top edge and black background below it.
- Added selection centering and row-selection playback hooks; random seek is attempted after audio metadata is available for tracks longer than 45 seconds.
- Preserved Candidate 207 unchanged. Candidate 208 was not used as a source.

## Validation
- PASS: 68 executable inline JavaScript blocks passed `node --check`; 0 syntax failures. Two non-JS/data payload blocks excluded.
- PASS: CSS parser found 0 parse errors across 105 style blocks and 2,722 qualified rules.
- PASS (static source assertions): the Song Select “更多” disclosure markup is absent; the work-catalog toggle creation is absent; the Candidate209 layout/controller modules are present.
- BLOCKED: Direct Chromium headless file navigation did not finish within 45 seconds. No browser interaction assertions are counted as passed.
- NOT VERIFIED: search result filtering in a real browser; exact frame placement at reference resolutions; wheel-selected song centering and autoplay; random seek behavior; tag/blacklist action wiring; persistence after reload; live importers; actual cover loading; hidden background modal/EMQ/MIX delays; screenshot/pixel comparison against IMAGE1–IMAGE5.

## Known gaps
- The unified AniList/MAL/VNDB import workspace and efficient batch organization workflow are not complete in this candidate.
- Animation cover loading and the EMQ/MIX delay/background-modal issue remain unverified and unfixed.
- The requested icon redesign is not included.
- No formal acceptance; no HTML upload or remote HTML SHA-256 readback verified.
