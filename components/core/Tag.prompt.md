Pill chip for collection categories and filters. Static by default; pass `onClick` to make it a selectable filter (toggles `active`).

```jsx
<Tag>Linens</Tag>
<Tag active onClick={() => setF('rental')}>Rentals</Tag>
<Tag onClick={() => setF('home')}>Home</Tag>
```

Selected state fills with espresso. Use for filter rows above a collection grid.
