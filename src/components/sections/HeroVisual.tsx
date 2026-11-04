import Image from "next/image";
import {
  Bot,
  Check,
  Globe,
  Sparkles,
  Smartphone,
  TrendingUp,
  Zap,
} from "lucide-react";

/** A 16-point sunburst, computed once, used as a clip-path. */
const SUNBURST = (() => {
  const points: string[] = [];
  const spikes = 16;
  for (let i = 0; i < spikes * 2; i++) {
    const radius = i % 2 === 0 ? 50 : 40;
    const angle = (Math.PI * i) / spikes - Math.PI / 2;
    points.push(
      `${(50 + radius * Math.cos(angle)).toFixed(2)}% ${(50 + radius * Math.sin(angle)).toFixed(2)}%`,
    );
  }
  return `polygon(${points.join(",")})`;
})();

/** 4-point sparkle used as decoration. */
function Spark({
  className,
  delay = "0s",
}: {
  className: string;
  delay?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`absolute animate-float ${className}`}
      style={{ animationDelay: delay }}
      aria-hidden="true"
    >
      <path
        d="M12 0c1 7 5 11 12 12-7 1-11 5-12 12-1-7-5-11-12-12C7 11 11 7 12 0Z"
        fill="currentColor"
      />
    </svg>
  );
}

interface ChipProps {
  icon: React.ReactNode;
  label: string;
  className: string;
  delay: string;
  rotate: string;
}

function Chip({ icon, label, className, delay, rotate }: ChipProps) {
  return (
    <div
      className={`absolute flex animate-float items-center gap-[1cqw] rounded-full border-[0.4cqw] border-ink bg-paper px-[2.6cqw] py-[1.2cqw] font-display text-[max(10px,2.6cqw)] font-bold whitespace-nowrap text-ink shadow-[0.8cqw_0.8cqw_0_0_var(--color-ink)] ${className}`}
      style={{ animationDelay: delay, ["--r" as string]: rotate }}
    >
      {icon}
      {label}
    </div>
  );
}

/**
 * Hero illustration: the avatar waving hello on a rotating sunburst, with a greeting
 * bubble and floating chips. The hand is a separate layer that rotates at the wrist, so
 * the wave is real, not a sway. Sizes use container-query units (cqw) so it scales
 * smoothly from small phones to desktop.
 */
export function HeroVisual() {
  const icon = "h-[3cqw] w-[3cqw]";

  return (
    <div
      className="relative mx-auto aspect-square w-full max-w-[34rem] [container-type:inline-size]"
      role="img"
      aria-label="Illustrated avatar of Harshvardhan waving hello"
    >
      {/* Sunburst */}
      <div
        className="absolute inset-[4cqw] animate-spin-slow bg-amber will-change-transform"
        style={{ clipPath: SUNBURST }}
      />
      <div className="absolute inset-[18cqw] rounded-full bg-amber-soft/70" />

      {/* Avatar: the hand sits behind the body and rotates at the wrist */}
      <div className="absolute top-[5cqw] left-[18cqw] aspect-[800/1040] w-[64cqw]">
        <Image
          src="/avatar/hero-wave-hand.webp"
          alt=""
          fill
          sizes="(min-width: 1024px) 24rem, 70vw"
          quality={90}
          className="origin-[16.1%_65.2%] animate-wave will-change-transform"
        />
        <Image
          src="/avatar/hero-wave-base.webp"
          alt=""
          fill
          priority
          sizes="(min-width: 1024px) 24rem, 70vw"
          quality={90}
          className="[mask-image:linear-gradient(to_bottom,#000_84%,transparent_100%)]"
        />
      </div>

      {/* Name tag over the faded bottom edge */}
      <div className="absolute bottom-[1.5cqw] left-1/2 flex -translate-x-1/2 items-center gap-[1.6cqw] rounded-full border-[0.5cqw] border-ink bg-paper px-[3.4cqw] py-[1.6cqw] whitespace-nowrap shadow-[1cqw_1cqw_0_0_var(--color-ink)]">
        <span className="h-[2.4cqw] w-[2.4cqw] rounded-full bg-amber" />
        <span className="font-display text-[max(11px,3.2cqw)] leading-none font-extrabold text-ink">
          Harshvardhan
        </span>
        <span className="font-display text-[max(9px,2.4cqw)] leading-none font-bold text-mute">
          Web · App · AI
        </span>
      </div>

      {/* Greeting bubble */}
      <div
        className="absolute top-[3cqw] left-[0.5cqw] animate-pop"
        style={{ animationDelay: "0.5s" }}
      >
        <div className="relative rounded-[2.4cqw] border-[0.5cqw] border-ink bg-paper px-[3cqw] py-[1.8cqw] font-display text-[max(11px,3.1cqw)] leading-tight font-extrabold whitespace-nowrap text-ink shadow-[0.9cqw_0.9cqw_0_0_var(--color-ink)]">
          Hello! 👋
          <span className="ml-[0.4cqw] font-bold text-amber-deep">Welcome</span>
          <span className="absolute -bottom-[2.1cqw] left-[7cqw] h-[3.4cqw] w-[3.4cqw] rotate-45 border-r-[0.5cqw] border-b-[0.5cqw] border-ink bg-paper" />
        </div>
      </div>

      {/* Floating UI extras */}
      <Spark
        className="top-[2cqw] right-[30cqw] h-[4.5cqw] w-[4.5cqw] text-ink"
        delay="-1.5s"
      />
      <Spark
        className="top-[60cqw] left-[0cqw] h-[5cqw] w-[5cqw] text-amber-deep"
        delay="-3.5s"
      />
      <Spark
        className="right-[1cqw] bottom-[3cqw] h-[5.5cqw] w-[5.5cqw] text-ink"
        delay="-2.5s"
      />
      <div
        className="absolute top-[21cqw] left-[1cqw] flex animate-float items-center gap-[1cqw] rounded-full border-[0.4cqw] border-ink bg-paper px-[2cqw] py-[0.9cqw] font-display text-[max(9px,2.3cqw)] font-bold text-ink shadow-[0.7cqw_0.7cqw_0_0_var(--color-ink)]"
        style={{ ["--r" as string]: "-4deg", animationDelay: "-0.5s" }}
      >
        <Check
          className="h-[2.6cqw] w-[2.6cqw] text-amber-deep"
          strokeWidth={3.4}
        />
        Available
      </div>
      <div
        className="absolute bottom-[18cqw] left-[0cqw] w-[24cqw] animate-float-slow rounded-[2cqw] border-[0.5cqw] border-ink bg-paper p-[2cqw] shadow-[1cqw_1cqw_0_0_var(--color-ink)]"
        style={{ ["--r" as string]: "-3deg", animationDelay: "-2.2s" }}
      >
        <div className="flex items-center justify-between">
          <span className="h-[1.2cqw] w-[7cqw] rounded-full bg-ink" />
          <TrendingUp
            className="h-[3cqw] w-[3cqw] text-amber-deep"
            strokeWidth={3}
          />
        </div>
        <svg
          viewBox="0 0 100 40"
          className="mt-[1.6cqw] w-full"
          aria-hidden="true"
        >
          <path
            d="M2 34 22 26 40 30 62 14 82 18 98 5"
            fill="none"
            stroke="var(--color-amber-deep)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="98" cy="5" r="4" fill="var(--color-ink)" />
        </svg>
      </div>

      {/* Floating chips */}
      <Chip
        icon={<Globe className={icon} strokeWidth={2.6} />}
        label="Websites"
        className="top-[27cqw] right-[0cqw]"
        delay="-1s"
        rotate="-3deg"
      />
      <Chip
        icon={<Sparkles className={icon} strokeWidth={2.6} />}
        label="AI Chatbots"
        className="top-[43cqw] right-[0cqw]"
        delay="-3s"
        rotate="4deg"
      />
      <Chip
        icon={<Smartphone className={icon} strokeWidth={2.6} />}
        label="Mobile Apps"
        className="top-[59cqw] right-[1cqw]"
        delay="-4s"
        rotate="-5deg"
      />
      <Chip
        icon={<Bot className={icon} strokeWidth={2.6} />}
        label="Automation"
        className="bottom-[14cqw] right-[3cqw]"
        delay="-2.4s"
        rotate="3deg"
      />
      <Chip
        icon={<Zap className={icon} strokeWidth={2.6} />}
        label="Fast Delivery"
        className="top-[8cqw] right-[12cqw]"
        delay="-5s"
        rotate="5deg"
      />
    </div>
  );
}
