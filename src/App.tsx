import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Check,
  ChevronDown,
  Heart,
  Instagram,
  Mail,
  Menu,
  Minus,
  Phone,
  Plus,
  Search,
  ShoppingBag,
  SlidersHorizontal,
  Sparkles,
  X,
} from "lucide-react";
import {
  categories,
  featuredProducts,
  formatPrice,
  heroProducts,
  Product,
  ProductCategory,
  products,
  productUrl,
} from "./data/products";

type View = "home" | "shop" | "rentals" | "gallery" | "contact" | "cart";
type SortKey = "featured" | "price-asc" | "price-desc" | "az";
type CartItem = { product: Product; qty: number; variant: string; date?: string };

const views: Array<{ id: View; label: string }> = [
  { id: "home", label: "Home" },
  { id: "shop", label: "Shop" },
  { id: "rentals", label: "Rentals" },
  { id: "gallery", label: "Gallery" },
  { id: "contact", label: "Contact" },
];

const filterOptions: Array<"All" | ProductCategory> = ["All", ...categories];
const contactPhone = "718-790-1832";
const whatsappNumber = "17187901832";
const contactEmail = "sequintable@gmail.com";

const getInitialView = (): View => {
  const hash = window.location.hash.replace("#", "");
  return ["home", "shop", "rentals", "gallery", "contact", "cart"].includes(hash) ? (hash as View) : "home";
};

function App() {
  const [view, setView] = useState<View>(getInitialView);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeHero, setActiveHero] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [heroPaused, setHeroPaused] = useState(false);
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<"All" | ProductCategory>("All");
  const [sort, setSort] = useState<SortKey>("featured");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [saved, setSaved] = useState<string[]>([]);
  const [toast, setToast] = useState("");

  const navigate = (nextView: View) => {
    setView(nextView);
    setSelectedProduct(null);
    setMobileOpen(false);
    setActiveFilter("All");
    window.history.replaceState(null, "", `#${nextView}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navigateHero = (direction: "next" | "prev") => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveHero((current) =>
      direction === "next"
        ? (current + 1) % heroProducts.length
        : (current + heroProducts.length - 1) % heroProducts.length,
    );
    window.setTimeout(() => setIsAnimating(false), 860);
  };

  const addToCart = (product: Product, variant = product.variants[0] ?? "Default", qty = 1, date?: string) => {
    setCart((current) => {
      const existing = current.find(
        (item) => item.product.id === product.id && item.variant === variant && item.date === date,
      );
      if (existing) {
        return current.map((item) =>
          item === existing ? { ...item, qty: item.qty + qty } : item,
        );
      }
      return [...current, { product, qty, variant, date }];
    });
    setToast(product.price > 0 ? "Added to cart" : "Added to rental quote");
  };

  const updateQty = (index: number, delta: number) => {
    setCart((current) =>
      current
        .map((item, itemIndex) => (itemIndex === index ? { ...item, qty: Math.max(0, item.qty + delta) } : item))
        .filter((item) => item.qty > 0),
    );
  };

  const toggleSaved = (productId: string) => {
    setSaved((current) =>
      current.includes(productId) ? current.filter((id) => id !== productId) : [...current, productId],
    );
  };

  useEffect(() => {
    heroProducts.forEach((item) => {
      const image = new Image();
      image.src = item.heroAsset ?? item.image;
    });
  }, []);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 640);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    if (heroPaused || view !== "home" || selectedProduct) return;
    const timeout = window.setTimeout(() => navigateHero("next"), 7000);
    return () => window.clearTimeout(timeout);
  }, [activeHero, heroPaused, view, selectedProduct]);

  useEffect(() => {
    const onHash = () => setView(getInitialView());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  useEffect(() => {
    if (!toast) return;
    const timeout = window.setTimeout(() => setToast(""), 2200);
    return () => window.clearTimeout(timeout);
  }, [toast]);

  useEffect(() => {
    if (selectedProduct) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [selectedProduct]);

  const catalogProducts = useMemo(() => {
    const base = view === "rentals" ? products.filter((product) => product.collection === "Rentals") : products;
    const searched = base.filter((product) => {
      const haystack = `${product.title} ${product.category} ${product.collection} ${product.tags.join(" ")}`.toLowerCase();
      return haystack.includes(query.trim().toLowerCase());
    });
    const filtered =
      activeFilter === "All" ? searched : searched.filter((product) => product.category === activeFilter);

    return [...filtered].sort((a, b) => {
      if (sort === "price-asc") return a.price - b.price;
      if (sort === "price-desc") return b.price - a.price;
      if (sort === "az") return a.title.localeCompare(b.title);
      return Number(Boolean(b.featured)) - Number(Boolean(a.featured));
    });
  }, [activeFilter, query, sort, view]);

  return (
    <div className="site-shell">
      <Header
        view={view}
        mobileOpen={mobileOpen}
        cartCount={cart.reduce((sum, item) => sum + item.qty, 0)}
        savedCount={saved.length}
        onNavigate={navigate}
        onMenu={() => setMobileOpen((open) => !open)}
      />

      {view === "home" && !selectedProduct && (
        <main>
          <Hero
            activeHero={activeHero}
            isMobile={isMobile}
            onPrev={() => navigateHero("prev")}
            onNext={() => navigateHero("next")}
            onPause={setHeroPaused}
            onNavigate={navigate}
            onOpenProduct={setSelectedProduct}
          />
          <HomeContent
            onNavigate={navigate}
            onOpenProduct={setSelectedProduct}
            onAdd={addToCart}
            onToggleSaved={toggleSaved}
            saved={saved}
          />
        </main>
      )}

      {(view === "shop" || view === "rentals") && !selectedProduct && (
        <CatalogView
          view={view}
          products={catalogProducts}
          query={query}
          activeFilter={activeFilter}
          sort={sort}
          saved={saved}
          onQuery={setQuery}
          onFilter={setActiveFilter}
          onSort={setSort}
          onAdd={addToCart}
          onOpenProduct={setSelectedProduct}
          onToggleSaved={toggleSaved}
        />
      )}

      {view === "gallery" && !selectedProduct && <GalleryView onOpenProduct={setSelectedProduct} />}
      {view === "contact" && !selectedProduct && <ContactView onNavigate={navigate} />}
      {view === "cart" && !selectedProduct && <CartView cart={cart} onNavigate={navigate} onUpdateQty={updateQty} />}

      {selectedProduct && (
        <ProductView
          product={selectedProduct}
          saved={saved.includes(selectedProduct.id)}
          onBack={() => setSelectedProduct(null)}
          onAdd={addToCart}
          onOpenProduct={setSelectedProduct}
          onToggleSaved={() => toggleSaved(selectedProduct.id)}
        />
      )}

      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}

function Header({
  view,
  mobileOpen,
  cartCount,
  savedCount,
  onNavigate,
  onMenu,
}: {
  view: View;
  mobileOpen: boolean;
  cartCount: number;
  savedCount: number;
  onNavigate: (view: View) => void;
  onMenu: () => void;
}) {
  return (
    <header className="site-header">
      <a className="brand-lockup" href="#home" onClick={() => onNavigate("home")} aria-label="Sequin Table home">
        <img src="/brand/monogram.svg" alt="" />
        <img className="brand-wordmark" src="/brand/sequin-wordmark.svg" alt="Sequin Table Linen" />
      </a>

      <nav className="desktop-nav" aria-label="Primary navigation">
        {views.map((item) => (
          <button
            className={view === item.id ? "nav-link active" : "nav-link"}
            key={item.id}
            type="button"
            data-testid={`nav-${item.id}`}
            onClick={() => onNavigate(item.id)}
          >
            {item.label}
          </button>
        ))}
      </nav>

      <div className="header-actions">
        <a className="icon-link" href="https://www.instagram.com/sequin.table/" aria-label="Instagram">
          <Instagram size={18} />
        </a>
        <button className="icon-link saved-link" type="button" aria-label={`${savedCount} saved products`}>
          <Heart size={18} />
          {savedCount > 0 && <span>{savedCount}</span>}
        </button>
        <button className="bag-button" type="button" onClick={() => onNavigate("cart")} aria-label={`${cartCount} items in cart`}>
          <ShoppingBag size={18} />
          <span>{cartCount}</span>
        </button>
        <button className="menu-button" type="button" onClick={onMenu} aria-label="Open menu">
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="mobile-nav">
          {[...views, { id: "cart" as View, label: "Cart" }].map((item) => (
            <button key={item.id} type="button" onClick={() => onNavigate(item.id)}>
              {item.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}

function Hero({
  activeHero,
  isMobile,
  onPrev,
  onNext,
  onPause,
  onNavigate,
  onOpenProduct,
}: {
  activeHero: number;
  isMobile: boolean;
  onPrev: () => void;
  onNext: () => void;
  onPause: (paused: boolean) => void;
  onNavigate: (view: View) => void;
  onOpenProduct: (product: Product) => void;
}) {
  const current = heroProducts[activeHero];

  return (
    <section
      className="hero-carousel"
      aria-label="Sequin Table featured tablecloth carousel"
      onMouseEnter={() => onPause(true)}
      onMouseLeave={() => onPause(false)}
      onFocus={() => onPause(true)}
      onBlur={() => onPause(false)}
      style={{
        background:
          `radial-gradient(circle at 52% 68%, ${current.heroPanel ?? current.palette} 0%, transparent 44%), ` +
          `linear-gradient(145deg, ${current.heroBg ?? current.palette} 0%, ${current.palette} 100%)`,
      }}
    >
      <div className="grain-layer" />
      <div className="hero-ghost">{current.title}</div>
      <img className="hero-brand-tag" src="/brand/sequin-logo-full.svg" alt="Sequin Table Linen" />

      <div className="hero-object-stage">
        {heroProducts.map((product, index) => {
          const role =
            index === activeHero
              ? "center"
              : index === (activeHero + heroProducts.length - 1) % heroProducts.length
                ? "left"
                : index === (activeHero + 1) % heroProducts.length
                  ? "right"
                  : "back";
          return (
            <button
              className={`hero-object hero-object-${role}`}
              key={product.id}
              type="button"
              onClick={() => (role === "center" ? onOpenProduct(product) : undefined)}
              style={getHeroRoleStyle(role, isMobile)}
              aria-label={role === "center" ? `View ${product.title}` : product.title}
            >
              <img src={product.heroAsset ?? product.image} alt={product.title} draggable={false} />
            </button>
          );
        })}
      </div>

      <div className="hero-text-card">
        <p>{current.collection} / {current.category}</p>
        <h1>{current.title}</h1>
        <span>{getHeroCopy(current)}</span>
        <div>
          <button type="button" className="round-cta light" onClick={() => onNavigate("shop")}>
            Shop
            <ArrowRight size={18} />
          </button>
          <button type="button" className="round-cta glass" onClick={() => onNavigate("rentals")}>
            Explore Rentals
            <Sparkles size={18} />
          </button>
        </div>
      </div>

      <div className="hero-nav-buttons">
        <button type="button" onClick={onPrev} aria-label="Previous tablecloth">
          <ArrowLeft size={25} />
        </button>
        <button type="button" onClick={onNext} aria-label="Next tablecloth" data-testid="hero-next">
          <ArrowRight size={25} />
        </button>
      </div>

      <button className="hero-discover" type="button" onClick={() => onOpenProduct(current)}>
        View Product
        <ArrowRight size={28} />
      </button>
    </section>
  );
}

function getHeroRoleStyle(role: "center" | "left" | "right" | "back", isMobile: boolean) {
  if (role === "center") {
    return {
      left: "50%",
      bottom: isMobile ? "19%" : "-3%",
      height: isMobile ? "49%" : "76%",
      transform: `translateX(-50%) scale(${isMobile ? 1.35 : 1.36})`,
      opacity: 1,
      filter: "blur(0)",
      zIndex: 22,
    };
  }
  if (role === "left" || role === "right") {
    return {
      left: role === "left" ? (isMobile ? "18%" : "27%") : isMobile ? "82%" : "73%",
      bottom: isMobile ? "42%" : "14%",
      height: isMobile ? "18%" : "28%",
      transform: "translateX(-50%) scale(1)",
      opacity: 1,
      filter: "blur(1.5px)",
      zIndex: 10,
    };
  }
  return {
    left: "50%",
    bottom: isMobile ? "43%" : "16%",
    height: isMobile ? "14%" : "22%",
    transform: "translateX(-50%) scale(1)",
    opacity: 1,
    filter: "blur(3px)",
    zIndex: 5,
  };
}

function getHeroCopy(product: Product) {
  if (product.collection === "Rentals") {
    return `${product.title} brings event-scale texture with a refined Sequin Table finish. Select the size, quantity, and date to request availability.`;
  }
  return `${product.title} is designed for a premium home table with a clean profile, rich texture, and a finished Sequin Table look.`;
}

function HomeContent({
  onNavigate,
  onOpenProduct,
  onAdd,
  onToggleSaved,
  saved,
}: {
  onNavigate: (view: View) => void;
  onOpenProduct: (product: Product) => void;
  onAdd: (product: Product) => void;
  onToggleSaved: (productId: string) => void;
  saved: string[];
}) {
  const previewProducts = featuredProducts.slice(0, 8);
  const rentalPreview = products.filter((product) => product.collection === "Rentals").slice(0, 4);

  return (
    <>
      <section className="brand-strip" aria-label="Sequin brand promise">
        <img src="/brand/sequin-logo-espresso.svg" alt="Sequin Table Linen" />
        <p>Premium table linens for homes, hosts, and events that need a finished point of view.</p>
      </section>

      <section className="split-paths" aria-label="Shop and rental paths">
        <button className="path-card path-shop" type="button" onClick={() => onNavigate("shop")}>
          <img src="/products/lisbon-ribbed-white.jpg" alt="" />
          <span>Home Table Linens</span>
          <strong>Shop sizes, colors, and textures for your table.</strong>
          <ArrowRight size={22} />
        </button>
        <button className="path-card path-rentals" type="button" onClick={() => onNavigate("rentals")}>
          <img src="/products/dolce-flutter-overlay.jpg" alt="" />
          <span>Event Rentals</span>
          <strong>Build a quote for overlays, cloths, napkins, and rings.</strong>
          <ArrowRight size={22} />
        </button>
      </section>

      <section className="section-block">
        <div className="section-heading">
          <p className="mini-label">Signature textures</p>
          <h2>Tablecloths with quiet color, sculpted texture, and a polished finish.</h2>
          <button type="button" className="text-button" onClick={() => onNavigate("shop")}>
            View full shop
            <ArrowRight size={18} />
          </button>
        </div>
        <div className="product-grid">
          {previewProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              saved={saved.includes(product.id)}
              onOpen={() => onOpenProduct(product)}
              onAdd={() => onAdd(product)}
              onToggleSaved={() => onToggleSaved(product.id)}
            />
          ))}
        </div>
      </section>

      <section className="editorial-band">
        <div>
          <p className="mini-label">For planners and hosts</p>
          <h2>Buy for home. Rent for the event. Keep the table language consistent.</h2>
          <p>
            Build a full table story from lace, velvet, quilted cloths, napkins, and rings. The result
            should feel designed before the first plate is placed.
          </p>
          <button type="button" className="primary-button dark" onClick={() => onNavigate("rentals")}>
            Explore Rental Quote
            <ArrowRight size={18} />
          </button>
        </div>
        <div className="editorial-stack">
          {rentalPreview.map((product) => (
            <button key={product.id} type="button" onClick={() => onOpenProduct(product)}>
              <img src={product.image} alt={product.title} />
              <span>{product.title}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="process-strip">
        {[
          ["Shop", "Choose a tablecloth size, quantity, and color direction for your home table."],
          ["Quote", "Select rental pieces, date, size, and quantity, then request availability."],
          ["Style", "Layer lace, velvet, napkins, and rings into a polished finished setting."],
        ].map(([title, copy]) => (
          <div key={title}>
            <Check size={18} />
            <h3>{title}</h3>
            <p>{copy}</p>
          </div>
        ))}
      </section>
    </>
  );
}

function CatalogView({
  view,
  products,
  query,
  activeFilter,
  sort,
  saved,
  onQuery,
  onFilter,
  onSort,
  onAdd,
  onOpenProduct,
  onToggleSaved,
}: {
  view: View;
  products: Product[];
  query: string;
  activeFilter: "All" | ProductCategory;
  sort: SortKey;
  saved: string[];
  onQuery: (query: string) => void;
  onFilter: (filter: "All" | ProductCategory) => void;
  onSort: (sort: SortKey) => void;
  onAdd: (product: Product) => void;
  onOpenProduct: (product: Product) => void;
  onToggleSaved: (productId: string) => void;
}) {
  const isRental = view === "rentals";

  return (
    <main className="catalog-page">
      <section className="catalog-hero">
        <div>
          <p className="mini-label">{isRental ? "Rental collection" : "Home collection"}</p>
          <h1>{isRental ? "Event Linen Rentals" : "Shop Table Linens"}</h1>
          <p>
            {isRental
              ? "Browse event-ready cloths, overlays, toppers, napkins, and rings. Choose the pieces, add event details, and request availability."
              : "Premium tablecloths and finishing pieces for a table that feels intentional without feeling overdone."}
          </p>
        </div>
        <img src={isRental ? "/products/white-pendant-lace.jpg" : "/products/lisbon-ribbed.jpg"} alt="" />
      </section>

      <section className="catalog-tools">
        <label className="search-box">
          <Search size={18} />
          <input
            data-testid="catalog-search"
            value={query}
            onChange={(event) => onQuery(event.target.value)}
            placeholder="Search white, velvet, lace, napkin..."
          />
        </label>
        <label className="select-wrap">
          <SlidersHorizontal size={18} />
          <select data-testid="catalog-sort" value={sort} onChange={(event) => onSort(event.target.value as SortKey)}>
            <option value="featured">Featured</option>
            <option value="price-asc">Price low to high</option>
            <option value="price-desc">Price high to low</option>
            <option value="az">Alphabetically</option>
          </select>
          <ChevronDown size={18} />
        </label>
      </section>

      <div className="filter-row" aria-label="Catalog filters">
        {filterOptions.map((filter) => (
          <button
            key={filter}
            type="button"
            className={activeFilter === filter ? "active" : ""}
            onClick={() => onFilter(filter)}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="catalog-count">{products.length} pieces</div>

      <section className="product-grid">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            saved={saved.includes(product.id)}
            onOpen={() => onOpenProduct(product)}
            onAdd={() => onAdd(product)}
            onToggleSaved={() => onToggleSaved(product.id)}
          />
        ))}
      </section>
    </main>
  );
}

function ProductCard({
  product,
  saved,
  onOpen,
  onAdd,
  onToggleSaved,
}: {
  product: Product;
  saved: boolean;
  onOpen: () => void;
  onAdd: () => void;
  onToggleSaved: () => void;
}) {
  return (
    <article className="product-card" data-testid="product-card" data-product-id={product.id}>
      <button className="product-image-button" type="button" onClick={onOpen}>
        <img src={product.image} alt={product.title} />
      </button>
      <button className={saved ? "save-button saved" : "save-button"} type="button" onClick={onToggleSaved}>
        <Heart size={18} fill={saved ? "currentColor" : "none"} />
      </button>
      <div className="product-card-body">
        <span>{product.collection} / {product.category}</span>
        <button type="button" onClick={onOpen}>
          {product.title}
        </button>
        <p>{product.description}</p>
        <div className="product-footer">
          <strong>{formatPrice(product)}</strong>
          <button type="button" onClick={onAdd} data-testid={`add-${product.id}`}>
            {product.price > 0 ? "Add" : "Quote"}
          </button>
        </div>
      </div>
    </article>
  );
}

function ProductView({
  product,
  saved,
  onBack,
  onAdd,
  onOpenProduct,
  onToggleSaved,
}: {
  product: Product;
  saved: boolean;
  onBack: () => void;
  onAdd: (product: Product, variant: string, qty: number, date?: string) => void;
  onOpenProduct: (product: Product) => void;
  onToggleSaved: () => void;
}) {
  const [variant, setVariant] = useState(product.variants[0] ?? "Default");
  const [qty, setQty] = useState(1);
  const [date, setDate] = useState("");
  const isRental = product.collection === "Rentals";
  const related = products
    .filter((item) => item.id !== product.id && item.category === product.category)
    .slice(0, 4);

  return (
    <main className="product-page">
      <button className="back-button" type="button" onClick={onBack}>
        <ArrowLeft size={18} />
        Back
      </button>
      <section className="product-detail">
        <div className="product-gallery">
          <img src={product.image} alt={product.title} />
          <div>
            {[product.image, ...related.slice(0, 3).map((item) => item.image)].map((image, index) => (
              <img key={`${image}-${index}`} src={image} alt="" />
            ))}
          </div>
        </div>
        <div className="product-info">
          <p className="mini-label">{product.collection} / {product.category}</p>
          <h1>{product.title}</h1>
          <p>{product.description}</p>
          <strong>{formatPrice(product)}</strong>

          <label className="form-field">
            <span>Size</span>
            <select value={variant} onChange={(event) => setVariant(event.target.value)}>
              {product.variants.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>

          <label className="form-field">
            <span>Quantity</span>
            <input type="number" min={1} value={qty} onChange={(event) => setQty(Math.max(1, Number(event.target.value)))} />
          </label>

          {isRental && (
            <label className="form-field">
              <span>Event Date</span>
              <input type="date" value={date} onChange={(event) => setDate(event.target.value)} />
            </label>
          )}

          <div className="product-actions">
            <button type="button" className="primary-button dark" onClick={() => onAdd(product, variant, qty, date)}>
              {isRental ? "Add to Quote" : "Add to Cart"}
              <ShoppingBag size={18} />
            </button>
            <a className="ghost-link" href={productUrl(product)} target="_blank" rel="noreferrer">
              Shopify Link
              <ArrowRight size={18} />
            </a>
            <button className={saved ? "save-inline saved" : "save-inline"} type="button" onClick={onToggleSaved}>
              <Heart size={18} fill={saved ? "currentColor" : "none"} />
              Save
            </button>
          </div>
        </div>
      </section>

      <section className="section-block">
        <div className="section-heading">
          <p className="mini-label">Related pieces</p>
          <h2>More in this texture story.</h2>
        </div>
        <div className="product-grid related-grid">
          {related.map((item) => (
            <ProductCard
              key={item.id}
              product={item}
              saved={false}
              onOpen={() => onOpenProduct(item)}
              onAdd={() => onAdd(item, item.variants[0] ?? "Default", 1)}
              onToggleSaved={() => undefined}
            />
          ))}
        </div>
      </section>
    </main>
  );
}

function GalleryView({ onOpenProduct }: { onOpenProduct: (product: Product) => void }) {
  const gallery = products.filter((product) => product.category !== "Napkin Rings").slice(0, 12);
  return (
    <main className="gallery-page">
      <section className="page-heading">
        <p className="mini-label">Gallery</p>
        <h1>Texture, color, styled surfaces, and product detail.</h1>
        <p>A visual library for choosing the mood of the table before choosing the exact piece.</p>
      </section>
      <section className="gallery-grid">
        {gallery.map((product, index) => (
          <button key={product.id} className={index % 5 === 0 ? "wide" : ""} type="button" onClick={() => onOpenProduct(product)}>
            <img src={product.image} alt={product.title} />
            <span>{product.title}</span>
          </button>
        ))}
      </section>
    </main>
  );
}

function ContactView({ onNavigate }: { onNavigate: (view: View) => void }) {
  return (
    <main className="contact-page">
      <section className="contact-hero">
        <div>
          <p className="mini-label">Contact Sequin</p>
          <h1>Tell us the table, date, and direction.</h1>
          <p>
            For rentals, send the product list, date, quantities, and event notes. For home linens,
            reach out for sizing or styling help.
          </p>
          <div className="contact-grid">
            <a href={`tel:${contactPhone.replaceAll("-", "")}`}>
              <Phone size={18} />
              {contactPhone}
            </a>
            <a href={`mailto:${contactEmail}`}>
              <Mail size={18} />
              {contactEmail}
            </a>
            <a href="https://www.instagram.com/sequin.table/">
              <Instagram size={18} />
              @sequin.table
            </a>
          </div>
          <button type="button" className="primary-button dark" onClick={() => onNavigate("rentals")}>
            Start Rental Quote
            <ArrowRight size={18} />
          </button>
        </div>
        <img src="/brand/sequintable-og.jpg" alt="Sequin Table linen styling" />
      </section>
    </main>
  );
}

function CartView({
  cart,
  onNavigate,
  onUpdateQty,
}: {
  cart: CartItem[];
  onNavigate: (view: View) => void;
  onUpdateQty: (index: number, delta: number) => void;
}) {
  const total = cart.reduce((sum, item) => sum + item.product.price * item.qty, 0);
  const quoteText = encodeURIComponent(
    `Hi Sequin Table, I would like help with these pieces:\n\n${cart
      .map((item) => `${item.qty} x ${item.product.title} (${item.variant}${item.date ? `, ${item.date}` : ""})`)
      .join("\n")}`,
  );

  return (
    <main className="cart-page">
      <section className="page-heading">
        <p className="mini-label">Cart</p>
        <h1>Your selected table pieces.</h1>
        <p>Review purchase pieces and rental quote items before sending the request.</p>
      </section>

      <section className="cart-layout">
        <div className="cart-items">
          {cart.length === 0 && (
            <div className="drawer-empty">
              <ShoppingBag size={30} />
              <p>Your cart is ready for a tablecloth.</p>
              <button type="button" className="primary-button dark" onClick={() => onNavigate("shop")}>
                Shop Linens
              </button>
            </div>
          )}
          {cart.map((item, index) => (
            <article className="cart-item" key={`${item.product.id}-${item.variant}-${item.date ?? "buy"}`}>
              <img src={item.product.image} alt="" />
              <div>
                <strong>{item.product.title}</strong>
                <span>{item.variant}</span>
                {item.date && <span><Calendar size={14} /> {item.date}</span>}
                <small>{formatPrice(item.product)}</small>
              </div>
              <div className="qty-row">
                <button type="button" onClick={() => onUpdateQty(index, -1)} aria-label="Decrease quantity">
                  <Minus size={14} />
                </button>
                <span>{item.qty}</span>
                <button type="button" onClick={() => onUpdateQty(index, 1)} aria-label="Increase quantity">
                  <Plus size={14} />
                </button>
              </div>
            </article>
          ))}
        </div>

        <aside className="cart-summary">
          <span>Estimated purchase total</span>
          <strong>{total > 0 ? `$${total.toFixed(2)}` : "Quote needed"}</strong>
          <p>Rental items stay as inquiry items and do not show pricing online.</p>
          <a className="primary-button dark" href={`mailto:${contactEmail}?subject=Sequin Table request&body=${quoteText}`}>
            Email Request
            <Mail size={18} />
          </a>
          <a className="ghost-link" href={`https://wa.me/${whatsappNumber}?text=${quoteText}`} target="_blank" rel="noreferrer">
            WhatsApp Sequin
            <ArrowRight size={18} />
          </a>
        </aside>
      </section>
    </main>
  );
}

export default App;
