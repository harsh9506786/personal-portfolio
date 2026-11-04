"use client";

import { useEffect, useRef } from "react";
import { animate, useInView } from "motion/react";

/**
 * Cards come out from behind each other, one after another.
 *
 *  - Desktop (row of cards): card 1 appears, card 2 slides out from behind card 1 into
 *    its place, then card 3 slides out from behind card 2.
 *  - Mobile (stacked): card 1 appears, card 2 slides down from behind card 1, then
 *    card 3 slides down from behind card 2.
 *
 * The start point of every card is measured from the real layout (the position of the
 * previous card), so it works for any column count (1, 2 or 3) without breakpoints.
 * Children are the <li> items of the list. Reduced-motion users just see the cards.
 */
export function StackReveal({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLUListElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  useEffect(() => {
    if (!inView) return;
    const list = ref.current;
    if (!list) return;
    const items = Array.from(list.children) as HTMLElement[];

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      items.forEach((el) => (el.style.opacity = "1"));
      return;
    }

    let cancelled = false;

    // Measure natural positions first (nothing is transformed yet).
    const rects = items.map((el) => el.getBoundingClientRect());

    items.forEach((el, i) => {
      el.style.zIndex = String(items.length - i); // earlier cards stay on top
      el.style.willChange = "transform, opacity";
    });

    // Next card starts this many seconds after the previous one starts
    // (smaller = faster). Cards still come out from behind each other.
    const STEP = 0.28;

    const run = async () => {
      for (let i = 0; i < items.length; i++) {
        if (cancelled) return;
        const el = items[i];

        if (i > 0) await new Promise((r) => setTimeout(r, STEP * 1000));
        if (cancelled) return;

        if (i === 0) {
          // First card: simple soft rise-in.
          animate(
            el,
            { opacity: [0, 1], y: [28, 0], scale: [0.96, 1] },
            { duration: 0.45, ease: [0.2, 0.8, 0.2, 1] },
          );
        } else {
          // Start exactly where the previous card sits (hidden behind it),
          // then glide to its own place.
          const dx = rects[i - 1].left - rects[i].left;
          const dy = rects[i - 1].top - rects[i].top;
          animate(
            el,
            { x: [dx, 0], y: [dy, 0], scale: [0.94, 1], opacity: [0, 1] },
            {
              x: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
              y: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
              scale: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
              opacity: { duration: 0.15, ease: "easeOut" },
            },
          );
        }
        setTimeout(() => (el.style.willChange = "auto"), 700);
      }
    };
    run();

    return () => {
      cancelled = true;
      items.forEach((el) => (el.style.opacity = "1"));
    };
  }, [inView]);

  return (
    <ul ref={ref} className={`[&>li]:relative [&>li]:opacity-0 ${className}`}>
      {children}
    </ul>
  );
}
