# Next task

Updated: 2026-10-18. Current checkpoint: V82.66 SOURCE-SPLIT-02. Overall status remains PARTIAL.

## M0: Close baseline and artifact publication gaps
1. Obtain the exact V82.65 delivery ZIP (expected 124,658,780 bytes, SHA-256 `db7918affcfbb6a15b0dc3265877623d9646532c7597bf2acaa85060f5a701b5`).
2. Recompute outer SHA-256, run ZIP CRC, validate internal manifest coverage and every file hash, and compare HTML/server/catalog/registry fingerprints.
3. Publish the source-split ZIP and final HTML through a supported binary-artifact path; download them back and verify exact hashes. The current GitHub connector commits text files only for this workflow, so binary upload remains blocked.
4. Keep V82.65 and V82.64 originals untouched.

## M1: Semantic dependency mapping
1. Classify all 41 script blocks, distinguishing classic JS from JSON and compressed/base64 data payloads.
2. Map global declarations, same-name definitions/overrides, call sites, DOM writers/readers, event listeners, timers, and storage read/write sites.
3. Do not infer duplicate behavior from matching names alone; record call and override evidence.
4. Complete dynamic storage-key and backup/restore inventory.

## M2: Candidate-pool contract tests before refactor
1. Build the setting semantics matrix for absent/null/empty/unlimited/invalid values and AMQ/EMQ-only/Mixed modes.
2. Use fixed fixtures and assert exact candidate IDs, order, stage counts and exclusion reasons.
3. Add fail-closed aggregation tests for missing batches, timeouts, nonzero exits, fingerprint mismatch and malformed reports.
4. Only after tests are in place, extract a pure candidate-policy module and compare old/new outputs.

## Current checkpoint evidence
- 50 CSS + 41 script/data blocks separated as 91 byte-preserved fragments.
- Deterministic builder output: 8,786,930 bytes, SHA-256 `abd202a6f96cc08e0969ad05ab8574cc71001733d655bcb5cff6b1a1a5b33a33`.
- Automated integrity/build checks: 98 PASS, 0 FAIL.
- JavaScript syntax: 39/39 classic scripts PASS; 2 non-JavaScript data payloads excluded.
- ZIP CRC and internal manifest: PASS, 112 entries / 111 verified payload entries.
- Firefox/manual browser, external audio/API, IndexedDB round-trip and real multi-device tests: NOT RUN.
