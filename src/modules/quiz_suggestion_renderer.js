function renderQuizSuggestionLabelV824(button,item,ranges){
 if(!ranges.length){button.textContent=item.label;return}
 let offset=0;
 for(const range of ranges){
  if(range.start>offset)button.appendChild(document.createTextNode(item.label.slice(offset,range.start)));
  const span=document.createElement('span');span.className='quizSuggestionMatch';span.textContent=item.label.slice(range.start,range.end);button.appendChild(span);offset=range.end;
 }
 if(offset<item.label.length)button.appendChild(document.createTextNode(item.label.slice(offset)));
}
function buildSuggestions(){
 const input=document.getElementById('quizAnswer'),box=document.getElementById('quizSuggestions');
 if(!input||!box||input.disabled||quizFinished)return;
 if(input.dataset.imeComposing==='1'||(typeof quizComposing!=='undefined'&&quizComposing))return;
 const rawQuery=normalizeQuizSuggestionTextV824(input.value).trim();
 const compactQuery=rawQuery.replace(/\s/gu,'');quizOptionFocus=-1;box.replaceChildren();
 // Only selected uncommon Unicode symbols are treated as optional separators for suggestion search.
 // Existing space/hyphen/slash equivalence remains; final answer validation is untouched.
 if(!rawQuery){box.classList.remove('open');input.setAttribute('aria-expanded','false');return}
 const type=answerField();let list=optionCache[type];
 if(!list){list=targetOptions().map(label=>mapQuizSuggestionTextV824(label)).filter(x=>x.searchText);optionCache[type]=list}
 let separatorMatcher=null;
 if(/[\s/-]/u.test(rawQuery)){
  const separatorPatternText=rawQuery.split(/([\s/-]+)/u).map(part=>!part?'':(/^[\s/-]+$/u.test(part)?'[\\s/-]+':part.replace(/[.*+?^${}()|[\]\\]/gu,'\\$&'))).join('');
  try{separatorMatcher=new RegExp(separatorPatternText,'u')}catch(e){separatorMatcher=null}
 }
 const compareSuggestions=(a,b)=>{
  const lengthDiff=a.titleLength-b.titleLength;if(lengthDiff)return lengthDiff;
  if(a.rawKey<b.rawKey)return -1;if(a.rawKey>b.rawKey)return 1;
  if(a.label<b.label)return -1;if(a.label>b.label)return 1;return 0;
 };
 // Keep the existing bounded top-25 selection and deterministic ordering.
 const hits=[],matchModes=new Map();
 for(const item of list){
  const rawMatch=item.searchText.includes(rawQuery);
  const compactMatch=!!compactQuery&&item.compactKey.includes(compactQuery);
  const separatorMatch=!!separatorMatcher&&separatorMatcher.test(item.searchText);
  if(!rawMatch&&!compactMatch&&!separatorMatch)continue;
  matchModes.set(item,{rawMatch,compactMatch,separatorMatch});
  let low=0,high=hits.length;
  while(low<high){const mid=(low+high)>>1;if(compareSuggestions(hits[mid],item)<=0)low=mid+1;else high=mid;}
  if(low<25){hits.splice(low,0,item);if(hits.length>25)hits.pop();}
 }
 for(const item of hits){
  const b=make('button',{class:'quizSuggestion',type:'button',role:'option','aria-selected':'false'},'');
  const mode=matchModes.get(item)||{};const ranges=quizSuggestionHighlightRangesV824(item,rawQuery,compactQuery,separatorMatcher,mode.rawMatch,mode.compactMatch,mode.separatorMatch);
  renderQuizSuggestionLabelV824(b,item,ranges);
  b.addEventListener('pointerdown',e=>e.preventDefault());b.addEventListener('click',()=>chooseQuizSuggestion(item.label));box.appendChild(b)
 }
 const open=hits.length>0;box.classList.toggle('open',open);input.setAttribute('aria-expanded',String(open));
}
