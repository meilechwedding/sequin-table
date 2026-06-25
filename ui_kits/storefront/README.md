# UI Kit — Sequin Storefront

A high-fidelity, interactive recreation of the Sequin (SequinTable) storefront, composed from the
design-system primitives. Open `index.html`.

## Screens / sections
- **Header.jsx** — sticky frosted-glass nav with the ST lockup, search/account, and a live cart count.
- **Hero.jsx** — full-bleed tablescape hero with a glass overlay, animated foil headline, dual CTA, grain.
- **Collections.jsx** — the two brand tiles: *Rent the Occasion* (rentals) and *Set Your Table* (home).
- **Catalog.jsx** — filterable product grid (All / Home / Rentals) of 3D-tilt `ProductCard`s. Holds
  the `SEQUIN_PRODUCTS` sample data.
- **Footer.jsx** — editorial bordeaux quote band + newsletter signup + dark footer with real contact info.
- **CartDrawer.jsx** — slide-in noir cart drawer with quantity steppers, subtotal, checkout.

## Interactions
- Filter the catalog by collection.
- Favourite items (heart toggles).
- Click a product to add to cart → toast + header count updates.
- Open the cart drawer, adjust quantities, remove, see subtotal.
- Nav / hero / collection CTAs scroll to and filter the catalog.

## Notes
- Uses the compiled bundle: `const { … } = window.SequinDesignSystem_ec3cc5`.
- Requires Lucide (CDN) for icons; `lucide.createIcons()` runs after render.
- Imagery is the brand's own Shopify photography in `assets/img/`.
- The dark "Noir" theme on hero/quote/footer/cart is the dimensional brand extension (see root readme).
- This recreates the existing storefront's structure and content; it does not invent new product features.
