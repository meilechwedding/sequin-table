import { Link } from "react-router-dom";
import { CalendarDays, ShoppingBag } from "lucide-react";
import { formatPrice, type Product } from "../data/products";
import { useTilt } from "../lib/hooks";
import { useStore } from "../lib/store";

/**
 * A textile swatch: consistent 4:5 crop up top, a structured
 * "ticket" below — category + color dot, name, price/quote —
 * and exactly one CTA. Tilts gently toward the pointer.
 */
export default function ProductCard({ product }: { product: Product }) {
  const { addToCart, setDrawerOpen } = useStore();
  const tilt = useTilt();
  const isRental = product.price === 0;
  const singleSize = !isRental && product.variants.length <= 1;

  const quickAdd = () => {
    addToCart(product);
    setDrawerOpen(true);
  };

  return (
    <article className="product-card" {...tilt}>
      <div className="pc-frame">
        <Link to={`/product/${product.handle}`} aria-label={`View ${product.title}`}>
          <img src={product.image} alt={product.title} loading="lazy" width={640} height={800} />
        </Link>
        <div className="pc-badges">
          {product.featured && <span className="tag tag-gold">Signature</span>}
          {isRental && <span className="tag tag-noir">Rental</span>}
        </div>
      </div>
      <div className="pc-body">
        <div className="pc-top">
          <span className="pc-cat">
            <span className="pc-dot" style={{ background: product.palette }} aria-hidden />
            {product.category}
          </span>
          <h3 className="pc-title">
            <Link to={`/product/${product.handle}`}>{product.title}</Link>
          </h3>
          <span className="pc-price tnum">
            {isRental ? (
              <span className="quote">By quote · for your date</span>
            ) : (
              `From ${formatPrice(product.price)}`
            )}
          </span>
        </div>
        {isRental ? (
          <Link to={`/product/${product.handle}`} className="pc-cta">
            <CalendarDays size={15} strokeWidth={1.8} />
            Add to Quote
          </Link>
        ) : singleSize ? (
          <button type="button" className="pc-cta" onClick={quickAdd}>
            <ShoppingBag size={15} strokeWidth={1.8} />
            Add to Cart
          </button>
        ) : (
          <Link to={`/product/${product.handle}`} className="pc-cta">
            View Sizes
          </Link>
        )}
      </div>
    </article>
  );
}
