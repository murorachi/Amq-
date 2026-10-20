# Proto24 UI Refactor Plan and Reference Gate

Date: 2026-10-21
Working branch: `v82.85.30-proto24-stable-reference-audit-01`
Pinned AMQ parent: `39d250cf5a269a0e2bf8f514474584bcc864f599`

## Reference decision

The user originally directed that the official osu! Wiki be used when exact osu! pages are unknown. That instruction authorizes the pinned official osu!-wiki screenshots as the visual fallback for this refactor. Use the four pinned screenshot assets listed in `OSU_STABLE_REFERENCE_AUDIT.md` as the current visual target, while preserving the explicit limitation that they are not proven captures of Stable 20260924.1. Do not use osu!lazer source or claim source-version equivalence.

Reference gate status:
- Official Stable version label: PASS (`20260924.1`).
- Pinned official Wiki page and screenshot assets: PASS.
- Exact matching Stable client source commit: BLOCKED / not required to use the user-authorized Wiki visual fallback.
- Exact screenshot capture build: UNKNOWN; disclose this limitation.

## Scope and guardrails

Target is a high-fidelity AMQ adaptation of osu!stable's interface, not a clone that discards AMQ functionality. Retain the AMQ feature model and map navigation/actions to actual existing handlers. No decorative controls without real behavior.

Keep the following immutable:
- `v82.85.30-proto24-accepted-delivery-02` at `39d250cf5a269a0e2bf8f514474584bcc864f599`
- `v82.85.30-proto24-workspace-ui-pass-01` at `25ac425472198e4f2a4547a3ca9d073a279a1c63`
- Proto17 source at `4fc4a099389b59850c46d3eab2332be3401d487a`
- Production and read-only baselines.

All implementation commits stay on an isolated working branch until full acceptance. Do not promote to production automatically.

## Implementation sequence

1. **Main menu shell:** replace generic dashboard-like composition with Stable-inspired background, central circular primary control, restrained menu stack, user/profile affordance, and compact jukebox/player controls. Preserve real AMQ navigation and settings.
2. **Play navigation:** reproduce the compact Stable play-choice panel and map Single Player / Multiplayer / Back to actual AMQ capabilities. If a requested mode has no existing implementation, expose a truthful disabled state or route to the actual available flow; do not fake a successful action.
3. **Song Select:** build the left metadata column, central selection/list area, right visual/card area, search/sort/group controls, mode selection (AMQ/EMQ/MIX/Singer), player controls and details panel. Preserve current list, filtering, and playback handlers.
4. **Profile and Settings:** bring account/statistics and settings into a consistent sidebar/panel visual language, including general settings, light mode, scene/background, database update, and backup import/export.
5. **Integration:** compare each screen against its pinned reference at matching viewport sizes; run existing Proto24 acceptance plus feature-specific interaction checks, responsive checks, console checks, real audio output, quiz lifecycle and multiplayer lifecycle tests.

## Acceptance and checkpoint policy

- Every stage is a separate commit on this working branch.
- After each stage, run scoped tests and record PASS / FAIL / NOT RUN with assertions and limitations.
- Verify remote commit, changed file list and SHA-256 of generated single-file HTML after every candidate build.
- Never treat a successful command exit as proof that all product flows work.
- Final UI acceptance requires all target screens present, no fake controls, functional navigation, no console errors, responsive behavior, and evidence-backed visual review. The 90% similarity target is a goal to assess, not a number to claim without a documented comparison.
- Production promotion remains out of scope until explicit final acceptance and all required regressions pass.

## Current verified candidate

- File: `dist/amq_learning_tool_v82_85_30_workspace_proto24.html`
- Size: 8,850,993 bytes
- SHA-256: `c402b2af9e23fe3a1ddef2c78d2f63a79217547c1c3a607e911bacac47d9bc8e`
- Existing browser acceptance: PASS for homepage navigation, native storage, mobile overflow, Learning Center and Analysis workspaces.
- Not covered: real audio output, full quiz lifecycle, multiplayer lifecycle.
- Visual review: existing homepage still shows `♫ ?` placeholder, large pale profile/player cards and large gradient action cards; not yet close enough to call the Stable visual refactor complete.
