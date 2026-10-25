const fs=require('fs'),vm=require('vm'),assert=require('assert');
const htmlPath=process.argv[2]||'/mnt/data/AMQ_Stage3_Work_20261025/amq_learning_tool_v82_86_13_candidate302_emq_loader_state_validation_20261025.html';
const html=fs.readFileSync(htmlPath,'utf8');
const start=html.indexOf("const AUDIO_UNAVAILABLE_KEY_V857=");
const end=html.indexOf('function ensureDiscoveryCardV60()',start);
if(start<0||end<0)throw Error('Could not locate pool/audio functions in candidate HTML');
const code=html.slice(start,end);
const storage=new Map(),blackSongs=new Set(),blackWorks=new Set();
const amqRows=[
 [10,101,1,1,'AMQ One','Artist',null,120,0,'x.mp3'],
 [11,102,1,1,'AMQ Two','Artist',null,120,0,'y.mp3'],
 [12,103,1,1,'AMQ No Audio','Artist',null,120,0,'']
];
const emqRows=[
 [20,201,1,0,'EMQ One','Artist',null,0,0,'https://x/1.mp3','','','','','EMQ'],
 [21,202,1,0,'EMQ Two','Artist',null,0,0,'https://x/2.mp3','','','','','EMQ']
];
const ctx={console, songs:amqRows, localStorage:{getItem:k=>storage.get(k)||null,setItem:(k,v)=>storage.set(k,String(v))},
 mediaFiles:s=>s[9]?[{kind:'audio',file:s[9]}]:[],
 isBlacklistedSongV51:id=>blackSongs.has(String(id)),
 window:{__aniEmqAPI:{ready:true,isSong:id=>[201,202].includes(Number(id)),getRows:()=>emqRows},__aniIsAnimeWorkBlacklistedV825:id=>blackWorks.has(String(id))},
 document:{getElementById:()=>null,dispatchEvent:()=>true},CustomEvent:function(t,o){this.type=t;this.detail=o?.detail},
 st:()=>0,Math:Object.create(Math),Date,JSON,Set,Map,String,Number,Array};
ctx.window.window=ctx.window;vm.createContext(ctx);vm.runInContext(code,ctx,{timeout:5000});
const results=[];function test(name,fn){try{fn();results.push({name,status:'PASS'})}catch(e){results.push({name,status:'FAIL',error:e.message})}}
const ids=a=>a.map(s=>Number(s[1])).sort((a,b)=>a-b).join(',');
test('AMQ mode returns only audio-qualified AMQ songs',()=>assert.equal(ids(ctx.songPoolForModeV857('amq')),'101,102'));
test('EMQ mode returns only EMQ songs',()=>assert.equal(ids(ctx.songPoolForModeV857('emq')),'201,202'));
test('MIX pool combines both sources without duplicating IDs',()=>assert.equal(ids(ctx.songPoolForModeV857('mixed')),'101,102,201,202'));
test('song blacklist applies to AMQ and EMQ',()=>{blackSongs.add('101');blackSongs.add('202');assert.equal(ids(ctx.songPoolForModeV857('mixed')),'102,201');blackSongs.clear()});
test('work blacklist applies to AMQ and EMQ',()=>{blackWorks.add('10');blackWorks.add('21');assert.equal(ids(ctx.songPoolForModeV857('mixed')),'102,201');blackWorks.clear()});
test('missing audio excludes AMQ song',()=>assert(!ctx.songPoolForModeV857('amq').some(s=>Number(s[1])===103)));
test('audio-unavailable marker excludes matching audio signature',()=>{ctx.markAudioUnavailableV857(amqRows[0],'test');assert(!ctx.songPoolForModeV857('amq').some(s=>Number(s[1])===101))});
test('changed audio signature clears stale unavailable marker',()=>{amqRows[0][9]='new.mp3';assert(ctx.songPoolForModeV857('amq').some(s=>Number(s[1])===101));amqRows[0][9]='x.mp3'});
test('EMQ not-ready excludes EMQ rows',()=>{ctx.window.__aniEmqAPI.ready=false;assert.equal(ids(ctx.songPoolForModeV857('mixed')),'101,102');ctx.window.__aniEmqAPI.ready=true});
test('empty source falls back to available source in mixed randomSong',()=>{ctx.songs=[];const s=ctx.randomSong('mixed');assert(s&&[201,202].includes(Number(s[1])));ctx.songs=amqRows});
test('no eligible source returns null',()=>{const oldSongs=ctx.songs,oldReady=ctx.window.__aniEmqAPI.ready;ctx.songs=[];ctx.window.__aniEmqAPI.ready=false;assert.equal(ctx.randomSong('mixed'),null);ctx.songs=oldSongs;ctx.window.__aniEmqAPI.ready=oldReady});
const failed=results.filter(x=>x.status!=='PASS');console.log(JSON.stringify({candidate:'Candidate302',suite:'Stage 4 source-pool/audio/blacklist synthetic tests',total:results.length,passed:results.length-failed.length,failed:failed.length,results},null,2));if(failed.length)process.exit(1);
