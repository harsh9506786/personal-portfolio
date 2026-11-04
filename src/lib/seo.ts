import type { Metadata } from "next";
import { siteConfig } from "@/lib/config";
import { services } from "@/data/services";

export function buildMetadata(): Metadata {
  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: siteConfig.tabTitle,
      template: `%s | ${siteConfig.name}`,
    },
    description: siteConfig.description,
    keywords: [...siteConfig.keywords],
    authors: [{ name: siteConfig.fullName, url: siteConfig.url }],
    creator: siteConfig.fullName,
    alternates: { canonical: "/" },
    openGraph: {
      type: "website",
      url: siteConfig.url,
      siteName: siteConfig.name,
      title: siteConfig.title,
      description: siteConfig.description,
      locale: siteConfig.locale,
    },
    twitter: {
      card: "summary_large_image",
      title: siteConfig.title,
      description: siteConfig.description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large" },
    },
  };
}

/** Person + ProfessionalService structured data, linked with @id. */
export function buildJsonLd() {
  const sameAs = siteConfig.socials.map((s) => s.href);
  const personId = `${siteConfig.url}/#person`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": personId,
        name: siteConfig.fullName,
        alternateName: siteConfig.name,
        jobTitle: siteConfig.jobTitle,
        url: siteConfig.url,
        description: siteConfig.description,
        knowsAbout: [
          "Web development",
          "Next.js",
          "React",
          "Mobile app development",
          "React Native",
          "Flutter",
          "AI automation",
        ],
        ...(sameAs.length > 0 ? { sameAs } : {}),
      },
      {
        "@type": "ProfessionalService",
        "@id": `${siteConfig.url}/#service`,
        name: `${siteConfig.name} — Freelance Developer`,
        url: siteConfig.url,
        description: siteConfig.description,
        provider: { "@id": personId },
        founder: { "@id": personId },
        areaServed: "Worldwide",
        serviceType: services.map((s) => s.title),
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Development services",
          itemListElement: services.map((s) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: s.title,
              description: s.description,
            },
          })),
        },
      },
    ],
  };
}