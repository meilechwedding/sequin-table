import React from "react";

/**
 * Sequin brand mark — the stacked-diamond emblem + SEQUIN / TABLE LINEN wordmark.
 * `mark` = emblem only, `lockup` = emblem + wordmark, `wordmark` = wordmark only.
 * Inherits `color` (espresso on light, gold/cream on dark); pass `color` to override.
 */
export function Monogram({
  variant = "lockup",
  size = 32,
  tagline = true,
  color,
  className = "",
  ...rest
}) {
  const markH = size * 1.3;
  const markW = markH * (670 / 806);

  const mark = (
    <svg
      aria-hidden="true"
      width={markW}
      height={markH}
      viewBox="293 198 670 806"
      style={{ display: "block", flex: "none", overflow: "visible" }}
    >
      <g fill="currentColor" shapeRendering="geometricPrecision">
        <polygon points="628,198 534,295 628,393 722,296" />
        <polygon points="715,344 628,432 541,344 419,470 628,685 837,470" />
        <polygon points="293,660 628,1004 963,660 827,520 628,724 429,520" />
      </g>
    </svg>
  );

  const word = (
    <span style={{ display: "inline-flex", flexDirection: "column", lineHeight: 1 }}>
      <span
        style={{
          fontFamily: "var(--font-serif)",
          fontWeight: 500,
          fontSize: size * 1.12,
          letterSpacing: "0.02em",
          textTransform: "uppercase",
          color: "currentColor",
        }}
      >
        Sequin
      </span>
      {tagline && (
        <span
          style={{
            fontFamily: "var(--font-ui)",
            fontWeight: 500,
            fontSize: Math.max(7, size * 0.3),
            letterSpacing: "0.34em",
            textTransform: "uppercase",
            color: "currentColor",
            opacity: 0.92,
            textAlign: "center",
            marginTop: size * 0.16,
            paddingLeft: "0.34em",
          }}
        >
          Table Linen
        </span>
      )}
    </span>
  );

  return (
    <span
      className={className}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: size * 0.5,
        color: color || "var(--text)",
      }}
      {...rest}
    >
      {variant !== "wordmark" && mark}
      {variant !== "mark" && word}
    </span>
  );
}
