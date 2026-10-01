---
name: portfolio-integrations
description: Review or change this portfolio's Gemini chat and Resend contact APIs and client response handling.
---

# Portfolio integrations

Read the relevant bundled Next.js route-handler guide and the route plus its client before edits. Chat accepts user/model messages with content strings; its client supports streamed text and JSON reply responses. Contact's missing-key success simulates delivery.

Keep service keys server-side and never print values. Verify model availability, pricing, quotas, and data use with official provider documentation when selecting services.

For free chat, distinguish quota-limited AI from deterministic portfolio FAQs. Do not enable billing or promise unlimited free AI. Public chat needs validation, bounded input/history, appropriate abuse controls, and graceful quota errors. Ground answers in portfolio facts.

Verify missing-key behavior and client compatibility after changes. Report live provider tests that need an unavailable key.
