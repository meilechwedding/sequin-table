import { useRef, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { ArrowRight, Gem, Lock, ShieldCheck, Sparkles } from "lucide-react";
import { Reveal } from "../components/bits";
import { formatPrice } from "../data/products";
import { cartTotals, lineProduct, useStore } from "../lib/store";
import { useDocTitle } from "../lib/hooks";

/* ---------- demo card validation — real checks, no real charge ---------- */

const digitsOnly = (value: string) => value.replace(/\D/g, "");

const detectBrand = (num: string): string => {
  if (/^3[47]/.test(num)) return "Amex";
  if (/^4/.test(num)) return "Visa";
  if (/^(5[1-5]|2[2-7])/.test(num)) return "Mastercard";
  if (/^(6011|65)/.test(num)) return "Discover";
  return "";
};

const formatCardNumber = (raw: string): string => {
  const num = digitsOnly(raw).slice(0, detectBrand(digitsOnly(raw)) === "Amex" ? 15 : 16);
  if (detectBrand(num) === "Amex") {
    return [num.slice(0, 4), num.slice(4, 10), num.slice(10, 15)].filter(Boolean).join(" ");
  }
  return num.match(/.{1,4}/g)?.join(" ") ?? "";
};

const luhnValid = (num: string): boolean => {
  if (num.length < 13) return false;
  let sum = 0;
  let double = false;
  for (let i = num.length - 1; i >= 0; i--) {
    let d = Number(num[i]);
    if (double) {
      d *= 2;
      if (d > 9) d -= 9;
    }
    sum += d;
    double = !double;
  }
  return sum % 10 === 0;
};

const formatExpiry = (raw: string): string => {
  const num = digitsOnly(raw).slice(0, 4);
  if (num.length <= 2) return num;
  return `${num.slice(0, 2)}/${num.slice(2)}`;
};

const expiryValid = (value: string): boolean => {
  const m = value.match(/^(\d{2})\/(\d{2})$/);
  if (!m) return false;
  const month = Number(m[1]);
  if (month < 1 || month > 12) return false;
  const year = 2000 + Number(m[2]);
  const now = new Date();
  return year > now.getFullYear() || (year === now.getFullYear() && month >= now.getMonth() + 1);
};

export default function Checkout() {
  useDocTitle("Checkout");
  const { cart, placeOrder } = useStore();
  const navigate = useNavigate();
  const { purchase, rental, subtotal } = cartTotals(cart);
  const rentalsOnly = purchase.length === 0 && rental.length > 0;

  const [name, setName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [payErrors, setPayErrors] = useState<{ number?: string; expiry?: string; cvc?: string }>({});
  const [processing, setProcessing] = useState(false);

  // navigate() runs as a low-priority transition while the cart-clearing
  // state update flushes first — without this flag the empty-cart guard
  // would redirect to /cart before the confirmation redirect applies.
  const placing = useRef(false);

  if (cart.length === 0 && !placing.current) return <Navigate to="/cart" replace />;

  const cardDigits = digitsOnly(cardNumber);
  const brand = detectBrand(cardDigits);

  const validatePayment = () => {
    const errors: typeof payErrors = {};
    if (!luhnValid(cardDigits)) errors.number = "That card number doesn't check out — try again.";
    if (!expiryValid(expiry)) errors.expiry = "Use a future MM/YY.";
    if (!/^\d{3,4}$/.test(cvc)) errors.cvc = "3–4 digits.";
    setPayErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (processing) return;
    if (!rentalsOnly && !validatePayment()) return;

    placing.current = true;
    setProcessing(true);
    // simulate the payment handshake — validated, never charged
    window.setTimeout(() => {
      const order = placeOrder(
        name.trim() || "Guest",
        rentalsOnly
          ? undefined
          : { brand: brand || "Card", last4: cardDigits.slice(-4), amount: subtotal },
      );
      navigate(`/order/${order.id}`);
    }, 1400);
  };

  let step = 0;
  const nextStep = () => String(++step);

  return (
    <main>
      <div className="wrap">
        <header className="page-head is-compact">
          <span className="eyebrow">Checkout</span>
          <h1 className="display-lg">Almost Set</h1>
          <div className="preview-note" role="note">
            <Gem size={15} strokeWidth={1.7} />
            Boutique preview — ordering opens soon · nothing is charged
          </div>
        </header>

        <form className="checkout-layout" onSubmit={submit}>
          <div style={{ display: "grid", gap: 22 }}>
            <Reveal>
              <section className="card checkout-step" aria-labelledby="step-contact">
                <h2 className="step-title" id="step-contact">
                  <span className="n">{nextStep()}</span>
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
                  <span className="n">{nextStep()}</span>
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

            {!rentalsOnly && (
              <Reveal delay={2}>
                <section className="card checkout-step" aria-labelledby="step-payment">
                  <h2 className="step-title" id="step-payment">
                    <span className="n">{nextStep()}</span>
                    Payment
                  </h2>
                  <div className="pay-grid">
                    <div className={`field card-field${payErrors.number ? " has-error" : ""}`}>
                      <label htmlFor="co-card">Card number</label>
                      <input
                        id="co-card"
                        inputMode="numeric"
                        autoComplete="cc-number"
                        placeholder="1234 5678 9012 3456"
                        value={cardNumber}
                        onChange={(e) => {
                          setCardNumber(formatCardNumber(e.target.value));
                          setPayErrors((p) => ({ ...p, number: undefined }));
                        }}
                      />
                      {brand && <span className="card-brand">{brand}</span>}
                      {payErrors.number && <span className="field-error">{payErrors.number}</span>}
                    </div>
                    <div className={`field${payErrors.expiry ? " has-error" : ""}`}>
                      <label htmlFor="co-exp">Expiry</label>
                      <input
                        id="co-exp"
                        inputMode="numeric"
                        autoComplete="cc-exp"
                        placeholder="MM/YY"
                        value={expiry}
                        onChange={(e) => {
                          setExpiry(formatExpiry(e.target.value));
                          setPayErrors((p) => ({ ...p, expiry: undefined }));
                        }}
                      />
                      {payErrors.expiry && <span className="field-error">{payErrors.expiry}</span>}
                    </div>
                    <div className={`field${payErrors.cvc ? " has-error" : ""}`}>
                      <label htmlFor="co-cvc">CVC</label>
                      <input
                        id="co-cvc"
                        inputMode="numeric"
                        autoComplete="cc-csc"
                        placeholder="123"
                        value={cvc}
                        onChange={(e) => {
                          setCvc(digitsOnly(e.target.value).slice(0, 4));
                          setPayErrors((p) => ({ ...p, cvc: undefined }));
                        }}
                      />
                      {payErrors.cvc && <span className="field-error">{payErrors.cvc}</span>}
                    </div>
                  </div>
                  <span className="pay-secure">
                    <Lock size={14} strokeWidth={1.8} />
                    Your card is validated, never charged — this boutique is in preview.
                  </span>
                </section>
              </Reveal>
            )}

            {rentalsOnly && (
              <Reveal delay={2}>
                <section className="card checkout-step" aria-labelledby="step-quote">
                  <h2 className="step-title" id="step-quote">
                    <span className="n">{nextStep()}</span>
                    Your Quote
                  </h2>
                  <div className="pay-note">
                    <Sparkles size={20} strokeWidth={1.7} />
                    <span>
                      <b style={{ fontWeight: 600 }}>No payment needed today.</b> We price every
                      rental for your date and table count, then confirm by phone or WhatsApp —
                      nothing moves until you approve.
                    </span>
                  </div>
                </section>
              </Reveal>
            )}
          </div>

          <Reveal delay={1}>
            <aside className="card summary-card" aria-label="Order summary">
              <h2 className="display-sm">Summary</h2>
              <hr className="foil-rule" />
              <div style={{ display: "grid", gap: 12 }}>
                {cart.map((line, i) => {
                  const product = lineProduct(line)!;
                  const isRental = product.price === 0;
                  return (
                    <div key={i} className="summary-row" style={{ alignItems: "center" }}>
                      <span style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0 }}>
                        <img src={product.image} alt="" width={44} height={44} style={{ borderRadius: "var(--radius-mini)", objectFit: "cover", width: 44, height: 44, flex: "none" }} loading="lazy" />
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
              <hr className="hairline" />
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
              <div className="summary-row total">
                <span>Due today</span>
                <span className="tnum">{formatPrice(subtotal)}</span>
              </div>
              <button
                className={`btn btn-gold${processing ? " is-processing" : ""}`}
                type="submit"
                disabled={processing}
              >
                {processing ? (
                  "Processing…"
                ) : (
                  <>
                    {rentalsOnly ? (
                      "Send Quote Request"
                    ) : (
                      <>
                        <ShieldCheck size={16} strokeWidth={2} />
                        Pay {formatPrice(subtotal)}
                      </>
                    )}
                    <ArrowRight size={16} strokeWidth={2} />
                  </>
                )}
              </button>
              <p className="summary-note">
                {rentalsOnly
                  ? "Sending the request costs nothing — we confirm availability and pricing before anything is reserved."
                  : "This boutique is in preview: your card is checked the way a real checkout would, but never charged, and no order ships yet."}
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
