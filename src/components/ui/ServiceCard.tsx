"use client";

import { motion } from "motion/react";
import { Check, Plus } from "lucide-react";
import type { Service, ServiceTone } from "@/types";

const tones: Record<
  ServiceTone,
  { shell: string; open: string; chip: string; button: string; muted: string }
> = {
  cream: {
    shell: "bg-paper text-ink",
    open: "shadow-[6px_6px_0_0_var(--color-ink)]",
    chip: "bg-cream text-ink hover:bg-amber-soft",
    button: "bg-ink text-cream",
    muted: "text-mute",
  },
  dark: {
    shell: "bg-ink text-cream",
    open: "shadow-[6px_6px_0_0_var(--color-amber)]",
    chip: "bg-cream/10 text-cream hover:bg-amber hover:text-ink",
    button: "bg-amber text-ink",
    muted: "text-cream/65",
  },
  orange: {
    shell: "bg-amber text-ink",
    open: "shadow-[6px_6px_0_0_var(--color-ink)]",
    chip: "bg-ink/10 text-ink hover:bg-ink hover:text-amber",
    button: "bg-ink text-amber",
    muted: "text-ink/70",
  },
};

interface ServiceCardProps {
  service: Service;
  open: boolean;
  onToggle: () => void;
  art: React.ReactNode;
}

export function ServiceCard({ service, open, onToggle, art }: ServiceCardProps) {
  const t = tones[service.tone];
  const Icon = service.icon;
  const buttonId = `service-btn-${service.id}`;
  const panelId = `service-panel-${service.id}`;

  return (
    <article
      className={`overflow-hidden rounded-[1.5rem] border-2 border-ink transition-shadow duration-500 sm:rounded-[1.75rem] ${t.shell} ${
        open ? t.open : "shadow-none"
      }`}
    >
      <h3>
        <button
          id={buttonId}
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={onToggle}
          className="flex min-h-[4.5rem] w-full items-center gap-4 px-5 py-3.5 text-left sm:gap-5 sm:px-7 sm:py-4"
        >
          <span
            className="hidden h-10 w-10 shrink-0 place-items-center rounded-full border-2 border-current text-sm font-bold sm:grid"
            aria-hidden="true"
          >
            {service.index}
          </span>
          <Icon className="h-7 w-7 shrink-0 sm:hidden" strokeWidth={2.2} aria-hidden="true" />
          <span className="min-w-0 flex-1">
            <span className="block font-display text-xl leading-tight font-extrabold tracking-tight sm:text-3xl">
              {service.title}
            </span>
            <span className={`mt-0.5 block text-xs sm:text-sm ${t.muted}`}>
              {service.tagline}
            </span>
          </span>
          <span
            className={`grid h-11 w-11 shrink-0 place-items-center rounded-full transition-transform duration-500 ${t.button} ${
              open ? "rotate-[135deg]" : ""
            }`}
            aria-hidden="true"
          >
            <Plus className="h-5 w-5" strokeWidth={2.6} />
          </span>
        </button>
      </h3>

      {/* Content stays in the DOM (good for SEO) and is made inert while collapsed. */}
      <motion.div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        initial={false}
        animate={open ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
        transition={{ duration: 0.55, ease: [0.2, 0.8, 0.2, 1] }}
        inert={!open}
        className="overflow-hidden"
      >
        <div className="grid grid-cols-1 gap-6 px-5 pt-1 pb-6 sm:px-8 sm:pb-8 md:grid-cols-[1.05fr_0.95fr] md:gap-10">
          <div className="flex flex-col">
            <p className={`max-w-md text-sm leading-relaxed sm:text-base ${t.muted}`}>
              {service.description}
            </p>
            <ul className="mt-6 flex flex-wrap gap-2.5">
              {service.capabilities.map((cap) => (
                <li
                  key={cap}
                  className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-[background-color,color,transform] duration-300 hover:-translate-y-0.5 ${t.chip}`}
                >
                  <Check className="h-4 w-4" strokeWidth={3} aria-hidden="true" />
                  {cap}
                </li>
              ))}
            </ul>
          </div>
          <div className="aspect-[4/3] overflow-hidden rounded-[1.25rem] border-2 border-ink md:rounded-[1.5rem]">
            {art}
          </div>
        </div>
      </motion.div>
    </article>
  );
}
