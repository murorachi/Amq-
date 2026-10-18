# Next task

Current checkpoint: **V82.86.06 AMQ／EMQ custom-list backup restore browser acceptance**. Branch `v82.86.06-custom-list-backup-restore-browser-01`.

## Scope completed and verified
- Browser acceptance extended in `tests/browser/native_storage_custom_lists_acceptance.py`.
- Real UI full backup contains both AMQ (`aniCustomPracticeListsV1`) and EMQ (`aniEmqWorkListsV8254`) storage entries and a manifest.
- Corrupt/inconsistent manifest is rejected before storage mutation.
- Injected write failure during full restore rolls application storage back to the exact prior snapshot.
- Valid backup restores both list identities and names.
- Actual document reload preserves both custom-list payloads and both lists render again in the UI.
- GitHub Actions run [39166474674](https://github.com/murorachi/Amq-/actions/runs/39166474674) passed both jobs at test commit `cbc5fed2d513fa4c01761cd640ea65c160a76146`.
- Product HTML unchanged: V82.82, 8,787,490 bytes, SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`; V82.65 remains immutable.

## Next bounded task
1. Add a dedicated stable CI command that explicitly runs `backup_restore_contract.test.cjs`, `full_backup_restore_roundtrip_contract_v82_83.test.cjs` and `custom_list_source_contract.test.cjs`, so the existing exact-source backup contracts cannot silently be skipped by the main workflow.
2. Continue the IndexedDB failure matrix: open/blocked/upgrade, transaction failure, quota/corruption, rollback and reload. Separate synthetic faults from naturally occurring browser failures.
3. Keep Firefox CSS cascade, real audio provider and production-origin storage policy as separate external gates.
4. Do not change product source until the test evidence identifies a product defect; do not claim full semantic modularization is complete.

## Rollback
Revert the V82.86.06 test/report/status changes. Product rollback is not required because no product source or generated HTML changed.
