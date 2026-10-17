# V82.66 CANDIDATE-POOL-TESTS-01 report

Status: PARTIAL. No product logic changed.

- Baseline HTML: 8,786,930 bytes; SHA-256 abd202a6f96cc08e0969ad05ab8574cc71001733d655bcb5cff6b1a1a5b33a33.
- Added exact-block Node VM tests for candidate policy: 70 passed, 0 failed.
- Builder/verifier: 98 passed, 0 failed; two builds deterministic and byte-identical to baseline.
- Static scan: 41 fragments; 817 detected function/arrow declarations; 31 names detected more than once; 89 explicit window assignments; 391 literal DOM ID references.
- Static scan is regex-based and not a complete call graph.
- Candidate checkpoint ZIP: 13,232,277 bytes; SHA-256 f2241be88187a095bf3716fdff4b0e2d5ad50047dbd0c95227385a27475cef8e; CRC PASS, 123 unique entries.
- Official V82.65 ZIP was unavailable and its full package hash/manifest were not recomputed.
- Firefox, external audio/API, IndexedDB round-trip, multi-device multiplayer and full product regression were not run.
- Next: fixed candidate ID/order fixtures for getQuizPool and EMQ/Mixed wrapper before extracting the pure policy module.
