# CURRENT STATUS — Candidate 171 Root Composition

- Current experimental candidate: Candidate 171, Song Select root composition.
- Local HTML: `amq_learning_tool_v82_85_46_workspace_proto44-osu-songselect-ui_171_songselect_root_composition.html`
- Local SHA-256: `0c54a57cb359ac1549d9d4558102fc6757e5aab6fb3577d680a521384c219fed`
- Size: 9,270,964 bytes.
- Change: route-scoped CSS suppresses home dashboard/discovery, quicktools/batch organization, and legacy sidebar while Song Select is active; resets inherited left padding/wrapper width. Compact dock remains. Modal panels are deferred.
- Static validation: 64 executable inline JS blocks parsed by Node `--check`; 0 syntax errors.
- Browser validation: NOT RUN. Playwright Chromium executable is missing; launch failed before page load.
- GitHub report `reports/candidate171-songselect-root-composition-20261023/VALIDATION.md` created. Candidate HTML itself is NOT uploaded or remotely verified.
- Candidate 171 is NOT ACCEPTED; no visual or behavioral pass is claimed.

Rollback: Candidate 170 SHA-256 `089d8cb9f6e63178a9726dbfce9485c8691e81d3600ce5669458a26c7a9d5662`. Next: secure a working browser runtime and inspect route layout at 2555×1438 and responsive sizes before further scene tuning.