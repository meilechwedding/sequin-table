import React from "react";

const STYLE_ID = "sq-iconbutton-styles";
function useStyles() {
  React.useEffect(() => {
    if (document.getElementById(STYLE_ID)) return;
    const el = document.createElement("style");
    el.id = STYLE_ID;
    el.textContent = `
.sq-iconbtn{ --_sz:42px; display:inline-flex; align-items:center; justify-content:center;
  width:var(--_sz); height:var(--_sz); border-radius:var(--radius-pill); cursor:pointer;
  border:1px solid var(--border); background:var(--surface); color:var(--text-soft);
  box-shadow:var(--shadow-1), var(--inset-top);
  transition:transform var(--dur-fast) var(--ease-out), box-shadow var(--dur-base) var(--ease-out),
    color var(--dur-base) var(--ease-out), border-color var(--dur-base) var(--ease-out); }
.sq-iconbtn:hover{ color:var(--accent-text); border-color:var(--border-gold); box-shadow:var(--shadow-2), var(--inset-top); transform:translateY(-1px); }
.sq-iconbtn:active{ transform:scale(.94); box-shadow:var(--inset-press); }
.sq-iconbtn:focus-visible{ outline:none; box-shadow:0 0 0 3px var(--ring); }
.sq-iconbtn[disabled]{ opacity:.4; pointer-events:none; }
.sq-iconbtn--sm{ --_sz:34px; }
.sq-iconbtn--lg{ --_sz:52px; }
.sq-iconbtn--gold{ background:var(--foil-gold); color:var(--espresso-900); border-color:transparent; box-shadow:var(--bevel-gold), var(--shadow-2); }
.sq-iconbtn--gold:hover{ box-shadow:var(--bevel-gold), var(--glow-gold); }
.sq-iconbtn--bare{ background:transparent; border-color:transparent; box-shadow:none; }
.sq-iconbtn--bare:hover{ background:var(--accent-soft); box-shadow:none; }
.sq-iconbtn svg{ width:50%; height:50%; }
`;
    document.head.appendChild(el);
  }, []);
}

/** Circular icon-only button (cart, search, favourite, nav). */
export function IconButton({ variant = "default", size = "md", className = "", children, label, ...rest }) {
  useStyles();
  const cls = ["sq-iconbtn", variant !== "default" ? `sq-iconbtn--${variant}` : "",
    size !== "md" ? `sq-iconbtn--${size}` : "", className].filter(Boolean).join(" ");
  return <button className={cls} aria-label={label} {...rest}>{children}</button>;
}
