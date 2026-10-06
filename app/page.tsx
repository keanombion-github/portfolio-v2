import { pageMetadata } from "@/lib/metadata";
import { site } from "@/lib/site";
import { Hero } from "@/components/Hero";
import { Projects } from "@/components/Projects";
import { Contact } from "@/components/Contact";
import { WorkExperience } from "@/components/WorkExperience";
export const metadata = pageMetadata(site.title, site.description, "/");
export default function Home() {
  return (
    <>
      <Hero />
      <WorkExperience />
      <Projects />
      <Contact />
    </>
  );
}
