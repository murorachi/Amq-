"""Design-only stress tests for the Gamble Roguelike risk/quota hypothesis.

This is NOT game implementation. It compares a naive quota-sized contract model
against a revised fixed-stake model to expose dominant strategies and difficulty.
Run with Python 3 standard library only: python3 gamble_roguelike_gate02.py
"""
from random import Random
from statistics import mean, median

SEED = 20261020
RUNS = 100_000
STARTING_BANK = 1000.0
PROFILES = {
    # win probability, gross return multiplier including returned stake
    "safe": (0.75, 1.20),
    "balanced": (0.40, 2.20),
    "jackpot": (0.15, 5.50),
}


def summarize(name, outcomes):
    final_banks, misses, cleared = outcomes
    n = len(final_banks)
    print(
        f"{name}: clear={sum(cleared)/n:.3%}, "
        f"failed={sum(m >= 3 for m in misses)/n:.3%}, "
        f"mean_final={mean(final_banks):.2f}, median_final={median(final_banks):.2f}, "
        f"mean_misses={mean(misses):.4f}"
    )


def naive_exact_math(name, quota_fraction=0.05):
    p, gross = PROFILES[name]
    stake_fraction = quota_fraction / (gross - 1.0)
    expected_net_fraction = p * quota_fraction - (1.0 - p) * stake_fraction
    return stake_fraction, p, expected_net_fraction


def naive_quota_sized(policy, runs=RUNS):
    """Each stage bets only enough to win +5%; miss 3 quotas and the run ends."""
    rng = Random(SEED)
    banks, misses_list, cleared = [], [], []
    for _ in range(runs):
        bank = STARTING_BANK
        misses = 0
        for _stage in range(5):
            p, gross = PROFILES[policy]
            quota = bank * 0.05
            stake = quota / (gross - 1.0)
            if rng.random() < p:
                bank += quota
            else:
                bank -= stake
                misses += 1
                if misses >= 3:
                    break
        banks.append(bank)
        misses_list.append(misses)
        cleared.append(misses < 3)
    return banks, misses_list, cleared


def revised_fixed_stake(policy, use_reroll=False, runs=RUNS):
    """10% stake, fixed quotas; optional once-per-run free reroll is an upper bound."""
    rng = Random(SEED)
    targets = [1020, 1040, 1060, 1080, 1100]
    banks, misses_list, cleared = [], [], []
    for _ in range(runs):
        bank, strain = STARTING_BANK, 0
        reroll_available = use_reroll
        for target in targets:
            gap = max(0.0, target - bank)
            # Safe if its win can meet quota; otherwise balanced if it can; otherwise jackpot.
            # Balanced policy accepts a little more risk when gap exceeds 2% of bank.
            if policy == "always-safe":
                choice = "safe"
            elif policy == "quota-aware":
                choice = "safe" if gap <= 0.02 * bank else ("balanced" if gap <= 0.12 * bank else "jackpot")
            elif policy == "jackpot-when-behind":
                choice = "balanced" if bank >= target else "jackpot"
            else:
                raise ValueError(f"unknown policy: {policy}")
            p, gross = PROFILES[choice]
            stake = 0.10 * bank
            won = rng.random() < p
            if not won and reroll_available:
                reroll_available = False
                won = rng.random() < p
            if won:
                bank += stake * (gross - 1.0)
            else:
                bank -= stake
            if bank + 1e-9 >= target:
                strain = max(0, strain - 1)
            else:
                strain += 1
            if strain >= 3:
                break
        banks.append(bank)
        misses_list.append(strain)
        cleared.append(strain < 3 and bank >= targets[-1])
    return banks, misses_list, cleared


def main():
    print(f"seed={SEED} runs={RUNS} starting_bank={STARTING_BANK:.0f}")
    print("All outcomes are simulated locally with Python's seeded PRNG; this is design simulation, not production RNG.")
    print("\nMODEL A: intentionally naive quota-sized bet")
    print("5 stages; each contract stakes the minimum amount to gain +5% if it wins; 3 misses end the run.")
    for name in PROFILES:
        stake, p, ev = naive_exact_math(name)
        print(f"{name}: win={p:.0%}, stake={stake:.4%} of bank, expected net={ev:.4%} of bank")
    for name in PROFILES:
        summarize(name, naive_quota_sized(name))

    print("\nMODEL B: fixed-stake stress test")
    print("10% bankroll stake; absolute stage targets 1020/1040/1060/1080/1100; pass removes one strain, miss adds one; 3 strain ends run.")
    for policy in ("always-safe", "quota-aware", "jackpot-when-behind"):
        summarize(policy + " / no item", revised_fixed_stake(policy, use_reroll=False))
        summarize(policy + " / one free reroll", revised_fixed_stake(policy, use_reroll=True))
    print("\nInterpretation: Model A exposes a dominant survival strategy; Model B is a difficulty probe, not fun validation.")
    print("The free-reroll variant is an upper bound: no payout penalty is applied, so it must not be treated as final balance.")


if __name__ == "__main__":
    main()
