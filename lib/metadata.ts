import type { Metadata } from "next";
import { site } from "./site";
export function pageMetadata(
  title: string,
  description: string,
  path: string,
  article = false,
): Metadata {
  return {
    title,
    description,
    alternates: {
      canonical: path,
      types: { "application/rss+xml": "/rss.xml" },
    },
    openGraph: {
      title,
      description,
      url: new URL(path, site.url).href,
      type: article ? "article" : "website",
      siteName: "kean.dev",
      images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/opengraph-image"],
    },
  };
}
