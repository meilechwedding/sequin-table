import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { CalendarDays, Heart, Plus } from "lucide-react";
import ProductCard from "../components/ProductCard";
import { QtyStepper, Reveal } from "../components/bits";
import { formatPrice, products } from "../data/products";
import { productCare } from "../data/site";
import { useDocTitle } from "../lib/hooks";
import { useStore } from "../lib/store";

function Accordion({ items }: { items: Array<{ title: string; lines: string[] }> }) {
  const [open, setOpen] = useState(0);
  return (
    <div className="accordion">
      {items.map((item, i) => (
        <div key={item.title} className={`acc-item${open === i ? " is-open" : ""}`}>
          <button
            className="acc-head"
            aria-expanded={open === i}
            onClick={() => setOpen(open === i ? -1 : i)}
          >
            {item.title}
            <Plus size={18} strokeWidth={1.7} />
          </button>
          <div className="acc-body">
            <div>
              <ul>
                {item.lines.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function ProductPage() {
  const { handle } = useParams();
  const { addToCart, saved, toggleSaved, setDrawerOpen } = useStore();

  const product = useMemo(() => products.find((p) => p.handle === handle), [handle]);
  const [variant, setVariant] = useState<string | null>(null);
  const [qty, setQty] = useState(1);
  const [date, setDate] = useState("");
  const [dateError, setDateError] = useState(false);
  const [gallery, setGallery] = useState(0);

  useDocTitle(product?.title ?? "Piece Not Found");

  useEffect(() => {
    setVariant(null);
    setQty(1);
    setDate("");
    setDateError(false);
    setGallery(0);
    window.scrollTo({ top: 0 });
  }, [handle]);

  if (!product) {
    return (
      <main className="wrap notfound">
        <div style={{ display: "grid", gap: 18, justifyItems: "center" }}>
          <h1 className="display-lg">That piece has left the table.</h1>
          <p className="lede" style={{ textAlign: "center" }}>
            It may have been renamed or retired — the collection is still full.
          </p>
          <Link to="/shop" className="btn btn-dark">Browse the Collection</Link>
        </div>
      </main>
    );
  }

  const isRental = product.price === 0;
  const chosenVariant = variant ?? product.variants[0] ?? "One size";
  const imagesList = [product.image, ...(product.heroAsset ? [product.heroAsset] : [])];
  const related = products
    .filter((p) => p.id !== product.id && (p.category === product.category || p.collection === product.collection))
    .slice(0, 4);
  const isSaved = saved.includes(product.id);

  const add = () => {
    if (isRental && !date) {
      setDateError(true);
      return;
    }
    addToCart(product, chosenVariant, qty, isRental ? date : undefined);
    setDrawerOpen(true);
  };

  const accordionItems = [
    {
      title: "Details & Care",
      lines: [product.description, ...(isRental ? productCare.careRental : productCare.careHome)],
    },
    { title: "Delivery", lines: productCare.delivery },
    ...(isRental ? [{ title: "How Renting Works", lines: productCare.rentalTerms }] : [{ title: "Details", lines: productCare.details }]),
  ];

  return (
    <main>
      <div className="wrap">
        <nav className="crumbs" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <span aria-hidden>·</span>
          <Link to={isRental ? "/rentals" : "/shop"}>{isRental ? "Party Rentals" : "Home Linen"}</Link>
          <span aria-hidden>·</span>
          <span style={{ color: "var(--ink-soft)" }}>{product.title}</span>
        </nav>

        <div className="pdp">
          <div className="pdp-gallery">
            <div className="pdp-main">
              <img src={imagesList[gallery]} alt={product.title} width={800} height={1000} />
            </div>
            {imagesList.length > 1 && (
              <div className="pdp-thumbs">
                {imagesList.map((src, i) => (
                  <button
                    key={src}
                    className={`pdp-thumb${gallery === i ? " is-active" : ""}`}
                    onClick={() => setGallery(i)}
                    aria-label={`View image ${i + 1} of ${product.title}`}
                  >
                    <img src={src} alt="" loading="lazy" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="pdp-info">
            <div style={{ display: "grid", gap: 10 }}>
              <span className="eyebrow">{isRental ? "Party Rental" : "Home Linen"} · {product.category}</span>
              <h1 className="display-lg">{product.title}</h1>
              <span className="pdp-price tnum">
                {isRental ? (
                  <span style={{ color: "var(--accent-strong)" }}>Quoted for your event</span>
                ) : (
                  <>
                    From {formatPrice(product.price)} <span className="per">· per cloth</span>
                  </>
                )}
              </span>
            </div>

            <p className="lede">{product.description}</p>

            {product.variants.length === 1 && product.variants[0] === "Inquire" ? (
              <p style={{ color: "var(--ink-soft)", fontWeight: 300 }}>
                Sized to your tables — send your counts and we'll cut the quote to fit.
              </p>
            ) : (
              <div style={{ display: "grid", gap: 10 }}>
                <span style={{ fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--ink-soft)" }}>
                  Size
                </span>
                <div className="variant-pills" role="group" aria-label="Choose a size">
                  {product.variants.map((v) => (
                    <button
                      key={v}
                      className={`variant-pill tnum${chosenVariant === v ? " is-active" : ""}`}
                      aria-pressed={chosenVariant === v}
                      onClick={() => setVariant(v)}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {isRental && (
              <div className={`field${dateError ? " has-error" : ""}`} style={{ maxWidth: 320 }}>
                <label htmlFor="event-date">
                  <CalendarDays size={13} strokeWidth={1.8} style={{ display: "inline", verticalAlign: "-2px", marginRight: 6 }} />
                  Event date
                </label>
                <input
                  id="event-date"
                  type="date"
                  value={date}
                  min={new Date().toISOString().slice(0, 10)}
                  onChange={(e) => {
                    setDate(e.target.value);
                    setDateError(false);
                  }}
                />
                {dateError && <span className="field-error">Choose your event date so we can quote availability.</span>}
              </div>
            )}

            <div className="pdp-actions">
              <QtyStepper qty={qty} onDelta={(d) => setQty((q) => Math.max(1, q + d))} />
              <button className="btn btn-gold" onClick={add}>
                {isRental ? "Reserve for My Event" : "Add to Cart"}
              </button>
              <button
                className={`icon-btn${isSaved ? " is-saved" : ""}`}
                style={{ width: 52, height: 52, border: "1px solid var(--line-strong)", color: isSaved ? "var(--color-bordeaux)" : undefined }}
                aria-label={isSaved ? "Remove from saved" : "Save this piece"}
                aria-pressed={isSaved}
                onClick={() => toggleSaved(product.id)}
              >
                <Heart size={20} strokeWidth={1.7} fill={isSaved ? "currentColor" : "none"} />
              </button>
            </div>

            <Accordion items={accordionItems} />
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="section" style={{ paddingTop: 0 }}>
          <div className="wrap">
            <Reveal className="section-head">
              <span className="eyebrow">Pairs Well With</span>
              <h2 className="display-md">Complete the Table</h2>
            </Reveal>
          </div>
          <div className="wrap-wide">
            <div className="rail" role="list" aria-label="Related pieces">
              {related.map((p) => (
                <div role="listitem" key={p.id}>
                  <ProductCard product={p} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
