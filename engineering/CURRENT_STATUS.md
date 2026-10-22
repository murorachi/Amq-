# Current Status

- Current candidate under review: Candidate 80, `amq_learning_tool_v82_85_30_workspace_proto28_song_select_80-frame-controls-stability.html`.
- SHA-256: `a5bed040a84c8314ac79ebd91357e579b967ff4fced7bd7b285b06dc0f97df1e`; size 9,113,277 bytes.
- Rollback checkpoint: Candidate 76, SHA-256 `2586036ce96d4c3fc0be6df2fb482a280936465e0ec51f45ed97c7a7475e136d`.
- UI correction: four workspace controls now live inside the left-middle frame; the existing action sidebar remains the popup to its right.
- Browser interaction assertions: 10/10 passed; see `engineering/CANDIDATE80_TEST_REPORT.md`.
- Static checks: 52 executable inline JS blocks pass; 77/77 CSS blocks parse; 247 IDs scanned, no duplicates.
- Source-level action audit: all 28 workspace actions classified in `engineering/CANDIDATE80_WORKSPACE_ACTION_AUDIT.md`; runtime testing of all 28 actions remains not run.
- Limitations: page.set_content opaque origin causes two localStorage errors; normal-origin storage/audio/cover tests not run. Popup actions are not exhaustively verified.
- GitHub branch: `amq-candidate80-frame-controls-stability`. HTML binary is not uploaded via the current GitHub text-file connector; remote HTML size/hash are not verified.
