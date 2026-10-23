# Habis Cerai — versi ponsel / 手机版原型 (ep1, opening → 01:50 DM)

The screen IS Nadira's phone. The reader plays Nadira.

- `script.js` — all beats; every string is `'id|zh'`. Beat kinds: act (unlock/tap/hold/swipe/drag/app/play), msg, typing, sys, inner, mail, wallet, lensa, live, call, line, notes, dark, scene/say/scap (off-phone text scenes), quick, choice, end.
- `phone.js` — engine. Replays beats 0..n-1 through `derive()` into a phone state (clock, battery, view, threads, live, call…), renders it, and animates only what changed.
  - Autopilot: "Nadira yang lama" types the pilot reply into the input field while a countdown runs; tap **Aku yang pilih! / 我来选！** or any reply chip to take over.
  - Banners: a message from another thread drops in as a notification ("ting!") over the current app; the next tap opens it.
  - Transitions (WAAPI, transform/opacity only, 400–700 ms): slide (app→app), up (unlock), push (reality→phone, zoom into the screen + "ting!" carry-over), pull (phone→reality, the screen shrinks away and the last line lingers as a carry-over), whip (new location), dip (time skip ≥2 h, status-bar clock ticks), black (shock). Tapping during a transition only fast-forwards it; it never advances or skips a line. `prefers-reduced-motion` → 140 ms fades, no Ken Burns, no FLIP.
  - Off-phone scenes: the tag types itself in, the two lines fade up, and the image (persistent `#media` layer, crossfaded A/B, Ken Burns never restarts within an image) arrives ~400 ms after the caption. Image beat → panel expands; dialogue → panel slides up and dims (transform only). Only the newest 3 items stay fully visible, the 4th fades, older ones leave; everything glides via FLIP.
  - Next-scene images and avatars are preloaded/decoded ahead.
- `phone-store.js` — saves under `phone:<reader>:state` (`?reader=` or `?tester=`); Reset (☰) asks for confirmation.
- `smoke/run.js` full playthrough with real gestures; `smoke/rec.js` records transition clips (playwright recordVideo); `smoke/perf.js` measures rAF frame gaps + long tasks under 4× CPU throttle and saves Chrome traces; `smoke/sheet.py` contact sheet.

## v2 — auto-flow + real in-message images (23 Oct 2026)
- **No tap-to-advance.** The story runs itself: an incoming message in the open chat shows a typing indicator (≈38 ms/char ID, 90 ms/char ZH, clamped 0.8–2.5 s), then a reading pause (ID 220 wpm, ZH 8 chars/s, min 1.2 s; scene cards, photos, the bill and voice note get extra time). Banners open by themselves after ~1.9 s; unlock auto-opens after ~3.2 s (the swipe still works).
- The reader only acts at: the 4 quick picks, the 3 choices (or let the autopilot pick), takeover, and 4 gestures (kneel, breath, erase, facedown). The crowd and voice-note gestures were cut, and so was "tap LiveKu" (it is now an automatic home-screen beat with a press animation).
- Tap anywhere or press Space to skip the current wait (optional). Reader bar: ❚❚/▶ pause, 1×/1.5×/2× speed. Both are saved per reader. Auto-flow pauses while the tab is hidden, while the photo zoom is open, and while you scroll back up in a chat; the "Pesan baru ↓ / 新消息 ↓" pill jumps back down and resumes.
- **Images:** the forwarded photo (group, lock thumbnail, zoom, DM attachment) is `assets/p-fakephoto.webp`, a generated manhwa-style still of a woman who looks like Nadira kissing a man in a car at night. It is blurred and non-explicit, and has no text. The live pin renders the school bill as HTML (`BILL` in script.js; the numbers match the text: total Rp187.000.000, cut off above the blurred "paid by Nadira −Rp92.000.000" row). The 01:50 DM shows a blurred transfer receipt (Rp92.000.000) plus the car photo. The voice note plays, with a transcript.
- Smoke test: `node smoke/auto.js BASE OUT lang` (PLAN=pilot|take|meN per choice). It taps only at decisions and gestures, and reports the required taps and the time to the first choice.

## v3 — Ep 1–6 + paywall (in progress, checkpoint log)
Plan: script.js becomes EPISODES (ep1 = the existing beats, ep2–6 new); paywall after ep5; ep6 paid (simulated).
Checkpoints (update as each lands):
- [x] images generated (p-fakephoto redrawn: bald bearded man; p-kitchen p-seroja p-carpark p-costume p-dressing p-collar p-ratna-live p-porridge p-rain p-door) (assets/p-*.webp, list in IMAGES below)
- [x] engine (phone.js): ep / epend / paywall / unblur / gallery / draft / replay / scrollup beats; msg img/loc/gone/shot; `when:` conditions (key=, key!=, heat>=, me>=, seen:); self choices (no autopilot) incl. the ep3 autopilot fade; chapter menu + replay-from-episode; local analytics (store 'events': ep_start, ep_end, paywall_view, paywall_click, unlock, choice, quick, discover, leave); per-episode progress bar; simulated paywall sheets (pay / ad 8 s / wait-till-tomorrow)
- [x] ep2–ep6 scripts in **script-eps.js** (loaded after script.js); ep1 now ends in an `epend` card
- Files: index.html, phone.css, phone.js, phone-store.js, script.js, script-eps.js, assets/
- [x] smoke ep1–6 both langs (auto3, 1x, 390×844, 0 console errors, ended at 'end')
  - zh (pass unlock): ep1 213s/11 taps · ep2 179s/4 · ep3 148s/3 · ep4 180s/4 · ep5 149s/4 · ep6 108s/3 · total 981s
  - id (ad unlock): ep1 215s/8 · ep2 192s/3 · ep3 148s/3 · ep4 159s/4 · ep5 153s/4 · ep6 119s/3 · total 990s
- [x] shots v3 → /workspace/story/out/phone-shots-v3/ (zh-ep1-4, zh-ep5-6, id, paywall-flow-zh, contact sheets, smoke json)
- [x] video → /workspace/story/out/transition-videos/phone-v3-paywall-zh.{webm,mp4} (ep5 end → paywall → pass → ep6, 62s)
- [x] deploy /phone/ + md5 verify (commit 545b3d9, 02:31 SGT, 101 files 0 mismatches, live id/zh 0 errors)

## Checkpoint v4 — image audit (2026-10-23)
- Filled 7 imageless scenes (ep1 06:41, ep3 15:40, ep4 10:00, ep5 00:24/00:42/00:58, ep6 01:31) and replaced ep2 gallery color placeholders with g-*.webp thumbs.
- Fixed mismatches: p-carpark → p-carpark-close (scene) + p-carpark-pap (paparazzi shot); ep4 live → p-live-studio; p-hands regenerated; ep5 00:58 text = gate.
- phone.js: say/scap after a gallery switches back to scene view (ep6 lines + p-rain were hidden).
- Tools: smoke/imgsweep.js (all variants, naturalWidth/4xx/console), smoke/imgshots.js (in-context screenshots). Audit: ../phone-shots-v4/AUDIT-images-v4.md
- Tap rule (v4): a tap first reveals (finishes transition/entrance animations); it advances at most one beat, and only after the beat has been fully visible >=350 ms. No tap queue. Auto-play unchanged. Test: smoke/taptest.js (taps every 50/200 ms, ep1-6 + paywall, zh/id).
- Fixed hidden content: say/scap after a chat/gallery view now switch back to the scene (ep2 Arya, ep3 Mila, ep4 meeting lines were invisible); notes "erase" act now shows its done line.
- Prologue (v4.1): 3 auto screens before ep1 — title card; lock screen with one gossip headline over a collapsed 999+ pile; a lone message from an unsaved number (blurred avatar = Arya): "Kak. Aku nunggu hari ini 10 tahun." Then ep1 unlock = "Face ID · Nadira". ~10 s + unlock. Ep1 20:40 adds one inner callback line. Status-bar clock = lock clock at every beat.
- Prologue (v5, replaces v4.1): reader-driven, ONE continuous lock screen, no title card, no narrator. Beats are marked `pro:1`. New act mode `target`: the glowing element itself (pile / notification / banner) is the button, with no instruction text. After about 4 s idle a faint hand appears. It never auto-completes, and the tap gate is the same (reveal first, 350 ms minimum).
  1. A sleepy, blurred, buzzing lock screen at 06:31: "999+" pile with one peeking @lambe_rumpi_id line. Tap the pile.
  2. The stack expands and keeps pouring in (trending #1, Maya missed calls, parents group, DMs, Salma, Bu Ratna); the counter climbs 999 → 4,127.
  3. Her name is highlighted everywhere and the screen sharpens with a jolt (inner "…Aku?|……我？").
  4. 06:32: tap the gossip headline. Face ID "Nadira" unlocks straight into the Lensa post (p-gossip-pap.webp, new: paparazzi shot, young man's face pixelated). Comments keep arriving and can be liked; the clock runs to 06:36.
  5. 06:38: a banner from an unsaved number (blurred avatar): "Kak. Aku nunggu hari ini 10 tahun." Tap it to open the chat; typing… appears, then stops.
  6. 06:40: Salma's banner pulls her into the parents group = ep1 unchanged from the 06:12 photo on. The old ep1 unlock lock screen has been removed.
  Reduced motion: no buzz, glow or delays; the hint is static. Test: smoke/recprolog5.js (natural-tap recording), smoke/taptest.js handles `target`.


### v5.1 (13:10 SGT)
- 开场恢复短剧大标题（黑底、大字、约2.5秒，然后淡入锁屏；点一下=先显示完整再前进）。
- 去掉开场昏暗/模糊和后面的"变清晰"效果；锁屏从第一帧起就是清楚的（保留震动和看到名字时的一震）。

### v6 阅读感修订（13:50 SGT）
- 详见 REVIEW-readability.md：删去第1集钱包冻结和Salma外卖两拍；20:40新增Arya身份心声；明确"以前的Nadira"；直播账单句子讲清楚；Seroja=当年女团；"两集了"改为"两天了"；第4集"昨天"改为"前天"；Sheila改为连麦；第6集"这次没洒"，并呼应序章的"十年"。
