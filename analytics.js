// v20: local-only reader analytics. Nothing leaves the device; export is a JSON download the tester triggers.
(function(root){
 const KEY='nadira-analytics-v20',MAX=5000;
 function create(storage,now=()=>Date.now()){
  let data;try{data=JSON.parse(storage.getItem(KEY))||null;}catch{data=null;}
  if(!data||!Array.isArray(data.events))data={v:1,session:Math.random().toString(36).slice(2,10),created:now(),events:[]};
  const sessionStart=now();
  function persist(){try{storage.setItem(KEY,JSON.stringify(data));}catch{}}
  function log(type,detail={}){const e={t:now(),type,...detail};data.events.push(e);if(data.events.length>MAX)data.events.splice(0,data.events.length-MAX);persist();return e;}
  function events(type){return type?data.events.filter(e=>e.type===type):data.events.slice();}
  function summary(){const by=t=>events(t);const pay=by('pay_leave');const last={};for(const e of by('panel'))last[e.ep]=Math.max(last[e.ep]??-1,e.idx);
   return {episodesStarted:[...new Set(by('ep_start').map(e=>e.ep))].length,episodesFinished:[...new Set(by('ep_finish').map(e=>e.ep))].length,choices:by('choice').length,premiumTaps:by('premium_tap').length,premiumUnlocks:by('premium_unlock').length,paywallViews:by('pay_view').length,paywallUnlocks:by('pay_unlock').length,avgPaywallMs:pay.length?Math.round(pay.reduce((a,e)=>a+(e.ms||0),0)/pay.length):0,lastPanelByEpisode:last};}
  function exportJSON(){return JSON.stringify({exported:now(),session:data.session,created:data.created,sessionStart,summary:summary(),events:data.events},null,1);}
  function clear(){data.events=[];persist();}
  return {log,events,summary,exportJSON,clear,KEY};
 }
 const api={create,KEY};if(typeof module!=='undefined')module.exports=api;else root.Analytics=api;
})(typeof globalThis!=='undefined'?globalThis:this);
