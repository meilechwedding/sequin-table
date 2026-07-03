import { useEffect, useMemo, useRef, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { Menu, Search, ShoppingBag, X } from "lucide-react";
import { useScrolled } from "../lib/hooks";
import { useStore } from "../lib/store";
import { formatPrice, products } from "../data/products";

const leftNav = [
  { to: "/rentals", label: "Rentals" },
  { to: "/shop", label: "Shop" },
];
const rightNav = [
  { to: "/gallery", label: "Gallery" },
  { to: "/contact", label: "Contact" },
];
const menuNav = [...leftNav, ...rightNav, { to: "/story", label: "Our Story" }];

export default function Header() {
  const { cart, setDrawerOpen } = useStore();
  const location = useLocation();
  const navigate = useNavigate();
  const scrolled = useScrolled(40);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const searchRef = useRef<HTMLInputElement | null>(null);

  const onHome = location.pathname === "/";
  const overNoir = onHome && !scrolled;
  const cartCount = cart.reduce((sum, line) => sum + line.qty, 0);

  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (searchOpen) searchRef.current?.focus();
  }, [searchOpen]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const suggestions = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q.length < 2) return [];
    return products
      .filter((p) => `${p.title} ${p.category} ${p.tags.join(" ")}`.toLowerCase().includes(q))
      .slice(0, 5);
  }, [query]);

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    setSearchOpen(false);
    setQuery("");
    navigate(q ? `/shop?q=${encodeURIComponent(q)}` : "/shop");
  };

  const goToSuggestion = (handle: string) => {
    setSearchOpen(false);
    setQuery("");
    navigate(`/product/${handle}`);
  };

  return (
    <>
      <header
        className={`site-header ${overNoir ? "header-dark" : "header-solid"}`}
        style={{ position: "sticky" }}
      >
        <div className="wrap-wide" style={{ position: "relative" }}>
          <nav className="nav-links" aria-label="Primary">
            <button
              className="icon-btn menu-btn"
              aria-label="Open menu"
              onClick={() => setMenuOpen(true)}
            >
              <Menu size={20} strokeWidth={1.6} />
            </button>
            {leftNav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) => `nav-link${isActive ? " is-active" : ""}`}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <Link to="/" className="brand-mark" aria-label="Sequin Table — home">
            <span className="brand-name">SEQUIN</span>
            <span className="brand-sub">Table Linen</span>
          </Link>

          <div className="header-utils">
            <nav className="nav-links nav-end" aria-label="Secondary" style={{ marginRight: 8 }}>
              {rightNav.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) => `nav-link${isActive ? " is-active" : ""}`}
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>
            <button
              className="icon-btn"
              aria-label="Search the collection"
              aria-expanded={searchOpen}
              onClick={() => setSearchOpen((open) => !open)}
            >
              <Search size={19} strokeWidth={1.6} />
            </button>
            <button
              className="icon-btn"
              aria-label={`Open cart (${cartCount} items)`}
              onClick={() => setDrawerOpen(true)}
            >
              <ShoppingBag size={19} strokeWidth={1.6} />
              {cartCount > 0 && <span className="count">{cartCount}</span>}
            </button>
          </div>

          {searchOpen && (
            <form className="search-pop" onSubmit={submitSearch}>
              <div className="search-row">
                <input
                  ref={searchRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search linens — velvet, lace, quilted…"
                  aria-label="Search the collection"
                />
                <button type="submit" className="btn btn-dark btn-sm">
                  Search
                </button>
              </div>
              {suggestions.length > 0 && (
                <div className="search-suggest" role="listbox" aria-label="Suggestions">
                  {suggestions.map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      className="search-suggest-item"
                      onClick={() => goToSuggestion(p.handle)}
                    >
                      <img src={p.image} alt="" loading="lazy" />
                      <span style={{ display: "grid", gap: 2, minWidth: 0 }}>
                        <span className="ss-title">{p.title}</span>
                        <span className="ss-sub tnum">
                          {p.price > 0 ? `From ${formatPrice(p.price)}` : "Rental · by quote"}
                        </span>
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </form>
          )}
        </div>
      </header>

      {menuOpen && (
        <div className="mobile-menu" role="dialog" aria-modal="true" aria-label="Menu">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span className="brand-mark">
              <span className="brand-name" style={{ fontSize: "1.2rem" }}>
                SEQUIN
              </span>
            </span>
            <button className="icon-btn" aria-label="Close menu" onClick={() => setMenuOpen(false)}>
              <X size={22} strokeWidth={1.6} />
            </button>
          </div>
          <nav className="mobile-menu-links" aria-label="Mobile">
            {menuNav.map((item, i) => (
              <Link
                key={item.to}
                to={item.to}
                className="mobile-menu-link"
                style={{ animationDelay: `${90 + i * 70}ms` }}
              >
                <span className="idx">0{i + 1}</span>
                {item.label}
              </Link>
            ))}
          </nav>
          <p style={{ color: "rgba(251,246,239,0.5)", fontSize: "0.85rem", fontWeight: 300 }}>
            Brooklyn linen house — white-glove service across New York &amp; New Jersey.
          </p>
        </div>
      )}
    </>
  );
}
