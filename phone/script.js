// Phone-first prototype, ep1 opening → 01:50 DM. The screen IS Nadira's phone. Every string 'id|zh'.
// Beat kinds: lock · msg · typing · sys · inner · mail · wallet · lensa · home · live · call · line · notes · dark · scene · say · scap · act · quick · choice · end
// v3 adds (ep2–6 in script-eps.js): ep · epend · paywall · unblur · gallery · draft · replay · scrollup; msg img/loc/gone/shot; when:'key=1&heat>=4&seen:x'
(function(root){
const TH={ // chat threads in 'Pesan'
 group:{name:'Wali Murid 2B|2B班家长群',sub:'48 anggota|48位成员',av:'👥'},
 ratna:{name:'Bu Ratna|Ratna太太',sub:'mantan mertua|前婆婆',av:'R'},
 raka:{name:'Raka|Raka',sub:'mantan suami · dulu “Suamiku ❤”|前夫 · 以前备注“老公❤”',av:'K'},
 maya:{name:'Maya|Maya',sub:'manajer|经纪人',av:'My'},
 salma:{name:'Salma|Salma',sub:'sahabat|闺蜜',av:'S'},
 arya:{name:'Arya|Arya',sub:'partner live|直播搭档',av:'A'},
 nanny:{name:'Mbak Tari (pengasuh)|Tari（保姆）',sub:'pengasuh anak-anak|孩子们的保姆',av:'T'},
 anon:{name:'akun_tanpa_nama|akun_tanpa_nama',sub:'Lensa · bukan pengikutmu|Lensa · 不是你的粉丝',av:'?',app:'lensa'},
 sheila:{name:'sheila.kirana|sheila.kirana',sub:'Lensa · 2 jt pengikut|Lensa · 200万粉丝',av:'Sh',app:'lensa'}
};
const SAY={N:{name:'Nadira|Nadira',me:true},H:{name:'Hana|Hana',tag:'anakku · 9 th|女儿 · 9岁'},R:{name:'Bu Ratna|Ratna太太',tag:'mantan mertua|前婆婆'},M:{name:'Mila|Mila',tag:'si bungsu · 6 th|小女儿 · 6岁'},A:{name:'Arya|Arya',tag:'partner live|直播搭档'},K:{name:'Raka|Raka',tag:'mantan suami|前夫'},Y:{name:'Maya|Maya',tag:'manajer|经纪人',ini:'My'},SH:{name:'Sheila|Sheila',tag:'mantan Arya · 25|Arya的前任 · 25岁',ini:'Sh'}};
const BEATS=[
 // ================= PROLOG (hook, ~20s, auto) =================
 {k:'dark',clock:'06.31',t:'Aku bangun pagi ini… sebagai penyanyi yang perceraiannya trending nomor 1 di Indonesia.|一觉醒来，我成了离婚冲上热搜第一的那个女明星。',sub:'#NadiraCerai · Trending #1|#Nadira离婚 · 热搜第一'},
 {k:'lock',clock:'06.32',day:'Kamis|星期四',fx:'flash',notifs:[{app:'Lensa',title:'Trending di Indonesia|印尼热搜榜',t:'#1 · #NadiraCerai · 2,4 jt postingan 🔥|第1 · #Nadira离婚 · 240万条帖子 🔥',time:'06.32'},{app:'KabarSeleb|星闻快报',title:'KabarSeleb · BREAKING|星闻快报 · 突发',t:'RESMI! Nadira & Raka cerai setelah 9 tahun. Hak asuh dua putri jadi sorotan.|官宣！Nadira与Raka结束九年婚姻，两个女儿的抚养权成焦点。',time:'06.30'}]},
 {k:'lock',clock:'06.34',day:'Kamis|星期四',notifs:[{app:'Lensa',title:'@lambe_rumpi_id|@lambe_rumpi_id（八卦号）',t:'Spill dikit ya bestie… katanya bukan cuma “nggak cocok” 👀🍿|姐妹们小透露一下……听说不只是“性格不合”哦 👀🍿',time:'06.33'},{app:'Lensa',title:'12 rb komentar baru|1.2万条新评论',t:'“Tim Nadira! Kuat ya, Kak 💪” · “Pantes suaminya pergi 🙄”|“挺Nadira！姐要撑住💪” · “难怪老公要走🙄”',time:'06.34'},{app:'Lensa',title:'Trending di Indonesia|印尼热搜榜',t:'#1 · #NadiraCerai · 2,4 jt postingan 🔥|第1 · #Nadira离婚 · 240万条帖子 🔥',time:'06.32'},{app:'KabarSeleb|星闻快报',title:'KabarSeleb · BREAKING|星闻快报 · 突发',t:'RESMI! Nadira & Raka cerai setelah 9 tahun. Hak asuh dua putri jadi sorotan.|官宣！Nadira与Raka结束九年婚姻，两个女儿的抚养权成焦点。',time:'06.30'}]},
 {k:'lock',clock:'06.36',day:'Kamis|星期四',fx:'shake',notifs:[{app:'Pesan',title:'Hana (HP Mbak Tari)|Hana（用Tari阿姨的手机）',t:'Ma, kok Mama di TikTok?|妈，你怎么上TikTok了？',time:'06.36'},{app:'Telepon',title:'Maya (manajer)|Maya（经纪人）',t:'5 panggilan tak terjawab|5个未接来电',time:'06.35'},{app:'Lensa',title:'@lambe_rumpi_id|@lambe_rumpi_id（八卦号）',t:'Spill dikit ya bestie… katanya bukan cuma “nggak cocok” 👀🍿|姐妹们小透露一下……听说不只是“性格不合”哦 👀🍿',time:'06.33'},{app:'Lensa',title:'12 rb komentar baru|1.2万条新评论',t:'“Tim Nadira! Kuat ya, Kak 💪” · “Pantes suaminya pergi 🙄”|“挺Nadira！姐要撑住💪” · “难怪老公要走🙄”',time:'06.34'},{app:'Lensa',title:'Trending di Indonesia|印尼热搜榜',t:'#1 · #NadiraCerai · 2,4 jt postingan 🔥|第1 · #Nadira离婚 · 240万条帖子 🔥',time:'06.32'},{app:'KabarSeleb|星闻快报',title:'KabarSeleb · BREAKING|星闻快报 · 突发',t:'RESMI! Nadira & Raka cerai setelah 9 tahun. Hak asuh dua putri jadi sorotan.|官宣！Nadira与Raka结束九年婚姻，两个女儿的抚养权成焦点。',time:'06.30'}]},
 {k:'act',key:'unlock',mode:'unlock',in:'lock',btn:'Face ID · Nadira — geser ke atas|面容ID · Nadira — 上滑解锁',done:'',clock:'06.40',notifs:[
   {app:'Pesan',title:'Wali Murid 2B|2B班家长群',thumb:'p-fakephoto.webp',t:'Bu Sinta: 📷 Foto · Bu, ini mamanya Hana, kan? Pantes cerai 🤭|Sinta太太：📷 照片 · 各位，这是Hana的妈妈吧？难怪离婚 🤭',time:'06.12'},
   {app:'Pesan',title:'Wali Murid 2B|2B班家长群',t:'+46 pesan baru|+46条新消息',time:'06.38'},
   {app:'Pesan',title:'Salma|Salma',t:'Kak?? Kamu udah lihat grup??|姐？？你看到群消息了吗？？',time:'06.31'}]},
 {k:'msg',th:'group',from:'Bu Sinta|Sinta太太',time:'06.12',photo:true,t:'Bu, ini mamanya Hana, kan? Pantes cerai 🤭|各位，这是Hana的妈妈吧？难怪离婚 🤭'},
 {k:'msg',th:'group',from:'Bu Dewi|Dewi太太',time:'06.14',t:'Astaga 😳 anak saya sekelas sama Hana.|天哪😳 我孩子跟Hana同班。'},
 {k:'msg',th:'group',from:'Pak Rudi|Rudi先生',time:'06.20',t:'Ini grup sekolah, Bu. Tolong dijaga, ada anak-anak.|这是学校群，请注意影响，这里有孩子。'},
 {k:'inner',t:'Aku nggak pernah ada di mobil itu. Tapi 46 orang sudah melihatnya.|我从没坐过那辆车。可已经有46个人看到了。'},
 {k:'choice',key:'group',th:'group',ms:14000,pilot:0,help:'Kalau aku diam, Nadira yang lama yang mengetik — selalu yang bikin orang lain nyaman. Rebut!|我不出手，以前的Nadira就会替我打字——永远打让别人舒服的那句。抢回来！',
  opts:[
   {t:'Minta maaf ke grup|向群里道歉',send:'Mohon maaf Bapak/Ibu atas kegaduhannya 🙏 Nanti saya jelaskan.|各位家长，抱歉给大家添麻烦了🙏 我之后会解释。',re:[
     {k:'msg',th:'group',from:'Bu Sinta|Sinta太太',time:'06.41',t:'Jelaskan apa, Bu? Fotonya jelas kok 🙂|解释什么呀？照片很清楚嘛🙂'},
     {k:'msg',th:'group',from:'Bu Dewi|Dewi太太',time:'06.41',t:'👍|👍'}]},
   {t:'Bilang itu palsu|说照片是假的',send:'Foto itu palsu. Saya sudah lapor polisi.|那张照片是假的。我已经报警了。',re:[
     {k:'msg',th:'group',from:'Bu Dewi|Dewi太太',time:'06.41',t:'Wah… berani juga 😶|哇……胆子挺大😶'},
     {k:'msg',th:'group',from:'Bu Sinta|Sinta太太',time:'06.42',t:'Semua juga bilang palsu, Bu.|谁都说是假的呀。'}]},
   {t:'🔕 Bisukan grup|🔕 屏蔽群消息',re:[
     {k:'sys',th:'group',t:'Grup dibisukan · 8 jam|已屏蔽群消息 · 8小时'},
     {k:'inner',t:'Sunyi. Tapi fotonya tetap di sana.|安静了。可照片还在那里。'}]}],
  ifPilot:[{k:'inner',fx:'shake',t:'Itu bukan aku yang mengetik. Itu Nadira yang lama.|刚才打字的不是我。是以前的Nadira。'}],
  ifMe:[{k:'inner',t:'Sembilan tahun dia mengetik untukku. Pagi ini nggak.|九年来都是她替我打字。今天早上不是。'}]},
 {k:'scene',clock:'06.41',tag:'06.41 · Dapur|06:41 · 厨房',tint:'cold',img:'p-hana-phone.webp',lines:['Hana berdiri di pintu dapur, ponsel pengasuh di tangannya.|Hana站在厨房门口，手里攥着保姆的手机。','Layarnya menyala. Fotoku.|屏幕亮着。是我的照片。'],inner:'Dia sudah lihat. Anakku sudah lihat.|她看到了。我女儿看到了。'},
 {k:'say',who:'H',ex:'hurt',t:'Mama… orang jahat?|妈妈……是坏人吗？'},
 {k:'act',key:'kneel',mode:'tap',in:'scene',btn:'🤲 Berlutut, raih tangannya|🤲 蹲下来，去牵她的手',done:'Aku berlutut. Hana mundur selangkah dari tanganku.|我蹲下来。Hana从我手边退了一步。'},
 {k:'say',who:'N',ex:'hurt',t:'Itu bukan Mama, Sayang. Ada orang bikin foto bohong.|那不是妈妈，宝贝。有人做了假照片。'},
 {k:'say',who:'H',ex:'angry',t:'Tapi kata Nenek, foto nggak bisa bohong.|可是奶奶说，照片不会骗人。'},
 {k:'scene',clock:'07.00',tag:'07.00 · Gerbang sekolah|07:00 · 校门口',tint:'harsh',img:'p-gate.webp',lines:['Bu Ratna sudah menunggu, kerudung krem, senyum menolong.|Ratna太太已经在等了，米色头巾，一脸来帮忙的笑。','Di belakangnya, ponsel-ponsel terangkat.|她身后，一部部手机举了起来。'],inner:'Jangan lari. Anak-anakmu di balik pagar itu.|别跑。你的孩子就在那道门后面。'},
 {k:'say',who:'R',ex:'neutral',t:'Hana, Mila, sini sama Nenek.|Hana，Mila，到奶奶这儿来。'},
 {k:'quick',key:'ratna',in:'scene',style:'say',q:'Dia sudah memegang tangan anak-anakku.|她已经牵起了我女儿们的手。',opts:[
   {t:'“Bu. Hari ini saya yang antar mereka.”|“妈。今天是我送她们。”',re:[{k:'say',who:'N',ex:'determined',t:'Bu. Hari ini saya yang antar mereka.|妈。今天是我送她们。'}]},
   {t:'(Diam. Senyum. Jangan bikin anak-anak takut.)|（不说话。笑。别吓到孩子。）',re:[{k:'scap',t:'Senyumku kaku. Senyum Bu Ratna lebih lebar.|我的笑很僵。Ratna太太笑得更开了。'}]}]},
 {k:'say',who:'R',ex:'determined',t:'Mulai hari ini Nenek yang antar-jemput. Mama kalian lagi banyak urusan.|从今天起奶奶接送。你们妈妈事情多。'},
 {k:'say',who:'M',ex:'hurt',t:'Mama nggak ikut?|妈妈不一起吗？'},
 {k:'quick',key:'gate',in:'scene',style:'act',fx:'shake',q:'KLANG! Gerbang dikunci di depan mukaku.|哐！铁门在我面前锁上了。',opts:[
   {t:'✊ Cengkeram gerbang|✊ 抓住铁门',re:[{k:'scap',img:'p-gate-closed.webp',fx:'shake',t:'Besinya panas kena matahari. Hana menoleh sekali.|铁栏被太阳晒得发烫。Hana回头看了一次。'}]},
   {t:'↩ Balik badan, jangan menangis di sini|↩ 转身走，别在这里哭',re:[{k:'scap',t:'Aku berjalan pergi. Kamera-kamera merekam punggungku.|我转身走开。一台台手机拍着我的背影。'}]}]},
 {k:'mail',clock:'10.02',from:'Lumière Skincare · Legal|Lumière护肤 · 法务部',subject:'Pemutusan Kontrak Brand Ambassador|品牌大使合约终止通知',t:'Berlaku hari ini. Sesuai pasal 14, denda Rp250.000.000 jatuh tempo 30 hari.|即日生效。依第14条，2.5亿印尼盾违约金须于30天内支付。'},
 {k:'wallet',clock:'11.15',fx:'shake',merchant:'Apotek Sehat · sirup demam anak|健康药房 · 儿童退烧糖浆',amt:'Rp86.500',t:'PEMBAYARAN GAGAL · Rekening bersama dibekukan · Saldo dompet: Rp8.000|支付失败 · 共同账户已冻结 · 钱包余额：Rp8,000'},
 {k:'typing',th:'ratna',clock:'11.20'},
 {k:'msg',th:'ratna',time:'11.20',t:'Anak-anak aman sama Ibu. Kamu urus dirimu dulu ya, Nadira. Malu dilihat orang.|孩子们跟着我很安全。你先管好你自己吧，Nadira。别让人看笑话。'},
 {k:'quick',key:'ratnaChat',in:'chat',th:'ratna',style:'reply',opts:[
   {t:'Ibu nggak berhak.|妈，您没有这个权利。',send:'Ibu nggak berhak ambil mereka.|妈，您没有权利把她们带走。',re:[{k:'msg',th:'ratna',time:'11.21',t:'Hak? Kamu mau bicara soal hak sekarang? 🙂|权利？你现在想跟我谈权利？🙂'}]},
   {t:'Iya, Bu. Makasih.|好的，妈。谢谢。',send:'Iya, Bu. Makasih.|好的，妈。谢谢。',re:[{k:'msg',th:'ratna',time:'11.21',t:'Nah. Begitu lebih baik.|这就对了。'}]}]},
 {k:'msg',th:'maya',clock:'11.32',time:'11.32',t:'Nad. Lumière telepon aku. JANGAN posting apa pun sebelum kita bicara.|Nad。Lumière给我打电话了。在我们谈之前，什么都别发。'},
 {k:'quick',key:'post',in:'lensa',style:'post',draft:'Foto itu PALSU. Aku nggak pernah ada di mobil itu, dan—|那张照片是假的。我从来没坐过那辆车，而且——',opts:[
   {t:'🗑 Hapus draf|🗑 删掉草稿',re:[{k:'inner',t:'Maya benar. Kali ini.|Maya说得对。这一次。'}]},
   {t:'📤 Posting|📤 发布',re:[{k:'lensa',posted:true,cmts:['@tante_julid: Ngeles 🙄|@tante_julid：又在狡辩🙄','@hanya_lewat: Kak, aku percaya kamu 💗|@hanya_lewat：姐，我信你💗']},{k:'msg',th:'maya',time:'11.40',t:'NAD!!! 😤|NAD！！！😤'}]}]},
 {k:'msg',th:'salma',clock:'19.50',time:'19.50',t:'Kak, kamu udah makan? Jangan cuma nangis. Aku pesenin makanan ya.|姐，你吃饭了吗？别光顾着哭。我给你点个外卖。'},
 {k:'msg',th:'arya',clock:'20.40',time:'20.40',t:'Live jam 9. Satu jam. Habis itu kamu boleh hancur. Sama aku.|九点直播。就一个小时。之后你可以崩溃。我陪你。'},
 {k:'home',clock:'20.59',t:'Buka LiveKu|打开LiveKu'},
 {k:'live',clock:'21.00',img:'p-live.webp',viewers:8214,cmt:'@tante_julid: Janda dua anak pacaran sama brondong? Pakai duit mantan ya, Kak? 😂|@tante_julid：两个孩子的离婚妈妈泡小鲜肉？花的是前夫的钱吧，姐？😂'},
 {k:'act',key:'breath',mode:'hold',in:'live',q:'Di bawah meja, tangan Arya di lututku. Jangan jatuh di sini.|桌子底下，Arya的手放在我膝盖上。别在这里倒下。',btn:'Tahan untuk menarik napas|按住，深呼吸',done:'Satu. Dua. Senyum lagi ke kamera.|一，二。重新对着镜头笑。'},
 {k:'live',viewers:9950,gift:'🌹',pin:'“Ini yang dia minta dari mantan.”|“这就是她找前夫要的钱。”',bill:true,fx:'flash',img:'p-live-shock.webp',cmt:'@akungosip: SPILL ini kak 👀|@akungosip：姐解释一下这个👀'},
 {k:'inner',t:'Bukti aku sudah bayar Rp92 juta? Dipotong.|我已经付了9200万的证明？被裁掉了。'},
 {k:'choice',key:'live',in:'live',ms:10000,pilot:1,old:'Jelaskan. Minta maaf. Lepaskan tangannya.|解释。道歉。松开他的手。',
  opts:[
   {t:'Angkat tangan kami ke kamera|把我们牵着的手举到镜头前',re:[
     {k:'live',img:'p-hands.webp',viewers:14408,gift:'🔥',cmt:'@kolom_komentar: WKWKWK BERANI 🔥 KAK SPILL!!|@kolom_komentar：哈哈哈敢啊🔥 姐快爆料！！'},
     {k:'inner',t:'Arya berbisik: “Berani juga kamu, Kak.”|Arya低声说：“胆子不小啊，姐。”'}]},
   {t:'Lepas tangannya, jelaskan tagihan|松开他的手，先把账说清楚',re:[
     {k:'live',viewers:6900,cmt:'@tante_julid: Drama 🙄 ngeles terus.|@tante_julid：又演🙄 一直找借口。'},
     {k:'inner',t:'Arya menarik tangannya. Pelan. Tanpa protes.|Arya把手收了回去。很轻，没有抱怨。'}]},
   {t:'Senyum. Balas komentarnya, pedas|笑。回怼那条评论',re:[
     {k:'live',viewers:12100,gift:'👏',cmt:'@kolom_komentar: MAMPUS TANTE 😭🔥|@kolom_komentar：阿姨被怼了😭🔥'},
     {k:'inner',t:'“Rp92 juta sudah kubayar, Tante. Mau lihat struknya?”|“9200万我已经付了，阿姨。要看收据吗？”'}]}],
  ifPilot:[{k:'inner',fx:'shake',t:'Lagi-lagi dia yang memilih.|又是她替我选了。'}],ifMe:[{k:'inner',t:'Tanganku sendiri. Akhirnya.|用我自己的手。终于。'}]},
 {k:'call',ep1:true,clock:'21.38',who:'K',name:'RAKA|RAKA',sub:'dulu tersimpan: “Suamiku ❤”|以前的备注：“老公❤”'},
 {k:'choice',key:'call',in:'call',ms:9000,pilot:0,old:'Angkat. Dia ayah anak-anakmu. Jangan bikin dia marah.|接。他是孩子的爸爸。别惹他生气。',
  opts:[
   {t:'✆ Angkat (live berakhir)|✆ 接听（直播结束）',re:[
     {k:'line',who:'K',t:'Aku harus tahu dari akun gosip kamu pacaran sama bocah?|我得从八卦号上才知道你跟个小孩谈恋爱？'},
     {k:'line',who:'N',t:'Dia bukan bocah. Dan kita sudah cerai.|他不是小孩。而且我们已经离婚了。'}]},
   {t:'✕ Tolak · balas “10 menit”|✕ 拒接 · 回复“十分钟”',send:'Lagi live. 10 menit.|在直播。十分钟。',th:'raka',re:[
     {k:'msg',th:'raka',time:'21.39',t:'Kamu selalu sibuk kalau aku butuh.|我需要你的时候，你永远在忙。'}]},
   {t:'✕ Tolak, lanjut live|✕ 拒接，继续直播',re:[
     {k:'live',viewers:15020,cmt:'@akungosip: Siapa yang nelpon kak? 👀|@akungosip：姐，谁打来的？👀'},
     {k:'inner',t:'Dia akan menelepon lagi. Selalu.|他还会再打来的。一直都是。'}]}],
  ifPilot:[{k:'inner',t:'Nadira yang lama mengangkatnya. Seperti biasa.|以前的Nadira接了。和往常一样。'}],ifMe:[{k:'inner',t:'Dua kali. Tanganku sendiri.|两次了。用我自己的手。'}]},
 {k:'msg',th:'raka',clock:'23.04',time:'23.04',t:'Besok Mila pentas di sekolah. Aku belum dapat undangan, Nad. Lagi.|明天Mila在学校演出。我又没收到邀请，Nad。又一次。'},
 {k:'msg',th:'nanny',clock:'23.06',time:'23.06',vn:'0:07',t:'',tr:'“Ma… kata Nenek kami tidur di sini dulu. Mama jangan nangis, ya. Mila udah tidur.”|“妈……奶奶说我们先睡这儿。妈妈别哭哦。Mila已经睡了。”'},
 {k:'scene',clock:'23.08',tag:'23.08 · Sesudah live, lampu mati|23:08 · 下播后，灯已关',tint:'night',img:'p-floor.webp',lines:['Ring light mati. Tinggal lampu jalan dari jendela.|环形灯灭了，只剩窗外的路灯。','Kuputar pesan itu dua kali. Arya duduk di sebelahku.|那条语音我放了两遍。Arya在我身边坐下。'],inner:'Jangan nangis di depan dia. Terlambat.|别在他面前哭。已经来不及了。'},
 {k:'say',who:'A',ex:'soft',t:'Aku di sini.|我在。'},
 {k:'scap',t:'Sembilan kali dia bilang itu. Aku menghitungnya.|他说了九次。我数着。'},
 {k:'notes',clock:'00.40',old:['Raka, aku capek. (2023)|Raka，我好累。（2023）','Bu, tolong jangan datang tanpa bilang. (2024)|妈，请别不打招呼就来。（2024）'],draft:'Hana, Mama bukan orang jahat. Mama cuma—|Hana，妈妈不是坏人。妈妈只是——'},
 {k:'act',key:'erase',mode:'hold',in:'notes',btn:'Tahan untuk menghapus|按住删除',done:'Dihapus. Seperti semua yang lain.|删掉了。和其他的一样。'},
 {k:'act',key:'facedown',clock:'01.48',notifs:[],q:'Tidur. Jangan lihat apa-apa lagi malam ini.|睡吧。今晚什么都别再看了。',mode:'drag',in:'lock',btn:'Seret ke bawah: telungkupkan ponsel|往下拖：把手机扣在桌上',done:''},
 {k:'dark',fx:'shake',t:'BZZT.|嗡——',sub:'Ponsel yang telungkup itu bergetar di meja.|扣着的手机在桌上震了起来。'},
 {k:'lock',clock:'01.50',day:'Jumat|星期五',fx:'flash',notifs:[{app:'Lensa',title:'akun_tanpa_nama|akun_tanpa_nama',thumb:'p-fakephoto.webp',t:'Kak, bukti transfer Rp92 juta-mu ada di aku. Foto mobil itu juga.|姐，你那9200万的转账凭证在我这儿。车里那张照片也是。',time:'01.50'}]},
 {k:'msg',th:'anon',time:'01.50',att:true,t:'Kak, bukti transfer Rp92 juta-mu ada di aku. Foto mobil itu juga.|姐，你那9200万的转账凭证在我这儿。车里那张照片也是。'},
 {k:'typing',th:'anon'},
 {k:'msg',th:'anon',time:'01.50',fx:'shake',t:'Mau tahu siapa yang bikin? :)|想知道是谁做的吗？:)'},
 {k:'epend',ep:1,tease:'Jam 01.52. Akun itu menunggu jawabanmu — dan seseorang berdiri di dekat pagarmu.|01:52。那个账号在等你回复——而有人站在你家门外不远处。'}
];
const BILL={school:'SD Tunas Bangsa · Rincian Biaya 2026/27|Tunas Bangsa小学 · 2026/27学年费用明细',rows:[['Uang pangkal (2 anak)|入学费（2个孩子）','Rp96.000.000'],['SPP 12 bulan × 2|学费 12个月 × 2','Rp62.400.000'],['Les & ekskul|补习与课外活动','Rp18.600.000'],['Seragam & buku|校服与书本','Rp10.000.000']],total:['TOTAL TAGIHAN|账单总计','Rp187.000.000'],cut:'— dipotong —|——截图到此——',by:'diunggah @akungosip|@akungosip 上传',paid:['Sudah dibayar Nadira|Nadira已支付','Rp92.000.000']};
const UI={
 tap:'Ketuk untuk lewati jeda|点一下可跳过等待',paused:'Dijeda|已暂停',newmsg:'Pesan baru ↓|新消息 ↓',tr:'Transkrip|转写',attT:'bukti_transfer.jpg|转账凭证.jpg',attC:'mobil.jpg|车里.jpg',attAmt:'Transfer berhasil · Rp92.000.000|转账成功 · Rp92.000.000',zoomCap:'Aku nggak pernah ada di mobil itu.|我从没坐过那辆车。',fake:'Foto ini palsu (rekayasa) — Nadira tidak pernah di mobil itu.|这张照片是伪造的——Nadira从没坐过那辆车。',menu:'Menu|菜单',reset:'Mulai ulang dari awal|从头开始',resetQ:'Mulai ulang? Progres & pilihan versi ponsel untuk pembaca ini dihapus. (Versi komik & novel tidak tersentuh.)|重新开始？本读者手机版的进度和选择都会被删除。（漫画版和小说版不受影响。）',yes:'Ya, mulai ulang|确定重置',no:'Batal|取消',
 typing:'sedang mengetik…|正在输入…',online:'online|在线',old:'Nadira yang lama mengetik…|以前的Nadira正在输入…',take:'Aku yang pilih!|我来选！',stamp:'AKU YANG PILIH|我来选',auto:'AUTO|AUTO',
 picked:'dipilih Nadira yang lama|以前的Nadira选的',mine:'pilihanku|我选的',quick:'Balas cepat|快速回复',act:'Aksi|动作',inner:'suara hati · ketuk bila mau|心声 · 想看就点',innerL:'suara hatiku|我的心声',
 photo:'foto.jpg · diteruskan 48×|照片 · 已转发48次',read:'Dibaca|已读',vn:'Pesan suara|语音消息',inbox:'Kotak masuk|收件箱',wallet:'DompetKu|钱包',lensaDraft:'Story baru · draf|新动态 · 草稿',
 live:'LIVE|直播中',viewers:'penonton|人在看',incoming:'Panggilan masuk…|来电……',oncall:'Sedang menelepon · 00:4|通话中 · 00:4',notes:'Catatan|备忘录',notesT:'Draf yang nggak pernah kukirim|从没发出去的草稿',
 unlockHint:'',end1:'Bersambung…|未完待续……',end2:'Lanjut?|继续？',endStat:'Kamu memilih sendiri {m} dari 3 kali.|三次选择里，你亲手选了 {m} 次。',again:'Ulangi dari awal|从头再玩',novel:'Baca lanjutannya (versi novel)|去看后续（小说版）',
 proto:'PROTOTIPE · versi ponsel|原型 · 手机版',apps:['Pesan|信息','Lensa|Lensa','LiveKu|LiveKu','Email|邮件','DompetKu|钱包','Galeri|相册','Catatan|备忘录','Kamera|相机','Telepon|电话']
};
const api={TH,SAY,BEATS,UI,BILL,EPS:[{n:1,title:'Foto Palsu di Grup Wali Murid|家长群里的假照片'}]};if(typeof module!=='undefined')module.exports=api;else root.PHONE=api;
})(this);
