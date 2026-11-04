import { ArrowRight } from "lucide-react";

type Variant = "primary" | "dark" | "outline" | "light";

const variants: Record<Variant, { shell: string; icon: string }> = {
  primary: {
    shell:
      "bg-amber text-ink border-ink shadow-[3px_3px_0_0_var(--color-ink)] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0_0_var(--color-ink)] active:translate-x-0 active:translate-y-0 active:shadow-[1px_1px_0_0_var(--color-ink)]",
    icon: "bg-ink text-amber",
  },
  dark: {
    shell: "bg-ink text-cream border-ink hover:bg-ink-soft hover:-translate-y-0.5",
    icon: "bg-amber text-ink",
  },
  outline: {
    shell: "bg-transparent text-ink border-ink hover:bg-ink hover:text-cream",
    icon: "bg-ink text-cream group-hover:bg-amber group-hover:text-ink",
  },
  light: {
    shell:
      "bg-cream text-ink border-cream hover:bg-amber hover:border-amber hover:-translate-y-0.5",
    icon: "bg-ink text-cream",
  },
};

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: Variant;
  /** Show the trailing arrow bubble. */
  arrow?: boolean;
  external?: boolean;
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: () => void;
  "aria-expanded"?: boolean;
  "aria-controls"?: string;
}

export function Button({
  children,
  href,
  variant = "primary",
  arrow = true,
  external = false,
  className = "",
  type = "button",
  disabled = false,
  onClick,
  ...aria
}: ButtonProps) {
  const v = variants[variant];
  const classes = [
    "group inline-flex min-h-11 items-center justify-center gap-2.5 rounded-full border-2 py-1.5 font-display text-sm font-semibold tracking-tight",
    "transition-[transform,box-shadow,background-color,color] duration-300 ease-out",
    arrow ? "pl-5 pr-1.5" : "px-5",
    "disabled:pointer-events-none disabled:opacity-50",
    v.shell,
    className,
  ].join(" ");

  const content = (
    <>
      <span>{children}</span>
      {arrow && (
        <span
          className={`grid h-7 w-7 shrink-0 place-items-center rounded-full transition-[transform,background-color,color] duration-300 group-hover:-rotate-45 ${v.icon}`}
          aria-hidden="true"
        >
          <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.5} />
        </span>
      )}
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        onClick={onClick}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...aria}
      >
        {content}
      </a>
    );
  }

  return (
    <button type={type} className={classes} disabled={disabled} onClick={onClick} {...aria}>
      {content}
    </button>
  );
}
