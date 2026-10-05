import type { Post } from "./posts";

export const projectPosts: Post[] = [
  {
    slug: "from-storefront-work-to-full-stack-projects",
    title: "From storefront work to full-stack projects",
    description: "How BigCommerce, design handoffs, and support work connect to the applications I am building now.",
    date: "2026-10-05",
    tags: ["Journey", "E-commerce", "Full-stack"],
    readingMinutes: 3,
    sections: [
      { id: "the-starting-point", title: "The starting point was a real website", paragraphs: ["My foundation is frontend development: turning Figma and PSD designs into responsive pages, customizing BigCommerce storefronts, and maintaining live client websites. That work taught me that an interface has to make sense beyond the design file. Content changes, products change, and people use the site on screens I did not design on.", "Support work added another perspective. A ticket needs investigation, a clear fix, and a way to check that the workflow works again. Working around order-management issues made the connection between a storefront and the systems behind it more concrete."] },
      { id: "two-workflows", title: "Two projects, two workflows", paragraphs: ["BoardSync gives me a shared-work problem: columns, cards, assignment, and the details of organizing a team's tasks. StoreCraft gives me a commerce problem: a merchant changes a product or page, and a customer needs to see a coherent shopping experience. They let me practice different parts of a full-stack application while keeping the interface central.", "The projects are learning work, with public previews and clear limitations. StoreCraft's browser sandbox uses fictional data and simulated payments. BoardSync is still in progress. I want the portfolio to make that visible rather than imply customers, scale, or commercial results that I have not demonstrated."] },
      { id: "ownership", title: "Learning to follow the whole change", paragraphs: ["My aim is to explain a change from the screen through validation and persistence, then back to the person using it. In commerce, a displayed price and a saved order have different responsibilities. In collaboration, a visible card and permission to edit that card are different questions. Those are the connections I am learning to reason about.", "I work with guided development and document the decisions as I go. Owning the work means being able to trace it, test it, change it, and explain its limits. A deployed interface is the beginning of that conversation, not the end."] },
      { id: "what-i-bring", title: "What I bring to the next role", paragraphs: ["I bring experience implementing storefront interfaces and maintaining websites after launch. React, Next.js, .NET, and PostgreSQL are helping me extend that foundation across the application. The common thread is practical: clear interfaces, useful workflows, and enough understanding to investigate what happens when something goes wrong."] },
    ],
  },
  {
    slug: "storecraft-from-storefronts-to-store-builder",
    title: "StoreCraft: from storefront work to a store builder",
    description: "A merchant workspace, a visual page builder, and a customer storefront shaped by my e-commerce background.",
    date: "2026-10-05",
    tags: ["StoreCraft", "E-commerce", "Next.js"],
    readingMinutes: 3,
    sections: [
      { id: "why-commerce", title: "Returning to a problem I know", paragraphs: ["After working with BigCommerce storefronts and client design handoffs, I wanted to explore the application behind the page. StoreCraft started with that question: what does a merchant need to manage products, arrange a storefront, and understand an order? Shopify and BigCommerce informed the workspace pattern, while StoreCraft uses its own visual design and theme format."] },
      { id: "merchant-and-customer", title: "A merchant view and a customer view", paragraphs: ["The public demo opens into a merchant workspace with products, orders, a page builder, and settings. The customer storefront shows the other side of those decisions. A product's visibility affects the catalog; shipping settings affect the shopping flow; published page content determines the store's presentation.", "The dashboard uses fictional products and orders. Its totals are simulated activity, and browser sandbox changes stay on the visitor's device. This makes the interface available to explore without an account while keeping its persistence model clear."] },
      { id: "builder", title: "Giving design a structure", paragraphs: ["The editor works with reusable widgets and responsive containers rather than requiring a merchant to write a page from scratch. Theme selection, header/main/footer regions, and widget settings provide a structured way to change the storefront. Drafts and publishing have separate purposes: editing should not unexpectedly change what customers see.", "The project also supports its own theme packages and demo sharing. Those are StoreCraft formats, not imports of Shopify or BigCommerce themes. Keeping that boundary explicit matters as much as showing the editor controls."] },
      { id: "behind-the-interface", title: "Behind the interface", paragraphs: ["The repository includes a persistent merchant path using Supabase authentication, a .NET API, and PostgreSQL, alongside the public browser sandbox. Its commerce rules cover ownership, server-calculated prices, saved order-item details, and repeated checkout requests. The hosted authenticated flow has not been independently verified for this portfolio update, so I present it separately from the public demo.", "Payments are simulated. A future live payment integration or OMS connection needs its own implementation and verification; having an order screen does not mean either integration is complete."] },
      { id: "what-this-teaches", title: "What I am taking from it", paragraphs: ["StoreCraft connects familiar frontend work to questions about state, publishing, permissions, and orders. The useful learning is in following one merchant change through the system and understanding what a customer should see afterward. That is the direction I want my e-commerce experience to grow in."] },
    ],
  },
  {
    slug: "boardsync-making-work-visible",
    title: "BoardSync: making shared work visible",
    description: "A Kanban project for connecting task organization, card details, and the responsibilities behind a collaborative interface.",
    date: "2026-10-05",
    tags: ["BoardSync", "React", "Full-stack"],
    readingMinutes: 2,
    sections: [
      { id: "why-a-board", title: "Starting with a visible workflow", paragraphs: ["BoardSync gives me a focused application to work on: a board divided into columns, with cards that represent work. The supplied project screenshots show a Product Roadmap board with Todo, In progress, and Ready for Testing columns. A card can carry more context through a description and an assignee.", "My support and operations experience gives me a reason to care about that context. A task title alone rarely explains who should act or what the next person needs to know."] },
      { id: "card-context", title: "The work inside a card", paragraphs: ["The card-details interface brings together editing, assignment, comments, attachment links, and reactions. Each control raises a question beyond its appearance: who can use it, what gets saved, and how does another person learn about a change? The screenshots demonstrate the interface; they do not independently prove concurrent behavior or every backend rule."] },
      { id: "collaboration", title: "Collaboration is more than a screen", paragraphs: ["The project's documented direction combines React/Next.js, .NET, PostgreSQL, SignalR, and Redis. Real-time delivery needs to follow accepted changes, and a reconnecting client needs a way to retrieve current state. I keep these as implementation questions to verify rather than treating a technology badge as evidence that collaboration is complete.", "BoardSync remains in progress. The public preview begins at sign-in, and the portfolio includes workspace screenshots so visitors can see the application before creating an account."] },
      { id: "connection", title: "How it fits alongside StoreCraft", paragraphs: ["BoardSync centers on shared work; StoreCraft centers on a merchant and a customer. Together they give me different workflows to explain, while both build on my frontend foundation. The goal is to become more comfortable with the data and permissions behind the interface I am already used to building."] },
    ],
  },
];
