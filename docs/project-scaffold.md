# Portfolio — Next.js Project Scaffold

## Does this need a backend?

**No.** This is a static/content site — no .NET, no database, no separate
API server. Next.js covers everything it needs on its own:

| Need                  | Solution                                      |
|-----------------------|------------------------------------------------|
| Page content          | React components (static, no server calls)     |
| Contact form          | A Next.js **API route** (`/api/contact`) that calls Resend to send you an email — no database, no persistent server |
| Hosting               | Vercel free tier (zero-config for Next.js)      |
| Project list          | Hardcoded data or a local `projects.ts`/MDX file — no CMS needed at this scale |

Save .NET for BoardSync, where a real backend is doing real work (SignalR,
Redis, business logic). A portfolio's "backend" is a single serverless
function that sends an email.

If you ever want a blog with an admin panel or dynamic content editing
without redeploying, that's when a lightweight backend/CMS (or just
Markdown + git) starts to make sense — not before.

## Tech choices

- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS
- **Fonts:** `JetBrains Mono` or `Space Mono` for headings/labels (terminal feel), a clean sans-serif for body text
- **Content:** Markdown files (the ones we already wrote) loaded via `gray-matter`, or just hardcoded as React components to start — simplest is fine for v1
- **Contact form:** Next.js API route + Resend
- **Hosting:** Vercel

## Folder structure

```
portfolio/
├── app/
│   ├── layout.tsx          # root layout, fonts, metadata
│   ├── page.tsx            # home page — assembles all sections
│   ├── globals.css         # Tailwind base + custom vars (colors, mono font)
│   └── api/
│       └── contact/
│           └── route.ts    # handles contact form submission → Resend
├── components/
│   ├── Hero.tsx
│   ├── Projects.tsx
│   ├── ProjectCard.tsx
│   ├── About.tsx
│   ├── Contact.tsx
│   ├── StatusBadge.tsx     # "AVAILABLE" pill
│   └── SectionLabel.tsx    # "~/projects" style section headers
├── content/
│   ├── hero.md
│   ├── about.md
│   ├── projects.md
│   └── contact.md
├── lib/
│   └── markdown.ts         # reads/parses the content/*.md files
├── public/
│   └── og-image.png        # social share preview image
├── tailwind.config.ts
├── next.config.js
├── package.json
└── tsconfig.json
```

## Build order

1. **Scaffold project** — `npx create-next-app@latest` (TypeScript, Tailwind, App Router)
2. **Set up fonts + color theme** — dark background, one accent color, mono font for labels
3. **Build static sections first** (Hero → Projects → About → Contact) as plain components using the content we've already written
4. **Wire up content loading** — swap hardcoded text for the markdown files if you want easy future edits
5. **Add the contact form** — API route + Resend integration
6. **Polish** — status badge, section numbering (01/02/03), hover states, responsive layout
7. **Deploy to Vercel** — connect GitHub repo, done

## Dependencies to install

```
next react react-dom
tailwindcss postcss autoprefixer
gray-matter          # parse markdown frontmatter (if using content/*.md)
resend               # contact form email sending
```

## Next step

Once you're ready, I can generate the actual code for these files — starting
with the project scaffold and Hero/Projects components, using the content
we already wrote.
