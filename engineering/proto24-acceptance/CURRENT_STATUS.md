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


## Latest workflow repair checkpoint
- Stage 24 workflow trigger/artifact naming correction commit: `2294f0ce073d074df5f7df1728a9ab22b577b0d9` on `v82.85.30-proto25-ui-refactor-stage-24`.
- Next validation action: update this branch's PR head with a fresh commit so the base-branch `pull_request` workflow can run against the latest UI changes; do not treat workflow repair as acceptance.
