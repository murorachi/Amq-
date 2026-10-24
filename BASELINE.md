# BASELINE — AMQ Song Select

- No accepted final release has been declared for the current osu!stable Song Select refactor.
- User explicitly selected Candidate 178 as recovery starting point because Candidate 205 was unavailable. Do not substitute Candidate 205.
- Candidate 178 SHA-256: `b91109c7c660be064cedf76b20e473b12ca415be8e0650f16d8086339c2a9f80`.
- Candidate 207 SHA-256: `2f3a092a139628daa48bc113d2a192f41e2d7474182471ed926de3de49fd6100`, 9,310,496 bytes (experimental; homepage initial-state fix).
- Candidate 208 SHA-256: `0943bfde66d0f19e5d004f4ec70c7eea44c51bceede7864e893a64051ba720bf`, 9,325,001 bytes (rejected by user; do not use as a source for future work).
- Candidate 209 SHA-256: `8a38e08cfb904703c02b7911b7974c8c3d6fc3617bacc6b6b85ef29e8d90ded1`, 9,324,855 bytes (experimental; rebuilt directly from Candidate 207).
- Candidate 209 static checks: 68 executable inline JavaScript blocks pass `node --check`; CSS parser reports zero errors across 105 style blocks. Chromium file navigation timed out; no browser behavior is verified.
- Candidate 209 HTML is not verified as uploaded to GitHub. Documentation commits do not establish artifact delivery.
- Do not declare acceptance until browser interaction, durable storage, live imports/audio/covers, adapted 26-case regression, and fixed-resolution osu!stable comparison are supported by evidence.
