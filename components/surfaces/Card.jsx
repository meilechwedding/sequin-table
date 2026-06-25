import React from "react";

const STYLE_ID = "sq-card-styles";
function useStyles() {
  React.useEffect(() => {
    if (document.getElementById(STYLE_ID)) return;
    const el = document.createElement("style");
    el.id = STYLE_ID;
    el.textContent = `
.sq-card{ position:relative; background:var(--surface); border:1px solid var(--border);
  border-radius:var(--radius-card); box-shadow:var(--shadow-2), var(--inset-top);
  transition:transform var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out),
    border-color var(--dur-base) var(--ease-out); }
.sq-card--pad{ padding:var(--space-6); }
.sq-card--interactive{ cursor:pointer; }
.sq-card--interactive:hover{ transform:translateY(-4px); box-shadow:var(--shadow-4), var(--inset-top); border-color:var(--border-gold); }
.sq-card--glass{ background:var(--glass-bg); -webkit-backdrop-filter:var(--glass-blur);
  backdrop-filter:var(--glass-blur); border-color:var(--glass-border); box-shadow:var(--shadow-3), var(--inset-top); }
[data-theme="noir"] .sq-card--glass{ background:var(--glass-bg-dark); border-color:var(--glass-border-dk); box-shadow:var(--shadow-4), var(--inset-top-dark); }
.sq-card--feature{ background:var(--grad-bordeaux); border-color:transparent; color:var(--text-on-dark); box-shadow:var(--shadow-3), var(--inset-top-dark); }
`;
    document.head.appendChild(el);
  }, []);
}

/** Versatile surface container with warm elevation. */
export function Card({ variant = "default", padded = true, interactive = false, className = "", children, ...rest }) {
  useStyles();
  const cls = [
    "sq-card",
    variant !== "default" ? `sq-card--${variant}` : "",
    padded ? "sq-card--pad" : "",
    interactive ? "sq-card--interactive" : "",
    className,
  ].filter(Boolean).join(" ");
  return <div className={cls} {...rest}>{children}</div>;
}
