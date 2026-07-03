import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { Heart, Menu, Search, ShoppingBag, X } from "lucide-react";
import { useScrolled } from "../lib/hooks";
import { useStore } from "../lib/store";

const leftNav = [
  { to: "/rentals", label: "Party Rentals" },
  { to: "/shop", label: "Home Linen" },
];
const rightNav = [
  { to: "/story", label: "Our Story" },
  { to: "/gallery", label: "Gallery" },
  { to: "/contact", label: "Contact" },
];

export default function Header() {
  const { cart, saved, setDrawerOpen } = useStore();
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

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    setSearchOpen(false);
    setQuery("");
    navigate(q ? `/shop?q=${encodeURIComponent(q)}` : "/shop");
  };

  const allNav = [...leftNav, ...rightNav];

  return (
    <>
      <div className="announce">Brooklyn Linen House · White-Glove Service Across NY &amp; NJ</div>
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
              onClick={() => setSearchOpen((open) => !open)}
            >
              <Search size={19} strokeWidth={1.6} />
            </button>
            <Link to="/shop?saved=1" className="icon-btn" aria-label={`Saved pieces (${saved.length})`}>
              <Heart size={19} strokeWidth={1.6} />
              {saved.length > 0 && <span className="count">{saved.length}</span>}
            </Link>
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
            {allNav.map((item, i) => (
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
            Brooklyn linen house — bringing sophistication and style to every celebration.
          </p>
        </div>
      )}
    </>
  );
}
