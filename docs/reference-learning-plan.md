# Portfolio learning plan — akkila.dev reference

Reviewed 2026-09-13. Goal: recreate the reference's layout and public functionality with Kean's own content, while Kean writes the implementation with guided exercises and code review. Existing application code was inspected; local runtime, live email delivery, and chat provider behavior were not tested in this planning pass.

## Reference inventory

| Surface | Observed behavior | Source |
| --- | --- | --- |
| Home `/` | Terminal hero, availability, socials, chat with quick questions, three featured project cards, contact details/form, call-booking link | https://akkila.dev/ |
| Home navigation | Home/projects/contact target homepage anchors; blog/about/recommendations target routes | https://akkila.dev/ |
| Projects `/projects` | Breadcrumb, terminal heading, searchable list with dates/roles, count, all filter and keyboard-shortcut hint. Searching football narrowed to one project | https://akkila.dev/projects |
| Project `/project/[slug]` | Title/summary, role/date range, optional live link, six case-study sections, images on some pages, table of contents, share/copy controls | https://akkila.dev/project/fudballive |
| Blog `/blog` | Search, topic chips/counts, featured/latest article card, date, reading time, RSS link | https://akkila.dev/blog |
| Article `/blog/[slug]` | Tags, title, author/date/read time, cover image, headings, code blocks with copy buttons, tables/callouts, table of contents, share controls | https://akkila.dev/blog/portfolio-self-hosted-ai-chat |
| About `/about` | Personal facts and portrait, longer bio, six-image gallery, career timeline, current building/reading/learning cards, social/contact links | https://akkila.dev/about |
| Recommendations `/recommendations` | Two author/profile/date/quote cards; identity-provider verification labels; submission area describes GitHub/LinkedIn sign-in, one per account, moderation | https://akkila.dev/recommendations |
| Feeds/discovery | Footer links to RSS and sitemap | https://akkila.dev/ |

All nine linked project detail routes were opened: thrust-crypto-trading, fudballive, skylead, video-surveillance-grid, bus-ticketing-platform, akkila-dev, cookie-switch, code-highlights, amori-dating-coach. They share Overview, The Problem, What I Built, Tech Stack, Key Features, Results & Impact sections. Build one template, not nine separate layouts.

Limits: recommendations remained at checking session, so authenticated submission was not verified. Contact/chat requests and social share submissions were not sent. Sitemap fetch failed; RSS content was not checked. No private admin screens were inspected. Reference homepage says 12 projects while the index exposes nine; use consistent counts in our version. Its portfolio case study describes an admin dashboard, database, media uploads, anti-spam controls, and ISR, but these are author-reported rather than independently verified. Its article describes self-hosted llama.cpp/Gemma chat: no hosted API bills, but hardware/electricity still apply. Do not copy article sample code without checking current APIs.

## Existing project inventory

| Area | Already implemented in source | Remaining |
| --- | --- | --- |
| Framework | Next.js App Router, React, TypeScript, Tailwind v4 | Baseline checks; current lint script uses legacy next lint |
| Shared shell | Layout, metadata, fonts, Navbar, Footer | Multi-page links/active states; real profile URLs; confirm domain |
| Themes | Light/dark variables, toggle, persisted theme, startup script | Browser QA including blocked storage and system preference |
| Effects | Dot-grid cursor spotlight, vignette, blinking cursor, status pulse, hover effects | Visual comparison; reduced-motion support |
| Hero | Kean biography, availability, CTAs, socials, two-column chat layout | Refine copy/spacing and replace placeholder links |
| Featured work | Two project cards, typed props, tech pills, optional external links | Shared project data, images, internal detail links, working view-all link |
| About | Homepage biography and stack section | Dedicated About route and optional personal sections |
| Contact UI | Name/email/message, browser constraints, sending/success/error states | Real contact details, optional booking link, accurate delivery feedback |
| Contact API | Resend integration and basic validation | Missing-key behavior, inspect Resend returned errors, email/type/length validation, spam protection, actual delivery test |
| Chat UI | Quick questions, input, history, streamed text/JSON handling, loading/error states | Free fallback, bounded history/input, polish streaming edge cases |
| Chat API | Gemini SDK, portfolio system prompt, streaming, output cap | Replace retired model, validate payload, control abuse, handle quotas/timeouts |
| Content/docs | Markdown reference copy, README, scaffold notes | Shared source of truth; chat configuration in README; update obsolete planning |
| Agent guidance | AGENTS.md project map and efficient delegation; two focused skills under docs/skills | Keep guidance current; skills load through AGENTS.md |
| New routes | Only homepage and contact/chat APIs found | Projects, details, blog, articles, About, recommendations, not-found, RSS/sitemap/robots |
| Delivery | Vercel mentioned in docs/footer | No deployment/domain status established; Git was not initialized at review time |

The design foundation exists. Public multi-page features and production integration handling are the largest remaining work. Source presence is not proof of working production behavior.

## Suggested route structure

```text
app/
  page.tsx
  projects/page.tsx
  project/[slug]/page.tsx
  blog/page.tsx
  blog/[slug]/page.tsx
  about/page.tsx
  recommendations/page.tsx
  not-found.tsx
  sitemap.ts
  robots.ts
  rss.xml/route.ts
  api/chat/route.ts
  api/contact/route.ts
lib/
  projects.ts
  posts.ts
components/
  existing components
  ProjectList.tsx
  TableOfContents.tsx
  ShareButtons.tsx
content/
  projects/boardsync.md
  projects/invoice-reminder.md
  posts/first-post.md
```

These are proposed files, not created application features. Keep Next.js as the application framework initially. Add database/auth/admin capabilities when the corresponding learning milestone requires them; a separate Express service is not required to reproduce the public layouts.

## Milestones and exercises

### 1. Establish a reliable baseline

- Learn the entry points: page, root layout, component, CSS token, route handler.
- Read relevant installed Next.js docs; run TypeScript/build and replace legacy lint configuration as needed.
- Initialize Git if desired, add appropriate ignores, make a baseline commit, and keep keys out of version control.
- Replace email/social placeholders and confirm actual project dates/status.
- Done when the current site builds, its links use your details, and you can explain how the homepage is assembled.

### 2. Match the shared visual shell

- Compare reference and local site at the same viewport in both themes.
- Adjust tokens, spacing, content width, headings, buttons, card proportions, borders, and dot spotlight one category at a time. Reference uses a green accent; current site uses cyan. Choose whether to match green or retain cyan.
- Add page-aware navigation and fix mobile drawer focus, Escape/close handling, hidden-state keyboard access, and scroll behavior.
- Add reduced-motion behavior for decorative animations.
- Done when the shell works at phone/desktop widths without horizontal overflow and is usable by keyboard.

### 3. Centralize project data

- Define a Project type with slug, title, summary, role, dates/status, stack, featured, links, and optional media.
- Move BoardSync and Invoice Reminder data into one module; derive homepage cards and counts from it.
- Exercise: change one project title and see all consumers update.
- Done when homepage project data is no longer duplicated and the featured count matches the collection.

### 4. Build the project index

- Create `/projects`, breadcrumb/header, reusable project rows, search input, and result/empty states.
- Learn client state, array filtering, and Server/Client Component boundaries.
- Add technology filters when useful; make keyboard-shortcut hints real or omit them.
- Wire homepage view-all and navigation correctly across routes.
- Done when case-insensitive search works, clearing restores results, and each row links to its project.

### 5. Build project case studies

- Create one `/project/[slug]` template with slug lookup and unknown-project 404.
- Write your own Overview/Problem/Built/Stack/Features/Results sections. Mark in-progress work accurately; use real screenshots.
- Begin with structured data; introduce Markdown rendering when rich content justifies it.
- Add section IDs/table of contents, optional media/live links, copy-link feedback, and page-specific metadata.
- Done when both projects render through the same template, section links work, and missing slugs show 404.

### 6. Expand About

- Move or expand biography into `/about`; decide whether to retain a short homepage preview.
- Add only personal facts you want public, portrait/gallery assets you own, real timeline, and current learning/building cards.
- Learn reusable cards, semantic image descriptions, and responsive image layouts.
- Done when the About route tells your story and all navigation paths work from other pages.

### 7. Build a blog

- Create a post model and one original learning note from this project.
- Build `/blog` search/tags/cards and `/blog/[slug]` article rendering.
- Add code highlighting/copy, heading anchors/table of contents, dates/read times, optional cover, and share controls.
- Reuse case-study primitives rather than duplicating layouts. Handle Markdown safely; avoid unrestricted raw HTML.
- Done when adding a post file creates an index entry and a working article route.

### 8. Make contact delivery trustworthy

- Validate JSON shape, trimmed fields, email format, and maximum lengths server-side.
- Report missing configuration and returned email-service errors accurately; don't show sent for simulated delivery.
- Add honeypot/rate limiting suited to deployment; add CAPTCHA only if warranted or matching that feature is a chosen goal.
- Configure verified sender/recipient and test one real delivery, success, invalid input, and provider failure.
- Optional: link your booking page; optional later database storage of submissions.
- Done when success means the provider accepted the message and failures remain understandable/retryable.

### 9. Make chat usable without API spend

- First implement deterministic portfolio FAQ answers for quick questions, synonyms, and unknown-question/contact guidance. This has no model API cost.
- Then optionally add quota-limited free Gemini using a current supported model and server-only key.
- Bound request/history/output, handle provider/quota failures, and fall back to FAQ answers. Disclose whether replies are AI or FAQ.
- Later learning experiment: run llama.cpp or another local model on your own hardware. Public access, uptime, latency, concurrency, and electricity are separate concerns from model API bills.
- Done when no-key/quota-error behavior still answers portfolio questions and does not require paid billing.

### 10. Recommendations, progressively

- Start with real recommendations supplied with permission: author/profile/date/quote cards or an honest empty state.
- If matching interactive submission, add identity sign-in, session handling, database records, one-per-account uniqueness, pending/approved status, and a protected moderation action.
- Add unauthorized/duplicate/pending/error feedback. Identity sign-in verifies an account, not the truth of the endorsement.
- Done when unapproved content is never public and only authorized moderation can approve it.

### 11. Discovery and release

- Add page metadata/canonical domain, social preview, favicon, sitemap/robots, and blog RSS.
- Check navigation, direct route loads, 404s, mobile, themes, keyboard, form/chat failures, and images.
- Measure Lighthouse and address demonstrated problems; don't assume the reference's stated targets are measured results.
- Deploy, configure secrets/domain, test deployed API behavior, then update README/footer to reflect reality.
- Done when the deployed public routes work and no placeholder links or false success states remain.

### 12. Optional full-stack extension

The reference describes auth-gated admin CRUD, publish/unpublish, image uploads, PostgreSQL, and self-hosted infrastructure. Reproducing that requires a separate milestone for database migrations, authorization, upload controls, preview/publication, caching/revalidation, backups, and deployment operations. Add it after the public site is complete if these are skills you want to learn. You can use Next.js routes or a .NET backend as a deliberate learning choice; the reference's Express/Turborepo stack need not dictate your stack.

## How we will work together

For each small feature: I explain the concept and relevant files, give an exercise with acceptance criteria, you implement it, and I review your attempt and help diagnose errors. I provide hints before complete solutions unless you request the full implementation. Keep each step small enough to run and inspect before adding the next feature.

First exercise: trace `app/page.tsx` to `Projects.tsx` to `ProjectCard.tsx`, then define the shared Project type and move the two existing project records into `lib/projects.ts`. Preserve the current UI. This teaches types, modules, props, and data reuse before new routes.
