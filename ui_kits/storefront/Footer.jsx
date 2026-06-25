/* Sequin storefront — §5+§6+§7 Process + Testimonials + Footer
   Combined so the new sections load from any cached version of index.html */
const { Monogram } = window.SequinDesignSystem_ec3cc5;

/* ────────────────────────────────────────────────────
   §5  OUR PROCESS  (espresso lane)
   ──────────────────────────────────────────────────── */
function SqProcess() {
  const { useEffect, useRef } = React;
  const ref = useRef(null);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        [...e.target.querySelectorAll(".sq-rv")].forEach((el,i) => {
          el.style.transitionDelay = i*90+"ms"; el.classList.add("sq-show");
        });
      });
    }, { threshold: 0.1 });
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const steps = [
    { num:"01", title:"Curate.",  body:"Cloths sourced and selected with intention — every weave, weight and colour chosen by hand." },
    { num:"02", title:"Press.",   body:"Hand-finished in-house, Brooklyn. Each piece arrives crisp, clean and ready to lay." },
    { num:"03", title:"Deliver.", body:"Wrapped and delivered to your door, ready to dress your table exactly as imagined." },
    { num:"04", title:"Return.",  body:"For rentals — collected, cleaned, repeated. Effortless from beginning to end." },
  ];

  return (
    <section ref={ref} style={p2.wrap} data-theme="noir">
      <style>{`
        @media(max-width:1024px){.sq-proc-grid{grid-template-columns:repeat(2,1fr)!important}}
        @media(max-width:640px){.sq-proc-grid{grid-template-columns:1fr!important}}
      `}</style>
      <div style={p2.inner}>
        <div style={p2.intro}>
          <span className="sq-rv" style={p2.eye}>( Our Process )</span>
          <h2 className="sq-rv" style={p2.h2}>From our studio to{" "}<em style={{fontStyle:"italic",color:"#BE9A6E"}}>your</em> table.</h2>
          <div className="sq-rv" style={p2.rule} />
        </div>
        <div className="sq-proc-grid" style={p2.grid}>
          {steps.map(s => (
            <div key={s.num} className="sq-rv" style={p2.step}>
              <span style={p2.num}>{s.num}</span>
              <div style={p2.stepContent}>
                <h3 style={p2.stepT}>{s.title}</h3>
                <p style={p2.stepP}>{s.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
const p2 = {
  wrap:        { background:"#221A12", padding:"104px 44px" },
  inner:       { maxWidth:1240, margin:"0 auto" },
  intro:       { marginBottom:72, display:"flex", flexDirection:"column", gap:22 },
  eye:         { fontFamily:"var(--font-ui)", fontSize:10, fontWeight:500, letterSpacing:"0.4em", textTransform:"uppercase", color:"#BE9A6E", display:"block" },
  h2:          { fontFamily:"'Audrey','Playfair Display','Cormorant Garamond',Georgia,serif", fontWeight:500, fontSize:"clamp(32px,3.5vw,44px)", lineHeight:1.1, color:"#FBF6EF", margin:0, maxWidth:"22ch" },
  rule:        { width:"100%", height:1, background:"rgba(190,154,110,.25)" },
  grid:        { display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:44 },
  step:        { display:"flex", flexDirection:"column", gap:20 },
  num:         { fontFamily:"'Audrey','Playfair Display','Cormorant Garamond',Georgia,serif", fontWeight:500, fontSize:96, lineHeight:1, letterSpacing:"-0.04em", color:"#BE9A6E", opacity:0.48, display:"block" },
  stepContent: { display:"flex", flexDirection:"column", gap:10 },
  stepT:       { fontFamily:"'Audrey','Playfair Display','Cormorant Garamond',Georgia,serif", fontWeight:500, fontStyle:"italic", fontSize:24, color:"#FBF6EF", margin:0 },
  stepP:       { fontFamily:"var(--font-ui)", fontSize:14, lineHeight:1.72, color:"#9A8A75", margin:0 },
};

/* ────────────────────────────────────────────────────
   §6  TESTIMONIALS
   ──────────────────────────────────────────────────── */
function SqTestimonials() {
  const { useEffect, useRef } = React;
  const ref = useRef(null);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        [...e.target.querySelectorAll(".sq-rv")].forEach((el,i) => {
          el.style.transitionDelay = i*100+"ms"; el.classList.add("sq-show");
        });
      });
    }, { threshold: 0.1 });
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const quotes = [
    { q:"Sequin made our wedding feel finished. The linens were the first thing every guest commented on.", name:"Margot L.", role:"Married in Brooklyn, Oct 2025" },
    { q:"The quality is extraordinary. We rented for a dinner party and ended up buying the runner the next week.", name:"James & Vera T.", role:"Home clients, Williamsburg" },
    { q:"Impeccable service, beautifully pressed. Everything arrived on time and looked even better in person.", name:"Claire D.", role:"Event planner, New York" },
  ];

  return (
    <section ref={ref} style={t2.wrap}>
      <style>{`@media(max-width:900px){.sq-test-grid{grid-template-columns:1fr!important}}`}</style>
      <div style={t2.inner}>
        <span className="sq-rv" style={t2.eye}>( In Good Company )</span>
        <div className="sq-test-grid" style={t2.grid}>
          {quotes.map((q,i) => (
            <blockquote key={i} className="sq-rv" style={t2.card}>
              <p style={t2.quote}>&ldquo;{q.q}&rdquo;</p>
              <div style={t2.rule} />
              <footer>
                <span style={t2.name}>{q.name}</span>
                <span style={t2.role}>{q.role}</span>
              </footer>
            </blockquote>
          ))}
        </div>
        <p className="sq-rv" style={t2.closing}><em>A table is the first thing a guest remembers.</em></p>
      </div>
    </section>
  );
}
const t2 = {
  wrap:    { background:"#F7F2EA", padding:"104px 44px" },
  inner:   { maxWidth:1240, margin:"0 auto" },
  eye:     { fontFamily:"var(--font-ui)", fontSize:10, fontWeight:500, letterSpacing:"0.4em", textTransform:"uppercase", color:"#BE9A6E", display:"block", marginBottom:52 },
  grid:    { display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:28 },
  card:    { background:"#FBF6EF", borderRadius:"20px 0 20px 0", border:"1px solid #C8B7A0", padding:"36px 36px 32px", display:"flex", flexDirection:"column", gap:20, margin:0 },
  quote:   { fontFamily:"'Audrey','Playfair Display','Cormorant Garamond',Georgia,serif", fontStyle:"italic", fontWeight:400, fontSize:22, lineHeight:1.46, color:"#221A12", margin:0, flex:1 },
  rule:    { width:32, height:1, background:"#BE9A6E", flexShrink:0 },
  name:    { display:"block", fontFamily:"var(--font-ui)", fontSize:13, fontWeight:500, letterSpacing:"0.08em", color:"#221A12" },
  role:    { display:"block", fontFamily:"var(--font-ui)", fontSize:12, color:"#9A8A75", marginTop:3 },
  closing: { textAlign:"center", fontFamily:"'Audrey','Playfair Display','Cormorant Garamond',Georgia,serif", fontStyle:"italic", fontWeight:400, fontSize:22, color:"#221A12", marginTop:72, marginBottom:0 },
};

/* ────────────────────────────────────────────────────
   §7  FOOTER
   ──────────────────────────────────────────────────── */
function SqFooterInner() {
  const cols = [
    { head:"Shop",    links:[{l:"Rent",href:"rent.html"},{l:"Buy",href:"buy.html"},{l:"New Arrivals",href:"#"},{l:"Bestsellers",href:"#"},{l:"Gift Cards",href:"#"}] },
    { head:"Company", links:[{l:"About",href:"about.html"},{l:"Our Process",href:"process.html"},{l:"Press",href:"#"},{l:"Journal",href:"#"},{l:"Contact",href:"#contact"}] },
    { head:"Help",    links:[{l:"FAQ",href:"#"},{l:"Shipping & Returns",href:"#"},{l:"Care Guide",href:"#"},{l:"Trade Program",href:"#"}] },
  ];
  return (
    <footer style={f2.footer} data-theme="noir" id="contact">
      <div style={f2.inner}>
        <div style={f2.top}>
          <div style={f2.brand}>
            <Monogram variant="lockup" size={36} tagline />
            <p style={f2.tagline}>Upscale table linen — Brooklyn.</p>
            <span style={f2.lanes}>Rent · Buy · Host</span>
          </div>
          <div style={f2.cols}>
            {cols.map(col => (
              <div key={col.head} style={f2.col}>
                <h4 style={f2.colH}>{col.head}</h4>
                {col.links.map(lk => (
                  <a key={lk.l} href={lk.href} style={f2.link}
                    onMouseEnter={e=>{e.currentTarget.style.color="#BE9A6E";}}
                    onMouseLeave={e=>{e.currentTarget.style.color="#9A8A75";}}>
                    {lk.l}
                  </a>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div style={f2.hairline} />
        <div style={f2.bottom}>
          <span style={f2.legal}>© 2026 Sequin Table · Brooklyn, NY</span>
          <div style={f2.right}>
            <a href="https://www.instagram.com/sequin.table/" style={f2.legal} target="_blank" rel="noreferrer">@sequin.table</a>
            <a href="mailto:sequintable@gmail.com" style={f2.legal}>sequintable@gmail.com</a>
            <a href="tel:17187901832" style={f2.legal}>718-790-1832</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
const f2 = {
  footer:  { background:"#221A12", padding:"80px 44px 44px" },
  inner:   { maxWidth:1240, margin:"0 auto" },
  top:     { display:"grid", gridTemplateColumns:"1fr 1.9fr", gap:80, alignItems:"start", marginBottom:60 },
  brand:   { display:"flex", flexDirection:"column", gap:16 },
  tagline: { fontFamily:"var(--font-ui)", fontSize:14, color:"#9A8A75", margin:0, lineHeight:1.6 },
  lanes:   { fontFamily:"var(--font-ui)", fontSize:10.5, fontWeight:500, letterSpacing:"0.24em", textTransform:"uppercase", color:"#BE9A6E" },
  cols:    { display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:40 },
  col:     { display:"flex", flexDirection:"column", gap:12 },
  colH:    { fontFamily:"var(--font-ui)", fontSize:10.5, fontWeight:600, letterSpacing:"0.22em", textTransform:"uppercase", color:"#BE9A6E", margin:"0 0 6px" },
  link:    { fontFamily:"var(--font-ui)", fontSize:13.5, color:"#9A8A75", textDecoration:"none", transition:"color .2s" },
  hairline:{ height:1, background:"rgba(190,154,110,.18)", marginBottom:28 },
  bottom:  { display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:14 },
  right:   { display:"flex", gap:28, flexWrap:"wrap" },
  legal:   { fontFamily:"var(--font-ui)", fontSize:11.5, letterSpacing:"0.07em", color:"#6B4F3A", textDecoration:"none" },
};

/* ── Combined Footer export ── */
function Footer() {
  return (
    <React.Fragment>
      <SqProcess />
      <SqTestimonials />
      <SqFooterInner />
    </React.Fragment>
  );
}

/* Stubs for old index.html */
function QuoteBand()  { return null; }
function Newsletter() { return null; }

/* Standalone exports (used by sub-pages) */
window.SequinProcess      = SqProcess;
window.SequinTestimonials = SqTestimonials;
window.SequinQuoteBand    = QuoteBand;
window.SequinNewsletter   = Newsletter;
window.SequinFooter       = Footer;
