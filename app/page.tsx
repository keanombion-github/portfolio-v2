import { pageMetadata } from "@/lib/metadata";
import { site } from "@/lib/site";
import { Hero } from "@/components/Hero";
import { Projects } from "@/components/Projects";
import { Contact } from "@/components/Contact";
export const metadata = pageMetadata(site.title, site.description, "/");
export default function Home() {
  return (
    <>
      <Hero />
      <Projects />
      <Contact />
    </>
  );
}
