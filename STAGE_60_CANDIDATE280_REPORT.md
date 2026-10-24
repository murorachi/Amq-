# Stage 60: Candidate280 Song Select geometry and cross-workspace acceptance

- Version: `v82.85.94-candidate280-songselect-row-geometry-cascade-cleanup-20261025`
- Artifact: `amq_learning_tool_v82_85_94_candidate280_songselect_row_geometry_cascade_cleanup_20261025.html`
- Size: **9,381,134 bytes**
- SHA-256: `d4329fee9b7795641c657dd67d9993f9b5808c58df44ad9e71cb226153783d98`
- Parent Candidate279 SHA-256: `dec9a2ae140ba8482804f4df3986c60a7e790b1ab009fb4f2de3756c13692038`
- Immutable Candidate277 SHA-256: `b628bfb5b4aec30a34935bcf5aaac095ab405a71ebe482f9a666c2f91a019371`

## Changes

1. Song Select rows now use runtime `--amq-song-row-height` and `--amq-song-art-size` variables instead of a conflicting 130px fixed minimum.
2. Expanded the tracklist canvas left while keeping normal rows aligned to the same right edge. At 1440×900, selected row shifts left 90px and hover row 25.91px; both retain a 0px right-edge difference.
3. Removed the fixed 30px vertical translation applied to every row during selection centering.
4. Added compact 390×844 Song Select layout: full-width song info/list, horizontal navigation rail, and a 92px player dock with separate cover, controls, mode, and progress tracks.
5. Fixed a mobile route leak: when leaving Song Select, the responsive runtime now removes its route-only inline layout styles so the hidden Song Select stage does not push quiz/multiplayer content below the viewport.
6. Multiplayer cards, fields, buttons, focus rings, timer and chat/lobby surfaces now use shared `v79-design-system` tokens; major layout positions remain unchanged.
7. Removed six provably superseded CSS rules/declaration groups. No bulk selector deletion was performed.

## Evidence

- Chromium/Playwright: **14 PASS / 0 FAIL / 2 BLOCKED**.
- Static audit: 109 style blocks; 2,819 CSS rules; zero CSS parse/declaration errors; 67/67 executable inline JS blocks pass `node --check`; 272 static IDs with zero duplicates.
- Candidate277→Candidate280 CSS rule count: 2,825→2,819; duplicate selector occurrences: 682→676. There are still 387 repeated selector strings, so full-site CSS cleanup is not complete.
- Candidate277→Candidate280 home screenshot at 1440×900: 0 changed pixels.
- Song Select reference geometry at normalized viewport ratios: normal row left edge delta +0.309 percentage points; row width −0.657pp; row height −0.056pp; selected shift −0.061pp; dock top −0.069pp.
- Full-frame raw pixel similarity against the osu reference was not scored because the song artwork/content differs. Normalized geometry anchors were compared instead.

## Blockers and remaining risks

- **BLOCKED:** genuine localStorage/IndexedDB persistence across reload. Chromium local HTTP navigation returns `net::ERR_BLOCKED_BY_ADMINISTRATOR`; CRUD used an isolated in-memory storage shim.
- **BLOCKED:** external artwork/audio/API and multiplayer server connection due network/DNS restrictions.
- **BLOCKED:** uploading the 9.38MB HTML body and reading it back from GitHub. The available connector accepts UTF-8 text but has no local-file/binary-path upload interface. This branch contains engineering checkpoint files, not the HTML artifact.
- `#amqWorkspaceDock` remains hidden (0×0) in Song Select; this stage did not reactivate a duplicate dock.
- The original home menu and old batch-organization entries were not redesigned/deleted in this stage. Do not reuse rejected Candidate278. Remaining CSS selector duplicates require evidence-based individual review.

## Rollback

Use Candidate279 SHA `dec9a2ae140ba8482804f4df3986c60a7e790b1ab009fb4f2de3756c13692038`, or immutable Candidate277 SHA `b628bfb5b4aec30a34935bcf5aaac095ab405a71ebe482f9a666c2f91a019371`. Candidate280 is a separate file and does not overwrite either baseline.
