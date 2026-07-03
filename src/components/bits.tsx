import { useEffect, useState, type ReactNode } from "react";
import { Check, Minus, Plus } from "lucide-react";
import { useReveal } from "../lib/hooks";
import { useStore } from "../lib/store";

/** Scroll-reveal wrapper (one-shot). */
export function Reveal({
  children,
  delay = 0,
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  delay?: 0 | 1 | 2 | 3;
  className?: string;
  as?: "div" | "section" | "article" | "li";
}) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <Tag
      ref={ref as never}
      className={`reveal${delay ? ` reveal-delay-${delay}` : ""}${className ? ` ${className}` : ""}`}
    >
      {children}
    </Tag>
  );
}

/** Eyebrow + display title + optional lede. */
export function SectionHead({
  eyebrow,
  title,
  lede,
  center = false,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  lede?: string;
  center?: boolean;
  children?: ReactNode;
}) {
  return (
    <Reveal className={`section-head${center ? " is-center" : ""}`}>
      <span className={`eyebrow${center ? " eyebrow-center" : ""}`}>{eyebrow}</span>
      <div className="row">
        <h2 className="display-lg" style={{ maxWidth: "24ch", textWrap: "balance" }}>
          {title}
        </h2>
        {children}
      </div>
      {lede && <p className="lede">{lede}</p>}
    </Reveal>
  );
}

export function QtyStepper({
  qty,
  onDelta,
  label,
}: {
  qty: number;
  onDelta: (delta: number) => void;
  label?: string;
}) {
  return (
    <span className="qty-stepper" role="group" aria-label={label ?? "Quantity"}>
      <button type="button" aria-label="Decrease quantity" onClick={() => onDelta(-1)}>
        <Minus size={16} strokeWidth={1.7} />
      </button>
      <span className="tnum" aria-live="polite">
        {qty}
      </span>
      <button type="button" aria-label="Increase quantity" onClick={() => onDelta(1)}>
        <Plus size={16} strokeWidth={1.7} />
      </button>
    </span>
  );
}

/** One testimonial at a time, fading through — pauses on hover/focus. */
export function QuoteCarousel({
  items,
  interval = 6000,
}: {
  items: Array<{ quote: string; who: string; where: string }>;
  interval?: number;
}) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || items.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = window.setTimeout(() => setActive((a) => (a + 1) % items.length), interval);
    return () => window.clearTimeout(t);
  }, [active, paused, items.length, interval]);

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="quote-stage" aria-live="polite">
        {items.map((t, i) => (
          <figure key={t.who} className={`quote-slide${i === active ? " is-active" : ""}`} style={{ margin: 0 }} aria-hidden={i !== active}>
            <blockquote style={{ margin: 0 }}>
              <q>{t.quote}</q>
            </blockquote>
            <figcaption className="quote-attr">
              <span className="who">{t.who}</span>
              <span className="where">{t.where}</span>
            </figcaption>
          </figure>
        ))}
      </div>
      <div className="quote-dots" role="tablist" aria-label="More voices">
        {items.map((t, i) => (
          <button
            key={t.who}
            className={`quote-dot${i === active ? " is-active" : ""}`}
            role="tab"
            aria-selected={i === active}
            aria-label={`Quote from ${t.who}`}
            onClick={() => setActive(i)}
          />
        ))}
      </div>
    </div>
  );
}

export function Toast() {
  const { toast } = useStore();
  if (!toast) return null;
  return (
    <div className="toast" role="status">
      <Check size={16} strokeWidth={2} />
      {toast}
    </div>
  );
}
