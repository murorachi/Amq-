# First-pass audit: script_026 profile, PP and mobile feedback

Baseline V82.85.28. File src/scripts/script_026.htmlpart. Source blob 8fec51b9a442eb43f39c11416e5d8c811a328846.

Disposition: first-pass review complete; no production source change.

## Profile
- 31,712 characters, 195 lines, 26 named functions detected by conservative pattern.
- 27 event-listener registrations and 12 localStorage references.
- Persistent records include aniAmqProfileV1, aniAmqPPRecordsV1 and separate recovery keys.

## Responsibilities
- Validate and recover the user profile and PP records.
- Parse quiz history and target summaries, calculate difficulty and performance points, and update profile counters after answers.
- Render profile UI and apply difficulty/PP updates.
- Install modal focus trapping, home navigation setup, dock positioning and mobile answer recovery.
- Connect quiz feedback events to profile changes.

## Risks and evidence
- Profile and PP records have separate schema/recovery paths. Do not merge them or rename keys without migration tests.
- PP is derived from answer history and target-specific summaries; preserve event ordering and idempotency.
- Focus trapping, dock positioning and mobile answer recovery are accessibility/input boundaries, not merely cosmetic code.
- The reviewed unit inventory did not show a dedicated exact-source PP calculation contract; this is a test-coverage gap, not proof of a calculation defect.
- Existing history isolation and lifecycle contracts cover upstream history/event boundaries but do not validate every PP formula or mobile focus scenario.

## Findings
| ID | Risk | Disposition |
|---|---|---|
| PP-01 | Profile and PP storage/recovery use different schemas. | High: keep separate keys and recovery behavior. |
| PP-02 | PP/difficulty updates depend on history event semantics. | High: add formula-specific tests before any calculation refactor. |
| PP-03 | Modal focus and mobile answer recovery affect keyboard/touch behavior. | Medium: require browser interaction checks before changing. |

No production source change. Rollback by reverting this report and matrix references.
