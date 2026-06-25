import React from "react";

const STYLE_ID = "sq-tag-styles";
function useStyles() {
  React.useEffect(() => {
    if (document.getElementById(STYLE_ID)) return;
    const el = document.createElement("style");
    el.id = STYLE_ID;
    el.textContent = `
.sq-tag{ display:inline-flex; align-items:center; gap:.5em; font-family:var(--font-ui);
  font-size:12px; font-weight:500; letter-spacing:.1em; text-transform:uppercase;
  padding:7px 15px; border-radius:var(--radius-diag-chip); cursor:pointer;
  color:var(--text-soft); background:var(--surface); border:1px solid var(--border);
  box-shadow:var(--shadow-1);
  transition:all var(--dur-base) var(--ease-out); }
.sq-tag:hover{ border-color:var(--border-gold); color:var(--accent-text); transform:translateY(-1px); }
.sq-tag[aria-pressed="true"]{ background:var(--surface-inverse); color:var(--text-on-dark); border-color:transparent; box-shadow:var(--shadow-2); }
.sq-tag--static{ cursor:default; }
.sq-tag--static:hover{ transform:none; border-color:var(--border); color:var(--text-soft); }
`;
    document.head.appendChild(el);
  }, []);
}

/** Pill chip for categories / filters. Selectable when `onClick` is given. */
export function Tag({ active = false, className = "", children, onClick, ...rest }) {
  useStyles();
  const interactive = typeof onClick === "function";
  const cls = ["sq-tag", interactive ? "" : "sq-tag--static", className].filter(Boolean).join(" ");
  return (
    <button className={cls} aria-pressed={interactive ? active : undefined} onClick={onClick} {...rest}>
      {children}
    </button>
  );
}
