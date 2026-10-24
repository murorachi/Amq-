# BASELINE — Formal baseline unresolved; Candidate277 is an audit snapshot

## Formal baseline
- Candidate212 is recorded as user-authorized baseline: 9,352,632 bytes; SHA-256 52376c693c5c0701d77e80a6076620623ef9ef5decadd11265d6b57bcf6c6952.
- Candidate212 raw bytes could not be materialized; recorded size/hash are historical evidence, not freshly verified.
- No candidate is promoted to formal baseline. Batch 1 exit remains BLOCKED until original bytes are recovered or a replacement baseline is explicitly authorized.

## Remote lineage
- Repository murorachi/Amq-, default main HEAD 0ebea5488149775f55808683e59dbed168fc0363.
- Candidate229 branch HEAD 4ce4af799d00a21390376832af500379e89ef67a; manifest records HTML SHA 8d9c9c9fff823d3e333875aeb07ada9fd73976dd64d55e6cdc2c6471f06e0448 (9,366,832 bytes).
- Candidate231 branch HEAD d9527cb3e251833c3845a73062d60a89689e812a; manifest records HTML SHA 74607e5344e0b993fb1e8d40c081285287071c236c9c92bac86cac98c5c9fecf (9,367,325 bytes).
- Candidate229→231: 12 commits ahead. Candidate231→Candidate264: 140 commits ahead, behind 0.
- Candidate229/231 HTML is absent from those remote branch trees; manifest hashes are not remote binary readback proof.
- main and Candidate264 diverged; do not treat main as latest Song Select baseline.

## Local audit snapshot (not accepted)
- Candidate277: 9,373,238 bytes; SHA-256 b628bfb5b4aec30a34935bcf5aaac095ab405a71ebe482f9a666c2f91a019371.
- Rollback Candidate276 SHA-256 7a604c1d2d604b928d2ccb51dbb55d58ead2d34f73abfcba27693c794a4ddbd5.
- Candidate277 not uploaded/read back from GitHub.
- Metadata mismatch: title Candidate219 and data-amq-candidate=227 despite Candidate277 build comment.
- Stage54/55 did not modify either HTML file.
