// Di HP-nya, Namaku Cuma "Rumah" — Episode 1 only (simple v4).
// Every reader-facing string is 'id|zh' (exactly one '|'). Only two flags: call_answered, asked.
// Facts: Wed 21 Oct 2026. Shower starts 22.31, he always takes 15 min → countdown 15:00 at unlock (22.31).
// Married 12 Oct 2019 (old code 121019). Ticket Thu 19.06.25 21.10 Studio 2 F7 F8 → code 190625.
// Apps cost 4 min each, 3 fit. Call after the first app: Angkat +0 / Tolak +1 (delete). 15→11→(11|10)→(7|6)→(3|2).
(function(root){
const TITLE={t:'Di HP-nya, Namaku Cuma “Rumah”|在他手机里，我只是“家”',sub:'Tujuh tahun menikah. Lima belas menit untuk tahu semuanya.|结婚七年。十五分钟，看清一切。'};
const ANSWER='190625';
const NUM='+62 813-4471-2207';
const TH={budi:{name:'Pak Budi Supplier|Pak Budi Supplier',sub:NUM,av:'B'}};
const SAY={L:{name:'Aku|我',me:true,img:'av-L.webp'},D:{name:'Mas Dimas|Dimas',img:'av-D.webp'},W:{name:'Suara perempuan|女人的声音'}};
const TICKET={cin:'LAYAR EMAS · CINEMA',film:'“HANYA KAMU”',day:'KAMIS|星期四',date:'19.06.25',time:'21.10',studio:'2',seat:'F7 · F8'};
// lock-screen banners on HIS phone
const B1={id:'b1',app:'Chat',title:'Pak Budi Supplier|Pak Budi Supplier',t:'Mas, barang besok tetap ya?|老公，明天的货照旧吧？',time:'22.31'};
const B2={id:'b2',app:'Chat',title:'Pak Budi Supplier|Pak Budi Supplier',t:'Istrimu udah tidur?|你老婆睡了没？',time:'22.31'};
// his chat list (sorted by last message; 'Rumah' sits below the first screen)
const LIST=[
 {id:'budi',pin:1,fav:1,name:'Pak Budi Supplier|Pak Budi Supplier',t:'Istrimu udah tidur?|你老婆睡了没？',time:'22.31',un:2,unWhen:'!got:chat'},
 {id:'kain',name:'Toko Kain Sinar Jaya|Sinar Jaya布行',t:'Katun combed 30s ready 12 roll, Pak|老板，30支精梳棉有12卷现货',time:'22.10'},
 {id:'kv',name:'Grup Konveksi Cempaka|Cempaka服装厂群',t:'Rudi: Seragam SD Harapan udah 80%, Pak|Rudi：Harapan小学校服做完80%了，老板',time:'21.58'},
 {id:'eks',name:'Ekspedisi Cepat Kilat|快闪物流',t:'Paket CK00921 sudah diterima|包裹CK00921已签收',time:'21.40'},
 {id:'ratna',name:'Bu Ratna (Seragam SD)|Ratna太太（小学校服）',t:'Logonya jangan lupa dibordir ya 🙏|校徽别忘了绣上哈🙏',time:'21.31'},
 {id:'sma',name:'Alumni SMA 3 ’08|三中08届校友',t:'Hendra: Reuni jadi tgl 7 Nov ya|Hendra：同学会定在11月7号哈',time:'21.22'},
 {id:'darto',name:'Pak Haji Darto|Darto哈吉',t:'Insya Allah transfer besok, Pak|明天转账，老板',time:'21.05'},
 {id:'asep',name:'Kang Asep Jahit|裁缝Asep',t:'Siap, besok masuk jam 8|好，明天八点到',time:'20.51'},
 {id:'mama',name:'Mama|妈',t:'Dim, Minggu ke rumah ya. Bawa Nayla.|阿迪，周日回家来，带上Nayla。',time:'20.37'},
 {id:'bordir',name:'Bordir Bandung|万隆刺绣',t:'🖼 Sampel logo|🖼 校徽样品',time:'20.20'},
 {id:'rt',name:'Grup RT 05|RT 05 居委群',t:'Bu Ani: Kerja bakti Minggu jam 7 ya 🙏|Ani太太：周日早上7点大扫除哦🙏',time:'20.06'},
 {id:'rumah',name:'Rumah|Rumah',t:'Mas, pulang jam berapa? Nayla nungguin.|老公，几点回来？Nayla在等你。',time:'20.00',un:1},
 {id:'satpam',name:'Pak Satpam|保安大哥',t:'Siap, Pak 🙏|好的老板🙏',time:'19.42'},
 {id:'bengkel',name:'Bengkel Jaya Motor|Jaya修车行',t:'Mobil bisa diambil Jumat|车星期五可以取',time:'Kemarin|昨天'}
];
const VN_TR='“Kamis ya, lantai 17, jangan telat. Istrimu nggak curiga kan? Dia kan cuma ngurus rumah… oke sip.”|“星期四哦，十七楼，别迟到。你老婆没起疑吧？她不就是管管家嘛……oke sip。”';
const ROUTE='Konveksi Cempaka → Griya Sentosa Tower B|Cempaka服装厂 → Griya Sentosa B座';
const GCAP='12 Okt 2026 · 21.03 · Rumah Langit, Griya Sentosa|2026年10月12日 · 21:03 · Rumah Langit，Griya Sentosa';
// the four apps on his home screen: each costs 4 minutes; only three fit
const APPS=[
 {id:'chat',name:'Chat|聊天',ic:'💬',col:'#25a35a',cost:4,re:[
   {k:'list',at:'top'},
   {k:'act',key:'openBudi',mode:'target',in:'list',tgt:'budi'},
   {k:'thread',th:'budi',msgs:[
     {k:'sys',t:'Riwayat chat dibersihkan|聊天记录已清空'},
     {vn:'0:14',time:'21.47'},
     {t:'❤️|❤️',time:'21.47'},
     {t:'Mas, barang besok tetap ya?|老公，明天的货照旧吧？',time:'22.31'},
     {t:'Istrimu udah tidur?|你老婆睡了没？',time:'22.31'}]},
   {k:'act',key:'trans',mode:'tap',in:'chat',btn:'📝 Ubah suara ke teks|📝 语音转文字'},
   {k:'replay',th:'budi',tr:VN_TR}]},
 {id:'gal',name:'Galeri|相册',ic:'🖼',col:'#d98a1c',cost:4,re:[
   {k:'gallery',id:'k1',t:'Album tersembunyi “K” · 1 foto|隐藏相册“K” · 1张',focus:'p-album.webp',cap:GCAP},
   {k:'scene',tint:'fb',tag:'Senin, 12 Okt · 18.40|10月12日 周一 · 18:40',img:'p-dressed.webp',lines:['Ulang tahun pernikahan ketujuh.|结婚七周年。','Aku sudah dandan.|我已经化好了妆。']},
   {k:'scap',bn:1,from:'Mas Dimas ❤️|Mas Dimas ❤️',time:'18.40',t:'Sayang, maaf, malam ini lembur. Anniversary-nya kita rayain weekend ya|宝贝，对不起，今晚加班。纪念日我们周末再过哈'},
   {k:'gallery',t:'Album tersembunyi “K” · 1 foto|隐藏相册“K” · 1张',focus:'p-album.webp',cap:GCAP},
   {k:'act',key:'zoom',mode:'tap',in:'gallery',btn:'Perbesar tangannya|放大那只手'},
   {k:'gallery',id:'k2',zoomed:1,t:'Album tersembunyi “K” · diperbesar|隐藏相册“K” · 放大',focus:'p-album-hand.webp',cap:'12 Okt 2026 · 21.03|2026年10月12日 · 21:03'},
   {k:'inner',t:'Cincinnya… mirip punyaku.|这戒指……跟我的好像。'}]},
 {id:'ride',name:'Jalanku|Jalanku',ic:'🛵',col:'#0b8f62',cost:4,re:[
   {k:'ride',t:'Riwayat perjalanan|行程记录',img:'p-apt.webp',cap:'Griya Sentosa Tower B|Griya Sentosa B座',rows:[
     ['Kamis, 15 Okt · 19.30|10月15日 周四 · 19:30',ROUTE,'Rp38.000'],
     ['Senin, 12 Okt · 20.35|10月12日 周一 · 20:35',ROUTE,'Rp41.000'],
     ['Kamis, 8 Okt · 19.32|10月8日 周四 · 19:32',ROUTE,'Rp38.000'],
     ['Kamis, 1 Okt · 19.28|10月1日 周四 · 19:28',ROUTE,'Rp38.000']]}]},
 {id:'bank',name:'Arta|Arta银行',ic:'🏦',col:'#2357c9',cost:4,re:[
   {k:'bank',t:'Mutasi rekening · 3 bulan|账户明细 · 近3个月',amt:'−Rp8.500.000',rows:[
     ['05 Okt 2026|2026年10月5日','Transfer · sewa unit 17|转账 · sewa unit 17'],
     ['05 Sep 2026|2026年9月5日','Transfer · sewa unit 17|转账 · sewa unit 17'],
     ['05 Agu 2026|2026年8月5日','Transfer · sewa unit 17|转账 · sewa unit 17']],
    det:[['Penerima|收款方','PT GRIYA SENTOSA PROPERTI|PT GRIYA SENTOSA PROPERTI'],['Berita|备注','sewa unit 17|sewa unit 17',1],['Jumlah|金额','Rp8.500.000|Rp8.500.000']]}]}
];
const DECOR=[{ic:'📞',name:'Telepon|电话'},{ic:'📷',name:'Kamera|相机'},{ic:'⚙️',name:'Setelan|设置'},{ic:'🗓',name:'Kalender|日历'}];
const CLOG_OLD=[
 {name:'Mama|妈',t:'Panggilan keluar · 3:12|拨出 · 3:12',time:'Kemarin|昨天'},
 {name:'Toko Kain Sinar Jaya|Sinar Jaya布行',t:'Panggilan masuk · 1:40|来电 · 1:40',time:'Kemarin|昨天'},
 {name:'Rumah|Rumah',t:'Panggilan tak terjawab|未接来电',time:'Senin|周一',miss:1}
];
const BEATS=[
 {k:'dark',title:1,clock:'22.31',day:'Rabu, 21 Oktober|10月21日 星期三',t:TITLE.t,sub:TITLE.sub},
 // ---------- 22.31 bedroom ----------
 {k:'scene',clock:'22.31',tag:'22.31 · Kamar tidur|22:31 · 卧室',tint:'night',img:'p-bed.webp',lines:['Pintu kamar mandi menutup.|浴室门关上了。','🚿 Air menyala.|🚿 水开了。']},
 {k:'pop',style:'mine',ic:'📱',from:'HP-ku · Sari 🌸|我的手机 · Sari 🌸',t:'Mbak, besok aku nggak bisa bantu jemput Nayla ya 🙏 oke sip!|姐，明天我没法帮忙接Nayla了哈🙏 oke sip！'},
 {k:'scap',t:'HP-nya di kasur, di sebelahku. Layarnya menyala.|他的手机在床上，就在我旁边。屏幕亮了。'},
 {k:'lock',id:'lock1',fx:'shake',notifs:[B1]},
 {k:'lock',fx:'shake',notifs:[B2,B1]},
 {k:'inner',t:'…Supplier nanya aku udah tidur?|……供应商，问我睡了没？'},
 {k:'act',key:'grab',mode:'tap',in:'lock',notifs:[B2,B1],btn:'Ambil HP-nya|拿起他的手机'},
 // ---------- passcode ----------
 {k:'act',key:'pin1',mode:'pin',in:'lock',fail:1,chip:{label:'12 10 19 · tanggal nikah kami|12 10 19 · 我们的结婚纪念日',code:'121019'},chipAfter:1200},
 {k:'inner',fx:'shake',t:'Dulu ini kodenya.|以前就是这个。'},
 {k:'scene',tint:'fb',tag:'21.20 · Meja makan · tadi|21:20 · 餐桌 · 今晚早些时候',img:'p-dinner.webp',lines:['Dia membuka HP-nya, layarnya dimiringkan dariku.|他解锁手机时，把屏幕斜着避开我。','Yang sempat kulihat: 1, lalu 9.|我只看见：1，然后是9。']},
 {k:'scene',tint:'fb',tag:'Juni 2025 · Ruang cuci|2025年6月 · 洗衣间',img:'p-laundry.webp',lines:['Kantong kemejanya.|他衬衫的口袋里。','Kertas lecek, ikut tercuci.|一团皱纸，跟着洗过了。']},
 {k:'scap',ticket:1,t:'Kamis. 19.06.25.|星期四。19.06.25。'},
 {k:'act',key:'pin2',mode:'pin',in:'lock',final:1,ticket:1,ticketAfter:9000},
 // ---------- unlocked: his chat list was open ----------
 {k:'list',shower:1,at:'top'},
 {k:'hub',key:'h1'},
 // the call comes right after the first app, whichever it was
 {k:'call',id:'callScr',fx:'shake',who:'B',name:'Pak Budi Supplier|Pak Budi Supplier',num:NUM,sub:'Panggilan masuk · seluler|来电 · 手机'},
 {k:'choice',key:'call',in:'call',opts:[
   {t:'Angkat|接听',flag:'call_answered',set:{on:1},re:[
     {k:'line',who:'W',t:'Mas? …Mas?|老公？……老公？'},
     {k:'pop',style:'shout',fx:'shake',ic:'🚪',from:'Kamar mandi|浴室',t:'Gagang pintunya bergerak.|门把手动了一下。'},
     {k:'act',key:'hang',mode:'tap',in:'call',btn:'Tutup|挂断',red:1},
     {k:'clog',row:{t:'Panggilan masuk · 0:09|来电 · 0:09'},swipe:1},
     {k:'pop',style:'shout',fx:'shake',ic:'🚪',from:'Kamar mandi|浴室',t:'Gagang pintunya bergerak lagi.|门把手又动了一下。'},
     {k:'clog',row:{t:'Panggilan masuk · 0:09|来电 · 0:09'}},
     {k:'pop',style:'shout',ic:'🚿',from:'Kamar mandi|浴室',t:'Airnya masih menyala.|水还在流。'}]},
   {t:'Tolak|拒接',re:[
     {k:'clog',row:{t:'Panggilan ditolak|已拒接',miss:1}},
     {k:'act',key:'del',mode:'tap',in:'clog',btn:'Hapus dari riwayat|从记录里删掉'},
     {k:'clog',cost:1,gone:1}]}]},
 {k:'hub',key:'h2'},
 {k:'hub',key:'h3'},
 {k:'hub',key:'h4'},
 {k:'hub',peek:1},
 // ---------- the water stops ----------
 {k:'dark',shower:2,fx:'shake',t:'Air berhenti.|水停了。',sub:'{t}'},
 {k:'act',key:'restore',mode:'tap',in:'dark',btn:'Kembalikan seperti tadi|恢复成刚才的样子'},
 {k:'list',at:'top',back:1},
 {k:'list',at:'rumah',hold:1},
 {k:'list',at:'rumah',title:1},
 {k:'dark',shower:0,t:'Kukunci. Kutaruh di kasur, seperti tadi.|锁屏。放回床上，和刚才一样。',sub:'Aku berbaring.|我躺下。'},
 {k:'choice',key:'night',opts:[{t:'Pura-pura tidur|装睡',re:[
     {k:'scene',clock:'22.48',tag:'22.48 · Pura-pura tidur|22:48 · 装睡',tint:'night',img:'p-door.webp',lines:['Aku membelakanginya.|我背对着他。','Cahaya layarnya di dinding.|他手机屏幕的光映在墙上。']},
     {k:'scap',when:'flag:call_answered',bn:1,from:'Pak Budi Supplier|Pak Budi Supplier',time:'22.48',t:'Mas, tadi kok diangkat tapi diem?|老公，刚才怎么接了又不说话？'},
     {k:'scap',when:'flag:call_answered',t:'Dia menatapku. Sedetik.|他看了我一眼。一秒。'},
     {k:'scap',glimpse:1,t:'Udah. Dari tadi.|睡了。早睡了。'}]},
   {t:'Tanya dia|问他',flag:'asked',re:[
     {k:'scene',clock:'22.48',tag:'22.48 · Dia keluar|22:48 · 他出来了',tint:'night',img:'p-ask.webp',lines:['Handuk di leher.|毛巾搭在脖子上。','Dia lihat HP-nya dulu, baru aku.|他先看手机，再看我。']},
     {k:'say',who:'L',t:'Mas, Pak Budi itu siapa?|老公，Pak Budi是谁？'},
     {k:'say',who:'D',t:'Supplier kain.|布料供应商。'},
     {k:'say',who:'L',t:'Supplier kain kirim hati?|布料供应商会发爱心？'},
     {k:'scap',t:'Dia tersenyum. Di depanku, dia ganti kode HP-nya.|他笑了。当着我的面，改了手机密码。'},
     {k:'say',who:'D',t:'Kamu kebanyakan mikir, Rumah.|你想太多了，“家”。'}]}]},
 // ---------- 23.40 my phone ----------
 {k:'scene',clock:'23.40',tag:'23.40 · Kamar tidur|23:40 · 卧室',tint:'night',img:'p-bed2.webp',lines:['Dia mendengkur.|他打起了呼噜。','HP-ku di bawah selimut.|我的手机藏在被子里。']},
 {k:'fb',ref:['callScr']},
 {k:'contact',num:NUM,name:'Pak Budi|Pak Budi'},
 {k:'act',key:'save',mode:'tap',in:'contact',btn:'Simpan|保存'},
 {k:'contact',num:NUM,name:'Pak Budi|Pak Budi',res:'S…|S……',fx:'shake'},
 {k:'dark',cut:1,t:'',sub:''},
 {k:'epend',ep:1,tease:'Episode 2: Kamis malam, lantai 17.|第2集：星期四晚上，十七楼。'}
];
const IMAGES=['p-bed.webp','p-dinner.webp','p-laundry.webp','p-album.webp','p-album-hand.webp','p-dressed.webp','p-apt.webp','p-door.webp','p-ask.webp','p-bed2.webp','p-wall.webp','av-L.webp','av-D.webp'];
const UI={
 paused:'Dijeda|已暂停',menu:'Menu|菜单',reset:'Mulai ulang dari awal|从头开始',resetQ:'Mulai ulang? Progres & pilihan dihapus.|重新开始？进度和选择都会被删除。',yes:'Ya, mulai ulang|确定重置',no:'Batal|取消',
 innerL:'suara hatiku|我的心声',tr:'Transkrip|转写',vn:'Pesan suara|语音消息',zoomHint:'ketuk untuk perbesar|点开看大图',gallery:'Galeri|相册',me:'Aku|我',
 end1:'Bersambung|未完待续',again:'Ulangi dari awal|从头再看',
 tkDay:'HARI|星期',tkDate:'TANGGAL|日期',tkTime:'JAM|时间',tkSeat:'KURSI|座位',
 pinWrong:'Kode salah|密码错误',pinEnter:'Masukkan kode sandi|输入密码',ticketTap:'ketuk tiketnya|点一下票根',
 now:'sekarang|现在',chats:'Chat|聊天',earlier:'Sebelumnya|更早',epDone:'Episode 1 · selesai|第1集 · 完',lockDate:'Rabu, 21 Oktober|10月21日 星期三',
 pick:'Tiap aplikasi = 4 menit|每个App = 4分钟',online:'terakhir dilihat hari ini|今天在线过',hisPhone:'HP Mas Dimas|Dimas的手机',search:'Cari|搜索',
 showerOff:'air berhenti|水停了',min:'mnt|分钟',
 bankAcc:'Rekening utama · DIMAS PRATAMA|主账户 · DIMAS PRATAMA',
 incoming:'Panggilan masuk…|来电……',oncall:'Tersambung · aku diam|已接通 · 我没出声',callEnd:'Panggilan berakhir|通话结束',
 clogT:'Telepon · Terbaru|电话 · 最近通话',today:'Hari ini|今天',del:'Hapus|删除',deleted:'1 riwayat dihapus|已删除1条记录',
 cNew:'Kontak baru · HP-ku|新建联系人 · 我的手机',cNum:'Nomor|号码',cName:'Nama|名字',cDup:'Nomor ini sudah tersimpan sebagai:|这个号码已保存为：',
 fbL:'kilas balik|闪回'
};
const api={TITLE,TH,SAY,BEATS,UI,TICKET,ANSWER,IMAGES,LIST,APPS,DECOR,CLOG_OLD,NUM};if(typeof module!=='undefined')module.exports=api;else root.PHONE=api;
})(this);
