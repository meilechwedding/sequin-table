/* Sequin storefront — HERO v2.
   The draped tablecloth cutout is the focal point, front-and-center, overlapping
   a giant ghost collection name. Clean espresso background (no photo, no glass card).
   All text sits directly on the background. */

const SQ_HERO_SLIDES = [
  { name: "VERDE",     img: "assets/cloths/verde-rich.png",     price: "from $135 / day", bg: "#1F3D2C" },
  { name: "BORDEAUX",  img: "assets/cloths/bordeaux-rich.png",  price: "from $160 / day", bg: "#511E29" },
  { name: "CHAMPAGNE", img: "assets/cloths/champagne-rich.png", price: "from $130 / day", bg: "#463C30" },
  { name: "AURELIA",   img: "assets/cloths/aurelia-rich.png",   price: "from $145 / day", bg: "#54400F" },
  { name: "NOIR",      img: "assets/cloths/noir-rich.png",      price: "from $120 / day", bg: "#1C1610" },
];
const SQ_HERO_DUR = 650;        // master transition
const SQ_HERO_AUTO = 6000;      // auto-advance

/* Per-role transform recipe (relative offset from the active slide). */
const SQ_ROLES = {
  center: { x: 0,    y: 0,   s: 1.36, blur: 0, op: 1,    z: 6, shadow: 30 },
  right:  { x: 320,  y: 26,  s: 0.78, blur: 2, op: 0.8,  z: 4, shadow: 18 },
  left:   { x: -320, y: 26,  s: 0.78, blur: 2, op: 0.8,  z: 4, shadow: 18 },
  back:   { x: 0,    y: -34, s: 0.58, blur: 4, op: 0.42, z: 2, shadow: 12 },
  hidden: { x: 0,    y: 30,  s: 0.5,  blur: 6, op: 0,    z: 1, shadow: 0  },
};

function Hero({ onShop }) {
  const { useState, useEffect, useRef, useCallback } = React;
  const n = SQ_HERO_SLIDES.length;
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const lockRef = useRef(false);

  const goTo = useCallback((i) => {
    if (lockRef.current) return;            // lock during the 650ms transition
    lockRef.current = true;
    setActive(((i % n) + n) % n);
    setTimeout(() => { lockRef.current = false; }, SQ_HERO_DUR);
  }, [n]);
  const next = useCallback(() => goTo(active + 1), [goTo, active]);
  const prev = useCallback(() => goTo(active - 1), [goTo, active]);

  // auto-advance (respects reduced-motion + pause)
  useEffect(() => {
    if (paused) return undefined;
    const rm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (rm) return undefined;
    const id = setTimeout(() => setActive((a) => (a + 1) % n), SQ_HERO_AUTO);
    return () => clearTimeout(id);
  }, [active, paused, n]);

  // keyboard nav
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  useEffect(() => { window.lucide && window.lucide.createIcons(); }, [active]);

  const cur = SQ_HERO_SLIDES[active];

  const roleFor = (offset) => {
    if (offset === 0) return SQ_ROLES.center;
    if (offset === 1) return SQ_ROLES.right;
    if (offset === n - 1) return SQ_ROLES.left;
    if (offset === 2) return SQ_ROLES.back;
    return SQ_ROLES.hidden;
  };

  return (
    <section
      data-theme="noir"
      className={"sq-hero2 grain" + (paused ? " is-paused" : "")}
      style={{ ...h2.wrap, backgroundColor: cur.bg }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="Featured tablecloth collections"
    >
      <style>{`
        .sq-hero2 { --sq-cloth-w: 440px; }
        @keyframes sqGhostIn { from { opacity: 0; transform: translate(-50%, calc(-50% + 26px)); } to { opacity: .9; transform: translate(-50%, -50%); } }
        @keyframes sqBounce { 0%,100% { transform: translateY(0); } 50% { transform: translateY(6px); } }
        .sq-cloth { transition: transform ${SQ_HERO_DUR}ms cubic-bezier(.4,0,.2,1),
            opacity ${SQ_HERO_DUR}ms cubic-bezier(.4,0,.2,1),
            filter ${SQ_HERO_DUR}ms cubic-bezier(.4,0,.2,1); }
        .sq-ghost { animation: sqGhostIn ${SQ_HERO_DUR}ms cubic-bezier(.4,0,.2,1) both; }
        .sq-cta-arrow { transition: background .3s ease, border-color .3s ease, transform .3s ease, color .3s ease; }
        .sq-cta-gold { transition: filter .3s ease, transform .3s ease, box-shadow .3s ease; }
        .sq-cta-gold:hover { transform: translateY(-2px); box-shadow: 0 10px 28px rgba(216,180,132,.30); filter: brightness(1.04); }
        .sq-cta-out { transition: background .3s ease, border-color .3s ease, transform .3s ease; }
        .sq-cta-out:hover { background: rgba(216,180,132,.10); border-color: var(--gold); transform: translateY(-2px); }
        .sq-narrow { transition: background .3s ease, border-color .3s ease, transform .3s ease; }
        .sq-narrow:hover { background: rgba(216,180,132,.12); border-color: var(--gold); transform: translateY(-1px); }
        .sq-scroll { animation: sqBounce 2.4s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .sq-cloth { transition: opacity 200ms linear; }
          .sq-ghost { animation: none; opacity: .9; }
          .sq-scroll { animation: none; }
        }
        @media (max-width: 1024px) { .sq-hero2 { --sq-cloth-w: 360px; } }
        @media (max-width: 640px) {
          .sq-hero2 { --sq-cloth-w: 260px; }
          .sq-hero2 .sq-cloth[data-role="left"],
          .sq-hero2 .sq-cloth[data-role="right"],
          .sq-hero2 .sq-cloth[data-role="back"] { opacity: 0 !important; }
          .sq-hero2 .sq-headline { font-size: 30px !important; }
          .sq-hero2 .sq-cta-out { display: none !important; }
          .sq-hero2 .sq-pricetag { display: none !important; }
        }
      `}</style>

      {/* film grain handled by .grain ::before */}

      {/* 1 — giant ghost name (behind the cloth) */}
      <h2 key={active} className="sq-ghost" style={h2.ghost}>{cur.name}</h2>

      {/* 2 — cutout cloths */}
      <div style={h2.stage} aria-hidden="false">
        {SQ_HERO_SLIDES.map((s, i) => {
          const offset = ((i - active) % n + n) % n;
          const r = roleFor(offset);
          const roleName = offset === 0 ? "center" : offset === 1 ? "right" : offset === n - 1 ? "left" : offset === 2 ? "back" : "hidden";
          return (
            <img
              key={s.img}
              src={s.img}
              alt={offset === 0 ? `${s.name} draped tablecloth` : ""}
              className="sq-cloth"
              data-role={roleName}
              style={{
                position: "absolute", left: "50%", bottom: -34,
                width: "var(--sq-cloth-w)", height: "auto",
                transformOrigin: "bottom center",
                transform: `translateX(calc(-50% + ${r.x}px)) translateY(${r.y}px) scale(${r.s})`,
                opacity: r.op, zIndex: r.z,
                filter: `drop-shadow(0 ${r.shadow}px ${r.shadow}px rgba(0,0,0,.55)) blur(${r.blur}px)`,
                pointerEvents: "none", userSelect: "none",
              }}
            />
          );
        })}
      </div>

      {/* 3 — text directly on background */}
      <div style={h2.eyebrow}>Events &amp; Home · Brooklyn</div>

      <div style={h2.block}>
        <h1 className="sq-headline" style={h2.headline}>
          Upscale Table Linen for <span style={{ fontStyle: "italic", color: "var(--gold)" }}>Every</span> Celebration
        </h1>
        <p style={h2.sub}>Linens to rent for the occasion — or own for always.</p>
        <div style={h2.cta}>
          <button type="button" className="sq-cta-gold" style={h2.ctaGold} onClick={() => onShop && onShop("rental")}>
            Explore Rentals
          </button>
          <button type="button" className="sq-cta-out" style={h2.ctaOut} onClick={() => onShop && onShop("home")}>
            Shop Home <i data-lucide="arrow-right" style={{ width: 15, height: 15 }}></i>
          </button>
        </div>
      </div>

      {/* 4 — prev/next + counter + price (bottom-right) */}
      <div style={h2.navWrap}>
        <span className="sq-pricetag" style={h2.priceTag}>{cur.price}</span>
        <button type="button" aria-label="Previous collection" className="sq-narrow" style={h2.narrow} onClick={prev}>
          <i data-lucide="arrow-left" style={{ width: 16, height: 16 }}></i>
        </button>
        <button type="button" aria-label="Next collection" className="sq-narrow" style={h2.narrow} onClick={next}>
          <i data-lucide="arrow-right" style={{ width: 16, height: 16 }}></i>
        </button>
        <span style={h2.counter}>
          {String(active + 1).padStart(2, "0")}<span style={{ opacity: .5 }}> / {String(n).padStart(2, "0")}</span>
        </span>
      </div>

      {/* 5 — scroll cue (bottom-center) */}
      <div style={h2.scrollWrap} aria-hidden="true">
        <span style={h2.scrollTxt}>Scroll</span>
        <i data-lucide="chevron-down" className="sq-scroll" style={{ width: 18, height: 18, color: "var(--gold-300)" }}></i>
      </div>
    </section>
  );
}

const IVORY = "#FBF6EF";
const h2 = {
  wrap: {
    position: "relative", minHeight: "92vh", overflow: "hidden",
    transition: `background-color ${SQ_HERO_DUR}ms cubic-bezier(.4,0,.2,1)`,
    backgroundColor: "#1F3D2C",
    isolation: "isolate",
  },
  ghost: {
    position: "absolute", left: "50%", top: "42%",
    transform: "translate(-50%, -50%)",
    margin: 0, zIndex: 1,
    fontFamily: "'Audrey', 'Playfair Display', 'Cormorant Garamond', Georgia, serif", fontWeight: 500,
    fontSize: "clamp(64px, 22vw, 300px)", lineHeight: 1,
    letterSpacing: "-0.02em", textTransform: "uppercase",
    color: "#F7F2EA", opacity: 0.9, whiteSpace: "nowrap",
    pointerEvents: "none", userSelect: "none",
  },
  stage: { position: "absolute", inset: 0, zIndex: 2 },

  eyebrow: {
    position: "absolute", top: 34, left: 48, zIndex: 10,
    fontFamily: "var(--font-ui)", fontSize: 10, fontWeight: 500,
    letterSpacing: "0.4em", textTransform: "uppercase", color: "#BE9A6E",
  },
  block: { position: "absolute", left: 48, bottom: 56, zIndex: 10, maxWidth: 480 },
  headline: {
    fontFamily: "var(--font-display)", fontWeight: 500,
    fontSize: 42, lineHeight: 1.08, letterSpacing: "0", color: IVORY,
    margin: "0 0 14px",
  },
  sub: {
    fontFamily: "var(--font-ui)", fontSize: 13, lineHeight: 1.6,
    color: "#B6A88F", margin: "0 0 24px",
  },
  cta: { display: "flex", gap: 14, flexWrap: "wrap", alignItems: "center" },
  ctaGold: {
    display: "inline-flex", alignItems: "center", gap: ".5em",
    background: "var(--gold)", color: "#221A12",
    fontFamily: "var(--font-ui)", fontWeight: 600, fontSize: 12.5,
    letterSpacing: "0.16em", textTransform: "uppercase",
    padding: "14px 28px", border: "1px solid transparent",
    borderRadius: "12px 0 12px 0", cursor: "pointer", whiteSpace: "nowrap",
  },
  ctaOut: {
    display: "inline-flex", alignItems: "center", gap: ".55em",
    background: "transparent", color: IVORY,
    fontFamily: "var(--font-ui)", fontWeight: 500, fontSize: 12.5,
    letterSpacing: "0.16em", textTransform: "uppercase",
    padding: "14px 26px", border: "1px solid rgba(216,180,132,.55)",
    borderRadius: "12px 0 12px 0", cursor: "pointer", whiteSpace: "nowrap",
  },

  navWrap: {
    position: "absolute", right: 48, bottom: 56, zIndex: 10,
    display: "flex", alignItems: "center", gap: 14,
  },
  priceTag: {
    fontFamily: "var(--font-ui)", fontSize: 11, letterSpacing: "0.08em",
    color: "#9A8A75", marginRight: 4, whiteSpace: "nowrap",
  },
  narrow: {
    width: 42, height: 42, display: "inline-flex", alignItems: "center",
    justifyContent: "center", borderRadius: "999px", background: "transparent",
    border: "1px solid rgba(216,180,132,.5)", color: IVORY, cursor: "pointer",
  },
  counter: {
    fontFamily: "var(--font-ui)", fontSize: 13, fontWeight: 500,
    letterSpacing: "0.18em", color: "var(--gold)", minWidth: 58, textAlign: "right",
  },

  scrollWrap: {
    position: "absolute", left: "50%", bottom: 26, transform: "translateX(-50%)",
    zIndex: 10, display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
  },
  scrollTxt: {
    fontFamily: "var(--font-ui)", fontSize: 9.5, fontWeight: 500,
    letterSpacing: "0.34em", textTransform: "uppercase", color: "#9A8A75",
  },
};

window.SequinHero = Hero;
