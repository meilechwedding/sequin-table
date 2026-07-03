import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { heroSlides, homeCopy } from "../data/site";
import { formatPrice } from "../data/products";
import { productById } from "../lib/store";

const INTERVAL = 7000;

export default function Hero() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [chipSwap, setChipSwap] = useState(false);
  const timer = useRef<number | null>(null);

  const slides = useMemo(
    () =>
      heroSlides
        .map((slide) => ({ ...slide, product: productById(slide.productId) }))
        .filter((slide) => slide.product),
    [],
  );

  const go = useCallback(
    (next: number) => {
      setChipSwap(true);
      window.setTimeout(() => {
        setActive(((next % slides.length) + slides.length) % slides.length);
        setChipSwap(false);
      }, 220);
    },
    [slides.length],
  );

  // autoplay — pauses on hover/focus and for reduced-motion users
  useEffect(() => {
    if (paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    timer.current = window.setTimeout(() => go(active + 1), INTERVAL);
    return () => {
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, [active, paused, go]);

  // preload the cloth cutouts so slides never pop in
  useEffect(() => {
    slides.forEach((slide) => {
      const img = new Image();
      img.src = slide.image;
    });
  }, [slides]);

  const current = slides[active];
  if (!current?.product) return null;
  const isRental = current.product.price === 0;

  return (
    <section
      className="hero on-dark"
      aria-label="Featured linens"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="hero-tint" style={{ ["--stage-tint" as string]: current.tint }} aria-hidden />

      <div className="hero-inner">
        <div className="hero-copy">
          <span className="eyebrow">{homeCopy.heroEyebrow}</span>
          <h1 className="hero-title">
            {homeCopy.heroTitleA} <span className="serif-accent">{homeCopy.heroTitleAccent}</span>{" "}
            {homeCopy.heroTitleB}
          </h1>
          <p className="hero-sub">{homeCopy.heroSub}</p>
          <div className="hero-ctas">
            <Link to="/rentals" className="btn btn-gold">
              Explore Rentals
            </Link>
            <Link to="/shop" className="btn btn-ghost">
              Shop Home Linen
            </Link>
          </div>
        </div>

        <div className="hero-stage">
          {slides.map((slide, index) => (
            <div
              key={slide.productId}
              className={`hero-slide${index === active ? " is-active" : ""}`}
              aria-hidden={index !== active}
            >
              <Link to={`/product/${slide.product!.handle}`} tabIndex={index === active ? 0 : -1} aria-label={`View ${slide.product!.title}`}>
                <img
                  src={slide.image}
                  alt={index === active ? slide.product!.title : ""}
                  width={720}
                  height={720}
                  loading={index === 0 ? "eager" : "lazy"}
                  {...(index === 0 ? { fetchpriority: "high" as const } : {})}
                />
              </Link>
            </div>
          ))}

          <Link
            to={`/product/${current.product.handle}`}
            className={`hero-chip${chipSwap ? " is-swapping" : ""}`}
            aria-label={`View ${current.product.title}`}
          >
            <span style={{ display: "grid", gap: 2 }}>
              <span className="chip-name">{current.product.title}</span>
              <span className="chip-price">
                {isRental ? "Rental · by quote" : `From ${formatPrice(current.product.price)}`}
              </span>
            </span>
            <span className="chip-go">
              <ArrowUpRight size={18} strokeWidth={1.8} />
            </span>
          </Link>
        </div>
      </div>

      <div className="hero-rail">
        <div className="wrap-wide">
          <span className="hero-count tnum">
            <b>{String(active + 1).padStart(2, "0")}</b> / {String(slides.length).padStart(2, "0")}
          </span>
          <span className="hero-progress" aria-hidden>
            <span key={`${active}-${paused}`} className={paused ? "" : "is-running"} />
          </span>
          <div className="hero-arrows">
            <button className="hero-arrow" aria-label="Previous linen" onClick={() => go(active - 1)}>
              <ArrowLeft size={18} strokeWidth={1.6} />
            </button>
            <button className="hero-arrow" aria-label="Next linen" onClick={() => go(active + 1)}>
              <ArrowRight size={18} strokeWidth={1.6} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
