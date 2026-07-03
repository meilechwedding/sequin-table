import { useMemo, useState } from "react";
import { X } from "lucide-react";
import { Reveal } from "../components/bits";
import { galleryItems, galleryOccasions } from "../data/site";
import { useDocTitle } from "../lib/hooks";

export default function Gallery() {
  useDocTitle("Gallery");
  const [occasion, setOccasion] = useState<(typeof galleryOccasions)[number]>("All");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const shown = useMemo(
    () => (occasion === "All" ? galleryItems : galleryItems.filter((g) => g.occasion === occasion)),
    [occasion],
  );

  return (
    <main>
      <div className="wrap">
        <header className="page-head">
          <span className="eyebrow">The Lookbook</span>
          <h1 className="display-xl" style={{ maxWidth: "14ch" }}>
            Tables We've Dressed
          </h1>
          <p className="lede">
            Real settings from real celebrations — weddings, Shabbos tables, and quiet dinners at
            home. Every cloth here is in the collection.
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
          <div className="masonry">
            {shown.map((item, i) => (
              <button
                key={item.src}
                className="masonry-item"
                onClick={() => setLightbox(i)}
                aria-label={`Enlarge: ${item.alt}`}
              >
                <img src={item.src} alt={item.alt} loading="lazy" />
                <span className="mi-label">{item.occasion}</span>
              </button>
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
