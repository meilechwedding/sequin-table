/* Sequin storefront — §2 About Strip (Linen White, asymmetric) */

function AboutStrip() {
  const { useEffect, useRef } = React;
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        [...e.target.querySelectorAll(".sq-rv")].forEach((el, i) => {
          el.style.transitionDelay = i * 90 + "ms";
          el.classList.add("sq-show");
        });
      });
    }, { threshold: 0.12 });
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} style={abtS.wrap}>
      <div style={abtS.inner}>

        {/* ── Left text column (60%) ── */}
        <div style={abtS.text}>
          <span className="sq-rv" style={abtS.eyebrow}>( About Sequin )</span>
          <h2 className="sq-rv" style={abtS.headline}>
            Linens, made for the moments<br />
            worth <em style={{ fontStyle: "italic" }}>remembering</em>.
          </h2>
          <p className="sq-rv" style={abtS.body}>
            We are a Brooklyn-based linen house built on the belief that a beautiful table transforms any gathering. Every piece is sourced with intention and hand-finished in our studio — ready to dress your most important moments.
          </p>
          <p className="sq-rv" style={abtS.body}>
            Rent for the event, or own for the table. Either way, Sequin linens arrive pressed, wrapped and ready.
          </p>
          <a className="sq-rv" href="about.html" style={abtS.link}>Read our story →</a>
        </div>

        {/* ── Right image (40%) ── */}
        <div className="sq-rv" style={abtS.imgCol}>
          <div style={abtS.imgFrame}>
            <img src="../../assets/img/willow.jpg" alt="Linen cloth detail" style={abtS.img} />
            <span style={abtS.index}>( 01—03 )</span>
          </div>
        </div>

      </div>
    </section>
  );
}

const abtS = {
  wrap: { background: "#F7F2EA", padding: "104px 44px" },
  inner: {
    maxWidth: 1240, margin: "0 auto",
    display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 84, alignItems: "center",
  },
  text: { display: "flex", flexDirection: "column", gap: 24 },
  eyebrow: {
    fontFamily: "var(--font-ui)", fontSize: 10, fontWeight: 500,
    letterSpacing: "0.4em", textTransform: "uppercase", color: "#BE9A6E", display: "block",
  },
  headline: {
    fontFamily: "'Audrey','Playfair Display','Cormorant Garamond',Georgia,serif",
    fontWeight: 500, fontSize: "clamp(32px,3.4vw,46px)", lineHeight: 1.1,
    letterSpacing: "-0.01em", color: "#221A12", margin: 0,
  },
  body: {
    fontFamily: "var(--font-ui)", fontSize: 15, lineHeight: 1.78,
    color: "#6B4F3A", margin: 0, maxWidth: "52ch",
  },
  link: {
    display: "inline-block",
    fontFamily: "var(--font-ui)", fontSize: 12, fontWeight: 500,
    letterSpacing: "0.18em", textTransform: "uppercase",
    color: "#221A12", textDecoration: "none",
    borderBottom: "1px solid #BE9A6E", paddingBottom: 3, marginTop: 4,
  },
  imgCol: {},
  imgFrame: {
    position: "relative", borderRadius: "20px 0 20px 0",
    overflow: "hidden", aspectRatio: "4/5",
  },
  img: { width: "100%", height: "100%", objectFit: "cover", display: "block" },
  index: {
    position: "absolute", bottom: 18, right: 18,
    fontFamily: "var(--font-ui)", fontSize: 9.5, fontWeight: 500,
    letterSpacing: "0.32em", textTransform: "uppercase", color: "#BE9A6E",
    background: "rgba(247,242,234,.86)", backdropFilter: "blur(4px)",
    padding: "6px 13px", borderRadius: "6px 0 6px 0",
  },
};

window.SequinAboutStrip = AboutStrip;
