import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { heroSlides, homeCopy } from "../data/site";
import { formatPrice } from "../data/products";
import { productById } from "../lib/store";

const AUTOPLAY_MS = 6500;
const SWAP_MS = 650;

/** "Lisbon Ribbed White" → "LISBON"; "The Flutter Overlay" → "FLUTTER" */
const ghostWord = (title: string) => title.replace(/^The\s+/i, "").split(" ")[0];

type Role = "center" | "left" | "right" | "back";

export default function Hero() {
  const navigate = useNavigate();
  const [active, setActive] = useState(0);
  const [swapping, setSwapping] = useState(false);
  const [paused, setPaused] = useState(false);
  const lock = useRef(false);
  const touchX = useRef<number | null>(null);

  const slides = useMemo(
    () =>
      heroSlides
        .map((slide) => ({ ...slide, product: productById(slide.productId) }))
        .filter((slide) => slide.product),
    [],
  );
  const n = slides.length;

  const go = useCallback(
    (delta: number) => {
      if (lock.current || n < 2) return;
      lock.current = true;
      setSwapping(true);
      setActive((a) => (a + delta + n) % n);
      window.setTimeout(() => {
        lock.current = false;
        setSwapping(false);
      }, SWAP_MS);
    },
    [n],
  );

  // autoplay — pauses on hover/focus/touch and for reduced-motion users
  useEffect(() => {
    if (paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = window.setTimeout(() => go(1), AUTOPLAY_MS);
    return () => window.clearTimeout(t);
  }, [active, paused, go]);

  // preload every cutout so role changes never pop
  useEffect(() => {
    slides.forEach((slide) => {
      const img = new Image();
      img.src = slide.image;
    });
  }, [slides]);

  const roleOf = (index: number): Role => {
    if (index === active) return "center";
    if (index === (active + 1) % n) return "right";
    if (index === (active + n - 1) % n) return "left";
    return "back";
  };

  const onItemClick = (role: Role, handle: string) => {
    if (role === "center") {
      navigate(`/product/${handle}`);
      return;
    }
    if (role === "left") go(-1);
    else go(1);
  };

  const current = slides[active];
  if (!current?.product) return null;
  const isRental = current.product.price === 0;
  const priceLine = isRental
    ? "Rental · by quote"
    : `From ${formatPrice(current.product.price)}`;

  return (
    <section
      className="hero on-dark"
      aria-label="Featured linens"
      style={{
        ["--stage-bg" as string]: current.bg,
        ["--stage-tint" as string]: current.tint,
      }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      onTouchStart={(e) => {
        setPaused(true);
        touchX.current = e.touches[0]?.clientX ?? null;
      }}
      onTouchEnd={(e) => {
        setPaused(false);
        const startX = touchX.current;
        touchX.current = null;
        if (startX === null) return;
        const dx = (e.changedTouches[0]?.clientX ?? startX) - startX;
        if (Math.abs(dx) > 48) go(dx < 0 ? 1 : -1);
      }}
    >
      <div className="hero-tint" aria-hidden />

      <div className="hero-ghost" aria-hidden>
        {slides.map((slide, index) => (
          <span key={slide.productId} className={index === active ? "is-active" : ""}>
            {ghostWord(slide.product!.title)}
          </span>
        ))}
      </div>

      <div className="hero-carousel">
        {slides.map((slide, index) => {
          const role = roleOf(index);
          return (
            <div
              key={slide.productId}
              className={`hero-item role-${role}`}
              aria-hidden={role !== "center"}
              onClick={role === "center" ? undefined : () => onItemClick(role, slide.product!.handle)}
            >
              {role === "center" ? (
                <Link to={`/product/${slide.product!.handle}`} aria-label={`View ${slide.product!.title}`}>
                  <img
                    src={slide.image}
                    alt={slide.product!.title}
                    width={720}
                    height={720}
                    loading={index === 0 ? "eager" : "lazy"}
                    draggable={false}
                    {...(index === 0 ? { fetchpriority: "high" as const } : {})}
                  />
                </Link>
              ) : (
                <img src={slide.image} alt="" width={720} height={720} loading="lazy" draggable={false} />
              )}
            </div>
          );
        })}
      </div>

      <div className="hero-corner">
        <span className="eyebrow">{homeCopy.heroEyebrow}</span>
        <h1 className="hero-line">
          {homeCopy.heroTitleA} {homeCopy.heroTitleAccent} {homeCopy.heroTitleB}
        </h1>
        <p className="hero-sub">{homeCopy.heroSub}</p>
        <Link
          to={`/product/${current.product.handle}`}
          className={`hero-mini${swapping ? " is-swapping" : ""}`}
        >
          {current.product.title} · {priceLine}
          <ArrowUpRight size={15} strokeWidth={2} />
        </Link>
        <div className="hero-ctas">
          <Link to="/rentals" className="btn btn-gold">
            Rent for an Event
          </Link>
          <Link to="/shop" className="btn btn-ghost">
            Buy for Home
          </Link>
        </div>
        <div className="hero-orbs">
          <button className="hero-orb" aria-label="Previous linen" onClick={() => go(-1)}>
            <ArrowLeft size={24} strokeWidth={2.25} />
          </button>
          <button className="hero-orb" aria-label="Next linen" onClick={() => go(1)}>
            <ArrowRight size={24} strokeWidth={2.25} />
          </button>
        </div>
      </div>

      <Link
        to={`/product/${current.product.handle}`}
        className={`hero-feature${swapping ? " is-swapping" : ""}`}
        aria-label={`View ${current.product.title}`}
      >
        <span className="hf-sub">{priceLine}</span>
        <span className="hf-name">
          {ghostWord(current.product.title)}
          <ArrowUpRight size={30} strokeWidth={2.25} />
        </span>
      </Link>
    </section>
  );
}
