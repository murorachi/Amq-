# BASELINE — Proto25 UI Refactor

## Immutable accepted Proto24 baseline
- Branch: `v82.85.30-proto24-accepted-delivery-02`
- Commit: `39d250cf5a269a0e2bf8f514474584bcc864f599`
- HTML: `dist/amq_learning_tool_v82_85_30_workspace_proto24.html`
- Size: 8,850,993 bytes
- SHA-256: `c402b2af9e23fe3a1ddef2c78d2f63a79217547c1c3a607e911bacac47d9bc8e`
- This accepted baseline is immutable for this task. Production V82.82 and read-only V82.85.30 remain untouched.

## osu!Stable reference
- Public Stable release label identified on 2026-10-21: `Stable 20260924.1`.
- Changelog: https://osu.ppy.sh/home/changelog/stable40/20260924.1
- Official wiki repository: https://github.com/ppy/osu-wiki
- Pinned wiki commit: `ae2c6443a4264e5429ea7bcd2f3503be8a518a50`.
- Pinned references include `wiki/Client/Interface/en.md`, `wiki/Client/Options/en.md`, and the official main-menu, Play-menu, Song Select and Options-sidebar screenshots.
- Exact osu!Stable client source commit matching Stable 20260924.1 is not verified. Do not substitute osu!lazer source or invent a matching commit. The wiki images are traceable references, not proven version-matched captures.

## Latest isolated Proto25 candidate
- Source branch: `v82.85.30-proto25-ui-refactor-work-03`.
- Source/test commit: `c9dc16520800a65dc9800fd737ccfe47b5426d32`.
- Validation/publish branch: `v82.85.30-proto25-ui-refactor-stage-24`.
- Successful workflow: [39506207073](https://github.com/murorachi/Amq-/actions/runs/39506207073).
- Artifact ID: `12302494868`, artifact digest `sha256:de3e910d504536d2ae0272f6e6dd0527e60a60d5878c782ad14812a22b636682`.
- Candidate: `dist/amq_learning_tool_v82_85_30_workspace_proto25_stage24.html`.
- Size: 8,906,398 bytes.
- SHA-256: `63a771042fde17530245ef1c3ba56a5786799c873373c1314fa9856ebf65e29f`.
- Stage 24 remote publish commit: `1e0962510ce1eec042a15b93801e77228ae2b35f`.
- Downloaded artifact hash equals the checksum manifest; remote manifest and test report read-back match.

## Latest acceptance
- Static HTML parse, unique IDs and inline JavaScript syntax: PASS.
- Playwright browser acceptance: PASS, 17 checks, zero page errors and zero console errors.
- Verified: home routing, compact profile/player containment, purple slanted action styling, audio-control visibility, responsive mobile header, Single Player / Multiplayer / Back routes, settings/background dialog, native storage persistence, mobile overflow, Learning Center/Analysis palette, catalog/Song Select/quiz styling, overlay stacking and reduced motion.
- NOT RUN: real audio output, full quiz-answer lifecycle, multiplayer server connectivity and full multiplayer lifecycle.
- >=90% visual similarity is not verified; reference screenshots are not proven to match the exact Stable 20260924.1 build.

## Rollback
Return to `v82.85.30-proto24-accepted-delivery-02` at `39d250cf5a269a0e2bf8f514474584bcc864f599`. Never force-push, overwrite or promote over that branch. Proto25 remains isolated and unmerged.
