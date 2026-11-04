import Image from "next/image";
import { Quote } from "lucide-react";
import { Accent, SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { StackReveal } from "@/components/sections/Stackreveal";
import { testimonials } from "@/data/testimonials";

function ReviewCard({ t }: { t: (typeof testimonials)[number] }) {
  return (
    <figure className="flex h-full flex-col rounded-[1.75rem] border-2 border-ink bg-paper p-7 shadow-[6px_6px_0_0_var(--color-ink)]">
      <Quote className="h-9 w-9 text-amber" aria-hidden="true" fill="currentColor" />
      <blockquote className="mt-4 flex-1 text-base leading-relaxed">{t.quote}</blockquote>
      <figcaption className="mt-6 flex items-center gap-3 border-t-2 border-ink/10 pt-5">
        {t.imageSrc ? (
          <Image
            src={t.imageSrc}
            alt={`Portrait of ${t.name}`}
            width={44}
            height={44}
            className="h-11 w-11 rounded-full object-cover"
          />
        ) : (
          <span
            className="grid h-11 w-11 place-items-center rounded-full bg-ink font-display font-bold text-amber"
            aria-hidden="true"
          >
            {t.name.charAt(0)}
          </span>
        )}
        <span>
          <span className="block font-display font-bold">{t.name}</span>
          <span className="block text-sm text-mute">{t.context}</span>
        </span>
      </figcaption>
    </figure>
  );
}

/** Honest empty-state slot: clearly a placeholder, never a made-up quote. */
function PlaceholderSlot() {
  return (
    <li
      className="flex h-full flex-col rounded-[1.75rem] border-2 border-dashed border-ink/35 p-7"
      aria-hidden="true"
    >
      <Quote className="h-9 w-9 text-ink/20" />
      <div className="mt-5 flex-1 space-y-3">
        <div className="h-3 w-full rounded-full bg-ink/10" />
        <div className="h-3 w-11/12 rounded-full bg-ink/10" />
        <div className="h-3 w-3/5 rounded-full bg-ink/10" />
      </div>
      <div className="mt-6 flex items-center gap-3 border-t-2 border-dashed border-ink/20 pt-5">
        <span className="h-11 w-11 rounded-full bg-ink/10" />
        <span className="space-y-2">
          <span className="block h-3 w-28 rounded-full bg-ink/15" />
          <span className="block h-2.5 w-36 rounded-full bg-ink/10" />
        </span>
      </div>
    </li>
  );
}

export function Testimonials() {
  const hasReviews = testimonials.length > 0;

  return (
    <section
      id="reviews"
      aria-labelledby="reviews-title"
      className="bg-cream-deep px-5 py-14 sm:px-8 sm:py-20"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          id="reviews-title"
          eyebrow="Client Reviews"
          title={
            <>
              What <Accent>People</Accent> Say.
            </>
          }
          className="mb-8"
        />

        {hasReviews ? (
          <StackReveal className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((t) => (
              <li key={t.id}>
                <ReviewCard t={t} />
              </li>
            ))}
          </StackReveal>
        ) : (
          <>
            <StackReveal className="grid grid-cols-1 gap-5 md:grid-cols-3">
              <PlaceholderSlot />
              <PlaceholderSlot />
              <PlaceholderSlot />
            </StackReveal>
            <div
              data-reveal
              className="mt-10 flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center"
            >
              <p className="max-w-xl text-base leading-relaxed text-mute">
                Real feedback from real clients will live here. I only publish reviews that
                clients have actually written, so there are no made-up quotes.
              </p>
              <Button href="#contact" variant="dark">
                Be My Next Client
              </Button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}