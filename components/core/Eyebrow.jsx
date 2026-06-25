import React from "react";

/** Tracked all-caps eyebrow / kicker label above headings. */
export function Eyebrow({ as = "div", className = "", children, ...rest }) {
  const Tag = as;
  return (
    <Tag
      className={className}
      style={{
        fontFamily: "var(--font-ui)",
        fontSize: "var(--text-xs)",
        fontWeight: 500,
        letterSpacing: "0.3em",
        textTransform: "uppercase",
        color: "var(--accent-text)",
        display: "inline-flex",
        alignItems: "center",
        gap: "0.7em",
        ...(rest.style || {}),
      }}
      {...rest}
    >
      <span aria-hidden="true" style={{ width: 22, height: 1, background: "currentColor", opacity: 0.6 }} />
      {children}
    </Tag>
  );
}
