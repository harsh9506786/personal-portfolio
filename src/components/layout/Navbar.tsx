"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { navItems, sectionIds, sectionToNav } from "@/data/nav";
import { siteConfig } from "@/lib/config";
import { useActiveSection } from "@/hooks/useActiveSection";
import { useScrollLock } from "@/hooks/useScrollLock";

function Logo({ onClick }: { onClick?: () => void }) {
  return (
    <a
      href="#home"
      onClick={onClick}
      className="group flex items-center gap-2.5 rounded-full py-1 pr-2 pl-1"
      aria-label={`${siteConfig.name} — back to top`}
    >
      <span className="grid h-9 w-9 place-items-center rounded-full bg-amber font-display text-lg leading-none font-extrabold text-ink transition-transform duration-500 group-hover:rotate-[360deg]">
        H
      </span>
      <span className="font-display text-lg font-bold tracking-tight text-cream">
        {siteConfig.name}
        <span className="text-amber">.</span>
      </span>
    </a>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const activeSection = useActiveSection(sectionIds);
  const activeNav = sectionToNav[activeSection] ?? "home";
  useScrollLock(open);

  return (
    <header className="sticky top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-4">
      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-6xl items-center justify-between rounded-full bg-ink py-2 pr-2 pl-2.5 shadow-[0_10px_30px_-12px_rgba(23,19,15,0.6)] sm:pl-3"
      >
        <Logo />

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const isActive = activeNav === item.id;
            return (
              <li key={item.id}>
                <a
                  href={item.href}
                  aria-current={isActive ? "location" : undefined}
                  className={`relative block rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300 ${
                    isActive ? "text-ink" : "text-cream/70 hover:text-cream"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-full bg-amber"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative">{item.label}</span>
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href="#contact"
            className="group hidden min-h-11 items-center gap-2 rounded-full bg-cream py-2 pr-2 pl-5 text-sm font-semibold text-ink transition-colors duration-300 hover:bg-amber sm:inline-flex"
          >
            Let&apos;s Talk
            <span className="grid h-7 w-7 place-items-center rounded-full bg-ink text-cream transition-transform duration-300 group-hover:rotate-45">
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </span>
          </a>

          <button
            type="button"
            className="grid h-11 w-11 place-items-center rounded-full bg-cream/10 text-cream transition-colors hover:bg-cream/20 md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu: an overlay, so opening/closing never shifts the page layout
          (a layout shift here made anchor scrolling overshoot). */}
      <div className="pointer-events-none absolute inset-x-3 top-full sm:inset-x-6 md:hidden">
        <AnimatePresence>
          {open && (
            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{ duration: 0.28, ease: [0.2, 0.8, 0.2, 1] }}
              className="pointer-events-auto mx-auto mt-2 max-w-6xl origin-top overflow-hidden rounded-[2rem] bg-ink p-3 shadow-[0_20px_40px_-16px_rgba(23,19,15,0.6)]"
            >
            <ul className="flex flex-col">
              {navItems.map((item, i) => (
                <motion.li
                  key={item.id}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.05, duration: 0.35 }}
                >
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    aria-current={activeNav === item.id ? "location" : undefined}
                    className={`flex min-h-14 items-center justify-between rounded-2xl px-4 font-display text-2xl font-bold tracking-tight ${
                      activeNav === item.id ? "bg-amber text-ink" : "text-cream"
                    }`}
                  >
                    {item.label}
                    <span className="text-sm font-medium opacity-60">
                      0{i + 1}
                    </span>
                  </a>
                </motion.li>
              ))}
            </ul>
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-3 flex min-h-14 items-center justify-center gap-2 rounded-full bg-cream font-display text-lg font-bold text-ink"
            >
              Let&apos;s Talk <ArrowUpRight className="h-5 w-5" aria-hidden="true" />
            </a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
