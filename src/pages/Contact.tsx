import { useState } from "react";
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { Reveal } from "../components/bits";
import { contact } from "../data/site";
import { useDocTitle } from "../lib/hooks";

const occasions = [
  "Wedding",
  "Sheva Brachos / Simcha",
  "Dinner Party",
  "Corporate Event",
  "My Table at Home",
  "Something Else",
];
const tableCounts = ["1–5", "6–15", "16–40", "40+"];

export default function Contact() {
  useDocTitle("Contact");
  const [sent, setSent] = useState(false);
  const [occasion, setOccasion] = useState<string | null>(null);
  const [tables, setTables] = useState<string | null>(null);
  const [occasionError, setOccasionError] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!occasion) {
      setOccasionError(true);
      return;
    }
    setSent(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main>
      <div className="wrap">
        <header className="page-head is-compact">
          <span className="eyebrow">Start a Quote</span>
          <h1 className="display-lg" style={{ maxWidth: "16ch" }}>
            Tell Us About the Table
          </h1>
          <p className="lede">
            Three quick choices and your details — we answer with linen suggestions and a quote
            within one business day.
          </p>
        </header>

        <div className="contact-layout">
          {sent ? (
            <Reveal>
              <div className="card" style={{ padding: "clamp(32px, 5vw, 56px)", display: "grid", gap: 18, justifyItems: "center", textAlign: "center" }}>
                <span className="monogram-seal" style={{ color: "var(--accent-strong)", borderColor: "var(--card-border)" }}>ST</span>
                <h2 className="display-md">Consider the table started.</h2>
                <p className="lede" style={{ textAlign: "center" }}>
                  Your note is with us — we'll reply within one business day. For anything urgent,
                  WhatsApp is fastest.
                </p>
                <a className="btn btn-dark btn-sm" href={contact.whatsapp} target="_blank" rel="noreferrer">
                  Message on WhatsApp
                </a>
              </div>
            </Reveal>
          ) : (
            <Reveal>
              <form className="card checkout-step" onSubmit={submit}>
                <div className="field">
                  <label id="q-occasion">1 · What are we dressing?</label>
                  <div className="choice-row" role="group" aria-labelledby="q-occasion">
                    {occasions.map((o) => (
                      <button
                        key={o}
                        type="button"
                        className={`chip${occasion === o ? " is-active" : ""}`}
                        aria-pressed={occasion === o}
                        onClick={() => {
                          setOccasion(occasion === o ? null : o);
                          setOccasionError(false);
                        }}
                      >
                        {o}
                      </button>
                    ))}
                  </div>
                  {occasionError && (
                    <span className="field-error">Choose the occasion so we can point you right.</span>
                  )}
                </div>

                <div className="form-grid">
                  <div className="field">
                    <label htmlFor="c-date">2 · Event date</label>
                    <input id="c-date" type="date" min={new Date().toISOString().slice(0, 10)} />
                    <span className="field-hint">Not set yet? Leave it blank — we'll hold ideas, not dates.</span>
                  </div>
                  <div className="field">
                    <label id="q-tables">3 · How many tables?</label>
                    <div className="choice-row" role="group" aria-labelledby="q-tables">
                      {tableCounts.map((t) => (
                        <button
                          key={t}
                          type="button"
                          className={`chip${tables === t ? " is-active" : ""}`}
                          aria-pressed={tables === t}
                          onClick={() => setTables(tables === t ? null : t)}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <hr className="hairline" />

                <div className="form-grid">
                  <div className="field">
                    <label htmlFor="c-name">Name</label>
                    <input id="c-name" required placeholder="Your name" autoComplete="name" />
                  </div>
                  <div className="field">
                    <label htmlFor="c-phone">Phone</label>
                    <input id="c-phone" type="tel" placeholder="Best number" autoComplete="tel" />
                  </div>
                  <div className="field span-2">
                    <label htmlFor="c-email">Email</label>
                    <input id="c-email" type="email" required placeholder="you@example.com" autoComplete="email" />
                  </div>
                  <div className="field span-2">
                    <label htmlFor="c-msg">The details</label>
                    <textarea id="c-msg" placeholder="Venue, colors you love, pieces that caught your eye — whatever you know so far." />
                  </div>
                </div>
                <button className="btn btn-gold" type="submit" style={{ justifySelf: "start" }}>
                  Send the Note
                </button>
              </form>
            </Reveal>
          )}

          <div className="contact-aside">
            <Reveal delay={1}>
              <div className="card contact-row">
                <span className="ci"><Phone size={20} strokeWidth={1.7} /></span>
                <div>
                  <b>Call</b>
                  <a href={contact.phoneHref}>{contact.phone}</a>
                </div>
              </div>
            </Reveal>
            <Reveal delay={1}>
              <div className="card contact-row">
                <span className="ci"><MessageCircle size={20} strokeWidth={1.7} /></span>
                <div>
                  <b>WhatsApp</b>
                  <a href={contact.whatsapp} target="_blank" rel="noreferrer">
                    Message us — fastest reply
                  </a>
                </div>
              </div>
            </Reveal>
            <Reveal delay={2}>
              <div className="card contact-row">
                <span className="ci"><Mail size={20} strokeWidth={1.7} /></span>
                <div>
                  <b>Email</b>
                  <a href={`mailto:${contact.email}`}>{contact.email}</a>
                </div>
              </div>
            </Reveal>
            <Reveal delay={2}>
              <div className="card contact-row">
                <span className="ci"><Clock size={20} strokeWidth={1.7} /></span>
                <div>
                  <b>Hours</b>
                  {contact.hours.map((h) => (
                    <p key={h.days}>
                      {h.days} · {h.time}
                    </p>
                  ))}
                </div>
              </div>
            </Reveal>
            <Reveal delay={3}>
              <div className="card contact-row">
                <span className="ci"><MapPin size={20} strokeWidth={1.7} /></span>
                <div>
                  <b>Service Area</b>
                  <p>{contact.area}</p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </main>
  );
}
