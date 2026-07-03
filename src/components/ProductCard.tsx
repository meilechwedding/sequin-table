import { Link } from "react-router-dom";
import { Eye, Heart } from "lucide-react";
import { formatPrice, type Product } from "../data/products";
import { useStore } from "../lib/store";

export default function ProductCard({ product }: { product: Product }) {
  const { saved, toggleSaved } = useStore();
  const isSaved = saved.includes(product.id);
  const isRental = product.price === 0;

  return (
    <article className="product-card">
      <div className="pc-frame">
        <Link to={`/product/${product.handle}`} aria-label={`View ${product.title}`}>
          <img src={product.image} alt={product.title} loading="lazy" width={640} height={800} />
        </Link>
        <div className="pc-badges">
          {product.featured && <span className="tag tag-gold">Signature</span>}
          {isRental && <span className="tag tag-noir">Rental</span>}
        </div>
        <button
          className={`pc-save${isSaved ? " is-saved" : ""}`}
          aria-label={isSaved ? `Remove ${product.title} from saved` : `Save ${product.title}`}
          aria-pressed={isSaved}
          onClick={() => toggleSaved(product.id)}
        >
          <Heart size={18} strokeWidth={1.7} fill={isSaved ? "currentColor" : "none"} />
        </button>
        <Link to={`/product/${product.handle}`} className="pc-view" tabIndex={-1}>
          <Eye size={16} strokeWidth={1.7} />
          View Piece
        </Link>
      </div>
      <div className="pc-meta">
        <span className="pc-cat">{product.category}</span>
        <h3 className="pc-title">
          <Link to={`/product/${product.handle}`}>{product.title}</Link>
        </h3>
        <span className="pc-price tnum">
          {isRental ? <span className="quote">Rental · by quote</span> : `From ${formatPrice(product.price)}`}
        </span>
      </div>
    </article>
  );
}
