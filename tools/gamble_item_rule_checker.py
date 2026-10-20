#!/usr/bin/env python3
"""Deterministic contract checks for the Gamble Roguelike item-design audit.

This is a small reference model, not a parser or a complete game simulation.
Run: python3 tools/gamble_item_rule_checker.py
Uses only the Python standard library.
"""
from dataclasses import dataclass
from fractions import Fraction
import unittest


class RuleViolation(ValueError):
    pass


@dataclass(frozen=True)
class Event:
    round_id: str
    event_id: str
    kind: str
    derived: bool = False


class EventLedger:
    def __init__(self):
        self._events = {}

    def record(self, event: Event) -> None:
        if not event.round_id or not event.event_id:
            raise RuleViolation("round_id and event_id must be non-empty")
        if event.event_id in self._events:
            raise RuleViolation(f"duplicate event_id: {event.event_id}")
        self._events[event.event_id] = event

    def events(self):
        return tuple(self._events.values())


def apply_single_loss_protection(loss: int, chosen_protection: str | None,
                                 available: set[str]) -> tuple[int, str | None]:
    """One protection may rewrite a loss; selection must already be locked."""
    if loss < 0:
        raise RuleViolation("loss cannot be negative")
    if chosen_protection is None:
        return loss, None
    if chosen_protection not in available:
        raise RuleViolation("chosen protection is not available")
    # Protection effects are represented as one mutually-exclusive rewrite.
    if chosen_protection == "escape_token":
        return loss - loss // 2, chosen_protection
    if chosen_protection == "fate_seal":
        return 0, chosen_protection
    if chosen_protection == "sealed_envelope":
        raise RuleViolation("sealed-envelope amount must be settled from its own principal")
    raise RuleViolation(f"unknown protection: {chosen_protection}")


def floor_ratio(amount: int, numerator: int, denominator: int) -> int:
    if min(amount, numerator) < 0 or denominator <= 0:
        raise RuleViolation("invalid ratio inputs")
    return amount * numerator // denominator


VAULT_LADDER = (
    (70, 150),
    (45, 260),
    (25, 500),
    (10, 1200),
)


def vault_ladder_probability_through(stage: int) -> Fraction:
    if not 1 <= stage <= len(VAULT_LADDER):
        raise RuleViolation("invalid Vault Ladder stage")
    result = Fraction(1, 1)
    for success_pct, _gross_return in VAULT_LADDER[:stage]:
        result *= Fraction(success_pct, 100)
    return result


def minefield_next_safe_probability(safe_seen: int) -> Fraction:
    """3 mines and 6 safe cells; conditional odds after safe_seen safe flips."""
    if not 0 <= safe_seen < 6:
        raise RuleViolation("safe_seen must be in [0, 5]")
    return Fraction(6 - safe_seen, 9 - safe_seen)


def settle_debt_after_rounds(principal: int, rounds_settled: int,
                             due_after: int = 2) -> tuple[int, bool]:
    if principal < 0 or rounds_settled < 0 or due_after < 1:
        raise RuleViolation("invalid debt state")
    return principal, rounds_settled >= due_after


@dataclass
class Escrow:
    owner: str
    principal: int
    bonus: int = 0
    source: str | None = None
    released: bool = False

    def resolve(self, condition_met: bool, source: str | None = None) -> int:
        if self.released:
            raise RuleViolation("escrow already resolved")
        self.released = True
        if not condition_met:
            return self.principal
        if self.bonus:
            if not source:
                raise RuleViolation("bonus funding source must be explicit")
            self.source = source
        return self.principal + self.bonus


@dataclass
class RewardEvent:
    event_id: str
    options_generation: int = 1
    rerolled: bool = False
    reward_count: int = 1

    def reroll_options(self) -> None:
        if self.rerolled:
            raise RuleViolation("reward options may only be rerolled once")
        self.rerolled = True
        self.options_generation += 1
        # A reroll replaces options; it does not create another reward event.
        self.reward_count = 1


class CrownTracker:
    def __init__(self):
        self._triggered_rounds: set[str] = set()

    def trigger(self, round_id: str, raw_bust: bool) -> int:
        if not round_id:
            raise RuleViolation("round_id must be non-empty")
        if not raw_bust or round_id in self._triggered_rounds:
            return 0
        self._triggered_rounds.add(round_id)
        return 60


class ContractTests(unittest.TestCase):
    def test_unique_event_identity(self):
        ledger = EventLedger()
        ledger.record(Event("r1", "e1", "raw_loss"))
        with self.assertRaisesRegex(RuleViolation, "duplicate event_id"):
            ledger.record(Event("r1", "e1", "derived_reward", True))
        ledger.record(Event("r1", "e2", "derived_reward", True))
        self.assertEqual(len(ledger.events()), 2)

    def test_loss_protection_is_one_explicit_choice(self):
        loss, used = apply_single_loss_protection(
            101, "escape_token", {"escape_token", "fate_seal"})
        self.assertEqual((loss, used), (51, "escape_token"))
        loss, used = apply_single_loss_protection(
            101, None, {"escape_token", "fate_seal"})
        self.assertEqual((loss, used), (101, None))
        with self.assertRaises(RuleViolation):
            apply_single_loss_protection(101, "sealed_envelope",
                                         {"sealed_envelope"})

    def test_integer_rounding_and_crowbar_bonus(self):
        self.assertEqual(floor_ratio(101, 25, 100), 25)
        self.assertEqual(floor_ratio(3, 1, 2), 1)
        self.assertEqual(floor_ratio(0, 25, 100), 0)

    def test_vault_ladder_returns_and_exact_probabilities(self):
        self.assertEqual([gross for _p, gross in VAULT_LADDER],
                         [150, 260, 500, 1200])
        self.assertEqual(vault_ladder_probability_through(1), Fraction(7, 10))
        self.assertEqual(vault_ladder_probability_through(2), Fraction(63, 200))
        self.assertEqual(vault_ladder_probability_through(3), Fraction(63, 800))
        self.assertEqual(vault_ladder_probability_through(4), Fraction(63, 8000))

    def test_minefield_conditional_odds(self):
        self.assertEqual([minefield_next_safe_probability(n) for n in range(6)],
                         [Fraction(2, 3), Fraction(5, 8), Fraction(4, 7),
                          Fraction(3, 6), Fraction(2, 5), Fraction(1, 4)])
        with self.assertRaises(RuleViolation):
            minefield_next_safe_probability(6)

    def test_debt_due_counts_only_settled_rounds(self):
        self.assertEqual(settle_debt_after_rounds(160, 0), (160, False))
        self.assertEqual(settle_debt_after_rounds(160, 1), (160, False))
        self.assertEqual(settle_debt_after_rounds(160, 2), (160, True))
        self.assertEqual(settle_debt_after_rounds(160, 3), (160, True))

    def test_escrow_returns_principal_and_requires_bonus_source(self):
        failed = Escrow("p1", 100, 50)
        self.assertEqual(failed.resolve(False), 100)
        success = Escrow("p1", 100, 50)
        with self.assertRaisesRegex(RuleViolation, "funding source"):
            success.resolve(True)
        # A failed resolution is final; it cannot be replayed to claim the bonus.
        with self.assertRaisesRegex(RuleViolation, "already resolved"):
            success.resolve(True, "system_budget")
        funded = Escrow("p1", 100, 50)
        self.assertEqual(funded.resolve(True, "declared_system_budget"), 150)
        self.assertEqual(funded.source, "declared_system_budget")

    def test_reward_reroll_replaces_options_not_reward_event(self):
        reward = RewardEvent("reward-1")
        reward.reroll_options()
        self.assertEqual((reward.event_id, reward.options_generation,
                          reward.reward_count), ("reward-1", 2, 1))
        with self.assertRaisesRegex(RuleViolation, "only be rerolled once"):
            reward.reroll_options()

    def test_crown_once_per_round_but_can_trigger_in_later_round(self):
        crown = CrownTracker()
        self.assertEqual(crown.trigger("r1", True), 60)
        self.assertEqual(crown.trigger("r1", True), 0)
        self.assertEqual(crown.trigger("r1", False), 0)
        self.assertEqual(crown.trigger("r2", True), 60)

    def test_bad_event_and_debt_inputs_are_rejected(self):
        ledger = EventLedger()
        with self.assertRaises(RuleViolation):
            ledger.record(Event("", "e1", "raw_loss"))
        with self.assertRaises(RuleViolation):
            settle_debt_after_rounds(-1, 2)


if __name__ == "__main__":
    suite = unittest.defaultTestLoader.loadTestsFromTestCase(ContractTests)
    result = unittest.TextTestRunner(verbosity=2).run(suite)
    raise SystemExit(0 if result.wasSuccessful() else 1)
