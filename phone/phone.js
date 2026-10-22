(function(){
'use strict';
const {TH,SAY,BEATS,UI,BILL}=window.PHONE;
const store=PhoneStore.create(window.localStorage,location.search,{onWiped:()=>location.reload()});
const $=id=>document.getElementById(id);const qs=new URLSearchParams(location.search);
const fresh=lang=>({v:1,n:1,speed:1,paused:false,ch:{},how:{},done:{},inner:{},opened:{},lang:lang||'id',t0:Date.now()});
let st=store.get('state',null);
if(!st||st.v!==1){const dl=(qs.get('lang')||store.deviceGet('hcp:last-lang')||'').replace(/"/g,'');st=fresh(dl==='zh'?'zh':'id');}
['ch','how','done','inner','opened'].forEach(k=>{if(!st[k])st[k]={};});
if(qs.get('lang')==='zh'||qs.get('lang')==='id')st.lang=qs.get('lang');
(function(){try{const k='phone:'+store.id+':lang-seed';const v=localStorage.getItem(k);if(v){localStorage.removeItem(k);if(!store.get('state',null))st.lang=v==='zh'?'zh':'id';}}catch{}})();
const L=s=>{if(s==null)return '';s=String(s);if(!s.includes('|'))return s;const p=s.split('|');return st.lang==='zh'?p[1]:p[0];};
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const T=k=>esc(L(UI[k]));
const clk=c=>st.lang==='zh'?String(c||'').replace('.',':'):String(c||'');
const APPN={Pesan:0,Lensa:1,LiveKu:2,Email:3,DompetKu:4};const appName=a=>L(UI.apps[APPN[a]]||a);
let wiping=false;const save=()=>{if(!wiping)store.set('state',st);};

// ---------- timeline ----------
function timeline(){const out=[];for(const b of BEATS){out.push(b);
 if(b.k==='choice'||b.k==='quick'){const c=st.ch[b.key];if(c==null)break;const o=b.opts[c];
  if(o.send)out.push({k:'msg',th:o.th||b.th,mine:true,time:null,t:o.send,_sent:true});
  out.push(...o.re);if(b.k==='choice')out.push(...((st.how[b.key]==='pilot'?b.ifPilot:b.ifMe)||[]));}
 if(b.k==='act'&&!st.done[b.key])break;}return out;}
const isBlocked=b=>!!b&&(((b.k==='choice'||b.k==='quick')&&st.ch[b.key]==null)||(b.k==='act'&&!st.done[b.key]));
const toMin=c=>{const [h,m]=String(c).split('.').map(Number);let v=h*60+m;if(h<5)v+=1440;return v;};

// ---------- derive phone state by replaying the visible beats ----------
function derive(tl,n){const S={clock:'06.40',view:'lock',lockN:[],threads:{},scene:null,live:{cmts:[],viewers:0,img:'p-live.webp',pin:null,gift:null},call:null,mail:null,wallet:null,notes:null,lensa:null,last:tl[n-1],lastI:n-1,inner:null,typing:null,dark:null,thread:null};
 for(let i=0;i<n&&i<tl.length;i++){const b=tl[i];if(b.clock)S.clock=b.clock;
  switch(b.k){
   case 'lock':S.view='lock';S.lockN=b.notifs||[];break;
   case 'msg':case 'sys':{if(b.k==='msg'&&b.clock&&i===n-1&&!st.opened[i]&&!(S.view==='chat'&&S.thread===b.th)){S.banner={...b,_i:i};const t=S.threads[b.th]||(S.threads[b.th]=[]);t.push({...b,_i:i});break;}const t=S.threads[b.th]||(S.threads[b.th]=[]);t.push({...b,_i:i});if(!b.time&&b._sent)b.time=S.clock;S.view='chat';S.thread=b.th;break;}
   case 'typing':S.view='chat';S.thread=b.th;S.threads[b.th]=S.threads[b.th]||[];break;
   case 'mail':S.view='mail';S.mail=b;break;
   case 'wallet':S.view='wallet';S.wallet=b;break;
   case 'scene':S.view='scene';S.scene={...b,items:[],img:b.img||null,_i:i};break;
   case 'say':case 'scap':if(S.scene){S.scene.items.push({...b,_i:i});if(b.img)S.scene.img=b.img;}break;
   case 'live':S.view='live';if(b.img)S.live.img=b.img;if(b.viewers)S.live.viewers=b.viewers;if(b.cmt)S.live.cmts.push({t:b.cmt,_i:i});if(b.pin)S.live.pin=b.pin;if(b.gift)S.live.gift={g:b.gift,_i:i};break;
   case 'call':S.view='call';S.call={...b,lines:[]};break;
   case 'line':if(S.call){S.call.lines.push({...b,_i:i});S.call.on=true;S.view='call';}break;
   case 'notes':S.view='notes';S.notes=b;break;
   case 'lensa':S.view='lensa';S.lensa={...(S.lensa||{}),...b};break;
   case 'dark':S.view='dark';S.dark=b;break;
   case 'end':S.view='end';break;
   case 'home':S.view='home';break;
   case 'quick':if(b.in==='lensa'){S.view='lensa';S.lensa={draft:b.draft};}if(b.in==='scene'&&S.scene)S.scene.items.push({...b,_i:i});if(b.in==='chat'){S.view='chat';S.thread=b.th;}break;
   case 'act':if(b.in==='lock'){S.view='lock';if(b.notifs)S.lockN=b.notifs;}if(b.in==='scene'&&S.scene)S.scene.items.push({...b,_i:i});if(b.in==='home')S.view='home';if(b.in==='chat'){S.view='chat';S.thread=b.th;}
     if(b.key==='facedown'&&st.done.facedown)S.view='dark';break;
   case 'choice':if(b.in==='live')S.view='live';if(b.in==='call')S.view='call';if(b.th){S.view='chat';S.thread=b.th;}break;
  }
  if(b.k==='inner')S.inner=(i===n-1)?b:null;
  if(b.k==='typing'&&i===n-1)S.typing=b;
 }
 // after the call is answered we stay on the call screen; after declining we go back to chat/live
 const lb=tl[n-1];if(lb&&lb.k==='inner'&&S.view==='call'&&!S.call.on&&st.ch.call!=null&&st.ch.call!==0)S.view=st.ch.call===1?'chat':'live';
 return S;}

// ---------- pieces ----------
function av(key,cls=''){const t=TH[key];if(['ratna','raka','arya'].includes(key)){const m={ratna:'R',raka:'K',arya:'A'}[key];return `<span class="pav ${cls}"><img src="assets/av-${m}-neutral.webp" alt=""></span>`;}return `<span class="pav ini ${cls} c-${key}">${esc(t?t.av:key)}</span>`;}
function faceAv(who,ex,cls=''){const ok={N:['neutral','hurt','angry','determined'],H:['neutral','hurt','angry','determined'],R:['neutral','hurt','angry','determined'],M:['neutral','hurt'],A:['neutral','soft'],K:['neutral','angry']};const e=(ok[who]||[]).includes(ex)?ex:'neutral';return `<span class="fav ${cls}"><img src="assets/av-${who}-${e}.webp" alt=""></span>`;}
function statusBar(S){const m=toMin(S.clock),bat=Math.max(6,Math.round(82-(m-400)*0.06));return `<div class="sb${S.view==='live'||S.view==='lock'||S.view==='call'||S.view==='dark'||S.view==='scene'?' light':''}"><b>${esc(clk(S.clock))}</b><span class="isl"></span><span class="sig">▂▄▆ 4G</span><span class="bat${bat<20?' low':''}"><i style="width:${bat}%"></i></span><small>${bat}%</small></div>`;}
const isNew=i=>i===st.n-1;
function msgHTML(m,th){if(m.k==='sys')return `<div data-k="m${m._i}" class="sysm${isNew(m._i)?' new':''}">${esc(L(m.t))}</div>`;
 const mine=!!m.mine;const from=th==='group'&&!mine?`<small class="fr">${esc(L(m.from))}</small>`:'';
 const nw=isNew(m._i);const body=m.photo?`<div class="photo" data-zoom="1"><img src="assets/p-fakephoto.webp" alt=""><span>${T('photo')}</span></div>${esc(L(m.t))}`:m.vn?`<div class="vnm${nw?' playing':''}"><i>${nw?'❚❚':'▶'}</i>${'<s></s>'.repeat(20)}<small>${esc(m.vn)}</small></div><em class="vt${nw?' late':''}"><b>${T('tr')}</b> ${esc(L(m.tr))}</em>`:(m.att?attHTML():'')+esc(L(m.t));
 return `<div data-k="m${m._i}" class="m ${mine?'me':'them'}${isNew(m._i)?' new':''}${m.fx==='shake'&&isNew(m._i)?' jolt':''}">${from}<div class="mb">${body}<span class="mt">${esc(clk(m.time||''))}${mine?` <i class="rr${m._read?' blue':''}">✓✓</i>`:''}</span></div></div>`;}
function chatHTML(S){const k=S.thread,t=TH[k],list=S.threads[k]||[];
 // read receipts: my message turns blue once anyone answers after it
 let html=list.map((m,j)=>msgHTML({...m,_read:list.slice(j+1).some(x=>!x.mine&&x.k==='msg')},k)).join('');
 const typing=(S.typing&&S.typing.th===k)||typingTh===k;
 return `<div class="app chat"><div class="ch"><span class="bk">‹</span>${av(k)}<div><b>${esc(L(t.name))}</b><small>${typing?T('typing'):esc(L(t.sub))}</small></div><span class="ci">${t.app==='lensa'?'Lensa':'📞'}</span></div>
 <div class="msgs" id="msgs">${html}${typing?'<div data-k="typing" class="m them new"><div class="mb dots"><i></i><i></i><i></i></div></div>':''}</div><div class="kb" id="kb"></div></div>`;}
function attHTML(){return `<div class="atts"><div class="att1"><div class="rcpt"><b>✓</b><span>${T('attAmt')}</span><i></i><i></i><i></i></div><small>🔒 ${T('attT')}</small></div><div class="att1"><img src="assets/p-fakephoto.webp" alt=""><small>🔒 ${T('attC')}</small></div></div>`;}
function billHTML(){const B=BILL;return `<div class="bill"><div class="bh">${esc(L(B.school))}</div>${B.rows.map(r=>`<div class="br"><span>${esc(L(r[0]))}</span><b>${esc(r[1])}</b></div>`).join('')}<div class="br tot"><span>${esc(L(B.total[0]))}</span><b>${esc(B.total[1])}</b></div><div class="bcut">${esc(L(B.cut))}</div><div class="br paid"><span>${esc(L(B.paid[0]))}</span><b>−${esc(B.paid[1])}</b></div><small class="bby">${esc(L(B.by))}</small></div>`;}
function lockHTML(S){return `<div class="app lock"><div class="lk-t">${esc(clk(S.clock))}</div><div class="lk-d">${st.lang==='zh'?'星期四':'Kamis'}</div><div class="lk-n">${S.lockN.map((x,j)=>`<div class="ln${isNew(S.lastI)?' new':''}" style="animation-delay:${j*0.12}s"><span class="la">${x.app==='Lensa'?'◎':'💬'} ${esc(appName(x.app))}</span><b>${esc(L(x.title))}</b><span class="lt">${esc(clk(x.time||''))}</span><p>${esc(L(x.t))}</p>${x.thumb?`<img class="lthumb" src="assets/${x.thumb}" alt="">`:''}</div>`).join('')}</div><div class="lk-h" id="lkh"></div></div>`;}
function homeHTML(S){const badges=[7,1,0,1,1,0,0,0];return `<div class="app home"><div class="grid">${UI.apps.map((a,j)=>`<div class="ic${j===2?' target':''}" ${j===2?'data-app="live"':''}><i class="ai a${j}">${['💬','◎','●','✉','💳','🖼','📝','📷'][j]}</i>${badges[j]?`<em>${badges[j]}</em>`:''}<small>${esc(L(a))}</small></div>`).join('')}</div><div class="dock-hint">${esc(L(S.last&&S.last.t||''))}</div><i class="fingertap"></i></div>`;}
function mailHTML(S){const m=S.mail;return `<div class="app mail"><div class="ah">‹ ${T('inbox')}</div><div class="mm new"><small>${esc(L(m.from))}</small><h3>${esc(L(m.subject))}</h3><p>${esc(L(m.t))}</p><div class="att">📎 Surat_Pemutusan.pdf</div></div></div>`;}
function walletHTML(S){const w=S.wallet;return `<div class="app wallet"><div class="ah">${T('wallet')}</div><div class="wcard new jolt"><div class="wx">✕</div><b>${esc(w.amt)}</b><small>${esc(L(w.merchant))}</small><p>${esc(L(w.t))}</p></div></div>`;}
function lensaHTML(S){const s=S.lensa||{};const b=BEATS.find(x=>x.key==='post');const posted=st.ch.post===1,del=st.ch.post===0;
 return `<div class="app lensa"><div class="ah">◎ Lensa · ${T('lensaDraft')}</div><div class="ld"><div class="ldt${del?' gone':''}">${esc(L(b.draft))}${!posted&&!del?'<i class="caret"></i>':''}</div>${posted?`<div class="lc">${(s.cmts||[]).map(c=>`<p>${esc(L(c))}</p>`).join('')}</div>`:''}</div><div class="kb" id="kb"></div></div>`;}
function liveHTML(S){const lv=S.live;const g=lv.gift&&isNew(lv.gift._i)?`<div class="gift">${lv.gift.g}</div>`:'';
 return `<div class="app live"><div class="lvtop"><span class="lp">${T('live')}</span><span class="lvv">👁 ${lv.viewers.toLocaleString(st.lang==='zh'?'zh-CN':'id-ID')}</span><span class="lvm">LiveKu</span></div>${lv.pin?`<div class="pin">📌 <b>@akungosip</b> ${esc(L(lv.pin))}${billHTML()}</div>`:''}<div class="cmts">${lv.cmts.slice(-4).map(c=>`<p data-k="c${c._i}" class="${isNew(c._i)?'new':''}">${esc(L(c.t))}</p>`).join('')}</div>${g}<div class="kb" id="kb"></div></div>`;}
function callHTML(S){const c=S.call;return `<div class="app call${c.on?' on':''}">${faceAv(c.who,c.on?'angry':'neutral','big')}<b class="cn">${esc(L(c.name))}</b><small>${c.on?T('oncall'):T('incoming')}</small><p class="cs">${esc(L(c.sub))}</p><div class="caps">${c.lines.map(l=>`<p data-k="l${l._i}" class="${isNew(l._i)?'new':''}"><b>${l.who==='N'?'Aku':'Raka'}:</b> ${esc(L(l.t))}</p>`).join('')}</div><div class="kb" id="kb"></div></div>`;}
function notesHTML(S){const n=S.notes;const del=st.done.erase;return `<div class="app notes"><div class="ah">📝 ${T('notes')}</div><h3>${T('notesT')}</h3>${n.old.map(o=>`<p class="no">${esc(L(o))}</p>`).join('')}<p class="nd${del?' gone':''}">${esc(L(n.draft))}${del?'':'<i class="caret"></i>'}</p><div class="kb" id="kb"></div></div>`;}
function darkHTML(S){const d=S.dark;return `<div class="app dark">${d?`<div class="bz${isNew(st.n-1)?' new':''}"><b>${esc(L(d.t))}</b><small>${esc(L(d.sub))}</small></div>`:'<div class="bz"><small>📱 ⬇</small></div>'}</div>`;}
function sceneHTML(S){const sc=S.scene;const open=st.inner[sc._i];
 const card=`<div class="scard" data-k="s${sc._i}"><span class="stag" data-tw="${esc(L(sc.tag))}">${isNew(sc._i)?'&nbsp;':esc(L(sc.tag))}</span><p class="s1">${esc(L(sc.lines[0]))}</p><p class="s2">${esc(L(sc.lines[1]))}</p>${sc.inner?`<button class="s3${open?' open':''}" data-inner="${sc._i}">${open?esc(L(sc.inner)):'✦ '+T('inner')}</button>`:''}</div>`;
 const all=[card,...sc.items.map((it,j)=>sceneItem(it,sc.items[j-1]))];
 // keep the newest 3 fully visible, the 4th fading, the 5th leaving
 const keep=all.slice(-5).map((h,j,a)=>{const age=a.length-1-j;return age>=4?h.replace(/class="/,'class="age4 '):age===3?h.replace(/class="/,'class="age3 '):h;});
 return `<div class="app scene${sc.img?' has-img':''}"><div class="sbody"><div class="sitems" id="sitems">${keep.join('')}</div></div></div>`;}
function sceneItem(it,prev){const nw=isNew(it._i)?' new':'';const K=`data-k="s${it._i}"`;
 if(it.k==='say'){const c=SAY[it.who];const anc=(!prev||prev.img)?' anchor':'';return `<div ${K} class="fr2 ${c.me?'right':'left'}${anc}${nw}">${c.me?'':faceAv(it.who,it.ex)}<div><small>${esc(L(c.name))}${c.tag&&!c.me?' · '+esc(L(c.tag)):''}</small><p class="fb${c.me?' me':''}">${esc(L(it.t))}</p></div>${c.me?faceAv('N',it.ex):''}</div>`;}
 if(it.k==='scap')return `<div ${K} class="scap${nw}">${esc(L(it.t))}</div>`;
 if(it.k==='act'){const d=st.done[it.key];return `<div ${K} class="act${d?' done':''}${nw}">${d?`<p class="adone">✓ ${esc(L(it.done))}</p>`:widget(it)}</div>`;}
 if(it.k==='quick'){const c=st.ch[it.key],d=c!=null;if(d&&it.style==='say')return '';return `<div ${K} class="quick ${it.style}${d?' done':''}${nw}"><p class="aq">${esc(L(it.q))}</p><div class="qopts">${it.opts.map((o,j)=>`<button class="qo${d&&c===j?' sel':''}${d&&c!==j?' dim':''}" data-quick="${j}" aria-disabled="${d}">${it.style==='say'?`<span class="qb">${esc(L(o.t))}</span>`:esc(L(o.t))}</button>`).join('')}</div></div>`;}
 return '';}
function widget(b){const k=b.key,bt=esc(L(b.btn));
 switch(b.mode){
  case 'tap':case 'play':return `<button class="aw tap" data-actgo="${k}">${bt}</button>`;
  case 'hold':return `<button class="aw hold" data-hold="${k}"><i class="ring"><i></i></i><span>${bt}</span></button>`;
  case 'swipe':return `<div class="aw swipe" data-swipe="${k}"><div class="trk"><span>${bt}</span><b class="knob">➜</b></div></div>`;
  case 'drag':return `<div class="aw drag" data-drag="${k}"><div class="pad"><b class="knob">📱</b><i class="slot">▁▁▁</i></div><span>${bt}</span></div>`;
  case 'unlock':return `<div class="aw unlock" data-up="${k}"><b class="knob">⌃</b><span>${bt}</span></div>`;}return '';}
function endHTML(){const m=Object.values(st.how).filter(h=>h==='me').length;return `<div class="app endv"><div class="endc"><h2>${T('end1')}</h2><p class="eq">${T('end2')}</p><p class="es">${esc(L(UI.endStat).replace('{m}',m))}</p><a class="enext" href="../">${T('novel')}</a><button class="eagain" data-again="1">${T('again')}</button></div></div>`;}

// keyboard / overlay for the pending interaction in phone apps
function kbHTML(S){const b=S.last;if(!b)return '';
 if(b.k==='choice'){const d=st.ch[b.key]!=null;if(d)return '';const o=b.opts[b.pilot];
  return `<div class="pilotkb"><div class="oldbar"><span class="autopill">${T('auto')}</span><span class="ot">${T('old')}</span><b id="cd">${Math.ceil(b.ms/1000)}</b></div>${b.help&&!st.seenHelp?`<p class="help">${esc(L(b.help))}</p>`:''}${b.old?`<p class="oldq">“${esc(L(b.old))}”</p>`:''}
   <div class="typing-in"><span id="autotype"></span><i class="caret"></i></div><div class="bar"><i id="cdbar"></i></div>
   <div class="ropts">${b.opts.map((x,j)=>`<button class="ro${j===b.pilot?' autot':''}" data-opt="${j}">${esc(L(x.t))}${j===b.pilot?` <em>← ${T('auto')}</em>`:''}</button>`).join('')}</div>
   ${pilot.taken?`<div class="stamp">${T('stamp')}</div>`:`<button class="take" data-take="1">${T('take')} <span>→</span></button>`}</div>`;}
 if(b.k==='quick'&&b.in!=='scene'){if(st.ch[b.key]!=null)return '';return `<div class="quickkb"><p class="ql">${T('quick')}</p>${b.opts.map((o,j)=>`<button class="ro" data-quick="${j}">${esc(L(o.t))}</button>`).join('')}</div>`;}
 if(b.k==='act'&&b.in!=='scene'&&!st.done[b.key]&&b.mode!=='app'){return `<div class="actkb">${b.q?`<p class="aq">${esc(L(b.q))}</p>`:''}${widget(b)}</div>`;}
 return '';}
function innerHTML(S){if(!S.inner)return '';return `<div class="innerv new${S.inner.fx==='shake'?' jolt':''}"><small>${T('innerL')}</small>${esc(L(S.inner.t))}</div>`;}
function bannerHTML(S){const b=S.banner;if(!b)return '';const t=TH[b.th];return `<div class="banner new" data-banner="1">${av(b.th,'sm')}<div><span class="la">💬 ${esc(appName('Pesan'))} · ${esc(clk(b.time))}</span><b>${esc(L(t.name))}</b><p>${esc(L(b.t)||'🎤 '+L(UI.vn))}</p></div></div>`;}

// ---------- render + transitions ----------
const screen=$('screen'),phoneEl=$('phone');
const RM=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
const tx={anims:[],timers:[],active:false,until:0};let prevR=null;
function vkey(S){return S.view==='chat'?'chat:'+S.thread:S.view==='scene'?'scene:'+S.scene._i:S.view;}
function later(fn,ms){if(RM||!ms){fn();return;}const t=setTimeout(()=>{tx.timers=tx.timers.filter(x=>x.t!==t);fn();},ms);tx.timers.push({t,fn});}
function anim(el,kf,o){if(!el)return;const a=el.animate(kf,{duration:RM?140:(o&&o.d)||520,easing:(o&&o.e)||'cubic-bezier(.2,.7,.2,1)',delay:RM?0:(o&&o.delay)||0,fill:'both'});tx.anims.push(a);a.onfinish=()=>{tx.anims=tx.anims.filter(x=>x!==a);try{a.cancel()}catch{}if(o&&o.done)o.done();if(!tx.anims.length)tx.active=false;};tx.active=true;return a;}
function finishTx(){tx.timers.splice(0).forEach(x=>{clearTimeout(x.t);x.fn();});tx.anims.slice().forEach(a=>{try{a.finish()}catch{}});tx.anims=[];tx.active=false;document.querySelectorAll('.ghost').forEach(g=>g.remove());}
function pickTx(a,b,backward){if(!a)return null;if(backward)return 'fade';const ka=vkey(a),kb=vkey(b);if(ka===kb)return null;
 if(b.view==='dark')return 'black';if(a.view==='lock')return 'up';if(b.view==='end')return 'dip';
 if(b.view==='scene'&&a.view==='scene')return 'whip';if(b.view==='scene')return 'pull';if(a.view==='scene')return 'push';
 if(b.view==='lock')return 'dip';if(Math.abs(toMin(b.clock)-toMin(a.clock))>=120)return 'dip';return 'slide';}
// media layer: one persistent pair of images, crossfaded; Ken Burns keeps running across beats
const media=$('media'),mA=$('mA'),mB=$('mB');let mFront=null,mSrc=null;
function setMedia(S,delay){let src=null,mode='off';
 if(S.view==='scene'&&S.scene.img){src=S.scene.img;const lk=S.last&&S.last.k;mode=(lk==='scene'||(lk==='scap'&&S.last.img))?'hero':'dim';}
 else if(S.view==='live'){src=S.live.img;mode='cam';}
 const apply=()=>{media.dataset.mode=mode;if(src&&src!==mSrc){const nb=mFront===mA?mB:mA;nb.src='assets/'+src;nb.classList.remove('kenb');void nb.offsetWidth;nb.classList.add('kenb','on');if(mFront)mFront.classList.remove('on');mFront=nb;mSrc=src;}if(!src){mSrc=null;if(mFront)mFront.classList.remove('on');mFront=null;}};
 if(delay&&src&&src!==mSrc&&mode!=='cam'){media.dataset.mode=mode;later(apply,delay);}else apply();}
function preload(tl){const seen=new Set();for(let i=st.n;i<Math.min(BEATS.length,st.n+14);i++){const b=BEATS[i];[b&&b.img,...((b&&b.opts)||[]).flatMap(o=>o.re.map(r=>r.img))].forEach(x=>{if(x&&!seen.has(x)){seen.add(x);const im=new Image();im.src='assets/'+x;im.decode&&im.decode().catch(()=>{});}});}
 BEATS.slice(st.n,st.n+14).forEach(b=>{if(b.k==='say'||b.k==='call'){const im=new Image();im.src=`assets/av-${b.who}-${b.ex||'neutral'}.webp`;}});}
function typewrite(el,text,ms){if(!el)return;if(RM){el.textContent=text;return;}const chars=[...text];let i=0;el.textContent='';const step=Math.max(18,ms/chars.length);const iv=setInterval(()=>{i++;el.textContent=chars.slice(0,i).join('');if(i>=chars.length)clearInterval(iv);},step);tx.timers.push({t:iv,fn:()=>{clearInterval(iv);el.textContent=text;}});}
function tickClock(from,to){const el=screen.querySelector('.sb b');if(!el||from===to||RM)return;const a=toMin(from),b=toMin(to);const fmt=v=>{v=((v%1440)+1440)%1440;const h=String(Math.floor(v/60)).padStart(2,'0'),m=String(v%60).padStart(2,'0');return clk(h+'.'+m);};const t0=performance.now(),D=600;
 const f=()=>{const p=Math.min(1,(performance.now()-t0)/D);el.textContent=fmt(Math.round(a+(b-a)*(1-Math.pow(1-p,3))));if(p<1)requestAnimationFrame(f);};el.textContent=fmt(a);requestAnimationFrame(f);}
function snapshot(){const m=new Map();if(RM)return m;screen.querySelectorAll('[data-k]').forEach(e=>{const r=e.getBoundingClientRect();m.set(e.dataset.k,{y:r.top,o:getComputedStyle(e).opacity});});return m;}
function flip(old){if(RM||!old.size)return;screen.querySelectorAll('[data-k]').forEach(e=>{const o=old.get(e.dataset.k);if(!o)return;const r=e.getBoundingClientRect(),dy=o.y-r.top,op=getComputedStyle(e).opacity;if(Math.abs(dy)<1&&op===o.o)return;e.classList.remove('new');
  e.animate([{transform:`translateY(${dy}px)`,opacity:o.o},{transform:'none',opacity:op}],{duration:420,easing:'cubic-bezier(.25,.8,.25,1)'});});}
function render(opt){opt=opt||{};finishTx();const tl=timeline();st.n=Math.min(Math.max(1,st.n),tl.length);const S=derive(tl,st.n);
 const type=opt.noTx?null:pickTx(prevR,S,opt.back);let ghost=null;const old=type?null:snapshot();
 if(type){ghost=screen.cloneNode(true);ghost.removeAttribute('id');ghost.querySelectorAll('[id]').forEach(e=>e.removeAttribute('id'));ghost.classList.add('ghost');ghost.setAttribute('aria-hidden','true');phoneEl.insertBefore(ghost,type==='slide'||type==='push'?screen.nextSibling:screen.nextSibling);}
 let body='';switch(S.view){case 'lock':body=lockHTML(S);break;case 'chat':body=chatHTML(S);break;case 'home':body=homeHTML(S);break;case 'mail':body=mailHTML(S);break;case 'wallet':body=walletHTML(S);break;case 'lensa':body=lensaHTML(S);break;case 'live':body=liveHTML(S);break;case 'call':body=callHTML(S);break;case 'notes':body=notesHTML(S);break;case 'dark':body=darkHTML(S);break;case 'scene':body=sceneHTML(S);break;case 'end':body=endHTML();break;}
 screen.className='screen v-'+S.view;phoneEl.dataset.tint=S.view==='scene'?(S.scene.tint||'cold'):'';
 screen.innerHTML=statusBar(S)+body+innerHTML(S)+bannerHTML(S)+(S.banner&&isNew(S.banner._i)?'<span class="ting">ting!</span>':'');
 const kb=document.getElementById('kb'),lkh=document.getElementById('lkh');const k=kbHTML(S);if(kb)kb.innerHTML=k;else if(lkh)lkh.innerHTML=k;else if(k&&S.view!=='scene'){screen.insertAdjacentHTML('beforeend',`<div class="kb float">${k}</div>`);}
 const ms=document.getElementById('msgs');if(ms)ms.scrollTop=ms.scrollHeight;
 if(old)flip(old);
 const newScene=S.view==='scene'&&isNew(S.scene._i);
 if(newScene){const tg=screen.querySelector('.stag');typewrite(tg,tg.dataset.tw,420);screen.querySelectorAll('.scard .s1,.scard .s2,.scard .s3').forEach((e,j)=>anim(e,[{opacity:0,transform:'translateY(8px)'},{opacity:1,transform:'none'}],{d:320,delay:160+j*110}));}
 setMedia(S,newScene?420:0);
 if(type)runTx(type,ghost,prevR,S);
 if(type&&prevR&&prevR.clock!==S.clock)tickClock(prevR.clock,S.clock);
 prevR=S;preload(tl);
 const last=S.last;chromeBar();const mm=document.getElementById('msgs');scrolledUp=false;if(mm)mm.addEventListener('scroll',onMsgScroll,{passive:true});$('btnBack').disabled=st.n<=1;$('btnLang').textContent=st.lang==='zh'?'中':'ID';
 $('prog').style.width=Math.min(100,st.n/BEATS.length*100)+'%';document.documentElement.lang=st.lang;
 armChoice(tl);schedule();return S;}
function carry(text,cls){if(!text)return;const c=document.createElement('div');c.className='carry '+(cls||'');c.textContent=text;phoneEl.appendChild(c);
 anim(c,[{opacity:1,transform:'none'},{opacity:1,transform:'none',offset:.6},{opacity:0,transform:'translateY(-14px)'}],{d:1300,e:'ease-in',done:()=>c.remove()});}
function runTx(type,g,a,b){const rm=()=>g.remove();const sc=screen;
 switch(type){
  case 'slide':g.style.zIndex=1;sc.style.zIndex=2;anim(sc,[{transform:'translateX(100%)'},{transform:'none'}],{d:460});anim(g,[{transform:'none',filter:'brightness(1)'},{transform:'translateX(-28%)',filter:'brightness(.75)'}],{d:460,done:()=>{rm();sc.style.zIndex='';}});break;
  case 'up':g.style.zIndex=3;anim(sc,[{transform:'scale(.94)',opacity:.4},{transform:'none',opacity:1}],{d:520});anim(g,[{transform:'none'},{transform:'translateY(-100%)'}],{d:520,e:'cubic-bezier(.5,0,.2,1)',done:rm});break;
  case 'push':{g.style.zIndex=1;sc.style.zIndex=2;anim(sc,[{transform:'scale(.42) translateY(18%)',borderRadius:'48px',opacity:0},{opacity:1,offset:.35},{transform:'none',borderRadius:'0px',opacity:1}],{d:620,done:()=>sc.style.zIndex=''});
   anim(g,[{transform:'none',opacity:1},{transform:'scale(1.12)',opacity:0}],{d:620,done:rm});carry('ting!','sfxw');break;}
  case 'pull':{g.style.zIndex=3;anim(g,[{transform:'none',borderRadius:'0px',opacity:1},{transform:'scale(.38) translateY(30%)',borderRadius:'48px',opacity:0}],{d:600,e:'cubic-bezier(.5,0,.3,1)',done:rm});anim(sc,[{opacity:0},{opacity:1}],{d:600});
   const last=g.querySelector('.innerv,.m:last-of-type .mb,.caps p:last-child,.cmts p:last-child');carry(last?last.textContent.replace(/\d\d[.:]\d\d\s*✓*$/,'').trim().slice(0,90):'', 'line');break;}
  case 'whip':g.style.zIndex=3;anim(g,[{transform:'none',opacity:1},{transform:'translateX(-70%) skewX(6deg)',opacity:0}],{d:480,e:'cubic-bezier(.6,0,.4,1)',done:rm});anim(sc,[{transform:'translateX(55%) skewX(-6deg)',opacity:0},{transform:'none',opacity:1}],{d:520,delay:60});break;
  case 'dip':g.style.zIndex=3;anim(g,[{opacity:1,filter:'brightness(1)'},{opacity:0,filter:'brightness(.2)'}],{d:340,e:'ease-in',done:rm});anim(sc,[{opacity:0,filter:'brightness(.2)'},{opacity:1,filter:'brightness(1)'}],{d:420,delay:260,e:'ease-out'});break;
  case 'black':g.style.zIndex=3;anim(g,[{opacity:1},{opacity:0}],{d:520,e:'ease-in',done:rm});anim(sc,[{opacity:0},{opacity:1}],{d:300,delay:420});break;
  case 'fade':g.style.zIndex=3;anim(g,[{opacity:1},{opacity:0}],{d:220,done:rm});break;}}
function fx(b){if(!b)return;if(b.fx==='shake'||b.k==='wallet'){const p=$('phone');p.classList.remove('shake');void p.offsetWidth;p.classList.add('shake');try{navigator.vibrate&&navigator.vibrate(40)}catch{}}
 if(b.fx==='flash'){const f=$('flash');f.classList.remove('go');void f.offsetWidth;f.classList.add('go');}}

// ---------- autopilot ----------
const pilot={timer:null,raf:null,key:null,end:0,taken:false};
function stopPilot(){clearTimeout(pilot.timer);cancelAnimationFrame(pilot.raf);pilot.timer=null;}
function armChoice(tl){const b=tl[st.n-1];if(!b||b.k!=='choice'||st.ch[b.key]!=null){stopPilot();pilot.key=null;pilot.taken=false;return;}
 const o=b.opts[b.pilot],full=L(o.send||o.t);
 if(pilot.key!==b.key){stopPilot();pilot.key=b.key;pilot.taken=false;pilot.end=Date.now()+b.ms;pilot.timer=setTimeout(()=>{if(!pilot.taken)choose(b,b.pilot,'pilot');},b.ms);}
 if(pilot.taken)return;
 const tick=()=>{const left=Math.max(0,pilot.end-Date.now()),p=1-left/b.ms;const cd=$('cd'),bar=$('cdbar'),at=$('autotype');if(cd)cd.textContent=Math.ceil(left/1000);if(bar)bar.style.width=(left/b.ms*100)+'%';if(at)at.textContent=full.slice(0,Math.round(full.length*Math.min(1,p*1.15)));if(left>0&&!pilot.taken)pilot.raf=requestAnimationFrame(tick);};cancelAnimationFrame(pilot.raf);tick();}
function takeover(){stopPilot();pilot.taken=true;st.seenHelp=true;save();render();const p=$('phone');p.classList.remove('shake');void p.offsetWidth;p.classList.add('shake');const f=$('flash');f.classList.remove('go');void f.offsetWidth;f.classList.add('go','gold');}
let pendingAdv=null,justActed=0;
function choose(b,i,how){stopPilot();st.ch[b.key]=i;st.how[b.key]=how;st.seenHelp=true;if(!st.tChoice)st.tChoice=Date.now()-st.t0;pilot.key=null;pilot.taken=false;save();justActed=Date.now();advance(true);}
function chooseQuick(i){const tl=timeline();const b=tl[st.n-1];if(!b||b.k!=='quick'||st.ch[b.key]!=null)return;st.ch[b.key]=i;save();justActed=Date.now();
 if(b.in==='scene')render();else advance(true);}
function completeAct(key){const tl=timeline();const b=tl[st.n-1];if(!b||b.k!=='act'||b.key!==key||st.done[key])return;st.done[key]=true;save();justActed=Date.now();try{navigator.vibrate&&navigator.vibrate(25)}catch{}
 if(b.done&&b.in==='scene')render();else advance(true);}

// ---------- auto-flow: the story moves on its own; the reader only acts at decisions ----------
let flowT=null,flowFn=null,typingTh=null,scrolledUp=false;const holds=new Set();
const plain=x=>L(x||'').replace(/[“”"()]/g,'');
function readMs(txt){const t=plain(txt);if(!t)return 0;const ms=st.lang==='zh'?t.replace(/\s/g,'').length/8*1000:t.split(/\s+/).filter(Boolean).length/220*60000;return Math.max(1200,ms);}
function beatText(b){if(!b)return '';switch(b.k){case 'scene':return [b.tag,...b.lines].map(plain).join(' ');case 'mail':return plain(b.subject)+' '+plain(b.t);case 'wallet':return plain(b.merchant)+' '+plain(b.t);case 'live':return plain(b.cmt)+' '+plain(b.pin);
 case 'act':return b.done?plain(b.done):'';case 'quick':return plain(b.q);case 'notes':return b.old.map(plain).join(' ')+' '+plain(b.draft);case 'dark':return plain(b.t)+' '+plain(b.sub);case 'call':return plain(b.sub);case 'msg':return plain(b.t)+' '+plain(b.tr);default:return plain(b.t);}}
function dwell(b,S){if(!b)return 1200;const r=st.lang==='zh'?beatText(b).replace(/\s/g,'').length/8*1000:beatText(b).split(/\s+/).filter(Boolean).length/220*60000;let ms=Math.max(1200,r);
 if(b.k==='scene')ms+=900;if(b.photo)ms+=1800;if(b.vn)ms+=2400;if(b.k==='live'&&b.pin)ms+=2600;if(b.k==='mail'||b.k==='wallet')ms+=700;if(b.k==='call')ms=Math.max(ms,2600);if(b.k==='home')ms=1600;if(b.k==='typing')ms=1400;if(b.k==='dark')ms=1900;if(b.k==='inner')ms+=300;if(b.k==='msg'&&b.mine)ms=Math.max(1200,ms*.6);
 if(b.k==='lock')ms=Math.max(ms,2200);return ms;}
const typingMs=b=>Math.max(800,Math.min(2500,plain(b.t).length*(st.lang==='zh'?90:38)));
function clearFlow(){clearTimeout(flowT);flowT=null;flowFn=null;}
function wait(ms,fn){clearFlow();flowFn=()=>{flowT=null;flowFn=null;fn();};flowT=setTimeout(flowFn,ms/(st.speed||1));}
function flowPause(k){holds.add(k);clearFlow();}function flowResume(k){holds.delete(k);schedule();}
function schedule(){clearFlow();if(st.paused||holds.size||document.hidden||scrolledUp)return;const tl=timeline(),b=tl[st.n-1];if(!b||b.k==='end')return;
 if(screen.querySelector('[data-banner]')){wait(1900,()=>{st.opened[st.n-1]=true;save();render();});return;}
 if(isBlocked(b)){if(b.key==='unlock')wait(3200,()=>completeAct('unlock'));return;}
 if(st.n>=tl.length)return;const nb=tl[st.n],S=prevR;const d=dwell(b,S);
 // an incoming message in the open chat: typing indicator first, length-proportional
 if(nb.k==='msg'&&!nb.mine&&S&&S.view==='chat'&&S.thread===nb.th&&!nb.clock&&typingTh!==nb.th){wait(Math.min(d,b.k==='msg'?d:d),()=>{typingTh=nb.th;render();clearFlow();wait(typingMs(nb),()=>advance());});return;}
 wait(d,()=>advance());}
function skipWait(){if(flowFn){const f=flowFn;clearTimeout(flowT);f();return;}const tl=timeline(),b=tl[st.n-1];if(!isBlocked(b)&&!st.paused)advance();else if(isBlocked(b)){const t=screen.querySelector('.take,.aw,.qopts,.ropts');if(t){t.classList.remove('nudge');void t.offsetWidth;t.classList.add('nudge');}}}
let userScrollAt=0;['wheel','touchmove','keydown','pointerdown'].forEach(ev=>document.addEventListener(ev,e=>{if(e.target.closest&&e.target.closest('#msgs')||ev==='wheel'||ev==='keydown')userScrollAt=Date.now();},{passive:true,capture:true}));
function onMsgScroll(e){const m=e.target;if(!scrolledUp&&Date.now()-userScrollAt>1200)return;const up=m.scrollHeight-m.scrollTop-m.clientHeight>40;if(up===scrolledUp)return;scrolledUp=up;let p=screen.querySelector('.newpill');
 if(up){clearFlow();if(!p){screen.querySelector('.chat').insertAdjacentHTML('beforeend',`<button class="newpill" data-pill="1">${T('newmsg')}</button>`);}}else{if(p)p.remove();schedule();}}
function chromeBar(){$('btnPause').textContent=st.paused?'▶':'❚❚';$('btnPause').classList.toggle('on',!!st.paused);$('btnSpeed').textContent=(st.speed||1)+'×';$('rb-hint').textContent=st.paused?L(UI.paused):(st.n<6?L(UI.tap):'');}
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
function menu(){sheet(`<h3>${T('menu')}</h3><button data-act="lang">ID ⇄ 中文</button><button data-act="reset-ask" class="warn">${T('reset')}</button><button data-act="close" class="ghost">${T('no')}</button>`);}
function resetAsk(){sheet(`<h3>${T('reset')}</h3><p>${T('resetQ')}</p><button data-act="reset" class="warn">${T('yes')}</button><button data-act="close" class="ghost">${T('no')}</button>`);}
function doReset(){wiping=true;stopPilot();const lang=st.lang;store.wipe();try{localStorage.setItem('phone:'+store.id+':lang-seed',lang)}catch{};location.replace(location.pathname+location.search);}
window.addEventListener('storage',e=>{if(e.key===store.markK)location.reload();});

document.addEventListener('click',e=>{
 const sh=$('sheet');if(sh.contains(e.target)){if(e.target===sh){sh.hidden=true;return;}const a=e.target.closest('[data-act]');if(!a)return;const v=a.dataset.act;
  if(v==='close')sh.hidden=true;if(v==='lang'){st.lang=st.lang==='zh'?'id':'zh';save();sh.hidden=true;render();}if(v==='reset-ask')resetAsk();if(v==='reset')doReset();return;}
 if(!e.target.closest('.rbar')&&(tx.active||Date.now()-ffAt<600)){finishTx();return;}
 let t=e.target.closest('button,a,[data-app],[data-zoom],[data-inner]');if(t&&t.getAttribute('aria-disabled')==='true')t=null;
 if(t){if(t.id==='btnLang'){st.lang=st.lang==='zh'?'id':'zh';save();render();return;}if(t.id==='btnMenu')return menu();if(t.id==='btnPause'){st.paused=!st.paused;save();chromeBar();st.paused?clearFlow():schedule();return;}if(t.id==='btnSpeed'){const sp=[1,1.5,2];st.speed=sp[(sp.indexOf(st.speed||1)+1)%3];save();chromeBar();schedule();return;}if(t.id==='btnBack')return back();
  if(t.dataset.take)return takeover();
  if(t.dataset.opt!=null){const tl=timeline(),b=tl[st.n-1];if(b&&b.k==='choice')choose(b,+t.dataset.opt,'me');return;}
  if(t.dataset.quick!=null)return chooseQuick(+t.dataset.quick);
  if(t.dataset.actgo)return completeAct(t.dataset.actgo);if(t.dataset.hold)return;
    if(t.dataset.inner){st.inner[t.dataset.inner]=true;save();render();return;}
  if(t.dataset.zoom){const z=$('zoom');z.innerHTML=`<div class="zp"><div class="photo big"><img src="assets/p-fakephoto.webp" alt=""></div><p>${T('zoomCap')}</p></div>`;z.hidden=false;flowPause('zoom');return;}
  if(t.dataset.again){const lang=st.lang;st=fresh(lang);save();render();return;}
  if(t.tagName==='A')return;}
 if(e.target.closest('#zoom')){$('zoom').hidden=true;flowResume('zoom');return;}
 if(e.target.closest('[data-pill]')){const m=document.getElementById('msgs');if(m)m.scrollTop=m.scrollHeight;scrolledUp=false;flowResume('scroll');return;}
 if(e.target.closest('.rbar'))return;
 if(e.target.closest('.aw,.pilotkb,.quickkb,.quick:not(.done) .qopts'))return;
 if(Date.now()-justActed<450)return;
 skipWait();});
document.addEventListener('keydown',e=>{if(e.key===' '||e.key==='ArrowRight'){e.preventDefault();skipWait();}if(e.key==='ArrowLeft')back();});
window.__phone={get st(){return st},timeline,derive,L,isBlocked,get tx(){return tx.active},get waiting(){return !!flowFn},render,save,schedule};
render();
})();
