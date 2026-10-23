// Kata Sandi HP Suamiku Bukan Tanggal Pernikahan Kami — phone-first prototype, prologue + ep1.
// The screen is Dimas's phone in Laras's hand (off-phone moments are 'scene' cards). Every string 'id|zh' (exactly one '|').
// Engine = phone-proto/phone.js (copied) + affair additions: hub (free-order app picks with minute costs), pin (number pad),
// memo (ticket card overlay), ride/bank/shop app views, shower pill (shower:1/2/0), cost:N (in-story minutes), got:app conditions.
// Timeline facts (keep consistent): Wed 21 Oct 2026. Married 12 Oct 2019 (anniv 9 days ago). Nayla b. 3 Mar 2021 (5 y).
// Ticket: Thu 19 Jun 2025 21.10 → passcode 190625 (DDMMYY). Shower 22.31→22.46 (he always takes 15 min). Thursdays: 24 Sep, 1/8/15 Oct; tomorrow = Thu 22 Oct.
// Apartment Griya Sentosa Residence Tower B / Lt.17 (unit 1708): bought 2023 in Laras's name (Dimas shielding it from konveksi debts) → VA a.n. LARAS ANINDITA.
(function(root){
const ANSWER='190625';
const TH={
 budi:{name:'Pak Budi Supplier|Pak Budi Supplier',sub:'terakhir dilihat baru saja|刚刚在线',av:'B'},
};
const SAY={L:{name:'Laras|Laras',me:true,img:'av-L.webp'},D:{name:'Mas Dimas|Dimas',tag:'suamiku · 7 tahun|老公 · 结婚七年',img:'av-D.webp'},B:{name:'Pak Budi Supplier|Pak Budi Supplier',ini:'B'}};
const TICKET={cin:'LAYAR EMAS · CINEMA',film:'“HANYA KAMU”',day:'KAMIS|星期四',date:'19.06.25',time:'21.10',studio:'STUDIO 2',seat:'F7 · F8',price:'2 × Rp50.000'};
const BUDI1={id:'b1',app:'Chat',title:'Pak Budi Supplier|Pak Budi Supplier',t:'Mas, besok jadi datang kan? Aku pakai yang Mas beliin ❤️|老公，明天来的吧？我会穿你买的那件❤️',time:'22.33'};
const BUDI2={id:'b2',app:'Chat',title:'Pak Budi Supplier|Pak Budi Supplier',t:'Mas? 🥺|老公？🥺',time:'22.33'};
const RINA1={id:'r1',app:'Chat',title:'Rina Admin Konveksi|Rina · 工坊行政',t:'Pak, kunci gudang Cempaka saya bawa pulang ya. Besok saya buka jam 7 🙏|老板，Cempaka仓库的钥匙我带回家了哈。明天我七点开门🙏',time:'22.34'};
// apps on Dimas's phone. cost = in-story minutes. re = what Laras finds (first beat is the app screen).
const APPS=[
 {id:'chat',ic:'💬',col:'#25a35a',name:'Chat|聊天',badge:2,cost:2,re:[
   {k:'sys',th:'budi',t:'Riwayat chat dibersihkan · hari ini 18.52|聊天记录已清空 · 今天 18:52'},
   {k:'msg',th:'budi',time:'21.04',vn:'0:06',t:'',tr:'“Mas… fotoku kemarin udah dihapus, kan? Besok lihat aslinya aja.”|“老公……我昨天那张照片你删了吧？明天来看真人。”'},
   {k:'msg',th:'budi',time:'22.33',t:'Mas, besok jadi datang kan? Aku pakai yang Mas beliin ❤️|老公，明天来的吧？我会穿你买的那件❤️'},
   {k:'inner',t:'Dibersihkan 18.52. Delapan menit sebelum dia pulang.|18:52清空的。他进家门前八分钟。'},
   {k:'inner',fx:'shake',t:'Centang biru. Dia tahu pesannya sudah dibaca — padahal Mas Dimas lagi mandi.|两个蓝勾。她知道消息已读了——可我老公正在洗澡。'}]},
 {id:'gallery',ic:'🖼',col:'#e2803a',name:'Galeri|相册',cost:2,re:[
   {k:'gallery',t:'Baru Dihapus · 1 foto|最近删除 · 1张',focus:'p-selfie.webp',seen:'selfie',cap:'Dihapus kemarin, 22.10. Terhapus permanen dalam 29 hari.|昨天22:10删除。29天后永久删除。',items:[]},
   {k:'inner',t:'Mukanya tertutup HP. Tapi jarinya…|脸被手机挡住了。可是她的手指……'},
   {k:'inner',fx:'shake',t:'Cincin itu sama persis dengan punyaku. Desain khusus — Dinda yang memesankannya di toko langganannya.|那枚戒指和我的一模一样。那是定制款——是Dinda在她常去的店里帮我订的。'},
   {k:'inner',when:'got:shop',t:'Dan piyama pink itu. Yang dia beli.|还有那套粉色睡衣。就是他买的那套。'}]},
 {id:'ride',ic:'🛵',col:'#13a07a',name:'Jalanku|Jalanku',cost:1,re:[
   {k:'ride',t:'Riwayat perjalanan|行程记录',img:'p-apt.webp',dest:'Griya Sentosa Residence · Tower B|Griya Sentosa公寓 · B座',cap:'Griya Sentosa Residence, Tower B. Tiap Kamis.|Griya Sentosa公寓B座。每个星期四。',rows:[
     ['Kamis, 15 Okt · 19.41|星期四 10月15日 · 19:41','Gudang Cempaka → Griya Sentosa Residence, Tower B|Cempaka仓库 → Griya Sentosa公寓 B座','Rp38.000'],
     ['Kamis, 8 Okt · 19.38|星期四 10月8日 · 19:38','Gudang Cempaka → Griya Sentosa Residence, Tower B|Cempaka仓库 → Griya Sentosa公寓 B座','Rp38.000'],
     ['Kamis, 1 Okt · 19.45|星期四 10月1日 · 19:45','Gudang Cempaka → Griya Sentosa Residence, Tower B|Cempaka仓库 → Griya Sentosa公寓 B座','Rp41.000']]},
   {k:'inner',t:'Tiap Kamis, dari Gudang Cempaka. Mobilnya ditinggal di sana — biar kelihatan lembur.|每个星期四，从Cempaka仓库出发。车留在那儿——看起来就像在加班。'},
   {k:'inner',when:'!got:vault',t:'Gudang Cempaka. Kuncinya dipegang Rina.|Cempaka仓库。钥匙在Rina手上。'},
   {k:'inner',when:'got:vault',t:'Gudang yang kuncinya dipegang Rina. Alibi yang rapi — kalau ketahuan, semua orang akan menoleh ke Rina.|钥匙在Rina手上的仓库。好周全的幌子——一旦败露，所有人都会看向Rina。'},
   {k:'inner',fx:'shake',t:'Besok Kamis.|明天就是星期四。'}]},
 {id:'bank',ic:'🏦',col:'#2357c9',name:'Arta Mobile|Arta银行',cost:2,re:[
   {k:'bank',t:'Mutasi rekening · 3 bulan terakhir|账户明细 · 最近3个月',rows:[
     ['05 Okt 2026|2026年10月5日','Transfer VA · Berita: cicilan|转账（虚拟账户）· 附言：分期'],
     ['05 Sep 2026|2026年9月5日','Transfer VA · Berita: cicilan|转账（虚拟账户）· 附言：分期'],
     ['05 Agu 2026|2026年8月5日','Transfer VA · Berita: cicilan|转账（虚拟账户）· 附言：分期']],
    det:[['Penerima|收款方','GRIYA SENTOSA RESIDENCE'],['Unit|单元','Tower B · Lt. 17|B座 · 17楼'],['Atas nama|户名','LARAS ANINDITA',1]]},
   {k:'inner',t:'Rp8,5 juta tiap bulan. Uang belanjaku tiga juta — itu pun dia minta struk.|每月850万。我一个月家用才300万——他还要看小票。'},
   {k:'inner',fx:'shake',t:'Atas nama… LARAS ANINDITA. Namaku.|户名……LARAS ANINDITA。是我的名字。'}]},
 {id:'shop',ic:'🛍',col:'#e0457b',name:'Tokoria|Tokoria',cost:1,re:[
   {k:'shop',t:'Pesanan selesai · diterima 20 Okt|订单已完成 · 10月20日签收',img:'p-pajama.webp',item:'Set Piyama Satin Wanita · Dusty Pink · M|女士缎面睡衣套装 · 烟粉色 · M码',price:'Rp389.000',addr:'Gudang Pak Budi|Pak Budi仓库',addr2:'Griya Sentosa Residence, Tower B, Lt. 17|Griya Sentosa公寓 B座 17楼'},
   {k:'inner',t:'“Aku pakai yang Mas beliin.” Ini.|“我会穿你买的那件。”就是这个。'},
   {k:'inner',fx:'shake',t:'“Gudang Pak Budi.” Di lantai tujuh belas.|“Pak Budi仓库”。在十七楼。'},
   {k:'inner',when:'got:gallery',t:'Piyama yang di foto itu.|就是照片里那套。'}]}
];
const DECOR=[{ic:'🧮',name:'Kalkulator|计算器'},{ic:'📷',name:'Kamera|相机'},{ic:'⚙️',name:'Setelan|设置'}];
const VAULT={card:{t:'GRIYA SENTOSA RESIDENCE',k:'KARTU AKSES|门禁卡',unit:'TOWER B · 1708',name:'LARAS ANINDITA'},
 old:['Rab, 23 Sep · 02.14|9月23日 周三 · 02:14','Rab, 30 Sep · 01.52|9月30日 周三 · 01:52','Rab, 7 Okt · 02.31|10月7日 周三 · 02:31','Rab, 14 Okt · 02.05|10月14日 周三 · 02:05'],
 img:'p-cam-bed.webp',cap:'Kamera Nayla · hari ini 22.34|Nayla的摄像头 · 今天 22:34'};
const HUBT='Sisa {m} menit sebelum airnya berhenti. Nggak cukup buat buka semuanya.|水声停之前，还有{m}分钟。不够全部打开。';
const HUBT2='Sisa {m} menit. Buka yang mana lagi?|还剩{m}分钟。再打开哪个？';
const HUBT3='Dia bisa keluar kapan saja. Buka satu lagi?|他随时会出来。再开一个？';
const VN=(sec,t)=>({k:'pop',hub:1,ic:'🎤',from:'Pak Budi Supplier|Pak Budi Supplier',sub:'Pesan suara · '+sec+'|语音消息 · '+sec,t});
const BEATS=[
 {k:'dark',title:1,clock:'19.40',day:'Rabu|星期三',t:'Kata sandi HP suamiku bukan tanggal pernikahan kami.|老公的手机密码，不是我们的结婚纪念日。',sub:'Tujuh tahun menikah. Lima belas menit untuk tahu semuanya.|结婚七年。十五分钟，看清一切。'},
 // ---------- PROLOG: the seed (laundry) ----------
 {k:'scene',clock:'19.40',tag:'19.40 · Rabu · Ruang cuci|19:40 · 星期三 · 洗衣间',tint:'harsh',img:'p-laundry.webp',lines:['Kantong kemeja Mas Dimas. Sobekan tiket bioskop.|老公衬衫的口袋里，有半张电影票。','Dua kursi. Kamis malam, Juni tahun lalu.|两个座位。去年六月，一个星期四的晚上。'],inner:'Dia nggak pernah ngajak aku nonton. Tujuh tahun, sekali pun nggak.|他从没带我看过电影。七年，一次都没有。'},
 {k:'scap',ticket:1,t:'Kertasnya lecek, tapi tintanya masih tajam.|纸皱了，字却还很清楚。'},
 {k:'scap',t:'Lebih dari setahun. Di kemeja yang kucuci tiap minggu — dan belum pernah ikut kecuci.|一年多了。在我每周都洗的衬衫里——却一次都没被洗过。'},
 {k:'scap',t:'Kuselipkan ke laci nakas. Aku tahu aku nggak akan nanya.|我把它塞进床头柜抽屉。我知道，我不会问的。'},
 // ---------- 22.31 bed, shower ----------
 {k:'scene',clock:'22.31',shower:1,tag:'22.31 · Kamar tidur|22:31 · 卧室',tint:'night',img:'p-bed.webp',lines:['Pintu kamar mandi menutup. Air mulai mengalir.|浴室门关上了。水声响起。','Lima belas menit. Tujuh tahun, Mas Dimas nggak pernah mandi lebih lama.|十五分钟。七年了，他洗澡从没超过十五分钟。'],inner:'Nayla sudah tidur di kamarnya. Rumah sunyi. Cuma suara air.|Nayla在自己房间睡着了。家里很静，只有水声。'},
 {k:'scap',t:'HP-nya di nakas. Telungkup. Sejak kapan dia menelungkupkan HP?|他的手机在床头柜上，扣着放。他什么时候开始把手机扣着放的？'},
 {k:'scap',t:'Di rak, lampu biru kamera bayi berkedip. Hadiah Dinda waktu Nayla lahir — nggak pernah kumatikan.|架子上，婴儿监控的蓝灯一闪一闪。Nayla出生时Dinda送的——我从没关过。'},
 {k:'dark',fx:'shake',t:'BZZT.|嗡——',sub:'Cahaya bocor dari bawah HP yang telungkup.|扣着的手机底下，漏出一圈光。'},
 // ---------- his lock screen ----------
 {k:'lock',clock:'22.33',day:'Rabu|星期三',dp:1,fx:'flash',notifs:[BUDI1]},
 {k:'inner',t:'Supplier kain nggak kirim hati.|卖布的供应商，不会发红心。'},
 {k:'choice',key:'grab',in:'lock',ms:9000,pilot:0,
  help:'Kalau aku diam, Laras yang dulu yang memilih — istri tujuh tahun yang selalu bilang “nggak apa-apa, Mas”. Rebut!|我不出手，以前的Laras就会替我选——那个七年来只会说“没事的，老公”的我。抢回来！',
  old:'Jangan. Itu HP-nya. Istri yang baik nggak ngintip.|别。那是他的手机。好妻子不偷看。',
  opts:[
   {t:'Taruh lagi. Bukan urusanku.|放回去。不关我的事。',re:[
     {k:'lock',clock:'22.33',fx:'shake',notifs:[BUDI2,BUDI1]},
     {k:'inner',t:'Menyala lagi. Kali ini tanganku nggak mau menaruhnya.|又亮了。这一次，我的手不肯再放下。'}]},
   {t:'Buka. Sekarang.|打开。现在。',re:[]}],
  ifMe:[{k:'inner',when:'grab=1',t:'Tanganku sendiri. Dingin, tapi nggak gemetar.|是我自己的手。冰凉，但没有抖。'}]},
 // ---------- passcode: two fast wrong tries, each reveals something ----------
 {k:'act',key:'pin1',mode:'pin',in:'lock',clock:'22.33',q:'Enam angka. Pasti tanggal nikah kami.|六位数。肯定是我们的结婚纪念日。',chip:{label:'12·10·19 · tanggal nikah|121019 · 结婚纪念日',code:'121019'},chipAfter:2000},
 {k:'inner',when:'pinfast!=1',fx:'shake',t:'Salah. Sembilan hari lalu anniversary ketujuh kami — dia bilang lupa.|不对。九天前是我们结婚七周年——他说他忘了。'},
 {k:'act',key:'pin2',mode:'pin',in:'lock',when:'pinfast!=1',clock:'22.34',q:'Ulang tahun Nayla?|Nayla的生日？',chip:{label:'03·03·21 · ultah Nayla|030321 · Nayla生日',code:'030321'},chipAfter:1800},
 {k:'lock',when:'pinfast!=1,2',clock:'22.34',lockout:1,fx:'shake',notifs:[RINA1,BUDI1]},
  {k:'inner',when:'pinfast!=1,2',t:'Terkunci. Lalu masuk pesan dari Rina — admin baru konveksi ibu mertuaku, 26 tahun. Mas Dimas sendiri yang mewawancarainya.|锁住了。偏偏这时进来一条：Rina——婆婆服装厂新来的行政，二十六岁，是我老公亲自面试的。'},
 {k:'memo',when:'pinfast!=1,2',clock:'22.35',t:'Tanggal yang penting buat dia, tapi bukan buat aku… Tiket itu.|对他重要、对我却不重要的日子……那张票。'},
 {k:'act',key:'pin3',mode:'pin',in:'lock',when:'pinfast!=1,2',final:1,ticket:1,clock:'22.35',q:'Kesempatan terakhir sebelum terkunci lagi.|最后一次机会，错了又要锁。',ticketAfter:6000},
 // ---------- unlocked: his home screen ----------
 {k:'hub',key:'h0',peek:1,clock:'22.36'},
 {k:'inner',t:'Kata sandi HP suamiku bukan tanggal pernikahan kami.|老公的手机密码，不是我们的结婚纪念日。'},
 {k:'inner',when:'pinfast=2',t:'Bukan ulang tahun Nayla. Aku sudah tahu tanggal yang mana.|不是Nayla的生日。我已经知道是哪一天了。'},
 {k:'inner',when:'pinfast=1',t:'Aku bahkan nggak mencoba tanggal nikah kami. Aku sudah tahu.|我连结婚纪念日都没试。我已经知道了。'},
 {k:'inner',fx:'shake',t:'Tapi tanggal dia nonton berdua dengan perempuan lain.|而是他和另一个女人看电影的那一天。'},
 {k:'pop',when:'pinfast=1,2',hub:1,ic:'💬',from:'Rina Admin Konveksi|Rina · 工坊行政',sub:'Chat · 22.36|聊天 · 22:36',t:'Pak, kunci gudang Cempaka saya bawa pulang ya. Besok saya buka jam 7 🙏|老板，Cempaka仓库的钥匙我带回家了哈。明天我七点开门🙏'},
 {k:'inner',when:'pinfast=1,2',t:'Rina. Admin baru di konveksi ibu mertuaku. Dua puluh enam tahun. Mas Dimas sendiri yang mewawancarainya.|Rina。婆婆服装厂新来的行政。二十六岁。是我老公亲自面试的。'},
 {k:'hub',key:'h1',end:'22.46',t:HUBT},
 {k:'inner',t:'Besok dia bisa bilang aku mimpi. Aku butuh bukti.|明天他可以说我在做梦。我需要证据。'},
 {k:'choice',key:'save',
  opts:[
   {t:'📤 Screenshot, kirim ke WA-ku · 1 menit|📤 截图，发到我的WA · 1分钟',re:[
      {k:'inner',cost:1,t:'Terkirim, lalu kuhapus dari HP-nya. Mulai sekarang, semua langsung kukirim.|发到我的WA，再从他手机上删掉。从现在起，找到什么就立刻发走。'}]},
   {t:'📸 Foto layarnya pakai HP-ku · 2 menit|📸 用我的手机拍下屏幕 · 2分钟',re:[
     {k:'inner',cost:2,t:'Mode senyap, flash mati. Jepret. Mulai sekarang, semua yang kutemukan kufoto.|静音，关闪光灯。咔嚓。从现在起，找到什么我都拍下来。'}]}]},
 {k:'hub',key:'h2',end:'22.46',t:HUBT2},
 // ---------- deduction: who is "Pak Budi"? (misdirection: Rina) ----------
 {k:'choice',key:'who',hub:1,lab:'Tebakanku|我的判断',
  opts:[
   {t:'Rina. Kunci gudang ada di dia.|Rina。仓库钥匙在她手上。',re:[{k:'inner',t:'Rina. Pasti Rina.|Rina。一定是Rina。'}]},
   {t:'Bukan Rina. Rina nggak kenal Dinda — cincin itu dari toko Dinda.|不是Rina。Rina不认识Dinda——那枚戒指出自Dinda常去的店。',when:'got:gallery',re:[{k:'inner',t:'Siapa pun dia, dia dekat dengan Dinda.|不管她是谁，她和Dinda走得很近。'}]},
   {t:'Belum tahu. Aku harus dengar suaranya.|还不知道。我得听听她的声音。',re:[]}]},
 // ---------- pressure 1: she calls ----------
 {k:'call',who:'B',name:'Pak Budi Supplier|Pak Budi Supplier',sub:'Panggilan suara · Chat|语音通话 · 聊天',fx:'shake'},
 {k:'choice',key:'ring',in:'call',ms:7000,pilot:2,
  old:'Jangan disentuh. Biarkan mati sendiri.|别碰。让它自己停。',
  opts:[
   {t:'Angkat. Jangan bersuara.|接起来。不出声。',re:[
     {k:'line',who:'B',t:'Mas? …Kok diem?|老公？……怎么不说话？'},
     {k:'line',who:'B',t:'Lagi mandi, ya? Ya udah. Besok aku tunggu di atas. Jangan bawa mobil.|在洗澡吧？那算了。明天我在楼上等你。别开车来。'},
     {k:'inner',cost:1,t:'Klik. Dia yang menutup duluan.|咔。她先挂了。'}]},
   {t:'Tolak.|拒接。',re:[
     {k:'inner',hub:1,t:'Kutolak — dan langsung menyesal. Di riwayat tertulis: “Ditolak.”|我按了拒接——马上就后悔了。通话记录上写着：“已拒接”。'},
     VN('0:07','“Mas, kok ditolak? …Ya udah. Besok aku tunggu di atas. Jangan bawa mobil.”|“老公，怎么挂我？……那算了。明天我在楼上等你。别开车来。”'),
     {k:'inner',t:'Kuputar dengan volume paling kecil, menempel di telinga.|我把音量调到最小，贴在耳边听了一遍。'}]},
   {t:'Biarkan berdering.|让它响。',re:[
     {k:'inner',hub:1,t:'Berdering. Berhenti. “Panggilan tak terjawab.”|响着。停了。“未接来电”。'},
     VN('0:06','“Mas? Lagi mandi, ya? Besok aku tunggu di atas. Jangan bawa mobil.”|“老公？在洗澡吧？明天我在楼上等你。别开车来。”'),
     {k:'inner',t:'Kuputar dengan volume paling kecil, menempel di telinga.|我把音量调到最小，贴在耳边听了一遍。'}]}],
  ifPilot:[{k:'inner',t:'Laras yang dulu bahkan nggak berani menyentuhnya.|以前的Laras，连碰都不敢碰。'}]},
 {k:'inner',t:'Suaranya pelan. Logat Jakarta. Rina orang Medan — suaranya keras, cepat.|她声音很轻，雅加达口音。Rina是棉兰人——嗓门大，语速快。'},
 {k:'inner',when:'who=0',fx:'shake',t:'Bukan Rina. Aku hampir menuduh orang yang salah.|不是Rina。我差点冤枉了人。'},
 {k:'inner',when:'who=1',t:'Benar. Bukan Rina.|没错。不是Rina。'},
 {k:'inner',when:'who=2',t:'Bukan Rina.|不是Rina。'},
 {k:'inner',fx:'shake',t:'Dan suara itu… pernah kudengar. Bukan di konveksi. Di mana?|而且这个声音……我听过。不是在服装厂。是在哪儿？'},
 // ---------- the vault (deduction 2) ----------
 {k:'pop',hub:1,ic:'🧮',from:'Kalkulator|计算器',sub:'baru saja|刚刚',t:'Brankas · 1 item baru disinkronkan|保险箱 · 已同步1个新项目',fx:'shake'},
 {k:'inner',t:'Kalkulator? Mas Dimas ngitung pakai kepala. Dan kalkulator nggak pernah “disinkronkan”.|计算器？我老公算账从不用计算器。而且计算器，怎么会“同步”？'},
 {k:'act',key:'vault',mode:'pin',in:'calc',code:'2110',cost:1,final:1,ticket:1,ticketAfter:8000,chip:{label:'21.10 · jam di tiket|21:10 · 票上的时间',code:'2110'},chipAfter:16000,lab:'Sandi brankas · 4 angka|保险箱密码 · 4位',q:'Petunjuk sandi: “jam pertama kita”.|密码提示：“我们第一次的时间”。'},
 {k:'inner',when:'vaultH!=1',t:'Tanggalnya jadi kode HP. Jamnya jadi kode brankas.|日期是手机密码，时间是保险箱密码。'},
 {k:'inner',when:'vaultH=1',t:'Jam di tiket. Tentu saja.|票上的时间。当然了。'},
 {k:'vault',focus:'card',t:'Brankas · 6 item|保险箱 · 6个项目'},
 {k:'inner',t:'Kartu akses Griya Sentosa. Tower B, unit 1708. Atas nama… aku.|Griya Sentosa的门禁卡。B座1708。持卡人……是我。'},
 {k:'vault',focus:'old',t:'Brankas · 6 item|保险箱 · 6个项目'},
  {k:'inner',t:'Lalu foto dari rak: aku, tidur. Empat Rabu — tiap malam sebelum Kamis.|然后是从架子上拍的照片：我在睡觉。四个星期三——每个星期四的前一晚。'},
 {k:'vault',focus:'new',fx:'shake',t:'Brankas · 6 item|保险箱 · 6个项目'},
  {k:'inner',fx:'shake',t:'Hari ini, 22.34. Aku — memegang HP-nya. Padahal Mas Dimas di kamar mandi.|今天22:34。是我——拿着他的手机。可我老公在浴室里。'},
 {k:'inner',fx:'shake',t:'Aku kira aku yang sedang mengintip. Ternyata ada yang menontonku mengintip.|我以为是我在偷看。原来有人在看我偷看。'},
  {k:'inner',t:'Tiket yang nggak pernah kecuci. HP telungkup. Lima belas menit. Semua ini… disiapkan buatku?|没洗过的票。扣着的手机。十五分钟。这一切……是给我准备的？'},
 // ---------- pressure 2: the towel ----------
 {k:'pop',style:'shout',ic:'🚿',from:'Mas Dimas · dari kamar mandi|老公 · 浴室里',t:'“Yang! Ambilin handuk dong, lupa!”|“老婆！帮我拿下毛巾，忘带了！”',fx:'shake'},
 {k:'choice',key:'towel',ms:6000,pilot:0,
  old:'Ambilkan. Kamu kan istrinya.|去拿啊。你是他老婆。',
  opts:[
   {t:'Ambilkan handuknya.|去拿毛巾。',re:[
     {k:'inner',cost:1,t:'Kutaruh HP-nya. Pintu terbuka sejengkal — uap, dan tangannya yang basah.|我放下手机。门开了一条缝——水汽，还有他湿漉漉的手。'},
     {k:'inner',t:'“Makasih, Sayang.” Tujuh tahun suara itu bikin aku tenang. Malam ini, aku mual.|“谢谢老婆。”七年来，这个声音总让我安心。今晚，我只想吐。'}]},
   {t:'Pura-pura nggak dengar.|装没听见。',re:[
     {k:'pop',style:'shout',ic:'🚿',from:'Mas Dimas · dari kamar mandi|老公 · 浴室里',t:'“Yang? …Ya udah, aku ambil sendiri.”|“老婆？……算了，我自己拿。”'},
     {k:'inner',fx:'shake',t:'Sekarang dia bisa keluar kapan saja.|现在，他随时可能出来。'}]}],
  ifPilot:[{k:'inner',t:'Laras yang dulu selalu datang kalau dipanggil.|以前的Laras，一叫就到。'}]},
 {k:'hub',key:'h3',when:'towel=0',end:'22.46',t:HUBT2},
 {k:'hub',key:'h4',when:'towel=0',end:'22.46',t:HUBT2},
 {k:'hub',key:'h3',when:'towel=1',end:'22.45',t:HUBT3},
 {k:'hub',key:'h4',when:'towel=1',end:'22.45',t:HUBT3},
 // ---------- the water stops ----------
 {k:'dark',when:'towel=0',clock:'22.46',shower:2,dp:0,fx:'shake',t:'Airnya berhenti.|水声停了。',sub:'22.46. Tepat lima belas menit.|22:46。正好十五分钟。'},
 {k:'dark',when:'towel=1',clock:'22.45',shower:2,dp:0,fx:'shake',t:'Airnya berhenti.|水声停了。',sub:'22.45. Semenit lebih cepat.|22:45。早了一分钟。'},
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
 {k:'scap',when:'water=0&ring=0',t:'Dan riwayat panggilan: “Pak Budi · terjawab · 0:14.” Aku lupa menghapusnya.|还有通话记录：“Pak Budi · 已接听 · 0:14”。我忘了删。'},
 {k:'scap',when:'water=0&ring=1',t:'Dan riwayat panggilan: “Pak Budi · ditolak.”|还有通话记录：“Pak Budi · 已拒接”。'},
 {k:'scap',when:'water=0',t:'Jempolnya berhenti bergerak. Lama.|他的拇指停住了。很久。'},
 {k:'scap',when:'water=0',fx:'shake',t:'Bzzt. HP di tangannya bergetar. Dari celah bulu mata, aku bisa membacanya:|嗡。他手里的手机震了一下。透过睫毛的缝隙，我看清了：'},
 {k:'scap',when:'water=0&ring=0',bn:1,from:'Pak Budi Supplier|Pak Budi Supplier',t:'Mas, tadi yang angkat siapa?|老公，刚才接电话的是谁？'},
 {k:'scap',when:'water=0&ring=1',bn:1,from:'Pak Budi Supplier|Pak Budi Supplier',t:'Mas, kok tadi ditolak? Istrimu belum tidur, ya?|老公，刚才怎么挂我？你老婆还没睡吧？'},
 {k:'scap',when:'water=0&ring=2&got:chat',bn:1,from:'Pak Budi Supplier|Pak Budi Supplier',t:'Mas, kok di-read doang? Istrimu belum tidur, ya?|老公，怎么已读不回？你老婆还没睡吧？'},
 {k:'scap',when:'water=0&ring=2&!got:chat',bn:1,from:'Pak Budi Supplier|Pak Budi Supplier',t:'Mas? Kok diem? Istrimu belum tidur, ya?|老公？怎么不说话？你老婆还没睡吧？'},
 {k:'say',when:'water=0&towel=1',who:'D',t:'Ras? …Tadi kupanggil, kok diem?|Laras？……刚才叫你，怎么不应？'},
 {k:'say',when:'water=0&towel!=1',who:'D',t:'Ras?|Laras？'},
 {k:'act',key:'still',when:'water=0',mode:'hold',in:'scene',q:'Jangan bergerak. Napas pelan, kayak orang tidur.|别动。呼吸放慢，像睡着的人那样。',btn:'Tahan: pura-pura tidur|按住：装睡',done:'Tiga detik. Lalu kasur melesak, dan dia berbisik ke HP-nya: “Udah tidur.”|三秒。然后床垫陷了下去，他对着手机轻声说：“睡了。”'},
 // --- B: confront ---
 {k:'scene',when:'water=1',shower:0,tag:'Pintu kamar mandi terbuka|浴室门开了',tint:'night',img:'p-confront.webp',lines:['Aku nggak menaruhnya. Aku duduk, HP-nya di tanganku.|我没放回去。我坐着，他的手机在我手里。','Dia berhenti. Handuk di leher. Matanya ke HP, lalu ke aku.|他停住了。毛巾搭在脖子上。眼睛先看手机，再看我。']},
 {k:'say',when:'water=1&towel=1',who:'D',t:'Ras, tadi kupanggil—|Laras，刚才叫你——'},
 {k:'say',when:'water=1',who:'L',t:'Siapa Pak Budi?|Pak Budi是谁？'},
 {k:'say',when:'water=1',who:'D',t:'Supplier kain. Kenapa HP-ku di kamu?|布料供应商。我手机怎么在你那儿？'},
 {k:'say',when:'water=1',who:'L',t:'Supplier kain kirim hati?|布料供应商会发红心？'},
 {k:'say',when:'water=1',who:'D',t:'Admin tokonya. Anak magang. Memang lebay.|他店里的客服，实习的小姑娘，说话就是夸张。'},
 {k:'say',when:'water=1&ring=0',who:'D',t:'Tadi… kamu angkat teleponnya?|刚才……你接了那个电话？'},
 {k:'scap',when:'water=1&ring=0',t:'Matanya nggak marah. Matanya takut.|他的眼神不是生气。是害怕。'},
 {k:'scap',when:'water=1',t:'Dia mengambil HP-nya dari tanganku. Pelan. Hampir lembut.|他从我手里把手机拿走。很轻。几乎算得上温柔。'},
 {k:'say',when:'water=1',who:'D',t:'Kamu tahu kodenya dari mana, Ras?|你怎么知道密码的，Laras？'},
 {k:'scap',when:'water=1',t:'Aku nggak menjawab. Di depanku, dia ganti kode, lalu mematikan lampu.|我没回答。他当着我的面改了密码，然后关了灯。'},
 {k:'inner',when:'water=1',fx:'shake',t:'Semua yang tadi kulihat, sekarang di balik kode baru. Yang tersisa cuma yang sempat kusimpan.|刚才看到的一切，现在都锁在新密码后面。剩下的，只有我来得及存下来的。'},
 {k:'say',when:'water=1',who:'D',t:'Tidur, Ras.|睡吧，Laras。'},
 {k:'act',key:'still',when:'water=1',mode:'hold',in:'scene',q:'Jangan nangis. Jangan di depan dia.|别哭。别在他面前哭。',btn:'Tahan: telan tangisnya|按住：把眼泪咽回去',done:'Punggungnya menghadapku. Lima menit, dia sudah mendengkur.|他背对着我。五分钟后，他打起了呼。'},
 // ---------- hook (both) ----------
 {k:'scene',clock:'23.20',tag:'23.20 · Dia sudah mendengkur|23:20 · 他已经打呼了',tint:'night',img:'p-cam-turn.webp',lines:['Kubuka aplikasi kamera Nayla di HP-ku sendiri.|我在自己的手机上，打开Nayla的摄像头App。','Perangkat terhubung: 2. HP-ku… dan satu lagi.|已连接设备：2台。我的手机……还有一台。']},
 {k:'scap',fx:'shake',t:'Namanya: “B-1708”.|设备名：“B-1708”。'},
 {k:'scap',t:'Tower B. Lantai 17. Unit yang kartunya atas namaku.|B座。十七楼。门禁卡上写着我名字的那一户。'},
 {k:'scap',t:'Lampu biru itu berkedip. Lalu lensanya berputar, pelan — ke arahku.|蓝灯闪了一下。然后镜头慢慢转了过来——对准了我。'},
 {k:'scap',fx:'shake',t:'Aku nggak menyentuh apa pun.|我什么都没碰。'},
 {k:'epend',ep:1,tease:'Besok Kamis. Aku akan naik ke lantai 17 — dan mengetuk pintu yang atas namaku.|明天是星期四。我要上十七楼——去敲那扇写着我名字的门。'},
 {k:'end',t:'Episode 2: Kamis malam, lantai 17. Pintu itu dibuka oleh wajah yang kukenal.|第2集：星期四晚上，十七楼。开门的，是一张我认识的脸。'}
];
const IMAGES=['p-laundry.webp','p-bed.webp','p-wall.webp','p-selfie.webp','p-apt.webp','p-pajama.webp','p-door.webp','p-confront.webp','p-cam-bed.webp','p-cam-turn.webp','av-L.webp','av-D.webp'];
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
 evName:{chat:'Pesan suara|语音',gallery:'Foto dihapus|已删照片',ride:'Tiap Kamis|每个星期四',bank:'Cicilan Rp8,5 jt|850万分期',shop:'Piyama|睡衣',vault:'Brankas|保险箱'},
 incoming:'Panggilan masuk…|来电……',oncall:'Tersambung · aku diam|已接通 · 我没出声',oncallN:'Tersambung · aku diam|已接通 · 我没出声',calcT:'Kalkulator|计算器',vaultT:'Brankas|保险箱',camL:'Kamera Nayla|Nayla的摄像头',newL:'BARU|新',
 stDed:'Deduksimu|你的推理',dPin:'Kode HP|手机密码',dWho:'“Pak Budi”|“Pak Budi”',dVault:'Kode brankas|保险箱密码',dSelf:'kamu yang menebak|你自己推出来的',dHint:'dibantu petunjuk|靠了提示',
 dWho0:'tertipu Rina|被Rina误导了',dWho1:'tepat — lewat cincin|猜对了——靠戒指',dWho2:'menunggu bukti|等到了证据',
 stPress:'Di bawah tekanan|压力之下',pRing:['Telepon: diangkat diam-diam|电话：偷偷接了','Telepon: ditolak|电话：拒接了','Telepon: dibiarkan berdering|电话：任它响'],pTowel:['Handuk: diambilkan|毛巾：拿去了','Handuk: pura-pura nggak dengar|毛巾：装没听见'],
 dim0:'Belum curiga.|还没起疑。',dim1:'Mulai curiga.|开始起疑了。',dim2:'Waspada — dia tahu ada yang membuka HP-nya.|起了戒心——他知道有人动过他的手机。'
};
const EPS=[{n:1,title:'Lima Belas Menit|十五分钟'},{n:2,title:'Kamis Malam, Lantai 17|星期四晚上，十七楼'}];
const api={TH,SAY,BEATS,UI,EPS,APPS,DECOR,TICKET,ANSWER,IMAGES,VAULT};if(typeof module!=='undefined')module.exports=api;else root.PHONE=api;
})(this);
