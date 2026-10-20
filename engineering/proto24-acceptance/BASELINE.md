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
- Source branch: `v82.85.30-proto25-ui-refactor-work-03`; tested head `38978e192ccd7ea02e228c70974ecc3a96437a1d`.
- Latest verified run: [39512028498](https://github.com/murorachi/Amq-/actions/runs/39512028498), SUCCESS. Static checks PASS; 17 Playwright assertions PASS; page/console errors 0.
- Artifact ID `12305094086`; candidate size 8,913,254 bytes; SHA-256 `cf4a3a209b512ce30090596f9db618d0ef956d4ff3960970ea58af3f54e2efe9`. Downloaded candidate SHA-256 matches `candidate.sha256`.
- Remote Stage 24 branch head: `1f9727e8082b13a4bcafdd781fc226362e75783f`. Git tree reports the candidate HTML at 8,913,254 bytes; remote checksum manifest and `engineering/proto24-acceptance/TEST_REPORT.md` match the run and hash.
- Fixed workspace shell lifecycle: standalone catalog routes no longer display the persistent Learning/Analysis sidebar/dock. Fixed the catalog audio dock to 54px and reserved scroll-wrapper space below it. Both are guarded by browser assertions.
- Screenshots and machine-readable report were downloaded and inspected. The catalog screenshot now shows the actual catalog route and compact player; remaining target screens still require visual review.

## Acceptance status
- NOT RUN: real audio output, full quiz-answer lifecycle, multiplayer server connectivity/lifecycle. Exact osu!Stable screenshot build identity unknown; >=90% similarity NOT VERIFIED.
- Rollback: return to `v82.85.30-proto24-accepted-delivery-02` at `39d250cf5a269a0e2bf8f514474584bcc864f599`. Do not merge PR #9 or promote the candidate until remaining UI and runtime acceptance are complete.
