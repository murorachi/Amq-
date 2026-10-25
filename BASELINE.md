# BASELINE — User-authorized working baseline: Candidate295

## Current baseline decision
On 2026-10-25, the user explicitly directed that Candidate295 become the formal working baseline and instructed us to stop searching for Candidate277. This decision supersedes all earlier baseline references in this document. Do not block work on recovering Candidate277 and do not silently switch back to it.

- Local source file: `/mnt/data/index-old.html`
- Embedded version: `v82.86.06-candidate295-db-extraction-20261025`
- Size: 1,720,917 bytes
- SHA-256: `aef896eee98c10bcb9fb1f10d6650b8e26067426f43b086e1b69fa12e3674a81`
- Baseline status: user-authorized, locally verified
- Preserve the original file unchanged. All code changes must be saved as a uniquely named child candidate.
- Candidate277 and Candidate276 details below are retained only as historical records and are not active baselines.

## Known dependencies and limits
- Candidate295 references external `data.js` and `emq-data.js`. The user reports having these files locally, but they have not been independently inspected in this workspace. Do not claim full AMQ/EMQ data validation until both are available and checked.
- Node.js `--check`: PASS for 67/67 executable inline JavaScript blocks. The inline JSON data block `aniAnilistIdMapV8237` is data and was not included in that syntax check.
- Static duplicate DOM ID scan: PASS, no duplicate IDs reported.
- CSS parsing: NOT RUN for this Candidate295 baseline.
- Browser interaction, storage reload, audio, live API and multiplayer checks: NOT RUN/BLOCKED by the managed browser environment.
- Current dependency inventory is static analysis only. Do not delete uncertain code solely because it looks old or duplicated.

## Rollback
Keep `/mnt/data/index-old.html` unchanged as the baseline copy. If a child candidate regresses, discard that child and restart from the exact SHA-256 recorded above. Never overwrite the baseline or its rollback copy.

## Historical baseline record (inactive)
Candidate277 was previously recorded as a working baseline with SHA-256 `b628bfb5b4aec30a34935bcf5aaac095ab405a71ebe482f9a666c2f91a019371`; Candidate276 was recorded with SHA-256 `7a604c1d2d604b928d2ccb51dbb55d58ead2d34f73abfcba27693c794a4ddbd5`. These are historical references only after the user's Candidate295 decision on 2026-10-25. No further recovery search is requested or needed.
