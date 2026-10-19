# First-pass audit: script_037 embedded EMQ payload

Baseline: V82.85.28. File: src/scripts/script_037.htmlpart. Git blob: 9839f4f1ac8a53e5f435ecffbc154670650da8a3.

Disposition: **first-pass data-payload audit complete**. This fragment is not executable application logic; it is a gzip-compressed Base64 catalogue embedded in a script element with MIME type application/octet-stream.

## Direct observations

- Wrapper ID: emqLibraryGzipBase64V8248.
- Encoded payload: 2,684,236 Base64 characters; Base64 alphabet validation passed.
- Decompressed JSON: 8,383,856 bytes.
- Catalogue schema: version 1.
- Records: 6,645 works and 16,839 songs.
- Structural checks: positive safe-integer work/song IDs, unique work IDs, unique song IDs, and every song's work reference resolves to an existing work.
- The runtime loader in script_038 requires DecompressionStream('gzip'), parses version/works/songs, and rejects invalid or duplicate song IDs, AMQ/EMQ song-ID collisions, work-ID collisions and missing work mappings before readiness.
- The manifest previously classified this application/octet-stream payload as executable by a heuristic. The manifest was corrected to role compressed-data-payload and executable_heuristic false. The test now protects this classification.

## Test and build evidence

Added tests/unit/embedded_emq_payload_integrity.test.cjs. It decodes the **actual embedded payload**, not a synthetic fixture, using Node's gzip implementation and verifies wrapper uniqueness, Base64 form, gzip signature, JSON version, non-empty arrays, unique IDs, referential integrity and manifest classification.

Run [39232121712](https://github.com/murorachi/Amq-/actions/runs/39232121712):
- Source/unit verifier: PASS, 132/132.
- Actual embedded payload integrity test: PASS, 6,645 works / 16,839 songs / 8,383,856 decompressed bytes.
- Deterministic V82.85.28 candidate: PASS, 8,786,547 bytes, SHA-256 7284c4ca5625886d913f55ab19a0076d1a5be46a88504dd8de724ae8f5bd274d.
- Deterministic source package: PASS, SHA-256 67b60cd7493b05e631e64d4a5ff7018069d28db1f6f5b1daaa8799e16491af8f.
- Firefox and Chromium browser jobs were still in progress when this report was written; do not infer their final results here.

## Limits

This test validates the embedded compressed payload and core referential integrity, not semantic correctness of every title/alias/audio URL, freshness against an upstream catalogue, or real audio availability for every row. The runtime loader's cross-source collision checks remain necessary.

## Recommendation and rollback

No payload bytes or runtime behavior were changed. Keep the focused test because it closes a real gap: prior EMQ contract tests used a synthetic gzip fixture rather than decoding this exact 8.38 MB JSON payload. Roll back by reverting the new test, its workflow/package registration, this report, matrix reference and manifest classification change as one audit step.
