/* Sequin storefront — §6 Testimonials (diagonal-corner cards + closing statement) */

function Testimonials() {
  const { useEffect, useRef } = React;
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        [...e.target.querySelectorAll(".sq-rv")].forEach((el, i) => {
          el.style.transitionDelay = i * 100 + "ms";
          el.classList.add("sq-show");
        });
      });
    }, { threshold: 0.1 });
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const quotes = [
    { q: "Sequin made our wedding feel finished. The linens were the first thing every guest commented on.", name: "Margot L.", role: "Married in Brooklyn, Oct 2025" },
    { q: "The quality is extraordinary. We rented for a dinner party and ended up buying the runner the next week.", name: "James & Vera T.", role: "Home clients, Williamsburg" },
    { q: "Impeccable service, beautifully pressed. Everything arrived on time and looked even better in person.", name: "Claire D.", role: "Event planner, New York" },
  ];

  return (
    <section ref={ref} style={testS.wrap}>
      <style>{`
        @media (max-width:900px) { .sq-test-grid { grid-template-columns: 1fr !important; } }
      `}</style>
      <div style={testS.inner}>
        <span className="sq-rv" style={testS.eyebrow}>( In Good Company )</span>

        <div className="sq-test-grid" style={testS.grid}>
          {quotes.map((t, i) => (
            <blockquote key={i} className="sq-rv" style={testS.card}>
              <p style={testS.quote}>&ldquo;{t.q}&rdquo;</p>
              <div style={testS.rule} />
              <footer>
                <span style={testS.name}>{t.name}</span>
                <span style={testS.role}>{t.role}</span>
              </footer>
            </blockquote>
          ))}
        </div>

        <p className="sq-rv" style={testS.closing}>
          <em>A table is the first thing a guest remembers.</em>
        </p>
      </div>
    </section>
  );
}

const testS = {
  wrap:    { background: "#F7F2EA", padding: "104px 44px" },
  inner:   { maxWidth: 1240, margin: "0 auto" },
  eyebrow: { fontFamily: "var(--font-ui)", fontSize: 10, fontWeight: 500, letterSpacing: "0.4em", textTransform: "uppercase", color: "#BE9A6E", display: "block", marginBottom: 52 },
  grid:    { display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 28 },
  card:    { background: "#FBF6EF", borderRadius: "20px 0 20px 0", border: "1px solid #C8B7A0", padding: "36px 36px 32px", display: "flex", flexDirection: "column", gap: 20, margin: 0 },
  quote:   { fontFamily: "'Audrey','Playfair Display','Cormorant Garamond',Georgia,serif", fontStyle: "italic", fontWeight: 400, fontSize: 22, lineHeight: 1.46, color: "#221A12", margin: 0, flex: 1 },
  rule:    { width: 32, height: 1, background: "#BE9A6E", flexShrink: 0 },
  name:    { display: "block", fontFamily: "var(--font-ui)", fontSize: 13, fontWeight: 500, letterSpacing: "0.08em", color: "#221A12" },
  role:    { display: "block", fontFamily: "var(--font-ui)", fontSize: 12, color: "#9A8A75", marginTop: 3 },
  closing: { textAlign: "center", fontFamily: "'Audrey','Playfair Display','Cormorant Garamond',Georgia,serif", fontStyle: "italic", fontWeight: 400, fontSize: 22, color: "#221A12", marginTop: 72, marginBottom: 0 },
};

window.SequinTestimonials = Testimonials;
