import * as React from "react";

/**
 * Linen/product card — image zoom, flags, favourite, cursor-tracked 3D tilt.
 * @startingPoint section="Commerce" subtitle="Product card with 3D tilt & image zoom" viewport="320x460"
 */
export interface ProductCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Image URL. */
  image: string;
  /** Product name (display face). */
  name: string;
  /** Category eyebrow, e.g. "Home Linen". */
  category?: string;
  /** Price string, e.g. "$48" or "from $120". */
  price: React.ReactNode;
  /** Unit suffix, e.g. "/ day" for rentals. */
  unit?: string;
  /** Flag node(s) shown top-left, e.g. <Badge>. */
  flag?: React.ReactNode;
  /** Enable cursor-tracked 3D tilt. @default true */
  tilt?: boolean;
  /** Show favourite heart + handler. */
  onFavourite?: () => void;
  favourited?: boolean;
}

/** Linen/product card — image zoom, flags, favourite, cursor-tracked 3D tilt. */
export function ProductCard(props: ProductCardProps): JSX.Element;
