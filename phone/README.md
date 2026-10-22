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
