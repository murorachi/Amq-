# CURRENT STATUS — Candidate 126

- Inspected the user-provided osu!stable reference screenshot before editing.
- Root cause addressed: Candidate 125 changed row widths while the parent `#grid` remained CSS Grid. Candidate 126 switches that canonical owner to a right-aligned vertical flex stack so varying row widths can share the reference's right edge.
- HTML size: 9,237,739 bytes.
- SHA-256: `15e8644ec1ea079b6784fdeb8ac399aeecfc57ba00bd2b13b4d8b9b0a6a286a4`.
- Parent Candidate 125 SHA-256: `6dfe4ddc2b48e3a1c5ee7c12ae42f371877d1b30aae6abf99f68caebf3221145`.
- Static checks: PASS. 62 executable inline JS blocks parse with 0 errors; 90 CSS blocks / 2,579 qualified rules parse with 0 errors; layout owner and version markers verified.

BLOCKED / NOT RUN: real-browser screenshot and computed geometry, hover/selected state, durable reload persistence, live AniList/MAL/VNDB API tests, GitHub HTML binary upload and remote SHA-256 verification.

Visual fidelity acceptance remains NOT VERIFIED. Candidate 126 is not a final release.
