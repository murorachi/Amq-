"""Design-only Gate 06 stress test for integer payouts and item dominance.
Run: python3 reports/design_simulations/gamble_roguelike_gate06.py
"""
from fractions import Fraction
from random import Random
from statistics import mean, median

SEED = 20261020
RUNS = 100_000
TARGETS = (1020, 1040, 1060, 1080, 1100)
PROFILES = {
    "safe": (Fraction(3, 4), Fraction(4, 3)),
    "balanced": (Fraction(2, 5), Fraction(5, 2)),
    "jackpot": (Fraction(3, 20), Fraction(20, 3)),
}


def gross_payout(stake, profile):
    multiplier = PROFILES[profile][1]
    return stake * multiplier.numerator // multiplier.denominator


def choose_profile(policy, bank, target, stake):
    gap = max(0, target - bank)
    safe_gain = gross_payout(stake, "safe") - stake
    balanced_gain = gross_payout(stake, "balanced") - stake
    if policy == "always-safe":
        return "safe"
    if policy == "quota-aware":
        if gap <= safe_gain:
            return "safe"
        if gap <= balanced_gain:
            return "balanced"
        return "jackpot"
    if policy == "balanced-default":
        return "balanced"
    if policy == "jackpot-when-behind":
        return "balanced" if gap == 0 else "jackpot"
    raise ValueError(policy)


def roll_win(rng, profile):
    probability = PROFILES[profile][0]
    return rng.randrange(probability.denominator) < probability.numerator


def simulate(policy, item="none", players=2, runs=RUNS):
    """Single shared wager/stage; retry and insurance are candidate items only."""
    rng = Random(SEED + players)
    records = []
    for _ in range(runs):
        bank, strain = 1000, 0
        retry_available = item in ("retry_50", "retry_70")
        insurance_available = item == "insurance"
        for target in TARGETS:
            stake = max(10, bank // 10)
            profile = choose_profile(policy, bank, target, stake)
            won = roll_win(rng, profile)
            retried = False
            if not won and retry_available:
                retry_available = False
                retried = True
                won = roll_win(rng, profile)
            if won:
                net = gross_payout(stake, profile) - stake
                if retried:
                    penalty = 50 if item == "retry_50" else 70
                    net -= stake * penalty // 100
                bank += net
            else:
                loss = stake
                if insurance_available:
                    insurance_available = False
                    loss -= stake * 40 // 100
                bank -= loss
            strain = max(0, strain - 1) if bank >= target else strain + 1
            if strain >= 3:
                break
        records.append((bank, strain))
    return {
        "clear": sum(1 for bank, strain in records if strain < 3 and bank >= TARGETS[-1]) / runs,
        "failed": sum(1 for _, strain in records if strain >= 3) / runs,
        "mean_bank": mean(bank for bank, _ in records),
        "median_bank": median(bank for bank, _ in records),
    }


def main():
    print(f"seed={SEED}; runs/configuration={RUNS}; starting bank=1000; targets={TARGETS}")
    print("Payout = floor(stake * exact rational gross multiplier), including returned stake.")
    print("Expected net chips per contract after integer rounding:")
    for stake in (10, 20, 50, 100, 1000):
        parts = []
        for name, (probability, _) in PROFILES.items():
            payout = gross_payout(stake, name)
            ev = probability * (payout - stake) + (1 - probability) * (-stake)
            parts.append(f"{name}: payout={payout}, EV={float(ev):+.4f}")
        print(f"stake={stake}: " + "; ".join(parts))
    print("\nPolicy/item matrix: clear rate, failed-run rate, mean and median final bank")
    for policy in ("always-safe", "quota-aware", "balanced-default", "jackpot-when-behind"):
        for item in ("none", "retry_50", "retry_70", "insurance"):
            result = simulate(policy, item)
            print(
                f"{policy}/{item}: clear={result['clear']:.3%}; failed={result['failed']:.3%}; "
                f"mean={result['mean_bank']:.2f}; median={result['median_bank']:.2f}"
            )
    print("\nLimits: only Risk Contract and simplified strain are simulated; no human behavior,")
    print("Signal Room fees, item acquisition opportunity cost, or complete run-state are modeled.")


if __name__ == "__main__":
    main()
