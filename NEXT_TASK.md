# Next Task

**Priority 1: continue Song Select visual correction. Do not switch to Home, Play, or Settings.**

## Verified starting point

- Active branch: `v82.85.30-proto34-song-select-catalog-density-01`
- Tested source commit: `f449129ea01221ab48c2e04f8560b00b61f52f22`
- CI artifact/report commit: `8361c21e3cd391e56b37f4a23fd635ddec54330e`
- Latest run: https://github.com/murorachi/Amq-/actions/runs/39615864371 — static PASS, browser PASS, evidence generation PASS.
- Candidate 12: `dist/amq_learning_tool_v82_85_30_workspace_proto26_song_select_12.html`
- Candidate 12 SHA-256: `8934c12d814d8846f90f6331d1b0757f17a86b20f12e336619c27371c7dd4470`
- Artifact ZIP SHA-256: `cf1053e793e7fb73ce2db9565ca75e766a3c1647efcc8b4ea28a265609d277e2`
- Immutable Proto25 baseline SHA-256: `5a0f18f47fb059427b385484086c66dd14716a03843fcba37f9eb5fe89a7d66f`.
- Rollback candidate 10 SHA-256: `21a608f1357f020b6e56e8d1dec6735ef2da9bcccb4b34fcf5541c4f535f2421`.

## Latest test state

- Static assertions/build: PASS.
- Playwright browser acceptance: PASS.
- Page errors / console errors: 0 / 0.
- Scene geometry/title overlap assertion: PASS.
- Matched viewport screenshot and diff evidence generation: PASS.
- Visual design acceptance: **NOT ACCEPTED**. Diagnostic normalized MAE 0.266530 and changed-pixel ratio 0.849977; these are not similarity percentages.
- Exact osu!Stable client source commit corresponding to Wiki release label `20260924.1`: NOT VERIFIED.

## Screenshot review findings

Candidate 12 fixes the major title/catalog overlap and full-stage background geometry, but it is not yet visually close enough.

1. The center is still mostly a blue-gray gradient, without convincing artwork filling the scene. The default screenshot does not have a configured custom background.
2. The left information panel remains too much like a static dashboard card rather than the osu!Stable-style in-scene leaderboard/details.
3. Catalog card images still show placeholder/overlay treatment; inspect the actual image URLs and loaded dimensions before changing CSS. Do not fabricate external artwork or mask broken images with arbitrary icons.
4. Catalog top controls remain visually dense and differ from the reference hierarchy.
5. Overall visual design remains materially different; do not claim 90% similarity or promote candidate 12.

## Next implementation steps

1. Keep candidate 12 and prior candidates immutable. The builder now outputs candidate 12 separately; use candidate 13 for the next distinct HTML output.
2. Diagnose the first several catalog cover images in Playwright: source URL, current source URL, complete state, natural dimensions, computed object-fit, and overlay element. Determine whether the placeholder is data-driven or a CSS overlay before changing it.
3. Verify why the scene background is not receiving usable cover art. If the existing Catalog background manager has a user-configured image, preserve it; if none is configured, create a deliberate but subdued fallback and don't silently force an external image.
4. Rebalance the left panel, center art canvas, and right song list against the pinned reference. Keep the center title fully clear of the catalog; maintain a single-column dense list, scroll ownership, audio dock clearance, and existing app behavior.
5. Run static and browser checks at 1280×720, 1440×900, 1000×562, and mobile. Review the actual screenshot and overlay after each visual correction.
6. Update this file, CURRENT_STATUS.md, and BASELINE.md after each verified checkpoint. Never mark visual acceptance PASS based only on browser assertions.

## Rollback and immutable baseline

- Candidate 10: `dist/amq_learning_tool_v82_85_30_workspace_proto26_song_select_10.html`, SHA-256 `21a608f1357f020b6e56e8d1dec6735ef2da9bcccb4b34fcf5541c4f535f2421`.
- Candidate 09: SHA-256 `37d5055e91688e7604007d052041aa0f846c04c29793fced2312592f282ea01d`.
- Immutable Proto25 baseline: SHA-256 `5a0f18f47fb059427b385484086c66dd14716a03843fcba37f9eb5fe89a7d66f`.
- Preserve all earlier candidates and the Proto25 baseline.
