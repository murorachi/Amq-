# Batch 22 — Redundant ranking-frame bootstrap removal

Source Candidate316 SHA-256 4845b950ae4e801aa6c6da2d9d0a23bdbac16a04edaa218396e4c043b17b4317. Candidate317: 1,645,902 bytes, SHA-256 e1373606dcc9717762bfde52636a45431bbb5f7694bf0a59f2f11391b960b2c9; 710 bytes removed.

Candidate70 creates amqSongSelectRankingPlaceholder at script index 43. Candidate72's bootstrap at index 63 had become a no-op after Batch21 removed its observer; deleted the entire script tag. Removed Candidate71's fallback creation branch because Candidate70 already created the same ID earlier in document order.

PASS: JS syntax 67/67, CSS parse, duplicate IDs, isolated Chromium frame/dock open/Escape behavior unchanged. Full-app E2E NOT RUN. Candidate317 not promoted; formal baseline Candidate302 unchanged; HTML upload/hash NOT VERIFIED.
