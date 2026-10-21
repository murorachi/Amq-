# Next Task

1. Audit every action in the four workspace definitions (`lists`, `batch`, `learning`, `analysis`) and classify it as working in-place, navigating to a legacy page, no-op/missing target, or destructive/applying action.
2. Identify the actual existing DOM panels and renderers for watchlists/custom lists, batch tools, learning plan/practice and dashboard. Verify their event/data dependencies before moving or reusing them.
3. Migrate one workspace at a time into the popup without leaving Song Select; reuse existing DOM/data stores and do not clone data logic.
4. For each migrated action, test visible outcome, route remains Song Select, Escape closes only the popup, and data mutations still require existing confirmation controls.
5. Keep Candidate 76 as a rollback checkpoint. Do not retire legacy interfaces until all four workspace feature sets pass regression.
6. Obtain normal-origin browser verification for storage persistence, cover loading and audio. Upload HTML binary only through a workflow that can read local bytes; verify remote size/hash separately.
