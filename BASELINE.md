# BASELINE — AMQ Song Select

- No accepted final release has been declared for the current osu!stable Song Select refactor.
- User explicitly selected Candidate 178 as the recovery starting point because Candidate 205 was unavailable. Do not substitute Candidate 205.
- Candidate 178 SHA-256: `b91109c7c660be064cedf76b20e473b12ca415be8e0650f16d8086339c2a9f80`.
- Candidate 207 SHA-256: `2f3a092a139628daa48bc113d2a192f41e2d7474182471ed926de3de49fd6100`, 9,310,496 bytes (experimental; homepage initial-state fix). This remains unchanged and is the direct parent of Candidate 210.
- Candidate 208 SHA-256: `0943bfde66d0f19e5d004f4ec70c7eea44c51bceede7864e893a64051ba720bf`, 9,325,001 bytes (rejected; do not use as a source).
- Candidate 209 SHA-256: `8a38e08cfb904703c02b7911b7974c8c3d6fc3617bacc6b6b85ef29e8d90ded1`, 9,324,855 bytes (rejected experimental attempt; preserved, not overwritten).
- Candidate 210 local working checkpoint SHA-256: `e02a86131053d4f98bfba82d1c5c907eb33ef3a5f72048899303761ef4df5ef6`, 9,345,506 bytes. Parent Candidate 207. NOT ACCEPTED; not uploaded as an HTML artifact.
- Candidate 210 static checks: 68 executable inline JS blocks pass `node --check`; 107 CSS style blocks / 2,745 qualified rules parse with zero errors.
- Browser acceptance is BLOCKED because Chromium also fails to finish `about:blank` in this execution environment. Actual UI behavior, persistence, live APIs/audio/covers, and reference screenshot comparison remain NOT VERIFIED or NOT RUN.
- No candidate is accepted until the required real-browser regression and fixed-resolution visual comparison are completed.
