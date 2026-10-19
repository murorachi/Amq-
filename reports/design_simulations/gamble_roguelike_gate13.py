"""Gate 13: event-order, vote-size, and integer-rounding checks.
Design-only. Standard library only.
"""
from fractions import Fraction
from itertools import permutations, product
from random import Random
from statistics import mean

SEED = 20262020
RUNS_PER_ORDER = 10_000
BASE_EVENTS = ("risk", "risk", "vault", "vault", "signal")
PROFILES = {
    "safe": (3, 4, 4, 3, 5),
    "balanced": (2, 5, 5, 2, 10),
    "jackpot": (3, 20, 20, 3, 15),
}


def payout(stake, tier):
    _, _, numerator, denominator, _ = PROFILES[tier]
    return stake * numerator // denominator


def win(rng, tier):
    numerator, denominator, _, _, _ = PROFILES[tier]
    return rng.randrange(denominator) < numerator


def resolve_vote(votes):
    counts = [votes.count(i) for i in range(3)]  # Bank, Balanced, Push
    highest = max(counts)
    tied = [i for i, count in enumerate(counts) if count == highest]
    if len(tied) == 1:
        return tied[0]
    if len(tied) == 3 or tied == [0, 2]:
        return 1
    return min(tied)


def vote_distribution(players, preferences):
    result = [Fraction(0), Fraction(0), Fraction(0)]
    for votes in product(range(3), repeat=players):
        probability = Fraction(1)
        for vote in votes:
            probability *= preferences[vote]
        result[resolve_vote(votes)] += probability
    return result


def simulate_order(strategy, events, runs=RUNS_PER_ORDER):
    rng = Random(SEED)
    records = []
    for _ in range(runs):
        bank, strain, stages = 1000, 0, 0
        for event in events:
            stages += 1
            target = bank + (bank + 99) // 100
            tier = {"conservative": "safe", "balanced": "balanced", "push": "jackpot"}[strategy]
            fraction = PROFILES[tier][4]
            stake = max(10, bank * fraction // 100)
            if event == "risk":
                delta = payout(stake, tier) - stake if win(rng, tier) else -stake
            elif event == "vault":
                if rng.randrange(10) >= 8:
                    delta = -stake
                elif strategy == "conservative":
                    delta = stake * 5 // 4 - stake
                elif strategy == "balanced":
                    delta = -stake if rng.randrange(10) >= 7 else stake * 18 // 10 - stake
                else:
                    if rng.randrange(10) >= 7:
                        delta = -stake
                    elif rng.randrange(10) >= 6:
                        delta = -stake
                    else:
                        delta = stake * 3 - stake
            else:
                clues = {"conservative": 2, "balanced": 1, "push": 0}[strategy]
                fee1 = (stake * 2 + 99) // 100
                fee2 = (stake * 6 + 99) // 100
                fee = 0 if clues == 0 else fee1 if clues == 1 else fee2
                gross = {0: stake * 3, 1: stake * 2, 2: stake * 4 // 3}[clues]
                numerator, denominator = {0: (1, 3), 1: (1, 2), 2: (3, 4)}[clues]
                won = rng.randrange(denominator) < numerator
                delta = gross - stake - fee if won else -stake - fee
            bank += delta
            strain = max(0, strain - 1) if bank >= target else strain + 1
            if strain >= 3:
                break
        records.append((bank, strain, stages))
    return sum(1 for bank, strain, stages in records if stages == 5 and bank >= 1050 and strain < 3) / runs


def main():
    print("Exact risk-vote distribution. Order is Bank / Balanced / Push.")
    preference_sets = {
        "cautious 50/35/15": (Fraction(1, 2), Fraction(35, 100), Fraction(15, 100)),
        "mixed 40/35/25": (Fraction(2, 5), Fraction(35, 100), Fraction(1, 4)),
    }
    for label, preferences in preference_sets.items():
        print(label)
        for players in (2, 3, 6):
            shares = vote_distribution(players, preferences)
            print(f"  {players} players: " + " / ".join(f"{float(x):.3%}" for x in shares))

    print("\nSignal Room integer fee boundaries (one clue=ceil(2%), two clues=ceil(6%))")
    for stake in (10, 11, 19, 20, 49, 50, 99, 100, 101, 149, 150, 151, 1000):
        one = (stake * 2 + 99) // 100
        two = (stake * 6 + 99) // 100
        print(f"stake={stake}: one_clue_fee={one}; two_clue_fee={two}; combined_fee_pct={two/stake:.3%}")

    print("\nEvent-order sensitivity: all 30 unique permutations of R/R/V/V/S; 10,000 runs/order.")
    orders = sorted(set(permutations(BASE_EVENTS)))
    for strategy in ("conservative", "balanced", "push"):
        rates = [(simulate_order(strategy, order), order) for order in orders]
        values = [rate for rate, _ in rates]
        worst = min(rates, key=lambda item: item[0])
        best = max(rates, key=lambda item: item[0])
        print(
            f"{strategy}: min={min(values):.3%}; mean={mean(values):.3%}; max={max(values):.3%}; "
            f"worst={''.join(x[0].upper() for x in worst[1])}; best={''.join(x[0].upper() for x in best[1])}"
        )
    print("R=Risk Contract, V=Vault, S=Signal Room. This excludes items/recovery and is not a fun test.")


if __name__ == "__main__":
    main()
