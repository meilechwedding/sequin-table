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

  const lineIndex = (line: (typeof cart)[number]) => cart.indexOf(line);

  if (cart.length === 0) {
    return (
      <main className="wrap">
        <div className="empty-state" style={{ minHeight: "50vh" }}>
          <ShoppingBag size={30} strokeWidth={1.4} style={{ color: "var(--accent)" }} />
          <h1 className="display-lg">Your cart is waiting to be set.</h1>
          <p>Rentals for the event, linens for home — begin wherever the occasion takes you.</p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
            <Link to="/rentals" className="btn btn-gold btn-sm">Explore Rentals</Link>
            <Link to="/shop" className="btn btn-ghost btn-sm">Shop Home Linen</Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main>
      <div className="wrap">
        <header className="page-head">
          <span className="eyebrow">Your Cart</span>
          <h1 className="display-xl">The Table So Far</h1>
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
                              style={{ border: "1px solid var(--line)", borderRadius: 8, padding: "4px 8px", background: "transparent" }}
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
              <div className="summary-row">
                <span>Home linen subtotal</span>
                <span className="tnum">{formatPrice(subtotal)}</span>
              </div>
              {rental.length > 0 && (
                <div className="summary-row">
                  <span>Event rentals</span>
                  <span>Quoted for your date</span>
                </div>
              )}
              <div className="summary-row">
                <span>Delivery</span>
                <span>Calculated at review</span>
              </div>
              <hr className="hairline" />
              <div className="summary-row total">
                <span>Today</span>
                <span className="tnum">{formatPrice(subtotal)}</span>
              </div>
              <button className="btn btn-gold" onClick={() => navigate("/checkout")}>
                Continue to Checkout
                <ArrowRight size={16} strokeWidth={2} />
              </button>
              <p className="summary-note" style={{ display: "flex", gap: 8 }}>
                <Info size={15} strokeWidth={1.7} style={{ flex: "none", marginTop: 2 }} />
                Rental pieces are confirmed and priced by our team for your event date — checkout
                sends the request, nothing is charged.
              </p>
            </aside>
          </Reveal>
        </div>
      </div>
    </main>
  );
}
