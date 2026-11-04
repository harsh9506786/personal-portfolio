"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, type PanInfo } from "motion/react";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import type { Screen } from "@/types";
import { PhoneMock, useImageRatio } from "@/components/ui/ProjectMockups";
import { useScrollLock } from "@/hooks/useScrollLock";

interface Item extends Screen {
  kind: "desktop" | "mobile";
}

interface ScreenGalleryProps {
  name: string;
  desktop: Screen[];
  mobile: Screen[];
}

const ease: [number, number, number, number] = [0.2, 0.8, 0.2, 1];

const dots = (
  <>
    <span className="h-2 w-2 rounded-full bg-ink" />
    <span className="h-2 w-2 rounded-full bg-amber" />
    <span className="h-2 w-2 rounded-full border border-ink" />
  </>
);

export function ScreenGallery({ name, desktop, mobile }: ScreenGalleryProps) {
  const items: Item[] = [
    ...desktop.map((s) => ({ ...s, kind: "desktop" as const })),
    ...mobile.map((s) => ({ ...s, kind: "mobile" as const })),
  ];
  const [open, setOpen] = useState<number | null>(null);
  const opener = useRef<HTMLElement | null>(null);
  useScrollLock(open !== null);

  function show(index: number, el: HTMLElement) {
    opener.current = el;
    setOpen(index);
  }
  function close() {
    setOpen(null);
    opener.current?.focus();
  }

  return (
    <div>
      {desktop.length > 0 && (
        <div>
          <h3 className="mb-6 text-center text-xs font-bold tracking-[0.16em] text-amber-deep uppercase">
            Desktop screens
          </h3>
          <ul
            className={`grid gap-8 ${desktop.length > 1 ? "md:grid-cols-2" : "mx-auto max-w-3xl"}`}
          >
            {desktop.map((s, i) => (
              <motion.li
                key={s.src}
                initial={{ opacity: 0, y: 40, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: (i % 2) * 0.08, ease }}
              >
                <button
                  type="button"
                  onClick={(e) => show(i, e.currentTarget)}
                  aria-label={`View ${s.caption ?? `screen ${i + 1}`} full size`}
                  className="group block w-full text-left"
                >
                  <div className="overflow-hidden rounded-xl border-2 border-ink bg-paper shadow-[6px_6px_0_0_rgba(23,19,15,0.9)] transition-transform duration-500 group-hover:-translate-y-1.5 sm:rounded-2xl">
                    <div className="flex h-8 items-center gap-1.5 border-b-2 border-ink bg-cream px-3">
                      {dots}
                    </div>
                    <DesktopShot s={s} />
                  </div>
                  <p className="mt-4 text-sm font-semibold">
                    {s.caption ?? `Screen ${i + 1}`}
                  </p>
                </button>
              </motion.li>
            ))}
          </ul>
        </div>
      )}

      {mobile.length > 0 && (
        <div className={desktop.length > 0 ? "mt-16" : ""}>
          <h3 className="mb-6 text-center text-xs font-bold tracking-[0.16em] text-amber-deep uppercase">
            Mobile screens
          </h3>
          <ul className="flex flex-wrap justify-center gap-6 sm:gap-8">
            {mobile.map((s, i) => {
              const index = desktop.length + i;
              return (
                <motion.li
                  key={s.src}
                  className="w-[44%] max-w-[16rem] sm:w-[30%] lg:w-[22%]"
                  initial={{ opacity: 0, y: 50, rotate: i % 2 ? 4 : -4 }}
                  whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    type: "spring",
                    stiffness: 90,
                    damping: 14,
                    delay: (i % 3) * 0.08,
                  }}
                >
                  <button
                    type="button"
                    onClick={(e) => show(index, e.currentTarget)}
                    aria-label={`View ${s.caption ?? `mobile screen ${i + 1}`} full size`}
                    className="group block w-full"
                  >
                    <div className="transition-transform duration-500 group-hover:-translate-y-2 group-hover:rotate-1">
                      <PhoneMock name={name} src={s.src} />
                    </div>
                    <p className="mt-4 text-center text-sm font-semibold">
                      {s.caption ?? `Screen ${i + 1}`}
                    </p>
                  </button>
                </motion.li>
              );
            })}
          </ul>
        </div>
      )}

      <AnimatePresence>
        {open !== null && (
          <Lightbox items={items} start={open} onClose={close} />
        )}
      </AnimatePresence>
    </div>
  );
}

function DesktopShot({ s }: { s: Screen }) {
  const { ratio, onLoad } = useImageRatio(16 / 10, 1.3, 2);
  return (
    <div className="relative overflow-hidden" style={{ aspectRatio: ratio }}>
      <Image
        src={s.src}
        alt={s.alt}
        fill
        unoptimized
        sizes="(min-width: 768px) 45vw, 92vw"
        onLoad={onLoad}
        className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
      />
      <span className="absolute top-3 right-3 grid h-9 w-9 place-items-center rounded-full bg-amber text-ink opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
        <Maximize2 className="h-4 w-4" aria-hidden="true" />
      </span>
    </div>
  );
}

function Lightbox({
  items,
  start,
  onClose,
}: {
  items: Item[];
  start: number;
  onClose: () => void;
}) {
  const [index, setIndex] = useState(start);
  const [dir, setDir] = useState(1);
  const dialog = useRef<HTMLDivElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const count = items.length;
  const current = items[index];

  const go = useCallback(
    (d: number) => {
      setDir(d);
      setIndex((i) => (i + d + count) % count);
    },
    [count],
  );

  useEffect(() => {
    closeBtn.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
      else if (e.key === "Tab") {
        // keep keyboard focus inside the dialog
        const nodes = dialog.current?.querySelectorAll<HTMLElement>("button");
        if (!nodes || nodes.length === 0) return;
        const first = nodes[0];
        const last = nodes[nodes.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, onClose]);

  function onDragEnd(_: unknown, info: PanInfo) {
    if (info.offset.x < -80) go(1);
    else if (info.offset.x > 80) go(-1);
  }

  const arrow =
    "absolute top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-cream/10 text-cream backdrop-blur transition-colors hover:bg-amber hover:text-ink";

  return (
    <motion.div
      ref={dialog}
      role="dialog"
      aria-modal="true"
      aria-label={`${current.caption ?? "Screen"} — screenshot gallery`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
      className="fixed inset-0 z-[400] flex flex-col items-center justify-center gap-4 bg-ink/95 p-4 backdrop-blur-md"
    >
      <button
        ref={closeBtn}
        type="button"
        aria-label="Close gallery"
        onClick={onClose}
        className="absolute top-4 right-4 z-10 grid h-11 w-11 place-items-center rounded-full bg-cream/10 text-cream transition-colors hover:bg-amber hover:text-ink"
      >
        <X className="h-5 w-5" aria-hidden="true" />
      </button>
      {count > 1 && (
        <>
          <button
            type="button"
            aria-label="Previous screen"
            className={`${arrow} left-3`}
            onClick={(e) => {
              e.stopPropagation();
              go(-1);
            }}
          >
            <ChevronLeft aria-hidden="true" />
          </button>
          <button
            type="button"
            aria-label="Next screen"
            className={`${arrow} right-3`}
            onClick={(e) => {
              e.stopPropagation();
              go(1);
            }}
          >
            <ChevronRight aria-hidden="true" />
          </button>
        </>
      )}

      <div
        className="relative h-[66vh] w-[min(92vw,1200px)]"
        onClick={(e) => e.stopPropagation()}
      >
        <motion.div
          key={index}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.25}
          onDragEnd={onDragEnd}
          initial={{ opacity: 0, x: dir * 70 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.35, ease }}
          className="absolute inset-0 cursor-grab active:cursor-grabbing"
        >
          <Image
            src={current.src}
            alt={current.alt}
            fill
            unoptimized
            sizes="92vw"
            draggable={false}
            className="object-contain"
          />
        </motion.div>
      </div>

      <p className="text-sm text-cream/75" onClick={(e) => e.stopPropagation()}>
        {current.caption ?? "Screen"} · {index + 1} / {count}
      </p>

      {count > 1 && (
        <div
          className="flex max-w-full gap-2 overflow-x-auto p-1"
          onClick={(e) => e.stopPropagation()}
        >
          {items.map((it, i) => (
            <button
              key={it.src}
              type="button"
              aria-label={`Show ${it.caption ?? `screen ${i + 1}`}`}
              aria-current={i === index}
              onClick={() => {
                setDir(i > index ? 1 : -1);
                setIndex(i);
              }}
              className={`relative h-14 shrink-0 overflow-hidden rounded-md border-2 transition ${
                it.kind === "mobile" ? "w-8" : "w-20"
              } ${i === index ? "border-amber" : "border-transparent opacity-60 hover:opacity-100"}`}
            >
              <Image
                src={it.src}
                alt=""
                fill
                sizes="80px"
                className="object-cover object-top"
              />
            </button>
          ))}
        </div>
      )}
    </motion.div>
  );
}
