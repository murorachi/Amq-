# Candidate 114 — Player bar separation and compact layout

## Source and scope
- Derived from Candidate 112, not from unaccepted Candidate 113.
- Candidate 112 remains untouched.
- Goal: make Home and Song Select player presentation route-specific, prevent fixed bottom-dock inline styles leaking back into Home, and reduce Song Select transport height.

## Changes
- Song Select playback dock: 106px → 76px.
- Song Select mode/source selector stack: 90px → 62px.
- Catalog bottom gap adjusted to 78px so the list ends immediately above the compact dock.
- Home player frame: 78px → 68px; player slot/dock: 54px → 46px.
- On leaving Song Select, reset route-owned inline layout styles and explicitly apply compact Home layout.
- Hide duplicate Home-only metadata/progress/cover elements that caused the same track information to be drawn twice; keep the native audio controls in the Home player.

## Validation
- Browser assertions: 7 PASS, 0 FAIL.
- Inline JavaScript syntax: 61 script blocks, 0 errors.
- CSS parse: 89 style blocks, 2,549 qualified rules, 0 parse errors.
- Song Select dock 76px high; mode stack 62px; catalog-to-dock gap 2px at 1648×928.
- Home dock 46px high and frame 68px, both on initial Home and after returning from Song Select.
- No uncaught browser errors observed.

## Not verified
- Real audio playback over external network.
- Durable storage across reload (test used an in-memory storage shim).
- Full pixel-perfect comparison against osu!stable.
- HTML binary upload to GitHub and remote SHA-256 verification.

## Rollback
- Candidate 112: immediately preceding visual checkpoint.
- Candidate 110: prior tested interaction-state checkpoint.
- Candidate 104: historical accepted rollback checkpoint.