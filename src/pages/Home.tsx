import { Link } from "react-router-dom";
import { ArrowRight, Instagram } from "lucide-react";
import Hero from "../components/Hero";
import ProductCard from "../components/ProductCard";
import { Reveal, SectionHead } from "../components/bits";
import { featuredProducts } from "../data/products";
import { galleryItems, homeCopy, images, testimonials, contact } from "../data/site";
import { useDocTitle } from "../lib/hooks";

export default function Home() {
  useDocTitle("");

  return (
    <>
      <Hero />

      {/* Two ways */}
      <section className="section">
        <div className="wrap">
          <SectionHead
            eyebrow={homeCopy.twoWaysEyebrow}
            title={
              <>
                Rent for the Event. <span className="serif-accent" style={{ color: "var(--accent-strong)" }}>Own</span> for the Table.
              </>
            }
          />
          <div className="two-ways">
            <Reveal>
              <Link to="/rentals" className="way-card">
                <img src={images.rentals} alt="Banquet table dressed in patterned rental linen" loading="lazy" />
                <span className="way-scrim" />
                <span className="way-body">
                  <span className="way-kicker">For the Occasion</span>
                  <span className="way-title">Party Rentals</span>
                  <span className="way-line">
                    Event linen delivered pressed and picked up after — weddings, simchos, dinners.
                  </span>
                  <span className="btn-link">
                    Rent for an Event <ArrowRight size={15} strokeWidth={2} />
                  </span>
                </span>
              </Link>
            </Reveal>
            <Reveal delay={1}>
              <Link to="/shop" className="way-card">
                <img src={images.home} alt="Lace-dressed dining table at home" loading="lazy" />
                <span className="way-scrim" />
                <span className="way-body">
                  <span className="way-kicker">For Always</span>
                  <span className="way-title">Home Table Linen</span>
                  <span className="way-line">
                    Velvet, quilted, and lace pieces made to live on your table, not in a drawer.
                  </span>
                  <span className="btn-link">
                    Buy for Home <ArrowRight size={15} strokeWidth={2} />
                  </span>
                </span>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Featured rail */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <SectionHead eyebrow={homeCopy.featuredEyebrow} title={homeCopy.featuredTitle}>
            <Link to="/shop" className="btn-link">
              View All <ArrowRight size={15} strokeWidth={2} />
            </Link>
          </SectionHead>
        </div>
        <div className="wrap-wide">
          <Reveal>
            <div className="rail" role="list" aria-label="Featured pieces">
              {featuredProducts.map((product) => (
                <div role="listitem" key={product.id}>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Noir editorial */}
      <section className="editorial on-dark section">
        <img className="edit-bg" src={images.taupe} alt="" aria-hidden loading="lazy" />
        <span className="edit-scrim" aria-hidden />
        <div className="wrap">
          <Reveal>
            <div style={{ display: "grid", justifyItems: "center", gap: 26, textAlign: "center" }}>
              <span className="monogram-seal">ST</span>
              <blockquote>“{homeCopy.editorialQuote}”</blockquote>
              <p className="lede" style={{ textAlign: "center", color: "var(--ink-soft)" }}>
                {homeCopy.editorialLine}
              </p>
              <Link to="/story" className="btn-link" style={{ color: "var(--color-gold-300)" }}>
                Our Story <ArrowRight size={15} strokeWidth={2} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Steps */}
      <section className="section">
        <div className="wrap">
          <SectionHead eyebrow={homeCopy.stepsEyebrow} title={homeCopy.stepsTitle} center />
          <div className="steps">
            {homeCopy.steps.map((step, i) => (
              <Reveal key={step.title} delay={(i % 3) as 0 | 1 | 2}>
                <div className="card step-card">
                  <span className="step-num foil-text tnum">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="display-sm">{step.title}</h3>
                  <p>{step.line}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <SectionHead eyebrow={homeCopy.quotesEyebrow} title={homeCopy.quotesTitle} center />
          <div className="quotes">
            {testimonials.map((t, i) => (
              <Reveal key={t.who} delay={(i % 3) as 0 | 1 | 2}>
                <figure className="card quote-card" style={{ margin: 0 }}>
                  <blockquote style={{ margin: 0 }}>
                    <q>{t.quote}</q>
                  </blockquote>
                  <figcaption className="quote-attr">
                    <span className="who">{t.who}</span>
                    <span className="where">{t.where}</span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Instagram */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <SectionHead eyebrow={homeCopy.igEyebrow} title={homeCopy.igTitle} center />
          <Reveal>
            <div className="ig-grid">
              {galleryItems.slice(0, 6).map((item) => (
                <a
                  key={item.src}
                  className="ig-item"
                  href={contact.instagram}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Open Sequin Table on Instagram"
                >
                  <img src={item.src} alt={item.alt} loading="lazy" />
                  <Instagram size={22} strokeWidth={1.6} style={{ position: "absolute", width: 22, height: 22 }} />
                </a>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="on-dark section" style={{ background: "var(--color-espresso-950)" }}>
        <div className="wrap">
          <Reveal>
            <div className="closing">
              <span className="eyebrow eyebrow-center">{homeCopy.closingEyebrow}</span>
              <h2 className="display-lg" style={{ maxWidth: "18ch", textWrap: "balance" }}>
                {homeCopy.closingTitle}
              </h2>
              <p className="lede" style={{ textAlign: "center" }}>{homeCopy.closingLine}</p>
              <div className="cta-row is-center">
                <Link to="/contact" className="btn btn-gold">
                  Plan an Event
                </Link>
                <Link to="/shop" className="btn btn-ghost" style={{ borderColor: "rgba(251,246,239,0.35)", color: "var(--color-cream-50)" }}>
                  Shop Home Linen
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
