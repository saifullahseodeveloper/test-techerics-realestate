# Deployment Guide (Step-by-Step)

Ye guide tumhe bina kisi coding knowledge ke deployment karwa degi — jab
hum is stage pe pahunchenge, main tumhe har step khud terminal commands
ke saath guide karunga. Ye document sirf reference ke liye hai taaki
pata rahe aage kya hone wala hai.

## 1) Database — Neon (PostgreSQL)
1. neon.tech pe free account banao
2. New Project → naam do "techerics-production"
3. Do connection strings milenge — `DATABASE_URL` (pooled) aur
   `DIRECT_URL` (unpooled). Dono `.env.local` mein daalne hain.
4. Neon ka **Vercel-Managed Integration** use karenge — Vercel
   dashboard se ek click mein Neon connect ho jaata hai aur har
   preview deployment ke liye automatically alag database branch ban
   jaata hai (production data safe rehta hai testing se).

## 2) File Storage — Cloudflare R2
1. Cloudflare dashboard → R2 → Create bucket → naam "techerics-media"
2. R2 → Manage API Tokens → naya token banao (Object Read & Write)
3. Custom domain attach karo bucket pe (e.g. `media.techerics.com`) —
   taaki images fast CDN se serve hon
4. CORS policy set karo (allowed origin = tumhari production domain)

## 3) WhatsApp Business API
1. developers.facebook.com pe Meta Developer account banao
2. WhatsApp Business Account (WABA) create karo, phone number verify karo
3. System User se **permanent access token** generate karo (temporary
   token 24h mein expire ho jaata hai — permanent chahiye)
4. WhatsApp Manager mein `new_lead_notification` template banao aur
   submit karo review ke liye (24-48 ghante lagte hain approve hone mein)

## 4) Hosting — Vercel
1. GitHub pe is project ka repo banao (`git push`)
2. vercel.com pe GitHub se connect karo, is repo ko import karo
3. Project Settings → Environment Variables mein `.env.example` ke
   sab keys daalo (Production environment ke liye)
4. Deploy — Vercel automatically build karega
   (`prisma generate && prisma migrate deploy && next build`)
5. Custom domain add karo (techerics.com) — Vercel DNS instructions
   dega, wahi apne domain registrar (GoDaddy/Hostinger) mein daalne hain

## 5) First-time setup after deploy
1. `npm run seed` chalao (ya Vercel CLI se) — ye pehla admin user aur
   sample Mumbai city/localities bana dega
2. `/admin/login` pe jaake seed wale email/password se login karo
3. Password turant change karo (future step mein "change password"
   feature add karenge)

## Important notes
- **Region:** `vercel.json` mein `bom1` (Mumbai) set hai — India
  audience ke liye fastest. Multi-region ke liye Vercel Pro plan chahiye.
- **Secrets:** Koi bhi `.env` file kabhi GitHub pe push mat karo — ye
  already `.gitignore` mein hai.
- Har environment variable change karne ke baad Vercel pe manually
  redeploy trigger karna padta hai (auto nahi hota).
