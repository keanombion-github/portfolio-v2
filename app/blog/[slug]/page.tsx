import { pageMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ArticleBody from "@/components/ArticleBody";
import ShareButtons from "@/components/ShareButtons";
import { posts, formatPostDate } from "@/lib/posts";

export function generateStaticParams() {
  return posts.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((item) => item.slug === slug);
  return post
    ? pageMetadata(post.title, post.description, `/blog/${post.slug}`, true)
    : { title: "Note not found" };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = posts.find((item) => item.slug === slug);
  if (!post) notFound();
  const next = posts.find((item) => item.slug !== slug);
  return (
    <div className="page-shell">
      <nav
        aria-label="Breadcrumb"
        className="mb-10 flex flex-wrap gap-2 font-mono text-xs text-[var(--text-dim)]"
      >
        <Link href="/" className="hover:text-[var(--accent)]">
          ~
        </Link>
        <span>/</span>
        <Link href="/blog" className="hover:text-[var(--accent)]">
          blog
        </Link>
        <span>/</span>
        <span aria-current="page" className="break-all">
          {post.slug}
        </span>
      </nav>
      <article>
        <header className="mb-12 border-b border-[var(--border)] pb-10">
          <p className="eyebrow mb-5">$ cat {post.slug}.md</p>
          <h1 className="max-w-3xl text-4xl font-bold leading-tight tracking-tight text-[var(--text-bright)] sm:text-5xl">
            {post.title}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8">
            {post.description}
          </p>
          <p className="mt-6 font-mono text-xs text-[var(--text-dim)]">
            <time dateTime={post.date}>{formatPostDate(post.date)}</time>
            <span className="mx-3">·</span>
            {post.readingMinutes} min read
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded border border-[var(--border)] px-2 py-1 font-mono text-[10px] text-[var(--accent)]"
              >
                #{tag}
              </span>
            ))}
          </div>
        </header>
        <ArticleBody post={post} />
        <div className="border-t border-[var(--border)] pt-7">
          <ShareButtons title={post.title} />
        </div>
      </article>
      <div className="mt-12 flex flex-wrap items-start justify-between gap-6 border-t border-[var(--border)] pt-8">
        <Link href="/blog" className="font-mono text-xs text-[var(--accent)]">
          ← all notes
        </Link>
        {next && (
          <Link href={`/blog/${next.slug}`} className="max-w-sm text-right">
            <span className="block font-mono text-[10px] uppercase tracking-widest text-[var(--text-dim)]">
              Another note
            </span>
            <span className="mt-2 block text-sm text-[var(--text-bright)]">
              {next.title} →
            </span>
          </Link>
        )}
      </div>
    </div>
  );
}
