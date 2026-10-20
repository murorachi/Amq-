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

- Immutable accepted baseline remains branch `v82.85.30-proto24-accepted-delivery-02`, commit `39d250cf5a269a0e2bf8f514474584bcc864f599`, HTML SHA-256 `c402b2af9e23fe3a1ddef2c78d2f63a79217547c1c3a607e911bacac47d9bc8e`. Production and accepted baseline were not modified.
- Isolated source branch: `v82.85.30-proto25-ui-refactor-work-03`. Current workflow commit: `d6209c24f72e1d7cb8ea1eaf0a3739ca14a7b407`.
- Root cause 1 fixed: PR merge-ref publishing was not fast-forwardable. Publisher now preserves the tested candidate, checks out the isolated Stage 24 target branch, then commits only the HTML, checksum and test report.
- Root cause 2 fixed: multiple documentation commits triggered concurrent runs that raced to publish to the same target branch. Workflow now uses a concurrency group and only runs for source, CSS, test or workflow changes. The docs-only pushes no longer launch redundant acceptance runs.
- Latest verified run: [39500770125](https://github.com/murorachi/Amq-/actions/runs/39500770125), head `d6209c24f72e1d7cb8ea1eaf0a3739ca14a7b407`, conclusion SUCCESS. Static HTML parsing, duplicate-ID detection and inline-JavaScript syntax checks passed. Playwright browser acceptance passed all 17 checks, with zero page errors and zero console errors.
- Latest evidence artifact: `proto25-stage24-ui-acceptance`, artifact ID `12299323839`. It contains candidate HTML, checksum, JSON report and desktop/mobile/workspace/Song Select screenshots.
- Candidate: `dist/amq_learning_tool_v82_85_30_workspace_proto25_stage24.html`; size 8,899,371 bytes; SHA-256 `9c21bb784ee6e920eeb5a4ce118e5a6ee3e6b19584605078642f1d3dec7605a6`. Local artifact hash matches its checksum manifest. Remote Stage 24 manifest and TEST_REPORT were read back and match this hash/size/run.
- Profile regression test was strengthened to require a rendered `linear-gradient` background on `#amqProfileCard`, not merely reject white backgrounds. Latest browser report confirms gradient `linear-gradient(135deg, rgb(53, 44, 57), rgb(40, 33, 43))`, visible profile name, 84px desktop profile/player rows, and mobile width 390px without horizontal overflow.
- A concurrent older run `39500564062` passed browser tests but failed only during publication because another run advanced the target branch first. The concurrency fix is in the latest workflow, and final run `39500770125` passed including publication.
- NOT RUN: real audio output, complete quiz-answer lifecycle, multiplayer server connectivity/lifecycle. Exact Stable build screenshot identity remains unknown. >=90% visual similarity is NOT VERIFIED; visual review still shows legacy workspace surfaces that need further polish, including a prominent light panel in the Learning Center screenshot.
- Do not merge PR #9 or promote Proto25 yet. The latest candidate has passed the current acceptance suite, but broader visual review and untested runtime flows remain outstanding.

## Next engineering task
1. Identify the exact DOM selector responsible for the bright panel in the Learning Center screenshot, then theme it through the existing modular workspace CSS instead of adding broad catch-all overrides.
2. Add a screenshot/DOM assertion for unintended light panels in the learning and analysis workspaces, then rerun the visual acceptance.
3. Review Settings, Song Select, catalog, quiz and mobile screenshots as one UI group; record specific visual deltas against osu!stable references without claiming an unsupported similarity percentage.
4. Keep real audio, full quiz lifecycle and multiplayer lifecycle as separately reported tests until actually executed.
