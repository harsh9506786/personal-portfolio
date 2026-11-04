"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "motion/react";
import { registerProjectTransition, type TransitionRequest } from "@/lib/projectTransition";

type Phase = "expand" | "loading" | "reveal";

const FULL = "inset(0px 0px 0px 0px round 0px)";

/**
 * Card → detail page transition.
 * 1. The card's media area grows from its exact position to fill the screen (clip-path).
 * 2. The detail route is opened underneath while the project name is shown.
 * 3. Once the new page is there, the overlay fades away to reveal it.
 * Mounted once (in Providers), so it survives the route change.
 */
export function ProjectTransition() {
  const router = useRouter();
  const pathname = usePathname();
  const [req, setReq] = useState<TransitionRequest | null>(null);
  const [phase, setPhase] = useState<Phase>("expand");
  const [from, setFrom] = useState(FULL);

  useEffect(
    () =>
      registerProjectTransition((r) => {
        const vw = document.documentElement.clientWidth;
        const vh = window.innerHeight;
        const right = Math.max(0, vw - r.rect.left - r.rect.width);
        const bottom = Math.max(0, vh - r.rect.top - r.rect.height);
        setFrom(`inset(${r.rect.top}px ${right}px ${bottom}px ${r.rect.left}px round 28px)`);
        setPhase("expand");
        setReq(r);
        router.prefetch(r.href);
      }),
    [router],
  );

  // When the detail page is in place, reveal it (with a safety timeout if navigation is slow).
  useEffect(() => {
    if (!req || phase !== "loading") return;
    const delay = pathname === req.href ? 200 : 5000;
    const t = setTimeout(() => setPhase("reveal"), delay);
    return () => clearTimeout(t);
  }, [req, phase, pathname]);

  if (!req) return null;

  const revealing = phase === "reveal";

  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-0 z-[300] grid place-items-center overflow-hidden"
      style={{ backgroundColor: req.hex }}
      initial={{ clipPath: from, opacity: 1 }}
      animate={{ clipPath: FULL, opacity: revealing ? 0 : 1 }}
      transition={
        revealing
          ? { duration: 0.55, ease: "easeOut" }
          : { duration: 0.7, ease: [0.76, 0, 0.24, 1] }
      }
      onAnimationComplete={() => {
        if (phase === "expand") {
          setPhase("loading");
          router.push(req.href);
        } else if (phase === "reveal") {
          setReq(null);
        }
      }}
    >
      <motion.span
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
        className={`px-6 text-center font-display text-[clamp(2.5rem,9vw,7rem)] leading-none font-extrabold tracking-tighter ${
          req.dark ? "text-cream" : "text-ink"
        }`}
      >
        {req.label}
      </motion.span>
    </motion.div>
  );
}
