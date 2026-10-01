import { posts } from "@/lib/posts";
import { site } from "@/lib/site";
export const dynamic = "force-static";
function escapeXml(text: string) {
  return text.replace(
    /[<>&"']/g,
    (c) =>
      ({
        "<": "&lt;",
        ">": "&gt;",
        "&": "&amp;",
        '"': "&quot;",
        "'": "&apos;",
      })[c]!,
  );
}
export function GET() {
  const items = posts
    .map(
      (p) =>
        `<item><title>${escapeXml(p.title)}</title><link>${escapeXml(new URL(`/blog/${p.slug}`, site.url).toString())}</link><guid isPermaLink="true">${escapeXml(new URL(`/blog/${p.slug}`, site.url).toString())}</guid><description>${escapeXml(p.description)}</description><pubDate>${new Date(p.date + "T00:00:00Z").toUTCString()}</pubDate>${p.tags.map((t) => `<category>${escapeXml(t)}</category>`).join("")}</item>`,
    )
    .join("");
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>kean.dev — developer notes</title><link>${escapeXml(site.url)}</link><description>${escapeXml(site.description)}</description><language>en</language>${items}</channel></rss>`,
    {
      headers: {
        "Content-Type": "application/rss+xml; charset=utf-8",
        "Cache-Control": "public, max-age=3600",
      },
    },
  );
}
