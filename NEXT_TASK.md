# Next Task

**Priority 1: continue Song Select visual correction. Do not switch to Home, Play, or Settings.**

## Verified starting point

- Active branch: `v82.85.30-proto34-song-select-catalog-density-01`
- Last source commit tested: `c0737573422be39ea5bebd19639e0d785ad1a64d`
- CI-generated artifact/report commit: `67c9cb875c2347635fae97a2121a7e48012c609f`
- Run: https://github.com/murorachi/Amq-/actions/runs/39608921983 — static PASS, browser PASS, evidence generation PASS.
- Current generated HTML SHA-256: `660738b4b193ccbfe6eb57931c520bd75ceca23239459cbe6b7a85269f3f41c6`
- Artifact ZIP SHA-256: `869cacdfce82e698146ce35579427024f75fa58efed4a51f4d7649910122a823`
- Immutable Proto25 baseline SHA-256: `5a0f18f47fb059427b385484086c66dd14716a03843fcba37f9eb5fe89a7d66f`.
- Rollback candidate 10 SHA-256: `21a608f1357f020b6e56e8d1dec6735ef2da9bcccb4b34fcf5541c4f535f2421`.

## Latest test state

- Static assertions/build: PASS.
- Playwright browser acceptance: PASS.
- Page errors / console errors: 0 / 0.
- Matched-viewport evidence generation: PASS.
- Visual acceptance: **NOT ACCEPTED**. Diagnostic normalized MAE is 0.269961 and changed-pixel ratio is 0.773776. These are not similarity percentages.
- Exact osu! Stable client source commit corresponding to Wiki release label `20260924.1`: NOT VERIFIED.

## Screenshot review findings

Compared the actual 1280×720 candidate screenshot against the pinned osu! Stable screenshot.

1. The center scene is mostly empty and dark; the background art is not convincingly integrated.
2. The central title/content is partly obscured by the right catalog overlay and is not visually balanced.
3. Song rows are readable and dense, but their cover/placeholder treatment and card styling do not resemble the Stable reference.
4. The upper catalog chrome consumes too much visual attention and does not match the reference's Group/Sort plus category tabs hierarchy.
5. The overall composition remains materially different; do not claim 90% similarity or promote this candidate.

## Next implementation steps

1. **Fix artifact versioning first.** The workflow has regenerated different HTML under the same candidate-11 path. Preserve the existing candidate 11 artifact/hash as an immutable checkpoint, update the builder/test/workflow paths to create candidate 12, and never overwrite earlier candidates.
2. Diagnose actual computed geometry for `.p32-scene`, `.p32-scene-content`, `.p32-info`, and `.p32-catalog` at 1280×720. Add those rectangles to browser diagnostics before further visual CSS changes.
3. Correct the structural composition so the scene artwork/background spans the intended center canvas and the title is fully visible rather than underneath the catalog overlay.
4. Use the existing Catalog scene-background manager as the primary optional art source. With no background configured, retain a deliberate fallback. Keep overlays translucent without making the center a featureless rectangle.
5. Rework catalog rows to better match the reference hierarchy, keeping actual AMQ data, search/filter access, source modes, internal scrolling, and audio dock clearance.
6. Run static and browser checks at 1280×720, 1440×900, 1000×562, and mobile. Review the actual screenshot, overlay, and pixel-diff after each visual correction.
7. Update this file, `CURRENT_STATUS.md`, and `BASELINE.md` after the next accepted checkpoint. Do not label visual acceptance PASS without explicit screenshot review.

## Rollback and immutable baseline

- Candidate 10: `dist/amq_learning_tool_v82_85_30_workspace_proto26_song_select_10.html`, SHA-256 `21a608f1357f020b6e56e8d1dec6735ef2da9bcccb4b34fcf5541c4f535f2421`.
- Candidate 09: SHA-256 `37d5055e91688e7604007d052041aa0f846c04c29793fced2312592f282ea01d`.
- Immutable Proto25 baseline: SHA-256 `5a0f18f47fb059427b385484086c66dd14716a03843fcba37f9eb5fe89a7d66f`.
- Preserve all earlier candidates and the Proto25 baseline.
