export interface Project {
  slug: string;
  title: string;
  subtitle: string;
  summary: string;
  role: string;
  status: string;
  demoUrl?: string;
  demoLabel?: string;
  storySlug?: string;
  screenshots?: { src: string; alt: string; caption: string }[];
  stack: string[];
  sections: { id: string; title: string; body: string }[];
}
export const projects: Project[] = [
  {
    slug: "shiftledger", title: "ShiftLedger", subtitle: "Clear attendance before payroll preparation",
    summary: "An attendance workspace for small teams: review shifts, resolve missing punches, and export approved hours. Separate admin and staff views make the next action clear.",
    role: "Frontend · Business Operations", status: "Interactive browser demo",
    demoUrl: "https://shiftledger-demo.netlify.app/", storySlug: "shiftledger-getting-attendance-right",
    screenshots: [
      { src: "/projects/shiftledger-overview.png", alt: "ShiftLedger admin overview showing fictional team hours, review progress, and a missing clock-out request", caption: "The admin overview turns fictional attendance records into a review queue and approved-hours summary." },
      { src: "/projects/shiftledger-attendance.png", alt: "ShiftLedger attendance table with fictional employee shifts, worked hours, and review states", caption: "Attendance records show which hours are approved and which still need attention before export." },
    ],
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Font Awesome"],
    sections: [
      { id: "problem", title: "Start with the records people depend on", body: "ShiftLedger began with an idea for a practical attendance and payroll-preparation tool for small businesses. Before calculating pay, a team needs reliable attendance: when someone worked, which breaks were taken, and which records need review. I focused the first milestone on making that workflow visible and understandable." },
      { id: "workflow", title: "Two views of the same working day", body: "The public demo opens into an admin dashboard for a fictional eight-person business. Explore attendance, schedules, employees, correction approvals, and reports. Switch the demo role to Staff to explore personal attendance and clock/break actions. The role selector demonstrates the interface; it is not a real login or evidence of server-enforced permissions." },
      { id: "review", title: "Missing information needs a decision", body: "Approved completed shifts contribute to the hours summary and CSV export. Missing punches remain unresolved instead of receiving estimated hours. Reviewing a prepared correction updates the effective attendance and dashboard totals. This makes the report a result of review rather than just a table of raw timestamps." },
      { id: "design", title: "A dashboard built around attention", body: "Next.js, React, TypeScript, Tailwind CSS, and Font Awesome Free provide the interface. Dark and light themes, team-hour bars, review progress, filters, and responsive tables help people find what needs attention. The goal is to make routine actions understandable, not to bury them under analytics." },
      { id: "demo", title: "Try the isolated demo", body: "No account is required. Data is fictional and changes are saved in this browser; Reset demo clears local progress. Explore a correction request, approved attendance exports, and the staff clock workflow without changing actual employee records. No real emails or payments are sent, and no actual payroll is calculated." },
      { id: "next", title: "What comes after the interface", body: "The repository includes a separate ASP.NET Core foundation. Supabase authentication, PostgreSQL persistence, server-timestamped attendance, enforced permissions, locked approvals, and payroll snapshots remain future milestones. ShiftLedger is a portfolio prototype, not production payroll software. The next step is to validate the workflow with a business owner and carry its rules into the backend." },
    ],
  },
  {
    slug: "orderpilot", title: "OrderPilot", subtitle: "From checkout to fulfillment",
    summary: "An order-management prototype that follows the work after checkout: assign a location, pick, pack, and ship—with permissions and exceptions built into the journey.",
    role: "Full-Stack · Order Management", status: "Demo prototype",
    demoUrl: "https://orderpilot-demo.onrender.com/", storySlug: "orderpilot-the-work-after-checkout",
    screenshots: [
      { src: "/projects/orderpilot-workspace.png", alt: "OrderPilot setup dashboard showing locations, users, role scope, and the staff control-panel entry", caption: "Administrator setup brings locations, team access, and workspace settings together." },
      { src: "/projects/orderpilot-orders.png", alt: "OrderPilot staff dashboard showing seeded orders and fulfillment queues", caption: "The staff control panel shows fictional orders and operational queues in the shared demo." },
      { src: "/projects/orderpilot-preview.png", alt: "OrderPilot administrator sign-in with public demo credentials and a staff control-panel link", caption: "The public demo separates administrator setup from the staff fulfillment workspace." },
    ],
    stack: ["Next.js", "TypeScript", "ASP.NET Core", "SQLite"],
    sections: [
      { id: "problem", title: "An order is only the beginning", body: "StoreCraft explores how a merchant builds a shop and a customer places an order. OrderPilot asks what happens next. My experience supporting storefronts and investigating order-management issues gave me a reason to explore the operational side: who fulfills the order, where the stock comes from, and what happens when the normal flow breaks." },
      { id: "workflow", title: "A workflow the team can follow", body: "The prototype supports location assignment, item picking, packing, delivery with tracking, and pickup readiness. Payment holds, unknown SKUs, and short picks surface as exceptions. An audit timeline records completed actions and the acting user, so the order carries context beyond its current status." },
      { id: "rules", title: "Putting rules behind the controls", body: "The ASP.NET Core API validates fulfillment transitions and reserves stock in a transaction. Administrators, managers, staff, and viewers have different responsibilities, with access scoped by location. Next.js provides separate setup and staff workspaces. SQLite keeps the prototype small enough to explore while giving the workflow durable local state." },
      { id: "demo", title: "Explore the demo", body: "Use the sample credentials displayed on the login page to enter the seeded workspace. Explore locations and access settings, then open the staff control panel to inspect fulfillment. This is a shared sandbox with sample records: do not enter personal or real customer data. The free Render service may take a moment to wake up, and changes reset on redeploy or instance replacement." },
      { id: "next", title: "The next connection", body: "OrderPilot is a standalone prototype; it does not yet exchange live orders with StoreCraft. The next step is a reliable integration with scoped credentials, duplicate-event protection, acknowledgments, retries, and fulfillment updates. Production identity, persistent hosted storage, and broader audit coverage also remain future work." },
    ],
  },
  {
    slug: "k3-billing-tracker", title: "K3 Billing Tracker", subtitle: "A practical tool for a friend's WiFi business",
    summary: "Built around a friend's struggle to keep up with payment tracking: a single-owner workspace for subscribers, renewal dates, recorded payments, and outstanding bills.",
    role: "Full-Stack · Business Tool", status: "Business tool · Public demo",
    demoUrl: "https://k3-billing-tracker.netlify.app/", storySlug: "k3-billing-tracker-built-for-a-friend",
    screenshots: [
      { src: "/projects/k3-billing-dashboard.png", alt: "K3 Billing Tracker read-only demo dashboard with sample renewal counts, monthly collections, due accounts, and recent payments", caption: "The public read-only dashboard uses sample customers and payments. These figures are demo data, not the business's results." },
      { src: "/projects/k3-billing-preview.png", alt: "K3 Billing Tracker sign-in page with a View demo button", caption: "Visitors can choose View demo without signing into the private owner workspace." },
    ],
    stack: ["Next.js", "TypeScript", ".NET", "PostgreSQL"],
    sections: [
      { id: "problem", title: "Starting with someone else's problem", body: "A friend running a local WiFi business was struggling to keep up with payment tracking. I built K3 Billing Tracker around that specific need: make it easier to see who is due, record a payment, and find its history. The scope follows the owner's daily work rather than trying to become a general accounting platform." },
      { id: "workflow", title: "Subscribers, renewals, and payments together", body: "The app brings customer search, plan selection, daily/weekly/monthly renewal schedules, and payment history into one owner workspace. The dashboard separates collected, expected, and outstanding amounts, alongside due and upcoming renewals. Customer deactivation preserves history instead of removing earlier payments." },
      { id: "decisions", title: "Small details that affect trust", body: "A payment belongs to an exact renewal due date, with PostgreSQL enforcing one payment per customer per renewal. Monthly dates at the end of a month adapt to shorter months. Outstanding bills and collected payments are calculated separately because a recorded payment can differ from the plan fee. These decisions matter more than a polished total on its own." },
      { id: "mobile", title: "Designed for the owner's day", body: "The interface includes mobile navigation, touch-sized payment actions, renewal cards, full-screen forms, and light/dark themes. A Next.js frontend connects to a .NET API and PostgreSQL. Optional owner email summaries are implemented, but their delivery depends on provider configuration and a running backend." },
      { id: "access", title: "Explore the workflow with sample data", body: "Choose View demo on the sign-in page to explore a read-only workspace with sample customers and payments. You can inspect the billing overview, customer directory, and payment history without owner credentials. Actual owner records remain private. The app records payments; it does not charge customers. Partial balances, refunds, historical subscription snapshots, and a full accounting ledger are outside the current scope. Demo totals are fictional, and no measured time savings or revenue impact are claimed." },
    ],
  },
  {
    slug: "boardsync",
    title: "BoardSync",
    subtitle: "Real-Time Collaborative Kanban Board",
    summary:
      "A collaborative workspace for moving ideas from to-do to done. A full-stack project exploring real-time updates, clear boundaries, and a responsive React interface.",
    role: "Full-Stack · Portfolio Project",
    status: "In progress",
    demoUrl: "https://boardsync-web.netlify.app/",
    storySlug: "boardsync-making-work-visible",
    screenshots: [
      {
        src: "/projects/boardsync-board.png",
        alt: "BoardSync Product Roadmap board with Todo, In progress, and Ready for Testing columns and an assigned card",
        caption: "The signed-in Product Roadmap board, with columns, a card, and an assignee.",
      },
      {
        src: "/projects/boardsync-card-details.png",
        alt: "BoardSync card details showing the description editor, assignee, comments, attachment links, and reactions",
        caption: "Card details include editing, assignment, comments, attachment links, and reactions.",
      },
      {
        src: "/projects/boardsync-login.png",
        alt: "BoardSync sign-in screen with email and password fields",
        caption: "Public sign-in screen. The board workspace is available after creating an account.",
      },
    ],
    stack: [".NET", "PostgreSQL", "React", "Next.js", "SignalR", "Redis"],
    sections: [
      {
        id: "overview",
        title: "Overview",
        body: "BoardSync gives me a focused way to explore shared work. Support and operations taught me that a task needs context: what to do, who owns it, and where it stands. A Kanban board makes that workflow visible while giving me an application to connect frontend controls with data and permissions.",
      },
      {
        id: "direction",
        title: "The workspace",
        body: "The supplied screenshots show a Product Roadmap board with Todo, In progress, and Ready for Testing columns, plus an assigned card. The card-details view includes descriptions, comments, attachment links, and reactions. These illustrate the interface; concurrent behavior and the underlying rules need their own verification.",
      },
      {
        id: "architecture",
        title: "Planned architecture",
        body: "The backend direction is .NET with Vertical Slice Architecture, Dapper, FluentValidation, and Serilog. React and Next.js provide the interface, with TanStack Query for server data and Zustand for local state. PostgreSQL, SignalR, and Redis support persistence and real-time collaboration.",
      },
      {
        id: "status",
        title: "Current status",
        body: "A public preview is available to explore. It opens at account sign-in; the board workspace is available after creating an account. The project is still in progress, and more implementation details will be added as they are ready to share.",
      },
    ],
  },
  {
    slug: "storecraft",
    title: "StoreCraft",
    subtitle: "A merchant workspace and storefront builder",
    summary:
      "An e-commerce learning project shaped by my BigCommerce experience: products, orders, shipping settings, and a visual page builder connected to a customer storefront.",
    role: "Full-Stack · E-commerce",
    status: "Experimental MVP",
    demoUrl: "https://storecraft-demo.netlify.app/",
    storySlug: "storecraft-from-storefronts-to-store-builder",
    screenshots: [{ src: "/projects/storecraft-dashboard.png", alt: "StoreCraft merchant dashboard with product counts, fictional sales, fulfillment status, and setup shortcuts", caption: "The merchant dashboard uses fictional products and orders. These totals represent simulated activity." }],
    stack: ["Next.js", "TypeScript", ".NET", "PostgreSQL", "Supabase"],
    sections: [
      {
        id: "overview",
        title: "Overview",
        body: "My frontend work brought me close to BigCommerce storefronts, design handoffs, and support for live shops. StoreCraft turns that experience into a broader question: how do a merchant's product, design, and shipping decisions become a customer's shopping experience? I built an experimental workspace inspired by familiar commerce tools to explore that connection.",
      },
      {
        id: "demo",
        title: "Try the demo",
        body: "The public workspace opens without login and uses fictional data. Explore Products, Orders, Page builder, and Settings, then open View store to see the customer side. Browser sandbox changes stay on your device; they are separate from database-backed merchant stores. Payment outcomes are simulated and no money moves.",
      },
      {
        id: "builder",
        title: "Designing a store without losing the structure",
        body: "The builder brings together reusable widgets, theme selection, responsive containers, and draft/publish controls. Header, main, and footer regions give a page structure, while a shared renderer connects the editor to the storefront. StoreCraft theme packages use their own format; they are not compatible with Shopify or BigCommerce themes.",
      },
      {
        id: "architecture",
        title: "Connecting the interface to commerce rules",
        body: "React and Next.js provide the dashboard and storefront. The repository also includes a .NET API, PostgreSQL, and Supabase Auth and Storage for persistent merchant workflows. The API handles ownership, prices, shipping, order snapshots, and retry protection. The public sandbox is available to explore; the hosted authenticated journey has not been independently verified for this case study.",
      },
      {
        id: "status",
        title: "Current status",
        body: "StoreCraft is an experimental portfolio MVP, not a production commerce service. The public demo illustrates the workflow with fictional activity and simulated payments. Live payment processing, a connected OMS, and production merchant operations remain future work. Building it helps me connect frontend implementation with data, permissions, and the decisions behind a complete application.",
      },
    ],
  },
];
