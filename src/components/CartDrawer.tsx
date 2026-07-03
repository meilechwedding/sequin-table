import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, ShoppingBag, X } from "lucide-react";
import { formatPrice } from "../data/products";
import { cartTotals, lineProduct, useStore } from "../lib/store";
import { QtyStepper } from "./bits";

export default function CartDrawer() {
  const { cart, drawerOpen, setDrawerOpen, updateQty } = useStore();
  const navigate = useNavigate();
  const { subtotal, rental } = cartTotals(cart);

  useEffect(() => {
    if (!drawerOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDrawerOpen(false);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [drawerOpen, setDrawerOpen]);

  if (!drawerOpen) return null;

  return (
    <>
      <div className="drawer-veil" onClick={() => setDrawerOpen(false)} aria-hidden />
      <aside className="drawer" role="dialog" aria-modal="true" aria-label="Your cart">
        <div className="drawer-head">
          <span className="display-sm">Your Table So Far</span>
          <button className="icon-btn" aria-label="Close cart" onClick={() => setDrawerOpen(false)}>
            <X size={20} strokeWidth={1.6} />
          </button>
        </div>

        <div className="drawer-body">
          {cart.length === 0 ? (
            <div className="empty-state" style={{ padding: "48px 12px" }}>
              <ShoppingBag size={28} strokeWidth={1.4} style={{ color: "var(--accent)" }} />
              <h3 className="display-sm">Your cart is waiting to be set.</h3>
              <p>Begin with the collection — rentals for the event, linens for home.</p>
              <Link to="/shop" className="btn btn-dark btn-sm" onClick={() => setDrawerOpen(false)}>
                Browse the Collection
              </Link>
            </div>
          ) : (
            cart.map((line, index) => {
              const product = lineProduct(line);
              if (!product) return null;
              const isRental = product.price === 0;
              return (
                <div className="drawer-line" key={`${line.productId}-${line.variant}-${index}`}>
                  <img src={product.image} alt={product.title} loading="lazy" />
                  <div style={{ display: "grid", gap: 4, minWidth: 0 }}>
                    <span style={{ fontFamily: "var(--font-display)", fontSize: "0.98rem" }}>
                      {product.title}
                    </span>
                    <span style={{ fontSize: "0.78rem", color: "var(--ink-faint)" }}>
                      {line.variant}
                      {isRental && line.date ? ` · ${line.date}` : ""}
                    </span>
                    <QtyStepper qty={line.qty} onDelta={(d) => updateQty(index, d)} label={`Quantity of ${product.title}`} />
                  </div>
                  <span className="tnum" style={{ fontWeight: 500, fontSize: "0.92rem" }}>
                    {isRental ? "Quote" : formatPrice(product.price * line.qty)}
                  </span>
                </div>
              );
            })
          )}
        </div>

        {cart.length > 0 && (
          <div className="drawer-foot">
            <div className="summary-row total">
              <span>Subtotal</span>
              <span className="tnum">{formatPrice(subtotal)}</span>
            </div>
            {rental.length > 0 && (
              <p className="summary-note">
                {rental.length} rental {rental.length === 1 ? "piece" : "pieces"} will be quoted for
                your event date.
              </p>
            )}
            <button
              className="btn btn-gold"
              onClick={() => {
                setDrawerOpen(false);
                navigate("/cart");
              }}
            >
              Review Cart
              <ArrowRight size={16} strokeWidth={2} />
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
