/* Sequin storefront — §2+§3 About Strip + Two Lanes
   Combined so the new sections load from any cached version of index.html */

/* ────────────────────────────────────────────────────
   §2  ABOUT STRIP
   ──────────────────────────────────────────────────── */
function SqAbout() {
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
    }, { threshold: 0.12 });
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} style={a2.wrap}>
      <div style={a2.inner}>
        <div style={a2.text}>
          <span className="sq-rv" style={a2.eye}>( About Sequin )</span>
          <h2 className="sq-rv" style={a2.h2}>
            Linens, made for the moments<br />worth <em style={{fontStyle:"italic"}}>remembering</em>.
          </h2>
          <p className="sq-rv" style={a2.body}>We are a Brooklyn-based linen house built on the belief that a beautiful table transforms any gathering. Every piece is sourced with intention and hand-finished in our studio — ready to dress your most important moments.</p>
          <p className="sq-rv" style={a2.body}>Rent for the event, or own for the table. Either way, Sequin linens arrive pressed, wrapped and ready.</p>
          <a className="sq-rv" href="about.html" style={a2.link}>Read our story →</a>
        </div>
        <div className="sq-rv" style={{}}>
          <div style={a2.frame}>
            <img src="../../assets/img/willow.jpg" alt="Linen cloth detail" style={a2.img} />
            <span style={a2.idx}>( 01—03 )</span>
          </div>
        </div>
      </div>
    </section>
  );
}
const a2 = {
  wrap:  { background:"#F7F2EA", padding:"104px 44px" },
  inner: { maxWidth:1240, margin:"0 auto", display:"grid", gridTemplateColumns:"1.5fr 1fr", gap:84, alignItems:"center" },
  text:  { display:"flex", flexDirection:"column", gap:24 },
  eye:   { fontFamily:"var(--font-ui)", fontSize:10, fontWeight:500, letterSpacing:"0.4em", textTransform:"uppercase", color:"#BE9A6E", display:"block" },
  h2:    { fontFamily:"'Audrey','Playfair Display','Cormorant Garamond',Georgia,serif", fontWeight:500, fontSize:"clamp(32px,3.4vw,46px)", lineHeight:1.1, letterSpacing:"-0.01em", color:"#221A12", margin:0 },
  body:  { fontFamily:"var(--font-ui)", fontSize:15, lineHeight:1.78, color:"#6B4F3A", margin:0, maxWidth:"52ch" },
  link:  { display:"inline-block", fontFamily:"var(--font-ui)", fontSize:12, fontWeight:500, letterSpacing:"0.18em", textTransform:"uppercase", color:"#221A12", textDecoration:"none", borderBottom:"1px solid #BE9A6E", paddingBottom:3, marginTop:4 },
  frame: { position:"relative", borderRadius:"20px 0 20px 0", overflow:"hidden", aspectRatio:"4/5" },
  img:   { width:"100%", height:"100%", objectFit:"cover", display:"block" },
  idx:   { position:"absolute", bottom:18, right:18, fontFamily:"var(--font-ui)", fontSize:9.5, fontWeight:500, letterSpacing:"0.32em", textTransform:"uppercase", color:"#BE9A6E", background:"rgba(247,242,234,.86)", backdropFilter:"blur(4px)", padding:"6px 13px", borderRadius:"6px 0 6px 0" },
};

/* ────────────────────────────────────────────────────
   §3  TWO LANES  (Rent | Buy)
   ──────────────────────────────────────────────────── */
function SqLanes({ onOpen }) {
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

  const go = which => onOpen && onOpen(which);

  return (
    <section ref={ref} style={l2.wrap}>
      <style>{`
        .sq-lane{overflow:hidden}
        .sq-lane img{transition:transform 400ms cubic-bezier(.4,0,.2,1)}
        .sq-lane:hover img{transform:scale(1.03)}
        .sq-cta-rent{border:none;transition:transform .3s,box-shadow .3s,filter .3s}
        .sq-cta-rent:hover{transform:translateY(-2px);box-shadow:0 12px 30px rgba(216,180,132,.28);filter:brightness(1.06)}
        .sq-cta-buy{transition:background .3s,transform .3s}
        .sq-cta-buy:hover{background:rgba(190,154,110,.1)!important;transform:translateY(-2px)}
      `}</style>

      <div style={l2.head}>
        <span className="sq-rv" style={l2.eye}>( Two Ways to Sequin )</span>
        <h2 className="sq-rv" style={l2.h2}>Rent for the Event.{" "}<em style={{fontStyle:"italic"}}>Own</em> for the Table.</h2>
      </div>

      <div style={l2.grid}>
        <article className="sq-rv sq-lane" style={l2.rent} onClick={() => go("rental")}>
          <div style={l2.imgWrap}><img src="../../assets/img/rentals.jpg" alt="Event tablescape" style={l2.img} /></div>
          <div style={l2.rentBody}>
            <span style={{...l2.cardEye, color:"#BE9A6E"}}>( Rentals )</span>
            <h3 style={{...l2.cardT, color:"#FBF6EF"}}>Rent the Occasion</h3>
            <p style={{...l2.cardP, color:"#9A8A75"}}>Statement linens for weddings, soirées and celebrations — delivered, pressed and ready to dress.</p>
            <button className="sq-cta-rent" style={l2.ctaGold} onClick={e=>{e.stopPropagation();go("rental");}}>Explore Rentals →</button>
          </div>
        </article>
        <article className="sq-rv sq-lane" style={l2.buy} onClick={() => go("home")}>
          <div style={l2.imgWrap}><img src="../../assets/img/home.jpg" alt="Home table setting" style={l2.img} /></div>
          <div style={l2.buyBody}>
            <span style={{...l2.cardEye, color:"#997844"}}>( Home Linen )</span>
            <h3 style={{...l2.cardT, color:"#221A12"}}>Set Your Table</h3>
            <p style={{...l2.cardP, color:"#6B4F3A"}}>Bring the Sequin look home — runners, cloths and napkins to own and reuse season after season.</p>
            <button className="sq-cta-buy" style={l2.ctaOut} onClick={e=>{e.stopPropagation();go("home");}}>Shop Home →</button>
          </div>
        </article>
      </div>
    </section>
  );
}
const l2 = {
  wrap:     { background:"#F7F2EA", padding:"0 44px 104px" },
  head:     { maxWidth:1240, margin:"0 auto 52px", display:"flex", flexDirection:"column", gap:16 },
  eye:      { fontFamily:"var(--font-ui)", fontSize:10, fontWeight:500, letterSpacing:"0.4em", textTransform:"uppercase", color:"#BE9A6E", display:"block" },
  h2:       { fontFamily:"'Audrey','Playfair Display','Cormorant Garamond',Georgia,serif", fontWeight:500, fontSize:"clamp(28px,3vw,42px)", lineHeight:1.12, color:"#221A12", margin:0 },
  grid:     { maxWidth:1240, margin:"0 auto", display:"grid", gridTemplateColumns:"1fr 1fr", gap:28 },
  rent:     { borderRadius:"20px 0 20px 0", cursor:"pointer", background:"#221A12", boxShadow:"0 8px 32px rgba(34,26,18,.22)" },
  buy:      { borderRadius:"20px 0 20px 0", cursor:"pointer", background:"#FBF6EF", border:"1px solid #E4DDD0", boxShadow:"0 4px 16px rgba(34,26,18,.06)" },
  imgWrap:  { overflow:"hidden", borderRadius:"20px 0 0 0" },
  img:      { width:"100%", height:330, objectFit:"cover", display:"block" },
  rentBody: { padding:"36px 42px 46px", display:"flex", flexDirection:"column", gap:16, alignItems:"flex-start" },
  buyBody:  { padding:"36px 42px 46px", display:"flex", flexDirection:"column", gap:16, alignItems:"flex-start" },
  cardEye:  { fontFamily:"var(--font-ui)", fontSize:9.5, fontWeight:500, letterSpacing:"0.4em", textTransform:"uppercase" },
  cardT:    { fontFamily:"'Audrey','Playfair Display','Cormorant Garamond',Georgia,serif", fontWeight:500, fontSize:32, lineHeight:1.1, margin:0 },
  cardP:    { fontFamily:"var(--font-ui)", fontSize:14.5, lineHeight:1.72, margin:0, maxWidth:"40ch" },
  ctaGold:  { display:"inline-flex", alignItems:"center", cursor:"pointer", background:"linear-gradient(135deg,#BE9A6E,#D8B484,#BE9A6E)", backgroundSize:"200% auto", color:"#221A12", fontFamily:"var(--font-ui)", fontWeight:600, fontSize:12, letterSpacing:"0.16em", textTransform:"uppercase", padding:"13px 28px", borderRadius:"12px 0 12px 0", marginTop:8, whiteSpace:"nowrap" },
  ctaOut:   { display:"inline-flex", alignItems:"center", cursor:"pointer", background:"transparent", color:"#221A12", fontFamily:"var(--font-ui)", fontWeight:500, fontSize:12, letterSpacing:"0.16em", textTransform:"uppercase", padding:"12px 26px", border:"1px solid #BE9A6E", borderRadius:"12px 0 12px 0", marginTop:8, whiteSpace:"nowrap" },
};

/* ── Combined export ── */
function Collections({ onOpen }) {
  return (
    <React.Fragment>
      <SqAbout />
      <SqLanes onOpen={onOpen} />
    </React.Fragment>
  );
}

window.SequinAboutStrip = SqAbout;
window.SequinCollections = Collections;
