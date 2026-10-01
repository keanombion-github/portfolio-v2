function publicUrl(value: string | undefined) {
  if (!value) return "";
  try {
    const url = new URL(value);
    return ["https:", "http:"].includes(url.protocol) ? url.toString() : "";
  } catch {
    return "";
  }
}
export const site = {
  name: "Kean",
  title: "Kean — Frontend Developer & Full-Stack Builder",
  description:
    "Frontend developer growing into full-stack. React, Next.js, .NET, PostgreSQL, and AWS. Building thoughtful interfaces and learning by shipping.",
  url: publicUrl(process.env.NEXT_PUBLIC_SITE_URL) || "http://localhost:3000",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "",
  github: publicUrl(process.env.NEXT_PUBLIC_GITHUB_URL),
  linkedin: publicUrl(process.env.NEXT_PUBLIC_LINKEDIN_URL),
  booking: publicUrl(process.env.NEXT_PUBLIC_BOOKING_URL),
};
export const socialLinks = [
  { label: "github", href: site.github },
  { label: "linkedin", href: site.linkedin },
  { label: "email", href: site.email ? `mailto:${site.email}` : "" },
].filter((link) => link.href);
