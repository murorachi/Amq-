# Baseline / rollback

- Historical accepted rollback Candidate 104: SHA-256 `39526d4fcbb2d92fb2e5da0c808b1a7c38f187141a21e168a81b4156873a5b93`.
- Candidate 110 interaction checkpoint: `27838d55b659818982fc55bb9d6de5664f6cef7d29a62ca4013e6fabc3a37d67`.
- Candidate 112 visual checkpoint: `96132bd477341861bc04ecd0cc0592357b8d0678e9857cbefa20871ea3453cf4`.
- Candidate 114 player-layout checkpoint: `79b5f809abd1af10bf46fd4f2450153f7aba0486a70d164e37d2a54e085f6d02`.
- Candidate 115 pre-stage-1 source: `7e24020480515fd8a4fad34907de9a4da1694abf998c2ae933a005b64f5ff1b1`.
- Candidate 116 current partial stage-1 result: `78e665ad23ee21c9b0ab5c644f0bba2be3d311d8fee0e2015cf5fbaab06fe756`.
- Candidate 113 remains rejected and is not a source. Rollback from 116 to 115 restores the exact stage-1 starting point. Keep historical files immutable.