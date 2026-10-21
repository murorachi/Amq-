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
- Tested source commit: `71d7f398d02a3044deb35f39cf5025e4a990c1ec`.
- Workflow: [39538953347](https://github.com/murorachi/Amq-/actions/runs/39538953347), SUCCESS.
- Artifact: `proto25-stage24-ui-acceptance`, ID `12318299844`, ZIP digest `3ab2333d7aac2456d31067bdf6745b7803d5af97d4968a6893c3783765106302`.
- Candidate: `dist/amq_learning_tool_v82_85_30_workspace_proto25_stage24.html`.
- Size: 8,921,697 bytes.
- SHA-256: `8df7f9f529bed5eaeb2f8a713dbfe24af628ce625a270add59d81edd6e7f2c69`; downloaded candidate hash matches its manifest.
- Remote Stage 24 branch head after publication: `ffd9fd2813601a2351e4bf77fc5c9957c1c265bb`.
- Remote tree confirms candidate HTML, 81-byte checksum manifest and TEST_REPORT; report and manifest correspond to the successful workflow.

## Acceptance results
- Static HTML parse, duplicate-ID check and inline JavaScript syntax checks: PASS.
- Browser acceptance: 18 assertions PASS; page errors 0; console errors 0.
- Covered: desktop/mobile home, profile/player strip, Stable-inspired Play menu and Multiplayer route UI, Settings/background dialog, native storage persistence, responsive overflow, Learning Center/Analysis separation, standalone catalog route, catalog detail overlay stacking, quiz panel palette and catalog final-row clearance above the fixed audio dock.
- Stage 31 guarded profile/avatar/player typography dimensions on desktop and mobile.
- Stage 32 adds a subtle CSS triangular pattern to the main-menu and Play-menu cookies. Browser tests assert both cookie pseudo-elements use the layered pattern; screenshot reviewed.
- Home geometry: cookie 560px; primary actions 520px wide by 76px high. Play menu cookie 500px; menu blades 520px wide by 92px high.
- Options sidebar: desktop 340px; mobile 292px with no horizontal overflow.
- No >=90% similarity score is claimed because reference captures are not build/viewport matched.

## Known gaps
- NOT RUN: real audio output, full quiz-answer lifecycle, multiplayer server connectivity/lifecycle.
- Exact Stable client source commit and reference screenshot build identity remain unknown.
- Background artwork and exact cookie art remain approximate; AMQ catalog data model differs from osu!Stable Song Select.
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


## Latest Proto25 visual refinement candidate — 2026-10-21

The immutable accepted baseline is still `v82.85.30-proto24-accepted-delivery-02` at `39d250cf5a269a0e2bf8f514474584bcc864f599`. The latest separate Proto25 candidate passed workflow [39539309957](https://github.com/murorachi/Amq-/actions/runs/39539309957) and was published to the isolated Stage 24 branch at `ba12305759ed916dd69f42e38646505be84a5710`.

- Candidate: `dist/amq_learning_tool_v82_85_30_workspace_proto25_stage24.html`, 8,923,325 bytes.
- SHA-256: `0ff2bc155b7953bce29ad43209bb02cc94f2aa992e614670762ce0bf0e0c38fd`; remote SHA manifest matches.
- Changes: Stable-like radial-ray Play background, clearer triangular cookie texture and italic menu typography. Existing AMQ action routing unchanged.
- Static checks PASS (220 unique IDs; 42 inline JS blocks syntax-checked). Browser acceptance PASS (18 checks, zero page/console errors). Artifact ID `12319085625`, archive digest `bb8aeb68a77ea862cc75febe6903b852030ab8e452f41ac527c592b1b61a8c76`.
- Qualitative overall similarity estimate: 70–75%; no matched-build pixel score exists, so >=90% is not verified. Real audio output, full quiz-answer lifecycle and multiplayer server connectivity/lifecycle remain NOT RUN.

This is a tested isolated candidate, not a replacement for the accepted baseline. Do not merge PR #9 yet.
