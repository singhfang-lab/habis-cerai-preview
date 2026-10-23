// Di HP-nya, Namaku Cuma "Rumah" — phone-first serial, episodes 1–3 (script v3.1).
// The screen is mostly Dimas's phone in Laras's hand; off-phone moments are 'scene' cards; 'fb' re-shows an earlier frame (by beat id).
// Every reader-facing string is 'id|zh' (exactly one '|'). Flags come from choices (opt.flag), persist with the reader's state, and gate later beats via when:'flag:X'.
// Facts: Wed 21 Oct 2026, 22.31 shower (he always takes 15 min → 22.46). Married 12 Oct 2019 (code used to be 121019).
// Ticket Thu 19 Jun 2025 21.10 → phone code 190625, calculator vault 2110. Thursdays: 1/8/15 Oct; ep2 = Thu 22 Oct; ep3 = Sat 24 Oct.
(function(root){
// ===== story title: change it here only (title card, browser tab, end card) =====
const TITLE={t:'Di HP-nya, Namaku Cuma “Rumah”|在他手机里，我只是“家”',sub:'Tujuh tahun menikah. Lima belas menit untuk tahu semuanya.|结婚七年。十五分钟，看清一切。'};
const ANSWER='190625';
const TH={
 budi:{name:'Pak Budi Supplier|Pak Budi Supplier',sub:'+62 813-xxxx-2207|+62 813-xxxx-2207',av:'B'},
 mas:{name:'Mas Dimas ❤️|Mas Dimas ❤️',sub:'HP-ku|我的手机',img:'av-D.webp'},
 sari:{name:'Sari 🌸|Sari 🌸',sub:'HP-ku · online|我的手机 · 在线',av:'S'}
};
const SAY={L:{name:'Aku|我',me:true,img:'av-L.webp'},D:{name:'Mas Dimas|Dimas',img:'av-D.webp'},S:{name:'Sari|Sari',tag:'adik Dinda|Dinda的妹妹',ini:'S'},N:{name:'Dinda|Dinda',tag:'sahabatku|我的闺蜜',ini:'Di'},B:{name:'Pak Budi Supplier|Pak Budi Supplier',ini:'B'}};
const TICKET={cin:'LAYAR EMAS · CINEMA',film:'“HANYA KAMU”',day:'KAMIS|星期四',date:'19.06.25',time:'21.10',studio:'STUDIO 2',seat:'F7 · F8',price:'2 × Rp50.000'};
const N_=(id,t,time,title)=>({id,app:'Chat',title:title||'Pak Budi Supplier|Pak Budi Supplier',t,time});
const BUDI1=N_('b1','Mas, besok jadi datang kan? Aku pakai yang Mas beliin ❤️|老公，明天来的吧？我穿你买的那件❤️','22.33');
const RINA1={id:'r1',app:'Chat',title:'Rina Admin Konveksi|Rina · 工坊行政',t:'Pak, kunci gudang Cempaka saya bawa pulang ya. Besok saya buka jam 7 🙏|老板，Cempaka仓库钥匙我带回家了哈。明天七点我来开门🙏'};
const TP=N_('t1','📷 Foto|📷 图片','23.58');
// Dimas's chat list
const LIST=[
 {id:'budi',pin:1,name:'Pak Budi Supplier|Pak Budi Supplier',t:'🎤 Pesan suara (0:14)|🎤 语音消息（0:14）',time:'22.33',un:1},
 {id:'kain',name:'Toko Kain Sinar Jaya|Sinar Jaya布行',t:'Pak, katun combed 30s ready 12 roll ya|老板，30支精梳棉有12卷现货',time:'20.15'},
 {id:'rt',name:'Grup RT 05 Griya Asri|Griya Asri 05居委群',t:'Bu Ani: Kerja bakti Minggu jam 7 ya bapak-bapak 🙏|Ani太太：周日早上7点大扫除哦各位🙏',time:'19.58'},
 {id:'rumah',name:'Rumah|Rumah（家）',num:'+62 812-xxxx-0312',t:'Mas, pulangnya beliin susu Nayla ya|老公，回来给Nayla买牛奶哈',time:'17.12'},
 {id:'satpam',name:'Pak Satpam Komplek|小区保安',t:'Siap Pak 🙏|好的老板🙏',time:'Kemarin|昨天'},
 {id:'mama',name:'Mama|妈',t:'Dim, Minggu ke rumah ya. Bawa Nayla.|阿迪，周日回家来，带上Nayla。',time:'Senin|周一'}
];
// what the reader is holding, shown on each episode-end card (only lines whose `when` is true)
const RECAP=[
 {ep:1,when:'grab=0',t:'Kuambil langsung — sempat buka satu aplikasi lagi|立刻拿起——多看了一个App'},
 {ep:1,when:'grab=1',t:'Kutaruh dulu — tiga menit hilang, tapi aku lihat “Jangan lupa hapus chat ya.”|先放回去——丢了三分钟，但看到了“记得删聊天记录”'},
 {ep:1,when:'ring=0',t:'Telepon kuangkat diam-diam — tercatat “terjawab”|偷偷接了电话——记录里留下“已接通”'},
 {ep:1,when:'ring=1',t:'Telepon kutolak — dia kirim chat cemburu|拒接了——她发来吃醋的文字'},
 {ep:1,when:'ring=2',t:'Kubiarkan berdering — pesan suara 0:06, tanpa jejak|让它响——6秒语音，没留痕迹'},
 {ep:1,when:'flag:SEWA',t:'Bukti: sewa unit B-17-08, Rp8,5 juta tiap bulan|证据：B-17-08 房租，每月850万'},
 {ep:1,when:'flag:PIYAMA',t:'Bukti: piyama dusty pink, dikirim ke lantai 17|证据：烟粉色睡衣，寄到17楼'},
 {ep:1,when:'night=0',t:'Pura-pura tidur — kudengar dia bilang “Udah. Dari tadi.”|装睡——亲耳听他说“睡了，早睡了”'},
 {ep:1,when:'night=1',t:'Kutanya — dia ganti kode, tapi nggak bilang “bukan”|问了——他改了密码，却没说“不是”'},
 {ep:2,when:'flag:LOBI',t:'Video 0:38: mereka masuk lift, berhenti di 17|38秒视频：两人进电梯，停在17楼'},
 {ep:2,when:'flag:BOHONG',t:'Screenshot 19.46: “Lagi meeting sama supplier”|截图19:46：“在跟供应商开会”'},
 {ep:3,when:'ring2=0',t:'Sari bilang cincinnya “desain sendiri”|Sari说戒指是“自己设计的”'},
 {ep:3,when:'flag:DINDA_LIHAT',t:'Dinda melihat dua cincin yang sama persis|Dinda看见了两枚一模一样的戒指'},
 {ep:3,when:'flag:TESTPACK',t:'Foto test pack — dan dia menyebut “Sar” dalam tidur|验孕棒照片——还有他梦里那声“Sar”'},
 {ep:3,when:'!flag:TESTPACK',t:'Nggak ada foto test pack — aku cuma tahu|没有验孕棒照片——我只是知道了'}
];
const ROWS=['Kamis, 15 Okt · 19.41|星期四 10月15日 · 19:41','Kamis, 8 Okt · 19.38|星期四 10月8日 · 19:38','Kamis, 1 Okt · 19.45|星期四 10月1日 · 19:45'];
const ROUTE='Gudang Cempaka → Griya Sentosa Residence, Tower B|Cempaka仓库 → Griya Sentosa公寓 B座';
const GK={t:'Album “K” · 3 foto|相册“K” · 3张',focus:'p-k1.webp',cap:'12 Okt 2026 · 20.47 · Rumah Langit|2026年10月12日 · 20:47 · Rumah Langit',items:[{img:'p-k3.webp',cap:'19 Jun 2025 · 21.04|2025年6月19日 · 21:04'},{img:'p-pajama.webp',cap:'20 Okt 2026|2026年10月20日'}]};
const BEATS=[
 {k:'dark',title:1,clock:'22.31',day:'Rabu, 21 Oktober|10月21日 星期三',t:TITLE.t,sub:TITLE.sub},
 // ---------- 22.31 cold open ----------
 {k:'scene',clock:'22.31',shower:1,tag:'22.31 · Kamar tidur|22:31 · 卧室',tint:'night',img:'p-bed.webp',lines:['Pintu kamar mandi menutup. Air mulai mengalir.|浴室门关上。水声响起。','HP-nya di nakas. Telungkup.|他的手机在床头柜上，扣着放。']},
 {k:'dark',cost:2,fx:'shake',t:'BZZT.|嗡——',sub:'Cahaya bocor dari bawah HP yang telungkup.|扣着的手机底下，漏出一圈光。'},
 {k:'lock',id:'lock1',fx:'flash',notifs:[BUDI1]},
 {k:'inner',t:'Supplier kain nggak kirim hati. Dan Mas Dimas nggak pernah mandi lebih dari lima belas menit.|卖布的供应商不会发红心。而他洗澡，从没超过十五分钟。'},
 {k:'choice',key:'grab',in:'lock',opts:[
   {t:'Ambil sekarang|现在就拿',re:[]},
   {t:'Taruh lagi|放回去',re:[
     {k:'dark',t:'Kutaruh lagi.|我把它放了回去。',sub:'Telungkup. Seperti tadi.|扣着。和刚才一样。'},
     {k:'lock',cost:3,fx:'shake',notifs:[N_('b4','Mas???|老公？？？','22.36'),N_('b3','Jangan lupa hapus chat ya.|记得删聊天记录哦。','22.35'),N_('b2','Mas? 🥺|老公？🥺','22.34'),BUDI1]},
     {k:'inner',t:'Tiga kali lagi. Kuambil juga akhirnya.|又震了三次。我还是拿了起来。'}]}]},
 // ---------- passcode ----------
 {k:'act',key:'pin1',mode:'pin',in:'lock',fail:1,q:'Enam angka. Dulu kodenya tanggal nikah kami. Aku yang memilihkannya.|六位数。以前，密码是我们的结婚纪念日。是我帮他设的。',chip:{label:'12·10·19|12·10·19',code:'121019'},chipAfter:1800},
 {k:'inner',fx:'shake',t:'Dia ganti. Kapan?|他换了。什么时候换的？'},
 {k:'lock',cost:1,notifs:[RINA1,BUDI1]},
 {k:'inner',t:'Rina. Admin baru konveksi ibu mertuaku. Dua puluh enam tahun. Mas Dimas sendiri yang mewawancarainya.|Rina，婆婆服装厂新来的行政，26岁。是他亲自面试的。'},
 {k:'scene',tint:'fb',tag:'19.12 · Meja makan · tadi|19:12 · 餐桌 · 今晚早些时候',img:'p-dinner.webp',lines:['Dia membuka HP sambil memiringkannya dariku.|他解锁时，把屏幕斜着避开我。','Yang sempat kulihat cuma: satu, lalu sembilan.|我只看清了：1，然后9。']},
 {k:'scene',id:'laundry',tint:'fb',tag:'19.40 · Ruang cuci · tadi|19:40 · 洗衣间 · 今晚早些时候',img:'p-ring.webp',lines:['Kulepas cincin kawin sebelum merendam cucian — desainnya Mas Dimas gambar sendiri di balik nota konveksi.|泡衣服前我摘下婚戒——那款式是他亲手画在服装厂单据背面的。','Di kantong kemejanya ada sobekan tiket. Kuselipkan ke laci nakas.|他衬衫口袋里有半张电影票。我顺手塞进了床头柜抽屉。']},
 {k:'act',key:'drawer',mode:'tap',in:'lock',notifs:[RINA1,BUDI1],btn:'Buka laci nakas|拉开床头柜抽屉'},
 {k:'memo',cost:1,t:'Kamis. 19.06.25.|星期四。19.06.25。'},
 {k:'inner',fx:'shake',t:'Satu. Sembilan.|1。9。'},
 {k:'act',key:'pin3',mode:'pin',in:'lock',final:1,ticket:1,ticketAfter:5000},
 {k:'home',wall:1},
 {k:'inner',t:'Bukan tanggal pernikahan kami. Tanggal dia nonton berdua dengan orang lain.|不是我们的结婚纪念日。是他和别人看电影的那一天。'},
 // ---------- chat list ----------
 {k:'list'},
 {k:'list',hl:'rumah'},
 {k:'inner',fx:'shake',t:'Itu nomorku. Bukan Laras. Bukan Sayang. Rumah.|那是我的号码。不是Laras，不是宝贝。是“家”。'},
 {k:'act',key:'openBudi',mode:'target',in:'list',tgt:'budi'},
 {k:'sys',th:'budi',clear:1,t:'Riwayat chat dibersihkan · hari ini 18.52|聊天记录已清空 · 今天 18:52'},
 {k:'msg',th:'budi',time:'22.20',vn:'0:14',t:''},
 {k:'msg',th:'budi',time:'22.33',t:'Mas, besok jadi datang kan? Aku pakai yang Mas beliin ❤️|老公，明天来的吧？我穿你买的那件❤️'},
 {k:'act',key:'play',mode:'tap',in:'chat',th:'budi',btn:'🔈 Putar · volume paling kecil, tempel di telinga|🔈 播放 · 音量调到最小，贴着耳朵'},
 {k:'replay',id:'vnPlay',th:'budi',tr:'“Mas… fotoku kemarin udah dihapus, kan? Hati-hati lho, istrimu kan rajin beresin barang-barangmu. Eh, tapi paling dia cuma beresin cucian. (tertawa kecil) Oke sip, besok lihat aslinya aja.”|“老公……我昨天那张照片你删了吧？小心点哦，你老婆不是挺勤快收拾你东西的嘛。哎不对，她也就会收拾收拾脏衣服。（轻笑）oke sip，明天来看真人吧。”'},
 {k:'inner',fx:'shake',t:'Dia tertawa.|她在笑。'},
 {k:'act',key:'photo',mode:'tap',in:'chat',th:'budi',btn:'📸 Foto layarnya pakai HP-ku|📸 用我的手机拍下屏幕'},
 {k:'inner',fx:'flash',t:'Mode senyap. Pesan suaranya, dan nomornya di atas. Dua foto.|静音。语音，还有上面的号码。两张。'},
 {k:'pop',id:'sariPop',style:'mine',cost:1,ic:'📱',from:'HP-ku · Sari 🌸|我的手机 · Sari 🌸',t:'Mbak Laras, Kamis besok aku nggak bisa bantu jemput Nayla ya 🙏 oke sip, Mbak! 😘|Laras姐，明天星期四我没法帮忙接Nayla了哈🙏 oke sip，姐！😘',fx:'shake'},
 // ---------- 22.38 the call ----------
 {k:'call',who:'B',cost:2,name:'Pak Budi Supplier|Pak Budi Supplier',sub:'Panggilan suara WhatsApp|WhatsApp 语音来电',fx:'shake'},
 {k:'choice',key:'ring',in:'call',opts:[
   {t:'Angkat, jangan bersuara|接起来，不出声',re:[
     {k:'line',who:'B',t:'Mas? …Kok diem? Lagi mandi, ya?|老公？……怎么不说话？在洗澡吧？'},
     {k:'line',id:'callA',who:'B',t:'Besok aku tunggu di atas. Jangan bawa mobil.|明天我在楼上等你。别开车来。'},
     {k:'inner',t:'Klik. Dia yang menutup. Di riwayat: “terjawab · 0:21”.|咔。她挂了。通话记录：“已接通 · 0:21”。'}]},
   {t:'Tolak|拒接',re:[
     {k:'msg',id:'callB',th:'budi',t:'Kok ditolak?? Lagi sama istrimu ya 🙄 Besok aku tunggu di atas. Jangan bawa mobil.|怎么挂我？？跟你老婆在一起吧🙄 明天我在楼上等你。别开车来。'}]},
   {t:'Biarkan berdering|让它响',re:[
     {k:'sys',th:'budi',t:'Panggilan suara tak terjawab|未接语音通话'},
     {k:'msg',id:'callC',th:'budi',vn:'0:06',t:'',tr:'“Mas? Besok aku tunggu di atas. Jangan bawa mobil.”|“老公？明天我在楼上等你。别开车来。”'}]}]},
 {k:'inner',t:'Suaranya berbisik, nyaris cuma napas. Logat Jakarta. Rina orang Medan — keras, cepat.|她压着嗓子，几乎只剩气声。雅加达口音。Rina是棉兰人，嗓门大、语速快。'},
 {k:'inner',fx:'shake',t:'Bukan Rina.|不是Rina。'},
 // ---------- rides ----------
 {k:'ride',cost:1,t:'Riwayat perjalanan|行程记录',img:'p-apt.webp',cap:'Griya Sentosa Residence, Tower B|Griya Sentosa公寓 B座',rows:ROWS.map((r,j)=>[r,ROUTE,['Rp38.000','Rp38.000','Rp41.000'][j]])},
 {k:'inner',t:'Tiap Kamis. Mobilnya ditinggal di gudang. Besok Kamis.|每个星期四。车留在仓库。明天就是星期四。'},
 // ---------- one more app (only if she grabbed it at once) ----------
 {k:'home',when:'grab=0',cost:1,hl:'apps'},
 {k:'choice',key:'app2',when:'grab=0',lab:'Cuma cukup buat satu lagi.|只够再看一个。',opts:[
   {t:'🏦 Arta Mobile|🏦 Arta银行',flag:'SEWA',re:[
     {k:'bank',id:'bankV',cost:1,t:'Mutasi rekening · 3 bulan terakhir|账户明细 · 最近3个月',rows:[
       ['05 Okt 2026|2026年10月5日','SEWA UNIT B-17-08 GRIYA SENTOSA|SEWA UNIT B-17-08 GRIYA SENTOSA'],
       ['05 Sep 2026|2026年9月5日','SEWA UNIT B-17-08 GRIYA SENTOSA|SEWA UNIT B-17-08 GRIYA SENTOSA'],
       ['05 Agu 2026|2026年8月5日','SEWA UNIT B-17-08 GRIYA SENTOSA|SEWA UNIT B-17-08 GRIYA SENTOSA']],
      det:[['Penerima|收款方','GRIYA SENTOSA RESIDENCE'],['Unit|单元','Tower B · Lt. 17 · B-17-08|B座 · 17楼 · B-17-08',1],['Tiap bulan|每月','Rp8.500.000']]},
     {k:'inner',cost:1,t:'Uang belanjaku tiga juta — itu pun pakai struk.|我的家用才三百万——还得交小票。'}]},
   {t:'🛍 Tokoria|🛍 Tokoria购物',flag:'PIYAMA',re:[
     {k:'shop',id:'shopV',cost:1,t:'Pesanan selesai · diterima 20 Okt|订单已完成 · 10月20日签收',img:'p-pajama.webp',item:'Set Piyama Satin · Dusty Pink · M|缎面睡衣套装 · 烟粉色 · M码',price:'Rp389.000',addr:'Gudang Pak Budi|Pak Budi仓库',addr2:'Griya Sentosa Residence, Tower B, Lt. 17|Griya Sentosa公寓 B座 17楼'},
     {k:'inner',cost:1,t:'“Aku pakai yang Mas beliin.”|“我穿你买的那件。”'}]}]},
 {k:'inner',when:'grab=1',t:'Nggak ada waktu.|没时间了。'},
 // ---------- the calculator ----------
 {k:'inner',cost:1,t:'Di folder “Kerja” ada Kalkulator. Mas Dimas ngitung pakai kepala.|“工作”文件夹里有个计算器。他算账从来不用计算器。'},
 {k:'act',key:'openCalc',mode:'target',in:'home',folder:1,tgt:'calc'},
 {k:'act',key:'vault',mode:'pin',in:'calc',code:'2110',final:1,ticket:1,ticketAfter:9000,lab:'Sandi · 4 angka|密码 · 4位',q:'Petunjuk sandi: “jam pertama kita”|密码提示：“我们的第一个时刻”'},
 {k:'gallery',id:'k1',...GK},
 {k:'sys',th:'mas',clear:1,t:'HP-ku · Senin, 12 Oktober|我的手机 · 10月12日 周一'},
 {k:'msg',th:'mas',mine:true,time:'18.02',t:'Mas, Rumah Langit masih ada meja jam 8. Aku pesan ya? 🥰|老公，Rumah Langit 八点还有位子，我订了哈？🥰'},
 {k:'msg',th:'mas',time:'21.47',t:'Maaf Ras, lembur. Aku lupa hari ini tanggal 12 🙏|对不起Ras，加班。我忘了今天是12号🙏'},
 {k:'msg',th:'mas',mine:true,time:'21.48',t:'Nggak apa-apa, Mas.|没事的，老公。'},
 {k:'inner',fx:'shake',t:'Dia nggak lupa.|他没有忘。'},
 {k:'gallery',...GK},
 {k:'inner',t:'Baru sekarang tanganku gemetar.|直到这时，我的手才开始抖。'},
 {k:'act',key:'zoom',mode:'tap',in:'gallery',btn:'Perbesar tangan itu|放大那只手'},
 {k:'gallery',id:'k2',hl:1,t:'Album “K” · diperbesar|相册“K” · 放大',focus:'p-k2.webp',cap:'12 Okt 2026 · 20.47|2026年10月12日 · 20:47',items:[]},
 {k:'inner',fx:'shake',t:'Cincinnya… mirip punyaku.|那枚戒指……和我的很像。'},
 // ---------- 22.46 the water stops ----------
 {k:'dark',clock:'22.46',shower:2,fx:'shake',t:'Air berhenti.|水声停了。',sub:'22.46.|22:46。'},
 {k:'pop',style:'shout',ic:'🚿',from:'Mas Dimas · kamar mandi|老公 · 浴室里',t:'“Ras? Handukku mana?”|“Ras？我毛巾呢？”'},
 {k:'act',key:'facedown',mode:'drag',in:'lock',shower:0,notifs:[],q:'Kunci. Telungkupkan. Persis seperti tadi.|锁屏。扣回去。和刚才一模一样。',btn:'Seret ke bawah: telungkupkan|往下拖：扣回去'},
 {k:'dark',t:'“Di gantungan, Mas.”|“在挂钩上，老公。”',sub:'Suaraku biasa saja. Aku kaget sendiri.|我的声音很正常。连我自己都吓了一跳。'},
 {k:'choice',key:'night',opts:[{t:'Pura-pura tidur|装睡',re:[]},{t:'Tanya sekarang|现在就问',re:[]}]},
 // --- A: pretend to sleep ---
 {k:'scene',when:'night=0',clock:'22.52',tag:'22.52 · Pura-pura tidur|22:52 · 装睡',tint:'night',img:'p-door.webp',lines:['Kasur melesak.|床垫一沉。','Layar HP-nya memantul di kaca jendela yang gelap.|他手机的屏幕，映在漆黑的窗玻璃上。']},
 {k:'scap',when:'night=0&ring=0',bn:1,from:'Pak Budi Supplier|Pak Budi Supplier',t:'Tadi kok diangkat tapi diem?|刚才怎么接了又不说话？'},
 {k:'scap',when:'night=0&ring=0',t:'Dia menatap punggungku lama. Lalu mengetik: “Sinyal jelek.”|他盯着我的背看了很久。然后打字：“信号不好。”'},
 {k:'scap',when:'night=0',bn:1,from:'Pak Budi Supplier|Pak Budi Supplier',t:'Istrimu belum tidur?|你老婆还没睡？'},
 {k:'scap',when:'night=0',t:'“Udah. Dari tadi.”|“睡了。早睡了。”'},
 {k:'scap',when:'night=0',t:'Dia mencium keningku. Wangi sabunku.|他吻了我的额头。是我的沐浴露的味道。'},
 {k:'inner',when:'night=0',t:'Satu kebohongan lagi. Kali ini aku menyaksikannya sendiri.|又一个谎。这一次，我亲眼看着他说出口。'},
 // --- B: ask now ---
 {k:'scene',when:'night=1',clock:'22.48',tag:'22.48 · Dia keluar|22:48 · 他出来了',tint:'night',img:'p-confront.webp',lines:['Handuk di leher. Matanya ke HP, lalu ke aku.|毛巾搭在脖子上。眼睛先看手机，再看我。','Aku duduk di tepi ranjang.|我坐在床边。']},
 {k:'say',when:'night=1',who:'L',t:'Mas, Pak Budi itu siapa?|老公，Pak Budi 是谁？'},
 {k:'say',when:'night=1',who:'D',t:'Supplier kain.|卖布的。'},
 {k:'say',when:'night=1',who:'L',t:'Supplier kain kirim hati?|卖布的会发红心？'},
 {k:'say',when:'night=1',who:'D',t:'Kamu buka HP-ku? …Ras, kamu capek. Tidur.|你翻我手机了？……Ras，你累了。睡吧。'},
 {k:'scap',when:'night=1',t:'Di depanku dia mengganti kode sandinya, layar menempel di dadanya.|他当着我的面改了密码，屏幕贴着胸口。'},
 {k:'scap',when:'night=1',fx:'shake',t:'Dia nggak bilang “bukan”.|他没说“不是”。'},
 // ---------- 23.20 bathroom floor ----------
 {k:'scene',clock:'23.20',tag:'23.20 · Lantai kamar mandi · HP-ku|23:20 · 浴室地上 · 我的手机',tint:'night',img:'p-floor.webp',lines:['Dia sudah mendengkur.|他已经打呼了。','Aku duduk di lantai kamar mandi yang masih basah.|我坐在还湿着的浴室地上。']},
 {k:'contact',num:'+62 813-xxxx-2207',name:'Pak Budi|Pak Budi'},
 {k:'act',key:'saveNum',mode:'tap',in:'contact',btn:'Simpan ke kontak|存为联系人'},
 {k:'contact',num:'+62 813-xxxx-2207',name:'Pak Budi|Pak Budi',res:'S…|S……',fx:'shake'},
 {k:'epend',ep:1,tease:'Kamis malam. Lantai tujuh belas.|星期四晚上。十七楼。'},
 // ======================= EPISODE 2 =======================
 {k:'ep',ep:2,clock:'23.21',day:'Rabu, 21 Oktober|10月21日 星期三'},
 {k:'contact',num:'+62 813-xxxx-2207',name:'Pak Budi|Pak Budi',res:'Sari 🌸 (adik Dinda)|Sari🌸（Dinda的妹妹）',open:1},
 {k:'fb',ref:['sariPop']},
 {k:'fb',ref:['vnPlay']},
 {k:'inner',t:'Adik sahabatku. Lipstik pertamanya, aku yang ngajarin.|我闺蜜的妹妹。她的第一支口红，是我教她涂的。'},
 {k:'scene',clock:'06.40',day:'Kamis, 22 Oktober|10月22日 星期四',tag:'06.40 · Kamis · Dapur|06:40 · 星期四 · 厨房',tint:'warm',img:'p-kitchen.webp',lines:['Kopi, jam tangan, kotak bekal Nayla.|咖啡，手表，Nayla的饭盒。','Pagi yang sama seperti seribu pagi lainnya.|和过去一千个早晨一模一样。']},
 {k:'say',who:'D',t:'Ras, nanti malam lembur ya. Nggak usah ditunggu.|Ras，今晚加班，别等我。'},
 {k:'say',who:'L',t:'Iya, Mas.|好，老公。'},
 {k:'status',clock:'07.10',from:'Sari 🌸|Sari 🌸',t:'Kamis, hari favoritku 🤍|星期四，我最喜欢的一天🤍'},
 {k:'scene',clock:'19.30',tag:'19.30 · Griya Sentosa · kafe lobi|19:30 · Griya Sentosa · 大堂咖啡角',tint:'night',img:'p-lobby.webp',lines:['Nayla kutitip ke Bi Inah.|Nayla 托给了 Bi Inah。','Aku duduk membelakangi pintu, melihat dari pantulan kaca.|我背对门坐，从玻璃反光里看。']},
 {k:'scap',clock:'19.41',img:'p-ojek.webp',t:'19.41. Ojek berhenti. Mas Dimas turun, masih pakai helm ojek.|19:41，一辆摩的停下。老公下车，还戴着摩的头盔。'},
 {k:'fb',ref:['callA','callB','callC']},
 {k:'scap',img:'p-lift.webp',t:'Lift terbuka. Sari. Kardigan krem, di bawahnya satin dusty pink.|电梯门开。Sari，米色开衫，里面是烟粉色缎面。'},
 {k:'scap',t:'Dia menggandeng lengan Mas Dimas seperti sudah seribu kali.|她挽住老公的胳膊，像已经挽过一千次。'},
 {k:'fb',when:'flag:PIYAMA',ref:['shopV']},
 {k:'fb',when:'!flag:PIYAMA',ref:['lock1']},
 {k:'choice',key:'lobi',opts:[
   {t:'Rekam diam-diam|偷偷录像',flag:'LOBI',re:[
     {k:'cam',img:'p-rec.webp',rec:'0:38'},
     {k:'inner',t:'Wajah keduanya jelas.|两张脸都拍得很清楚。'}]},
   {t:'Telepon Mas Dimas sekarang|现在就给他打电话',flag:'BOHONG',re:[
     {k:'call',who:'D',out:1,name:'Mas Dimas ❤️|Mas Dimas ❤️',sub:'Memanggil…|正在呼叫……'},
     {k:'scene',tag:'19.45 · Pantulan kaca|19:45 · 玻璃反光',tint:'night',img:'p-lift.webp',lines:['Dia melihat layarnya: “Rumah”. Lalu memperlihatkannya ke Sari.|他看着屏幕上的“家”，举给Sari看。','Sari tertawa. Jempolnya menekan merah.|Sari笑了。他的拇指按下红色。']},
     {k:'call',who:'D',out:1,ended:1,name:'Mas Dimas ❤️|Mas Dimas ❤️',sub:'Ditolak|已拒接'},
     {k:'msg',th:'mas',clock:'19.46',time:'19.46',t:'Lagi meeting sama supplier, Ras. Nanti kutelepon.|在跟供应商开会，Ras。待会打给你。'},
     {k:'act',key:'shot2',mode:'tap',in:'chat',th:'mas',btn:'📸 Screenshot|📸 截图'},
     {k:'inner',fx:'flash',t:'19.46. Lima menit setelah ojeknya berhenti.|19:46。摩的停下五分钟后。'}]}]},
 {k:'scene',tag:'19.47 · Angka di atas lift|19:47 · 电梯上方的数字',tint:'night',img:'p-lobby.webp',lines:['15… 16… 17.|15……16……17。','Berhenti.|停了。'],fx:'shake'},
 {k:'msg',th:'sari',clock:'20.07',time:'20.07',t:'Mbak! Sabtu syukuran rumah baru Kak Dinda ya, wajib dateng! Aku masakin rendang kesukaan Mbak 😘|姐！星期六Dinda姐新家的感恩宴，一定要来哦！我给你做你最爱的仁当😘'},
 {k:'inner',fx:'shake',t:'Dia mengetik itu dari lantai tujuh belas.|她是在十七楼打的这行字。'},
 {k:'draft',th:'sari',t:'Iya, Sar. Aku pasti datang.|好的 Sar。我一定来。'},
 {k:'act',key:'send2',mode:'tap',in:'chat',th:'sari',btn:'Kirim ➤|发送 ➤'},
 {k:'msg',th:'sari',mine:true,t:'Iya, Sar. Aku pasti datang.|好的 Sar。我一定来。'},
 {k:'epend',ep:2,tease:'Sabtu. Rendang. Dan sebuah cincin.|星期六。仁当。还有一枚戒指。'},
 // ======================= EPISODE 3 =======================
 {k:'ep',ep:3,clock:'11.00',day:'Sabtu, 24 Oktober|10月24日 星期六'},
 {k:'scene',clock:'11.00',tag:'11.00 · Sabtu · Rumah baru Dinda|11:00 · 星期六 · Dinda的新家',tint:'warm',img:'p-house.webp',lines:['Sandal berjajar di teras. Bau rendang dari dalam.|门廊上排满了拖鞋。屋里飘出仁当的香味。','Sari yang membukakan pintu.|开门的是Sari。']},
 {k:'say',who:'S',t:'Mbak Laras! Ya ampun, cantik banget hari ini.|Laras姐！天哪，今天好漂亮。'},
 {k:'scap',t:'Cium pipi kanan, pipi kiri. Lalu dia menoleh ke suamiku.|左脸贴一下，右脸贴一下。然后她转向我老公。'},
 {k:'say',who:'S',t:'Mas Dimas. Silakan masuk.|Dimas哥，请进。'},
 {k:'inner',t:'Kami berdua sama-sama pura-pura. Bedanya, dia lebih lama latihan.|我们俩都在演。区别是，她练得比我久。'},
 {k:'scene',clock:'11.40',tag:'11.40 · Dapur|11:40 · 厨房',tint:'warm',img:'p-esbuah.webp',lines:['Sari menyodorkan semangkuk es buah.|Sari递来一碗水果冰。','Jarinya melingkari mangkuk.|她的手指托着碗。']},
 {k:'say',who:'S',t:'Buat Mbak, spesial.|给姐的，特制。'},
 {k:'fb',ref:['k2']},
 {k:'fb',ref:['laundry']},
 {k:'choice',key:'ring2',opts:[
   {t:'Tanya: “Cincinmu cantik, Sar. Dari siapa?”|问：“戒指真好看，Sar，谁送的？”',re:[
     {k:'say',who:'L',t:'Cincinmu cantik, Sar. Dari siapa?|戒指真好看，Sar，谁送的？'},
     {k:'say',who:'S',t:'Aku desain sendiri dong, Mbak. Iseng-iseng.|我自己设计的呀，姐，随便画画。'},
     {k:'scap',fx:'shake',t:'Di ruang tengah, teh Mas Dimas tumpah.|客厅里，老公的茶洒了。'}]},
   {t:'Taruh tanganku di sebelah tangannya|把我的手放到她手旁边',flag:'DINDA_LIHAT',re:[
     {k:'scap',img:'p-hands.webp',t:'Kutaruh tanganku di sebelah tangannya. Pelan.|我把手放到她手旁边。很慢。'},
     {k:'say',who:'N',t:'Lho… kok sama persis?|咦……怎么一模一样？'},
     {k:'say',who:'S',t:'Kebetulan, Kak. Aku lihat di Pinterest.|巧了啦姐，我在Pinterest上看到的。'},
     {k:'scap',t:'Dinda menatap dua tangan itu lama.|Dinda盯着两只手看了很久。'}]}]},
 {k:'scene',clock:'13.10',tag:'13.10 · Doa syukuran|13:10 · 感恩祷告',tint:'warm',img:'p-doa.webp',lines:['Ustazah membaca doa. Semua menunduk.|女经师在念祷词。所有人都低着头。','Sari mengetik di bawah meja.|Sari在桌下打字。']},
 {k:'scap',fx:'shake',t:'Dua detik kemudian, HP di paha Mas Dimas menyala: Pak Budi Supplier.|两秒后，老公腿上的手机亮了：Pak Budi Supplier。'},
 {k:'inner',t:'Satu ruangan. Satu doa. Mereka masih butuh HP.|同一个房间，同一段祷告。他们还要用手机。'},
 {k:'scene',clock:'23.58',tag:'23.58 · Kamar tidur|23:58 · 卧室',tint:'night',img:'p-bed2.webp',lines:['Dia tidur, tangannya di dekat HP.|他睡着了，手搭在手机旁。','HP bergetar sekali.|手机震了一下。']},
 {k:'lock',notifs:[TP]},
 {k:'act',key:'finger',mode:'swipe',in:'lock',notifs:[TP],q:'Kodenya sudah diganti. Tapi sensornya di tombol samping.|密码早换了。但指纹在侧键上。',btn:'Geser pelan ke jempolnya|慢慢推到他拇指下'},
 {k:'sys',th:'budi',clear:1,t:'Riwayat chat dibersihkan · hari ini 21.02|聊天记录已清空 · 今天 21:02'},
 {k:'msg',th:'budi',time:'23.58',img:'p-testpack.webp',t:''},
 {k:'msg',th:'budi',time:'23.58',t:'Mas… dua garis. Gimana ini? 🥺|老公……两道杠。怎么办？🥺'},
 {k:'choice',key:'tp',th:'budi',opts:[
   {t:'Foto pakai HP-ku|用我的手机拍下',flag:'TESTPACK',re:[
     {k:'dark',fx:'flash',t:'Klik senyap.|无声快门。',sub:'Dia bergumam dalam tidur: “…Sar.”|他在梦里嘟囔了一声：“……Sar。”'}]},
   {t:'Cukup baca, kembalikan|只看，放回去',re:[
     {k:'dark',t:'Kukembalikan ke tangannya.|我把手机放回他手边。',sub:'Dia tidur pulas. Aku nggak punya buktinya — cuma tahu.|他睡得很沉。我没有照片——只是知道了。'}]}]},
 {k:'scene',clock:'00.04',tag:'00.04 · Laci nakas|00:04 · 床头柜抽屉',tint:'night',img:'p-drawer.webp',lines:['Kulepas cincinku.|我摘下戒指。','Kutaruh di laci, di sebelah tiket itu.|放进抽屉，和那张电影票放在一起。']},
 {k:'epend',ep:3,last:1,tease:'Dua garis. Besok, kakaknya harus tahu.|两道杠。明天，她姐姐必须知道。'}
];
const IMAGES=['p-bed.webp','p-wall.webp','p-dinner.webp','p-ring.webp','p-apt.webp','p-pajama.webp','p-k1.webp','p-k2.webp','p-k3.webp','p-door.webp','p-confront.webp','p-floor.webp','p-kitchen.webp','p-lobby.webp','p-ojek.webp','p-lift.webp','p-rec.webp','p-house.webp','p-esbuah.webp','p-hands.webp','p-doa.webp','p-bed2.webp','p-testpack.webp','p-drawer.webp','av-L.webp','av-D.webp'];
const UI={
 tap:'Ketuk untuk lewati jeda|点一下可跳过等待',notifC:'Notifikasi|通知',paused:'Dijeda|已暂停',newmsg:'Pesan baru ↓|新消息 ↓',tr:'Transkrip|转写',
 menu:'Menu|菜单',reset:'Mulai ulang dari awal|从头开始',resetQ:'Mulai ulang? Progres & pilihan cerita ini untuk pembaca ini dihapus.|重新开始？本读者在这个故事里的进度和选择都会被删除。',yes:'Ya, mulai ulang|确定重置',no:'Batal|取消',
 typing:'sedang mengetik…|正在输入…',online:'online|在线',
 innerL:'suara hatiku|我的心声',vn:'Pesan suara|语音消息',photoS:'Foto|照片',
 zoomHint:'ketuk untuk perbesar|点开看大图',gallery:'Galeri|相册',me:'Aku|我',
 epK:'Episode|第',epDone:'selesai|完',epNext:'Berikutnya|下一集',epGo:'Episode berikutnya|下一集',chapters:'Pilih episode|选集',
 chCur:'Sedang dibaca · lanjutkan|正在看 · 继续',chReplay:'Putar ulang dari awal episode|从本集开头重玩',chLocked:'Segera|即将上线',chNote:'Progres & pilihan tersimpan di perangkat ini.|进度和选择保存在这台设备上。',
 replayQ:'Putar ulang Episode {n}? Pilihanmu mulai episode ini akan dipilih ulang.|重玩第{n}集？从这一集起的选择会重新来过。',
 statsT:'Statistik lokal (prototipe)|本地统计（原型）',statsNote:'Hanya di perangkat ini — untuk menguji di mana pembaca berhenti. Tidak dikirim ke mana pun.|只存在本设备——用来测试读者在哪里流失。不会上传。',stStart:'mulai|开始',stEnd:'selesai|看完',stLeave:'keluar|离开',
 end1:'Bersambung…|未完待续……',again:'Ulangi dari awal|从头再玩',recapT:'Yang kupegang sekarang|我现在手里有的',
 tkDay:'HARI|星期',tkDate:'TANGGAL|日期',tkTime:'JAM|时间',tkSeat:'KURSI|座位',
 pinWrong:'Kode salah|密码错误',pinEnter:'Masukkan kode sandi|输入密码',ticketTap:'ketuk tiketnya|点一下票根',
 showerOn:'air masih mengalir|水还在流',showerOff:'air berhenti|水停了',left:'sisa {m} mnt|还剩{m}分钟',min:'mnt|分钟',
 rideHist:'Riwayat perjalanan|行程记录',bankAcc:'Rekening utama · DIMAS PRATAMA|主账户 · DIMAS PRATAMA',orderT:'Detail pesanan|订单详情',shipTo:'Dikirim ke|收货地址',
 incoming:'Panggilan masuk…|来电……',oncall:'Tersambung · aku diam|已接通 · 我没出声',calling:'Memanggil…|正在呼叫……',callEnd:'Panggilan berakhir|通话已结束',calcT:'Kalkulator|计算器',
 chats:'Chat|聊天',pinned:'Disematkan|置顶',
 apps:['WhatsApp|WhatsApp','Telepon|电话','Galeri|相册','Kamera|相机','Jalanku|Jalanku','Arta Mobile|Arta银行','Tokoria|Tokoria','Kerja|工作'],
 fapps:['Kalkulator|计算器','Excel|Excel','Drive|Drive','Nota|单据'],
 cNew:'Kontak baru · HP-ku|新建联系人 · 我的手机',cNum:'Nomor|号码',cName:'Nama|名字',cDup:'Nomor ini sudah tersimpan sebagai|这个号码已保存为',cCard:'Kontak · HP-ku|联系人 · 我的手机',
 stTime:'baru saja|刚刚',camRec:'REC|REC',fbL:'kilas balik|闪回'
};
const EPS=[{n:1,title:'Lima Belas Menit|十五分钟'},{n:2,title:'Lantai Tujuh Belas|十七楼'},{n:3,title:'Cincin yang Sama|一样的戒指'}];
const api={TITLE,TH,SAY,BEATS,UI,EPS,TICKET,ANSWER,IMAGES,LIST,RECAP};if(typeof module!=='undefined')module.exports=api;else root.PHONE=api;
})(this);
