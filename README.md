# AMQ Learning Tool V82.67 engineering checkpoint

## Current checkpoint
- `V82.67 BROWSER-UI-SMOKE-08`; user confirmed the V82.66 product baseline is satisfactory.
- Automated engineering checks and constrained Chromium UI smoke: PASS.
- Full end-to-end product acceptance: PARTIAL; real-origin browser navigation, persistence, real audio, and multiplayer checks remain open.
- Standalone HTML: 8,786,930 bytes; SHA-256 `abd202a6f96cc08e0969ad05ab8574cc71001733d655bcb5cff6b1a1a5b33a33`, byte-identical to the locked V82.65 baseline.
- No production runtime, UI, catalog, storage schema, or generated HTML behavior changed.

## Tests
- Candidate policy: 70 passed.
- Candidate pool integration: 27 passed.
- EMQ API/list contract: 19 passed.
- History/status isolation: 7 passed.
- Solo EMQ list handoff: 4 passed.
- Answer-flow contract: 8 passed.
- Six Node suites: 135 passed, 0 failed.
- Integrity verifier: 98 passed, 0 failed; two deterministic builds match baseline.
- Chromium UI smoke: 19 assertions passed; this uses page.set_content(), in-memory storage, and unavailable IndexedDB due environment policy. It is not real-origin acceptance.

## Verification
```bash
python tools/run_all_checks.py
python tests/browser/browser_ui_smoke_opaque_origin.py
```

## Reports
- `reports/BROWSER_UI_SMOKE_08_REPORT.md`
- `reports/ALL_CHECKS_08_SUMMARY.md`
- `tests/browser/browser_ui_smoke_opaque_origin.py`
- `CURRENT_STATUS.md`, `BASELINE.md`, and `NEXT_TASK.md`

The official V82.65 checkpoint package and its fingerprints remain immutable. Real browser-origin, localStorage/IndexedDB persistence, audio/network, Firefox, multiplayer multi-device, reconnect, and full manual regression remain untested.
