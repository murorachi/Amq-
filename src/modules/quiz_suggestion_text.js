const QUIZ_SUGGESTION_SPECIAL_SPACE_CHARS_V824 = new Set(Array.from('★☆✩✪✦✧✫✬✭✮✯✰⋆✶✷✸✹✺＊·♥❤∽・〜†♪♫→␣°∞△↓♡∬'));
function normalizeQuizSuggestionTextV824(value){
 return Array.from(String(value??''),char=>QUIZ_SUGGESTION_SPECIAL_SPACE_CHARS_V824.has(char)?' ':char.normalize('NFKC').toLocaleLowerCase()).join('');
}
function mapQuizSuggestionTextV824(label){
 const source=String(label??'');let searchText='',sourceStarts=[],sourceEnds=[],compactKey='',compactPositions=[],originalOffset=0;
 for(const char of source){
  const sourceStart=originalOffset;originalOffset+=char.length;
  const normalized=normalizeQuizSuggestionTextV824(char);
  for(let i=0;i<normalized.length;i++){
   const searchIndex=searchText.length,part=normalized[i];searchText+=part;sourceStarts.push(sourceStart);sourceEnds.push(originalOffset);
   if(!/\s/u.test(part)){compactKey+=part;compactPositions.push(searchIndex)}
  }
 }
 return {label:source,rawKey:source.normalize('NFKC').toLocaleLowerCase(),searchText,sourceStarts,sourceEnds,compactKey,compactPositions,titleLength:Array.from(source).length};
}
function quizSuggestionHighlightRangesV824(item,rawQuery,compactQuery,separatorMatcher,rawMatch,compactMatch,separatorMatch){
 const ranges=[];
 const addSearchRange=(start,end)=>{
  for(let i=Math.max(0,start);i<Math.min(end,item.searchText.length);i++){
   const char=item.searchText[i];if(!char||/\s/u.test(char)||char==='/'||char==='-')continue;
   const sourceStart=item.sourceStarts[i],sourceEnd=item.sourceEnds[i],originalChar=item.label.slice(sourceStart,sourceEnd);
   if(QUIZ_SUGGESTION_SPECIAL_SPACE_CHARS_V824.has(originalChar))continue;
   ranges.push({start:sourceStart,end:sourceEnd});
  }
 };
 if(separatorMatch&&separatorMatcher){
  const match=separatorMatcher.exec(item.searchText);
  if(match)addSearchRange(match.index,match.index+match[0].length);
  else if(rawMatch){const index=item.searchText.indexOf(rawQuery);if(index>=0)addSearchRange(index,index+rawQuery.length)}
 }else if(rawMatch){
  const index=item.searchText.indexOf(rawQuery);if(index>=0)addSearchRange(index,index+rawQuery.length);
 }else if(compactMatch&&compactQuery){
  const index=item.compactKey.indexOf(compactQuery);
  if(index>=0)for(let i=index;i<index+compactQuery.length;i++){const mappedIndex=item.compactPositions[i];if(Number.isInteger(mappedIndex))addSearchRange(mappedIndex,mappedIndex+1)}
 }
 ranges.sort((a,b)=>a.start-b.start||a.end-b.end);
 const merged=[];for(const range of ranges){const last=merged[merged.length-1];if(last&&range.start<=last.end)last.end=Math.max(last.end,range.end);else merged.push({...range})}
 return merged;
}