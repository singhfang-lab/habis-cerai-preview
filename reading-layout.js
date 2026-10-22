// Presentation only: no new pages, altered choices, or inferred speakers.
(function(root){
 function blocks(lines,lang='id'){
  const out=[],zh=lang==='zh';
  const weight=s=>zh?s.length:s.trim().split(/\s+/).length;
  const segmenter=typeof Intl.Segmenter==='function'?new Intl.Segmenter(zh?'zh':'id',{granularity:'sentence'}):null;
  function narration(text){
   text=text.trim();if(!text)return;
   const sentences=segmenter?[...segmenter.segment(text)].map(x=>x.segment.trim()).filter(Boolean):[text];
   let group='',count=0;
   for(const sentence of sentences){
    if(group&&(count>=2||weight(group+' '+sentence)>(zh?36:18))){out.push({kind:'narration',text:group});group='';count=0;}
    group+=(group?(zh?'':' '):'')+sentence;count++;
   }
   if(group)out.push({kind:'narration',text:group});
  }
  for(const line of lines){
   // Complete utterances only; quoted contact names and phrases stay in prose.
   const speech=/“[^”]*[.!?。？！…]”(?:\s+(?:kataku|katanya|tanyaku|tanyanya|jawabku|jawabnya|gumamku|gumamnya|bisikku|bisiknya|pintaku|pintanya|ujarku|ujarnya)\.)?/g;
   let start=0;
   for(const match of line.matchAll(speech)){narration(line.slice(start,match.index));out.push({kind:'speech',text:match[0]});start=match.index+match[0].length;}
   narration(line.slice(start));
  }
  return out;
 }
 const api={blocks};if(typeof module!=='undefined')module.exports=api;else root.ReadingLayout=api;
})(typeof globalThis!=='undefined'?globalThis:this);
