# Next task

Current checkpoint: **V82.68 CANDIDATE-POLICY-MODULE-01**. Product baseline remains immutable V82.65. Pure candidate-policy source has been separated without changing generated HTML bytes.

## Completed
- Candidate policy moved to `src/modules/candidate_pool_policy.js`; builder inserts it into the same classic script at the original execution position.
- Builder verifies module hash/length and rejects missing/duplicate markers.
- Verifier checks module count/hash/marker and performs two deterministic builds.
- `python tools/run_all_checks.py`: 8/8 commands passed; 135 Node assertions passed; integrity verifier 101/101.
- HTML remains byte-identical to baseline: 8,786,930 bytes; SHA-256 `abd202a6f96cc08e0969ad05ab8574cc71001733d655bcb5cff6b1a1a5b33a33`.
- Browser smoke rerun timed out with Playwright driver EPIPE after 11 preliminary assertions; not a pass.

## Next actions
1. Verify policy-module consumers and exact-source test boundaries; do not duplicate policy logic.
2. Select the next low-risk pure module after reviewing its inputs/outputs and side effects.
3. Add golden tests before moving candidate pipeline/source adapters.
4. Retry constrained browser smoke in a stable permitted environment.
5. Publish and read back code/report files where possible; separately record that full source tree and binary ZIP are not remotely published.

## Commands
```bash
python tools/run_all_checks.py
python tests/browser/browser_ui_smoke_opaque_origin.py
```

Never clear or overwrite real profiles, history, custom lists, IndexedDB or server state for tests.
