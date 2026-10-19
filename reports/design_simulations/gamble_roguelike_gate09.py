"""Gate 09 baseline strategy/target sensitivity simulation.
This intentionally excludes items and recovery to isolate the core wager choices.
Run: python3 reports/design_simulations/gamble_roguelike_gate09.py
"""
from random import Random
from statistics import mean, median

SEED = 20261020
RUNS = 100_000
EVENTS = ("risk", "vault", "signal", "risk", "vault")
PROFILES = {
    # tier: win slots, denominator, gross multiplier numerator/denominator, stake % of bank
    "bank": (15, 20, 4, 3, 5),       # 75%, 4/3x, 5% stake
    "balanced": (8, 20, 5, 2, 10),   # 40%, 2.5x, 10% stake
    "push": (3, 20, 20, 3, 15),      # 15%, 20/3x, 15% stake
}


def payout(stake, tier):
    _, _, numerator, denominator, _ = PROFILES[tier]
    return stake * numerator // denominator


def wager_stake(bank, tier):
    percent = PROFILES[tier][4]
    return max(10, bank * percent // 100)


def win(rng, tier):
    slots, denominator, _, _, _ = PROFILES[tier]
    return rng.randrange(denominator) < slots


def simulate(strategy, starting_bank=1000, final_ratio=1.05, runs=RUNS):
    rng = Random(SEED + starting_bank)
    records = []
    for _ in range(runs):
        bank, strain = starting_bank, 0
        stages = 0
        for event in EVENTS:
            stages += 1
            target = bank + (bank + 99) // 100  # ceil 1% of the stage-start bank
            tier = {"conservative": "bank", "balanced": "balanced", "push": "push"}[strategy]
            stake = wager_stake(bank, tier)

            if event == "risk":
                won = win(rng, tier)
                delta = payout(stake, tier) - stake if won else -stake

            elif event == "vault":
                # All tiers face the same 80% first-step success.
                if rng.randrange(10) >= 8:
                    delta = -stake
                elif strategy == "conservative":
                    delta = stake * 5 // 4 - stake  # cash out at 1.25x
                elif strategy == "balanced":
                    if rng.randrange(10) >= 7:  # step 2 fails: 30%
                        delta = -stake
                    else:
                        delta = stake * 18 // 10 - stake  # cash out at 1.8x
                else:
                    if rng.randrange(10) >= 7:  # step 2 fails: 30%
                        delta = -stake
                    elif rng.randrange(10) >= 6:  # step 3 fails: 40%
                        delta = -stake
                    else:
                        delta = stake * 3 - stake  # cash out at 3x

            else:  # Signal Room
                clues = {"conservative": 2, "balanced": 1, "push": 0}[strategy]
                fee1 = (stake * 2 + 99) // 100
                fee2 = (stake * 4 + 99) // 100
                fee = 0 if clues == 0 else fee1 + (fee2 if clues == 2 else 0)
                gross = {0: stake * 3, 1: stake * 2, 2: stake * 4 // 3}[clues]
                numerator, denominator = {0: (1, 3), 1: (1, 2), 2: (3, 4)}[clues]
                won = rng.randrange(denominator) < numerator
                delta = gross - stake - fee if won else -stake - fee

            bank += delta
            strain = max(0, strain - 1) if bank >= target else strain + 1
            if strain >= 3:
                break
        records.append((bank, strain, stages))

    final_target = int(starting_bank * final_ratio)
    return {
        "clear": sum(1 for bank, strain, stages in records if stages == 5 and bank >= final_target and strain < 3) / runs,
        "failed": sum(1 for _, strain, _ in records if strain >= 3) / runs,
        "mean_bank": mean(bank for bank, _, _ in records),
        "median_bank": median(bank for bank, _, _ in records),
        "mean_stages": mean(stages for _, _, stages in records),
    }


def main():
    print(f"seed={SEED}; runs/configuration={RUNS}; event order={EVENTS}")
    print("Each stage target is the stage-start bank + ceil(1%). No items/recovery in this baseline.")
    print("\nStarting-bank sensitivity; final target = 105% of starting bank")
    for starting_bank in (750, 1000, 1500):
        for strategy in ("conservative", "balanced", "push"):
            r = simulate(strategy, starting_bank=starting_bank, final_ratio=1.05)
            print(
                f"start={starting_bank}/{strategy}: clear={r['clear']:.3%}; failure={r['failed']:.3%}; "
                f"mean_bank={r['mean_bank']:.2f}; median={r['median_bank']:.2f}; stages={r['mean_stages']:.4f}"
            )
    print("\nFinal-target sensitivity at starting bank 1000")
    for ratio in (1.00, 1.05, 1.10, 1.20, 1.50):
        values = [simulate(s, final_ratio=ratio)["clear"] for s in ("conservative", "balanced", "push")]
        print(f"goal={ratio:.0%} of start: conservative={values[0]:.3%}; balanced={values[1]:.3%}; push={values[2]:.3%}")
    print("This is a base-economy stress test, not a human playtest or proof of enjoyment.")


if __name__ == "__main__":
    main()
