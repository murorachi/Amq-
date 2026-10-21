# Candidate 76 Change Log

Parent Candidate 75: `4ad5a0d50bb072f36c936640c14b3744bf2a91c50b79b653392880ce8084a6dd`.

## Root cause
The dock layout was controlled by overlapping responsive rules, and Back is inserted dynamically into the same nav. The sidebar also receives inline `!important` position/size/background styles from earlier runtime scripts, which overrode later stylesheet-only attempts. The current popup therefore sat inside the frame and covered catalog content.

## Changes
- Force the Back button and four workspace buttons into one `flex` row with `flex-wrap: nowrap`, stable sizing and no vertical wrapping under Back.
- Use a single runtime geometry sync to place the popup 8px to the right of the frame and constrain its width before the catalog starts.
- Explicitly normalize legacy inline-important styles so the popup uses `rgba(0,0,0,.88)` and matches the frame height.
- Add a visible close control and make Escape close the popup without navigating away from Song Select.
- On narrow screens, temporarily hide catalog content while the popup is open because the viewport cannot fit frame + popup + song cards side-by-side. Catalog returns when the popup closes.

## Scope boundary
This candidate establishes the interaction shell only. It does not yet migrate every existing feature into the popup; some existing action-menu items still need functional auditing and in-place migration.
