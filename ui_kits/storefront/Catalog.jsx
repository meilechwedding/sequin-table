/* Sequin storefront — §4 Curated Linens editorial grid v2
   Diagonal-corner chips · editorial info-below-image layout · no rounded pills */

const SEQUIN_PRODUCTS = [
  { id: "willow",        name: "Willow Runner",     cat: "home",   catLabel: "Home Linen", price: "$48",             img: "../../assets/img/willow.jpg",   flag: "New" },
  { id: "lilac",         name: "Lilac Tablecloth",  cat: "home",   catLabel: "Home Linen", price: "$62",             img: "../../assets/img/lilac.jpg",    flag: "Bestseller" },
  { id: "hamton",        name: "Hampton Stripe",    cat: "home",   catLabel: "Home Linen", price: "$58",             img: "../../assets/img/hamton.jpg" },
  { id: "dijan",         name: "Dijon Weave",       cat: "home",   catLabel: "Home Linen", price: "$54",             img: "../../assets/img/dijan.jpg" },
  { id: "taupe",         name: "Taupe Pendant",     cat: "rental", catLabel: "Rental",     price: "from $120 / day", img: "../../assets/img/taupe.jpg",    rental: true },
  { id: "soiree",        name: "Bordeaux Soirée",   cat: "rental", catLabel: "Rental",     price: "from $140 / day", img: "../../assets/img/home.jpg",     rental: true, flag: "Bestseller" },
  { id: "conservatory",  name: "Conservatory Gold", cat: "rental", catLabel: "Rental",     price: "from $160 / day", img: "../../assets/img/hero.jpg",     rental: true },
  { id: "verdant",       name: "Verdant Hydrangea", cat: "rental", catLabel: "Rental",     price: "from $135 / day", img: "../../assets/img/rentals.jpg",  rental: true, flag: "New" },
];

function Catalog({ filter, onFilter, favs, onFav, onAdd }) {
  const { useEffect, useRef } = React;
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        [...e.target.querySelectorAll(".sq-rv")].forEach((el, i) => {
          el.style.transitionDelay = i * 55 + "ms";
          el.classList.add("sq-show");
        });
      });
    }, { threshold: 0.06 });
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const chips = [
    { id: "all",    label: "All" },
    { id: "home",   label: "Buy" },
    { id: "rental", label: "Rent" },
  ];

  const items = SEQUIN_PRODUCTS.filter(p => filter === "all" || p.cat === filter);

  const tagFor = (p) => {
    if (p.flag === "Bestseller") return { label: "Bestseller", bg: "#221A12", fg: "#BE9A6E" };
    if (p.flag === "New")        return { label: "New",        bg: "#BE9A6E", fg: "#221A12" };
    if (p.rental && !p.flag)     return { label: "Rental",     bg: "#6B4F3A", fg: "#F7F2EA" };
    return null;
  };

  return (
    <section ref={ref} style={catS.wrap} id="catalog">
      <style>{`
        .sq-pc2 img   { transition: transform 400ms cubic-bezier(.4,0,.2,1); }
        .sq-pc2:hover img { transform: scale(1.03); }
        .sq-pc2-rule  { width: 0; height: 1px; background: #BE9A6E; transition: width 400ms cubic-bezier(.4,0,.2,1); margin-top: 7px; }
        .sq-pc2:hover .sq-pc2-rule { width: 36px; }
        .sq-chip { border: none; cursor: pointer; transition: background .18s, color .18s; }
        .sq-chip:hover { opacity: .82; }
        .sq-hrt  { cursor: pointer; transition: transform .2s; }
        .sq-hrt:hover { transform: scale(1.14); }
        @media (max-width:1024px) { .sq-cat-grid { grid-template-columns: repeat(2,1fr) !important; } }
        @media (max-width:640px)  { .sq-cat-grid { grid-template-columns: 1fr !important; } }
      `}</style>

      {/* ── Head ── */}
      <div style={catS.head}>
        <div style={catS.headLeft}>
          <span className="sq-rv" style={catS.eyebrow}>( The Collection )</span>
          <div style={{ display: "flex", alignItems: "baseline", gap: 18, flexWrap: "wrap" }}>
            <h2 className="sq-rv" style={catS.h2}>Curated Linens</h2>
            <em className="sq-rv" style={catS.count}>{items.length} pieces</em>
          </div>
        </div>
        <div className="sq-rv" style={catS.filterBar}>
          <span style={catS.filterLabel}>Filter</span>
          <div style={{ display: "flex", gap: 8 }}>
            {chips.map(c => (
              <button key={c.id} className="sq-chip"
                onClick={() => onFilter(c.id)}
                style={{ ...catS.chip, ...(filter === c.id ? catS.chipOn : catS.chipOff) }}>
                {c.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Grid ── */}
      <div className="sq-cat-grid" style={catS.grid}>
        {items.map(p => {
          const tag = tagFor(p);
          const fav = !!(favs && favs[p.id]);
          return (
            <article key={p.id} className="sq-rv sq-pc2" style={catS.card} onClick={() => onAdd && onAdd(p)}>
              <div style={catS.frame}>
                <img src={p.img} alt={p.name} style={catS.img} />
                {tag && (
                  <span style={{ ...catS.tag, background: tag.bg, color: tag.fg }}>{tag.label}</span>
                )}
                <button className="sq-hrt" aria-label="Save"
                  onClick={e => { e.stopPropagation(); onFav && onFav(p.id); }}
                  style={catS.heart}>
                  <svg width="15" height="15" viewBox="0 0 24 24"
                    fill={fav ? "#BE9A6E" : "none"} stroke="#BE9A6E" strokeWidth="1.5">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                  </svg>
                </button>
              </div>
              <div style={catS.info}>
                <span style={catS.catLabel}>( {p.catLabel} )</span>
                <h3 style={catS.name}>{p.name}</h3>
                <span style={catS.price}>{p.price}</span>
                <div className="sq-pc2-rule" />
              </div>
            </article>
          );
        })}
      </div>

      <div style={{ textAlign: "center", marginTop: 64 }}>
        <a href="#" style={catS.viewAll}>View All Linens →</a>
      </div>
    </section>
  );
}

const catS = {
  wrap:        { background: "#F7F2EA", padding: "80px 44px 104px" },
  head:        { maxWidth: 1300, margin: "0 auto 52px", display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 24, flexWrap: "wrap" },
  headLeft:    { display: "flex", flexDirection: "column", gap: 10 },
  eyebrow:     { fontFamily: "var(--font-ui)", fontSize: 10, fontWeight: 500, letterSpacing: "0.4em", textTransform: "uppercase", color: "#BE9A6E", display: "block" },
  h2:          { fontFamily: "'Audrey','Playfair Display','Cormorant Garamond',Georgia,serif", fontWeight: 500, fontSize: "clamp(28px,3vw,38px)", letterSpacing: "-0.01em", color: "#221A12", margin: 0 },
  count:       { fontFamily: "var(--font-ui)", fontStyle: "italic", fontSize: 14, color: "#9A8A75" },
  filterBar:   { display: "flex", alignItems: "center", gap: 14 },
  filterLabel: { fontFamily: "var(--font-ui)", fontSize: 10.5, fontWeight: 500, letterSpacing: "0.22em", textTransform: "uppercase", color: "#9A8A75" },
  chip:        { fontFamily: "var(--font-ui)", fontSize: 11, fontWeight: 500, letterSpacing: "0.14em", textTransform: "uppercase", padding: "8px 18px", borderRadius: "11px 0 11px 0" },
  chipOn:      { background: "#221A12", color: "#FBF6EF", border: "1px solid #221A12" },
  chipOff:     { background: "transparent", color: "#3A2A20", border: "1px solid #6B4F3A" },
  grid:        { maxWidth: 1300, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "36px 24px" },
  card:        { cursor: "pointer", display: "flex", flexDirection: "column", gap: 14 },
  frame:       { position: "relative", borderRadius: "20px 0 20px 0", overflow: "hidden", aspectRatio: "3/4", background: "#EAE2D4" },
  img:         { width: "100%", height: "100%", objectFit: "cover", display: "block" },
  tag:         { position: "absolute", top: 14, left: 14, fontFamily: "var(--font-ui)", fontSize: 9.5, fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", padding: "5px 12px", borderRadius: "11px 0 11px 0" },
  heart:       { position: "absolute", top: 14, right: 14, width: 32, height: 32, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid rgba(190,154,110,.55)", background: "rgba(247,242,234,.78)", backdropFilter: "blur(4px)" },
  info:        { display: "flex", flexDirection: "column", gap: 5, padding: "0 2px" },
  catLabel:    { fontFamily: "var(--font-ui)", fontSize: 9.5, fontWeight: 500, letterSpacing: "0.3em", textTransform: "uppercase", color: "#BE9A6E" },
  name:        { fontFamily: "'Audrey','Playfair Display','Cormorant Garamond',Georgia,serif", fontWeight: 500, fontSize: 18, lineHeight: 1.15, color: "#221A12", margin: 0 },
  price:       { fontFamily: "var(--font-ui)", fontSize: 13.5, color: "#6B4F3A" },
  viewAll:     { display: "inline-block", fontFamily: "var(--font-ui)", fontSize: 12.5, fontWeight: 500, letterSpacing: "0.16em", textTransform: "uppercase", color: "#221A12", textDecoration: "none", borderBottom: "1px solid #BE9A6E", paddingBottom: 2 },
};

window.SEQUIN_PRODUCTS = SEQUIN_PRODUCTS;
window.SequinCatalog = Catalog;
