'use strict';
// Exact-source tests for multiplayer session/reconnect persistence. All storage
// is synthetic and in-memory; no room or live server is contacted.
const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const path = require('node:path');
const root = path.resolve(__dirname, '../..');
const source = fs.readFileSync(path.join(root, 'src/scripts/script_028.htmlpart'), 'utf8');
function extractFunction(name) {
  const start = source.indexOf(`function ${name}(`);
  assert.ok(start >= 0, `exact function exists: ${name}`);
  const open = source.indexOf('{', start);
  assert.ok(open > start, `function body starts: ${name}`);
  let depth = 0, quote = null, escaped = false, lineComment = false, blockComment = false;
  for (let i = open; i < source.length; i++) {
    const c = source[i], n = source[i + 1];
    if (lineComment) { if (c === '\n') lineComment = false; continue; }
    if (blockComment) { if (c === '*' && n === '/') { blockComment = false; i++; } continue; }
    if (quote) {
      if (escaped) { escaped = false; continue; }
      if (c === '\\') { escaped = true; continue; }
      if (c === quote) quote = null;
      continue;
    }
    if (c === '/' && n === '/') { lineComment = true; i++; continue; }
    if (c === '/' && n === '*') { blockComment = true; i++; continue; }
    if (c === "'" || c === '"' || c === '`') { quote = c; continue; }
    if (c === '{') depth++;
    if (c === '}' && --depth === 0) return source.slice(start, i + 1);
  }
  throw new Error(`unclosed function body: ${name}`);
}
const extracted = ['readSession', 'saveSession', 'reconnectKey', 'removeReconnect'].map(extractFunction).join('\n');
const sessionValues = new Map();
const localValues = new Map();
const makeStorage = values => ({
  getItem: k => values.has(String(k)) ? values.get(String(k)) : null,
  setItem: (k, v) => values.set(String(k), String(v)),
  removeItem: k => values.delete(String(k)),
  clear: () => values.clear()
});
const sessionStorage = makeStorage(sessionValues), localStorage = makeStorage(localValues);
const readJson = (key, fallback) => { try { const value = JSON.parse(localStorage.getItem(key) || 'null'); return value && typeof value === 'object' ? value : fallback; } catch { return fallback; } };
const context = { SESSION_KEY: 'aniMultiplayerRoomSessionV2', RECONNECT_KEY: 'aniMultiplayerReconnectV82', state: {}, sessionStorage, localStorage, readJson, JSON, String, Object };
vm.runInNewContext(extracted, context);
let passed = 0;
function test(name, fn) {
  try { fn(); passed++; console.log('PASS ' + name); }
  catch (error) { console.error('FAIL ' + name + '\n' + error.stack); process.exitCode = 1; }
}
test('session is accepted only when room code, player ID and token exist', () => {
  sessionStorage.setItem(context.SESSION_KEY, JSON.stringify({ roomCode: 'ABC123', playerId: 'p1', token: 'secret' }));
  assert.equal(context.readSession().roomCode, 'ABC123');
  sessionStorage.setItem(context.SESSION_KEY, JSON.stringify({ roomCode: 'ABC123', playerId: 'p1' }));
  assert.equal(context.readSession(), null);
  sessionStorage.setItem(context.SESSION_KEY, '{broken');
  assert.equal(context.readSession(), null);
});
test('saving a session stores active session separately from reconnect index', () => {
  const session = { roomCode: 'abc123', playerId: 'p1', token: 'synthetic-token', playerName: ' Alice ' };
  context.saveSession(session);
  assert.equal(context.state.session, session);
  assert.equal(JSON.parse(sessionStorage.getItem(context.SESSION_KEY)).token, 'synthetic-token');
  const book = JSON.parse(localStorage.getItem(context.RECONNECT_KEY));
  assert.equal(book['ABC123|alice'].playerId, 'p1');
});
test('clearing active session does not implicitly erase reconnect capability', () => {
  context.saveSession(null);
  assert.equal(sessionStorage.getItem(context.SESSION_KEY), null);
  assert.ok(JSON.parse(localStorage.getItem(context.RECONNECT_KEY))['ABC123|alice']);
});
test('removing one reconnect entry preserves other rooms and players', () => {
  const other = { roomCode: 'XYZ999', playerId: 'p2', token: 'other', playerName: 'Bob' };
  context.saveSession(other);
  context.removeReconnect({ roomCode: 'abc123', playerName: 'ALICE' });
  const book = JSON.parse(localStorage.getItem(context.RECONNECT_KEY));
  assert.equal(book['ABC123|alice'], undefined);
  assert.equal(book['XYZ999|bob'].playerId, 'p2');
});
test('polling is guarded against overlap, missing sessions, hidden pages and inactive view', () => {
  assert.match(source, /function startPoll\(\)\{stopPoll\(\);state\.liveEnabled=true;connectLive\(\);state\.pollTimer=setInterval\(async\(\)=>\{if\(state\.pollBusy\|\|!state\.session\|\|document\.hidden\|\|!document\.body\.classList\.contains\('multiplayer-mode'\)\)return;/);
  assert.match(source, /function stopPoll\(\)\{if\(state\.pollTimer\)\{clearInterval\(state\.pollTimer\);state\.pollTimer=null\}state\.pollBusy=false\}/);
});
test('invalid token/room/player responses clear active session and stop polling/audio', () => {
  assert.match(source, /\['invalid_player_token','room_not_found','player_left'\]\.includes\(e\.code\)\)\{stopPoll\(\);stopAudio\(\);saveSession\(null\);/);
});
test('team live channel uses WebSocket while HTTP polling remains the fallback', () => {
  assert.match(source, /Live draft channel unavailable; HTTP polling remains active\./);
  assert.match(source, /new WebSocket\(u\.toString\(\)\)/);
  assert.match(source, /u\.protocol=u\.protocol==='https:'\?'wss:'\:'ws:'/);
});
console.log(`RESULT ${passed} passed, ${process.exitCode ? '1+' : '0'} failed`);
