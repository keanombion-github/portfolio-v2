<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Project map

- `app/page.tsx` assembles the portfolio; `components/` owns the visible content.
- `app/globals.css` owns theme tokens and terminal styling. Preserve both themes and responsive layouts.
- Chat: `components/ChatWidget.tsx` and `app/api/chat/route.ts` (free FAQ with optional Gemini).
- Contact: `components/Contact.tsx` and `app/api/contact/route.ts` (Resend).
- `content/*.md` are source copy, not automatically rendered. `docs/project-scaffold.md` is historical planning.

## Efficient agents and skills

- Start with targeted `rg` searches and relevant files; exclude dependencies and lockfiles from broad reads. Read only the relevant bundled Next.js guide.
- Keep small changes in one agent. Delegate only independent work that saves repeated investigation; give each agent a bounded task and file ownership. Prefer read-only reviewers when edits would overlap.
- Send delegates paths and essential context instead of full conversation history where possible. Request concise findings, evidence, and unresolved issues. Avoid repeating completed searches or unchanged checks.
- For portfolio UI/content work, load `docs/skills/portfolio-ui/SKILL.md`. For chat or contact API work, load `docs/skills/portfolio-integrations/SKILL.md`. Do not load both for unrelated work.
- Keep shared instructions here and task-specific detail in skills. Update guidance only when project behavior changes.

## Validation

- Use `npx tsc --noEmit` for TypeScript changes and `npm run build` for integrated application changes. Check affected UI at narrow and wide widths when changing layout.
- Run `npm run lint` using the ESLint flat configuration and `npm run test:smoke` against a running server.
- Never print environment variable values or put service keys in client code. Do not assume Git is initialized; check before relying on diffs.


