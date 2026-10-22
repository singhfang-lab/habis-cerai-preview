// v20/v22: local-only reader analytics. Nothing leaves the device; export is a JSON download the tester triggers.
// v22 adds what a small reader test needs: tester id + per-load session, panel and decision dwell, leave/return
// (abandon points), premium declines, phone usage, replays, endings, and a per-episode / per-decision summary.
(function(root){
 const KEY='nadira-analytics-v20',MAX=5000,IDLE=120000;
 const median=a=>{if(!a.length)return 0;const b=a.slice().sort((x,y)=>x-y),m=b.length>>1;return b.length%2?b[m]:Math.round((b[m-1]+b[m])/2);};
 const rate=(a,b)=>b?Math.round(a/b*1000)/1000:0;
 function create(storage,now=()=>Date.now(),opts={}){
  let data;try{data=JSON.parse(storage.getItem(KEY))||null;}catch{data=null;}
  if(!data||!Array.isArray(data.events))data={v:1,session:Math.random().toString(36).slice(2,10),created:now(),events:[]};
  data.v=2;if(opts.tester)data.tester=String(opts.tester).slice(0,40);if(opts.reader)data.reader=String(opts.reader).slice(0,40);
  const sessionStart=now(),sid=Math.random().toString(36).slice(2,10);
  function persist(){try{storage.setItem(KEY,JSON.stringify(data));}catch{}}
  // v22.1: re-read before appending so two tabs of the same reader never drop each other's events
  function reload(){try{const d=JSON.parse(storage.getItem(KEY));if(d&&Array.isArray(d.events)){d.tester=data.tester??d.tester;d.reader=data.reader??d.reader;data=d;}}catch{}}
  function log(type,detail={}){reload();const e={t:now(),sid,type,...detail};data.events.push(e);if(data.events.length>MAX)data.events.splice(0,data.events.length-MAX);persist();return e;}
  function events(type){reload();return type?data.events.filter(e=>e.type===type):data.events.slice();}
  function setTester(id){data.tester=String(id||'').slice(0,40)||undefined;persist();}
  function summary(){reload();const all=data.events,by=t=>all.filter(e=>e.type===t);const pay=by('pay_leave');const last={};for(const e of by('panel'))last[e.ep]=Math.max(last[e.ep]??-1,e.idx);
   // per episode: starts, finishes, completion, active reading time (panel dwell, idle-capped) per session
   const eps={};const ep=i=>eps[i]=eps[i]||{starts:0,finishes:0,readMs:{},panels:0};
   for(const e of by('ep_start'))ep(e.ep).starts++;for(const e of by('ep_finish'))ep(e.ep).finishes++;
   for(const e of by('panel')){const x=ep(e.ep);x.panels++;if(e.prevEp!==undefined&&e.prevMs>0){const y=ep(e.prevEp),k=e.sid||'-';y.readMs[k]=(y.readMs[k]||0)+Math.min(e.prevMs,IDLE);}}
   const perEpisode=Object.fromEntries(Object.entries(eps).sort((a,b)=>a[0]-b[0]).map(([i,x])=>[i,{starts:x.starts,finishes:x.finishes,completion:rate(x.finishes,x.starts),medianReadMs:median(Object.values(x.readMs)),panelViews:x.panels}]));
   // decisions: distribution and time-to-decide
   const dec={};for(const e of by('choice')){const d=dec[e.key]=dec[e.key]||{n:{},ms:[],premium:0,phone:0};d.n[e.n]=(d.n[e.n]||0)+1;if(e.ms>0)d.ms.push(Math.min(e.ms,IDLE));if(e.premium)d.premium++;if(e.phone)d.phone++;}
   const decisions=Object.fromEntries(Object.entries(dec).map(([k,d])=>[k,{picks:d.n,medianMs:median(d.ms),premium:d.premium,phone:d.phone}]));
   // abandon points: where readers left the page and never came back in that session
   const leaves=by('leave'),lastLeave={};for(const e of leaves)lastLeave[e.sid||'-']=e;
   const abandon={};for(const e of Object.values(lastLeave)){const k=`ep${(e.ep??-1)+1}:${e.view}:${e.idx??'-'}`;abandon[k]=(abandon[k]||0)+1;}
   const endings={};for(const e of by('ending'))endings[e.id]=(endings[e.id]||0)+1;
   const routes={};for(const e of by('choice'))if(e.key==='reconcile')routes[['A','R','S'][e.n]||e.n]=(routes[['A','R','S'][e.n]||e.n]||0)+1;
   const sessions=[...new Set(all.map(e=>e.sid).filter(Boolean))];
   const taps=by('premium_tap').length,unlocks=by('premium_unlock').length;
   return {tester:data.tester||null,reader:data.reader||null,device:data.session,sessions:sessions.length,languages:[...new Set(all.map(e=>e.lang).filter(Boolean))],
    episodesStarted:[...new Set(by('ep_start').map(e=>e.ep))].length,episodesFinished:[...new Set(by('ep_finish').map(e=>e.ep))].length,
    choices:by('choice').length,premiumTaps:taps,premiumUnlocks:unlocks,premiumDeclines:by('premium_decline').length,premiumConversion:rate(unlocks,taps),
    paywallViews:by('pay_view').length,paywallUnlocks:by('pay_unlock').length,paywallConversion:rate(by('pay_unlock').length,by('pay_view').length),
    avgPaywallMs:pay.length?Math.round(pay.reduce((a,e)=>a+(e.ms||0),0)/pay.length):0,
    phoneOpens:by('phone_open').length,phoneThreads:by('phone_thread').length,replays:by('replay').length,teaserViews:by('teaser_view').length,
    leaves:leaves.length,returns:by('return').length,abandonPoints:abandon,endings,routes,perEpisode,decisions,lastPanelByEpisode:last};}
  function exportJSON(){return JSON.stringify({exported:now(),reader:data.reader||null,tester:data.tester||null,session:data.session,sid,created:data.created,sessionStart,summary:summary(),events:data.events},null,1);}
  function clear(){reload();data.events=[];persist();}
  return {log,events,summary,exportJSON,clear,setTester,sid,KEY};
 }
 const api={create,KEY,median};if(typeof module!=='undefined')module.exports=api;else root.Analytics=api;
})(typeof globalThis!=='undefined'?globalThis:this);
