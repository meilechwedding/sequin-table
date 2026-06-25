import React from "react";

/** Thin divider rule. With an ornament, a centered ◆ / monogram flanked by gold hairlines. */
export function Divider({ ornament = false, label = null, className = "", style = {}, ...rest }) {
  if (!ornament && !label) {
    return (
      <hr
        className={className}
        style={{ border: 0, height: 1, background: "var(--border)", margin: "var(--space-6) 0", ...style }}
        {...rest}
      />
    );
  }
  const line = { flex: 1, height: 1, background: "linear-gradient(90deg, transparent, var(--border-gold))" };
  return (
    <div
      className={className}
      role="separator"
      style={{ display: "flex", alignItems: "center", gap: "var(--space-4)", margin: "var(--space-6) 0", ...style }}
      {...rest}
    >
      <span style={line} />
      <span style={{ fontFamily: "var(--font-serif)", color: "var(--accent-text)", fontSize: 18, letterSpacing: ".2em", textTransform: "uppercase", whiteSpace: "nowrap" }}>
        {label || "✦"}
      </span>
      <span style={{ ...line, background: "linear-gradient(90deg, var(--border-gold), transparent)" }} />
    </div>
  );
}
