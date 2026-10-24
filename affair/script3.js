// Di HP-nya, Namaku Cuma "Rumah" — Episode 3 (rewritten)
// Better pacing, process not result for test, clearer goals.
(function(root){
const TITLE={t:'Di HP-nya, Namaku Cuma “Rumah”|在他手机里，我只是“家”',sub:''};
const SAY={L:{name:'Aku|我',me:true,img:'av-L.webp'},D:{name:'Mas Dimas|Dimas',img:'av-D.webp'},S:{name:'Sari|Sari',img:'av-S.webp'}};
const BEATS=[
 {k:'dark',title:1,clock:'07.12',day:'Episode 3 · Jumat, 23 Oktober|第3集 · 10月23日 星期五',t:'Satu atap|同一屋檐下',sub:'07.12|07:12'},
 {k:'scene',clock:'07.12',tag:'07.12 · Pintu depan|07:12 · 家门口',img:'p2-door.webp',lines:['Sari dengan koper pink.|Sari 拖着粉色行李箱。','Kuku merah panjang.| 红色长指甲。']},
 {k:'say',who:'D',t:'Rumah yang dia sewa kebanjiran. Dinda yang minta. Seminggu aja.|她租的房子被淹了。是 Dinda 托的。就一个星期。'},
 {k:'say',who:'S',t:'Kak, aku bantu jaga Nayla ya.|姐，我帮你带 Nayla。'},
 {k:'inner',t:'Tadi malam dia di lantai 17.|昨晚她在十七楼。'},
 {k:'act',key:'in',mode:'tap',btn:'Masuk aja.|进来吧。'},
 {k:'scene',clock:'07.18',tag:'07.18 · Kamar tamu|07:18 · 客房',img:'p2-door.webp',lines:['Dia yang mengangkat koper pink itu ke kamar.|他亲手把粉色行李箱提进客房。']},
 // dinner - separate beats
 {k:'dark',t:'19.30|19:30',sub:'Makan malam.|晚饭。'},
 {k:'scene',clock:'19.30',tag:'19.30 · Meja makan|19:30 · 餐桌',img:'p2-breakfast.webp',lines:['Sari masak rendang.|Sari 做了仁当。']},
 {k:'say',who:'S',t:'Sekarang Mas udah jadi bos konveksi. Nanti pabriknya nggak perlu Kak urus lagi.|哥现在是服装厂老板了，以后厂里的事就不用姐操心了。'},
 {k:'inner',t:'Itu pabrik ayahku.|那是我爸的厂。'},
 {k:'act',key:'factory',mode:'hold'},
 {k:'scene',clock:'19.32',tag:'19.32 · Meja makan|19:32 · 餐桌',img:'p-album.webp',lines:['Kami berdua mengulurkan tangan bersamaan.| 我们同时伸手。']},
 {k:'inner',t:'Cincin di jarinya… sama dengan milikku.|她手上的戒指……跟我的一样。'},
 {k:'act',key:'rings',mode:'hold'},
 {k:'say',who:'S',t:'Beli online. Murah.|网上买的，很便宜。'},
 // midnight with more urgency
 {k:'dark',t:'04.18|04:18',sub:'Sabtu. Dia tidur. Alarm dalam 12 menit.|周六。他睡着了。闹钟还有12分钟。'},
 {k:'scene',clock:'04.18',tag:'04.18 · Kamar tidur|04:18 · 卧室',tint:'night',img:'p-bed2.webp',lines:['Jempolnya menggantung di tepi kasur.|他的拇指垂在床边。']},
 {k:'act',key:'fp',mode:'tap',btn:'Pakai sidik jarinya.|用他的指纹解锁。'},
 {k:'scene',clock:'04.20',tag:'04.20 · Kamar Nayla|04:20 · Nayla 的房间',tint:'night',img:'p-wall.webp',lines:['Aku bersembunyi di sini. Kamera kecil di sudut.|我躲到这里。角落有个小摄像头。']},
 {k:'thread',th:'sari',msgs:[
   {t:'Kamu di sebelah, tapi jauh banget.|你就在隔壁，却离我好远。',time:'22.14'},
   {me:1,t:'Di sini lebih aman. Dia udah buka HP-ku.|在这儿更安全。她已经翻过我手机了。',time:'22.16'},
   {t:'Besok pagi aku tes. Doain ya.|明天早上我测一下。保佑我。',time:'22.18'}]},
 {k:'inner',t:'Besok pagi dia mau tes.|明天早上她要测。'},
 {k:'scap',bn:1,from:'KamuCam|KamuCam',time:'04.22',t:'Gerakan terdeteksi di kamar Nayla. Rekaman otomatis tersimpan.|Nayla 的房间检测到画面移动。已自动保存录像。'},
 {k:'act',key:'cam',mode:'tap',btn:'Geser.|划掉。'},
 {k:'act',key:'close',mode:'tap',btn:'Tutup semua aplikasi.|关掉所有应用。'},
 {k:'act',key:'lock',mode:'tap',btn:'Kunci layar dan taruh kembali.|锁屏并放回去。'},
 {k:'dark',t:'Alarm berbunyi.|闹钟响了。',sub:'Dia mengangkat HP-nya.|他拿起手机。'},
 // hook: process not result
 {k:'dark',title:1,day:'Sabtu, 24 Oktober|10月24日 星期六',t:'06.40|06:40',sub:'Pintu kamar mandi.|浴室门。'},
 {k:'scene',clock:'06.40',tag:'06.40 · Kamar mandi|06:40 · 浴室',img:'p2-sari-face.webp',lines:['Sari berdiri di depan wastafel.|在洗脸池前站着。','Dia memegang test pack.|她拿着验孕棒。']},
 {k:'say',who:'S',t:'Kak…|姐……'},
 {k:'act',key:'hook',mode:'hold'},
 {k:'dark',cut:1,t:'',sub:''},
 {k:'epend',ep:3}
];
const IMAGES=['p2-door.webp','p2-sari-face.webp','p2-breakfast.webp','p-album.webp','p-bed2.webp','p-wall.webp','av-L.webp','av-D.webp','av-S.webp'];
const UI={
 paused:'Dijeda|已暂停',menu:'Menu|菜单',resetQ:'Mulai ulang?|重新开始？',yes:'Ya|确定',no:'Batal|取消',
 innerL:'suara hatiku|我的心声',end1:'Bersambung|未完待续',again:'Ulangi dari awal|从头再看',
 epDone:'Episode 3 · selesai|第3集 · 完',hisPhone:'HP Mas Dimas|Dimas的手机'
};
const EP=3,NEXT=0;
const api={EP,NEXT,TITLE,SAY,BEATS,UI,IMAGES};if(typeof module!=='undefined')module.exports=api;else root.PHONE=api;
})(this);
