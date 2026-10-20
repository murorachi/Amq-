# Proto25 Stage 1 — Home Shell Refactor Report

Date: 2026-10-21
Working branch: `v82.85.30-proto25-ui-refactor-work-01`
Baseline commit before this stage: `1b6c1e390ccf0916413d069aff8970d987b60cf3`
Stage CSS commit: `bc3f639f38f6f44cc32c9040d0aa4f0894f79d11`
Acceptance script update: `e233c0919df67ec51fb97a162b39ad2a829e6cb3`
Build workflow revisions: `b9882df61a070cccbbba48e6c27e54e2c8a80ed5`

## Changes
- Updated `engineering/proto24/amq-osu-home-composition.css` with a compact dark/pink shell inspired by osu!stable's main-menu palette and visual hierarchy.
- Reduced profile/player panel height and padding; replaced pale cards with dark panels.
- Changed the large circular home mark from the temporary `♫ ?` placeholder to a stylized `osu!` wordmark treatment.
- Reduced action-card height and updated menu colors; retained existing buttons and handlers.
- Updated the existing Playwright visual assertions to validate the new logo token and dark shell colors.
- Added an isolated stage build target named `v82.85.30-proto25-ui-refactor-stage-01`; Proto24 accepted-delivery branch was not modified.

## Test status
- GitHub source file writes and branch heads: PASS, verified through GitHub file/commit reads.
- Original Proto24 acceptance: PASS for its original candidate only, not evidence for this changed stage.
- Proto25 browser acceptance: NOT VERIFIED. The isolated build artifact has not yet appeared on the stage delivery branch, and the available integration exposes no direct Actions-run listing/status for this branch.
- HTML parser / JavaScript syntax / responsive browser checks on the modified Proto25 candidate: NOT RUN in this environment.
- Audio output, full quiz lifecycle, multiplayer lifecycle: NOT RUN.
- Visual similarity against official Wiki fallback: NOT YET MEASURED. The current change is a first shell adjustment, not completion of the requested UI refactor.

## Risks / limits
- The existing acceptance test asserts only homepage geometry and two workspaces. It does not cover Play menu, Song Select, profile, or Settings fidelity.
- The exact osu!stable client source commit remains unavailable; the user's original instruction permits the pinned official Wiki images as the fallback, which are not proven to be screenshots from Stable 20260924.1.
- Do not promote this stage or claim it accepted until the build, test report, screenshots, and SHA-256 are retrieved and independently checked.

## Rollback
Return to `v82.85.30-proto24-accepted-delivery-02` at `39d250cf5a269a0e2bf8f514474584bcc864f599`, or use the immutable Proto24 candidate SHA-256 in `OSU_STABLE_REFERENCE_AUDIT.md`. This stage has not modified either branch.

## Next
1. Confirm the stage workflow executes and publishes the Proto25 candidate.
2. Review the new desktop/mobile screenshots and verify the CSS assertions.
3. Continue Play navigation and the existing catalog/song-selection surfaces, then profile and Settings.
4. Add page-specific acceptance coverage before calling the UI refactor complete.
