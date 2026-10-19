import test from 'node:test';
import assert from 'node:assert/strict';
import { GAME_IDS, grossReturn, resolveBlindHighCard, resolveCoinCall, resolveExactSeven, resolveVaultStep } from '../src/games.js';
import { ChipLedger } from '../src/ledger.js';

test('Coin Call returns gross payout including stake and floors fractional chips', () => {
  assert.deepEqual(resolveCoinCall({ choice: 'heads', outcome: 'heads', stake: 100 }), {
    gameId: GAME_IDS.COIN_CALL, rulesVersion: '0.1.0', won: true, payout: 190, balanceDelta: 90,
  });
  assert.equal(resolveCoinCall({ choice: 'tails', outcome: 'heads', stake: 100 }).balanceDelta, -100);
  assert.equal(grossReturn(1, 19, 10), 1);
  assert.throws(() => resolveCoinCall({ choice: 'edge', outcome: 'heads', stake: 1 }), /choice/);
  assert.throws(() => resolveCoinCall({ choice: 'heads', outcome: 'tails', stake: 0 }), /stake/);
});
test('Exact Seven has exactly six winning ordered dice combinations out of 36', () => {
  let wins = 0;
  for (let a = 1; a <= 6; a++) for (let b = 1; b <= 6; b++) {
    if (resolveExactSeven({ stake: 100, dieOne: a, dieTwo: b }).won) wins++;
  }
  assert.equal(wins, 6);
  assert.equal(resolveExactSeven({ stake: 100, dieOne: 3, dieTwo: 4 }).payout, 540);
  assert.throws(() => resolveExactSeven({ stake: 100, dieOne: 0, dieTwo: 6 }), /dieOne/);
});
test('Vault thresholds and gross returns use integer chip units', () => {
  assert.equal(resolveVaultStep({ stake: 100, step: 1, rollBasisPoints: 7999 }).payout, 120);
  assert.equal(resolveVaultStep({ stake: 100, step: 1, rollBasisPoints: 8000 }).succeeded, false);
  assert.equal(resolveVaultStep({ stake: 100, step: 2, rollBasisPoints: 6999 }).payout, 170);
  assert.equal(resolveVaultStep({ stake: 100, step: 3, rollBasisPoints: 5999 }).payout, 270);
  assert.equal(resolveVaultStep({ stake: 100, step: 3, rollBasisPoints: 0 }).terminal, true);
  assert.throws(() => resolveVaultStep({ stake: 100, step: 4, rollBasisPoints: 0 }), /step/);
});
test('Blind High Card splits pot and assigns remainder in sorted player ID order', () => {
  const tied = resolveBlindHighCard({
    entries: [{ playerId: 'b', stake: 5 }, { playerId: 'a', stake: 4 }, { playerId: 'c', stake: 3 }],
    ranks: { a: 13, b: 13, c: 2 },
  });
  assert.equal(tied.pot, 12);
  assert.deepEqual(tied.winners, ['a', 'b']);
  assert.deepEqual(tied.payouts, { b: 6, a: 6, c: 0 });
  const remainder = resolveBlindHighCard({
    entries: [{ playerId: 'z', stake: 3 }, { playerId: 'a', stake: 1 }, { playerId: 'm', stake: 1 }],
    ranks: { a: 10, m: 10, z: 2 },
  });
  assert.deepEqual(remainder.payouts, { z: 0, a: 3, m: 2 });
  assert.throws(() => resolveBlindHighCard({
    entries: [{ playerId: 'a', stake: 1 }, { playerId: 'a', stake: 1 }], ranks: { a: 4 },
  }), /unique/);
});
test('ledger applies settlement deltas atomically', () => {
  const ledger = new ChipLedger({ alice: 1000, bob: 1000 });
  ledger.settle({ settlementId: 'round-1', entries: [
    { playerId: 'alice', delta: -100, reason: 'stake' },
    { playerId: 'alice', delta: 190, reason: 'gross payout' },
    { playerId: 'bob', delta: -100, reason: 'lost stake' },
  ] });
  assert.equal(ledger.getBalance('alice'), 1090);
  assert.equal(ledger.getBalance('bob'), 900);
  assert.equal(ledger.getEntries().filter((entry) => entry.settlementId === 'round-1').length, 2);
});
test('duplicate settlement is idempotent', () => {
  const ledger = new ChipLedger({ alice: 100 });
  const input = { settlementId: 'round-1', entries: [{ playerId: 'alice', delta: 50, reason: 'win' }] };
  assert.equal(ledger.settle(input).applied, true);
  assert.deepEqual(ledger.settle(input), { applied: false, duplicate: true, balances: { alice: 150 } });
  assert.equal(ledger.getEntries().length, 2);
});
test('invalid debit rolls back all settlement changes', () => {
  const ledger = new ChipLedger({ alice: 100, bob: 0 });
  const before = ledger.getEntries();
  assert.throws(() => ledger.settle({ settlementId: 'bad', entries: [
    { playerId: 'alice', delta: -10, reason: 'stake' },
    { playerId: 'bob', delta: -1, reason: 'invalid debit' },
  ] }), /non-negative/);
  assert.equal(ledger.getBalance('alice'), 100);
  assert.equal(ledger.getBalance('bob'), 0);
  assert.deepEqual(ledger.getEntries(), before);
  assert.equal(ledger.hasSettlement('bad'), false);
});
test('ledger rejects unknown players, zero deltas and invalid opening balances', () => {
  assert.throws(() => new ChipLedger({ alice: -1 }), /non-negative/);
  const ledger = new ChipLedger({ alice: 100 });
  assert.throws(() => ledger.settle({ settlementId: 'unknown', entries: [{ playerId: 'bob', delta: 1, reason: 'x' }] }), /unknown player/);
  assert.throws(() => ledger.settle({ settlementId: 'zero', entries: [{ playerId: 'alice', delta: 0, reason: 'x' }] }), /non-zero/);
});
