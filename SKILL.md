---
name: sequin-design
description: Use this skill to generate well-branded interfaces and assets for Sequin (SequinTable) — upscale table linen for events & home — for production or throwaway prototypes/mocks. Contains essential design guidelines, colors, type, fonts, dimensional "luxe" effects, assets, and UI-kit components for prototyping.
user-invocable: true
---

Read the `readme.md` file within this skill, and explore the other available files.

If creating visual artifacts (slides, mocks, throwaway prototypes, etc.), copy assets out and create
static HTML files for the user to view. If working on production code, copy assets and read the rules
here to become an expert in designing with this brand.

If the user invokes this skill without other guidance, ask them what they want to build or design, ask
a few questions, and act as an expert designer who outputs HTML artifacts _or_ production code.

## Quick map
- `styles.css` — link this one file; it `@import`s all tokens & fonts.
- `tokens/` — `colors.css` (Linen + Noir themes), `typography.css` (Jost + Cormorant Garamond),
  `spacing.css`, `effects.css` (warm elevation, glass, gold foil, sequin shimmer, 3D tilt), `base.css`.
- `components/` — React primitives: Button, IconButton, Tag, Badge, Eyebrow, Divider, Monogram,
  Card, ProductCard, Input, Field. Each has a `.prompt.md` with usage.
- `ui_kits/storefront/` — full interactive storefront recreation (hero, collections, catalog, cart).
- `assets/` — `fonts/`, `img/` (brand photography), `brand/monogram.svg`.

## Brand in one breath
Warm, candle-lit luxury: champagne gold (rendered as **foil**, not flat), bordeaux, marble & linen
neutrals. Display in **Jost** (light, tracked; CAPS eyebrows), editorial in **Cormorant Garamond
italic**. Soft radii, warm brown-tinted multi-layer shadows, top inner highlights, frosted glass,
and a signature **sequin shimmer**. Two themes — **Linen** (light default) and **Noir**
(`data-theme="noir"`, dark luxe). Voice: gracious, elevated, hospitable; Title Case headlines, no
emoji, occasion before product.

## Caveats
- **Audrey font is substituted with Jost** (the uploads were empty macOS stubs). Swap real Audrey
  `.woff2` into `tokens/fonts.css` when available.
- Icons use **Lucide** (CDN), thin 1.5–1.75px stroke.
