// Di HP-nya, Namaku Cuma "Rumah" — Episode 2 (her phone).
// Every reader-facing string is 'id|zh' (exactly one '|'). Flags: 'called' (she phoned him at the café).
// Facts: Wed 21 Oct 22.49 he catches her. Thu 22 Oct: he says 'lembur, audit'; Mama keeps Nayla (Thursdays).
// 19.20 Sari's story (17). Jalanku booked 19.26, 14 min → arrives 19.40; he comes 19.44 by Jalanku (car at the garage till Friday).
(function(root){
const TITLE={t:'Di HP-nya, Namaku Cuma “Rumah”|在他手机里，我只是“家”',sub:''};
const NUM='+62 813-4471-2207';
const SAY={L:{name:'Aku|我',me:true,img:'av-L.webp'},D:{name:'Mas Dimas|Dimas',img:'av-D.webp'},S:{name:'Sari|Sari',img:'av-S.webp'},M:{name:'Mama|婆婆',ini:'M',c:3},Dn:{name:'Dinda|Dinda',img:'av-Dn.webp'}};
const TH={
 sari:{name:'Sari 🌸|Sari 🌸',sub:NUM,av:'S'},
 dinda:{name:'Dinda|Dinda',sub:'online|在线',av:'Dn'}};
const RB={a:'Rumah|家',b:'Kopi Senja · depan Griya Sentosa|Kopi Senja · Griya Sentosa对面',img:'p-apt.webp',fare:'Rp36.000'};
const BEATS=[
 {k:'dark',title:1,clock:'22.49',day:'Episode 2 · Rabu, 21 Oktober|第2集 · 10月21日 星期三',t:'Kamis malam, lantai 17|星期四晚上，十七楼',sub:'22.49|22:49'},
 // ---------- caught ----------
 {k:'scene',clock:'22.49',tag:'22.49 · Kamar tidur|22:49 · 卧室',tint:'night',img:'p-stare.webp',opos:'50% 0%',lines:['Dia masih menatapku.|他还盯着我。']},
 {k:'say',who:'D',t:'Kamu buka HP-ku?|你动我手机了？'},
 {k:'scene',clock:'22.49',tag:'22.49 · Kamar tidur|22:49 · 卧室',tint:'night',img:'p-ask.webp',lines:['Dia menghadapkan layarnya padaku.|他把屏幕转向我。']},
 {k:'scap',bn:1,from:'Pak Budi Supplier|Pak Budi Supplier',time:'22.47',t:'Mas, tadi aku telepon. Kok gitu?|哥，我刚才给你打电话了。怎么回事？'},
 {k:'say',who:'L',t:'Tadi bunyi terus. Kukira alarm.|刚才一直响。我以为是闹钟。'},
 {k:'scap',t:'Dia diam. Lama.|他没说话。很久。'},
 {k:'say',who:'D',t:'Lain kali biarin aja.|下次别管。'},
 {k:'scap',t:'Lalu dia ganti kode HP-nya. Di depanku.|然后他当着我的面，改了手机密码。'},
 // ---------- 23.40 ----------
 {k:'dark',t:'23.40|23:40',sub:'Dia sudah tidur.|他睡着了。'},
 {k:'scene',clock:'23.40',tag:'23.40 · Kamar tidur|23:40 · 卧室',tint:'night',img:'p-bed2.webp',lines:['Dia mendengkur.|他打起了呼噜。','HP-ku di bawah bantal.|我的手机在枕头底下。']},
 {k:'inner',t:'Nomor tadi. Aku sempat memotretnya.|刚才那个号码。我拍下来了。'},
 {k:'myshot',src:{k:'call',who:'B',name:'Pak Budi Supplier|Pak Budi Supplier',num:NUM,sub:'Panggilan masuk · seluler|来电 · 手机',hl:1},at:'22.35'},
 {k:'act',key:'shot',mode:'target',tgt:'shot'},
 {k:'contact',num:NUM,name:'Pak Budi|Pak Budi'},
 {k:'act',key:'save',mode:'tap',in:'contact',btn:'Simpan nomor|保存号码'},
 {k:'contact',fx:'shake',num:NUM,name:'Pak Budi|Pak Budi',res:'Sari 🌸 · adik Dinda|Sari 🌸 · Dinda的妹妹'},
 {k:'thread',th:'sari',msgs:[
   {k:'sys',ic:'',t:'14 Juni 2026|2026年6月14日'},
   {t:'Kak Laras, makasih kadonya 🥺 cantik banget|劳拉斯姐，谢谢你的礼物 🥺 太好看了',time:'20.14'},
   {me:1,t:'Sama-sama, Sari. Selamat ulang tahun ya 🎂|不客气，Sari。生日快乐 🎂',time:'20.20'}]},
 {k:'inner',t:'Waktu dia SMP, aku yang kuncir rambutnya.|她上初中的时候，我还给她扎过头发。'},
 // ---------- Thursday morning ----------
 {k:'dark',t:'Kamis, 22 Oktober|10月22日 星期四',sub:'07.05|07:05'},
 {k:'scene',clock:'07.05',tag:'07.05 · Dapur|07:05 · 厨房',img:'p2-breakfast.webp',lines:['Nayla makan sambil bernyanyi.|Nayla边吃边哼歌。','Dia tidak lepas dari HP-nya.|他的眼睛一直没离开手机。']},
 {k:'say',who:'D',t:'Nanti malam lembur. Ada audit.|今晚加班。有审计。'},
 {k:'call',clock:'10.12',fx:'shake',who:'M',name:'Mama|婆婆',num:'+62 812-2210-0315',sub:'Panggilan masuk…|来电……'},
 {k:'act',key:'mama',mode:'tap',in:'call',btn:'📞 Angkat|📞 接听'},
 {k:'call',clock:'10.12',who:'M',name:'Mama|婆婆',num:'+62 812-2210-0315',on:1},
 {k:'line',who:'M',t:'Laras, Kamis kayak biasa ya. Nayla nginep sini.|劳拉斯，星期四照旧哦。Nayla住我这儿。'},
 {k:'line',who:'L',t:'Iya, Ma.|好的，妈。'},
 // ---------- 19.20 ----------
 {k:'dark',t:'19.20|19:20',sub:'Nayla sudah dijemput Mama. Rumah sepi.|Nayla被婆婆接走了。家里很安静。'},
 {k:'lock',clock:'19.20',notifs:[{app:'Instagram',ic:'📷',title:'sari.ayu|sari.ayu',t:'sari.ayu baru saja membagikan cerita.|sari.ayu 刚发了一条快拍。'}]},
 {k:'act',key:'ig',mode:'target',tgt:'n0'},
 {k:'story',clock:'19.21',who:'S',user:'sari.ayu',img:'p2-igstory.webp',t:'nungguin 🥺|等你 🥺',ago:'2 mnt|2分钟'},
 {k:'inner',t:'Tujuh belas.|十七楼。'},
 {k:'rbook',clock:'19.25',...RB},
 {k:'act',key:'book',mode:'tap',in:'rbook',btn:'🛵 Pesan Jalanku|🛵 叫Jalanku'},
 // ---------- the ride: 14 min ----------
 {k:'rbook',shower:1,...RB,on:1},
 {k:'pop',cost:3,ic:'💬',from:'Dinda|Dinda',t:'Ras, kamu baik-baik aja kan?|劳拉斯，你还好吧？'},
 {k:'act',key:'dinda',mode:'target',tgt:'pop'},
 {k:'thread',cost:3,th:'dinda',msgs:[
   {t:'Ras, kamu baik-baik aja kan?|劳拉斯，你还好吧？',time:'19.29'},
   {t:'Sari bilang kamu sekarang sering sendirian di rumah.|Sari说你最近总是一个人在家。',time:'19.29'}]},
 {k:'inner',t:'Dari mana Sari tahu?|Sari怎么会知道？'},
 {k:'prof',cost:3,who:'S',user:'sari.ayu',bio:'Sari 🌸 · 24 · Bekasi ✨|Sari 🌸 · 24岁 · Bekasi ✨',stats:[['48','postingan|帖子'],['1.204','pengikut|粉丝'],['389','mengikuti|关注']],tiles:['p2-igstory.webp','p-rooftop.webp','p2-sisters.webp']},
 {k:'act',key:'tile',mode:'target',tgt:'t1'},
 {k:'post',cost:3,who:'S',user:'sari.ayu',img:'p-rooftop.webp',t:'Makasih udah datang 🍷|谢谢你来 🍷',date:'12 Oktober|10月12日'},
 {k:'inner',t:'Foto yang sama. Malam yang sama.|同一张照片。同一个晚上。'},
 {k:'rbook',cost:2,...RB,on:1},
 {k:'inner',t:'Kalau aku salah… aku langsung pulang.|如果是我想错了……我马上回家。'},
 {k:'dark',shower:2,t:'Sampai.|到了。',sub:'{t}'},
 // ---------- Kopi Senja ----------
 {k:'scene',shower:0,clock:'19.40',tag:'19.40 · Kopi Senja|19:40 · Kopi Senja',tint:'night',img:'p-lobby.webp',lines:['Di seberang jalan: lobi Tower B.|马路对面：B座的大堂。','Aku pesan es kopi. Tidak kuminum.|我点了冰咖啡。一口没喝。']},
 {k:'scene',clock:'19.44',tag:'19.44 · Kopi Senja|19:44 · Kopi Senja',tint:'night',img:'p2-arrive.webp',opos:'center 30%',lines:['Motor Jalanku berhenti. Dia turun.|一辆Jalanku摩托停下。他下了车。']},
 {k:'scene',clock:'19.44',tag:'19.44 · Kopi Senja|19:44 · Kopi Senja',tint:'night',img:'p2-hug.webp',opos:'center 30%',lines:['Seseorang lari dari lobi, langsung ke pelukannya.|有人从大堂跑出来，直接扑进他怀里。']},
 {k:'scap',t:'Sari.|Sari。'},
 {k:'choice',key:'c2',opts:[
   {t:'📹 Rekam|📹 录下来',re:[
     {k:'snap',t:'VID_20261022_1944 · 0:38 tersimpan|VID_20261022_1944 · 0:38 已保存'}]},
   {t:'📞 Telepon dia|📞 打给他',flag:'called',re:[
     {k:'call',clock:'19.45',who:'D',name:'Mas Dimas ❤️|Mas Dimas ❤️',num:'+62 811-2093-4417',sub:'Memanggil…|正在呼叫……'},
     {k:'scene',clock:'19.45',tag:'19.45 · Kopi Senja|19:45 · Kopi Senja',tint:'night',img:'p2-hug.webp',opos:'center 30%',lines:['Dia melihat layarnya. Menolak.|他看了一眼屏幕。挂断了。']},
     {k:'scap',bn:1,from:'Mas Dimas ❤️|Mas Dimas ❤️',time:'19.45',t:'Lagi meeting sama supplier.|在跟供应商开会。'}]}]},
 {k:'scap',t:'Mereka masuk lift bersama.|他们一起进了电梯。'},
 // ---------- 23.30 ----------
 {k:'dark',t:'23.30|23:30',sub:'Aku sudah di rumah. Lampu kumatikan.|我早就回到家了。灯关着。'},
 {k:'scene',clock:'23.30',tag:'23.30 · Ruang tamu|23:30 · 客厅',tint:'night',img:'p2-return.webp',lines:['Dia pulang. Lewat di sampingku.|他回来了。从我身边走过。','Bau sabunnya bukan sabun kami.|他身上的香皂味，不是我们家的。']},
 {k:'say',when:'flag:called',who:'D',t:'Tadi meeting, HP silent.|刚才开会，手机静音了。'},
 // ---------- hook ----------
 {k:'dark',title:1,day:'Jumat, 23 Oktober|10月23日 星期五',t:'07.10|07:10',sub:'🔔 Bel pintu.|🔔 门铃响了。'},
 {k:'scene',clock:'07.10',tag:'07.10 · Pintu depan|07:10 · 家门口',img:'p2-door.webp',lines:['Sari. Dengan koper.|Sari。拖着行李箱。']},
 {k:'say',who:'S',t:'Kak Laras.|劳拉斯姐。'},
 {k:'scene',clock:'07.10',tag:'07.10 · Pintu depan|07:10 · 家门口',img:'p2-sari-face.webp',opos:'50% 20%',lines:['Sebuah tangan di bahuku. Dari belakang.|一只手从身后搭上我的肩。']},
 {k:'say',who:'D',t:'Sari tinggal di sini dulu ya. Dia lagi ada masalah.|Sari先在我们家住一阵。她遇到点事。'},
 {k:'act',key:'hook',mode:'hold'},
 {k:'dark',cut:1,t:'',sub:''},
 {k:'epend',ep:2}
];
const IMAGES=['p-stare.webp','p-ask.webp','p-bed2.webp','p2-breakfast.webp','p2-igstory.webp','p-rooftop.webp','p2-sisters.webp','p-apt.webp','p-lobby.webp','p2-arrive.webp','p2-hug.webp','p2-return.webp','p2-door.webp','p2-sari-face.webp','p-wall.webp','av-L.webp','av-D.webp','av-S.webp','av-Dn.webp'];
const UI={
 paused:'Dijeda|已暂停',menu:'Menu|菜单',resetQ:'Mulai ulang? Progres & pilihan dihapus.|重新开始？进度和选择都会被删除。',yes:'Ya, mulai ulang|确定重置',no:'Batal|取消',
 innerL:'suara hatiku|我的心声',tr:'Transkrip|转写',me:'Aku|我',
 end1:'Bersambung|未完待续',again:'Ulangi dari awal|从头再看',epDone:'Episode 2 · selesai|第2集 · 完',nextEp:'Lanjut Episode 3 ›|继续第3集 ›',
 now:'sekarang|现在',lockDate:'Kamis, 22 Oktober|10月22日 星期四',hisPhone:'HP Mas Dimas|Dimas的手机',myGal:'Galeri · HP-ku|相册 · 我的手机',
 min:'mnt|分钟',oncall:'Tersambung|通话中',
 cNew:'Kontak baru · HP-ku|新建联系人 · 我的手机',cNum:'Nomor|号码',cName:'Nama|名字',cDup:'Nomor ini sudah tersimpan sebagai:|这个号码已保存为：',
 rFrom:'Dari|出发',rTo:'Ke|目的地',rFare:'Tarif|车费',rbNew:'Pesan perjalanan|叫车',rbOn:'Dalam perjalanan|行程中',rbDrv:'Pak Joko · B 4417 KZT|Joko师傅 · B 4417 KZT',
 posts:'Postingan|帖子',fbL:'kilas balik|闪回'
};
const CLOCK={start:'19.26',total:14,ic:'🛵',label:'Jalanku tiba dalam|Jalanku到达还有',stop:'Sudah sampai|到了'};
const EP=2,NEXT=3,HIS=[],WALL='p-wall.webp',APPS=[],LIST=[],GDAYS=[],GSHOTS={},GDEL=[],DECOR=[],CLOG_OLD=[],TICKET={},ANSWER='';
const api={EP,NEXT,HIS,WALL,CLOCK,GDAYS,GSHOTS,GDEL,TITLE,TH,SAY,BEATS,UI,TICKET,ANSWER,IMAGES,LIST,APPS,DECOR,CLOG_OLD,NUM};if(typeof module!=='undefined')module.exports=api;else root.PHONE=api;
})(typeof window!=='undefined'?window:this);
