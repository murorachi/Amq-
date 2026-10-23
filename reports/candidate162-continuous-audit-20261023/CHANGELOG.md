# Changelog — continuous audit checkpoint

## 2026-10-23
- Fixed and hashed the reference screenshot and Candidate 161 under audit.
- Re-ran three-viewport Playwright suite: 26 PASS, 0 FAIL.
- Re-ran scene background test: 3 PASS, 0 FAIL, 2 BLOCKED; real image rendering/storage path cannot be verified in opaque-origin test context.
- Recomputed six-region SSIM/MAE metrics.
- Audited CSS: 96 style blocks, 2,648 rules, 0 parser errors, 379 repeated exact selectors; highlighted scene layer, top metadata, audio dock and workspace sidebar conflicts.
- No HTML changes and no release acceptance; avoided speculative cascade cleanup.
