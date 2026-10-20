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
- Source/test commit: `9959cdffeb8f2b89cf1ece64ac0e7aaaa61cdb0f`.
- Stage 24 branch: `v82.85.30-proto25-ui-refactor-stage-24`.
- Successful workflow: [39506880023](https://github.com/murorachi/Amq-/actions/runs/39506880023).
- Artifact ID: `12304256327`; digest `sha256:ce37be3c6a3561202d0a2324afbe928ded73278fed90c15ea2a044524875b52c`.
- Candidate path: `dist/amq_learning_tool_v82_85_30_workspace_proto25_stage24.html`.
- Size: 8,906,398 bytes.
- SHA-256: `63a771042fde17530245ef1c3ba56a5786799c873373c1314fa9856ebf65e29f`.
- Latest remote publish commit: `97b5d54085c9f5a6ee3f7350cb77f3ac567dc978`.
- Downloaded artifact checksum matches the manifest; remote checksum and report read-back match.

## Acceptance status
- Static HTML parsing, unique IDs and inline JavaScript syntax: PASS.
- Playwright: 17 checks PASS, 0 page errors, 0 console errors.
- Screenshots in latest artifact: desktop/mobile home, Play menu, Settings, Learning Center, Analysis and Song Select.
- Verified: profile/player containment, purple slanted primary actions, visible native audio control, responsive mobile header, home/Play routes, settings/background dialog, native storage persistence, mobile overflow, workspace palette, Song Select overlay stacking and reduced motion.
- NOT RUN: actual audio output, complete quiz-answer lifecycle, multiplayer server connectivity/full lifecycle.
- >=90% similarity is NOT VERIFIED until comparable reference screenshots and measured evidence support it.

## Rollback
Return to `v82.85.30-proto24-accepted-delivery-02` at `39d250cf5a269a0e2bf8f514474584bcc864f599`. Never overwrite it. Proto25 remains isolated and unmerged.
