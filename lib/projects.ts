export interface Project {
  slug: string;
  title: string;
  subtitle: string;
  summary: string;
  role: string;
  status: string;
  demoUrl?: string;
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
    screenshots: [
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
        body: "BoardSync is my current full-stack portfolio project: a real-time collaborative Kanban board. It is still in development; this page will grow with the implementation.",
      },
      {
        id: "direction",
        title: "The direction",
        body: "The aim is a shared board where teammates can organize tasks and see changes as they happen. The project is a place to connect frontend experience with backend development.",
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
    slug: "invoice-reminder",
    title: "Invoice Reminder",
    subtitle: "A small tool for getting paid",
    summary:
      "An early micro-SaaS idea for freelancers: thoughtful payment reminders with a direct payment link. Kept intentionally small while BoardSync takes priority.",
    role: "Micro-SaaS · Exploration",
    status: "Concept",
    stack: ["Next.js", "Supabase", "Resend", "Stripe"],
    sections: [
      {
        id: "overview",
        title: "Overview",
        body: "Invoice Reminder is an early side-project concept for freelancers and small agencies. It is not a launched product. BoardSync is the current focus.",
      },
      {
        id: "idea",
        title: "The idea",
        body: "Start with one invoice, one useful reminder email, and one payment link. Explore escalating reminders without building a large dashboard before the core workflow is useful.",
      },
      {
        id: "direction",
        title: "Technical direction",
        body: "The proposed stack is Next.js, Supabase, Resend, and Stripe Payment Links. These are planning choices rather than a claim of a completed integration.",
      },
      {
        id: "status",
        title: "Current status",
        body: "Concept stage. Scope and implementation will be revisited after BoardSync.",
      },
    ],
  },
];
