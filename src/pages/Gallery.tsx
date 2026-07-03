import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, X } from "lucide-react";
import { Reveal } from "../components/bits";
import { galleryItems, galleryOccasions, occasionAccent } from "../data/site";
import { products } from "../data/products";
import { useDocTitle } from "../lib/hooks";

export default function Gallery() {
  useDocTitle("Gallery");
  const [occasion, setOccasion] = useState<(typeof galleryOccasions)[number]>("All");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const shown = useMemo(
    () => (occasion === "All" ? galleryItems : galleryItems.filter((g) => g.occasion === occasion)),
    [occasion],
  );

  const carried = (handle?: string) =>
    handle ? products.some((p) => p.handle === handle) : false;

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
              <article key={item.src} className="look-card">
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
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={shown[lightbox].alt} onClick={() => setLightbox(null)}>
          <button className="icon-btn lb-close" aria-label="Close" onClick={() => setLightbox(null)}>
            <X size={26} strokeWidth={1.6} />
          </button>
          <img src={shown[lightbox].src} alt={shown[lightbox].alt} onClick={(e) => e.stopPropagation()} />
        </div>
      )}
    </main>
  );
}
