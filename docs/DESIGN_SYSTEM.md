# Sequin — Design System

> **Sequin** (SequinTable) — *Upscale table linen for events & home.*
> "Bringing sophistication and style to every celebration."

A warm, dimensional luxe design system for **Sequin Table**, a Brooklyn-based purveyor of
upscale table linens. Two product lines: **Party Rental** (event linen rentals) and
**Home Table Linen** (shop). The aesthetic blends the brand's real tablescape world —
champagne gold, deep bordeaux roses, white textured linen, marble, natural wood, the **"ST"**
monogram — with a modern, *dimensional* web treatment: layered warm shadows, glass, metallic
gold foil, and a signature **sequin shimmer**.

---

## Sources

- **Website:** https://sequintable.com/ (Shopify storefront)
  - Party Rental collection: https://sequintable.com/collections/rental
  - Home Table Linen collection: https://sequintable.com/collections/home
- **Instagram:** https://www.instagram.com/sequin.table/
- **Contact:** 718-790-1832 · sequintable@gmail.com · WhatsApp Business
- **Imagery:** product/tablescape photos pulled from the live Shopify CDN into `assets/img/`.

No codebase or Figma was provided. Visual foundations are derived from the live site's imagery,
copy and brand vocabulary. The dark "Noir" theme and the dimensional/3D effect layer are an
intentional *extension* of the brand for hero and editorial moments — flagged as such, not lifted
from the existing (light, Shopify-default) storefront.

---

## ⚠️ Substitutions & caveats (please confirm)

- **Font — Audrey is missing.** The six uploaded `._Audrey-*.otf` files were 239-byte macOS
  resource-fork stubs, not real fonts. I substituted **Jost** (a geometric Futura-style face on
  Google Fonts) as the closest free match for Audrey's deco-geometric character, plus **Cormorant
  Garamond** as the editorial serif. **Please upload the real Audrey `.woff2`/`.otf` files** and I'll
  swap them into `tokens/fonts.css` (the `--font-display`/`--font-ui` tokens already point at "Jost").
- **Iconography — no brand icon set exists.** The storefront uses Shopify defaults. I standardized on
  **Lucide** (thin 1.5px line icons) loaded from CDN — see ICONOGRAPHY. Swap if you have a preferred set.
- **Dark "Noir" theme + 3D effects** are a creative extension for dramatic surfaces, not the current
  live look. Say the word if you'd rather keep everything light & airy.

---

## Content fundamentals — voice & tone

The brand voice is **gracious, elevated, hospitable** — a refined host, never salesy or loud.

- **Casing.** Display headlines use **Title Case** ("Upscale Table Linen for Events & Home").
  Eyebrows / labels / the monogram use **ALL CAPS with wide tracking**. Body is sentence case.
- **Person.** Warm second person for invitations ("Set your table"), brand-as-host in third
  person for descriptions ("Sequin brings…"). Avoid hard "buy now" imperatives; prefer
  **"Explore Rentals," "Shop Now," "Discover."**
- **Register.** Aspirational and tactile. Lead with *occasion and feeling* (celebration,
  gathering, sophistication) before product specs. Words in rotation: *upscale, sophisticated,
  elegant, celebration, gathering, curated, occasion, table, linen.*
- **Length.** Short. Headlines are a single line; supporting copy is one elegant sentence.
  Whitespace does the talking.
- **Emoji.** **None.** The brand is refined; emoji are off-brand. Use the monogram or a small
  gold rule as ornament instead.
- **Examples (real + on-brand):**
  - Headline: *"Upscale Table Linen for Events & Home"*
  - Subhead: *"Bringing sophistication and style to every celebration."*
  - CTA: *"Explore Rentals" · "Shop Home Linens"*
  - Editorial pull-quote (serif, italic): *"A table is the first thing a guest remembers."*

---

## Visual foundations

**Overall vibe.** Warm, tactile, candle-lit luxury with a quiet modern edge. Think a screened-in
conservatory at dusk: white ribbed linen, gold flatware, bordeaux roses, marble vessels, greenery.
Light by day (the "Linen" theme), dramatic by night (the "Noir" theme).

- **Color.** Warm neutrals from espresso → marble → linen cream; **champagne gold** as the
  signature metal; **bordeaux** as the deep feature accent; **muted sage** for greenery. Never
  cool greys, never neon. See `tokens/colors.css`. Two themes: **Linen** (light, default) and
  **Noir** (dark luxe, `data-theme="noir"`).
- **Type.** Display & UI in **Jost** (geometric, set light and tracked; caps for eyebrows).
  Editorial moments and pull-quotes in **Cormorant Garamond italic**. High contrast between an
  airy geometric sans and a calligraphic serif = the luxe tension.
- **Spacing.** 8px soft grid, generous. Sections breathe (`--section-y` = 96px). Luxury reads as
  *emptiness*, so default to more whitespace than feels necessary.
- **Backgrounds.** Full-bleed photography is central (real tablescapes), often with a bottom
  **protection gradient** (`--grad-veil`) for legible overlaid text. Solid surfaces are linen cream
  or, on Noir, a warm radial espresso (`--grad-noir`). A subtle film **grain** overlay
  (`.grain`, ~5% opacity) adds analog warmth. No flat pure-white pages.
- **Imagery treatment.** Warm, golden-hour, slightly creamy. Natural light, shallow depth of field,
  real food/flowers. Never cold, never b&w, never heavily filtered.
- **Corner radii.** Soft and rounded throughout (plates, vessels and linens are round) —
  cards `--radius-lg` (20px), pills for tags/buttons, larger `--radius-xl/2xl` for feature panels.
  Never sharp 0px corners.
- **Borders.** Hairline warm borders (`--border`, warm taupe at low opacity), with an optional
  **gold hairline** (`--border-gold`) for premium emphasis. 1px, never heavy.
- **Shadows & depth (signature).** Warm, **brown-tinted, multi-layer** elevation (`--shadow-1…5`) —
  never neutral grey. Polished surfaces get a top **inner highlight** (`--inset-top`) so they look
  lit from above. Accent elements get a **gold glow** (`--glow-gold`). Buttons/chips use a subtle
  **bevel** (`--bevel-gold`).
- **Glass.** Frosted translucent panels (`.glass`, `--glass-blur`) for nav bars and overlays,
  warmer and creamier than typical cold glassmorphism.
- **Metallics & shimmer.** Gold is rendered as **foil** (`--foil-gold`, `.foil-text`) not flat
  color. The brand name "sequin" earns a literal **shimmer sweep** (`.sequin-shimmer`) used
  sparingly on hero words and badges.
- **3D.** Cards can **tilt toward the cursor** (`.tilt-3d`, perspective + slight rotateX/Y + lift).
  Used for product cards and feature tiles — subtle (≤5°), never gimmicky.
- **Motion.** Slow, silky, expensive. Easing `--ease-luxe` / `--ease-out` (custom cubic-beziers),
  durations 260–900ms. Fades and gentle rises; no harsh bounces. Shimmer loops are slow (4–6s).
  All motion respects `prefers-reduced-motion`.
- **Hover states.** Lift + deepen shadow + gold hairline appears; gold elements brighten. Links get
  a gold underline with offset. No color inversion.
- **Press states.** Slight shrink (`scale(0.98)`) + inset press shadow (`--inset-press`) — the
  "pressed into linen" feel.
- **Transparency & blur.** Reserved for layered overlays on photography and glass nav — purposeful,
  not decorative everywhere.

---

## Iconography

The live storefront uses Shopify defaults and has **no proprietary icon set**. Standard:

- **Library:** **Lucide** — thin, rounded line icons (1.5–1.75px stroke) that match the airy,
  refined geometry of Jost. Loaded from CDN:
  `<script src="https://unpkg.com/lucide@latest"></script>` then `lucide.createIcons()`,
  or per-icon SVG from https://lucide.dev.
- **Weight/size.** Stroke `1.5`, sized 18–24px inline, `currentColor` so they inherit text color
  (use `--text-soft` or `--accent`). Round line caps/joins to echo the soft radii.
- **Brand mark.** The **"ST" monogram** (seen embossed on the marble vessels) is the brand's true
  iconographic signature — reproduced as a typographic lockup in `assets/` and the `Monogram`
  motif. Use it as the favicon/ornament rather than a generic logo.
- **Emoji / unicode icons:** not used. A small gold rule (`──`) or the monogram serves as ornament.

---

## Index — what's in this folder

- `styles.css` — global entry point (import this). Pure `@import` manifest.
- `tokens/` — `fonts.css`, `colors.css`, `typography.css`, `spacing.css`, `effects.css`, `base.css`.
- `assets/` — `fonts/` (Jost + Cormorant Garamond woff2), `img/` (tablescape photography),
  `brand/` (the ST monogram lockup, SVG).
- `components/` — reusable React primitives (see below) + per-group `@dsCard` specimens.
- `ui_kits/storefront/` — high-fidelity recreation of the Sequin storefront (hero, collections,
  product, cart) — `index.html` + screen JSX.
- `slides/` — sample branded slide layouts (title, feature, quote, gallery).
- Foundation specimen cards (`*.card.html`) — populate the **Design System** tab
  (groups: Type, Colors, Spacing, Effects, Brand).
- `SKILL.md` — Agent-Skill manifest for using this system in Claude Code.

### Components
Button, IconButton, Tag, Badge, Card, ProductCard, Input, Field, Divider, Monogram, Eyebrow.
(See each component's `.prompt.md` for usage.)

### Namespace
Components are exposed at `window.SequinDesignSystem_ec3cc5.<Name>` once `_ds_bundle.js` is loaded.
