/**
 * Service illustrations: laptop and phone mockups with polished UI screens drawn as SVG.
 * No external images, so they stay crisp at any size and never break. Decorative, so
 * hidden from assistive tech.
 */
import type { ReactNode } from "react";

const INK = "var(--color-ink)";
const AMBER = "var(--color-amber)";
const SOFT = "var(--color-amber-soft)";
const PAPER = "var(--color-paper)";
const CREAM = "var(--color-cream)";
const GREY = "#d9d3c6";
const GREY_SOFT = "#efeae0";

type Pal = "sunset" | "ocean" | "violet" | "mint";

const palettes: Record<Pal, [string, string]> = {
  sunset: ["#fbbf24", "#f43f5e"],
  ocean: ["#22d3ee", "#3b82f6"],
  violet: ["#a78bfa", "#ec4899"],
  mint: ["#34d399", "#0ea5e9"],
};

/** Gradient defs for the scenic "photo" tiles. `p` keeps ids unique per illustration. */
function Grads({ p }: { p: string }) {
  return (
    <defs>
      {(Object.keys(palettes) as Pal[]).map((k) => (
        <linearGradient key={k} id={`${p}-${k}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={palettes[k][0]} />
          <stop offset="1" stopColor={palettes[k][1]} />
        </linearGradient>
      ))}
    </defs>
  );
}

/** A little landscape tile that reads as a photo / product image. */
function Scene({
  p,
  id,
  pal,
  x,
  y,
  w,
  h,
  r = 6,
}: {
  p: string;
  id: string;
  pal: Pal;
  x: number;
  y: number;
  w: number;
  h: number;
  r?: number;
}) {
  const cid = `${p}-${id}`;
  return (
    <g>
      <defs>
        <clipPath id={cid}>
          <rect x={x} y={y} width={w} height={h} rx={r} />
        </clipPath>
      </defs>
      <g clipPath={`url(#${cid})`}>
        <rect x={x} y={y} width={w} height={h} fill={`url(#${p}-${pal})`} />
        <circle cx={x + w * 0.72} cy={y + h * 0.3} r={Math.min(w, h) * 0.15} fill="#fff" opacity="0.85" />
        <path
          d={`M${x} ${y + h}V${y + h * 0.7}Q${x + w * 0.25} ${y + h * 0.46} ${x + w * 0.5} ${y + h * 0.7}T${x + w} ${y + h * 0.62}V${y + h}Z`}
          fill="#000"
          opacity="0.2"
        />
        <path
          d={`M${x} ${y + h}V${y + h * 0.84}Q${x + w * 0.3} ${y + h * 0.58} ${x + w * 0.62} ${y + h * 0.86}T${x + w} ${y + h * 0.78}V${y + h}Z`}
          fill="#000"
          opacity="0.34"
        />
      </g>
    </g>
  );
}

function Bar({ x, y, w, h = 4, fill = GREY }: { x: number; y: number; w: number; h?: number; fill?: string }) {
  return <rect x={x} y={y} width={w} height={h} rx={h / 2} fill={fill} />;
}

function Sparkle({ cx, cy, s, fill }: { cx: number; cy: number; s: number; fill: string }) {
  return (
    <path
      transform={`translate(${cx} ${cy}) scale(${s / 38}) translate(-200 -150)`}
      d="M200 112c2.6 21 14.4 32.8 36 38-21.6 5.2-33.4 17-36 38-2.6-21-14.4-32.8-36-38 21.6-5.2 33.4-17 36-38Z"
      fill={fill}
    />
  );
}

function Laptop({
  id,
  x,
  y,
  w,
  h,
  children,
}: {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
  children: ReactNode;
}) {
  return (
    <g>
      <defs>
        <clipPath id={id}>
          <rect x={x + 7} y={y + 7} width={w - 14} height={h - 14} rx={5} />
        </clipPath>
      </defs>
      <rect x={x} y={y} width={w} height={h} rx={12} fill={INK} />
      <rect x={x + 7} y={y + 7} width={w - 14} height={h - 14} rx={5} fill={PAPER} />
      <g clipPath={`url(#${id})`}>{children}</g>
      <rect x={x - 14} y={y + h} width={w + 28} height={9} rx={4.5} fill={INK} />
      <rect x={x + w / 2 - 22} y={y + h} width={44} height={4} rx={2} fill="#3a322a" />
    </g>
  );
}

function Phone({
  id,
  x,
  y,
  w,
  h,
  rot = 0,
  screen = PAPER,
  edge = INK,
  children,
}: {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
  rot?: number;
  screen?: string;
  edge?: string;
  children: ReactNode;
}) {
  const cx = x + w / 2;
  const cy = y + h / 2;
  return (
    <g transform={`rotate(${rot} ${cx} ${cy})`}>
      <defs>
        <clipPath id={id}>
          <rect x={x + 5} y={y + 5} width={w - 10} height={h - 10} rx={16} />
        </clipPath>
      </defs>
      <rect x={x} y={y} width={w} height={h} rx={21} fill={edge} stroke={INK} strokeWidth="2" />
      <rect x={x + 5} y={y + 5} width={w - 10} height={h - 10} rx={16} fill={screen} />
      <g clipPath={`url(#${id})`}>{children}</g>
      <rect x={cx - 13} y={y + 8} width={26} height={6} rx={3} fill={INK} />
    </g>
  );
}

/* ------------------------------------------------------------------ */

export function WebArt() {
  const p = "web";
  return (
    <svg viewBox="0 0 400 300" className="h-full w-full" aria-hidden="true">
      <Grads p={p} />
      <rect width="400" height="300" fill={SOFT} />
      <circle cx="352" cy="46" r="30" fill={AMBER} opacity="0.9" />
      <circle cx="30" cy="40" r="22" fill="none" stroke={INK} strokeOpacity="0.2" strokeWidth="2" strokeDasharray="4 6" />

      {/* Browser window: landing page */}
      <defs>
        <clipPath id="web-win">
          <rect x={44} y={34} width={262} height={196} rx={14} />
        </clipPath>
      </defs>
      <rect x={50} y={40} width={262} height={196} rx={14} fill={INK} />
      <rect x={44} y={34} width={262} height={196} rx={14} fill={PAPER} />
      <g clipPath="url(#web-win)">
        {/* title bar */}
        <rect x={44} y={34} width={262} height={22} fill={CREAM} />
        <circle cx={58} cy={45} r={4} fill={INK} />
        <circle cx={72} cy={45} r={4} fill={AMBER} />
        <circle cx={86} cy={45} r={4} fill="none" stroke={INK} strokeWidth="1.8" />
        <rect x={102} y={40} width={110} height={10} rx={5} fill={PAPER} />
        {/* nav */}
        <circle cx={60} cy={67} r={5} fill={AMBER} />
        <Bar x={70} y={65} w={28} h={4} fill={INK} />
        <Bar x={170} y={66} w={20} h={3} />
        <Bar x={198} y={66} w={20} h={3} />
        <Bar x={226} y={66} w={20} h={3} />
        <rect x={256} y={61} width={40} height={12} rx={6} fill={AMBER} />
        {/* hero */}
        <rect x={44} y={80} width={262} height={74} fill={CREAM} />
        <Bar x={58} y={92} w={100} h={9} fill={INK} />
        <Bar x={58} y={106} w={72} h={9} fill={INK} />
        <Bar x={58} y={123} w={94} />
        <Bar x={58} y={131} w={66} />
        <rect x={58} y={140} width={46} height={10} rx={5} fill={AMBER} />
        <Scene p={p} id="hero" pal="sunset" x={172} y={88} w={124} h={60} r={9} />
        {/* feature tiles */}
        {[58, 140, 222].map((fx, i) => (
          <g key={fx}>
            <Scene p={p} id={`f${i}`} pal={(["ocean", "violet", "mint"] as Pal[])[i]} x={fx} y={164} w={74} h={28} r={6} />
            <Bar x={fx} y={198} w={52} h={4} fill={INK} />
            <Bar x={fx} y={206} w={34} h={3} />
          </g>
        ))}
      </g>
      <rect x={44} y={34} width={262} height={196} rx={14} fill="none" stroke={INK} strokeWidth="4" />
      <path d="M44 56h262" stroke={INK} strokeWidth="3" />

      {/* Cursor on the button */}
      <path d="M284 70l0 15 4-4 3 7 3-1.4-3-6.6 6 0z" fill={INK} stroke={PAPER} strokeWidth="1.6" strokeLinejoin="round" />

      {/* Live badge */}
      <rect x={316} y={84} width={72} height={24} rx={12} fill={CREAM} stroke={INK} strokeWidth="3" />
      <circle cx={331} cy={96} r={4.5} fill="#22c55e" />
      <Bar x={341} y={93} w={36} h={5} fill={INK} />

      {/* Visitors growth card */}
      <rect x={256} y={200} width={132} height={86} rx={14} fill={INK} />
      <rect x={250} y={194} width={132} height={86} rx={14} fill={PAPER} stroke={INK} strokeWidth="3.5" />
      <Bar x={260} y={204} w={44} h={4} />
      <Bar x={260} y={214} w={44} h={9} fill={INK} />
      <rect x={312} y={213} width={60} height={12} rx={6} fill="#dcfce7" />
      <path d="M320 221l4-6 4 6z" fill="#16a34a" />
      <Bar x={332} y={216} w={32} h={4} fill="#16a34a" />
      <path d="M260 268L276 259L292 263L308 250L324 254L340 241L356 245L372 232V272H260Z" fill={AMBER} opacity="0.25" />
      <path d="M260 268L276 259L292 263L308 250L324 254L340 241L356 245L372 232" fill="none" stroke={AMBER} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={372} cy={232} r={3.4} fill={AMBER} stroke={INK} strokeWidth="1.6" />

      {/* Speed score card */}
      <rect x={24} y={214} width={108} height={74} rx={14} fill={AMBER} />
      <rect x={18} y={208} width={108} height={74} rx={14} fill={INK} stroke={INK} strokeWidth="3.5" />
      <circle cx={52} cy={245} r={20} fill="none" stroke="#3a322a" strokeWidth="6" />
      <circle
        cx={52}
        cy={245}
        r={20}
        fill="none"
        stroke={AMBER}
        strokeWidth="6"
        strokeLinecap="round"
        strokeDasharray="123 126"
        transform="rotate(-90 52 245)"
      />
      <text x={52} y={250.5} textAnchor="middle" fontSize="15" fontWeight="800" fill={CREAM} fontFamily="var(--font-display), sans-serif">
        98
      </text>
      <Bar x={82} y={232} w={34} h={5} fill={CREAM} />
      <Bar x={82} y={242} w={24} h={4} fill="#6b6358" />
      <rect x={82} y={253} width={32} height={10} rx={5} fill={AMBER} />
    </svg>
  );
}

export function MobileArt() {
  const p = "app";
  return (
    <svg viewBox="0 0 400 300" className="h-full w-full" aria-hidden="true">
      <Grads p={p} />
      <rect width="400" height="300" fill="var(--color-ink-soft)" />
      <circle cx="58" cy="256" r="62" fill={AMBER} opacity="0.92" />
      <circle cx="356" cy="40" r="26" fill="none" stroke={AMBER} strokeWidth="4" />

      {/* Back phone: shopping app */}
      <Phone id="app-a" x={62} y={34} w={118} h={232} rot={-7}>
        <rect x={67} y={39} width={108} height={222} fill={PAPER} />
        <Bar x={76} y={52} w={48} h={6} fill={INK} />
        <Bar x={76} y={62} w={32} h={4} />
        <circle cx={160} cy={58} r={8} fill={AMBER} />
        <rect x={76} y={76} width={92} height={14} rx={7} fill={GREY_SOFT} />
        <circle cx={85} cy={83} r={3} fill="none" stroke={GREY} strokeWidth="1.5" />
        <rect x={76} y={98} width={28} height={10} rx={5} fill={AMBER} />
        <rect x={107} y={98} width={26} height={10} rx={5} fill={GREY_SOFT} />
        <rect x={136} y={98} width={26} height={10} rx={5} fill={GREY_SOFT} />
        {[76, 124].map((cx, i) => (
          <g key={cx}>
            <rect x={cx} y={116} width={44} height={68} rx={8} fill={GREY_SOFT} />
            <Scene p={p} id={`pa${i}`} pal={i ? "mint" : "sunset"} x={cx + 3} y={119} w={38} h={38} r={6} />
            <Bar x={cx + 4} y={162} w={28} h={3} fill={INK} />
            <rect x={cx + 4} y={170} width={20} height={9} rx={4.5} fill={AMBER} />
          </g>
        ))}
        <Scene p={p} id="feat" pal="violet" x={76} y={192} w={92} h={34} r={8} />
        <rect x={67} y={238} width={108} height={23} fill={PAPER} />
        <path d="M67 238h108" stroke={GREY} strokeWidth="1" />
        {[88, 113, 138, 163].map((cx, i) => (
          <circle key={cx} cx={cx} cy={250} r={4} fill={i === 0 ? AMBER : GREY} />
        ))}
      </Phone>

      {/* Front phone: dashboard app (dark) */}
      <Phone id="app-b" x={206} y={24} w={128} h={250} rot={6} screen={INK} edge="#3a322a">
        <rect x={211} y={29} width={118} height={240} fill={INK} />
        <circle cx={229} cy={52} r={9} fill={AMBER} />
        <Bar x={243} y={46} w={50} h={6} fill={CREAM} />
        <Bar x={243} y={56} w={32} h={4} fill="#6b6358" />
        <rect x={219} y={70} width={102} height={70} rx={12} fill={AMBER} />
        <Bar x={229} y={80} w={48} h={9} fill={INK} />
        <Bar x={229} y={93} w={30} h={4} fill="#7c4a03" />
        <path d="M229 130L243 120L257 125L271 110L285 115L299 100L313 106" fill="none" stroke={INK} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx={299} cy={100} r={3.4} fill={INK} />
        {[233, 260, 287, 314].map((cx, i) => (
          <g key={cx}>
            <circle cx={cx} cy={160} r={10} fill="var(--color-ink-soft)" stroke={CREAM} strokeOpacity="0.25" />
            <circle cx={cx} cy={160} r={3.4} fill={i === 0 ? AMBER : CREAM} />
          </g>
        ))}
        {[182, 208, 234].map((y, i) => (
          <g key={y}>
            <rect x={219} y={y} width={102} height={22} rx={8} fill="var(--color-ink-soft)" />
            <circle cx={232} cy={y + 11} r={6.5} fill={[AMBER, CREAM, SOFT][i]} />
            <Bar x={244} y={y + 6} w={46} h={4} fill={CREAM} />
            <Bar x={244} y={y + 13} w={28} h={3} fill="#6b6358" />
            <Bar x={298} y={y + 9} w={16} h={4} fill={AMBER} />
          </g>
        ))}
        <rect x={252} y={262} width={54} height={4} rx={2} fill={CREAM} opacity="0.45" />
      </Phone>
    </svg>
  );
}

export function AiArt() {
  const p = "ai";
  return (
    <svg viewBox="0 0 400 300" className="h-full w-full" aria-hidden="true">
      <Grads p={p} />
      <rect width="400" height="300" fill="var(--color-amber-deep)" />
      <circle cx="200" cy="150" r="136" fill="none" stroke={INK} strokeOpacity="0.2" strokeWidth="2" strokeDasharray="4 8" />
      <circle cx="372" cy="262" r="40" fill={AMBER} opacity="0.6" />

      {/* Laptop: AI assistant chat */}
      <Laptop id="ai-lap" x={22} y={44} w={252} h={156}>
        <rect x={29} y={51} width={238} height={142} fill={PAPER} />
        {/* sidebar */}
        <rect x={29} y={51} width={46} height={142} fill="#f6f2ea" />
        <rect x={35} y={58} width={34} height={11} rx={5.5} fill={AMBER} />
        {[78, 90, 102, 114].map((y, i) => (
          <Bar key={y} x={35} y={y} w={i === 0 ? 30 : 24 + (i % 2) * 6} h={4} fill={i === 0 ? INK : GREY} />
        ))}
        {/* header */}
        <rect x={75} y={51} width={192} height={18} fill={PAPER} />
        <path d="M75 69h192" stroke={GREY_SOFT} strokeWidth="1.5" />
        <circle cx={88} cy={60} r={6} fill={INK} />
        <Sparkle cx={88} cy={60} s={4.5} fill={AMBER} />
        <Bar x={99} y={57} w={44} h={5} fill={INK} />
        {/* messages */}
        <rect x={168} y={76} width={90} height={17} rx={8.5} fill={INK} />
        <Bar x={176} y={81} w={62} h={3} fill={CREAM} />
        <Bar x={176} y={87} w={40} h={3} fill={CREAM} />
        <circle cx={88} cy={108} r={6} fill={INK} />
        <Sparkle cx={88} cy={108} s={4.5} fill={AMBER} />
        <rect x={99} y={98} width={132} height={40} rx={10} fill={GREY_SOFT} />
        <Bar x={107} y={106} w={112} h={4} fill={INK} />
        <Bar x={107} y={115} w={96} h={4} />
        <Bar x={107} y={124} w={64} h={4} />
        <rect x={196} y={146} width={62} height={14} rx={7} fill={INK} />
        <Bar x={204} y={151} w={44} h={3} fill={CREAM} />
        <rect x={99} y={166} width={36} height={13} rx={6.5} fill={GREY_SOFT} />
        {[110, 117, 124].map((cx) => (
          <circle key={cx} cx={cx} cy={172.5} r={2} fill={AMBER} />
        ))}
        {/* input */}
        <rect x={83} y={181} width={176} height={10} rx={5} fill={PAPER} stroke={GREY} strokeWidth="1.2" />
        <circle cx={251} cy={186} r={3.6} fill={AMBER} />
      </Laptop>

      {/* Phone: customer chatbot */}
      <Phone id="ai-ph" x={244} y={82} w={108} h={198} rot={5}>
        <rect x={249} y={87} width={98} height={188} fill="#f6f2ea" />
        <rect x={249} y={87} width={98} height={26} fill={INK} />
        <circle cx={262} cy={102} r={7} fill={AMBER} />
        <Sparkle cx={262} cy={102} s={5} fill={INK} />
        <Bar x={274} y={96} w={42} h={5} fill={CREAM} />
        <Bar x={274} y={105} w={26} h={3} fill="#6b6358" />
        <rect x={256} y={122} width={64} height={30} rx={9} fill={PAPER} />
        <Bar x={262} y={129} w={50} h={3.5} fill={INK} />
        <Bar x={262} y={137} w={38} h={3.5} />
        <rect x={288} y={160} width={52} height={16} rx={8} fill={AMBER} />
        <Bar x={295} y={166} w={36} h={3.5} fill={INK} />
        <rect x={256} y={184} width={72} height={30} rx={9} fill={PAPER} />
        <Bar x={262} y={191} w={56} h={3.5} fill={INK} />
        <Bar x={262} y={199} w={42} h={3.5} />
        {[0, 1].map((i) => (
          <rect key={i} x={256 + i * 44} y={222} width={40} height={13} rx={6.5} fill="none" stroke={INK} strokeWidth="1.4" />
        ))}
        <rect x={256} y={252} width={84} height={14} rx={7} fill={PAPER} stroke={GREY} strokeWidth="1.2" />
        <circle cx={331} cy={259} r={4} fill={AMBER} />
      </Phone>

      {/* Floating automation chips */}
      <g>
        <rect x={290} y={30} width={86} height={30} rx={11} fill={CREAM} stroke={INK} strokeWidth="3" />
        <circle cx={306} cy={45} r={7.5} fill={INK} />
        <path d="M302.5 45l2.6 2.8 5-5.4" fill="none" stroke={AMBER} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <Bar x={320} y={40} w={44} h={4} fill={INK} />
        <Bar x={320} y={47} w={28} h={3} />
      </g>
      <g>
        <rect x={20} y={222} width={92} height={30} rx={11} fill={INK} />
        <circle cx={36} cy={237} r={7.5} fill={AMBER} />
        <Sparkle cx={36} cy={237} s={5} fill={INK} />
        <Bar x={50} y={232} w={50} h={4} fill={CREAM} />
        <Bar x={50} y={239} w={32} h={3} fill="#6b6358" />
      </g>
    </svg>
  );
}
