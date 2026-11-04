import { Button } from "@/components/ui/Button";
import { Marquee } from "@/components/ui/Marquee";
import { HeroVisual } from "@/components/sections/HeroVisual";

const headline: { word: string; accent?: boolean; br?: boolean }[] = [
  { word: "Turning" },
  { word: "Ideas", accent: true },
  { word: "Into", br: true },
  { word: "Digital", br: true },
  { word: "Experiences." },
];

const tickerItems = [
  "Website Development",
  "Mobile Apps",
  "AI Automation",
  "Custom Web Apps",
  "AI Chatbots",
  "E-commerce",
  "API Integrations",
];

export function Hero() {
  return (
    <>
      <section
        id="home"
        aria-labelledby="hero-title"
        className="bg-dots relative overflow-hidden"
      >
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 pt-8 pb-10 sm:px-8 sm:pt-12 lg:grid-cols-[1.08fr_0.92fr] lg:gap-8 lg:pt-14 lg:pb-16">
          <div>
            <p
              className="fade-up inline-flex items-center gap-2.5 rounded-full border-2 border-ink bg-paper py-1.5 pr-4 pl-3 text-xs font-bold tracking-[0.14em] text-ink"
              style={{ ["--d" as string]: 0 }}
            >
              <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-wa" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-wa" />
              </span>
              AVAILABLE FOR PROJECTS
            </p>

            <h1
              id="hero-title"
              className="mt-6 font-display text-[clamp(2.1rem,5.6vw,4.25rem)] leading-[1.02] font-extrabold tracking-tighter text-ink sm:whitespace-nowrap"
            >
              {headline.map(({ word, accent, br }, i) => (
                <span key={word}>
                  <span className="word-mask">
                    <span
                      className={`word-rise ${
                        accent
                          ? "font-serif font-normal text-amber-deep italic"
                          : ""
                      }`}
                      style={{ ["--i" as string]: i }}
                    >
                      {word}
                    </span>
                  </span>{" "}
                  {br && <br className="hidden sm:block" />}
                </span>
              ))}
            </h1>

            <p
              className="fade-up mt-5 max-w-md text-[0.95rem] leading-relaxed text-mute sm:text-base"
              style={{ ["--d" as string]: 650 }}
            >
              I build beautiful websites, powerful mobile applications, and
              intelligent AI solutions that help businesses grow.
            </p>

            <div
              className="fade-up mt-7 flex flex-col gap-3 sm:flex-row sm:items-center"
              style={{ ["--d" as string]: 800 }}
            >
              <Button
                href="#work"
                variant="primary"
                className="w-full sm:w-auto"
              >
                Explore My Work
              </Button>
              <Button
                href="#contact"
                variant="outline"
                className="w-full sm:w-auto"
              >
                Let&apos;s Work Together
              </Button>
            </div>

            <ul
              className="fade-up mt-8 flex flex-wrap gap-2"
              style={{ ["--d" as string]: 950 }}
              aria-label="What I build"
            >
              {["Websites", "Mobile Apps", "AI Solutions"].map((tag, i) => (
                <li
                  key={tag}
                  className={`rounded-full px-3.5 py-1 text-xs font-semibold sm:text-sm ${
                    i === 1 ? "bg-amber text-ink" : "bg-ink text-cream"
                  }`}
                >
                  {tag}
                </li>
              ))}
            </ul>
          </div>

          <div className="fade-up" style={{ ["--d" as string]: 400 }}>
            <HeroVisual />
          </div>
        </div>
      </section>

      <div className="border-b-4 border-amber bg-ink py-3 text-cream">
        <Marquee items={tickerItems} />
      </div>
    </>
  );
}
