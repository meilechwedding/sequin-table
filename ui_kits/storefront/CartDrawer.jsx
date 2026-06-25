/* Sequin storefront — slide-in cart drawer */
const { IconButton, Button, Divider } = window.SequinDesignSystem_ec3cc5;

function CartDrawer({ open, items, onClose, onQty, onRemove }) {
  const list = Object.values(items);
  const subtotal = list.reduce((s, it) => s + it.qtyPrice * it.qty, 0);
  return (
    <React.Fragment>
      <div style={{ ...cartStyles.scrim, opacity: open ? 1 : 0, pointerEvents: open ? "auto" : "none" }} onClick={onClose}></div>
      <aside style={{ ...cartStyles.drawer, transform: open ? "translateX(0)" : "translateX(105%)" }} data-theme="noir">
        <div style={cartStyles.head}>
          <h3 style={cartStyles.title}>Your Cart <span style={cartStyles.cnt}>{list.reduce((s, i) => s + i.qty, 0)}</span></h3>
          <IconButton variant="bare" size="sm" label="Close" onClick={onClose}><i data-lucide="x"></i></IconButton>
        </div>
        <Divider style={{ margin: "0 0 4px" }} />

        <div style={cartStyles.items}>
          {list.length === 0 && (
            <div style={cartStyles.empty}>
              <i data-lucide="shopping-bag" style={{ width: 30, height: 30, opacity: .5 }}></i>
              <p style={{ margin: "12px 0 0", color: "var(--text-muted)", fontSize: 14 }}>Your cart is empty.</p>
            </div>
          )}
          {list.map((it) => (
            <div key={it.id} style={cartStyles.row}>
              <img src={it.img} alt={it.name} style={cartStyles.thumb} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={cartStyles.cat}>{it.catLabel}</div>
                <div style={cartStyles.name}>{it.name}</div>
                <div style={cartStyles.price}>{it.price}{it.unit ? ` ${it.unit}` : ""}</div>
              </div>
              <div style={cartStyles.qtyCol}>
                <div style={cartStyles.qty}>
                  <button style={cartStyles.qtyBtn} onClick={() => onQty(it.id, -1)} aria-label="Less">–</button>
                  <span style={cartStyles.qtyN}>{it.qty}</span>
                  <button style={cartStyles.qtyBtn} onClick={() => onQty(it.id, 1)} aria-label="More">+</button>
                </div>
                <button style={cartStyles.remove} onClick={() => onRemove(it.id)}>Remove</button>
              </div>
            </div>
          ))}
        </div>

        {list.length > 0 && (
          <div style={cartStyles.foot}>
            <div style={cartStyles.subRow}>
              <span style={cartStyles.subLabel}>Subtotal</span>
              <span style={cartStyles.subVal}>${subtotal.toLocaleString()}</span>
            </div>
            <p style={cartStyles.note}>Rentals priced per day · shipping &amp; styling calculated at checkout.</p>
            <Button variant="primary" size="lg" style={{ width: "100%" }}>Checkout</Button>
          </div>
        )}
      </aside>
    </React.Fragment>
  );
}

const cartStyles = {
  scrim: { position: "fixed", inset: 0, background: "rgba(18,13,8,.5)", backdropFilter: "blur(2px)", zIndex: 80, transition: "opacity .35s var(--ease-out)" },
  drawer: { position: "fixed", top: 0, right: 0, bottom: 0, width: "min(420px, 92vw)", zIndex: 90, background: "var(--grad-noir)", borderLeft: "1px solid var(--border-gold)", boxShadow: "var(--shadow-5)", display: "flex", flexDirection: "column", padding: "22px 24px", transition: "transform .45s var(--ease-luxe)" },
  head: { display: "flex", alignItems: "center", justifyContent: "space-between" },
  title: { fontFamily: "var(--font-display)", fontWeight: 300, fontSize: 24, letterSpacing: ".04em", color: "var(--cream-50)", margin: 0, display: "flex", alignItems: "center", gap: 10 },
  cnt: { fontFamily: "var(--font-ui)", fontSize: 12, fontWeight: 600, color: "var(--espresso-900)", background: "var(--foil-gold)", borderRadius: 999, padding: "2px 9px" },
  items: { flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: 16, padding: "8px 2px" },
  empty: { textAlign: "center", padding: "60px 0", color: "var(--gold-300)" },
  row: { display: "flex", gap: 14, alignItems: "flex-start" },
  thumb: { width: 64, height: 80, objectFit: "cover", borderRadius: "var(--radius-sm)", flex: "none", boxShadow: "var(--shadow-1)" },
  cat: { fontSize: 9.5, letterSpacing: ".18em", textTransform: "uppercase", color: "var(--gold-300)" },
  name: { fontFamily: "var(--font-display)", fontSize: 17, color: "var(--cream-50)", margin: "2px 0 3px" },
  price: { fontSize: 13, color: "var(--text-soft)" },
  qtyCol: { display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8 },
  qty: { display: "flex", alignItems: "center", gap: 4, border: "1px solid var(--border)", borderRadius: 999, padding: "2px" },
  qtyBtn: { width: 24, height: 24, borderRadius: 999, border: 0, background: "transparent", color: "var(--cream-50)", cursor: "pointer", fontSize: 15, lineHeight: 1 },
  qtyN: { minWidth: 16, textAlign: "center", fontSize: 13, color: "var(--cream-50)" },
  remove: { background: "none", border: 0, color: "var(--text-faint)", fontSize: 11, letterSpacing: ".06em", textTransform: "uppercase", cursor: "pointer" },
  foot: { paddingTop: 16, borderTop: "1px solid var(--hairline)" },
  subRow: { display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 6 },
  subLabel: { fontSize: 12, letterSpacing: ".16em", textTransform: "uppercase", color: "var(--text-muted)" },
  subVal: { fontFamily: "var(--font-display)", fontSize: 26, color: "var(--gold-300)" },
  note: { fontSize: 11.5, color: "var(--text-faint)", margin: "0 0 16px", lineHeight: 1.5 },
};

window.SequinCartDrawer = CartDrawer;
