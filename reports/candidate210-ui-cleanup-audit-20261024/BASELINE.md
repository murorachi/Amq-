# Candidate 210 UI Baseline — Cleanup Audit

Date: 2026-10-24
Branch: `amq-candidate210-ui-cleanup-audit-20261024`

## User decision
Candidate210 is the preferred UI/interaction reference. Preserve its visual hierarchy, layout, row geometry, selected/hover behavior, color treatment, and player placement while cleaning internal implementation. Do not substitute a later candidate's appearance merely because it has additional fixes.

## Recorded artifact
- Library artifact: `amq_learning_tool_v82_85_46_workspace_proto44-osu-songselect-ui_210_songselect_rebuild_from_207.html`
- Recorded size: 9,347,601 bytes.
- Recorded SHA-256: `92f3e6353bd9e9d72d148037cd710818e25d514ce6c2ed57642e2ab248f6ec5f`
- Parent Candidate207 recorded size/SHA-256: 9,310,496 bytes / `2f3a092a139628daa48bc113d2a192f41e2d7474182471ed926de3de49fd6100`.
- Existing validation record: `reports/candidate210-songselect-rebuild-from-207-20261024/VALIDATION.md` on `amq-candidate104-songselect-layout-fix`.

## Integrity status
The artifact was found in the user's Library metadata. Raw-byte materialization was denied by the current runtime. A text export was produced at `/mnt/data/amq_cleanup_work/candidate210_text.html`, but it is only 5,163,656 bytes with SHA-256 `d4f87d73d9cc5c5266c6b82847cf9786c704ef8f8f5ab75d7f40d6fa7005bdf4`; it is not byte-identical to the recorded artifact and visibly lacks expected source sections. It is not a valid build source and must not be uploaded as Candidate210 or used to generate a release.

## GitHub state
- Candidate210's validation report exists remotely.
- Candidate210's HTML is not present in the inspected Git tree.
- Candidate207/212/216/218 HTML files are also not present in the inspected branch tree.
- Existing Candidate212 audit reports are useful investigation leads only. Their code-level findings must be revalidated against Candidate210 before they are treated as Candidate210 facts.

## Baseline policy
No HTML source was modified. No existing candidate was overwritten. Do not claim a fresh SHA-256 verification until the original bytes are accessible.
