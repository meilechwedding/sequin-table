import { useState } from "react";
import { Link } from "react-router-dom";
import { Instagram, MessageCircle } from "lucide-react";
import { contact } from "../data/site";
import { useStore } from "../lib/store";

export default function Footer() {
  const { showToast } = useStore();
  const [email, setEmail] = useState("");

  const subscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setEmail("");
    showToast("Welcome to the table — you're on the list");
  };

  return (
    <footer className="site-footer on-dark" role="contentinfo">
      <div className="wrap">
        <div className="footer-grid">
          <div className="footer-col">
            <span className="brand-mark" style={{ alignItems: "flex-start" }}>
              <span className="brand-name">SEQUIN</span>
              <span className="brand-sub">Table Linen</span>
            </span>
            <p className="footer-brandline">
              A Brooklyn linen house. Upscale table linen to rent for the occasion — or own for
              always.
            </p>
            <div style={{ display: "flex", gap: 6 }}>
              <a
                className="icon-btn"
                href={contact.instagram}
                target="_blank"
                rel="noreferrer"
                aria-label="Sequin Table on Instagram"
              >
                <Instagram size={19} strokeWidth={1.6} />
              </a>
              <a
                className="icon-btn"
                href={contact.whatsapp}
                target="_blank"
                rel="noreferrer"
                aria-label="Message Sequin Table on WhatsApp"
              >
                <MessageCircle size={19} strokeWidth={1.6} />
              </a>
            </div>
          </div>

          <div className="footer-col">
            <h4>Explore</h4>
            <Link to="/rentals">Party Rentals</Link>
            <Link to="/shop">Home Linen</Link>
            <Link to="/gallery">Gallery</Link>
            <Link to="/story">Our Story</Link>
            <Link to="/contact">Contact</Link>
          </div>

          <div className="footer-col">
            <h4>Visit With Us</h4>
            <a href={contact.phoneHref}>{contact.phone}</a>
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
            {contact.hours.map((h) => (
              <span key={h.days} style={{ color: "var(--ink-soft)", fontWeight: 300 }}>
                {h.days} · {h.time}
              </span>
            ))}
          </div>

          <div className="footer-col">
            <h4>Letters From the Table</h4>
            <p className="footer-brandline">
              New pieces, seasonal settings, and the occasional word on hosting well.
            </p>
            <form className="newsletter" onSubmit={subscribe}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                aria-label="Email address"
              />
              <button className="btn btn-gold btn-sm" type="submit">
                Join
              </button>
            </form>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2026 Sequin Table · Brooklyn, NY</span>
          <span>
            Crafted by{" "}
            <a href="https://mostai.vercel.app" target="_blank" rel="noreferrer" style={{ color: "var(--accent)" }}>
              MostAI
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
