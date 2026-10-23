# 《老公的手机密码，不是我们的结婚纪念日》/ Kata Sandi HP Suamiku Bukan Tanggal Pernikahan Kami — 手机互动原型（序章 + 第1集）

线上：https://singhfang-lab.github.io/habis-cerai-preview/affair/ （noindex）
本地：`cd /workspace/story/out && python3 -m http.server 8765` → http://localhost:8765/affair-proto/index.html
参数：`?lang=zh|id`，`?reader=xxx`（独立存档）。存储前缀 `affair:`（不和 /phone/ 冲突）。

## 文件
- `script.js` 全部剧情（每个字符串 `'id|zh'`，恰好一个 `|`）；APPS = 他手机里的 5 个证据应用（含分钟成本）。
- `phone.js` 引擎（由 phone-proto 复制后扩展：pin 密码键盘、hub 证据主屏、淋浴倒计时、got:app 条件、时钟累加、ride/bank/shop/memo/ticket 视图、结局统计）。phone-proto 未改动。
- `phone.css` 末尾 `/* affair */` 段为新增样式。
- `assets/` 图片（p-laundry, p-bed, p-wall, p-selfie, p-apt, p-pajama, p-door, p-confront, av-L, av-D）。
- `smoke/play.js` 全分支自动游玩（PLAN/PIN/HUB/SAVE/SHOTS 环境变量）；`smoke/taptest2.js` 连点测试（MODE=auto 为自动播放检查）。

## 第1集结构（约 3.2–3.9 分钟，1 倍速）
1. 标题卡 → 19:40 洗衣间：衬衫口袋里的电影票（2025-06-19 周四，两座，墨迹新、从没被洗过 = 有人刚放进去）。
2. 22:31 卧室：他洗澡固定 15 分钟（右上角倒计时开始）；婴儿监控蓝灯（第5集照片来源）。
3. 22:33 锁屏横幅 “Pak Budi Supplier”：老公，明天来的吧？我会穿你买的那件❤️ → 选择（9 秒不选，“以前的Laras”替你放回去）。
4. 密码：结婚纪念日 ✗ → Nayla 生日 ✗ → 锁 1 分钟 → 想起抽屉里的票 → 190625 ✓（也可直接输入，跳过试错）。
5. 22:36 他的主屏：10 分钟、5 个应用（聊天3/相册2/Jalanku2/银行3/购物2），先选保存方式（截图发给自己 1 分钟 / 用自己手机拍 2 分钟），只够看 3–4 个。
6. 22:46 水声停 → 选择：A 放回去装睡（他发现“老婆”对话被顶上来/没有痕迹 → 情妇消息“你老婆还没睡吧？” → “睡了。”）/ B 当面问（他改密码）。
7. 结尾钩子 + 第2集预告（星期四晚上，十七楼，开门的是认识的脸）。

## 检查点
- [x] 双语校验 `node /workspace/affair-tools/validate.js`：287 条 0 错
- [x] 全分支 9 次无头游玩（zh/id、pilot/自选、chips/fast1/fast2/type/ticket、save 0/1、A/B）：0 报错、0 坏图、全部到达结局
- [x] 连点测试 zh 200ms / id 120ms：无跳拍、无回跳、每拍可见 ≥480ms
- [x] 自动播放：不点也会走到第一个密码交互（含自动替选）
- [x] 截图：/workspace/story/out/affair-shots-v1/（zh-A、id-B + contact sheets）
- [x] 录屏：/workspace/story/out/transition-videos/affair-v1-ep1-zh.mp4
- [x] 部署 /affair/，线上资源 curl 全 200
