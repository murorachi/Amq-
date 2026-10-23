# Current status — Candidate 160

Candidate 160 combines the measured asymmetric horizontal staircase, screenshot-derived vertical row offsets/heights, a brighter row-color probe, and filter toolbar alignment. The catalog itself was moved to allow the filters to sit at y=34 without clipping; the mode row is at y=67. A runtime observer reapplies the overflow adjustment after the lazy-created mount appears.

- SHA-256: `b550f834a5aef8fa981079fb83e1788211fc52f9b385f6925ff815fa28649cd1`; size: 9,271,222 bytes.
- Playwright: 25 PASS, 0 FAIL across 1648×928, 1440×900, 1280×720.
- Row top targets `[93,170,263,375,479,580,673,766]`; measured `[93,169,262,373,480,580,672,764]`; max error 2px.
- Filter y positions: search 34px, filter 34px, mode tabs 67px; explicit non-clipping assertion PASS.
- Hover movement check uses a 0.2px tolerance after transition completion; PASS.
- Static: 61 inline JS blocks checked, 0 syntax errors; 2,644 CSS qualified rules parsed, 0 parse errors.
- Full SSIM 0.308138, MAE 55.1537; right-list SSIM 0.368987, MAE 50.9136. Structural similarity is higher than Candidate 145, but MAE remains worse; not accepted.
- Direct `file://` remains BLOCKED_BY_ADMINISTRATOR. Durable storage, scene image/IndexedDB flows, real audio/live APIs, full custom-list CRUD and cross-workspace regression NOT RUN.
