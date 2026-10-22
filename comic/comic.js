(function(){
'use strict';
const {CAST,BEATS,UI,BILL}=window.COMIC;
const store=ComicStore.create(window.localStorage,location.search,{onWiped:()=>location.reload()});
const $=id=>document.getElementById(id);
const qs=new URLSearchParams(location.search);
const fresh=lang=>({v:1,n:1,ch:{},how:{},done:{},lang:lang||'id',auto:true,autoV:2,speed:1,t0:Date.now()});
let st=store.get('state',null);
if(!st||st.v!==1){const dl=(qs.get('lang')||store.deviceGet('hcp:last-lang')||'').replace(/"/g,'');st=fresh(dl==='zh'?'zh':'id');}
if(st.autoV!==2){st.auto=true;st.autoV=2;st.speed=st.speed||1;}
if(!st.done)st.done={};
if(qs.get('lang')==='zh'||qs.get('lang')==='id')st.lang=qs.get('lang');
const L=s=>{if(s==null)return '';s=String(s);if(!s.includes('|'))return s;const p=s.split('|');return st.lang==='zh'?p[1]:p[0];};
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const T=k=>esc(L(UI[k]));
let wiping=false;
const save=()=>{if(wiping)return;store.set('state',st);};

function timeline(){const out=[];for(const b of BEATS){out.push(b);
 if(b.k==='choice'||b.k==='quick'){const c=st.ch[b.key];if(c==null)break;const o=b.opts[c];out.push(...o.re.map(r=>({...r,_after:b.key})));if(b.k==='choice')out.push(...((st.how[b.key]==='pilot'?b.ifPilot:b.ifMe)||[]).map(r=>({...r,_after:b.key})));}
 if(b.k==='act'&&!st.done[b.key])break;}return out;}
const isBlocked=b=>!!b&&(((b.k==='choice'||b.k==='quick')&&st.ch[b.key]==null)||(b.k==='act'&&!st.done[b.key]));

// ---------- render ----------
const feed=$('feed');
const EXS={N:['neutral','hurt','angry','determined'],H:['neutral','hurt','angry','determined'],R:['neutral','hurt','angry','determined'],M:['neutral','hurt'],A:['neutral','soft'],K:['neutral','angry']};
function avatar(who,cls='',ex){const c=CAST[who];const base=c.old?'N':who;const e=(EXS[base]||[]).includes(ex)?ex:'neutral';return `<div class="av ${cls}${c.old?' old':''}" data-ex="${base}-${e}"><img src="assets/av-${base}-${e}.webp" alt=""></div>`;}
function phoneHTML(b){
 const time=b.time?`<span class="pt">${esc(L(b.time))}</span>`:'';
 switch(b.app){
  case 'group':return `<div class="ph group"><div class="phh"><span class="ico">👥</span><b>${esc(L(b.title))}</b>${time}</div><div class="gmsg"><small>${esc(L(b.from))}</small>${b.photo?`<div class="cphoto"><img src="assets/p-fakephoto.webp" alt=""><span>${T('photo')}</span></div>`:''}<p>${esc(L(b.t))}</p></div></div>`;
  case 'notif':return `<div class="ph notif"><div class="phh"><span class="ico">✉️</span><b>${esc(L(b.title))}</b>${time}</div><p>${esc(L(b.t))}</p></div>`;
  case 'bank':return `<div class="ph notif bank"><div class="phh"><span class="ico">💳</span><b>${esc(L(b.title))}</b>${time}</div><p>${esc(L(b.t))}</p></div>`;
  case 'wa':return `<div class="ph wa${b.mine?' mine':''}"><div class="phh"><span class="ico">💬</span><b>${esc(L(b.title))}</b>${time}</div><p class="wab">${esc(L(b.t))}</p></div>`;
  case 'live':return `<div class="ph live${b.pin?' pin':''}"><div class="phh"><span class="livepill">LIVE</span><b>${esc(L(b.title))}</b></div>${b.pin?`<small class="pinl">📌 ${T('pinned')}</small>`:''}<p>${b.from?`<b class="u">${esc(b.from)}</b> `:''}${esc(L(b.t))}</p>${b.bill?billHTML():''}</div>`;
  case 'call':return `<div class="ph call">${avatar('K','big','neutral')}<b class="cn">${esc(L(b.title))}</b><small>${T('call')}</small><p>${esc(L(b.t))}</p><div class="cbtn"><i class="no">✕</i><i class="yes">✆</i></div></div>`;
  case 'vn':return `<div class="ph vn"><div class="phh"><span class="ico">🎙️</span><b>${esc(L(b.title))}</b></div><div class="wave"><i>▶</i>${'<s></s>'.repeat(22)}<small>${T('vn')}</small></div><p>${esc(L(b.t))}</p></div>`;
  case 'dm':return `<div class="ph dm"><div class="phh"><span class="ico anon">?</span><b>${esc(L(b.title))}</b>${time}</div>${b.att?attHTML():''}<p>${esc(L(b.t))}</p></div>`;
 }return '';}
function choiceHTML(b,live){
 const c=st.ch[b.key],done=c!=null,how=st.how[b.key];
 const taken=live&&pilot.taken;
 let h=`<div class="choice${done?' done':''}${taken?' taken':''}" data-key="${b.key}"><p class="q">${esc(L(b.q))}</p>`;
 if(!done&&!taken){h+=`<div class="pilot"><div class="pr"><span class="autopill">${T('auto')}</span><span>${T('picking')}</span><b class="cd" id="cd">${Math.ceil(b.ms/1000)}</b></div><div class="bar"><i id="cdbar"></i></div>${b.help&&!st.seenHelp?`<p class="help">${esc(L(b.help))}</p>`:''}</div>`;}
 h+='<div class="opts">';
 b.opts.forEach((o,i)=>{const sel=done&&c===i,auto=!done&&i===b.pilot;
  h+=`<button class="opt${sel?' sel':''}${done&&!sel?' dim':''}${auto?' autot':''}" data-opt="${i}" aria-disabled="${done||!taken?'true':'false'}"><span>${esc(L(o.t))}</span>${sel?`<em>${how==='pilot'?'🤖 '+T('picked'):'✊ '+T('mine')}</em>`:''}${auto&&!taken?`<em class="am">← ${T('auto')}</em>`:''}</button>`;});
 h+='</div>';
 if(!done&&!taken)h+=`<button class="take" data-take="1">${T('take')} <span>→</span></button>`;
 if(taken)h+=`<div class="stamp">${T('stamp')}</div>`;
 return h+'</div>';}
function setLines(b){const ls=(b.lines||[]).map(L);if(!ls.length)return '';return `<div class="setlines"><p class="s1">${esc(ls[0])}</p>${ls[1]?`<p class="s2">${esc(ls[1])}</p>`:''}${ls[2]?`<p class="s3">${esc(ls[2])}</p>`:''}</div>`;}
function attHTML(){return `<div class="atts"><div class="att1"><div class="rcpt"><b>✓</b><span>${T('attAmt')}</span><i></i><i></i><i></i></div><small>🔒 ${T('attT')}</small></div><div class="att1"><img src="assets/p-fakephoto.webp" alt=""><small>🔒 ${T('attC')}</small></div></div>`;}
function billHTML(){const B=BILL;return `<div class="bill"><div class="bh">${esc(L(B.school))}</div>${B.rows.map(r=>`<div class="br"><span>${esc(L(r[0]))}</span><b>${esc(r[1])}</b></div>`).join('')}<div class="br tot"><span>${esc(L(B.total[0]))}</span><b>${esc(B.total[1])}</b></div><div class="bcut">${esc(L(B.cut))}</div><div class="br paid"><span>${esc(L(B.paid[0]))}</span><b>−${esc(B.paid[1])}</b></div><small class="bby">${esc(L(B.by))}</small></div>`;}
function setHTML(b,bg){return `<div class="setcard t-${b.tint||'cold'}">${bg?`<img class="sbg" src="assets/${bg}" alt="">`:''}${b.place?`<span class="stag">${esc(L(b.place))}</span>`:''}${setLines(b)}</div>`;}
function widget(b){const k=b.key,bt=esc(L(b.btn));
 switch(b.mode){
  case 'tap':return `<button class="aw tap" data-actgo="${k}">${bt}</button>`;
  case 'hold':return `<button class="aw hold" data-hold="${k}"><i class="ring"><i></i></i><span>${bt}</span></button>`;
  case 'swipe':return `<div class="aw swipe" data-swipe="${k}"><div class="trk"><span>${bt}</span><b class="knob" tabindex="0">➜</b></div></div>`;
  case 'drag':return `<div class="aw drag" data-drag="${k}"><div class="pad"><b class="knob" tabindex="0">📱</b><i class="slot">▁▁▁</i></div><span>${bt}</span></div>`;}return '';}
function actHTML(b,bg){const done=!!st.done[b.key];
 return `<div class="act${done?' done':''}" data-key="${b.key}">${b.lines?setHTML(b,bg):''}<p class="aq"><span class="albl">${T('actL')}</span> ${esc(L(b.q))}</p>${done?`<p class="adone">✓ ${esc(L(b.done))}</p>`:widget(b)}</div>`;}
function quickHTML(b){const c=st.ch[b.key],done=c!=null;
 return `<div class="quick ${b.style}${done?' done':''}" data-key="${b.key}"><p class="aq"><span class="albl">${T('quickL')}</span> ${esc(L(b.q))}</p><div class="qopts">${b.opts.map((o,i)=>`<button class="qo${done&&c===i?' sel':''}${done&&c!==i?' dim':''}" data-quick="${i}" aria-disabled="${done?'true':'false'}">${b.style==='say'?`<span class="qb">${esc(L(o.t))}</span>${avatar('N','sm','determined')}`:esc(L(o.t))}</button>`).join('')}</div></div>`;}
function endHTML(){const m=Object.values(st.how).filter(h=>h==='me').length;
 return `<div class="end"><h2>${T('endT')}</h2><p class="eq">${T('endQ')}</p><p class="es">${esc(L(UI.endStat).replace('{m}',m))}</p><a class="enext" href="../">${T('novel')}</a><button class="eagain" data-again="1">${T('again')}</button></div>`;}
function beatHTML(b,i,tl){
 let pre='';
 const firstOf=w=>tl.findIndex(x=>x.k==='say'&&x.who===w)===i;
 let h='';
 switch(b.k){
  case 'say':{const c=CAST[b.who];const anc=(b.img||(tl[i-1]&&(tl[i-1].img||tl[i-1].k==='sfx')))?' anchor':'';h=`<div class="row ${c.me?'right':'left'}${anc}">${c.me?'':avatar(b.who,'',b.ex)}<div class="col"><div class="nm">${esc(L(c.name))}${firstOf(b.who)&&!c.me?` <small>${esc(L(c.tag))}</small>`:''}</div><div class="bub ${c.me?'me':''}">${esc(L(b.t))}</div></div>${c.me?avatar('N','',b.ex):''}</div>`;break;}
  case 'think':h=`<div class="row right"><div class="col"><div class="nm">${T('think')}</div><div class="cloud">${esc(L(b.t))}</div></div>${avatar('N','sm',b.ex)}</div>`;break;
  case 'old':h=`<div class="row left">${avatar('O')}<div class="col"><div class="nm old">${esc(L(CAST.O.name))} <small>${esc(L(CAST.O.tag))}</small></div><div class="bub oldb">${esc(L(b.t))}</div></div></div>`;break;
  case 'cap':h=`<div class="cap">${esc(L(b.t))}</div>`;break;
  case 'sfx':h=`<div class="sfx"><b>${esc(L(b.t))}</b>${b.sub?`<small>${esc(L(b.sub))}</small>`:''}</div>`;break;
  case 'phone':h=`<div class="prow ${b.mine?'right':''}">${phoneHTML(b)}</div>`;break;
  case 'choice':h=choiceHTML(b,i===st.n-1);break;
  case 'set':h=setHTML(b,b.blur||sceneAt(tl,i+1).img);break;
  case 'act':h=actHTML(b,b.blur);break;
  case 'quick':h=quickHTML(b);break;
  case 'end':h=endHTML();break;
 }
 return `<section class="beat k-${b.k}${b.fx==='glitch'?' glitch':''}" data-i="${i}">${pre}${h}</section>`;}

let lastBg=null,flip=false;
// a new place/time = a new page: the feed only shows lines from the current scene, so old text never sits under a new picture
function sceneStart(tl,n){let s=0;for(let i=0;i<n&&i<tl.length;i++)if(tl[i].place)s=i;return s;}
function sceneAt(tl,n){let img=null,place='',tint='cold';for(let i=0;i<n&&i<tl.length;i++){if(tl[i].place){place=tl[i].place;img=null;}if(tl[i].img)img=tl[i].img;if(tl[i].tint)tint=tl[i].tint;}return {img,place,tint};}
const RM=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
const tx={anims:[],timers:[],active:false};let ffAt=0;
function later(fn,ms){if(RM||!ms){fn();return;}const t=setTimeout(()=>{tx.timers=tx.timers.filter(x=>x.t!==t);fn();},ms);tx.timers.push({t,fn});}
function anim(el,kf,o){o=o||{};if(!el)return;const a=el.animate(kf,{duration:RM?140:o.d||520,easing:o.e||'cubic-bezier(.2,.7,.2,1)',delay:RM?0:o.delay||0,fill:'both'});tx.anims.push(a);tx.active=true;a.onfinish=()=>{tx.anims=tx.anims.filter(x=>x!==a);try{a.cancel()}catch{}o.done&&o.done();if(!tx.anims.length)tx.active=false;};return a;}
function finishTx(){tx.timers.splice(0).forEach(x=>{clearTimeout(x.t);clearInterval(x.t);x.fn();});tx.anims.slice().forEach(a=>{try{a.finish()}catch{}});tx.anims=[];tx.active=false;document.querySelectorAll('.feed.ghost,.carry').forEach(g=>g.remove());}
function swapImg(src){const a=$(flip?'pimg2':'pimg'),b=$(flip?'pimg':'pimg2');b.src='assets/'+src;b.classList.remove('kb');void b.offsetWidth;b.classList.add('kb','on');a.classList.remove('on');flip=!flip;$('bgimg').src='assets/'+src;$('stage').dataset.img=src;}
let lastPlace='';
function placeTag(text,prev){const el=$('place');if(RM||!prev||text===prev){el.textContent=text;return;}
 const m=/^(\d\d)[.:](\d\d)(.*)$/.exec(text),pm=/^(\d\d)[.:](\d\d)/.exec(prev);const sep=st.lang==='zh'?':':'.';
 const rest=m?m[3]:text;let a=pm?(+pm[1])*60+(+pm[2]):0,b=m?(+m[1])*60+(+m[2]):0;if(b<a)b+=1440;
 const fmt=v=>{v%=1440;return String(Math.floor(v/60)).padStart(2,'0')+sep+String(v%60).padStart(2,'0');};
 const chars=[...rest];const t0=performance.now();let done=false;
 const step=()=>{if(done)return;const p=(performance.now()-t0)/640;const pt=Math.min(1,p/0.45),pc=Math.max(0,Math.min(1,(p-0.4)/0.6));
  el.textContent=(m&&pm?fmt(Math.round(a+(b-a)*(1-Math.pow(1-pt,3)))):(m?text.slice(0,5):''))+chars.slice(0,Math.round(chars.length*pc)).join('');if(p<1)requestAnimationFrame(step);else el.textContent=text;};
 requestAnimationFrame(step);tx.timers.push({t:0,fn:()=>{done=true;el.textContent=text;}});}
function applyScene(tl,opt){opt=opt||{};const sc=sceneAt(tl,st.n);const last=tl[st.n-1]||{};
 if(sc.img&&sc.img!==lastBg){const src=sc.img;lastBg=src;
  // the line that motivates the picture lands first, then the picture fades in under it
  const d=opt.instant?0:(last.place?400:(last.img?180:0));later(()=>swapImg(src),d);}
 $('app').classList.toggle('noimg',!sc.img);if(!sc.img)lastBg=null;
 const pl=L(sc.place);$('place').hidden=!sc.place;if(pl!==lastPlace){placeTag(pl,opt.instant?'':lastPlace);lastPlace=pl;}
 // image beat -> panel brightens/expands; dialogue -> panel dims and slides up (transform only)
 const imgBeat=!!(last.img||last.k==='sfx'||last.place);$('app').classList.toggle('focus-text',!!sc.img&&!imgBeat);
 $('tint').className='tint '+sc.tint;$('stage').className='stage t-'+sc.tint;}
function preload(tl){for(let i=st.n;i<Math.min(BEATS.length,st.n+16);i++){const b=BEATS[i];const imgs=[b.img,b.blur,...((b.opts||[]).flatMap(o=>(o.re||[]).map(r=>r.img)))].filter(Boolean);imgs.forEach(x=>{const im=new Image();im.src='assets/'+x;im.decode&&im.decode().catch(()=>{});});
 if(b.who&&CAST[b.who]&&!CAST[b.who].old){const im=new Image();im.src=`assets/av-${b.who}-${(EXS[b.who]||[]).includes(b.ex)?b.ex:'neutral'}.webp`;}}}
function age(){const bs=[...feed.children];bs.forEach((e,j)=>{const a=bs.length-1-j;e.classList.toggle('age3',a===3);e.classList.toggle('age4',a>=4);});}
function glide(h0){const dh=feed.offsetHeight-h0;age();if(dh>1&&!RM)feed.animate([{transform:`translateY(${dh}px)`},{transform:'none'}],{duration:420,easing:'cubic-bezier(.25,.8,.25,1)'});}
function carry(text,cls){if(!text)return;const c=document.createElement('div');c.className='carry '+(cls||'');c.textContent=text;$('app').appendChild(c);anim(c,[{opacity:1},{opacity:1,offset:.6},{opacity:0,transform:'translateY(-14px)'}],{d:1300,e:'ease-in',done:()=>c.remove()});}
// scene change: transition chosen by context (whip = new place, dip = time skip, push = into the phone, black = shock)
function sceneCut(b,sec){const type=RM?'fade':(b.tx||'dip');const ghost=feed.cloneNode(true);ghost.removeAttribute('id');ghost.classList.add('ghost');ghost.setAttribute('aria-hidden','true');feed.parentElement.appendChild(ghost);
 const lastLine=[...feed.querySelectorAll('.bub,.cloud,.cap,.gmsg p,.ph p')].pop();feed.innerHTML='';feed.appendChild(sec);const rm=()=>ghost.remove();
 const wipe=$('wipe'),dip=$('dip');$('dipw').textContent='';
 if(type==='whip'){anim(ghost,[{transform:'none',opacity:1},{transform:'translateX(-60%) skewX(6deg)',opacity:0}],{d:460,e:'cubic-bezier(.6,0,.4,1)',done:rm});anim(feed,[{transform:'translateX(50%) skewX(-6deg)',opacity:0},{transform:'none',opacity:1}],{d:520,delay:80});anim(wipe,[{opacity:1,transform:'translateX(110%)'},{opacity:1,transform:'translateX(-110%)'}],{d:520,e:'cubic-bezier(.5,0,.5,1)'});}
 else if(type==='push'){anim(ghost,[{transform:'none',opacity:1},{transform:'scale(1.1)',opacity:0}],{d:520,done:rm});anim(feed,[{transform:'scale(.45) translateY(20%)',opacity:0,borderRadius:'40px'},{opacity:1,offset:.35},{transform:'none',opacity:1,borderRadius:'0px'}],{d:620});carry('ting!','sfxw');}
 else if(type==='black'){anim(dip,[{opacity:0},{opacity:1,offset:.35},{opacity:1,offset:.7},{opacity:0}],{d:900,e:'ease-in-out'});later(()=>{$('dipw').textContent=L(b.txw||'');},120);anim(ghost,[{opacity:1},{opacity:0}],{d:320,done:rm});anim(feed,[{opacity:0},{opacity:1}],{d:300,delay:620});}
 else if(type==='fade'){anim(ghost,[{opacity:1},{opacity:0}],{d:200,done:rm});}
 else {dip.style.background=getComputedStyle($('tint')).backgroundColor==='rgba(0, 0, 0, 0)'?'#0d090d':'';anim(dip,[{opacity:0},{opacity:.92,offset:.45},{opacity:0}],{d:700});anim(ghost,[{opacity:1},{opacity:0}],{d:320,done:rm});anim(feed,[{opacity:0},{opacity:1}],{d:380,delay:320});}
 if(type!=='push'&&lastLine)carry(lastLine.textContent.trim().slice(0,90));}
function chrome(tl){document.documentElement.lang=st.lang==='zh'?'zh':'id';$('ttl').textContent=L(UI.title);$('proto').textContent=L(UI.proto);$('btnLang').textContent=st.lang==='zh'?'中':'ID';
 $('btnAuto').textContent=st.auto?'❚❚':'▶';$('btnAuto').classList.toggle('on',!st.auto);$('btnSpeed').textContent=(st.speed||1)+'×';
 const total=tl.length+(BEATS.length-tl.length);$('prog').style.width=Math.min(100,st.n/Math.max(total,1)*100)+'%';
 const last=tl[st.n-1];const blocked=isBlocked(last);
 $('hint').textContent=last&&last.k==='end'?'':blocked?'':L(UI.tap)+' ▾';$('hint').classList.toggle('faint',st.n>4);
 $('btnBack').disabled=st.n<=1;$('app').classList.toggle('choosing',!!(blocked&&last.k==='choice'));}
function full(){const tl=timeline();st.n=Math.min(Math.max(1,st.n),tl.length);const s0=sceneStart(tl,st.n);finishTx();feed.innerHTML=tl.slice(s0,st.n).map((b,i)=>beatHTML(b,i+s0,tl)).join('');applyScene(tl,{instant:true});chrome(tl);armChoice(tl);age();preload(tl);}
function scrollEnd(){age();}
function fx(b){const app=$('app');if(b.fx==='shake'){app.classList.remove('shake');void app.offsetWidth;app.classList.add('shake');}
 if(b.fx==='flash'||b.fx==='shake'&&b.k==='sfx'){const f=$('flash');f.classList.remove('go');void f.offsetWidth;f.classList.add('go');}
 if(b.fx==='zoom'){const im=$(flip?'pimg2':'pimg');im.classList.remove('punch');void im.offsetWidth;im.classList.add('punch');}
 if(navigator.vibrate&&b.fx==='shake')try{navigator.vibrate(40)}catch{}}

// ---------- choice / autopilot ----------
const pilot={timer:null,raf:null,key:null,end:0,taken:false};
function stopPilot(){clearTimeout(pilot.timer);cancelAnimationFrame(pilot.raf);pilot.timer=null;}
function armChoice(tl){const last=tl[st.n-1];
 if(!last||last.k!=='choice'||st.ch[last.key]!=null){stopPilot();pilot.key=null;pilot.taken=false;return;}
 if(pilot.key===last.key&&(pilot.timer||pilot.taken))return;
 stopPilot();pilot.key=last.key;pilot.taken=false;pilot.end=Date.now()+last.ms;
 const tick=()=>{const left=Math.max(0,pilot.end-Date.now());const cd=$('cd'),bar=$('cdbar');if(cd)cd.textContent=Math.ceil(left/1000);if(bar)bar.style.width=(left/last.ms*100)+'%';if(left>0&&!pilot.taken)pilot.raf=requestAnimationFrame(tick);};tick();
 pilot.timer=setTimeout(()=>{if(pilot.taken)return;choose(last,last.pilot,'pilot');},last.ms);}
function takeover(){const tl=timeline();const last=tl[st.n-1];if(!last||last.k!=='choice')return;stopPilot();pilot.taken=true;st.seenHelp=true;
 const h0=feed.offsetHeight;const sec=feed.lastElementChild;sec.outerHTML=beatHTML(last,st.n-1,tl);glide(h0);const app=$('app');app.classList.remove('shake');void app.offsetWidth;app.classList.add('shake');const f=$('flash');f.classList.remove('go','gold');void f.offsetWidth;f.classList.add('go','gold');save();scrollEnd(true);}
function choose(b,i,how){stopPilot();st.ch[b.key]=i;st.how[b.key]=how;st.seenHelp=true;if(!st.tChoice&&b.key==='live')st.tChoice=Date.now()-st.t0;pilot.key=null;pilot.taken=false;
 const tl=timeline();const h0=feed.offsetHeight;const sec=feed.lastElementChild;sec.outerHTML=beatHTML(b,st.n-1,tl);glide(h0);save();chrome(tl);
 pendingAdv=setTimeout(()=>advance(),how==='pilot'?900:450);}

// ---------- light interactions (act / quick) ----------
function completeAct(key){const tl=timeline();const b=tl[st.n-1];if(!b||b.k!=='act'||b.key!==key||st.done[key])return;st.done[key]=true;
 const h0=feed.offsetHeight;const sec=feed.lastElementChild;sec.outerHTML=beatHTML(b,st.n-1,tl);glide(h0);feed.lastElementChild.classList.add('revealed');save();chrome(timeline());scrollEnd(true);
 if(navigator.vibrate)try{navigator.vibrate(25)}catch{};justActed=Date.now();pendingAdv=setTimeout(()=>advance(),900);}
function chooseQuick(i){const tl=timeline();const b=tl[st.n-1];if(!b||b.k!=='quick'||st.ch[b.key]!=null)return;st.ch[b.key]=i;
 const h0=feed.offsetHeight;const sec=feed.lastElementChild;sec.outerHTML=beatHTML(b,st.n-1,timeline());glide(h0);save();chrome(timeline());pendingAdv=setTimeout(()=>advance(),380);}
let drag=null,hold=null,justActed=0,pendingAdv=null;
document.addEventListener('pointerdown',e=>{if(tx.active&&!e.target.closest('header,.sheet')){finishTx();ffAt=Date.now();return;}
 const h=e.target.closest('[data-hold]');if(h){e.preventDefault();const key=h.dataset.hold,t0=performance.now(),ring=h.querySelector('.ring');h.classList.add('holding');
  const step=()=>{if(!hold)return;const p=Math.min(1,(performance.now()-t0)/1300);ring.style.setProperty('--p',p);if(p>=1){hold=null;h.classList.remove('holding');completeAct(key);return;}hold.raf=requestAnimationFrame(step);};hold={el:h,raf:requestAnimationFrame(step)};return;}
 const kn=e.target.closest('.knob');if(!kn)return;const w=kn.closest('[data-swipe],[data-drag]');if(!w)return;e.preventDefault();
 const vertical=!!w.dataset.drag,box=(vertical?w.querySelector('.pad'):w.querySelector('.trk')).getBoundingClientRect(),kb=kn.getBoundingClientRect();
 drag={kn,w,vertical,key:w.dataset.swipe||w.dataset.drag,x0:e.clientX,y0:e.clientY,max:vertical?box.height-kb.height-8:box.width-kb.width-8,p:0};try{kn.setPointerCapture(e.pointerId)}catch{}});
document.addEventListener('pointermove',e=>{if(!drag)return;const d=drag.vertical?e.clientY-drag.y0:e.clientX-drag.x0;const v=Math.max(0,Math.min(drag.max,d));drag.p=v/drag.max;drag.kn.style.transform=drag.vertical?`translateY(${v}px)`:`translateX(${v}px)`;drag.w.style.setProperty('--p',drag.p);});
const endDrag=()=>{if(!drag)return;const d=drag;drag=null;if(d.p>=0.72){d.kn.style.transform=d.vertical?`translateY(${d.max}px) rotateX(180deg)`:`translateX(${d.max}px)`;completeAct(d.key);}else{d.kn.style.transition='transform .25s';d.kn.style.transform='';setTimeout(()=>d.kn.style.transition='',260);}};
document.addEventListener('pointerup',e=>{endDrag();if(hold){cancelAnimationFrame(hold.raf);hold.el.classList.remove('holding');hold.el.querySelector('.ring').style.setProperty('--p',0);hold=null;}});
document.addEventListener('pointercancel',()=>{endDrag();if(hold){cancelAnimationFrame(hold.raf);hold.el.classList.remove('holding');hold=null;}});
document.addEventListener('keydown',e=>{if(e.key==='Enter'){const a=document.activeElement&&document.activeElement.closest('.aw');if(a){e.stopImmediatePropagation();completeAct(a.dataset.swipe||a.dataset.drag||a.dataset.hold||a.dataset.actgo);}}},true);

// ---------- navigation ----------
function advance(){clearTimeout(pendingAdv);const tl=timeline();const last=tl[st.n-1];
 if(isBlocked(last)){const t=feed.querySelector('.beat:last-child .take,.beat:last-child .aw,.beat:last-child .qopts');if(t){t.classList.remove('nudge');void t.offsetWidth;t.classList.add('nudge');}return;}
 if(st.n>=tl.length)return;
 finishTx();st.n++;const b=tl[st.n-1];const div=document.createElement('div');div.innerHTML=beatHTML(b,st.n-1,tl);const sec=div.firstElementChild;sec.classList.add('new');
 if(b.place&&feed.children.length)sceneCut(b,sec);else{const h0=feed.offsetHeight;feed.appendChild(sec);glide(h0);}
 applyScene(tl);chrome(tl);fx(b);armChoice(tl);save();preload(tl);schedule();}
function back(){if(st.n<=1)return;stopAuto();st.n--;let tl=timeline();const last=tl[st.n-1];
 // back only rewinds what is on screen; decisions stay made (no rerolls)
 pilot.key=null;stopPilot();save();full();}
let autoT=null;
const plain=x=>L(x||'').replace(/[“”"()（）]/g,'');
function beatText(b){return [b.place,...(b.lines||[]),b.t,b.sub,b.q,b.done].filter(Boolean).map(plain).join(' ');}
function dwell(b){const t=beatText(b);let ms=st.lang==='zh'?t.replace(/\s/g,'').length/8*1000:t.split(/\s+/).filter(Boolean).length/220*60000;ms=Math.max(1200,ms);
 if(b.place)ms+=1100;else if(b.img)ms+=700;if(b.photo)ms+=1800;if(b.bill)ms+=2600;if(b.att)ms+=1200;if(b.k==='sfx')ms=Math.max(ms,1600);return ms;}
function schedule(){clearTimeout(autoT);autoT=null;if(!st.auto||document.hidden)return;const tl=timeline();const b=tl[st.n-1];if(!b||b.k==='end')return;if(isBlocked(b))return;
 autoT=setTimeout(()=>{autoT=null;advance();},dwell(b)/(st.speed||1));}
document.addEventListener('visibilitychange',()=>{if(document.hidden){clearTimeout(autoT);autoT=null;}else schedule();});

// ---------- menu / reset ----------
function sheet(html){const s=$('sheet');s.innerHTML=`<div class="card">${html}</div>`;s.hidden=false;}
function closeSheet(){$('sheet').hidden=true;}
function menu(){sheet(`<h3>${T('menu')}</h3><button data-act="lang">ID ⇄ 中文</button><button data-act="auto">${T('autoplay')}: ${st.auto?'ON':'OFF'}</button><button data-act="reset-ask" class="warn">${T('reset')}</button><button data-act="close" class="ghost">${T('no')}</button>`);}
function resetAsk(){sheet(`<h3>${T('reset')}</h3><p>${T('resetQ')}</p><button data-act="reset" class="warn">${T('yes')}</button><button data-act="close" class="ghost">${T('no')}</button>`);}
function doReset(){wiping=true;stopPilot();clearTimeout(autoT);const lang=st.lang;store.wipe();try{localStorage.setItem('comic:'+store.id+':lang-seed',lang)}catch{};location.replace(location.pathname+location.search);}
// after a reset keep only the language choice
(function(){try{const k='comic:'+store.id+':lang-seed';const v=localStorage.getItem(k);if(v){localStorage.removeItem(k);if(!store.get('state',null))st.lang=v==='zh'?'zh':'id';}}catch{}})();
window.addEventListener('storage',e=>{if(e.key===store.markK)location.reload();});

document.addEventListener('click',e=>{
 if(!$('sheet').contains(e.target)&&!e.target.closest('header')&&(tx.active||Date.now()-ffAt<500)){finishTx();return;}
 let t=e.target.closest('button,a,[data-act]');if(t&&t.getAttribute('aria-disabled')==='true')t=null;
 {const bt=t&&t.closest('.feed .beat');if(bt&&bt!==feed.lastElementChild&&!t.dataset.again&&t.tagName!=='A')t=null;}
 if($('sheet').contains(e.target)){if(e.target===$('sheet'))return closeSheet();const a=t&&t.dataset.act;if(!a)return;
  if(a==='close')closeSheet();if(a==='lang'){st.lang=st.lang==='zh'?'id':'zh';save();closeSheet();full();}
  if(a==='auto'){st.auto=!st.auto;save();closeSheet();chrome(timeline());schedule();}
  if(a==='reset-ask')resetAsk();if(a==='reset')doReset();return;}
 if(t){if(t.id==='btnLang'){st.lang=st.lang==='zh'?'id':'zh';save();full();return;}
  if(t.id==='btnMenu')return menu();if(t.id==='btnBack')return back();
  if(t.id==='btnSpeed'){const sp=[1,1.5,2];st.speed=sp[(sp.indexOf(st.speed||1)+1)%3];save();chrome(timeline());schedule();return;}
  if(t.id==='btnAuto'){st.auto=!st.auto;save();chrome(timeline());schedule();return;}
  if(t.dataset.take)return takeover();
  if(t.dataset.actgo)return completeAct(t.dataset.actgo);if(t.dataset.hold)return;
  if(t.dataset.quick!=null)return chooseQuick(+t.dataset.quick);
  if(t.dataset.opt!=null){const tl=timeline();const b=tl[st.n-1];if(b&&b.k==='choice'&&pilot.taken)choose(b,+t.dataset.opt,'me');return;}
  if(t.dataset.again){wiping=false;const lang=st.lang;st=fresh(lang);save();lastBg=null;full();return;}
  if(t.tagName==='A')return;return;}
 if(e.target.closest('header'))return;
 if(Date.now()-justActed<450)return;
 if(e.target.closest('.act:not(.done) .aw,.quick:not(.done) .qopts'))return;
 advance();
});
document.addEventListener('keydown',e=>{if(e.key===' '||e.key==='ArrowRight'||e.key==='Enter'){e.preventDefault();advance();}if(e.key==='ArrowLeft')back();});
window.__comic={get st(){return st},get waiting(){return !!autoT},timeline,store,L,sceneAt,get tx(){return tx.active}};
full();schedule();
})();
