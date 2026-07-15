# sivann-nextjs — headless frontend

A Next.js 14 (App Router) + Tailwind rebuild of sivann.com, styled to match your existing Porto theme: same dark navy (#2e353e) and gold (#ffd93e) palette, same one-page layout with a floating side icon nav, same section order (About → Experience → Education → Skills → Portfolio → Quote of the Day → Blog → Say Hello).

## Quick start

```bash
cd sivann-nextjs
npm install
npm run dev
```

Open http://localhost:3000 — it runs standalone right now, using real content (your bio, experience, education, skills, and a sample of your portfolio/blog items) hardcoded in `lib/content.js` as seed data.

For a no-install preview, open **sivann-nextjs-preview.html** directly in a browser — it's a static snapshot of the actual rendered output styled with the same Tailwind config, so you can see exactly what the live app looks like without running Node.

## How it's structured

- `app/page.js` — the homepage, composed from the section components below
- `components/` — one file per section (`HeroAbout`, `Experience`, `EducationSkills`, `Portfolio`, `QuoteCarousel`, `Blog`, `ContactFooter`, `FloatingNav`)
- `lib/content.js` — seed content mirroring your real bio/experience/portfolio/blog data
- `lib/wp.js` — the data layer every component calls through. Right now it returns the seed data; once your WordPress site is back live, set `NEXT_PUBLIC_WP_API_URL` and it automatically switches to live data from the WordPress REST API — no component changes needed

## Wiring up the live WordPress API

Once sivann.com is back up on Bluehost:

1. Create `.env.local` (copy `.env.example`) with:
   ```
   NEXT_PUBLIC_WP_API_URL=https://sivann.com/wp-json
   ```
2. In WordPress, the `portfolio` custom post type (registered by the Porto theme) needs `show_in_rest: true` added to its registration so `/wp-json/wp/v2/portfolio` becomes queryable — this is a one-line addition, either via a small must-use plugin or a filter in `functions.php`. Standard blog posts and pages are already exposed by WordPress core.
3. `lib/wp.js` will then fetch real, live posts and portfolio items instead of the seed data automatically.

## Pages

- `/` — homepage (all sections)
- `/blog` — full blog archive, `/blog/[id]` — individual post
- `/portfolio` — full portfolio archive, `/portfolio/[id]` — individual portfolio item
- `/api/contact` — API route the "Say Hello" form posts to

## Contact form

The "Say Hello" form on the homepage actually submits now, via `app/api/contact/route.js`. To have it deliver real email:

1. Create a free account at [resend.com](https://resend.com), verify a sending domain (or use their test domain while testing)
2. Get an API key, add to `.env.local` / Vercel env vars:
   ```
   RESEND_API_KEY=re_xxxxxxxx
   CONTACT_TO_EMAIL=hallo@sivann.com
   ```
Without `RESEND_API_KEY` set, the form still works (no error shown to visitors) but only logs the submission server-side instead of emailing it — safe default for local dev/preview.

## What's not built yet

- Full portfolio filtering by category
- Blog/portfolio pagination (currently loads everything in one page)
- Real deployment of cambotoday's sibling project (see that project's own README)

## Design fidelity notes

Colors and fonts were pulled directly from your theme's saved settings in the database (`porto_settings` in wp_options): body/heading font is Open Sans, primary accent `#ffd93e`, dark text/UI color `#2e353e`, with the same light section backgrounds (`#ecf1f7`, `#f4f9ff`) your current page uses between sections.
