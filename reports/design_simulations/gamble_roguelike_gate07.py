"""Design-only Gate 07 recovery stress test.
Run: python3 reports/design_simulations/gamble_roguelike_gate07.py
"""
from random import Random
from statistics import mean, median

SEED = 20261020
RUNS = 100_000
TARGETS = (1020, 1040, 1060, 1080, 1100)
# Integer roll out of 20 avoids floating-point probability comparisons.
PROFILES = {
    "safe": (15, 20, 4, 3),       # 75%; gross multiplier 4/3
    "balanced": (8, 20, 5, 2),    # 40%; gross multiplier 5/2
    "jackpot": (3, 20, 20, 3),    # 15%; gross multiplier 20/3
}


def payout(stake, profile):
    _, _, numerator, denominator = PROFILES[profile]
    return stake * numerator // denominator


def choose_profile(bank, target, stake):
    gap = max(0, target - bank)
    safe_gain = payout(stake, "safe") - stake
    balanced_gain = payout(stake, "balanced") - stake
    if gap <= safe_gain:
        return "safe"
    if gap <= balanced_gain:
        return "balanced"
    return "jackpot"


def wins(rng, profile):
    win_slots, denominator, _, _ = PROFILES[profile]
    return rng.randrange(denominator) < win_slots


def simulate(recovery_policy, runs=RUNS):
    """Recovery is one-use/run. Fee is ceil(15% of current bank).

    policy: never, always, or bank_at_least_1000. This is a stress test,
    not a recommended policy; no item rewards or event-specific choices are modeled.
    """
    rng = Random(SEED)
    records = []
    recovery_uses = 0
    for _ in range(runs):
        bank, strain, recovery_available = 1000, 0, True
        stages = 0
        for target in TARGETS:
            stages += 1
            if strain >= 2 and recovery_available:
                should_recover = (
                    recovery_policy == "always"
                    or (recovery_policy == "bank_at_least_1000" and bank >= 1000)
                )
                if should_recover:
                    fee = (bank * 15 + 99) // 100
                    bank -= fee
                    strain -= 1
                    recovery_available = False
                    recovery_uses += 1
            stake = max(10, bank // 10)
            profile = choose_profile(bank, target, stake)
            if wins(rng, profile):
                bank += payout(stake, profile) - stake
            else:
                bank -= stake
            strain = max(0, strain - 1) if bank >= target else strain + 1
            if strain >= 3:
                break
        records.append((bank, strain, stages))
    return {
        "clear": sum(1 for b, s, n in records if n == 5 and b >= TARGETS[-1] and s < 3) / runs,
        "failed": sum(1 for _, s, _ in records if s >= 3) / runs,
        "mean_bank": mean(b for b, _, _ in records),
        "median_bank": median(b for b, _, _ in records),
        "mean_stages": mean(n for _, _, n in records),
        "recovery_use_rate": recovery_uses / runs,
    }


def main():
    print(f"seed={SEED}; runs/configuration={RUNS}; starting bank=1000; targets={TARGETS}")
    print("One recovery per run at strain >= 2; pay ceil(15% bank), clear one strain.")
    print("No item reward/event selection is modeled; recovery results are optimistic/incomplete.")
    for policy in ("never", "always", "bank_at_least_1000"):
        result = simulate(policy)
        print(
            f"{policy}: clear={result['clear']:.3%}; failed={result['failed']:.3%}; "
            f"mean_bank={result['mean_bank']:.2f}; median_bank={result['median_bank']:.2f}; "
            f"mean_stages={result['mean_stages']:.4f}; recovery_use={result['recovery_use_rate']:.3%}"
        )


if __name__ == "__main__":
    main()
