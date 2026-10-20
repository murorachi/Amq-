# BASELINE — Proto25 UI Refactor

## Immutable accepted Proto24 baseline
- Branch: `v82.85.30-proto24-accepted-delivery-02`
- Commit: `39d250cf5a269a0e2bf8f514474584bcc864f599`
- HTML: `dist/amq_learning_tool_v82_85_30_workspace_proto24.html`
- Size: 8,850,993 bytes
- SHA-256: `c402b2af9e23fe3a1ddef2c78d2f63a79217547c1c3a607e911bacac47d9bc8e`
- Production and read-only baselines must not be modified or force-pushed.

## osu!Stable reference
- Public Stable release label on 2026-10-21: `Stable 20260924.1`.
- Changelog: https://osu.ppy.sh/home/changelog/stable40/20260924.1
- Official wiki repository: https://github.com/ppy/osu-wiki
- Pinned wiki commit: `ae2c6443a4264e5429ea7bcd2f3503be8a518a50`.
- Pinned official screenshots cover Main menu, Play menu, Song Select and Options sidebar. Their exact capture build is unknown; do not claim they match Stable 20260924.1.
- Exact Stable client source commit matching the release remains unverified. Do not use osu!lazer as a substitute or invent a commit.

## Latest isolated candidate
- Source branch: `v82.85.30-proto25-ui-refactor-work-03`.
- Source/test commit: `0efd88be9a8ab65da1c8a14db9aefb0b0c53e1b5`.
- Stage 24 branch: `v82.85.30-proto25-ui-refactor-stage-24`.
- Successful workflow: [39507319150](https://github.com/murorachi/Amq-/actions/runs/39507319150).
- Artifact ID: `12303243319`; digest `sha256:0eb85cf8178f32f9c410931aa6213cb7e30db6babcbc14cc3924f87faee2cccb`.
- Candidate path: `dist/amq_learning_tool_v82_85_30_workspace_proto25_stage24.html`.
- Size: 8,907,671 bytes.
- SHA-256: `04d27d56000a8e6d73858b6ff125edcff0669fdef8e3b78e55479460fdccb7c0`.
- Latest remote publish commit: `4487ebb43c3c512489384c30c82fd5a1728de832`.
- Downloaded artifact hash matches the manifest; remote checksum and report read-back match.

## Acceptance status
- Static HTML parsing, unique IDs and inline JavaScript syntax: PASS.
- Playwright: 17 checks PASS, 0 page errors, 0 console errors.
- Screenshots in latest artifact: desktop/mobile home, Play menu, Settings, Learning Center, Analysis and Song Select.
- Verified: profile/player containment, purple slanted home and Play-menu actions, visible native audio control, responsive mobile header, home/Play routes, settings/background dialog, native storage persistence, mobile overflow, workspace palette, Song Select overlay stacking and reduced motion.
- NOT RUN: actual audio output, complete quiz-answer lifecycle, multiplayer server connectivity/full lifecycle.
- >=90% similarity is NOT VERIFIED until comparable reference screenshots and measured evidence support it.

## Rollback
Return to `v82.85.30-proto24-accepted-delivery-02` at `39d250cf5a269a0e2bf8f514474584bcc864f599`. Never overwrite it. Proto25 remains isolated and unmerged.
