# Next Task

**Priority 1: continue Song Select visual composition against the pinned osu!stable reference. Do not switch to homepage polish.**

## Latest verified checkpoint
- Branch: `v82.85.30-proto31-scene-background-integration-01`
- Tested source commit: `a8bec92c8549d6fcc2cf13ffc0401c150ce247ed`
- Generated artifact/report commit: `6eda007f92417c8bc3614d8451ae0379e3943d4b`
- Passing CI: https://github.com/murorachi/Amq-/actions/runs/39581069788
- Candidate: `dist/amq_learning_tool_v82_85_30_workspace_proto26_song_select_08.html`
- Size: 8,952,996 bytes
- SHA-256: `4fcf49520729584e9353f3779551c5f1cd0dc88799aa2ae8cfb69f36c2f4853f`
- Immutable baseline SHA-256: `5a0f18f47fb059427b385484086c66dd14716a03843fcba37f9eb5fe89a7d66f`

## Next implementation stage
1. Keep candidate 08 and all prior candidates immutable. Work from an isolated next-stage branch.
2. Revisit the pinned Stable screenshot and measure the main visual regions at 1280×720. The reference is from the official osu!-wiki commit below; exact Stable client source commit remains NOT VERIFIED.
3. Recompose the default Song Select hierarchy toward the reference's left information/ranking region, central visual composition, right-side horizontal song/work cards, and bottom controls. Map AMQ-specific content deliberately; do not use it as an excuse to retain unrelated generic layout.
4. Trace actual history API/schema for selected-song play count and last wrong answer. Do not invent fields or data.
5. Verify real sorting/filtering behavior for each mode and add search edge cases: partial text, case, leading/trailing whitespace, CJK, special characters, zero results, and mode changes.
6. Test Enter versus pointer activation, ensure no duplicate selection/play events, and verify keyboard focus.
7. Keep existing player, data stores, list management, batch processing, learning center, and analysis handlers. Add real audio-output acceptance after the UI stabilizes.
8. Generate a uniquely named standalone HTML. Run static assertions, browser tests, geometry checks at 1280×720 and 1440×900, responsive overflow checks, reference overlay/difference evidence, and the relevant regression suite.
9. Keep the visual result marked NOT VERIFIED until reference evidence and actual visual corrections support a defensible review. Do not interpret MAE or changed-pixel ratio as a similarity score.

## Reference record
- Official Stable release label: `20260924.1` (not a source-control commit).
- Official Wiki commit: `ae2c6443a4264e5429ea7bcd2f3503be8a518a50`.
- Song Select screenshot blob SHA: `1e927a00a1984a5ba20fa5efec639410f349607a`.
- Candidate 08 matched viewport: 1280×720, device scale factor 1.
- Candidate 08 diagnostic normalized MAE: 0.277352.
- Pixels with max-channel difference ≥ 24: 91.02%. Diagnostic only, not a similarity percentage.
- Exact Stable client source commit matching `20260924.1`: **NOT VERIFIED**. Never substitute osu!lazer source.

## Tests and remaining scope
- Static acceptance: PASS.
- Playwright browser acceptance: PASS for tested workspace switching, scene-style fallback/configured state, EMQ initialization/modes, Escape detail dismissal, desktop geometry, mobile overflow/drawer and zero browser errors.
- Visual evidence generation: PASS; visual acceptance: NOT VERIFIED.
- Real audio output, search edge cases, actual sort-result assertions, Enter/double-event regression, complete quiz lifecycle, multiplayer server lifecycle, Home/Play/Settings/profile visual acceptance: NOT RUN or not yet fully verified.

## Rollback
- Previous candidate 07 SHA-256: `2aad33f00a7553545784d726dd9b89f07ce90ae390596c277452014605d988f8`.
- Current candidate 08 SHA-256: `4fcf49520729584e9353f3779551c5f1cd0dc88799aa2ae8cfb69f36c2f4853f`.
- Immutable Proto25 baseline SHA-256: `5a0f18f47fb059427b385484086c66dd14716a03843fcba37f9eb5fe89a7d66f`.
- Do not overwrite any prior candidate or merge PR #10/#11 before visual and functional acceptance.
