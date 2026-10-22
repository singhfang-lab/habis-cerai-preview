(function(){
'use strict';
const {CAST,BEATS,UI}=window.COMIC;
const store=ComicStore.create(window.localStorage,location.search,{onWiped:()=>location.reload()});
const $=id=>document.getElementById(id);
const qs=new URLSearchParams(location.search);
const fresh=lang=>({v:1,n:1,ch:{},how:{},lang:lang||'id',auto:false,t0:Date.now()});
let st=store.get('state',null);
if(!st||st.v!==1){const dl=(qs.get('lang')||store.deviceGet('hcp:last-lang')||'').replace(/"/g,'');st=fresh(dl==='zh'?'zh':'id');}
if(qs.get('lang')==='zh'||qs.get('lang')==='id')st.lang=qs.get('lang');
const L=s=>{if(s==null)return '';s=String(s);if(!s.includes('|'))return s;const p=s.split('|');return st.lang==='zh'?p[1]:p[0];};
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const T=k=>esc(L(UI[k]));
let wiping=false;
const save=()=>{if(wiping)return;store.set('state',st);};

function timeline(){const out=[];for(const b of BEATS){out.push(b);if(b.k==='choice'){const c=st.ch[b.key];if(c==null)break;const o=b.opts[c];out.push(...o.re.map(r=>({...r,_after:b.key})));out.push(...((st.how[b.key]==='pilot'?b.ifPilot:b.ifMe)||[]).map(r=>({...r,_after:b.key})));}}return out;}

// ---------- render ----------
const feed=$('feed');
function avatar(who,cls=''){const c=CAST[who];return `<div class="av ${cls}${c.old?' old':''}"><img src="assets/${c.av}" alt=""></div>`;}
function phoneHTML(b){
 const time=b.time?`<span class="pt">${esc(L(b.time))}</span>`:'';
 switch(b.app){
  case 'group':return `<div class="ph group"><div class="phh"><span class="ico">👥</span><b>${esc(L(b.title))}</b>${time}</div><div class="gmsg"><small>${esc(L(b.from))}</small>${b.photo?`<div class="fakephoto"><span>${T('photo')}</span></div>`:''}<p>${esc(L(b.t))}</p></div></div>`;
  case 'notif':return `<div class="ph notif"><div class="phh"><span class="ico">✉️</span><b>${esc(L(b.title))}</b>${time}</div><p>${esc(L(b.t))}</p></div>`;
  case 'bank':return `<div class="ph notif bank"><div class="phh"><span class="ico">💳</span><b>${esc(L(b.title))}</b>${time}</div><p>${esc(L(b.t))}</p></div>`;
  case 'wa':return `<div class="ph wa${b.mine?' mine':''}"><div class="phh"><span class="ico">💬</span><b>${esc(L(b.title))}</b>${time}</div><p class="wab">${esc(L(b.t))}</p></div>`;
  case 'live':return `<div class="ph live${b.pin?' pin':''}"><div class="phh"><span class="livepill">LIVE</span><b>${esc(L(b.title))}</b></div>${b.pin?`<small class="pinl">📌 ${T('pinned')}</small>`:''}<p>${b.from?`<b class="u">${esc(b.from)}</b> `:''}${esc(L(b.t))}</p></div>`;
  case 'call':return `<div class="ph call">${avatar('K','big')}<b class="cn">${esc(L(b.title))}</b><small>${T('call')}</small><p>${esc(L(b.t))}</p><div class="cbtn"><i class="no">✕</i><i class="yes">✆</i></div></div>`;
  case 'vn':return `<div class="ph vn"><div class="phh"><span class="ico">🎙️</span><b>${esc(L(b.title))}</b></div><div class="wave"><i>▶</i>${'<s></s>'.repeat(22)}<small>${T('vn')}</small></div><p>${esc(L(b.t))}</p></div>`;
  case 'dm':return `<div class="ph dm"><div class="phh"><span class="ico anon">?</span><b>${esc(L(b.title))}</b>${time}</div><p>${esc(L(b.t))}</p></div>`;
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
function endHTML(){const m=Object.values(st.how).filter(h=>h==='me').length;
 return `<div class="end"><h2>${T('endT')}</h2><p class="eq">${T('endQ')}</p><p class="es">${esc(L(UI.endStat).replace('{m}',m))}</p><a class="enext" href="../">${T('novel')}</a><button class="eagain" data-again="1">${T('again')}</button></div>`;}
function beatHTML(b,i,tl){
 let pre='';
 if(b.bg)pre=`<div class="panel"><img src="assets/${b.bg}" alt=""><span>${esc(L(b.place))}</span></div>`;
 const firstOf=w=>tl.findIndex(x=>x.k==='say'&&x.who===w)===i;
 let h='';
 switch(b.k){
  case 'say':{const c=CAST[b.who];h=`<div class="row ${c.me?'right':'left'}">${c.me?'':avatar(b.who)}<div class="col"><div class="nm">${esc(L(c.name))}${firstOf(b.who)&&!c.me?` <small>${esc(L(c.tag))}</small>`:''}</div><div class="bub ${c.me?'me':''}">${esc(L(b.t))}</div></div>${c.me?avatar('N'):''}</div>`;break;}
  case 'think':h=`<div class="row right"><div class="col"><div class="nm">${T('think')}</div><div class="cloud">${esc(L(b.t))}</div></div>${avatar('N','sm')}</div>`;break;
  case 'old':h=`<div class="row left">${avatar('O')}<div class="col"><div class="nm old">${esc(L(CAST.O.name))} <small>${esc(L(CAST.O.tag))}</small></div><div class="bub oldb">${esc(L(b.t))}</div></div></div>`;break;
  case 'cap':h=`<div class="cap">${esc(L(b.t))}</div>`;break;
  case 'sfx':h=`<div class="sfx"><b>${esc(L(b.t))}</b>${b.sub?`<small>${esc(L(b.sub))}</small>`:''}</div>`;break;
  case 'phone':h=`<div class="prow ${b.mine?'right':''}">${phoneHTML(b)}</div>`;break;
  case 'choice':h=choiceHTML(b,i===st.n-1);break;
  case 'end':h=endHTML();break;
 }
 return `<section class="beat k-${b.k}${b.fx==='glitch'?' glitch':''}" data-i="${i}">${pre}${h}</section>`;}

let lastBg=null;
function applyScene(tl){let bg=null,tint='cold';for(let i=0;i<st.n&&i<tl.length;i++){if(tl[i].bg)bg=tl[i].bg;if(tl[i].tint)tint=tl[i].tint;}
 if(bg&&bg!==lastBg){const im=$('bgimg');im.src='assets/'+bg;im.classList.remove('kb');void im.offsetWidth;im.classList.add('kb');lastBg=bg;}
 $('tint').className='tint '+tint;}
function chrome(tl){document.documentElement.lang=st.lang==='zh'?'zh':'id';$('ttl').textContent=L(UI.title);$('proto').textContent=L(UI.proto);$('btnLang').textContent=st.lang==='zh'?'中':'ID';
 $('btnAuto').textContent=st.auto?'❚❚':'▶';$('btnAuto').classList.toggle('on',!!st.auto);
 const total=tl.length+(BEATS.length-tl.length);$('prog').style.width=Math.min(100,st.n/Math.max(total,1)*100)+'%';
 const last=tl[st.n-1];const blocked=last&&last.k==='choice'&&st.ch[last.key]==null;
 $('hint').textContent=last&&last.k==='end'?'':blocked?'':L(UI.tap)+' ▾';$('hint').classList.toggle('faint',st.n>4);
 $('btnBack').disabled=st.n<=1;}
function full(){const tl=timeline();st.n=Math.min(Math.max(1,st.n),tl.length);feed.innerHTML=tl.slice(0,st.n).map((b,i)=>beatHTML(b,i,tl)).join('');applyScene(tl);chrome(tl);armChoice(tl);scrollEnd(false);}
function scrollEnd(smooth){requestAnimationFrame(()=>feed.scrollTo({top:feed.scrollHeight,behavior:smooth?'smooth':'auto'}));}
function fx(b){const app=$('app');if(b.fx==='shake'){app.classList.remove('shake');void app.offsetWidth;app.classList.add('shake');}
 if(b.fx==='flash'||b.fx==='shake'&&b.k==='sfx'){const f=$('flash');f.classList.remove('go');void f.offsetWidth;f.classList.add('go');}
 if(b.fx==='zoom'){const im=$('bgimg');im.classList.remove('punch');void im.offsetWidth;im.classList.add('punch');}
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
 const sec=feed.lastElementChild;sec.outerHTML=beatHTML(last,st.n-1,tl);const app=$('app');app.classList.remove('shake');void app.offsetWidth;app.classList.add('shake');const f=$('flash');f.classList.remove('go','gold');void f.offsetWidth;f.classList.add('go','gold');save();scrollEnd(true);}
function choose(b,i,how){stopPilot();st.ch[b.key]=i;st.how[b.key]=how;st.seenHelp=true;if(!st.tChoice&&b.key==='live')st.tChoice=Date.now()-st.t0;pilot.key=null;pilot.taken=false;
 const tl=timeline();const sec=feed.lastElementChild;sec.outerHTML=beatHTML(b,st.n-1,tl);save();chrome(tl);
 setTimeout(()=>advance(),how==='pilot'?900:450);}

// ---------- navigation ----------
function advance(){const tl=timeline();const last=tl[st.n-1];
 if(last&&last.k==='choice'&&st.ch[last.key]==null){const t=feed.querySelector('.take');if(t){t.classList.remove('nudge');void t.offsetWidth;t.classList.add('nudge');}return;}
 if(st.n>=tl.length)return;
 st.n++;const b=tl[st.n-1];const div=document.createElement('div');div.innerHTML=beatHTML(b,st.n-1,tl);const sec=div.firstElementChild;sec.classList.add('new');feed.appendChild(sec);
 applyScene(tl);chrome(tl);fx(b);armChoice(tl);save();scrollEnd(true);schedule();}
function back(){if(st.n<=1)return;stopAuto();st.n--;let tl=timeline();const last=tl[st.n-1];
 // back only rewinds what is on screen; decisions stay made (no rerolls)
 pilot.key=null;stopPilot();save();full();}
let autoT=null;
function stopAuto(){clearTimeout(autoT);autoT=null;if(st.auto){st.auto=false;save();chrome(timeline());}}
function schedule(){clearTimeout(autoT);if(!st.auto)return;const tl=timeline();const b=tl[st.n-1];if(!b||b.k==='end')return;if(b.k==='choice'&&st.ch[b.key]==null)return;
 const len=L(b.t||'').length;autoT=setTimeout(advance,1300+len*(st.lang==='zh'?90:38));}

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
 let t=e.target.closest('button,a,[data-act]');if(t&&t.getAttribute('aria-disabled')==='true')t=null;
 if($('sheet').contains(e.target)){if(e.target===$('sheet'))return closeSheet();const a=t&&t.dataset.act;if(!a)return;
  if(a==='close')closeSheet();if(a==='lang'){st.lang=st.lang==='zh'?'id':'zh';save();closeSheet();full();}
  if(a==='auto'){st.auto=!st.auto;save();closeSheet();chrome(timeline());schedule();}
  if(a==='reset-ask')resetAsk();if(a==='reset')doReset();return;}
 if(t){if(t.id==='btnLang'){st.lang=st.lang==='zh'?'id':'zh';save();full();return;}
  if(t.id==='btnMenu')return menu();if(t.id==='btnBack')return back();
  if(t.id==='btnAuto'){st.auto=!st.auto;save();chrome(timeline());schedule();return;}
  if(t.dataset.take)return takeover();
  if(t.dataset.opt!=null){const tl=timeline();const b=tl[st.n-1];if(b&&b.k==='choice'&&pilot.taken)choose(b,+t.dataset.opt,'me');return;}
  if(t.dataset.again){wiping=false;const lang=st.lang;st=fresh(lang);save();lastBg=null;full();return;}
  if(t.tagName==='A')return;return;}
 if(e.target.closest('header'))return;
 if(st.auto)stopAuto();advance();
});
document.addEventListener('keydown',e=>{if(e.key===' '||e.key==='ArrowRight'||e.key==='Enter'){e.preventDefault();advance();}if(e.key==='ArrowLeft')back();});
window.__comic={get st(){return st},timeline,store,L};
full();schedule();
})();
