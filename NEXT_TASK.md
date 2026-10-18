# Next task

Current checkpoint: **V82.85.22 history/SRS boundary audit (ACCEPTED)**.
Branch: `v82.85.22-history-srs-boundary-audit-01`.
Acceptance run: https://github.com/murorachi/Amq-/actions/runs/39142131467.

## Accepted gates
- Source inventory and deterministic V82.82 build pass.
- All 16 module contracts pass.
- Script_004 boundary audit passes in CI.
- Package/matrix tests pass.
- SRS schedule validator contract passes all 28 cases.
- Full browser-native-origin suite passes.

## Next highest-value task
Extract only `isValidSchedule(x)` from `script_020` into a source module at its original position. Preserve the function body byte-for-byte and retain the surrounding `validStates` closure. Add its module record and verify the assembled product remains byte-identical. Do not combine this with storage recovery or FSRS state-machine changes.

Known environment gates remain Firefox/CSS cascade, real audio-provider playback, live two-client multiplayer reconnect, and production-domain storage policy/full IndexedDB failure cases.

Product lock: V82.82, 8,787,490 bytes / SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`; V82.65 immutable.
Rollback: return to parent commit `678cb6d0d2b40fa4536740047e657ae2edc746ac`.
