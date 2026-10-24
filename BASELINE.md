# BASELINE — AMQ Song Select

- No accepted final release exists for the current osu!stable Song Select refactor.
- Recovery baseline Candidate 178 SHA-256: b91109c7c660be064cedf76b20e473b12ca415be8e0650f16d8086339c2a9f80.
- Direct source Candidate 207: 9,310,496 bytes; SHA-256 2f3a092a139628daa48bc113d2a192f41e2d7474182471ed926de3de49fd6100. It remains unchanged.
- Candidate 208: rejected; SHA-256 0943bfde66d0f19e5d004f4ec70c7eea44c51bceede7864e893a64051ba720bf.
- Candidate 209: rejected; SHA-256 8a38e08cfb904703c02b7911b7974c8c3d6fc3617bacc6b6b85ef29e8d90ded1.
- Candidate 210 is an experimental local checkpoint rebuilt directly from Candidate 207. Current size 9,347,587 bytes; SHA-256 fea29371f6a94cc21a4ccfba9b98c1f4d76a9ae4727d54a269e6b79e1f65a036. Not accepted.
- Browser tests use Playwright set_content with an in-memory storage shim because the environment blocks file:// and localhost navigation. Durable localStorage persistence is not verified.
- Static checks: 68 executable inline JS blocks pass node --check; 107 CSS blocks / 2,745 qualified rules parse with zero tinycss2 errors.
- Runtime corrections: Song Select row grid placement/width/height; EMQ/MIX default-category render cost. Remaining: workspace lifecycle, real cover success/failure, real audio/random seek, wheel selection, persistence, and pixel/geometry acceptance.
- GitHub HTML upload and remote SHA-256 readback are blocked by the available transfer interface and unavailable container DNS/network. No remote HTML hash is claimed.
- Preserve prior candidates. Rollback means discarding Candidate 210 and returning to unchanged Candidate 207; never overwrite Candidate 207.