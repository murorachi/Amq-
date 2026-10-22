# NEXT TASK — Candidate 126 visual verification and remaining structural gaps

1. Open Candidate 126 in an allowed real browser at 1648×928, DPR 1, scroll 0,0; capture a screenshot.
2. Verify `#grid` is a vertical flex stack, card right edges align, per-row widths differ as intended, 60px row height holds, and inline expanded song rows do not break flow.
3. Exercise hover and selection on at least three rows; confirm actual metadata and audio controls remain functional.
4. Compare Candidate 126 with `/mnt/data/files/image.png` using full-frame and regional metrics. Never reuse previous candidate scores.
5. Address the remaining largest structural mismatch: reference has a large scene artwork canvas behind the list, a compact left ranking/player panel, top-left song metadata and top-right category/sort controls. The current AMQ left rail and empty central background still differ substantially. Use the existing user-selected scene-background mechanism; do not invent artwork or ranking stats.
6. Keep reload persistence and live import APIs marked NOT RUN until an allowed browser/network context is available.
7. Upload HTML and reports to the GitHub feature branch only when a verified binary upload route exists; verify remote SHA-256 after upload.
