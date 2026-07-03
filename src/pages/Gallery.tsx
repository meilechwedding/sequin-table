import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { Reveal } from "../components/bits";
import { galleryItems, galleryOccasions, occasionAccent } from "../data/site";
import { products } from "../data/products";
import { useDocTitle, useTilt } from "../lib/hooks";

export default function Gallery() {
  useDocTitle("Gallery");
  const [occasion, setOccasion] = useState<(typeof galleryOccasions)[number]>("All");
  const [lightbox, setLightbox] = useState<number | null>(null);
  const tilt = useTilt();

  const shown = useMemo(
    () => (occasion === "All" ? galleryItems : galleryItems.filter((g) => g.occasion === occasion)),
    [occasion],
  );

  const carried = (handle?: string) =>
    handle ? products.some((p) => p.handle === handle) : false;

  const step = (delta: number) => {
    setLightbox((i) => (i === null ? i : (i + delta + shown.length) % shown.length));
  };

  // keyboard: esc closes, arrows browse
  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lightbox === null]);

  return (
    <main>
      <div className="wrap">
        <header className="page-head is-compact">
          <span className="eyebrow">The Lookbook</span>
          <h1 className="display-lg" style={{ maxWidth: "16ch" }}>
            Tables We've Dressed
          </h1>
          <p className="lede">
            Real settings from real celebrations — and every cloth here is in the collection.
          </p>
        </header>

        <div className="catalog-toolbar" style={{ borderTop: "none" }}>
          {galleryOccasions.map((o) => (
            <button
              key={o}
              className={`chip${occasion === o ? " is-active" : ""}`}
              onClick={() => setOccasion(o)}
            >
              {o}
            </button>
          ))}
        </div>

        <Reveal>
          <div className="look-grid">
            {shown.map((item, i) => (
              <article key={item.src} className="look-card" {...tilt}>
                <button
                  type="button"
                  className="look-frame"
                  onClick={() => setLightbox(i)}
                  aria-label={`Enlarge: ${item.alt}`}
                >
                  <img src={item.src} alt={item.alt} loading="lazy" width={640} height={800} />
                </button>
                <div className="look-body">
                  <span className="look-occasion">
                    <span
                      className="lo-dot"
                      style={{ background: occasionAccent[item.occasion] }}
                      aria-hidden
                    />
                    {item.occasion}
                  </span>
                  <span className="look-title">{item.cloth}</span>
                  {carried(item.productHandle) && (
                    <Link to={`/product/${item.productHandle}`} className="btn-link" style={{ fontSize: "0.72rem" }}>
                      View the Cloth <ArrowRight size={13} strokeWidth={2} />
                    </Link>
                  )}
                </div>
              </article>
            ))}
          </div>
        </Reveal>

        <div style={{ height: "clamp(48px, 7vw, 88px)" }} />
      </div>

      {lightbox !== null && shown[lightbox] && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={shown[lightbox].alt}
          onClick={() => setLightbox(null)}
        >
          <div className="lb-stage">
            <button className="icon-btn lb-close" aria-label="Close" onClick={() => setLightbox(null)}>
              <X size={26} strokeWidth={1.6} />
            </button>
            {shown.length > 1 && (
              <>
                <button
                  className="lb-arrow lb-prev"
                  aria-label="Previous image"
                  onClick={(e) => {
                    e.stopPropagation();
                    step(-1);
                  }}
                >
                  <ArrowLeft size={20} strokeWidth={1.6} />
                </button>
                <button
                  className="lb-arrow lb-next"
                  aria-label="Next image"
                  onClick={(e) => {
                    e.stopPropagation();
                    step(1);
                  }}
                >
                  <ArrowRight size={20} strokeWidth={1.6} />
                </button>
              </>
            )}
            <img
              key={shown[lightbox].src}
              className="lb-main"
              src={shown[lightbox].src}
              alt={shown[lightbox].alt}
              onClick={(e) => e.stopPropagation()}
            />
          </div>
          {shown.length > 1 && (
            <div className="lb-thumbs" onClick={(e) => e.stopPropagation()}>
              {shown.map((item, i) => (
                <button
                  key={item.src}
                  className={`lb-thumb${i === lightbox ? " is-active" : ""}`}
                  aria-label={`View: ${item.alt}`}
                  aria-current={i === lightbox}
                  onClick={() => setLightbox(i)}
                >
                  <img src={item.src} alt="" loading="lazy" />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </main>
  );
}
