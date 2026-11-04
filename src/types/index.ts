import type { LucideIcon } from "lucide-react";

export type ProjectCategory = "website" | "mobile" | "ai";

/** One screenshot shown on a project's detail page. */
export interface Screen {
  /** File in /public, e.g. "/projects/drivego-checkout.png". */
  src: string;
  alt: string;
  /** Short label shown under the screenshot, e.g. "Booking checkout". */
  caption?: string;
}

/** A short looping preview (5–6 seconds) shown at the top of the detail page. */
export interface ProjectDemo {
  /** Prefer an .mp4/.webm (kind "video"): far smaller than a .gif and keeps the site fast. */
  src: string;
  kind: "gif" | "video";
  /** Still frame shown before a video loads (video only). */
  poster?: string;
  caption?: string;
}

interface ProjectBase {
  /** URL-safe unique id, also used for deep links (#work?project=<slug>). */
  slug: string;
  name: string;
  /** Every filter this project should appear under. */
  categories: ProjectCategory[];
  /** Honest status label, e.g. "Live", "In development", "Client prototype". */
  status: string;
  tagline: string;
  overview: string;
  features: string[];
  stack: string[];
  /** Only set real URLs. Missing links render as "coming soon" instead of a dead link. */
  links: {
    live?: string;
    repo?: string;
    download?: string;
  };
  /** Extra screenshots for the detail page. The primary images above are included automatically. */
  screens?: { desktop?: Screen[]; mobile?: Screen[] };
  /** Optional short looping demo shown at the top of the detail page. */
  demo?: ProjectDemo;
  /** Longer notes revealed in the "View details" panel. */
  caseStudy: {
    challenge?: string;
    highlights: string[];
  };
}

/** Websites and AI apps: a desktop screenshot, plus a phone one when `hasMobileView` is true. */
type WebProjectImages = {
  /** Primary category shown on the card. */
  category: "website" | "ai";
  /** Desktop screenshot in /public, e.g. "/projects/drivego-desktop.png". */
  desktopImage: string;
} & (
  | { hasMobileView: true; mobileImage: string }
  | { hasMobileView: false }
);

/** Mobile apps are shown as two phones, so both screenshots are required. */
type MobileProjectImages = {
  category: "mobile";
  hasMobileView: true;
  mobileImage: string;
  mobileImageSecondary: string;
};

export type Project = ProjectBase & (WebProjectImages | MobileProjectImages);
export type WebProject = Extract<Project, { desktopImage: string }>;

export type ServiceTone = "cream" | "dark" | "orange";

export interface Service {
  id: string;
  index: string;
  title: string;
  tagline: string;
  description: string;
  capabilities: string[];
  tone: ServiceTone;
  icon: LucideIcon;
}

export interface SkillGroup {
  id: string;
  title: string;
  icon: LucideIcon;
  items: { name: string; short: string }[];
}

export interface Testimonial {
  id: string;
  name: string;
  context: string;
  quote: string;
  imageSrc?: string;
}

export interface NavItem {
  label: string;
  href: string;
  id: string;
}
