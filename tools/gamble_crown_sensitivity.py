#!/usr/bin/env python3
"""Sensitivity table for the Broken Crown low-stake bust hypothesis.

Acquisition cost and minimum wager are not specified in the paper rules.
This deliberately conditional calculation ignores wager-cap utility.
"""
from dataclasses import dataclass
import unittest

BONUS = 60
MAX_TRIGGERS = 3

@dataclass(frozen=True)
class Scenario:
    wager: int
    item_cost: int
    triggers: int = MAX_TRIGGERS

    def __post_init__(self):
        if self.wager < 0 or self.item_cost < 0:
            raise ValueError("amounts must be non-negative")
        if not 0 <= self.triggers <= MAX_TRIGGERS:
            raise ValueError("trigger count must be 0..3")

    @property
    def bonus(self):
        return self.triggers * BONUS

    @property
    def wager_lost(self):
        return self.triggers * self.wager

    @property
    def net(self):
        return self.bonus - self.wager_lost - self.item_cost

def scenarios(wagers=(10, 25, 50, 60, 75, 100), costs=(0, 50, 100)):
    return [Scenario(w, c) for w in wagers for c in costs]

class SensitivityTests(unittest.TestCase):
    def test_low_wager_can_be_positive_if_item_is_free(self):
        s = Scenario(50, 0)
        self.assertEqual((s.bonus, s.wager_lost, s.net), (180, 150, 30))

    def test_wager_equal_to_bonus_has_zero_delta_before_cost(self):
        self.assertEqual(Scenario(60, 0).net, 0)

    def test_item_cost_changes_the_threshold(self):
        self.assertEqual(Scenario(50, 50).net, -20)
        self.assertEqual(Scenario(25, 100).net, 5)

    def test_trigger_cap_and_invalid_inputs(self):
        self.assertEqual(Scenario(1, 0, 3).bonus, 180)
        self.assertEqual(Scenario(1, 0, 0).bonus, 0)
        with self.assertRaises(ValueError):
            Scenario(-1, 0)
        with self.assertRaises(ValueError):
            Scenario(1, 0, 4)

if __name__ == "__main__":
    for s in scenarios():
        print(f"wager={s.wager:>3} cost={s.item_cost:>3} bonus={s.bonus:>3} "
              f"lost={s.wager_lost:>3} net={s.net:>4}")
    result = unittest.TextTestRunner(verbosity=2).run(
        unittest.defaultTestLoader.loadTestsFromTestCase(SensitivityTests))
    raise SystemExit(0 if result.wasSuccessful() else 1)
