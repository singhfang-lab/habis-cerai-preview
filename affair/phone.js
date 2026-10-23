(function(){
'use strict';
const {TH,SAY,BEATS,UI,EPS,APPS,DECOR,TICKET,ANSWER,IMAGES,VAULT}=window.PHONE;const BILL=null;const SHOWER_END='22.46';
APPS.forEach(a=>a.re.forEach(x=>{x._ep=1;}));
// tag every beat (and nested branch beats) with its episode + top-level index
(function(){let ep=1;const t=(a,e)=>a&&a.forEach(x=>{x._ep=e;(x.opts||[]).forEach(o=>t(o.re,e));t(x.ifPilot,e);t(x.ifMe,e);});BEATS.forEach((b,i)=>{if(b.k==='ep')ep=b.ep;b._ep=ep;b._bi=i;(b.opts||[]).forEach(o=>t(o.re,ep));t(b.ifPilot,ep);t(b.ifMe,ep);});})();
const store=PhoneStore.create(window.localStorage,location.search,{onWiped:()=>location.reload()});
const $=id=>document.getElementById(id);const qs=new URLSearchParams(location.search);
const fresh=lang=>({v:1,n:1,speed:1,paused:false,ch:{},how:{},done:{},inner:{},opened:{},seen:{},unlock:null,lang:lang||'id',t0:Date.now()});
let st=store.get('state',null);
if(!st||st.v!==1){const dl=(qs.get('lang')||store.deviceGet('hcp:last-lang')||'').replace(/"/g,'');st=fresh(dl==='zh'?'zh':'id');}
['ch','how','done','inner','opened','seen'].forEach(k=>{if(!st[k])st[k]={};});
if(qs.get('lang')==='zh'||qs.get('lang')==='id')st.lang=qs.get('lang');
(function(){try{const k='affair:'+store.id+':lang-seed';const v=localStorage.getItem(k);if(v){localStorage.removeItem(k);if(!store.get('state',null))st.lang=v==='zh'?'zh':'id';}}catch{}})();
const L=s=>{if(s==null)return '';s=String(s);if(!s.includes('|'))return s;const p=s.split('|');return st.lang==='zh'?p[1]:p[0];};
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const T=k=>esc(L(UI[k]));
const clk=c=>st.lang==='zh'?String(c||'').replace('.',':'):String(c||'');
const APPN={Chat:0,Pesan:0,Lensa:1,LiveKu:2,Email:3,DompetKu:4,Galeri:5,Telepon:8};const appName=a=>L(UI.apps[APPN[a]]||a);
let wiping=false;const save=()=>{if(!wiping)store.set('state',st);};

// ---------- timeline ----------
// relationship + agency, derived from choices (never stored separately, so replays stay consistent)
function heat(){let h=0;for(const b of BEATS)if((b.k==='choice'||b.k==='quick')&&st.ch[b.key]!=null){const o=b.opts[st.ch[b.key]];h+=(o&&o.a)||0;}return h;}
const PILOTS=BEATS.filter(b=>b.k==='choice'&&b.pilot!=null);const SELFS=BEATS.filter(b=>b.k==='choice'&&b.pilot==null);
const meCount=()=>PILOTS.filter(b=>st.how[b.key]==='me').length;const selfCount=()=>SELFS.filter(b=>st.ch[b.key]!=null).length;
const aryaPct=()=>Math.max(5,Math.min(100,30+heat()*6));
let GOT=new Set();
function ok(w){if(!w)return true;return w.split('&').every(c=>{let m;
 if((m=c.match(/^(!?)got:(\w+)$/)))return m[1]?!GOT.has(m[2]):GOT.has(m[2]);
 if((m=c.match(/^(!?)seen:(\w+)$/)))return m[1]?!st.seen[m[2]]:!!st.seen[m[2]];
 if((m=c.match(/^(heat|me)(>=|<)(-?\d+)$/))){const v=m[1]==='heat'?heat():meCount();return m[2]==='>='?v>=+m[3]:v<+m[3];}
 if((m=c.match(/^(\w+)(!=|=)([\d,]+)$/))){const v=st.ch[m[1]];const inS=v!=null&&m[3].split(',').map(Number).includes(v);return m[2]==='='?inS:!inS;}return true;});}
const fmtMin=v=>{v=((v%1440)+1440)%1440;return String(Math.floor(v/60)).padStart(2,'0')+'.'+String(v%60).padStart(2,'0');};
function timeline(){const out=[];const got=new Set();GOT=got;let cur=null;
 const stamp=x=>{if(x.clock)cur=toMin(x.clock);if(x.cost&&cur!=null)cur+=x.cost;x._clk=cur!=null?fmtMin(cur):null;};
 const push=x=>{if(ok(x.when)){stamp(x);out.push(x);if(x.k==='vault')got.add('vault');}};
 for(const b of BEATS){if(!ok(b.when))continue;
  if(b.k==='hub'){const left=toMin(b.end||SHOWER_END)-(cur||0);const avail=APPS.filter(a=>!got.has(a.id)&&a.cost<=left);
   if(!b.peek&&!avail.length)continue;stamp(b);b._left=left;b._got=[...got];out.push(b);if(b.peek)continue;
   const c=st.ch[b.key];const a=c!=null?APPS[c]:null;if(!a||b._got.includes(a.id)||a.cost>left)break;
   got.add(a.id);cur+=a.cost;a.re.forEach((x,j)=>{if(ok(x.when)){x._clk=fmtMin(cur);x._app=a.id;out.push(x);}});continue;}
  stamp(b);out.push(b);if(b.k==='vault')got.add('vault');
  if(b.k==='choice'||b.k==='quick'){const c=st.ch[b.key];if(c==null)break;const o=b.opts[c];
   if(o.send)out.push({k:'msg',th:o.th||b.th,mine:true,time:null,t:o.send,_sent:true,_ep:b._ep});
   (o.re||[]).forEach(push);if(b.k==='choice')((st.how[b.key]==='pilot'?b.ifPilot:b.ifMe)||[]).forEach(push);}
  if(b.k==='act'&&!st.done[b.key])break;if(b.k==='paywall'&&!st.unlock)break;}
 return out;}
const gotNow=()=>{timeline();return GOT;};
const isBlocked=b=>!!b&&((b.k==='hub'&&!b.peek&&!hubOk(b))||((b.k==='choice'||b.k==='quick')&&st.ch[b.key]==null)||(b.k==='act'&&!st.done[b.key])||(b.k==='paywall'&&!st.unlock));
const hubOk=b=>{const c=st.ch[b.key];const a=c!=null?APPS[c]:null;return !!a&&!(b._got||[]).includes(a.id)&&a.cost<=b._left;};
const toMin=c=>{const [h,m]=String(c).split('.').map(Number);let v=h*60+m;if(h<5)v+=1440;return v;};

// ---------- derive phone state by replaying the visible beats ----------
function derive(tl,n){const S={day:'Kamis|星期四',clock:'06.40',view:'lock',lockN:[],threads:{},scene:null,live:{cmts:[],viewers:0,img:'p-live.webp',pin:null,gift:null},call:null,mail:null,wallet:null,notes:null,lensa:null,last:tl[n-1],lastI:n-1,inner:null,typing:null,dark:null,thread:null};
 S.shower=0;S.got=new Set();S.memo=null;S.pop=null;
 for(let i=0;i<n&&i<tl.length;i++){const b=tl[i];if(b._clk)S.clock=b._clk;else if(b.clock)S.clock=b.clock;if(b.day)S.day=b.day;if(b.shower!=null)S.shower=b.shower;if(b.k==='hub')S.hubOn=true;if(b._app)S.got.add(b._app);
  switch(b.k){
   case 'lock':S.view='lock';S.lockN=b.notifs||[];S.lockSolo=!!b.solo;S.lockExp=!!b.exp;S.lockB=b;if(b.sleepy)S.sleepy=true;break;
   case 'msg':case 'sys':{if(b.k==='msg'&&b.clock&&i===n-1&&!st.opened[i]&&!(S.view==='chat'&&S.thread===b.th)){S.banner={...b,_i:i};const t=S.threads[b.th]||(S.threads[b.th]=[]);t.push({...b,_i:i});break;}const t=S.threads[b.th]||(S.threads[b.th]=[]);if(b.mine){for(let j=t.length-1;j>=0;j--)if(t[j].draft)t.splice(j,1);}t.push({...b,_i:i});if(!b.time&&b._sent)b.time=S.clock;S.view='chat';S.thread=b.th;break;}
   case 'typing':S.view='chat';S.thread=b.th;S.threads[b.th]=S.threads[b.th]||[];break;
   case 'draft':{const t=S.threads[b.th]||(S.threads[b.th]=[]);t.push({...b,k:'msg',mine:true,draft:true,_i:i});S.view='chat';S.thread=b.th;break;}
   case 'replay':{const t=S.threads[b.th]||[];for(let j=t.length-1;j>=0;j--)if(t[j].vn){t[j]._pi=i;t[j]._plays=b.n;break;}S.view='chat';S.thread=b.th;break;}
   case 'scrollup':{const t=S.threads[b.th]||(S.threads[b.th]=[]);t.unshift(...b.old.map(o=>({k:'msg',th:b.th,...o,_i:i,_first:true})),{k:'sys',th:b.th,t:b.gap,_i:i});S.view='chat';S.thread=b.th;S.scrollup=i;break;}
   case 'paywall':{const t=S.threads[b.th]||(S.threads[b.th]=[]);b.locked.forEach((m,j)=>t.push({k:'msg',th:b.th,...m,locked:true,_pw:true,_i:i}));S.view='chat';S.thread=b.th;S.paywall=b;break;}
   case 'unblur':{const t=S.threads[b.th]||[];t.forEach(m=>{if(m._pw){m.locked=false;m._rev=i;}});S.view='chat';S.thread=b.th;S.paywall=null;break;}
   case 'gallery':S.view='gallery';S.gallery={...b,_i:i};break;
   case 'hub':S.view='hub';S.hub={...b,_i:i};break;
   case 'ride':case 'bank':case 'shop':S.view=b.k;S.app={...b,_i:i};break;
   case 'memo':if(i===n-1)S.memo=b;break;
   case 'pop':if(i===n-1)S.pop={...b,_i:i};if(b.hub&&S.hub)S.view='hub';break;
   case 'vault':S.view='vault';S.vault={...b,_i:i};S.got.add('vault');break;
   case 'ep':S.view='ep';S.epc={...b,_i:i};break;
   case 'epend':S.view='epend';S.epe={...b,_i:i};break;
   case 'mail':S.view='mail';S.mail=b;break;
   case 'wallet':S.view='wallet';S.wallet=b;break;
   case 'scene':S.view='scene';S.scene={...b,items:[],img:b.img||null,_i:i};break;
   case 'say':case 'scap':if(S.scene){if(S.view!=='scene')S.view='scene';S.scene.items.push({...b,_i:i});if(b.img)S.scene.img=b.img;}break;
   case 'live':S.view='live';if(b.fresh)S.live={cmts:[],viewers:0,img:b.img||'p-live.webp',pin:null,gift:null};S.live.host=b.fresh?b.host:S.live.host;S.live.cap=b.cap?{t:b.cap,_i:i}:S.live.cap;S.live.frame=b.frame?{...b,_i:i}:null;if(b.hot)S.live.hot={t:b.hot,_i:i};if(b.ended)S.live.ended={...b,_i:i};if(b.img)S.live.img=b.img;if(b.viewers)S.live.viewers=b.viewers;if(b.cmt)S.live.cmts.push({t:b.cmt,_i:i});if(b.pin){S.live.pin=b.pin;S.live.bill=!!b.bill;}if(b.gift)S.live.gift={g:b.gift,_i:i};break;
   case 'call':S.view='call';S.call={...b,lines:[]};break;
   case 'line':if(S.call){S.call.lines.push({...b,_i:i});S.call.on=true;S.view='call';}break;
   case 'notes':S.view='notes';S.notes=b;break;
   case 'lensa':{S.view='lensa';const pv=S.lensa;S.lensa=b.fresh?{...b,_i:i,_new0:0}:{...(pv||{}),...b,_i:i};if(b.add){const o=(pv&&pv.cmts)||[];S.lensa.cmts=[...o,...b.add];S.lensa._new0=o.length;}break;}
   case 'dark':S.view='dark';S.dark=b;break;
   case 'end':S.view='end';break;
   case 'home':S.view='home';break;
   case 'quick':if(b.in==='lensa'){S.view='lensa';S.lensa={draft:b.draft,key:b.key};}if(b.in==='call')S.view='call';if(b.in==='scene'&&S.scene)S.scene.items.push({...b,_i:i});if(b.in==='chat'){S.view='chat';S.thread=b.th;}break;
   case 'act':if(b.in==='calc'){S.view='calc';S.calc=b;}if(b.in==='lock'){S.view='lock';if(b.notifs){S.lockN=b.notifs;S.lockExp=false;S.lockB=b;}if(b.sleepy)S.sleepy=true;}if(b.in==='lensa')S.view='lensa';if(b.in==='scene'&&S.scene)S.scene.items.push({...b,_i:i});if(b.in==='home')S.view='home';if(b.in==='chat'){S.view='chat';S.thread=b.th;}
     if(b.key==='facedown'&&st.done.facedown)S.view='dark';break;
   case 'choice':if(b.in==='live')S.view='live';if(b.in==='call')S.view='call';if(b.th){S.view='chat';S.thread=b.th;}break;
  }
  if(b.hub&&S.hub&&b.k!=='pop'&&b.k!=='hub')S.view='hub';
  if(b.k==='inner')S.inner=(i===n-1)?b:null;if(b.wake)S.awake=true;
  if(b.k==='typing'&&i===n-1)S.typing=b;
 }
 // after the call is answered we stay on the call screen; after declining we go back to chat/live
 {const t=tl[n-1];S.tgt=(t&&t.k==='act'&&t.mode==='target'&&!st.done[t.key])?t:null;}
 const lb=tl[n-1];if(lb&&lb.k==='inner'&&S.view==='call'&&S.call.ep1&&!S.call.on&&st.ch.call!=null&&st.ch.call!==0)S.view=st.ch.call===1?'chat':'live';
 return S;}

// ---------- pieces ----------
function av(key,cls=''){const t=TH[key];if(t&&t.img)return `<span class="pav ${cls}"><img src="assets/${t.img}" alt=""></span>`;return `<span class="pav ini ${cls} c-${key}">${esc(t?t.av:key)}</span>`;}
function faceAv(who,ex,cls=''){const c=SAY[who]||{};if(c.img)return `<span class="fav ${cls}"><img src="assets/${c.img}" alt=""></span>`;return `<span class="fav ini ${cls} c-${who}">${esc(c.ini||who)}</span>`;}
function statusBar(S){const m=toMin(S.clock),bat=Math.max(6,Math.round(82-(m-400)*0.06));return `<div class="sb${S.view==='live'||S.view==='lock'||S.view==='call'||S.view==='dark'||S.view==='scene'||S.view==='ep'||S.view==='epend'||S.view==='gallery'||S.view==='hub'||S.view==='vault'||S.view==='calc'?' light':''}"><b>${esc(clk(S.clock))}</b><span class="isl"></span><span class="sig">▂▄▆ 4G</span><span class="bat${bat<20?' low':''}"><i style="width:${bat}%"></i></span><small>${bat}%</small></div>`;}
const isNew=i=>i===st.n-1;
function msgHTML(m,th){if(m.k==='sys')return `<div data-k="m${m._i}" class="sysm${isNew(m._i)?' new':''}">${esc(L(m.t))}</div>`;
 const mine=!!m.mine;const from=th==='group'&&!mine?`<small class="fr">${esc(L(m.from))}</small>`:'';
 const nw=isNew(m._i);let body;
 if(m.locked){const full=L(m.t);const cut=Math.max(8,Math.round(full.length*.42));body=m.vn?`<div class="vnm lockv"><i>🔒</i>${'<s></s>'.repeat(20)}<small>${esc(m.vn)}</small></div>`:m.loc?`<div class="loc lockv"><i class="map"></i><b>📍 ${esc(L(m.loc))}</b></div>`:`<span class="lk0">${esc(full.slice(0,cut))}</span><span class="lkb">${esc(full.slice(cut))}</span>`;body+=`<span class="lkt">🔒 ${T('pwBadge')}</span>`;}
 else if(m.gone){body=nw?`<span class="gt">${esc(L(m.t))}</span><span class="gd">🚫 ${T('deleted')}</span>`:`<span class="gd only">🚫 ${T('deleted')}</span>`;}
 else if(m.photo)body=`<div class="photo" data-zoom="1"><img src="assets/p-fakephoto.webp" alt=""><span>${T('photo')}</span></div>${esc(L(m.t))}`;
 else if(m.img)body=`<div class="photo pimg" data-zoom="${m.img}" data-cap="${esc(L(m.cap||''))}"><img src="assets/${m.img}" alt=""></div>${esc(L(m.t))}`;
 else if(m.vn){const pl=nw||isNew(m._pi);body=`<div class="vnm${pl?' playing':''}"><i>${pl?'❚❚':'▶'}</i>${'<s></s>'.repeat(20)}<small>${esc(m.vn)}</small></div>${m._plays?`<small class="plays${isNew(m._pi)?' new':''}">${esc(L(UI.plays).replace('{n}',m._plays))}</small>`:''}<em class="vt${pl?' late':''}"><b>${T('tr')}</b> ${esc(L(m.tr))}</em>`;}
 else if(m.loc)body=`<div class="loc"><i class="map"><b class="pinA"></b><b class="pinN"></b></i><b>📍 ${esc(L(m.loc))}</b><small>${T('locLive')}</small></div>${esc(L(m.t))}`;
 else if(m.shot)body=shotHTML(m.shot)+esc(L(m.t));
 else body=(m.att?attHTML():'')+esc(L(m.t));
 const cls=`${m.draft?' draft':''}${m.gone?' gone':''}${m.locked?' locked':''}${m._rev!=null&&isNew(m._rev)?' reveal':''}${m._first?' first':''}`;
 const dh=m.date?`<div class="sysm date">${esc(L(m.date))}</div>`:'';
 return `${dh}<div data-k="m${m._i}${m._first?'f':''}${m._pw?'p'+(m.vn?'v':m.loc?'l':'t'):''}" class="m ${mine?'me':'them'}${cls}${isNew(m._i)?' new':''}${m.fx==='shake'&&isNew(m._i)?' jolt':''}">${from}${m.draft?`<small class="drl">✎ ${T('draft')}</small>`:''}<div class="mb">${body}<span class="mt">${esc(clk(m.time||''))}${mine?` <i class="rr${m._read?' blue':''}">✓✓</i>`:''}</span></div></div>`;}
function chatHTML(S){const k=S.thread,t=TH[k],list=S.threads[k]||[];
 // read receipts: my message turns blue once anyone answers after it
 let html=list.map((m,j)=>msgHTML({...m,_read:list.slice(j+1).some(x=>!x.mine&&x.k==='msg')},k)).join('');
 const typing=(S.typing&&S.typing.th===k)||typingTh===k;const tstop=S.typing&&S.typing.stop;
 return `<div class="app chat"><div class="ch"><span class="bk">‹</span>${av(k)}<div><b>${esc(L(t.name))}</b><small${tstop?' class="tsub"':''}>${typing?T('typing'):esc(L(t.sub))}</small></div><span class="ci">${t.app==='lensa'?'Lensa':'📞'}</span></div>
 <div class="msgs" id="msgs">${html}${typing?`<div data-k="typing" class="m them new${tstop?' tstop':''}"><div class="mb dots"><i></i><i></i><i></i></div></div>`:''}</div><div class="kb" id="kb"></div></div>`;}
function attHTML(){return `<div class="atts"><div class="att1"><div class="rcpt"><b>✓</b><span>${T('attAmt')}</span><i></i><i></i><i></i></div><small>🔒 ${T('attT')}</small></div><div class="att1"><img src="assets/p-fakephoto.webp" alt=""><small>🔒 ${T('attC')}</small></div></div>`;}
function shotHTML(x){return `<div class="shot"><div class="shh">👥 <b>${esc(L(x.title))}</b><small>${esc(L(x.n||''))}</small></div><p class="shd">${T('grpDesc')}: <i>${esc(L(x.desc))}</i></p>${(x.rows||[]).map(r=>`<p class="shr">${esc(L(r))}</p>`).join('')}</div>`;}
function billHTML(full){const B=BILL;return `<div class="bill${full?' full':''}"><div class="bh">${esc(L(B.school))}</div>${B.rows.map(r=>`<div class="br"><span>${esc(L(r[0]))}</span><b>${esc(r[1])}</b></div>`).join('')}<div class="br tot"><span>${esc(L(B.total[0]))}</span><b>${esc(B.total[1])}</b></div>${full?'':`<div class="bcut">${esc(L(B.cut))}</div>`}<div class="br paid"><span>${esc(L(B.paid[0]))}</span><b>−${esc(B.paid[1])}</b></div><small class="bby">${esc(L(B.by))}</small></div>`;}
const nkey=x=>x.id||(x.pile?'pile':String(x.title)+'|'+String(x.t)).slice(0,60);
const hl=t=>esc(t);
const LKI={Chat:'💬',Lensa:'◎',Telepon:'📞',Email:'✉',LiveKu:'●'};
function lockHTML(S){const B=S.lockB||{};const tg=S.tgt&&S.tgt.in==='lock'?S.tgt:null;
 const pk=(prevR&&prevR.view==='lock'&&prevR.lockB)?new Set(prevR.lockN.map(nkey)):null;let ni=0;const stg=B.stagger||0.12;
 const one=(x)=>{const k=nkey(x);const nw=pk?!pk.has(k):isNew(S.lastI);const d=nw?`animation-delay:${(ni++)*stg}s`:'';const isT=tg&&tg.tgt===k;const T_=isT?` tgt" data-actgo="${tg.key}`:'';
  if(x.pile){const p=x.peek;return `<div data-k="ln-${k}" class="ln pile${p?' peek':''}${nw?' new':''}${T_}" style="${d}">${p?`<span class="la">${LKI[p.app]||'💬'} ${esc(appName(p.app))}</span><b>${esc(L(p.title))}</b><p class="pk">${hl(L(p.t))}</p>`:''}<i></i><i></i><em class="pc">${esc(L(x.pile))}</em></div>`;}
  return `<div data-k="ln-${k}" class="ln${x.avb?' hasav':''}${nw?' new':''}${T_}" style="${d}">${x.avb?`<img class="lav" src="assets/${x.avb}" alt="">`:''}<span class="la">${LKI[x.app]||'💬'} ${esc(appName(x.app))}</span><b>${hl(L(x.title))}</b><span class="lt">${esc(clk(x.time||''))}</span><p>${hl(L(x.t))}</p>${x.thumb?`<img class="lthumb" src="assets/${x.thumb}" alt="">`:''}</div>`;};
 const cnt=S.lockExp&&B.count?`<div class="lk-ex"><span>${T('notifC')}</span><b class="cnt" data-from="${B.count[0]}" data-to="${B.count[1]}">${(S.last===B&&!RM?B.count[0]:B.count[1]).toLocaleString('en-US')}</b></div>`:'';
 const pro=!!(B.pro||(S.last&&S.last.pro));const sl=pro;
 const cls=`${S.lockSolo?' solo':''}${S.lockExp?' exp':''}${sl&&S.awake?' awake':''}${sl&&!S.awake&&!S.lockExp?' buzz':''}`;
 const pinning=S.last&&S.last.k==='act'&&S.last.mode==='pin'&&!st.done[S.last.key];
 const lo=B.lockout&&S.last===B?`<div class="lockout new"><b>🔒 ${T('lockout')}</b><em class="locd">1:00</em><small>${T('lockoutSub')}</small></div>`:'';
 return `<div class="app lock wall${cls}${pinning?' pinning':''}${lo?' locked':''}"><div class="wallimg"><img src="assets/p-wall.webp" alt=""></div><div class="lk-t">${esc(clk(S.clock))}</div><div class="lk-d">${esc(L(S.day))}</div>${cnt}<div class="lk-n">${S.lockN.map(one).join('')}</div>${lo}<div class="lk-h" id="lkh"></div></div>`;}
function ticketHTML(mini,cls=''){const K=TICKET;return `<div class="ticket${mini?' mini':''} ${cls}"${mini?' data-ticket="1"':''}><div class="tk-l"><small>${esc(K.cin)}</small><b>${esc(K.film)}</b><div class="tk-g"><span><i>${T('tkDay')}</i>${esc(L(K.day))}</span><span class="tk-date"><i>${T('tkDate')}</i>${esc(K.date)}</span><span><i>${T('tkTime')}</i>${esc(clk(K.time))}</span></div><div class="tk-g"><span><i>STUDIO</i>2</span><span><i>${T('tkSeat')}</i>${esc(K.seat)}</span></div></div><div class="tk-r"><span>ADMIT 2</span></div></div>`;}
const evN=S=>(S&&S.got?S.got.size:0);
function showerHTML(S){if(!S.shower||!['lock','hub','chat','gallery','ride','bank','shop','dark','call','calc','vault'].includes(S.view))return '';const left=Math.max(0,toMin(SHOWER_END)-toMin(S.clock));const on=S.shower===1;
 const strip=['chat','gallery','ride','bank','shop','call','calc','vault'].includes(S.view);
 return `<div class="shower${strip?' strip':''}${on?'':' off'}${on&&left<=3?' low':''}"><span class="sw">${on?'🚿':'🔇'}</span><b>${on?T('showerOn'):T('showerOff')}</b>${on?`<em>${esc(L(UI.left).replace('{m}',left))}</em>`:''}${S.hubOn?`<span class="evc">${T('evid')} ${evN(S)}/${APPS.length+1}</span>`:''}</div>`;}
function hubHTML(S){const h=S.hub;const live=!h.peek&&S.last&&S.last.k==='hub'&&S.last.key===h.key;const got=new Set([...(h._got||[]),...(S.got||[])]);const nw=isNew(h._i);
 const ic=(a,j)=>{const done=got.has(a.id);const can=live&&!done&&a.cost<=h._left;const cls=done?' done':can?' can':live?' cant':'';
  return `<div class="ic hubic${cls}" ${can?`data-hub="${j}"`:''}><i class="ai" style="background:${a.col}">${a.ic}</i>${a.badge&&!done?`<em>${a.badge}</em>`:''}<small>${esc(L(a.name))}</small>${live||done?`<span class="cost">${done?'✓':(can?'⏱ ':'✕ ')+a.cost+' '+T('min')}</span>`:''}</div>`;};
 const ping=S.pop&&S.pop.ic==='🧮';const dec=DECOR.map((d,j)=>`<div class="ic hubic decor${j===0&&ping?' ping':''}"><i class="ai">${d.ic}</i><small>${esc(L(d.name))}</small></div>`).join('');
 const txt=live?L(h.t).replace('{m}',h._left):'';
 return `<div class="app hub${nw?' new':''}"><div class="wallimg dimw"><img src="assets/p-wall.webp" alt=""></div><div class="grid hubgrid">${APPS.map(ic).join('')}${dec}</div>${live?`<div class="hubq" data-k="hq${h._i}"><p>${esc(txt)}</p></div>`:''}</div>`;}
function rideHTML(S){const a=S.app;return `<div class="app ride"><div class="ah">🛵 Jalanku · ${T('rideHist')}</div><div class="rmap" data-zoom="${a.img}" data-cap="${esc(L(a.cap))}"><img src="assets/${a.img}" alt=""><span class="gz">⤢ ${T('zoomHint')}</span></div><div class="rlist">${a.rows.map((r,j)=>`<div class="rrow" style="animation-delay:${.15+j*.18}s"><b>${esc(L(r[0]))}</b><p>${esc(L(r[1]))}</p><em>${esc(r[2])}</em></div>`).join('')}</div></div>`;}
function bankHTML(S){const a=S.app;return `<div class="app bank"><div class="ah">🏦 Arta Mobile</div><div class="bacc"><small>${T('bankAcc')}</small><b>${esc(L(a.t))}</b></div><div class="blist">${a.rows.map((r,j)=>`<div class="brow" style="animation-delay:${.15+j*.16}s"><div><b>${esc(L(r[1]))}</b><small>${esc(L(r[0]))}</small></div><em>−Rp8.500.000</em></div>`).join('')}</div><div class="bdet">${a.det.map(d=>`<p class="${d[2]?'hl':''}"><small>${esc(L(d[0]))}</small><b>${esc(L(d[1]))}</b></p>`).join('')}</div></div>`;}
function shopHTML(S){const a=S.app;return `<div class="app shop"><div class="ah">🛍 Tokoria · ${T('orderT')}</div><div class="sbadge">✓ ${esc(L(a.t))}</div><div class="sitem" data-zoom="${a.img}" data-cap="${esc(L(a.item))}"><img src="assets/${a.img}" alt=""><div><b>${esc(L(a.item))}</b><em>${esc(a.price)}</em></div></div><div class="saddr"><small>${T('shipTo')}</small><b>${esc(L(a.addr))}</b><p>${esc(L(a.addr2))}</p></div></div>`;}
function calcHTML(S){return `<div class="app calc"><div class="ah">🧮 ${T('calcT')} · 🔒 ${T('vaultT')}</div><div class="cdisp">0</div><div class="lk-h" id="lkh"></div></div>`;}
function vaultHTML(S){const v=S.vault,V=VAULT,f=v.focus,nw=isNew(v._i);
 return `<div class="app vault f-${f}"><div class="ah">🔒 ${T('vaultT')} · ${esc(L(v.t))}</div>
 <div class="vcard${f==='card'?' hl':''}${f==='card'&&nw?' new':''}"><small>${esc(V.card.t)}</small><b>${esc(L(V.card.k))}</b><em>${esc(V.card.unit)}</em><p>a.n. ${esc(V.card.name)}</p></div>
 <div class="vgrid${f==='old'?' hl':''}">${V.old.map((o,j)=>`<div class="vtl" style="animation-delay:${f==='old'&&nw?.1+j*.18:0}s"><i style="background-image:url(assets/${V.img})"></i><small>${esc(L(o))}</small></div>`).join('')}</div>
 ${f==='new'?`<div class="vnew${nw?' new':''}" data-zoom="${V.img}" data-cap="${esc(L(V.cap))}"><img src="assets/${V.img}" alt=""><b class="vnb">${T('newL')}</b><span class="vts">● ${esc(L(V.cap))}</span></div>`:`<div class="vnewt"><b>${T('newL')}</b> ${esc(L(V.cap))} <i>🔒</i></div>`}</div>`;}
function popHTML(S){const p=S.pop;if(!p)return '';return `<div class="pop new${p.style?' '+p.style:''}${p.fx==='shake'?' jolt':''}"><span class="la">${p.ic||''} ${esc(L(p.from))}${p.sub?' · '+esc(L(p.sub)):''}</span><p>${esc(L(p.t))}</p></div>`;}
function memoHTML(S){const m=S.memo;if(!m)return '';return `<div class="memo new"><div class="memoc">${ticketHTML(false,'big')}<p>${esc(L(m.t))}</p></div></div>`;}
function homeHTML(S){const badges=[7,1,0,1,1,0,0,0];const tg=APPN[(S.last&&S.last.app)||'LiveKu'];return `<div class="app home"><div class="grid">${UI.apps.slice(0,8).map((a,j)=>`<div class="ic${j===tg?' target':''}" ${j===tg?'data-app="go"':''}><i class="ai a${j}">${['💬','◎','●','✉','💳','🖼','📝','📷'][j]}</i>${badges[j]?`<em>${badges[j]}</em>`:''}<small>${esc(L(a))}</small></div>`).join('')}</div><div class="dock-hint">${esc(L(S.last&&S.last.t||''))}</div><i class="fingertap"></i></div>`;}
function mailHTML(S){const m=S.mail;return `<div class="app mail"><div class="ah">‹ ${T('inbox')}</div><div class="mm new"><small>${esc(L(m.from))}</small><h3>${esc(L(m.subject))}</h3><p>${esc(L(m.t))}</p><div class="att">📎 ${esc(m.file||'Surat_Pemutusan.pdf')}</div></div></div>`;}
function walletHTML(S){const w=S.wallet;return `<div class="app wallet"><div class="ah">${T('wallet')}</div><div class="wcard new${w.ok?' okc':' jolt'}"><div class="wx">${w.ok?'✓':'✕'}</div><b>${esc(w.amt)}</b><small>${esc(L(w.merchant))}</small><p>${esc(L(w.t))}</p></div></div>`;}
function lensaHTML(S){const s=S.lensa||{};
 if(s.post){const p=s.post;return `<div class="app lensa feed"><div class="ah">◎ Lensa</div><div class="lpost"><div class="lph"><span class="pav ini sm c-gossip">@</span><b>${esc(p.by)}</b><small>${esc(L(p.views||''))}</small></div><div class="lpimg" data-zoom="${p.img}" data-cap="${esc(L(p.cap))}"><img src="assets/${p.img}" alt=""></div><p class="lpl">♥ ${esc(L(p.likes||''))}</p><p class="lpc"><b>${esc(p.by)}</b> ${esc(L(p.cap))}</p><div class="lc">${(s.cmts||[]).map((c,j)=>{const n0=s._new0||0;const nw=isNew(s._i)&&j>=n0;return `<p data-k="lc${j}" class="${nw?'new':''}" style="animation-delay:${(s._new0==null?.5+j*.5:(s.faceid?.9:.1)+(j-n0)*.55)}s">${esc(L(c))}<i class="lk">♡</i></p>`;}).join('')}</div></div></div>`;}
 if(s.story){const p=s.story;return `<div class="app lensa story"><div class="stbar"><i></i></div><div class="sth"><span class="pav sm"><img src="assets/av-A-neutral.webp" alt=""></span><b>${esc(p.by)}</b><em class="cf">★ ${T('closeF')}</em><small>${esc(clk(S.clock))}</small></div><div class="stbody"><p>${esc(L(p.t))}</p></div><div class="stfoot">${esc(L(p.foot||''))}</div></div>`;}
 const key=s.key||'post';const b=BEATS.find(x=>x.key===key);const posted=st.ch[key]===1,del=st.ch[key]===0;
 return `<div class="app lensa"><div class="ah">◎ Lensa · ${T('lensaDraft')}</div><div class="ld"><div class="ldt${del?' gone':''}">${esc(L(b.draft))}${!posted&&!del?'<i class="caret"></i>':''}</div>${posted?`<div class="lc">${(s.cmts||[]).map(c=>`<p>${esc(L(c))}</p>`).join('')}</div>`:''}</div><div class="kb" id="kb"></div></div>`;}
function liveHTML(S){const lv=S.live;const g=lv.gift&&isNew(lv.gift._i)?`<div class="gift">${lv.gift.g}</div>`:'';
 const fr=lv.frame?`<div class="lvframe${isNew(lv.frame._i)?' new':''}"><div class="lvf-bill">${billHTML(true)}</div><p>⏸ ${esc(L(lv.frame.frame))}</p></div>`:'';
 const hot=lv.hot?`<div class="hotmic${isNew(lv.hot._i)?' new':''}">🎙 ${T('hotmic')}<p>${esc(L(lv.hot.t))}</p></div>`:'';
 const en=lv.ended?`<div class="lvend${isNew(lv.ended._i)?' new':''}"><b>${esc(L(lv.ended.ended))}</b></div>`:'';
 return `<div class="app live${lv.host?' guest':''}"><div class="lvtop"><span class="lp">${lv.ended?T('liveOff'):T('live')}</span><span class="lvv">👁 ${lv.viewers.toLocaleString(st.lang==='zh'?'zh-CN':'id-ID')}</span><span class="lvm">${lv.host?esc(lv.host):'LiveKu'}</span></div>${lv.pin?`<div class="pin">📌 <b>@akungosip</b> ${esc(L(lv.pin))}${lv.bill?billHTML():''}</div>`:''}${fr}${hot}${en}${lv.cap?`<div class="lvcap${isNew(lv.cap._i)?' new':''}">${esc(L(lv.cap.t))}</div>`:''}<div class="cmts">${lv.cmts.slice(-4).map(c=>`<p data-k="c${c._i}" class="${isNew(c._i)?'new':''}">${esc(L(c.t))}</p>`).join('')}</div>${g}<div class="kb" id="kb"></div></div>`;}
function callHTML(S){const c=S.call;return `<div class="app call${c.on?' on':''}${c.night?' night':''}">${faceAv(c.who,c.on?(c.ex||'angry'):'neutral','big')}<b class="cn">${esc(L(c.name))}</b><small>${c.on?(c.night?T('oncallN'):T('oncall')):T('incoming')}</small><p class="cs">${esc(L(c.sub))}</p><div class="caps">${c.lines.map(l=>`<p data-k="l${l._i}" class="${isNew(l._i)?'new':''}"><b>${l.who==='N'?T('me'):esc(L((SAY[l.who]||{}).name||c.name))}:</b> ${esc(L(l.t))}</p>`).join('')}</div><div class="kb" id="kb"></div></div>`;}
function notesHTML(S){const n=S.notes;const del=st.done[n.erase||'erase'];return `<div class="app notes"><div class="ah">📝 ${T('notes')}</div><h3>${T('notesT')}</h3>${n.old.map(o=>`<p class="no">${esc(L(o))}</p>`).join('')}<p class="nd${del?' gone':''}">${esc(L(n.draft))}${del?'':'<i class="caret"></i>'}</p>${del?(()=>{const ab=timeline().find(x=>x.k==='act'&&x.key===(n.erase||'erase'));return ab&&ab.done?`<p class="adone new">✓ ${esc(L(ab.done))}</p>`:'';})():''}<div class="kb" id="kb"></div></div>`;}
function darkHTML(S){const d=S.dark;return `<div class="app dark">${d?`<div class="bz${d&&d.title?' ttl l-'+st.lang:''}${isNew(st.n-1)?' new':''}"><b>${esc(L(d.t))}</b><small>${esc(L(d.sub))}</small></div>`:'<div class="bz"><small>📱 ⬇</small></div>'}</div>`;}
function sceneHTML(S){const sc=S.scene;const open=st.inner[sc._i];
 const card=`<div class="scard" data-k="s${sc._i}"><span class="stag" data-tw="${esc(L(sc.tag))}">${isNew(sc._i)?'&nbsp;':esc(L(sc.tag))}</span><p class="s1">${esc(L(sc.lines[0]))}</p><p class="s2">${esc(L(sc.lines[1]))}</p>${sc.inner?`<button class="s3${open?' open':''}" data-inner="${sc._i}">${open?esc(L(sc.inner)):'✦ '+T('inner')}</button>`:''}</div>`;
 const all=[card,...sc.items.map((it,j)=>sceneItem(it,sc.items[j-1]))];
 // keep the newest 3 fully visible, the 4th fading, the 5th leaving
 const keep=all.slice(-5).map((h,j,a)=>{const age=a.length-1-j;return age>=4?h.replace(/class="/,'class="age4 '):age===3?h.replace(/class="/,'class="age3 '):h;});
 return `<div class="app scene${sc.img?' has-img':''}"><div class="sbody"><div class="sitems" id="sitems">${keep.join('')}</div></div></div>`;}
function sceneItem(it,prev){const nw=isNew(it._i)?' new':'';const K=`data-k="s${it._i}"`;
 if(it.k==='say'){const c=SAY[it.who];const anc=(!prev||prev.img)?' anchor':'';return `<div ${K} class="fr2 ${c.me?'right':'left'}${anc}${nw}">${c.me?'':faceAv(it.who,it.ex)}<div><small>${esc(L(c.name))}${c.tag&&!c.me?' · '+esc(L(c.tag)):''}</small><p class="fb${c.me?' me':''}">${esc(L(it.t))}</p></div>${c.me?faceAv(it.who,it.ex):''}</div>`;}
 if(it.k==='scap'&&it.bn)return `<div ${K} class="scap bn${nw}"><span class="la">💬 Chat · ${esc(clk(it._clk||''))}</span><b>${esc(L(it.from))}</b><p>${esc(L(it.t))}</p></div>`;
 if(it.k==='scap')return `<div ${K} class="scap${nw}${it.fx==='flash'&&nw?' flashx':''}${it.ticket?' hastk':''}">${it.ticket?ticketHTML(false):''}${esc(L(it.t))}</div>`;
 if(it.k==='act'){const d=st.done[it.key];return `<div ${K} class="act${d?' done':''}${nw}">${d?`<p class="adone">✓ ${esc(L(it.done))}</p>`:(it.q?`<p class="aq sq">${esc(L(it.q))}</p>`:'')+widget(it)}</div>`;}
 if(it.k==='quick'){const c=st.ch[it.key],d=c!=null;if(d&&it.style==='say')return '';return `<div ${K} class="quick ${it.style}${d?' done':''}${nw}"><p class="aq">${esc(L(it.q))}</p><div class="qopts">${it.opts.map((o,j)=>`<button class="qo${d&&c===j?' sel':''}${d&&c!==j?' dim':''}" data-quick="${j}" aria-disabled="${d}">${it.style==='say'?`<span class="qb">${esc(L(o.t))}</span>`:esc(L(o.t))}</button>`).join('')}</div></div>`;}
 return '';}
function widget(b){const k=b.key,bt=esc(L(b.btn));
 switch(b.mode){
  case 'tap':case 'play':return `<button class="aw tap" data-actgo="${k}">${bt}</button>`;
  case 'hold':return `<button class="aw hold" data-hold="${k}"><i class="ring"><i></i></i><span>${bt}</span></button>`;
  case 'swipe':return `<div class="aw swipe" data-swipe="${k}"><div class="trk"><span>${bt}</span><b class="knob">➜</b></div></div>`;
  case 'drag':return `<div class="aw drag" data-drag="${k}"><div class="pad"><b class="knob">📱</b><i class="slot">▁▁▁</i></div><span>${bt}</span></div>`;
  case 'pin':{const keys=['1','2','3','4','5','6','7','8','9','','0','⌫'];return `<div class="aw pinw${b.code?' short':''}" data-pinw="${k}"><small class="pinl">${b.lab?esc(L(b.lab)):T('pinEnter')}</small><div class="pdots">${'<i></i>'.repeat((b.code||ANSWER).length)}</div><p class="perr"></p>${b.chip?`<button class="pchip" data-chip="${b.chip.code}">💡 ${esc(L(b.chip.label))}</button>`:''}${b.ticket?`<div class="ptk">${ticketHTML(true)}<small class="ptkh">👆 ${T('ticketTap')}</small></div>`:''}<div class="pkeys">${keys.map(x=>x===''?'<span></span>':`<button class="pk" data-pin="${x}">${x}</button>`).join('')}</div></div>`;}
  case 'unlock':return `<div class="aw unlock" data-up="${k}"><b class="knob">⌃</b><span>${bt}</span></div>`;}return '';}
function statsHTML(){timeline();const g=GOT;const pil=PILOTS.filter(b=>st.ch[b.key]!=null);const pc=pil.filter(b=>st.how[b.key]==='pilot').length;const c=st.ch;
 const sv=c.save;const evs=[...APPS.map(a=>[a.id,a.ic]),['vault','🔒']];
 const dd=[];if(st.done.pin3||c.pinfast){dd.push([T('dPin'),!c.pinH]);}if(c.who!=null)dd.push([T('dWho'),c.who!==0,L([UI.dWho0,UI.dWho1,UI.dWho2][c.who])]);if(st.done.vault)dd.push([T('dVault'),!c.vaultH]);
 const dn=dd.filter(x=>x[1]).length;
 let sus=0;if(c.save===0&&c.water===0)sus++;if(c.ring===0)sus+=2;else if(c.ring===1)sus++;if(c.towel===1)sus++;
 const dim=c.water===1?UI.dimB:sus===0?UI.dim0:sus<=2?UI.dim1:UI.dim2;
 const pr=[c.ring!=null?L(UI.pRing[c.ring]):null,c.towel!=null?L(UI.pTowel[c.towel]):null].filter(Boolean);
 return `<div class="estats"><p class="evt">${T('stEv')}: <b>${g.size}/${APPS.length+1}</b></p><div class="evchips">${evs.map(([id,ic])=>`<span class="${g.has(id)?'on':''}">${ic} ${esc(L(UI.evName[id]))}</span>`).join('')}</div>${dd.length?`<p class="evt">${T('stDed')}: <b>${dn}/${dd.length}</b></p><div class="dedl">${dd.map(x=>`<span class="${x[1]?'on':''}">${x[1]?'✓':'✗'} ${x[0]}: ${esc(x[2]||L(x[1]?UI.dSelf:UI.dHint))}</span>`).join('')}</div>`:''}${pr.length?`<p>${T('stPress')}: ${esc(pr.join(' · '))}</p>`:''}${sv!=null?`<p>${T('stSave')}: ${esc(L(sv===0?UI.saveF:UI.saveP))}</p>`:''}${c.water!=null?`<p>${T('stDim')}: ${esc(L(dim))}</p>`:''}${pil.length?`<p class="old">${esc(L(UI.stOld).replace('{p}',pc).replace('{t}',pil.length))}</p>`:''}</div>`;}
function endHTML(S){const b=S.last||{};return `<div class="app endv"><div class="endc"><small class="epk">${T('epK')} ${b._ep||1}</small><h2>${T('end1')}</h2><p class="eq">${esc(L(b.t||UI.end2))}</p>${statsHTML()}<button class="eagain" data-chap="1">${T('chapters')}</button><button class="eagain" data-again="1">${T('again')}</button></div></div>`;}
function epHTML(S){const e=S.epc;const E=EPS[e.ep-1]||{};return `<div class="app epv${isNew(e._i)?' new':''}"><div class="epc"><small class="epk">${T('epK')} ${e.ep}${E.paid?' · '+T('epPaid'):''}</small><h2>${esc(L(E.title))}</h2>${e.prev?`<p class="epp">${esc(L(e.prev))}</p>`:''}<i class="epline"></i></div></div>`;}
function ependHTML(S){const e=S.epe;const N=EPS[e.ep]||{};const nw=isNew(e._i);return `<div class="app epv end${nw?' new':''}"><div class="epc"><small class="epk">${T('epK')} ${e.ep} · ${T('epDone')}</small><h2>${esc(L((EPS[e.ep-1]||{}).title))}</h2>${statsHTML()}<div class="epnext"><small>${T('epNext')} · ${T('epK')} ${e.ep+1}</small><b>${esc(L(N.title))}</b><p>${esc(L(e.tease||''))}</p><i class="autobar${nw?' run':''}" style="--d:${dwell(e)/(st.speed||1)}ms"></i><small class="autol">${T('autoNext')}</small></div><div class="epbtns"><button class="epgo" data-next="1">${T('epGo')} ▶</button><button class="epch" data-chap="1">${T('chapters')}</button></div></div></div>`;}
function galleryHTML(S){const g=S.gallery;const items=g.items||[];return `<div class="app gallery"><div class="ah">🖼 ${T('gallery')}</div><div class="gmem"><small>${esc(L(g.t))}</small></div><div class="gfocus${isNew(g._i)?' new':''}${g.hl?' hl':''}" data-zoom="${g.focus}" data-cap="${esc(L(g.cap))}" data-seen="${g.seen||''}"><img src="assets/${g.focus}" alt="">${g.hl?'<i class="ring"></i>':''}<span class="gz">⤢ ${T('zoomHint')}</span></div><p class="gcap">${esc(L(g.cap))}</p><div class="ggrid">${items.map(x=>x.img?`<div class="gt" data-zoom="${x.img}" data-cap="${esc(L(x.cap||''))}" data-seen="${x.seen||''}"><img src="assets/${x.img}" alt=""></div>`:`<div class="gt ph" style="background:${x.c}"><span>${x.e||''}</span></div>`).join('')}</div></div>`;}

// keyboard / overlay for the pending interaction in phone apps
function fadeHTML(b){return `<div class="fadeold"><div class="oldbar"><span class="autopill">${T('auto')}</span><span class="ot">${T('old')}</span></div><p class="ftype"><span>${esc(L(b.oldfade))}</span></p><p class="fgone">${T('fadeGone')}</p><div class="stamp big">${T('fadeStamp')}</div></div>`;}
function kbHTML(S){const b=S.last;if(!b)return '';
 if(b.k==='paywall')return paywallHTML(b);
 if(b.k==='choice'&&b.pilot==null){if(st.ch[b.key]!=null)return '';return `<div class="pilotkb self${b.oldfade?' fading':''}">${b.oldfade?fadeHTML(b):''}<p class="ql">${b.oldfade?T('fadeNow'):b.lab?esc(L(b.lab)):T('yours')}</p><div class="ropts">${b.opts.map((x,j)=>ok(x.when)?`<button class="ro" data-opt="${j}">${esc(L(x.t))}</button>`:'').join('')}</div></div>`;}
 if(b.k==='choice'){const d=st.ch[b.key]!=null;if(d)return '';const o=b.opts[b.pilot];
  return `<div class="pilotkb"><div class="oldbar"><span class="autopill">${T('auto')}</span><span class="ot">${T('old')}</span><b id="cd">${Math.ceil(b.ms/1000)}</b></div>${b.help&&!st.seenHelp?`<p class="help">${esc(L(b.help))}</p>`:''}${b.old?`<p class="oldq">“${esc(L(b.old))}”</p>`:''}
   <div class="typing-in"><span id="autotype"></span><i class="caret"></i></div><div class="bar"><i id="cdbar"></i></div>
   <div class="ropts">${b.opts.map((x,j)=>`<button class="ro${j===b.pilot?' autot':''}" data-opt="${j}">${esc(L(x.t))}${j===b.pilot?` <em>← ${T('auto')}</em>`:''}</button>`).join('')}</div>
   ${pilot.taken?`<div class="stamp">${T('stamp')}</div>`:`<button class="take" data-take="1">${T('take')} <span>→</span></button>`}</div>`;}
 if(b.k==='quick'&&b.in!=='scene'){if(st.ch[b.key]!=null)return '';return `<div class="quickkb">${b.q?`<p class="aq">${esc(L(b.q))}</p>`:''}<p class="ql">${T('quick')}</p>${b.opts.map((o,j)=>`<button class="ro" data-quick="${j}">${esc(L(o.t))}</button>`).join('')}</div>`;}
 if(b.k==='act'&&b.in!=='scene'&&!st.done[b.key]&&b.mode!=='app'&&b.mode!=='target'){return `<div class="actkb">${b.q?`<p class="aq">${esc(L(b.q))}</p>`:''}${widget(b)}</div>`;}
 return '';}
function echoes(){const out=[];(UI.pwEcho||[]).forEach(x=>{if(out.length<2&&ok(x.when))out.push(L(x.t));});return out;}
function paywallHTML(b){const P=UI.pw;return `<div class="pw">
 <div class="pwh"><b>🔒 ${esc(L(P.title))}</b><small>${esc(L(P.sub))}</small></div>
 <div class="pwteaser"><div class="pwimg"><img src="assets/${b.teaserImg}" alt=""><span>${T('epK')} 6</span></div><ul>${P.teaser.map(t=>`<li>${esc(L(t))}</li>`).join('')}</ul></div>
 <div class="pwyou"><small>${esc(L(P.you))}</small>${statsHTML()}${echoes().map(t=>`<p class="pwecho">↳ ${esc(t)}</p>`).join('')}</div>
 <button class="pwb main" data-pw="pass"><b>${esc(L(P.pass))}</b><small>${esc(L(P.passSub))}</small></button>
 <button class="pwb" data-pw="ep"><b>${esc(L(P.one))}</b><small>${esc(L(P.oneSub))}</small></button>
 <div class="pwfree"><button data-pw="ad">${esc(L(P.ad))}</button><button data-pw="wait">${esc(L(P.wait))}</button></div>
 <p class="pwnote">ⓘ ${esc(L(P.sim))}</p></div>`;}
function innerHTML(S){if(!S.inner)return '';return `<div class="innerv new${S.inner.fx==='shake'?' jolt':''}"><small>${T('innerL')}</small>${esc(L(S.inner.t))}</div>`;}
function tbannerHTML(S){const g=S.tgt;if(!g||!g.banner)return '';const b=g.banner,t=TH[b.th];return `<div class="banner new tgt" data-actgo="${g.key}">${av(b.th,'sm')}<div><span class="la">💬 ${esc(appName('Pesan'))} · ${esc(clk(b.time))}</span><b>${esc(L(t.name))}</b><p>${esc(L(b.t))}</p></div></div>`;}
function bannerHTML(S){const b=S.banner;if(!b)return '';const t=TH[b.th];const tx=L(b.t)||(b.vn?'🎤 '+L(UI.vn):b.img?'📷 '+L(UI.photoS):b.loc?'📍 '+L(UI.locLive):'');return `<div class="banner new" data-banner="1">${av(b.th,'sm')}<div><span class="la">${t.app==='lensa'?'◎ Lensa':'💬 '+esc(appName('Pesan'))} · ${esc(clk(b.time))}</span><b>${esc(L(t.name))}</b><p>${esc((b.img&&L(b.t)?'📷 ':'')+tx)}</p></div></div>`;}

// ---------- render + transitions ----------
const screen=$('screen'),phoneEl=$('phone');
const RM=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
const tx={anims:[],timers:[],active:false,until:0};let prevR=null;
function vkey(S){return S.view==='chat'?'chat:'+S.thread:S.view==='scene'?'scene:'+S.scene._i:S.view==='ep'?'ep:'+S.epc._i:S.view==='live'?'live:'+(S.live.host||''):S.view;}
function later(fn,ms){if(RM||!ms){fn();return;}const t=setTimeout(()=>{tx.timers=tx.timers.filter(x=>x.t!==t);fn();},ms);tx.timers.push({t,fn});}
function anim(el,kf,o){if(!el)return;const a=el.animate(kf,{duration:RM?140:(o&&o.d)||520,easing:(o&&o.e)||'cubic-bezier(.2,.7,.2,1)',delay:RM?0:(o&&o.delay)||0,fill:'both'});tx.anims.push(a);a.onfinish=()=>{tx.anims=tx.anims.filter(x=>x!==a);try{a.cancel()}catch{}if(o&&o.done)o.done();if(!tx.anims.length)tx.active=false;};tx.active=true;return a;}
function finishTx(){tx.timers.splice(0).forEach(x=>{clearTimeout(x.t);x.fn();});tx.anims.slice().forEach(a=>{try{a.finish()}catch{}});tx.anims=[];tx.active=false;document.querySelectorAll('.ghost').forEach(g=>g.remove());}
function pickTx(a,b,backward){if(!a)return null;if(backward)return 'fade';const ka=vkey(a),kb=vkey(b);if(ka===kb)return null;
 if(b.view==='dark'||b.view==='ep')return 'black';if(a.view==='lock')return 'up';if(b.view==='end'||b.view==='epend'||a.view==='ep'||a.view==='epend')return 'dip';
 if(b.view==='scene'&&a.view==='scene')return 'whip';if(b.view==='scene')return 'pull';if(a.view==='scene')return 'push';
 if(b.view==='lock')return 'dip';if(Math.abs(toMin(b.clock)-toMin(a.clock))>=120)return 'dip';return 'slide';}
// media layer: one persistent pair of images, crossfaded; Ken Burns keeps running across beats
const media=$('media'),mA=$('mA'),mB=$('mB');let mFront=null,mSrc=null;
function setMedia(S,delay){let src=null,mode='off';
 if(S.view==='scene'&&S.scene.img){src=S.scene.img;const lk=S.last&&S.last.k;mode=(lk==='scene'||(lk==='scap'&&S.last.img))?'hero':'dim';}
 else if(S.view==='live'){src=S.live.img;mode='cam';}
 const apply=()=>{media.dataset.mode=mode;if(src&&src!==mSrc){const nb=mFront===mA?mB:mA;nb.src='assets/'+src;nb.classList.remove('kenb');void nb.offsetWidth;nb.classList.add('kenb','on');if(mFront)mFront.classList.remove('on');mFront=nb;mSrc=src;}if(!src){mSrc=null;if(mFront)mFront.classList.remove('on');mFront=null;}};
 if(delay&&src&&src!==mSrc&&mode!=='cam'){media.dataset.mode=mode;later(apply,delay);}else apply();}
let preloaded=false;function preload(){if(preloaded)return;preloaded=true;IMAGES.forEach(x=>{const im=new Image();im.src='assets/'+x;im.decode&&im.decode().catch(()=>{});});}
function typewrite(el,text,ms){if(!el)return;if(RM){el.textContent=text;return;}const chars=[...text];let i=0;el.textContent='';const step=Math.max(18,ms/chars.length);const iv=setInterval(()=>{i++;el.textContent=chars.slice(0,i).join('');if(i>=chars.length)clearInterval(iv);},step);tx.timers.push({t:iv,fn:()=>{clearInterval(iv);el.textContent=text;}});}
function tickClock(from,to){const el=screen.querySelector('.sb b');if(!el||from===to||RM)return;const a=toMin(from),b=toMin(to);const fmt=v=>{v=((v%1440)+1440)%1440;const h=String(Math.floor(v/60)).padStart(2,'0'),m=String(v%60).padStart(2,'0');return clk(h+'.'+m);};const t0=performance.now(),D=600;
 const f=()=>{const p=Math.min(1,(performance.now()-t0)/D);el.textContent=fmt(Math.round(a+(b-a)*(1-Math.pow(1-p,3))));if(p<1)requestAnimationFrame(f);};el.textContent=fmt(a);requestAnimationFrame(f);setTimeout(()=>{if(el.isConnected)el.textContent=fmt(b);},D+80);}
function snapshot(){const m=new Map();if(RM)return m;screen.querySelectorAll('[data-k]').forEach(e=>{const r=e.getBoundingClientRect();m.set(e.dataset.k,{y:r.top,o:getComputedStyle(e).opacity});});return m;}
function flip(old){if(RM||!old.size)return;screen.querySelectorAll('[data-k]').forEach(e=>{const o=old.get(e.dataset.k);if(!o)return;const r=e.getBoundingClientRect(),dy=o.y-r.top,op=getComputedStyle(e).opacity;if(Math.abs(dy)<1&&op===o.o)return;e.classList.remove('new');
  e.animate([{transform:`translateY(${dy}px)`,opacity:o.o},{transform:'none',opacity:op}],{duration:420,easing:'cubic-bezier(.25,.8,.25,1)'});});}
function render(opt){opt=opt||{};finishTx();const tl=timeline();st.n=Math.min(Math.max(1,st.n),tl.length);if(st.n!==beatN){beatN=st.n;beatAt=Date.now();}const S=derive(tl,st.n);
 const type=opt.noTx?null:pickTx(prevR,S,opt.back);let ghost=null;const old=type?null:snapshot();
 if(type){ghost=screen.cloneNode(true);ghost.removeAttribute('id');ghost.querySelectorAll('[id]').forEach(e=>e.removeAttribute('id'));ghost.classList.add('ghost');ghost.setAttribute('aria-hidden','true');phoneEl.insertBefore(ghost,type==='slide'||type==='push'?screen.nextSibling:screen.nextSibling);}
 let body='';switch(S.view){case 'lock':body=lockHTML(S);break;case 'chat':body=chatHTML(S);break;case 'home':body=homeHTML(S);break;case 'mail':body=mailHTML(S);break;case 'wallet':body=walletHTML(S);break;case 'lensa':body=lensaHTML(S);break;case 'live':body=liveHTML(S);break;case 'call':body=callHTML(S);break;case 'notes':body=notesHTML(S);break;case 'dark':body=darkHTML(S);break;case 'scene':body=sceneHTML(S);break;case 'end':body=endHTML(S);break;case 'ep':body=epHTML(S);break;case 'epend':body=ependHTML(S);break;case 'gallery':body=galleryHTML(S);break;case 'hub':body=hubHTML(S);break;case 'ride':body=rideHTML(S);break;case 'bank':body=bankHTML(S);break;case 'shop':body=shopHTML(S);break;case 'calc':body=calcHTML(S);break;case 'vault':body=vaultHTML(S);break;}
 screen.className='screen v-'+S.view;phoneEl.dataset.tint=S.view==='scene'?(S.scene.tint||'cold'):'';
 screen.innerHTML=statusBar(S)+showerHTML(S)+body+memoHTML(S)+popHTML(S)+innerHTML(S)+bannerHTML(S)+tbannerHTML(S)+(S.banner&&isNew(S.banner._i)?'<span class="ting">ting!</span>':'');
 const kb=document.getElementById('kb'),lkh=document.getElementById('lkh');const k=kbHTML(S);if(kb)kb.innerHTML=k;else if(lkh)lkh.innerHTML=k;else if(k&&(S.view!=='scene'||(S.last&&S.last.k==='choice'))){screen.insertAdjacentHTML('beforeend',`<div class="kb float">${k}</div>`);screen.classList.add('has-kb');}
 const ms=document.getElementById('msgs');if(ms){if(S.scrollup!=null&&isNew(S.scrollup)){ms.scrollTop=ms.scrollHeight;later(()=>{ms.scrollTo({top:0,behavior:RM?'auto':'smooth'});},700);}else ms.scrollTop=ms.scrollHeight;}
 if(old)flip(old);
 const newScene=S.view==='scene'&&isNew(S.scene._i);
 if(newScene){const tg=screen.querySelector('.stag');typewrite(tg,tg.dataset.tw,420);screen.querySelectorAll('.scard .s1,.scard .s2,.scard .s3').forEach((e,j)=>anim(e,[{opacity:0,transform:'translateY(8px)'},{opacity:1,transform:'none'}],{d:320,delay:160+j*110}));}

 const cE=screen.querySelector('.cnt[data-to]');if(cE&&S.last===S.lockB&&!RM&&(!prevR||prevR.lastI!==S.lastI)){const a=+cE.dataset.from,z=+cE.dataset.to,t0=performance.now(),D=(S.lockB&&S.lockB.ms||2400)*.85/(st.speed||1);const iv=setInterval(()=>{const p=Math.min(1,(performance.now()-t0)/D);cE.textContent=Math.round(a+(z-a)*p).toLocaleString('en-US');if(p>=1)clearInterval(iv);},60);tx.timers.push({t:iv,fn:()=>{clearInterval(iv);cE.textContent=z.toLocaleString('en-US');}});}
 setMedia(S,newScene?420:0);
 if(type)runTx(type,ghost,prevR,S);
 if(type&&prevR&&prevR.clock!==S.clock)tickClock(prevR.clock,S.clock);
 prevR=S;preload();armPin(S);
 const last=S.last;chromeBar();const mm=document.getElementById('msgs');scrolledUp=false;if(mm)mm.addEventListener('scroll',onMsgScroll,{passive:true});$('btnBack').disabled=st.n<=1;$('btnLang').textContent=st.lang==='zh'?'中':'ID';
 $('prog').style.width=epProg(tl)+'%';document.documentElement.lang=st.lang;trackView(S);
 armChoice(tl);schedule();return S;}
// ---------- episodes / progress / analytics ----------
const curEp=()=>{const tl=timeline();const b=tl[Math.min(st.n,tl.length)-1];return (b&&b._ep)||1;};
function epProg(tl){const b=tl[st.n-1];if(!b)return 0;const e=b._ep||1;let bi=0;for(let j=st.n-1;j>=0;j--)if(tl[j]._bi!=null){bi=tl[j]._bi;break;}
 const a=BEATS.findIndex(x=>x._ep===e);let z=a;BEATS.forEach((x,i)=>{if(x._ep===e)z=i;});return z>a?Math.min(100,(bi-a)/(z-a)*100):100;}
function track(e,d){try{const a=store.get('events',[]);a.push({e,ep:curEp(),n:st.n,t:Date.now(),...(d||{})});store.set('events',a.slice(-600));}catch{}}
let trackedN=-1;function trackView(S){if(trackedN===st.n)return;trackedN=st.n;const b=S.last;if(!b)return;
 if(st.n===1&&b._ep===1)track('ep_start',{ep:1});if(b.k==='ep')track('ep_start',{ep:b.ep});if(b.k==='epend')track('ep_end',{ep:b.ep});if(b.k==='end')track('ep_end',{ep:b._ep});
 if(b.k==='paywall'&&!st.unlock){track('ep_end',{ep:5});track('paywall_view');}}
function epStart(N,tl){if(N===1)return 0;return tl.findIndex(b=>b.k==='ep'&&b.ep===N);}
function carry(text,cls){if(!text)return;const c=document.createElement('div');c.className='carry '+(cls||'');c.textContent=text;phoneEl.appendChild(c);
 anim(c,[{opacity:1,transform:'none'},{opacity:1,transform:'none',offset:.6},{opacity:0,transform:'translateY(-14px)'}],{d:1300,e:'ease-in',done:()=>c.remove()});}
function runTx(type,g,a,b){const rm=()=>g.remove();const sc=screen;
 switch(type){
  case 'slide':g.style.zIndex=1;sc.style.zIndex=2;anim(sc,[{transform:'translateX(100%)'},{transform:'none'}],{d:460});anim(g,[{transform:'none',filter:'brightness(1)'},{transform:'translateX(-28%)',filter:'brightness(.75)'}],{d:460,done:()=>{rm();sc.style.zIndex='';}});break;
  case 'up':{const fid=b.last&&b.last.faceid;let dl=0;if(fid){g.insertAdjacentHTML('beforeend',FIDH);const f=g.querySelector('.fid');anim(f,[{opacity:0,transform:'scale(.7)'},{opacity:1,transform:'none'}],{d:220});later(()=>f.classList.add('ok'),330);dl=620;}
   g.style.zIndex=3;anim(sc,[{transform:'scale(.94)',opacity:.4},{transform:'none',opacity:1}],{d:520,delay:dl});anim(g,[{transform:'none'},{transform:'translateY(-100%)'}],{d:520,delay:dl,e:'cubic-bezier(.5,0,.2,1)',done:rm});break;}
  case 'push':{g.style.zIndex=1;sc.style.zIndex=2;anim(sc,[{transform:'scale(.42) translateY(18%)',borderRadius:'48px',opacity:0},{opacity:1,offset:.35},{transform:'none',borderRadius:'0px',opacity:1}],{d:620,done:()=>sc.style.zIndex=''});
   anim(g,[{transform:'none',opacity:1},{transform:'scale(1.12)',opacity:0}],{d:620,done:rm});carry('ting!','sfxw');break;}
  case 'pull':{g.style.zIndex=3;anim(g,[{transform:'none',borderRadius:'0px',opacity:1},{transform:'scale(.38) translateY(30%)',borderRadius:'48px',opacity:0}],{d:600,e:'cubic-bezier(.5,0,.3,1)',done:rm});anim(sc,[{opacity:0},{opacity:1}],{d:600});
   const last=g.querySelector('.innerv,.m:last-of-type .mb,.caps p:last-child,.cmts p:last-child');carry(last?last.textContent.replace(/\d\d[.:]\d\d\s*✓*$/,'').trim().slice(0,90):'', 'line');break;}
  case 'whip':g.style.zIndex=3;anim(g,[{transform:'none',opacity:1},{transform:'translateX(-70%) skewX(6deg)',opacity:0}],{d:480,e:'cubic-bezier(.6,0,.4,1)',done:rm});anim(sc,[{transform:'translateX(55%) skewX(-6deg)',opacity:0},{transform:'none',opacity:1}],{d:520,delay:60});break;
  case 'dip':g.style.zIndex=3;anim(g,[{opacity:1,filter:'brightness(1)'},{opacity:0,filter:'brightness(.2)'}],{d:340,e:'ease-in',done:rm});anim(sc,[{opacity:0,filter:'brightness(.2)'},{opacity:1,filter:'brightness(1)'}],{d:420,delay:260,e:'ease-out'});break;
  case 'black':g.style.zIndex=3;anim(g,[{opacity:1},{opacity:0}],{d:520,e:'ease-in',done:rm});anim(sc,[{opacity:0},{opacity:1}],{d:300,delay:420});break;
  case 'fade':g.style.zIndex=3;anim(g,[{opacity:1},{opacity:0}],{d:220,done:rm});break;}}
const FIDH=`<div class="fid"><svg viewBox="0 0 48 48" width="52" height="52" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M4 14V8a4 4 0 0 1 4-4h6M34 4h6a4 4 0 0 1 4 4v6M44 34v6a4 4 0 0 1-4 4h-6M14 44H8a4 4 0 0 1-4-4v-6"/><path class="fe" d="M17 18v4M31 18v4M24 18v9h-2M17 32c4 4 10 4 14 0"/></svg><b>Dimas</b></div>`;
function fx(b){if(!b)return;if(b.fx==='shake'||b.k==='wallet'){const p=$('phone');p.classList.remove('shake');void p.offsetWidth;p.classList.add('shake');try{navigator.vibrate&&(!navigator.userActivation||navigator.userActivation.hasBeenActive)&&navigator.vibrate(40)}catch{}}
 if(b.fx==='flash'){const f=$('flash');f.classList.remove('go');void f.offsetWidth;f.classList.add('go');}}

// ---------- passcode pad ----------
const pin={buf:'',key:null,busy:false,timers:[],hint:false};
function pinClear(){pin.timers.forEach(clearTimeout);pin.timers=[];}
function armPin(S){const b=S.last;const on=b&&b.k==='act'&&b.mode==='pin'&&!st.done[b.key];if(!on){pinClear();pin.key=null;pin.buf='';pin.busy=false;return;}
 if(pin.key!==b.key){pinClear();pin.key=b.key;pin.buf='';pin.busy=false;pin.hint=false;}
 pinDots();const sp=st.speed||1;
 if(b.chip){const t=setTimeout(()=>{const c=screen.querySelector('.pchip');if(c&&!pin.buf)c.classList.add('show');},(b.chipAfter||3500)/sp);pin.timers.push(t);}
 if(b.ticket){const t=setTimeout(()=>{const c=screen.querySelector('.ptk');if(c)c.classList.add('glow');},(b.ticketAfter||7000)/sp);pin.timers.push(t);}}
function pinDots(cls){const w=screen.querySelector('.aw.pinw');if(!w)return;w.querySelectorAll('.pdots i').forEach((d,j)=>{d.className=j<pin.buf.length?'on':'';});if(cls){w.classList.remove('bad','good');void w.offsetWidth;w.classList.add(cls);}}
function pinInput(el){const tl=timeline(),b=tl[st.n-1];if(!b||b.k!=='act'||b.mode!=='pin'||st.done[b.key]||pin.busy)return;
 if(el.dataset.chip||el.dataset.ticket){const code=el.dataset.chip||b.code||ANSWER;pin.hint=true;pin.busy=true;pin.buf='';pinDots();let j=0;const step=()=>{pin.buf+=code[j++];pinDots();if(j<code.length)pin.timers.push(setTimeout(step,130));else pin.timers.push(setTimeout(()=>{pin.busy=false;pinCheck(b);},200));};pin.timers.push(setTimeout(step,120));return;}
 const k=el.dataset.pin;if(k==='⌫'){pin.buf=pin.buf.slice(0,-1);pinDots();return;}const N=(b.code||ANSWER).length;if(pin.buf.length>=N)return;pin.buf+=k;pinDots();const c=screen.querySelector('.pchip');if(c)c.classList.remove('show');
 if(pin.buf.length===N){pin.busy=true;pin.timers.push(setTimeout(()=>{pin.busy=false;pinCheck(b);},160));}}
function pinCheck(b){const code=pin.buf,A=b.code||ANSWER;track('pin',{key:b.key,ok:code===A,hint:pin.hint});const err=screen.querySelector('.perr');
 if(code===A){pinDots('good');if(b.code){st.done[b.key]=true;if(pin.hint)st.ch[b.key+'H']=1;else delete st.ch[b.key+'H'];}else{['pin1','pin2','pin3'].forEach(k=>st.done[k]=true);if(b.key==='pin1')st.ch.pinfast=1;else if(b.key==='pin2')st.ch.pinfast=2;else delete st.ch.pinfast;if(pin.hint&&b.final)st.ch.pinH=1;else delete st.ch.pinH;}save();justActed=Date.now();pin.busy=true;
  pin.timers.push(setTimeout(()=>{pin.busy=false;advance(true);},RM?100:520));return;}
 const p=$('phone');p.classList.remove('shake');void p.offsetWidth;p.classList.add('shake');try{navigator.vibrate&&(!navigator.userActivation||navigator.userActivation.hasBeenActive)&&navigator.vibrate(60)}catch{}
 pinDots('bad');if(err)err.textContent=L(UI.pinWrong);
 if(!b.final){st.done[b.key]=true;save();justActed=Date.now();pin.busy=true;pin.timers.push(setTimeout(()=>{pin.busy=false;pin.buf='';advance(true);},RM?100:700));return;}
 pin.busy=true;pin.timers.push(setTimeout(()=>{pin.busy=false;pin.buf='';pinDots();const t=screen.querySelector('.ptk');if(t)t.classList.add('glow');},600));}

// ---------- autopilot ----------
const pilot={timer:null,raf:null,key:null,end:0,taken:false};
function stopPilot(){clearTimeout(pilot.timer);cancelAnimationFrame(pilot.raf);pilot.timer=null;}
function armChoice(tl){const b=tl[st.n-1];if(!b||b.k!=='choice'||st.ch[b.key]!=null||b.pilot==null){stopPilot();pilot.key=null;pilot.taken=false;return;}
 const o=b.opts[b.pilot],full=L(o.send||o.t);
 if(pilot.key!==b.key){stopPilot();pilot.key=b.key;pilot.taken=false;pilot.end=Date.now()+b.ms;pilot.timer=setTimeout(()=>{if(!pilot.taken)choose(b,b.pilot,'pilot');},b.ms);}
 if(pilot.taken)return;
 const tick=()=>{const left=Math.max(0,pilot.end-Date.now()),p=1-left/b.ms;const cd=$('cd'),bar=$('cdbar'),at=$('autotype');if(cd)cd.textContent=Math.ceil(left/1000);if(bar)bar.style.width=(left/b.ms*100)+'%';if(at)at.textContent=full.slice(0,Math.round(full.length*Math.min(1,p*1.15)));if(left>0&&!pilot.taken)pilot.raf=requestAnimationFrame(tick);};cancelAnimationFrame(pilot.raf);tick();}
function takeover(){stopPilot();pilot.taken=true;st.seenHelp=true;save();render();const p=$('phone');p.classList.remove('shake');void p.offsetWidth;p.classList.add('shake');const f=$('flash');f.classList.remove('go');void f.offsetWidth;f.classList.add('go','gold');}
let pendingAdv=null,justActed=0;
function choose(b,i,how){stopPilot();st.ch[b.key]=i;st.how[b.key]=how;track('choice',{key:b.key,i,how});st.seenHelp=true;if(!st.tChoice)st.tChoice=Date.now()-st.t0;pilot.key=null;pilot.taken=false;save();justActed=Date.now();advance(true);}
function chooseQuick(i){const tl=timeline();const b=tl[st.n-1];if(!b||b.k!=='quick'||st.ch[b.key]!=null)return;st.ch[b.key]=i;track('quick',{key:b.key,i});save();justActed=Date.now();
 if(b.in==='scene')render();else advance(true);}
function completeAct(key){const tl=timeline();const b=tl[st.n-1];if(!b||b.k!=='act'||b.key!==key||st.done[key])return;st.done[key]=true;save();justActed=Date.now();try{navigator.vibrate&&(!navigator.userActivation||navigator.userActivation.hasBeenActive)&&navigator.vibrate(25)}catch{}
 if(b.done&&(b.in==='scene'||b.in==='notes'))render();else advance(true);}

// ---------- auto-flow: the story moves on its own; the reader only acts at decisions ----------
let flowT=null,flowFn=null,typingTh=null,scrolledUp=false;const holds=new Set();
document.addEventListener('visibilitychange',()=>{if(document.hidden)track('leave',{k:(timeline()[st.n-1]||{}).k});});window.addEventListener('pagehide',()=>track('leave',{k:(timeline()[st.n-1]||{}).k,unload:1}));
const plain=x=>L(x||'').replace(/[“”"()]/g,'');
function readMs(txt){const t=plain(txt);if(!t)return 0;const ms=st.lang==='zh'?t.replace(/\s/g,'').length/8*1000:t.split(/\s+/).filter(Boolean).length/220*60000;return Math.max(1200,ms);}
function beatText(b){if(!b)return '';switch(b.k){case 'scene':return [b.tag,...b.lines].map(plain).join(' ');case 'mail':return plain(b.subject)+' '+plain(b.t);case 'wallet':return plain(b.merchant)+' '+plain(b.t);case 'live':return plain(b.cmt)+' '+plain(b.pin);
 case 'act':return b.done?plain(b.done):'';case 'quick':return plain(b.q);case 'notes':return b.old.map(plain).join(' ')+' '+plain(b.draft);case 'dark':return plain(b.t)+' '+plain(b.sub);case 'call':return plain(b.sub);case 'msg':return plain(b.t)+' '+plain(b.tr)+' '+plain(b.loc);case 'ep':return plain((EPS[b.ep-1]||{}).title)+' '+plain(b.prev);case 'gallery':return plain(b.t)+' '+plain(b.cap);case 'ride':return plain(b.t)+' '+plain(b.cap);case 'bank':return plain(b.t)+' '+b.det.map(d=>plain(d[1])).join(' ');case 'shop':return plain(b.item)+' '+plain(b.addr)+' '+plain(b.addr2);case 'hub':return '';case 'pop':return plain(b.from)+' '+plain(b.t);case 'vault':return '';case 'scrollup':return b.old.map(o=>plain(o.t)).join(' ');case 'unblur':return plain(b.t);case 'draft':return plain(b.t);
 case 'lensa':return b.post?plain(b.post.cap)+' '+(b.cmts||[]).map(plain).join(' '):b.story?plain(b.story.t):(b.cmts||[]).map(plain).join(' ');default:return plain(b.t)+' '+plain(b.cap)+' '+plain(b.hot)+' '+plain(b.frame);}}
function dwell(b,S){if(!b)return 1200;const r=st.lang==='zh'?beatText(b).replace(/\s/g,'').length/8*1000:beatText(b).split(/\s+/).filter(Boolean).length/220*60000;let ms=Math.max(1200,r);
 if(b.k==='scene')ms+=900;if(b.photo)ms+=1800;if(b.vn)ms+=2400;if(b.k==='live'&&b.pin)ms+=2600;if(b.k==='mail'||b.k==='wallet')ms+=700;if(b.k==='call')ms=Math.max(ms,2600);if(b.k==='home')ms=1600;if(b.k==='typing')ms=1400;if(b.k==='dark')ms=b.title?2500:Math.max(1900,ms);if(b.k==='inner')ms+=300;if(b.k==='msg'&&b.mine)ms=Math.max(1200,ms*.6);
 if(b.k==='lock')ms=b.exp?(b.ms||2600):Math.max(ms,b.solo?2800:2200)+(b.notifs&&b.notifs.length>1?900:0);
 if(b.k==='ep')ms=Math.max(2800,ms*.8);if(b.k==='epend')ms=5600;if(b.k==='gallery')ms+=2400;if(b.img&&b.k==='msg')ms+=1800;if(b.loc)ms+=1000;if(b.k==='replay')ms=2800;if(b.k==='typing'&&b.stop)ms=2700;if(b.k==='scrollup')ms+=2600;if(b.k==='unblur')ms+=1600;if(b.gone)ms+=1400;
 if(b.k==='live'&&b.frame)ms+=3400;if(b.k==='live'&&b.hot)ms+=1400;if(b.k==='lensa'&&b.post)ms+=2600;if(b.k==='lensa'&&b.story)ms+=1600;if(b.shot)ms+=2400;if(b.k==='scap'&&b.img)ms+=800;if(b.k==='lensa'&&b.faceid)ms=readMs(b.post.cap)+1100;if(b.k==='lensa'&&b.add)ms=1100+b.add.length*750;if(b.k==='inner'&&b.wake)ms=1700;
 if(b.k==='hub'&&b.peek)ms=1700;if(b.k==='memo')ms+=2600;if(b.k==='lock'&&b.lockout)ms=Math.max(ms,3400);if(b.k==='ride'||b.k==='bank'||b.k==='shop')ms+=2800;if(b.k==='scap'&&b.ticket)ms+=1800;if(b.k==='scap'&&b.bn)ms+=600;if(b.k==='sys')ms+=500;if(b.k==='pop')ms+=900;if(b.k==='vault')ms=b.focus==='new'?3400:2200;if(b.k==='call')ms=Math.max(ms,2400);return ms;}
const typingMs=b=>Math.max(800,Math.min(2500,plain(b.t).length*(st.lang==='zh'?90:38)));
function clearFlow(){clearTimeout(flowT);flowT=null;flowFn=null;}
function wait(ms,fn){clearFlow();flowFn=()=>{flowT=null;flowFn=null;fn();};flowT=setTimeout(flowFn,ms/(st.speed||1));}
function flowPause(k){holds.add(k);clearFlow();}function flowResume(k){holds.delete(k);schedule();}
function schedule(){clearFlow();if(st.paused||holds.size||document.hidden||scrolledUp)return;const tl=timeline(),b=tl[st.n-1];if(!b||b.k==='end'||pwBusy)return;
 if(screen.querySelector('[data-banner]')){wait(1900,()=>{st.opened[st.n-1]=true;save();render();});return;}
 if(isBlocked(b)){if(b.key==='unlock')wait(3200,()=>completeAct('unlock'));return;}
 if(st.n>=tl.length)return;const nb=tl[st.n],S=prevR;const d=dwell(b,S);
 // an incoming message in the open chat: typing indicator first, length-proportional
 if(nb.k==='msg'&&!nb.mine&&S&&S.view==='chat'&&S.thread===nb.th&&!nb.clock&&typingTh!==nb.th){wait(Math.min(d,b.k==='msg'?d:d),()=>{typingTh=nb.th;render();clearFlow();wait(typingMs(nb),()=>advance());});return;}
 wait(d,()=>advance());}
// tap = reveal first, then at most one step; a beat must be fully visible >=MINVIS ms before a tap can pass it
let beatAt=0,beatN=-1,lastStep=0;const MINVIS=350;
function entering(){try{return document.getAnimations().filter(a=>{if(a.playState!=='running')return false;const t=a.effect&&a.effect.getComputedTiming&&a.effect.getComputedTiming();const el=a.effect&&a.effect.target;return t&&isFinite(t.endTime)&&t.endTime<=2500&&el&&el.nodeType===1&&screen.contains(el);});}catch{return [];}}
function tapStep(){const now=Date.now();const run=entering();
 if(tx.active||run.length){finishTx();run.forEach(a=>{try{a.finish()}catch{}});beatAt=now;return 'reveal';}
 if(now-beatAt<MINVIS||now-lastStep<MINVIS)return 'hold';
 lastStep=now;skipWait();return 'step';}
function skipWait(){if(flowFn){const f=flowFn;clearTimeout(flowT);f();return;}const tl=timeline(),b=tl[st.n-1];if(!isBlocked(b)&&!st.paused)advance();else if(isBlocked(b)){const t=screen.querySelector('.tgt,.take,.aw,.qopts,.ropts,.hubgrid');if(t){t.classList.remove('nudge');void t.offsetWidth;t.classList.add('nudge');}}}
let userScrollAt=0;['wheel','touchmove','keydown','pointerdown'].forEach(ev=>document.addEventListener(ev,e=>{if(e.target.closest&&e.target.closest('#msgs')||ev==='wheel'||ev==='keydown')userScrollAt=Date.now();},{passive:true,capture:true}));
function onMsgScroll(e){const m=e.target;if(!scrolledUp&&Date.now()-userScrollAt>1200)return;const up=m.scrollHeight-m.scrollTop-m.clientHeight>40;if(up===scrolledUp)return;scrolledUp=up;let p=screen.querySelector('.newpill');
 if(up){clearFlow();if(!p){screen.querySelector('.chat').insertAdjacentHTML('beforeend',`<button class="newpill" data-pill="1">${T('newmsg')}</button>`);}}else{if(p)p.remove();schedule();}}
function chromeBar(){$('btnPause').textContent=st.paused?'▶':'❚❚';$('btnPause').classList.toggle('on',!!st.paused);$('btnSpeed').textContent=(st.speed||1)+'×';$('rb-hint').textContent=st.paused?L(UI.paused):'';}
document.addEventListener('visibilitychange',()=>{if(document.hidden)clearFlow();else schedule();});
// ---------- navigation ----------
function advance(force){clearTimeout(pendingAdv);const tl=timeline();const last=tl[st.n-1];
 clearFlow();typingTh=null;
 if(screen.querySelector('[data-banner]')){st.opened[st.n-1]=true;save();render();return;}
 if(!force&&isBlocked(last)){const t=screen.querySelector('.take,.aw,.qopts,.ropts');if(t){t.classList.remove('nudge');void t.offsetWidth;t.classList.add('nudge');}return;}
 if(st.n>=tl.length)return;st.n++;save();render();fx(tl[st.n-1]);}
function back(){if(st.n<=1)return;clearFlow();typingTh=null;st.n--;pilot.key=null;stopPilot();save();render({back:true});}

// ---------- gestures ----------
let drag=null,hold=null;
let ffAt=0;document.addEventListener('pointerdown',e=>{if(tx.active&&!e.target.closest('.rbar')){finishTx();ffAt=Date.now();return;}
 const h=e.target.closest('[data-hold]');if(h){e.preventDefault();const key=h.dataset.hold,t0=performance.now(),ring=h.querySelector('.ring');h.classList.add('holding');
  const step=()=>{if(!hold)return;const p=Math.min(1,(performance.now()-t0)/1300);ring.style.setProperty('--p',p);if(p>=1){hold=null;completeAct(key);return;}hold.raf=requestAnimationFrame(step);};hold={el:h,raf:requestAnimationFrame(step)};return;}
 const kn=e.target.closest('.knob');if(!kn)return;const w=kn.closest('[data-swipe],[data-drag],[data-up]');if(!w)return;e.preventDefault();
 const mode=w.dataset.swipe?'x':w.dataset.drag?'y':'up';const box=(w.querySelector('.trk,.pad')||w).getBoundingClientRect(),kb=kn.getBoundingClientRect();
 drag={kn,w,mode,key:w.dataset.swipe||w.dataset.drag||w.dataset.up,x0:e.clientX,y0:e.clientY,max:mode==='x'?box.width-kb.width-8:mode==='y'?box.height-kb.height-8:120,p:0};try{kn.setPointerCapture(e.pointerId)}catch{}});
document.addEventListener('pointermove',e=>{if(!drag)return;const d=drag.mode==='x'?e.clientX-drag.x0:drag.mode==='y'?e.clientY-drag.y0:drag.y0-e.clientY;const v=Math.max(0,Math.min(drag.max,d));drag.p=v/drag.max;drag.kn.style.transform=drag.mode==='x'?`translateX(${v}px)`:drag.mode==='y'?`translateY(${v}px)`:`translateY(${-v}px)`;drag.w.style.setProperty('--p',drag.p);});
const endDrag=()=>{if(!drag)return;const d=drag;drag=null;if(d.p>=0.72)completeAct(d.key);else{d.kn.style.transition='transform .25s';d.kn.style.transform='';setTimeout(()=>{d.kn.style.transition='';},260);}};
document.addEventListener('pointerup',()=>{endDrag();if(hold){cancelAnimationFrame(hold.raf);hold.el.classList.remove('holding');const r=hold.el.querySelector('.ring');r&&r.style.setProperty('--p',0);hold=null;}});
document.addEventListener('pointercancel',()=>{endDrag();hold=null;});

// ---------- menu / reset ----------
function sheet(h){const s=$('sheet');s.innerHTML=`<div class="card">${h}</div>`;s.hidden=false;}
function menu(){sheet(`<h3>${T('menu')}</h3><button data-act="chap">📚 ${T('chapters')}</button><button data-act="lang">ID ⇄ 中文</button><button data-act="stats" class="ghost">📊 ${T('statsT')}</button><button data-act="reset-ask" class="warn">${T('reset')}</button><button data-act="close" class="ghost">${T('no')}</button>`);}
function chapters(){const tl=timeline();const cur=curEp();sheet(`<h3>📚 ${T('chapters')}</h3><div class="chlist">${EPS.map(e=>{const idx=epStart(e.n,tl);const reached=idx>=0&&idx<st.n;const lockd=e.paid&&!st.unlock;const isCur=e.n===cur;
 return `<button class="chi${isCur?' cur':''}${!reached?' dis':''}" ${reached&&!isCur?`data-act="replay-${e.n}"`:isCur?'data-act="close"':''}><small>${T('epK')} ${e.n}${e.paid?' · '+(lockd?'🔒 ':'')+T('epPaid'):''}</small><b>${esc(L(e.title))}</b><em>${isCur?T('chCur'):reached?T('chReplay'):lockd&&e.n===6?T('chPw'):T('chLocked')}</em></button>`;}).join('')}</div><p class="chnote">${T('chNote')}</p><button data-act="close" class="ghost">${T('no')}</button>`);}
function replayAsk(N){sheet(`<h3>${T('epK')} ${N}</h3><p>${esc(L(UI.replayQ).replace('{n}',N))}</p><button data-act="replay!${N}" class="warn">${T('chReplay')}</button><button data-act="close" class="ghost">${T('no')}</button>`);}
function replayEp(N){const tl=timeline();const idx=epStart(N,tl);if(idx<0)return;BEATS.forEach(b=>{if(b._ep>=N&&b.key){delete st.ch[b.key];delete st.how[b.key];delete st.done[b.key];}});if(N<=1)['pinfast','pinH','vaultH'].forEach(k=>delete st.ch[k]);
 ['opened','inner'].forEach(k=>Object.keys(st[k]).forEach(x=>{if(+x>=idx)delete st[k][x];}));st.n=idx+1;stopPilot();pilot.key=null;track('replay',{ep:N});save();$('sheet').hidden=true;prevR=null;render();}
function statsSheet(){const ev=store.get('events',[]);const c=(e,ep)=>ev.filter(x=>x.e===e&&(ep==null||x.ep===ep)).length;
 const rows=EPS.map(e=>`<tr><td>${e.n}</td><td>${c('ep_start',e.n)}</td><td>${c('ep_end',e.n)}</td><td>${ev.filter(x=>x.e==='leave'&&x.ep===e.n).length}</td></tr>`).join('');
 const un=ev.filter(x=>x.e==='unlock').map(x=>x.how).join(', ')||'—';
 sheet(`<h3>📊 ${T('statsT')}</h3><p class="chnote">${T('statsNote')}</p><table class="stt"><tr><th>Ep</th><th>${T('stStart')}</th><th>${T('stEnd')}</th><th>${T('stLeave')}</th></tr>${rows}</table><p>${T('stPw')}: ${c('paywall_view')} · ${T('stClick')}: ${c('paywall_click')} · ${T('stUnlock')}: ${esc(un)}</p><button data-act="close" class="ghost">${T('no')}</button>`);}
// ---------- paywall (simulated purchase; nothing is charged) ----------
let pwBusy=false;
function pwOverlay(h){let o=screen.querySelector('.pwsheet');if(!o){screen.insertAdjacentHTML('beforeend','<div class="pwsheet"></div>');o=screen.querySelector('.pwsheet');}o.innerHTML=`<div class="pwc">${h}</div>`;pwBusy=true;clearFlow();}
function pwClose(){const o=screen.querySelector('.pwsheet');if(o)o.remove();pwBusy=false;}
function pwAction(v){const P=UI.pw;track('paywall_click',{opt:v});
 if(v==='pass'||v==='ep'){pwOverlay(`<small class="simtag">${esc(L(P.simTag))}</small><h4>${esc(L(v==='pass'?P.pass:P.one))}</h4><p>${esc(L(v==='pass'?P.passWhat:P.oneWhat))}</p><p class="pwnote">ⓘ ${esc(L(P.simPay))}</p><button class="pwb main" data-pwgo="${v}">${esc(L(P.pay)).replace('{p}',v==='pass'?'Rp9.000':'Rp3.000')}</button><button class="pwx" data-pwx="1">${T('no')}</button>`);return;}
 if(v==='ad'){pwOverlay(`<small class="simtag">${esc(L(P.simTag))}</small><div class="adbox"><b>${esc(L(P.adT))}</b><p>${esc(L(P.adBody))}</p><i class="adbar"><b></b></i></div><p class="pwnote">ⓘ ${esc(L(P.adNote))}</p><button class="pwb main" data-pwgo="ad" disabled id="adgo">${esc(L(P.adDone))}</button><button class="pwx" data-pwx="1">${T('no')}</button>`);
  const bar=screen.querySelector('.adbar b');const D=RM?300:8000;bar.animate([{width:'0%'},{width:'100%'}],{duration:D,fill:'forwards'});setTimeout(()=>{const g=$('adgo');if(g)g.disabled=false;},D);return;}
 if(v==='wait'){pwOverlay(`<small class="simtag">${esc(L(P.simTag))}</small><h4>${esc(L(P.waitT))}</h4><p>${esc(L(P.waitBody))}</p><button class="pwb main" data-pwgo="wait">${esc(L(P.waitSkip))}</button><button class="pwx" data-pwx="1">${esc(L(P.waitLater))}</button>`);return;}}
function unlockEp(how){st.unlock={how,at:Date.now()};track('unlock',{how});save();
 const o=screen.querySelector('.pwsheet');if(o)o.innerHTML=`<div class="pwc ok"><div class="unl">🔓</div><h4>${esc(L(UI.pw.ok))}</h4><p>${esc(L(how==='pass'?UI.pw.okPass:how==='ep'?UI.pw.okOne:UI.pw.okFree))}</p></div>`;
 screen.classList.add('unlocking');setTimeout(()=>{pwBusy=false;pwClose();screen.classList.remove('unlocking');advance(true);},RM?200:1700);}
function resetAsk(){sheet(`<h3>${T('reset')}</h3><p>${T('resetQ')}</p><button data-act="reset" class="warn">${T('yes')}</button><button data-act="close" class="ghost">${T('no')}</button>`);}
function doReset(){wiping=true;stopPilot();const lang=st.lang;store.wipe();try{localStorage.setItem('affair:'+store.id+':lang-seed',lang)}catch{};location.replace(location.pathname+location.search);}
window.addEventListener('storage',e=>{if(e.key===store.markK)location.reload();});

document.addEventListener('click',e=>{
 const sh=$('sheet');if(sh.contains(e.target)){if(e.target===sh){sh.hidden=true;return;}const a=e.target.closest('[data-act]');if(!a)return;const v=a.dataset.act;
  if(v==='close')sh.hidden=true;if(v==='lang'){st.lang=st.lang==='zh'?'id':'zh';save();sh.hidden=true;render();}if(v==='reset-ask')resetAsk();if(v==='reset')doReset();if(v==='chap')chapters();if(v==='stats')statsSheet();if(v.startsWith('replay-'))replayAsk(+v.slice(7));if(v.startsWith('replay!'))replayEp(+v.slice(7));return;}
 if(!e.target.closest('.rbar')&&(tx.active||Date.now()-ffAt<600)){finishTx();return;}
 const pw=e.target.closest('[data-pw],[data-pwgo],[data-pwx]');if(pw){if(pw.disabled)return;if(pw.dataset.pw)return pwAction(pw.dataset.pw);if(pw.dataset.pwgo)return unlockEp(pw.dataset.pwgo);if(pw.dataset.pwx){track('paywall_click',{opt:'cancel'});pwClose();return;}}
 if(e.target.closest('.pwsheet,.pw'))return;
 if(e.target.closest('[data-next]')){advance(true);return;}if(e.target.closest('[data-chap]')){chapters();return;}
 const hb=e.target.closest('[data-hub]');if(hb){const tl=timeline(),b=tl[st.n-1];if(b&&b.k==='hub'&&!hubOk(b)){if(Date.now()-beatAt<MINVIS)return;st.ch[b.key]=+hb.dataset.hub;st.how[b.key]='me';track('hub',{key:b.key,app:APPS[+hb.dataset.hub].id});save();justActed=Date.now();advance(true);}return;}
 const pkb=e.target.closest('[data-pin],[data-chip],[data-ticket]');if(pkb){pinInput(pkb);return;}
 if(e.target.closest('.aw.pinw,.hub .hubgrid'))return;
 const tg=e.target.closest('.tgt[data-actgo]');if(tg){const run=entering();if(run.length){run.forEach(a=>{try{a.finish()}catch{}});beatAt=Date.now();return;}if(Date.now()-beatAt<MINVIS)return;lastStep=Date.now();return completeAct(tg.dataset.actgo);}
 const lk=e.target.closest('.lensa.feed .lc p');if(lk){lk.classList.toggle('liked');const i=lk.querySelector('.lk');if(i)i.textContent=lk.classList.contains('liked')?'♥':'♡';return;}
 let t=e.target.closest('button,a,[data-app],[data-zoom],[data-inner]');if(t&&t.getAttribute('aria-disabled')==='true')t=null;
 if(t){if(t.id==='btnLang'){st.lang=st.lang==='zh'?'id':'zh';save();render();return;}if(t.id==='btnMenu')return menu();if(t.id==='btnPause'){st.paused=!st.paused;save();chromeBar();st.paused?clearFlow():schedule();return;}if(t.id==='btnSpeed'){const sp=[1,1.5,2];st.speed=sp[(sp.indexOf(st.speed||1)+1)%3];save();chromeBar();schedule();return;}if(t.id==='btnBack')return back();
  if(t.dataset.take)return takeover();
  if(t.dataset.opt!=null){const tl=timeline(),b=tl[st.n-1];if(b&&b.k==='choice')choose(b,+t.dataset.opt,'me');return;}
  if(t.dataset.quick!=null)return chooseQuick(+t.dataset.quick);
  if(t.dataset.actgo)return completeAct(t.dataset.actgo);if(t.dataset.hold)return;
    if(t.dataset.inner){st.inner[t.dataset.inner]=true;save();render();return;}
  if(t.dataset.zoom){const z=$('zoom');const one=t.dataset.zoom==='1';const src=one?'p-fakephoto.webp':t.dataset.zoom;const cap=one?T('zoomCap'):esc(t.dataset.cap||'');
   if(t.dataset.seen){st.seen[t.dataset.seen]=true;save();track('discover',{what:t.dataset.seen});}
   z.innerHTML=`<div class="zp"><div class="photo big"><img src="assets/${src}" alt=""></div><p>${cap}</p></div>`;z.hidden=false;flowPause('zoom');return;}
  if(t.dataset.again){const lang=st.lang,u=st.unlock;st=fresh(lang);st.unlock=u;save();prevR=null;render();return;}
  if(t.tagName==='A')return;}
 if(e.target.closest('#zoom')){$('zoom').hidden=true;flowResume('zoom');return;}
 if(e.target.closest('[data-pill]')){const m=document.getElementById('msgs');if(m)m.scrollTop=m.scrollHeight;scrolledUp=false;flowResume('scroll');return;}
 if(e.target.closest('.rbar'))return;
 if(e.target.closest('.aw,.pilotkb,.quickkb,.quick:not(.done) .qopts'))return;
 if(Date.now()-justActed<450)return;
 tapStep();});
document.addEventListener('keydown',e=>{if(e.key===' '||e.key==='ArrowRight'){e.preventDefault();tapStep();}if(e.key==='ArrowLeft')back();});
window.__phone={dwell,get got(){return [...gotNow()]},APPS,ANSWER,ok,get pin(){return pin},pinInput,get st(){return st},timeline,derive,L,isBlocked,heat,meCount,curEp,events:()=>store.get('events',[]),get tx(){return tx.active},get waiting(){return !!flowFn},get beatAt(){return beatAt},tapStep,entering,render,save,schedule};
render();
})();
