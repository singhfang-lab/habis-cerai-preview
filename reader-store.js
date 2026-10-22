// v22.1: per-reader save slots on one browser. Everything the story stores lives under 'hcp:<readerId>:<key>'.
// Reader id: ?tester=ID or ?reader=ID in the URL; otherwise the reader last chosen in the switcher; otherwise a
// random anonymous id kept per browser. A monotonically increasing revision guards against stale-tab overwrites.
(function(root){
 const LEGACY=['nadira-emotional-arc-v8','nadira-bilingual-prefs','nadira-phone-read-v15','nadira-endings-v20','nadira-reader-position-v13','nadira-analytics-v20'];
 const slug=v=>String(v||'').trim().toLowerCase().replace(/[^a-z0-9_-]+/g,'-').replace(/^-+|-+$/g,'').slice(0,32);
 const rnd=()=>Math.random().toString(36).slice(2,8);
 function create(storage,search='',opts={}){
  const raw={get:k=>{try{return storage.getItem(k);}catch{return null;}},set:(k,v)=>{try{storage.setItem(k,v);return true;}catch{return false;}},del:k=>{try{storage.removeItem(k);}catch{}}};
  const readJSON=(k,d)=>{try{return JSON.parse(raw.get(k))??d;}catch{return d;}};
  let params;try{params=new URLSearchParams(search);}catch{params=new URLSearchParams('');}
  const fromUrl=slug(params.get('tester')||params.get('reader'));
  let deviceDefault=raw.get('hcp:default');if(!deviceDefault){deviceDefault='anon-'+rnd();raw.set('hcp:default',deviceDefault);}
  const id=fromUrl||slug(raw.get('hcp:current'))||deviceDefault;
  const source=fromUrl?(params.get('tester')?'tester':'reader'):(raw.get('hcp:current')?'switcher':'anonymous');
  const key=k=>'hcp:'+id+':'+k;
  // reader directory (names shown in the switcher)
  function readers(){const list=readJSON('hcp:readers',[]);return Array.isArray(list)?list:[];}
  function addReader(rid,name){const list=readers();if(!list.some(r=>r.id===rid)){list.push({id:rid,name:String(name||rid).slice(0,40),created:Date.now()});raw.set('hcp:readers',JSON.stringify(list));}return list;}
  addReader(deviceDefault,opts.anonName||'Anonim');addReader(id,fromUrl||undefined);
  // one-time migration of the un-namespaced v22 save into the default reader (or the tester it was recorded for)
  let migrated=null;
  if(!raw.get('hcp:migrated')&&LEGACY.some(k=>raw.get(k)!==null)){
   const legacyTester=slug(readJSON('nadira-analytics-v20',{})?.tester);const target=legacyTester||deviceDefault;addReader(target,legacyTester||undefined);
   for(const k of LEGACY){const v=raw.get(k);if(v!==null&&raw.get('hcp:'+target+':'+k)===null)raw.set('hcp:'+target+':'+k,v);}
   if(raw.get('hcp:'+target+':rev')===null)raw.set('hcp:'+target+':rev','1');
   raw.set('hcp:migrated',target);migrated=target;}
  // namespaced access
  const get=k=>raw.get(key(k)),set=(k,v)=>raw.set(key(k),v),del=k=>raw.del(key(k));
  const scoped={getItem:get,setItem:set,removeItem:del};
  // revision guard
  let rev=Number(get('rev'))||0;
  const storedRev=()=>Number(get('rev'))||0;
  function isStale(){return storedRev()>rev;}
  function commit(entries){// entries: {key:value}. Returns 'ok' | 'same' | 'stale'
   if(isStale())return 'stale';
   const changed=Object.entries(entries).filter(([k,v])=>get(k)!==v);if(!changed.length)return 'same';
   rev=storedRev()+1;for(const [k,v] of changed)if(!set(k,v))throw new Error('storage full');set('rev',String(rev));return 'ok';}
  function adopt(){rev=storedRev();return rev;}
  function switchUrl(rid,loc){const p=new URLSearchParams(loc.search);p.delete('tester');p.delete('reader');p.set('reader',rid);return loc.pathname+'?'+p.toString()+loc.hash;}
  function newReader(name){const base=slug(name)||'pembaca';let rid=base,i=2;while(readers().some(r=>r.id===rid))rid=base+'-'+i++;addReader(rid,name);return rid;}
  function choose(rid){raw.set('hcp:current',rid);}
  const me=()=>readers().find(r=>r.id===id)||{id,name:id};
  return {id,source,key,get,set,del,scoped,readers,newReader,choose,switchUrl,me,commit,adopt,isStale,rev:()=>rev,storedRev,migrated,deviceDefault,LEGACY};
 }
 const api={create,slug,LEGACY};if(typeof module!=='undefined')module.exports=api;else root.ReaderStore=api;
})(typeof globalThis!=='undefined'?globalThis:this);
