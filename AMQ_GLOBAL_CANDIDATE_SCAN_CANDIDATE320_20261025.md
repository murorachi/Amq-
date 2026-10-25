# AMQ Candidate320 全域候選掃描（第一輪）

- Candidate：`amq_learning_tool_v82_86_31_candidate320_remove_dead_songselect_catalog_observer_20261025.html`
- Bytes: 1,645,470
- SHA-256: `134020658ac272916bdd503c0ebdbe8cdbafcf0c15cff96cc0d45ddf63c8a66c`
- Formal baseline remains Candidate302, SHA-256 `f718a744057be0a33d371306f1742aaeede90e84f33d9e62ab45f5e6db488abd`. Candidate320 is not promoted. No application source was modified.

## Static scan
- Executable inline scripts: 65
- Style blocks: 109
- CSS rules/declarations: 2,648 / 9,693
- CSS parse errors: 0
- HTML IDs: 269; duplicate IDs: 0
- Repeated CSS selector strings: 342
- Function names declared across multiple script blocks: 11 (local-scope collisions possible)
- Observer constructor occurrences: 54
- addEventListener/removeEventListener call sites: 474 / 4
- setTimeout/setInterval/requestAnimationFrame calls: 134 / 10 / 32
- SHA-256 and CSS parse/duplicate-ID static checks: PASS. JavaScript syntax PASS is carried forward from the handoff's 65-script check; not rerun in this round.
- Chromium/full-app E2E: NOT RUN. No code deletion was performed.

## Candidate groups
1. **CSS duplicate cascade:** 342 selector strings occur more than once. Compare media conditions, specificity, order and computed style before removing rules.
2. **Song Select owners/lifecycle (HIGH):** Candidate103, 106, 114, 115, 137, 158, 210, 193, 99, 71/72 and Proto26 integration. Build a DOM/property ownership matrix before deletion.
3. **Workspace runtime overlap (HIGH):** candidate76/77/82, candidate227 bridge, workspace prototype 15/16. Trace active class, shell/frame/sidebar/actions and custom-list workflow.
4. **Quiz/player historical patch stack (HIGH):** v32-v65 and v82-35/39/40/44. Versioned names alone are not dead-code evidence.
5. **Storage/data lifecycle (HIGH):** storage repository, profile/PP recovery, custom lists, SRS, EMQ lists/settings, scene-background IndexedDB. Audit every read/write/delete/import/export/recovery path.
6. **Modal lifecycle (MEDIUM-HIGH):** candidate185 plus feature-specific modal builders. Test exclusions and nested open/close flows.

## Specific lifecycle candidates
| ID | Module / evidence | Initial classification | Required verification |
|---|---|---|---|
| LC-01 | candidate106 lines 34-35: navigation queues at 80/300/900ms; body class observer and resize listener | INTEGRATE CANDIDATE | Compare DOM readiness and CSS writes with Candidate114 |
| LC-02 | candidate114 lines 22-25: delayed reset and 0/180/500/900ms initialization retries | INTEGRATE CANDIDATE, HIGH | Map writes against Candidate103/106; browser trace retry necessity |
| LC-03 | candidate137 lines 26-29: render debounce, 250ms init retry and interval | INTEGRATE CANDIDATE | Check ensure success, stop condition, route-exit cleanup |
| LC-04 | candidate103 lines 12-13: body class and audioPlayer attribute observers both schedule fix | KEEP / POSSIBLE INTEGRATION | Prove audioPlayer mutations cannot affect owned properties before removing |
| LC-05 | candidate158 line 2: route/viewport-dependent overflow writes | KEEP / INTEGRATE CANDIDATE | Enumerate all overflow writers and route-exit restoration |
| LC-06 | candidate210 lines 32-34, 86-99: multiple list/media/route observers in large behavior module | NEEDS CONFIRMATION | Map observer targets, callback effects and cleanup; do not delete whole module |
| LC-07 | candidate71 lines 27-52: grid/VNDB sentinels, mutation observer, init interval up to 30s | INTEGRATE CANDIDATE | Check duplicate sentinels, readiness flag, route exit |
| LC-08 | candidate99 lines 66-72: dock metadata and route observers; progress/volume/mode sync | NEEDS CONFIRMATION | Preserve sync behavior while checking observer scope/cleanup |
| LC-09 | candidate115 line 9: documentElement subtree observer; Candidate210 also has row-cover observers | INTEGRATE CANDIDATE | Compare DOM targets and artwork responsibilities |
| LC-10 | candidate185 lines 21/43/46: overlay/dock/route observers | NEEDS CONFIRMATION | Check excluded IDs, nested modals, close/reopen |
| LC-11 | workspace prototype 16 line 21: refresh/grid observer binding | INTEGRATE CANDIDATE | Check repeated observation and disconnect behavior |
| LC-12 | candidate76/77/82 workspace runtime group | INTEGRATE CANDIDATE, HIGH | Assign unique owner for DOM/class/property before changes |

## Round-1 disposition
- **Direct-delete candidates newly approved: 0.** Static counts do not prove that event, observer, timer or data-flow code is dead. Batch25's catalog observer removal is prior work, not counted again.
- **Integrate candidates:** LC-01/02/03/05/07/09/11/12, pending dependency/runtime evidence.
- **Needs confirmation:** LC-06/08/10 and any candidate with dynamic references, data compatibility or lifecycle uncertainty.
- Next: build property/DOM ownership maps for Song Select, then batch-remove only proven redundant code. Keep Candidate320 immutable and create a unique new candidate for source edits.
