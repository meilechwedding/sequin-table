/* Sequin storefront — Header v2: full IA, six-link expanded nav */
const { IconButton, Monogram } = window.SequinDesignSystem_ec3cc5;

function Header({ cartCount = 0, onCart, active, onNav }) {
  const leftLinks = [
    { id: "rent",        label: "Rent",        href: "rent.html" },
    { id: "buy",         label: "Buy",         href: "buy.html" },
    { id: "collections", label: "Collections", href: "index.html#catalog" },
  ];
  const rightLinks = [
    { id: "about",   label: "About",   href: "about.html" },
    { id: "process", label: "Process", href: "process.html" },
    { id: "contact", label: "Contact", href: "#contact" },
  ];

  const go = (id, href) => {
    if (onNav) { onNav(id, href); return; }
    window.location.href = href;
  };

  const Link = ({ id, label, href }) => (
    <button
      onClick={() => go(id, href)}
      style={{ ...hdS.link, ...(active === id ? hdS.active : {}) }}
      aria-current={active === id ? "page" : undefined}
    >
      {label}
      {active === id && <span style={hdS.activeLine} aria-hidden="true" />}
    </button>
  );

  return (
    <header style={hdS.bar} className="glass">
      <nav style={hdS.left} aria-label="Shop">
        {leftLinks.map(l => <Link key={l.id} {...l} />)}
      </nav>

      <button style={hdS.brand} onClick={() => go("home", "index.html")} aria-label="Sequin home">
        <Monogram variant="lockup" size={30} />
      </button>

      <div style={hdS.right}>
        <nav style={hdS.rightNav} aria-label="Company">
          {rightLinks.map(l => <Link key={l.id} {...l} />)}
        </nav>
        <div style={hdS.actions}>
          <IconButton variant="bare" size="sm" label="Search"><i data-lucide="search"></i></IconButton>
          <IconButton variant="bare" size="sm" label="Account"><i data-lucide="user"></i></IconButton>
          <div style={{ position: "relative" }}>
            <IconButton size="sm" label="Cart" onClick={onCart}><i data-lucide="shopping-bag"></i></IconButton>
            {cartCount > 0 && <span style={hdS.badge}>{cartCount}</span>}
          </div>
        </div>
      </div>
    </header>
  );
}

const hdS = {
  bar: {
    position: "sticky", top: 0, zIndex: 40,
    display: "grid", gridTemplateColumns: "1fr auto 1fr", alignItems: "center",
    padding: "14px 44px", borderRadius: 0, borderLeft: 0, borderRight: 0, borderTop: 0,
  },
  left:     { display: "flex", gap: 34, alignItems: "center" },
  right:    { display: "flex", gap: 22, alignItems: "center", justifySelf: "end" },
  rightNav: { display: "flex", gap: 28, alignItems: "center" },
  brand:    { background: "none", border: 0, cursor: "pointer", justifySelf: "center" },
  actions:  { display: "flex", gap: 6, alignItems: "center" },
  link: {
    position: "relative",
    background: "none", border: 0, cursor: "pointer", padding: "6px 0",
    fontFamily: "var(--font-ui)", fontSize: 11.5, fontWeight: 500,
    letterSpacing: ".16em", textTransform: "uppercase",
    color: "var(--text-soft)", transition: "color .22s",
  },
  active: { color: "var(--accent-text)" },
  activeLine: {
    position: "absolute", bottom: 0, left: 0, right: 0,
    height: 1, background: "var(--gold-500)", display: "block",
  },
  badge: {
    position: "absolute", top: -4, right: -4, minWidth: 18, height: 18, padding: "0 4px",
    borderRadius: 999, background: "var(--feature)", color: "#fff", fontSize: 10, fontWeight: 700,
    display: "flex", alignItems: "center", justifyContent: "center",
  },
};

window.SequinHeader = Header;
