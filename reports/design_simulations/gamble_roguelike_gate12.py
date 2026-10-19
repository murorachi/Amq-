"""Gate 12 integrated item/recovery simulation using current rulebook candidate.
50,000 runs per mode/strategy; standard library only.
"""
from random import Random
from statistics import mean, median

SEED = 20262020
RUNS = 50_000
EVENTS = ("risk", "vault", "signal", "risk", "vault")
PROFILES = {"safe": (3, 4, 4, 3), "balanced": (2, 5, 5, 2), "jackpot": (3, 20, 20, 3)}
ITEMS = ("insurance", "signal_coupon", "vault_harness", "recovery_voucher")
RANKING = {
    "conservative": ("insurance", "signal_coupon", "recovery_voucher", "vault_harness"),
    "balanced": ("recovery_voucher", "insurance", "signal_coupon", "vault_harness"),
    "push": ("vault_harness", "insurance", "recovery_voucher", "signal_coupon"),
}


def payout(stake, profile):
    _, _, numerator, denominator = PROFILES[profile]
    return stake * numerator // denominator


def win(rng, profile):
    numerator, denominator, _, _ = PROFILES[profile]
    return rng.randrange(denominator) < numerator


def simulate(strategy, mode, runs=RUNS):
    rng = Random(SEED)
    records = []
    recovery_enabled = mode in ("recovery", "full")
    draft_enabled = mode in ("draft", "full")
    for _ in range(runs):
        bank, strain, recovery_available = 1000, 0, True
        inventory = []
        stages = 0
        for stage, event in enumerate(EVENTS, start=1):
            stages += 1
            if strain >= 2 and recovery_available and recovery_enabled:
                if strategy == "conservative":
                    recover = True
                elif strategy == "balanced":
                    recover = bank >= 850
                else:
                    recover = False
                if recover:
                    rate = 8 if "recovery_voucher" in inventory else 12
                    bank -= (bank * rate + 99) // 100
                    strain -= 1
                    recovery_available = False
                    if "recovery_voucher" in inventory:
                        inventory.remove("recovery_voucher")
                    if inventory:
                        weakest = max(inventory, key=lambda item: RANKING[strategy].index(item))
                        inventory.remove(weakest)

            # Recovery settles before the stage target is calculated.
            target = bank + (bank + 99) // 100
            tier = {"conservative": "safe", "balanced": "balanced", "push": "jackpot"}[strategy]
            fraction = {"conservative": 5, "balanced": 10, "push": 15}[strategy]
            stake = max(10, bank * fraction // 100)
            attached = None

            # Insurance only works on Bank/Balanced, and consumes on use even if the wager wins.
            if tier != "jackpot" and "insurance" in inventory:
                attached = "insurance"
                inventory.remove("insurance")

            if event == "risk":
                won = win(rng, tier)
                delta = payout(stake, tier) - stake if won else -stake
                if not won and attached == "insurance":
                    delta += stake * 10 // 100

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
                        delta = -(stake - (stake * 20 // 100 if harness else 0))
                    elif strategy == "balanced":
                        delta = stake * 18 // 10 - stake
                    elif rng.randrange(10) >= 6:
                        delta = -(stake - (stake * 20 // 100 if harness else 0))
                    else:
                        delta = stake * 3 - stake
                if delta < 0 and attached == "insurance":
                    delta += stake * 10 // 100

            else:  # Signal Room
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
                    delta += stake * 10 // 100

            bank += delta
            strain = max(0, strain - 1) if bank >= target else strain + 1
            if strain >= 3:
                break

            if draft_enabled and stage in (2, 4) and bank >= target:
                available = [item for item in ITEMS if item not in inventory]
                rng.shuffle(available)
                offer = available[:3]
                chosen = next((item for item in RANKING[strategy] if item in offer), offer[0])
                if len(inventory) < 2:
                    inventory.append(chosen)
                else:
                    weakest = max(inventory, key=lambda item: RANKING[strategy].index(item))
                    if RANKING[strategy].index(chosen) < RANKING[strategy].index(weakest):
                        inventory.remove(weakest)
                        inventory.append(chosen)

        records.append((bank, strain, stages))

    return {
        "clear": sum(1 for bank, strain, stages in records if stages == 5 and bank >= 1050 and strain < 3) / runs,
        "failed": sum(1 for _, strain, _ in records if strain >= 3) / runs,
        "mean_bank": mean(bank for bank, _, _ in records),
        "median_bank": median(bank for bank, _, _ in records),
        "mean_stages": mean(stages for _, _, stages in records),
    }


def main():
    print(f"seed={SEED}; runs/mode/strategy={RUNS}; starting bank=1000; final goal=1050")
    print("Stage target is calculated after recovery settlement. Recovery fee=12%, voucher=8%.")
    print("Insurance: 10% refund, Bank/Balanced only. Vault Harness: 20% refund on continued-step loss.")
    for mode in ("baseline", "recovery", "draft", "full"):
        print(f"\nMODE {mode}")
        for strategy in ("conservative", "balanced", "push"):
            result = simulate(strategy, mode)
            print(
                f"{strategy}: clear={result['clear']:.3%}; strain_failure={result['failed']:.3%}; "
                f"mean_bank={result['mean_bank']:.2f}; median={result['median_bank']:.2f}; "
                f"mean_stages={result['mean_stages']:.4f}"
            )
    print("Limits: shared inventory and fixed rankings; no personal ownership, human voting, or route choices.")


if __name__ == "__main__":
    main()
