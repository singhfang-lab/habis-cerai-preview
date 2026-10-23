// Kata Sandi HP Suamiku Bukan Tanggal Pernikahan Kami — phone-first prototype, prologue + ep1.
// The screen is Dimas's phone in Laras's hand (off-phone moments are 'scene' cards). Every string 'id|zh' (exactly one '|').
// Engine = phone-proto/phone.js (copied) + affair additions: hub (free-order app picks with minute costs), pin (number pad),
// memo (ticket card overlay), ride/bank/shop app views, shower pill (shower:1/2/0), cost:N (in-story minutes), got:app conditions.
// Timeline facts (keep consistent): Wed 21 Oct 2026. Married 12 Oct 2019 (anniv 9 days ago). Nayla b. 3 Mar 2021 (5 y).
// Ticket: Thu 19 Jun 2025 21.10 → passcode 190625 (DDMMYY). Shower 22.31→22.46 (he always takes 15 min). Thursdays: 24 Sep, 1/8/15 Oct; tomorrow = Thu 22 Oct.
// Apartment Griya Sentosa Residence Tower B / Lt.17 (unit 17B): bought 2023 in Laras's name (Dimas shielding it from konveksi debts) → VA a.n. LARAS ANINDITA.
(function(root){
const ANSWER='190625';
const TH={
 budi:{name:'Pak Budi Supplier|Pak Budi Supplier',sub:'terakhir dilihat baru saja|刚刚在线',av:'B'},
};
const SAY={L:{name:'Laras|Laras',me:true,img:'av-L.webp'},D:{name:'Mas Dimas|Dimas',tag:'suamiku · 7 tahun|老公 · 结婚七年',img:'av-D.webp'}};
const TICKET={cin:'LAYAR EMAS · CINEMA',film:'“HANYA KAMU”',day:'KAMIS|星期四',date:'19.06.25',time:'21.10',studio:'STUDIO 2',seat:'F7 · F8',price:'2 × Rp50.000'};
const BUDI1={id:'b1',app:'Chat',title:'Pak Budi Supplier|Pak Budi Supplier',t:'Mas, besok jadi datang kan? Aku pakai yang Mas beliin ❤️|老公，明天来的吧？我会穿你买的那件❤️',time:'22.33'};
const BUDI2={id:'b2',app:'Chat',title:'Pak Budi Supplier|Pak Budi Supplier',t:'Mas? 🥺|老公？🥺',time:'22.33'};
// apps on Dimas's phone. cost = in-story minutes. re = what Laras finds (first beat is the app screen).
const APPS=[
 {id:'chat',ic:'💬',col:'#25a35a',name:'Chat|聊天',badge:2,cost:3,re:[
   {k:'sys',th:'budi',t:'Riwayat chat dibersihkan · hari ini 18.52|聊天记录已清空 · 今天 18:52'},
   {k:'msg',th:'budi',time:'21.04',vn:'0:06',t:'',tr:'“Mas… fotoku kemarin udah dihapus, kan? Besok lihat aslinya aja.”|“老公……我昨天那张照片你删了吧？明天来看真人。”'},
   {k:'msg',th:'budi',time:'22.33',t:'Mas, besok jadi datang kan? Aku pakai yang Mas beliin ❤️|老公，明天来的吧？我会穿你买的那件❤️'},
   {k:'inner',t:'Dibersihkan jam 18.52. Delapan menit sebelum dia masuk rumah.|18:52清空的。他进家门前八分钟。'},
   {k:'inner',fx:'shake',t:'Centang biru. Dia tahu pesannya sudah dibaca — padahal Mas Dimas lagi mandi.|两个蓝勾。她知道消息已读了——可我老公正在洗澡。'},
   {k:'typing',th:'budi',stop:1}]},
 {id:'gallery',ic:'🖼',col:'#e2803a',name:'Galeri|相册',cost:2,re:[
   {k:'gallery',t:'Baru Dihapus · 1 foto|最近删除 · 1张',focus:'p-selfie.webp',seen:'selfie',cap:'Dihapus kemarin, 22.10. Terhapus permanen dalam 29 hari.|昨天22:10删除。29天后永久删除。',items:[]},
   {k:'inner',t:'Mukanya tertutup HP. Tapi jarinya…|脸被手机挡住了。可是她的手指……'},
   {k:'inner',fx:'shake',t:'Cincin itu sama persis dengan punyaku. Padahal kata toko langganan Dinda, desainnya khusus buatku.|那枚戒指和我的一模一样。可Dinda常去的那家首饰店说过，这款是专门为我设计的。'},
   {k:'inner',when:'got:shop',t:'Dan piyama pink itu. Yang dia beli.|还有那套粉色睡衣。就是他买的那套。'},
   {k:'inner',when:'got:chat',t:'“Fotoku kemarin udah dihapus, kan?” Sudah. Tapi belum hilang.|“我昨天那张照片你删了吧？”删了。但还没消失。'}]},
 {id:'ride',ic:'🛵',col:'#13a07a',name:'Jalanku|Jalanku',cost:2,re:[
   {k:'ride',t:'Riwayat perjalanan|行程记录',img:'p-apt.webp',dest:'Griya Sentosa Residence · Tower B|Griya Sentosa公寓 · B座',cap:'Griya Sentosa Residence, Tower B. Tiap Kamis.|Griya Sentosa公寓B座。每个星期四。',rows:[
     ['Kamis, 15 Okt · 19.41|星期四 10月15日 · 19:41','Gudang Cempaka → Griya Sentosa Residence, Tower B|Cempaka仓库 → Griya Sentosa公寓 B座','Rp38.000'],
     ['Kamis, 8 Okt · 19.38|星期四 10月8日 · 19:38','Gudang Cempaka → Griya Sentosa Residence, Tower B|Cempaka仓库 → Griya Sentosa公寓 B座','Rp38.000'],
     ['Kamis, 1 Okt · 19.45|星期四 10月1日 · 19:45','Gudang Cempaka → Griya Sentosa Residence, Tower B|Cempaka仓库 → Griya Sentosa公寓 B座','Rp41.000'],
     ['Kamis, 24 Sep · 19.40|星期四 9月24日 · 19:40','Gudang Cempaka → Griya Sentosa Residence, Tower B|Cempaka仓库 → Griya Sentosa公寓 B座','Rp38.000']]},
   {k:'inner',t:'Tiap Kamis, dari gudang. Mobilnya ditinggal di sana — biar kelihatan lembur.|每个星期四，从仓库出发。车留在那儿——看起来就像在加班。'},
   {k:'inner',when:'got:bank',t:'Griya Sentosa. Yang tiap bulan dia cicil atas namaku.|Griya Sentosa。他每个月用我的名字还分期的那个地方。'},
   {k:'inner',fx:'shake',t:'Besok Kamis.|明天就是星期四。'}]},
 {id:'bank',ic:'🏦',col:'#2357c9',name:'Arta Mobile|Arta银行',cost:3,re:[
   {k:'bank',t:'Mutasi rekening · 4 bulan terakhir|账户明细 · 最近4个月',rows:[
     ['05 Okt 2026|2026年10月5日','Transfer VA · Berita: cicilan|转账（虚拟账户）· 附言：分期'],
     ['05 Sep 2026|2026年9月5日','Transfer VA · Berita: cicilan|转账（虚拟账户）· 附言：分期'],
     ['05 Agu 2026|2026年8月5日','Transfer VA · Berita: cicilan|转账（虚拟账户）· 附言：分期'],
     ['05 Jul 2026|2026年7月5日','Transfer VA · Berita: cicilan|转账（虚拟账户）· 附言：分期']],
    det:[['Penerima|收款方','GRIYA SENTOSA RESIDENCE'],['Unit|单元','Tower B · Lt. 17|B座 · 17楼'],['Atas nama|户名','LARAS ANINDITA',1]]},
   {k:'inner',t:'Rp8,5 juta. Tiap bulan. Uang belanjaku tiga juta sebulan — itu pun dia tanya struknya.|每月850万。我一个月的家用才300万——他还要看小票。'},
   {k:'inner',fx:'shake',t:'Atas nama… LARAS ANINDITA. Itu namaku.|户名……LARAS ANINDITA。那是我的名字。'},
   {k:'inner',t:'Aku nggak pernah tanda tangan cicilan apa pun. …Kan?|我从没签过什么分期。……对吧？'},
   {k:'inner',when:'got:ride',t:'Tower B. Tempat dia turun tiap Kamis.|B座。他每个星期四下车的地方。'}]},
 {id:'shop',ic:'🛍',col:'#e0457b',name:'Tokoria|Tokoria',cost:2,re:[
   {k:'shop',t:'Pesanan selesai · diterima 20 Okt|订单已完成 · 10月20日签收',img:'p-pajama.webp',item:'Set Piyama Satin Wanita · Dusty Pink · M|女士缎面睡衣套装 · 烟粉色 · M码',price:'Rp389.000',addr:'Gudang Pak Budi|Pak Budi仓库',addr2:'Griya Sentosa Residence, Tower B, Lt. 17|Griya Sentosa公寓 B座 17楼'},
   {k:'inner',t:'“Aku pakai yang Mas beliin.” Ini.|“我会穿你买的那件。”就是这个。'},
   {k:'inner',fx:'shake',t:'Gudang. Di lantai tujuh belas.|仓库。在十七楼。'},
   {k:'inner',when:'got:gallery',t:'Piyama yang di foto itu.|就是照片里那套。'}]}
];
const DECOR=[{ic:'📷',name:'Kamera|相机'},{ic:'📅',name:'Kalender|日历'},{ic:'⚙️',name:'Setelan|设置'}];
const HUBT='Sepuluh menit sebelum airnya berhenti. Nggak cukup buat buka semuanya.|水声停之前，还有十分钟。不够全部打开。';
const HUBT2='Sisa {m} menit. Buka yang mana lagi?|还剩{m}分钟。再打开哪个？';
const BEATS=[
 {k:'dark',title:1,clock:'19.40',day:'Rabu|星期三',t:'Kata sandi HP suamiku bukan tanggal pernikahan kami.|老公的手机密码，不是我们的结婚纪念日。',sub:'Tujuh tahun menikah. Lima belas menit untuk tahu semuanya.|结婚七年。十五分钟，看清一切。'},
 // ---------- PROLOG: the seed (laundry) ----------
 {k:'scene',clock:'19.40',tag:'19.40 · Rabu · Ruang cuci|19:40 · 星期三 · 洗衣间',tint:'harsh',img:'p-laundry.webp',lines:['Kantong kemeja Mas Dimas. Sobekan tiket bioskop.|老公衬衫的口袋里，有半张电影票。','Dua kursi. Kamis malam, Juni tahun lalu.|两个座位。去年六月，一个星期四的晚上。'],inner:'Dia nggak pernah ngajak aku nonton. Tujuh tahun, sekali pun nggak.|他从没带我看过电影。七年，一次都没有。'},
 {k:'scap',ticket:1,t:'Kertasnya lecek, tapi tintanya masih tajam.|纸皱了，字却还很清楚。'},
 {k:'scap',t:'Tiket lebih dari setahun lalu. Di kemeja yang kucuci tiap minggu. Belum pernah ikut kecuci.|一年多前的票。在我每周都洗的衬衫里。却从没被洗过。'},
 {k:'scap',t:'Kuselipkan ke laci nakasku. Nanti kutanya.|我把它塞进自己床头柜的抽屉。回头再问他。'},
 {k:'scap',t:'Aku tahu aku nggak akan nanya.|我知道我不会问的。'},
 // ---------- 22.31 bed, shower ----------
 {k:'scene',clock:'22.31',shower:1,tag:'22.31 · Kamar tidur|22:31 · 卧室',tint:'night',img:'p-bed.webp',lines:['Pintu kamar mandi menutup. Air mulai mengalir.|浴室门关上了。水声响起。','Lima belas menit. Tujuh tahun, Mas Dimas nggak pernah mandi lebih lama.|十五分钟。七年了，他洗澡从没超过十五分钟。'],inner:'Nayla sudah tidur di kamarnya. Rumah sunyi. Cuma suara air.|Nayla在自己房间睡着了。家里很静，只有水声。'},
 {k:'scap',t:'HP-nya di nakas. Telungkup. Sejak kapan dia menelungkupkan HP?|他的手机在床头柜上，扣着放。他什么时候开始把手机扣着放的？'},
 {k:'scap',t:'Lampu biru kamera bayi di rak berkedip. Malam itu, aku nggak memperhatikannya.|架子上，婴儿监控的蓝灯一闪一闪。那天晚上，我没注意到它。'},
 {k:'dark',fx:'shake',t:'BZZT.|嗡——',sub:'Cahaya bocor dari bawah HP yang telungkup.|扣着的手机底下，漏出一圈光。'},
 // ---------- his lock screen ----------
 {k:'lock',clock:'22.33',day:'Rabu|星期三',dp:1,fx:'flash',notifs:[BUDI1]},
 {k:'inner',t:'Supplier kain nggak kirim hati.|卖布的供应商，不会发红心。'},
 {k:'choice',key:'grab',in:'lock',ms:9000,pilot:0,
  help:'Kalau aku diam, Laras yang dulu yang memilih — istri tujuh tahun yang selalu bilang “nggak apa-apa, Mas”. Rebut!|我不出手，以前的Laras就会替我选——那个七年来只会说“没事的，老公”的我。抢回来！',
  old:'Jangan. Itu HP-nya. Istri yang baik nggak ngintip.|别。那是他的手机。好妻子不偷看。',
  opts:[
   {t:'Taruh lagi. Bukan urusanku.|放回去。不关我的事。',re:[
     {k:'inner',t:'Kutelungkupkan lagi. Kuhitung napas. Satu. Dua.|我把它扣了回去。数着呼吸。一。二。'},
     {k:'lock',clock:'22.33',fx:'shake',notifs:[BUDI2,BUDI1]},
     {k:'inner',t:'Menyala lagi. Kali ini tanganku nggak mau menaruhnya.|又亮了。这一次，我的手不肯再放下。'}]},
   {t:'Buka. Sekarang.|打开。现在。',re:[]}],
  ifMe:[{k:'inner',when:'grab=1',t:'Tanganku sendiri. Dingin, tapi nggak gemetar.|是我自己的手。冰凉，但没有抖。'}]},
 // ---------- passcode ----------
 {k:'act',key:'pin1',mode:'pin',in:'lock',clock:'22.33',q:'Enam angka. Pasti tanggal nikah kami: 12-10-19.|六位数。肯定是我们的结婚纪念日：121019。',chip:{label:'12·10·19 · tanggal nikah|121019 · 结婚纪念日',code:'121019'},chipAfter:3500},
 {k:'inner',when:'pinfast!=1',fx:'shake',t:'Salah.|不对。'},
 {k:'inner',when:'pinfast!=1',t:'Sembilan hari lalu anniversary ketujuh kami. Dia pulang jam sebelas, bilang lupa.|九天前是我们结婚七周年。他十一点才回家，说忘了。'},
 {k:'act',key:'pin2',mode:'pin',in:'lock',when:'pinfast!=1',clock:'22.34',q:'Ulang tahun Nayla, 03-03-21. Dia sayang Nayla.|Nayla的生日：030321。他疼Nayla。',chip:{label:'03·03·21 · ultah Nayla|030321 · Nayla生日',code:'030321'},chipAfter:3500},
 {k:'lock',when:'pinfast!=1,2',clock:'22.34',lockout:1,fx:'shake',notifs:[BUDI1]},
 {k:'inner',when:'pinfast!=1,2',t:'Dua kali salah langsung dikunci. HP-ku sendiri boleh salah lima kali. Sejak kapan dia seketat ini?|错两次就锁。我自己的手机能错五次。他什么时候变得这么小心？'},
 {k:'inner',when:'pinfast!=1,2',t:'Tanggal apa yang penting buat dia… tapi bukan buat aku?|什么日子对他很重要……对我却不重要？'},
 {k:'memo',when:'pinfast!=1,2',clock:'22.35',t:'Laci nakas. Tiket itu.|床头柜的抽屉。那张票。'},
 {k:'act',key:'pin3',mode:'pin',in:'lock',when:'pinfast!=1,2',final:1,ticket:1,clock:'22.35',q:'Kesempatan terakhir sebelum dikunci lagi.|最后一次机会，错了又要锁。',ticketAfter:7000},
 // ---------- unlocked: his home screen ----------
 {k:'hub',key:'h0',peek:1,clock:'22.36'},
 {k:'inner',t:'Kata sandi HP suamiku bukan tanggal pernikahan kami.|老公的手机密码，不是我们的结婚纪念日。'},
 {k:'inner',when:'pinfast=2',t:'Bukan ulang tahun Nayla. Aku sudah tahu tanggal yang mana.|不是Nayla的生日。我已经知道是哪一天了。'},
 {k:'inner',when:'pinfast=1',t:'Aku bahkan nggak mencoba tanggal nikah kami. Aku sudah tahu.|我连结婚纪念日都没试。我已经知道了。'},
 {k:'inner',fx:'shake',t:'Tapi tanggal dia nonton berdua dengan perempuan lain.|而是他和另一个女人看电影的那一天。'},
 {k:'hub',key:'h1',end:'22.46',t:HUBT},
 {k:'inner',t:'Besok dia bisa bilang aku mimpi. Aku butuh bukti.|明天他可以说我在做梦。我需要证据。'},
 {k:'choice',key:'save',
  opts:[
   {t:'📤 Screenshot, kirim ke WA-ku · 1 menit|📤 截图，发到我的WA · 1分钟',re:[
     {k:'inner',cost:1,t:'Terkirim. Lalu kuhapus dari HP-nya: “Hapus untuk saya.”|发出去了。再在他手机上删掉：“仅为我删除”。'},
     {k:'inner',t:'Mulai sekarang, semua yang kutemukan langsung kukirim.|从现在起，找到什么我就立刻发走。'}]},
   {t:'📸 Foto layarnya pakai HP-ku · 2 menit|📸 用我的手机拍下屏幕 · 2分钟',re:[
     {k:'inner',cost:2,t:'Mode senyap. Flash mati. Jepret. Jepret. Tanganku gemetar.|静音，关闪光灯。咔嚓。咔嚓。我的手在抖。'},
     {k:'inner',t:'Mulai sekarang, semua yang kutemukan kufoto juga.|从现在起，找到什么我都拍下来。'}]}]},
 {k:'hub',key:'h2',end:'22.46',t:HUBT2},
 {k:'hub',key:'h3',end:'22.46',t:HUBT2},
 {k:'hub',key:'h4',end:'22.46',t:HUBT2},
 {k:'hub',key:'h5',end:'22.46',t:HUBT2},
 // ---------- 22.46 the water stops ----------
 {k:'dark',clock:'22.46',shower:2,dp:0,fx:'shake',t:'Airnya berhenti.|水声停了。',sub:'22.46. Tepat lima belas menit.|22:46。正好十五分钟。'},
 {k:'choice',key:'water',ms:9000,pilot:0,
  old:'Taruh lagi. Pejamkan mata. Besok pura-pura nggak tahu.|放回去。闭上眼。明天装作什么都不知道。',
  opts:[
   {t:'Taruh lagi. Pura-pura tidur.|放回去。装睡。',re:[]},
   {t:'Tunggu dia keluar. Tanya sekarang.|等他出来。现在就问。',re:[]}],
  ifPilot:[{k:'inner',t:'Laras yang dulu memilih diam. Seperti tujuh tahun ini.|以前的Laras选择了沉默。就像这七年一样。'}],
  ifMe:[{k:'inner',when:'water=0',t:'Aku yang memilih diam. Bukan karena takut. Belum waktunya.|是我自己选择沉默。不是因为怕。是时候还没到。'},
        {k:'inner',when:'water=1',t:'Tujuh tahun aku diam. Malam ini nggak.|沉默了七年。今晚不了。'}]},
 // --- A: put it back, fake sleep ---
 {k:'act',key:'facedown',when:'water=0',mode:'drag',in:'lock',shower:0,notifs:[],q:'Telungkup. Persis seperti tadi.|扣回去。和刚才一模一样。',btn:'Seret ke bawah: telungkupkan HP-nya|往下拖：把他的手机扣回去',done:''},
 {k:'dark',when:'water=0',t:'Klik.|咔哒。',sub:'Pintu kamar mandi terbuka. Kupejamkan mata.|浴室门开了。我闭上眼睛。'},
 {k:'scene',when:'water=0',clock:'22.47',tag:'22.47 · Pura-pura tidur|22:47 · 装睡',tint:'night',img:'p-door.webp',lines:['Langkahnya berhenti di sisi ranjangnya.|他的脚步停在他那一侧的床边。','Cahaya layar HP menembus kelopak mataku.|手机屏幕的光，透过了我的眼皮。']},
 {k:'scap',when:'water=0&save=0',t:'…Chat “Istriku”. Habis kukirim, chat itu naik ke paling atas. Isinya kuhapus — urutannya nggak.|……“老婆”那个对话。发完之后，它被顶到了最上面。内容我删了——顺序没有。'},
 {k:'scap',when:'water=0&save=1',t:'Fotonya ada di HP-ku sendiri. Di HP-nya nggak ada jejak. Kurasa.|照片在我自己的手机里。他手机上没留痕迹。应该吧。'},
 {k:'scap',when:'water=0',t:'Jempolnya berhenti bergerak. Lama.|他的拇指停住了。很久。'},
 {k:'scap',when:'water=0',fx:'shake',t:'Bzzt. HP di tangannya bergetar. Dari celah bulu mata, aku bisa membacanya:|嗡。他手里的手机震了一下。透过睫毛的缝隙，我看清了：'},
 {k:'scap',when:'water=0&got:chat',bn:1,from:'Pak Budi Supplier|Pak Budi Supplier',t:'Mas, kok di-read doang? Istrimu belum tidur, ya?|老公，怎么已读不回？你老婆还没睡吧？'},
 {k:'scap',when:'water=0&!got:chat',bn:1,from:'Pak Budi Supplier|Pak Budi Supplier',t:'Mas? Kok diem? Istrimu belum tidur, ya?|老公？怎么不说话？你老婆还没睡吧？'},
 {k:'say',when:'water=0',who:'D',t:'Ras?|Laras？'},
 {k:'act',key:'still',when:'water=0',mode:'hold',in:'scene',q:'Jangan bergerak. Napas pelan, kayak orang tidur.|别动。呼吸放慢，像睡着的人那样。',btn:'Tahan: pura-pura tidur|按住：装睡',done:'Tiga detik. Lalu kasur di sebelahku melesak, dan dia berbisik ke HP-nya: “Udah.”|三秒。然后我身边的床垫陷了下去，他对着手机轻声说：“睡了。”'},
 // --- B: confront ---
 {k:'scene',when:'water=1',clock:'22.46',shower:0,tag:'22.46 · Pintu kamar mandi terbuka|22:46 · 浴室门开了',tint:'night',img:'p-confront.webp',lines:['Aku nggak menaruhnya. Aku duduk, HP-nya di tanganku.|我没放回去。我坐着，他的手机在我手里。','Dia berhenti. Handuk di leher. Matanya ke HP, lalu ke aku.|他停住了。毛巾搭在脖子上。眼睛先看手机，再看我。']},
 {k:'say',when:'water=1',who:'L',t:'Siapa Pak Budi?|Pak Budi是谁？'},
 {k:'say',when:'water=1',who:'D',t:'Supplier kain. Kenapa HP-ku di kamu?|布料供应商。我手机怎么在你那儿？'},
 {k:'say',when:'water=1',who:'L',t:'Supplier kain kirim hati? Nanya besok kamu jadi datang?|布料供应商会发红心？问你明天来不来？'},
 {k:'say',when:'water=1',who:'D',t:'Itu admin tokonya, anak magang. Memang lebay. Besok aku ke gudangnya ambil kain.|那是他店里的客服，实习的小姑娘，说话就是夸张。明天我去他仓库拿布。'},
 {k:'scap',when:'water=1',t:'Dia mengambil HP-nya dari tanganku. Pelan. Hampir lembut.|他从我手里把手机拿走。很轻。几乎算得上温柔。'},
 {k:'say',when:'water=1',who:'D',t:'Kamu tahu kodenya dari mana, Ras?|你怎么知道密码的，Laras？'},
 {k:'scap',when:'water=1',t:'Aku nggak menjawab. Di depanku, dia buka Setelan, ganti kode, lalu mematikan lampu.|我没回答。他当着我的面打开设置，改了密码，然后关了灯。'},
 {k:'inner',when:'water=1',fx:'shake',t:'Semua yang tadi kulihat, sekarang di balik kode yang nggak kutahu. Yang tersisa cuma yang sempat kusimpan.|刚才看到的一切，现在都锁在一个我不知道的密码后面。剩下的，只有我来得及存下来的。'},
 {k:'scap',when:'water=1',fx:'shake',t:'Dalam gelap, HP di sisinya bergetar. Layarnya menghadap ke atas:|黑暗里，他那边的手机震了一下。屏幕朝上：'},
 {k:'scap',when:'water=1',bn:1,from:'Pak Budi Supplier|Pak Budi Supplier',t:'Mas? Kok diem? Istrimu belum tidur, ya?|老公？怎么不说话？你老婆还没睡吧？'},
 {k:'say',when:'water=1',who:'D',t:'Tidur, Ras.|睡吧，Laras。'},
 {k:'act',key:'still',when:'water=1',mode:'hold',in:'scene',q:'Jangan nangis. Jangan di depan dia.|别哭。别在他面前哭。',btn:'Tahan: telan tangisnya|按住：把眼泪咽回去',done:'Punggungnya menghadapku. Lima menit, dia sudah mendengkur. Aku nggak.|他背对着我。五分钟后，他打起了呼。我没有睡。'},
 {k:'epend',ep:1,tease:'Besok Kamis. Kali ini, aku yang mengikutinya.|明天是星期四。这一次，换我跟着他。'},
 {k:'end',t:'Episode 2: Kamis malam, lantai 17. Pintu itu dibuka oleh wajah yang kukenal.|第2集：星期四晚上，十七楼。开门的，是一张我认识的脸。'}
];
const IMAGES=['p-laundry.webp','p-bed.webp','p-wall.webp','p-selfie.webp','p-apt.webp','p-pajama.webp','p-door.webp','p-confront.webp','av-L.webp','av-D.webp'];
const UI={
 tap:'Ketuk untuk lewati jeda|点一下可跳过等待',notifC:'Notifikasi|通知',paused:'Dijeda|已暂停',newmsg:'Pesan baru ↓|新消息 ↓',tr:'Transkrip|转写',
 menu:'Menu|菜单',reset:'Mulai ulang dari awal|从头开始',resetQ:'Mulai ulang? Progres & pilihan cerita ini untuk pembaca ini dihapus.|重新开始？本读者在这个故事里的进度和选择都会被删除。',yes:'Ya, mulai ulang|确定重置',no:'Batal|取消',
 typing:'sedang mengetik…|正在输入…',online:'online|在线',old:'Laras yang dulu memilih…|以前的Laras正在替我选……',take:'Aku yang pilih!|我来选！',stamp:'AKU YANG PILIH|我来选',auto:'AUTO|AUTO',
 quick:'Balas cepat|快速回复',inner:'suara hati · ketuk bila mau|心声 · 想看就点',innerL:'suara hatiku|我的心声',vn:'Pesan suara|语音消息',photoS:'Foto|照片',
 yours:'Pilihanmu|你的选择',zoomHint:'ketuk untuk perbesar|点开看大图',gallery:'Galeri|相册',me:'Aku|我',
 epK:'Episode|第',epPaid:'berbayar|付费',epDone:'selesai|完',epNext:'Berikutnya|下一集',autoNext:'Lanjut otomatis · ketuk untuk langsung|自动继续 · 点一下立刻开始',epGo:'Lanjut|继续',chapters:'Pilih episode|选集',
 chCur:'Sedang dibaca · lanjutkan|正在看 · 继续',chReplay:'Putar ulang dari awal episode|从本集开头重玩',chPw:'Segera|即将上线',chLocked:'Segera|即将上线',chNote:'Progres & pilihan tersimpan di perangkat ini.|进度和选择保存在这台设备上。',
 replayQ:'Putar ulang Episode {n}? Pilihanmu mulai episode ini akan dipilih ulang.|重玩第{n}集？从这一集起的选择会重新来过。',
 statsT:'Statistik lokal (prototipe)|本地统计（原型）',statsNote:'Hanya di perangkat ini — untuk menguji di mana pembaca berhenti. Tidak dikirim ke mana pun.|只存在本设备——用来测试读者在哪里流失。不会上传。',stStart:'mulai|开始',stEnd:'selesai|看完',stLeave:'keluar|离开',stPw:'paywall dilihat|付费页曝光',stClick:'klik|点击',stUnlock:'terbuka lewat|解锁方式',
 end1:'Bersambung…|未完待续……',end2:'Lanjut?|继续？',again:'Ulangi dari awal|从头再玩',
 apps:['Chat|聊天','Lensa|Lensa','LiveKu|LiveKu','Email|邮件','DompetKu|钱包','Galeri|相册','Catatan|备忘录','Kamera|相机','Telepon|电话'],
 // affair additions
 tkDay:'HARI|星期',tkDate:'TANGGAL|日期',tkTime:'JAM|时间',tkSeat:'KURSI|座位',
 pinWrong:'Kode salah|密码错误',pinEnter:'Masukkan kode sandi|输入密码',lockout:'Coba lagi dalam|请稍后再试',lockoutSub:'2 kali kode salah|密码已错误2次',ticketTap:'ketuk tiketnya|点一下票根',
 showerOn:'air masih mengalir|水还在流',showerOff:'air berhenti|水停了',left:'sisa {m} mnt|还剩{m}分钟',min:'mnt|分钟',evid:'Bukti|证据',dphone:'HP Mas Dimas|老公的手机',
 rideHist:'Riwayat perjalanan|行程记录',bankAcc:'Rekening utama · DIMAS PRATAMA|主账户 · DIMAS PRATAMA',orderT:'Detail pesanan|订单详情',shipTo:'Dikirim ke|收货地址',
 stEv:'Bukti yang kamu temukan|你找到的证据',stSave:'Cara menyimpan|保存方式',saveF:'Dikirim ke WA-mu — ada jejak di HP-nya|发到了你的WA——他手机上留了痕迹',saveP:'Difoto pakai HP-mu — tanpa jejak|用你的手机拍下——没留痕迹',
 stDim:'Mas Dimas|老公',dimA:'Belum tahu apa-apa. Mungkin.|还什么都不知道。也许。',dimB:'Sudah waspada. Kodenya diganti.|已经起了戒心。密码改了。',stOld:'Laras yang dulu memilih {p} dari {t} kali|{t}次选择里，以前的Laras替你选了{p}次',
 evName:{chat:'Pesan suara|语音',gallery:'Foto dihapus|已删照片',ride:'Tiap Kamis|每个星期四',bank:'Cicilan Rp8,5 jt|850万分期',shop:'Piyama|睡衣'}
};
const EPS=[{n:1,title:'Lima Belas Menit|十五分钟'},{n:2,title:'Kamis Malam, Lantai 17|星期四晚上，十七楼'}];
const api={TH,SAY,BEATS,UI,EPS,APPS,DECOR,TICKET,ANSWER,IMAGES};if(typeof module!=='undefined')module.exports=api;else root.PHONE=api;
})(this);
