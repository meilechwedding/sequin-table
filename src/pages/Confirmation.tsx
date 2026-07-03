import { Link, useParams } from "react-router-dom";
import { MessageCircle } from "lucide-react";
import { formatPrice } from "../data/products";
import { contact } from "../data/site";
import { lineProduct, useStore } from "../lib/store";
import { useDocTitle } from "../lib/hooks";

export default function Confirmation() {
  useDocTitle("Order Received");
  const { id } = useParams();
  const { lastOrder } = useStore();
  const order = lastOrder && lastOrder.id === id ? lastOrder : null;

  return (
    <main className="wrap">
      <div className="confirm-hero">
        <div className="confirm-card">
          <span className="monogram-seal" style={{ width: 80, height: 80, fontSize: "1.2rem", color: "var(--accent-strong)", borderColor: "var(--line-strong)" }}>
            ST
          </span>
          <span className="eyebrow eyebrow-center">Order Received</span>
          <h1 className="display-lg" style={{ textWrap: "balance" }}>
            The Table Is in Good Hands{order?.name ? `, ${order.name.split(" ")[0]}` : ""}.
          </h1>
          {id && <span className="order-no tnum">{id}</span>}
          <p className="lede" style={{ textAlign: "center" }}>
            We'll confirm every detail — sizes, dates, delivery, and any rental quote — by phone or
            WhatsApp within one business day. Nothing is charged until you approve.
          </p>

          {order && order.lines.length > 0 && (
            <div className="card" style={{ padding: 22, display: "grid", gap: 10, width: "100%", textAlign: "left" }}>
              {order.lines.map((line, i) => {
                const product = lineProduct(line);
                if (!product) return null;
                return (
                  <div key={i} className="summary-row">
                    <span>
                      {product.title} · {line.variant} × {line.qty}
                    </span>
                    <span className="tnum">
                      {product.price > 0 ? formatPrice(product.price * line.qty) : "Quote"}
                    </span>
                  </div>
                );
              })}
              <hr className="hairline" />
              <div className="summary-row total">
                <span>Home linen total</span>
                <span className="tnum">{formatPrice(order.total)}</span>
              </div>
            </div>
          )}

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
            <a className="btn btn-gold" href={contact.whatsapp} target="_blank" rel="noreferrer">
              <MessageCircle size={16} strokeWidth={2} />
              WhatsApp Us
            </a>
            <Link to="/" className="btn btn-ghost">
              Back to the Beginning
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
