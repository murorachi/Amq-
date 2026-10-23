# Candidate 205 — Song Select Reference Geometry and Tablet Row Layout

Date: 2026-10-24

## Identity
- Current local candidate: Candidate 205, `amq_learning_tool_v82_85_46_workspace_proto44-osu-songselect-ui_205_tablet_layout_runtime_rootfix.html`
- SHA-256: `e7003bc154bb74fcd89a8d5f0694200ff2ffb849026cce23416c4fe90fc8bd02`
- Size: 9,303,985 bytes.
- Parent Candidate 202 SHA-256: `ffc6e0aaf4ee273f7cff3db38b440bac24624feccc4dc2625120cec33bdca2dc`.
- Candidate 203 was an unsuccessful intermediate attempt because a stylesheet height rule lost to the runtime's inline `!important` geometry. Candidate 204 changed the earlier responsive runtime but still left a later Candidate 180 runtime overriding it. Candidate 205 fixes that later runtime root cause. Candidates 203 and 204 are not delivery candidates.
- Candidate 205 is experimental, not accepted. HTML upload and remote hash verification are NOT COMPLETED.

## Changes
1. Corrected the existing history/ranking placeholder geometry in its owning CSS rule from `top: clamp(190px,25vh,250px)` and a 320px width cap to `top: clamp(132px,15.5vh,225px)` and `width: clamp(300px,28vw,720px)`. This moves the selected-song local history panel up and scales its width to the user's 2555×1438 osu!stable reference.
2. Fixed the later Candidate 180 responsive runtime that overwrote earlier tablet layout changes with `height: calc(100dvh - 220px)`. For 701–900px widths, stage height now reserves the correct space above the dock; row height and artwork size are derived from the available tracklist height to show about 7.5 rows.
3. The local history panel continues to use actual `__aniHistoryAPIv51.getHistory()` records for the selected song only; no fake leaderboard scores/names/avatars are introduced.
4. Workspace modal implementation is unchanged. It retains dim backdrop, Escape close, and selected-song/scroll restoration.

## Tests

### PASS
- Static syntax: 70 executable inline JavaScript blocks checked with Node `--check`; 0 syntax errors. 2 non-executable/empty script blocks skipped.
- Catalog data: AMQ 38,821 rows available; EMQ 16,839; MIX 55,660 with exact source counts. 180 visible catalog rows per mode.
- No horizontal or vertical document overflow at 2555×1438, 1920×1080, 1648×928, 1440×900, 1280×720, 1000×928, 900×700, 900×928, and 390×844.
- Eighth-row clipping: 46.0% at 2555×1438, 1920×1080, 1648×928, 1440×900, and 1280×720; 50.0% at 900×700, 900×928, and 390×844.
- Responsive resize desktop→tablet→mobile: Candidate 205 recalculates tablet row geometry when given time to settle.
- Keyboard ArrowDown changes selected song.
- Local-history renderer test: selected-song history entry is displayed; a synthetic record for a different song is excluded. This tests filtering/rendering only, not persistent storage.
- Workspace modal test: panel opens, backdrop dim is `rgba(5, 7, 13, 0.76)`, Escape closes it, selected song ID and scrollTop are restored exactly at 1648×928.
- GitHub report and status docs are uploaded/read back separately from the HTML.

### BLOCKED / NOT RUN
- Native `file://` and local HTTP navigation return `ERR_BLOCKED_BY_ADMINISTRATOR`.
- `page.set_content` uses an opaque origin and emits two localStorage access-denied errors. Persistent reload, actual stored history and durable settings are NOT verified.
- NOT RUN: custom-list CRUD/persistence, live AniList/MAL/VNDB APIs and cover-failure recovery, real audio playback, full workspace regression, registered pixel-diff.
- Historical Candidate 201 full-frame visual metrics remain low (SSIM 0.37455, MAE 63.7712, RMSE 85.0330); Candidate 205 has not yet received a new registered pixel score. Do not claim visual fidelity.

## Rollback
- Candidate 202 SHA-256: `ffc6e0aaf4ee273f7cff3db38b440bac24624feccc4dc2625120cec33bdca2dc`.
- Candidate 201 SHA-256: `1a353023584509d188cb57a97f3efccff355ccab94d55824d047209d4c8ee093`.
- Candidate 200 SHA-256: `ee8dac05b25c09a2ab6155cd57114203094ffa3b1dd7c4fbc78b9db666eaba3d`.
- Candidate 193 SHA-256: `40592745dd85e41ba8af3bfa3ab56ae34b7f1d698652418b65dfd7d0a3246083`.
- Candidate 170 SHA-256: `089d8cb9f6e63178a9726dbfce9485c8691e81d3600ce5669458a26c7a9d5662`.
- Candidate 169 rollback checkpoint SHA-256: `5913ad864a8841b144de7c72c4deeede765ec5675117667c13f9eb5fe89a7d66f`.

## Next
1. Fix the remaining top-control and bottom-dock hierarchy against the user's reference, using actual measured positions and keeping the scene-background manager/fallback.
2. Recompute registered pixel/region metrics at 2555×1438 after visual changes.
3. Obtain a supported native-origin browser route for persistence, stored-history, custom-list CRUD, imports, and audio acceptance.
4. Publish the HTML to GitHub and verify remote file identity before calling this stage remotely delivered.
