# Next task

Current checkpoint: **V82.66 ANSWER-FLOW-AND-RELIABILITY-07**.

## Completed
- Answer-flow exact-source contract: 8 passed, 0 failed.
- Candidate-pool cross-product coverage: 27 passed, 0 failed, including null/empty/malformed familiarity and song-type selections, watch-status defaults and invalid values, focus scope, and custom-list boundaries.
- Full local automation: 6 Node suites plus build and integrity verification; 8 commands passed, 0 failed.
- Candidate-policy architecture review completed. Policy extraction is deferred until a concrete benefit exists and deterministic build behavior is protected.
- Production HTML remains byte-identical to the locked V82.65 baseline.

## Acceptance still open
1. Manual browser acceptance in a permitted environment: home screen, practice entry, answer submission, skip, next question, and solo EMQ list flow.
2. IndexedDB save/restore tests using disposable synthetic data only. Never clear or overwrite real user data.
3. Real audio-start gating and failed-source behavior with a controlled audio fixture.
4. Multiplayer room/player state, familiarity isolation, reconnect, and older-client compatibility in an isolated environment.
5. Record pass/fail/not-run status and environment details. Do not treat unit tests as browser end-to-end acceptance.

## One-command local check
Run: python tools/run_all_checks.py

Keep the official V82.65 package and HTML fingerprint immutable. Do not start candidate-policy extraction unless it has a documented maintenance or correctness benefit and can preserve deterministic output.
