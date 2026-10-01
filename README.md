# kean.dev

A complete public developer portfolio inspired by the terminal design of akkila.dev, adapted to Kean's own background and in-progress projects.

## Run locally

```sh
npm install
npm run dev
```

Open http://localhost:3000. The portfolio chat works immediately using local FAQ answers; no API key or payment is needed.

## What is implemented

- Responsive green terminal design, light/dark themes, persisted preference, cursor spotlight, reduced-motion support, accessible mobile menu and skip link.
- Home with chat, featured work, and contact form.
- Project index with text search, technology filters and keyboard focus shortcut.
- Shared project detail pages; BoardSync remains in progress and Invoice Reminder is a concept.
- Dedicated About page with factual background and current work.
- Blog index with search and tag filters, two original editable notes, article table of contents, code-copy and sharing controls, RSS.
- Recommendations with an honest empty state, optional GitHub identity sign-in, and a form forwarded for manual review.
- Server-side validation, body limits, origin checks, honeypots and best-effort per-instance request limiting.
- Metadata, favicon, generated social image, sitemap, robots, and a custom 404.

## Add your details

Copy `.env.example` to `.env.local` and fill only the services you use. Restart the dev server after changing it; rebuild after changing public values in production.

| Variable                    | Purpose                                                                         |
| --------------------------- | ------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`      | Your real HTTPS origin in production; used for sitemap, feed and OAuth callback |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Public email shown to visitors                                                  |
| `NEXT_PUBLIC_GITHUB_URL`    | Your GitHub profile URL                                                         |
| `NEXT_PUBLIC_LINKEDIN_URL`  | Your LinkedIn profile URL                                                       |
| `NEXT_PUBLIC_BOOKING_URL`   | Optional scheduling URL                                                         |
| `RESEND_API_KEY`            | Server-only Resend credential                                                   |
| `CONTACT_EMAIL`             | Private recipient for contact and recommendation emails                         |
| `CONTACT_FROM_EMAIL`        | Verified sender address accepted by your Resend account                         |
| `GEMINI_API_KEY`            | Optional server-only Gemini key                                                 |
| `GEMINI_MODEL`              | A currently supported model available to your Google AI Studio project          |
| `GITHUB_CLIENT_ID`          | Optional GitHub OAuth application's client ID                                   |
| `GITHUB_CLIENT_SECRET`      | Server-only GitHub OAuth secret                                                 |
| `AUTH_SECRET`               | At least 32 random characters for signing identity/state cookies                |

No credentials are included. Empty social/contact values are omitted from the page instead of pointing to someone else's profile. Email forms report unavailable delivery until all three email settings are supplied; submission success means the email provider accepted the message.

## Chat modes

With no Gemini configuration, answers come from `lib/chat.ts`. This deterministic portfolio FAQ has no model API cost and also works as a browser-side fallback if the server is unreachable. It does not pretend to be a general-purpose AI.

With both Gemini settings configured, the server requests a short answer grounded in portfolio facts. Missing configuration, timeout, empty output, or provider failure falls back to the FAQ. The UI labels the response mode. Conversations are bounded and held only in browser component state, not persisted in a database. Gemini quotas, model availability, billing and provider data use depend on your account. Select a current free-tier model and keep paid billing disabled if zero API spend is required; a key alone does not guarantee free usage.

## Recommendations and identity

Recommendations are emailed to you for review. Nothing is auto-published. After obtaining permission and checking the submission, add an entry to `lib/recommendations.ts` and redeploy. The public data does not include private email addresses.

Optional GitHub sign-in associates a server-verified public profile with the review email. Create a GitHub OAuth application and set its callback to `YOUR_SITE_URL/api/auth/github/callback`. Use the same origin for `NEXT_PUBLIC_SITE_URL`. Configure its client ID/secret and an independently generated random `AUTH_SECRET`. HTTPS is required for production cookies. Provider access tokens are not sent to the browser. With no OAuth configuration, the direct recommendation form remains available.

This version uses manual review rather than a private admin dashboard/database. It does not promise one recommendation per account, and it does not provide LinkedIn sign-in. Signed-in identity establishes account control, not the truth of an endorsement.

## Editing content

| File                     | Content                                           |
| ------------------------ | ------------------------------------------------- |
| `lib/site.ts`            | Identity and public configuration                 |
| `lib/projects.ts`        | Project summaries, status, stack, detail sections |
| `lib/posts.ts`           | Original notes and article content                |
| `lib/recommendations.ts` | Approved recommendations only                     |
| `lib/chat.ts`            | FAQ answers and facts for optional AI             |
| `app/about/page.tsx`     | Biography and learning progression                |
| `app/globals.css`        | Design tokens and shared visual rules             |

The existing `content/*.md` files are historical reference copy, not loaded into the live pages. Update chat facts when biography/projects change. No reference-site projects, portrait photos, testimonials, or article text were copied. The two notes are editable starter content written for this implementation; review them before publishing under your name.

## Verify

```sh
npm run lint
npm run typecheck
npm run build
```

With the local server running:

```sh
npm run test:smoke
```

The smoke script checks public routes, feeds, generated image, 404s, chat, malformed input, origin protection, and form validation. It sends no valid email submission. Use `TEST_BASE_URL` to point it at a different local port. Don't run against an unrelated website.

## Deploy

Use a Next.js-compatible Node hosting environment or Vercel. Run `npm run build`, then `npm start` for a Node server. This is not a static-export-only site because chat, email and OAuth use server routes. Set the variables in your host, use your actual HTTPS domain, rebuild, and verify chat and one email delivery after launch.

The in-memory limiter is bounded and per server instance; use a shared limiter or hosting-edge protection for multiple instances or sustained public traffic. Only trust forwarded client IP headers that your hosting proxy overwrites. External service delivery and OAuth login still require live verification after configuration. No deployment or domain purchase has been performed.
