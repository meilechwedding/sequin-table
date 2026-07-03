import { Link } from "react-router-dom";
import { ArrowRight, Gem, HandHeart, Truck } from "lucide-react";
import { Reveal, SectionHead } from "../components/bits";
import { images } from "../data/site";
import { useDocTitle } from "../lib/hooks";

const values = [
  {
    icon: Gem,
    title: "Curated, Not Cataloged",
    line: "We carry the pieces we would set for our own family — nothing fills space.",
  },
  {
    icon: HandHeart,
    title: "Finished by Hand",
    line: "Every cloth is inspected, pressed, and wrapped in our Brooklyn studio before it travels.",
  },
  {
    icon: Truck,
    title: "White-Glove, Door to Table",
    line: "Delivery timed to your event or your doorstep, across New York and New Jersey.",
  },
];

export default function Story() {
  useDocTitle("Our Story");
  return (
    <main>
      <div className="wrap">
        <header className="page-head" style={{ textAlign: "center", justifyItems: "center" }}>
          <span className="eyebrow eyebrow-center">Our Story</span>
          <h1 className="display-xl" style={{ maxWidth: "18ch", textWrap: "balance" }}>
            Linens, Made for the Moments Worth Remembering
          </h1>
        </header>
      </div>

      <section className="section-tight">
        <div className="wrap">
          <div className="story-split">
            <Reveal>
              <div className="story-img">
                <img src={images.hero} alt="A Sequin table set with white ribbed linen, gold flatware, and bordeaux roses" />
              </div>
            </Reveal>
            <Reveal delay={1}>
              <div className="story-copy">
                <span className="eyebrow">Brooklyn, NY</span>
                <h2 className="display-md">A table is never just a table.</h2>
                <div className="drop" style={{ display: "grid", gap: 16, color: "var(--ink-soft)", fontWeight: 300, lineHeight: 1.7 }}>
                  <p>
                    Sequin began the way most good tables do — with a host who cared too much to
                    settle. The flowers were ordered, the menu was set, and the linen, somehow, was
                    always the afterthought. We decided it should be the beginning instead.
                  </p>
                  <p>
                    Today Sequin is a Brooklyn linen house with two doors: party rentals that dress
                    entire celebrations, and a home collection made to live on your table — velvet
                    and lace that survive real dinners with real families.
                  </p>
                  <p>
                    Every piece is sourced with intention and hand-finished in our studio. It
                    arrives pressed, wrapped, and ready — because the first thing a guest touches
                    should feel considered.
                  </p>
                </div>
                <Link to="/gallery" className="btn-link">
                  See the Tables <ArrowRight size={15} strokeWidth={2} />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <SectionHead eyebrow="What We Hold To" title="Three Quiet Promises" center />
          <div className="values-grid">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={(i % 3) as 0 | 1 | 2}>
                <div className="card step-card">
                  <span className="rs-icon" style={{ width: 48, height: 48, borderRadius: "var(--radius-small)", display: "grid", placeItems: "center", background: "linear-gradient(150deg, #efddc0, #d8b484)", color: "#4a3517" }}>
                    <v.icon size={22} strokeWidth={1.6} />
                  </span>
                  <h3 className="display-sm">{v.title}</h3>
                  <p>{v.line}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="editorial on-dark section">
        <img className="edit-bg" src={images.dijan} alt="" aria-hidden loading="lazy" />
        <span className="edit-scrim" aria-hidden />
        <div className="wrap">
          <Reveal>
            <div style={{ display: "grid", justifyItems: "center", gap: 26, textAlign: "center" }}>
              <span className="monogram-seal">ST</span>
              <blockquote>“Set your table like the evening matters — because it does.”</blockquote>
              <div style={{ display: "flex", gap: 14, flexWrap: "wrap", justifyContent: "center" }}>
                <Link to="/rentals" className="btn btn-gold">Plan an Event</Link>
                <Link to="/shop" className="btn btn-ghost" style={{ borderColor: "rgba(251,246,239,0.35)", color: "var(--color-cream-50)" }}>
                  Shop Home Linen
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
