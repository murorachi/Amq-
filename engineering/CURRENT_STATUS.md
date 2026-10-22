# Current Status

- Current candidate: Candidate 83, `amq_learning_tool_v82_85_33_workspace_proto31_function-first_83.html`.
- SHA-256: `f6f10c5a0e9dceadf3618b3db94daac1f6d5c4e737048fda98f21177c69451bd`; size 9,126,730 bytes.
- Candidate 82 is unchanged and remains the immediate rollback candidate; Candidate 76 remains the long-term rollback checkpoint.
- Candidate 83 changes the workbench's VN personal-list activation so it resolves only the dedicated VN list view, invokes the existing reload/render control after mounting, and does not silently substitute anime/custom lists. It also dispatches a catalog refresh event after portal mounting and completes custom-list/watch-status mode activation before focusing the relevant control.
- Static checks: 53 executable inline JavaScript blocks pass `node --check`; 78 CSS blocks parse with zero parser errors.
- Browser shell regression: 28/28 workspace action entries open the panel, close with Escape, preserve route, and produce non-empty panel content; page errors 0 in the set-content test harness.
- Limitation: this smoke test validates shell/navigation only. Real-origin browser storage, VNDB network, audio, cover/API loading, full data mutation flows, and osu!stable pixel comparison are not verified. Local `file://` navigation was blocked by the execution environment, so normal-origin browser validation remains unrun.
- GitHub engineering records are on branch `amq-candidate83-vn-panel-activation`. The HTML binary is not uploaded remotely by the available connector and has not been remotely hash-verified.
