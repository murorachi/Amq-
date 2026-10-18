'use strict';
// Integration harness executes the exact getQuizPool base function and its V82.65 wrapper
// extracted from script_004.htmlpart. Only browser/storage and upstream data dependencies are stubbed.
const fs=require('node:fs');
const vm=require('node:vm');
const assert=require('node:assert/strict');
const path=require('node:path');
const src=fs.readFileSync(path.resolve(__dirname,'../../src/scripts/script_004.htmlpart'),'utf8');
const policy=fs.readFileSync(path.resolve(__dirname,'../../src/modules/candidate_pool_policy.js'),'utf8');
const p0=policy.indexOf('/* V82.65_POOL_POLICY_BEGIN: shared candidate-pool decisions for solo and multiplayer UI. */');
const p1=policy.indexOf('/* V82.65_POOL_POLICY_END */',p0);
const pool=fs.readFileSync(path.resolve(__dirname,'../../src/modules/get_quiz_pool.htmlpart'),'utf8');
const f0=src.indexOf('const __aniEmqGetQuizPoolBaseV8248=getQuizPool;');
const f1=src.indexOf('\nfunction updateQuizCounts()',f0);
assert.ok(p0>=0&&p1>p0&&pool.startsWith('function calculateQuizPoolCandidatesV8280(ctx){') && pool.includes('function getQuizPool(){')&&f0>=0&&f1>f0,'policy module and exact candidate pool module/wrapper found');
const executable=policy.slice(p0,p1+'/* V82.65_POOL_POLICY_END */'.length)+ '\n'+pool+'\n'+src.slice(f0,f1);
let passed=0;
function test(name,fn){try{fn();passed++;console.log('PASS '+name)}catch(e){console.error('FAIL '+name+'\n'+e.stack);process.exitCode=1}}
function makeEnv(overrides={}){
 const statusNode={textContent:''};
 const quickNode={value:'all'};
 const storage=new Map();
 const context={
  window:{__aniHistoryAPIv51:{isBlacklisted:id=>(overrides.blacklist||new Set()).has(String(id))}},
  document:{getElementById:id=>id==='quizPool'?quickNode:id==='quizStatus'?statusNode:null},
  localStorage:{getItem:k=>storage.get(k)??null},
  console:{error:()=>{}},
  songs:overrides.songs||[], anime:overrides.anime||[],
  byAnime:new Map((overrides.anime||[]).map(a=>[a[0],a])),
  songTags:overrides.tags||{}, animeWatch:overrides.animeWatch||{},
  quizSettings:{statuses:[0,1,2,3],songTypes:[1,2,3,4,5],yearMin:1900,yearMax:2100,unknownYear:true,seasons:['Winter','Spring','Summer','Fall'],animeTypes:['TV','OVA','Movie','Special','ONA','Other'],diffMin:0,diffMax:100,watchStatusFilterEnabled:false,watchStatuses:['current','completed','paused','dropped','planning'],watchlistOnly:false,tagsOnly:false,tagText:'',noRepeat:false,...(overrides.settings||{})},
  activeFocusModeV72:false,activeFocusSongIdsV72:[],quizRoundSeen:new Set(),lastQuestionId:null,
  st:id=>(overrides.statuses||{})[String(id)]??0,
  watchStatus:id=>(overrides.watchStatuses||{})[String(id)]??'none',
 };
 if(overrides.storageInvalid)context.localStorage.getItem=k=>k==='aniQuizCustomListScopeInvalidV8265'?'1':null;
 if(overrides.combine!==undefined)context.window.__aniEmqAPI={combinePool:overrides.combine};
 if(overrides.health!==undefined)context.window.__aniAudioHealthV857={eligible:overrides.health};
 if(overrides.scope!==undefined)context.window.__aniApplyQuizCustomListScopeV8265=overrides.scope;
 vm.createContext(context);
 vm.runInContext(executable,context,{timeout:1000,filename:'candidate-pool-exact-source.js'});
 return {context,statusNode,quickNode,ids:()=>Array.from(context.getQuizPool(),s=>String(s[1]))};
}
const anime=[
 [10,'A10','','Spring 2020','TV',2020,'mal10'],
 [20,'A20','','Fall 2010','Movie',2010,'mal20'],
 [30,'A30','','Winter 2000','OVA',2000,'mal30'],
 [40,'A40','','Summer 1990','TV',1990,'mal40'],
];
const songs=[
 [10,101,1,1,'alpha',0,12], [10,102,2,1,'beta',0,35],
 [20,201,3,1,'gamma',0,18], [30,301,1,1,'delta',0,0],
 [40,401,5,1,'epsilon',0,22], [999,901,1,1,'orphan',0,12],
 [10,103,1,1,'   ',0,12]
];
test('base pool preserves source order and rejects blank titles/orphan anime',()=>{
 const e=makeEnv({songs,anime});assert.deepEqual(e.ids(),['101','102','201','301','401']);
});
test('quick pool unmarked is applied before metadata and preserves order',()=>{
 const e=makeEnv({songs,anime,settings:{statuses:[0,1,2,3]}});e.quickNode.value='unmarked';assert.deepEqual(e.ids(),['101','102','201','301','401']);
 const x=makeEnv({songs,anime,statuses:{101:1,102:0,201:2,301:0,401:0}});x.quickNode.value='unmarked';assert.deepEqual(x.ids(),['102','301','401']);
});
test('status selection removes non-selected familiarity values',()=>{
 const e=makeEnv({songs,anime,statuses:{101:0,102:1,201:2,301:3,401:0},settings:{statuses:[1,3]}});assert.deepEqual(e.ids(),['102','301']);
});
test('metadata year, season, anime type, song type and difficulty filters compose',()=>{
 const e=makeEnv({songs,anime,settings:{yearMin:2000,yearMax:2020,seasons:['Spring','Fall'],animeTypes:['TV','Movie'],songTypes:[1,2,3],diffMin:10,diffMax:30}});assert.deepEqual(e.ids(),['101','201']);
});
test('missing year is included only when unknownYear is enabled',()=>{
 const rows=[[10,111,1,1,'known',0,12],[11,112,1,1,'unknown',0,12]];
 const an=[ [10,'A10','','Spring 2020','TV',2020,'m'], [11,'A11','','Spring 2020','TV',null,'n'] ];
 const e=makeEnv({songs:rows,anime:an,settings:{unknownYear:false}});assert.deepEqual(e.ids(),['111']);
});
test('blacklist, tagsOnly and tag query filter independently',()=>{
 const e=makeEnv({songs,anime,blacklist:new Set(['102']),tags:{101:'study',201:'StudyTag',301:'other'},settings:{tagsOnly:true,tagText:'study'}});assert.deepEqual(e.ids(),['101','201']);
});
test('watch status filter rejects unknown and unselected statuses',()=>{
 const e=makeEnv({songs,anime,watchStatuses:{10:'current',20:'completed',30:'none',40:'dropped'},settings:{watchStatusFilterEnabled:true,watchStatuses:['completed','dropped']}});assert.deepEqual(e.ids(),['201','401']);
});
test('watchlist-only requires a non-none list membership',()=>{
 const e=makeEnv({songs,anime,animeWatch:{'10':{status:'completed'},'mal20':'none','40':'planning'},settings:{watchlistOnly:true}});assert.deepEqual(e.ids(),['101','102','401']);
});
test('repeat prevention rejects seen and last-question IDs',()=>{
 const e=makeEnv({songs,anime,settings:{noRepeat:true}});e.context.quizRoundSeen=new Set(['102']);e.context.lastQuestionId=201;assert.deepEqual(e.ids(),['101','301','401']);
});
test('final repeat guard removes immediate previous question when alternatives exist',()=>{
 const e=makeEnv({songs:songs.slice(0,3),anime:anime.slice(0,2)});e.context.quizSettings.noRepeat=true;e.context.lastQuestionId=101;assert.deepEqual(e.ids(),['102','201']);
});
test('mixed combiner output replaces base pool when it returns an array',()=>{
 const e=makeEnv({songs,anime,combine:base=>[base[2],base[0]]});assert.deepEqual(e.ids(),['201','101']);
});
test('non-array combiner output falls back to base pool',()=>{
 const e=makeEnv({songs,anime,combine:()=>null});assert.deepEqual(e.ids(),['101','102','201','301','401']);
});
test('audio health filters candidates and all-unhealthy case reports status',()=>{
 const e=makeEnv({songs,anime,health:s=>String(s[1])==='201'});assert.deepEqual(e.ids(),['201']);
 const x=makeEnv({songs,anime,health:()=>false});assert.deepEqual(x.ids(),[]);assert.match(x.statusNode.textContent,/沒有可播放的音源/);
});
test('custom-list scope output is applied last and preserves its order',()=>{
 const e=makeEnv({songs,anime,scope:rows=>[rows[4],rows[0]]});assert.deepEqual(e.ids(),['401','101']);
});
test('invalid custom-list scope helper fails closed when custom scope is requested',()=>{
 const e=makeEnv({songs,anime,settings:{customListIds:['list-1']}});assert.deepEqual(e.ids(),[]);assert.match(e.statusNode.textContent,/停止抽題/);
});
test('custom-list scope throwing fails closed',()=>{
 const e=makeEnv({songs,anime,scope:()=>{throw Error('fixture')}});assert.deepEqual(e.ids(),[]);
});
test('custom-list scope returning non-array fails closed',()=>{
 const e=makeEnv({songs,anime,scope:()=>({})});assert.deepEqual(e.ids(),[]);
});
test('empty focus scope does not broaden to general pool',()=>{
 const e=makeEnv({songs,anime});e.context.activeFocusModeV72=true;e.context.activeFocusSongIdsV72=[];assert.deepEqual(e.ids(),[]);assert.match(e.statusNode.textContent,/全部完成一輪/);
});
test('focus mode constrains IDs and applies repeat filtering',()=>{
 const e=makeEnv({songs,anime});e.context.activeFocusModeV72=true;e.context.activeFocusSongIdsV72=[102,201];e.context.quizSettings.noRepeat=true;e.context.quizRoundSeen=new Set(['102']);assert.deepEqual(e.ids(),['201']);
});
test('empty candidate pool does not auto-broaden settings',()=>{
 const e=makeEnv({songs,anime,settings:{songTypes:[4],yearMin:2025,yearMax:2026}});assert.deepEqual(e.ids(),[]);assert.match(e.statusNode.textContent,/不會自動放寬範圍/);
});
test('duplicate song IDs are not silently deduplicated by base pool',()=>{
 const dup=[songs[0],{...songs[0],0:20}];const e=makeEnv({songs:dup,anime});assert.deepEqual(e.ids(),['101','101']);
});
test('invalid source mode helper normalizes to AMQ and does not broaden EMQ-only filtering',()=>{
 const e=makeEnv({songs,anime});const p=e.context.window.__aniCandidatePoolPolicyV8265;assert.equal(p.normalizeSourceMode('invalid'),'amq');assert.equal(p.sourceAllowed('invalid','emq'),false);
});
test('null, empty and malformed familiarity selections fail closed with exact empty candidate IDs',()=>{
 for(const value of [null,[],[0,'not-a-status']]){
  const e=makeEnv({songs,anime,settings:{statuses:value}});
  assert.deepEqual(e.ids(),[],'statuses=' + JSON.stringify(value));
 }
});
test('null, empty and malformed song-type selections fail closed with exact empty candidate IDs',()=>{
 for(const value of [null,[],[1,'not-a-type']]){
  const e=makeEnv({songs,anime,settings:{songTypes:value}});
  assert.deepEqual(e.ids(),[],'songTypes=' + JSON.stringify(value));
 }
});
test('watch-status selection uses defaults when missing and fails closed for null, empty or malformed selections',()=>{
 for(const value of [undefined,null,[],['completed',7]]){
  const settings={watchStatusFilterEnabled:true};
  if(value!==undefined)settings.watchStatuses=value;
  const e=makeEnv({songs,anime,watchStatuses:{10:'current',20:'completed',30:'paused',40:'dropped'},settings});
  const expected=value===undefined?['101','102','201','301','401']:[];
  assert.deepEqual(e.ids(),expected,'watchStatuses=' + JSON.stringify(value));
 }
});
test('focus scope remains exact and is not broadened by empty personal or custom-list settings',()=>{
 const e=makeEnv({songs,anime,settings:{statuses:[],songTypes:[],customListIds:['list-that-is-not-loaded']},scope:(rows,focus)=>focus?rows:[]});
 e.context.activeFocusModeV72=true;
 e.context.activeFocusSongIdsV72=[102,201,999999];
 assert.deepEqual(e.ids(),['102','201']);
 assert.equal(e.statusNode.textContent,'');
});
test('missing, null and empty custom-list selections remain unrestricted only when no invalid-scope marker exists',()=>{
 for(const value of [undefined,null,[]]){
  const settings={};if(value!==undefined)settings.customListIds=value;
  const e=makeEnv({songs,anime,settings});
  assert.deepEqual(e.ids(),['101','102','201','301','401'],'customListIds=' + JSON.stringify(value));
 }
});

console.log('RESULT ' + passed + ' passed, ' + (process.exitCode?1:0) + ' failed');
