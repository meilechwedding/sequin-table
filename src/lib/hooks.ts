import { useEffect, useRef, useState } from "react";

/** Adds .is-visible once the element scrolls into view (one-shot). */
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("is-visible");
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}

/** True once the page has scrolled past the threshold. */
export function useScrolled(threshold = 24) {
  const [scrolled, setScrolled] = useState(() => window.scrollY > threshold);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);
  return scrolled;
}

/**
 * Pointer-driven 3D tilt: sets --tx/--ty custom properties on the element,
 * which the card's transform consumes. Max ±maxDeg. No-op for touch-only
 * pointers and reduced-motion users.
 */
export function useTilt(maxDeg = 3.5) {
  const onPointerMove = (e: React.PointerEvent<HTMLElement>) => {
    if (e.pointerType !== "mouse") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.setProperty("--tx", (x * maxDeg).toFixed(2));
    el.style.setProperty("--ty", (-y * maxDeg).toFixed(2));
  };
  const onPointerLeave = (e: React.PointerEvent<HTMLElement>) => {
    const el = e.currentTarget;
    el.style.setProperty("--tx", "0");
    el.style.setProperty("--ty", "0");
  };
  return { onPointerMove, onPointerLeave };
}

export function useDocTitle(title: string) {
  useEffect(() => {
    document.title = title ? `${title} · Sequin Table` : "Sequin Table — Upscale Table Linen for Events & Home";
  }, [title]);
}
