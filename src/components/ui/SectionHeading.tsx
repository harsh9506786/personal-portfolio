interface AccentProps {
  children: React.ReactNode;
  tone?: "light" | "dark";
}

/** Serif-italic accent used inside headings, e.g. "How I Bring <Accent>Ideas</Accent> to Life." */
export function Accent({ children, tone = "light" }: AccentProps) {
  return (
    <em
      className={`font-serif font-normal italic ${
        tone === "dark" ? "text-amber" : "text-amber-deep"
      }`}
    >
      {children}
    </em>
  );
}

interface SectionHeadingProps {
  id?: string;
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
  tone?: "light" | "dark";
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  id,
  eyebrow,
  title,
  description,
  tone = "light",
  align = "left",
  className = "",
}: SectionHeadingProps) {
  const dark = tone === "dark";
  return (
    <div
      data-reveal
      className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : ""} ${className}`}
    >
      <p
        className={`mb-3 flex items-center gap-2.5 text-xs font-semibold tracking-wide sm:text-sm ${
          align === "center" ? "justify-center" : ""
        } ${dark ? "text-cream" : "text-ink"}`}
      >
        <span className="flex" aria-hidden="true">
          <span className={`h-3 w-3 rounded-full ${dark ? "bg-cream" : "bg-ink"}`} />
          <span className="-ml-1.5 h-3 w-3 rounded-full bg-amber" />
        </span>
        {eyebrow}
      </p>
      <h2
        id={id}
        className={`font-display text-[clamp(1.7rem,3.8vw,2.75rem)] leading-[1.08] font-extrabold tracking-tighter text-balance ${
          dark ? "text-cream" : "text-ink"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-3 max-w-lg text-sm leading-relaxed text-pretty sm:text-base ${
            align === "center" ? "mx-auto" : ""
          } ${dark ? "text-cream/70" : "text-mute"}`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
