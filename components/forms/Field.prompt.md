Labelled wrapper around any control — uppercase label, optional hint, and error state.

```jsx
<Field label="Email" htmlFor="em" hint="We'll send occasional table inspiration.">
  <Input id="em" type="email" placeholder="you@email.com" />
</Field>

<Field label="Event date" required error="Please choose a date">
  <Input type="date" invalid />
</Field>
```
