// Phone-first engine, Episode 1 (v4, simple). Builds a linear list of frames from BEATS + the reader's decisions,
// then plays them: auto-advance at reading pace, taps only for meaningful actions.
(function(){
'use strict';
const P=window.PHONE,{GDAYS,GSHOTS,GDEL,BEATS,APPS,LIST,UI,TH,SAY,TICKET,ANSWER,DECOR,CLOG_OLD}=P;
const $=s=>document.querySelector(s);
const qs=new URLSearchParams(location.search);
const store=PhoneStore.create(localStorage,location.search,{onWiped:()=>location.reload()});
let lang=qs.get('lang')||store.get('lang','zh');if(lang!=='id'&&lang!=='zh')lang='zh';
const L=s=>{if(s==null)return'';s=String(s);const i=s.indexOf('|');return i<0?s:(lang==='zh'?s.slice(i+1):s.slice(0,i))};
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const T=s=>esc(L(s));
const fmtClock=m=>String(Math.floor(m/60)%24).padStart(2,'0')+'.'+String(m%60).padStart(2,'0');
const clockOf=s=>{const [h,m]=String(s).split('.').map(Number);return h*60+m};
const EP=P.EP||1,CLK=P.CLOCK||{start:'22.31',total:15,ic:'🚿',label:'Air masih mengalir|水还在流',stop:'Air berhenti|水停了'};
const START=clockOf(CLK.start),TOTAL=CLK.total,MINVIS=350;
const sk=k=>EP===1?k:'e'+EP+':'+k;
const fmtLeft=sec=>String(Math.floor(sec/60)).padStart(2,'0')+':'+String(sec%60).padStart(2,'0');
const SPEEDS=[1,1.5,2];
// ---------------- decisions ----------------
let dec=store.get(sk('dec'),{}),order=store.get(sk('order'),[]);
function decide(key,val){dec[key]=val;order=order.filter(k=>k!==key);order.push(key);store.set(sk('dec'),dec);store.set(sk('order'),order)}
function undoFrom(key){const i=order.indexOf(key);if(i<0)return;order.slice(i).forEach(k=>delete dec[k]);order=order.slice(0,i);store.set(sk('dec'),dec);store.set(sk('order'),order)}
// ---------------- timeline ----------------
function cond(w,st){const neg=w[0]==='!';const c=neg?w.slice(1):w;const [t,v]=c.split(':');let r=false;
 if(t==='flag')r=!!st.flags[v];else if(t==='got')r=st.got.includes(v);return neg?!r:r}
function build(plan){
 const F=[];const st={used:0,shower:0,flags:{},got:[],fixed:null,view:{k:'dark'},ov:[],stop:false,jump:0,drain:0,last:null};
 const clone=o=>JSON.parse(JSON.stringify(o));
 const left=()=>Math.max(0,TOTAL-st.used);
 function push(b,extra){
  const f={i:F.length,b,v:clone(st.view),ov:clone(st.ov),clock:st.fixed||fmtClock(START+Math.min(st.used,TOTAL)),left:left(),shower:st.shower,flags:clone(st.flags),got:st.got.slice(),jump:st.jump,...(extra||{})};
  st.jump=0;F.push(f);return f}
 const base=v=>{st.view=v;st.ov=[]};
 function run(list){
  for(const b of list){
   if(st.stop)return;
   if(b.when&&!cond(b.when,st))continue;
   if(b.clock)st.fixed=b.clock;
   if(b.cost){st.used+=b.cost;st.jump=b.cost}
   if(b.shower!=null){st.shower=b.shower;if(b.shower)st.fixed=null}
   switch(b.k){
    case 'dark':base({k:'dark',title:b.title,day:b.day,t:b.t,sub:b.sub,cut:b.cut,stop:b.shower===2,fbk:b.fbk});push(b,{txt:(b.t||'')+(b.sub&&b.sub!=='{t}'?b.sub:'')});break;
    case 'scene':base({k:'scene',img:b.img,focus:b.opos,tag:b.tag,tint:b.tint,fbl:b.fbl,caps:b.lines.map(t=>({t,line:1}))});push(b,{txt:b.lines.join(' ')});break;
    case 'scap':case 'say':{if(st.view.k!=='scene')base({k:'scene',caps:[]});st.view.caps.forEach(c=>c.old=1);
      st.view.caps.push(b.k==='say'?{say:b.who,t:b.t}:{t:b.t,bn:b.bn,from:b.from,time:b.time,ticket:b.ticket,glimpse:b.glimpse});st.ov=[];push(b,{txt:b.t});break}
    case 'pop':st.ov=st.ov.filter(o=>o.k!=='pop'&&o.k!=='inner');st.ov.push({k:'pop',style:b.style,ic:b.ic,from:b.from,t:b.t});push(b,{txt:b.t});break;
    case 'inner':st.ov=st.ov.filter(o=>o.k!=='pop'&&o.k!=='inner');st.ov.push({k:'inner',t:b.t});push(b,{txt:b.t});break;
    case 'line':st.view.lines=(st.view.lines||[]);st.view.lines.push({who:b.who,t:b.t});push(b,{txt:b.t});break;
    case 'lock':base({k:'lock',notifs:b.notifs});push(b,{txt:b.notifs[0].t});break;
    case 'list':if(b.flag)st.flags[b.flag]=1;base({k:'list',at:b.at,hold:b.hold,title:b.title,back:b.back,menu:b.menu});push(b);break;
    case 'thread':base({k:'thread',th:b.th,msgs:b.msgs});push(b,{txt:'x'.repeat(40)});break;
    case 'replay':st.view.tr=b.tr;st.ov=[];push(b,{txt:b.tr});break;
    case 'gallery':base({k:'gallery',t:b.t,focus:b.focus,cap:b.cap,zoomed:b.zoomed});push(b,{txt:b.cap});break;
    case 'ride':base({k:'ride',t:b.t,img:b.img,cap:b.cap,rows:b.rows,det:b.det});push(b,{txt:'x'.repeat(70)});break;
    case 'bank':base({k:'bank',t:b.t,amt:b.amt,rows:b.rows,det:b.det});push(b,{txt:'x'.repeat(70)});break;
    case 'call':base({k:'call',name:b.name,num:b.num,sub:b.sub,who:b.who,on:b.on,out:b.out});push(b,{txt:b.name});break;
    case 'clog':base({k:'clog',row:b.row,swipe:b.swipe,gone:b.gone,at:st.last&&st.last.callAt});push(b,{txt:b.gone?UI.deleted:(b.row&&b.row.t)});break;
    case 'contact':base({k:'contact',num:b.num,name:b.name,res:b.res});push(b,{txt:b.res?UI.cDup:''});break;
    case 'story':base({k:'story',img:b.img,user:b.user,who:b.who,t:b.t,ago:b.ago});push(b,{txt:'x'.repeat(40)});break;
    case 'prof':base({k:'prof',user:b.user,who:b.who,bio:b.bio,tiles:b.tiles,stats:b.stats});push(b,{txt:'x'.repeat(30)});break;
    case 'post':base({k:'post',user:b.user,who:b.who,img:b.img,t:b.t,date:b.date});push(b,{txt:b.t});break;
    case 'rbook':base({k:'rbook',a:b.a,b:b.b,img:b.img,fare:b.fare,eta:b.eta,on:b.on});push(b,{txt:'x'.repeat(40)});break;
    case 'cmp':base({k:'cmp',l:b.l,r:b.r});push(b,{txt:'x'.repeat(60)});break;
    case 'gal2':base({k:'gal2',m:b.m,at:b.at,i:b.i});push(b,{txt:b.m==='photo'?'x'.repeat(50):''});break;
    case 'home':base({k:'hub',end:b.end,pwr:b.pwr});push(b);break;
    case 'recents':{const ids=['chat',...st.got.filter(x=>x!=='chat')];base({k:'recents',apps:ids,tel:1});push(b,{txt:'x'.repeat(20)});break}
    case 'snap':st.ov=st.ov.filter(o=>o.k!=='pop'&&o.k!=='inner');st.ov.push({k:'snap',t:b.t});push(b,{txt:b.t});break;
    case 'myshot':{if(b.src){base({k:'myshot',src:b.src,at:b.at});push(b,{txt:'x'.repeat(30)});break}const src=F.find(f=>f.b.id===b.ref);if(src){base({k:'myshot',src:{...clone(src.v),hl:1},at:src.clock,shower:src.shower,left:src.left})}push(b,{txt:'x'.repeat(30)});break}
    case 'epend':base({k:'epend',tease:b.tease,ep:b.ep});push(b,{wait:'end'});st.stop=true;return;
    case 'fb':{const src=F.find(f=>f.b.id===b.ref[0]);if(src){base({...clone(src.v),fb:1});push(b,{fbClock:src.clock})}break}
    case 'act':{
      if(b.mode==='pin'){base({k:'lock',pin:1,notifs:[]})}
      st.ov=st.ov.filter(o=>(o.k!=='pop'||b.tgt==='pop')&&o.k!=='inner');
      const f=push(b,{wait:b.key});
      if(dec[b.key]==null){if(!plan){st.stop=true;return}}else f.done=1;
      if(!f.done&&!plan)return;if(b.mode==='pin'){st.view.pinDone=1}
      break}
    case 'choice':{
      st.ov=st.ov.filter(o=>o.k!=='snap');
      const f=push(b,{wait:b.key});
      let v=dec[b.key];if(v==null){if(!plan){st.stop=true;return}v=0}else f.done=1;const o=b.opts[v];if(o.flag)st.flags[o.flag]=1;
      if(o.set)Object.assign(st.view,o.set);
      run(o.re);break}
    case 'hub':{
      if(b.peek){const rem=APPS.filter(a=>!st.got.includes(a.id));if(!rem.length)continue;
        base({k:'hub',peek:1});push(b,{drainFrom:left()});st.used=TOTAL;break}
      const can=APPS.filter(a=>!st.got.includes(a.id)&&a.cost<=left());
      if(!can.length)continue;
      base({k:'hub'});const f=push(b,{wait:b.key});
      let pick=dec[b.key];if(pick==null){if(!plan){st.stop=true;return}pick=can[0].id}else f.done=1;
      const app=APPS.find(a=>a.id===pick);if(!app||!can.includes(app)){st.stop=true;f.bad=1;return}st.used+=app.cost;st.jump=app.cost;st.got.push(app.id);
      const firstApp=st.got.length===1;
      run(app.re);
      if(firstApp)st.last={callAt:fmtClock(START+st.used)};
      break}
   }
   if(b.k==='call'&&!st.last)st.last={callAt:fmtClock(START+st.used)};
  }
 }
 run(BEATS);
 if(!plan){const PF=build(true);F.forEach((f,i)=>{const q=PF[i];if(q&&q.b===f.b&&q.s0!=null){f.s0=q.s0;f.s1=q.s1}});return F}
 // continuous countdown: each run of frames sharing the same 'left' ticks from the previous budget down to its own
 let prevEnd=TOTAL*60,i=0;
 while(i<F.length){const f=F[i];if(f.shower!==1||f.drainFrom!=null){i++;continue}
  let j=i;while(j<F.length&&F[j].shower===1&&F[j].drainFrom==null&&F[j].left===f.left)j++;
  const n=j-i,a=prevEnd;let b=f.left*60;if(b>=a)b=a-Math.min(24,6*n);
  for(let k=i;k<j;k++){F[k].s0=Math.round(a-(a-b)*(k-i)/n);F[k].s1=Math.round(a-(a-b)*(k-i+1)/n)}
  if(b===0&&F[j-1].wait)F[j-1].s1=Math.min(F[j-1].s0,3); // the last tap stops the water: never sit at 00:00 waiting
  prevEnd=b;i=j}
 return F;
}
// ---------------- rendering ----------------
const scr=$('#screen'),phone=$('#phone');
let F=build(),pos=Math.min(store.get(sk('pos'),0),F.length-1),shownAt=0,timer=null,paused=false,speed=store.get('speed',1),revealed=false;
window.__LOG=[];
const HIS=P.HIS||['lock','hub','recents','list','thread','gallery','gal2','ride','bank','call','clog'];const WALL=P.WALL||'p-wall.webp';
const secClock=s=>fmtClock(START+Math.floor((TOTAL*60-s)/60));
const sbHTML=(f,light,clock)=>`<div class="sb${light?' light':''}"><b class="sbt">${esc(String(clock||(f.s0!=null?secClock(f.s0):f.clock)).replace('.',':'))}</b><span class="isl">${HIS.includes(f.v.k)&&!f.noLabel?`<em class="hisl">📱 ${T(UI.hisPhone)}</em>`:''}</span><span class="sig">▂▄▆█</span><small>4G</small><span class="bat"><i style="width:${f.shower?54:62}%"></i></span></div>`;
const cdHidden=f=>!f.shower||(f.v.k==='dark'&&f.v.stop)||!!f.v.fbl||f.v.k==='cmp'||!!f.v.fbk;
function chipHTML(f){
 if(cdHidden(f))return'';const stop=f.shower===2||(f.v.k==='dark'&&f.v.stop);const s=stop?0:f.drainFrom!=null?f.drainFrom*60:(f.s0!=null?f.s0:f.left*60);
 return `<div class="cd${stop?' stop':''}${!stop&&s<=180?' low':''}" id="cd"><span class="cdi">${CLK.ic}</span><span class="cdl">${T(stop?CLK.stop:CLK.label)}</span>${stop?'':`<b id="cdt">${fmtLeft(s)}</b>`}</div>`}
function av(who,big){if(who==='B')return `<span class="pav c-b${big?' big':''}">B</span>`;const s=SAY[who];return s&&s.img?`<span class="pav${big?' big':''}"><img src="assets/${s.img}" alt=""></span>`:s&&s.ini?`<span class="pav c${s.c||2}${big?' big':''}">${esc(s.ini)}</span>`:`<span class="pav">?</span>`}
function viewHTML(f){
 const v=f.v;
 switch(v.k){
  case 'dark':{
   if(v.title)return `<div class="app dark"><div class="ttl"><small class="day">${T(v.day)}</small><b>${T(v.t)}</b><p>${T(v.sub)}</p></div></div>`;
   if(v.cut)return `<div class="app dark cut"></div>`;
   const sub=v.sub==='{t}'?esc(f.clock.replace('.',':')):T(v.sub);
   return `<div class="app dark"><div class="dk"><b>${T(v.t)}</b>${sub?`<p>${sub}</p>`:''}</div></div>`}
  case 'scene':{
   const all=v.caps,cut=Math.max(0,all.length-4);
   const caps=all.slice(cut).map((c,i)=>{const nw=!c.old&&!c.line?' new':'';const fresh=c.line&&f.b.k==='scene';const st=fresh?` style="animation-delay:${i*0.7}s"`:'';
    if(c.say){const s=SAY[c.say];return `<div class="say${s.me?' me':''} cap${nw}">${av(c.say)}<div><small>${T(s.name)}</small><p>${T(c.t)}</p></div></div>`}
    if(c.bn)return `<div class="nb cap${nw}"><div class="nbh"><span>💬 ${T(c.from)}</span><span>${esc(c.time)}</span></div><p>${T(c.t)}</p></div>`;
    if(c.glimpse)return `<div class="glimpse cap${nw}"><small>${T(UI.hisPhone)}</small><span class="gb">${T(c.t)}</span></div>`;
    if(c.ticket)return `<div class="cap${nw} tkwrap">${ticketHTML('')}<p>${T(c.t)}</p></div>`;
    return `<p class="cap line${fresh?' l':''}${nw}"${st}>${T(c.t)}</p>`}).join('');
   return `<div class="app scene${v.tint==='fb'?' fbt':''}${v.fbl?' fbx':''}${all.length>=4?' many':''}">${v.img?`<div class="simg"><img src="assets/${v.img}" alt=""${v.focus?` style="object-position:${v.focus}"`:''}>${v.fbl?'':`<span class="stag">${T(v.tag)}</span>`}${v.tint==='fb'&&!v.fbl?`<span class="fbchip">${T(UI.fbL)}</span>`:''}</div>`:''}${v.fbl?`<div class="fblbl">${T(v.fbl)}</div>`:''}<div class="scaps">${caps}</div></div>`}
  case 'lock':{
   if(v.pin)return `<div class="app lock pinning"><img class="wallimg" src="assets/${WALL}" alt="">${sbHTML(f,1)}<div class="pinbox">${f.b.ticketTop?`<div class="pintk"><p class="pincap">${T(f.b.cap)}</p><div class="tkmini" id="tkmini">${ticketHTML('mini')}<small id="tkhint"></small></div></div>`:''}<div class="pinl">🔒 ${T(UI.pinEnter)}</div><div class="dots6" id="dots">${'<i></i>'.repeat(6)}</div><div class="pinmsg" id="pinmsg"></div><div class="pad" id="pad">${[1,2,3,4,5,6,7,8,9,'',0,'⌫'].map(k=>k===''?'<span></span>':`<button class="key" data-k="${k}">${k}</button>`).join('')}</div><div class="pinhelp" id="pinhelp"></div></div></div>`;
   return `<div class="app lock"><img class="wallimg" src="assets/${WALL}" alt="">${sbHTML(f,1)}<div class="lk-t">${esc(f.clock.replace('.',':'))}</div><div class="lk-d">${T(UI.lockDate)}</div><div class="lk-n">${v.notifs.map((n,i)=>`<div class="ln${i===0&&f.b.k==='lock'?' new':''}" data-tgt="n${i}"><span class="la">${n.ic||'💬'} ${esc(n.app)} · ${T(n.title)}</span><p>${T(n.t)}</p><span class="lt">${T(UI.now)}</span></div>`).join('')}</div></div>`}
  case 'list':{
   const cs={flags:f.flags,got:f.got};const rows=LIST.map(r=>{const re=r.reun&&cond(r.reun,cs);const un=r.un&&(!(r.unWhen&&!cond(r.unWhen,cs))||re);const pop=re&&f.b.k==='list'&&f.b.flag?' class="rp"':'';
    return `<div class="lrow${r.pin?' pin':''}" data-row="${r.id}">${r.id==='budi'?av('B'):r.id==='rumah'?`<span class="pav c-home">R</span>`:`<span class="pav c${r.id.length%5}">${esc(L(r.name)[0])}</span>`}<div class="lmid"><b>${T(r.name)}</b><p>${T(r.t)}</p></div><div class="lrt"><small${un?' class="g"':''}>${T(r.time)}</small><span>${r.pin?'📌':''}${r.fav?'❤️':''}${un?`<em${pop}>${r.un}</em>`:''}</span></div></div>`+(r.id==='budi'&&v.menu?`<div class="lmenu"><span data-tgt="unread">✉️ ${T(UI.mUnread)}</span><span>📌 ${T(UI.mUnpin)}</span><span>🗂 ${T(UI.mArch)}</span><span class="r">🗑 ${T(UI.mDelChat)}</span></div>`:'')}).join('');
   return `<div class="app list${v.menu?' menu':''}">${sbHTML(f)}<div class="lh"><b>${T(UI.chats)}</b><div class="srch">🔍 ${T(UI.search)}</div></div><div class="lrows" id="lrows">${rows}<div class="lpad"></div></div>${v.title?`<div class="tflash"><b>${T(P.TITLE.t)}</b></div>`:''}</div>`}
  case 'thread':{
   const th=TH[v.th];
   const ms=v.msgs.map(m=>m.k==='sys'?`<div class="sysm">${m.ic==null?'🧹 ':m.ic}${T(m.t)}</div>`:m.vn?`<div class="m them"><div class="mb"><div class="vnm${v.tr?'':' pulse'}"><i>▶</i>${'<s></s>'.repeat(24)}<small>${esc(m.vn)}</small></div>${v.tr?`<span class="vt new"><small>${T(UI.tr)}</small>${T(v.tr)}</span>`:''}<span class="mt">${esc(m.time)}</span></div></div>`:`<div class="m ${m.me?'me':'them'}"><div class="mb${L(m.t)==='❤️'?' emo':''}">${T(m.t)}<span class="mt">${esc(m.time)}</span></div></div>`).join('');
   return `<div class="app chat">${sbHTML(f)}<div class="ch"><span class="bk" data-tgt="back">‹</span>${av(th.av||'B')}<div><b>${T(th.name)}</b><small>${esc(th.sub)}</small></div><span class="ci">📞</span></div><div class="msgs">${ms}</div></div>`}
  case 'gallery':
   return `<div class="app gallery">${sbHTML(f,0)}<div class="gh"><span class="bk">‹</span><b>${T(UI.gallery)}</b></div><div class="gt">🔒 ${T(v.t)}</div><div class="gfocus${v.zoomed?' zoomed':''}"><img src="assets/${v.focus}" alt=""></div><div class="gcap">ⓘ ${T(v.cap)}</div></div>`;
  case 'ride':
   return `<div class="app ride">${sbHTML(f)}<div class="ah"><b><span class="abk" data-tgt="${v.det?'back':'x'}">‹</span> 🛵 Jalanku</b><small>${T(v.t)}</small></div><div class="rmap"><img src="assets/${v.img}" alt=""><span class="rpin">📍 ${T(v.cap)}</span></div>${v.det?`<div class="rdet"><small>${T(v.det.d)}</small><div class="rst"><i class="a"></i><div><small>${T(UI.rFrom)} · ${esc(v.det.ta)}</small><b>${T(v.det.a)}</b></div></div><div class="rst"><i class="b"></i><div><small>${T(UI.rTo)} · ${esc(v.det.tb)}</small><b>${T(v.det.b)}</b></div></div><div class="rfare"><span>${T(UI.rFare)}</span><b>${esc(v.det.fare)}</b></div><div class="rdone">✓ ${T(UI.rDone)}</div></div>`:`<div class="rrows">${v.rows.map((r,i)=>`<div class="rrow" data-tgt="r${i}"><small>${T(r[0])}</small><b>${T(r[1])}</b><span>${esc(r[2])}</span></div>`).join('')}</div>`}</div>`;
  case 'bank':
   return `<div class="app bank">${sbHTML(f)}<div class="ah bh"><b><span class="abk" data-tgt="back">‹</span> 🏦 Arta</b><small>${T(UI.bankAcc)}</small></div><div class="bt">${T(v.t)}</div><div class="brows">${v.rows.map(r=>`<div class="brow"><div><small>${T(r[0])}</small><b>${T(r[1])}</b></div><span class="neg">${esc(v.amt)}</span></div>`).join('')}</div><div class="bdet">${v.det.map(d=>`<div class="${d[2]?'hl':''}"><small>${T(d[0])}</small><b>${T(d[1])}</b></div>`).join('')}</div></div>`;
  case 'call':{
   const on=v.on;const clock=v.fb?f.fbClock:null;
   return `<div class="app call${v.fb?' fbv':''}">${sbHTML(f,1,clock)}${v.fb?`<span class="fbchip">${T(UI.fbL)} · ${esc(String(f.fbClock).replace('.',':'))}</span>`:''}<div class="cav">${av(v.who||'B',1)}</div><div class="cn">${T(v.name)}</div><div class="cnum${v.fb||v.hl?' hlnum':''}">${esc(v.num)}</div><div class="cs">${on?T(UI.oncall)+' · <span id="ctime">0:0'+(3+(v.lines?v.lines.length*3:0))+'</span>':T(v.sub)}</div><div class="clines">${(v.lines||[]).map((l,i)=>`<div class="cline${i===v.lines.length-1&&f.b.k==='line'?' new':''}"><small>${T(SAY[l.who].name)}</small><p>${T(l.t)}</p></div>`).join('')}</div></div>`}
  case 'clog':{
   const row=v.gone?'':`<div class="crow${v.swipe?' swiped':''}"><div class="crin">${av('B')}<div class="lmid"><b class="${v.row.miss?'miss':''}">${T(TH.budi.name)}</b><p>${v.row.miss?'↙︎ ':'↘︎ '}${T(v.row.t)}</p></div><small>${esc(String(v.at||f.clock).replace('.',':'))}</small></div><span class="cdel">${T(UI.del)}</span></div>`;
   return `<div class="app clog">${sbHTML(f)}<div class="lh"><b>${T(UI.clogT)}</b></div><div class="csec">${T(UI.today)}</div>${row}${v.gone?`<div class="toast">🗑 ${T(UI.deleted)}</div>`:''}<div class="csec">${T(UI.earlier)}</div>${CLOG_OLD.map(r=>`<div class="crow old"><div class="crin"><span class="pav c3">${esc(L(r.name)[0])}</span><div class="lmid"><b class="${r.miss?'miss':''}">${T(r.name)}</b><p>${T(r.t)}</p></div><small>${T(r.time)}</small></div></div>`).join('')}</div>`}
  case 'hub':{
   const ic=APPS.map(a=>{const done=f.got.includes(a.id);const can=!done&&a.cost<=f.left&&!v.peek;
     return `<button class="hubic ${v.end?'':done?'done':can?'can':'cant'}" data-app="${a.id}" data-tgt="app-${a.id}"${can&&f.b.wait!==undefined?'':''}><span class="ai" style="background:${a.col}">${a.ic}</span><small>${T(a.name)}</small><em class="cost">${done?'✓':(can?'':'✕ ')+a.cost+' '+T(UI.min)}</em></button>`}).join('');
   const dc=DECOR.map(d=>`<span class="hubic decor"><span class="ai">${d.ic}</span><small>${T(d.name)}</small></span>`).join('');
   return `<div class="app hub${v.end?' end':''}"><img class="wallimg" src="assets/${WALL}" alt="">${sbHTML(f,1)}<div class="hubgrid">${ic}${dc}</div>${v.pwr?`<span class="pwr" data-tgt="pwr"><i></i></span>`:''}</div>`}
  case 'recents':{
   const cards=v.apps.map(id=>APPS.find(a=>a.id===id)).filter(Boolean).map(a=>({ic:a.ic,name:a.name,col:a.col}));if(v.tel)cards.push({ic:'📞',name:DECOR[0].name,col:'#3b6fd6'});
   return `<div class="app recents"><img class="wallimg" src="assets/${WALL}" alt="">${sbHTML(f,1)}<div class="rcards">${cards.map((c,i)=>`<div class="rcard" style="--i:${i}"><div class="rch"><span class="ai" style="background:${c.col}">${c.ic}</span><b>${T(c.name)}</b></div><div class="rcb" style="background:linear-gradient(160deg,${c.col}33,#f4f4f6 40%)"><i></i><i></i><i></i></div></div>`).join('')}</div><button class="rclr" data-tgt="clr">${T(UI.clrAll)}</button></div>`}
  case 'gal2':{
   const ss=(k)=>{const a=GSHOTS[k];return `<div class="gss"><small>${T(a[0])}</small><b>${T(a[1])}</b><p>${T(a[2])}</p><em>${T(a[3])}</em></div>`};
   const tile=(p)=>p[0][0]==='@'?`<span class="gtile ss">${ss(p[0].slice(1))}<i>${esc(p[3])}</i></span>`:`<span class="gtile"><img src="assets/${p[0]}.webp" alt="" style="object-position:${p[1]};transform:scale(${p[2]})"><i>${esc(p[3])}</i></span>`;
   const shotUI=(g,mini)=>{const a=L(g.shot).split(' · ');return `<div class="rsv${mini?' mini':''}"><small>${T(UI.gRsv)}</small><b>${esc(a[0])}</b><p>${esc(a[1])}</p><p>${esc(a[2])}</p><em>✓ ${esc(a[3])}</em></div>`};
   if(v.m==='grid'){
    const secs=GDAYS.map(d=>`<div class="gsec" data-day="${d.id}"><div class="gday">${T(d.d)}</div><div class="ggrid">${d.ph.map(p=>tile(p)).join('')}</div></div>`).join('');
    return `<div class="app gal2">${sbHTML(f,0)}<div class="gh2"><b>${T(UI.gRecent)}</b></div><div class="gscroll" id="gscroll" data-tgt="scroll">${secs}<div class="gorow gdrow" data-tgt="del"><span>🗑</span><b>${T(UI.gDel3)}</b><small>›</small></div><div class="gend"></div></div></div>`}
   if(v.m==='del'){
    const ts=GDEL.map((g,i)=>`<span class="gtile del" data-tgt="p${i}">${g.img?`<img src="assets/${g.img}" alt="">`:shotUI(g,1)}<b class="gtt">${T(g.tm)}</b><i>${T(UI.gDays)}</i></span>`).join('');
    return `<div class="app gal2">${sbHTML(f,0)}<div class="gh2"><span class="bk">‹</span><b>${T(UI.gDel)}</b></div><div class="gnote">${T(UI.gDaysL)}</div><div class="ggrid big">${ts}</div></div>`}
   const g=GDEL[v.i];
   return `<div class="app gal2">${sbHTML(f,0)}<div class="gh2"><span class="bk">‹</span><b>${T(UI.gDel)}</b><small>${v.i+1}/3</small></div><div class="gtm"><b>${T(g.tm)}</b><small>${T(UI.gTmD)}</small></div><div class="gph" data-tgt="ph">${g.img?`<img src="assets/${g.img}" alt="">`:shotUI(g)}</div><div class="gcap">ⓘ ${T(g.cap)}</div><div class="gdl">🗑 ${T(UI.gDaysL)}</div><div class="gbtns"><span>${T(UI.gRestore)}</span><span class="r">${T(UI.gDelete)}</span></div></div>`}
  case 'myshot':{
   const inner=viewHTML({v:v.src,clock:v.at,left:v.left,shower:0,b:{k:'x'},ov:[],got:[],flags:{},noLabel:1});
   return `<div class="app mygal">${sbHTML(f)}<div class="gh"><span class="bk">‹</span><b>${T(UI.myGal)}</b></div><div class="shotph" data-tgt="shot"><div class="shotin">${inner}</div><i class="glare"></i></div><div class="gcap">📷 ${esc(String(v.at).replace('.',':'))}</div></div>`}
  case 'contact':
   return `<div class="app contact">${sbHTML(f)}<div class="lh"><b>${T(UI.cNew)}</b></div><div class="cform"><label>${T(UI.cNum)}</label><div class="cf">${esc(v.num)}</div><label>${T(UI.cName)}</label><div class="cf typed">${T(v.name)}<i class="caret"></i></div></div>${v.res?`<div class="cdup"><small>${T(UI.cDup)}</small><b>${T(v.res)}</b></div>`:''}</div>`;
  case 'epend':
   return `<div class="app epv"><div class="epc"><small>${T(UI.epDone)}</small>${v.tease?`<h2>${T(v.tease)}</h2>`:''}<p class="bers">${T(UI.end1)}</p>${P.NEXT?`<button class="nextep" id="nextep">${T(UI.nextEp)}</button>`:''}<button class="again" id="again">${T(UI.again)}</button></div></div>`;
  case 'story':
   return `<div class="app story">${sbHTML(f,1)}<div class="stbar"><i></i></div><div class="sth">${av(v.who)}<b>${esc(v.user)}</b><small>${T(v.ago)}</small></div><img class="stimg" src="assets/${v.img}" alt=""><div class="stk">${T(v.t)}</div></div>`;
  case 'prof':
   return `<div class="app prof">${sbHTML(f)}<div class="ph"><span class="bk">‹</span><b>${esc(v.user)}</b></div><div class="pt">${av(v.who,1)}<div class="pst">${v.stats.map(x=>`<span><b>${esc(x[0])}</b><small>${T(x[1])}</small></span>`).join('')}</div></div><div class="pbio">${T(v.bio)}</div><div class="pgrid">${v.tiles.map((x,i)=>`<span class="ptile" data-tgt="t${i}"><img src="assets/${x}" alt=""></span>`).join('')}</div></div>`;
  case 'post':
   return `<div class="app post">${sbHTML(f)}<div class="ph"><span class="bk">‹</span><b>${T(UI.posts)}</b></div><div class="poh">${av(v.who)}<b>${esc(v.user)}</b></div><div class="pimg"><img src="assets/${v.img}" alt=""></div><div class="pact">♡  💬  ➤</div><p class="pcap"><b>${esc(v.user)}</b> ${T(v.t)}</p><small class="pdate">${T(v.date)}</small></div>`;
  case 'rbook':
   return `<div class="app ride rbook">${sbHTML(f)}<div class="ah"><b>🛵 Jalanku</b><small>${T(v.on?UI.rbOn:UI.rbNew)}</small></div><div class="rmap"><img src="assets/${v.img}" alt=""><span class="rpin">📍 ${T(v.b)}</span></div><div class="rdet"><div class="rst"><i class="a"></i><div><small>${T(UI.rFrom)}</small><b>${T(v.a)}</b></div></div><div class="rst"><i class="b"></i><div><small>${T(UI.rTo)}</small><b>${T(v.b)}</b></div></div><div class="rfare"><span>${T(UI.rFare)}</span><b>${esc(v.fare)}</b></div>${v.on?`<div class="rdone">🛵 ${T(UI.rbDrv)}</div>`:''}</div></div>`;
  case 'cmp':
   return `<div class="app cmp">${sbHTML(f,1)}<div class="cmpw"><div class="cmpc"><div class="cmpk l"><small>${T(v.l.h)}</small><b>${esc(v.l.tm)}</b><div class="cmpb"><em>${T(v.l.from)}</em>${T(v.l.t)}</div></div><div class="cmpk r"><small>${T(v.r.h)}</small><b>${esc(v.r.tm)}</b><img src="assets/${v.r.img}" alt=""><em>${T(v.r.t)}</em></div></div></div></div>`;
 }
 return '<div class="app dark"></div>'}
function ticketHTML(cls){const t=TICKET;return `<div class="ticket ${cls||''}"><div class="tk-l"><small>${esc(t.cin)}</small><b>${esc(t.film)}</b><div class="tkg"><span><small>${T(UI.tkDay)}</small>${T(t.day)}</span><span><small>${T(UI.tkDate)}</small><em class="tk-date">${esc(t.date)}</em></span><span><small>${T(UI.tkTime)}</small>${esc(t.time)}</span><span><small>STUDIO</small>${esc(t.studio)}</span><span><small>${T(UI.tkSeat)}</small>${esc(t.seat)}</span></div></div><div class="tk-r">🎟</div></div>`}
function ovHTML(f){
 let h='';for(const o of f.ov){
  const nw=f.b.k===o.k||(f.b.k==='pop'&&o.k==='pop')?' new':'';
  if(o.k==='pop')h+=`<div class="pop ${o.style||''}${nw}" data-tgt="pop"><span class="la">${o.ic||''} ${T(o.from)}</span><p>${T(o.t)}</p></div>`;
  if(o.k==='snap')h+=`${nw?'<div class="flash"></div><div class="vf"></div>':''}<div class="snapc${nw}">📸 ${T(o.t)}</div>`;
  if(o.k==='inner')h+=`<div class="innerv${nw}"><small>${T(UI.innerL)}</small>${T(o.t)}</div>`}
 const b=f.b;
 if(b.k==='act'&&!f.done&&b.mode==='tap')h+=`<div class="actbar"><button class="actbtn${b.red?' red':''}" id="actbtn">${T(b.btn)}</button></div>`;
 if(b.k==='choice'&&!f.done){
  if(b.in==='call')h+=`<div class="cbtns"><button class="cbtn ok" data-opt="0"><span>📞</span>${T(b.opts[0].t)}</button><button class="cbtn no" data-opt="1"><span>📞</span>${T(b.opts[1].t)}</button></div>`;
  else h+=`<div class="ropts">${b.opts.map((o,i)=>`<button class="ropt" data-opt="${i}">${T(o.t)}</button>`).join('')}</div>`}
 return h}
let lastViewKey='';
function render(anim){
 const f=F[pos];
 const vk=JSON.stringify([f.v.k,f.v.img,f.v.focus,f.v.th,f.v.fb,f.v.pin,f.v.tint]);
 const changed=vk!==lastViewKey;lastViewKey=vk;
 phone.dataset.view=f.v.k;
 scr.innerHTML=viewHTML(f)+chipHTML(f)+ovHTML(f);
 {const pf=F[pos-1];const cd=$('#cd');if(cd&&anim&&pf&&pf.shower&&cdHidden(pf)){cd.classList.add('back');cd.addEventListener('animationend',()=>cd.classList.remove('back'),{once:true})}}
 scr.dataset.frame=pos;scr.dataset.k=f.b.k;scr.dataset.wait=(f.wait&&!f.done)?f.wait:'';
 scr.dataset.left=f.left;scr.dataset.clock=f.clock;
 const app=scr.querySelector('.app');if(app&&changed&&anim)app.classList.add('enter');
 if(f.b.fx==='shake'&&anim){phone.classList.remove('shake');void phone.offsetWidth;phone.classList.add('shake')}
 scr.classList.remove('rev');revealed=false;
 scr.classList.toggle('still',!changed&&(f.b.k==='act'||f.b.k==='inner'));
 shownAt=performance.now();
 window.__LOG.push({pos,k:f.b.k,key:f.wait||null,left:f.left,clock:f.clock,t:Math.round(shownAt)});
 wire(f,anim);
 startTick(f);armHint(f);
 store.set(sk('pos'),pos);
 $('#prog').style.width=Math.min(100,pos/Math.max(F.length-1,62)*100)+'%';
 schedule();
}
function wire(f,anim){
 const b=f.b;const v=f.v;
 if(v.k==='list'){const box=$('#lrows');
  if(v.at==='rumah'){const r=box.querySelector('[data-row=rumah]');const target=Math.max(0,r.offsetTop-box.clientHeight*0.42);
   if(anim&&!v.hold&&!v.title)box.scrollTop=target;else if(anim&&v.hold){smoothScroll(box,target,1400)}else box.scrollTop=target;
   r.classList.add('hl')}
  if(b.k==='act'&&b.mode==='target'&&!f.done){const r=box.querySelector(`[data-row=${b.tgt}]`);if(r){r.classList.add('tgt');r.onclick=r.oncontextmenu=e=>{e.preventDefault();e.stopPropagation();resolve(b.key,true)}}}}
 if(v.k==='thread'){const m=scr.querySelector('.msgs');m.scrollTop=m.scrollHeight}
 if(v.k==='scene'){const sc=scr.querySelector('.scaps'),ap=scr.querySelector('.app');if(sc&&ap){if(sc.scrollHeight>sc.clientHeight+2)ap.classList.add('many');if(sc.scrollHeight>sc.clientHeight+2)ap.classList.add('many2')}}
 if(b.k==='act'&&b.mode==='tap'&&!f.done){const btn=$('#actbtn');btn.onclick=e=>{e.stopPropagation();resolve(b.key,true)}}
 if(b.k==='choice'&&!f.done)scr.querySelectorAll('[data-opt]').forEach(el=>el.onclick=e=>{e.stopPropagation();resolve(b.key,+el.dataset.opt)});
 if(b.k==='hub'&&f.wait&&!f.done)scr.querySelectorAll('.hubic.can').forEach(el=>el.onclick=e=>{e.stopPropagation();resolve(b.key,el.dataset.app)});
 if(b.k==='act'&&b.mode==='pin'&&!f.done)armPin(b);
 if(f.drainFrom!=null&&anim)drain(f);
 if(v.k==='epend'){$('#again').onclick=e=>{e.stopPropagation();resetAll()};const nx=$('#nextep');if(nx)nx.onclick=e=>{e.stopPropagation();location.href=epUrl(P.NEXT)}}
 if(v.k==='gal2'){const gs=$('#gscroll');if(gs){let to=0;if(v.at){const d=gs.querySelector(`[data-day=${v.at}]`);to=d.offsetTop-gs.offsetTop-8}
   if(anim&&f.b.k==='gal2'&&to)smoothScroll(gs,Math.min(to,gs.scrollHeight-gs.clientHeight),1100);else gs.scrollTop=to}}
 if(b.k==='act'&&b.mode==='target'&&!f.done){const el=scr.querySelector(`[data-tgt="${b.tgt}"]`);if(el){el.classList.add('tgt');const go=e=>{e.stopPropagation();resolve(b.key,true)};el.onclick=go;
   if(b.tgt==='scroll'){el.addEventListener('wheel',go,{once:true,passive:true});el.addEventListener('touchmove',go,{once:true,passive:true})}}}
}
let tick=null,hintT=null;
function startTick(f){clearInterval(tick);const stop=f.shower===2||(f.v.k==='dark'&&f.v.stop);if(f.drainFrom==null||stop)phone.classList.remove('edge');if(f.s0==null)return;
 let cur=f.s0;const span=f.s0-f.s1,waitF=f.wait&&!f.done;const d=dwell(f)/speed/1000;
 const rate=waitF?3*speed:(span>0?span/Math.max(.6,d*0.9):0);let last=performance.now();
 const paint=()=>{const s=Math.max(f.s1,Math.ceil(cur));const el=$('#cdt');if(el)el.textContent=fmtLeft(s);const sb=scr.querySelector('.sbt');if(sb&&!f.v.src)sb.textContent=secClock(s).replace('.',':');const cd=$('#cd');if(cd)cd.classList.toggle('low',s<=180);phone.classList.toggle('edge',s<=60)};
 paint();tick=setInterval(()=>{if(F[pos]!==f){clearInterval(tick);return}const now=performance.now();if(!paused)cur=Math.max(f.s1,cur-rate*(now-last)/1000);last=now;paint()},200)}
function armHint(f){clearTimeout(hintT);scr.querySelectorAll('.ihint').forEach(x=>x.remove());
 if(f.drainFrom!=null){hintT=setTimeout(()=>{if(F[pos]!==f)return;const h=document.createElement('div');h.className='ihint hold';h.style.left=scr.offsetWidth/2+'px';h.style.top=scr.offsetHeight*.8+'px';h.innerHTML='<i></i><b>👆</b>';scr.appendChild(h)},3000/speed);return}
if(!(f.wait&&!f.done)||f.wait==='end')return;
 const go=()=>{if(F[pos]!==f||f.done)return;const b=f.b;let el=null,hold=b.k==='act'&&b.mode==='hold';
  if(b.k==='act'&&b.mode==='tap')el=$('#actbtn');else if(b.k==='act'&&b.mode==='target')el=scr.querySelector('.tgt');
  else if(b.k==='act'&&b.mode==='pin')el=scr.querySelector('#tkmini.tgt')||(b.fill?scr.querySelector('.key[data-k="1"]'):null);
  else if(b.k==='hub'){const sr0=scr.getBoundingClientRect(),k0=sr0.width/scr.offsetWidth||1;scr.querySelectorAll('.hubic.can .ai').forEach(e=>{const r=e.getBoundingClientRect();const h=document.createElement('div');h.className='ihint multi';h.style.left=(r.left-sr0.left+r.width/2)/k0+'px';h.style.top=(r.top-sr0.top+r.height/2)/k0+'px';h.innerHTML='<i></i>';scr.appendChild(h)});return}
  if(!el&&!hold){if(b.k==='act')hintT=setTimeout(go,2000);return}
  const k=scr.getBoundingClientRect().width/scr.offsetWidth||1,sr=scr.getBoundingClientRect();let x=scr.offsetWidth/2,y=scr.offsetHeight*0.8;
  if(el){const r=el.getBoundingClientRect();x=(r.left-sr.left+r.width/2)/k;y=(r.top-sr.top+r.height/2)/k}
  const h=document.createElement('div');h.className='ihint'+(hold?' hold':'');h.style.left=x+'px';h.style.top=y+'px';h.innerHTML='<i></i><b>👆</b>';scr.appendChild(h)};
 hintT=setTimeout(go,5000)}
function smoothScroll(el,to,ms){const from=el.scrollTop,t0=performance.now();(function st(){const k=Math.min(1,(performance.now()-t0)/ms);el.scrollTop=from+(to-from)*(1-Math.pow(1-k,3));if(k<1)requestAnimationFrame(st)})()}
const DR1=1400,DR2=11000;
function drain(f){const el=$('#cdt'),sb=scr.querySelector('.sbt');const s0=f.drainFrom*60,a=Math.max(0,s0-60),m1=(a>0?DR1:0)/speed,m2=DR2*Math.min(60,s0)/60/speed,t0=performance.now();
 (function st(){if(F[pos]!==f)return;const e=performance.now()-t0;const s=e<m1?Math.round(s0-a*e/m1):Math.max(0,Math.round(Math.min(60,s0)*(1-(e-m1)/m2)));const k=e>=m1+m2?1:0;if(el)el.textContent=fmtLeft(s);if(sb)sb.textContent=secClock(s).replace('.',':');const cd=$('#cd');if(cd)cd.classList.toggle('low',s<=180);phone.classList.toggle('edge',s<=60&&s>0);if(k<1&&F[pos]===f)requestAnimationFrame(st)})()}
// ---------------- pin pad ----------------
function armPin(b){
 let code='';const dots=$('#dots'),msg=$('#pinmsg'),help=$('#pinhelp');let wrong=0;
 const paint=()=>dots.querySelectorAll('i').forEach((d,i)=>d.classList.toggle('on',i<code.length));
 const showTicket=()=>{const tk=$('#tkmini');if(!b.ticketTop||!tk||tk.classList.contains('tgt'))return;$('#tkhint').textContent=L(UI.ticketTap);tk.classList.add('tgt');tk.onclick=e=>{e.stopPropagation();if(!busy&&!code)autofill(ANSWER)}};
 const autofill=c=>{if(busy)return;busy=true;let i=0;code='';paint();const iv=setInterval(()=>{code+=c[i++];paint();if(i>=c.length){clearInterval(iv);setTimeout(check,250)}},170)};
 let busy=false;
 function check(){busy=true;
  const ok=b.final?code===ANSWER:false;
  if(ok){dots.classList.add('ok');setTimeout(()=>{busy=false;resolve(b.key,true)},420);return}
  wrong++;phone.classList.remove('shake');void phone.offsetWidth;phone.classList.add('shake');dots.classList.remove('bad');void dots.offsetWidth;dots.classList.add('bad');msg.textContent=L(UI.pinWrong);
  setTimeout(()=>{code='';paint();busy=false;dots.classList.remove('bad');if(!b.final)resolve(b.key,true);else if(wrong>=1)showTicket()},b.final?700:1100)}
 $('#pad').onclick=e=>{const k=e.target.closest('.key');if(!k||busy)return;e.stopPropagation();const d=k.dataset.k;
  if(b.fill){if(!code)autofill(b.fill);return}if(d==='⌫'){code=code.slice(0,-1);paint();return}if(code.length<6){code+=d;paint();msg.textContent='';if(code.length===6)setTimeout(check,200)}};
 const tid=F[pos];
 if(b.ticketAfter)setTimeout(()=>{if(F[pos]===tid)showTicket()},b.ticketAfter/speed);
}
// ---------------- flow ----------------
function dwell(f){
 const b=f.b,v=f.v;
 if(v.k==='list'&&v.hold)return 3400;
 if(v.k==='list'&&v.title)return 2800;
 if(v.k==='list'&&v.back)return 1800;
 if(v.k==='list')return 2200;
 if(f.drainFrom!=null)return DR1+DR2+900;
 if(v.k==='dark'&&v.cut)return 1100;
 if(v.k==='dark'&&v.title)return 5200;
 if(b.k==='fb')return 2800;
 if(v.k==='contact'&&v.res)return 3200;
 if(v.k==='contact')return 2000;
 const t=L(f.txt||'');const n=lang==='zh'?t.length/8:t.length/17;
 let ms=1100+n*1000;if(b.k==='scene')ms+=1400;if(b.k==='lock')ms+=600;if(b.k==='thread'||b.k==='ride'||b.k==='bank')ms+=1500;if(b.k==='gallery')ms+=1600;
 return ms}
function schedule(){clearTimeout(timer);const f=F[pos];if(f.wait&&!f.done)return;if(paused)return;if(pos>=F.length-1&&!f.wait)return;
 timer=setTimeout(()=>advance(),dwell(f)/speed)}
function advance(){if(pos<F.length-1){pos++;render(true)}}
function resolve(key,val){const f=F[pos];if(!f||f.wait!==key||f.done)return;
 if(performance.now()-shownAt<MINVIS)return;
 decide(key,val);F=build();pos=Math.min(pos+1,F.length-1);render(true)}
// how long the entrance animations of a frame run: a tap before that only reveals, never advances
function animEnd(f){const k=f.b.k;if(k==='scene')return 700*(f.b.lines.length-1)+700;if(k==='ride')return 1250;if(k==='bank')return 1400;if(f.v.k==='dark'&&f.v.title)return 2100;if(k==='dark')return 1400;if(k==='list'&&f.v.hold)return 1500;if(k==='list'&&f.v.title)return 1000;if(k==='gallery'&&f.v.zoomed)return 950;if(k==='snap')return 900;if(k==='gal2'&&f.v.at)return 1200;if(k==='gal2'&&f.v.m==='albums')return 1200;return 450}
let revealAt=0;
scr.addEventListener('click',()=>{
 const f=F[pos];if(f.wait&&!f.done){if(f.b.k==='act'&&f.b.mode==='hold'&&performance.now()-shownAt>1000)resolve(f.wait,true);return}
 const now=performance.now(),age=now-shownAt;
 if(f.drainFrom!=null&&age<700)return; // the last minute: one tap skips it, but taps carried over from the previous screen don't
 if(!revealed&&age<animEnd(f)){revealed=true;revealAt=now;scr.classList.add('rev');return}
 if(now-Math.max(shownAt,revealAt)<MINVIS)return;
 advance()});
// ---------------- controls ----------------
const bp=$('#btnPause'),bs=$('#btnSpeed'),bl=$('#btnLang');
function paintCtl(){bp.textContent=paused?'▶':'❚❚';bs.textContent=speed+'×';bl.textContent=lang==='zh'?'ID':'中';document.documentElement.lang=lang==='zh'?'zh':'id';$('#rb-hint').textContent=paused?L(UI.paused):''}
bp.onclick=()=>{paused=!paused;paintCtl();schedule()};
bs.onclick=()=>{speed=SPEEDS[(SPEEDS.indexOf(speed)+1)%SPEEDS.length];store.set('speed',speed);paintCtl();schedule()};
bl.onclick=()=>{lang=lang==='zh'?'id':'zh';store.set('lang',lang);paintCtl();render(false)};
$('#btnBack').onclick=()=>{if(pos<=0)return;let p=pos-1;
 // step back over a resolved interaction: undo it
 const f=F[p];if(f.wait&&f.done&&f.wait!=='end'){undoFrom(f.wait);F=build()}
 pos=Math.min(p,F.length-1);render(true)};
const EPN=['Episode 1|第1集','Episode 2|第2集'];
function epUrl(n){const q=new URLSearchParams(location.search);q.set('ep',n);q.set('lang',lang);return location.pathname+'?'+q.toString()}
$('#btnMenu').onclick=()=>{const sh=$('#sheet');sh.innerHTML=`<div class="shc"><div class="eps">${EPN.map((e,i)=>`<button data-ep="${i+1}" class="${EP===i+1?'on':''}">${T(e)}</button>`).join('')}</div><b>${T(UI.menu)}</b><p>${T(UI.resetQ)}</p><button id="rsY" class="danger">${T(UI.yes)}</button><button id="rsN">${T(UI.no)}</button></div>`;sh.hidden=false;
 $('#rsY').onclick=()=>resetAll();sh.querySelectorAll('[data-ep]').forEach(b=>b.onclick=()=>{if(+b.dataset.ep===EP){sh.hidden=true;return}location.href=epUrl(b.dataset.ep)});$('#rsN').onclick=()=>{sh.hidden=true}};
function resetAll(){dec={};order=[];store.set(sk('dec'),dec);store.set(sk('order'),order);store.set(sk('pos'),0);F=build();pos=0;$('#sheet').hidden=true;lastViewKey='';render(true)}
// preload
P.IMAGES.forEach(s=>{const i=new Image();i.src='assets/'+s});
window.__ST=()=>({pos,n:F.length,k:F[pos].b.k,wait:F[pos].wait&&!F[pos].done?F[pos].wait:null,left:F[pos].left,clock:F[pos].clock,view:F[pos].v.k,dec:{...dec}});
window.__build=()=>build().map(f=>({k:f.b.k,v:f.v.k,left:f.left,clock:f.clock,wait:f.wait||null}));
paintCtl();render(true);
// watchdog: if a non-waiting frame somehow has no timer, restart it
setInterval(()=>{const f=F[pos];if(!paused&&!(f.wait&&!f.done)&&pos<F.length-1&&performance.now()-shownAt>dwell(f)/speed+4000)advance()},1500);
})();
