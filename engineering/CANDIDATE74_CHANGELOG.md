# Candidate 74 Change Log

Parent: Candidate 73 (`8a6f0e16ec730c39d7f45f7bc17ac0a73310a8192ed297c040ef273f33aa88c1`).

## Root cause
Candidate 73 made the management frame visible throughout the mobile Song Select route. In the collapsed state, the fixed frame occupied x=12..332 and y=115..694 at a 390x844 viewport, overlapping the catalog even though no workspace panel was open.

## Change
- The mobile frame defaults to `display:none!important` while the workspace dock is collapsed.
- `body.amq-songselect-route-active.amq-dock-expanded #amqSongSelectRankingPlaceholder` explicitly sets `display:block!important` while a workspace panel is expanded.
- Existing mobile frame geometry and sidebar inset remain unchanged.
- Desktop frame behavior is unchanged.

## Scope boundary
This fixes one mobile state/overlay bug. It does not claim full Song Select visual acceptance or full application regression acceptance.
