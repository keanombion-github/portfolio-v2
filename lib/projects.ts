export interface Project {
  slug: string;
  title: string;
  subtitle: string;
  summary: string;
  role: string;
  status: string;
  demoUrl?: string;
  storySlug?: string;
  screenshots?: { src: string; alt: string; caption: string }[];
  stack: string[];
  sections: { id: string; title: string; body: string }[];
}
export const projects: Project[] = [
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
