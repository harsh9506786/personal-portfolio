import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { buildJsonLd, buildMetadata } from "@/lib/seo";
import { Providers } from "@/components/layout/Providers";

// Fonts are self-hosted from npm (@fontsource) and optimised by next/font — no external requests.
const bricolage = localFont({
  src: "../../node_modules/@fontsource-variable/bricolage-grotesque/files/bricolage-grotesque-latin-wght-normal.woff2",
  variable: "--font-bricolage",
  weight: "200 800",
  display: "swap",
});

const dmSans = localFont({
  src: "../../node_modules/@fontsource-variable/dm-sans/files/dm-sans-latin-wght-normal.woff2",
  variable: "--font-dm-sans",
  weight: "100 1000",
  display: "swap",
});

const instrument = localFont({
  src: [
    {
      path: "../../node_modules/@fontsource/instrument-serif/files/instrument-serif-latin-400-normal.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../node_modules/@fontsource/instrument-serif/files/instrument-serif-latin-400-italic.woff2",
      weight: "400",
      style: "italic",
    },
  ],
  variable: "--font-instrument",
  display: "swap",
});

export const metadata: Metadata = buildMetadata();

export const viewport: Viewport = {
  themeColor: "#F5F1E9",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = buildJsonLd();

  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${dmSans.variable} ${instrument.variable}`}
    >
      <body className="antialiased">
        <Providers>{children}</Providers>
        <script
          type="application/ld+json"
          // JSON-LD is built from trusted, static config.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
