# CURRENT_STATUS.md

- Candidate 170 is experimental and not accepted as the formal baseline.
- HTML SHA-256: 089d8cb9f6e63178a9726dbfce9485c8691e81d3600ce5669458a26c7a9d5662 (9,269,850 bytes).
- Root cause: runtime and CSS capped .p32-catalog at 762px despite intended 46.5vw width. Both caps were removed.
- Supplied reference image dimensions: 2555 x 1438 px; physical 27-inch monitor resolution is not confirmed.
- Focused geometry checks: 6 PASS / 0 FAIL at 2555, 1920, 1648, 1440, 1280 and 900 px widths.
- Existing 26-test suite: NOT RUN on Candidate 170. Real file://, durable storage, live API/audio and full CRUD: NOT RUN.
- Rollback checkpoint Candidate 169 SHA-256: 5913ad864a8841b144de7c72c4deeede765ec5675117667c13f9eb5fe89a7d66f.
