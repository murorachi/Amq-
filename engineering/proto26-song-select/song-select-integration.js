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
      body:has(#overlay.open) #grid{width:calc(100% - min(470px,37vw) - 36px);margin-left:0;margin-right:auto;grid-template-columns:repeat(2,minmax(0,1fr))}
      body:has(#overlay.open) .overlay.open{position:fixed;inset:0;display:block;padding:0;background:transparent;backdrop-filter:none;pointer-events:none;z-index:40}
      body:has(#overlay.open) .overlay.open .drawer{position:fixed;right:18px;top:96px;bottom:86px;width:min(470px,37vw);max-height:none;overflow:auto;border-radius:6px;border:1px solid #5b667a;background:#202632;color:#e8edf6;box-shadow:0 12px 40px #0009;pointer-events:auto}
      body:has(#overlay.open) .overlay.open .drawerhead{background:#2b3444;border-bottom:1px solid #465064;color:#f1f4fa}
      body:has(#overlay.open) .overlay.open .drawerhead p,body:has(#overlay.open) .overlay.open .detailEyebrow{color:#b5c2d8}
      body:has(#overlay.open) .overlay.open .songrow{background:#252d3a;border-color:#414c5f;color:#edf1f8}
      body:has(#overlay.open) .overlay.open .songmeta{color:#b3bfd1}
      body:has(#overlay.open) .overlay.open .close{display:none}
    }
    @media(max-width:900px){
      #grid.proto26-emq-grid{grid-template-columns:1fr}
      body:has(#overlay.open) .overlay.open{display:flex;position:fixed;inset:0;padding:12px;background:#111a2bdd;backdrop-filter:blur(6px);pointer-events:auto}
      body:has(#overlay.open) .overlay.open .drawer{position:relative;inset:auto;width:100%;max-height:94vh;max-height:94dvh;border-radius:12px;background:#202632}
      body:has(#overlay.open) .overlay.open .close{display:block;position:sticky;float:right;top:8px;right:auto;z-index:2;background:#313b4d;border-color:#59667c;color:#fff}
    }
  `;
  document.head.append(style);
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
  window.__amqProto26SongSelect={version:'proto26.4.1',getMode:()=>mode,getEmqWorkCount:()=>emqWorks.length,activate};
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
