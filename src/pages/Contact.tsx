import { useState } from "react";
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { Reveal } from "../components/bits";
import { contact } from "../data/site";
import { useDocTitle } from "../lib/hooks";

export default function Contact() {
  useDocTitle("Contact");
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main>
      <div className="wrap">
        <header className="page-head">
          <span className="eyebrow">Contact</span>
          <h1 className="display-xl" style={{ maxWidth: "14ch" }}>
            Tell Us About the Table
          </h1>
          <p className="lede">
            A date, a venue, a feeling you're after — that's enough to begin. We answer within one
            business day.
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
                <div className="form-grid">
                  <div className="field">
                    <label htmlFor="c-name">Name</label>
                    <input id="c-name" required placeholder="Your name" autoComplete="name" />
                  </div>
                  <div className="field">
                    <label htmlFor="c-phone">Phone</label>
                    <input id="c-phone" type="tel" placeholder="Best number" autoComplete="tel" />
                  </div>
                  <div className="field">
                    <label htmlFor="c-email">Email</label>
                    <input id="c-email" type="email" required placeholder="you@example.com" autoComplete="email" />
                  </div>
                  <div className="field">
                    <label htmlFor="c-date">Event date (if any)</label>
                    <input id="c-date" type="date" min={new Date().toISOString().slice(0, 10)} />
                  </div>
                  <div className="field span-2">
                    <label htmlFor="c-type">What are we dressing?</label>
                    <select id="c-type" defaultValue="">
                      <option value="" disabled>
                        Choose one…
                      </option>
                      <option>Wedding</option>
                      <option>Sheva Brachos / Simcha</option>
                      <option>Dinner party</option>
                      <option>Corporate event</option>
                      <option>My own table at home</option>
                      <option>Something else</option>
                    </select>
                  </div>
                  <div className="field span-2">
                    <label htmlFor="c-msg">The details</label>
                    <textarea id="c-msg" placeholder="Venue, table count, colors you love — whatever you know so far." />
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
