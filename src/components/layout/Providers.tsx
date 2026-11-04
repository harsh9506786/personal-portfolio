"use client";

import { MotionConfig } from "motion/react";
import { ScrollEffects } from "@/components/effects/ScrollEffects";
import { ProjectTransition } from "@/components/effects/ProjectTransition";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    // reducedMotion="user" makes every Motion animation respect prefers-reduced-motion.
    <MotionConfig reducedMotion="user">
      <ScrollEffects />
      <ProjectTransition />
      {children}
    </MotionConfig>
  );
}
