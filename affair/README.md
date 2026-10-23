# Di HP-nya, Namaku Cuma “Rumah” — Episode 1 (v4, simple)

Phone-first interactive story, Indonesian/Chinese (toggle ID/中). Episode 1 only, ends on the ep2 hook card + “Bersambung / 未完待续”.

Files: `index.html` (noindex), `script.js` (all story data, every reader string `'id|zh'`), `phone.js` (engine), `phone.css`, `phone-store.js` (per-reader save, `?reader=`), `assets/`.
URL params: `?lang=zh|id`, `?reader=<name>`.

Flow: title → 22:31 bedroom (shower on, Sari 🌸 on my phone, two Pak Budi banners on his) → PIN (121019 fails → dinner + June-2025 laundry flashbacks → 190625) →
his chat list → home: 4 apps (Chat, Galeri, Jalanku, Arta), 4 min each, only 3 fit → after the 1st app the call (Angkat / Tolak −1 min) →
water stops at 22:46 → put it back (list scrolls to “Rumah”) → Pura-pura tidur / Tanya dia → 23:40 save number → “S…” → hook.
Flags: `call_answered`, `asked`.

Checks: `node /workspace/affair-tools/validate.js`; `node smoke/play4.js URL OUT zh|id` (env APPS, CALL, NIGHT, TAP, SHOTS); `node smoke/taptest4.js URL zh 90000`.

## v5 (2026-10-23)
- Opening: title → bedroom → his phone lit on the bed (p-hisphone) → lock screen. Sari pop removed.
- "HP Mas Dimas / Dimas的手机" pill in the status bar on every screen of his phone.
- Unlock lands on home; countdown starts there with inner line (no "4 menit" hint).
- Call: auto beat — she photographs the call screen (flash). Ending: that photo in her gallery → new contact → S…
- zh: Sari's "Mas" = 哥; Laras' "Mas" dropped. No 老公.
- All illustrations in one realistic photographic grade (p-bed, p-door, p-ask, p-bed2, p-wall, av-L, av-D regenerated).
