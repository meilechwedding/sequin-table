import React from "react";

/* Inject component CSS once (hover/press states inline styles can't express). */
const STYLE_ID = "sq-button-styles";
function useButtonStyles() {
  React.useEffect(() => {
    if (document.getElementById(STYLE_ID)) return;
    const el = document.createElement("style");
    el.id = STYLE_ID;
    el.textContent = `
.sq-btn{
  --_pad-y:12px; --_pad-x:24px; --_fs:13px;
  display:inline-flex; align-items:center; justify-content:center; gap:.6em;
  font-family:var(--font-ui); font-weight:600; font-size:var(--_fs);
  letter-spacing:.14em; text-transform:uppercase; line-height:1;
  padding:var(--_pad-y) var(--_pad-x); border-radius:var(--radius-diag-btn);
  border:1px solid transparent; cursor:pointer; text-decoration:none;
  transition:transform var(--dur-fast) var(--ease-out),
    box-shadow var(--dur-base) var(--ease-out), background var(--dur-base) var(--ease-out),
    color var(--dur-base) var(--ease-out), border-color var(--dur-base) var(--ease-out);
  -webkit-tap-highlight-color:transparent; user-select:none; white-space:nowrap;
}
.sq-btn:focus-visible{ outline:none; box-shadow:0 0 0 3px var(--ring); }
.sq-btn:active{ transform:scale(.975); }
.sq-btn[disabled]{ opacity:.45; pointer-events:none; }
.sq-btn--sm{ --_pad-y:9px; --_pad-x:18px; --_fs:11px; }
.sq-btn--lg{ --_pad-y:16px; --_pad-x:34px; --_fs:14px; }

/* Primary — champagne foil */
.sq-btn--primary{ background:var(--foil-gold); color:var(--espresso-900);
  box-shadow:var(--bevel-gold), var(--shadow-2); background-size:180% auto; }
.sq-btn--primary:hover{ box-shadow:var(--bevel-gold), var(--glow-gold); background-position:right center; transform:translateY(-1px); }
.sq-btn--primary:active{ box-shadow:var(--inset-press); transform:scale(.975); }

/* Solid — espresso / bordeaux */
.sq-btn--solid{ background:var(--surface-inverse); color:var(--text-on-dark);
  box-shadow:var(--shadow-2), var(--inset-top-dark); }
.sq-btn--solid:hover{ box-shadow:var(--shadow-3), var(--inset-top-dark); transform:translateY(-1px); }
.sq-btn--feature{ background:var(--grad-bordeaux); color:#fff; box-shadow:var(--shadow-2), var(--inset-top-dark); }
.sq-btn--feature:hover{ box-shadow:var(--glow-bordeaux); transform:translateY(-1px); }

/* Outline — gold hairline */
.sq-btn--outline{ background:transparent; color:var(--accent-text);
  border-color:var(--border-gold); }
.sq-btn--outline:hover{ background:var(--accent-soft); border-color:var(--accent); }

/* Ghost */
.sq-btn--ghost{ background:transparent; color:var(--text-soft); letter-spacing:.1em; }
.sq-btn--ghost:hover{ background:color-mix(in oklab, var(--text) 7%, transparent); color:var(--text); }
`;
    document.head.appendChild(el);
  }, []);
}

/**
 * Sequin primary button. Variants: primary (champagne foil), solid (espresso),
 * feature (bordeaux), outline, ghost. Sizes: sm | md | lg.
 */
export function Button({
  variant = "primary",
  size = "md",
  as = "button",
  iconLeft = null,
  iconRight = null,
  className = "",
  children,
  ...rest
}) {
  useButtonStyles();
  const Tag = as;
  const cls = [
    "sq-btn",
    `sq-btn--${variant}`,
    size !== "md" ? `sq-btn--${size}` : "",
    className,
  ].filter(Boolean).join(" ");
  return (
    <Tag className={cls} {...rest}>
      {iconLeft}
      {children}
      {iconRight}
    </Tag>
  );
}
