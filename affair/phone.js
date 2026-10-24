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
const esc=s=>String(s).replace(/[&<>\"]/g,c=>({'&':'&','<':'<','>':'>','\"':'"'}[c]));
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
// ... (rest of engine unchanged except EPN) ...
const EPN=['Episode 1|第1集','Episode 2|第2集','Episode 3|第3集'];
function epUrl(n){const u=new URL(location.href);u.searchParams.set('ep',n);return u.toString()}
$('#btnMenu').onclick=()=>{const sh=$('#sheet');sh.innerHTML=`<div class="shc"><div class="eps">${EPN.map((e,i)=>`<button data-ep="${i+1}" class="${EP===i+1?'on':''}">${T(e)}</button>`).join('')}</div><b>${T(UI.menu)}</b><p>${T(UI.resetQ)}</p><button id="rsY" class="danger">${T(UI.yes)}</button><button id="rsN">${T(UI.no)}</button></div>`;sh.hidden=false;
 $('#rsY').onclick=()=>resetAll();sh.querySelectorAll('[data-ep]').forEach(b=>b.onclick=()=>{if(+b.dataset.ep===EP){sh.hidden=true;return}location.href=epUrl(b.dataset.ep)});$('#rsN').onclick=()=>{sh.hidden=true}};
})();
