# CURRENT STATUS — Song Select preflight (2026-10-23)

## Completed
- Re-read the official osu!stable reference and reverified its SHA-256.
- Recomputed Candidate 130 SHA-256; it matches GitHub's Candidate 130 report.
- Inspected Candidate 125/126/130/131/132/133/134 engineering records and feature-branch tree.
- Confirmed direct `file://` and localhost navigation are blocked with `net::ERR_BLOCKED_BY_ADMINISTRATOR`.
- Built a repeatable Playwright + Chromium observation loop using `page.set_content` and a test-only in-memory Storage shim. It provides actual Chromium rendering, DOM geometry and screenshots, but not direct file loading or durable persistence.
- Captured Candidate 130 screenshots at 1648×928, 1440×900 and 1280×720, DPR 1.
- Results at each viewport: 180 catalog cards, 0 console/page errors, 0 duplicate IDs, and one inline song list after selecting a work.
- At 1648×928, reference comparison (Lanczos resized to 1648×928): full-frame SSIM 0.312034, MAE 63.4492, RMSE 84.8510. Regional metrics are in `OBSERVATION_REPORT.md`.

## Confirmed code-level finding
The local Candidate 131 file is not the same artifact recorded as Candidate 131 on GitHub. Its appended styles target nested `.songrow`, but the initial catalog consists of `.p32-catalog .card`. Browser geometry shows top-level cards remain 60px high with repeating widths and no `data-amq-distance` attributes. That local file does not implement the desired top-level 7.5-card/distance layout as written. It is an unaccepted experiment, not the remote Candidate 131.

## BLOCKED / NOT RUN
- Direct file-origin load: BLOCKED.
- Localhost navigation: BLOCKED.
- Real localStorage/IndexedDB persistence and reload persistence: NOT RUN.
- Candidate 125/126/132 HTML byte-level inspection: BLOCKED because binaries are absent from the local workspace and inspected branch tree.
- Full visual acceptance and Stage 2/3 regression: NOT RUN.
- GitHub HTML binary upload and remote SHA-256 verification: NOT completed.

No candidate accepted. Candidate 130 remains the verified local rollback artifact only; no project HTML was produced during this preflight.