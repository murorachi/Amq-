'use strict';
// Differential tests compare the V82.79 getQuizPool implementation to the V82.80
// pure-calculator + adapter implementation using the same synthetic state fixtures.
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const root = path.resolve(__dirname, '../..');
const oldSource = fs.readFileSync(path.join(root, 'tests/fixtures/get_quiz_pool_v82_79.js'), 'utf8');
const newSource = fs.readFileSync(path.join(root, 'src/modules/get_quiz_pool.htmlpart'), 'utf8');
const policySource = fs.readFileSync(path.join(root, 'src/modules/candidate_pool_policy.js'), 'utf8');
const p0 = policySource.indexOf('/* V82.65_POOL_POLICY_BEGIN: shared candidate-pool decisions for solo and multiplayer UI. */');
const p1 = policySource.indexOf('/* V82.65_POOL_POLICY_END */', p0);
assert.ok(p0 >= 0 && p1 > p0, 'policy block boundaries exist');
const policy = policySource.slice(p0, p1 + '/* V82.65_POOL_POLICY_END */'.length);
const anime = [[10,'A10','','Spring 2020','TV',2020,'mal10'],[20,'A20','','Fall 2010','Movie',2010,'mal20'],[30,'A30','','Winter 2000','OVA',2000,'mal30'],[40,'A40','','Summer 1990','TV',1990,'mal40']];
const songs = [[10,101,1,1,'alpha',0,12],[10,102,2,1,'beta',0,35],[20,201,3,1,'gamma',0,18],[30,301,1,1,'delta',0,0],[40,401,5,1,'epsilon',0,22],[999,901,1,1,'orphan',0,12],[10,103,1,1,'   ',0,12]];
const baseSettings = {statuses:[0,1,2,3],songTypes:[1,2,3,4,5],yearMin:1900,yearMax:2100,unknownYear:true,seasons:['Winter','Spring','Summer','Fall'],animeTypes:['TV','OVA','Movie','Special','ONA','Other'],diffMin:0,diffMax:100,watchStatusFilterEnabled:false,watchStatuses:['current','completed','paused','dropped','planning'],watchlistOnly:false,tagsOnly:false,tagText:'',noRepeat:false};
function make(overrides={}) {
 const statusNode={textContent:''}, quickNode={value:overrides.quickPool||'all'};
 const context={window:{__aniHistoryAPIv51:{isBlacklisted:id=>(overrides.blacklist||[]).map(String).includes(String(id))}},document:{getElementById:id=>id==='quizPool'?quickNode:id==='quizStatus'?statusNode:null},songs:overrides.songs||songs,anime:overrides.anime||anime,byAnime:new Map((overrides.anime||anime).map(a=>[a[0],a])),songTags:overrides.tags||{},animeWatch:overrides.animeWatch||{},quizSettings:{...baseSettings,...(overrides.settings||{})},activeFocusModeV72:!!overrides.focus,activeFocusSongIdsV72:overrides.focusIds||[],quizRoundSeen:new Set((overrides.seen||[]).map(String)),lastQuestionId:overrides.lastId??null,st:id=>(overrides.statuses||{})[String(id)]??0,watchStatus:id=>(overrides.watchStatuses||{})[String(id)]??'none'};
 vm.createContext(context);
 vm.runInContext(policy+'\n'+(overrides.implementation==='old'?oldSource:newSource)+'\nglobalThis.__getPool=getQuizPool;',context,{timeout:1000});
 return {context,statusNode,quickNode};
}
const scenarios=[
 ['default pool',{}],['blacklist',{blacklist:[102]}],['tag filter',{tags:{101:'study',201:'StudyTag',301:'other'},settings:{tagsOnly:true,tagText:'study'}}],['status selection',{statuses:{101:0,102:1,201:2,301:3,401:0},settings:{statuses:[1,3]}}],['metadata filter',{settings:{yearMin:2000,yearMax:2020,seasons:['Spring','Fall'],animeTypes:['TV','Movie'],songTypes:[1,2,3],diffMin:10,diffMax:30}}],['watch status',{watchStatuses:{10:'current',20:'completed',30:'none',40:'dropped'},settings:{watchStatusFilterEnabled:true,watchStatuses:['completed','dropped']}}],['watchlist',{animeWatch:{'10':{status:'completed'},'mal20':'none','40':'planning'},settings:{watchlistOnly:true}}],['repeat filter',{settings:{noRepeat:true},seen:[102],lastId:201}],['focus mode',{focus:true,focusIds:[102,201],settings:{noRepeat:true},seen:[102]}],['empty focus fails closed',{focus:true,focusIds:[]}],['empty pool diagnostic',{settings:{songTypes:[4],yearMin:2025,yearMax:2026}}],['watchlist diagnostic',{settings:{watchlistOnly:true},watchStatuses:{10:'none',20:'none',30:'none',40:'none'}}],['duplicates preserved',{songs:[songs[0],{...songs[0],0:20}]}],['missing anime rejected',{songs:[[999,990,1,1,'orphan',0,12]]}],['unmarked quick pool',{quickPool:'unmarked',statuses:{101:1,102:0,201:2,301:0,401:0}}],['malformed status selection',{settings:{statuses:[0,'bad']}}],['malformed song type selection',{settings:{songTypes:[1,'bad']}}],['last question guard',{settings:{noRepeat:true},lastId:101}],['empty tags with required tag',{settings:{tagsOnly:true}}],['watch status malformed selection',{settings:{watchStatusFilterEnabled:true,watchStatuses:['completed',7]},watchStatuses:{10:'completed',20:'completed'}}]
];
let assertions=0;
for(const [name,fixture] of scenarios){
 const old=make({...fixture,implementation:'old'}),fresh=make({...fixture,implementation:'new'});
 const oldPool=Array.from(old.context.__getPool(),s=>String(s[1]));
 const newPool=Array.from(fresh.context.__getPool(),s=>String(s[1]));
 assert.deepEqual(newPool,oldPool,`${name}: candidate IDs`); assertions++;
 assert.equal(fresh.statusNode.textContent,old.statusNode.textContent,`${name}: diagnostic text`); assertions++;
 console.log(`PASS ${name}: ids and diagnostic equivalent`);
}
console.log(`RESULT ${assertions} differential assertions passed across ${scenarios.length} scenarios`);