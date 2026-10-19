# Next task

**Blocked: recover the already-approved visual reference, not redesign the brief.**

1. Make the exact previously approved 13-stage notes and reference screenshots available to the implementation step. Current accessible project/library files did not contain them; do not substitute generic web screenshots or invent a new design.
2. Use `UI_CONFORMANCE_MATRIX.md` as the discrepancy checklist.
3. Fix only the main menu first, using the approved reference's actual composition and proportions.
4. Run core regression tests, then inspect the real browser render at the reference viewport. Node tests do not count as visual acceptance.
5. Do not advance to song select until the main menu conforms; do not advance to quiz/results until song select conforms.
6. Keep the legacy AMQ untouched and separate.
7. Keep GitHub source/HTML publication status explicit; documentation-only commits are not a full release.