# AMQ Learning Tool V82.68 engineering checkpoint

## Current checkpoint
- `V82.68 CANDIDATE-POLICY-MODULE-01`, based on the V82.67 engineering checkpoint.
- The pure candidate-policy source was extracted into a source module. Runtime remains one classic standalone HTML; no UI, data, storage schema, audio, or multiplayer behavior was intentionally changed.
- HTML remains byte-identical to the locked V82.65 baseline: 8,786,930 bytes; SHA-256 `abd202a6f96cc08e0969ad05ab8574cc71001733d655bcb5cff6b1a1a5b33a33`.
- Automated build/unit checks PASS. Current constrained Chromium smoke rerun TIMED OUT with Playwright driver EPIPE and is not marked PASS.
- Full product acceptance remains PARTIAL.

## Tests executed
- Candidate policy 70/70; candidate pool integration 27/27; EMQ API/list 19/19; history/status isolation 7/7; solo EMQ handoff 4/4; answer-flow contract 8/8.
- Six Node suites: 135 passed, 0 failed.
- One-command runner: 8 commands passed, 0 failed.
- Integrity verifier: 101 passed, 0 failed; two deterministic builds match the baseline.
- Browser smoke rerun: timed out after 11 preliminary assertions, no final summary. Not a pass.

## Reports
- `reports/CANDIDATE_POLICY_MODULE_01_REPORT.md`
- `reports/ALL_CHECKS_09_SUMMARY.md`
- `reports/MODULE_MAP.csv`

The original V82.65 HTML and ZIP remain immutable. Real-origin browser acceptance, persistence, IndexedDB, actual audio/network, Firefox, multiplayer multi-device/reconnect, and full manual regression remain open. The full source tree and binary ZIP are not uploaded in this documentation-only GitHub commit.
