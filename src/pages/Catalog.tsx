import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { CalendarCheck, Search, Sparkles, Truck } from "lucide-react";
import ProductCard from "../components/ProductCard";
import { Reveal } from "../components/bits";
import { categories, products, type ProductCategory } from "../data/products";
import { useDocTitle } from "../lib/hooks";
import { useStore } from "../lib/store";

type SortKey = "featured" | "price-asc" | "price-desc" | "az";

const copy = {
  rentals: {
    eyebrow: "Party Rentals",
    title: "Linen for the Occasion",
    lede: "Dressed tables for weddings, simchos, and dinners — delivered pressed, collected after. Every rental is quoted for your date and table count.",
  },
  shop: {
    eyebrow: "Home Table Linen",
    title: "Linen to Keep",
    lede: "Velvet, quilted, and lace pieces made to live on your table. Machine-washable where it matters, beautiful everywhere it counts.",
  },
} as const;

export default function Catalog({ mode }: { mode: "rentals" | "shop" }) {
  const { saved } = useStore();
  const [params, setParams] = useSearchParams();
  const [sort, setSort] = useState<SortKey>("featured");

  const query = params.get("q") ?? "";
  const savedOnly = params.get("saved") === "1";
  const activeCat = (params.get("cat") as ProductCategory | null) ?? null;

  const page = copy[mode];
  useDocTitle(savedOnly ? "Saved Pieces" : page.title);

  const base = useMemo(() => {
    if (savedOnly) return products.filter((p) => saved.includes(p.id));
    return products.filter((p) =>
      mode === "rentals" ? p.collection === "Rentals" : p.collection === "Home Linens",
    );
  }, [mode, savedOnly, saved]);

  const availableCats = useMemo(
    () => categories.filter((c) => base.some((p) => p.category === c)),
    [base],
  );

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();
    const searched = q
      ? base.filter((p) =>
          `${p.title} ${p.category} ${p.tags.join(" ")}`.toLowerCase().includes(q),
        )
      : base;
    const filtered = activeCat ? searched.filter((p) => p.category === activeCat) : searched;
    return [...filtered].sort((a, b) => {
      if (sort === "price-asc") return a.price - b.price;
      if (sort === "price-desc") return b.price - a.price;
      if (sort === "az") return a.title.localeCompare(b.title);
      return Number(Boolean(b.featured)) - Number(Boolean(a.featured));
    });
  }, [base, query, activeCat, sort]);

  const setParam = (key: string, value: string | null) => {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value);
    else next.delete(key);
    setParams(next, { replace: true });
  };

  return (
    <main>
      <div className="wrap">
        <header className="page-head">
          <span className="eyebrow">{savedOnly ? "Your Shortlist" : page.eyebrow}</span>
          <h1 className="display-xl" style={{ maxWidth: "16ch" }}>
            {savedOnly ? "Saved Pieces" : page.title}
          </h1>
          <p className="lede">
            {savedOnly
              ? "Pieces you've set aside, from both collections. They'll wait right here."
              : page.lede}
          </p>
        </header>

        {mode === "rentals" && !savedOnly && (
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
        )}

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
          {availableCats.length > 1 && (
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
          )}
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
            <option value="price-asc">Price, low to high</option>
            <option value="price-desc">Price, high to low</option>
          </select>
        </div>

        {shown.length === 0 ? (
          <div className="empty-state">
            <h2 className="display-md">
              {savedOnly ? "Nothing saved yet." : "No pieces match that search."}
            </h2>
            <p>
              {savedOnly
                ? "Tap the heart on any piece and it will wait for you here."
                : "Try a different word — velvet, lace, quilted — or browse the whole collection."}
            </p>
            <Link to={savedOnly ? "/shop" : `/${mode}`} className="btn btn-dark btn-sm" onClick={() => setParams({}, { replace: true })}>
              Browse the Collection
            </Link>
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

        <div style={{ paddingBlock: "clamp(48px, 7vw, 88px)" }}>
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
    </main>
  );
}
