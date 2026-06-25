import React from "react";

const STYLE_ID = "sq-input-styles";
function useStyles() {
  React.useEffect(() => {
    if (document.getElementById(STYLE_ID)) return;
    const el = document.createElement("style");
    el.id = STYLE_ID;
    el.textContent = `
.sq-input{ display:flex; align-items:center; gap:.6em; width:100%; background:var(--surface);
  border:1px solid var(--border); border-radius:var(--radius-diag-field);
  box-shadow:var(--inset-press); padding:0 14px;
  transition:border-color var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out); }
.sq-input:focus-within{ border-color:var(--border-gold); box-shadow:var(--inset-press), 0 0 0 3px var(--ring); }
.sq-input--invalid{ border-color:var(--danger); }
.sq-input__icon{ color:var(--text-faint); display:inline-flex; }
.sq-input__icon svg{ width:18px; height:18px; stroke-width:1.6; }
.sq-input input{ flex:1; border:0; outline:0; background:transparent; font-family:var(--font-ui);
  font-size:14px; color:var(--text); padding:12px 0; min-width:0; }
.sq-input input::placeholder{ color:var(--text-faint); }
.sq-input--lg input{ padding:15px 0; font-size:15px; }
`;
    document.head.appendChild(el);
  }, []);
}

/** Text input with linen inset, gold focus ring, optional leading icon & trailing slot. */
export function Input({ icon = null, trailing = null, invalid = false, size = "md", className = "", ...rest }) {
  useStyles();
  const cls = ["sq-input", invalid ? "sq-input--invalid" : "", size === "lg" ? "sq-input--lg" : "", className]
    .filter(Boolean).join(" ");
  return (
    <div className={cls}>
      {icon && <span className="sq-input__icon">{icon}</span>}
      <input {...rest} />
      {trailing}
    </div>
  );
}
