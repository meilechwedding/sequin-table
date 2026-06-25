import React from "react";

const STYLE_ID = "sq-badge-styles";
function useStyles() {
  React.useEffect(() => {
    if (document.getElementById(STYLE_ID)) return;
    const el = document.createElement("style");
    el.id = STYLE_ID;
    el.textContent = `
.sq-badge{ display:inline-flex; align-items:center; gap:.4em; font-family:var(--font-ui);
  font-size:10.5px; font-weight:600; letter-spacing:.16em; text-transform:uppercase;
  padding:5px 11px; border-radius:var(--radius-diag-chip); line-height:1; white-space:nowrap; }
.sq-badge--gold{ background:var(--foil-gold); color:var(--espresso-900); box-shadow:var(--bevel-gold); }
.sq-badge--feature{ background:var(--feature-soft); color:var(--feature); }
.sq-badge--neutral{ background:var(--surface-sunk); color:var(--text-muted); border:1px solid var(--hairline); }
.sq-badge--outline{ background:transparent; color:var(--accent-text); border:1px solid var(--border-gold); }
.sq-badge--sage{ background:color-mix(in oklab, var(--sage-400) 26%, transparent); color:var(--sage-600); }
`;
    document.head.appendChild(el);
  }, []);
}

/** Small status / label badge — "New", "Rental", "Sold out", counts. */
export function Badge({ variant = "gold", className = "", children, ...rest }) {
  useStyles();
  const cls = ["sq-badge", `sq-badge--${variant}`, className].filter(Boolean).join(" ");
  return <span className={cls} {...rest}>{children}</span>;
}
