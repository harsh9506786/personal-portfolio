"use client";

import { useId, useRef } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type Variants,
} from "motion/react";
import { ArrowRight, Check, Images, Play } from "lucide-react";
import { categoryLabels, getScreens, toneFor } from "@/data/projects";
import type { Project } from "@/types";
import { Button } from "@/components/ui/Button";
import { ProjectLink } from "@/components/ui/ProjectLink";
import { DesktopMock, PhoneMock } from "@/components/ui/ProjectMockups";

const ease: [number, number, number, number] = [0.2, 0.8, 0.2, 1];

// Devices fly in one after another, each with its own personality
const stage: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: 0.25 } },
};
const desktopIn: Variants = {
  hidden: { opacity: 0, y: 70, scale: 0.92 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 70, damping: 15 },
  },
};
const phoneIn: Variants = {
  hidden: { opacity: 0, y: 90, rotate: 14, scale: 0.8 },
  show: {
    opacity: 1,
    y: 0,
    rotate: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 110, damping: 11 },
  },
};
const phoneFromLeft: Variants = {
  hidden: { opacity: 0, y: 80, rotate: -18, scale: 0.85 },
  show: {
    opacity: 1,
    y: 0,
    rotate: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 90, damping: 12 },
  },
};
const phoneFromRight: Variants = {
  hidden: { opacity: 0, y: 80, rotate: 18, scale: 0.85 },
  show: {
    opacity: 1,
    y: 0,
    rotate: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 90, damping: 12 },
  },
};

// Text column: lines rise in a cascade
const textGroup: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
};
const rise: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};
const chipGroup: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.04 } },
};
const chip: Variants = {
  hidden: { opacity: 0, scale: 0.7 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 300, damping: 18 },
  },
};

// Long class lists are split into short pieces so they never wrap badly when copied around.
const articleClass = [
  "relative grid grid-cols-1 overflow-hidden border-2 border-ink bg-paper",
  "rounded-[1.5rem] sm:rounded-[1.75rem]",
  "shadow-[4px_4px_0_0_var(--color-ink)] sm:shadow-[6px_6px_0_0_var(--color-ink)]",
  "lg:grid-cols-12",
].join(" ");

const phonesRowBase = [
  "relative w-full transition-transform duration-700 ease-out",
  "group-hover/media:scale-[1.035]",
].join(" ");
const phonesRowMobile = `${phonesRowBase} flex max-w-[34rem] items-end justify-center gap-4 sm:gap-6`;
const phonesRowWeb = `${phonesRowBase} max-w-[40rem] py-8 sm:py-14`;

// The phone that sits next to a website's monitor (tilted to the right, like the app phones)
const webPhoneClass = [
  "absolute top-1/2 right-1 w-[40%] min-w-[7rem] max-w-[15.5rem]",
  "-translate-y-[44%] rotate-[5deg] sm:right-3",
].join(" ");

const hoverRevealClass = [
  "pointer-events-none absolute inset-x-0 bottom-0 z-10 hidden translate-y-full",
  "bg-ink/95 px-8 py-5 text-cream transition-transform duration-500 ease-out",
  "group-hover/media:translate-y-0 [@media(hover:hover)]:block",
].join(" ");

const detailsBtnClass = [
  "group inline-flex min-h-11 items-center justify-center gap-2.5 rounded-full",
  "border-2 border-ink bg-ink py-1.5 pr-1.5 pl-5",
  "font-display text-sm font-semibold tracking-tight text-cream",
  "transition-[transform,background-color] duration-300 ease-out",
  "hover:-translate-y-0.5 hover:bg-ink-soft",
].join(" ");

interface ProjectCardProps {
  project: Project;
  /** Position in the full project list, used for the "01" counter and colour. */
  index: number;
  /** Mirror the layout on large screens. */
  reverse?: boolean;
  priority?: boolean;
  /** Position in the visible list (0 = first). Later cards slide out from behind the one above. */
  stackIndex?: number;
}

export function ProjectCard({
  project,
  index,
  reverse = false,
  priority = false,
  stackIndex = 0,
}: ProjectCardProps) {
  const ref = useRef<HTMLElement>(null);
  const uid = useId();
  const titleId = `${uid}-title`;
  const reduce = useReducedMotion();
  const tone = toneFor(index);
  const number = String(index + 1).padStart(2, "0");
  const { desktop, mobile } = getScreens(project);
  const screenCount = desktop.length + mobile.length;
  const detailsHref = `/work/${project.slug}`;

  // Mouse: the devices tilt in 3D and drift at different depths
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 120, damping: 16 });
  const sy = useSpring(py, { stiffness: 120, damping: 16 });
  const rotateY = useTransform(sx, [-1, 1], [-7, 7]);
  const rotateX = useTransform(sy, [-1, 1], [5, -5]);
  const deskX = useTransform(sx, [-1, 1], [-10, 10]);
  const deskY = useTransform(sy, [-1, 1], [-8, 8]);
  const phoneX = useTransform(sx, [-1, 1], [22, -22]);
  const phoneY = useTransform(sy, [-1, 1], [16, -16]);
  const ringX = useTransform(sx, [-1, 1], [-28, 28]);

  // Scroll: the phone floats up a little as the card passes
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const phoneScroll = useTransform(scrollYProgress, [0, 1], [34, -34]);

  function onMove(e: React.PointerEvent<HTMLDivElement>) {
    if (reduce || e.pointerType === "touch") return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set(((e.clientX - r.left) / r.width) * 2 - 1);
    py.set(((e.clientY - r.top) / r.height) * 2 - 1);
  }
  function onLeave() {
    px.set(0);
    py.set(0);
  }

  const topFeatures = project.features.slice(0, 3);
  const visibleStack = project.stack.slice(0, 6);
  const hiddenStack = project.stack.length - visibleStack.length;

  return (
    <motion.article
      ref={ref}
      data-transition-card
      aria-labelledby={titleId}
      // First card rises in. Every next card starts higher up, hidden behind the card above
      // (lower z-index), and slides down into its place when it scrolls into view.
      initial={{ opacity: 0, y: stackIndex === 0 ? 70 : -150, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        type: "spring",
        stiffness: 80,
        damping: 18,
        opacity: { duration: 0.35, ease: "easeOut" },
      }}
      style={{ zIndex: 50 - stackIndex }}
      className={articleClass}
    >
      {/* Media */}
      <div
        data-media
        data-cursor="Open"
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        style={{ perspective: 1200 }}
        className={`group/media relative min-h-[21rem] overflow-hidden lg:col-span-7 ${tone.bg} ${
          reverse ? "lg:order-2" : "lg:order-1"
        }`}
      >
        <motion.div
          aria-hidden="true"
          initial={{ scale: 0.5, opacity: 0, rotate: -40 }}
          whileInView={{ scale: 1, opacity: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease }}
          style={{ x: ringX }}
          className={`pointer-events-none absolute -top-24 -right-24 h-[26rem] w-[26rem] rounded-full border-[3rem] ${tone.ring}`}
        />

        {/* Badges */}
        <div className="absolute top-4 left-4 z-10 flex flex-wrap gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full border-2 border-ink bg-paper px-3 py-1 text-xs font-bold text-ink">
            <Images className="h-3.5 w-3.5" aria-hidden="true" />
            {screenCount} {screenCount === 1 ? "screen" : "screens"}
          </span>
          {project.demo && (
            <span className="inline-flex items-center gap-1.5 rounded-full border-2 border-ink bg-ink px-3 py-1 text-xs font-bold text-cream">
              <Play className="h-3 w-3 fill-current" aria-hidden="true" />
              Demo
            </span>
          )}
        </div>

        {/* Whole media area opens the details page (the button below is the keyboard/screen-reader path) */}
        <ProjectLink
          href={detailsHref}
          label={project.name}
          hex={tone.hex}
          dark={tone.dark}
          aria-hidden={true}
          tabIndex={-1}
          className="absolute inset-0 z-20"
        />

        <motion.div
          variants={stage}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="relative flex h-full items-center justify-center px-6 pt-10 pb-16 sm:px-12 lg:px-6"
        >
          <motion.div
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className={
              project.category === "mobile" ? phonesRowMobile : phonesRowWeb
            }
          >
            {project.category === "mobile" ? (
              // Mobile apps are shown as two phones, not inside a browser window.
              <>
                <motion.div
                  variants={phoneFromLeft}
                  className="w-[46%] translate-y-6 -rotate-6"
                >
                  <motion.div style={{ x: phoneX, y: phoneY }}>
                    <PhoneMock name={project.name} src={project.mobileImage} />
                  </motion.div>
                </motion.div>
                <motion.div
                  variants={phoneFromRight}
                  className="w-[46%] -translate-y-3 rotate-[5deg]"
                >
                  <motion.div style={{ y: phoneScroll }}>
                    <motion.div style={{ x: phoneX, y: phoneY }}>
                      <div className="transition-[translate,rotate] duration-700 ease-out group-hover/media:-translate-y-3 group-hover/media:rotate-[2deg]">
                        <PhoneMock
                          name={project.name}
                          src={project.mobileImageSecondary}
                        />
                      </div>
                    </motion.div>
                  </motion.div>
                </motion.div>
              </>
            ) : (
              <>
                <motion.div
                  variants={desktopIn}
                  className={project.hasMobileView ? "w-[92%]" : undefined}
                >
                  <motion.div
                    style={{ x: deskX, y: deskY }}
                    className="relative"
                  >
                    <DesktopMock project={project} priority={priority}>
                      {/* one-time light sweep across the screen */}
                      <div
                        className="pointer-events-none absolute inset-0 overflow-hidden"
                        aria-hidden="true"
                      >
                        <motion.span
                          initial={{ x: "-120%" }}
                          whileInView={{ x: "480%" }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 1.2,
                            delay: 1,
                            ease: "easeInOut",
                          }}
                          className="absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/45 to-transparent"
                        />
                      </div>
                    </DesktopMock>
                  </motion.div>
                </motion.div>
                {project.hasMobileView && (
                  <motion.div variants={phoneIn} className={webPhoneClass}>
                    <motion.div style={{ y: phoneScroll }}>
                      <motion.div style={{ x: phoneX, y: phoneY }}>
                        <div className="transition-[translate,rotate] duration-700 ease-out group-hover/media:-translate-y-3 group-hover/media:rotate-[2deg]">
                          <PhoneMock
                            name={project.name}
                            src={project.mobileImage}
                          />
                        </div>
                      </motion.div>
                    </motion.div>
                  </motion.div>
                )}
              </>
            )}
          </motion.div>
        </motion.div>

        {/* Hover reveal: key features slide up (pointer devices only) */}
        <div className={hoverRevealClass}>
          <p className="mb-2 text-[11px] font-bold tracking-[0.16em] text-amber uppercase">
            Key features
          </p>
          <ul className="flex flex-wrap gap-x-5 gap-y-1 text-sm">
            {topFeatures.map((f) => (
              <li key={f} className="flex items-center gap-1.5">
                <Check
                  className="h-3.5 w-3.5 text-amber"
                  strokeWidth={3}
                  aria-hidden="true"
                />
                {f}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Info */}
      <motion.div
        variants={textGroup}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className={`flex flex-col p-5 sm:p-7 lg:col-span-5 ${reverse ? "lg:order-1" : "lg:order-2"}`}
      >
        <motion.div
          variants={rise}
          className="flex flex-wrap items-center justify-between gap-3"
        >
          <p className="text-xs font-bold tracking-[0.14em] text-ink uppercase">
            {number} <span className="text-mute-light">/</span>{" "}
            {categoryLabels[project.category]}
          </p>
          <span className="rounded-full border-2 border-ink px-3 py-1 text-xs font-semibold">
            {project.status}
          </span>
        </motion.div>

        <motion.h3
          variants={rise}
          id={titleId}
          className="mt-4 font-display text-2xl leading-tight font-extrabold tracking-tighter sm:text-3xl"
        >
          {project.name}
        </motion.h3>
        <motion.p
          variants={rise}
          className="mt-2 font-serif text-lg leading-snug text-amber-deep italic sm:text-xl"
        >
          {project.tagline}
        </motion.p>
        <motion.p
          variants={rise}
          className="mt-3 text-sm leading-relaxed text-mute sm:text-[0.95rem]"
        >
          {project.overview}
        </motion.p>

        <motion.ul variants={rise} className="mt-5 space-y-2">
          {topFeatures.map((f) => (
            <li
              key={f}
              className="flex items-start gap-2.5 text-sm font-medium"
            >
              <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-amber">
                <Check
                  className="h-3 w-3"
                  strokeWidth={3.5}
                  aria-hidden="true"
                />
              </span>
              {f}
            </li>
          ))}
        </motion.ul>

        <motion.ul
          variants={chipGroup}
          className="mt-6 flex flex-wrap gap-2"
          aria-label="Technologies used"
        >
          {visibleStack.map((s) => (
            <motion.li
              key={s}
              variants={chip}
              whileHover={{ y: -3, backgroundColor: "#f59e0b" }}
              className="rounded-full bg-cream px-3 py-1 text-xs font-semibold"
            >
              {s}
            </motion.li>
          ))}
          {hiddenStack > 0 && (
            <motion.li
              variants={chip}
              className="rounded-full bg-ink px-3 py-1 text-xs font-semibold text-cream"
            >
              +{hiddenStack} more
            </motion.li>
          )}
        </motion.ul>

        <motion.div variants={rise} className="mt-7 flex flex-wrap gap-3">
          {project.links.live ? (
            <Button href={project.links.live} external variant="primary">
              Live Preview
            </Button>
          ) : (
            <Button variant="outline" arrow={false} disabled>
              Live preview coming soon
            </Button>
          )}
          <ProjectLink
            href={detailsHref}
            label={project.name}
            hex={tone.hex}
            dark={tone.dark}
            className={detailsBtnClass}
          >
            <span>View Details</span>
            <span
              aria-hidden="true"
              className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-amber text-ink transition-transform duration-300 group-hover:-rotate-45"
            >
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.5} />
            </span>
          </ProjectLink>
          {project.links.repo && (
            <Button href={project.links.repo} external variant="outline">
              View Code
            </Button>
          )}
          {project.links.download && (
            <Button href={project.links.download} external variant="outline">
              Download
            </Button>
          )}
        </motion.div>
      </motion.div>
    </motion.article>
  );
}
