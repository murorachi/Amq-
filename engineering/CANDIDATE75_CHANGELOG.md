# Candidate 75 Change Log

Parent: Candidate 74 (`69191737e6dcfba22c8018c4a5020959f28e39f923e45fa2b4b46b8a8c08b721`).

## Root cause
Mobile Song Select already shortens `#amqSongSelectStage` by 220px to reserve lower controls, but the catalog then reserves another 174px from the bottom in two CSS rules and a runtime `setProperty`. This double-counted dock clearance: at 390x844 the catalog ended at y=516 while the audio dock began at y=676.

## Change
- Reduced the mobile catalog bottom reserve from 174px to 16px in both responsive CSS declarations and the runtime normalization function.
- Reduced the mobile workspace frame/sidebar bottom offsets from 150/151px to 170/171px so the expanded panel ends above the audio dock.
- Left desktop geometry and data-loading behavior unchanged.

## Scope boundary
This is a mobile layout correction for catalog and dock clearance, not full Song Select or whole-site visual acceptance.
