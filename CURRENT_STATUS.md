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
