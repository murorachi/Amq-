# Next task

Current checkpoint: **V82.85.10 quiz settlement browser contract, accepted**.
CI: https://github.com/murorachi/Amq-/actions/runs/39118372306

Product lock:
- V82.82 standalone HTML remains 8,787,490 bytes / SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`.
- V82.65 remains immutable.
- No production HTML, runtime source, or CSS changed in V82.85.10.

Next stage:
1. Audit the existing AMQ custom-list path for a genuinely pure data-normalization helper that can be extracted byte-for-byte, including current callers and dependencies.
2. Prefer an existing self-contained helper whose exact source can move to a module without changing generated HTML. Do not split `readCustomLists()` into new wrapper/helper calls if that changes the V82.82 output bytes. If no safe exact-source boundary exists, document the finding and defer extraction rather than weakening the baseline gate.
3. Add focused contract tests for the selected helper and wire them into the existing source/unit workflow. Preserve custom-list CRUD, native-storage reload, and backup/restore acceptance.
4. Run all source/unit and browser gates, confirm deterministic V82.82 byte identity, then update CURRENT_STATUS.md, BASELINE.md, and NEXT_TASK.md.
5. Keep quiz/multiplayer lifecycle extraction deferred until a safe boundary is proven. Keep CSS as a separate workstream.

Do not combine helper extraction with UI, lifecycle, storage-format, or CSS changes.

Rollback: `v82.85.9-multiplayer-lifecycle-browser-acceptance-01`; product baseline remains V82.82.
