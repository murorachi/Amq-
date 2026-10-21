# Next Task

**Priority 1: continue Song Select visual correction. Do not switch to Home, Play, or Settings.**

## Verified starting point

- Branch: `v82.85.30-proto34-song-select-catalog-density-01`
- Latest tested source: `38921fb2d206b908b363a19d804c2f79410d6fcb`
- Generated candidate/report commit: `4d58e6a9c359f323a778c87271d54d1cc828a7d1`
- Candidate: `dist/amq_learning_tool_v82_85_30_workspace_proto26_song_select_11.html`
- Candidate SHA-256: `10d94cdd4c1eb69f4bd83fdde3538390a4ccef12240d595c81c28a54c427a57a`
- Actions run https://github.com/murorachi/Amq-/actions/runs/39602822402: static PASS, browser PASS, evidence generation PASS.
- Candidate 11 is a functional checkpoint only. Visual acceptance remains NOT VERIFIED.
- Rollback candidate 10 SHA-256: `21a608f1357f020b6e56e8d1dec6735ef2da9bcccb4b34fcf5541c4f535f2421`.
- Immutable Proto25 baseline SHA-256: `5a0f18f47fb059427b385484086c66dd14716a03843fcba37f9eb5fe89a7d66f`.

## Visual audit findings

Pinned reference: https://raw.githubusercontent.com/ppy/osu-wiki/ae2c6443a4264e5429ea7bcd2f3503be8a518a50/wiki/Client/Interface/img/song-selection.jpg

- Candidate screenshot, overlay, and pixel-diff are in workflow artifact https://github.com/murorachi/Amq-/actions/runs/39602822402/artifacts/12347311118.
- Diagnostic normalized MAE: 0.273457; 78.27% of pixels have max-channel difference >=24. These metrics are not a similarity score, but visual inspection confirms major differences from the reference.
- Candidate 11 fixes the collapsed catalog list: at 1280×720 the grid is 185.48px high with internal scrolling and at least three full cards above the player. This is not yet enough visual fidelity; the reference displays a denser song list.
- The current candidate uses opaque three-zone panels, a large central title treatment, a selected-track information panel at left, and a right catalog. The reference instead uses a full-screen background with translucent overlays, ranking/detail content on the left, top Group/Sort controls, and a dense song list on the right.
- The toolbar remains 94px high (search plus two filter rows). Source modes, category tabs, catalog header, counter and load-more control consume further vertical space.

## Next implementation steps

1. Keep the immutable baseline and candidate 10 untouched. Continue from candidate 11 source on the Proto34 branch.
2. Rework only Song Select composition and catalog density. Preserve the existing scene-background manager, audio player, four-workspace dock, real AMQ data, source modes, search/filter controls, and selected-song behavior.
3. At 1280×720, target at least six fully visible song rows in the scroll viewport where practical. Reduce vertical chrome by making the search field one row and placing the existing filters in a compact, horizontally scrollable strip; keep every filter reachable and usable. Keep source modes and category tabs single-row.
4. Bring the main visual hierarchy closer to osu! Stable: background art should read as a continuous scene rather than a boxed center panel; use restrained translucent overlays; match the reference's top controls and denser right-side song list. Do not delete AMQ features just to improve a screenshot.
5. Add browser geometry assertions for filter reachability, six-row density target, internal scrolling, player clearance, and all existing controls. Run static and browser tests at 1280×720, 1440×900, 1000×562, and mobile.
6. Review the matched-viewport screenshot, overlay and pixel-diff after every visual correction. Do not claim 90% similarity from a pixel metric. Visual acceptance requires explicit review and evidence.
7. Once a stage passes, verify the generated HTML exists remotely, check its exact SHA-256 and byte size, and update this file plus CURRENT_STATUS.md and BASELINE.md. Preserve rollback instructions.

## Remaining acceptance scope

- Visual similarity / 90% target: NOT VERIFIED.
- Exact osu! Stable client source commit matching Wiki label `20260924.1`: NOT VERIFIED.
- Real audio output, full search/sort edge cases, Enter/double-event regression, full quiz lifecycle, multiplayer lifecycle, Home/Play/Settings/profile, light mode, backup/restore: NOT RUN or not fully verified.

## Rollback

- Candidate 10: `dist/amq_learning_tool_v82_85_30_workspace_proto26_song_select_10.html`, SHA-256 `21a608f1357f020b6e56e8d1dec6735ef2da9bcccb4b34fcf5541c4f535f2421`.
- Candidate 09: SHA-256 `37d5055e91688e7604007d052041aa0f846c04c29793fced2312592f282ea01d`.
- Immutable Proto25 baseline: SHA-256 `5a0f18f47fb059427b385484086c66dd14716a03843fcba37f9eb5fe89a7d66f`.
