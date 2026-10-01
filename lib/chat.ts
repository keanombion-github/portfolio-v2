export const CHAT_LIMIT = 600;
export type ChatMessage = { role: "user" | "model"; content: string };
export const portfolioFacts = `Kean started in frontend development, with BigCommerce storefronts, Figma-to-code handoffs, support operations, SLA ticket management and AWS S3 workflows. He is building full-stack skills with React, Next.js, .NET (C#), PostgreSQL and AWS. His portfolio projects include BoardSync, an in-progress collaborative Kanban board with planned SignalR and Redis integration, and Invoice Reminder, an early invoice reminder concept using Next.js, Supabase, Resend and Stripe Payment Links. These are portfolio/side projects; do not claim production adoption, customers or measured results. Tools include Fork, Antigravity and Figma. Visitors can discuss freelance or full-time opportunities through the contact section. No confirmed rates, location, years of experience, qualifications, exact availability or private contact details are provided.`;

export function faqReply(question: string): string {
  const q = question.toLowerCase();
  if (/\b(invoice|payment|stripe)\b/.test(q))
    return "Invoice Reminder is a lean side-project concept for freelancers and agencies: escalating reminder emails with Stripe Payment Links. Its stack brings together Next.js, Supabase, Resend and Stripe.";
  if (/\b(board|boardsync|kanban|project|projects)\b/.test(q))
    return "BoardSync is an in-progress collaborative Kanban portfolio project. Its planned stack combines React/Next.js, .NET and PostgreSQL with SignalR and Redis for real-time updates. Kean is also exploring Invoice Reminder, a small invoice-reminder tool. See Selected Work below for the project details.";
  if (
    /\b(stack|tech|technologies|react|backend|frontend|skills|skill|language)\b/.test(
      q,
    )
  )
    return "Kean works with React and Next.js and is growing into full-stack development with .NET (C#), PostgreSQL and AWS. His projects also explore TanStack Query, Zustand, SignalR, Redis and Stripe.";
  if (
    /\b(hire|hiring|available|availability|freelance|contact|email|work|rate|rates|salary)\b/.test(
      q,
    )
  )
    return "Interested in working together? Use the contact section below to share the role or project you have in mind. Exact availability and rates need to be confirmed directly with Kean.";
  if (/\b(tool|tools|figma|ide)\b/.test(q))
    return "Kean's toolkit includes Figma for design handoffs, Fork for Git, and Antigravity. His experience includes translating Figma designs into storefront interfaces.";
  if (/\b(background|experience|about|who|journey)\b/.test(q))
    return "Kean started in frontend development, working on BigCommerce storefronts and Figma-to-code handoffs alongside support and operations. He's now building full-stack skills through projects with React, .NET, PostgreSQL and AWS.";
  if (/^(hi|hello|hey|thanks|thank you)[!. ]*$/.test(q))
    return "Hey! I can help with Kean's stack, background, projects, tools and ways to get in touch. What would you like to know?";
  return "I don't have that information in Kean's portfolio. Try asking about his stack, projects or background, or use the contact section to ask him directly.";
}
