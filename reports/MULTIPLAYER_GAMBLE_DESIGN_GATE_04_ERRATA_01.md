# Design Gate 04 errata — Signal Room clue math

Gate 04's provisional Signal Room table stated that two clues yield a 2/3 success chance and a 1.5× gross return. That value was not consistent with the proposed clue model.

Design Gate 05 provides the exact generator and an executable enumeration:
- Three equally likely outcomes A/B/C.
- Each clue returns one of the two-outcome pairs containing the true outcome, uniformly.
- No clue: success 1/3, gross 3.0×.
- One clue: success 1/2, gross 2.0×.
- Two independent clues: matching pairs leave two possibilities; different pairs intersect at the true outcome. The pair clues match with probability 1/2, so success is (1/2 × 1/2) + (1/2 × 1) = 3/4. Fair gross return is 4/3×.

All three gross multipliers have expected gross return 1.0× stake before clue fees and integer rounding. Use Gate 05's values in future design work. The Gate 04 report is retained as the historical checkpoint; this errata supersedes only its provisional two-clue number.

Reference: `reports/MULTIPLAYER_GAMBLE_DESIGN_GATE_05.md` and `reports/design_simulations/gamble_roguelike_gate05.py`.
