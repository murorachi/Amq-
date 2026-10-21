# Candidate 73 Change Log

Parent: Candidate 72 (`1b1e98437e088a7319e7f969e3d4703260c8511105a36127bde3f3982f544c81`).

## Root cause

Candidate 72's earlier `@media(max-width:900px)` block explicitly set `#amqSongSelectRankingPlaceholder` to `display:none!important`, while later Candidate 72 rules moved the workspace sidebar into the left-middle frame at mobile top/bottom coordinates. This left the panel and its intended frame visually inconsistent.

## Change

- Removed the obsolete mobile `display:none!important` declaration rather than layering another contradictory hide/show rule over it.
- Kept the frame visible on mobile and aligned it to `top:115px`, `bottom:150px`, and `min(320px, calc(100vw - 24px))`.
- Aligned the expanded sidebar inside the frame at `top:116px`, `bottom:151px`, and `min(318px, calc(100vw - 26px)`.
- Left desktop geometry, route logic, catalog behavior, and data handling unchanged.

## Scope boundary

This is a targeted mobile layout correction, not a claim of full Song Select or whole-site visual acceptance.
