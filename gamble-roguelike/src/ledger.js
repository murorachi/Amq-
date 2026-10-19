/** In-memory prototype ledger. Durable persistence is a later stage. */
export class ChipLedger {
  #balances = new Map();
  #settlements = new Map();
  #entries = [];

  constructor(initialBalances = {}) {
    for (const [playerId, balance] of Object.entries(initialBalances)) {
      this.#assertPlayerId(playerId);
      this.#assertBalance(balance);
      this.#balances.set(playerId, balance);
      this.#entries.push(Object.freeze({
        entryId: 'initial:' + playerId, settlementId: null, playerId, delta: balance,
        reason: 'run-initial-balance', balanceAfter: balance,
      }));
    }
  }
  #assertPlayerId(playerId) {
    if (typeof playerId !== 'string' || !playerId.trim()) throw new TypeError('playerId must be a non-empty string');
  }
  #assertBalance(balance) {
    if (!Number.isSafeInteger(balance) || balance < 0) throw new RangeError('balance must be a non-negative safe integer');
  }
  getBalance(playerId) {
    this.#assertPlayerId(playerId);
    if (!this.#balances.has(playerId)) throw new RangeError('unknown player: ' + playerId);
    return this.#balances.get(playerId);
  }
  getEntries() { return this.#entries.map((entry) => ({ ...entry })); }
  hasSettlement(settlementId) { return this.#settlements.has(settlementId); }

  /** Apply one settlement atomically; replaying its ID is a no-op. */
  settle({ settlementId, entries }) {
    if (typeof settlementId !== 'string' || !settlementId.trim()) throw new TypeError('settlementId must be a non-empty string');
    if (!Array.isArray(entries) || entries.length === 0) throw new TypeError('entries must be a non-empty array');
    if (this.#settlements.has(settlementId)) {
      return Object.freeze({ applied: false, duplicate: true, balances: this.#snapshotBalances() });
    }
    const aggregated = new Map();
    const reasons = new Map();
    for (const entry of entries) {
      this.#assertPlayerId(entry && entry.playerId);
      if (!this.#balances.has(entry.playerId)) throw new RangeError('unknown player: ' + entry.playerId);
      if (!Number.isSafeInteger(entry.delta) || entry.delta === 0) throw new RangeError('delta must be a non-zero safe integer');
      if (typeof entry.reason !== 'string' || !entry.reason.trim()) throw new TypeError('reason must be a non-empty string');
      const aggregate = (aggregated.get(entry.playerId) || 0) + entry.delta;
      if (!Number.isSafeInteger(aggregate)) throw new RangeError('aggregated delta exceeds safe integer range');
      aggregated.set(entry.playerId, aggregate);
      reasons.set(entry.playerId, [...(reasons.get(entry.playerId) || []), entry.reason]);
    }
    const nextBalances = new Map(this.#balances);
    for (const [playerId, delta] of aggregated) {
      const next = nextBalances.get(playerId) + delta;
      this.#assertBalance(next);
      nextBalances.set(playerId, next);
    }
    this.#balances = nextBalances;
    this.#settlements.set(settlementId, true);
    for (const [playerId, delta] of aggregated) {
      this.#entries.push(Object.freeze({
        entryId: settlementId + ':' + playerId, settlementId, playerId, delta,
        reason: reasons.get(playerId).join('; '), balanceAfter: nextBalances.get(playerId),
      }));
    }
    return Object.freeze({ applied: true, duplicate: false, balances: this.#snapshotBalances() });
  }
  #snapshotBalances() {
    return Object.fromEntries([...this.#balances.entries()].sort(([a], [b]) => a.localeCompare(b)));
  }
}
