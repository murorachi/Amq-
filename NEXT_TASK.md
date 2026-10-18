# Next task

Current checkpoint: **V82.85.21 script_004 boundary decision (ACCEPTED)**.
Branch: `v82.85.21-script004-boundary-decision-01`.
Acceptance run: https://github.com/murorachi/Amq-/actions/runs/39141674475.

## Accepted gates
- Deterministic V82.82 build and source inventory pass.
- All 16 module contract tests pass.
- Script_004 boundary audit contract passes in recurring CI.
- Package completeness/matrix contracts pass.
- Full browser-native-origin acceptance passes.

## Next highest-value task
Audit the remaining large history/SRS fragments `src/scripts/script_020.htmlpart` and `src/scripts/script_023.htmlpart` for one meaningful, testable boundary. Preserve storage keys, migration behavior, reload semantics and failure handling; do not extract persistence/UI/state logic until a direct contract can be written.

External acceptance limits remain Firefox/CSS cascade, real audio-provider playback, live server plus two independent multiplayer clients/reconnect failures, and production-domain storage policy/full IndexedDB Blob failure cases.

Product lock: V82.82, 8,787,490 bytes / SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`; V82.65 immutable.
Rollback: return to parent commit `f3f132762c62f3d26d5bcd1334f35694640a38ae`.
