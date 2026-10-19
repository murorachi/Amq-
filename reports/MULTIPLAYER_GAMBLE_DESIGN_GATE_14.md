# Design Gate 14 — Shared Two-Slot Draft

Status: **Draft inventory redesigned to avoid party-size scaling; integrated simulation completed locally, CI pending.**

Simulation: `reports/design_simulations/gamble_roguelike_gate14.py`. This supersedes Gate 12's one-pick draft approximation. The team has a shared inventory capped at two items. Each cleared draft phase gives the two highest-ranked players one pick each from three item cards. No personal item ownership; item activation is decided by team vote.

No product implementation changed.