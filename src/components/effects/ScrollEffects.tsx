"use client";

import { useEffect } from "react";
import { gsap, MOTION_DESKTOP, MOTION_OK, ScrollTrigger } from "@/lib/gsap";

/**
 * Page-level GSAP effects driven by data attributes, so section components can stay
 * Server Components:
 *
 *   data-reveal            fade + rise when scrolled into view (data-reveal-delay in seconds)
 *   data-stagger           children reveal one after another
 *   data-scrub-x="-15"     drifts horizontally with scroll (percent of own width)
 *   data-parallax="0.08"   vertical parallax (large screens only)
 *
 * Everything is created inside gsap.matchMedia(), so it is skipped for
 * prefers-reduced-motion and fully reverted on cleanup.
 */
export function ScrollEffects() {
  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add(MOTION_OK, () => {
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 32,
          duration: 0.9,
          delay: Number(el.dataset.revealDelay ?? 0),
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-stagger]").forEach((group) => {
        const items = Array.from(group.children);
        gsap.from(items, {
          opacity: 0,
          y: 26,
          duration: 0.7,
          stagger: 0.07,
          ease: "power3.out",
          scrollTrigger: { trigger: group, start: "top 88%", once: true },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-scrub-x]").forEach((el) => {
        gsap.fromTo(
          el,
          { xPercent: 0 },
          {
            xPercent: Number(el.dataset.scrubX ?? -15),
            ease: "none",
            scrollTrigger: {
              trigger: el.parentElement ?? el,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.6,
            },
          },
        );
      });
    });

    mm.add(MOTION_DESKTOP, () => {
      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
        const speed = Number(el.dataset.parallax ?? 0.08);
        gsap.fromTo(
          el,
          { yPercent: -speed * 100 },
          {
            yPercent: speed * 100,
            ease: "none",
            scrollTrigger: {
              trigger: el.parentElement ?? el,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      });
    });

    // Fonts and images can shift layout after hydration; re-measure once everything has loaded.
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);

    return () => {
      window.removeEventListener("load", refresh);
      mm.revert();
    };
  }, []);

  return null;
}
