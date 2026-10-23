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
- zh: Sari's "Mas" = 哥; Laras' "Mas" dropped. No husband-word (lao gong) anywhere.
- All illustrations in one realistic photographic grade (p-bed, p-door, p-ask, p-bed2, p-wall, av-L, av-D regenerated).

## v6 (2026-10-23)
- Passcode: one tap on the keypad fills 121019 (wrong, shake) → dinner glimpse 1,9 → "19…" → laundry flashback (ticket kept in her wallet) → ticket shown above the keypad, reader types 190625 (tap on the ticket fills it after 9 s / after a wrong try).
- Galeri: Terbaru grid → scrubber 12 Okt (only a morning invoice) → Album → Baru dihapus (3, 29 hari) → rooftop wine, selfie with her hand + ring, reservation screenshot → 18.40 flashback → anniversary line. Zoom step and hidden album removed.

## v7
- Galeri: satu scroll (Terbaru → 12 Okt → Baru dihapus · 3), foto baru kasual tanpa duplikat; 3 foto terhapus diambil diam-diam.
- Jalanku: 4 perjalanan → baris 12 Okt → detail → tombol kembali (menunggu pembaca). Arta: tombol kembali.
- Air berhenti: Chat → Pak Budi → Tandai belum dibaca → badge 2 → Rumah (dilewati jika Chat tidak dibuka).

## v9 (24 Oct 2026)
- Gallery opens on inner "Tanggal 12… ulang tahun pernikahan kami."; Recently Deleted in time order 17.52 / 21.03 / 21.26 with large timestamps.
- Flashback: black caption card "12 Oktober · 18.40", scene tagged HP-ku, banner holds until tap (act mode hold).
- New ending: bathroom door opens → he stares → "Kamu buka HP-ku?" (holds until tap) → Bersambung + replay. Night choice, 23.40 save-number and ep2 tease removed; no flags except unread.
