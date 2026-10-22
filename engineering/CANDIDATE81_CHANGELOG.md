# Candidate 81 Change Log

## Goal
Correct workspace hierarchy to three stages: (1) workspace selector, (2) left-middle action list, (3) right-side existing feature interface.

## Changes
- Added a third-stage content panel with close/back controls, status text, viewport-aware positioning, and Escape handling.
- Reuses and temporarily portals existing DOM nodes for watchlist/custom lists, catalog/batch controls, dashboard, learning plan/practice hub, quiz, and multiplayer where nodes exist. No cloned stores or duplicate feature implementations.
- Restores original DOM parents and hidden/display state on close.
- Batch selection actions invoke only existing selection controls. Batch apply-target actions locate/focus existing controls and do not activate them.
- If a dedicated VN list node is absent, falls back to catalog nodes and reports the limitation.

## Scope qualification
This establishes the third-stage portal and action mapping, not a claim that all 28 actions have been exhaustively tested in a normal-origin browser. Legacy views are portaled, not rewritten as native components. Data mutation, persistence, audio, cover loading, and VN-specific behavior need dedicated regression checks.
