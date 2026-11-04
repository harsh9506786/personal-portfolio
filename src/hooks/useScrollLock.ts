"use client";

import { useEffect } from "react";

/** Locks page scroll while `locked` is true (mobile menu, modals). */
export function useScrollLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return;
    const previous = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = previous;
    };
  }, [locked]);
}
