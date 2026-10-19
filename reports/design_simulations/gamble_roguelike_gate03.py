"""Design-only simulation for Gamble Roguelike Design Gate 03.

Standard library only. Not production game code or production RNG.
Run: python3 gamble_roguelike_gate03.py
"""
from random import Random
from statistics import mean, median

SEED = 20261020
RUNS = 100_000
STARTING_BANK = 1000.0
# Exact-fair gross multipliers before any explicit fee or integer-chip rounding.
PROFILES = {
    "safe": (0.75, 4.0 / 3.0),
    "balanced": (0.40, 2.50),
    "jackpot": (0.15, 20.0 / 3.0),
}
TARGETS = [1020, 1040, 1060, 1080, 1100]


def summarize(label, banks, strain, cleared):
    n = len(banks)
    print(
        f"{label}: clear={sum(cleared)/n:.3%}, "
        f"failed={sum(s >= 3 for s in strain)/n:.3%}, "
        f"mean_final={mean(banks):.2f}, median_final={median(banks):.2f}, "
        f"mean_strain={mean(strain):.4f}"
    )


def choose_profile(policy, gap, bank):
    safe_gain = 0.10 * bank * (PROFILES["safe"][1] - 1.0)
    balanced_gain = 0.10 * bank * (PROFILES["balanced"][1] - 1.0)
    if policy == "always-safe":
        return "safe"
    if policy == "quota-aware":
        return "safe" if gap <= safe_gain else ("balanced" if gap <= balanced_gain else "jackpot")
    if policy == "jackpot-when-behind":
        return "balanced" if gap <= 0 else "jackpot"
    raise ValueError(policy)


def simulate_one_shared_wager(policy, reroll="none", runs=RUNS):
    rng = Random(SEED)
    banks, strains, cleared = [], [], []
    for _ in range(runs):
        bank, strain = STARTING_BANK, 0
        reroll_available = reroll != "none"
        for target in TARGETS:
            gap = max(0.0, target - bank)
            choice = choose_profile(policy, gap, bank)
            p, gross = PROFILES[choice]
            stake = 0.10 * bank
            won = rng.random() < p
            rerolled = False
            if not won and reroll_available:
                reroll_available = False
                rerolled = True
                won = rng.random() < p
            if won:
                effective_gross = gross * (0.90 if rerolled and reroll == "nerfed" else 1.0)
                bank += stake * (effective_gross - 1.0)
            else:
                bank -= stake
            strain = max(0, strain - 1) if bank >= target else strain + 1
            if strain >= 3:
                break
        banks.append(bank)
        strains.append(strain)
        cleared.append(strain < 3 and bank >= TARGETS[-1])
    return banks, strains, cleared


def simulate_individual_shared_bank_bets(players, policy, aggregate_cap=None, reroll="none", runs=RUNS):
    """All players bet simultaneously from the same bank; compare exposure policies.

    aggregate_cap=None gives each player a 10%-of-bank stake (total exposure 20/30/60%).
    aggregate_cap=0.20 caps the whole round at 20% of bank and splits stake equally.
    This model is intentionally diagnostic; it is not the recommended final economy.
    """
    rng = Random(SEED + players)
    banks, strains, cleared = [], [], []
    for _ in range(runs):
        bank, strain = STARTING_BANK, 0
        reroll_available = reroll != "none"
        for target in TARGETS:
            gap = max(0.0, target - bank)
            stake_fraction = 0.10 if aggregate_cap is None else min(0.10, aggregate_cap / players)
            safe_gain = players * stake_fraction * (PROFILES["safe"][1] - 1.0) * bank
            balanced_gain = players * stake_fraction * (PROFILES["balanced"][1] - 1.0) * bank
            changes = []
            for i in range(players):
                if policy == "all-safe":
                    choice = "safe"
                elif policy == "mixed":
                    choice = ("safe", "balanced", "jackpot")[i % 3]
                elif policy == "quota-aware":
                    choice = "safe" if gap <= safe_gain else ("balanced" if gap <= balanced_gain else "jackpot")
                else:
                    raise ValueError(policy)
                p, gross = PROFILES[choice]
                won = rng.random() < p
                rerolled = False
                if not won and reroll_available:
                    reroll_available = False
                    rerolled = True
                    won = rng.random() < p
                stake = stake_fraction * bank
                if won:
                    effective_gross = gross * (0.90 if rerolled and reroll == "nerfed" else 1.0)
                    changes.append(stake * (effective_gross - 1.0))
                else:
                    changes.append(-stake)
            bank += sum(changes)
            strain = max(0, strain - 1) if bank >= target else strain + 1
            if strain >= 3:
                break
        banks.append(bank)
        strains.append(strain)
        cleared.append(strain < 3 and bank >= TARGETS[-1])
    return banks, strains, cleared


def main():
    print(f"seed={SEED} runs={RUNS} starting_bank={STARTING_BANK:.0f}")
    print("Targets: 1020/1040/1060/1080/1100; 10% stake; 3 strain ends run.")
    print("\nExact expected value before rounding/fees:")
    for name, (p, gross) in PROFILES.items():
        print(f"{name}: p={p:.0%}, gross={gross:.6f}x, expected gross={p*gross:.6f}x, expected net={(p*gross-1):+.6%} of stake")

    print("\nMODEL 1: one shared wager per stage")
    for policy in ("always-safe", "quota-aware", "jackpot-when-behind"):
        for reroll in ("none", "free", "nerfed"):
            summarize(f"{policy}/{reroll}", *simulate_one_shared_wager(policy, reroll))

    print("\nMODEL 2: each player places a separate wager against the shared bank")
    for players in (2, 3, 6):
        for policy in ("all-safe", "quota-aware", "mixed"):
            summarize(f"{players}p/{policy}/10% each", *simulate_individual_shared_bank_bets(players, policy))
            summarize(f"{players}p/{policy}/20% aggregate cap", *simulate_individual_shared_bank_bets(players, policy, aggregate_cap=0.20, reroll="nerfed"))

    print("\nInterpretation: these runs compare quota/economy structures only; they do not measure fun or social behavior.")


if __name__ == "__main__":
    main()
