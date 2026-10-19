"""Gate 11 sensitivity test for item strengths and recovery fees.
Standard library only; 30,000 runs per configuration/strategy.
"""
from random import Random
from statistics import mean

SEED = 20262020
RUNS = 30_000
EVENTS = ("risk", "vault", "signal", "risk", "vault")
PROFILES = {"safe": (3, 4, 4, 3), "balanced": (2, 5, 5, 2), "jackpot": (3, 20, 20, 3)}
STRATEGIES = ("conservative", "balanced", "push")
CONFIGS = {
    "baseline": ((), 0, 0, 15, 8, False),
    "insurance_5": (("insurance",), 5, 30, 15, 8, False),
    "insurance_10": (("insurance",), 10, 30, 15, 8, False),
    "insurance_15": (("insurance",), 15, 30, 15, 8, False),
    "harness_10": (("vault_harness",), 40, 10, 15, 8, False),
    "harness_20": (("vault_harness",), 40, 20, 15, 8, False),
    "harness_30": (("vault_harness",), 40, 30, 15, 8, False),
    "recovery_8": ((), 40, 30, 8, 8, True),
    "recovery_12": ((), 40, 30, 12, 8, True),
    "recovery_15": ((), 40, 30, 15, 8, True),
    "insurance10_harness20": (("insurance", "vault_harness"), 10, 20, 15, 8, False),
    "insurance10_voucher8": (("insurance", "recovery_voucher"), 10, 30, 15, 8, True),
    "harness20_voucher8": (("vault_harness", "recovery_voucher"), 40, 20, 15, 8, True),
}


def payout(stake, profile):
    _, _, numerator, denominator = PROFILES[profile]
    return stake * numerator // denominator


def win(rng, profile):
    numerator, denominator, _, _ = PROFILES[profile]
    return rng.randrange(denominator) < numerator


def simulate(strategy, config, runs=RUNS):
    items, insurance_pct, harness_pct, recovery_fee, voucher_fee, recovery_enabled = CONFIGS[config]
    rng = Random(SEED)
    records = []
    for _ in range(runs):
        bank, strain, recovery_available = 1000, 0, True
        inventory = list(items)
        stages = 0
        for stage, event in enumerate(EVENTS, start=1):
            stages += 1
            target = bank + (bank + 99) // 100

            if strain >= 2 and recovery_available and recovery_enabled:
                if strategy == "conservative":
                    recover = True
                elif strategy == "balanced":
                    recover = bank >= 850
                else:
                    recover = False
                if recover:
                    rate = voucher_fee if "recovery_voucher" in inventory else recovery_fee
                    bank -= (bank * rate + 99) // 100
                    strain -= 1
                    recovery_available = False
                    if "recovery_voucher" in inventory:
                        inventory.remove("recovery_voucher")

            fraction = {"conservative": 5, "balanced": 10, "push": 15}[strategy]
            stake = max(10, bank * fraction // 100)
            attached = None
            if "insurance" in inventory:
                attached = "insurance"
                inventory.remove("insurance")

            if event == "risk":
                profile = {"conservative": "safe", "balanced": "balanced", "push": "jackpot"}[strategy]
                won = win(rng, profile)
                delta = payout(stake, profile) - stake if won else -stake
                if not won and attached == "insurance":
                    delta += stake * insurance_pct // 100

            elif event == "vault":
                if rng.randrange(10) >= 8:
                    delta = -stake
                elif strategy == "conservative":
                    delta = stake * 5 // 4 - stake
                else:
                    harness = False
                    if attached is None and "vault_harness" in inventory:
                        harness = True
                        inventory.remove("vault_harness")
                    if rng.randrange(10) >= 7:
                        delta = -(stake - (stake * harness_pct // 100 if harness else 0))
                    elif strategy == "balanced":
                        delta = stake * 18 // 10 - stake
                    elif rng.randrange(10) >= 6:
                        delta = -(stake - (stake * harness_pct // 100 if harness else 0))
                    else:
                        delta = stake * 3 - stake
                if delta < 0 and attached == "insurance":
                    delta += stake * insurance_pct // 100

            else:
                clues = {"conservative": 2, "balanced": 1, "push": 0}[strategy]
                fee1 = (stake * 2 + 99) // 100
                fee2 = (stake * 4 + 99) // 100
                if attached is None and clues > 0 and "signal_coupon" in inventory:
                    attached = "signal_coupon"
                    inventory.remove("signal_coupon")
                fee = 0 if attached == "signal_coupon" or clues == 0 else fee1 + (fee2 if clues == 2 else 0)
                gross = {0: stake * 3, 1: stake * 2, 2: stake * 4 // 3}[clues]
                numerator, denominator = {0: (1, 3), 1: (1, 2), 2: (3, 4)}[clues]
                won = rng.randrange(denominator) < numerator
                delta = gross - stake - fee if won else -stake - fee
                if not won and attached == "insurance":
                    delta += stake * insurance_pct // 100

            bank += delta
            strain = max(0, strain - 1) if bank >= target else strain + 1
            if strain >= 3:
                break
        records.append((bank, strain, stages))

    return {
        "clear": sum(1 for bank, strain, stages in records if stages == 5 and bank >= 1050 and strain < 3) / runs,
        "failed": sum(1 for _, strain, _ in records if strain >= 3) / runs,
        "mean_bank": mean(bank for bank, _, _ in records),
    }


def main():
    print(f"seed={SEED}; runs/configuration/strategy={RUNS}; starting bank=1000; goal=1050")
    for config in CONFIGS:
        print(f"\n{config}")
        for strategy in STRATEGIES:
            r = simulate(strategy, config)
            print(f"{strategy}: clear={r['clear']:.3%}; strain_failure={r['failed']:.3%}; mean_bank={r['mean_bank']:.2f}")
    print("These are upper-bound item tests with items present from stage 1, not draft-time predictions.")


if __name__ == "__main__":
    main()
