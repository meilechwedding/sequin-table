import { Link } from "react-router-dom";
import { useDocTitle } from "../lib/hooks";

export default function NotFound() {
  useDocTitle("Page Not Found");
  return (
    <main className="wrap notfound">
      <div style={{ display: "grid", gap: 18, justifyItems: "center" }}>
        <span className="eyebrow eyebrow-center">404</span>
        <h1 className="display-lg" style={{ maxWidth: "18ch", textWrap: "balance" }}>
          This table hasn't been set.
        </h1>
        <p className="lede" style={{ textAlign: "center" }}>
          The page you're looking for isn't on the seating chart — but the collection is right this
          way.
        </p>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
          <Link to="/rentals" className="btn btn-gold btn-sm">Explore Rentals</Link>
          <Link to="/shop" className="btn btn-ghost btn-sm">Shop Home Linen</Link>
        </div>
      </div>
    </main>
  );
}
