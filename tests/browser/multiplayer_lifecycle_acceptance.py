#!/usr/bin/env python3
"""Real-browser multiplayer lifecycle acceptance using deterministic API/WebSocket/media mocks."""
import argparse
import json
from pathlib import Path
from playwright.sync_api import sync_playwright

MOCK_SHIM = r"""<script>(() => {
  const values = new Map();
  const storage = {
    get length(){return values.size;},
    key:i=>[...values.keys()][i]??null,
    getItem:k=>values.has(String(k))?values.get(String(k)):null,
    setItem:(k,v)=>values.set(String(k),String(v)),
    removeItem:k=>values.delete(String(k)),
    clear:()=>values.clear()
  };
  Object.defineProperty(window,'localStorage',{configurable:true,value:storage});
  Object.defineProperty(window,'sessionStorage',{configurable:true,value:storage});
  const question = {
    questionId:'5707', index:1, animeId:'1', animeTitle:'Test Anime',
    animeEnglish:'Test Anime', songTitle:'Test Song', title:'Test Song',
    artist:'Test Artist', secondsRemaining:15,
    audioCandidates:['https://media.invalid/test-song.mp3'], emq:false
  };
  const players = () => [
    {playerId:'p1',playerName:'AMQ Test Host',isHost:true,you:true,online:true,score:0,teamId:'team-1',hasAnswered:false,submittedAnswers:[]},
    {playerId:'p2',playerName:'AMQ Test Partner',isHost:false,you:false,online:true,score:0,teamId:'team-1',hasAnswered:false,submittedAnswers:[]}
  ];
  const clone = x => JSON.parse(JSON.stringify(x));
  const makeState = settings => ({
    roomCode:'AB2345', phase:'waiting', isHost:true, roundNo:1,
    questionIndex:0, questionCount:1, question:null, reveal:null,
    settings:{...(settings||{}),mode:settings?.mode||'team',sourceMode:settings?.sourceMode||'amq',
      questionCount:1,secondsPerQuestion:15,revealSeconds:0,drawMode:'equal',teamSize:2,autoAdvance:false},
    players:players(), teams:[{teamId:'team-1',name:'Team 1',score:0,playerIds:['p1','p2']}],
    teamDrafts:[],ownAnswers:[],teamSubmittedAnswers:[],chatMessages:[],
    finalResults:[],finalTeams:[],lastRound:null,history:[]
  });
  const reply = (data,status=200) => new Response(JSON.stringify(data),{status,headers:{'Content-Type':'application/json'}});
  const mock = {state:null,requests:[],sockets:[],wsMessages:[],media:[],createSettings:null,candidateCount:0,
    releaseReady:null,rejoinCount:0,playCalls:0,pauseCalls:0,delayNextRoomGet:false,releaseRoomGet:null};
  window.__mpMock = mock;
  window.fetch = async (input, init={}) => {
    const url = new URL(typeof input==='string'?input:input.url,location.href);
    const path=url.pathname, method=String(init.method||'GET').toUpperCase();
    let body=null;try{body=init.body?JSON.parse(init.body):null}catch{}
    mock.requests.push({path,method,body});
    if(path==='/api/health')return reply({ok:true,apiVersion:1,roomsInMemory:1});
    if(path==='/api/rooms'&&method==='POST'){
      mock.createSettings=clone(body?.settings||{});
      mock.candidateCount=Array.isArray(body?.candidateSongIds)?body.candidateSongIds.length:0;
      mock.state=makeState(body?.settings);
      return reply({roomCode:'AB2345',playerId:'p1',token:'mock-token-p1',isHost:true});
    }
    if(path==='/api/rooms/AB2345'&&method==='GET'){if(mock.delayNextRoomGet){mock.delayNextRoomGet=false;return new Promise(resolve=>{mock.releaseRoomGet=()=>resolve(reply(clone(mock.state||makeState({mode:'team'}))))})}return reply(clone(mock.state||makeState({mode:'team'})));}
    if(path.endsWith('/candidates'))return reply({ok:true});
    if(path.endsWith('/start')){mock.state.phase='preparing';mock.state.question=clone(question);mock.state.questionIndex=1;return reply({ok:true})}
    if(path.endsWith('/ready'))return new Promise(resolve=>{mock.releaseReady=()=>{mock.state.phase='running';resolve(reply({ok:true}))}})
    if(path.endsWith('/pause')){mock.state.phase='paused';if(mock.state.question)mock.state.question.secondsRemaining=12;return reply({ok:true})}
    if(path.endsWith('/resume')){mock.state.phase='running';return reply({ok:true})}
    if(path.endsWith('/reveal')){mock.state.phase='reveal';mock.state.reveal={...clone(question),correctAnime:'Test Anime',correctArtist:'Test Artist',correctTitle:'Test Song'};return reply({ok:true})}
    if(path.endsWith('/next')){mock.state.phase='finished';mock.state.finalResults=[{playerId:'p1',playerName:'AMQ Test Host',score:100,correct:1},{playerId:'p2',playerName:'AMQ Test Partner',score:0,correct:0}];mock.state.finalTeams=[{teamId:'team-1',name:'Team 1',score:100}];mock.state.lastRound={questionCount:1};return reply({ok:true})}
    if(path.endsWith('/rejoin')){mock.rejoinCount++;mock.state.phase='running';return reply({ok:true})}
    if(path.endsWith('/leave'))return reply({ok:true});
    if(path.endsWith('/heartbeat'))return reply({ok:true});
    if(path.endsWith('/draft'))return reply({ok:true});
    if(path.endsWith('/answers'))return reply({newlySubmittedFields:Object.keys(body?.answers||{})});
    if(path.endsWith('/chat'))return reply({ok:true});
    if(path.endsWith('/lobby')){mock.state.phase='waiting';mock.state.question=null;return reply({ok:true})}
    return reply({ok:true});
  };
  class MockWebSocket {
    static CONNECTING=0; static OPEN=1; static CLOSING=2; static CLOSED=3;
    constructor(url){this.url=String(url);this.readyState=MockWebSocket.CONNECTING;this.sent=[];mock.sockets.push(this);
      setTimeout(()=>{if(this.readyState!==MockWebSocket.CONNECTING)return;this.readyState=MockWebSocket.OPEN;this.onopen?.({type:'open'})},0)}
    send(raw){let message;try{message=JSON.parse(raw)}catch{message={raw}}this.sent.push(message);mock.wsMessages.push(message);
      if(message.type==='auth')queueMicrotask(()=>this.onmessage?.({data:JSON.stringify({type:'live_ready',roomCode:'AB2345',teamId:'team-1',questionIndex:0,teamDrafts:[]})}));
      if(message.type==='draft')queueMicrotask(()=>this.onmessage?.({data:JSON.stringify({type:'draft_ack',ok:true})}));
    }
    close(code=1000,reason=''){this.closeCode=code;this.closeReason=reason;this.readyState=MockWebSocket.CLOSED;this.onclose?.({code,reason})}
  }
  window.WebSocket=MockWebSocket;
})();</script>"""

MEDIA_SHIM = r"""<script>(() => {
  Object.defineProperty(HTMLMediaElement.prototype,'src',{configurable:true,
    get(){return this.__mpTestSrc||'';},set(v){this.__mpTestSrc=String(v||'')}});
  const nativeSet=Element.prototype.setAttribute;
  Element.prototype.setAttribute=function(n,v){if(this instanceof HTMLMediaElement&&String(n).toLowerCase()==='src'){this.src=v;return}return nativeSet.call(this,n,v)};
  const nativeRemove=Element.prototype.removeAttribute;
  Element.prototype.removeAttribute=function(n){if(this instanceof HTMLMediaElement&&String(n).toLowerCase()==='src'){this.src='';return}return nativeRemove.call(this,n)};
  Object.defineProperty(HTMLMediaElement.prototype,'currentTime',{configurable:true,get(){return this.__mpTime||0},set(v){this.__mpTime=Number(v)||0}});
  Object.defineProperty(HTMLMediaElement.prototype,'duration',{configurable:true,get(){return 90}});
  Object.defineProperty(HTMLMediaElement.prototype,'readyState',{configurable:true,get(){return 4}});
  HTMLMediaElement.prototype.load=function(){
    window.__mpMock.media.push(this);
    if(!this.src)return;
    queueMicrotask(()=>{if(!this.src)return;for(const type of ['loadedmetadata','loadeddata','canplay','canplaythrough'])this.dispatchEvent(new Event(type))});
  };
  HTMLMediaElement.prototype.play=function(){
    window.__mpMock.playCalls++;
    try{Object.defineProperty(this,'paused',{configurable:true,value:false})}catch(_){}
    queueMicrotask(()=>this.dispatchEvent(new Event('playing')));
    return Promise.resolve();
  };
  HTMLMediaElement.prototype.pause=function(){
    window.__mpMock.pauseCalls++;
    try{Object.defineProperty(this,'paused',{configurable:true,value:true})}catch(_){}
    this.dispatchEvent(new Event('pause'));
  };
})();</script>"""


def check(condition, message):
    if not condition:
        raise AssertionError(message)
    print("PASS " + message, flush=True)


def make_html(path):
    html=path.read_text(encoding="utf-8")
    pos=html.lower().find("<head>")
    if pos<0:
        raise AssertionError("HTML head element not found")
    at=pos+len("<head>")
    return html[:at]+MOCK_SHIM+MEDIA_SHIM+html[at:]


def main():
    parser=argparse.ArgumentParser()
    parser.add_argument("--html",type=Path,default=Path(__file__).resolve().parents[2]/"dist"/"amq_learning_tool_v82_82.html")
    parser.add_argument("--chromium",default="/usr/bin/chromium")
    args=parser.parse_args()
    html_path=args.html.resolve()
    check(html_path.is_file(),"versioned standalone HTML candidate exists")
    errors=[]
    with sync_playwright() as pw:
        browser=pw.chromium.launch(headless=True,executable_path=args.chromium,args=["--no-sandbox","--disable-dev-shm-usage"])
        try:
            page=browser.new_page()
            page.on("pageerror",lambda exc:errors.append(str(exc)))
            page.route("https://**/*",lambda route:route.abort())
            page.route("http://**/*",lambda route:route.abort())
            page.set_content(make_html(html_path),wait_until="domcontentloaded",timeout=60000)
            page.wait_for_timeout(700)
            check(page.title()=="AMQ學習工具","standalone production application initializes")
            page.evaluate("""() => { window.confirm=()=>true; window.__aniNavigateApp?.('multiplayer'); }""")
            page.locator("#mpApiBase").fill("http://127.0.0.1:8787")
            page.locator("#mpPlayerName").fill("AMQ Test Host")
            page.locator("#mpCreateMode").select_option("team")
            page.locator("#mpCreateQuestions").select_option("5")
            page.locator("#mpCreateSeconds").select_option("15")
            page.locator("#mpCreateReveal").select_option("0")
            page.locator("#mpCreateTeamSize").select_option("2")
            page.locator("#mpCreateRoom").click(timeout=10000)
            page.wait_for_function("window.__mpMock.state?.phase === 'waiting'",timeout=15000)
            check(page.evaluate("window.__mpMock.createSettings?.mode === 'team'"),"room creation sends team-mode settings")
            check(page.evaluate("window.__mpMock.candidateCount > 0"),"room creation sends a non-empty local candidate pool")
            page.wait_for_selector("#mpStart",state="visible",timeout=10000)
            check(page.locator("#mpStart").is_visible(),"host waiting phase exposes the start control")
            page.locator("#mpHostQuestions").select_option("1")
            page.locator("#mpHostSeconds").select_option("15")
            page.locator("#mpHostReveal").select_option("0")
            page.locator("#mpHostMode").select_option("team")
            page.locator("#mpHostTeam").select_option("2")
            page.locator("#mpStart").click(timeout=10000)
            page.wait_for_function("typeof window.__mpMock.releaseReady === 'function'",timeout=15000)
            check("正在準備" in page.locator("#mpRoomStage").inner_text(),"start transitions room into preparing phase")
            page.evaluate("window.__mpMock.releaseReady()")
            page.wait_for_selector("#mpAnswer_title",state="visible",timeout=15000)
            check(page.evaluate("window.__mpMock.state.phase === 'running'"),"audio-ready acknowledgement transitions room into running phase")
            page.wait_for_function("window.__mpMock.wsMessages.some(m=>m.type==='auth')",timeout=10000)
            check(page.evaluate("window.__mpMock.sockets.some(s=>s.readyState===1)"),"team-mode live WebSocket authenticates after running begins")

            page.locator("#mpAnswer_title").fill("Shared draft")
            page.wait_for_function("window.__mpMock.wsMessages.some(m=>m.type==='draft'&&String(m.text||'').includes('Shared draft'))",timeout=5000)
            check(True,"local team answer draft is sent over the live WebSocket")
            page.evaluate("""() => {
              const ws=window.__mpMock.sockets.find(s=>s.readyState===1);
              ws.onmessage({data:JSON.stringify({type:'team_draft',roomCode:'AB2345',teamId:'team-1',questionIndex:0,playerId:'p2',playerName:'AMQ Test Partner',text:'Partner draft'})});
            }""")
            page.wait_for_function("document.querySelector('.mpPlayerCard[data-player-id=\"p2\"] .mpSpeech')?.textContent.includes('Partner draft')",timeout=5000)
            check(True,"incoming team draft updates the partner speech bubble")

            pause_before=page.evaluate("window.__mpMock.pauseCalls")
            page.locator("#mpPause").click(timeout=10000)
            page.wait_for_selector(".mpPausedPane",state="visible",timeout=10000)
            check(page.evaluate("(before) => window.__mpMock.state.phase === 'paused' && window.__mpMock.pauseCalls > before",pause_before),"pause transition pauses active media decks")
            page.locator("#mpResume").click(timeout=10000)
            page.wait_for_function("window.__mpMock.state.phase === 'running'",timeout=10000)
            page.wait_for_selector("#mpAnswer_title",state="visible",timeout=10000)
            check(page.locator("#mpAnswer_title").is_visible(),"resume returns to the same running question")

            pause_before_reveal=page.evaluate("window.__mpMock.pauseCalls")
            page.locator("#mpReveal").click(timeout=10000)
            page.wait_for_selector(".mpRevealPane",state="visible",timeout=10000)
            check(page.evaluate("(before) => window.__mpMock.state.phase === 'reveal' && window.__mpMock.pauseCalls === before",pause_before_reveal),"reveal phase preserves the current audio deck")
            page.locator("#mpNext").click(timeout=10000)
            page.wait_for_selector(".mpFinalPane",state="visible",timeout=10000)
            check(page.evaluate("window.__mpMock.state.phase === 'finished'"),"next transitions the final question into finished phase")

            saved_book=page.evaluate("JSON.parse(localStorage.getItem('aniMultiplayerReconnectV82')||'{}')")
            check(bool(saved_book),"room session persists reconnect credentials before leave")
            leave=page.locator("#mpLeaveTop")
            if not leave.is_visible():
                leave=page.locator("#mpLeaveStopped")
            leave.click(timeout=10000)
            page.wait_for_function("!document.getElementById('mpRoomStage') || document.getElementById('mpRoomStage').classList.contains('hidden')",timeout=10000)
            check(page.evaluate("window.__mpMock.sockets[0]?.readyState === 3 && window.__mpMock.pauseCalls > 0"),"leave closes the live socket and stops multiplayer audio")
            check(page.evaluate("sessionStorage.getItem('aniMultiplayerRoomSessionV2') === null"),"leave clears the active room session")
            check(page.evaluate("Object.keys(JSON.parse(localStorage.getItem('aniMultiplayerReconnectV82')||'{}')).length === 0"),"leave removes the saved reconnect entry")

            page.evaluate("""book => {
              localStorage.setItem('aniMultiplayerReconnectV82',JSON.stringify(book));
              window.__mpMock.state.phase='running';
              document.getElementById('mpRoomCodeInput').value='AB2345';
              document.getElementById('mpPlayerName').value='AMQ Test Host';
            }""",saved_book)
            page.locator("#mpRejoinRoom").click(timeout=10000)
            page.wait_for_function("window.__mpMock.rejoinCount === 1 && window.__mpMock.state.phase === 'running'",timeout=10000)
            page.wait_for_function("window.__mpMock.sockets.length >= 2 && window.__mpMock.wsMessages.filter(m=>m.type==='auth').length >= 2",timeout=10000)
            check(page.locator("#mpAnswer_title").is_visible(),"rejoin restores the running room view")
            check(page.evaluate("window.__mpMock.sockets[0].readyState === 3 && window.__mpMock.sockets[1].readyState === 1"),"rejoin establishes a new live socket after the previous socket was closed")
            page.evaluate("window.__mpMock.delayNextRoomGet=true")
            page.wait_for_function("typeof window.__mpMock.releaseRoomGet === 'function'",timeout=5000)
            leave=page.locator("#mpLeaveTop")
            if not leave.is_visible():
                leave=page.locator("#mpLeaveStopped")
            leave.click(timeout=10000)
            page.wait_for_function("document.getElementById('mpRoomStage').classList.contains('hidden')",timeout=10000)
            check(page.evaluate("window.__mpMock.sockets.every(s=>s.readyState===3)"),"final leave closes every live socket")
            page.evaluate("window.__mpMock.releaseRoomGet()")
            page.wait_for_timeout(200)
            check(page.locator("#mpRoomStage").evaluate("(el)=>el.classList.contains('hidden')"),"late room poll response cannot reopen the room after leave")
            check(page.evaluate("sessionStorage.getItem('aniMultiplayerRoomSessionV2') === null"),"final leave clears rejoined session credentials")
            check(not errors,"no uncaught browser page errors during multiplayer lifecycle acceptance")
            page.close()
        finally:
            browser.close()


if __name__=="__main__":
    main()
