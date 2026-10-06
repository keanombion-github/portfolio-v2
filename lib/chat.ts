export const CHAT_LIMIT = 600;
export type ChatMessage = { role: "user" | "model"; content: string };
export const portfolioFacts = `Kean has frontend and e-commerce experience with BigCommerce storefronts, Figma handoffs, support operations, SLA tickets and AWS S3 workflows. He is extending that foundation with React, Next.js, .NET and PostgreSQL. BoardSync is an in-progress Kanban project at https://boardsync-web.netlify.app/ with workspace screenshots; its SignalR/Redis real-time direction is not independently verified. StoreCraft is an experimental commerce MVP at https://storecraft-demo.netlify.app/ with products, orders, shipping settings, themes and a visual storefront builder. The public browser sandbox uses fictional data, local browser saves and simulated payments. Its repository includes a separate Supabase/.NET/PostgreSQL merchant path; the hosted authenticated journey has not been independently verified. No live payments or connected OMS are claimed. OrderPilot is a seeded Next.js/ASP.NET Core/SQLite fulfillment prototype at https://orderpilot-demo.onrender.com/, not yet connected to StoreCraft. K3 Billing Tracker at https://k3-billing-tracker.netlify.app/ was built for a friend's WiFi business to track subscribers, renewals and recorded payments; its public read-only demo uses sample data, owner records remain private, and it does not charge customers. No measured business outcomes are claimed. The portfolio combines guided learning projects with a focused business tool. Build stories are available in the blog. Never invent customers, metrics, revenue, rates or exact availability. Contact Kean at keanombion@gmail.com or through the contact section.`;

export function faqReply(question: string): string {
  const q = question.toLowerCase();
  if (/\b(orderpilot|oms|fulfillment|picking|packing)\b/.test(q))
    return "OrderPilot is Kean's seeded order-management prototype: location assignment, picking, packing, shipping, and exceptions. It uses Next.js, ASP.NET Core, and SQLite. Its public demo has sample credentials; a live StoreCraft connection remains future work. See the project page and build story.";
  if (/\b(billing|k3|subscriber)\b/.test(q))
    return "Kean built K3 Billing Tracker for a friend's WiFi business to help track subscribers, renewals, and recorded payments. It uses Next.js, .NET, and PostgreSQL. Choose View demo on its sign-in page to explore sample customers and payments in a read-only workspace. Owner records stay private. The portfolio includes screenshots and its build story.";
  if (/\b(storecraft|store|storefront|commerce|shopify|shipping|payment|stripe|builder)\b/.test(q))
    return "StoreCraft connects Kean's e-commerce experience to a merchant dashboard, products, orders, shipping settings and a visual storefront builder. Its public browser sandbox uses fictional data and simulated payments; changes stay on your device. Open its project page for the demo and build story.";
  if (/\b(board|boardsync|kanban)\b/.test(q))
    return "BoardSync is Kean's in-progress collaborative Kanban project. Its project page includes a sign-in preview, workspace screenshots and a build story. Real-time behavior remains something to verify.";
  if (/\b(project|projects|invoice)\b/.test(q))
    return "Kean's projects include StoreCraft for storefront building, OrderPilot for fulfillment, BoardSync for team tasks, and K3 Billing Tracker for a friend's business. Each has a project page and build story. The billing demo is read-only with sample data; OrderPilot is not yet connected to StoreCraft.";
  if (
    /\b(stack|tech|technologies|react|backend|frontend|skills|skill|language)\b/.test(
      q,
    )
  )
    return "Kean builds frontend interfaces with React and Next.js and is extending his skills with .NET, PostgreSQL and Supabase. BoardSync explores collaboration; StoreCraft connects a merchant workspace with a customer storefront.";
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
