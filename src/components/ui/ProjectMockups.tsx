"use client";

import { useState } from "react";
import Image from "next/image";
import type { WebProject } from "@/types";

/**
 * Frames follow the screenshot's real shape, so nothing is cropped or stretched.
 * (min/max keep very tall or very wide images from breaking the layout.)
 */
export function useImageRatio(initial: number, min: number, max: number) {
  const [ratio, setRatio] = useState(initial);
  const onLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const { naturalWidth: w, naturalHeight: h } = e.currentTarget;
    if (w && h) setRatio(Math.min(max, Math.max(min, w / h)));
  };
  return { ratio, onLoad };
}

/** Monitor sizes are px values from a 560px-wide design, converted to cqw so the monitor scales. */
const m = (px: number) => `${((px * 100) / 560).toFixed(3)}cqw`;

const METAL = "linear-gradient(145deg,#8a8a90 0%,#303034 28%,#58585e 52%,#1b1b1e 100%)";
const STAND_METAL = "linear-gradient(90deg,#2c2c30,#8a8a90 50%,#2c2c30)";

/**
 * Desktop monitor frame (same style as the phone): metal edge, black bezel with a camera dot,
 * the screenshot as the screen, and a stand. `children` are drawn on top of the screen
 * (used for the light sweep).
 */
export function DesktopMock({
  project,
  priority = false,
  children,
}: {
  project: WebProject;
  priority?: boolean;
  children?: React.ReactNode;
}) {
  const { ratio, onLoad } = useImageRatio(16 / 10, 1.3, 2);

  return (
    <div className="relative w-full [container-type:inline-size]">
      {/* monitor */}
      <div
        style={{
          borderRadius: m(16),
          padding: m(3),
          background: METAL,
          boxShadow: "0 24px 40px -20px rgba(0,0,0,0.65)",
        }}
      >
        <div
          className="relative bg-black"
          style={{ borderRadius: m(13), padding: `${m(13)} ${m(13)} ${m(28)}` }}
        >
          {/* camera */}
          <span
            aria-hidden="true"
            className="absolute left-1/2 -translate-x-1/2 rounded-full bg-[#2a2a2e]"
            style={{ top: m(4.5), width: m(4), height: m(4) }}
          />
          {/* chin dot */}
          <span
            aria-hidden="true"
            className="absolute left-1/2 -translate-x-1/2 rounded-full bg-[#2a2a2e]"
            style={{ bottom: m(10), width: m(7), height: m(7) }}
          />
          {/* screen */}
          <div
            className="relative overflow-hidden"
            style={{ aspectRatio: ratio, borderRadius: m(5), background: "#0b0b0b" }}
          >
            <Image
              src={project.desktopImage}
              onLoad={onLoad}
              alt={`${project.name} website on desktop`}
              fill
              sizes="(min-width: 1024px) 40rem, 90vw"
              quality={90}
              priority={priority}
              className="object-cover object-top"
            />
            {children}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              style={{
                background: "linear-gradient(125deg,rgba(255,255,255,0.08) 0%,rgba(255,255,255,0) 38%)",
              }}
            />
          </div>
        </div>
      </div>

      {/* stand */}
      <div
        aria-hidden="true"
        className="mx-auto"
        style={{
          width: m(120),
          height: m(42),
          marginTop: m(-1),
          background: STAND_METAL,
          clipPath: "polygon(16% 0, 84% 0, 100% 100%, 0 100%)",
        }}
      />
      <div
        aria-hidden="true"
        className="mx-auto"
        style={{
          width: m(250),
          height: m(10),
          borderRadius: `${m(4)} ${m(4)} ${m(12)} ${m(12)}`,
          background: STAND_METAL,
          boxShadow: "0 10px 14px -8px rgba(0,0,0,0.6)",
        }}
      />
    </div>
  );
}

/** Design size of the frame in px (width). Every inner size below is a px value from that design,
 *  converted to cqw so the whole phone scales with whatever width it is given. */
const q = (px: number) => `${((px * 100) / 240).toFixed(3)}cqw`;

/**
 * Screenshot folders that were taken on a real phone: they already contain their own status bar
 * and navigation bar, so the frame must not draw a second set on top of them.
 * Folders not listed here are treated as clean app screenshots (a status bar is drawn for them).
 * Add a folder like "/screenshots/my-app/" here when its screenshots come straight from a device.
 */
const DEVICE_SCREENSHOTS = ["/screenshots/shrutika/"];

interface PhoneMockProps {
  name: string;
  src: string;
  /** Colour of the status-bar strip: match the top of the screenshot. */
  statusBg?: string;
  /** "dark" icons for light screenshots, "light" icons for dark ones. */
  statusTone?: "dark" | "light";
  /** Colour of the strip under the app (like the iPhone bottom safe area). */
  bottomBg?: string;
}

/**
 * iPhone-style frame, the same size and shape for every project: titanium bezel, dynamic island,
 * side buttons. Clean app screenshots get a drawn status bar and bottom safe area; screenshots
 * taken on a real device (see DEVICE_SCREENSHOTS) already have theirs, so they fill the screen.
 * Screenshots are served as-is (no re-compression) to stay sharp.
 */
export function PhoneMock({
  name,
  src,
  statusBg = "#fdf9f3",
  statusTone = "dark",
  bottomBg = "#fdf9f3",
}: PhoneMockProps) {
  const device = DEVICE_SCREENSHOTS.some((dir) => src.startsWith(dir));
  const ink = statusTone === "dark" ? "#1a1a1a" : "#ffffff";

  const button = (top: string, height: number, side: "left" | "right"): React.CSSProperties => ({
    position: "absolute",
    top,
    height: q(height),
    width: q(3),
    ...(side === "left" ? { left: q(-2.5) } : { right: q(-2.5) }),
    borderRadius: side === "left" ? `${q(3)} 0 0 ${q(3)}` : `0 ${q(3)} ${q(3)} 0`,
    background: "linear-gradient(90deg,#2a2a2e,#505055,#2a2a2e)",
  });

  return (
    // fixed shape (like a real iPhone), so every phone on the site is exactly the same size
    <div className="relative w-full [container-type:inline-size]" style={{ aspectRatio: "1 / 2.06" }}>
      {/* side buttons: action, volume up, volume down, power */}
      <span aria-hidden="true" style={button("15%", 26, "left")} />
      <span aria-hidden="true" style={button("23%", 46, "left")} />
      <span aria-hidden="true" style={button("33%", 46, "left")} />
      <span aria-hidden="true" style={button("28%", 74, "right")} />

      {/* titanium frame */}
      <div
        className="absolute inset-0"
        style={{
          borderRadius: q(42),
          padding: q(3),
          background: "linear-gradient(145deg,#8a8a90 0%,#303034 28%,#58585e 52%,#1b1b1e 100%)",
          boxShadow: "0 18px 36px -14px rgba(0,0,0,0.6)",
        }}
      >
        {/* black bezel */}
        <div className="h-full w-full bg-black" style={{ borderRadius: q(39), padding: q(7) }}>
          {/* screen */}
          <div
            className="relative flex h-full w-full flex-col overflow-hidden"
            style={{ borderRadius: q(32), background: "#0b0b0b" }}
          >
            {/* status bar (clean screenshots only) */}
            {!device && (
              <div
                aria-hidden="true"
                className="relative z-10 flex shrink-0 items-center justify-between"
                style={{ height: q(34), padding: `0 ${q(15)} 0 ${q(17)}`, background: statusBg, color: ink }}
              >
                <span style={{ fontSize: q(10), fontWeight: 600, letterSpacing: q(0.2) }}>9:41</span>
                <span className="flex items-center" style={{ gap: q(4) }}>
                  <svg style={{ width: q(13), height: q(9) }} viewBox="0 0 13 9" fill={ink}>
                    <rect x="0" y="6" width="2" height="3" rx="0.6" />
                    <rect x="3.6" y="4" width="2" height="5" rx="0.6" />
                    <rect x="7.2" y="2" width="2" height="7" rx="0.6" />
                    <rect x="10.8" y="0" width="2" height="9" rx="0.6" />
                  </svg>
                  <svg style={{ width: q(12), height: q(9) }} viewBox="0 0 12 9" fill="none">
                    <path d="M1 3.2a7.2 7.2 0 0 1 10 0M3 5.3a4.3 4.3 0 0 1 6 0" stroke={ink} strokeWidth="1.2" strokeLinecap="round" />
                    <circle cx="6" cy="7.6" r="1.1" fill={ink} />
                  </svg>
                  <svg style={{ width: q(19), height: q(9) }} viewBox="0 0 19 9" fill="none">
                    <rect x="0.5" y="0.5" width="15.5" height="8" rx="2.4" stroke={ink} strokeOpacity="0.5" />
                    <rect x="2" y="2" width="12.5" height="5" rx="1.3" fill={ink} />
                    <rect x="17" y="3" width="1.6" height="3" rx="0.8" fill={ink} fillOpacity="0.5" />
                  </svg>
                </span>
              </div>
            )}

            {/* dynamic island */}
            <div
              aria-hidden="true"
              className="absolute left-1/2 z-20 bg-black"
              style={{ top: q(7.5), width: q(58), height: q(20), borderRadius: 999, transform: "translateX(-50%)" }}
            />

            {/* screenshot */}
            <div className="relative min-h-0 flex-1">
              <Image
                src={src}
                alt={`${name} on mobile`}
                fill
                unoptimized
                sizes="(min-width: 1024px) 20rem, 60vw"
                draggable={false}
                className="object-cover object-top select-none"
              />
            </div>

            {/* bottom safe area (clean screenshots only) */}
            {!device && <div aria-hidden="true" className="shrink-0" style={{ height: q(18), background: bottomBg }} />}

            {/* glass reflection */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 z-30"
              style={{ background: "linear-gradient(125deg,rgba(255,255,255,0.09) 0%,rgba(255,255,255,0) 38%)" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}