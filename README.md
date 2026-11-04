# Harshvardhan: Freelance Developer Portfolio

Next.js (App Router) · TypeScript · Tailwind CSS v4 · GSAP ScrollTrigger · Motion · Lucide.

## Run

```bash
npm install
cp .env.example .env.local   # then fill in values
npm run dev                  # http://localhost:3000
npm run build && npm start   # production
```

## What to replace before launch

| What | Where |
| --- | --- |
| WhatsApp number | `NEXT_PUBLIC_WHATSAPP_NUMBER` (or `src/lib/config.ts`) |
| Site URL | `NEXT_PUBLIC_SITE_URL` |
| Email / LinkedIn / Instagram | env vars above (hidden until set) |
| Contact form delivery | `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` |
| Project screenshots | put files in `public/projects/` and set `desktopImage` / `mobileImage` in `src/data/projects.ts` |
| Project live links | `links.live` in `src/data/projects.ts` (missing = "coming soon", no dead links) |
| Reviews | `src/data/testimonials.ts` (empty = honest placeholder state) |
| Portrait | `PORTRAIT_SRC` in `src/components/sections/About.tsx` |

Add a project by appending one object to `src/data/projects.ts`.

## Notes

- Project info comes only from your real projects. "KarZone" in the brief is listed as **DriveGo** (your project notes use that name); rename in `projects.ts` if needed.
- Contact API (`/api/contact`): honeypot, minimum fill time, same-origin check, size cap, validation, per-IP rate limit (in-memory; use Upstash/Redis if running multiple instances). Add Cloudflare Turnstile for stronger protection.
- Fonts are self-hosted from npm (`@fontsource`), with no external font requests.
- Animations respect `prefers-reduced-motion`; parallax is desktop-only.
