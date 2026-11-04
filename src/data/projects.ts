import type { Project, ProjectCategory, Screen } from "@/types";

/**
 * ADD A PROJECT: append an object to `projects` below.
 *
 * - Screenshots are required: put them in /public/screenshots/<project> and set `desktopImage`
 *   (websites, AI apps) and `mobileImage` (when `hasMobileView` is true). Mobile apps
 *   need `mobileImage` and `mobileImageSecondary`. TypeScript flags any that are missing.
 * - Only fill `links.*` with real URLs. Missing links show as "coming soon".
 * - Everything below comes from details of your actual projects. Nothing is invented.
 *
 * DETAIL PAGE (/work/<slug>) — optional extras on any project:
 *   screens: {
 *     desktop: [{ src: "/projects/x.png", alt: "DriveGo checkout page", caption: "Checkout" }],
 *     mobile:  [{ src: "/projects/drivego-mobile-2.png", alt: "DriveGo booking on mobile", caption: "Booking" }],
 *   },
 *   // 5–6 second looping preview. Prefer an .mp4 (kind: "video"): it is far smaller than a .gif.
 *   demo: { src: "/projects/drivego-demo.mp4", kind: "video", poster: "/projects/drivego-desktop.jpeg", caption: "Search → book in 6 seconds" },
 *   The main desktop/mobile images above are always shown first; anything in `screens` is added after them.
 */
export const projects: Project[] = [
  {
    slug: "drivego",
    // NOTE: your brief called this "KarZone"; your project notes call it "DriveGo". Rename here if needed.
    name: "DriveGo",
    category: "website",
    categories: ["website", "ai"],
    status: "Full-stack web platform",
    tagline: "An AI-powered car rental platform, built like a real product.",
    overview:
      "A full-stack car rental platform where customers browse, filter and book cars, backed by production-style infrastructure: containerised deployment, CI/CD and caching.",
    features: [
      "Search, filter and sort across the cars catalogue",
      "Email booking confirmations",
      "Reviews and feedback system",
      "Dynamic homepage stats",
      "Redis caching and distributed locking to prevent double bookings",
    ],
    stack: [
      "React",
      "TanStack Query",
      "Node.js",
      "Redis",
      "Docker",
      "AWS EC2",
      "GitHub Actions",
      "Vercel",
    ],
    desktopImage: "/screenshots/drivego/carrentalimg.jpeg",
    mobileImage: "/screenshots/drivego/carrentalmobile.jpeg",
    hasMobileView: true,
    links: {
      live: "https://car-rental-application-gray.vercel.app/",
      repo: "https://github.com/harsh9506786",
    },
    caseStudy: {
      challenge:
        "Keep bookings correct under concurrent requests while keeping browsing fast.",
      highlights: [
        "Cache-aside Redis caching with a 5-minute TTL for catalogue reads.",
        "Distributed locking to stop two users booking the same car at once.",
        "Branch-based pipeline: dev → Vercel preview, main → Vercel production and GitHub Actions deploy to AWS EC2.",
        "Nodemailer-powered confirmation emails.",
      ],
    },
  },
  {
    slug: "shrutika",
    name: "Shrutika",
    category: "mobile",
    categories: ["mobile"],
    status: "Cross-platform mobile app",
    tagline:
      "A social home for reading and writing stories, in Hindi and English.",
    overview:
      "A React Native (Expo) app where people write, publish and read stories, follow authors and join the conversation. Formerly StoryVerse.",
    features: [
      "Infinite-scroll story feed",
      "Follows, bookmarks and comments",
      "Notifications",
      "Hindi / English smart font detection",
      "Animated Lottie splash screen",
      "Google Sign-In and Firebase Auth",
    ],
    stack: [
      "React Native",
      "Expo",
      "NativeWind",
      "React Query",
      "Node.js",
      "Express",
      "MongoDB",
      "Firebase Auth",
      "Cloudinary",
    ],
    mobileImage: "/screenshots/shrutika/home.jpeg",
    mobileImageSecondary: "/screenshots/shrutika/explore.jpeg",
    hasMobileView: true,
    screens: {
      mobile: [
        {
          src: "/screenshots/shrutika/library.jpeg",
          alt: "Shrutika library screen",
          caption: "Library",
        },
        {
          src: "/screenshots/shrutika/profile.jpeg",
          alt: "Shrutika profile screen",
          caption: "Profile",
        },
        {
          src: "/screenshots/shrutika/storydetail.jpeg",
          alt: "Shrutika story detail screen",
          caption: "Story detail",
        },
        {
          src: "/screenshots/shrutika/write.jpeg",
          alt: "Shrutika write a story screen",
          caption: "Write",
        },
      ],
    },
    links: {
      repo: "https://github.com/harsh9506786/Story-App",
      download:
        "https://github.com/harsh9506786/Story-App/releases/download/v2.0.0/app-release.apk",
    },
    caseStudy: {
      challenge:
        "Make a content-heavy app feel smooth and native across Android devices, with text in two scripts.",
      highlights: [
        "Backend on Node.js/Express with MongoDB, deployed on Render.",
        "Release APKs built locally with Gradle and distributed through GitHub Releases.",
        "Automatic font selection so Hindi and English stories both read well.",
      ],
    },
  },

  {
    slug: "brew-and-bliss",
    name: "Brew & Bliss",
    category: "mobile",
    categories: ["mobile"],
    status: "In development",
    tagline: "A coffee ordering app, from first sip to doorstep.",
    overview:
      "A Flutter coffee-shop app covering the full ordering journey: onboarding, browsing, cart, checkout and live order tracking.",
    features: [
      "Splash and first-launch onboarding",
      "Popular coffees with category filters and wishlist",
      "Product detail, cart and checkout",
      "Order tracking, with prices in ₹",
    ],
    stack: ["Flutter", "Dart"],
    mobileImage: "/screenshots/breu&bliss/01-home.webp",
    mobileImageSecondary: "/screenshots/breu&bliss/02-menu.webp",
    hasMobileView: true,
    screens: {
      mobile: [
        {
          src: "/screenshots/breu&bliss/03-product-detail.webp",
          alt: "Brew & Bliss product detail screen",
          caption: "Product detail",
        },
        {
          src: "/screenshots/breu&bliss/04-favorites.webp",
          alt: "Brew & Bliss favorites screen",
          caption: "Favorites",
        },
        {
          src: "/screenshots/breu&bliss/05-orders.webp",
          alt: "Brew & Bliss orders screen",
          caption: "Orders",
        },
        {
          src: "/screenshots/breu&bliss/06-drawer.webp",
          alt: "Brew & Bliss navigation drawer",
          caption: "Drawer",
        },
      ],
    },
    links: { repo: "https://github.com/harsh9506786/Brew-Bliss" },
    caseStudy: {
      highlights: [
        "Screen-by-screen build from custom design mockups.",
        "Shared theme system for consistent colour and typography.",
      ],
    },
  },
  {
    slug: "biotech",
    name: "BioTech",
    category: "website",
    categories: ["website"],
    status: "Client website",
    tagline: "Agriculture solutions and products, built for lead generation.",
    overview:
      "A website built during my internship for an agri-biotech client, " +
      "showcasing their agriculture solutions and product range across agriculture " +
      "and public health, with a category-wise catalogue and an enquiry system.",
    features: [
      "Multi-page site: Home, Products, Public Health, Gallery, About and Contact",
      "Category-wise product catalogue with filtering and detail pages",
      "Dedicated Public Health vertical for vector-control products",
      "Enquiry and contact forms with Framer Motion micro-interactions",
    ],
    stack: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "React Icons",
    ],
    desktopImage: "/screenshots/biotech/biotechdesktop.webp",
    mobileImage: "/screenshots/biotech/biotechmobile.webp",
    hasMobileView: true,
    links: {
      live: "https://bio-tech-xgye.vercel.app/",
      repo: "https://github.com/harsh9506786/Bio-Tech",
    },
    caseStudy: {
      challenge:
        "Present a large range of agri-biotech products clearly, and turn visitors into enquiries.",
      highlights: [
        "Products grouped by type: biofertilizers, biopesticides, biofungicides, bionematicides and more.",
        "Public Health vertical with its own hero, context and strategy sections.",
        "Built with the Next.js App Router and TypeScript.",
      ],
    },
  },
  {
    slug: "agnee",
    name: "Agnee",
    category: "website",
    categories: ["website"],
    status: "Agency website",
    tagline: "Website for an AI-driven branding and growth agency.",
    overview:
      "The marketing website for the agency I interned with. Besides building the " +
      "frontend, I containerised and deployed the app myself, setting up the path " +
      "from code to production server.",
    features: [
      "Hero, services, team, testimonials and contact sections",
      "Custom Three.js hero animation",
      "Framer Motion transitions across the site",
      "Dockerised build, deployed on AWS EC2",
    ],
    stack: [
      "React",
      "Vite",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "Three.js",
      "Docker",
      "AWS EC2",
      "GitHub Actions",
    ],
    desktopImage: "/screenshots/agnee/desktopview.jpeg",
    mobileImage: "/screenshots/agnee/mobileview.jpeg",
    hasMobileView: true,
    links: {
      live: "https://www.agneeagency.com/",
      repo: "https://github.com/harsh9506786/agnee-web1",
    },
    caseStudy: {
      highlights: [
        "Containerised with Docker for a consistent, reproducible build.",
        "Production build served from an AWS EC2 instance.",
        "GitHub Actions pipeline automates builds and deployments on every push.",
      ],
    },
  },
  {
    slug: "docchat",
    name: "DocChat",
    category: "ai",
    categories: ["ai"],
    status: "AI application",
    tagline:
      "Ask questions of any PDF and get answers grounded in the document.",
    overview:
      "A retrieval-augmented generation (RAG) app: upload a PDF, and it answers questions using only the most relevant passages from that document.",
    features: [
      "PDF upload, text chunking and embeddings",
      "Cosine-similarity Top-K retrieval",
      "Answers generated with the Gemini API",
      "Clean React + Vite chat interface",
    ],
    stack: ["React", "Vite", "Node.js", "Express", "Gemini API", "Embeddings"],
    desktopImage: "/screenshots/docchat/docchat.png",
    hasMobileView: false,
    links: { repo: "https://github.com/harsh9506786/DocChat" },
    caseStudy: {
      challenge:
        "Keep answers relevant to the uploaded document instead of generic model output.",
      highlights: [
        "Documents are split into chunks and embedded once.",
        "Each question is matched to the closest chunks with cosine similarity.",
        "Only the top matches are passed to the model as context.",
      ],
    },
  },
  // User & Task Manager is ready to add once its screenshots are in
  // /public/screenshots/user-task-manager/ (a desktop image is required).
  // Then remove the comment markers below.
  // {
  //   slug: "user-task-manager",
  //   name: "User & Task Manager",
  //   category: "website",
  //   categories: ["website"],
  //   status: "SaaS dashboard",
  //   tagline: "Role-based dashboard where admins assign work and employees track it.",
  //   overview:
  //     "A role-based SaaS dashboard where admins manage team members and assign tasks, " +
  //     "while employees track and update their own work in real time.",
  //   features: [
  //     "Firebase Authentication with Admin / Employee roles and protected routes",
  //     "Admin dashboard: search users, manage roles, assign tasks, live stats",
  //     "Employee dashboard: real-time task tracking, mark complete, delete, filter by title",
  //     "Firestore real-time sync with a Material UI + Tailwind CSS interface",
  //   ],
  //   stack: ["React", "Vite", "Firebase Auth", "Firestore", "Material UI", "Tailwind CSS"],
  //   desktopImage: "/screenshots/user-task-manager/desktop.png",
  //   hasMobileView: false,
  //   links: {
  //     live: "https://uand-t-saa-s-system.vercel.app/",
  //     repo: "https://github.com/harsh9506786/UandT-SaaS-system",
  //   },
  //   caseStudy: {
  //     highlights: [
  //       "Role-based access control for Admin and Employee accounts.",
  //       "Real-time data sync with Firestore.",
  //     ],
  //   },
  // },
];

export const projectFilters: { id: "all" | ProjectCategory; label: string }[] =
  [
    { id: "all", label: "All Projects" },
    { id: "website", label: "Websites" },
    { id: "mobile", label: "Mobile Applications" },
    { id: "ai", label: "AI Solutions" },
  ];

export const categoryLabels: Record<ProjectCategory, string> = {
  website: "Website",
  mobile: "Mobile App",
  ai: "AI Solution",
};

/* ——— Helpers used by the cards and the detail pages ——— */

export interface ProjectTone {
  hex: string;
  dark: boolean;
  bg: string;
  ring: string;
}

/** Card/detail colours, assigned by position so the transition colour always matches the card. */
export const projectTones: ProjectTone[] = [
  { hex: "#f59e0b", dark: false, bg: "bg-amber", ring: "border-ink/20" },
  { hex: "#261f19", dark: true, bg: "bg-ink-soft", ring: "border-amber/40" },
  { hex: "#fcd68a", dark: false, bg: "bg-amber-soft", ring: "border-ink/20" },
  { hex: "#e3d9c3", dark: false, bg: "bg-[#e3d9c3]", ring: "border-ink/20" },
];

export const toneFor = (index: number): ProjectTone =>
  projectTones[index % projectTones.length];

export const getProject = (slug: string) =>
  projects.find((p) => p.slug === slug);

export function getProjectNeighbours(slug: string) {
  const index = projects.findIndex((p) => p.slug === slug);
  const count = projects.length;
  return {
    index,
    prev: projects[(index - 1 + count) % count],
    next: projects[(index + 1) % count],
  };
}

/** Every screenshot of a project: the primary images first, then anything added under `screens`. */
export function getScreens(p: Project): {
  desktop: Screen[];
  mobile: Screen[];
} {
  const desktop: Screen[] = [];
  const mobile: Screen[] = [];

  if (p.category === "mobile") {
    mobile.push({
      src: p.mobileImage,
      alt: `${p.name} on mobile`,
      caption: "Screen 1",
    });
    mobile.push({
      src: p.mobileImageSecondary,
      alt: `${p.name} on mobile, second screen`,
      caption: "Screen 2",
    });
  } else {
    desktop.push({
      src: p.desktopImage,
      alt: `${p.name} on desktop`,
      caption: "Main screen",
    });
    if (p.hasMobileView) {
      mobile.push({
        src: p.mobileImage,
        alt: `${p.name} on mobile`,
        caption: "Mobile view",
      });
    }
  }

  const seen = new Set([...desktop, ...mobile].map((s) => s.src));
  for (const s of p.screens?.desktop ?? []) {
    if (!seen.has(s.src)) {
      desktop.push(s);
      seen.add(s.src);
    }
  }
  for (const s of p.screens?.mobile ?? []) {
    if (!seen.has(s.src)) {
      mobile.push(s);
      seen.add(s.src);
    }
  }
  return { desktop, mobile };
}
