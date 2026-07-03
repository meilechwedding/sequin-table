import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { CalendarCheck, Search, SlidersHorizontal, Sparkles, Truck, X } from "lucide-react";
import ProductCard from "../components/ProductCard";
import { Reveal } from "../components/bits";
import {
  categories,
  colorFamilies,
  productColorFamily,
  products,
  type ColorFamilyName,
  type ProductCategory,
} from "../data/products";
import { useDocTitle } from "../lib/hooks";

type SortKey = "featured" | "price-asc" | "price-desc" | "az";

const copy = {
  rentals: {
    eyebrow: "Party Rentals",
    title: "Linen for the Occasion",
    lede: "Every rental is quoted for your date and table count — delivered pressed, collected after.",
  },
  shop: {
    eyebrow: "Home Table Linen",
    title: "Linen to Keep",
    lede: "Velvet, quilted, and lace pieces made to live on your table — machine-washable where it matters.",
  },
} as const;

export default function Catalog({ mode }: { mode: "rentals" | "shop" }) {
  const [params, setParams] = useSearchParams();
  const [sort, setSort] = useState<SortKey>("featured");
  const [refineOpen, setRefineOpen] = useState(false);

  const query = params.get("q") ?? "";
  const activeCat = (params.get("cat") as ProductCategory | null) ?? null;
  const activeColor = (params.get("color") as ColorFamilyName | null) ?? null;

  const page = copy[mode];
  useDocTitle(page.title);

  const base = useMemo(
    () =>
      products.filter((p) =>
        mode === "rentals" ? p.collection === "Rentals" : p.collection === "Home Linens",
      ),
    [mode],
  );

  const availableCats = useMemo(
    () => categories.filter((c) => base.some((p) => p.category === c)),
    [base],
  );
  const availableColors = useMemo(
    () => colorFamilies.filter((f) => base.some((p) => productColorFamily(p) === f.name)),
    [base],
  );

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();
    const searched = q
      ? base.filter((p) =>
          `${p.title} ${p.category} ${p.tags.join(" ")}`.toLowerCase().includes(q),
        )
      : base;
    const catFiltered = activeCat ? searched.filter((p) => p.category === activeCat) : searched;
    const filtered = activeColor
      ? catFiltered.filter((p) => productColorFamily(p) === activeColor)
      : catFiltered;
    return [...filtered].sort((a, b) => {
      if (sort === "price-asc") return a.price - b.price;
      if (sort === "price-desc") return b.price - a.price;
      if (sort === "az") return a.title.localeCompare(b.title);
      return Number(Boolean(b.featured)) - Number(Boolean(a.featured));
    });
  }, [base, query, activeCat, activeColor, sort]);

  const setParam = (key: string, value: string | null) => {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value);
    else next.delete(key);
    setParams(next, { replace: true });
  };

  const activeFilterCount = (activeCat ? 1 : 0) + (activeColor ? 1 : 0);

  const categoryChips = (
    <>
      <button
        className={`chip${!activeCat ? " is-active" : ""}`}
        onClick={() => setParam("cat", null)}
      >
        All
      </button>
      {availableCats.map((cat) => (
        <button
          key={cat}
          className={`chip${activeCat === cat ? " is-active" : ""}`}
          onClick={() => setParam("cat", activeCat === cat ? null : cat)}
        >
          {cat}
        </button>
      ))}
    </>
  );

  const colorSwatches = availableColors.map((f) => (
    <button
      key={f.name}
      className={`swatch${activeColor === f.name ? " is-active" : ""}`}
      style={{ background: f.hex }}
      title={f.name}
      aria-label={`Filter by color: ${f.name}`}
      aria-pressed={activeColor === f.name}
      onClick={() => setParam("color", activeColor === f.name ? null : f.name)}
    />
  ));

  return (
    <main>
      <div className="wrap">
        <header className="page-head is-compact">
          <span className="eyebrow">{page.eyebrow}</span>
          <h1 className="display-lg" style={{ maxWidth: "18ch" }}>
            {page.title}
          </h1>
          <p className="lede">{page.lede}</p>
          {mode === "rentals" && (
            <span className="collection-note">
              <Sparkles size={14} strokeWidth={1.8} />
              Rentals are reserved with a date and confirmed within one business day.
            </span>
          )}
        </header>

        <div className="catalog-toolbar">
          <label className="catalog-search">
            <Search size={17} strokeWidth={1.7} style={{ color: "var(--ink-faint)" }} />
            <input
              value={query}
              onChange={(e) => setParam("q", e.target.value || null)}
              placeholder="Search this collection…"
              aria-label="Search this collection"
            />
          </label>
          <span className="toolbar-filters toolbar-chips">{categoryChips}</span>
          <span className="toolbar-filters swatch-row">
            <span className="swatch-label">Color</span>
            {colorSwatches}
          </span>
          <button className="chip refine-btn" onClick={() => setRefineOpen(true)}>
            <SlidersHorizontal size={15} strokeWidth={1.8} />
            Refine{activeFilterCount > 0 ? ` · ${activeFilterCount}` : ""}
          </button>
          <span className="spacer" />
          <span className="catalog-count tnum">
            {shown.length} {shown.length === 1 ? "piece" : "pieces"}
          </span>
          <select
            className="sort-select"
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            aria-label="Sort collection"
          >
            <option value="featured">Featured first</option>
            <option value="az">A to Z</option>
            {mode === "shop" && <option value="price-asc">Price, low to high</option>}
            {mode === "shop" && <option value="price-desc">Price, high to low</option>}
          </select>
        </div>

        {shown.length === 0 ? (
          <div className="empty-state">
            <h2 className="display-md">No pieces match that search.</h2>
            <p>
              Try a different word — velvet, lace, quilted — or clear the filters and browse the
              whole collection.
            </p>
            <button
              className="btn btn-dark btn-sm"
              onClick={() => {
                setParams({}, { replace: true });
                setSort("featured");
              }}
            >
              Clear &amp; Browse All
            </button>
          </div>
        ) : (
          <div className="product-grid">
            {shown.map((product, i) => (
              <Reveal key={product.id} delay={(i % 3) as 0 | 1 | 2}>
                <ProductCard product={product} />
              </Reveal>
            ))}
          </div>
        )}

        {mode === "rentals" && (
          <div style={{ paddingTop: "clamp(36px, 5vw, 64px)" }}>
            <Reveal>
              <div className="card rent-strip">
                <div className="rs-item">
                  <span className="rs-icon"><CalendarCheck size={20} strokeWidth={1.7} /></span>
                  <div>
                    <b>Reserve the date</b>
                    <p>Add pieces to your quote with your event date — we confirm within a business day.</p>
                  </div>
                </div>
                <div className="rs-item">
                  <span className="rs-icon"><Truck size={20} strokeWidth={1.7} /></span>
                  <div>
                    <b>Delivered dressed</b>
                    <p>Linen arrives pressed and wrapped, timed to your venue's schedule.</p>
                  </div>
                </div>
                <div className="rs-item">
                  <span className="rs-icon"><Sparkles size={20} strokeWidth={1.7} /></span>
                  <div>
                    <b>We handle the rest</b>
                    <p>Pickup, cleaning, pressing — you keep the compliments, not the laundry.</p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        )}

        <div style={{ paddingBlock: "clamp(40px, 6vw, 80px)" }}>
          <Reveal>
            <div className="card" style={{ padding: "clamp(28px, 4vw, 44px)", display: "grid", gap: 14, justifyItems: "center", textAlign: "center" }}>
              <span className="eyebrow eyebrow-center">Not Sure Where to Begin?</span>
              <h2 className="display-md" style={{ maxWidth: "26ch" }}>
                Send Us the Date and the Venue
              </h2>
              <p className="lede" style={{ textAlign: "center" }}>
                We'll suggest the linen — the sizes, the layering, the timing.
              </p>
              <Link to="/contact" className="btn btn-dark">
                Ask Sequin
              </Link>
            </div>
          </Reveal>
        </div>
      </div>

      {refineOpen && (
        <>
          <div className="refine-veil" onClick={() => setRefineOpen(false)} aria-hidden />
          <div className="refine-sheet" role="dialog" aria-modal="true" aria-label="Refine the collection">
            <div className="rs-head">
              <span className="display-sm">Refine</span>
              <button className="icon-btn" aria-label="Close refine" onClick={() => setRefineOpen(false)}>
                <X size={20} strokeWidth={1.6} />
              </button>
            </div>
            <div className="rs-group">
              <span className="swatch-label">Texture</span>
              <div className="choice-row">{categoryChips}</div>
            </div>
            <div className="rs-group">
              <span className="swatch-label">Color</span>
              <div className="swatch-row">{colorSwatches}</div>
            </div>
            <button className="btn btn-gold" onClick={() => setRefineOpen(false)}>
              Show {shown.length} {shown.length === 1 ? "Piece" : "Pieces"}
            </button>
          </div>
        </>
      )}
    </main>
  );
}
