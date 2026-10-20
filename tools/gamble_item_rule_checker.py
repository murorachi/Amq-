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


def ceil_div(numerator: int, denominator: int) -> int:
    if numerator < 0 or denominator <= 0:
        raise RuleViolation("invalid ceiling-division inputs")
    return (numerator + denominator - 1) // denominator


@dataclass
class DebtAccount:
    amount: int
    rounds_remaining: int = 2
    extension_used: bool = False
    active: bool = True

    def __post_init__(self):
        if self.amount < 0 or self.rounds_remaining < 0:
            raise RuleViolation("invalid debt account")

    def settle_game(self) -> bool:
        """Count a completed game settlement; return whether debt is now due."""
        if not self.active:
            return False
        if self.rounds_remaining > 0:
            self.rounds_remaining -= 1
        return self.rounds_remaining == 0

    def resolve_due(self, chips: int, choice: str, die: int | None = None):
        """Return (chips_after, curse_added, debt_amount_remaining)."""
        if chips < 0:
            raise RuleViolation("chips cannot be negative")
        if not self.active or self.rounds_remaining != 0:
            raise RuleViolation("debt is not due")
        if choice == "repay":
            if chips < self.amount:
                raise RuleViolation("insufficient chips for full repayment")
            chips -= self.amount
            self.amount = 0
            self.active = False
            return chips, False, 0
        if choice == "extend":
            if self.extension_used:
                raise RuleViolation("extension already used")
            if die not in range(1, 7):
                raise RuleViolation("extension requires a d6 result from 1 to 6")
            self.extension_used = True
            if die <= 3:
                self.amount = ceil_div(self.amount * 3, 2)
            elif die <= 5:
                self.amount = ceil_div(self.amount, 2)
            else:
                self.amount = 0
                self.active = False
            return chips, False, self.amount
        if choice == "default":
            if chips >= self.amount:
                raise RuleViolation("default is only valid when chips are insufficient")
            unpaid = self.amount - chips
            chips_paid = chips
            self.amount = 0
            self.active = False
            return chips_paid, unpaid > 0, 0
        raise RuleViolation("unknown debt resolution choice")

    def end_run(self) -> None:
        """Debt cannot carry into a new run."""
        self.amount = 0
        self.active = False


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
        if condition_met and self.bonus and not source:
            raise RuleViolation("bonus funding source must be explicit")
        self.released = True
        if not condition_met:
            return self.principal
        if self.bonus:
            self.source = source
        return self.principal + self.bonus


class EscrowLedger:
    def __init__(self):
        self._escrows: dict[str, Escrow] = {}
        self._principal_deposited = 0
        self._principal_returned = 0
        self._bonus_paid = 0

    def deposit(self, escrow_id: str, escrow: Escrow) -> None:
        if not escrow_id:
            raise RuleViolation("escrow_id must be non-empty")
        if escrow_id in self._escrows:
            raise RuleViolation(f"duplicate escrow_id: {escrow_id}")
        if escrow.principal < 0 or escrow.bonus < 0:
            raise RuleViolation("escrow amounts cannot be negative")
        self._escrows[escrow_id] = escrow
        self._principal_deposited += escrow.principal

    def resolve(self, escrow_id: str, condition_met: bool,
                source: str | None = None) -> int:
        if escrow_id not in self._escrows:
            raise RuleViolation("unknown escrow_id")
        escrow = self._escrows[escrow_id]
        payout = escrow.resolve(condition_met, source)
        self._principal_returned += escrow.principal
        self._bonus_paid += payout - escrow.principal
        return payout

    @property
    def principal_in_escrow(self) -> int:
        return sum(e.principal for e in self._escrows.values() if not e.released)

    @property
    def principal_returned(self) -> int:
        return self._principal_returned

    @property
    def bonus_paid(self) -> int:
        return self._bonus_paid

    def assert_principal_conserved(self) -> None:
        if self.principal_in_escrow + self._principal_returned != self._principal_deposited:
            raise RuleViolation("escrow principal is not conserved")


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

    def test_debt_collector_due_date_repayment_and_run_end(self):
        debt = DebtAccount(160)
        self.assertFalse(debt.settle_game())
        self.assertTrue(debt.settle_game())
        self.assertEqual(debt.resolve_due(200, "repay"), (40, False, 0))
        self.assertFalse(debt.active)

        abandoned = DebtAccount(360)
        abandoned.end_run()
        self.assertEqual((abandoned.amount, abandoned.active), (0, False))

    def test_debt_extension_outcomes_rounding_and_single_use(self):
        increased = DebtAccount(161, rounds_remaining=0)
        self.assertEqual(increased.resolve_due(0, "extend", 1), (0, False, 242))
        with self.assertRaisesRegex(RuleViolation, "extension already used"):
            increased.resolve_due(0, "extend", 4)

        halved = DebtAccount(161, rounds_remaining=0)
        self.assertEqual(halved.resolve_due(0, "extend", 4), (0, False, 81))
        cleared = DebtAccount(360, rounds_remaining=0)
        self.assertEqual(cleared.resolve_due(0, "extend", 6), (0, False, 0))
        self.assertFalse(cleared.active)

    def test_debt_default_pays_available_chips_and_adds_one_curse(self):
        debt = DebtAccount(160, rounds_remaining=0)
        self.assertEqual(debt.resolve_due(70, "default"), (70, True, 0))
        self.assertFalse(debt.active)
        with self.assertRaisesRegex(RuleViolation, "insufficient chips"):
            DebtAccount(160, rounds_remaining=0).resolve_due(70, "repay")
        with self.assertRaisesRegex(RuleViolation, "only valid when chips are insufficient"):
            DebtAccount(100, rounds_remaining=0).resolve_due(120, "default")

    def test_escrow_ledger_conserves_principal_and_prevents_duplicate_claims(self):
        ledger = EscrowLedger()
        ledger.deposit("e1", Escrow("p1", 100, 50))
        ledger.deposit("e2", Escrow("p2", 75, 0))
        ledger.assert_principal_conserved()
        self.assertEqual(ledger.principal_in_escrow, 175)
        self.assertEqual(ledger.resolve("e1", False), 100)
        ledger.assert_principal_conserved()
        self.assertEqual((ledger.principal_in_escrow, ledger.principal_returned), (75, 100))
        self.assertEqual(ledger.resolve("e2", True), 75)
        ledger.assert_principal_conserved()
        self.assertEqual((ledger.principal_in_escrow, ledger.principal_returned), (0, 175))
        self.assertEqual(ledger.bonus_paid, 0)
        with self.assertRaisesRegex(RuleViolation, "already resolved"):
            ledger.resolve("e1", True, "system_budget")
        with self.assertRaisesRegex(RuleViolation, "duplicate escrow_id"):
            ledger.deposit("e2", Escrow("p3", 10))

    def test_escrow_returns_principal_and_requires_bonus_source(self):
        failed = Escrow("p1", 100, 50)
        self.assertEqual(failed.resolve(False), 100)
        success = Escrow("p1", 100, 50)
        with self.assertRaisesRegex(RuleViolation, "funding source"):
            success.resolve(True)
        # Invalid funding metadata must not consume the escrow state.
        self.assertFalse(success.released)
        self.assertEqual(success.resolve(True, "declared_system_budget"), 150)
        self.assertEqual(success.source, "declared_system_budget")
        with self.assertRaisesRegex(RuleViolation, "already resolved"):
            success.resolve(True, "duplicate_claim")

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
