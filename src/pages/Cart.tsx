import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, CalendarDays, Info, ShoppingBag, Sparkles } from "lucide-react";
import { Reveal } from "../components/bits";
import { QtyStepper } from "../components/bits";
import { formatPrice } from "../data/products";
import { cartTotals, lineProduct, useStore } from "../lib/store";
import { useDocTitle } from "../lib/hooks";

export default function CartPage() {
  useDocTitle("Your Cart");
  const { cart, updateQty, removeLine, setLineDate } = useStore();
  const navigate = useNavigate();
  const { purchase, rental, subtotal } = cartTotals(cart);
  const rentalsOnly = purchase.length === 0 && rental.length > 0;

  const lineIndex = (line: (typeof cart)[number]) => cart.indexOf(line);

  if (cart.length === 0) {
    return (
      <main className="wrap">
        <div className="empty-cart">
          <ShoppingBag size={30} strokeWidth={1.4} style={{ color: "var(--accent)" }} />
          <h1 className="display-lg">Your cart is waiting to be set.</h1>
          <p className="lede" style={{ textAlign: "center" }}>
            One cart, two doors — home linen you buy today, and event rentals we quote for your
            date.
          </p>
          <div className="empty-cart-doors">
            <div className="card empty-door">
              <b>Buy for home</b>
              <p>Velvet, quilted, and lace pieces ship to your door — pay at checkout.</p>
              <Link to="/shop" className="btn-link">
                Shop Home Linen <ArrowRight size={14} strokeWidth={2} />
              </Link>
            </div>
            <div className="card empty-door">
              <b>Rent for an event</b>
              <p>Add pieces with your date — nothing is charged until we confirm the quote.</p>
              <Link to="/rentals" className="btn-link">
                Explore Rentals <ArrowRight size={14} strokeWidth={2} />
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main>
      <div className="wrap" style={{ minHeight: "60vh" }}>
        <header className="page-head is-compact">
          <span className="eyebrow">Your Cart</span>
          <h1 className="display-lg">The Table So Far</h1>
        </header>

        <div className="cart-layout">
          <div>
            {purchase.length > 0 && (
              <Reveal>
                <div className="cart-lane">
                  <span className="cart-lane-title">
                    <ShoppingBag size={18} strokeWidth={1.7} style={{ color: "var(--accent)" }} />
                    For Your Home
                  </span>
                  {purchase.map((line) => {
                    const product = lineProduct(line)!;
                    const idx = lineIndex(line);
                    return (
                      <div className="card cart-line" key={`${line.productId}-${line.variant}`}>
                        <Link to={`/product/${product.handle}`}>
                          <img src={product.image} alt={product.title} loading="lazy" />
                        </Link>
                        <div className="cl-meta">
                          <span className="cl-title">
                            <Link to={`/product/${product.handle}`}>{product.title}</Link>
                          </span>
                          <span className="cl-sub tnum">
                            {line.variant === "Inquire" ? "Sized to your tables" : `Size ${line.variant}`}
                          </span>
                          <QtyStepper qty={line.qty} onDelta={(d) => updateQty(idx, d)} label={`Quantity of ${product.title}`} />
                        </div>
                        <div className="cl-right">
                          <span className="cl-price tnum">{formatPrice(product.price * line.qty)}</span>
                          <button className="cl-remove" onClick={() => removeLine(idx)}>
                            Remove
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Reveal>
            )}

            {rental.length > 0 && (
              <Reveal delay={1}>
                <div className="cart-lane">
                  <span className="cart-lane-title">
                    <Sparkles size={18} strokeWidth={1.7} style={{ color: "var(--accent)" }} />
                    For Your Event
                    <span className="tag tag-gold" style={{ fontFamily: "var(--font-ui)" }}>Quoted</span>
                  </span>
                  {rental.map((line) => {
                    const product = lineProduct(line)!;
                    const idx = lineIndex(line);
                    return (
                      <div className="card cart-line" key={`${line.productId}-${line.variant}`}>
                        <Link to={`/product/${product.handle}`}>
                          <img src={product.image} alt={product.title} loading="lazy" />
                        </Link>
                        <div className="cl-meta">
                          <span className="cl-title">
                            <Link to={`/product/${product.handle}`}>{product.title}</Link>
                          </span>
                          <span className="cl-sub tnum">
                            {line.variant === "Inquire" ? "Sized to your tables" : `Size ${line.variant}`}
                          </span>
                          <label className="cl-sub" style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                            <CalendarDays size={14} strokeWidth={1.7} />
                            <input
                              type="date"
                              value={line.date ?? ""}
                              min={new Date().toISOString().slice(0, 10)}
                              onChange={(e) => setLineDate(idx, e.target.value)}
                              style={{ border: "1px solid var(--line)", borderRadius: "var(--radius-mini)", padding: "4px 8px", background: "transparent" }}
                              aria-label={`Event date for ${product.title}`}
                            />
                          </label>
                          <QtyStepper qty={line.qty} onDelta={(d) => updateQty(idx, d)} label={`Quantity of ${product.title}`} />
                        </div>
                        <div className="cl-right">
                          <span className="cl-price" style={{ color: "var(--accent-strong)" }}>By quote</span>
                          <button className="cl-remove" onClick={() => removeLine(idx)}>
                            Remove
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Reveal>
            )}
          </div>

          <Reveal delay={1}>
            <aside className="card summary-card" aria-label="Order summary">
              <h2 className="display-sm">Summary</h2>
              <hr className="foil-rule" />
              {purchase.length > 0 && (
                <div className="summary-row">
                  <span>Home linen subtotal</span>
                  <span className="tnum">{formatPrice(subtotal)}</span>
                </div>
              )}
              {rental.length > 0 && (
                <div className="summary-row">
                  <span>Event rentals</span>
                  <span>Quoted for your date</span>
                </div>
              )}
              <div className="summary-row">
                <span>White-glove delivery</span>
                <span>Calculated at review</span>
              </div>
              <hr className="hairline" />
              <div className="summary-row total">
                <span>Due today</span>
                <span className="tnum">{formatPrice(subtotal)}</span>
              </div>
              <button className="btn btn-gold" onClick={() => navigate("/checkout")}>
                {rentalsOnly ? "Request the Quote" : "Continue to Checkout"}
                <ArrowRight size={16} strokeWidth={2} />
              </button>
              <p className="summary-note" style={{ display: "flex", gap: 8 }}>
                <Info size={15} strokeWidth={1.7} style={{ flex: "none", marginTop: 2 }} />
                {rentalsOnly
                  ? "Rental pieces are priced by our team for your event date — sending the request costs nothing."
                  : "Home linen is paid at checkout. Rental pieces are quoted separately for your event date — those cost nothing today."}
              </p>
            </aside>
          </Reveal>
        </div>
      </div>
    </main>
  );
}
