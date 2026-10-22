(function(root){
 const KEY='nadira-emotional-arc-v8';
 function fresh(){return {v:3,ep:0,step:0,page:0,max:0,choices:{},view:'reader',finished:false,unlocked:false,unlockedEarly:false,vip:{},preview:false,pilot:{auto:[],took:null},metrics:{starts:0,choices:0,finish:0,intent:0}}}
 // v23 autopilot: the first decisions are taken by 'Nadira yang lama' (nine years of keeping the peace) unless the reader takes over.
 const PILOT={keys:['live','call','money','invite'],auto:{live:1,call:2,money:1},force:'invite',ms:{live:9000,call:7000,money:6000,invite:5000}};
 function pilotActive(s,key){const p=s.pilot||{};return !p.took&&PILOT.keys.includes(key)&&s.choices[key]===undefined;}
 function pilotState(s){const p=s.pilot||{};if(p.took==='legacy'||!p.took&&!(p.auto||[]).length&&s.choices.live!==undefined)return 'legacy';if(p.took==='forced')return 'forced';if(p.took==='live')return 'early';if(p.took)return 'mid';return (p.auto||[]).length?'running':'fresh';}
 function pilotAuto(s,episodes,key){if(!pilotActive(s,key)||!(key in PILOT.auto))return false;const ok=choose(s,episodes,key,PILOT.auto[key]);if(ok)s.pilot.auto=[...(s.pilot.auto||[]),key];return ok;}
 function pilotTake(s,key,forced=false){if(!pilotActive(s,key))return false;s.pilot={...(s.pilot||{auto:[]}),took:forced?'forced':key,at:key};return true;}
 // Story lines that only exist for some autopilot histories: book.pilotNotes=[{ep,field,at,lines:{early|mid|forced|auto:<key>|took:<key>:[…]}}]
 function pilotLines(s,book,note){const st=pilotState(s),L=note.lines;if(L[st])return L[st];for(const k of Object.keys(L)){const [kind,key]=k.split(':');if(kind==='auto'&&(s.pilot?.auto||[]).includes(key))return L[k];if(kind==='took'&&s.pilot?.at===key&&st!=='legacy')return L[k];}return null;}
 function withPilot(s,book,i,e){const notes=book.pilotNotes?.filter(n=>n.ep===i);if(!notes?.length||!s.pilot)return e;let out=e;for(const n of notes){const add=pilotLines(s,book,n);if(!add)continue;const arr=out[n.field]||[];const j=typeof n.at==='number'?n.at:Math.max(0,arr.findIndex(x=>String(x).includes(n.at))+1);out={...out,[n.field]:[...arr.slice(0,j),...add,...arr.slice(j)]};}return out;}
 // v19: two simulated locks. Early lock after episode 5 (index 4), main lock after episode 10 (index 9).
 const GATES=[{ep:4,flag:'unlockedEarly'},{ep:9,flag:'unlocked'}];
 const gateAt=(s,ep)=>GATES.find(g=>g.ep===ep&&!s[g.flag]);
 // v20: route overlays. An episode may carry routes={key,by:[overlay…]}; once that decision is made, the overlay replaces middle/second/ending (or more).
 function routeIndex(e,s){if(!e.routes)return null;const n=s.choices?.[e.routes.key];if(n===undefined)return null;return e.routes.map?.[n]??n;}
 function at(s,episodes,i=s.ep){const e=episodes[i];if(!e)return e;let out=e;for(let j=0;j<=i;j++){const src=episodes[j];if(!src.routes)continue;const r=routeIndex(src,s);if(r===null||!src.routes.by[r])continue;const o=src.routes.by[r][i-j];if(o)out={...out,...o};}return withPilot(s,episodes,i,out);}
 // Endings: route ending, or the premium secret ending.
 function endingOf(s){if(s.choices.future===3)return 'X';return ['A','R','S'][({0:0,1:1,2:2,3:0})[s.choices.reconcile]??0];}
 function premiumOK(s,key,o){return !o?.premium||!!s.vip?.['opt:'+key];}
 const pageCache=new WeakMap();
 function paginate(lines){
  if(pageCache.has(lines))return pageCache.get(lines);
  const weight=text=>/[\u3400-\u9fff]/.test(text)?Math.ceil(text.length/2.5):text.trim().split(/\s+/).length;
  const segmenter=typeof Intl.Segmenter==='function'?new Intl.Segmenter('id',{granularity:'sentence'}):null;
  const out=[];let page=[],words=0;
  function push(text){const n=weight(text);if(words+n>36&&words){out.push(page);page=[];words=0;}page.push(text);words+=n;}
  for(const line of lines){
   if(weight(line)<=36){push(line);continue;}
   const raw=segmenter?[...segmenter.segment(line)].map(x=>x.segment.trim()).filter(Boolean):[line],sentences=[];
   for(const sentence of raw){if(sentences.length&&/^(?:kataku|katanya|tanyaku|tanyanya|jawabku|jawabnya|gumamku|gumamnya|bisikku|bisiknya|pintaku|pintanya|ujarku|ujarnya)\b/.test(sentence)){sentences[sentences.length-1]+=' '+sentence;}else sentences.push(sentence);}
   let part='';for(const sentence of sentences){if(part&&weight(part+' '+sentence)>36){push(part);part='';}part+=(part?' ':'')+sentence;}if(part)push(part);
  }
  if(page.length)out.push(page);const result=out.length?out:[['']];pageCache.set(lines,result);return result;
 }
 function pages(s,episodes){const e=at(s,episodes);if(s.step===4&&e.endingVariant){const v=e.endingVariant.lines[s.choices[e.endingVariant.key]];if(v)return paginate(v);}if(s.step===0)return e.introPages||paginate((e.introVariant?[...(e.introVariant.lines[s.choices[e.introVariant.key]??0]||[]),...e.intro]:null)||e.introByDoor?.[s.choices.door]||e.introByWait?.[s.choices.wait]||e.intro);if(s.step===2)return paginate(e.middle);if(s.step===4)return paginate(e.ending);const d=s.step===1?e.first:e.second,txt=d.options[s.choices[d.key]??0].text,pb=episodes.pilotBeats;if(pb&&s.pilot){const pre=(s.pilot.auto||[]).includes(d.key)?pb.auto[d.key]:(s.pilot.at===d.key&&s.pilot.took!=='legacy'?((s.choices[d.key]??0)===(PILOT.auto[d.key]??0)?pb.took.same:pb.took[s.pilot.took==='forced'?'forced':d.key]):null);if(pre)return paginate([...pre,...txt]);}return paginate(txt);}
 function evidenceAvailable(s,episodes,index){
  if(!Number.isInteger(index)||!episodes[index])return false;
  if(index<s.max||s.finished)return true;
  const stage=episodes[index].evidence.availableStep??2;
  return index===s.ep&&(s.step>stage||s.step===stage&&s.page===pages(s,episodes).length-1);
 }
 function decisionList(episodes,s){return episodes.map((e,i)=>s?at(s,episodes,i):e).flatMap((e,i)=>[{...e.first,ep:i},{...e.second,ep:i}]);}
 function restore(raw,episodes){
  const s=fresh(); if(!raw||raw.v!==3)return s;
  const ds=decisionList(episodes); for(const d of ds){const n=raw.choices?.[d.key];if(Number.isInteger(n)&&n>=0&&n<d.options.length)s.choices[d.key]=n;}
  if(raw.vip&&typeof raw.vip==='object')for(const [k,v] of Object.entries(raw.vip))if(v===true&&/^(opt|ph):[\w-]+$/.test(k))s.vip[k]=true;
  // A premium choice survives only if that premium option is still unlocked.
  for(const d of ds){const n=s.choices[d.key];if(n!==undefined&&d.options[n]?.premium&&!s.vip['opt:'+d.key])delete s.choices[d.key];}
  let reachable=0;for(let i=0;i<episodes.length-1;i++){if(s.choices[episodes[i].first.key]===undefined||s.choices[episodes[i].second.key]===undefined)break;reachable=i+1;}
  s.unlocked=!!raw.unlocked;
  // Saves from v18 and earlier never had an early lock: anyone who already read past episode 5 keeps that access.
  s.unlockedEarly=!!raw.unlockedEarly||s.unlocked||(Number.isInteger(raw.max)&&raw.max>4);
  s.max=Math.min(Number.isInteger(raw.max)?Math.max(0,raw.max):0,reachable,episodes.length-1);
  if(!s.unlocked)s.max=Math.min(s.max,9);
  if(!s.unlockedEarly)s.max=Math.min(s.max,4);
  s.ep=Math.min(Number.isInteger(raw.ep)?Math.max(0,raw.ep):0,s.max);
  s.step=Number.isInteger(raw.step)?Math.min(4,Math.max(0,raw.step)):0;
  const e=at(s,episodes);if(s.step>=1&&s.choices[e.first.key]===undefined)s.step=0;if(s.step>=3&&s.choices[e.second.key]===undefined)s.step=2;
  const revisedGate=s.ep===9&&raw.choices?.cliff!==undefined&&s.choices.stand===undefined;if(revisedGate)s.step=2;
  s.page=Number.isInteger(raw.page)?Math.max(0,Math.min(raw.page,pages(s,episodes).length-1)):0;
  if(revisedGate)s.page=0;
  s.finished=!!raw.finished&&s.max===episodes.length-1&&s.choices[episodes.at(-1).second.key]!==undefined;
  s.view=['cover','reader','pay','end'].includes(raw.view)?raw.view:'reader';if(s.view==='pay'&&(!gateAt(s,s.ep)||s.choices[episodes[s.ep].second.key]===undefined))s.view='reader';if(s.view==='end'&&!s.finished)s.view='reader';
  s.preview=!!raw.preview;
  // v23: autopilot history. Saves from before v23 already chose for themselves: they never see the autopilot.
  {const p=raw.pilot,okKey=k=>PILOT.keys.includes(k);if(p&&typeof p==='object'){s.pilot={auto:Array.isArray(p.auto)?p.auto.filter(k=>okKey(k)&&s.choices[k]!==undefined):[],took:['forced','legacy'].includes(p.took)||okKey(p.took)?p.took:null};if(okKey(p.at))s.pilot.at=p.at;}else if(Object.keys(s.choices).length)s.pilot={auto:[],took:'legacy'};}
  for(const k of Object.keys(s.metrics))s.metrics[k]=Number.isInteger(raw.metrics?.[k])?Math.max(0,raw.metrics[k]):0;
  return s;
 }
 function flags(s,episodes){const f={};for(let i=0;i<=s.ep;i++){for(const d of [episodes[i].first,episodes[i].second])if(s.choices[d.key]!==undefined)f[d.key]=s.choices[d.key];}return f;}
 function choose(s,episodes,key,n){
  const e=at(s,episodes),d=s.step===0?e.first:s.step===2?e.second:null;
  if(!d||d.key!==key||!Number.isInteger(n)||!d.options[n]||!premiumOK(s,key,d.options[n])||s.page<pages(s,episodes).length-1)return false;
  const list=decisionList(episodes),pos=list.findIndex(x=>x.key===key),old=s.choices[key];
  if(old!==undefined&&old!==n){for(const next of list.slice(pos+1))delete s.choices[next.key];s.max=s.ep;s.finished=false;}
  s.choices[key]=n;s.step++;s.page=0;s.view='reader';s.metrics.choices++;return true;
 }
 function next(s,episodes){if(s.view!=='reader')return false;if(s.page<pages(s,episodes).length-1){s.page++;return true;}if(s.step===1||s.step===3){s.step++;s.page=0;return true;}if(s.step===4){if(gateAt(s,s.ep)){s.view='pay';return true;}if(s.ep<episodes.length-1){s.ep++;s.max=Math.max(s.max,s.ep);s.step=0;s.page=0;}else{s.finished=true;s.view='end';s.metrics.finish++;}return true;}return false;}
 function back(s,episodes){if(s.page>0){s.page--;}else if(s.step>0){s.step--;s.page=pages(s,episodes).length-1;}else if(s.ep>0){s.ep--;s.step=4;s.page=pages(s,episodes).length-1;}else{s.view='cover';}return true;}
 function jump(s,episodes,ep,preview=false){if(!Number.isInteger(ep)||ep<0||ep>=episodes.length)return false;if(ep>s.max&&!preview)return false;if(preview){if(ep>=5)s.unlockedEarly=true;if(ep>=10)s.unlocked=true;for(let i=0;i<ep;i++)for(const d of [episodes[i].first,episodes[i].second])if(s.choices[d.key]===undefined)s.choices[d.key]=0;s.max=Math.max(s.max,ep);s.preview=true;}s.ep=ep;s.step=0;s.page=0;s.view='reader';return true;}
 function unlock(s,episodes){const g=gateAt(s,s.ep);if(s.view!=='pay'||!g||s.choices[episodes[s.ep].second.key]===undefined)return false;s[g.flag]=true;s.metrics.intent++;s.ep=g.ep+1;s.max=Math.max(s.max,s.ep);s.step=0;s.page=0;s.view='reader';return true;}
 const api={PILOT,pilotActive,pilotState,pilotAuto,pilotTake,GATES,gateAt,at,endingOf,premiumOK,unlock,KEY,fresh,restore,choose,next,back,flags,jump,decisionList,pages,paginate,evidenceAvailable};if(typeof module!=='undefined')module.exports=api;else root.StoryEngine=api;
})(typeof globalThis!=='undefined'?globalThis:this);
