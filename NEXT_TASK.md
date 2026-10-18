# Next task

Current checkpoint: **V82.85.20 module contract CI coverage (ACCEPTED)**.
Branch: `v82.85.20-module-contracts-ci-coverage-01`.
Acceptance run: https://github.com/murorachi/Amq-/actions/runs/39141098175.

## Accepted gates
- Deterministic V82.82 build and source inventory pass.
- Checkpoint package completeness/reproducibility passes.
- Closeout matrix exactly reconciles 91 fragments and 13 modules.
- All 16 unique Node module contract tests referenced by the matrix pass in the main CI workflow.
- Full browser-native-origin acceptance passes.

## Next highest-value task
Review the existing `script_004` boundary evidence and close the remaining dependency-map gap only where it affects a concrete extraction decision. Existing reports already list shared closure state, recognized browser/API calls, direct window exports, listeners and timers. Do not repeat the inventory blindly. Determine whether one bounded pure helper remains worth extracting; if not, document why the remaining core must stay coupled.

## External acceptance limits still open
Firefox/CSS cascade comparison, real audio-provider playback, live server plus two independent multiplayer clients/reconnect failures, and production-domain storage policy/full IndexedDB Blob failure cases.

Product lock: V82.82, 8,787,490 bytes / SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`; V82.65 immutable.
Rollback: return to parent checkpoint commit `443b380186504950de23cdaf413419388748f021`.
