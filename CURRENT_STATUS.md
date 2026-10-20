# Current Status

- Version: V82.85.30 Proto17 initialization and workspace-route repair.
- Branch: amq-proto17-ui-init-acceptance-20261020
- Baseline: 4fc4a099389b59850c46d3eab2332be3401d487a
- Final HTML SHA-256: c2e27b8e820a81f714439d02352a575db0c139f4326c50755161f26e6dc250fe
- Final HTML bytes: 8832874
- Root cause fixed: the body-wide MutationObserver observed the scope-summary target, while refreshBatchScope rewrote the same text on every callback, continually scheduling another mutation cycle.
- Workspace routes fixed: practice mode shortcuts now use the existing practice view API; the Learning Center shortcut opens the current Learning group instead of searching for a removed legacy button.
- Validation: embedded JavaScript syntax and normal-HTTP-origin browser acceptance passed before this status was committed.
- Storage validation: native localStorage and IndexedDB read/write checks passed on 127.0.0.1 HTTP origin.
- Scope limitation: external APIs, remote covers, real audio playback, and pixel-diff visual comparison are not covered by this acceptance run.

## Handoff snapshot (checked 2026-10-21)

### Verified from GitHub
- Repository: https://github.com/murorachi/Amq-
- Continuation branch: `amq-proto17-ui-init-acceptance-20261020`; branch-specific BASELINE/CURRENT_STATUS/NEXT_TASK files exist here.
- Source pin: `4fc4a099389b59850c46d3eab2332be3401d487a`.
- Actions run `39395545055`: job “Fetch pinned Proto17 and package it” is `completed / success`; artifact `amq_learning_tool_v82_85_30_workspace_proto17` exists, is not expired at inspection time, and its ZIP SHA-256 is `cf2cbbafbbdac95a8cb688fc82019a52feac6e1d70a20a14f4fb182d604ea63c`.
- The workflow result only proves the pinned source was downloaded and packaged. It is not evidence of the UI acceptance tests passing.
- The repository `main` README describes an “AMQ V82.64 engineering checkpoint archive”; do not infer that main is the active UI continuation branch.

### Test status classification
- **Previously recorded PASS (branch status record):** embedded JavaScript syntax; browser acceptance on normal HTTP origin; native localStorage and IndexedDB read/write checks on `127.0.0.1` HTTP origin. These are reported by the existing branch record; this handoff did not rerun them.
- **PASS (directly inspected Actions metadata):** run 39395545055 packaging job and artifact upload.
- **Not covered / not established as passed by this checkpoint:** real audio playback/output, external APIs, remote cover loading, pixel-diff visual comparison, and the complete Osu-reference UI fidelity requirement.
- **Not rerun during this handoff:** browser acceptance, storage tests, audio-output acceptance, or full end-to-end regression.
- **No new product code changed during handoff.**

### Known issue / next blocker
The remaining UI work must be reference-driven rather than guessed from memory. Compare the Learning Center and Learning Analysis screens against the user-provided Osu reference images before styling changes. Separately retain the real-audio-output gate; do not infer audio correctness from browser initialization or packaging success.
