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
    "Kean Ombion builds storefront interfaces and practical applications. Explore ShiftLedger, StoreCraft, OrderPilot, BoardSync, and a billing tracker built for a friend's business.",
  url: publicUrl(process.env.NEXT_PUBLIC_SITE_URL) || "http://localhost:3000",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "keanombion@gmail.com",
  github: publicUrl(process.env.NEXT_PUBLIC_GITHUB_URL),
  linkedin: publicUrl(process.env.NEXT_PUBLIC_LINKEDIN_URL),
  booking: publicUrl(process.env.NEXT_PUBLIC_BOOKING_URL),
};
export const socialLinks = [
  { label: "github", href: site.github },
  { label: "linkedin", href: site.linkedin },
  { label: "email", href: site.email ? `mailto:${site.email}` : "" },
].filter((link) => link.href);
