import { useRef, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { ArrowRight, HandCoins, Sparkles } from "lucide-react";
import { Reveal } from "../components/bits";
import { formatPrice } from "../data/products";
import { cartTotals, lineProduct, useStore } from "../lib/store";
import { useDocTitle } from "../lib/hooks";

export default function Checkout() {
  useDocTitle("Checkout");
  const { cart, placeOrder } = useStore();
  const navigate = useNavigate();
  const { purchase, rental, subtotal } = cartTotals(cart);
  const [name, setName] = useState("");
  // navigate() runs as a low-priority transition while the cart-clearing
  // state update flushes first — without this flag the empty-cart guard
  // would redirect to /cart before the confirmation redirect applies.
  const placing = useRef(false);

  if (cart.length === 0 && !placing.current) return <Navigate to="/cart" replace />;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    placing.current = true;
    const order = placeOrder(name.trim() || "Guest");
    navigate(`/order/${order.id}`);
  };

  return (
    <main>
      <div className="wrap">
        <header className="page-head">
          <span className="eyebrow">Checkout</span>
          <h1 className="display-xl">Almost Set</h1>
          <div className="demo-ribbon" role="note">
            Demo preview — nothing is charged and no order is placed with a payment provider.
          </div>
        </header>

        <form className="checkout-layout" onSubmit={submit}>
          <div style={{ display: "grid", gap: 22 }}>
            <Reveal>
              <section className="card checkout-step" aria-labelledby="step-contact">
                <h2 className="step-title" id="step-contact">
                  <span className="n">1</span>
                  Who's Setting the Table
                </h2>
                <div className="form-grid">
                  <div className="field">
                    <label htmlFor="co-name">Full name</label>
                    <input
                      id="co-name"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your name"
                      autoComplete="name"
                    />
                  </div>
                  <div className="field">
                    <label htmlFor="co-phone">Phone</label>
                    <input id="co-phone" type="tel" required placeholder="Best number" autoComplete="tel" />
                  </div>
                  <div className="field span-2">
                    <label htmlFor="co-email">Email</label>
                    <input id="co-email" type="email" required placeholder="you@example.com" autoComplete="email" />
                  </div>
                </div>
              </section>
            </Reveal>

            <Reveal delay={1}>
              <section className="card checkout-step" aria-labelledby="step-delivery">
                <h2 className="step-title" id="step-delivery">
                  <span className="n">2</span>
                  Where It's Going
                </h2>
                <div className="form-grid">
                  <div className="field span-2">
                    <label htmlFor="co-address">Street address</label>
                    <input id="co-address" required placeholder="Street and number" autoComplete="street-address" />
                  </div>
                  <div className="field">
                    <label htmlFor="co-city">City</label>
                    <input id="co-city" required placeholder="Brooklyn" autoComplete="address-level2" />
                  </div>
                  <div className="field">
                    <label htmlFor="co-zip">ZIP</label>
                    <input id="co-zip" required placeholder="11211" autoComplete="postal-code" inputMode="numeric" />
                  </div>
                  {rental.length > 0 && (
                    <div className="field span-2">
                      <label htmlFor="co-venue">Venue notes (for rentals)</label>
                      <input id="co-venue" placeholder="Hall name, loading dock, timing — anything that helps" />
                    </div>
                  )}
                </div>
              </section>
            </Reveal>

            <Reveal delay={2}>
              <section className="card checkout-step" aria-labelledby="step-review">
                <h2 className="step-title" id="step-review">
                  <span className="n">3</span>
                  One Last Look
                </h2>
                <div style={{ display: "grid", gap: 12 }}>
                  {cart.map((line, i) => {
                    const product = lineProduct(line)!;
                    const isRental = product.price === 0;
                    return (
                      <div key={i} className="summary-row" style={{ alignItems: "center" }}>
                        <span style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0 }}>
                          <img src={product.image} alt="" width={44} height={44} style={{ borderRadius: 8, objectFit: "cover", width: 44, height: 44 }} loading="lazy" />
                          <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                            {product.title} · {line.variant} × {line.qty}
                            {isRental && line.date ? ` · ${line.date}` : ""}
                          </span>
                        </span>
                        <span className="tnum" style={{ flex: "none" }}>
                          {isRental ? "Quote" : formatPrice(product.price * line.qty)}
                        </span>
                      </div>
                    );
                  })}
                </div>
                <div className="pay-note">
                  <HandCoins size={20} strokeWidth={1.7} />
                  <span>
                    <b style={{ fontWeight: 600 }}>Payment comes later.</b> We confirm your order and
                    any rental quote first — payment is collected on approval, the way a linen house
                    should. (In this demo, nothing is charged at all.)
                  </span>
                </div>
              </section>
            </Reveal>
          </div>

          <Reveal delay={1}>
            <aside className="card summary-card" aria-label="Order summary">
              <h2 className="display-sm">Summary</h2>
              <hr className="foil-rule" />
              <div className="summary-row">
                <span>Home linen ({purchase.length})</span>
                <span className="tnum">{formatPrice(subtotal)}</span>
              </div>
              {rental.length > 0 && (
                <div className="summary-row">
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                    <Sparkles size={14} strokeWidth={1.7} />
                    Event rentals ({rental.length})
                  </span>
                  <span>Quoted</span>
                </div>
              )}
              <div className="summary-row">
                <span>White-glove delivery</span>
                <span>With confirmation</span>
              </div>
              <hr className="hairline" />
              <div className="summary-row total">
                <span>Due today</span>
                <span className="tnum">$0.00</span>
              </div>
              <button className="btn btn-gold" type="submit">
                Place the Order
                <ArrowRight size={16} strokeWidth={2} />
              </button>
              <p className="summary-note">
                By placing the order you're asking us to set your table — we'll confirm everything
                by phone or WhatsApp before a dollar moves.
              </p>
              <Link to="/cart" className="btn-link" style={{ justifySelf: "center" }}>
                Back to Cart
              </Link>
            </aside>
          </Reveal>
        </form>
      </div>
    </main>
  );
}
