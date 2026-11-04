"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { projectFilters, projects } from "@/data/projects";
import type { ProjectCategory } from "@/types";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { ScrollTrigger } from "@/lib/gsap";

type Filter = "all" | ProjectCategory;

const countFor = (filter: Filter) =>
  filter === "all"
    ? projects.length
    : projects.filter((p) => p.categories.includes(filter)).length;

export function ProjectShowcase() {
  const [filter, setFilter] = useState<Filter>("all");
  const visible =
    filter === "all"
      ? projects
      : projects.filter((p) => p.categories.includes(filter));

  return (
    <div>
      <div
        role="group"
        aria-label="Filter projects by category"
        className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 pb-2 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0"
      >
        {projectFilters.map((f) => {
          const active = filter === f.id;
          return (
            <button
              key={f.id}
              type="button"
              aria-pressed={active}
              onClick={() => setFilter(f.id)}
              className={`relative min-h-11 shrink-0 rounded-full border-2 border-ink px-5 py-2 font-display text-sm font-bold whitespace-nowrap transition-colors duration-300 ${
                active ? "text-ink" : "bg-transparent text-ink hover:bg-ink/5"
              }`}
            >
              {active && (
                <motion.span
                  layoutId="filter-pill"
                  className="absolute inset-0 rounded-full bg-amber"
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                />
              )}
              <span className="relative">
                {f.label}
                <span className="ml-1.5 text-xs opacity-60">
                  {countFor(f.id)}
                </span>
              </span>
            </button>
          );
        })}
      </div>

      <p className="sr-only" role="status" aria-live="polite">
        Showing {visible.length} {visible.length === 1 ? "project" : "projects"}
      </p>

      <AnimatePresence mode="wait">
        <motion.div
          key={filter}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
          onAnimationComplete={() => ScrollTrigger.refresh()}
          className="mt-8 space-y-10 sm:mt-10 sm:space-y-16"
        >
          {visible.map((project, i) => (
            <ProjectCard
              key={project.slug}
              project={project}
              index={projects.indexOf(project)}
              reverse={i % 2 === 1}
              priority={i === 0}
              stackIndex={i}
            />
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
