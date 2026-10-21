# Next Task

**Priority 1: continue Song Select visual correction against the pinned osu!stable reference. Do not switch to Home, Play, or Settings.**

## Latest verified functional checkpoint
- Branch: `v82.85.30-proto32-song-select-reference-composition-01`
- Tested source commit: `8a209316f4b000b4fba767019fc1b28556e963bc`
- Generated artifact/report commit: `1ae0419`
- Passing CI: https://github.com/murorachi/Amq-/actions/runs/39584392554
- Candidate: `dist/amq_learning_tool_v82_85_30_workspace_proto26_song_select_09.html`
- Size: 8,961,290 bytes
- SHA-256: `37d5055e91688e7604007d052041aa0f846c04c29793fced2312592f282ea01d`
- Immutable baseline SHA-256: `5a0f18f47fb059427b385484086c66dd14716a03843fcba37f9eb5fe89a7d66f`

## Next implementation stage
1. Keep candidate 09 and all prior candidates immutable. Work from an isolated next-stage branch.
2. Review the pinned reference, candidate screenshot, overlay and pixel-diff image at 1280×720. Correct major structural mismatches first: excessive top navigation controls, left information hierarchy, central scene composition, right catalog density and bottom dock/player placement.
3. Keep AMQ-specific content mapped deliberately. The current three-zone layout is a functional checkpoint, not a high-fidelity osu!stable replica.
4. Verify actual sorting result order and search edge cases: partial text, case, leading/trailing whitespace, CJK, special characters, zero results and mode changes.
5. Verify Enter versus pointer activation and prevent duplicate selection/play events.
6. Run real audio-output acceptance.
7. Keep the selected-song information panel bound to the actual playHistory and quizHistory APIs. If detail history is not retained, show the current honest summary-only state.
8. Generate a uniquely named standalone HTML. Run static assertions, browser tests, geometry checks at 1280×720, 1440×900 and the sidebar-constrained 1000×562 viewport, responsive overflow checks, reference overlay/difference evidence, and relevant regression tests.
9. Keep visual acceptance NOT VERIFIED until actual reference-based corrections support review. Do not interpret MAE or changed-pixel ratio as a similarity score.

## Reference record
- Official Stable release label: `20260924.1` (not a source-control commit).
- Official Wiki commit: `ae2c6443a4264e5429ea7bcd2f3503be8a518a50`.
- Song Select screenshot blob SHA: `1e927a00a1984a5ba20fa5efec639410f349607a`.
- Candidate 09 matched viewport: 1280×720, device scale factor 1.
- Candidate 09 diagnostic normalized MAE: 0.277068.
- Pixels with max-channel difference ≥ 24: 80.57%. Diagnostic only, not a similarity percentage.
- Exact Stable client source commit matching `20260924.1`: **NOT VERIFIED**. Never substitute osu!lazer source.

## Tests and remaining scope
- Static acceptance: PASS.
- Playwright browser acceptance: PASS for workspace switching, scene fallback/configured state, real selected-song title and playback-count source, wrong-answer empty state, EMQ initialization/modes, Escape detail dismissal, 1000×562 overflow, mobile overflow/drawer and zero browser errors.
- Visual evidence generation: PASS; visual acceptance: NOT VERIFIED.
- Real audio output, full search/sort edge cases, Enter/double-event regression, complete quiz lifecycle, multiplayer server lifecycle, Home/Play/Settings/profile visual acceptance: NOT RUN or not yet fully verified.

## Rollback
- Previous candidate 08 SHA-256: `4fcf49520729584e9353f3779551c5f1cd0dc88799aa2ae8cfb69f36c2f4853f`.
- Current candidate 09 SHA-256: `37d5055e91688e7604007d052041aa0f846c04c29793fced2312592f282ea01d`.
- Immutable Proto25 baseline SHA-256: `5a0f18f47fb059427b385484086c66dd14716a03843fcba37f9eb5fe89a7d66f`.
- Do not overwrite any prior candidate or merge PR #10/#11 before visual and functional acceptance.
