# SOURCE_SPLIT_01 GitHub upload status

Date: 2026-10-18 (Asia/Taipei)

## Result

The documentation branch `v82.65-source-split-01` was created from `v82.65-resume-checkpoint`.

The local checkpoint was built and independently verified:
- Archive: `AMQ_V82_65_SOURCE_SPLIT_01.zip`
- Size: 133,482,500 bytes
- SHA-256: `71b90e02b9c9f6b938e5f4fbc413e4fcfe0f0a19d2891ab5d511254b5822a30a`
- 397 ZIP entries; ZIP CRC PASS; 396/396 internal SHA-256 entries PASS.
- Rebuilt standalone HTML is byte-identical to the V82.65 source HTML: 8,786,930 bytes, SHA-256 `abd202a6f96cc08e0969ad05ab8574cc71001733d655bcb5cff6b1a1a5b33a33`.

## Blocker

The available GitHub connector can create UTF-8 text files and Git objects, but it does not expose a local-worktree or bulk-directory upload operation. The extracted source tree contains 91 fragments, including a roughly 5 MB inline JavaScript fragment and a roughly 2.7 MB embedded data payload. Those local file bytes are not available as arguments to the connector, so the complete source tree, template, inventories and build pipeline have **not** been uploaded by this commit.

This note is only a blocker record. It is not evidence that the product source tree or ZIP was uploaded to GitHub. The local ZIP and sidecar remain the verified delivery artifact.
