import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
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
  Product,
  ProductCategory,
  products,
  productUrl,
} from "./data/products";

type View = "home" | "shop" | "rentals" | "about";
type SortKey = "featured" | "price-asc" | "price-desc" | "az";
type CartItem = { product: Product; qty: number };

const views: Array<{ id: View; label: string }> = [
  { id: "home", label: "Home" },
  { id: "shop", label: "Shop" },
  { id: "rentals", label: "Rentals" },
  { id: "about", label: "About" },
];

const heroItems = featuredProducts.slice(0, 5);

const filterOptions: Array<"All" | ProductCategory> = ["All", ...categories];

const contactPhone = "718-790-1832";
const whatsappNumber = "17187901832";
const contactEmail = "sequintable@gmail.com";

const getInitialView = (): View => {
  const hash = window.location.hash.replace("#", "");
  return views.some((item) => item.id === hash) ? (hash as View) : "home";
};

function App() {
  const [view, setView] = useState<View>(getInitialView);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeHero, setActiveHero] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<"All" | ProductCategory>("All");
  const [sort, setSort] = useState<SortKey>("featured");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [saved, setSaved] = useState<string[]>([]);
  const [toast, setToast] = useState("");

  const rotateHero = (direction: "next" | "prev") => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveHero((current) =>
      direction === "next" ? (current + 1) % heroItems.length : (current + heroItems.length - 1) % heroItems.length,
    );
    window.setTimeout(() => setIsAnimating(false), 700);
  };

  const showHero = (index: number) => {
    if (index === activeHero || isAnimating) return;
    setIsAnimating(true);
    setActiveHero(index);
    window.setTimeout(() => setIsAnimating(false), 700);
  };

  useEffect(() => {
    heroItems.forEach((item) => {
      const image = new Image();
      image.src = item.heroImage ?? item.image;
    });
  }, []);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setIsAnimating(true);
      setActiveHero((current) => (current + 1) % heroItems.length);
      window.setTimeout(() => setIsAnimating(false), 700);
    }, 6200);
    return () => window.clearTimeout(timeout);
  }, [activeHero]);

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

  const navigate = (nextView: View) => {
    setView(nextView);
    setMobileOpen(false);
    setActiveFilter("All");
    window.history.replaceState(null, "", `#${nextView}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const addToCart = (product: Product) => {
    setCart((current) => {
      const existing = current.find((item) => item.product.id === product.id);
      if (existing) {
        return current.map((item) => (item.product.id === product.id ? { ...item, qty: item.qty + 1 } : item));
      }
      return [...current, { product, qty: 1 }];
    });
    setDrawerOpen(true);
    setToast(product.price > 0 ? "Added to bag" : "Added to quote");
  };

  const updateQty = (productId: string, delta: number) => {
    setCart((current) =>
      current
        .map((item) => (item.product.id === productId ? { ...item, qty: Math.max(0, item.qty + delta) } : item))
        .filter((item) => item.qty > 0),
    );
  };

  const toggleSaved = (productId: string) => {
    setSaved((current) =>
      current.includes(productId) ? current.filter((id) => id !== productId) : [...current, productId],
    );
  };

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

  const currentHero = heroItems[activeHero];

  return (
    <div className="site-shell">
      <Header
        view={view}
        mobileOpen={mobileOpen}
        cartCount={cart.reduce((sum, item) => sum + item.qty, 0)}
        savedCount={saved.length}
        onNavigate={navigate}
        onMenu={() => setMobileOpen((open) => !open)}
        onOpenCart={() => setDrawerOpen(true)}
      />

      {view === "home" && (
        <main>
          <Hero
            current={currentHero}
            activeHero={activeHero}
            onPrev={() => rotateHero("prev")}
            onNext={() => rotateHero("next")}
            onShowHero={showHero}
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

      {(view === "shop" || view === "rentals") && (
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

      {view === "about" && <AboutView onNavigate={navigate} />}

      <ProductModal
        product={selectedProduct}
        saved={saved}
        onClose={() => setSelectedProduct(null)}
        onAdd={addToCart}
        onToggleSaved={toggleSaved}
      />

      <QuoteDrawer
        open={drawerOpen}
        cart={cart}
        onClose={() => setDrawerOpen(false)}
        onUpdateQty={updateQty}
      />

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
  onOpenCart,
}: {
  view: View;
  mobileOpen: boolean;
  cartCount: number;
  savedCount: number;
  onNavigate: (view: View) => void;
  onMenu: () => void;
  onOpenCart: () => void;
}) {
  return (
    <header className="site-header">
      <a className="brand-lockup" href="#home" onClick={() => onNavigate("home")} aria-label="Sequin Table home">
        <img src="/brand/monogram.svg" alt="" />
        <span>
          <strong>Sequin</strong>
          <small>Table Linen Rental and Home</small>
        </span>
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
        <button className="bag-button" type="button" onClick={onOpenCart} aria-label={`${cartCount} items in bag`}>
          <ShoppingBag size={18} />
          <span>{cartCount}</span>
        </button>
        <button className="menu-button" type="button" onClick={onMenu} aria-label="Open menu">
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="mobile-nav">
          {views.map((item) => (
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
  current,
  activeHero,
  onPrev,
  onNext,
  onShowHero,
  onNavigate,
  onOpenProduct,
}: {
  current: Product;
  activeHero: number;
  onPrev: () => void;
  onNext: () => void;
  onShowHero: (index: number) => void;
  onNavigate: (view: View) => void;
  onOpenProduct: (product: Product) => void;
}) {
  const heroImage = current.heroImage ?? current.image;

  return (
    <section className="hero-frame" aria-label="Sequin Table featured linens">
      <aside className="hero-copy-panel">
        <p className="mini-label">Sequin Table</p>
        <h1>Upscale Table Linen for Events & Home</h1>
        <p>
          Bringing sophistication and style to every celebration with curated rentals, home linens,
          napkins, and finishing details.
        </p>
        <div className="hero-stats" aria-label="Sequin highlights">
          <span>4.1K Instagram followers</span>
          <span>Nationwide shipping</span>
          <span>Brooklyn based styling</span>
        </div>
        <div className="hero-copy-actions">
          <button type="button" className="primary-button light" onClick={() => onNavigate("shop")}>
            Explore Shop
            <ArrowRight size={18} />
          </button>
          <button type="button" className="ghost-button" onClick={() => onNavigate("rentals")}>
            See Rentals
          </button>
        </div>
      </aside>

      <div className="hero-stage" style={{ backgroundColor: current.palette }}>
        <div className="grain-layer" />
        <span className="hero-brand">SEQUIN</span>
        <strong className="ghost-word">TABLE</strong>

        <div className="hero-rim" aria-hidden="true" />
        <button className="hero-table-display" type="button" onClick={() => onOpenProduct(current)}>
          <span className="hero-table-shadow" />
          <img key={current.id} src={heroImage} alt={`${current.title} styled on a table`} draggable={false} />
        </button>

        <div className="hero-stage-copy">
          <p>{current.title}</p>
          <span>{current.description}</span>
          <div className="hero-meta-row">
            <small>{current.category}</small>
            <small>{formatPrice(current)}</small>
          </div>
        </div>

        <div className="hero-arrows">
          <button type="button" onClick={onPrev} aria-label="Previous featured linen">
            <ChevronLeft size={28} />
          </button>
          <button type="button" onClick={onNext} aria-label="Next featured linen" data-testid="hero-next">
            <ChevronRight size={28} />
          </button>
        </div>

        <button className="discover-link" type="button" onClick={() => onOpenProduct(current)}>
          Explore this linen
          <ArrowRight size={22} />
        </button>

        <div className="hero-progress" aria-hidden="true">
          <span key={current.id} />
        </div>

        <div className="hero-dots" aria-label="Featured slide">
          {heroItems.map((item, index) => (
            <button
              key={item.id}
              className={index === activeHero ? "active" : ""}
              type="button"
              onClick={() => onShowHero(index)}
              aria-label={`Show ${item.title}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
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
  const previewProducts = products.filter((product) => product.featured).slice(0, 6);
  const rentalPreview = products.filter((product) => product.collection === "Rentals").slice(13, 16);

  return (
    <>
      <section className="collection-lanes" aria-label="Sequin collections">
        <button className="lane lane-rental" type="button" onClick={() => onNavigate("rentals")}>
          <img src="/products/dolce-flutter-overlay.jpg" alt="" />
          <span>Event Linen Rentals</span>
          <strong>Explore Rentals</strong>
        </button>
        <button className="lane lane-home" type="button" onClick={() => onNavigate("shop")}>
          <img src="/products/lisbon-ribbed-white.jpg" alt="" />
          <span>Home Table Linen</span>
          <strong>Shop Now</strong>
        </button>
        <button className="lane lane-detail" type="button" onClick={() => onNavigate("shop")}>
          <img src="/products/bee-napkin-ring.png" alt="" />
          <span>Napkins & Rings</span>
          <strong>Finish the Table</strong>
        </button>
      </section>

      <section className="section-block">
        <div className="section-heading">
          <p className="mini-label">Current favorites</p>
          <h2>Textured pieces that make the table feel designed.</h2>
          <button type="button" className="text-button" onClick={() => onNavigate("shop")}>
            View full catalog
            <ArrowRight size={18} />
          </button>
        </div>
        <div className="product-grid compact-grid">
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
          <p className="mini-label">Rental styling</p>
          <h2>Layer lace, velvet, napkins, and rings into one finished table.</h2>
          <p>
            Sequin's rental catalog is built for hosts and planners who want a polished setting without
            owning every piece.
          </p>
          <button type="button" className="primary-button dark" onClick={() => onNavigate("rentals")}>
            Build a Rental Quote
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
          ["Choose", "Browse home linens, rentals, napkins, and finishing pieces by texture, color, or occasion."],
          ["Confirm", "Open a product on Shopify or request availability for event rentals."],
          ["Host", "Set a table with the right scale, fabric, and layered detail for the moment."],
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
          <p className="mini-label">{isRental ? "Party rentals" : "Shop"}</p>
          <h1>{isRental ? "Event Linen Rentals" : "Shop Home Linens"}</h1>
          <p>
            {isRental
              ? "Search event linens by texture, color, and category, then build an availability quote."
              : "Browse the Sequin home collection with real pricing, sizing, and direct product links."}
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
            placeholder="Search velvet, lace, napkins, white..."
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

      {products.length === 0 && (
        <section className="empty-state">
          <Search size={26} />
          <h2>No pieces found</h2>
          <p>Try a different texture, color, or category.</p>
        </section>
      )}
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

function AboutView({ onNavigate }: { onNavigate: (view: View) => void }) {
  return (
    <main className="about-page">
      <section className="about-hero">
        <img src="/brand/sequintable-og.jpg" alt="A Sequin Table linen tablescape" />
        <div>
          <p className="mini-label">About Sequin</p>
          <h1>Upscale linens for celebrations that feel considered.</h1>
          <p>
            Sequin Table Linen Rental and Home brings polished tablecloths, overlays, napkins, and
            finishing accessories to events and home gatherings.
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
          <button type="button" className="primary-button dark" onClick={() => onNavigate("shop")}>
            Explore the Collection
            <ArrowRight size={18} />
          </button>
        </div>
      </section>

      <section className="about-values">
        <div>
          <Sparkles size={22} />
          <h2>Texture First</h2>
          <p>Ribbed velvets, eyelets, lace overlays, boucle, quilted cloths, and embroidered toppers.</p>
        </div>
        <div>
          <ShoppingBag size={22} />
          <h2>Rental and Home</h2>
          <p>Event pieces for planners and hosts, plus home linens with sizing and pricing.</p>
        </div>
        <div>
          <Heart size={22} />
          <h2>Warm Luxury</h2>
          <p>Champagne gold, soft whites, sage, taupe, blush, espresso, and elevated details.</p>
        </div>
      </section>
    </main>
  );
}

function ProductModal({
  product,
  saved,
  onClose,
  onAdd,
  onToggleSaved,
}: {
  product: Product | null;
  saved: string[];
  onClose: () => void;
  onAdd: (product: Product) => void;
  onToggleSaved: (productId: string) => void;
}) {
  if (!product) return null;
  const isSaved = saved.includes(product.id);

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="product-title">
      <article className="product-modal">
        <button className="close-button" type="button" onClick={onClose} aria-label="Close product">
          <X size={22} />
        </button>
        <div className="modal-image">
          <img src={product.image} alt={product.title} />
        </div>
        <div className="modal-copy">
          <span className="mini-label">{product.collection} / {product.category}</span>
          <h2 id="product-title">{product.title}</h2>
          <p>{product.description}</p>
          <strong>{formatPrice(product)}</strong>
          <div className="variant-row">
            {product.variants.slice(0, 8).map((variant) => (
              <span key={variant}>{variant}</span>
            ))}
          </div>
          <div className="tag-row">
            {product.tags.slice(0, 6).map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
          <div className="modal-actions">
            <button type="button" className="primary-button dark" onClick={() => onAdd(product)}>
              {product.price > 0 ? "Add to Bag" : "Add to Quote"}
              <ShoppingBag size={18} />
            </button>
            <a className="ghost-link" href={productUrl(product)} target="_blank" rel="noreferrer">
              Open on Shopify
              <ArrowRight size={18} />
            </a>
            <button className={isSaved ? "save-inline saved" : "save-inline"} type="button" onClick={() => onToggleSaved(product.id)}>
              <Heart size={18} fill={isSaved ? "currentColor" : "none"} />
              Save
            </button>
          </div>
        </div>
      </article>
    </div>
  );
}

function QuoteDrawer({
  open,
  cart,
  onClose,
  onUpdateQty,
}: {
  open: boolean;
  cart: CartItem[];
  onClose: () => void;
  onUpdateQty: (productId: string, delta: number) => void;
}) {
  const total = cart.reduce((sum, item) => sum + item.product.price * item.qty, 0);
  const inquiryCount = cart.filter((item) => item.product.price === 0).length;
  const quoteText = encodeURIComponent(
    `Hi Sequin Table, I would like help with these pieces:\n\n${cart
      .map((item) => `${item.qty} x ${item.product.title} (${item.product.collection})`)
      .join("\n")}`,
  );
  const mailTo = `mailto:${contactEmail}?subject=Sequin Table availability request&body=${quoteText}`;
  const whatsapp = `https://wa.me/${whatsappNumber}?text=${quoteText}`;

  return (
    <aside className={open ? "quote-drawer open" : "quote-drawer"} aria-hidden={!open} data-testid="quote-drawer">
      <div className="drawer-header">
        <div>
          <span className="mini-label">Sequin Table</span>
          <h2>Bag & Quote</h2>
        </div>
        <button type="button" onClick={onClose} aria-label="Close bag">
          <X size={22} />
        </button>
      </div>

      <div className="drawer-items">
        {cart.length === 0 && (
          <div className="drawer-empty">
            <ShoppingBag size={28} />
            <p>Your bag is ready for the table.</p>
          </div>
        )}

        {cart.map((item) => (
          <div className="drawer-item" key={item.product.id}>
            <img src={item.product.image} alt="" />
            <div>
              <strong>{item.product.title}</strong>
              <span>{formatPrice(item.product)}</span>
              <div className="qty-row">
                <button type="button" onClick={() => onUpdateQty(item.product.id, -1)} aria-label="Decrease quantity">
                  <Minus size={14} />
                </button>
                <span>{item.qty}</span>
                <button type="button" onClick={() => onUpdateQty(item.product.id, 1)} aria-label="Increase quantity">
                  <Plus size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="drawer-footer">
        <div>
          <span>Estimated product total</span>
          <strong>{total > 0 ? `$${total.toFixed(2)}` : "Quote needed"}</strong>
        </div>
        {inquiryCount > 0 && <p>{inquiryCount} rental or accessory items need availability confirmation.</p>}
        <a className="primary-button dark" href={mailTo}>
          Email Request
          <Mail size={18} />
        </a>
        <a className="ghost-link" href={whatsapp} target="_blank" rel="noreferrer">
          WhatsApp Sequin
          <ArrowRight size={18} />
        </a>
      </div>
    </aside>
  );
}

export default App;
