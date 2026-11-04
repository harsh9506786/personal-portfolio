/**
 * Single source of truth for site-wide settings.
 * Replace the placeholder values below (or set the matching env vars) before launch.
 */

/** Digits only, with country code, no "+" — e.g. "919876543210". */
const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "917225037332";

const WHATSAPP_MESSAGE = "Hi, I'm interested in discussing a project with you.";

export const siteConfig = {
  name: "Harshvardhan",
  fullName: "Harshvardhan Sharma",
  jobTitle: "Freelance Full Stack, Mobile & AI Developer",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com").replace(/\/$/, ""),
  locale: "en_IN",
  title: "Harshvardhan | Web, App & AI Developer",
  /** Text shown on the browser tab. */
  tabTitle: "harshvardhan-portfolio",
  description:
    "Freelance developer building fast websites, mobile apps and AI-powered solutions for businesses and startups. Next.js, React, React Native, Flutter and LLM integrations.",
  keywords: [
    "freelance web developer",
    "website developer",
    "React developer",
    "Next.js developer",
    "mobile app developer",
    "AI automation developer",
  ],
  whatsapp: {
    number: WHATSAPP_NUMBER,
    message: WHATSAPP_MESSAGE,
    /** True once the placeholder digits have been replaced. */
    isConfigured: !WHATSAPP_NUMBER.includes("X"),
  },
  /** Leave a value empty ("") to hide that contact option. */
  contact: {
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "sharmaharshvardhan2805@gmail.com",
  },
  socials: [
    { label: "GitHub", href: "https://github.com/harsh9506786" },
    { label: "LinkedIn", href: process.env.NEXT_PUBLIC_LINKEDIN_URL ??
      "https://www.linkedin.com/in/harshvardhan-sharma-9782a7189" },
    { label: "Instagram", href: process.env.NEXT_PUBLIC_INSTAGRAM_URL ?? "" },
  ].filter((s) => s.href.length > 0),
} as const;

export function getWhatsAppUrl(): string {
  const { number, message } = siteConfig.whatsapp;
  // encodeURIComponent leaves "'" untouched; encode it so the URL matches the spec exactly.
  const text = encodeURIComponent(message).replace(/'/g, "%27");
  return `https://wa.me/${number}?text=${text}`;
}