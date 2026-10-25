# Candidate346 Final High-Risk Residue Scan

- Artifact: `amq_learning_tool_v82_86_57_candidate346_batch50_remove_orphaned_local_helpers_20261026.html`
- Size: 1,625,225 bytes
- SHA-256: `dfef81df1572219d2b96b5f8eeeb50696acfe99a0fced53b6c83371f930c99ca`
- Formal baseline: Candidate302
- Rollback checkpoint: Candidate320
- Scope: bounded scan using existing Batch41–50 evidence and current source checks. No new application code changed.

| Item | Classification | Status | Evidence / remaining risk |
|---|---|---|---|
| Candidate186 cover recovery / orphan helper | DELETE | DONE | Recovery path and observer removed in prior batches; Batch47 removed leftover helper. Modal backdrop/Escape handlers remain. Browser behavior not tested. |
| Quiz evaluator helper chain | DELETE | DONE | `evaluate` had declaration-only occurrence; helper dependencies existed only inside that chain. Quiz submit bridge remains. Browser behavior not tested. |
| v36/v39/v40 Quiz local bindings | DELETE | DONE | Three bindings each had declaration-only occurrence; neighboring handlers preserved. |
| v60 and learning-system v72 local helpers/constants | DELETE | DONE | Five identifiers had declaration-only occurrences; zero remaining references after removal. |
| Workspace sidebar state/geometry and `[data-ws]` owner | INTEGRATE | STATIC CONSOLIDATION DONE; RUNTIME ACCEPTANCE OPEN | Candidate340/341 unified static ownership; actual click/ESC/resize/Song Select transitions blocked. |
| Base navigation and Candidate193 route guard | KEEP / INTEGRATE LATER | NOT DELETED | Distinct side effects: standalone-route state, Song Select panel interception, VNDB list opening, base navigation. Do not delete blindly. |
| Candidate94 membership filter | KEEP | PRESERVED | `#grid .card.amqListNotMember85` remains. |
| Candidate186 modal backdrop/Escape handlers | KEEP | PRESERVED | Both handlers remain; browser behavior not tested. |
| C103 audio controls and layout geometry | NEEDS CONFIRMATION | DEFERRED | Requires runtime/computed-style evidence; removing blindly risks player/layout regression. |
| v47 `.hero.view-home` display rules | NEEDS CONFIRMATION | DEFERRED | Requires route/media computed-style evidence. |
| Candidate72 `#homeMenu #amqMainIcon` inline styles | NEEDS CONFIRMATION | DEFERRED | Runtime resize styling requires computed-style comparison. |
| v33 `showToast` reference | NEEDS CONFIRMATION | DEFERRED | Bare binding/global availability is not proven by window-level toast fallbacks. |
| v82-45 `amqHomeIconOnly` selector candidate | NO CURRENT ITEM | NOT APPLICABLE | Exact string has zero occurrences in Candidate346; no matching code exists to delete. |
| Candidate84 dock/sidebar CSS | NEEDS CONFIRMATION | PARTIAL | Runtime ownership is statically consolidated, but selector-by-selector route/media dependencies still need evidence. Candidate94 membership filter retained. |

## Stage 3 conclusion
Remaining items are classified. Browser-dependent items remain NEEDS CONFIRMATION. Stop expanding cleanup-only work unless new evidence identifies a high-value, low-risk deletion.

## Release status
Candidate346 remains experimental. Full core browser regression is NOT RUN, workspace interaction is BLOCKED by `ERR_BLOCKED_BY_ADMINISTRATOR`, and Candidate346 HTML remote upload/hash readback is NOT RUN. Do not claim full functional acceptance or formal release.
