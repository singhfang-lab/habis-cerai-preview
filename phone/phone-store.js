// Phone prototype save store. Same per-reader idea as the novel's ReaderStore, separate prefix:
// everything lives under 'phone:<readerId>:<key>'. Reader id from ?tester= / ?reader=, else the last comic reader, else 'pembaca'.
(function(root){
 const slug=s=>String(s||'').toLowerCase().normalize('NFKD').replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'').slice(0,32);
 function create(storage,search='',opts={}){
  const raw={get:k=>{try{return storage.getItem(k)}catch{return null}},set:(k,v)=>{try{storage.setItem(k,v)}catch{}},del:k=>{try{storage.removeItem(k)}catch{}}};
  const p=new URLSearchParams(search);const fromUrl=slug(p.get('tester')||p.get('reader'));
  const id=fromUrl||slug(raw.get('phone:current'))||'pembaca';if(fromUrl)raw.set('phone:current',id);
  const pre='phone:'+id+':',key=k=>pre+k,markK='phone:wiped:'+id;
  const gen=()=>raw.get(markK)||'';const g0=gen();let dead=false;
  const alive=()=>{if(dead)return false;if(gen()!==g0){dead=true;try{opts.onWiped&&opts.onWiped()}catch{}return false}return true};
  const get=(k,d)=>{try{const v=raw.get(key(k));return v==null?d:JSON.parse(v)}catch{return d}};
  const set=(k,v)=>{if(!alive())return false;raw.set(key(k),JSON.stringify(v));return true};
  const keys=()=>{const out=[];try{for(let i=0;i<storage.length;i++)out.push(storage.key(i))}catch{}return out};
  function wipe(){const gone=keys().filter(k=>k&&k.startsWith(pre));gone.forEach(raw.del);raw.set(markK,Date.now()+'-'+Math.random().toString(36).slice(2,7));dead=true;return gone.length}
  return {id,key,get,set,wipe,alive,markK,keys,deviceGet:raw.get};
 }
 const api={create,slug};if(typeof module!=='undefined')module.exports=api;else root.PhoneStore=api;
})(this);
