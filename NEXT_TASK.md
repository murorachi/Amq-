# Next task: first-pass audit of script_028

Branch: `v82.85.29-source-audit-matrix-01`.

## Current audit checkpoint

- Matrix: `reports/SOURCE_BLOCK_AUDIT_MATRIX_V82_85_28.md`, 91 fragments (50 styles, 41 scripts).
- First-pass file audit complete for `src/scripts/script_004.htmlpart`; see `reports/AUDIT_SCRIPT_004_QUIZ_LIFECYCLE_V82_85_29.md`.
- Current ledger count: 1 first-pass file audit complete, 1 partially reviewed known-risk fragment (`script_028`), 89 awaiting file-specific review.
- Product source was not changed in the audit stage. Immutable V82.82 baseline remains 8,787,490 bytes / SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`.

## Ordered work

1. Audit `src/scripts/script_028.htmlpart`: map room/session/reconnect, filter and pool settings, persistence, UI, socket events and audio lifecycle. Reuse existing multiplayer contracts; do not change behavior merely to make the file smaller.
2. Update the matrix only when file-specific evidence and a disposition are recorded.
3. Continue with the next P1 script, then remaining scripts in manifest order.
4. Audit styles after script boundaries are documented, preserving CSS load/cascade order.
5. Report remaining count only from completed file-specific audit records.

## CI and rollback

Run [39230015840](https://github.com/murorachi/Amq-/actions/runs/39230015840) passed source/unit 132/132 and Firefox responsive; native-origin failed only at the known CI audio-output capture assertion. Do not reopen unless actual playback regresses. Manual interactive acceptance remains unperformed.

Rollback is documentation-only: revert the V82.85.29 audit report, matrix and checkpoint documentation. Keep V82.85.28 and V82.82 unchanged.
