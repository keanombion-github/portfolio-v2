export type Post = {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  readingMinutes: number;
  sections: {
    id: string;
    title: string;
    paragraphs: string[];
    code?: { language: string; content: string };
  }[];
};

export const posts: Post[] = [
  {
    slug: "a-portfolio-with-clear-boundaries",
    title: "A portfolio with clear boundaries",
    description:
      "A short architecture note on keeping content, interactive UI, and service credentials in their own places.",
    date: "2026-09-19",
    tags: ["Next.js", "Architecture", "Portfolio"],
    readingMinutes: 2,
    sections: [
      {
        id: "start-with-the-page",
        title: "Start with the page",
        paragraphs: [
          "A portfolio has a small surface area, but several different responsibilities. The page assembles sections. Those sections own the visible copy. A chat widget manages a conversation, while the server handles the connection to its model provider.",
          "Keeping those boundaries explicit makes a simple change stay simple. Updating a project description should not require opening the chat transport or the contact form.",
        ],
      },
      {
        id: "keep-secrets-on-the-server",
        title: "Keep secrets on the server",
        paragraphs: [
          "Chat uses a server route for FAQ responses and optional Gemini replies. The browser can ask for a response without receiving provider credentials. Contact and recommendation forms use Netlify Forms, which collects submissions for manual review and can email notifications without a separate mail service.",
          "The following sketch describes the responsibility split; it is not an additional endpoint or a complete security checklist.",
        ],
        code: {
          language: "text",
          content:
            "Browser\n  ├─ Chat widget → /api/chat → FAQ / optional Gemini\n  └─ Contact and recommendation forms → Netlify Forms → dashboard / email notification\n\nOptional AI credentials stay on the server.",
        },
      },
      {
        id: "one-theme-contract",
        title: "One theme contract",
        paragraphs: [
          "The same principle applies to appearance. Shared CSS variables describe backgrounds, text, borders, and accents. Components consume those variables instead of deciding their own light and dark palettes.",
          "A new section then has a smaller job: express its hierarchy and layout, use the existing color contract, and remain usable at narrow widths. The architecture is useful when it reduces the number of decisions needed for the next change.",
        ],
      },
    ],
  },
  {
    slug: "planning-a-realtime-kanban-board",
    title: "Planning a real-time Kanban board",
    description:
      "BoardSync design notes: define a card move first, then decide how connected clients learn about it.",
    date: "2026-09-19",
    tags: ["BoardSync", ".NET", "System design"],
    readingMinutes: 2,
    sections: [
      {
        id: "the-smallest-useful-action",
        title: "The smallest useful action",
        paragraphs: [
          "BoardSync is a collaborative Kanban project. These are planning notes for its proposed architecture, rather than a report of completed implementation. A useful starting point is one action: moving a card from one column to another.",
          "Before choosing a real-time transport, define what a valid move means. The card and target column must belong to the intended board, the person making the change must have permission, and concurrent edits need an explicit policy.",
        ],
      },
      {
        id: "a-vertical-slice",
        title: "A vertical slice",
        paragraphs: [
          "The planned .NET backend uses a vertical slice approach. A move-card feature can group its request, validation, and persistence logic around the action instead of spreading its meaning across unrelated layers.",
          "A version number is one possible way to detect stale edits. If the stored version differs from the version in the request, the server can reject the move and ask the client to refresh. The exact conflict policy still needs to be decided.",
        ],
        code: {
          language: "typescript",
          content:
            "// Illustrative request shape, not a published API.\ntype MoveCard = {\n  cardId: string;\n  targetColumnId: string;\n  expectedVersion: number;\n};",
        },
      },
      {
        id: "realtime-is-delivery",
        title: "Real-time is delivery",
        paragraphs: [
          "SignalR and Redis are part of the proposed stack, with PostgreSQL holding the board data. Notifications should follow an accepted change; receiving a real-time message should not be the only way a client can learn the current state.",
          "A reconnecting browser should be able to fetch a fresh board. That gives the design a clear recovery path when a connection drops. Ordering, retries, and the gap between saving a change and publishing its event are useful questions for the next implementation step.",
        ],
      },
    ],
  },
];

export function formatPostDate(date: string) {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
    timeZone: "UTC",
  });
}
