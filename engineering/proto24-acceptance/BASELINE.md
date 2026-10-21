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
- Tested source commit: `3c1ea186f7661f6312ee263800a45f34111a40e8`.
- Workflow: [39538605138](https://github.com/murorachi/Amq-/actions/runs/39538605138), SUCCESS.
- Artifact: `proto25-stage24-ui-acceptance`, ID `12318249366`, ZIP digest `474f338638bbcb2acb6c2fe0970a751344b83dd0bd8beaaeaa4e1bae9df137d2`.
- Candidate: `dist/amq_learning_tool_v82_85_30_workspace_proto25_stage24.html`.
- Size: 8,920,621 bytes.
- SHA-256: `a36cedd3fc2f2ca612e7f5aaa8708b80924bfe912b47094812174651989883ac`; downloaded candidate hash matches its manifest.
- Remote Stage 24 branch head after publication: `95f17580460b1dd1e17a7b069a1dd27f67c49576`.
- Remote tree confirms the candidate HTML, 81-byte checksum manifest and TEST_REPORT; report and manifest correspond to the successful workflow.

## Acceptance results
- Static HTML parse, duplicate-ID check and inline JavaScript syntax checks: PASS.
- Browser acceptance: 18 assertions PASS; page errors 0; console errors 0.
- Covered: desktop/mobile home, profile/player strip, Stable-inspired Play menu and Multiplayer route UI, Settings/background dialog, native storage persistence, responsive overflow, Learning Center/Analysis separation, standalone catalog route, catalog detail overlay stacking, quiz panel palette and catalog final-row clearance above the fixed audio dock.
- Stage 31 header assertions: desktop avatar 44px, name 15px, PP value 20px, player caption 9px, track title 13px; mobile avatar 40px, name 14px.
- Home geometry remains: logo/cookie 560px; primary actions 520px wide by 76px high. Play menu cookie 500px; menu blades 520px wide by 92px high.
- Options sidebar: desktop 340px; mobile 292px with no horizontal overflow.
- Latest desktop home screenshot reviewed. Exact >=90% similarity is not claimed because reference captures are not build/viewport matched.

## Known gaps
- NOT RUN: real audio output, full quiz-answer lifecycle, multiplayer server connectivity/lifecycle.
- Exact Stable client source commit and reference screenshot build identity remain unknown.
- Background artwork, exact cookie artwork and AMQ-vs-Stable Song Select data-model differences remain.
- Do not merge PR #9 or promote this candidate until remaining reference comparison and runtime acceptance are complete.

## Rollback
Return to the immutable accepted Proto24 branch and commit above. Never force-push or overwrite the baseline.


## Latest candidate verification checkpoint — 2026-10-21

The immutable accepted baseline remains `v82.85.30-proto24-accepted-delivery-02` at `39d250cf5a269a0e2bf8f514474584bcc864f599`. The following is a separately validated Proto25 candidate, not a replacement for that baseline:

- Workflow: [Stage 24 run 39538605138](https://github.com/murorachi/Amq-/actions/runs/39538605138), successful.
- Isolated Stage 24 publication commit: `95f17580460b1dd1e17a7b069a1dd27f67c49576`.
- Candidate file: `dist/amq_learning_tool_v82_85_30_workspace_proto25_stage24.html`, 8,920,621 bytes.
- Candidate SHA-256: `a36cedd3fc2f2ca612e7f5aaa8708b80924bfe912b47094812174651989883ac`; remote manifest matches.
- Static: 220 unique IDs and 42 inline JavaScript blocks syntax-checked, PASS.
- Browser: 18 checks PASS; no page or console errors. Evidence artifact ID `12318249366`, ZIP digest `474f338638bbcb2acb6c2fe0970a751344b83dd0bd8beaaeaa4e1bae9df137d2`.
- NOT RUN: real audio output, full quiz-answer lifecycle, multiplayer server connectivity/lifecycle.
- Visual similarity >=90% remains unverified. The available screenshots show the home still differs substantially from a proven osu!Stable reference capture; no Stable source commit/build-matched pixel comparison is available.

This checkpoint verifies the candidate and browser-tested UI scope only. It does not authorize merging PR #9 or replacing the accepted baseline.
