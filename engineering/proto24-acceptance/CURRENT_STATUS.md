# CURRENT STATUS — Proto25 UI Refactor

## Immutable baseline
- Original accepted candidate: branch `v82.85.30-proto24-accepted-delivery-02`, commit `39d250cf5a269a0e2bf8f514474584bcc864f599`.
- Original HTML SHA-256: `c402b2af9e23fe3a1ddef2c78d2f63a79217547c1c3a607e911bacac47d9bc8e`.
- Production and read-only baselines remain untouched.

## Implemented on isolated Proto25 working branch
- Branch: `v82.85.30-proto25-ui-refactor-work-01`.
- Home shell: dark/pink palette, compact profile/player strip, circular osu!-style mark, horizontal menu rows and compact utility links.
- Play menu: cookie-left/menu-right layout; `Single Player` routes to the existing quiz and `Multiplayer` routes to the existing room setup; `Back` closes the submenu.
- Song Select: full-screen split layout, metadata/player controls at left, scrollable song rows at right; original search, selection, playback and familiarity handlers remain in place.
- Workspaces: unified sidebar, action list and dock palette; darkened legacy analytics, learning-plan, spaced-repetition and batch-management panels.
- Settings: left-side Options panel, dark utility/scene-background dialogs, visible focus indicators and reduced-motion support.
- Responsive acceptance coverage added for home, Play menu, catalog, Song Select, Settings and scene-background dialog at 390×844.
- Static CI gate added for HTML parsing, duplicate IDs and executable inline JavaScript syntax.

## GitHub checkpoints
- Stage 02: `v82.85.30-proto25-ui-refactor-stage-02`
- Stage 03: `v82.85.30-proto25-ui-refactor-stage-03`
- Stage 04: `v82.85.30-proto25-ui-refactor-stage-04`
- Stage 05: `v82.85.30-proto25-ui-refactor-stage-05`
- Stage 06: `v82.85.30-proto25-ui-refactor-stage-06`
- Stage 07: `v82.85.30-proto25-ui-refactor-stage-07`
- Stage 08: `v82.85.30-proto25-ui-refactor-stage-08`
- Stage 09: `v82.85.30-proto25-ui-refactor-stage-09`
- Stage 10: `v82.85.30-proto25-ui-refactor-stage-10`
- Stage 11: `v82.85.30-proto25-ui-refactor-stage-11`
- Stage 12: `v82.85.30-proto25-ui-refactor-stage-12`
- Stage 13: `v82.85.30-proto25-ui-refactor-stage-13`
- Stage 14: `v82.85.30-proto25-ui-refactor-stage-14`
- Latest profile presentation fix: `dd25aba28a9045969f9058feb7297e70e8179fa8`; new profile visibility assertion: `ab181077d5875edc0853b26ce8c5ed27aacfdd10`; Stage 23 publish workflow: `340b33384ed97b5c41fa8dbb029ef3588152b088`; validation PR: https://github.com/murorachi/Amq-/pull/7.
- Stage 14 branch was fast-forwarded to the same recorded engineering checkpoint as the working branch. The original Proto24 branch was not changed.

## Verification status
- GitHub file writes and remote read-back: PASS.
- Stage 14 source checkpoint branch equality with working branch at the last comparison: PASS.
- Original Proto24 browser acceptance: PASS for the original Proto24 artifact only.
- Proto25 Actions run and generated HTML/SHA-256 manifest: NOT VERIFIED. The Stage 24 workflow is being repaired to trigger from the isolated validation branch and includes desktop/mobile screenshots for home, workspaces and Song Select plus the test report and SHA-256 manifest. The available GitHub integration here does not expose push-triggered Actions run listing or a run ID for artifact retrieval.
- Local browser attempt: BLOCKED by the execution environment (`ERR_BLOCKED_BY_ADMINISTRATOR` for both local HTTP and file URLs); no local browser acceptance is claimed.
- New profile-card visibility/background assertion and compact-header CSS fix: committed, but NOT YET VERIFIED by a fresh browser run.
- Real audio output, full quiz lifecycle, multiplayer server connectivity/lifecycle: NOT RUN.
- 90% visual similarity: NOT VERIFIED. Official Wiki references have been visually inspected, and deltas are documented, but the new candidate screenshot is still missing.

## Reference gate
- Official Stable release label: `20260924.1`.
- Visual fallback: pinned official osu!-wiki screenshots at commit `ae2c6443a4264e5429ea7bcd2f3503be8a518a50`.
- Exact Stable source commit and screenshot capture build identity remain unknown. No osu!lazer source is used as a substitute.

## Delivery state
- No final Proto25 single-file HTML has been accepted or promoted.
- Do not promote until the stage workflow produces a candidate, all static/browser checks pass, screenshots are reviewed at matching viewports, and SHA-256 is verified.


## Current validation checkpoint (2026-10-21)

- Immutable accepted baseline remains branch `v82.85.30-proto24-accepted-delivery-02`, commit `39d250cf5a269a0e2bf8f514474584bcc864f599`, original HTML SHA-256 `c402b2af9e23fe3a1ddef2c78d2f63a79217547c1c3a607e911bacac47d9bc8e`. It has not been changed.
- Isolated source branch: `v82.85.30-proto25-ui-refactor-work-03`. Latest code checkpoint: `fbb8c8a3c94f554040be07eef38d76b7db359b31`.
- Root cause fixed: the profile/player parent `.amqHomeTopFrame` retained 20px padding and `overflow:hidden`, clipping the 84px children. The first attempted CSS fix was accidentally appended after the module's closing `</style>` and therefore never applied. The selector is now inside the active style block, sets the frame to 86px, clears padding and permits overflow; the test now asserts both child rectangles fit within the parent.
- Failure was captured, not hidden: run [39504869340](https://github.com/murorachi/Amq-/actions/runs/39504869340) failed the new containment assertion and exposed the actual geometry (`topFrame` 84px high, profile/player y=97, clipped at parent bottom). After moving the rule inside the style block, run [39505109779](https://github.com/murorachi/Amq-/actions/runs/39505109779) completed SUCCESS.
- Latest candidate: `dist/amq_learning_tool_v82_85_30_workspace_proto25_stage24.html`; 8,901,420 bytes; SHA-256 `4497f0c48bd2d548bf0f8449c33be74c3728978ee915d3578ee961e3af83d3f9`. The artifact candidate's actual SHA-256 matches its `candidate.sha256` manifest. Remote Stage 24 manifest and `TEST_REPORT.md` were read back and match the run, size and hash.
- Latest artifact: [proto25-stage24-ui-acceptance](https://github.com/murorachi/Amq-/actions/runs/39505109779), artifact ID `12302779205`. Screenshot review confirms the profile name and PP line are no longer clipped; parent frame is 86px and both child cards are 84px.
- Static checks PASS: HTML parsing, duplicate-ID and inline-JavaScript syntax gates. Browser acceptance PASS: all 17 Playwright checks; 0 page errors and 0 console errors. Checks cover native-origin storage and reload persistence, home routes, Single Player / Multiplayer / Back routing, settings/background dialog, mobile horizontal overflow, Learning Center and Analysis styling, catalog/song-select and quiz palettes, reduced-motion behavior, and profile/header geometry.
- Remaining limits: actual audio output, full quiz-answer lifecycle, multiplayer server connectivity/lifecycle are NOT RUN. The target Stable build identity for visual reference captures remains unknown; >=90% visual similarity is NOT VERIFIED. Proto25 is not promoted and PR #9 remains unmerged.
- Rollback remains `v82.85.30-proto24-accepted-delivery-02` at `39d250cf5a269a0e2bf8f514474584bcc864f599`.

## Next engineering task
1. Continue coherent visual review of the home screen, Play menu, catalog, Song Select, Settings, Learning Center and Analysis at desktop and mobile sizes.
2. Identify related hierarchy, spacing, interaction-state and screenshot deltas against the pinned osu!Stable references; do not claim a similarity percentage without comparable reference captures.
3. Fix issues at the modular CSS/source layer, keep styles inside the active `<style>` block, and add containment assertions for any clipped parent-child layout.
4. Run static checks and the full browser suite after each coherent UI group; inspect fresh screenshots and verify remote candidate size, SHA-256 and report.
5. Keep audio output, full quiz-answer lifecycle and multiplayer server lifecycle explicitly NOT RUN until actually exercised.
