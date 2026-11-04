import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register once, on the client only. Import this module from Client Components.
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };

/** Animation is only run when the visitor hasn't asked for reduced motion. */
export const MOTION_OK = "(prefers-reduced-motion: no-preference)";
/** Heavier scroll-linked effects (parallax) are limited to larger screens. */
export const MOTION_DESKTOP =
  "(prefers-reduced-motion: no-preference) and (min-width: 1024px)";
