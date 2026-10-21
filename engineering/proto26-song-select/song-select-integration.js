/* Proto26 Song Select integration, source kept separate for reproducible single-file builds. */
(() => {
  'use strict';
  if (window.__amqProto26SongSelect) return;
  const $ = (s, r=document) => r.querySelector(s);
  const $$ = (s, r=document) => [...r.querySelectorAll(s)];
  const grid=$('#grid'), tabs=$('.tabs.view-catalog'), search=$('#search'), overlay=$('#overlay');
  const api=window.__aniEmqAPI;
  if(!grid || !tabs || !overlay || !api || typeof api.getWorks!=='function') {
    document.documentElement.dataset.proto26Init='missing-dependency';
    return;
  }
  const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  let mode='amq', emqWorks=[];
  // EMQ data is decompressed asynchronously by the existing v82.48 loader.
  // getWorks() deliberately returns [] until api.ready becomes true, so do not snapshot it once at startup.
  const readEmqWorks=()=>{try{emqWorks=api.getWorks()||[];return emqWorks.length;}catch(e){console.error('[Proto26] getWorks failed',e);return 0;}};
  readEmqWorks();
  const style=document.createElement('style');
  style.id='amq-proto26-song-select-css';
  style.textContent=`
    #proto26SongModes{display:flex;gap:8px;align-items:center;flex-wrap:wrap;margin:8px 0 14px;padding:10px 12px;background:#171b25;border:1px solid #394151;border-radius:8px}
    /* Default Song Select has no left workspace panel, so release the legacy reserved sidebar padding. */
    body.amq-workspace-prototype.amq-workspace-active:not([data-amq-workspace-mode]){padding-left:0!important}
    /* Song Select is the default browsing surface; home hero and batch tools must not leak into it. */
    body.amq-workspace-active .view-home{display:none!important}
    body.amq-workspace-active:not([data-amq-workspace-mode]) #quicktools{display:none!important}
    body.amq-workspace-active:not([data-amq-workspace-mode]) #amqWorkspaceSidebar{display:none!important}
    /* The four dock modes are panels within Song Select, not separate app pages. */
    body[data-amq-workspace-mode="lists"] .view-catalog,
    body[data-amq-workspace-mode="learning"] .view-catalog,
    body[data-amq-workspace-mode="analysis"] .view-catalog{display:none!important}
    body[data-amq-workspace-mode="lists"] #watchlistView,
    body[data-amq-workspace-mode="learning"] #learningPlanPanel,
    body[data-amq-workspace-mode="analysis"] #dashboardPanel{display:block!important;min-width:0;width:100%;box-sizing:border-box}
    body[data-amq-workspace-mode="lists"] #dashboardPanel,
    body[data-amq-workspace-mode="lists"] #learningPlanPanel,
    body[data-amq-workspace-mode="learning"] #watchlistView,
    body[data-amq-workspace-mode="learning"] #dashboardPanel,
    body[data-amq-workspace-mode="analysis"] #watchlistView,
    body[data-amq-workspace-mode="analysis"] #learningPlanPanel{display:none!important}
    body[data-amq-workspace-mode="batch"] #watchlistView,
    body[data-amq-workspace-mode="batch"] #dashboardPanel,
    body[data-amq-workspace-mode="batch"] #learningPlanPanel{display:none!important}
    #proto26SongModes .p26-label{font-size:11px;letter-spacing:.12em;color:#9da8bb;font-weight:800;margin-right:4px}
    #proto26SongModes button{border:1px solid #4b566a;background:#242b39;color:#e5e9f2;border-radius:4px;padding:8px 15px;font-weight:800;cursor:pointer}
    #proto26SongModes button[aria-pressed="true"]{background:#344a70;border-color:#86a9e8;color:#fff}
    #grid.proto26-emq-grid{grid-template-columns:repeat(2,minmax(0,1fr));align-content:start}
    #grid.proto26-emq-grid .p26-work-card{display:flex;min-height:100px;align-items:stretch;gap:12px;padding:12px;background:#202632;border:1px solid #3a4352;border-radius:5px;color:#e8edf6;cursor:pointer;text-align:left}
    #grid.proto26-emq-grid .p26-work-card:hover{border-color:#83a9e8;background:#293346}
    #grid.proto26-emq-grid .p26-work-mark{display:flex;align-items:center;justify-content:center;flex:0 0 54px;background:#303a4d;color:#9dbdf1;font-size:23px;font-weight:900}
    #grid.proto26-emq-grid .p26-work-copy{min-width:0;display:flex;flex-direction:column;gap:6px}
    #grid.proto26-emq-grid .p26-work-title{font-size:14px;font-weight:800;line-height:1.35;overflow-wrap:anywhere}
    #grid.proto26-emq-grid .p26-work-sub{font-size:11px;color:#aeb9cb}
    #grid.proto26-emq-grid .p26-work-count{margin-top:auto;font-size:11px;color:#a4c2f4}
    @media(min-width:901px){
      body:has(#overlay.open){overflow:auto!important}
      body:has(#overlay.open) #grid{width:calc(100% - min(470px,37vw) - 36px)!important;margin-left:0!important;margin-right:auto!important;grid-template-columns:repeat(2,minmax(0,1fr))!important}
      body:has(#overlay.open) .wrap .view-catalog:not(#grid),body:has(#overlay.open) .wrap #quicktools{width:calc(100% - min(470px,37vw) - 36px)!important;max-width:none!important;margin-left:0!important;margin-right:auto!important;box-sizing:border-box!important}
      body:has(#overlay.open) #overlay.open{position:fixed!important;inset:0!important;display:block!important;padding:0!important;background:transparent!important;backdrop-filter:none!important;pointer-events:none!important;z-index:40!important;align-items:stretch!important;justify-content:stretch!important}
      body:has(#overlay.open) #overlay.open .drawer{display:flex!important;flex-direction:column!important;grid-template-columns:minmax(0,1fr)!important;grid-template-rows:auto auto minmax(0,1fr)!important;position:fixed!important;left:auto!important;right:18px!important;top:96px!important;bottom:86px!important;width:min(470px,37vw)!important;max-width:none!important;height:auto!important;max-height:none!important;min-height:0!important;overflow:auto!important;border-radius:6px!important;border:1px solid #5b667a!important;background:#202632!important;color:#e8edf6!important;box-shadow:0 12px 40px #0009!important;pointer-events:auto!important}
      body:has(#overlay.open) #overlay.open .drawerhead{grid-column:auto!important;grid-row:auto!important;min-height:0!important;overflow:visible!important;padding:12px!important;background:#2b3444!important;border:0!important;border-bottom:1px solid #465064!important;color:#f1f4fa!important}
      body:has(#overlay.open) #overlay.open .drawerhead .close{display:none!important}
      body:has(#overlay.open) #overlay.open .playerbar{grid-column:auto!important;grid-row:auto!important;min-width:0!important}
      body:has(#overlay.open) #overlay.open .songlist{grid-column:auto!important;grid-row:auto!important;min-height:0!important;overflow:auto!important;background:#211a24!important}
      body:has(#overlay.open) #overlay.open .songrow{background:#252d3a!important;border-color:#414c5f!important;color:#edf1f8!important}
      body:has(#overlay.open) #overlay.open .songmeta{color:#b3bfd1!important}
    }
    @media(max-width:900px){
      #grid.proto26-emq-grid{grid-template-columns:1fr}
      body:has(#overlay.open) #overlay.open{display:flex!important;position:fixed!important;inset:0!important;padding:12px!important;background:#111a2bdd!important;backdrop-filter:blur(6px)!important;pointer-events:auto!important;align-items:center!important;justify-content:center!important}
      body:has(#overlay.open) #overlay.open .drawer{display:grid!important;grid-template-columns:minmax(0,1fr)!important;grid-template-rows:auto auto minmax(180px,1fr)!important;position:relative!important;inset:auto!important;left:auto!important;right:auto!important;top:auto!important;bottom:auto!important;width:100%!important;max-width:100%!important;height:auto!important;max-height:94vh!important;max-height:94dvh!important;min-height:0!important;overflow:auto!important;border-radius:12px!important;background:#202632!important}
      body:has(#overlay.open) #overlay.open .drawerhead{grid-column:1!important;grid-row:1!important;max-height:34vh!important;overflow:auto!important;padding:12px!important;border-right:0!important;border-bottom:1px solid #465064!important}
      body:has(#overlay.open) #overlay.open .playerbar{grid-column:1!important;grid-row:2!important}
      body:has(#overlay.open) #overlay.open .songlist{grid-column:1!important;grid-row:3!important;min-height:180px!important}
      body:has(#overlay.open) #overlay.open .drawerhead .close{display:block!important;position:sticky!important;float:right!important;top:8px!important;right:auto!important;z-index:2!important;background:#313b4d!important;border-color:#59667c!important;color:#fff!important}
    }
  `;
  document.head.append(style);
  // Keep the existing four-workspace shell visible beside Song Select on desktop.
  // The legacy CSS has conflicting responsive overrides, so enforce the active desktop state inline.
  const syncWorkspaceShell=()=>{
    const active=document.body.classList.contains('amq-workspace-active');
    const desktop=window.innerWidth>900;
    const workspaceMode=document.body.dataset.amqWorkspaceMode||'';
    const sidebar=document.getElementById('amqWorkspaceSidebar');
    const dock=document.getElementById('amqWorkspaceDock');
    if(sidebar){
      if(active&&desktop&&workspaceMode)sidebar.style.setProperty('display','block','important');
      else sidebar.style.removeProperty('display');
    }
    if(dock){
      if(active&&desktop)dock.style.setProperty('display','grid','important');
      else dock.style.removeProperty('display');
    }
    for(const button of $$('#amqWorkspaceDock [data-ws]')){
      button.setAttribute('aria-pressed',String(Boolean(workspaceMode)&&button.dataset.ws===workspaceMode));
    }
  };
  syncWorkspaceShell();
  new MutationObserver(syncWorkspaceShell).observe(document.body,{attributes:true,attributeFilter:['class','data-amq-workspace-mode']});
  window.addEventListener('resize',syncWorkspaceShell,{passive:true});

  // Song Select's dock is an internal workspace switch, not four app-level routes.
  // Existing panels and renderers are reused; no business logic or data stores are cloned.
  const workspaceViews={lists:'watchlist',batch:'catalog',learning:'learningPlan',analysis:'dashboard'};
  function setWorkspaceMode(key){
    if(!Object.prototype.hasOwnProperty.call(workspaceViews,key))key='batch';
    const target=workspaceViews[key];
    // Ask the existing router to render each legacy panel, then return to catalog so
    // the application route and persistent Song Select shell stay in one workspace.
    if(key!=='batch'){
      window.__aniNavigateApp?.(target);
      window.__aniNavigateApp?.('catalog');
    }else{
      window.__aniNavigateApp?.('catalog');
    }
    document.body.dataset.amqWorkspaceMode=key;
    const panels={lists:$('#watchlistView'),learning:$('#learningPlanPanel'),analysis:$('#dashboardPanel')};
    for(const [name,panel] of Object.entries(panels)){
      if(!panel)continue;
      panel.classList.toggle('hidden',name!==key);
      panel.setAttribute('aria-hidden',String(name!==key));
    }
    for(const button of $$('#amqWorkspaceDock [data-ws]')){
      button.setAttribute('aria-pressed',String(button.dataset.ws===key));
    }
    document.documentElement.dataset.amqWorkspaceMode=key;
    return key;
  }
  window.__amqSetSongSelectWorkspaceMode=setWorkspaceMode;
  for(const button of $$('#amqWorkspaceDock [data-ws]')){
    button.addEventListener('click',()=>setWorkspaceMode(button.dataset.ws));
  }
  // The legacy workspace action handler invokes existing home-action buttons.
  // While the Song Select shell is active, route those requests into the matching
  // in-place panel instead of leaving Song Select. Learning actions that launch a
  // quiz/practice session still use their original explicit flow.
  document.addEventListener('click',event=>{
    const action=event.target.closest?.('[data-home-action]')?.dataset.homeAction;
    if(!action||!document.body.classList.contains('amq-workspace-active'))return;
    const modes={watchlist:'lists',catalog:'batch',dashboard:'analysis',learningPlan:'learning'};
    if(!modes[action])return;
    event.preventDefault();event.stopPropagation();event.stopImmediatePropagation();
    setWorkspaceMode(modes[action]);
  },true);
  $('#wsReturnHome')?.addEventListener('click',()=>{
    delete document.body.dataset.amqWorkspaceMode;
    delete document.documentElement.dataset.amqWorkspaceMode;
  });

  const modes=document.createElement('nav');
  modes.id='proto26SongModes'; modes.classList.add('view-catalog'); modes.setAttribute('aria-label','曲庫來源');
  modes.innerHTML='<span class="p26-label">SONG SELECT</span><button type="button" data-p26-mode="amq" aria-pressed="true">AMQ</button><button type="button" data-p26-mode="emq" aria-pressed="false">EMQ</button><button type="button" data-p26-mode="mix" aria-pressed="false">MIX</button><button type="button" data-p26-mode="singer" aria-pressed="false">Singer</button>';
  tabs.parentElement.insertBefore(modes,tabs);

  // Proto30: recompose the existing catalog nodes into a three-zone Song Select screen.
  const root=grid.closest('.wrap')||grid.parentElement;
  const stage=document.createElement('section');stage.id='amqSongSelectStage';
  stage.innerHTML='<aside class="p30-rail"><div class="p30-brand"><b>♫</b><span><strong>AMQ</strong><small>SONG SELECT</small></span></div><div class="p30-block"><small>LIBRARY</small><strong id="p30Count">曲庫載入中</strong><p>依目前資料即時更新</p></div><div class="p30-block"><small>BROWSE</small><button data-p30-jump="all">全部歌曲</button><button data-p30-jump="artists">歌手索引</button></div><div class="p30-foot">● 本機曲庫介面</div></aside><section class="p30-feature"><header>NOW BROWSING <i></i><span id="p30Mode">AMQ LIBRARY</span></header><div class="p30-art"><span class="p30-ring"></span><span class="p30-note">♫</span><small>ANIME MUSIC DATABASE</small></div><div class="p30-feature-copy"><small>SELECT A TRACK</small><h2 id="p30Title">選擇一首歌曲</h2><p id="p30Sub">從右側曲庫選取作品，查看歌曲與播放資訊。</p></div><footer><span>AMQ / EMQ</span><span id="p30Items">等待曲庫資料</span></footer></section><section class="p30-catalog"><header><div><small>TRACK BROWSER</small><h2>曲庫</h2></div><b>≡</b></header><div id="p30Mount"></div></section>';
  const anchor=modes.parentElement;anchor.insertBefore(stage,modes);
  const mount=stage.querySelector('#p30Mount');mount.append(modes);if(search)mount.append(search);mount.append(tabs,grid);
  for(const id of ['gridCounter','empty','loadMoreWrap','quicktools']){const n=document.getElementById(id);if(n)mount.append(n)}

  const style30=document.createElement('style');style30.id='amq-proto30-song-select-css';
  style30.textContent=`
  #amqSongSelectStage{display:grid;grid-template-columns:minmax(165px,200px) minmax(230px,1fr) minmax(300px,370px);gap:12px;width:100%;max-width:none;margin:10px 0 95px;color:#f0f3fa}
  #amqSongSelectStage *{box-sizing:border-box}
  #amqSongSelectStage .p30-rail,#amqSongSelectStage .p30-feature,#amqSongSelectStage .p30-catalog{min-width:0;min-height:580px;border:1px solid #343c4b;background:#191e28}
  #amqSongSelectStage .p30-rail{display:flex;flex-direction:column;padding:16px;background:linear-gradient(#1c222e,#151922)}
  #amqSongSelectStage .p30-brand{display:flex;align-items:center;gap:10px;padding-bottom:20px;border-bottom:1px solid #343c4b}
  #amqSongSelectStage .p30-brand>b{display:grid;place-items:center;width:42px;height:42px;background:#d94c8b;font-size:27px;box-shadow:4px 4px #77365f}
  #amqSongSelectStage .p30-brand strong,#amqSongSelectStage .p30-brand small{display:block}#amqSongSelectStage .p30-brand strong{letter-spacing:.14em}#amqSongSelectStage .p30-brand small{font-size:9px;color:#9ca8bb;letter-spacing:.15em}
  #amqSongSelectStage .p30-block{display:flex;flex-direction:column;gap:9px;padding:20px 0;border-bottom:1px solid #343c4b}#amqSongSelectStage .p30-block small,#amqSongSelectStage .p30-feature header,#amqSongSelectStage .p30-feature-copy>small,#amqSongSelectStage .p30-catalog header small{font-size:9px;letter-spacing:.16em;color:#aab5c8;font-weight:800}#amqSongSelectStage .p30-block p{margin:0;font-size:11px;line-height:1.6;color:#9ca8bb}
  #amqSongSelectStage .p30-block button{padding:10px;text-align:left;border:1px solid #394354;background:#222a38;color:#e8edf6;cursor:pointer}#amqSongSelectStage .p30-block button:hover{border-color:#d94c8b}
  #amqSongSelectStage .p30-foot{margin-top:auto;padding-top:20px;color:#91cdb0;font-size:10px}
  #amqSongSelectStage .p30-feature{display:flex;flex-direction:column;padding:20px;overflow:hidden;background:radial-gradient(ellipse at 50% 38%,#3b3449,#252633 40%,#191e28 75%)}
  #amqSongSelectStage .p30-feature header{display:flex;gap:10px;align-items:center}#amqSongSelectStage .p30-feature header i{height:1px;flex:1;background:linear-gradient(90deg,#d94c8b,transparent)}
  #amqSongSelectStage .p30-art{position:relative;display:grid;place-items:center;flex:1;min-height:270px;overflow:hidden}#amqSongSelectStage .p30-ring{position:absolute;width:70%;aspect-ratio:1;border:1px solid #d95a9b66;border-radius:50%;transform:scaleY(.72) rotate(-25deg);box-shadow:0 0 0 22px #d95a9b08}#amqSongSelectStage .p30-note{display:grid;place-items:center;width:clamp(120px,17vw,195px);aspect-ratio:1;border:1px solid #f3a4c966;border-radius:50%;background:radial-gradient(circle at 30% 20%,#f18ab6,#a63d78 38%,#28253b 75%);box-shadow:0 0 60px #d94c8b40;font-size:clamp(64px,9vw,105px);text-shadow:0 4px 22px #35102e}#amqSongSelectStage .p30-art>small{position:absolute;bottom:12px;font-size:9px;letter-spacing:.25em;color:#a7a8c0}
  #amqSongSelectStage .p30-feature-copy{padding:20px 0;border-top:1px solid #ffffff18}#amqSongSelectStage .p30-feature-copy h2{margin:9px 0;font-size:clamp(22px,2.4vw,34px);overflow-wrap:anywhere}#amqSongSelectStage .p30-feature-copy p{font-size:12px;line-height:1.7;color:#aeb8cb}#amqSongSelectStage .p30-feature footer{display:flex;justify-content:space-between;padding-top:12px;border-top:1px solid #ffffff18;font-size:9px;letter-spacing:.1em;color:#a7b1c4}
  #amqSongSelectStage .p30-catalog{padding:14px 12px;overflow:hidden}#amqSongSelectStage .p30-catalog>header{display:flex;justify-content:space-between;align-items:center;padding-bottom:12px;border-bottom:1px solid #343c4b;margin-bottom:12px}#amqSongSelectStage .p30-catalog h2{margin:4px 0 0;font-size:20px}#amqSongSelectStage .p30-catalog>header>b{font-size:25px;color:#d95a9b}#amqSongSelectStage #p30Mount{display:flex;flex-direction:column;gap:9px}
  #amqSongSelectStage #proto26SongModes{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:4px;margin:0;padding:0;background:transparent;border:0}#amqSongSelectStage #proto26SongModes .p26-label{grid-column:1/-1;font-size:9px}#amqSongSelectStage #proto26SongModes button{padding:8px 2px;font-size:10px}
  #amqSongSelectStage #search{width:100%;min-width:0;margin:0;padding:10px;background:#10151e;border:1px solid #3a4353;color:#f0f3fa}#amqSongSelectStage .tabs.view-catalog{display:flex;flex-wrap:wrap;gap:4px;margin:0}#amqSongSelectStage #grid{display:flex!important;flex-direction:column;gap:6px;width:100%!important;max-height:470px;overflow:auto;padding:2px;margin:0!important;grid-template-columns:none!important}
  #amqSongSelectStage #grid>.card,#amqSongSelectStage #grid>.p26-work-card{display:flex;flex-direction:row;align-items:center;gap:9px;width:100%;min-height:62px;padding:8px;background:#222936;border:1px solid #343d4d;border-radius:3px;color:#e7ebf3;text-align:left;box-shadow:none;cursor:pointer}#amqSongSelectStage #grid>.card:hover,#amqSongSelectStage #grid>.p26-work-card:hover{border-color:#d85896;background:#2c2c3b}#amqSongSelectStage #grid>.card img,#amqSongSelectStage #grid>.card .cover,#amqSongSelectStage #grid>.p26-work-card .p26-work-mark{flex:0 0 42px;width:42px;height:42px;object-fit:cover}#amqSongSelectStage #gridCounter{color:#9ca8bc;font-size:10px}
  body[data-amq-workspace-mode="lists"] #amqSongSelectStage,body[data-amq-workspace-mode="learning"] #amqSongSelectStage,body[data-amq-workspace-mode="analysis"] #amqSongSelectStage{display:none}
  @media(max-width:1120px){#amqSongSelectStage{grid-template-columns:150px minmax(210px,1fr) minmax(275px,330px);gap:8px}#amqSongSelectStage .p30-feature{padding:14px}}
  @media(max-width:900px){#amqSongSelectStage{grid-template-columns:minmax(0,1fr);gap:10px;margin-bottom:110px}#amqSongSelectStage .p30-rail{min-height:0;display:grid;grid-template-columns:1fr 1fr;gap:8px;padding:12px}#amqSongSelectStage .p30-brand{grid-column:1/-1;padding-bottom:10px}#amqSongSelectStage .p30-block{padding:8px 0;border:0}#amqSongSelectStage .p30-foot{display:none}#amqSongSelectStage .p30-feature{min-height:400px}#amqSongSelectStage .p30-art{min-height:220px}#amqSongSelectStage .p30-catalog{min-height:400px}#amqSongSelectStage #grid{max-height:420px}}
  `;
  document.head.append(style);
  const updateP30=()=>{const n=grid.querySelectorAll('.card,.p26-work-card').length;const c=$('#gridCounter')?.textContent?.trim()||n+' 個目前顯示項目';$('#p30Count').textContent=c;$('#p30Items').textContent=c;$('#p30Mode').textContent=mode.toUpperCase()+' LIBRARY'};
  stage.querySelectorAll('[data-p30-jump]').forEach(b=>b.addEventListener('click',()=>{if(b.dataset.p30Jump==='artists')activate('singer');else activate('amq')}));
  grid.addEventListener('click',e=>{const c=e.target.closest('.card,.p26-work-card');if(!c)return;$('#p30Title').textContent=c.querySelector('.p26-work-title,.title,h3,.name,[class*="title"]')?.textContent?.trim()||c.textContent.trim().split('\n').map(v=>v.trim()).filter(Boolean)[0]||'已選取作品';$('#p30Sub').textContent='已選取曲庫項目。開啟作品後可查看歌曲與既有播放控制。'});
  new MutationObserver(updateP30).observe(grid,{childList:true,subtree:true});updateP30();

  const getSongs=id=>{try{const a=api.getSongsForWork(id);return Array.isArray(a)?a:[]}catch(e){console.error('[Proto26] getSongsForWork failed',e);return[]}};
  function setButtons(){ $$('[data-p26-mode]',modes).forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.p26Mode===mode))); tabs.classList.toggle('hidden',mode==='emq'||mode==='mix'); grid.classList.toggle('proto26-emq-grid',mode==='emq'||mode==='mix'); }
  function showWork(w){
    const songs=getSongs(w.i??w.id); $('#detailTitle').textContent=w.t||w.n||w.title||'未命名作品';
    $('#detailSub').textContent=[w.n&&w.n!==w.t?w.n:'',w.y||'','EMQ 曲庫'].filter(Boolean).join(' · ');
    const cover=$('#detailCover'); if(cover){cover.removeAttribute('src');cover.classList.remove('ready');cover.style.display='none'}
    $('#detailStats').innerHTML='<span class="pill">'+songs.length+' 首歌曲</span><span class="pill">EMQ 曲庫</span>';
    const box=$('#songlist');box.replaceChildren();
    if(!songs.length)box.innerHTML='<div class="empty">這部作品目前沒有可用歌曲資料。</div>';
    else songs.forEach(s=>{if(typeof window.makeSongRow==='function')box.append(window.makeSongRow(s));});
    overlay.classList.add('open');document.body.style.overflow='hidden';
  }
  function card(w){
    const b=document.createElement('button');b.type='button';b.className='p26-work-card';
    b.innerHTML='<span class="p26-work-mark">♫</span><span class="p26-work-copy"><span class="p26-work-title">'+esc(w.t||w.n||w.title||'未命名作品')+'</span><span class="p26-work-sub">'+esc([w.n&&w.n!==w.t?w.n:'',w.y||'',w.vndbId?'VNDB '+w.vndbId:''].filter(Boolean).join(' · '))+'</span><span class="p26-work-count">EMQ 曲庫作品</span></span>';
    b.addEventListener('click',()=>showWork(w));return b;
  }
  function renderEmq(withAmq){
    if(withAmq){ const modeBeforeRender=mode; mode='amq'; $('[data-tab="all"]')?.click(); mode=modeBeforeRender; }
    const q=(search?.value||'').trim().toLocaleLowerCase();
    const amq=withAmq?[...grid.querySelectorAll('.card')]:[];
    const matched=emqWorks.filter(w=>!q||[w.t,w.n,w.vndbId].some(v=>String(v??'').toLocaleLowerCase().includes(q)));
    grid.replaceChildren();amq.forEach(c=>grid.append(c));matched.slice(0,48).forEach(w=>grid.append(card(w)));
    const counter=$('#gridCounter');if(counter)counter.textContent=(withAmq?amq.length+' 部 AMQ 作品 + ':'')+matched.length+' 部 EMQ 作品';
    $('#loadMoreWrap')?.classList.add('hidden');$('#empty')?.classList.toggle('hidden',amq.length+matched.length>0);setButtons();
  }
  function activate(next){mode=next;if(next==='amq'){setButtons();$('[data-tab="all"]')?.click();$('#loadMoreWrap')?.classList.remove('hidden')}else if(next==='singer'){setButtons();$('[data-tab="artists"]')?.click();$('#loadMoreWrap')?.classList.remove('hidden')}else renderEmq(next==='mix')}
  modes.addEventListener('click',e=>{const b=e.target.closest('[data-p26-mode]');if(b)activate(b.dataset.p26Mode)});
  search?.addEventListener('input',()=>{if(mode==='emq'||mode==='mix')renderEmq(mode==='mix')});
  tabs.addEventListener('click',e=>{const t=e.target.closest('[data-tab]');if(!t||mode==='emq'||mode==='mix')return;mode=t.dataset.tab==='artists'?'singer':'amq';setButtons()});
  window.__amqProto26SongSelect={version:'proto26.8',getMode:()=>mode,getEmqWorkCount:()=>emqWorks.length,activate};
  document.documentElement.dataset.proto26Init='ready';setButtons();
  if(!api.ready){
    const started=Date.now();
    const readinessPoll=window.setInterval(()=>{
      if(api.ready){
        window.clearInterval(readinessPoll);
        readEmqWorks();
        if(mode==='emq'||mode==='mix')renderEmq(mode==='mix');
      }else if(Date.now()-started>=30000){
        window.clearInterval(readinessPoll);
        document.documentElement.dataset.proto26Emq='load-timeout';
      }
    },100);
  }else{readEmqWorks();}
  document.documentElement.dataset.proto26Emq=api.ready?'ready':(emqWorks.length?'ready':'loading');
})();
