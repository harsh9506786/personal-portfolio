import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/lib/config";

/** Navbar for detail pages (the home navbar uses #anchors, which only work on the home page). */
export function ProjectNav({ name }: { name: string }) {
  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-4">
      <nav
        aria-label="Project"
        className="mx-auto flex max-w-6xl items-center justify-between gap-3 rounded-full bg-ink py-2 pr-2 pl-2.5 shadow-[0_10px_30px_-12px_rgba(23,19,15,0.6)] sm:pl-3"
      >
        <Link href="/" className="group flex items-center gap-2.5 rounded-full py-1 pr-2 pl-1" aria-label={`${siteConfig.name} — home`}>
          <span className="grid h-9 w-9 place-items-center rounded-full bg-amber font-display text-lg leading-none font-extrabold text-ink transition-transform duration-500 group-hover:rotate-[360deg]">
            H
          </span>
          <span className="hidden font-display text-lg font-bold tracking-tight text-cream sm:inline">
            {siteConfig.name}
            <span className="text-amber">.</span>
          </span>
        </Link>

        <p className="hidden min-w-0 truncate text-sm text-cream/60 md:block">
          Work <span aria-hidden="true">/</span> <span className="font-semibold text-cream">{name}</span>
        </p>

        <div className="flex items-center gap-1.5">
          <Link
            href="/#work"
            className="rounded-full px-4 py-2 text-sm font-medium text-cream/80 transition-colors hover:text-cream"
          >
            All projects
          </Link>
          <Link
            href="/#contact"
            className="inline-flex min-h-10 items-center gap-2 rounded-full bg-amber px-4 text-sm font-semibold text-ink transition-colors hover:bg-cream"
          >
            Let&apos;s Talk
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </nav>
    </header>
  );
}
