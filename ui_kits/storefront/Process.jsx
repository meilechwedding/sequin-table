/* Sequin storefront — §5 Our Process (espresso lane, editorial numerals) */

function Process() {
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
    }, { threshold: 0.1 });
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const steps = [
    { num: "01", title: "Curate.",  body: "Cloths sourced and selected with intention — every weave, weight and colour chosen by hand." },
    { num: "02", title: "Press.",   body: "Hand-finished in-house, Brooklyn. Each piece arrives crisp, clean and ready to lay." },
    { num: "03", title: "Deliver.", body: "Wrapped and delivered to your door, ready to dress your table exactly as imagined." },
    { num: "04", title: "Return.",  body: "For rentals — collected, cleaned, repeated. Effortless from beginning to end." },
  ];

  return (
    <section ref={ref} style={procS.wrap} data-theme="noir">
      <style>{`
        @media (max-width:1024px) { .sq-proc-grid { grid-template-columns: repeat(2,1fr) !important; } }
        @media (max-width:640px)  { .sq-proc-grid { grid-template-columns: 1fr !important; } }
      `}</style>
      <div style={procS.inner}>
        <div style={procS.intro}>
          <span className="sq-rv" style={procS.eyebrow}>( Our Process )</span>
          <h2 className="sq-rv" style={procS.headline}>
            From our studio to{" "}<em style={{ fontStyle: "italic", color: "#BE9A6E" }}>your</em> table.
          </h2>
          <div className="sq-rv" style={procS.rule} />
        </div>
        <div className="sq-proc-grid" style={procS.grid}>
          {steps.map(s => (
            <div key={s.num} className="sq-rv" style={procS.step}>
              <span style={procS.numeral}>{s.num}</span>
              <div style={procS.stepContent}>
                <h3 style={procS.stepTitle}>{s.title}</h3>
                <p style={procS.stepBody}>{s.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const procS = {
  wrap:        { background: "#221A12", padding: "104px 44px" },
  inner:       { maxWidth: 1240, margin: "0 auto" },
  intro:       { marginBottom: 72, display: "flex", flexDirection: "column", gap: 22 },
  eyebrow:     { fontFamily: "var(--font-ui)", fontSize: 10, fontWeight: 500, letterSpacing: "0.4em", textTransform: "uppercase", color: "#BE9A6E", display: "block" },
  headline:    { fontFamily: "'Audrey','Playfair Display','Cormorant Garamond',Georgia,serif", fontWeight: 500, fontSize: "clamp(32px,3.5vw,44px)", lineHeight: 1.1, color: "#FBF6EF", margin: 0, maxWidth: "22ch" },
  rule:        { width: "100%", height: 1, background: "rgba(190,154,110,.25)" },
  grid:        { display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 44 },
  step:        { display: "flex", flexDirection: "column", gap: 20 },
  numeral:     { fontFamily: "'Audrey','Playfair Display','Cormorant Garamond',Georgia,serif", fontWeight: 500, fontSize: 96, lineHeight: 1, letterSpacing: "-0.04em", color: "#BE9A6E", opacity: 0.48, display: "block" },
  stepContent: { display: "flex", flexDirection: "column", gap: 10 },
  stepTitle:   { fontFamily: "'Audrey','Playfair Display','Cormorant Garamond',Georgia,serif", fontWeight: 500, fontStyle: "italic", fontSize: 24, color: "#FBF6EF", margin: 0 },
  stepBody:    { fontFamily: "var(--font-ui)", fontSize: 14, lineHeight: 1.72, color: "#9A8A75", margin: 0 },
};

window.SequinProcess = Process;
