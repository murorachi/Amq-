# First-pass audit: script_025 custom lists and practice hub

Baseline: V82.85.28. File: src/scripts/script_025.htmlpart. Source blob: 7f5586df32739a3d41a9f13671291efea97673be.

Disposition: first-pass review complete; no production source change. This fragment is a cross-feature boundary between custom-list persistence, selection scope and practice/SRS launch.

## Static profile

- 47,967 characters; 292 lines; 25 named function declarations and 15 arrow-function declarations detected by conservative patterns.
- 35 addEventListener calls, 1 removeEventListener call, 6 timeout calls and 8 localStorage references.
- Main persistence keys are defined in the KEYS and RECOVERY_KEYS constants rather than appearing only as literal calls.

## Responsibilities

1. Read and validate custom-list payloads; create lists and mutate AMQ work membership.
2. Keep singular/plural selected-list settings in sync with the solo quiz settings bridge.
3. Resolve selected AMQ work IDs into song IDs for practice, while preserving work/song identifier separation.
4. Render custom-list selectors, list cards, management modal and bulk selection/actions.
5. Combine manually marked weak works with SRS-derived song IDs for explore/weak practice modes.
6. Launch practice/quiz with explicit focus or selected-list settings and refresh the learning hub.

## Risks and boundaries

- AMQ custom lists store work/anime IDs, while quiz candidate scopes ultimately operate on song IDs. Keep the conversion at the established boundary.
- Invalid, stale or malformed selected scope must fail closed rather than broaden the candidate pool.
- List persistence has recovery-key behavior; do not merge storage paths or change schemas without CRUD/reload and backup round-trip tests.
- Bulk actions and picker UI share selection state. A UI cleanup must not silently alter which works enter the practice pool.
- SRS candidates and manual weak-list candidates are different sources and are combined intentionally.

## Existing evidence reviewed

- tests/unit/amq_custom_list_validation.test.cjs: validation contract for list payloads and IDs.
- tests/unit/custom_list_source_contract.test.cjs: AMQ/EMQ list identity, membership and backup round-trip boundaries.
- tests/unit/custom_list_crud_reload_contract.test.cjs: CRUD persistence across reload.
- tests/unit/solo_emq_list_handoff.test.cjs: selected EMQ list handoff and identifier mapping.
- Browser acceptance includes native storage/custom-list and custom-list UI regression suites. These are separate from exact-source VM tests.

## Findings

| ID | Finding | Risk | Disposition |
|---|---|---|---|
| CL-01 | Work-ID membership converts to song-ID quiz scope. | High | Preserve conversion and fail-closed behavior; no generic list merger. |
| CL-02 | Persisted list schema and recovery snapshots are compatibility-sensitive. | High | Keep CRUD/reload and backup tests as required gates. |
| CL-03 | Bulk actions, list management and practice launch share UI state. | Medium/high | Extract only pure logic if a concrete change requires it. |
| CL-04 | SRS and manual weak sources are combined at the practice candidate boundary. | Medium/high | Preserve source-specific filtering and repeat/blacklist rules. |

## Coverage gaps and recommendation

Partially covered: all legacy schema variants, quota failures and every malformed/stale selection combination in a real profile. No reproduced defect justifies changing this file during audit. Continue with script_023's backup/restore boundary.

Rollback: revert this report and its matrix/status references; no product source changed.
