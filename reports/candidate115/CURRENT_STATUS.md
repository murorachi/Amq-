# CURRENT STATUS — Candidate 115

- HTML: `amq_learning_tool_v82_85_46_workspace_proto44-osu-songselect-ui_115.html`
- Size: 9,235,288 bytes
- SHA-256: `7e24020480515fd8a4fad34907de9a4da1694abf998c2ae933a005b64f5ff1b1`
- Source: Candidate 114, SHA-256 `79b5f809abd1af10bf46fd4f2450153f7aba0486a70d164e37d2a54e085f6d02`.

Changes: added work artwork tile to expanded song rows; stable columns for artwork/title/actions; removed row translation from selected/hover states to avoid scrollport clipping; preserved existing song actions.

Tests: 7 PASS, 0 FAIL. JS syntax: 62 scripts, zero errors. CSS parse: 90 style blocks, 2,567 qualified rules, zero parse errors. Browser verified artwork tile, selected row, hover bounds, existing action buttons and no uncaught errors at 1648×928.

Not verified: actual audio playback; durable storage after real reload (test uses in-memory localStorage shim); full osu!stable pixel comparison; remote binary upload and SHA-256 verification.