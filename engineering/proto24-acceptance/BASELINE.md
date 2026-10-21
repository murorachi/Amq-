# BASELINE — Proto25 UI Refactor

## Immutable accepted Proto24 baseline
- Branch: `v82.85.30-proto24-accepted-delivery-02`
- Commit: `39d250cf5a269a0e2bf8f514474584bcc864f599`
- HTML: `dist/amq_learning_tool_v82_85_30_workspace_proto24.html`
- Size: 8,850,993 bytes
- SHA-256: `c402b2af9e23fe3a1ddef2c78d2f63a79217547c1c3a607e911bacac47d9bc8e`
- Production V82.82 and read-only V82.85.30 remain unchanged.

## Official osu!Stable reference
- Public Stable release label on 2026-10-21: `Stable 20260924.1`.
- Changelog: https://osu.ppy.sh/home/changelog/stable40/20260924.1
- Official wiki repository: https://github.com/ppy/osu-wiki
- Pinned wiki commit: `ae2c6443a4264e5429ea7bcd2f3503be8a518a50`.
- Pinned Wiki screenshots cover Main menu, Play menu, Song Select and Options sidebar.
- Exact Stable source commit and exact Stable build used to capture the Wiki screenshots remain unverified. Do not claim a source commit or use osu!lazer as a substitute.

## Latest isolated candidate and verified delivery
- Source branch: `v82.85.30-proto25-ui-refactor-work-03`.
- Tested source commit: `a05c66401f0053d2c7bee53f5a965422edd8f9e9`.
- Workflow: [39536870515](https://github.com/murorachi/Amq-/actions/runs/39536870515), SUCCESS.
- Artifact: `proto25-stage24-ui-acceptance`, ID `12318480861`, ZIP digest `def95408d91797c5cdbc247c4275a217f5a6eeecdace2f4700f90aca6218d587`.
- Candidate: `dist/amq_learning_tool_v82_85_30_workspace_proto25_stage24.html`.
- Size: 8,918,095 bytes.
- SHA-256: `0ae1692288d85c3d7750af365b9fcb60cd57744e47b979ab9cdef08ce7a30232`.
- Downloaded candidate hash matches its manifest.
- Remote Stage 24 branch: `v82.85.30-proto25-ui-refactor-stage-24`.
- Remote Stage 24 head at verification: `6f51f1f0b53dc194524c0be1c86e5a94bf4c7493`.
- Remote tree confirms the candidate HTML size, 81-byte checksum manifest and TEST_REPORT. The remote manifest/report match the successful workflow.

## Acceptance results
- Static HTML parse, duplicate-ID check and inline JavaScript syntax checks: PASS.
- Browser acceptance: 18 assertions PASS; page errors 0; console errors 0.
- Covered: desktop/mobile home, profile/player strip, Stable-inspired Play menu and Multiplayer route UI, Settings/background dialog, native storage persistence, responsive overflow, Learning Center/Analysis separation, standalone catalog route, catalog detail overlay stacking, quiz panel palette and catalog final-row clearance above the fixed audio dock.
- Latest home geometry: cookie 560px; three primary actions 520px wide by 76px high.
- Latest Play menu geometry: cookie 500px; three menu blades 520px wide by 92px high.
- Options sidebar: desktop 340px; mobile 292px with no horizontal overflow.
- Latest screenshots were downloaded and reviewed. Layout geometry is closer to the pinned reference, but no >=90% similarity score is claimed because the reference captures are not build/viewport matched.

## Known gaps
- NOT RUN: real audio output, full quiz-answer lifecycle, multiplayer server connectivity/lifecycle.
- Exact Stable client source commit and reference screenshot build identity remain unknown.
- Background artwork, exact cookie artwork and some header details remain different from the official reference. Broken third-party cover imagery can still occur; image availability is separate from layout acceptance.
- Do not merge PR #9 or promote this candidate until remaining reference comparison and runtime acceptance are complete.

## Rollback
Return to the immutable accepted Proto24 branch and commit above. Never force-push or overwrite the baseline.
