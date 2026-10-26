# Portfolio Motion Implementation Plan

**Goal:** Add clean, professional but noticeable interactive dots, scroll reveals, and homepage project-card motion.

**Spec:** User direction in this chat, 2026-10-26: implement dots, scroll effects, and project-card animations first; retain clean professional styling.

**Architecture:** Extend the existing CSS dot spotlight. Use small client boundaries for pointer effects and IntersectionObserver/Web Animations reveals while keeping server-rendered content readable without JavaScript. No animation dependency.

**Tech stack:** Existing Next.js/React/TypeScript, CSS variables, browser APIs.

## Constraints and review focus

- Preserve both themes, layout, project order, links, and forms.
- Reduced motion must stop reveals, tilt, zoom, and pointer tracking, including when changed during a visit.
- Touch devices keep native scrolling and simple focus/tap feedback.
- Content remains visible without JS or unsupported animation APIs; keyboard focus must not be obscured by a reveal.
- Event listeners/observers/animation frames must be cleaned up; no perpetual idle render loop.
- Test navigation away/back, hash links, rapid pointer moves, and long scrolling pages.

## Tasks

1. [x] Add browser checks for pointer spotlight, section reveals, card interaction/navigation, mobile overflow, live reduced-motion changes, and no-JS content. Run against old build and confirm failure.
2. [x] Update `components/CursorTrail.tsx` and motion CSS in `app/globals.css`. Widen mask, enlarge highlighted dots, interpolate pointer with a finite animation loop, fade on exit. Keep passive background in all modes.
3. [x] Add `components/ScrollReveal.tsx`; compose it around experience/contact and individual project cards. Animate once on intersection; clear animation on focus, preference changes, and unmount. Add `components/ProjectMotionLink.tsx` for pointer CSS properties and frame cleanup; reuse existing card content.
4. [x] Run browser checks and tsc/lint/build/smoke. Inspect desktop/mobile and both themes. Get bounded read-only code and UI review, then fix verified findings.
5. [x] Update README and Work Library with behavior and limitations. Publish through the existing GitHub/Netlify workflow after checks pass.

## Execution notes

- Work in the existing clean tracked checkout to preserve this task's established workspace and publishing workflow. Untracked planning/output files are unrelated and must not be staged.
- Reviewer agents are read-only. Primary owns all edits and validation.

- Verified 2026-10-26: initial browser check failed on old spotlight; final TypeScript, lint, build, smoke and browser motion checks passed. Static code review found no defects; UI review's text-interference finding was fixed with soft background protection behind copy/headings and rechecked in both themes. Mobile image decode was confirmed before final screenshot.
