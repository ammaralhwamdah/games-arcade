# GameVerse 🎮

موقع ألعاب HTML5 **حصري** (12 لعبة أصلية مطوّرة داخلياً) مبني بـ **Next.js 16 + React 19 + TypeScript + Tailwind CSS 4**.

- كل الألعاب كود أصلي منزّل ومستضاف ذاتياً في `public/games/` — لا CDN خارجي، بلا إعلانات أو تتبّع.
- الأسماء والروابط والأوصاف حصرية غير موجودة على الإنترنت (جاهز لمراجعة Google AdSense).
- الصفحات ثابتة (SSG): `npm run build` يولّد صفحات الألعاب/الفئات.

---

## التشغيل محلياً (Local)

يتطلب Node.js (موجود محلياً في `.toolchain\node-v24.19.0-win-x64\node.exe`).

```bash
npm install
npm run build
npm start         # ثم افتح http://localhost:3000
```

للتطوير السريع: `npm run dev` (أو `start-dev.bat` على المنفذ 3001).

---

## مصدر البيانات

- `public/data/games.json` — **مصدر الحقيقة**: القائمة الكاملة (12 لعبة) + الفئات (20) + `featured`.
- `public/data/games.min.json` — نسخة مصغرة (`GameLite`) يستهلكها بحث الواجهة الأمامية.
- تغيير أي لعبة (اسم/رابط/وصف) يبدأ من `games.json` ثم:
  1. إعادة تسمية مجلد اللعبة في `public/games/{slug}/` والصورة في `public/images/games/{slug}.svg`.
  2. توليد `games.min.json` من `games.json`.
  3. إذا تغيّر الرابط (slug) يُضاف تحويل دائم في `next.config.ts` (`redirects()`) من الرابط القديم إلى الجديد.

أسماء الألعاب الحالية ورابطاتها:

| اللعبة | الرابط |
|---|---|
| Emberwood Dash | `/play/emberwood-dash` |
| Veyra's Legacy | `/play/veyras-legacy` |
| Astro Sabotage | `/play/astro-sabotage` |
| Nano Serpent | `/play/nano-serpent` |
| Underground Sprint | `/play/underground-sprint` |
| Aphelion Assault | `/play/aphelion-assault` |
| Nova Corsair | `/play/nova-corsair` |
| Clash of Orbs | `/play/clash-of-orbs` |
| Nebula Bastion | `/play/nebula-bastion` |
| Pitch Battle | `/play/pitch-battle` |
| 2048 Fusion | `/play/2048-fusion` |
| Dustveil Speedway | `/play/dustveil-speedway` |

---

## النشر على الخادم (Ubuntu + PM2)

الموقع الحي: https://gameverse.pro (خادم Ubuntu، إدارة عبر PM2 باسم `gameverse`).

```bash
# 1) رفع الملفات المحدّثة (games.json / games.min.json / next.config.ts / ملفات الألعاب)
# 2) بناء وتشغيل
cd /var/www/gameverse
npm run build
pm2 restart gameverse
```

- `app/sitemap.ts` و`app/robots.ts` يُولّدان تلقائياً من `games.json`.
- إعداد الخادم من الصفر: `deploy/setup-server.sh`.

---

## فحص الألعاب

للتحقق أن جميع ملفات الألعاب تُخدَّم كـ HTML (محلياً وبعيداً):

```bash
node scripts/verify-games.mjs
```

النتيجة تُحفظ في `scripts/verify-report.json` (قائمة الملفات المفقودة/المكسورة).

---

## نظام الحسابات ولوحة المتصدرين (Supabase)

الموقع يعمل بدون حساب (النقاط والنجوم تُحفظ محلياً في المتصفح). لتفعيل **تسجيل الدخول ولوحة المتصدرين العالمية**:

1. أنشئ مشروعاً على https://supabase.com.
2. شغّل SQL في `supabase/comments.sql` (وجداول اللاعبين كما في النسخة السابقة).
3. ضع المتغيرات في `.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOi...
ADMIN_EMAIL=your-email@gmail.com
```

4. أعد البناء/النشر. صفحة الأدمن: `/admin`.

---

## متغيرات البيئة

انظر `.env.example`:

```bash
NEXT_PUBLIC_SITE_URL=https://gameverse.pro
NEXT_PUBLIC_CONTACT_EMAIL=...
NEXT_PUBLIC_ADSENSE_CLIENT=...   # يُفعّل الإعلانات (اختياري)
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
ADMIN_EMAIL=...
```

---

## بعد النشر

- سجّل الموقع في **Google Search Console** وارفع `https://gameverse.pro/sitemap.xml`.
- ابدأ طلب **Google AdSense** بعد تعبئة `NEXT_PUBLIC_ADSENSE_CLIENT` وإعادة النشر.
