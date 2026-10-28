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
    "Philippines-based frontend developer open to remote roles and freelance projects. BigCommerce storefronts, responsive interfaces, React/Next.js, and practical business applications.",
  url: publicUrl(process.env.NEXT_PUBLIC_SITE_URL) || "http://localhost:3000",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "keanombion@gmail.com",
  github: publicUrl(process.env.NEXT_PUBLIC_GITHUB_URL) || "https://github.com/keanombion-github",
  linkedin: publicUrl(process.env.NEXT_PUBLIC_LINKEDIN_URL) || "https://www.linkedin.com/in/kean-ombion-954769235/",
  resume: "/resume/Kean_Ombion_Resume.pdf",
  booking: publicUrl(process.env.NEXT_PUBLIC_BOOKING_URL),
};
export const socialLinks = [
  { label: "GitHub", href: site.github },
  { label: "LinkedIn", href: site.linkedin },
  { label: "Email", href: site.email ? `mailto:${site.email}` : "" },
].filter((link) => link.href);
