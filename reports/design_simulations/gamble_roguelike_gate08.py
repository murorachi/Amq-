"""Integrated design-only five-stage simulation for Gate 08.
Standard library only; not production game code or production RNG.
Run: python3 reports/design_simulations/gamble_roguelike_gate08.py
"""
from random import Random
from statistics import mean, median

SEED = 20261020
RUNS = 100_000
TARGETS = (1020, 1040, 1060, 1080, 1100)
EVENTS = ("risk", "vault", "signal", "risk", "vault")
PROFILES = {
    "safe": (15, 20, 4, 3),
    "balanced": (8, 20, 5, 2),
    "jackpot": (3, 20, 20, 3),
}
ITEMS = ("insurance", "signal_coupon", "vault_harness", "recovery_voucher")
RANKING = {
    "conservative": ("insurance", "signal_coupon", "recovery_voucher", "vault_harness"),
    "quota-aware": ("recovery_voucher", "insurance", "signal_coupon", "vault_harness"),
    "volatility": ("vault_harness", "insurance", "recovery_voucher", "signal_coupon"),
}


def payout(stake, profile):
    _, _, numerator, denominator = PROFILES[profile]
    return stake * numerator // denominator


def risk_win(rng, profile):
    win_slots, denominator, _, _ = PROFILES[profile]
    return rng.randrange(denominator) < win_slots


def choose_risk(strategy, bank, target, stake):
    gap = max(0, target - bank)
    safe_gain = payout(stake, "safe") - stake
    balanced_gain = payout(stake, "balanced") - stake
    if strategy == "conservative":
        return "safe"
    if strategy == "volatility":
        return "balanced" if gap == 0 else "jackpot"
    if gap <= safe_gain:
        return "safe"
    if gap <= balanced_gain:
        return "balanced"
    return "jackpot"


def simulate(strategy, runs=RUNS):
    rng = Random(SEED)
    records = []
    for _ in range(runs):
        bank, strain = 1000, 0
        inventory = []
        recovery_available = True
        stages = 0
        for stage, (target, event) in enumerate(zip(TARGETS, EVENTS), start=1):
            stages += 1
            if strain >= 2 and recovery_available:
                if strategy == "conservative":
                    recover = True
                elif strategy == "quota-aware":
                    rate = 8 if "recovery_voucher" in inventory else 15
                    fee = (bank * rate + 99) // 100
                    post_fee = bank - fee
                    next_stake = max(10, post_fee // 10)
                    recover = post_fee + payout(next_stake, "jackpot") - next_stake >= target
                else:
                    recover = False
                if recover:
                    rate = 8 if "recovery_voucher" in inventory else 15
                    bank -= (bank * rate + 99) // 100
                    strain -= 1
                    recovery_available = False
                    if "recovery_voucher" in inventory:
                        inventory.remove("recovery_voucher")

            stake = max(10, bank // 10)
            attached = None
            # At most one support item may be attached to a wager.
            if "insurance" in inventory:
                attached = "insurance"
                inventory.remove("insurance")

            if event == "risk":
                profile = choose_risk(strategy, bank, target, stake)
                won = risk_win(rng, profile)
                delta = payout(stake, profile) - stake if won else -stake
                if not won and attached == "insurance":
                    delta += stake * 40 // 100

            elif event == "vault":
                if rng.randrange(10) >= 8:  # step 1 fails: 20%
                    delta = -stake
                else:
                    gain1 = stake * 5 // 4 - stake
                    if strategy == "conservative" or (strategy == "quota-aware" and bank + gain1 >= target):
                        delta = gain1
                    else:
                        harness = False
                        if attached is None and "vault_harness" in inventory:
                            harness = True
                            inventory.remove("vault_harness")
                        if rng.randrange(10) >= 7:  # step 2 fails: 30%
                            delta = -(stake - (stake * 30 // 100 if harness else 0))
                        else:
                            gain2 = stake * 18 // 10 - stake
                            if strategy == "quota-aware" and bank + gain2 >= target:
                                delta = gain2
                            elif rng.randrange(10) >= 6:  # step 3 fails: 40%
                                delta = -(stake - (stake * 30 // 100 if harness else 0))
                            else:
                                delta = stake * 3 - stake
                if delta < 0 and attached == "insurance":
                    delta += stake * 40 // 100

            else:  # Signal Room
                gap = max(0, target - bank)
                fee1 = (stake * 2 + 99) // 100
                fee2 = (stake * 4 + 99) // 100
                gain0 = payout(stake, "jackpot") - stake
                gain1 = stake - fee1
                gain2 = stake // 3 - fee1 - fee2
                if strategy == "conservative":
                    clues = 2
                elif strategy == "volatility":
                    clues = 0
                else:
                    clues = 2 if gap <= gain2 else 1 if gap <= gain1 else 0
                if attached is None and clues > 0 and "signal_coupon" in inventory:
                    attached = "signal_coupon"
                    inventory.remove("signal_coupon")
                fee = 0 if attached == "signal_coupon" else (0 if clues == 0 else fee1 + (fee2 if clues == 2 else 0))
                numerator, denominator = {0: (1, 3), 1: (1, 2), 2: (3, 4)}[clues]
                won = rng.randrange(denominator) < numerator
                gross = {0: stake * 3, 1: stake * 2, 2: stake * 4 // 3}[clues]
                delta = gross - stake - fee if won else -stake - fee
                if not won and attached == "insurance":
                    delta += stake * 40 // 100

            bank += delta
            strain = max(0, strain - 1) if bank >= target else strain + 1
            if strain >= 3:
                break

            # Blind Draft after stages 2 and 4 only if that stage cleared.
            if stage in (2, 4) and bank >= target:
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
        "clear": sum(1 for bank, strain, stages in records if stages == 5 and bank >= 1100 and strain < 3) / runs,
        "failed": sum(1 for _, strain, _ in records if strain >= 3) / runs,
        "mean_bank": mean(bank for bank, _, _ in records),
        "median_bank": median(bank for bank, _, _ in records),
        "mean_stages": mean(stages for _, _, stages in records),
    }


def main():
    print(f"seed={SEED}; runs/strategy={RUNS}; starting bank=1000; targets={TARGETS}")
    print(f"event order={EVENTS}; Blind Draft after stages 2 and 4 when target is cleared")
    print("Three fixed policies are hypotheses, not learned/optimized strategies.")
    for strategy in ("conservative", "quota-aware", "volatility"):
        result = simulate(strategy)
        print(
            f"{strategy}: clear={result['clear']:.3%}; strain_failure={result['failed']:.3%}; "
            f"mean_bank={result['mean_bank']:.2f}; median_bank={result['median_bank']:.2f}; "
            f"mean_stages={result['mean_stages']:.4f}"
        )
    print("Limitations: one fixed event order and target curve; draft choice is modeled by a fixed ranking;")
    print("no human voting, party-size effects, personal item ownership, or full item-combination search.")


if __name__ == "__main__":
    main()
