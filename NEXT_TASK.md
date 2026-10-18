# Next task

Current checkpoint: **V82.85.10 quiz settlement browser contract, accepted**.
CI: https://github.com/murorachi/Amq-/actions/runs/39118213634

Product lock:
- V82.82 standalone HTML remains 8,787,490 bytes / SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`.
- V82.65 remains immutable.
- No production HTML, runtime source, or CSS changed in V82.85.10.

Next stage:
1. Inspect the AMQ custom-list data path and isolate one pure normalization helper, preferably separating data normalization from localStorage access in `readCustomLists()` without changing its output contract. Confirm callers and dependencies before editing.
2. Add focused contract cases for legacy array/object payload shapes, missing IDs/names, stringified numeric IDs, duplicate anime IDs, and invalid rows. Preserve existing custom-list CRUD, native-storage reload, and backup/restore acceptance.
3. Run the full source/unit and browser workflow, verify the generated HTML remains byte-identical to V82.82, and update this file plus CURRENT_STATUS.md and BASELINE.md.
4. Keep quiz and multiplayer lifecycle extraction deferred until the next pure-data helper is accepted. Keep CSS as a separate workstream.

Do not combine helper extraction with UI, lifecycle, storage-format, or CSS changes.

Rollback: `v82.85.9-multiplayer-lifecycle-browser-acceptance-01`; product baseline remains V82.82.
