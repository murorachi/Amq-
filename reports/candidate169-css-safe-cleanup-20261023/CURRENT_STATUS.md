# CURRENT_STATUS.md

- Candidate 169 is experimental and not accepted as the formal baseline.
- HTML SHA-256: `5913ad864a8841b144de7c72c4deeede765ec5675117667c13a6bba42af2e32f`.
- HTML size: 9,269,852 bytes.
- Candidate 169 removes 8 exact duplicate declarations from Candidate 164.
- Browser test suite: 26 PASS / 0 FAIL across 1648x928, 1440x900 and 1280x720.
- Removing the `p32-catalog bottom:16px` declaration caused the toolbar clipping assertion to fail; Candidate 169 retains it.
- Real file launch, durable storage, live API/audio, and full custom-list CRUD remain unverified.
