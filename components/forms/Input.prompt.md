Text input with the brand's "pressed into linen" inset and a gold focus ring. Supports a leading icon and a trailing slot (e.g. a subscribe button or unit).

```jsx
<Input placeholder="Search linens" icon={<i data-lucide="search" />} />
<Input type="email" placeholder="Email address" size="lg"
  trailing={<Button size="sm">Subscribe</Button>} />
<Input invalid value={v} onChange={…} />
```

Wrap with `<Field>` for a label, hint, or error message.
