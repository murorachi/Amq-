"""Gate 10 item/recovery sensitivity on the revised relative-quota model.
Standard library only. This is a design simulation, not production code.
Run: python3 reports/design_simulations/gamble_roguelike_gate10.py
"""
from random import Random
from statistics import mean, median

SEED = 20261020
RUNS = 100_000
EVENTS = ("risk", "vault", "signal", "risk", "vault")
PROFILES = {
    "safe": (3, 4, 4, 3),       # 75%, 4/3x
    "balanced": (2, 5, 5, 2),  # 40%, 2.5x
    "jackpot": (3, 20, 20, 3), # 15%, 20/3x
}
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


def simulate(strategy, mode="baseline", runs=RUNS):
    rng = Random(SEED + 1000)
    records = []
    uses = {item: 0 for item in ITEMS}
    recovery_enabled = mode in ("recovery", "recovery_voucher", "draft")

    for _ in range(runs):
        bank, strain, recovery_available = 1000, 0, True
        inventory = [mode] if mode in ITEMS else []
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
                    voucher = "recovery_voucher" in inventory
                    fee_rate = 8 if voucher else 15
                    bank -= (bank * fee_rate + 99) // 100
                    strain -= 1
                    recovery_available = False
                    if voucher:
                        inventory.remove("recovery_voucher")
                        uses["recovery_voucher"] += 1

            stake_fraction = {"conservative": 5, "balanced": 10, "push": 15}[strategy]
            stake = max(10, bank * stake_fraction // 100)
            attached = None
            if "insurance" in inventory:
                attached = "insurance"
                inventory.remove("insurance")
                uses["insurance"] += 1

            if event == "risk":
                profile = {"conservative": "safe", "balanced": "balanced", "push": "jackpot"}[strategy]
                won = win(rng, profile)
                delta = payout(stake, profile) - stake if won else -stake
                if not won and attached == "insurance":
                    delta += stake * 40 // 100

            elif event == "vault":
                if rng.randrange(10) >= 8:  # step 1 fails
                    delta = -stake
                else:
                    if strategy == "conservative":
                        delta = stake * 5 // 4 - stake  # cash out at 1.25x
                    else:
                        harness = False
                        if attached is None and "vault_harness" in inventory:
                            harness = True
                            inventory.remove("vault_harness")
                            uses["vault_harness"] += 1
                        if rng.randrange(10) >= 7:  # step 2 fails
                            delta = -(stake - (stake * 30 // 100 if harness else 0))
                        elif strategy == "balanced":
                            delta = stake * 18 // 10 - stake  # cash out at 1.8x
                        elif rng.randrange(10) >= 6:  # step 3 fails
                            delta = -(stake - (stake * 30 // 100 if harness else 0))
                        else:
                            delta = stake * 3 - stake  # cash out at 3x
                if delta < 0 and attached == "insurance":
                    delta += stake * 40 // 100

            else:  # Signal Room
                clues = {"conservative": 2, "balanced": 1, "push": 0}[strategy]
                fee1 = (stake * 2 + 99) // 100
                fee2 = (stake * 4 + 99) // 100
                if attached is None and clues > 0 and "signal_coupon" in inventory:
                    attached = "signal_coupon"
                    inventory.remove("signal_coupon")
                    uses["signal_coupon"] += 1
                fee = 0 if attached == "signal_coupon" or clues == 0 else fee1 + (fee2 if clues == 2 else 0)
                gross = {0: stake * 3, 1: stake * 2, 2: stake * 4 // 3}[clues]
                numerator, denominator = {0: (1, 3), 1: (1, 2), 2: (3, 4)}[clues]
                won = rng.randrange(denominator) < numerator
                delta = gross - stake - fee if won else -stake - fee
                if not won and attached == "insurance":
                    delta += stake * 40 // 100

            bank += delta
            strain = max(0, strain - 1) if bank >= target else strain + 1
            if strain >= 3:
                break

            if mode == "draft" and stage in (2, 4) and bank >= target:
                available = [item for item in ITEMS if item not in inventory]
                rng.shuffle(available)
                offer = available[:3]
                choice = next((item for item in RANKING[strategy] if item in offer), offer[0])
                if len(inventory) < 2:
                    inventory.append(choice)
                else:
                    weakest = max(inventory, key=lambda item: RANKING[strategy].index(item))
                    if RANKING[strategy].index(choice) < RANKING[strategy].index(weakest):
                        inventory.remove(weakest)
                        inventory.append(choice)

        records.append((bank, strain, stages))

    return {
        "clear": sum(1 for bank, strain, stages in records if stages == 5 and bank >= 1050 and strain < 3) / runs,
        "failed": sum(1 for _, strain, _ in records if strain >= 3) / runs,
        "mean_bank": mean(bank for bank, _, _ in records),
        "median_bank": median(bank for bank, _, _ in records),
        "mean_stages": mean(stages for _, _, stages in records),
        "item_uses": uses,
    }


def main():
    print(f"seed={SEED}; runs/mode/strategy={RUNS}; starting bank=1000; final goal=1050")
    print("Relative stage target: stage-start bank + ceil(1%). Item-only modes do not enable recovery.")
    for mode in ("baseline", "recovery", "insurance", "signal_coupon", "vault_harness", "recovery_voucher", "draft"):
        print(f"\nMODE {mode}")
        for strategy in ("conservative", "balanced", "push"):
            result = simulate(strategy, mode)
            print(
                f"{strategy}: clear={result['clear']:.3%}; strain_failure={result['failed']:.3%}; "
                f"mean_bank={result['mean_bank']:.2f}; median={result['median_bank']:.2f}; "
                f"mean_stages={result['mean_stages']:.4f}; uses={result['item_uses']}"
            )
    print("Limits: shared inventory, fixed event order and strategy ranking; no human votes,")
    print("personal item ownership, or exhaustive pairwise item-combination search.")


if __name__ == "__main__":
    main()
