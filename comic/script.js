// Ep 1 comic/chat-drama prototype script. Every string: 'id|zh'. One beat = one tap.
// kinds: say(who) · think · old · cap · sfx · phone(app) · choice · end. Optional: bg, place, fx('shake'|'flash'|'zoom'), tint.
(function(root){
const CAST={
 N:{name:'Nadira|Nadira',tag:'aku · mantan idol|我 · 前女团',me:true},
 H:{name:'Hana|Hana',tag:'anakku · 9 th|女儿 · 9岁'},
 R:{name:'Bu Ratna|Ratna太太',tag:'mantan mertua|前婆婆'},
 M:{name:'Mila|Mila',tag:'si bungsu · 6 th|小女儿 · 6岁'},
 A:{name:'Arya|Arya',tag:'partner live|直播搭档'},
 K:{name:'Raka|Raka',tag:'mantan suami|前夫'},
 O:{name:'Nadira lama|以前的Nadira',tag:'suara di kepalaku|我脑子里的声音',old:true}
};
const BEATS=[
 {k:'say',who:'H',ex:'hurt',img:'p-kitchen.webp',place:'06.40 · Dapur rumah|06:40 · 家里厨房',tint:'cold',fx:'zoom',t:'Mama… orang jahat?|妈妈……是坏人吗？'},
 {k:'phone',app:'group',title:'Wali Murid 2B|2B班家长群',time:'06.12|06:12',from:'Bu Sinta|Sinta太太',photo:true,t:'Bu, ini mamanya Hana, kan? Pantes cerai 🤭|各位，这是Hana的妈妈吧？难怪离婚 🤭'},
 {k:'think',ex:'hurt',fx:'shake',t:'Itu wajahku. Di mobil yang nggak pernah kunaiki.|那是我的脸。在一辆我从没坐过的车里。'},
 {k:'act',key:'kneel',mode:'tap',ex:'hurt',q:'Dia menatapku seperti menatap orang asing.|她看我的眼神，像在看一个陌生人。',btn:'🤲 Berlutut, raih tangannya|🤲 蹲下来，去牵她的手',done:'Aku berlutut. Hana mundur selangkah dari tanganku.|我蹲下来。Hana从我手边退了一步。'},
 {k:'say',who:'N',ex:'hurt',t:'Itu bukan Mama, Sayang. Ada orang bikin foto bohong.|那不是妈妈，宝贝。有人做了假照片。'},
 {k:'say',who:'H',ex:'angry',t:'Tapi kata Nenek, foto nggak bisa bohong.|可是奶奶说，照片不会骗人。'},
 {k:'set',lines:['Aku Nadira. Dulu idol, sekarang janda tiga bulan.|我是Nadira。以前是偶像，现在离婚三个月。','Kopi semalam masih dingin di meja. Tali sepatu Mila belum diikat.|昨晚的咖啡还冷在桌上。Mila的鞋带还没系。','Dalam satu jam, foto itu sampai ke gerbang sekolah lebih dulu dariku.|一个小时后，那张照片会比我先到校门口。']},
 {k:'act',key:'crowd',place:'07.00 · Gerbang sekolah|07:00 · 校门口',tx:'whip',tint:'harsh',blur:'p-gate.webp',lines:['Gerbang SD Tunas Bangsa. Matahari sudah galak.|Tunas Bangsa小学校门口。太阳已经很毒。','Barisan orang tua. Ponsel terangkat seperti pagar kedua.|家长们排成一排，举起的手机像第二道围墙。','Jangan lari. Anak-anakmu ada di balik pagar itu.|别跑。你的孩子就在那道墙后面。'],mode:'swipe',q:'Mereka nggak memberi jalan.|没人给我让路。',btn:'Geser untuk menerobos →|滑动，挤过人群 →',done:'Bahu-bahu menyingkir. Ada yang tetap merekam dari dekat.|肩膀一个个让开。有人凑到我脸前继续拍。'},
 {k:'sfx',img:'p-gate.webp',fx:'flash',t:'● REC|● REC',sub:'Semua kamera menoleh padaku.|所有镜头都转向了我。'},
 {k:'say',who:'R',ex:'neutral',t:'Hana, Mila, sini sama Nenek.|Hana，Mila，到奶奶这儿来。'},
 {k:'quick',key:'ratna',style:'say',q:'Bu Ratna sudah memegang tangan anak-anakku.|Ratna太太已经牵起了我女儿们的手。',opts:[
   {t:'“Bu. Hari ini saya yang antar mereka.”|“妈。今天是我送她们。”',re:[{k:'say',who:'N',ex:'determined',t:'Bu. Hari ini saya yang antar mereka.|妈。今天是我送她们。'}]},
   {t:'(Diam. Senyum. Jangan bikin anak-anak takut.)|（不说话。笑。别吓到孩子。）',re:[{k:'cap',t:'Senyumku kaku. Senyum Bu Ratna lebih lebar.|我的笑很僵。Ratna太太笑得更开了。'}]}]},
 {k:'say',who:'R',ex:'determined',t:'Mulai hari ini Nenek yang antar-jemput. Mama kalian lagi banyak urusan.|从今天起奶奶接送。你们妈妈事情多。'},
 {k:'say',who:'M',ex:'hurt',t:'Mama nggak ikut?|妈妈不一起吗？'},
 {k:'sfx',fx:'shake',t:'KLANG!|哐！',sub:'Gerbang besi ditutup di depan mukaku.|铁门在我面前关上。'},
 {k:'quick',key:'gate',style:'act',q:'Gerbang sudah terkunci. Kamera masih menyala.|门已经锁上了。镜头还开着。',opts:[
   {t:'✊ Cengkeram gerbang|✊ 抓住铁门',re:[{k:'cap',img:'p-gate-closed.webp',fx:'shake',t:'Besinya panas kena matahari. Aku nggak lepas.|铁栏被太阳晒得发烫。我没松手。'},{k:'think',ex:'hurt',t:'Hana menoleh sekali. Cuma sekali.|Hana回头看了一次。只有一次。'}]},
   {t:'↩ Balik badan, jangan menangis di sini|↩ 转身走，别在这里哭',re:[{k:'cap',t:'Aku berjalan pergi. Dua puluh kamera merekam punggungku.|我转身走开。二十台手机拍着我的背影。'},{k:'think',ex:'hurt',t:'Jangan nangis. Belum. Jangan di sini.|别哭。还不行。别在这里。'}]}]},
 {k:'set',place:'10.02 · Di luar pagar sekolah|10:02 · 校门外',tx:'push',tint:'harsh',blur:'p-curb.webp',lines:['Aku masih duduk di trotoar depan sekolah.|我还坐在校门外的马路牙子上。','Aspal panas. Tukang parkir pura-pura nggak mengenaliku.|柏油路发烫。停车大叔假装不认识我。','Belum sanggup pulang ke rumah yang kosong.|还没力气回那个空荡荡的家。']},
 {k:'phone',app:'notif',title:'Email · Lumière Skincare|邮件 · Lumière护肤',time:'10.02|10:02',t:'Kontrak diputus. Denda Rp250.000.000.|合约终止。违约金2.5亿印尼盾。'},
 {k:'phone',img:'p-pharmacy.webp',place:'11.15 · Apotek dekat sekolah|11:15 · 学校附近的药房',tx:'dip',tint:'harsh',app:'bank',title:'Bank|银行',time:'11.15|11:15',t:'DITOLAK · obat demam anak · saldo bebas Rp8.000|交易被拒 · 儿童退烧药 · 可用余额Rp8,000',fx:'flash'},
 {k:'phone',app:'wa',title:'Bu Ratna|Ratna太太',time:'11.20|11:20',t:'Anak-anak aman sama Ibu. Kamu urus dirimu dulu, Nadira. Malu dilihat orang.|孩子们跟着我很安全。你先管好你自己吧，Nadira。别让人看笑话。'},
 {k:'set',place:'21.00 · Live jualan parfum|21:00 · 香水带货直播',tx:'dip',tint:'warm',blur:'p-live.webp',lines:['Ruko sewaan, lantai dua. Satu ring light, empat puluh botol parfum.|租来的店铺二楼。一盏环形灯，四十瓶香水。','Komisi malam ini = uang pengacara.|今晚的佣金＝律师费。','Senyum. Dulu kamu tampil di depan sepuluh ribu orang.|笑。你曾经在一万人面前表演过。']},
 {k:'say',who:'A',ex:'neutral',img:'p-live.webp',t:'Satu jam. Habis itu kamu boleh hancur. Sama aku.|就一个小时。之后你可以崩溃。我陪你。'},
 {k:'phone',app:'live',title:'LIVE · 8.214|直播中 · 8,214',from:'@tante_julid',t:'Janda dua anak pacaran sama brondong? Pakai duit mantan ya, Kak? 😂|两个孩子的离婚妈妈泡小鲜肉？花的是前夫的钱吧，姐？😂'},
 {k:'act',key:'breath',mode:'hold',ex:'hurt',q:'Di bawah meja, tangan Arya mendarat di lututku. Jangan jatuh di sini.|桌子底下，Arya的手落在我膝盖上。别在这里倒下。',btn:'Tahan untuk menarik napas|按住，深呼吸',done:'Satu. Dua. Senyum lagi ke kamera.|一，二。重新对着镜头笑。'},
 {k:'phone',img:'p-live-shock.webp',app:'live',title:'LIVE · 9.950|直播中 · 9,950',from:'@akungosip',pin:true,fx:'flash',t:'📄 Tagihan sekolah Rp187 juta. “Ini yang dia minta dari mantan.”|📄 学费账单1.87亿。“这就是她找前夫要的钱。”'},
 {k:'think',ex:'hurt',t:'Bukti aku sudah bayar Rp92 juta? Dipotong.|我已经付了9200万的证明？被裁掉了。'},
 {k:'old',fx:'glitch',t:'Jelaskan. Minta maaf. Lepaskan tangannya. Biar aku yang pilih.|解释。道歉。松开他的手。让我来选。'},
 {k:'choice',key:'live',ms:14000,pilot:1,help:'Kalau aku diam, dia yang memilih — selalu yang bikin orang lain nyaman. Rebut!|我不出手，她就替我选——永远选让别人舒服的那个。抢回来！',
  q:'Kamera masih menyala. Ribuan orang menunggu aku jatuh.|镜头还开着，几千人等着看我崩溃。',
  opts:[
   {t:'Angkat tangan kami ke kamera.|把我们牵着的手举到镜头前。',re:[
     {k:'say',who:'N',ex:'determined',img:'p-hands.webp',fx:'zoom',t:'Iya, ini pacar saya. Parfumnya dia beli sendiri.|对，这是我男朋友。他的香水，他自己买的。'},
     {k:'phone',app:'live',title:'LIVE · 14.408|直播中 · 14,408',from:'@kolom_komentar',t:'WKWKWK BERANI 🔥🔥 · KAK SPILL!!|哈哈哈哈敢啊🔥🔥 · 姐快爆料！！'},
     {k:'say',who:'A',ex:'soft',t:'(berbisik) Berani juga kamu, Kak.|（低声）胆子不小啊，姐。'}]},
   {t:'Lepas tangannya. Jelaskan tagihannya.|松开他的手，先把账说清楚。',re:[
     {k:'cap',img:'p-live.webp',t:'Tanganku lepas duluan, sebelum aku sadar.|我还没反应过来，手已经先松开了。'},
     {k:'say',who:'N',ex:'hurt',t:'Saya cuma mau meluruskan, tagihan itu—|我只是想澄清一下，那张账单——'},
     {k:'phone',app:'live',title:'LIVE · 6.900|直播中 · 6,900',from:'@tante_julid',t:'Drama 🙄 Ngeles terus.|又演 🙄 一直在找借口。'},
     {k:'think',ex:'hurt',t:'Arya menarik tangannya. Pelan. Tanpa protes.|Arya把手收了回去。很轻。没有抱怨。'}]},
   {t:'Senyum. Balas komentarnya, pedas.|笑。回怼那条评论。',re:[
     {k:'say',who:'N',ex:'determined',img:'p-live.webp',t:'Duit mantan? Rp92 juta sudah kubayar, Tante. Mau lihat struknya?|前夫的钱？9200万我已经付了，阿姨。要看收据吗？'},
     {k:'phone',app:'live',title:'LIVE · 12.100|直播中 · 12,100',from:'@kolom_komentar',t:'MAMPUS TANTE 😭🔥 tunjukin kak!|阿姨被怼了😭🔥 姐快拿出来！'},
     {k:'say',who:'A',ex:'soft',t:'Nah. Itu baru partner-ku.|这才是我的搭档。'}]}
  ],
  ifPilot:[{k:'think',ex:'hurt',fx:'shake',t:'Itu bukan aku yang memilih. Itu Nadira yang lama.|刚才选的不是我。是以前的Nadira。'}],
  ifMe:[{k:'think',ex:'determined',t:'Sembilan tahun dia memilih untukku. Malam ini nggak.|九年来都是她替我选。今晚不是。'}]},
 {k:'phone',img:'p-live.webp',app:'call',title:'RAKA|RAKA',fx:'shake',t:'dulu tersimpan: “Suamiku ❤”|以前的备注：“老公❤”'},
 {k:'say',who:'A',ex:'soft',t:'Angkat aja. Aku nggak ke mana-mana.|接吧。我哪儿也不去。'},
 {k:'old',fx:'glitch',t:'Matikan live. Dia ayah anak-anakmu. Jangan bikin dia marah.|关掉直播。他是孩子的爸爸。别惹他生气。'},
 {k:'choice',key:'call',ms:10000,pilot:0,q:'Ponsel bergetar di samping botol parfum.|手机在香水瓶旁边震动。',
  opts:[
   {t:'Matikan live. Angkat teleponnya.|关掉直播，接电话。',re:[
     {k:'phone',img:'p-call.webp',app:'live',title:'LIVE BERAKHIR|直播已结束',from:'',t:'Komisi malam ini: Rp0|今晚佣金：Rp0'},
     {k:'say',who:'K',ex:'angry',t:'Aku harus tahu dari akun gosip kamu pacaran sama bocah?|我得从八卦号上才知道你跟个小孩谈恋爱？'},
     {k:'say',who:'N',ex:'angry',t:'Dia bukan bocah. Dan kita sudah cerai.|他不是小孩。而且我们已经离婚了。'}]},
   {t:'Balas chat: “sepuluh menit.”|回消息：“十分钟。”',re:[
     {k:'phone',img:'p-live-shock.webp',app:'wa',title:'Raka|Raka',time:'21.40|21:40',mine:true,t:'Lagi live. Sepuluh menit.|在直播。十分钟。'},
     {k:'phone',app:'wa',title:'Raka|Raka',time:'21.40|21:40',t:'Kamu selalu sibuk kalau aku butuh.|我需要你的时候，你永远在忙。'},
     {k:'think',ex:'angry',t:'Sembilan tahun, dan dia masih bilang begitu.|九年了，他还是这句话。'}]},
   {t:'Minta Arya keluar frame dulu.|让Arya先离开镜头。',re:[
     {k:'say',who:'N',ex:'hurt',img:'p-solo.webp',t:'(berbisik) Ar… keluar frame sebentar.|（低声）Ar……先出镜头一下。'},
     {k:'cap',t:'Dia mundur ke balik ring light. Tanpa membantah.|他退到环形灯后面，一句话也没反驳。'},
     {k:'think',ex:'hurt',t:'Kenapa aku yang menyembunyikan dia?|为什么是我把他藏起来？'}]}
  ],
  ifPilot:[{k:'think',ex:'hurt',t:'Lagi-lagi dia yang memilih. Lain kali, aku duluan.|又是她替我选了。下一次，我先出手。'}],
  ifMe:[{k:'think',ex:'determined',t:'Dua kali. Tanganku sendiri.|两次了。用我自己的手。'}]},
 {k:'set',place:'23.08 · Sesudah live, lampu mati|23:08 · 下播后，灯已关',tx:'black',txw:'klik.|咔嗒。',tint:'night',blur:'p-floor.webp',lines:['Live selesai. Lampu dimatikan, tinggal lampu jalan dari jendela.|直播结束。灯关了，只剩窗外的路灯。','Bau vanila dan kardus. Arya membereskan kabel tanpa suara.|空气里是香草和纸箱的味道。Arya不出声地收着电线。']},
 {k:'phone',app:'wa',title:'Raka|Raka',time:'23.08|23:08',t:'Besok Mila pentas di sekolah. Aku belum dapat undangan, Nad. Lagi.|明天Mila在学校演出。我又没收到邀请，Nad。又一次。'},
 {k:'phone',app:'vn',title:'Nomor pengasuh|保姆的号码',t:'“Ma… kata Nenek kami tidur di sini dulu. Mama jangan nangis, ya. Mila udah tidur.”|“妈……奶奶说我们先睡这儿。妈妈别哭哦。Mila已经睡了。”'},
 {k:'think',ex:'hurt',t:'Kuputar dua kali. Tanpa suara.|我放了两遍。没出声。'},
 {k:'cap',t:'Arya duduk di sebelahku. Diam.|Arya在我身边坐下，一言不发。'},
 {k:'say',who:'A',ex:'soft',img:'p-floor.webp',t:'Aku di sini.|我在。'},
 {k:'think',ex:'hurt',t:'Sembilan kali dia bilang itu. Aku menghitungnya.|他说了九次。我数着。'},
 {k:'act',key:'facedown',place:'01.50 · Kamarku, rumah kosong|01:50 · 我的卧室，空荡的家',tx:'black',tint:'night',blur:'p-bedroom.webp',lines:['Arya mengantarku pulang. Rumah terlalu sunyi.|Arya送我回家。家里太安静了。','Ikat rambut kupu-kupu Hana masih di sakuku.|Hana的蝴蝶发圈还在我口袋里。','Tidur. Besok kamu harus jadi ibu lagi.|睡吧。明天你还得接着当妈妈。'],mode:'drag',q:'Satu notifikasi lagi dan aku akan pecah.|再来一条通知，我就要崩溃了。',btn:'Seret ponsel ke bawah, telungkupkan|把手机往下拖，扣在桌上',done:'Layar gelap. Tiga detik sunyi.|屏幕黑了。安静了三秒。'},
 {k:'sfx',fx:'shake',t:'BZZT.|嗡——',sub:'Ponsel yang telungkup itu bergetar di meja kayu.|扣着的手机在木桌上震了起来。'},
 {k:'phone',img:'p-bedroom.webp',app:'dm',title:'akun tanpa foto|无头像账号',time:'01.50|01:50',fx:'shake',tint:'red',t:'Kak, bukti transfer Rp92 juta-mu ada di aku. Foto mobil itu juga.|姐，你那9200万的转账凭证在我这儿。车里那张照片也是。'},
 {k:'phone',app:'dm',title:'akun tanpa foto|无头像账号',time:'01.50|01:50',fx:'flash',t:'Mau tahu siapa yang bikin? :)|想知道是谁做的吗？:)'},
 {k:'end'}
];
const UI={
 quickL:'Reaksi cepat|快速反应',actL:'Aksi|动作',holdL:'Tahan…|按住…',
 title:'Ep 1 · Mama Orang Jahat?|第1章 · 妈妈是坏人吗？',tap:'Ketuk untuk lanjut|点击继续',back:'Kembali|上一步',
 auto:'AUTO|AUTO',picking:'Nadira lama memilih untukku|以前的Nadira正在替我选',take:'Aku yang pilih!|我来选！',stamp:'AKU YANG PILIH|我来选',
 picked:'dipilih Nadira lama|以前的Nadira选的',mine:'pilihanku|我选的',think:'batin|心声',
 menu:'Menu|菜单',reset:'Mulai ulang dari awal|从头开始',resetQ:'Mulai ulang komik ini? Progres & pilihan komik pembaca ini dihapus. (Versi novel tidak tersentuh.)|重新开始？本读者的漫画进度和选择都会被删除。（小说版不受影响。）',
 yes:'Ya, mulai ulang|确定重置',no:'Batal|取消',autoplay:'Putar otomatis|自动播放',
 endT:'Bersambung…|未完待续……',endQ:'Lanjut?|继续？',endStat:'Kamu memilih sendiri {m} dari 2 kali.|两次选择里，你亲手选了 {m} 次。',
 again:'Ulangi dari awal|从头再看',novel:'Baca lanjutannya (versi novel)|去看后续（小说版）',proto:'PROTOTIPE · format komik|原型 · 漫画版',
 photo:'foto.jpg · diteruskan 48×|照片 · 已转发48次',vn:'Pesan suara · 0:07|语音消息 · 0:07',call:'Panggilan masuk…|来电……',pinned:'DISEMATKAN|置顶'
};
const api={CAST,BEATS,UI};
if(typeof module!=='undefined')module.exports=api;else root.COMIC=api;
})(this);
