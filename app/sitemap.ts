import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { projects } from "@/lib/projects";
import { posts } from "@/lib/posts";
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    "",
    "/projects",
    "/about",
    "/blog",
    "/recommendations",
    ...projects.map((p) => `/project/${p.slug}`),
    ...posts.map((p) => `/blog/${p.slug}`),
  ].map((path) => ({
    url: new URL(path || "/", site.url).toString(),
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
