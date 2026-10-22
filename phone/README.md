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
