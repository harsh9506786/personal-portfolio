import { Button } from "@/components/ui/Button";

const band = "LET'S BUILD • LET'S BUILD • LET'S BUILD • LET'S BUILD • LET'S BUILD • ";

export function CTA() {
  return (
    <section
      id="start"
      aria-labelledby="cta-title"
      className="relative overflow-hidden bg-amber px-5 pt-12 pb-20 sm:px-8 sm:pt-16 sm:pb-24"
    >
      {/* Giant outlined type that drifts sideways as you scroll */}
      <div className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 select-none" aria-hidden="true">
        <p
          data-scrub-x="-18"
          className="text-outline w-max font-display text-[clamp(5rem,16vw,12rem)] leading-none font-extrabold whitespace-nowrap opacity-25"
        >
          {band}
        </p>
      </div>

      <div className="relative mx-auto max-w-4xl text-center">
        <h2
          id="cta-title"
          data-reveal
          className="font-display text-[clamp(1.9rem,4.8vw,3.5rem)] leading-[1.05] font-extrabold tracking-tighter text-balance text-ink"
        >
          Have an Idea? Let&apos;s Make It{" "}
          <em className="font-serif font-normal text-cream italic">Real.</em>
        </h2>
        <p
          data-reveal
          data-reveal-delay="0.1"
          className="mx-auto mt-4 max-w-lg text-[0.95rem] leading-relaxed text-ink/80 sm:text-base"
        >
          Whether you&apos;re starting from scratch or looking to improve an existing
          product, let&apos;s build something meaningful together.
        </p>
        <div data-reveal data-reveal-delay="0.2" className="mt-7 flex justify-center">
          <Button href="#contact" variant="dark">
            Start Your Project
          </Button>
        </div>
      </div>

      {/* Scalloped edge: a visual hand-off into the portfolio section */}
      <div
        className="absolute inset-x-0 bottom-0 h-6 sm:h-8"
        style={{
          backgroundImage:
            "radial-gradient(circle at 50% 100%, var(--color-cream) 0 1.15rem, transparent 1.2rem)",
          backgroundSize: "2.4rem 100%",
          backgroundRepeat: "repeat-x",
        }}
        aria-hidden="true"
      />
    </section>
  );
}
