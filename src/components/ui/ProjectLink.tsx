"use client";

import Link from "next/link";
import { startProjectTransition } from "@/lib/projectTransition";

interface ProjectLinkProps {
  href: string;
  label: string;
  hex: string;
  dark: boolean;
  className?: string;
  children?: React.ReactNode;
  tabIndex?: number;
  "aria-label"?: string;
  "aria-hidden"?: boolean;
}

/**
 * A normal link (works in a new tab, crawlable) that plays the card → detail transition
 * on a plain click. It grows from the nearest [data-transition-card] > [data-media] box.
 */
export function ProjectLink({ href, label, hex, dark, className, children, ...rest }: ProjectLinkProps) {
  function onClick(e: React.MouseEvent<HTMLAnchorElement>) {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const card = e.currentTarget.closest("[data-transition-card]");
    const source = card?.querySelector<HTMLElement>("[data-media]");
    if (!source) return;
    const r = source.getBoundingClientRect();
    const handled = startProjectTransition({
      href,
      label,
      hex,
      dark,
      rect: { top: r.top, left: r.left, width: r.width, height: r.height },
    });
    if (handled) e.preventDefault();
  }

  return (
    <Link href={href} onClick={onClick} className={className} {...rest}>
      {children}
    </Link>
  );
}
