"""Exact-enumeration design checks for vote rules and Signal Room clues.

This is a design-only script. It does not implement game/network behavior.
Run: python3 gamble_roguelike_gate05.py
"""
from itertools import product
from math import prod

RISK_NAMES = ("Bank", "Balanced", "Push")


def resolve_plurality(votes):
    counts = [votes.count(i) for i in range(3)]
    highest = max(counts)
    tied = [i for i, count in enumerate(counts) if count == highest]
    if len(tied) == 1:
        return tied[0]
    if len(tied) == 3 or tied == [0, 2]:
        return 1  # all-way tie or Bank-vs-Push tie becomes Balanced
    return min(tied)  # other ties choose the lower-risk tied option


def resolve_median(votes):
    ordered = sorted(votes)
    n = len(ordered)
    if n % 2:
        return ordered[n // 2]
    return (ordered[n // 2 - 1] + ordered[n // 2]) // 2


def enumerate_vote_distribution(players, preferences, resolver):
    result = [0.0, 0.0, 0.0]
    for votes in product(range(3), repeat=players):
        probability = prod(preferences[vote] for vote in votes)
        result[resolver(votes)] += probability
    return result


def clue_pairs_for(outcome):
    # Outcomes A=0, B=1, C=2. Each clue is one of the two pairs containing truth.
    all_pairs = ((0, 1), (0, 2), (1, 2))
    return [pair for pair in all_pairs if outcome in pair]


def enumerate_signal_accuracy(clue_count):
    accuracy_sum = 0.0
    cases = 0
    for outcome in range(3):
        options = [clue_pairs_for(outcome)] * clue_count
        clue_combinations = product(*options) if clue_count else [()]
        for clues in clue_combinations:
            if clue_count == 0:
                accuracy_sum += 1.0 / 3.0
            elif clue_count == 1:
                accuracy_sum += 1.0 / 2.0
            else:
                intersection = set(clues[0]).intersection(clues[1])
                accuracy_sum += 1.0 if len(intersection) == 1 else 1.0 / 2.0
            cases += 1
    return accuracy_sum / cases


def main():
    preference_sets = {
        "cautious group (50/35/15)": (0.50, 0.35, 0.15),
        "mixed group (40/35/25)": (0.40, 0.35, 0.25),
    }
    for label, prefs in preference_sets.items():
        print(f"\n{label}: Bank/Balanced/Push individual preferences = {prefs}")
        for players in (2, 3, 6):
            plurality = enumerate_vote_distribution(players, prefs, resolve_plurality)
            median = enumerate_vote_distribution(players, prefs, resolve_median)
            print(
                f"{players} players: plurality=[{', '.join(f'{x:.4%}' for x in plurality)}]; "
                f"median=[{', '.join(f'{x:.4%}' for x in median)}]"
            )

    print("\nSignal Room exact clue accuracy")
    for clues, gross in ((0, 3.0), (1, 2.0), (2, 4.0 / 3.0)):
        p = enumerate_signal_accuracy(clues)
        print(f"clues={clues}: success={p:.4%}, gross={gross:.6f}x, expected gross={p*gross:.6f}x")
    print("Clue fees are additional bank costs and are not included in expected gross return.")


if __name__ == "__main__":
    main()
