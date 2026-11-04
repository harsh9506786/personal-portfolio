function Spark() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5 shrink-0 text-amber sm:h-6 sm:w-6"
      aria-hidden="true"
    >
      <path
        fill="currentColor"
        d="M12 0c.7 6.3 5.7 11.3 12 12-6.3.7-11.3 5.7-12 12-.7-6.3-5.7-11.3-12-12C6.3 11.3 11.3 6.3 12 0Z"
      />
    </svg>
  );
}

interface MarqueeProps {
  items: string[];
  className?: string;
}

/**
 * Infinite CSS-only ticker. Each row repeats the items twice, so the track is always wider
 * than the screen (no gap on large monitors) and loops seamlessly. Repeats are hidden from
 * assistive tech. Pauses on hover; motion is switched off by prefers-reduced-motion.
 */
export function Marquee({ items, className = "" }: MarqueeProps) {
  const row = (hiddenRow: boolean) => (
    <ul
      className="flex shrink-0 items-center gap-6 pr-6 sm:gap-10 sm:pr-10"
      aria-hidden={hiddenRow || undefined}
    >
      {[0, 1].map((copy) =>
        items.map((item) => (
          <li
            key={`${copy}-${item}`}
            className="flex items-center gap-6 sm:gap-10"
            aria-hidden={hiddenRow || copy === 1 || undefined}
          >
            <span className="font-display text-base font-extrabold tracking-tight whitespace-nowrap sm:text-xl">
              {item}
            </span>
            <Spark />
          </li>
        )),
      )}
    </ul>
  );

  return (
    <div className={`overflow-hidden ${className}`}>
      <div className="flex w-max transform-gpu animate-marquee will-change-transform [backface-visibility:hidden] hover:[animation-play-state:paused]">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
