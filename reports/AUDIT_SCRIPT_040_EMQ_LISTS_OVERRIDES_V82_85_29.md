# First-pass audit: script_040

Baseline V82.85.28. File src/scripts/script_040.htmlpart. Source blob c7e9a1b12455eb099a97ad0b54c15923710e27eb.

Disposition: first-pass review complete; no product source change.

## Static profile
- 30,144 characters, 63 lines, 38 named functions detected by a conservative pattern.
- 16 event-listener registrations, 4 timeout calls and 18 localStorage references.
- Main keys: aniEmqWorkListsV8254, aniEmqWorkListsSelectedV8254, aniEmqAudioOverridesV8254 and aniQuizSettingsV14.

## Responsibilities and boundaries
- Stores EMQ lists with separate workIds, vndbIds and songIds.
- Creates lists, changes membership, renders selectors and batch controls, and converts list membership into eligible quiz song IDs.
- Integrates selected EMQ scope with the shared candidate pool and patches API audio URL resolution with user overrides.
- One-time mounted/API-patched guards prevent duplicate UI and repeated API wrapping.
- Preserve distinct ID domains, fail-closed selected scope, blacklist/repeat protections, original audio fallback candidates and backup compatibility.

## Existing tests
- tests/unit/custom_list_source_contract.test.cjs
- tests/unit/solo_emq_list_handoff.test.cjs
- tests/unit/emq_api_contract.test.cjs
- tests/unit/backup_restore_contract.test.cjs
- tests/unit/full_backup_restore_roundtrip_contract_v82_83.test.cjs
- Run 39232821248: source/unit 132/132 and Firefox responsive passed. The browser-native job failed only at the known non-silent audio output capture assertion. Manual live-service acceptance was not performed.

## Findings
| ID | Risk | Disposition |
|---|---|---|
| EMQ-01 | High | Preserve separate work/work-source/song ID fields. |
| EMQ-02 | High | Keep selected-list scope fail-closed and retain blacklist/repeat checks. |
| EMQ-03 | High | Keep audio overrides at the API boundary and preserve fallback behavior. |
| EMQ-04 | Medium | Preserve idempotent UI mounting and API patch guards. |

Coverage gaps include every historical list migration, quota failures, and every override URL fallback case. No concrete defect justifies a broad refactor. Revert this report and matrix references to roll back; no product source changed.
