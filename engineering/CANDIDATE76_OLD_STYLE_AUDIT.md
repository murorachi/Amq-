# Candidate 76 Old-Style Audit

Date: 2026-10-22

## Baseline verified

- Local active checkpoint: Candidate 76.
- SHA-256: `2586036ce96d4c3fc0be6df2fb482a280936465e0ec51f45ed97c7a7475e136d`.
- Parent Candidate 75 SHA-256: `4ad5a0d50bb072f36c936640c14b3744bf2a91c50b79b653392880ce8084a6dd`.
- GitHub branch `amq-candidate76-workspace-panel-shell` exists. Its `engineering/CURRENT_STATUS.md` matches the local Candidate 76 status and confirms the HTML binary is not uploaded.
- No HTML source has been modified during this audit.

## Confirmed structure mismatch

1. `#amqSongSelectRankingPlaceholder` is created as a blank decorative frame with `aria-hidden="true"`. CSS also disables interaction on the frame. It cannot currently serve as the workspace-button container.
2. `#amqWorkspaceDock` is a separate navigation element, originally fixed to the bottom of the viewport. It is not a child of the left-middle frame.
3. `#amqWorkspaceSidebar` contains the action menu. Candidate 76 positions this existing sidebar as a fixed popup to the right of the frame, but does not move the dock into the frame.
4. Thus the current screen has a blank frame, a separate bottom-left dock, and a right-side action popup. This does not implement the requested frame -> buttons -> right-side popup hierarchy.

## CSS cascade conflict

The active Candidate 76 document has multiple style blocks controlling the same elements:

- `#amqWorkspaceDock`: at least 8 style blocks.
- `#amqWorkspaceSidebar`: at least 10 style blocks.
- `#amqSongSelectRankingPlaceholder`: 3 style blocks.
- `#amqSongSelectBackButton`: 4 style blocks.

Candidate 76's style block is followed by later styles, including `candidate71-user-feedback-css` and `candidate72-home-songselect-corrections`; its rules are therefore not the final stylesheet authority. Later CSS also redefines the frame and sidebar geometry.

## Competing runtime ownership

At least five event-handler layers are attached to workspace buttons across the Candidate 70 correction runtime, the large workspace shell runtime, Candidate 76 shell runtime, Candidate 72 home runtime, and Candidate 72 frame bootstrap. They independently toggle expansion state, set workspace mode, and force panel visibility.

The large workspace shell runtime also writes `display:grid !important` inline to the dock, while the Candidate 71 responsive runtime writes `display:flex !important` inline. These competing inline-important assignments, alongside CSS rules and multiple click handlers, make the dock's layout and state timing-dependent.

## Root-cause assessment

- Confirmed: the left-middle frame and the workspace buttons are separate DOM elements; Candidate 76 only positions the action panel beside the frame.
- Confirmed: the frame is explicitly non-interactive/decorative in the current source.
- Confirmed: multiple later CSS blocks and runtime handlers compete over dock/panel state.
- Strongly supported, not yet reproduced in a full normal-origin browser session: these competing owners explain why a dock that appears stable in one static screenshot can change or become inconsistent after interactions.

## Required correction direction

1. Keep Candidate 76 immutable as rollback checkpoint.
2. Make one authoritative Song Select workspace controller responsible for button location, active workspace, expanded state, and popup geometry.
3. Mount the four workspace controls inside the left-middle frame; make the frame a real semantic interactive container instead of `aria-hidden` decoration.
4. Keep the existing action sidebar as the right-side popup. Do not move the left-middle frame to the right or replace it with the sidebar.
5. Remove or neutralize only conflicting Song Select-specific legacy overrides after tracing their dependencies. Do not rewrite unrelated homepage, quiz, audio, or catalog behavior.
6. Test interactions repeatedly, including switching all four modes, clicking the active mode twice, using Back, opening/closing other Song Select controls, resizing, and Escape. Verify the dock's bounding box before and after every interaction.

## Tests performed in this audit

- Source/DOM structure inspection: completed.
- CSS selector ownership and source-order inspection: completed.
- Runtime event-handler and inline-style ownership inspection: completed.
- New code or UI interaction tests: not run; no code changed during this audit.
- Normal-origin persistence/audio/cover-loading tests: not run.
