# Next task

Current checkpoint: **V82.67 BROWSER-UI-SMOKE-08**. The user confirmed the V82.66 product baseline is satisfactory. No production behavior changed in checkpoint 08.

## Completed
- Candidate-pool integration test local/GitHub blob SHA reconciled exactly: `c7313fe743157b5c6cde86e252983049be87ff5a`.
- Chromium UI smoke: 19 assertions passed for home/practice/quiz navigation, question selection, answer lock before playback, unplayed skip without history, next question, and solo EMQ list handoff.
- Automated runner: 8/8 commands passed; six Node suites 135/135; integrity verifier 98/98.
- Standalone HTML remains byte-identical to the immutable V82.65 baseline.

## Next engineering actions
1. Run standalone-origin browser acceptance in an environment that permits local HTML or a trusted local server.
2. Test localStorage reload persistence and IndexedDB save/restore/upgrade/failure using disposable synthetic data only. Never clear or overwrite real profiles, history, custom lists, or server state.
3. Verify actual audio playback-start gating, timing, and failed-source recovery with a controlled audio fixture.
4. Verify multiplayer room/player state, player-specific familiarity isolation, reconnect, and older-client compatibility in an isolated environment.
5. Record pass/fail/not-run and environment details. Change production code only if a reproducible defect is found.

## Commands
```bash
python tools/run_all_checks.py
python tests/browser/browser_ui_smoke_opaque_origin.py
```
