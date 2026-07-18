# Tech Erics Real Estate Platform — Foundation Code

Ye Step 2 ka output hai: research-backed database schema + auto-SEO engine ka
starter code. Sab kuch research se justify hai (comments Hinglish mein
dekho har file ke andar "kyun" likha hai).

## Kya bana hai ab tak

1. **`prisma/schema.prisma`** — Full database design: geography hierarchy
   (Country→Region→City→Locality), versioned Listings (price history
   preserve hoti hai), multi-language translation tables, media (photo/
   video/360/reel), leads, agents.
2. **`lib/seo.ts`** — Auto JSON-LD generator (RealEstateListing, Offer,
   BreadcrumbList, VideoObject schema) — koi bhi property save ho, schema
   khud ban jaata hai.
3. **`lib/ai-seo-writer.ts`** — Claude API se property description, meta
   title/description auto-generate — agent ko sirf raw details bharni
   hain.
4. **`app/[locale]/property/[slug]/page.tsx`** — Property page with ISR
   (60s revalidate), hreflang alternates, server-injected JSON-LD.
5. **`app/[locale]/[city]/[locality]/page.tsx`** — Programmatic locality
   SEO page (Zillow pattern) — real data se FAQ schema bhi auto-banta hai.
6. **`app/sitemap.ts` + `app/robots.ts`** — Auto multi-language sitemap,
   crawl budget protection (filtered URLs disallow).
7. **`next.config.js`** — AVIF/WebP auto image format, security headers.

## Step 3 mein ye add hua (is session mein)

Research: Photo Sphere Viewer vs Pannellum vs Marzipano vs A-Frame compare
kiya — **Photo Sphere Viewer** chuna (best hotspot system, 360-video
support, official React wrapper) 360° tours ke liye.
Research: WhatsApp integration ke liye **official Meta Cloud API** best
practice confirm ki (unofficial/scraping libraries number ban karwa dete
hain) — template-message approach use kiya (24-hour window compliance).

Naye files:
- `components/Tour360Viewer.tsx` — Photo Sphere Viewer wrapper
- `components/PropertyGallery.tsx` — lazy-loaded image gallery with auto alt-text
- `components/PropertyCard.tsx` — listing grid card
- `components/LeadCaptureForm.tsx` — client form
- `app/api/leads/route.ts` — dual capture: DB save + WhatsApp Cloud API notify to agent
- `app/api/admin/properties/route.ts` — full auto-SEO pipeline: AI writes
  title/description/meta → slug generation → alt-text batch → JSON-LD
  pre-cached on save

## Step 4 mein ye add hua (is session mein)

Research: Auth.js v5 (NextAuth) confirm kiya as 2026 ka standard —
Credentials provider + bcrypt + JWT session strategy (edge-friendly,
Vercel deployment ke liye best). Next.js 16 mein `middleware.ts` ka naam
`proxy.ts` ho gaya hai — latest convention use ki.

Naye files:
- `auth.ts` + `app/api/auth/[...nextauth]/route.ts` — login system
- `proxy.ts` — `/admin/*` routes protected, bina login redirect ho jaata hai
- `app/admin/login/page.tsx` — login screen
- `app/admin/dashboard/page.tsx` — property list, "Auto-generated ✓" SEO badge
- `app/admin/dashboard/new/page.tsx` — **deliberately simple** add-property
  form — koi SEO/meta field nahi hai, sirf plain facts. `rawNotes` field
  mein agent normal bhasha mein likhta hai jaise client ko batata hai,
  AI usse professional listing bana deta hai.
- `components/PropertyReels.tsx` — Instagram-style scroll-snap reels,
  autoplay + tap-to-unmute
- `tailwind.config.ts` — dark navy/teal/violet design tokens

## Step 5 mein ye add hua (is session mein)

Research: Cloudflare R2 vs AWS S3 vs Uploadthing compare kiya — **R2**
chuna kyunki zero egress fees hai (real estate site mein bahut saara
photo/video/360-tour traffic hota hai, S3 pe egress cost hi $90+/month
ho sakti thi). Presigned PUT URL pattern use kiya — file kabhi humare
server se hokar nahi jaata, seedha browser se R2 pe upload hota hai.

Naye files:
- `lib/r2.ts` — presigned URL generator (auth-gated)
- `app/api/upload/presigned-url/route.ts` — upload API, file-type +
  size validation (200MB max — 4K video ke liye)
- `components/MediaUploader.tsx` — drag-drop uploader with live progress
  bar, photo/video/360/reel — sab ek jagah
- `components/Header.tsx`, `components/Footer.tsx` — Footer wahi
  "Popular Cities/Localities/Budget" programmatic SEO block hai jo
  humne competitor-analysis mein dekha tha, ab live data se ban raha hai
- `components/SearchBar.tsx` — Buy/Rent toggle + search
- `app/[locale]/layout.tsx` — hreflang wiring, RTL support Arabic ke liye
- `app/[locale]/page.tsx` — homepage: hero, city grid, featured listings

Admin ka "Add Property" form ab MediaUploader se connected hai — agent
photos/video/360/reel upload karta hai, save karte hi sab kuch
(schema, alt-text, SEO content) automatically ban jaata hai.

## Step 6 mein ye add hua (is session mein)

Research: Vercel + Neon production setup best practices (pooled vs
unpooled connection strings, `prisma migrate deploy` build step,
environment variable scoping per Production/Preview/Development).

Naye files:
- `app/[locale]/search/page.tsx` — filter-based search (budget,
  bedrooms, type, purpose) — intentionally noindexed to protect
  crawl budget (matches `robots.ts` disallow rules)
- `app/[locale]/[city]/page.tsx` — city-level programmatic SEO page
  (same Zillow pattern as locality page, with dynamic FAQ schema)
- `prisma/seed.ts` — first admin user (bcrypt-hashed) + sample
  Mumbai city/localities
- `.env.example` — every required environment variable, documented
- `vercel.json` — Mumbai region (`bom1`) for fastest India latency
- `DEPLOYMENT.md` — full step-by-step guide (Neon, R2, WhatsApp,
  Vercel) — jab deploy karne ka time aayega, main tumhe isi ke through
  ek-ek step live guide karunga

## Abhi missing (next steps mein banega)

- Multi-language content: property/city/locality translation rows ko
  actually populate karne ka admin UI (abhi sirf DB schema ready hai)
- Rate limiting (leads + upload APIs) — spam/abuse se bachne ke liye
- Image lightbox/zoom on property gallery, map embed on property page
- robots.txt/sitemap ko locale-aware banane ka final pass
- Actual local run-through jab tum ready ho (npm install, env setup,
  pehli baar `npm run dev` chalana)

Research jaari rahega — har naye step se pehle jo bhi latest/best
technique/library available hai wahi use hogi.

## Step 7 mein ye add hua (is session mein)

Research: next-intl 2026 App Router patterns confirm kiye — `setRequestLocale`
har page/layout mein zaroori hai (nahi to poora route silently dynamic
rendering pe chala jaata hai, static SEO benefit chala jaata hai). Locale-aware
`Link`/`useRouter`/`usePathname` `i18n/routing.ts` se import karna zaroori hai
— plain `next/navigation` locale prefix silently drop kar deta hai.

Naye files:
- `i18n/routing.ts` + `i18n/request.ts` — next-intl central config
- `messages/en.json`, `hi.json`, `ar.json` — translations (nav, home,
  search, property, footer namespaces)
- `components/LanguageSwitcher.tsx` — locale switch, URL prefix sahi
  rehta hai (`/en/...` → `/hi/...`)
- `proxy.ts` updated — ab next-intl locale middleware + admin auth
  dono compose hote hain ek hi file mein (admin route intentionally
  locale-prefix ke bahar hai, kyunki wo internal tool hai, SEO surface nahi)
- `app/api/admin/properties/[id]/route.ts` — edit/delete API. Delete
  actually **soft-delete** karta hai (listing ko OFF_MARKET mark karta
  hai) — property URL zinda rehta hai taaki backlinks/SEO equity waste
  na ho; edit pe schema turant regenerate + `revalidatePath` se ISR
  cache turant refresh hota hai (60s wait nahi karna padta)
- `app/admin/dashboard/[id]/edit/` — edit form + "Mark Off-Market" button
- Vercel Analytics + Speed Insights wire kiya layout mein — real-user
  Core Web Vitals (LCP/INP/CLS) track honge, jo directly ranking factor hai
- Search Console + Bing Webmaster verification meta tags env-driven kar diye

## Step 8 mein ye add hua (is session mein)

Research: Next.js rate limiting 2026 best practice confirm ki — in-memory
counters serverless/edge pe kaam nahi karte (har invocation isolated hota
hai), isliye **Upstash Redis** (REST-based, Edge-compatible) use kiya jo
almost sab production guides mein standard hai.
Research: Property page map ke liye Google Maps Embed API (plain iframe)
chuna Mapbox GL/Leaflet ke upar — zero JS bundle cost, aur humein sirf ek
location pin + directions chahiye, poora interactive map nahi (Core Web
Vitals ke liye better).

Naye files:
- `lib/rate-limit.ts` — 3 alag limiters: leads form (5/min — spam se
  bachne ke liye), upload (60/min — real photo-batch upload block na ho),
  login (5 attempts/15min per email — brute-force protection)
- Leads API, Upload API, aur Auth login — teeno mein rate limiting wire
  ho gayi
- `components/MapEmbed.tsx` — property location pin + "Get Directions" link
- `components/ImageLightbox.tsx` — full-screen zoom, keyboard arrows se
  navigate, `PropertyGallery` mein wire kiya

## Abhi missing (next steps mein banega)

- Instagram Graph API se auto-post/reel publishing (jab property save ho,
  ek reel Instagram par bhi khud publish ho jaaye)
- OG image auto-generation for social share previews (property photo +
  price overlay)
- Multi-language content: property/city/locality translation rows ko
  actually populate karne ka admin UI
- robots.txt/sitemap ko locale-aware banane ka final pass
- Actual local run-through jab tum ready ho (npm install, env setup)

Research jaari rahega — har naye step se pehle jo bhi latest/best
technique/library available hai wahi use hogi.

## Step 9 mein ye add hua (is session mein) — Instagram auto-post + social share images

Research: Instagram Graph API 2026 official content-publishing flow confirm
kiya — container create → status poll (FINISHED) → publish. Business/Creator
account + Facebook Page connection zaroori hai; rate limit 100 posts/24h.

Naye files:
- `lib/instagram.ts` — `publishPropertyReel()` aur `publishPropertyPhoto()`.
  Property save hote hi agar reel upload hui hai to Reel auto-publish
  hoti hai (caption + location hashtags AI-generated), nahi to pehli
  photo se ek photo-post ban jaata hai. **Fire-and-forget** — agar
  Instagram fail ho jaaye (token expire, rate limit) to property save
  kabhi nahi rukta, sirf log hota hai.
- `app/api/og/route.tsx` — Next.js built-in `next/og` (edge, Satori-based)
  se dynamic social-share image banti hai: property photo + price +
  location overlay. Jab tum WhatsApp/Instagram/Facebook pe property link
  share karoge, generic logo nahi — asli photo+price ka card dikhega.
  Property page metadata mein wire kar diya.

## Abhi missing (next steps mein banega)

- Instagram OAuth connect flow in admin dashboard (abhi env token
  manual generate karna padta hai)
- Multi-language content admin UI
- robots.txt/sitemap locale-aware final pass
- Actual local run-through (npm install, env setup, pehli baar deploy)

Research jaari rahega — har naye step se pehle jo bhi latest/best
technique/library available hai wahi use hogi.

## Step 10 mein ye add hua (is session mein) — correctness pass + missing config

Ye "polish" step tha — bina naye feature ke, poore project ko internally
consistent aur actually-buildable banane ke liye:

- **Next.js 15+/16 async params fix**: `property/[slug]`, `[city]`,
  `[city]/[locality]`, `search`, admin `edit` page, aur dono admin API
  routes — sab mein `params`/`searchParams` ab `Promise` type hain aur
  `await` ho rahe hain (naye Next.js versions mein ye synchronous access
  se silently break ho jaata — ab sab jagah consistent hai)
- `tsconfig.json` — bina iske project compile hi nahi hota
- `postcss.config.js` + postcss/autoprefixer dependencies — Tailwind CSS
  ko actually process karne ke liye zaroori

## Abhi missing (genuinely optional polish, jab chaho tab)

- Instagram OAuth connect flow in-dashboard (abhi env token manual)
- Multi-language content admin UI (translation rows abhi API se hi bharni
  padengi, dashboard form nahi bana)
- Actual local run-through — jab tum apne machine pe `npm install`
  chalane ke liye ready ho, mai step-by-step saath baithke karwa dunga

**Is point pe project ek complete, internally-consistent v1 foundation
hai** — database se lekar deployment plan tak, har cheez research-backed
aur ek doosre se connected hai. Ab genuinely bacha hua kaam sirf polish
aur actual deployment/testing hai, jo tumhare live environment mein
karna behtar hoga.

## Update — Anthropic se Google Gemini (free tier) pe switch kiya

Auto-SEO writer ab **Google Gemini 2.5 Flash** use karta hai (`@google/genai` SDK) —
Anthropic API ki jagah, kyunki Gemini ka genuine free tier hai jabki Anthropic/OpenAI
first call se hi billing maangte hain.

⚠️ **Important:** Gemini free tier officially personal/testing use ke liye hai —
rate limits bhi hain (~15 requests/minute). Jaise-jaise properties/traffic badhega,
Google Cloud billing enable karni pad sakti hai (Google khud prompt karega jab
limit paar ho). Abhi shuru karne ke liye bilkul sahi hai.

**Free key kaise banayein:** aistudio.google.com/app/apikey pe jaao → Google account
se login karo → "Create API Key" → key copy karo → `.env` mein `GEMINI_API_KEY` mein daal do.

`lib/ai-seo-writer.ts` ka function signature same rakha hai — kal ko agar volume badhe
aur paid provider (Anthropic/OpenAI) pe switch karna ho, sirf isi ek file mein change karna hoga.

## Update — Cloudflare R2 se Cloudinary (no card required) pe switch kiya

R2 free tier ke liye bhi card maangta hai (Cloudflare ki policy hai, free
tier mein charge nahi hota par card file mein hona zaroori hai). Isliye
switch kiya **Cloudinary** pe — jiska free plan (25 credits/month: ~5GB
storage + 10GB bandwidth + transformations) **bilkul bina card ke** milta hai.

Bonus: Cloudinary "unsigned upload" support karta hai — matlab browser
seedha Cloudinary pe upload kar sakta hai, humein apna server-side upload
route ya secret key bhi nahi chahiye. Setup aur bhi simple ho gaya.

**Cloudinary account kaise banayein (bina card):**
1. cloudinary.com → Sign Up (Google se bhi ho jaata hai)
2. Dashboard pe "Cloud Name" dikhega upar — wahi `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` hai
3. Settings → Upload → "Upload presets" → "Add upload preset"
4. Naam do `techerics-unsigned`, "Signing Mode" ko **"Unsigned"** kar do, Save
5. Yahi naam `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET` mein daal do

Deleted: `lib/r2.ts`, `app/api/upload/presigned-url/route.ts` (ab zaroorat nahi)
Updated: `components/MediaUploader.tsx` (ab seedha Cloudinary ko upload karta hai)

## Fix — Vercel deployment error: next-intl vs Next.js 16 conflict

Deploy karte waqt ye error aaya: `next-intl@3.26.5` peer dependency
`next@"^16.0.0"` ko support nahi karta (v3 sirf Next.js 15 tak support
karta hai). Fix: `next-intl` ko `^4.13.2` pe upgrade kiya, jo officially
Next.js 16 support karta hai.

Isi ke saath v4 ke 2 known migration gotchas bhi fix kiye:
- `i18n/routing.ts` aur `createNavigation` ko alag files mein split kiya
  (naya `i18n/navigation.ts`) — same file mein rakhne se v4 mein ek
  reported bug hai jo build/runtime error deta hai
- `i18n/request.ts` already `locale` return kar raha tha object mein
  (v4 mein ye mandatory hai) — koi change nahi chahiye tha

Agar dobara koi dependency conflict error aaye Vercel build logs mein,
wahi error message copy-paste kar dena — turant fix kar dunga.

## Fix — Prisma 7 "datasource.url property is required" build error

Prisma 7 (jo Vercel pe automatically latest install ho raha hai) ne
database URL rakhne ka tarika badal diya — sirf `schema.prisma` mein
`url = env("DATABASE_URL")` likhna ab kaafi nahi hai `migrate deploy`
command ke liye. Fix: naya `prisma.config.ts` file add ki (root mein,
`package.json` ke bagal mein) jisme explicitly `datasource.url` set
kiya hai. `dotenv` package bhi add kiya (is config file ko local `.env`
padhne ke liye chahiye).

Vercel pe koi extra env variable add nahi karna — `DATABASE_URL` jo
already Environment Variables mein daala hai, wahi is naye config file
se automatically read ho jaayega.

## Fix — Vercel error: "No matching version found for next-auth@^5.0.0"

`next-auth` version 5 kabhi bhi ek clean "5.0.0" release ke roop mein
publish nahi hui — ye hamesha se "beta" tag ke neeche hai (jaise
`5.0.0-beta.25`), chahe production mein widely use ho rahi ho. Isliye
`^5.0.0` jaisa version range npm ko kuch match nahi karta. Fix:
package.json mein version ko `"beta"` (npm dist-tag) kar diya, jo
hamesha latest beta release khींch lega.
