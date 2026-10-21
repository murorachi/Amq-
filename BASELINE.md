# Baseline

- Active engineering baseline for Proto26 Song Select integration: branch `v82.85.30-proto25-ui-refactor-stage-24`.
- Baseline HTML: `dist/amq_learning_tool_v82_85_30_workspace_proto25_stage24.html`.
- Baseline SHA-256: `5a0f18f47fb059427b385484086c66dd14716a03843fcba37f9eb5fe89a7d66f`.
- Baseline size: 8,926,248 bytes.
- Tested source commit: `3aea33e7137b7e3e3105c76ed896a515a335c2a3`.
- Existing CI run: https://github.com/murorachi/Amq-/actions/runs/39541057705.
- Candidate branch: `v82.85.30-proto26-song-select-integration-01`.
- Draft PR: https://github.com/murorachi/Amq-/pull/10.
- Baseline must remain immutable. Proto26 output is a distinct versioned path.
- Rejected prior Proto26 candidate (pre-readiness-fix): 8,932,924 bytes, SHA-256 `b43a446dd8019e21b7db255e0adf56256ebffd499a12f381c0f3364210e0757c`; browser acceptance failed because EMQ work cards did not render. Do not use this file as an accepted candidate.
- Corrected Proto26.3 candidate: 8,933,730 bytes, SHA-256 `fae6492da52d5e1389e9b2d0122496843697d1fa42088a2805593420a296ff4f`; GitHub Actions run https://github.com/murorachi/Amq-/actions/runs/39547940204 passed static and browser acceptance.
- The corrected candidate is accepted for continued development, not as final UI approval. Persistent workspace integration and osu!stable visual comparison remain outstanding.
- No promotion/merge until actual browser acceptance and osu!stable visual comparison pass.
