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
      body:has(#overlay.open) #overlay.open .songrow{transition:transform 90ms ease,background-color 90ms ease,border-color 90ms ease}
      body:has(#overlay.open) #overlay.open .songrow:hover:not(.proto26-song-selected){position:relative!important;transform:translateX(-3px)!important;width:calc(100% + 3px)!important;z-index:1!important}
      body:has(#overlay.open) #overlay.open .songrow.proto26-song-selected{position:relative!important;transform:translateX(-6px)!important;width:calc(100% + 6px)!important;z-index:1!important;background:#343043!important;border-color:#e768a7!important;box-shadow:inset 3px 0 #e768a7!important}
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
    const searchWrap=toolbar.querySelector('.search');let filterStrip=toolbar.querySelector('.p26-filter-strip');
    if(!filterStrip){filterStrip=document.createElement('div');filterStrip.className='p26-filter-strip';[...toolbar.children].filter(el=>el!==searchWrap).forEach(el=>filterStrip.append(el));toolbar.append(filterStrip)}
    toolbar.style.setProperty('display','flex','important');toolbar.style.setProperty('flex-direction','column','important');toolbar.style.setProperty('gap','4px','important');toolbar.style.setProperty('padding','0','important');toolbar.style.setProperty('margin','0','important');toolbar.style.setProperty('width','100%','important');toolbar.style.setProperty('min-width','0','important');toolbar.style.setProperty('max-width','100%','important');
    if(searchWrap){searchWrap.style.setProperty('width','100%','important');searchWrap.style.setProperty('min-width','0','important');searchWrap.style.setProperty('max-width','100%','important');searchWrap.style.setProperty('margin','0','important')}
    filterStrip.style.setProperty('display','flex','important');filterStrip.style.setProperty('flex','0 0 28px','important');filterStrip.style.setProperty('flex-wrap','nowrap','important');filterStrip.style.setProperty('gap','4px','important');filterStrip.style.setProperty('width','100%','important');filterStrip.style.setProperty('min-width','0','important');filterStrip.style.setProperty('height','28px','important');filterStrip.style.setProperty('overflow-x','auto','important');filterStrip.style.setProperty('overflow-y','hidden','important');filterStrip.style.setProperty('scrollbar-width','thin','important');
    filterStrip.querySelectorAll('input,select,button').forEach(control=>{control.style.setProperty('flex','0 0 100px','important');control.style.setProperty('width','100px','important');control.style.setProperty('min-width','100px','important');control.style.setProperty('max-width','100px','important');control.style.setProperty('height','28px','important');control.style.setProperty('min-height','28px','important');control.style.setProperty('box-sizing','border-box','important')});
    toolbar.querySelectorAll('input,select').forEach(control=>control.style.setProperty('box-sizing','border-box','important'));
  }else if(search)mount.append(search);const modeTabsRow=document.createElement('div');modeTabsRow.className='p26-mode-tabs-row';modeTabsRow.append(modes,tabs);mount.append(modeTabsRow);if(catalogHead)mount.append(catalogHead);mount.append(grid);
  for(const id of ['gridCounter','empty','loadMoreWrap','quicktools']){const n=document.getElementById(id);if(n)mount.append(n)}

  const style32=document.createElement('style');style32.id='amq-proto32-song-select-css';
  style32.textContent=`
  #amqSongSelectStage{display:grid;grid-template-columns:minmax(245px,29%) minmax(0,1fr);gap:8px;width:100%;max-width:none;margin:0 0 118px;padding:0;color:#f4f5fa;isolation:isolate;height:clamp(380px,calc(100vh - 120px),600px);align-items:stretch}
  #amqSongSelectStage *{box-sizing:border-box}
  #amqSongSelectStage .p32-info,#amqSongSelectStage .p32-scene,#amqSongSelectStage .p32-catalog{position:relative;min-width:0;min-height:0;height:100%;overflow:hidden;border:1px solid rgba(214,225,245,.18);box-shadow:0 8px 28px rgba(0,0,0,.22)}
  #amqSongSelectStage .p32-info{z-index:2}
  #amqSongSelectStage .p32-scene{grid-column:2;border:0;box-shadow:none;z-index:1}
  #amqSongSelectStage .p32-catalog{position:absolute;top:0;right:0;bottom:0;width:44%;height:100%;z-index:3;border-left:1px solid rgba(214,225,245,.2);border-right:0;box-shadow:none;background:linear-gradient(90deg,rgba(12,17,28,.14),rgba(12,16,25,.76));backdrop-filter:blur(3px)}
  #amqSongSelectStage .p32-info{display:flex;flex-direction:column;padding:14px;background:linear-gradient(180deg,rgba(13,19,31,.93),rgba(13,17,27,.78));backdrop-filter:blur(8px)}
  #amqSongSelectStage .p32-panel-head{display:flex;align-items:center;gap:9px;padding-bottom:14px;border-bottom:1px solid rgba(220,230,250,.16);font-size:9px;letter-spacing:.18em;color:#b9c9df;font-weight:800}
  #amqSongSelectStage .p32-live-dot{width:6px;height:6px;border-radius:50%;background:#e95c9c;box-shadow:0 0 10px #e95c9c;margin-left:auto}
  #amqSongSelectStage .p32-song-label{margin-top:16px;color:#c5cede;font-size:11px;letter-spacing:.1em}
  #amqSongSelectStage #p32SongTitle{margin:9px 0 8px;font-size:clamp(20px,2vw,28px);line-height:1.22;overflow-wrap:anywhere}
  #amqSongSelectStage #p32SongMeta{margin:0;color:#aebbd0;font-size:12px;line-height:1.65;overflow-wrap:anywhere}
  #amqSongSelectStage .p32-divider{height:1px;background:rgba(220,230,250,.16);margin:14px 0 4px}
  #amqSongSelectStage .p32-stat{display:flex;flex-direction:column;gap:5px;padding:10px 0;border-bottom:1px solid rgba(220,230,250,.12)}
  #amqSongSelectStage .p32-stat>span{font-size:10px;color:#aab9cf;letter-spacing:.06em}
  #amqSongSelectStage .p32-stat>strong{font-size:13px;line-height:1.6;font-weight:650;overflow-wrap:anywhere;color:#f2f4fb}
  #amqSongSelectStage .p32-info-foot{display:flex;justify-content:space-between;gap:8px;margin-top:auto;padding-top:18px;color:#9ba9bf;font-size:9px;letter-spacing:.1em}
  #amqSongSelectStage .p32-scene{display:flex;flex-direction:column;padding:22px;background:linear-gradient(135deg,rgba(13,17,29,.45),rgba(20,15,33,.35)),radial-gradient(ellipse at 62% 38%,rgba(210,92,158,.23),transparent 42%),radial-gradient(ellipse at 25% 70%,rgba(85,116,184,.22),transparent 48%);}
  body.amq-custom-bg-active[data-amq-scene="catalog"] #amqSongSelectStage .p32-scene{background:linear-gradient(135deg,rgba(10,14,24,.48),rgba(19,15,30,.38));backdrop-filter:blur(2px)}
  #amqSongSelectStage .p32-scene-top{display:none!important}
  #amqSongSelectStage .p32-scene-top i{height:1px;flex:1;background:linear-gradient(90deg,#df5d9e,rgba(223,93,158,0))}
  #amqSongSelectStage .p32-scene-image{position:absolute;inset:0;z-index:0;background-position:center;background-size:cover;opacity:.42;filter:saturate(.9);mask-image:linear-gradient(180deg,rgba(0,0,0,.45) 0%,#000 12%,#000 88%,rgba(0,0,0,.45) 100%)}
  body.amq-custom-bg-active[data-amq-scene="catalog"] #amqSongSelectStage .p32-scene-image{opacity:.08}
  #amqSongSelectStage .p32-scene-content{position:relative;z-index:1;display:flex;flex-direction:column;justify-content:flex-end;align-items:flex-start;flex:1;min-height:0;width:54%;padding:12px 6px 26px}
  #amqSongSelectStage .p32-scene-content small{font-size:9px;letter-spacing:.2em;color:#d1b5d2;font-weight:800}
  #amqSongSelectStage #p32WorkTitle{max-width:100%;margin:7px 0 5px;font-size:clamp(24px,2.5vw,36px);line-height:1.06;letter-spacing:-.025em;overflow-wrap:anywhere;text-shadow:0 3px 24px rgba(0,0,0,.55)}
  #amqSongSelectStage #p32WorkMeta{max-width:440px;margin:0;color:#d0d8e7;font-size:13px;line-height:1.8;text-shadow:0 2px 12px rgba(0,0,0,.7)}
  #amqSongSelectStage .p32-scene-bottom{display:none!important}
  #amqSongSelectStage .p32-catalog{display:flex;flex-direction:column;min-height:0;padding:8px 8px 8px;background:linear-gradient(180deg,rgba(12,17,28,.86),rgba(12,16,25,.72));backdrop-filter:blur(9px)}
  #amqSongSelectStage .p32-catalog-head{display:none!important}
  #amqSongSelectStage .p32-catalog-head small{font-size:9px;letter-spacing:.16em;color:#aebbd0;font-weight:800}
  #amqSongSelectStage .p32-catalog-head h2{margin:5px 0 0;font-size:19px;letter-spacing:.01em}
  #amqSongSelectStage .p32-catalog-mark{font-size:25px;color:#e768a7}
  #amqSongSelectStage #p32Mount{display:flex;flex-direction:column;gap:2px!important;min-width:0;min-height:0;height:auto!important;flex:1 1 auto!important;overflow:hidden}
  #amqSongSelectStage .p26-mode-tabs-row{display:flex;align-items:center;gap:4px;width:100%;min-width:0;height:24px;flex:0 0 24px;overflow:hidden}
  #amqSongSelectStage .p26-mode-tabs-row #proto26SongModes{flex:0 0 42%;width:42%;height:24px;grid-template-columns:repeat(4,minmax(0,1fr));gap:3px}
  #amqSongSelectStage .p26-mode-tabs-row .tabs.view-catalog{flex:1 1 0;width:0;min-width:0;height:24px!important;max-height:24px!important}
  #amqSongSelectStage .p26-mode-tabs-row .tabs.view-catalog .tab{flex:0 0 auto;white-space:nowrap}
  #amqSongSelectStage .toolbar.view-catalog{display:flex;flex-direction:column;gap:4px!important;margin:0!important;padding:0!important;background:transparent;border:0;min-width:0;width:100%;max-width:100%}
  #amqSongSelectStage .toolbar.view-catalog .p26-filter-strip{display:flex;flex-wrap:nowrap;gap:4px;min-width:0;width:100%;height:28px;overflow-x:auto;overflow-y:hidden;scrollbar-width:thin}
  #amqSongSelectStage .toolbar.view-catalog .p26-filter-strip>*{flex:0 0 100px;min-width:100px;max-width:100px;height:28px;box-sizing:border-box}
  #amqSongSelectStage .toolbar.view-catalog .search{grid-column:1/-1;min-width:0!important;width:100%!important;max-width:100%!important;flex:initial!important}
  #amqSongSelectStage .toolbar.view-catalog .search input,#amqSongSelectStage #search{display:block;width:100%!important;min-width:0!important;max-width:100%!important;height:28px!important;min-height:28px!important;box-sizing:border-box;margin:0;padding:5px 9px;background:rgba(9,14,24,.48);border:1px solid rgba(199,215,240,.24);border-radius:2px;color:#f4f6fb;outline:none}
  #amqSongSelectStage #tagFilter{height:28px!important;min-height:28px!important;padding:3px 5px!important}
  #amqSongSelectStage #search:focus{border-color:#e768a7;box-shadow:0 0 0 1px rgba(231,104,167,.2)}
  #amqSongSelectStage #search::placeholder{color:#94a3b9}
  #amqSongSelectStage .toolbar.view-catalog select{width:100%!important;min-width:0!important;max-width:100%!important;height:28px!important;min-height:28px!important;box-sizing:border-box;padding:3px 5px!important;background:rgba(12,18,29,.7);border:1px solid rgba(199,215,240,.2);color:#dce4f1;font-size:9px}
  #amqSongSelectStage #proto26SongModes{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:4px;margin:0;padding:0;background:transparent;border:0}
  #amqSongSelectStage #proto26SongModes .p26-label{display:none!important}
  #amqSongSelectStage #proto26SongModes button{height:24px;min-height:24px;padding:3px 2px;border:1px solid rgba(199,215,240,.22);border-radius:2px;background:rgba(20,28,43,.8);color:#dbe4f1;font-size:9px;font-weight:800;cursor:pointer}
  #amqSongSelectStage #proto26SongModes button[aria-pressed="true"]{background:#bd4e86;border-color:#e98ab8;color:#fff}
  #amqSongSelectStage .tabs.view-catalog{display:flex!important;flex-wrap:nowrap!important;align-items:center;gap:4px;margin:0!important;padding:0;min-width:0;height:24px!important;max-height:24px!important;overflow-x:auto!important;overflow-y:hidden!important;scrollbar-width:thin}
  #amqSongSelectStage #empty.hidden{display:none!important}
  #amqSongSelectStage #loadMoreWrap{height:22px!important;min-height:0!important;flex:0 0 22px!important;padding:0!important;margin:0!important}
  #amqSongSelectStage #loadMoreWrap button{min-height:22px!important;padding:2px 8px!important}
  #amqSongSelectStage #gridCounter{flex:0 0 auto!important;min-height:0!important;height:12px!important;line-height:12px!important;margin:0!important}
  #amqSongSelectStage .tabs.view-catalog .tab{padding:2px 5px;background:rgba(15,22,34,.65);border:1px solid rgba(199,215,240,.17);border-radius:2px;color:#d2dbea;font-size:9px;line-height:1.2}
  #amqSongSelectStage .tabs.view-catalog .tab.active{background:rgba(218,82,147,.88);border-color:#ed8abc;color:#fff}
  #amqSongSelectStage .head.view-catalog{display:flex;justify-content:space-between;align-items:center;gap:8px;margin:0!important;padding:0;background:transparent;border:0;height:30px!important;min-height:30px!important}
  #amqSongSelectStage .head.view-catalog h3{margin:0;font-size:12px;color:#edf2fb}
  #amqSongSelectStage .head.view-catalog p{display:none}
  #amqSongSelectStage .head.view-catalog .catalogHeadTools{display:flex;align-items:center;gap:6px;height:28px!important}
  #amqSongSelectStage .head.view-catalog .catalogHeadTools>*{height:28px!important;min-height:28px!important;padding:4px 8px!important}
  #amqSongSelectStage .head.view-catalog .result{font-size:10px;color:#aebbd0}
  #amqSongSelectStage #grid{display:flex!important;flex:1 1 0px!important;flex-direction:column;gap:4px;width:100%!important;height:0px!important;min-height:0!important;max-height:none!important;overflow:auto!important;padding:1px 3px 2px 1px;margin:0!important;grid-template-columns:none!important;background:transparent}
  #amqSongSelectStage #grid>.card,#amqSongSelectStage #grid>.p26-work-card{display:flex;flex-direction:row;align-items:center;gap:8px;width:100%;min-height:60px;padding:4px 6px;background:rgba(24,31,45,.56);border:1px solid rgba(201,215,239,.24);border-radius:2px;color:#e8edf6;text-align:left;box-shadow:none;cursor:pointer;backdrop-filter:blur(2px)}
  #amqSongSelectStage #grid>.card:hover,#amqSongSelectStage #grid>.p26-work-card:hover{border-color:#e768a7;background:rgba(48,39,59,.88)}
  #amqSongSelectStage #grid>.card .cardManage{top:2px!important;right:2px!important;width:20px!important;height:20px!important;min-height:20px!important;padding:0!important;border-radius:3px!important;font-size:14px!important;opacity:0!important;pointer-events:none!important;transition:opacity .12s ease!important;box-shadow:none!important;backdrop-filter:none!important}
  #amqSongSelectStage #grid>.card .cover .symbol,#amqSongSelectStage #grid>.card .cover .year,#amqSongSelectStage #grid>.card .cover .sticker{display:none!important}
  #amqSongSelectStage #grid>.card .cover.has-real-cover .coverFallback{display:none!important}
  #amqSongSelectStage #grid>.card .cover:not(.has-real-cover) .coverFallback{font-size:16px!important;opacity:.62!important}
  #amqSongSelectStage #grid>.card:hover .cardManage,#amqSongSelectStage #grid>.card:focus-within .cardManage{opacity:1!important;pointer-events:auto!important}
  #amqSongSelectStage #grid>.card img,#amqSongSelectStage #grid>.card .cover,#amqSongSelectStage #grid>.p26-work-card .p26-work-mark{flex:0 0 50px;width:50px;height:50px;object-fit:cover}
  #amqSongSelectStage #grid>.card .cardbody{min-width:0;flex:1}
  #amqSongSelectStage #grid>.card .cardtitle,#amqSongSelectStage #grid>.p26-work-card .p26-work-title{font-size:13px;line-height:1.3;overflow-wrap:anywhere}
  #amqSongSelectStage #grid>.card .sub,#amqSongSelectStage #grid>.p26-work-card .p26-work-sub{font-size:10px;color:#b4c0d2;line-height:1.4}
  #amqSongSelectStage #grid>.card .cardfoot,#amqSongSelectStage #grid>.card .tinybar{display:none}
  #amqSongSelectStage #gridCounter,#amqSongSelectStage #resultCount{color:#9ca8bc;font-size:10px}
  #amqSongSelectStage body[data-amq-workspace-mode="lists"]{display:none}
  body[data-amq-workspace-mode="lists"] #amqSongSelectStage,body[data-amq-workspace-mode="learning"] #amqSongSelectStage,body[data-amq-workspace-mode="analysis"] #amqSongSelectStage{display:none}
  @media(max-width:1120px){#amqSongSelectStage{grid-template-columns:minmax(170px,24%) minmax(0,1fr);gap:6px}#amqSongSelectStage .p32-catalog{width:44%}#amqSongSelectStage .p32-info{padding:14px}#amqSongSelectStage .p32-scene{padding:16px}#amqSongSelectStage .p32-catalog{padding:12px 8px}}
  body.amq-workspace-active .top{min-height:30px!important;margin:0 0 4px!important;padding:0 0 4px!important;gap:0!important}
  body.amq-workspace-active .top .actions{gap:6px!important;flex-wrap:nowrap!important}
  body.amq-workspace-active .top .actions #themeToggle,body.amq-workspace-active .top .actions #updateBtn,body.amq-workspace-active .top .actions #exportBtn,body.amq-workspace-active .top .actions #importBtn{display:none!important}
  body.amq-workspace-active.ui-settings-open .top .actions #themeToggle,body.amq-workspace-active.ui-settings-open .top .actions #updateBtn,body.amq-workspace-active.ui-settings-open .top .actions #exportBtn,body.amq-workspace-active.ui-settings-open .top .actions #importBtn{display:inline-flex!important}
  body.amq-workspace-active .top .actions #uiHomeSettings,body.amq-workspace-active .top .actions #uiBackHome,body.amq-workspace-active .top .actions #sceneBackgroundOpen{min-height:28px!important;padding:5px 8px!important;font-size:10px!important;box-shadow:none!important;border-radius:3px!important}
  body.amq-workspace-active #amqWorkspaceDock{left:12px!important;right:auto!important;width:calc(50vw - 18px)!important;max-width:calc(50vw - 18px)!important;bottom:12px!important;height:60px!important;grid-template-columns:repeat(4,minmax(0,1fr)) 1.05fr!important;z-index:10001!important}
  body.amq-workspace-active #amqWorkspaceDock button{min-width:0!important;padding:5px 3px!important;font-size:10px!important;gap:4px!important}
  body.amq-workspace-active #audioDock{left:auto!important;right:12px!important;bottom:12px!important;width:calc(50vw - 18px)!important;max-width:calc(50vw - 18px)!important;margin:0!important;z-index:10000!important;grid-template-columns:minmax(0,.8fr) minmax(0,1fr) minmax(0,1.2fr)!important;gap:6px!important;padding:7px!important;border-radius:4px!important;min-width:0!important}
  body.amq-workspace-active #audioDock>*{min-width:0!important;max-width:100%!important}
  body.amq-workspace-active #audioDock audio{width:100%!important;min-width:0!important}
  body.amq-workspace-active #audioDock .dockBtns{min-width:0!important;max-width:100%!important;display:flex;flex-wrap:wrap;gap:4px;overflow:auto;max-height:54px}
  body.amq-workspace-active #audioDock .dockBtns select{min-width:0!important;max-width:100%!important;width:auto}
  @media(max-width:1120px){body.amq-workspace-active #amqWorkspaceDock{left:12px!important;right:12px!important;width:auto!important;max-width:none!important;grid-template-columns:repeat(4,minmax(0,1fr)) 1.05fr!important;bottom:12px!important;height:56px!important}body.amq-workspace-active #audioDock{left:12px!important;right:12px!important;width:auto!important;max-width:none!important;bottom:76px!important;grid-template-columns:minmax(0,1fr) minmax(0,1fr)!important}#amqSongSelectStage .toolbar.view-catalog{grid-template-columns:repeat(2,minmax(0,1fr))}}
  body.amq-workspace-active .top{min-height:30px!important;margin:0 0 4px!important;padding:0 0 4px!important;gap:0!important}
  body.amq-workspace-active .top .actions{gap:6px!important;flex-wrap:nowrap!important}
  body.amq-workspace-active .top .actions #themeToggle,body.amq-workspace-active .top .actions #updateBtn,body.amq-workspace-active .top .actions #exportBtn,body.amq-workspace-active .top .actions #importBtn{display:none!important}
  body.amq-workspace-active.ui-settings-open .top .actions #themeToggle,body.amq-workspace-active.ui-settings-open .top .actions #updateBtn,body.amq-workspace-active.ui-settings-open .top .actions #exportBtn,body.amq-workspace-active.ui-settings-open .top .actions #importBtn{display:inline-flex!important}
  body.amq-workspace-active .top .actions #uiHomeSettings,body.amq-workspace-active .top .actions #uiBackHome,body.amq-workspace-active .top .actions #sceneBackgroundOpen{min-height:28px!important;padding:5px 8px!important;font-size:10px!important;box-shadow:none!important;border-radius:3px!important}
  body.amq-workspace-active #amqWorkspaceDock{left:12px!important;right:auto!important;width:calc(50vw - 18px)!important;max-width:calc(50vw - 18px)!important;bottom:12px!important;height:60px!important;grid-template-columns:repeat(4,minmax(0,1fr)) 1.05fr!important;z-index:10001!important}
  body.amq-workspace-active #amqWorkspaceDock button{min-width:0!important;padding:5px 3px!important;font-size:10px!important;gap:4px!important}
  body.amq-workspace-active #audioDock{left:auto!important;right:12px!important;bottom:12px!important;width:calc(50vw - 18px)!important;max-width:calc(50vw - 18px)!important;margin:0!important;z-index:10000!important;grid-template-columns:minmax(0,.8fr) minmax(0,1fr) minmax(0,1.2fr)!important;gap:6px!important;padding:7px!important;border-radius:4px!important;min-width:0!important}
  body.amq-workspace-active #audioDock>*{min-width:0!important;max-width:100%!important}
  body.amq-workspace-active #audioDock audio{width:100%!important;min-width:0!important}
  body.amq-workspace-active #audioDock .dockBtns{min-width:0!important;max-width:100%!important;display:flex;flex-wrap:wrap;gap:4px;overflow:auto;max-height:54px}
  body.amq-workspace-active #audioDock .dockBtns select{min-width:0!important;max-width:100%!important;width:auto}
  @media(max-width:1120px){body.amq-workspace-active #amqWorkspaceDock{left:12px!important;right:12px!important;width:auto!important;max-width:none!important;grid-template-columns:repeat(4,minmax(0,1fr)) 1.05fr!important;bottom:12px!important;height:56px!important}body.amq-workspace-active #audioDock{left:12px!important;right:12px!important;width:auto!important;max-width:none!important;bottom:76px!important;grid-template-columns:minmax(0,1fr) minmax(0,1fr)!important}#amqSongSelectStage .toolbar.view-catalog{grid-template-columns:repeat(2,minmax(0,1fr))}}
  /* Proto36: explicit non-overlapping scene geometry; keep the reference catalog as a single dense vertical list. */
  @media(min-width:901px){
    #amqSongSelectStage{position:relative!important;display:grid!important;grid-template-columns:minmax(0,24%) minmax(0,39.5%) minmax(0,36.5%)!important;height:clamp(520px,calc(100vh - 76px),660px)!important;margin:0 0 118px!important;overflow:hidden!important;background:radial-gradient(ellipse at 49% 44%,rgba(70,91,132,.38),rgba(17,23,35,.96) 72%)!important}
    body.amq-custom-bg-active[data-amq-scene="catalog"] #amqSongSelectStage{background:transparent!important}
    #amqSongSelectStage .p32-scene{position:absolute!important;left:0!important;right:0!important;top:0!important;bottom:0!important;inset:0!important;grid-column:auto!important;display:block!important;width:100%!important;height:100%!important;padding:0!important;overflow:hidden!important;border:0!important;box-shadow:none!important;background:radial-gradient(ellipse at 49% 44%,rgba(70,91,132,.30),rgba(17,23,35,.48) 72%)!important}
    #amqSongSelectStage .p32-scene-image{position:absolute!important;inset:0!important;width:100%!important;height:100%!important;opacity:.82!important;filter:blur(2px) saturate(1.12) contrast(1.03)!important;transform:scale(1.035)!important;mask-image:linear-gradient(90deg,rgba(0,0,0,.2),#000 24%,#000 76%,rgba(0,0,0,.22))!important}
    body.amq-custom-bg-active[data-amq-scene="catalog"] #amqSongSelectStage .p32-scene{background-image:linear-gradient(135deg,rgba(10,14,24,.20),rgba(19,15,30,.16))!important;backdrop-filter:blur(1px)!important}
    body.amq-custom-bg-active[data-amq-scene="catalog"] #amqSongSelectStage .p32-scene-image{opacity:.04!important}
    #amqSongSelectStage .p32-info{position:absolute!important;left:0!important;top:0!important;bottom:0!important;width:24%!important;height:100%!important;z-index:4!important;padding:14px!important;background:linear-gradient(90deg,rgba(12,17,28,.76),rgba(12,17,28,.48))!important;backdrop-filter:blur(3px)!important;border:1px solid rgba(214,225,245,.18)!important;box-shadow:none!important}
    #amqSongSelectStage .p32-scene-content{position:absolute!important;left:24.5%!important;right:36.8%!important;top:56%!important;bottom:auto!important;z-index:2!important;display:flex!important;flex-direction:column!important;justify-content:flex-start!important;align-items:flex-start!important;width:auto!important;max-width:none!important;min-width:0!important;min-height:0!important;margin:0!important;padding:10px 12px!important;opacity:1!important;overflow:visible!important;transform:none!important;text-align:left!important}
    #amqSongSelectStage .p32-scene-content small{font-size:10px!important;letter-spacing:.13em!important;color:#f0d8e7!important;text-shadow:0 2px 8px #000!important}
    #amqSongSelectStage #p32WorkTitle{display:block!important;max-width:100%!important;margin:7px 0 5px!important;font-size:clamp(21px,2vw,30px)!important;line-height:1.12!important;overflow-wrap:anywhere!important;text-shadow:0 2px 12px #000!important}
    #amqSongSelectStage #p32WorkMeta{display:block!important;max-width:100%!important;margin:0!important;font-size:11px!important;line-height:1.5!important;color:#e0e6f1!important;text-shadow:0 2px 8px #000!important}
    #amqSongSelectStage .p32-catalog{position:absolute!important;top:0!important;right:0!important;bottom:0!important;width:36.5%!important;height:100%!important;z-index:5!important;padding:7px 8px!important;background:linear-gradient(90deg,rgba(12,17,28,.38),rgba(12,16,25,.70))!important;backdrop-filter:blur(3px)!important;border:0!important;border-left:1px solid rgba(214,225,245,.24)!important;box-shadow:none!important}
    body[data-amq-workspace-mode="lists"] #amqSongSelectStage .p32-catalog,body[data-amq-workspace-mode="learning"] #amqSongSelectStage .p32-catalog,body[data-amq-workspace-mode="analysis"] #amqSongSelectStage .p32-catalog{display:none!important}
    #amqSongSelectStage #p32Mount{gap:1px!important}
    #amqSongSelectStage .p26-mode-tabs-row{height:22px!important;flex-basis:22px!important;min-height:22px!important}
    #amqSongSelectStage .p26-mode-tabs-row #proto26SongModes,#amqSongSelectStage .p26-mode-tabs-row .tabs.view-catalog{height:22px!important;max-height:22px!important}
    #amqSongSelectStage .toolbar.view-catalog{gap:2px!important}
    #amqSongSelectStage .toolbar.view-catalog .search input,#amqSongSelectStage #search{height:25px!important;min-height:25px!important;padding:3px 8px!important}
    #amqSongSelectStage .toolbar.view-catalog .p26-filter-strip{height:24px!important;flex-basis:24px!important}
    #amqSongSelectStage .toolbar.view-catalog .p26-filter-strip>*{height:24px!important;min-height:24px!important}
    #amqSongSelectStage .toolbar.view-catalog select{height:24px!important;min-height:24px!important;padding:2px 4px!important}
    #amqSongSelectStage .head.view-catalog{height:24px!important;min-height:24px!important}
    #amqSongSelectStage .head.view-catalog h3{font-size:11px!important}
    #amqSongSelectStage #grid{display:flex!important;flex:1 1 0px!important;flex-direction:column!important;grid-template-columns:none!important;gap:3px!important;height:0!important;min-height:0!important;max-height:none!important;overflow:auto!important}
    #amqSongSelectStage #grid>.card,#amqSongSelectStage #grid>.p26-work-card{min-height:52px!important;padding:3px 6px!important;gap:7px!important;background:rgba(18,25,38,.66)!important;border-color:rgba(201,215,239,.30)!important}
    #amqSongSelectStage #grid>.card img,#amqSongSelectStage #grid>.card .cover,#amqSongSelectStage #grid>.p26-work-card .p26-work-mark{flex:0 0 44px!important;width:44px!important;height:44px!important;object-fit:cover!important}
    #amqSongSelectStage #grid>.card .title,#amqSongSelectStage #grid>.card .cardtitle,#amqSongSelectStage #grid>.p26-work-card .p26-work-title{font-size:11px!important;line-height:1.2!important;font-weight:700!important}
    #amqSongSelectStage #grid>.card .meta,#amqSongSelectStage #grid>.card .sub,#amqSongSelectStage #grid>.p26-work-card .p26-work-sub{font-size:9px!important;line-height:1.25!important}
  }
  @media(max-width:900px){#amqSongSelectStage{height:auto!important;grid-template-columns:minmax(0,1fr);gap:8px;margin-bottom:200px}#amqSongSelectStage .p32-catalog{position:relative;top:auto;right:auto;bottom:auto;width:auto;height:auto;min-height:0}#amqSongSelectStage .p32-info{min-height:0;padding:14px}#amqSongSelectStage .p32-song-label{margin-top:12px}#amqSongSelectStage .p32-divider{margin:12px 0 4px}#amqSongSelectStage .p32-stat{padding:10px 0}#amqSongSelectStage .p32-scene{min-height:300px;padding:15px}#amqSongSelectStage .p32-scene-content{min-height:220px;padding:18px 4px}#amqSongSelectStage #p32WorkTitle{font-size:34px}#amqSongSelectStage .p32-catalog{min-height:0}#amqSongSelectStage #grid{max-height:260px}body.amq-workspace-active #amqWorkspaceDock{height:54px!important;grid-template-columns:repeat(4,minmax(0,1fr)) 1fr!important}body.amq-workspace-active #amqWorkspaceDock button{font-size:9px!important}body.amq-workspace-active #audioDock{bottom:70px!important;grid-template-columns:minmax(0,1fr)!important;max-height:110px;overflow:auto}}
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
  let selectedSongId=null,selectedWorkImage='',hasSelectedWork=false,selectedWorkCard=null;
  const syncCatalogEmptyState=()=>{if(mode!=='amq'&&mode!=='singer')return;const hasCards=grid.querySelectorAll(':scope > .card,:scope > .p26-work-card').length>0;$('#empty')?.classList.toggle('hidden',hasCards)};
  const applySceneCover=(card,img)=>{const sceneImage=$('#p32SceneImage');if(!sceneImage)return;const apply=()=>{if(hasSelectedWork&&selectedWorkCard!==card)return;const url=img?.currentSrc||img?.src||'';if(url&&img.complete&&img.naturalWidth>=80&&img.naturalHeight>=50){selectedWorkImage=url;sceneImage.style.backgroundImage='linear-gradient(rgba(12,16,27,.28),rgba(12,16,27,.36)),url("'+url.replaceAll('"','%22')+'")'}else if(hasSelectedWork&&selectedWorkCard===card){selectedWorkImage='';sceneImage.style.backgroundImage='none'}};if(img?.complete)apply();else if(img){const done=()=>{img.removeEventListener('load',done);img.removeEventListener('error',done);requestAnimationFrame(apply)};img.addEventListener('load',done);img.addEventListener('error',done)}};
  const updateP32=()=>{syncCatalogEmptyState();const cards=[...grid.querySelectorAll(':scope > .card,:scope > .p26-work-card')];const n=cards.length;const c=$('#gridCounter')?.textContent?.trim()||n+' 個目前顯示項目';$('#p32Items').textContent=c;$('#p32Mode').textContent=mode.toUpperCase()+' LIBRARY';if(!hasSelectedWork){const first=cards[0];if(first){const title=first.querySelector('.p26-work-title,.cardtitle,.title,h3,.name,[class*="title"]')?.textContent?.trim()||first.textContent.trim().split('\n').map(v=>v.trim()).filter(Boolean)[0];if(title)$('#p32WorkTitle').textContent=title;const meta=first.querySelector('.p26-work-sub,.sub,.cardfoot')?.textContent?.trim();$('#p32WorkMeta').textContent=meta?'作品預覽 · '+meta:'預覽作品。選取後可查看歌曲與既有播放紀錄。'}else{$('#p32WorkTitle').textContent='選擇一部作品';$('#p32WorkMeta').textContent='從右側曲庫選取作品，查看歌曲與既有播放紀錄。'}const images=[...grid.querySelectorAll('.card img,.p26-work-card img')];const img=images.find(el=>el.complete&&el.naturalWidth>=80&&el.naturalHeight>=50);if(img){img.closest('.cover')?.classList.add('has-real-cover');applySceneCover(null,img)}}}
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
    const img=c.querySelector('img');hasSelectedWork=true;selectedWorkCard=c;selectedWorkImage='';const sceneImage=$('#p32SceneImage');if(sceneImage)sceneImage.style.backgroundImage='none';applySceneCover(c,img)
    updateSelectedSongInfo(null);
  });
  $('#songlist')?.addEventListener('click',event=>{const row=event.target.closest?.('.songrow');if(!row?.dataset?.id)return;$('#songlist').querySelectorAll('.songrow.proto26-song-selected').forEach(el=>el.classList.remove('proto26-song-selected'));row.classList.add('proto26-song-selected');updateSelectedSongInfo(row.dataset.id,row)});
  document.addEventListener('ani-song-playback-recorded-v80',event=>{if(selectedSongId&&String(event.detail?.songId)===selectedSongId)updateSelectedSongInfo(selectedSongId)});
  grid.addEventListener('load',event=>{if(event.target instanceof HTMLImageElement){const img=event.target;if(img.naturalWidth>=80&&img.naturalHeight>=50)img.closest('.cover')?.classList.add('has-real-cover');requestAnimationFrame(updateP32)}},true);
  grid.addEventListener('load',event=>{if(event.target instanceof HTMLImageElement&&hasSelectedWork&&selectedWorkCard?.contains(event.target))applySceneCover(selectedWorkCard,event.target)},true);
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
  function activate(next){mode=next;if(next==='amq'){setButtons();$('[data-tab="all"]')?.click();$('#loadMoreWrap')?.classList.remove('hidden');$('#empty')?.classList.toggle('hidden',grid.querySelectorAll('.card,.p26-work-card').length>0)}else if(next==='singer'){setButtons();$('[data-tab="artists"]')?.click();$('#loadMoreWrap')?.classList.remove('hidden');$('#empty')?.classList.toggle('hidden',grid.querySelectorAll('.card,.p26-work-card').length>0)}else renderEmq(next==='mix')}
  modes.addEventListener('click',e=>{const b=e.target.closest('[data-p26-mode]');if(b)activate(b.dataset.p26Mode)});
  search?.addEventListener('input',()=>{if(mode==='emq'||mode==='mix')renderEmq(mode==='mix')});
  tabs.addEventListener('click',e=>{const t=e.target.closest('[data-tab]');if(!t||mode==='emq'||mode==='mix')return;mode=t.dataset.tab==='artists'?'singer':'amq';setButtons()});
  window.__amqProto26SongSelect={version:'proto32.1',getMode:()=>mode,getEmqWorkCount:()=>emqWorks.length,activate};
  document.documentElement.dataset.proto26Init='ready';setButtons();window.requestAnimationFrame(()=>activate('amq'));
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
