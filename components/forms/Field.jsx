import React from "react";

/** Form field wrapper: label, helper/error text around any control. */
export function Field({ label, hint, error, htmlFor, required = false, className = "", children, ...rest }) {
  return (
    <div className={className} style={{ display: "flex", flexDirection: "column", gap: 7, ...(rest.style || {}) }}>
      {label && (
        <label htmlFor={htmlFor} style={{
          fontFamily: "var(--font-ui)", fontSize: 11, fontWeight: 600, letterSpacing: ".14em",
          textTransform: "uppercase", color: "var(--text-soft)",
        }}>
          {label}{required && <span style={{ color: "var(--feature)" }}> *</span>}
        </label>
      )}
      {children}
      {(error || hint) && (
        <span style={{
          fontSize: 12, lineHeight: 1.45,
          color: error ? "var(--danger)" : "var(--text-muted)",
          fontFamily: "var(--font-ui)",
        }}>
          {error || hint}
        </span>
      )}
    </div>
  );
}
