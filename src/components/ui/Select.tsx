"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";

interface SelectProps {
  id: string;
  name: string;
  value: string;
  options: readonly string[];
  /** Text shown when nothing is chosen. */
  placeholder: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  /** Adds the placeholder as a selectable first item, so an optional field can be cleared. */
  clearable?: boolean;
  invalid?: boolean;
  describedBy?: string;
  /** Classes for the trigger button (pass the same classes your text inputs use). */
  className?: string;
}

/**
 * Themed, keyboard-accessible dropdown that replaces the native <select>
 * (whose option list can't be styled). Pattern: select-only combobox + listbox.
 */
export function Select({
  id,
  name,
  value,
  options,
  placeholder,
  onChange,
  onBlur,
  clearable = false,
  invalid = false,
  describedBy,
  className = "",
}: SelectProps) {
  const listId = useId();
  const wrapRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const [open, setOpen] = useState(false);

  const items = [
    ...(clearable ? [{ value: "", label: placeholder }] : []),
    ...options.map((o) => ({ value: o, label: o })),
  ];
  const selectedIndex = items.findIndex((i) => i.value === value);
  const [active, setActive] = useState(Math.max(selectedIndex, 0));
  const last = items.length - 1;

  function openList() {
    setActive(Math.max(selectedIndex, 0));
    setOpen(true);
  }

  function choose(index: number) {
    onChange(items[index].value);
    setOpen(false);
  }

  // Keep the highlighted option visible while moving with the keyboard
  useEffect(() => {
    if (!open) return;
    (listRef.current?.children[active] as HTMLElement | undefined)?.scrollIntoView({ block: "nearest" });
  }, [open, active]);

  // Close when tapping/clicking anywhere outside (Safari doesn't focus buttons, so blur alone isn't enough)
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) {
        setOpen(false);
        onBlur?.();
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open, onBlur]);

  function onKeyDown(e: React.KeyboardEvent<HTMLButtonElement>) {
    if (!open) {
      if (["ArrowDown", "ArrowUp", "Enter", " "].includes(e.key)) {
        e.preventDefault();
        openList();
      }
      return;
    }
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setActive((a) => Math.min(a + 1, last));
        break;
      case "ArrowUp":
        e.preventDefault();
        setActive((a) => Math.max(a - 1, 0));
        break;
      case "Home":
        e.preventDefault();
        setActive(0);
        break;
      case "End":
        e.preventDefault();
        setActive(last);
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        choose(active);
        break;
      case "Escape":
        e.preventDefault();
        setOpen(false);
        break;
      case "Tab":
        setOpen(false);
        break;
    }
  }

  return (
    <div
      ref={wrapRef}
      className="relative"
      onBlur={(e) => {
        if (!wrapRef.current?.contains(e.relatedTarget as Node | null)) {
          setOpen(false);
          onBlur?.();
        }
      }}
    >
      <button
        type="button"
        id={id}
        name={name}
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-activedescendant={open ? `${listId}-${active}` : undefined}
        aria-invalid={invalid}
        aria-describedby={describedBy}
        onClick={() => (open ? setOpen(false) : openList())}
        onKeyDown={onKeyDown}
        className={`${className} flex cursor-pointer items-center justify-between gap-3 text-left ${
          open ? "border-ink shadow-[3px_3px_0_0_var(--color-amber)]" : "hover:border-ink"
        }`}
      >
        <span className={`truncate ${value ? "text-ink" : "text-mute-light"}`}>{value || placeholder}</span>
        <ChevronDown
          className={`h-5 w-5 shrink-0 text-ink transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </button>

      <ul
        ref={listRef}
        id={listId}
        role="listbox"
        tabIndex={-1}
        className={`absolute inset-x-0 top-full z-30 mt-2 max-h-64 origin-top overflow-auto rounded-2xl border-2 border-ink bg-paper p-1.5 shadow-[4px_4px_0_0_var(--color-amber)] transition-[opacity,transform,visibility] duration-150 ${
          open ? "visible translate-y-0 scale-100 opacity-100" : "invisible -translate-y-1 scale-95 opacity-0"
        }`}
      >
        {items.map((item, i) => {
          const selected = item.value === value;
          const isActive = i === active;
          return (
            <li
              key={item.value || "__empty"}
              id={`${listId}-${i}`}
              role="option"
              aria-selected={selected}
              // keep focus on the button so blur/validation doesn't fire before the click lands
              onMouseDown={(e) => e.preventDefault()}
              onMouseEnter={() => setActive(i)}
              onClick={() => choose(i)}
              className={`flex cursor-pointer items-center justify-between gap-3 rounded-xl px-3.5 py-2.5 text-base transition-colors duration-100 ${
                isActive
                  ? "bg-amber text-ink"
                  : selected
                    ? "bg-cream-deep text-ink"
                    : item.value
                      ? "text-ink"
                      : "text-mute"
              } ${selected ? "font-bold" : "font-medium"}`}
            >
              <span>{item.label}</span>
              {selected && <Check className="h-4 w-4 shrink-0" strokeWidth={3} aria-hidden="true" />}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
