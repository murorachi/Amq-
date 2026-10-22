# Current Status

- Current candidate: Candidate 82, `amq_learning_tool_v82_85_32_workspace_proto30_function-first_82.html`.
- SHA-256: `50c7a1a131f49d718fe3a29af51b557d9f155daa76ba841630141e61fc2a3540`; size 9,125,987 bytes.
- Baseline: Candidate 81. Immutable rollback: Candidate 76.
- Fixed native `hidden` attribute lifecycle during DOM portaling/restoration.
- Fixed dashboard/learning/quiz/multiplayer panel registration so the empty-state fallback no longer masks mounted nodes.
- Catalog portal selection now moves leaf `.view-catalog` nodes rather than nested ancestors and descendants together.
- Practice actions select the matching existing mode control when available, without automatically starting a session.
- Tests: JS syntax 53/53; CSS parse 78/78; workspace action shell/navigation checks 28/28; DOM restoration 3/3; batch safety 3/3; custom-list create/rename/delete UI checks 4/4 with test-only storage.
- Limits: real persistent storage, audio, external cover/API loading, full watch-state mutation coverage, and pixel parity remain unverified.
- GitHub HTML binary has not been uploaded or remotely hash-verified; engineering text records are uploaded separately.
