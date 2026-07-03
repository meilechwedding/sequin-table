# Sequin Table — Full Site Redesign (v4)

**Date:** 2026-07-02 · **Status:** approved direction (Meilech delegated design decisions; commerce/delivery/fonts confirmed by Q&A)

## Goal

A complete, fully-clickable **demo storefront** for Sequin Table that looks and feels like a
$100k agency build. It is a *draft to show the client* — every flow works (browse → product →
cart → checkout → confirmation) but no real money moves. The winning rotating-tablecloth hero
concept stays, executed properly. Final production will later be rebuilt in Shopify by Meilech.

Confirmed decisions:
- **Commerce:** in-site cart + checkout pages, demo only (no Shopify links, no real payment).
- **Delivery:** push to `meilechwedding/sequin-table` on a branch + Vercel preview deploy.
- **Fonts:** the real **Audrey** family (found and downloaded — 6 real OTFs replace the broken
  239-byte stubs). Note: Audrey is free for commercial desktop use; web-embed licensing should be
  confirmed before final production (fine for a private client demo).

## The debate — perspectives, arguments, verdicts

Meilech asked for the design to be argued out between roles until balanced. Condensed record:

**1. Dark "Noir" everywhere vs. light "Linen" everywhere?**
- *Designer:* the dark stage makes the cloths glow — it's theater; keep it.
- *Brand/marketing:* the brand's real world (Instagram, photography) is light, airy, candle-lit.
  An all-dark site misrepresents them and hurts photo-heavy pages.
- *Minimalist:* two half-executed themes are worse than one done perfectly.
- *The one who just likes things:* the tinting background behind the rotating cloths is the best
  thing on the site — don't lose it.
- **Verdict:** *Dusk-to-day bookends.* Dark Noir hero + footer (and one editorial band), light
  linen body for everything product/photo. The site opens like an evening event and settles into
  daylight where you actually shop.

**2. The hero.**
- *Critical person:* today the headline renders BEHIND the tablecloth, CTAs collide, toasts cover
  the hero. It looks broken, not luxurious.
- *Web designer:* keep the mechanic (cloth cutouts, background tint animating to each cloth's
  palette, auto-advance) but re-stage it: headline layer always above, cloth anchored
  center-right, one clear focal point, a quiet bottom rail (01/05, arrows, autoplay progress).
- *Analyzer:* preload slides, transform/opacity-only animation, `prefers-reduced-motion` fallback.
- **Verdict:** same beloved concept, restaged with proper z-layers, a product chip (name +
  "from $X" / "rental — by quote"), and choreographed but calm motion.

**3. Typography.**
- *Brand:* Audrey is the brand's actual display face — now that the real files exist, use them.
- *Designer:* Audrey (thin, deco-geometric) for display + tracked-caps eyebrows; Cormorant
  Garamond italic for editorial pull-quotes; Jost for body/UI (already self-hosted).
- **Verdict:** Audrey / Cormorant / Jost three-role system, fluid `clamp()` scale.

**4. Information architecture.**
- *Boss:* the demo must feel complete — client should find every page they'd expect.
- *Minimalist:* every page must earn its place; fold "Process/FAQ" into the pages where the
  question actually arises.
- *Architect:* hash-routing looks amateur in a pitch; real URLs survive refresh and can be shared.
- **Verdict:** react-router with real routes: `/` home · `/rentals` · `/shop` · `/product/:handle`
  · `/story` · `/gallery` · `/contact` · `/cart` · `/checkout` · `/order/:id` confirmation · 404.
  "How renting works" lives on /rentals; care/FAQ accordion lives on product pages + /contact.

**5. Commerce demo.**
- *Developer:* rentals are quote-based (price 0, "Inquire"); purchases have prices. One cart,
  two lanes.
- *Critical person:* fake card inputs invite real card numbers. Mark demo state honestly.
- **Verdict:** cart drawer + full cart page with "For purchase" and "For your event (quote)"
  lanes; rental items carry an event date. Checkout is one elegant page in three steps
  (contact → delivery & date → review) with a visible "Demo preview" ribbon and a payment panel
  that explains payment is collected later — no card fields. Confirmation page mints `ST-XXXX`.

**6. Motion & effects budget.**
- *The one who likes things:* shimmer everything gold.
- *Minimalist + analyzer:* one signature (the tinting hero stage), one accent effect (sequin
  shimmer on primary CTAs + gold-foil rules), scroll-reveals subtle and once-only. Nothing else.
- **Verdict:** as the minimalist says. Reduced-motion honored globally.

**7. Header & chrome.**
- **Verdict:** one consistent nav everywhere (Rentals · Shop · center ST monogram → home ·
  Story · Gallery · Contact), utilities right (search, saved, cart with count). Translucent
  espresso over the hero, flips to warm cream once scrolled past it. Thin announcement bar:
  "Brooklyn linen house — white-glove service across NY & NJ."

**8. Copy.**
- *Brand:* keep the true brand lines ("Upscale Table Linen for Events & Home", "Bringing
  sophistication and style to every celebration") — typeset them beautifully; rewrite everything
  else in the documented voice: gracious host, Title Case headlines, tracked-caps eyebrows,
  one-sentence support lines, zero emoji, no hard-sell CTAs ("Explore", "Reserve", "Discover").

## The design system (tokens — three layers)

- **L1 palette:** espresso 950–700 neutrals → linen/cream lights; champagne gold ramp
  (`#BE9A6E` light-mode / `#D8B484` on dark); bordeaux `#6a2635`; sage `#8d9874`. Taken from
  `tokens/colors.css` (already brand-derived).
- **L2 effects:** `--card-*`, `--foil` gradient, layered warm shadows, `--stage-tint` (the hero's
  animated ambience), glass header vars.
- **L3 surfaces:** `.on-dark` scope for Noir sections re-declaring the same names.
- **Type roles:** `--font-display` Audrey · `--font-serif` Cormorant Garamond · `--font-ui` Jost.
- **Radius language:** the existing asymmetric "tablecloth drape" radii (small top, generous
  bottom) is distinctive — keep as the family signature on cards/frames/controls.
- **Motion:** 160–260ms UI, 700–900ms stage tints, `cubic-bezier(0.22,1,0.36,1)`.

## Page-by-page

- **Home:** Hero (rotating cloths) → "Two Ways to Sequin" rent/own split → Featured pieces rail →
  texture/fabric editorial band (Noir) with pull-quote → How it works (3 quiet steps) →
  Testimonials → Instagram strip → closing CTA.
- **Rentals:** intro + how-renting-works strip, filterable grid (category chips + search), each
  card "By quote · Reserve".
- **Shop:** filterable/sortable grid with prices.
- **Product:** big gallery, sizes/variants, price or quote, event-date picker for rentals,
  care & details accordion, "Pairs well with" rail.
- **Story:** Brooklyn linen-house narrative, values, monogram moment, portrait imagery.
- **Gallery:** masonry lookbook from real tablescape photos, occasion filter.
- **Contact:** form (name/date/type/message), phone, WhatsApp, email, hours, service area.
- **Cart / Checkout / Confirmation:** as debated (§5).
- **404:** a set-table joke in brand voice, path back to Rentals/Shop.

## Tech

Vite + React 19 + Tailwind v4 (tokens in `@theme`), add `react-router-dom`. No other deps.
Restructure `src/` into `pages/`, `components/`, `lib/` (cart context + localStorage,
scroll-reveal hook), keep `data/products.ts` (extend: `heroSlides`, care notes, occasion tags).
Audrey self-hosted next to existing Jost/Cormorant woff2s. Images lazy + dimensioned;
hero assets preloaded. A11y floor: contrast ≥4.5:1 (gold-300 for small text on dark),
focus-visible rings, aria-labels, landmarks, 44px touch targets.

## Out of scope

Real payments, Shopify sync, CMS, order emails, admin. The demo stores cart in localStorage only.
