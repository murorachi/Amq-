# BASELINE — Proto25 UI Refactor

## Immutable accepted Proto24 baseline
- Branch: `v82.85.30-proto24-accepted-delivery-02`
- Commit: `39d250cf5a269a0e2bf8f514474584bcc864f599`
- HTML: `dist/amq_learning_tool_v82_85_30_workspace_proto24.html`
- Size: 8,850,993 bytes
- SHA-256: `c402b2af9e23fe3a1ddef2c78d2f63a79217547c1c3a607e911bacac47d9bc8e`
- Production V82.82 and read-only V82.85.30 must remain unchanged.

## Official osu!Stable reference
- Public Stable release label on 2026-10-21: `Stable 20260924.1`.
- Changelog: https://osu.ppy.sh/home/changelog/stable40/20260924.1
- Official wiki repository: https://github.com/ppy/osu-wiki
- Pinned wiki commit: `ae2c6443a4264e5429ea7bcd2f3503be8a518a50`.
- Pinned wiki screenshots cover Main menu, Play menu, Song Select and Options sidebar.
- The exact Stable source commit and the exact Stable build used to capture the wiki screenshots remain unverified. Do not claim a source commit or use osu!lazer as a substitute.

## Latest isolated candidate and verified delivery
- Source branch: `v82.85.30-proto25-ui-refactor-work-03`.
- Tested source head: `d37792fdf17b40dfb7afbcae43a2de7598860f02`.
- Workflow: [39530034146](https://github.com/murorachi/Amq-/actions/runs/39530034146), SUCCESS.
- Artifact: `proto25-stage24-ui-acceptance`, ID `12314713448`, ZIP digest `ddf0dc13028cebc5a6cf05a6bcab32c66e33df1361cf4f3ac4c71c9978ab26de`.
- Candidate: `dist/amq_learning_tool_v82_85_30_workspace_proto25_stage24.html`.
- Size: 8,917,750 bytes.
- SHA-256: `65ff22b43383c142153cab4a403e5c2ab8d0839f685d07f75705865f2b2a82c9`.
- Downloaded candidate SHA-256 matches the artifact manifest.
- Remote Stage 24 branch: `v82.85.30-proto25-ui-refactor-stage-24`.
- Remote Stage 24 head at verification: `7687521f27f0c0ad2afa20cbac3680511d9b2caf`.
- Remote Git tree confirms the candidate HTML size is 8,917,750 bytes; manifest and test report are present and match the successful workflow.

## Acceptance results
- Static HTML parse, duplicate-ID check and inline JavaScript syntax checks: PASS.
- Browser acceptance: 18 assertions PASS; page errors 0; console errors 0.
- Covered: desktop/mobile home, profile/player strip, Stable-inspired Play menu and Multiplayer route UI, Settings/background dialog, native storage persistence, responsive overflow, Learning Center/Analysis separation, standalone catalog route, catalog detail overlay stacking, quiz panel palette and catalog final-row clearance above the fixed audio dock.
- Latest home geometry: logo diameter 560px; three primary actions 520px wide by 76px high.
- Latest Play menu geometry: logo diameter 500px; three menu blades 520px wide by 92px high. The explanatory hint is hidden on desktop to avoid overlap with the cookie.
- Catalog final-row evidence at document end: card bottom 471px, dock top 834px, dock height 54px, wrapper bottom padding 160px.
- Latest screenshots were downloaded and reviewed. The geometry is closer to the pinned reference, but no >=90% similarity score is claimed because the reference captures are not build/viewport matched.

## Known gaps
- NOT RUN: real audio output, full quiz-answer lifecycle, multiplayer server connectivity/lifecycle.
- Exact Stable client source commit and reference screenshot build identity remain unknown.
- Background artwork and some header details remain different from the official reference. Broken third-party cover imagery can still occur; image availability is not a layout pass.
- Do not merge PR #9 or promote this candidate until remaining reference comparison and runtime acceptance are complete.

## Rollback
Return to the immutable accepted Proto24 branch and commit above. Never force-push or overwrite the baseline.