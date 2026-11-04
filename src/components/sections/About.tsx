import Image from "next/image";
import { Brain, Code2, Gauge, Layers } from "lucide-react";
import { Accent, SectionHeading } from "@/components/ui/SectionHeading";

/**
 * Avatar shown in the portrait panel (transparent WebP in /public/avatar).
 * Set to undefined to fall back to the illustrated developer visual below.
 */
const PORTRAIT_SRC: string | undefined = "/avatar/about-crossed.webp";

const highlights = [
  {
    icon: Code2,
    title: "Full-stack development",
    text: "From database and APIs to the interface people actually touch.",
  },
  {
    icon: Layers,
    title: "Modern web & mobile",
    text: "Next.js, React Native and Flutter, chosen to fit the product.",
  },
  {
    icon: Brain,
    title: "AI integrations & automation",
    text: "LLM-powered features and workflows that remove manual work.",
  },
  {
    icon: Gauge,
    title: "Usability, performance & quality",
    text: "Interfaces that are fast, accessible and carefully finished.",
  },
];

const roleTags = [
  { label: "Websites", rotate: "-6deg", style: "bg-ink text-cream" },
  { label: "Mobile Apps", rotate: "4deg", style: "bg-cream text-ink" },
  { label: "AI Solutions", rotate: "-3deg", style: "bg-ink text-amber" },
  { label: "Automation", rotate: "5deg", style: "bg-paper text-ink" },
];

function PortraitPanel() {
  return (
    <div className="relative mx-auto w-full max-w-md" data-reveal>
      <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border-2 border-cream bg-amber [clip-path:polygon(0_0,calc(100%-3rem)_0,100%_3rem,100%_100%,3rem_100%,0_calc(100%-3rem))]">
        {PORTRAIT_SRC ? (
          <Image
            src={PORTRAIT_SRC}
            alt="Portrait of Harshvardhan, freelance developer"
            fill
            sizes="(min-width: 1024px) 28rem, 90vw"
            quality={90}
            className="object-contain object-bottom"
          />
        ) : (
          <div className="absolute inset-0" role="img" aria-label="Illustration of a code editor with the letter H">
            {/* Editor window */}
            <div className="absolute inset-x-[10%] top-[12%] rounded-2xl border-2 border-ink bg-ink shadow-[6px_6px_0_0_rgba(23,19,15,0.35)]">
              <div className="flex items-center gap-1.5 border-b border-cream/15 px-4 py-3">
                <span className="h-2.5 w-2.5 rounded-full bg-amber" />
                <span className="h-2.5 w-2.5 rounded-full bg-cream/30" />
                <span className="h-2.5 w-2.5 rounded-full bg-cream/30" />
                <span className="ml-3 text-[11px] font-medium tracking-wide text-cream/50">
                  idea.tsx
                </span>
              </div>
              <div className="space-y-2.5 px-4 py-5 font-mono text-[12px] leading-none sm:text-[13px]">
                <p className="text-cream/50">
                  <span className="text-amber">const</span> idea ={" "}
                  <span className="text-cream">yours</span>;
                </p>
                <p className="text-cream/50">
                  <span className="text-amber">await</span> build(idea);
                </p>
                <p className="text-cream/50">
                  <span className="text-amber">return</span>{" "}
                  <span className="text-cream">&quot;something great&quot;</span>;
                </p>
              </div>
            </div>
            {/* Monogram */}
            <div className="absolute bottom-[14%] left-1/2 grid aspect-square w-[40%] -translate-x-1/2 place-items-center rounded-full border-2 border-ink bg-cream font-display text-[clamp(2.75rem,8vw,4.75rem)] leading-none font-extrabold text-ink">
              H
            </div>
          </div>
        )}
      </div>

      {/* Rotated role tags, in the spirit of a sticker sheet */}
      <ul className="absolute -bottom-3 -left-2 flex max-w-[95%] flex-wrap gap-2 sm:-left-6" aria-label="What I do">
        {roleTags.map((tag) => (
          <li
            key={tag.label}
            className={`rounded-full border-2 border-ink px-4 py-1.5 font-display text-sm font-bold ${tag.style}`}
            style={{ rotate: tag.rotate }}
          >
            {tag.label}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="relative bg-ink px-5 py-14 text-cream sm:px-8 sm:py-20"
    >
      <div className="absolute inset-x-0 top-0 h-1 bg-amber" aria-hidden="true" />
      <div className="mx-auto grid grid-cols-1 max-w-6xl items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
        <PortraitPanel />

        <div>
          <SectionHeading
            id="about-title"
            tone="dark"
            eyebrow="About Me"
            title={
              <>
                More Than Just <Accent tone="dark">Writing</Accent> Code.
              </>
            }
          />
          <p
            data-reveal
            className="mt-6 max-w-xl text-base leading-relaxed text-cream/75 sm:text-lg"
          >
            I&apos;m Harshvardhan, a developer passionate about transforming ideas into
            meaningful digital products. I work across web development, mobile
            applications, and AI-powered solutions, focusing on building products that
            look exceptional and deliver real value.
          </p>

          <ul className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2" data-stagger>
            {highlights.map(({ icon: Icon, title, text }) => (
              <li
                key={title}
                className="group rounded-2xl border border-cream/15 p-5 transition-colors duration-300 hover:border-amber hover:bg-cream/5"
              >
                <span className="mb-4 grid h-10 w-10 place-items-center rounded-full bg-amber text-ink transition-transform duration-300 group-hover:-rotate-12 group-hover:scale-110">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="font-display text-lg font-bold tracking-tight">{title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-cream/65">{text}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
