import type { NavItem } from "@/types";

export const navItems: NavItem[] = [
  { label: "Home", href: "#home", id: "home" },
  { label: "Services", href: "#services", id: "services" },
  { label: "Work", href: "#work", id: "work" },
  { label: "About", href: "#about", id: "about" },
  { label: "Contact", href: "#contact", id: "contact" },
];

/** Section ids observed for the active nav indicator, in page order. */
export const sectionIds = [
  "home",
  "services",
  "about",
  "start",
  "work",
  "skills",
  "reviews",
  "contact",
] as const;

/** Sections that don't have their own nav link map to the closest one. */
export const sectionToNav: Record<string, string> = {
  home: "home",
  services: "services",
  about: "about",
  start: "about",
  work: "work",
  skills: "work",
  reviews: "work",
  contact: "contact",
};
