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
  stage.classList.add('view-catalog');
  stage.innerHTML=`<aside class="p32-info" aria-label="目前選取歌曲資訊">
    <header class="p32-panel-head"><small>SELECTED TRACK</small><span class="p32-live-dot"></span></header>
    <div class="p32-song-label">目前選取歌曲</div>
    <h2 id="p32SongTitle">尚未選取歌曲</h2>
    <p id="p32SongMeta">開啟作品後選取歌曲列，這裡會顯示真實歌曲資料。</p>
    <div class="p32-divider"></div>
    <div class="p32-stat"><span>實際播放次數</span><strong id="p32PlayCount">尚無播放紀錄</strong></div>
    <div class="p32-stat"><span>最近一次答錯</span><strong id="p32LastWrong">尚無錯題紀錄</strong></div>
    <div class="p32-info-foot"><span>AMQ / EMQ</span><span id="p32Source">等待選曲</span></div>
  </aside>
  <section class="p32-scene" aria-label="選曲主視覺">
    <div class="p32-scene-top"><span>NOW SELECTED</span><i></i><span id="p32Mode">AMQ LIBRARY</span></div>
    <div class="p32-scene-image" id="p32SceneImage" aria-hidden="true"></div>
    <div class="p32-scene-content">
      <small id="p32WorkEyebrow">ANIME MUSIC / VISUAL NOVEL</small>
      <h1 id="p32WorkTitle">選擇一部作品</h1>
      <p id="p32WorkMeta">從右側曲庫選取作品，查看歌曲與既有播放紀錄。</p>
    </div>
    <div class="p32-scene-bottom"><span>SONG SELECT</span><span id="p32Items">等待曲庫資料</span></div>
  </section>
  <section class="p32-catalog" aria-label="動畫與 VN 曲庫">
    <header class="p32-catalog-head"><div><small>TRACK BROWSER</small><h2>動畫 / VN 曲庫</h2></div><span class="p32-catalog-mark">≡</span></header>
    <div id="p32Mount"></div>
  </section>`;
  const anchor=modes.parentElement;anchor.insertBefore(stage,modes);
  const mount=stage.querySelector('#p32Mount');const toolbar=$('.toolbar.view-catalog'),catalogHead=$('.head.view-catalog');if(toolbar){
    mount.append(toolbar);
    toolbar.style.setProperty('display','grid','important');toolbar.style.setProperty('grid-template-columns','repeat(2,minmax(0,1fr))','important');toolbar.style.setProperty('width','100%','important');toolbar.style.setProperty('min-width','0','important');toolbar.style.setProperty('max-width','100%','important');
    const searchWrap=toolbar.querySelector('.search');if(searchWrap){searchWrap.style.setProperty('grid-column','1/-1','important');searchWrap.style.setProperty('width','100%','important');searchWrap.style.setProperty('min-width','0','important');searchWrap.style.setProperty('max-width','100%','important');}
    toolbar.querySelectorAll('input,select').forEach(control=>{control.style.setProperty('width','100%','important');control.style.setProperty('min-width','0','important');control.style.setProperty('max-width','100%','important');control.style.setProperty('box-sizing','border-box','important')});
  }else if(search)mount.append(search);mount.append(modes,tabs);if(catalogHead)mount.append(catalogHead);mount.append(grid);
  for(const id of ['gridCounter','empty','loadMoreWrap','quicktools']){const n=document.getElementById(id);if(n)mount.append(n)}

  const style32=document.createElement('style');style32.id='amq-proto32-song-select-css';
  style32.textContent=`
  #amqSongSelectStage{display:grid;grid-template-columns:minmax(245px,29%) minmax(280px,1fr) minmax(330px,36%);gap:8px;width:100%;max-width:none;margin:8px 0 105px;padding:0;color:#f4f5fa;isolation:isolate}
  #amqSongSelectStage *{box-sizing:border-box}
  #amqSongSelectStage .p32-info,#amqSongSelectStage .p32-scene,#amqSongSelectStage .p32-catalog{position:relative;min-width:0;min-height:590px;overflow:hidden;border:1px solid rgba(214,225,245,.18);box-shadow:0 8px 28px rgba(0,0,0,.22)}
  #amqSongSelectStage .p32-info{display:flex;flex-direction:column;padding:20px;background:linear-gradient(180deg,rgba(13,19,31,.93),rgba(13,17,27,.78));backdrop-filter:blur(8px)}
  #amqSongSelectStage .p32-panel-head{display:flex;align-items:center;gap:9px;padding-bottom:14px;border-bottom:1px solid rgba(220,230,250,.16);font-size:9px;letter-spacing:.18em;color:#b9c9df;font-weight:800}
  #amqSongSelectStage .p32-live-dot{width:6px;height:6px;border-radius:50%;background:#e95c9c;box-shadow:0 0 10px #e95c9c;margin-left:auto}
  #amqSongSelectStage .p32-song-label{margin-top:25px;color:#c5cede;font-size:11px;letter-spacing:.1em}
  #amqSongSelectStage #p32SongTitle{margin:9px 0 8px;font-size:clamp(20px,2vw,28px);line-height:1.22;overflow-wrap:anywhere}
  #amqSongSelectStage #p32SongMeta{margin:0;color:#aebbd0;font-size:12px;line-height:1.65;overflow-wrap:anywhere}
  #amqSongSelectStage .p32-divider{height:1px;background:rgba(220,230,250,.16);margin:24px 0 6px}
  #amqSongSelectStage .p32-stat{display:flex;flex-direction:column;gap:8px;padding:16px 0;border-bottom:1px solid rgba(220,230,250,.12)}
  #amqSongSelectStage .p32-stat>span{font-size:10px;color:#aab9cf;letter-spacing:.06em}
  #amqSongSelectStage .p32-stat>strong{font-size:13px;line-height:1.6;font-weight:650;overflow-wrap:anywhere;color:#f2f4fb}
  #amqSongSelectStage .p32-info-foot{display:flex;justify-content:space-between;gap:8px;margin-top:auto;padding-top:18px;color:#9ba9bf;font-size:9px;letter-spacing:.1em}
  #amqSongSelectStage .p32-scene{display:flex;flex-direction:column;padding:22px;background:linear-gradient(135deg,rgba(16,22,34,.72),rgba(22,18,35,.44)),radial-gradient(ellipse at 48% 42%,rgba(94,85,130,.45),rgba(21,27,42,.62) 64%,rgba(11,15,24,.78));}
  body.amq-custom-bg-active[data-amq-scene="catalog"] #amqSongSelectStage .p32-scene{background:linear-gradient(135deg,rgba(10,14,24,.48),rgba(19,15,30,.38));backdrop-filter:blur(2px)}
  #amqSongSelectStage .p32-scene-top{position:relative;z-index:2;display:flex;align-items:center;gap:12px;font-size:9px;letter-spacing:.17em;font-weight:800;color:#c5d0e2}
  #amqSongSelectStage .p32-scene-top i{height:1px;flex:1;background:linear-gradient(90deg,#df5d9e,rgba(223,93,158,0))}
  #amqSongSelectStage .p32-scene-image{position:absolute;inset:0;z-index:0;background-position:center;background-size:cover;opacity:.17;filter:saturate(.7);mask-image:linear-gradient(180deg,transparent 0%,#000 25%,#000 75%,transparent 100%)}
  #amqSongSelectStage .p32-scene-content{position:relative;z-index:1;display:flex;flex-direction:column;justify-content:center;flex:1;min-height:390px;padding:32px 8px}
  #amqSongSelectStage .p32-scene-content small{font-size:9px;letter-spacing:.2em;color:#d1b5d2;font-weight:800}
  #amqSongSelectStage #p32WorkTitle{max-width:100%;margin:16px 0 10px;font-size:clamp(30px,3.5vw,52px);line-height:1.04;letter-spacing:-.035em;overflow-wrap:anywhere;text-shadow:0 3px 24px rgba(0,0,0,.55)}
  #amqSongSelectStage #p32WorkMeta{max-width:440px;margin:0;color:#d0d8e7;font-size:13px;line-height:1.8;text-shadow:0 2px 12px rgba(0,0,0,.7)}
  #amqSongSelectStage .p32-scene-bottom{position:relative;z-index:1;display:flex;justify-content:space-between;gap:10px;padding-top:14px;border-top:1px solid rgba(230,238,255,.2);color:#b7c4d9;font-size:9px;letter-spacing:.14em}
  #amqSongSelectStage .p32-catalog{padding:14px 12px 18px;background:linear-gradient(180deg,rgba(12,17,28,.86),rgba(12,16,25,.72));backdrop-filter:blur(9px)}
  #amqSongSelectStage .p32-catalog-head{display:flex;justify-content:space-between;align-items:center;padding:1px 0 13px;border-bottom:1px solid rgba(220,230,250,.16);margin-bottom:12px}
  #amqSongSelectStage .p32-catalog-head small{font-size:9px;letter-spacing:.16em;color:#aebbd0;font-weight:800}
  #amqSongSelectStage .p32-catalog-head h2{margin:5px 0 0;font-size:19px;letter-spacing:.01em}
  #amqSongSelectStage .p32-catalog-mark{font-size:25px;color:#e768a7}
  #amqSongSelectStage #p32Mount{display:flex;flex-direction:column;gap:9px;min-width:0}
  #amqSongSelectStage .toolbar.view-catalog{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:6px;margin:0;padding:0;background:transparent;border:0}
  #amqSongSelectStage .toolbar.view-catalog .search{grid-column:1/-1;min-width:0!important;width:100%!important;max-width:100%!important;flex:initial!important}
  #amqSongSelectStage .toolbar.view-catalog .search input,#amqSongSelectStage #search{display:block;width:100%!important;min-width:0!important;max-width:100%!important;box-sizing:border-box;margin:0;padding:10px 11px;background:rgba(9,14,24,.48);border:1px solid rgba(199,215,240,.24);border-radius:2px;color:#f4f6fb;outline:none}
  #amqSongSelectStage #search:focus{border-color:#e768a7;box-shadow:0 0 0 1px rgba(231,104,167,.2)}
  #amqSongSelectStage #search::placeholder{color:#94a3b9}
  #amqSongSelectStage .toolbar.view-catalog select{width:100%!important;min-width:0!important;max-width:100%!important;box-sizing:border-box;padding:8px 6px;background:rgba(12,18,29,.7);border:1px solid rgba(199,215,240,.2);color:#dce4f1;font-size:10px}
  #amqSongSelectStage #proto26SongModes{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:4px;margin:0;padding:0;background:transparent;border:0}
  #amqSongSelectStage #proto26SongModes .p26-label{grid-column:1/-1;font-size:9px;letter-spacing:.16em;color:#aebbd0;font-weight:800;margin-bottom:2px}
  #amqSongSelectStage #proto26SongModes button{padding:8px 2px;border:1px solid rgba(199,215,240,.22);border-radius:2px;background:rgba(20,28,43,.8);color:#dbe4f1;font-size:10px;font-weight:800;cursor:pointer}
  #amqSongSelectStage #proto26SongModes button[aria-pressed="true"]{background:#bd4e86;border-color:#e98ab8;color:#fff}
  #amqSongSelectStage .tabs.view-catalog{display:flex;flex-wrap:wrap;gap:4px;margin:0;padding:0}
  #amqSongSelectStage .tabs.view-catalog .tab{padding:7px 8px;background:rgba(15,22,34,.65);border:1px solid rgba(199,215,240,.17);border-radius:2px;color:#d2dbea;font-size:10px}
  #amqSongSelectStage .tabs.view-catalog .tab.active{background:rgba(218,82,147,.88);border-color:#ed8abc;color:#fff}
  #amqSongSelectStage .head.view-catalog{display:flex;justify-content:space-between;align-items:center;gap:8px;margin:0;padding:0;background:transparent;border:0}
  #amqSongSelectStage .head.view-catalog h3{margin:0;font-size:12px;color:#edf2fb}
  #amqSongSelectStage .head.view-catalog p{display:none}
  #amqSongSelectStage .head.view-catalog .catalogHeadTools{display:flex;align-items:center;gap:6px}
  #amqSongSelectStage .head.view-catalog .result{font-size:10px;color:#aebbd0}
  #amqSongSelectStage #grid{display:flex!important;flex-direction:column;gap:5px;width:100%!important;max-height:440px;overflow:auto;padding:1px 3px 2px 1px;margin:0!important;grid-template-columns:none!important;background:transparent}
  #amqSongSelectStage #grid>.card,#amqSongSelectStage #grid>.p26-work-card{display:flex;flex-direction:row;align-items:center;gap:10px;width:100%;min-height:62px;padding:7px 8px;background:rgba(24,31,45,.78);border:1px solid rgba(201,215,239,.18);border-radius:2px;color:#e8edf6;text-align:left;box-shadow:none;cursor:pointer}
  #amqSongSelectStage #grid>.card:hover,#amqSongSelectStage #grid>.p26-work-card:hover{border-color:#e768a7;background:rgba(48,39,59,.88)}
  #amqSongSelectStage #grid>.card img,#amqSongSelectStage #grid>.card .cover,#amqSongSelectStage #grid>.p26-work-card .p26-work-mark{flex:0 0 54px;width:54px;height:54px;object-fit:cover}
  #amqSongSelectStage #grid>.card .cardbody{min-width:0;flex:1}
  #amqSongSelectStage #grid>.card .cardtitle,#amqSongSelectStage #grid>.p26-work-card .p26-work-title{font-size:12px;line-height:1.35;overflow-wrap:anywhere}
  #amqSongSelectStage #grid>.card .sub,#amqSongSelectStage #grid>.p26-work-card .p26-work-sub{font-size:10px;color:#b4c0d2;line-height:1.4}
  #amqSongSelectStage #grid>.card .cardfoot,#amqSongSelectStage #grid>.card .tinybar{display:none}
  #amqSongSelectStage #gridCounter,#amqSongSelectStage #resultCount{color:#9ca8bc;font-size:10px}
  #amqSongSelectStage body[data-amq-workspace-mode="lists"]{display:none}
  body[data-amq-workspace-mode="lists"] #amqSongSelectStage,body[data-amq-workspace-mode="learning"] #amqSongSelectStage,body[data-amq-workspace-mode="analysis"] #amqSongSelectStage{display:none}
  @media(max-width:1120px){#amqSongSelectStage{grid-template-columns:minmax(170px,24%) minmax(180px,1fr) minmax(250px,32%);gap:6px}#amqSongSelectStage .p32-info{padding:14px}#amqSongSelectStage .p32-scene{padding:16px}#amqSongSelectStage .p32-catalog{padding:12px 8px}}
  @media(max-width:900px){#amqSongSelectStage{grid-template-columns:minmax(0,1fr);gap:8px;margin-bottom:145px}#amqSongSelectStage .p32-info{min-height:0;padding:14px}#amqSongSelectStage .p32-song-label{margin-top:12px}#amqSongSelectStage .p32-divider{margin:12px 0 4px}#amqSongSelectStage .p32-stat{padding:10px 0}#amqSongSelectStage .p32-scene{min-height:330px;padding:15px}#amqSongSelectStage .p32-scene-content{min-height:220px;padding:24px 4px}#amqSongSelectStage #p32WorkTitle{font-size:34px}#amqSongSelectStage .p32-catalog{min-height:0}#amqSongSelectStage #grid{max-height:420px}}
  `;
  document.head.append(style32);
  const fitStageToViewport=()=>{
    if(!stage.isConnected)return;
    const left=Math.max(0,stage.getBoundingClientRect().left);
    const width=Math.max(0,window.innerWidth-left);
    stage.style.setProperty('width',width+'px','important');
    stage.style.setProperty('max-width','100vw','important');
  };
  window.addEventListener('resize',fitStageToViewport,{passive:true});
  window.addEventListener('resize',()=>setTimeout(fitStageToViewport,80),{passive:true});
  const stageFitObserver=new ResizeObserver(fitStageToViewport);if(stage.parentElement)stageFitObserver.observe(stage.parentElement);const workspaceSidebar=document.getElementById('amqWorkspaceSidebar');if(workspaceSidebar)stageFitObserver.observe(workspaceSidebar);
  document.getElementById('amqWorkspaceDock')?.addEventListener('click',()=>window.requestAnimationFrame(fitStageToViewport));
  new MutationObserver(()=>window.requestAnimationFrame(fitStageToViewport)).observe(document.body,{attributes:true,attributeFilter:['class','data-amq-workspace-mode']});
  window.requestAnimationFrame(fitStageToViewport);
  let selectedSongId=null;
  const updateP32=()=>{const n=grid.querySelectorAll('.card,.p26-work-card').length;const c=$('#gridCounter')?.textContent?.trim()||n+' 個目前顯示項目';$('#p32Items').textContent=c;$('#p32Mode').textContent=mode.toUpperCase()+' LIBRARY'};
  function updateSelectedSongInfo(id,row){
    selectedSongId=id==null?null:String(id);
    const api=window.__aniHistoryAPIv51;
    if(!selectedSongId){$('#p32SongTitle').textContent='尚未選取歌曲';$('#p32SongMeta').textContent='開啟作品後選取歌曲列，這裡會顯示真實歌曲資料。';$('#p32PlayCount').textContent='尚無播放紀錄';$('#p32LastWrong').textContent='尚無錯題紀錄';$('#p32Source').textContent='等待選曲';return}
    const song=api?.getSong?.(selectedSongId);
    const title=row?.querySelector('.songname')?.textContent?.trim()||song?.[4]||'歌曲資料暫不可用';
    const meta=row?.querySelector('.songmeta')?.textContent?.trim()||[song?.[5]||'',song?('歌曲類型 '+song[2]):''].filter(Boolean).join(' · ')||'歌曲基本資料不完整';
    $('#p32SongTitle').textContent=title;$('#p32SongMeta').textContent=meta;
    const snapshot=api?.getPersonalSnapshot?.(),play=snapshot?.playHistory?.[selectedSongId];
    $('#p32PlayCount').textContent=play&&Number(play.count)>0?Number(play.count).toLocaleString()+' 次':'尚無播放紀錄';
    const history=api?.getHistory?.()||[];
    const wrong=history.filter(entry=>String(entry?.songId)===selectedSongId&&entry?.correct===false).sort((a,b)=>(Date.parse(b?.at)||0)-(Date.parse(a?.at)||0))[0];
    const summary=api?.getSongHistorySummary?.(selectedSongId);
    if(wrong){const when=wrong.at?new Date(wrong.at).toLocaleString():'時間未記錄';$('#p32LastWrong').textContent=when+' · 作答：'+(String(wrong.answer||'').trim()||'答案未記錄')}
    else if(Number(summary?.wrong)>0)$('#p32LastWrong').textContent='有錯題統計，但詳細紀錄目前不可用';
    else $('#p32LastWrong').textContent='尚無錯題紀錄';
    $('#p32Source').textContent=window.__aniEmqAPI?.isSong?.(selectedSongId)?'EMQ':'AMQ';
  }
  stage.querySelectorAll('[data-p32-jump]').forEach(b=>b.addEventListener('click',()=>{if(b.dataset.p32Jump==='artists')activate('singer');else activate('amq')}));
  grid.addEventListener('click',e=>{
    const c=e.target.closest('.card,.p26-work-card');if(!c)return;
    $('#p32WorkTitle').textContent=c.querySelector('.p26-work-title,.title,h3,.name,[class*="title"]')?.textContent?.trim()||c.textContent.trim().split('\n').map(v=>v.trim()).filter(Boolean)[0]||'已選取作品';
    $('#p32WorkMeta').textContent='已選取作品。開啟作品後可從歌曲列查看實際播放次數與最近錯題紀錄。';
    const img=c.querySelector('img');const sceneImage=$('#p32SceneImage');
    if(sceneImage){const url=img?.currentSrc||img?.src||'';sceneImage.style.backgroundImage=url?'linear-gradient(rgba(12,16,27,.45),rgba(12,16,27,.45)),url("'+url.replaceAll('"','%22')+'")':'none'}
    updateSelectedSongInfo(null);
  });
  $('#songlist')?.addEventListener('click',event=>{const row=event.target.closest?.('.songrow');if(row?.dataset?.id)updateSelectedSongInfo(row.dataset.id,row)});
  document.addEventListener('ani-song-playback-recorded-v80',event=>{if(selectedSongId&&String(event.detail?.songId)===selectedSongId)updateSelectedSongInfo(selectedSongId)});
  new MutationObserver(updateP32).observe(grid,{childList:true,subtree:true});updateP32();

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
  // Keep the catalog controls reachable when the desktop detail drawer is open.
  document.addEventListener('keydown',event=>{
    if(event.key!=='Escape'||!overlay.classList.contains('open'))return;
    overlay.classList.remove('open');
    document.body.style.overflow='';
  });
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
  window.__amqProto26SongSelect={version:'proto32.1',getMode:()=>mode,getEmqWorkCount:()=>emqWorks.length,activate};
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
