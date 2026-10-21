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
    const sidebar=document.getElementById('amqWorkspaceSidebar');
    const dock=document.getElementById('amqWorkspaceDock');
    for(const [el,display] of [[sidebar,'block'],[dock,'grid']]){
      if(!el)continue;
      if(active&&desktop)el.style.setProperty('display',display,'important');
      else el.style.removeProperty('display');
    }
  };
  syncWorkspaceShell();
  new MutationObserver(syncWorkspaceShell).observe(document.body,{attributes:true,attributeFilter:['class']});
  window.addEventListener('resize',syncWorkspaceShell,{passive:true});

  const modes=document.createElement('nav');
  modes.id='proto26SongModes'; modes.classList.add('view-catalog'); modes.setAttribute('aria-label','曲庫來源');
  modes.innerHTML='<span class="p26-label">SONG SELECT</span><button type="button" data-p26-mode="amq" aria-pressed="true">AMQ</button><button type="button" data-p26-mode="emq" aria-pressed="false">EMQ</button><button type="button" data-p26-mode="mix" aria-pressed="false">MIX</button><button type="button" data-p26-mode="singer" aria-pressed="false">Singer</button>';
  tabs.parentElement.insertBefore(modes,tabs);
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
  window.__amqProto26SongSelect={version:'proto26.6',getMode:()=>mode,getEmqWorkCount:()=>emqWorks.length,activate};
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
