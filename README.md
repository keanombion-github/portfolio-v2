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
- Home with chat, featured work, and a Netlify contact form.
- Project index with text search, technology filters and keyboard focus shortcut.
- Shared project detail pages; BoardSync remains in progress and Invoice Reminder is a concept.
- Dedicated About page with factual background and current work.
- Blog index with search and tag filters, two original editable notes, article table of contents, code-copy and sharing controls, RSS.
- Recommendations with an honest empty state and a Netlify form for manual review.
- Chat request validation and limits; form length limits and Netlify honeypots/spam filtering.
- Metadata, favicon, generated social image, sitemap, robots, and a custom 404.

## Add your details

Copy `.env.example` to `.env.local` for local development and fill only the services you use. Restart the dev server after changing it; rebuild after changing public values in production. Netlify Forms accepts production submissions; local form delivery requires a deployed Netlify preview.

| Variable                    | Purpose                                                                         |
| --------------------------- | ------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`      | Your real HTTPS origin in production; used for sitemap and feed links             |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Public email shown to visitors; defaults to Kean's Gmail address                |
| `NEXT_PUBLIC_GITHUB_URL`    | Your GitHub profile URL                                                         |
| `NEXT_PUBLIC_LINKEDIN_URL`  | Your LinkedIn profile URL                                                       |
| `NEXT_PUBLIC_BOOKING_URL`   | Optional scheduling URL                                                         |
| `GEMINI_API_KEY`            | Optional server-only Gemini key                                                 |
| `GEMINI_MODEL`              | A currently supported model available to your Google AI Studio project          |

No credentials are included. Empty social URLs are omitted from the page instead of pointing to someone else's profile. The public Gmail address is a direct fallback if a visitor cannot submit a form.

## Chat modes

With no Gemini configuration, answers come from `lib/chat.ts`. This deterministic portfolio FAQ has no model API cost and also works as a browser-side fallback if the server is unreachable. It does not pretend to be a general-purpose AI.

With both Gemini settings configured, the server requests a short answer grounded in portfolio facts. Missing configuration, timeout, empty output, or provider failure falls back to the FAQ. The UI labels the response mode. Conversations are bounded and held only in browser component state, not persisted in a database. Gemini quotas, model availability, billing and provider data use depend on your account. Select a current free-tier model and keep paid billing disabled if zero API spend is required; a key alone does not guarantee free usage.

## Contact and recommendations

Both forms submit to Netlify Forms. `public/form-definitions.html` lets Netlify detect their field names during deployment, while the visible React forms send URL-encoded AJAX requests. In the Netlify dashboard, enable **Forms → Form detection** before deploying this change. After the deploy, confirm `contact` and `recommendation` appear under Forms. Set an email notification for both forms at **Forms → Submission notifications** to `keanombion@gmail.com`. Netlify stores submissions in the dashboard; the notification is what forwards them to your inbox. Do not treat an HTTP success as proof that an email notification arrived.

Recommendations need manual review. Nothing is auto-published. After obtaining permission and checking a submission, add an entry to `lib/recommendations.ts` and redeploy. The public data does not include private email addresses. The form does not verify the submitter's identity.

## Editing content

| File                     | Content                                           |
| ------------------------ | ------------------------------------------------- |
| `lib/site.ts`            | Identity and public configuration                 |
| `lib/projects.ts`        | Project summaries, status, stack, detail sections |
| `lib/posts.ts`           | Original notes and article content                |
| `lib/recommendations.ts` | Approved recommendations only                     |
| `public/form-definitions.html` | Static form definitions scanned by Netlify |
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

The smoke script checks public routes, feeds, generated image, 404s, chat, malformed input, origin protection, and the legacy API route validation. It sends no valid form submission. Use `TEST_BASE_URL` to point it at a different local port. Don't run against an unrelated website.

## Deploy

This portfolio is deployed on Netlify from the GitHub repository. After pushing changes, verify that Netlify's Next.js build succeeds and that both forms appear in the Forms dashboard. Set `NEXT_PUBLIC_SITE_URL` to the production HTTPS origin, and configure form email notifications in Netlify. The site is not a static export because chat uses a server route.

The in-memory chat limiter is bounded and per server instance; use shared or edge protection for sustained public traffic. Only trust forwarded client IP headers that your hosting proxy overwrites. Form notification delivery must be verified in Netlify after configuration.
