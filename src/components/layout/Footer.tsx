import { ArrowUp, ArrowUpRight } from "lucide-react";
import { navItems } from "@/data/nav";
import { services } from "@/data/services";
import { siteConfig } from "@/lib/config";

const linkClass =
  "inline-flex min-h-8 items-center gap-1 font-medium text-ink/75 transition-colors duration-200 hover:text-ink hover:underline hover:decoration-amber hover:decoration-2 hover:underline-offset-4";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-cream-deep px-5 pt-12 sm:px-8 sm:pt-14">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <a href="#home" className="inline-flex items-center gap-2.5" aria-label={`${siteConfig.name} — back to top`}>
              <span className="grid h-10 w-10 place-items-center rounded-full bg-ink font-display text-lg font-extrabold text-amber">
                H
              </span>
              <span className="font-display text-xl font-bold tracking-tight">
                {siteConfig.name}
                <span className="text-amber-deep">.</span>
              </span>
            </a>
            <p className="mt-5 max-w-xs leading-relaxed text-mute">
              Freelance developer building websites, mobile apps and AI solutions for
              businesses that want to grow.
            </p>
          </div>

          <nav aria-label="Footer">
            <h2 className="mb-4 text-xs font-bold tracking-[0.16em] text-ink uppercase">Navigate</h2>
            <ul className="space-y-1">
              {navItems.map((item) => (
                <li key={item.id}>
                  <a href={item.href} className={linkClass}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="mb-4 text-xs font-bold tracking-[0.16em] text-ink uppercase">Services</h2>
            <ul className="space-y-1">
              {services.map((s) => (
                <li key={s.id}>
                  <a href="#services" className={linkClass}>
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="mb-4 text-xs font-bold tracking-[0.16em] text-ink uppercase">Elsewhere</h2>
            <ul className="space-y-1">
              {siteConfig.socials.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer me" className={linkClass}>
                    {s.label}
                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                </li>
              ))}
              <li>
                <a href="#contact" className={linkClass}>
                  Start a project
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col-reverse items-start justify-between gap-5 border-t-2 border-ink/15 py-6 sm:flex-row sm:items-center">
          <p className="text-sm text-mute">
            © {year} {siteConfig.fullName}. All rights reserved.
          </p>
          <a
            href="#home"
            className="group inline-flex min-h-11 items-center gap-2.5 rounded-full border-2 border-ink px-5 font-display text-sm font-bold transition-colors duration-300 hover:bg-ink hover:text-cream"
          >
            Back to top
            <span className="grid h-7 w-7 place-items-center rounded-full bg-amber text-ink transition-transform duration-300 group-hover:-translate-y-1">
              <ArrowUp className="h-4 w-4" aria-hidden="true" />
            </span>
          </a>
        </div>
      </div>

      {/* Oversized wordmark, cropped by the page edge */}
      <p
        className="pointer-events-none -mb-[0.22em] translate-y-[0.02em] text-center font-display text-[clamp(2.25rem,9vw,8.5rem)] leading-[0.8] font-extrabold tracking-tighter text-transparent select-none [-webkit-text-stroke:2px_var(--color-ink)] opacity-20"
        aria-hidden="true"
      >
        {siteConfig.name}
      </p>
    </footer>
  );
}
