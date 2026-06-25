The merchandising card for linens — image with hover zoom, top-left flags, a favourite heart, and the signature cursor-tracked 3D tilt. Requires Lucide for the heart icon (`lucide.createIcons()` after render).

```jsx
<ProductCard
  image="/assets/img/willow.jpg"
  category="Home Linen"
  name="Willow Runner"
  price="$48"
  flag={<Badge>New</Badge>}
  onFavourite={() => toggle(id)}
/>
// Rental pricing:
<ProductCard image={…} category="Rental" name="Bordeaux Velvet" price="from $120" unit="/ day" flag={<Badge variant="feature">Rental</Badge>} />
```

Set `tilt={false}` inside dense grids if motion is too busy. Place in a CSS grid with `gap: var(--space-5)`.
