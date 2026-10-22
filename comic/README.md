# After the Applause · 漫画/对话剧格式原型（仅第1章开场 → 两次选择 → 悬念）
- 一拍一点：对白气泡（Nadira 在右）、心声云、"以前的Nadira"故障气泡、旁白小框、音效贴纸、手机弹窗（家长群/邮件/银行/WA/直播评论/来电/语音/私信）。
- 背景：assets/bg-*.webp（新生成，无人物）+ studio.webp（沿用）；头像 av-*.webp（新生成的虚构人物）。
- 存档：localStorage `comic:<读者>:state`（?tester= / ?reader=），重置只清本读者的 comic:* 键，小说版不受影响。
- 冒烟：`python3 -m http.server 8730` 后 `node smoke/comic-smoke.js`。
- 未改动 v24 主线。

## v2（图文匹配修订）
- 顶部固定画格 + 下方对话流；换地点即翻页；15 张同画风新图（assets/p-*.webp），表情头像 assets/av-<角色>-<表情>.webp。
- 审计表：AUDIT-images.md；逐拍截图与 contact sheet：/workspace/story/out/comic-shots-v2/。
- 逐拍截图脚本：`node smoke/allbeats.js <URL> <OUT> id|zh`（OPT1/OPT2 环境变量选分支），`python3 smoke/contact.py <beats.json> <out.png> 8 "标题"`。

## v3（现实场景：文字场景卡 + 轻互动）
- 新拍型 `set`：离开手机的现实场景先给 2–3 行场景卡（地点/时间标签、在场的人、感官细节、Nadira 心声斜体），背景是该场景图的模糊+色调；没有到“高潮拍”时顶部不显示图片（只在高潮拍出图）。
- 新拍型 `act`（轻互动，必须完成才继续，无计时）：tap 蹲下牵 Hana 的手；swipe 挤过校门人群；hold 直播中屏住呼吸；drag 深夜把手机扣下（随后 BZZT → 私信）。
- 新拍型 `quick`（快速反应，无自动驾驶）：校门口对 Ratna 的对白气泡二选一；铁门关上后的动作二选一（抓住铁门 / 转身走）。各有 1–2 拍不同反应，抓铁门分支才出铁门特写图。
- 截图：/workspace/story/out/comic-shots-v3/（contact-sheet*.png、key-*.png、beats/、beats-alt/、smoke/）。

## v4 — smoother image/dialogue choreography and scene transitions
- Feed is bottom-anchored and glides (transform) when lines arrive; only the newest ~3 beats stay fully visible, the 4th fades, older ones leave. No scroll jumps.
- Panel no longer animates `height`: image beat → expanded, dialogue → slides up + dims (transform/opacity), choice → further up. The new picture fades in 180–400 ms after the line that motivates it; first line after a picture gets a tail toward it and bubbles slide in from the speaker's side.
- Scene changes use a transition chosen per place (`tx` in script.js): whip (kitchen→gate), push into phone with "ting!" (gate→10.02), dip (time skips), fade-to-black + sound word (live→23.08 "klik.", 01.50). The place tag ticks its clock and types the location; the last line carries over the cut. Tap during a transition fast-forwards it only. `prefers-reduced-motion` respected. Next-scene assets preloaded.

## v5 — autoplay by default + real in-message images (23 Oct 2026)
- Autoplay is ON by default; older saved states are migrated once. Timing: reading pace (ID 220 wpm, ZH 8 chars/s, min 1.2 s), with extra time for scene cards, panels, the photo, the bill and attachments. Tap = skip the wait, and autoplay keeps running. ❚❚ pauses; 1×/1.5×/2× sets the speed; both are saved per reader. It pauses while the tab is hidden.
- The decorative "swipe through the crowd" gesture is now a normal scene card plus a caption. The remaining gestures are kneel, breath and facedown.
- The group photo is now `assets/p-fakephoto.webp` (it replaces the CSS placeholder). The live pin shows the HTML school bill (Rp187.000.000, matching the text). The 01:50 DM shows a blurred transfer receipt and the car photo.
- Smoke test: `node smoke/auto.js BASE OUT lang`.
