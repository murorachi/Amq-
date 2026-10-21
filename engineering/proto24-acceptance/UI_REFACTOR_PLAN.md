# Proto24 UI Refactor Plan and Reference Gate

Date: 2026-10-21
Working branch: `v82.85.30-proto24-stable-reference-audit-02`
Pinned AMQ candidate branch: `v82.85.30-proto24-accepted-delivery-02`
Pinned AMQ candidate commit: `39d250cf5a269a0e2bf8f514474584bcc864f599`

## Reference decision

The target is osu!stable only. Do not use osu!lazer as the primary reference or infer stable behavior from lazer source.

The official Stable release label on the audit date is `20260924.1` (2026-09-24):
https://osu.ppy.sh/home/changelog/stable40/20260924.1

The official osu!-wiki pages and screenshots are pinned at commit `ae2c6443a4264e5429ea7bcd2f3503be8a518a50`. They provide traceable documentation and visual evidence for the main menu, Play menu, Song Select, and Options sidebar. However, their screenshots are not proven captures of Stable 20260924.1.

**Reference gate: BLOCKED.** The exact official osu!stable client source/version mapping, source commit SHA, and matching UI source files have not been verified. The public `ppy/osu` repository explicitly describes itself as the successor/lazer client. A commit SHA mentioned in an upstream issue is not sufficient proof that it corresponds to Stable 20260924.1.

No application HTML/CSS/JS changes or formal UI implementation may begin until the required source/version mapping is verified, unless the user explicitly changes this requirement.

## Scope and guardrails

Target a high-fidelity AMQ adaptation of osu!stable's interface while preserving existing AMQ functionality and data contracts. All visible controls must connect to real behavior. Do not invent statistics or fabricate functionality.

Keep these immutable:
- `v82.85.30-proto24-accepted-delivery-02` at `39d250cf5a269a0e2bf8f514474584bcc864f599`
- `v82.85.30-proto24-workspace-ui-pass-01` at `25ac425472198e4f2a4547a3ca9d073a279a1c63`
- Proto17 source at `4fc4a099389b59850c46d3eab2332be3401d487a`
- Production V82.82 and read-only V82.85.30.

All implementation commits must stay on a new isolated branch until full acceptance. Do not promote to production automatically.

## Implementation sequence after the reference gate passes

1. Main menu shell: reproduce stable background, central circular primary control, restrained menu stack, user/profile affordance, and compact music controls. Preserve real AMQ navigation and settings.
2. Play navigation: map Single Player, Multiplayer, and Back to actual AMQ capabilities. Do not use fake buttons.
3. Song Select: implement the verified stable-inspired layout, song metadata, catalog cards, search/sort/group controls, AMQ/EMQ/MIX/Singer modes, playback controls, and details panel while retaining existing handlers.
4. Profile and Settings: align profile/statistics and settings panels with verified stable references, including general settings, light mode, scene/background, database update, and backup import/export.
5. Integration: compare each affected screen against the pinned, verified stable reference at matching viewport sizes; run scoped interaction tests, responsive checks, console checks, real audio output, quiz lifecycle, and multiplayer lifecycle tests.

## Acceptance and checkpoint policy

- Every stage is a separate commit on an isolated working branch.
- Record PASS / FAIL / NOT RUN / BLOCKED with actual cases, assertions, commands, and limitations.
- Verify remote commit, changed file list, and SHA-256 of every generated single-file HTML candidate.
- Visual similarity requires a documented comparison, not a subjective percentage claim.
- Production promotion remains out of scope until explicit final acceptance and all required regressions pass.

## Current pinned candidate

- File: `dist/amq_learning_tool_v82_85_30_workspace_proto24.html`
- Size: 8,850,993 bytes
- SHA-256: `c402b2af9e23fe3a1ddef2c78d2f63a79217547c1c3a607e911bacac47d9bc8e`
- Existing browser acceptance: PASS for the limited cases recorded in `TEST_REPORT.md`.
- Not covered: real audio output, full quiz lifecycle, multiplayer lifecycle.
- Visual review: placeholder `♫ ?` mark and generic panels remain; 90%+ similarity is NOT VERIFIED.
