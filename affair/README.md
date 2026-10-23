# 《在他手机里，我只是“家”》/ Di HP-nya, Namaku Cuma “Rumah” — 手机互动原型 v3（第1–3集，剧本 v3.1）

线上：https://singhfang-lab.github.io/habis-cerai-preview/affair/ （noindex）
本地：`cd /workspace/story/out && python3 -m http.server 8765` → http://localhost:8765/affair-proto/index.html
参数：`?lang=zh|id`，`?reader=xxx`（独立存档）。存储前缀 `affair:`。v2 备份：/workspace/story/out/affair-v2-backup/。

## 改标题
`script.js` 顶部常量 `TITLE`（`t` 主标题、`sub` 副标题，`'id|zh'`）。黑色标题卡、`document.title` 都从这里读。

## 文件
- `script.js` 全部剧情：BEATS（3 集）、LIST（聊天列表）、RECAP（集末“我手里有的”）、EPS（集名）、UI。每个字符串 `'id|zh'` 恰好一个 `|`。校验：`node /workspace/affair-tools/validate.js`。
- `phone.js` 引擎。v3 新增：list/contact/status/cam/fb（闪回=重放当时那一帧，棕褐色 + “↺ 闪回”）视图，`flag:`/`!flag:` 条件（选项 `flag` 字段，跨集保留），集末回顾卡 + “下一集”，第3集“未完待续”。删除：门禁卡、婴儿监控、B-1708 设备、保险箱头部、计时盖住时钟、WHO 选择泄露。
- `smoke/play3.js` 自动游玩全3集：`CH=grab=0,app2=1,ring=2,night=1,lobi=0,ring2=1,tp=0`，`PIN=chip|type|ticket`，`VAULT=type|ticket`，`SHOTS=1`。
- `smoke/taptest3.js` 连点测试（每拍 ≥350ms 可见、文字出现、不跳拍）：`node smoke/taptest3.js URL zh 200 out.json`。
- `smoke/sheet.py` 拼联系表。

## 选择与旗标
| 集 | key | 选项 → 立即后果 | 旗标 |
|---|---|---|---|
| 1 | grab | 立刻拿起 / 先放下（+3 分钟、多两条通知；之后少看一个 App） | – |
| 1 | ring | 接起不出声（听到她说话、记录“已接通”）/ 拒接（她发短信）/ 让它响（语音留言） | – |
| 1 | app2（仅立刻拿起） | Arta 银行（B-17-08 房租 850 万）/ Tokoria（粉色缎面睡衣订单） | SEWA / PIYAMA |
| 1 | night | 装睡（他在门口看她很久）/ 现在就问（他当场撒谎） | – |
| 2 | lobi | 偷偷录像（38 秒，进电梯停 17 楼）/ 现在打给他（看他把“Rumah”给 Sari 看、拒接、19:46“在跟供应商开会”截图） | LOBI / BOHONG |
| 3 | ring2 | 问戒指（Sari：自己设计的；客厅里他打翻茶）/ 把手并排放（Dinda：怎么一模一样？） | DINDA_LIHAT |
| 3 | tp | 用我的手机拍下（他梦里叫“Sar”）/ 只看，放回去（没有证据） | TESTPACK |
第2集闪回：PIYAMA → 闪回购物订单，否则闪回锁屏“我穿你买的那件”。集末回顾随旗标变化。
