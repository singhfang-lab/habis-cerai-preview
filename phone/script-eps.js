// Episodes 2–6 (v3). Appended to window.PHONE.BEATS. Paywall sits between ep5 and ep6.
// Every string 'id|zh' with exactly one '|'. Keys are prefixed per episode (e2…, e3…).
(function(root){
const P=root.PHONE;const B=P.BEATS;
const EPS=[
 {n:1,title:'Foto Palsu di Grup Wali Murid|家长群里的假照片'},
 {n:2,title:'Jam Dua Pagi, Ada yang di Depan Pagar|凌晨两点，门外有人'},
 {n:3,title:'Kursi Sebelahku Diambil Mantan Mertua|我旁边的座位，被前婆婆占了'},
 {n:4,title:'Brand Mau Dia — Plus Mantannya|品牌要他——外加他的前女友'},
 {n:5,title:'Air Mata Mantan Mertua di LiveKu|前婆婆在直播间哭了'},
 {n:6,title:'Hujan, Bubur, dan Rahasia Sepuluh Tahun|雨、粥，和十年的秘密',paid:true}];
B.push(
// ================= EP 2 =================
 {k:'ep',ep:2,clock:'01.51',day:'Jumat|星期五',prev:'Sebelumnya: foto palsu, Rp92 juta yang dipotong, dan satu DM tanpa nama.|前情：假照片、被裁掉的9200万，和一条匿名私信。'},
 {k:'msg',th:'anon',time:'01.51',fx:'shake',t:'Aku bisa hapus semuanya. Atau sebar sisanya jam 7 pagi, pas grup wali murid bangun.|我可以全部删掉。也可以早上7点，等家长群醒来，把剩下的发出去。'},
 {k:'choice',key:'e2anon',th:'anon',ms:12000,pilot:0,old:'Perempuan baik nggak bikin ribut. Bayar. Biar diam.|好女人不惹事。给钱。让他闭嘴。',
  opts:[
   {t:'“Tolong hapus. Saya bayar.”|“求你删掉。我付钱。”',send:'Tolong hapus. Berapa pun, saya bayar.|求你删掉。多少钱我都给。',re:[
     {k:'msg',th:'anon',time:'01.52',t:'Kakak nggak berubah ya. Dari dulu bayar biar orang lain diam :)|姐还是没变啊。一直都是花钱让别人闭嘴 :)'}]},
   {t:'“Siapa kamu?”|“你是谁？”',send:'Siapa kamu?|你是谁？',re:[
     {k:'msg',th:'anon',time:'01.52',t:'Orang yang pengin Nadira yang asli bangun :)|一个想让真正的Nadira醒过来的人 :)'}]},
   {t:'“Sudah kuscreenshot. Aku lapor.”|“已经截图了。我去报警。”',send:'Sudah kuscreenshot. Pagi ini aku lapor polisi.|已经截图了。今天早上我就报警。',re:[
     {k:'msg',th:'anon',time:'01.52',t:'Silakan, Kak. Polisi belum kenal Kakak selama aku kenal Kakak :)|请便，姐。警察认识你的时间，可没我长 :)'}]}],
  ifPilot:[{k:'inner',fx:'shake',t:'“Perempuan baik nggak bikin ribut.” Kalimat itu bukan punyaku. Punya siapa?|“好女人不惹事。”这句话不是我的。是谁的？'}],
  ifMe:[{k:'inner',t:'Jariku gemetar. Tapi itu jariku sendiri.|我的手指在抖。但那是我自己的手指。'}]},
 {k:'sys',th:'anon',t:'akun_tanpa_nama offline · terakhir aktif 01.52|akun_tanpa_nama 已离线 · 最后在线 01:52'},
 {k:'inner',t:'“Kak.” Titik dua, kurung tutup. Aku pernah lihat senyum kecil itu. Di mana?|“姐。”冒号，右括号。这个小小的笑脸我见过。在哪儿？'},
 {k:'msg',th:'arya',clock:'01.58',time:'01.58',t:'Lampu dapurmu masih nyala.|你家厨房的灯还亮着。'},
 {k:'msg',th:'arya',time:'01.58',loc:'Warung Bu Yati · 40 m darimu|Yati阿姨小摊 · 距你40米',t:''},
 {k:'msg',th:'arya',time:'01.59',t:'Aku nggak bisa tidur. Kamu juga, kan.|我睡不着。你也是吧。'},
 {k:'msg',th:'arya',time:'01.59',gone:true,t:'Aku kangen kamu dari jauh sebelum—|我早在很久以前就开始想你——'},
 {k:'inner',t:'Sebelum apa? Dia menghapusnya sebelum aku sempat membaca ujungnya.|很久以前是多久？没等我看完，他就删了。'},
 {k:'msg',th:'arya',time:'02.00',t:'Aku bawa mangga. Buka pintu, atau aku makan sendiri di sini sambil kedinginan.|我带了芒果。开门，或者我在这儿一个人边冻边吃。'},
 {k:'quick',key:'e2door',in:'chat',th:'arya',style:'reply',opts:[
   {t:'🔓 “Pintu samping. Jangan berisik.”|🔓 “走侧门。别出声。”',a:1,send:'Pintu samping. Jangan berisik.|走侧门。别出声。',re:[{k:'msg',th:'arya',time:'02.01',t:'Siap, Kak 🤫|收到，姐🤫'}]},
   {t:'“Pulang, Arya. Tetangga lihat.”|“回去吧，Arya。邻居会看见。”',send:'Pulang, Arya. Tetangga lihat.|回去吧，Arya。邻居会看见。',re:[{k:'msg',th:'arya',time:'02.01',t:'Tetangga tidur. Aku cuma mau lihat kamu makan. Lima menit.|邻居都睡了。我只想看你吃点东西。五分钟。'},{k:'inner',t:'Empat menit kemudian, aku membuka pintu samping.|四分钟后，我打开了侧门。'}]}]},
 {k:'scene',clock:'02.06',tag:'02.06 · Dapur, lampu kabinet|02:06 · 厨房，橱柜灯',tint:'night',img:'p-kitchen.webp',lines:['Dia mengupas mangga di dapurku seperti sudah seratus kali.|他在我家厨房削芒果，熟练得像来过一百次。','Kaus hitam, lengan digulung, pisauku di tangannya.|黑T恤，袖子卷着，我的刀在他手里。'],inner:'Kapan terakhir ada orang memotongkan buah untukku?|上一次有人给我切水果，是什么时候？'},
 {k:'say',who:'A',ex:'soft',t:'Buka mulut, Kak.|张嘴，姐。'},
 {k:'scap',t:'Manis. Lengket. Ibu jarinya mengusap sudut bibirku, pelan sekali.|很甜，黏在唇上。他的拇指擦过我的嘴角，很慢。'},
 {k:'say',who:'A',ex:'soft',t:'Boleh aku cium kamu?|我能吻你吗？'},
 {k:'choice',key:'e2kiss',ms:11000,pilot:0,old:'Perempuan baik nggak bikin ribut. Suruh dia pulang.|好女人不惹事。让他回去。',
  opts:[
   {t:'“Pulang, Arya. Nanti orang ngomong.”|“回去吧，Arya。别人会说闲话的。”',a:-1,re:[
     {k:'say',who:'A',ex:'neutral',t:'Orang sudah ngomong, Kak. Dari kemarin.|姐，别人早就在说了。从昨天开始。'},
     {k:'scap',t:'Dia tetap mencuci pisauku dulu. Baru pergi.|他还是先把我的刀洗了，才走。'}]},
   {t:'Tarik kerahnya. Jangan jawab.|揪住他的领口。不回答。',a:2,re:[
     {k:'scap',fx:'shake',t:'Bibirnya tinggal satu napas dari bibirku—|他的唇离我只剩一口气——'}]},
   {t:'“Belum. Tanya lagi besok.”|“还不行。明天再问一次。”',a:1,re:[
     {k:'say',who:'A',ex:'soft',t:'Kucatat. Besok. Jam yang sama.|记下了。明天，同一时间。'}]}],
  ifPilot:[{k:'inner',fx:'shake',t:'Nadira yang lama menyuruhnya pulang. Mulutku masih manis mangga.|以前的Nadira让他走了。我嘴里还是芒果的甜。'}],
  ifMe:[{k:'inner',t:'Kali ini aku nggak minta maaf karena menginginkan sesuatu.|这一次，我没有因为想要什么而道歉。'}]},
 {k:'msg',th:'ratna',clock:'02.14',time:'02.14',fx:'shake',t:'Tetangga kirim foto. Motor laki-laki di depan rumahmu jam 2 pagi. Anak-anak biar sama Ibu dulu sampai kamu sadar.|邻居给我发了照片。凌晨两点，你家门口停着男人的摩托。孩子们先跟着我，等你清醒了再说。'},
 {k:'say',who:'A',ex:'neutral',when:'e2kiss=1,2',t:'Angkat. Aku nggak ke mana-mana.|你看吧。我哪儿也不去。'},
 {k:'msg',th:'ratna',time:'02.15',t:'Satu lagi. Raka belum dapat undangan pentas Mila. Kamu mau anakmu malu di depan teman-temannya?|还有。Raka还没收到Mila演出的邀请。你想让孩子在同学面前丢脸吗？'},
 {k:'inner',t:'Tetangga mana yang bangun jam dua pagi — dan punya nomor Bu Ratna?|哪个邻居凌晨两点醒着——还存着Ratna太太的号码？'},
 {k:'draft',th:'raka',clock:'02.17',t:'Pentas Mila: Jumat 15.30, aula SD Tunas Bangsa. Kursi B12.|Mila的演出：周五15:30，Tunas Bangsa小学礼堂。座位B12。'},
 {k:'inner',t:'Kutulis seminggu lalu. Nggak pernah kukirim.|一周前就写好了。一直没发。'},
 {k:'choice',key:'e2invite',th:'raka',ms:11000,pilot:0,old:'Minta maaf duluan. Biar Ibu nggak marah.|先道歉。别让妈生气。',
  opts:[
   {t:'Minta maaf + “mau duduk sebelahku?”|道歉 + “要坐我旁边吗？”',a:-1,send:'Maaf banget aku lupa 🙏 Jumat 15.30, kursi B12. Kamu mau duduk sebelahku?|真的对不起我忘了🙏 周五15:30，B12座。你要坐我旁边吗？',re:[
     {k:'msg',th:'raka',time:'02.18',t:'Oke. Kamu datang sendirian, kan?|好。你一个人来吧？'}]},
   {t:'Jam dan kursi saja.|只发时间和座位。',send:'Jumat 15.30. Kursi B12.|周五15:30。B12座。',re:[
     {k:'typing',th:'raka',stop:true},{k:'msg',th:'raka',time:'02.19',t:'Oke.|好。'},
     {k:'inner',t:'Dia mengetik lama. Lalu cuma “Oke”.|他打了很久。最后只发了一个“好”。'}]},
   {t:'+ “Tanya ibumu siapa yang motret rumahku.”|+ “问问你妈是谁在拍我家。”',send:'15.30, kursi B12. Dan tanya ibumu, siapa yang motret rumahku jam dua pagi.|15:30，B12座。还有，问问你妈，是谁凌晨两点在拍我家。',re:[
     {k:'msg',th:'raka',time:'02.19',t:'Jangan mulai, Nad. Jam dua pagi.|别闹了，Nad。凌晨两点。'}]}],
  ifPilot:[{k:'inner',t:'Maaf, lagi. Sejak jam enam kemarin aku sudah minta maaf ke semua orang.|又是对不起。从昨天早上六点起，我已经跟所有人道过歉了。'}],
  ifMe:[{k:'inner',t:'Nggak ada “maaf”. Rasanya seperti melepas sepatu yang kekecilan.|没有“对不起”。像脱下一双小了一号的鞋。'}]},
 {k:'msg',th:'arya',clock:'03.12',time:'03.12',vn:'0:09',t:'',tr:'“Kak… tadi aku nggak cium kamu bukan karena takut. Aku mau kamu yang minta. Tidur, ya.”|“姐……刚才没吻你，不是因为我怕。我想等你自己开口。睡吧。”'},
 {k:'replay',th:'arya',n:4},
 {k:'inner',t:'Kuputar lagi. Dan lagi. Bagian “aku mau kamu yang minta”.|我又放了一遍。又一遍。“我想等你自己开口”那一句。'},
 {k:'gallery',clock:'06.30',seen:'seroja',t:'Kenangan · 10 tahun lalu hari ini|回忆 · 十年前的今天',focus:'p-seroja.webp',cap:'Konser perpisahan Seroja, grup vokalku dulu. Malam aku pingsan di lagu ketiga.|Seroja告别演唱会——我当年的女团。我在第三首歌晕倒的那晚。',
  items:[{img:'g-cake.webp',cap:'Ulang tahun Mila|Mila的生日'},{img:'g-beach.webp',cap:'Pantai, bertiga|海边，我们三个'},{img:'g-rehearsal.webp',cap:'Latihan Seroja · 10 tahun lalu|Seroja排练 · 十年前'},{img:'p-live.webp',cap:'Live, Kamis|周四直播'},{img:'g-dance.webp',cap:'Kelas tari Hana|Hana的舞蹈课'},{img:'g-perfume.webp',cap:'Stok parfum untuk live|直播用的香水'},{img:'g-balcony.webp',cap:'Balkon, sore|傍晚的阳台'},{img:'g-sleep.webp',cap:'Mereka tidur duluan|她们先睡着了'}]},
 {k:'inner',t:'Aku nggak pernah ingat siapa yang menangkapku. Cuma lampu.|我一直不记得是谁接住了我。只记得灯光。'},
 {k:'msg',th:'salma',clock:'06.41',time:'06.41',t:'Kak, semalam aku nggak bisa tidur mikirin kamu. Jangan bales DM aneh-aneh ya :)|姐，昨晚我一直想着你睡不着。别回那些奇怪的私信哦 :)'},
 {k:'inner',fx:'shake',t:'DM aneh? Aku belum cerita ke siapa pun soal DM itu.|奇怪的私信？那条私信的事，我还没跟任何人说过。'},
 {k:'typing',th:'salma',stop:true},
 {k:'msg',th:'salma',time:'06.43',t:'Maksudku, pasti banyak yang DM kamu sekarang. Peluk! 🤗|我是说，现在肯定很多人私信你。抱抱！🤗'},
 {k:'msg',th:'maya',clock:'07.10',time:'07.10',t:'Lumière mau ketemu besok. Kalau pentas Mila hari ini rusuh, tamat. Jangan bawa Arya.|Lumière约了明天见面。要是今天Mila的演出闹出事，就彻底完了。别带Arya。'},
 {k:'msg',th:'arya',clock:'07.12',time:'07.12',img:'p-costume.webp',cap:'Jam 4 pagi, di sofanya.|凌晨四点，在他的沙发上。',t:'Sayap Mila copot semalam, kamu nggak sadar kan? Sudah kujahit. Jangan bilang siapa-siapa 🦋|Mila的翅膀昨晚掉了，你没发现吧？我缝好了。别告诉别人🦋'},
 {k:'inner',t:'Aku bahkan nggak lihat sayapnya copot.|我连翅膀掉了都没发现。'},
 {k:'lock',clock:'07.45',fx:'shake',notifs:[{app:'Pesan',title:'Bu Ratna|Ratna太太',t:'Nanti sore Ibu juga datang. Ibu duduk di sebelahmu. Kursi B12, kan?|下午我也去。我坐你旁边。B12座，对吧？',time:'07.45'}]},
 {k:'inner',fx:'shake',t:'B12 cuma kutulis ke Raka. Jam dua pagi.|B12这个座位，我只发给了Raka。凌晨两点。'},
 {k:'epend',ep:2,tease:'Aula sekolah, 15.30. Satu tas krem sudah duduk di kursi sebelahmu — dan Arya baru tiba di parkiran.|下午3:30，学校礼堂。一只米色手袋已经占了你旁边的座位——而Arya刚到停车场。'},

// ================= EP 3 =================
 {k:'ep',ep:3,clock:'15.21',prev:'Bu Ratna tahu nomor kursimu. Hanya Raka yang tahu.|Ratna太太知道你的座位号。只有Raka知道。'},
 {k:'msg',th:'group',clock:'15.21',time:'15.21',from:'Bu Sinta|Sinta太太',t:'Ibu-ibu, nanti di aula kita lihat ya mamanya Hana datang sama siapa 😏|各位妈妈，等下在礼堂看看Hana妈妈跟谁一起来😏'},
 {k:'msg',th:'group',from:'Bu Dewi|Dewi太太',time:'15.22',t:'Kamera sudah siap 📸|相机已就位📸'},
 {k:'msg',th:'arya',clock:'15.24',time:'15.24',t:'Aku di parkiran. Kursi B13 kosong, kan? 😇|我在停车场。B13是空的吧？😇'},
 {k:'msg',th:'arya',time:'15.25',t:'Aku pakai kemeja. Dikancing sampai atas. Biar ibu-ibu tenang 😇|我穿了衬衫。扣子扣到最上面。让妈妈们安心😇'},
 {k:'msg',th:'arya',time:'15.25',gone:true,t:'Nanti kamu yang buka—|等会儿你来解开——'},
 {k:'inner',t:'Dihapus dalam dua detik. Aku sudah baca. Dia tahu aku sudah baca.|两秒就撤回了。我已经看到了。他知道我看到了。'},
 {k:'scene',clock:'15.40',tag:'15.40 · Aula SD Tunas Bangsa|15:40 · Tunas Bangsa小学礼堂',tint:'warm',img:'p-hall.webp',lines:['Kursi B12. Di B11, sebuah tas krem sudah duduk lebih dulu.|B12座。B11上，一只米色手袋已经先坐下了。','Bu Ratna tersenyum seperti baru memenangkan sesuatu.|Ratna太太笑得像刚赢了什么。'],inner:'Raka di B14. Dia nggak menatapku.|Raka坐在B14。他没看我。'},
 {k:'say',who:'R',ex:'neutral',t:'Ini Arya, ya? Masih kuliah, Nak?|你就是Arya吧？还在念书吗，孩子？'},
 {k:'say',who:'A',ex:'neutral',t:'Sudah kerja, Bu. Dua puluh delapan.|已经工作了，阿姨。二十八岁。'},
 {k:'say',who:'R',ex:'determined',t:'Oh. Barisan ini untuk keluarga. Kamu berdiri di belakang saja, ya.|哦。这排是家属座。你站后面吧。'},
 {k:'choice',key:'e3seat',oldfade:'Biar Ibu yang duduk. Perempuan baik nggak bikin ri—|让妈坐吧。好女人不惹——',
  opts:[
   {t:'Kembalikan tasnya: “Ini kursi Raka, Bu.”|把手袋还回去：“这是Raka的座，妈。”',re:[
     {k:'say',who:'R',ex:'neutral',t:'Raka di B14. Ibu yang tukar.|Raka在B14。我换的。'},
     {k:'scap',t:'Dia sudah mengatur kursi sebelum aku datang. Seperti sembilan tahun ini.|我还没到，她就把座位排好了。像这九年一样。'}]},
   {t:'Tarik Arya duduk di B13|拉Arya坐到B13',a:1,re:[
     {k:'scap',t:'Kugenggam tangannya dan kutarik dia duduk. Dua puluh kepala menoleh.|我握住他的手，拉他坐下。二十个脑袋转了过来。'},
     {k:'say',who:'A',ex:'soft',t:'Kak, kamu gemetar.|姐，你在发抖。'}]},
   {t:'“Dia 28, Bu. Cukup umur buat bikin Ibu iri.”|“他28，妈。年纪刚好够让您嫉妒。”',a:1,re:[
     {k:'say',who:'R',ex:'angry',t:'Nadira!|Nadira！'},
     {k:'scap',t:'Di barisan C, seseorang menahan tawa. Bu Dewi menurunkan kameranya.|C排有人憋着笑。Dewi太太放下了相机。'}]}],
  ifMe:[{k:'inner',when:'me>=2',t:'Dua hari aku merebut kemudi dari dia. Hari ini dia diam sendiri.|两天了，我一直在跟她抢方向盘。今天，她自己闭嘴了。'},
        {k:'inner',when:'me<2',t:'Kemarin dia masih memilih untukku. Hari ini dia kehabisan kata.|昨天她还在替我选。今天，她没词了。'}]},
 {k:'scap',t:'Lampu aula meredup. Seekor kupu-kupu kuning naik ke panggung.|礼堂灯光暗下来。一只黄色的小蝴蝶走上了台。'},
 {k:'msg',th:'group',clock:'15.52',time:'15.52',from:'Bu Sinta|Sinta太太',when:'e3seat=1,2',t:'DIA DUDUKIN BRONDONGNYA DI BARISAN KELUARGA 😱|她把小鲜肉安排在家属席了😱'},
 {k:'msg',th:'group',clock:'15.52',time:'15.52',from:'Bu Sinta|Sinta太太',when:'e3seat=0',t:'Brondongnya disuruh berdiri di belakang 🤭 Bu Ratna menang.|小鲜肉被赶到后面站着了🤭 Ratna太太赢了。'},
 {k:'msg',th:'group',from:'Bu Lina|Lina太太',time:'15.53',t:'Kok aku malah iri ya 🙈|怎么我反而有点羡慕🙈'},
 {k:'msg',th:'group',from:'Bu Dewi|Dewi太太',time:'15.53',t:'Bu Lina!!|Lina太太！！'},
 {k:'say',who:'M',ex:'neutral',t:'Papa! Om Arya! Sayapnya nggak copot!|爸爸！Arya叔叔！翅膀没掉！'},
 {k:'scap',t:'Mila melambai ke dua laki-laki sekaligus. Raka berhenti bertepuk tangan.|Mila同时向两个男人挥手。Raka停下了鼓掌。'},
 {k:'msg',th:'raka',clock:'16.40',time:'16.40',t:'Mila tanya di mobil: Om Arya bakal tinggal di rumah kita?|Mila在车上问我：Arya叔叔会住进我们家吗？'},
 {k:'typing',th:'raka',stop:true},
 {k:'inner',t:'Mengetik. Berhenti. Mengetik lagi.|在输入。停了。又在输入。'},
 {k:'msg',th:'raka',time:'16.42',gone:true,t:'Nomormu masih kusimpan sebagai “Istriku ❤”. Aku—|你的号码我还存着“老婆❤”。我——'},
 {k:'inner',fx:'shake',t:'Sembilan detik. Lalu dihapus. Tapi aku sudah membacanya.|九秒。然后删了。但我已经看到了。'},
 {k:'choice',key:'e3raka',th:'raka',
  opts:[
   {t:'Kirim jadwal kunjungan saja|只发探视时间表',send:'Jadwalmu: Rabu & Sabtu. Sisanya lewat pengacara.|你的时间：周三和周六。其余的找律师。',re:[
     {k:'msg',th:'raka',time:'16.44',t:'Dingin banget kamu sekarang.|你现在真冷。'}]},
   {t:'“Sembilan tahun kamu nggak tanya aku bahagia.”|“九年你都没问过我幸不幸福。”',send:'Sembilan tahun kamu nggak pernah tanya aku bahagia atau nggak. Sekarang kamu peduli?|九年你都没问过我幸不幸福。现在才在乎？',re:[
     {k:'msg',th:'raka',time:'16.44',t:'Aku peduli dari dulu. Aku cuma nggak bisa ngomongnya.|我一直在乎。只是说不出口。'}]},
   {t:'“Ibumu yang suruh orang motret rumahku?”|“是你妈让人拍我家的？”',send:'Jawab satu hal. Ibumu yang suruh orang motret rumahku?|回答我一件事。是你妈让人拍我家的？',re:[
     {k:'msg',th:'raka',time:'16.44',t:'Nad. Ibu umur 62.|Nad。我妈62岁了。'}]}]},
 {k:'msg',th:'raka',time:'16.45',t:'Dan berhenti nuduh Ibu soal foto-foto itu. Ibu bahkan nggak main Lensa.|还有，别再拿那些照片怀疑我妈。她连Lensa都不用。'},
 {k:'msg',th:'arya',clock:'17.05',time:'17.05',when:'e3seat=2',t:'Mobilmu panas banget. Kayak kamu tadi, pas bilang “dia 28”.|你的车好烫。就像你刚才说“他28”的时候。'},
 {k:'msg',th:'arya',clock:'17.05',time:'17.05',when:'e3seat!=2',t:'Mobilmu panas banget. Kayak tanganmu tadi.|你的车好烫。就像你刚才的手。'},
 {k:'scene',clock:'17.06',tag:'17.06 · Parkiran sekolah|17:06 · 学校停车场',tint:'warm',img:'p-carpark-close.webp',lines:['Pintu mobil membakar punggungku lewat blus tipis.|车门隔着薄衬衫烫着我的背。','Satu tangan Arya di atap mobil. Tangan lain di pinggangku.|Arya一只手撑在车顶，另一只手搭在我腰上。'],inner:'Anak-anak sudah pulang bersama neneknya. Untuk pertama kalinya hari ini, nggak ada yang menonton. Kukira.|孩子们已经跟奶奶回去了。今天第一次，没有人在看。我以为。'},
 {k:'say',who:'A',ex:'soft',t:'Aku sudah sopan seharian, Kak. Boleh nggak sopan sekarang?|我规矩了一整天，姐。现在可以不规矩了吗？'},
 {k:'choice',key:'e3kiss',
  opts:[
   {t:'Tarik kerahnya. Cium dia duluan.|揪住领口，先吻他。',a:2,re:[
     {k:'scap',t:'Aku yang mencium duluan. Dia tersenyum di bibirku — lalu berhenti tersenyum.|是我先吻的。他在我唇上笑了——然后就不笑了。'}]},
   {t:'“Di sini? Di depan sekolah anakku?”|“在这儿？在我女儿学校门口？”',a:1,re:[
     {k:'say',who:'A',ex:'neutral',t:'Kamu benar.|你说得对。'},
     {k:'scap',t:'Dia mundur selangkah. Lalu aku yang menariknya kembali.|他退后一步。然后是我把他拉了回来。'}]},
   {t:'“Bilang ‘tolong’ dulu.”|“先说‘求你’。”',a:2,re:[
     {k:'say',who:'A',ex:'soft',t:'Tolong, Kak.|求你，姐。'},
     {k:'scap',t:'Suaranya pecah di kata kedua. Aku yang menyerah duluan.|第二个字他的声音就哑了。是我先投降的。'}]}]},
 {k:'scap',fx:'flash',t:'CEKREK. Kilat putih dari balik pilar.|咔嚓。柱子后面闪过一道白光。'},
 {k:'inner',t:'Bukan ponsel. Kamera sungguhan, dengan lensa panjang.|不是手机。是真正的相机，长焦镜头。'},
 {k:'msg',th:'arya',clock:'21.47',time:'21.47',t:'Kamu oke? Aku lihat kilatnya juga.|你还好吗？我也看到那道闪光了。'},
 {k:'msg',th:'arya',time:'21.48',vn:'0:07',t:'',tr:'“Kalau besok fotonya keluar… aku nggak nyesel. Aku cuma nyesel kamu yang kena.”|“如果明天照片出来了……我不后悔。我只后悔挨骂的是你。”'},
 {k:'msg',th:'salma',clock:'22.15',time:'22.15',t:'Kak, kamu baik-baik aja? Feeling-ku nggak enak malam ini :)|姐，你还好吗？我今晚总有种不好的预感 :)'},
 {k:'inner',t:'Salma selalu punya “feeling”. Dan selalu tepat waktu.|Salma总是有“预感”。而且总是来得刚刚好。'},
 {k:'lock',clock:'23.59',fx:'shake',notifs:[
   {app:'Lensa',title:'@akungosip|@akungosip',thumb:'p-carpark-pap.webp',t:'menandaimu: “Ciuman panas di parkiran sekolah anak 🔥”|标记了你：“在孩子学校停车场热吻🔥”',time:'23.58'},
   {app:'Lensa',title:'ratna.wibisana|ratna.wibisana',t:'menyukai postingan @akungosip yang menandaimu|赞了@akungosip标记你的帖子',time:'23.59'}]},
 {k:'inner',fx:'shake',t:'“Ibu bahkan nggak main Lensa,” kata Raka. Akun itu dibuat tahun 2019.|“她连Lensa都不用，”Raka说。那个账号是2019年注册的。'},
 {k:'epend',ep:3,tease:'Pagi ini fotomu ditonton sejuta orang. Lumière menelepon — mereka mau Arya. Dengan mantannya.|今天早上，你的照片被一百万人看到。Lumière打来电话——他们要Arya。和他的前女友一起。'},

// ================= EP 4 =================
 {k:'ep',ep:4,clock:'08.02',day:'Sabtu|星期六',prev:'Ciuman di parkiran. Kilat kamera. Dan “like” dari mantan mertua yang katanya gaptek.|停车场的吻。相机的闪光。还有据说不会用手机的前婆婆点的一个赞。'},
 {k:'lensa',fresh:true,clock:'08.02',post:{by:'@akungosip',img:'p-carpark-pap.webp',views:'1,2 jt tayangan|120万次观看',likes:'Disukai ratna.wibisana dan 88.410 lainnya|ratna.wibisana 和其他 88,410 人赞了',cap:'Ciuman panas di parkiran sekolah anak 🔥 Janda vs brondong, ronde 2.|在孩子学校停车场热吻🔥 离婚妈妈vs小鲜肉，第二回合。'},
  cmts:['@tante_julid: Di sekolah anak?? 🤢|@tante_julid：在孩子学校？？🤢','@hanya_lewat: Jujur… mereka cocok 😭|@hanya_lewat：说实话……他们好配😭','@sheila.kirana: Dia masih cium kayak gitu ya 🖤|@sheila.kirana：他还是那样吻人啊🖤']},
 {k:'inner',t:'sheila.kirana. Dua juta pengikut. Mantannya Arya.|sheila.kirana。两百万粉丝。Arya的前任。'},
 {k:'msg',th:'group',clock:'08.03',time:'08.03',from:'Bu Sinta|Sinta太太',t:'Sudah sejuta views ya Bu-ibu 🍿 Sekolah harus tegas!|已经一百万播放了各位🍿 学校必须严肃处理！'},
 {k:'msg',th:'group',from:'Bu Lina|Lina太太',time:'08.04',t:'Itu parkiran umum lho, bukan sekolah. Kasihan anaknya kalau kita ribut terus.|那是公共停车场，不是学校里面。我们再吵下去，孩子才可怜。'},
 {k:'call',clock:'08.05',who:'Y',name:'MAYA|MAYA',ex:'neutral',sub:'manajer|经纪人'},
 {k:'line',who:'Y',t:'Lihat angkanya? Satu koma dua juta. Lumière telepon jam enam pagi.|看到数字了吗？一百二十万。Lumière早上六点就打来了。'},
 {k:'line',who:'N',t:'Mereka mau batalin semuanya?|他们要全部取消？'},
 {k:'line',who:'Y',t:'Kebalikannya. Mereka mau Arya jadi wajah parfum baru. Tapi pasangannya bukan kamu — Sheila.|恰恰相反。他们要Arya做新香水的代言人。但搭档不是你——是Sheila。'},
 {k:'scene',clock:'10.00',tag:'10.00 · Ruang rapat Lumière, lantai 21|10:00 · Lumière会议室，21楼',tint:'cold',img:'p-meeting.webp',lines:['Botol parfum di tengah meja. Label: No.7.|会议桌中间摆着香水瓶。标签：No.7。','Sheila sudah duduk di sebelah Arya. Kursiku di seberang.|Sheila已经坐在Arya旁边。我的位子在对面。'],inner:'Maya duduk di ujung meja, tenang sekali. Terlalu tenang.|Maya坐在桌子一头，非常平静。平静得过头了。'},
 {k:'say',who:'SH',t:'Kak Nadira! Aku fans Seroja dari SD lho 🖤|Nadira姐！我从小学就是Seroja的粉丝哦🖤'},
 {k:'scap',t:'Dari SD. Dia memastikan semua orang di ruangan menghitung umurku.|从小学。她确保在场每个人都算了一遍我的年龄。'},
 {k:'msg',th:'arya',clock:'10.06',time:'10.06',t:'(di bawah meja) Dia pakai No.7 sengaja. Aku nggak pernah pakai lagi sejak ketemu kamu.|（桌子底下）她故意喷No.7的。自从遇见你，我再没用过。'},
 {k:'msg',th:'arya',time:'10.06',t:'Kamu cantik kalau lagi pura-pura nggak cemburu.|你假装不吃醋的样子很好看。'},
 {k:'choice',key:'e4deal',
  opts:[
   {t:'“Nggak. Arya partnerku.”|“不行。Arya是我的搭档。”',a:1,re:[
     {k:'say',who:'A',ex:'soft',t:'Aku ikut Kakak.|我跟着姐。'},
     {k:'scap',t:'Orang brand saling pandang. Denda Rp250 juta masih menunggu di emailku.|品牌方面面相觑。2.5亿的罚款还躺在我邮箱里。'}]},
   {t:'“Ambil, Arya. Itu kesempatanmu.”|“接吧，Arya。这是你的机会。”',a:-1,re:[
     {k:'say',who:'A',ex:'neutral',t:'Kakak yakin?|姐确定吗？'},
     {k:'scap',t:'Dia menatapku seperti aku baru saja menjualnya.|他看我的眼神，像我刚把他卖了。'}]},
   {t:'Buka data penjualan live Kamis|打开周四直播的销售数据',re:[
     {k:'scap',t:'Rp1,4 miliar dalam satu jam. Dengan aku. Bukan dengan Sheila.|一小时14亿。是跟我一起。不是跟Sheila。'},
     {k:'say',who:'Y',t:'Paket: Nadira dan Arya. Atau nggak sama sekali.|打包：Nadira和Arya。否则免谈。'}]}]},
 {k:'say',who:'Y',t:'Live percobaan malam ini, jam delapan. Bertiga. Angkanya bagus, kita bicara soal denda.|今晚八点试播。三个人。数字好看，我们再谈罚款。'},
 {k:'msg',th:'sheila',clock:'13.02',time:'13.02',t:'Kak, salam kenal 🖤 Arya masih pakai parfum yang dulu aku pilihin, ya?|姐，初次问候🖤 Arya还在用我当年给他挑的香水吧？'},
 {k:'msg',th:'sheila',time:'13.03',t:'Oh iya. Tanya Arya deh: dulu siapa yang kasih nomor Kakak ke dia? 😉|对了。问问Arya吧：当初是谁把你的号码给他的？😉'},
 {k:'inner',fx:'shake',t:'Aku nggak pernah tanya. Pesan pertamanya datang waktu aku masih istri Raka.|我从没问过。他的第一条消息来的时候，我还是Raka的妻子。'},
 {k:'scene',clock:'19.40',tag:'19.40 · Ruang ganti studio|19:40 · 演播室化妆间',tint:'warm',img:'p-dressing.webp',lines:['Sheila duduk di meja rias, merapikan kerah Arya.|Sheila坐在化妆台上，替Arya整理领口。','Pelan. Seperti dia hafal letak setiap kancingnya.|很慢。像早就记得每一颗扣子的位置。']},
 {k:'say',who:'SH',t:'Kamu masih wangi No.7, Ya. Kangen.|你身上还是No.7的味道。想你了。'},
 {k:'choice',key:'e4dress',
  opts:[
   {t:'Cium Arya di depannya|当着她的面吻Arya',a:2,re:[
     {k:'scap',t:'Kutarik Arya dari tangannya dan kucium dia. Lipstikku tertinggal di kerahnya.|我把Arya从她手里拉过来，吻了他。口红留在了他的领口上。'},
     {k:'say',who:'SH',t:'Wow. Oke. 🖤|哇哦。行。🖤'}]},
   {t:'Pergi tanpa bicara|一言不发地走开',a:1,re:[
     {k:'scap',t:'Aku sampai di lorong. Arya menyusul dan menahanku di dinding.|我走到走廊。Arya追上来，把我按在墙上。'},
     {k:'say',who:'A',ex:'soft',t:'Lihat aku. Aku nggak ke mana-mana.|看着我。我哪儿也不去。'},
     {k:'scap',t:'Kali ini aku yang menciumnya. Lipstikku tertinggal di kerahnya.|这次是我吻了他。口红留在了他的领口上。'}]},
   {t:'“Parfumnya sudah ganti, Dek. Sejak ketemu aku.”|“香水早换了，妹妹。从遇见我开始。”',a:1,re:[
     {k:'scap',t:'Sheila tertawa kecil. Arya nggak membantah.|Sheila轻笑一声。Arya没有反驳。'},
     {k:'say',who:'A',ex:'soft',t:'Benar. Sudah ganti.|没错。早换了。'}]}]},
 {k:'live',fresh:true,clock:'20.00',img:'p-live-studio.webp',viewers:31200,cmt:'@kolom_komentar: KAK NADIRA SAMA ARYA LAGI 🔥|@kolom_komentar：Nadira姐和Arya又同框了🔥'},
 {k:'live',viewers:52800,gift:'💐',cmt:'@sheila.kirana bergabung lewat co-host ✨|@sheila.kirana 连麦加入了直播✨'},
 {k:'live',viewers:61400,cmt:'@tante_julid: Mertuanya nangis di rumah, dia live pacaran 🙄|@tante_julid：婆婆在家哭，她在直播谈恋爱🙄'},
 {k:'live',viewers:66800,gift:'🌹',cmt:'@salma.r: Kak Nadira ❤️ semangat! (aku rekam ya buat kenangan)|@salma.r：Nadira姐❤️加油！（我录下来留念哦）'},
 {k:'live',clock:'21.02',viewers:48000,ended:'Live berakhir · 1 jam 02 menit · Rp2,1 miliar|直播结束 · 1小时02分 · 21亿'},
 {k:'quick',key:'e4mic',in:'live',style:'reply',q:'Kamera mati. Aku bersandar ke bahu Arya dan bilang…|镜头关了。我靠在Arya肩上说……',opts:[
   {t:'“Bu Ratna boleh ambil kursiku. Jangan anak-anakku.”|“Ratna太太可以抢我的座位。别碰我的孩子。”',re:[{k:'live',viewers:48000,hot:'“Bu Ratna boleh ambil kursiku. Jangan anak-anakku.”|“Ratna太太可以抢我的座位。别碰我的孩子。”'}]},
   {t:'“Aku capek jadi perempuan baik buat Bu Ratna.”|“我累了，不想再为Ratna太太当好女人。”',re:[{k:'live',viewers:48000,hot:'“Aku capek jadi perempuan baik buat Bu Ratna.”|“我累了，不想再为Ratna太太当好女人。”'}]}]},
 {k:'live',viewers:73900,cmt:'@hanya_lewat: MIC-NYA MASIH NYALA 😭 KAMI DENGAR SEMUA|@hanya_lewat：麦还开着😭 我们全听到了'},
 {k:'msg',th:'maya',clock:'21.08',time:'21.08',t:'Mic-nya aku yang biarin nyala. Sama-sama 😉 Klipnya 3 juta views.|麦是我故意没关的。不客气😉 片段已经300万播放了。'},
 {k:'mail',clock:'21.40',from:'Lumière Skincare · Legal|Lumière护肤 · 法务部',file:'Kontrak_Baru_NadiraArya.pdf',subject:'Pencabutan Denda & Penawaran Kontrak Baru|撤销罚款及新合约邀约',t:'Denda Rp250.000.000 dibatalkan. Kami ingin melanjutkan dengan Nadira & Arya.|2.5亿印尼盾罚款取消。我们希望继续与Nadira和Arya合作。'},
 {k:'inner',t:'Dua hari lalu aku dipecat. Malam ini mereka mengirim kontrak. Karena satu kalimat yang nggak sengaja.|前天我被解约。今晚他们发来合同。就因为一句不小心说出口的话。'},
 {k:'msg',th:'arya',clock:'22.40',time:'22.40',when:'e4dress=0,1',img:'p-collar.webp',cap:'Kerah kemejanya. Lipstikku.|他的衬衫领口。我的口红。',t:'Nggak mau dicuci.|不想洗。'},
 {k:'msg',th:'arya',clock:'22.40',time:'22.40',when:'e4dress=2',t:'Parfumku sudah ganti. Mau cium sendiri buktinya?|我的香水早换了。要不要亲自来闻闻？'},
 {k:'call',clock:'23.10',who:'A',name:'ARYA|ARYA',ex:'soft',night:true,sub:'panggilan suara|语音通话'},
 {k:'line',who:'A',t:'Kamu tahu nggak, suaramu kalau ngantuk itu bahaya.|你知道吗，你困的时候声音很危险。'},
 {k:'line',who:'N',t:'Bahaya buat siapa?|对谁危险？'},
 {k:'line',who:'A',t:'Buat aku. Yang lagi di jalan, tiga belokan dari rumahmu.|对我。我现在在路上，离你家还有三个路口。'},
 {k:'quick',key:'e4call',in:'call',style:'reply',opts:[
   {t:'“Belok.”|“拐进来。”',a:2,re:[{k:'line',who:'N',t:'Belok.|拐进来。'},{k:'line',who:'A',t:'Kak… kalau aku masuk malam ini, aku nggak mau pulang.|姐……我要是今晚进门，就不想走了。'},{k:'line',who:'N',t:'Siapa yang suruh pulang?|谁让你走了？'}]},
   {t:'“Jangan. Belum.”|“别。还不行。”',a:1,re:[{k:'line',who:'N',t:'Jangan. Belum.|别。还不行。'},{k:'line',who:'A',t:'Oke. Tapi aku parkir di ujung gang sampai lampumu mati.|好。但我会停在巷口，直到你的灯灭。'}]}]},
 {k:'call',clock:'23.52',who:'Y',name:'MAYA|MAYA',ex:'neutral',sub:'memotong panggilan Arya…|插进了Arya的通话……'},
 {k:'line',who:'Y',t:'Nad. Buka LiveKu. Bu Ratna lagi live. Sambil nangis.|Nad。打开LiveKu。Ratna太太在直播。边哭边说。'},
 {k:'line',who:'Y',fx:'shake',t:'Dia sebut nama Hana.|她说了Hana的名字。'},
 {k:'epend',ep:4,tease:'120.000 orang menonton Bu Ratna menangis. Di tangannya, layar ponsel yang menyimpan sesuatu.|12万人在看Ratna太太哭。她手里的手机屏幕上，藏着一样东西。'},

// ================= EP 5 =================
 {k:'ep',ep:5,clock:'23.53',prev:'Mic yang “lupa” dimatikan. Kontrak yang kembali. Dan Bu Ratna, live, menangis.|“忘了”关的麦。失而复得的合同。还有Ratna太太，在直播里哭。'},
 {k:'live',fresh:true,host:'ratna.wibisana',img:'p-ratna-live.webp',viewers:120400,cap:'Bu Ratna: “Cucu saya, Hana, sembilan tahun, tanya kenapa mamanya cium laki-laki di sekolah…”|Ratna太太：“我孙女Hana，九岁，问我为什么她妈妈在学校亲男人……”',cmt:'@ibu_ibu_peduli: Sabar ya Bu 😭|@ibu_ibu_peduli：您要坚强😭'},
 {k:'live',viewers:131900,cap:'Bu Ratna: “Saya cuma mau cucu-cucu saya punya ibu yang baik.”|Ratna太太：“我只是想让孙女们有个好妈妈。”',cmt:'@tante_julid: Spill tagihannya Bu 🙏|@tante_julid：阿姨把账单晒出来🙏'},
 {k:'live',viewers:132500,cmt:'@hanya_lewat: Bu, ponsel yang Ibu pegang itu… tagihannya kok utuh?|@hanya_lewat：阿姨，您手里那部手机……账单怎么是完整的？'},
 {k:'live',viewers:133200,frame:'0:47 — ponsel di tangan Bu Ratna: tangkapan layar tagihan. Versi utuh. Belum dipotong.|0:47——Ratna太太手里的手机：账单截图。完整版。没被裁过。'},
 {k:'inner',fx:'shake',t:'Baris Rp92 juta masih ada. Dia tahu aku sudah bayar. Dari awal.|9200万那一行还在。她知道我付过钱。从一开始就知道。'},
 {k:'msg',th:'group',clock:'00.03',day:'Minggu|星期日',time:'00.03',from:'Bu Lina|Lina太太',t:'Ibu-ibu… zoom detik 47. Tagihan di HP Bu Ratna ada baris “sudah dibayar Rp92 jt”.|各位……放大第47秒。Ratna太太手机上的账单有一行“已付9200万”。'},
 {k:'msg',th:'group',from:'Bu Sinta|Sinta太太',time:'00.04',t:'Itu… mungkin salah lihat.|那……可能看错了吧。'},
 {k:'sys',th:'group',t:'Bu Sinta menghapus 14 pesan|Sinta太太删除了14条消息'},
 {k:'mail',clock:'00.10',day:'Minggu|星期日',when:'e4mic=0',from:'Kantor Hukum Wibisana & Rekan|Wibisana律师事务所',file:'Somasi_114.pdf',subject:'Somasi: Pencemaran Nama Baik|律师函：诽谤',t:'Ucapan Saudari di LiveKu pukul 21.02 (“Bu Ratna boleh ambil kursiku. Jangan anak-anakku.”) telah mencemarkan nama klien kami. Tuntutan: Rp1.000.000.000.|您于21:02在LiveKu的言论（“Ratna太太可以抢我的座位。别碰我的孩子。”）损害了我方当事人的名誉。索赔：10亿印尼盾。'},
 {k:'mail',clock:'00.10',day:'Minggu|星期日',when:'e4mic=1',from:'Kantor Hukum Wibisana & Rekan|Wibisana律师事务所',file:'Somasi_114.pdf',subject:'Somasi: Pencemaran Nama Baik|律师函：诽谤',t:'Ucapan Saudari di LiveKu pukul 21.02 (“Aku capek jadi perempuan baik buat Bu Ratna.”) telah mencemarkan nama klien kami. Tuntutan: Rp1.000.000.000.|您于21:02在LiveKu的言论（“我累了，不想再为Ratna太太当好女人。”）损害了我方当事人的名誉。索赔：10亿印尼盾。'},
 {k:'inner',t:'Kalimat yang memenangkan kontrakku, tiga jam kemudian jadi barang bukti.|那句帮我赢回合同的话，三小时后成了证据。'},
 {k:'msg',th:'salma',clock:'00.14',time:'00.14',t:'Kak, aku rekam live Bu Ratna dari menit pertama. Full. Buat pengacara :)|姐，Ratna太太的直播我从第一分钟就录了。完整版。给律师用 :)'},
 {k:'msg',th:'salma',time:'00.15',t:'Dulu aku admin fanbase Seroja, Kak. Aku tahu cara simpan bukti.|姐，我以前是Seroja后援会的管理员。我知道怎么存证据。'},
 {k:'msg',th:'raka',clock:'00.21',time:'00.21',t:'Aku di depan. Bawa tagihan aslinya. Kita selesaikan malam ini.|我在门口。带了原始账单。今晚把事情了结。'},
 {k:'msg',th:'arya',clock:'00.22',time:'00.22',t:'Aku lagi antre bubur dekat rumahmu. Kamu belum makan dari siang, kan.|我在你家附近排队买粥。你从中午就没吃东西吧。'},
 {k:'msg',th:'arya',time:'00.22',t:'Bilang aja “jangan”, nanti aku taruh di pagar terus pulang.|你说“别来”，我就把粥挂在门上然后回去。'},
 {k:'inner',t:'Aku nggak membalas. Raka sudah berdiri di depan pintu.|我没回。Raka已经站在门口了。'},
 {k:'scene',clock:'00.24',tag:'00.24 · Ruang tamu, dua mug|00:24 · 客厅，两只马克杯',tint:'night',img:'p-raka-folder.webp',lines:['Raka membuka map. Satu baris dilingkari merah: Rp1,8 juta.|Raka打开文件夹。一行被红笔圈了出来：180万。','“Les tari Hana. Dari rekening bersama. Untuk siapa sebenarnya?”|“Hana的舞蹈课。从共同账户付的。到底花在谁身上？”'],inner:'Anak-anak tidur di rumah neneknya. Rumah ini terlalu sunyi untuk bertengkar.|孩子们睡在奶奶家。这房子太安静了，不适合吵架。'},
 {k:'say',who:'K',ex:'angry',t:'Ibu bilang kamu pakai uang anak-anak buat laki-laki itu.|妈说你拿孩子们的钱养那个男人。'},
 {k:'choice',key:'e5bill',
  opts:[
   {t:'“Uangku sendiri. Coret.”|“我自己的钱。划掉。”',re:[
     {k:'say',who:'K',ex:'neutral',t:'Buktinya?|证据呢？'},
     {k:'scap',t:'Aku nggak punya bukti yang dia mau. Aku cuma punya sembilan tahun.|我没有他要的证据。我只有九年。'}]},
   {t:'Tunjukkan mutasi rekening|拿出银行流水',re:[
     {k:'scap',t:'Delapan bulan. Rp92 juta. Semua ke sekolah. Nol rupiah ke Arya.|八个月。9200万。全部付给学校。给Arya的，零。'},
     {k:'say',who:'K',ex:'neutral',t:'Aku… nggak tahu.|我……不知道。'}]},
   {t:'Putar detik ke-47 live ibumu|播放他妈妈直播的第47秒',re:[
     {k:'scap',t:'Kuputar ulang. Di layar ponsel ibunya: tagihan utuh, baris Rp92 juta masih ada.|我回放。他妈妈手机屏幕上：完整账单，9200万那一行还在。'},
     {k:'say',who:'K',ex:'neutral',t:'Itu… versi dari kantorku.|这是……我办公室出的那版。'}]}]},
 {k:'say',who:'K',ex:'neutral',t:'Asistenku kirim tagihan ke grup keluarga buat dicek. Ibu ada di grup itu.|我助理把账单发到家族群里核对。妈也在群里。'},
 {k:'scap',shot:{title:'Keluarga Wibisana|Wibisana家族',n:'14 anggota|14位成员',desc:'Perempuan baik nggak bikin ribut.|好女人不惹事。',rows:['Dimas (asisten Raka): 📎 tagihan_SD_lengkap.pdf|Dimas（Raka助理）：📎 小学账单_完整版.pdf','Bu Ratna: 👍|Ratna太太：👍']},t:'Dia menyodorkan ponselnya.|他把手机递给我。'},
 {k:'inner',fx:'shake',t:'Deskripsi grupnya. Kalimat yang dua hari ini diketik Nadira yang lama untukku.|群简介。这两天以前的Nadira一直替我打的那句话。'},
 {k:'inner',t:'Itu bukan suaraku. Itu suara keluarga ini. Sembilan tahun aku memakainya.|那不是我的声音。是这个家的声音。我用了九年。'},
 {k:'wallet',clock:'00.40',ok:true,merchant:'Transfer masuk · RAKA PRADANA|转入 · RAKA PRADANA',amt:'Rp95.000.000',t:'Catatan: “Sisa tagihan sekolah. Maaf.”|备注：“学费余款。对不起。”'},
 {k:'scene',clock:'00.42',tag:'00.42 · Dua mug di meja|00:42 · 桌上两只马克杯',tint:'night',img:'p-mugs.webp',lines:['Yang biru punya dia, sembilan tahun. Dia masih memegangnya dengan tangan kiri.|蓝色那只是他的，用了九年。他还是用左手拿。','Lalu, pelan sekali:|然后，很轻地：']},
 {k:'say',who:'K',ex:'neutral',t:'Kenapa kamu pergi, Nad?|你为什么要走，Nad？'},
 {k:'choice',key:'e5why',
  opts:[
   {t:'“Aku kesepian. Di rumah yang penuh orang.”|“我孤单。在一个满是人的家里。”',re:[
     {k:'say',who:'K',ex:'neutral',t:'Aku ada di situ.|我一直都在。'},
     {k:'say',who:'N',ex:'hurt',t:'Kamu ada. Ibumu juga. Yang nggak ada itu aku.|你在。你妈也在。不在的，是我。'}]},
   {t:'“Sudah nggak penting.”|“已经不重要了。”',re:[
     {k:'say',who:'K',ex:'neutral',t:'Buat aku penting.|对我来说重要。'},
     {k:'scap',t:'Dia menatap mug birunya lama sekali.|他盯着那只蓝杯子看了很久。'}]},
   {t:'“Kamu selalu memilih ibumu.”|“你永远站在你妈那边。”',re:[
     {k:'say',who:'K',ex:'angry',t:'Itu nggak adil.|这不公平。'},
     {k:'say',who:'N',ex:'determined',t:'Grup keluargamu punya motto, Raka. Aku hafal.|你们家族群有座右铭，Raka。我背得出来。'}]}]},
 {k:'scene',clock:'00.58',tag:'00.58 · Pagar depan|00:58 · 院门口',tint:'night',img:'p-gate-night.webp',lines:['Raka berhenti di pagar. Dia nggak menoleh.|Raka在院门口停下。没有回头。','Hujan mulai turun di paving.|雨开始落在地砖上。']},
 {k:'say',who:'K',ex:'angry',t:'Satu lagi. Ibu bilang kamu sudah tidur sama dia sebelum kita cerai.|还有一件事。妈说你在我们离婚之前就跟他睡过了。'},
 {k:'scap',img:'p-porridge.webp',fx:'shake',t:'Plastik jatuh di pagar. Bubur ayam tumpah ke paving yang basah.|塑料袋掉在门口。鸡肉粥洒在湿漉漉的地砖上。'},
 {k:'say',who:'K',ex:'angry',t:'Tanya sendiri sama dia, Dek. Sejak kapan.|你自己问她吧，小弟。从什么时候开始的。'},
 {k:'scap',t:'Arya nggak bertanya apa-apa. Dia memungut kantongnya, lalu pergi ke dalam hujan.|Arya什么也没问。他捡起袋子，走进了雨里。'},
 {k:'inner',t:'Aku nggak pernah. Tapi pesan pertamanya memang datang waktu aku masih istri Raka.|我从来没有。可他的第一条消息，确实是在我还是Raka妻子的时候来的。'},
 {k:'lock',clock:'01.22',fx:'shake',notifs:[
   {app:'Pesan',title:'Arya|Arya',t:'Kak. Yang dibilang Raka itu bohong, aku tahu. Tapi ada yang aku sembunyiin dari kamu. Sepuluh tahun—|姐。Raka说的是假的，我知道。可我有件事一直瞒着你。十年——',time:'01.21'},
   {app:'Pesan',title:'Arya|Arya',t:'🎤 Pesan suara · 0:41|🎤 语音消息 · 0:41',time:'01.22'},
   {app:'Pesan',title:'Arya|Arya',t:'📍 Membagikan lokasi langsung|📍 正在共享实时位置',time:'01.22'}]},
 {k:'paywall',th:'arya',teaserImg:'p-rain.webp',locked:[
   {time:'01.21',t:'Kak. Yang dibilang Raka itu bohong, aku tahu. Tapi ada yang aku sembunyiin dari kamu. Sepuluh tahun aku nunggu buat bilang ini langsung.|姐。Raka说的是假的，我知道。可我有件事一直瞒着你。我等了十年，想当面告诉你。'},
   {time:'01.22',vn:'0:41',t:'',tr:'“Aku nggak marah. Aku cuma takut kamu dengar ceritaku dari orang lain duluan. Turun, Kak. Lima menit.”|“我没生气。我只是怕你先从别人那里听到我的故事。下来吧，姐。五分钟。”'},
   {time:'01.22',loc:'Warung Bubur Pak Item · 120 m|Item叔粥摊 · 120米',t:'Hujan. Bawa payung.|下雨了。带伞。'}]},

// ================= EP 6 (first paid episode) =================
 {k:'ep',ep:6,clock:'01.23',prev:'“Sepuluh tahun—” Pesan yang dia ketik di tengah hujan.|“十年——”他在雨里打下的那条消息。'},
 {k:'unblur',th:'arya',t:'Kak. Yang dibilang Raka itu bohong, aku tahu. Tapi ada yang aku sembunyiin dari kamu. Sepuluh tahun aku nunggu buat bilang ini langsung.|姐。Raka说的是假的，我知道。可我有件事一直瞒着你。我等了十年，想当面告诉你。'},
 {k:'inner',t:'Sepuluh tahun. Aku kenal dia sebelas bulan. Nomor asing pagi itu juga bilang “sepuluh tahun”.|十年。我认识他才十一个月。那天早上那个陌生号码，说的也是“十年”。'},
 {k:'replay',th:'arya',n:2},
 {k:'inner',t:'“Aku takut kamu dengar ceritaku dari orang lain duluan.” Lokasinya masih bergerak. Pelan. Bolak-balik di depan warung.|“我怕你先从别人那里听到我的故事。”他的位置还在动。很慢。在粥摊前来回踱步。'},
 {k:'msg',th:'arya',mine:true,time:'01.24',t:'Tunggu. Aku turun.|等着。我下来。'},
 {k:'msg',th:'arya',time:'01.24',t:'Pakai jaket. Dan payung. Dan… nggak usah dandan.|穿外套。带伞。还有……不用化妆。'},
 {k:'msg',th:'arya',time:'01.25',t:'Aku beli bubur lagi. Kali ini nggak tumpah.|我又买了一碗粥。这次没洒。'},
 {k:'scene',clock:'01.31',tag:'01.31 · Warung bubur, hujan deras|01:31 · 粥摊，大雨',tint:'night',img:'p-stall.webp',lines:['Terpal biru, satu bohlam, panci yang mengepul.|蓝色篷布，一只灯泡，冒着热气的锅。','Arya menyodorkan mangkuk. Tanpa kacang. Dia ingat.|Arya把碗推过来。没放花生。他记得。'],inner:'Aku nggak pernah bilang ke dia aku nggak suka kacang.|我从没跟他说过我不吃花生。'},
 {k:'say',who:'A',ex:'soft',t:'Aku nggak akan tanya yang Raka bilang.|Raka说的，我不会问。'},
 {k:'choice',key:'e6truth',
  opts:[
   {t:'“Itu nggak benar. Nggak pernah.”|“那不是真的。从来没有。”',re:[
     {k:'say',who:'A',ex:'soft',t:'Aku tahu. Aku cuma mau kamu tahu aku percaya.|我知道。我只是想让你知道，我信你。'}]},
   {t:'“Sejak kapan kamu suka aku?”|“你从什么时候开始喜欢我的？”',a:1,re:[
     {k:'say',who:'A',ex:'soft',t:'Pertanyaannya salah, Kak. Tanya: sudah berapa tahun.|问错了，姐。应该问：多少年了。'}]},
   {t:'(Diam. Makan buburnya.)|（不说话。吃粥。）',re:[
     {k:'scap',t:'Kami makan dalam diam. Hujan yang bicara.|我们安静地吃着。只有雨在说话。'}]}]},
 {k:'say',who:'A',ex:'neutral',t:'Konser perpisahan Seroja. Sepuluh tahun lalu. Kamu pingsan di lagu ketiga.|Seroja告别演唱会。十年前。你在第三首歌晕倒了。'},
 {k:'say',who:'A',ex:'soft',t:'Penari cadangan, baris paling belakang. Delapan belas tahun. Yang menangkap kamu… itu aku.|最后一排的替补舞者。十八岁。接住你的……是我。'},
 {k:'gallery',hl:true,seen:'seroja',t:'Kenangan · 10 tahun lalu|回忆 · 十年前',focus:'p-seroja.webp',cap:'Rambut ikal. Tangan di bahuku. Aku melihat foto ini dua hari lalu — dan nggak melihatnya.|卷发。扶在我肩上的手。两天前我看过这张照片——却没看见他。',items:[]},
 {k:'inner',when:'seen:seroja',t:'Aku bahkan memperbesarnya. Wajah itu ada di sana, dan aku cuma melihat diriku.|我甚至把它放大过。那张脸就在那里，可我只看见了我自己。'},
 {k:'say',who:'A',ex:'soft',t:'Kamu bilang, “Makasih, Dek.” Terus kamu lupa. Aku nggak.|你说：“谢谢你，弟弟。”然后你就忘了。我没有。'},
 {k:'choice',key:'e6kiss',
  opts:[
   {t:'Cium dia. Di bawah hujan.|吻他。在雨里。',a:2,re:[
     {k:'scap',img:'p-rain.webp',t:'Payungnya jatuh. Aku nggak memungutnya.|伞掉了。我没去捡。'}]},
   {t:'“Jadi kamu deketin aku sebagai fans?”|“所以你是以粉丝的身份接近我？”',re:[
     {k:'say',who:'A',ex:'neutral',t:'Sebagai fans, aku cuma mau tanda tangan. Sebagai aku… aku mau semuanya.|作为粉丝，我只想要签名。作为我自己……我想要全部。'},
     {k:'scap',img:'p-rain.webp',t:'Aku yang menariknya keluar dari bawah terpal.|是我把他从篷布下拉了出来。'}]},
   {t:'“Dek… kamu sudah besar.”|“弟弟……你长大了。”',a:1,re:[
     {k:'say',who:'A',ex:'soft',t:'Sudah. Mau bukti?|长大了。要证据吗？'},
     {k:'scap',img:'p-rain.webp',t:'Buktinya basah, dan lama sekali.|证据湿漉漉的，而且很久很久。'}]}]},
 {k:'scene',clock:'01.58',tag:'01.58 · Lorong depan rumahku|01:58 · 我家门廊',tint:'night',img:'p-door.webp',lines:['Kami basah sampai tulang. Payung menetes di dinding.|我们浑身湿透。伞靠在墙上滴着水。','Jariku menemukan kancing pertama kemejanya.|我的手指找到了他衬衫的第一颗扣子。']},
 {k:'say',who:'A',ex:'soft',when:'heat>=6',t:'Aku sudah bilang, aku mau kamu yang minta. Aku sudah nunggu sepuluh tahun.|我说过，我要等你自己开口。我已经等了十年。'},
 {k:'say',who:'A',ex:'soft',t:'Kak. Kalau kamu buka satu lagi, aku nggak bisa pura-pura sopan.|姐。你要是再解开一颗，我就装不了规矩了。'},
 {k:'choice',key:'e6door',
  opts:[
   {t:'Buka kancing kedua|解开第二颗扣子',a:2,re:[
     {k:'scap',t:'Kancing kedua: dia menahan napas. Kancing ketiga: aku yang lupa bernapas.|第二颗：他屏住了呼吸。第三颗：忘了呼吸的是我。'},
     {k:'dark',t:'…|……',sub:'Pintu kamar tertutup. Hujan turun terus sampai subuh.|卧室的门关上了。雨一直下到天亮。'}]},
   {t:'“Jangan malam ini. Tapi jangan pulang.”|“今晚不行。但别走。”',a:1,re:[
     {k:'say',who:'A',ex:'soft',t:'Oke. Aku di sini.|好。我在这儿。'},
     {k:'dark',t:'…|……',sub:'Dia tidur di sofa. Tangannya nggak lepas dari tanganku sampai subuh.|他睡在沙发上。他的手一直没有松开我的，直到天亮。'}]}]},
 {k:'lensa',fresh:true,clock:'05.40',story:{by:'arya.wd',t:'Hujan paling enak seumur hidup.|这辈子最好的一场雨。',foot:'Teman Dekat · 1 orang dapat melihat ini|密友 · 只有1个人能看到'}},
 {k:'inner',t:'Daftar Teman Dekat-nya berisi satu orang. Aku.|他的密友名单里只有一个人。我。'},
 {k:'msg',th:'arya',clock:'05.44',time:'05.44',t:'Kamu nggak punya gula. Rumah macam apa ini.|你家居然没有糖。这是什么人家。'},
 {k:'msg',th:'arya',time:'05.44',t:'Aku turun beli. Jangan bangun. Aku mau lihat kamu tidur sekali lagi waktu balik.|我下楼去买。别起来。我回来的时候还想再看你睡一次。'},
 {k:'msg',th:'arya',time:'05.45',when:'e6door=1',t:'Sofamu sempit. Tapi tanganmu nggak lepas semalaman. Itu cukup.|你家沙发很窄。但你的手一整夜都没松开。这就够了。'},
 {k:'inner',when:'e2kiss=1',t:'Jam dua pagi itu aku menarik kerahnya dan nggak sempat menciumnya. Malam ini lunas.|那天凌晨两点，我揪住他的领口，却没来得及吻他。今晚，还清了。'},
 {k:'inner',t:'Lalu pertanyaan Sheila muncul lagi: siapa yang kasih nomorku ke dia?|然后Sheila的问题又冒了出来：是谁把我的号码给他的？'},
 {k:'scrollup',th:'arya',clock:'05.52',gap:'— 11 bulan percakapan —|—— 11个月的聊天记录 ——',old:[{date:'14 November 2025|2025年11月14日',time:'23.11',t:'Halo Kak Nadira, ini Arya. Kak Maya yang kasih nomor Kakak. Katanya Kakak sebentar lagi bebas 🙂|Nadira姐你好，我是Arya。是Maya姐给我你的号码的。她说你很快就自由了🙂'}]},
 {k:'inner',fx:'shake',t:'“Sebentar lagi bebas.” Delapan bulan sebelum aku sendiri tahu aku mau pergi.|“很快就自由了。”那时离我自己决定离开，还有八个月。'},
 {k:'lock',clock:'06.02',fx:'shake',notifs:[
   {app:'Telepon',title:'Maya|Maya',t:'3 panggilan tak terjawab|3个未接来电',time:'06.01'},
   {app:'Pesan',title:'Maya|Maya',t:'Nad, sebelum kamu lihat apa pun pagi ini — aku bisa jelasin.|Nad，今天早上在你看到任何东西之前——我能解释。',time:'06.02'},
   {app:'Lensa',title:'@sheila.kirana|@sheila.kirana',thumb:'p-seroja.webp',t:'memposting: “Dari fans jadi pacar. Atau dari awal memang sudah diatur? 🖤”|发布了：“从粉丝变男友。还是从一开始就安排好了？🖤”',time:'06.02'}]},
 {k:'end',t:'Maya memberi nomormu sebelum kamu sendiri tahu ingin pergi. Episode 7: “Aku nggak menjualmu, Nad. Aku menjual dia.”|在你自己都还没想走之前，Maya就把你的号码给了他。第7集：“我没有出卖你，Nad。我卖的是他。”'}
);
// strings for v3 UI
Object.assign(P.UI,{
 pwBadge:'Terkunci · Episode 6|已锁定 · 第6集',deleted:'Pesan ini telah dihapus|此消息已被撤回',plays:'diputar {n}×|已播放{n}次',locLive:'Lokasi langsung · 1 jam|实时位置 · 1小时',draft:'Draf · belum terkirim|草稿 · 未发送',grpDesc:'Deskripsi grup|群简介',photoS:'Foto|照片',closeF:'Teman Dekat|密友',
 hotmic:'MIC MASIH ON · 48.000 MASIH MENONTON|麦克风还开着 · 还有48,000人在看',liveOff:'SELESAI|已结束',me:'Aku|我',oncallN:'Sedang menelepon · 23:10|通话中 · 23:10',
 statTake:'Kamu merebut kemudi {m} dari {t} kali|{t}次里你抢回方向盘{m}次',statSelf:'memilih sendiri {s} kali|自己做了{s}次选择',
 epK:'Episode|第',epPaid:'berbayar|付费',epDone:'selesai|完',epNext:'Berikutnya|下一集',autoNext:'Lanjut otomatis · ketuk untuk langsung|自动继续 · 点一下立刻开始',epGo:'Lanjut|继续',chapters:'Pilih episode|选集',
 gallery:'Galeri|相册',zoomHint:'ketuk untuk perbesar|点开看大图',fadeGone:'…Nadira yang lama berhenti mengetik.|……以前的Nadira停下了。',fadeStamp:'MULAI SEKARANG, AKU YANG PILIH|从现在起，我自己选',fadeNow:'Nggak ada yang mengetik untukmu lagi. Pilih.|没人再替你打字了。你来选。',yours:'Pilihanmu|你的选择',
 replayQ:'Putar ulang Episode {n}? Pilihanmu mulai episode ini akan dipilih ulang. Episode yang sudah terbuka tetap terbuka.|重玩第{n}集？从这一集起的选择会重新来过。已解锁的集数保持解锁。',
 chCur:'Sedang dibaca · lanjutkan|正在看 · 继续',chReplay:'Putar ulang dari awal episode|从本集开头重玩',chPw:'Terbuka setelah Ep 5|看完第5集后解锁',chLocked:'Belum sampai|还没看到',chNote:'Progres & pilihan tersimpan di perangkat ini.|进度和选择保存在这台设备上。',
 statsT:'Statistik lokal (prototipe)|本地统计（原型）',statsNote:'Hanya di perangkat ini — untuk menguji di mana pembaca berhenti. Tidak dikirim ke mana pun.|只存在本设备——用来测试读者在哪里流失。不会上传。',stStart:'mulai|开始',stEnd:'selesai|看完',stLeave:'keluar|离开',stPw:'paywall dilihat|付费页曝光',stClick:'klik|点击',stUnlock:'terbuka lewat|解锁方式',
 end1:'Bersambung…|未完待续……',
 pw:{title:'Lanjutannya di Episode 6|后续在第6集',sub:'Pesan Arya, pesan suaranya, dan lokasinya terkunci.|Arya的消息、语音和位置都被锁住了。',
  teaser:['Apa yang Arya sembunyikan selama sepuluh tahun|Arya藏了十年的秘密','Warung bubur, hujan deras — dan ciuman yang nggak sempat jam dua pagi itu|粥摊、大雨——还有凌晨两点没来得及的那个吻','Siapa yang memberi nomormu ke Arya, sebelum kamu sendiri tahu ingin pergi|在你自己都还没想走之前，是谁把你的号码给了Arya'],
  you:'PERJALANANMU SEJAUH INI|你的进度',pass:'Pass Episode 6–10 · Rp9.000|第6–10集通票 · Rp9.000',passSub:'5 episode · ≈Rp1.800 per episode|5集 · 每集约Rp1,800',one:'Episode 6 saja · Rp3.000|只解锁第6集 · Rp3.000',oneSub:'Episode 7–10 dibeli terpisah|第7–10集另购',
  ad:'▶ Tonton iklan · gratis|▶ 看广告 · 免费',wait:'⏳ Gratis besok 07.00|⏳ 明早7:00免费',sim:'SIMULASI: prototipe ini tidak menarik uang, tidak meminta kartu, dan tidak menayangkan iklan sungguhan. Tidak ada hitung mundur — tawaran ini tetap sama besok.|模拟：本原型不会扣款、不要银行卡，也不播真实广告。没有倒计时——明天还是同样的价格。',
  simTag:'SIMULASI|模拟',passWhat:'Membuka Episode 6 sekarang, dan Episode 7–10 begitu terbit. Pilihanmu ikut terbawa.|现在解锁第6集，第7–10集上线即可看。你的选择会一路延续。',oneWhat:'Membuka Episode 6. Pilihanmu ikut terbawa.|解锁第6集。你的选择会延续。',simPay:'Tidak ada uang yang ditarik. Di aplikasi sungguhan, layar ini adalah pembayaran toko aplikasi.|不会扣任何钱。在正式应用里，这一步是应用商店的支付。',pay:'Bayar {p} (simulasi)|支付{p}（模拟）',
  adT:'Iklan · 30 detik|广告 · 30秒',adBody:'(Di sini akan tampil iklan sungguhan. Di prototipe dipersingkat jadi 8 detik.)|（这里会播放真实广告。原型里缩短为8秒。）',adNote:'Iklan membuka Episode 6 saja.|看广告只解锁第6集。',adDone:'Tutup iklan & buka Episode 6|关闭广告，解锁第6集',
  waitT:'Gratis besok pukul 07.00|明早7:00免费解锁',waitBody:'Tempatmu tersimpan. Episode 6 terbuka gratis besok pagi. (Prototipe: tidak ada notifikasi yang dikirim.)|你的进度已保存。第6集明早免费开放。（原型：不会真的发送通知。）',waitSkip:'⏩ Simulasikan: sudah besok pagi|⏩ 模拟：已经到了明天早上',waitLater:'Oke, nanti saja|好，晚点再看',
  ok:'Episode 6 terbuka|第6集已解锁',okPass:'Pass aktif sampai Episode 10 (simulasi).|通票有效至第10集（模拟）。',okOne:'Episode 6 terbuka (simulasi).|第6集已解锁（模拟）。',okFree:'Terbuka gratis (simulasi).|已免费解锁（模拟）。'},
 pwEcho:[
  {when:'e2kiss=1',t:'Jam dua pagi kamu menarik kerahnya — dan nggak sempat. Dia belum lupa.|凌晨两点你揪住了他的领口——却没来得及。他没忘。'},
  {when:'e2kiss=2',t:'“Tanya lagi besok,” katamu. Dia masih menunggu jawabannya.|“明天再问，”你说。他还在等答案。'},
  {when:'e2kiss=0',t:'Kamu menyuruhnya pulang. Dia tetap kembali, membawa bubur.|你让他回去。他还是提着粥回来了。'},
  {when:'seen:seroja',t:'Kamu memperbesar foto konser di Galeri. Ingat siapa yang ada di belakangmu?|你在相册里放大过那张演唱会照片。记得你身后是谁吗？'},
  {when:'!seen:seroja',t:'Ada satu foto di Galerimu yang belum kamu perhatikan.|你的相册里有一张照片，你还没仔细看过。'},
  {when:'e4mic=0,1',t:'Kalimat hot-mic-mu sekarang ada di surat somasi. Seseorang sudah merekam semuanya :)|你那句被直播出去的话，现在写进了律师函。有人把一切都录下来了 :)'}]
});
P.EPS=EPS;
})(typeof window!=="undefined"?window:globalThis);
