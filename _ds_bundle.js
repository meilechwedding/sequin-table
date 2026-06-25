/* @ds-bundle: {"format":3,"namespace":"SequinDesignSystem_ec3cc5","components":[{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Divider","sourcePath":"components/core/Divider.jsx"},{"name":"Eyebrow","sourcePath":"components/core/Eyebrow.jsx"},{"name":"IconButton","sourcePath":"components/core/IconButton.jsx"},{"name":"Monogram","sourcePath":"components/core/Monogram.jsx"},{"name":"Tag","sourcePath":"components/core/Tag.jsx"},{"name":"Field","sourcePath":"components/forms/Field.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Card","sourcePath":"components/surfaces/Card.jsx"},{"name":"ProductCard","sourcePath":"components/surfaces/ProductCard.jsx"}],"sourceHashes":{"components/core/Badge.jsx":"680cabecf1f0","components/core/Button.jsx":"3a2e3da71ea5","components/core/Divider.jsx":"9fe4520452da","components/core/Eyebrow.jsx":"0518b655e539","components/core/IconButton.jsx":"1c8805bc3256","components/core/Monogram.jsx":"aabf6265c409","components/core/Tag.jsx":"d886a59c84b3","components/forms/Field.jsx":"5682eaf3d1b9","components/forms/Input.jsx":"c375a4f3b7fd","components/surfaces/Card.jsx":"c48d26577dc9","components/surfaces/ProductCard.jsx":"b2e617abceec","ui_kits/storefront/AboutStrip.jsx":"cd17fda8e925","ui_kits/storefront/CartDrawer.jsx":"e3c4322c7820","ui_kits/storefront/Catalog.jsx":"fd08c6e9150d","ui_kits/storefront/Collections.jsx":"3900eb0e8691","ui_kits/storefront/Footer.jsx":"193c027419c0","ui_kits/storefront/Header.jsx":"25adee4bf834","ui_kits/storefront/Hero.jsx":"4aa897216dd5","ui_kits/storefront/Process.jsx":"414fa8d5e68c","ui_kits/storefront/Testimonials.jsx":"224e0cd8cf74","ui_kits/storefront/tweaks-panel.jsx":"6591467622ed"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.SequinDesignSystem_ec3cc5 = window.SequinDesignSystem_ec3cc5 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
function Badge({
  variant = "gold",
  className = "",
  children,
  ...rest
}) {
  useStyles();
  const cls = ["sq-badge", `sq-badge--${variant}`, className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement("span", _extends({
    className: cls
  }, rest), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
function Button({
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
  const cls = ["sq-btn", `sq-btn--${variant}`, size !== "md" ? `sq-btn--${size}` : "", className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement(Tag, _extends({
    className: cls
  }, rest), iconLeft, children, iconRight);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Divider.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Thin divider rule. With an ornament, a centered ◆ / monogram flanked by gold hairlines. */
function Divider({
  ornament = false,
  label = null,
  className = "",
  style = {},
  ...rest
}) {
  if (!ornament && !label) {
    return /*#__PURE__*/React.createElement("hr", _extends({
      className: className,
      style: {
        border: 0,
        height: 1,
        background: "var(--border)",
        margin: "var(--space-6) 0",
        ...style
      }
    }, rest));
  }
  const line = {
    flex: 1,
    height: 1,
    background: "linear-gradient(90deg, transparent, var(--border-gold))"
  };
  return /*#__PURE__*/React.createElement("div", _extends({
    className: className,
    role: "separator",
    style: {
      display: "flex",
      alignItems: "center",
      gap: "var(--space-4)",
      margin: "var(--space-6) 0",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: line
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-serif)",
      color: "var(--accent-text)",
      fontSize: 18,
      letterSpacing: ".2em",
      textTransform: "uppercase",
      whiteSpace: "nowrap"
    }
  }, label || "✦"), /*#__PURE__*/React.createElement("span", {
    style: {
      ...line,
      background: "linear-gradient(90deg, var(--border-gold), transparent)"
    }
  }));
}
Object.assign(__ds_scope, { Divider });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Divider.jsx", error: String((e && e.message) || e) }); }

// components/core/Eyebrow.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Tracked all-caps eyebrow / kicker label above headings. */
function Eyebrow({
  as = "div",
  className = "",
  children,
  ...rest
}) {
  const Tag = as;
  return /*#__PURE__*/React.createElement(Tag, _extends({
    className: className,
    style: {
      fontFamily: "var(--font-ui)",
      fontSize: "var(--text-xs)",
      fontWeight: 500,
      letterSpacing: "0.3em",
      textTransform: "uppercase",
      color: "var(--accent-text)",
      display: "inline-flex",
      alignItems: "center",
      gap: "0.7em",
      ...(rest.style || {})
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      width: 22,
      height: 1,
      background: "currentColor",
      opacity: 0.6
    }
  }), children);
}
Object.assign(__ds_scope, { Eyebrow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Eyebrow.jsx", error: String((e && e.message) || e) }); }

// components/core/IconButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
function IconButton({
  variant = "default",
  size = "md",
  className = "",
  children,
  label,
  ...rest
}) {
  useStyles();
  const cls = ["sq-iconbtn", variant !== "default" ? `sq-iconbtn--${variant}` : "", size !== "md" ? `sq-iconbtn--${size}` : "", className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement("button", _extends({
    className: cls,
    "aria-label": label
  }, rest), children);
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/core/Monogram.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Sequin brand mark — the stacked-diamond emblem + SEQUIN / TABLE LINEN wordmark.
 * `mark` = emblem only, `lockup` = emblem + wordmark, `wordmark` = wordmark only.
 * Inherits `color` (espresso on light, gold/cream on dark); pass `color` to override.
 */
function Monogram({
  variant = "lockup",
  size = 32,
  tagline = true,
  color,
  className = "",
  ...rest
}) {
  const markH = size * 1.3;
  const markW = markH * (670 / 806);
  const mark = /*#__PURE__*/React.createElement("svg", {
    "aria-hidden": "true",
    width: markW,
    height: markH,
    viewBox: "293 198 670 806",
    style: {
      display: "block",
      flex: "none",
      overflow: "visible"
    }
  }, /*#__PURE__*/React.createElement("g", {
    fill: "currentColor",
    shapeRendering: "geometricPrecision"
  }, /*#__PURE__*/React.createElement("polygon", {
    points: "628,198 534,295 628,393 722,296"
  }), /*#__PURE__*/React.createElement("polygon", {
    points: "715,344 628,432 541,344 419,470 628,685 837,470"
  }), /*#__PURE__*/React.createElement("polygon", {
    points: "293,660 628,1004 963,660 827,520 628,724 429,520"
  })));
  const word = /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      flexDirection: "column",
      lineHeight: 1
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-serif)",
      fontWeight: 500,
      fontSize: size * 1.12,
      letterSpacing: "0.02em",
      textTransform: "uppercase",
      color: "currentColor"
    }
  }, "Sequin"), tagline && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-ui)",
      fontWeight: 500,
      fontSize: Math.max(7, size * 0.3),
      letterSpacing: "0.34em",
      textTransform: "uppercase",
      color: "currentColor",
      opacity: 0.92,
      textAlign: "center",
      marginTop: size * 0.16,
      paddingLeft: "0.34em"
    }
  }, "Table Linen"));
  return /*#__PURE__*/React.createElement("span", _extends({
    className: className,
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: size * 0.5,
      color: color || "var(--text)"
    }
  }, rest), variant !== "wordmark" && mark, variant !== "mark" && word);
}
Object.assign(__ds_scope, { Monogram });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Monogram.jsx", error: String((e && e.message) || e) }); }

// components/core/Tag.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
function Tag({
  active = false,
  className = "",
  children,
  onClick,
  ...rest
}) {
  useStyles();
  const interactive = typeof onClick === "function";
  const cls = ["sq-tag", interactive ? "" : "sq-tag--static", className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement("button", _extends({
    className: cls,
    "aria-pressed": interactive ? active : undefined,
    onClick: onClick
  }, rest), children);
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Tag.jsx", error: String((e && e.message) || e) }); }

// components/forms/Field.jsx
try { (() => {
/** Form field wrapper: label, helper/error text around any control. */
function Field({
  label,
  hint,
  error,
  htmlFor,
  required = false,
  className = "",
  children,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: className,
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 7,
      ...(rest.style || {})
    }
  }, label && /*#__PURE__*/React.createElement("label", {
    htmlFor: htmlFor,
    style: {
      fontFamily: "var(--font-ui)",
      fontSize: 11,
      fontWeight: 600,
      letterSpacing: ".14em",
      textTransform: "uppercase",
      color: "var(--text-soft)"
    }
  }, label, required && /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--feature)"
    }
  }, " *")), children, (error || hint) && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      lineHeight: 1.45,
      color: error ? "var(--danger)" : "var(--text-muted)",
      fontFamily: "var(--font-ui)"
    }
  }, error || hint));
}
Object.assign(__ds_scope, { Field });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Field.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
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
function Input({
  icon = null,
  trailing = null,
  invalid = false,
  size = "md",
  className = "",
  ...rest
}) {
  useStyles();
  const cls = ["sq-input", invalid ? "sq-input--invalid" : "", size === "lg" ? "sq-input--lg" : "", className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement("div", {
    className: cls
  }, icon && /*#__PURE__*/React.createElement("span", {
    className: "sq-input__icon"
  }, icon), /*#__PURE__*/React.createElement("input", rest), trailing);
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/surfaces/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
function Card({
  variant = "default",
  padded = true,
  interactive = false,
  className = "",
  children,
  ...rest
}) {
  useStyles();
  const cls = ["sq-card", variant !== "default" ? `sq-card--${variant}` : "", padded ? "sq-card--pad" : "", interactive ? "sq-card--interactive" : "", className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement("div", _extends({
    className: cls
  }, rest), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/surfaces/Card.jsx", error: String((e && e.message) || e) }); }

// components/surfaces/ProductCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const STYLE_ID = "sq-productcard-styles";
function useStyles() {
  React.useEffect(() => {
    if (document.getElementById(STYLE_ID)) return;
    const el = document.createElement("style");
    el.id = STYLE_ID;
    el.textContent = `
.sq-pcard{ position:relative; display:flex; flex-direction:column; background:var(--surface);
  border:1px solid var(--border); border-radius:var(--radius-card); overflow:hidden;
  box-shadow:var(--shadow-2), var(--inset-top); transform-style:preserve-3d;
  transition:transform var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out),
    border-color var(--dur-base) var(--ease-out); will-change:transform; }
.sq-pcard:hover{ box-shadow:var(--shadow-5); border-color:var(--border-gold); }
.sq-pcard__media{ position:relative; aspect-ratio:4/5; overflow:hidden; background:var(--surface-sunk); }
.sq-pcard__media img{ width:100%; height:100%; object-fit:cover; transition:transform var(--dur-slow) var(--ease-luxe); }
.sq-pcard:hover .sq-pcard__media img{ transform:scale(1.05); }
.sq-pcard__flags{ position:absolute; top:12px; left:12px; display:flex; gap:6px; z-index:2; }
.sq-pcard__fav{ position:absolute; top:10px; right:10px; z-index:2; }
.sq-pcard__body{ padding:16px 18px 18px; display:flex; flex-direction:column; gap:4px; }
.sq-pcard__cat{ font-size:10px; letter-spacing:.2em; text-transform:uppercase; color:var(--text-faint); }
.sq-pcard__name{ font-family:var(--font-serif); font-weight:500; font-size:21px; letter-spacing:.005em;
  color:var(--text); margin:0; }
.sq-pcard__foot{ display:flex; align-items:baseline; justify-content:space-between; margin-top:8px; }
.sq-pcard__price{ font-family:var(--font-ui); font-weight:600; font-size:15px; color:var(--text); }
.sq-pcard__price small{ font-weight:400; color:var(--text-muted); font-size:12px; }
.sq-pcard__unit{ font-size:11px; letter-spacing:.06em; color:var(--text-muted); }
`;
    document.head.appendChild(el);
  }, []);
}

/** Product/linen card with image zoom, flags, favourite, and 3D tilt toward the cursor. */
function ProductCard({
  image,
  name,
  category,
  price,
  unit = "",
  flag = null,
  tilt = true,
  onFavourite,
  favourited = false,
  onClick,
  className = "",
  ...rest
}) {
  useStyles();
  const ref = React.useRef(null);
  const onMove = e => {
    if (!tilt || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    ref.current.style.transform = `perspective(900px) rotateY(${px * 7}deg) rotateX(${-py * 7}deg) translateY(-5px)`;
  };
  const reset = () => {
    if (ref.current) ref.current.style.transform = "";
  };
  return /*#__PURE__*/React.createElement("div", _extends({
    ref: ref,
    className: ["sq-pcard", className].filter(Boolean).join(" "),
    onPointerMove: onMove,
    onPointerLeave: reset,
    onClick: onClick
  }, rest), /*#__PURE__*/React.createElement("div", {
    className: "sq-pcard__media"
  }, flag && /*#__PURE__*/React.createElement("div", {
    className: "sq-pcard__flags"
  }, flag), onFavourite && /*#__PURE__*/React.createElement("button", {
    className: "sq-pcard__fav sq-iconbtn sq-iconbtn--sm",
    "aria-label": "Favourite",
    onClick: e => {
      e.stopPropagation();
      onFavourite();
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "heart",
    style: {
      fill: favourited ? "var(--feature)" : "none",
      color: favourited ? "var(--feature)" : "currentColor"
    }
  })), /*#__PURE__*/React.createElement("img", {
    src: image,
    alt: name
  })), /*#__PURE__*/React.createElement("div", {
    className: "sq-pcard__body"
  }, category && /*#__PURE__*/React.createElement("span", {
    className: "sq-pcard__cat"
  }, category), /*#__PURE__*/React.createElement("h3", {
    className: "sq-pcard__name"
  }, name), /*#__PURE__*/React.createElement("div", {
    className: "sq-pcard__foot"
  }, /*#__PURE__*/React.createElement("span", {
    className: "sq-pcard__price"
  }, price), unit && /*#__PURE__*/React.createElement("span", {
    className: "sq-pcard__unit"
  }, unit))));
}
Object.assign(__ds_scope, { ProductCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/surfaces/ProductCard.jsx", error: String((e && e.message) || e) }); }

// ui_kits/storefront/AboutStrip.jsx
try { (() => {
/* Sequin storefront — §2 About Strip (Linen White, asymmetric) */

function AboutStrip() {
  const {
    useEffect,
    useRef
  } = React;
  const ref = useRef(null);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        [...e.target.querySelectorAll(".sq-rv")].forEach((el, i) => {
          el.style.transitionDelay = i * 90 + "ms";
          el.classList.add("sq-show");
        });
      });
    }, {
      threshold: 0.12
    });
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return /*#__PURE__*/React.createElement("section", {
    ref: ref,
    style: abtS.wrap
  }, /*#__PURE__*/React.createElement("div", {
    style: abtS.inner
  }, /*#__PURE__*/React.createElement("div", {
    style: abtS.text
  }, /*#__PURE__*/React.createElement("span", {
    className: "sq-rv",
    style: abtS.eyebrow
  }, "( About Sequin )"), /*#__PURE__*/React.createElement("h2", {
    className: "sq-rv",
    style: abtS.headline
  }, "Linens, made for the moments", /*#__PURE__*/React.createElement("br", null), "worth ", /*#__PURE__*/React.createElement("em", {
    style: {
      fontStyle: "italic"
    }
  }, "remembering"), "."), /*#__PURE__*/React.createElement("p", {
    className: "sq-rv",
    style: abtS.body
  }, "We are a Brooklyn-based linen house built on the belief that a beautiful table transforms any gathering. Every piece is sourced with intention and hand-finished in our studio \u2014 ready to dress your most important moments."), /*#__PURE__*/React.createElement("p", {
    className: "sq-rv",
    style: abtS.body
  }, "Rent for the event, or own for the table. Either way, Sequin linens arrive pressed, wrapped and ready."), /*#__PURE__*/React.createElement("a", {
    className: "sq-rv",
    href: "about.html",
    style: abtS.link
  }, "Read our story \u2192")), /*#__PURE__*/React.createElement("div", {
    className: "sq-rv",
    style: abtS.imgCol
  }, /*#__PURE__*/React.createElement("div", {
    style: abtS.imgFrame
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/img/willow.jpg",
    alt: "Linen cloth detail",
    style: abtS.img
  }), /*#__PURE__*/React.createElement("span", {
    style: abtS.index
  }, "( 01\u201403 )")))));
}
const abtS = {
  wrap: {
    background: "#F7F2EA",
    padding: "104px 44px"
  },
  inner: {
    maxWidth: 1240,
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "1.5fr 1fr",
    gap: 84,
    alignItems: "center"
  },
  text: {
    display: "flex",
    flexDirection: "column",
    gap: 24
  },
  eyebrow: {
    fontFamily: "var(--font-ui)",
    fontSize: 10,
    fontWeight: 500,
    letterSpacing: "0.4em",
    textTransform: "uppercase",
    color: "#BE9A6E",
    display: "block"
  },
  headline: {
    fontFamily: "'Audrey','Playfair Display','Cormorant Garamond',Georgia,serif",
    fontWeight: 500,
    fontSize: "clamp(32px,3.4vw,46px)",
    lineHeight: 1.1,
    letterSpacing: "-0.01em",
    color: "#221A12",
    margin: 0
  },
  body: {
    fontFamily: "var(--font-ui)",
    fontSize: 15,
    lineHeight: 1.78,
    color: "#6B4F3A",
    margin: 0,
    maxWidth: "52ch"
  },
  link: {
    display: "inline-block",
    fontFamily: "var(--font-ui)",
    fontSize: 12,
    fontWeight: 500,
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    color: "#221A12",
    textDecoration: "none",
    borderBottom: "1px solid #BE9A6E",
    paddingBottom: 3,
    marginTop: 4
  },
  imgCol: {},
  imgFrame: {
    position: "relative",
    borderRadius: "20px 0 20px 0",
    overflow: "hidden",
    aspectRatio: "4/5"
  },
  img: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block"
  },
  index: {
    position: "absolute",
    bottom: 18,
    right: 18,
    fontFamily: "var(--font-ui)",
    fontSize: 9.5,
    fontWeight: 500,
    letterSpacing: "0.32em",
    textTransform: "uppercase",
    color: "#BE9A6E",
    background: "rgba(247,242,234,.86)",
    backdropFilter: "blur(4px)",
    padding: "6px 13px",
    borderRadius: "6px 0 6px 0"
  }
};
window.SequinAboutStrip = AboutStrip;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/storefront/AboutStrip.jsx", error: String((e && e.message) || e) }); }

// ui_kits/storefront/CartDrawer.jsx
try { (() => {
/* Sequin storefront — slide-in cart drawer */
const {
  IconButton,
  Button,
  Divider
} = window.SequinDesignSystem_ec3cc5;
function CartDrawer({
  open,
  items,
  onClose,
  onQty,
  onRemove
}) {
  const list = Object.values(items);
  const subtotal = list.reduce((s, it) => s + it.qtyPrice * it.qty, 0);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      ...cartStyles.scrim,
      opacity: open ? 1 : 0,
      pointerEvents: open ? "auto" : "none"
    },
    onClick: onClose
  }), /*#__PURE__*/React.createElement("aside", {
    style: {
      ...cartStyles.drawer,
      transform: open ? "translateX(0)" : "translateX(105%)"
    },
    "data-theme": "noir"
  }, /*#__PURE__*/React.createElement("div", {
    style: cartStyles.head
  }, /*#__PURE__*/React.createElement("h3", {
    style: cartStyles.title
  }, "Your Cart ", /*#__PURE__*/React.createElement("span", {
    style: cartStyles.cnt
  }, list.reduce((s, i) => s + i.qty, 0))), /*#__PURE__*/React.createElement(IconButton, {
    variant: "bare",
    size: "sm",
    label: "Close",
    onClick: onClose
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "x"
  }))), /*#__PURE__*/React.createElement(Divider, {
    style: {
      margin: "0 0 4px"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: cartStyles.items
  }, list.length === 0 && /*#__PURE__*/React.createElement("div", {
    style: cartStyles.empty
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "shopping-bag",
    style: {
      width: 30,
      height: 30,
      opacity: .5
    }
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "12px 0 0",
      color: "var(--text-muted)",
      fontSize: 14
    }
  }, "Your cart is empty.")), list.map(it => /*#__PURE__*/React.createElement("div", {
    key: it.id,
    style: cartStyles.row
  }, /*#__PURE__*/React.createElement("img", {
    src: it.img,
    alt: it.name,
    style: cartStyles.thumb
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: cartStyles.cat
  }, it.catLabel), /*#__PURE__*/React.createElement("div", {
    style: cartStyles.name
  }, it.name), /*#__PURE__*/React.createElement("div", {
    style: cartStyles.price
  }, it.price, it.unit ? ` ${it.unit}` : "")), /*#__PURE__*/React.createElement("div", {
    style: cartStyles.qtyCol
  }, /*#__PURE__*/React.createElement("div", {
    style: cartStyles.qty
  }, /*#__PURE__*/React.createElement("button", {
    style: cartStyles.qtyBtn,
    onClick: () => onQty(it.id, -1),
    "aria-label": "Less"
  }, "\u2013"), /*#__PURE__*/React.createElement("span", {
    style: cartStyles.qtyN
  }, it.qty), /*#__PURE__*/React.createElement("button", {
    style: cartStyles.qtyBtn,
    onClick: () => onQty(it.id, 1),
    "aria-label": "More"
  }, "+")), /*#__PURE__*/React.createElement("button", {
    style: cartStyles.remove,
    onClick: () => onRemove(it.id)
  }, "Remove"))))), list.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: cartStyles.foot
  }, /*#__PURE__*/React.createElement("div", {
    style: cartStyles.subRow
  }, /*#__PURE__*/React.createElement("span", {
    style: cartStyles.subLabel
  }, "Subtotal"), /*#__PURE__*/React.createElement("span", {
    style: cartStyles.subVal
  }, "$", subtotal.toLocaleString())), /*#__PURE__*/React.createElement("p", {
    style: cartStyles.note
  }, "Rentals priced per day \xB7 shipping & styling calculated at checkout."), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    style: {
      width: "100%"
    }
  }, "Checkout"))));
}
const cartStyles = {
  scrim: {
    position: "fixed",
    inset: 0,
    background: "rgba(18,13,8,.5)",
    backdropFilter: "blur(2px)",
    zIndex: 80,
    transition: "opacity .35s var(--ease-out)"
  },
  drawer: {
    position: "fixed",
    top: 0,
    right: 0,
    bottom: 0,
    width: "min(420px, 92vw)",
    zIndex: 90,
    background: "var(--grad-noir)",
    borderLeft: "1px solid var(--border-gold)",
    boxShadow: "var(--shadow-5)",
    display: "flex",
    flexDirection: "column",
    padding: "22px 24px",
    transition: "transform .45s var(--ease-luxe)"
  },
  head: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between"
  },
  title: {
    fontFamily: "var(--font-display)",
    fontWeight: 300,
    fontSize: 24,
    letterSpacing: ".04em",
    color: "var(--cream-50)",
    margin: 0,
    display: "flex",
    alignItems: "center",
    gap: 10
  },
  cnt: {
    fontFamily: "var(--font-ui)",
    fontSize: 12,
    fontWeight: 600,
    color: "var(--espresso-900)",
    background: "var(--foil-gold)",
    borderRadius: 999,
    padding: "2px 9px"
  },
  items: {
    flex: 1,
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    gap: 16,
    padding: "8px 2px"
  },
  empty: {
    textAlign: "center",
    padding: "60px 0",
    color: "var(--gold-300)"
  },
  row: {
    display: "flex",
    gap: 14,
    alignItems: "flex-start"
  },
  thumb: {
    width: 64,
    height: 80,
    objectFit: "cover",
    borderRadius: "var(--radius-sm)",
    flex: "none",
    boxShadow: "var(--shadow-1)"
  },
  cat: {
    fontSize: 9.5,
    letterSpacing: ".18em",
    textTransform: "uppercase",
    color: "var(--gold-300)"
  },
  name: {
    fontFamily: "var(--font-display)",
    fontSize: 17,
    color: "var(--cream-50)",
    margin: "2px 0 3px"
  },
  price: {
    fontSize: 13,
    color: "var(--text-soft)"
  },
  qtyCol: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    gap: 8
  },
  qty: {
    display: "flex",
    alignItems: "center",
    gap: 4,
    border: "1px solid var(--border)",
    borderRadius: 999,
    padding: "2px"
  },
  qtyBtn: {
    width: 24,
    height: 24,
    borderRadius: 999,
    border: 0,
    background: "transparent",
    color: "var(--cream-50)",
    cursor: "pointer",
    fontSize: 15,
    lineHeight: 1
  },
  qtyN: {
    minWidth: 16,
    textAlign: "center",
    fontSize: 13,
    color: "var(--cream-50)"
  },
  remove: {
    background: "none",
    border: 0,
    color: "var(--text-faint)",
    fontSize: 11,
    letterSpacing: ".06em",
    textTransform: "uppercase",
    cursor: "pointer"
  },
  foot: {
    paddingTop: 16,
    borderTop: "1px solid var(--hairline)"
  },
  subRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginBottom: 6
  },
  subLabel: {
    fontSize: 12,
    letterSpacing: ".16em",
    textTransform: "uppercase",
    color: "var(--text-muted)"
  },
  subVal: {
    fontFamily: "var(--font-display)",
    fontSize: 26,
    color: "var(--gold-300)"
  },
  note: {
    fontSize: 11.5,
    color: "var(--text-faint)",
    margin: "0 0 16px",
    lineHeight: 1.5
  }
};
window.SequinCartDrawer = CartDrawer;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/storefront/CartDrawer.jsx", error: String((e && e.message) || e) }); }

// ui_kits/storefront/Catalog.jsx
try { (() => {
/* Sequin storefront — §4 Curated Linens editorial grid v2
   Diagonal-corner chips · editorial info-below-image layout · no rounded pills */

const SEQUIN_PRODUCTS = [{
  id: "willow",
  name: "Willow Runner",
  cat: "home",
  catLabel: "Home Linen",
  price: "$48",
  img: "../../assets/img/willow.jpg",
  flag: "New"
}, {
  id: "lilac",
  name: "Lilac Tablecloth",
  cat: "home",
  catLabel: "Home Linen",
  price: "$62",
  img: "../../assets/img/lilac.jpg",
  flag: "Bestseller"
}, {
  id: "hamton",
  name: "Hampton Stripe",
  cat: "home",
  catLabel: "Home Linen",
  price: "$58",
  img: "../../assets/img/hamton.jpg"
}, {
  id: "dijan",
  name: "Dijon Weave",
  cat: "home",
  catLabel: "Home Linen",
  price: "$54",
  img: "../../assets/img/dijan.jpg"
}, {
  id: "taupe",
  name: "Taupe Pendant",
  cat: "rental",
  catLabel: "Rental",
  price: "from $120 / day",
  img: "../../assets/img/taupe.jpg",
  rental: true
}, {
  id: "soiree",
  name: "Bordeaux Soirée",
  cat: "rental",
  catLabel: "Rental",
  price: "from $140 / day",
  img: "../../assets/img/home.jpg",
  rental: true,
  flag: "Bestseller"
}, {
  id: "conservatory",
  name: "Conservatory Gold",
  cat: "rental",
  catLabel: "Rental",
  price: "from $160 / day",
  img: "../../assets/img/hero.jpg",
  rental: true
}, {
  id: "verdant",
  name: "Verdant Hydrangea",
  cat: "rental",
  catLabel: "Rental",
  price: "from $135 / day",
  img: "../../assets/img/rentals.jpg",
  rental: true,
  flag: "New"
}];
function Catalog({
  filter,
  onFilter,
  favs,
  onFav,
  onAdd
}) {
  const {
    useEffect,
    useRef
  } = React;
  const ref = useRef(null);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        [...e.target.querySelectorAll(".sq-rv")].forEach((el, i) => {
          el.style.transitionDelay = i * 55 + "ms";
          el.classList.add("sq-show");
        });
      });
    }, {
      threshold: 0.06
    });
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  const chips = [{
    id: "all",
    label: "All"
  }, {
    id: "home",
    label: "Buy"
  }, {
    id: "rental",
    label: "Rent"
  }];
  const items = SEQUIN_PRODUCTS.filter(p => filter === "all" || p.cat === filter);
  const tagFor = p => {
    if (p.flag === "Bestseller") return {
      label: "Bestseller",
      bg: "#221A12",
      fg: "#BE9A6E"
    };
    if (p.flag === "New") return {
      label: "New",
      bg: "#BE9A6E",
      fg: "#221A12"
    };
    if (p.rental && !p.flag) return {
      label: "Rental",
      bg: "#6B4F3A",
      fg: "#F7F2EA"
    };
    return null;
  };
  return /*#__PURE__*/React.createElement("section", {
    ref: ref,
    style: catS.wrap,
    id: "catalog"
  }, /*#__PURE__*/React.createElement("style", null, `
        .sq-pc2 img   { transition: transform 400ms cubic-bezier(.4,0,.2,1); }
        .sq-pc2:hover img { transform: scale(1.03); }
        .sq-pc2-rule  { width: 0; height: 1px; background: #BE9A6E; transition: width 400ms cubic-bezier(.4,0,.2,1); margin-top: 7px; }
        .sq-pc2:hover .sq-pc2-rule { width: 36px; }
        .sq-chip { border: none; cursor: pointer; transition: background .18s, color .18s; }
        .sq-chip:hover { opacity: .82; }
        .sq-hrt  { cursor: pointer; transition: transform .2s; }
        .sq-hrt:hover { transform: scale(1.14); }
        @media (max-width:1024px) { .sq-cat-grid { grid-template-columns: repeat(2,1fr) !important; } }
        @media (max-width:640px)  { .sq-cat-grid { grid-template-columns: 1fr !important; } }
      `), /*#__PURE__*/React.createElement("div", {
    style: catS.head
  }, /*#__PURE__*/React.createElement("div", {
    style: catS.headLeft
  }, /*#__PURE__*/React.createElement("span", {
    className: "sq-rv",
    style: catS.eyebrow
  }, "( The Collection )"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "baseline",
      gap: 18,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("h2", {
    className: "sq-rv",
    style: catS.h2
  }, "Curated Linens"), /*#__PURE__*/React.createElement("em", {
    className: "sq-rv",
    style: catS.count
  }, items.length, " pieces"))), /*#__PURE__*/React.createElement("div", {
    className: "sq-rv",
    style: catS.filterBar
  }, /*#__PURE__*/React.createElement("span", {
    style: catS.filterLabel
  }, "Filter"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8
    }
  }, chips.map(c => /*#__PURE__*/React.createElement("button", {
    key: c.id,
    className: "sq-chip",
    onClick: () => onFilter(c.id),
    style: {
      ...catS.chip,
      ...(filter === c.id ? catS.chipOn : catS.chipOff)
    }
  }, c.label))))), /*#__PURE__*/React.createElement("div", {
    className: "sq-cat-grid",
    style: catS.grid
  }, items.map(p => {
    const tag = tagFor(p);
    const fav = !!(favs && favs[p.id]);
    return /*#__PURE__*/React.createElement("article", {
      key: p.id,
      className: "sq-rv sq-pc2",
      style: catS.card,
      onClick: () => onAdd && onAdd(p)
    }, /*#__PURE__*/React.createElement("div", {
      style: catS.frame
    }, /*#__PURE__*/React.createElement("img", {
      src: p.img,
      alt: p.name,
      style: catS.img
    }), tag && /*#__PURE__*/React.createElement("span", {
      style: {
        ...catS.tag,
        background: tag.bg,
        color: tag.fg
      }
    }, tag.label), /*#__PURE__*/React.createElement("button", {
      className: "sq-hrt",
      "aria-label": "Save",
      onClick: e => {
        e.stopPropagation();
        onFav && onFav(p.id);
      },
      style: catS.heart
    }, /*#__PURE__*/React.createElement("svg", {
      width: "15",
      height: "15",
      viewBox: "0 0 24 24",
      fill: fav ? "#BE9A6E" : "none",
      stroke: "#BE9A6E",
      strokeWidth: "1.5"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
    })))), /*#__PURE__*/React.createElement("div", {
      style: catS.info
    }, /*#__PURE__*/React.createElement("span", {
      style: catS.catLabel
    }, "( ", p.catLabel, " )"), /*#__PURE__*/React.createElement("h3", {
      style: catS.name
    }, p.name), /*#__PURE__*/React.createElement("span", {
      style: catS.price
    }, p.price), /*#__PURE__*/React.createElement("div", {
      className: "sq-pc2-rule"
    })));
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      marginTop: 64
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    style: catS.viewAll
  }, "View All Linens \u2192")));
}
const catS = {
  wrap: {
    background: "#F7F2EA",
    padding: "80px 44px 104px"
  },
  head: {
    maxWidth: 1300,
    margin: "0 auto 52px",
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "space-between",
    gap: 24,
    flexWrap: "wrap"
  },
  headLeft: {
    display: "flex",
    flexDirection: "column",
    gap: 10
  },
  eyebrow: {
    fontFamily: "var(--font-ui)",
    fontSize: 10,
    fontWeight: 500,
    letterSpacing: "0.4em",
    textTransform: "uppercase",
    color: "#BE9A6E",
    display: "block"
  },
  h2: {
    fontFamily: "'Audrey','Playfair Display','Cormorant Garamond',Georgia,serif",
    fontWeight: 500,
    fontSize: "clamp(28px,3vw,38px)",
    letterSpacing: "-0.01em",
    color: "#221A12",
    margin: 0
  },
  count: {
    fontFamily: "var(--font-ui)",
    fontStyle: "italic",
    fontSize: 14,
    color: "#9A8A75"
  },
  filterBar: {
    display: "flex",
    alignItems: "center",
    gap: 14
  },
  filterLabel: {
    fontFamily: "var(--font-ui)",
    fontSize: 10.5,
    fontWeight: 500,
    letterSpacing: "0.22em",
    textTransform: "uppercase",
    color: "#9A8A75"
  },
  chip: {
    fontFamily: "var(--font-ui)",
    fontSize: 11,
    fontWeight: 500,
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    padding: "8px 18px",
    borderRadius: "11px 0 11px 0"
  },
  chipOn: {
    background: "#221A12",
    color: "#FBF6EF",
    border: "1px solid #221A12"
  },
  chipOff: {
    background: "transparent",
    color: "#3A2A20",
    border: "1px solid #6B4F3A"
  },
  grid: {
    maxWidth: 1300,
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "repeat(4,1fr)",
    gap: "36px 24px"
  },
  card: {
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    gap: 14
  },
  frame: {
    position: "relative",
    borderRadius: "20px 0 20px 0",
    overflow: "hidden",
    aspectRatio: "3/4",
    background: "#EAE2D4"
  },
  img: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block"
  },
  tag: {
    position: "absolute",
    top: 14,
    left: 14,
    fontFamily: "var(--font-ui)",
    fontSize: 9.5,
    fontWeight: 500,
    letterSpacing: "0.2em",
    textTransform: "uppercase",
    padding: "5px 12px",
    borderRadius: "11px 0 11px 0"
  },
  heart: {
    position: "absolute",
    top: 14,
    right: 14,
    width: 32,
    height: 32,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "1px solid rgba(190,154,110,.55)",
    background: "rgba(247,242,234,.78)",
    backdropFilter: "blur(4px)"
  },
  info: {
    display: "flex",
    flexDirection: "column",
    gap: 5,
    padding: "0 2px"
  },
  catLabel: {
    fontFamily: "var(--font-ui)",
    fontSize: 9.5,
    fontWeight: 500,
    letterSpacing: "0.3em",
    textTransform: "uppercase",
    color: "#BE9A6E"
  },
  name: {
    fontFamily: "'Audrey','Playfair Display','Cormorant Garamond',Georgia,serif",
    fontWeight: 500,
    fontSize: 18,
    lineHeight: 1.15,
    color: "#221A12",
    margin: 0
  },
  price: {
    fontFamily: "var(--font-ui)",
    fontSize: 13.5,
    color: "#6B4F3A"
  },
  viewAll: {
    display: "inline-block",
    fontFamily: "var(--font-ui)",
    fontSize: 12.5,
    fontWeight: 500,
    letterSpacing: "0.16em",
    textTransform: "uppercase",
    color: "#221A12",
    textDecoration: "none",
    borderBottom: "1px solid #BE9A6E",
    paddingBottom: 2
  }
};
window.SEQUIN_PRODUCTS = SEQUIN_PRODUCTS;
window.SequinCatalog = Catalog;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/storefront/Catalog.jsx", error: String((e && e.message) || e) }); }

// ui_kits/storefront/Collections.jsx
try { (() => {
/* Sequin storefront — §2+§3 About Strip + Two Lanes
   Combined so the new sections load from any cached version of index.html */

/* ────────────────────────────────────────────────────
   §2  ABOUT STRIP
   ──────────────────────────────────────────────────── */
function SqAbout() {
  const {
    useEffect,
    useRef
  } = React;
  const ref = useRef(null);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        [...e.target.querySelectorAll(".sq-rv")].forEach((el, i) => {
          el.style.transitionDelay = i * 90 + "ms";
          el.classList.add("sq-show");
        });
      });
    }, {
      threshold: 0.12
    });
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return /*#__PURE__*/React.createElement("section", {
    ref: ref,
    style: a2.wrap
  }, /*#__PURE__*/React.createElement("div", {
    style: a2.inner
  }, /*#__PURE__*/React.createElement("div", {
    style: a2.text
  }, /*#__PURE__*/React.createElement("span", {
    className: "sq-rv",
    style: a2.eye
  }, "( About Sequin )"), /*#__PURE__*/React.createElement("h2", {
    className: "sq-rv",
    style: a2.h2
  }, "Linens, made for the moments", /*#__PURE__*/React.createElement("br", null), "worth ", /*#__PURE__*/React.createElement("em", {
    style: {
      fontStyle: "italic"
    }
  }, "remembering"), "."), /*#__PURE__*/React.createElement("p", {
    className: "sq-rv",
    style: a2.body
  }, "We are a Brooklyn-based linen house built on the belief that a beautiful table transforms any gathering. Every piece is sourced with intention and hand-finished in our studio \u2014 ready to dress your most important moments."), /*#__PURE__*/React.createElement("p", {
    className: "sq-rv",
    style: a2.body
  }, "Rent for the event, or own for the table. Either way, Sequin linens arrive pressed, wrapped and ready."), /*#__PURE__*/React.createElement("a", {
    className: "sq-rv",
    href: "about.html",
    style: a2.link
  }, "Read our story \u2192")), /*#__PURE__*/React.createElement("div", {
    className: "sq-rv",
    style: {}
  }, /*#__PURE__*/React.createElement("div", {
    style: a2.frame
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/img/willow.jpg",
    alt: "Linen cloth detail",
    style: a2.img
  }), /*#__PURE__*/React.createElement("span", {
    style: a2.idx
  }, "( 01\u201403 )")))));
}
const a2 = {
  wrap: {
    background: "#F7F2EA",
    padding: "104px 44px"
  },
  inner: {
    maxWidth: 1240,
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "1.5fr 1fr",
    gap: 84,
    alignItems: "center"
  },
  text: {
    display: "flex",
    flexDirection: "column",
    gap: 24
  },
  eye: {
    fontFamily: "var(--font-ui)",
    fontSize: 10,
    fontWeight: 500,
    letterSpacing: "0.4em",
    textTransform: "uppercase",
    color: "#BE9A6E",
    display: "block"
  },
  h2: {
    fontFamily: "'Audrey','Playfair Display','Cormorant Garamond',Georgia,serif",
    fontWeight: 500,
    fontSize: "clamp(32px,3.4vw,46px)",
    lineHeight: 1.1,
    letterSpacing: "-0.01em",
    color: "#221A12",
    margin: 0
  },
  body: {
    fontFamily: "var(--font-ui)",
    fontSize: 15,
    lineHeight: 1.78,
    color: "#6B4F3A",
    margin: 0,
    maxWidth: "52ch"
  },
  link: {
    display: "inline-block",
    fontFamily: "var(--font-ui)",
    fontSize: 12,
    fontWeight: 500,
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    color: "#221A12",
    textDecoration: "none",
    borderBottom: "1px solid #BE9A6E",
    paddingBottom: 3,
    marginTop: 4
  },
  frame: {
    position: "relative",
    borderRadius: "20px 0 20px 0",
    overflow: "hidden",
    aspectRatio: "4/5"
  },
  img: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block"
  },
  idx: {
    position: "absolute",
    bottom: 18,
    right: 18,
    fontFamily: "var(--font-ui)",
    fontSize: 9.5,
    fontWeight: 500,
    letterSpacing: "0.32em",
    textTransform: "uppercase",
    color: "#BE9A6E",
    background: "rgba(247,242,234,.86)",
    backdropFilter: "blur(4px)",
    padding: "6px 13px",
    borderRadius: "6px 0 6px 0"
  }
};

/* ────────────────────────────────────────────────────
   §3  TWO LANES  (Rent | Buy)
   ──────────────────────────────────────────────────── */
function SqLanes({
  onOpen
}) {
  const {
    useEffect,
    useRef
  } = React;
  const ref = useRef(null);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        [...e.target.querySelectorAll(".sq-rv")].forEach((el, i) => {
          el.style.transitionDelay = i * 100 + "ms";
          el.classList.add("sq-show");
        });
      });
    }, {
      threshold: 0.1
    });
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  const go = which => onOpen && onOpen(which);
  return /*#__PURE__*/React.createElement("section", {
    ref: ref,
    style: l2.wrap
  }, /*#__PURE__*/React.createElement("style", null, `
        .sq-lane{overflow:hidden}
        .sq-lane img{transition:transform 400ms cubic-bezier(.4,0,.2,1)}
        .sq-lane:hover img{transform:scale(1.03)}
        .sq-cta-rent{border:none;transition:transform .3s,box-shadow .3s,filter .3s}
        .sq-cta-rent:hover{transform:translateY(-2px);box-shadow:0 12px 30px rgba(216,180,132,.28);filter:brightness(1.06)}
        .sq-cta-buy{transition:background .3s,transform .3s}
        .sq-cta-buy:hover{background:rgba(190,154,110,.1)!important;transform:translateY(-2px)}
      `), /*#__PURE__*/React.createElement("div", {
    style: l2.head
  }, /*#__PURE__*/React.createElement("span", {
    className: "sq-rv",
    style: l2.eye
  }, "( Two Ways to Sequin )"), /*#__PURE__*/React.createElement("h2", {
    className: "sq-rv",
    style: l2.h2
  }, "Rent for the Event.", " ", /*#__PURE__*/React.createElement("em", {
    style: {
      fontStyle: "italic"
    }
  }, "Own"), " for the Table.")), /*#__PURE__*/React.createElement("div", {
    style: l2.grid
  }, /*#__PURE__*/React.createElement("article", {
    className: "sq-rv sq-lane",
    style: l2.rent,
    onClick: () => go("rental")
  }, /*#__PURE__*/React.createElement("div", {
    style: l2.imgWrap
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/img/rentals.jpg",
    alt: "Event tablescape",
    style: l2.img
  })), /*#__PURE__*/React.createElement("div", {
    style: l2.rentBody
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      ...l2.cardEye,
      color: "#BE9A6E"
    }
  }, "( Rentals )"), /*#__PURE__*/React.createElement("h3", {
    style: {
      ...l2.cardT,
      color: "#FBF6EF"
    }
  }, "Rent the Occasion"), /*#__PURE__*/React.createElement("p", {
    style: {
      ...l2.cardP,
      color: "#9A8A75"
    }
  }, "Statement linens for weddings, soir\xE9es and celebrations \u2014 delivered, pressed and ready to dress."), /*#__PURE__*/React.createElement("button", {
    className: "sq-cta-rent",
    style: l2.ctaGold,
    onClick: e => {
      e.stopPropagation();
      go("rental");
    }
  }, "Explore Rentals \u2192"))), /*#__PURE__*/React.createElement("article", {
    className: "sq-rv sq-lane",
    style: l2.buy,
    onClick: () => go("home")
  }, /*#__PURE__*/React.createElement("div", {
    style: l2.imgWrap
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/img/home.jpg",
    alt: "Home table setting",
    style: l2.img
  })), /*#__PURE__*/React.createElement("div", {
    style: l2.buyBody
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      ...l2.cardEye,
      color: "#997844"
    }
  }, "( Home Linen )"), /*#__PURE__*/React.createElement("h3", {
    style: {
      ...l2.cardT,
      color: "#221A12"
    }
  }, "Set Your Table"), /*#__PURE__*/React.createElement("p", {
    style: {
      ...l2.cardP,
      color: "#6B4F3A"
    }
  }, "Bring the Sequin look home \u2014 runners, cloths and napkins to own and reuse season after season."), /*#__PURE__*/React.createElement("button", {
    className: "sq-cta-buy",
    style: l2.ctaOut,
    onClick: e => {
      e.stopPropagation();
      go("home");
    }
  }, "Shop Home \u2192")))));
}
const l2 = {
  wrap: {
    background: "#F7F2EA",
    padding: "0 44px 104px"
  },
  head: {
    maxWidth: 1240,
    margin: "0 auto 52px",
    display: "flex",
    flexDirection: "column",
    gap: 16
  },
  eye: {
    fontFamily: "var(--font-ui)",
    fontSize: 10,
    fontWeight: 500,
    letterSpacing: "0.4em",
    textTransform: "uppercase",
    color: "#BE9A6E",
    display: "block"
  },
  h2: {
    fontFamily: "'Audrey','Playfair Display','Cormorant Garamond',Georgia,serif",
    fontWeight: 500,
    fontSize: "clamp(28px,3vw,42px)",
    lineHeight: 1.12,
    color: "#221A12",
    margin: 0
  },
  grid: {
    maxWidth: 1240,
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 28
  },
  rent: {
    borderRadius: "20px 0 20px 0",
    cursor: "pointer",
    background: "#221A12",
    boxShadow: "0 8px 32px rgba(34,26,18,.22)"
  },
  buy: {
    borderRadius: "20px 0 20px 0",
    cursor: "pointer",
    background: "#FBF6EF",
    border: "1px solid #E4DDD0",
    boxShadow: "0 4px 16px rgba(34,26,18,.06)"
  },
  imgWrap: {
    overflow: "hidden",
    borderRadius: "20px 0 0 0"
  },
  img: {
    width: "100%",
    height: 330,
    objectFit: "cover",
    display: "block"
  },
  rentBody: {
    padding: "36px 42px 46px",
    display: "flex",
    flexDirection: "column",
    gap: 16,
    alignItems: "flex-start"
  },
  buyBody: {
    padding: "36px 42px 46px",
    display: "flex",
    flexDirection: "column",
    gap: 16,
    alignItems: "flex-start"
  },
  cardEye: {
    fontFamily: "var(--font-ui)",
    fontSize: 9.5,
    fontWeight: 500,
    letterSpacing: "0.4em",
    textTransform: "uppercase"
  },
  cardT: {
    fontFamily: "'Audrey','Playfair Display','Cormorant Garamond',Georgia,serif",
    fontWeight: 500,
    fontSize: 32,
    lineHeight: 1.1,
    margin: 0
  },
  cardP: {
    fontFamily: "var(--font-ui)",
    fontSize: 14.5,
    lineHeight: 1.72,
    margin: 0,
    maxWidth: "40ch"
  },
  ctaGold: {
    display: "inline-flex",
    alignItems: "center",
    cursor: "pointer",
    background: "linear-gradient(135deg,#BE9A6E,#D8B484,#BE9A6E)",
    backgroundSize: "200% auto",
    color: "#221A12",
    fontFamily: "var(--font-ui)",
    fontWeight: 600,
    fontSize: 12,
    letterSpacing: "0.16em",
    textTransform: "uppercase",
    padding: "13px 28px",
    borderRadius: "12px 0 12px 0",
    marginTop: 8,
    whiteSpace: "nowrap"
  },
  ctaOut: {
    display: "inline-flex",
    alignItems: "center",
    cursor: "pointer",
    background: "transparent",
    color: "#221A12",
    fontFamily: "var(--font-ui)",
    fontWeight: 500,
    fontSize: 12,
    letterSpacing: "0.16em",
    textTransform: "uppercase",
    padding: "12px 26px",
    border: "1px solid #BE9A6E",
    borderRadius: "12px 0 12px 0",
    marginTop: 8,
    whiteSpace: "nowrap"
  }
};

/* ── Combined export ── */
function Collections({
  onOpen
}) {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(SqAbout, null), /*#__PURE__*/React.createElement(SqLanes, {
    onOpen: onOpen
  }));
}
window.SequinAboutStrip = SqAbout;
window.SequinCollections = Collections;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/storefront/Collections.jsx", error: String((e && e.message) || e) }); }

// ui_kits/storefront/Footer.jsx
try { (() => {
/* Sequin storefront — §5+§6+§7 Process + Testimonials + Footer
   Combined so the new sections load from any cached version of index.html */
const {
  Monogram
} = window.SequinDesignSystem_ec3cc5;

/* ────────────────────────────────────────────────────
   §5  OUR PROCESS  (espresso lane)
   ──────────────────────────────────────────────────── */
function SqProcess() {
  const {
    useEffect,
    useRef
  } = React;
  const ref = useRef(null);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        [...e.target.querySelectorAll(".sq-rv")].forEach((el, i) => {
          el.style.transitionDelay = i * 90 + "ms";
          el.classList.add("sq-show");
        });
      });
    }, {
      threshold: 0.1
    });
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  const steps = [{
    num: "01",
    title: "Curate.",
    body: "Cloths sourced and selected with intention — every weave, weight and colour chosen by hand."
  }, {
    num: "02",
    title: "Press.",
    body: "Hand-finished in-house, Brooklyn. Each piece arrives crisp, clean and ready to lay."
  }, {
    num: "03",
    title: "Deliver.",
    body: "Wrapped and delivered to your door, ready to dress your table exactly as imagined."
  }, {
    num: "04",
    title: "Return.",
    body: "For rentals — collected, cleaned, repeated. Effortless from beginning to end."
  }];
  return /*#__PURE__*/React.createElement("section", {
    ref: ref,
    style: p2.wrap,
    "data-theme": "noir"
  }, /*#__PURE__*/React.createElement("style", null, `
        @media(max-width:1024px){.sq-proc-grid{grid-template-columns:repeat(2,1fr)!important}}
        @media(max-width:640px){.sq-proc-grid{grid-template-columns:1fr!important}}
      `), /*#__PURE__*/React.createElement("div", {
    style: p2.inner
  }, /*#__PURE__*/React.createElement("div", {
    style: p2.intro
  }, /*#__PURE__*/React.createElement("span", {
    className: "sq-rv",
    style: p2.eye
  }, "( Our Process )"), /*#__PURE__*/React.createElement("h2", {
    className: "sq-rv",
    style: p2.h2
  }, "From our studio to", " ", /*#__PURE__*/React.createElement("em", {
    style: {
      fontStyle: "italic",
      color: "#BE9A6E"
    }
  }, "your"), " table."), /*#__PURE__*/React.createElement("div", {
    className: "sq-rv",
    style: p2.rule
  })), /*#__PURE__*/React.createElement("div", {
    className: "sq-proc-grid",
    style: p2.grid
  }, steps.map(s => /*#__PURE__*/React.createElement("div", {
    key: s.num,
    className: "sq-rv",
    style: p2.step
  }, /*#__PURE__*/React.createElement("span", {
    style: p2.num
  }, s.num), /*#__PURE__*/React.createElement("div", {
    style: p2.stepContent
  }, /*#__PURE__*/React.createElement("h3", {
    style: p2.stepT
  }, s.title), /*#__PURE__*/React.createElement("p", {
    style: p2.stepP
  }, s.body)))))));
}
const p2 = {
  wrap: {
    background: "#221A12",
    padding: "104px 44px"
  },
  inner: {
    maxWidth: 1240,
    margin: "0 auto"
  },
  intro: {
    marginBottom: 72,
    display: "flex",
    flexDirection: "column",
    gap: 22
  },
  eye: {
    fontFamily: "var(--font-ui)",
    fontSize: 10,
    fontWeight: 500,
    letterSpacing: "0.4em",
    textTransform: "uppercase",
    color: "#BE9A6E",
    display: "block"
  },
  h2: {
    fontFamily: "'Audrey','Playfair Display','Cormorant Garamond',Georgia,serif",
    fontWeight: 500,
    fontSize: "clamp(32px,3.5vw,44px)",
    lineHeight: 1.1,
    color: "#FBF6EF",
    margin: 0,
    maxWidth: "22ch"
  },
  rule: {
    width: "100%",
    height: 1,
    background: "rgba(190,154,110,.25)"
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(4,1fr)",
    gap: 44
  },
  step: {
    display: "flex",
    flexDirection: "column",
    gap: 20
  },
  num: {
    fontFamily: "'Audrey','Playfair Display','Cormorant Garamond',Georgia,serif",
    fontWeight: 500,
    fontSize: 96,
    lineHeight: 1,
    letterSpacing: "-0.04em",
    color: "#BE9A6E",
    opacity: 0.48,
    display: "block"
  },
  stepContent: {
    display: "flex",
    flexDirection: "column",
    gap: 10
  },
  stepT: {
    fontFamily: "'Audrey','Playfair Display','Cormorant Garamond',Georgia,serif",
    fontWeight: 500,
    fontStyle: "italic",
    fontSize: 24,
    color: "#FBF6EF",
    margin: 0
  },
  stepP: {
    fontFamily: "var(--font-ui)",
    fontSize: 14,
    lineHeight: 1.72,
    color: "#9A8A75",
    margin: 0
  }
};

/* ────────────────────────────────────────────────────
   §6  TESTIMONIALS
   ──────────────────────────────────────────────────── */
function SqTestimonials() {
  const {
    useEffect,
    useRef
  } = React;
  const ref = useRef(null);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        [...e.target.querySelectorAll(".sq-rv")].forEach((el, i) => {
          el.style.transitionDelay = i * 100 + "ms";
          el.classList.add("sq-show");
        });
      });
    }, {
      threshold: 0.1
    });
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  const quotes = [{
    q: "Sequin made our wedding feel finished. The linens were the first thing every guest commented on.",
    name: "Margot L.",
    role: "Married in Brooklyn, Oct 2025"
  }, {
    q: "The quality is extraordinary. We rented for a dinner party and ended up buying the runner the next week.",
    name: "James & Vera T.",
    role: "Home clients, Williamsburg"
  }, {
    q: "Impeccable service, beautifully pressed. Everything arrived on time and looked even better in person.",
    name: "Claire D.",
    role: "Event planner, New York"
  }];
  return /*#__PURE__*/React.createElement("section", {
    ref: ref,
    style: t2.wrap
  }, /*#__PURE__*/React.createElement("style", null, `@media(max-width:900px){.sq-test-grid{grid-template-columns:1fr!important}}`), /*#__PURE__*/React.createElement("div", {
    style: t2.inner
  }, /*#__PURE__*/React.createElement("span", {
    className: "sq-rv",
    style: t2.eye
  }, "( In Good Company )"), /*#__PURE__*/React.createElement("div", {
    className: "sq-test-grid",
    style: t2.grid
  }, quotes.map((q, i) => /*#__PURE__*/React.createElement("blockquote", {
    key: i,
    className: "sq-rv",
    style: t2.card
  }, /*#__PURE__*/React.createElement("p", {
    style: t2.quote
  }, "\u201C", q.q, "\u201D"), /*#__PURE__*/React.createElement("div", {
    style: t2.rule
  }), /*#__PURE__*/React.createElement("footer", null, /*#__PURE__*/React.createElement("span", {
    style: t2.name
  }, q.name), /*#__PURE__*/React.createElement("span", {
    style: t2.role
  }, q.role))))), /*#__PURE__*/React.createElement("p", {
    className: "sq-rv",
    style: t2.closing
  }, /*#__PURE__*/React.createElement("em", null, "A table is the first thing a guest remembers."))));
}
const t2 = {
  wrap: {
    background: "#F7F2EA",
    padding: "104px 44px"
  },
  inner: {
    maxWidth: 1240,
    margin: "0 auto"
  },
  eye: {
    fontFamily: "var(--font-ui)",
    fontSize: 10,
    fontWeight: 500,
    letterSpacing: "0.4em",
    textTransform: "uppercase",
    color: "#BE9A6E",
    display: "block",
    marginBottom: 52
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(3,1fr)",
    gap: 28
  },
  card: {
    background: "#FBF6EF",
    borderRadius: "20px 0 20px 0",
    border: "1px solid #C8B7A0",
    padding: "36px 36px 32px",
    display: "flex",
    flexDirection: "column",
    gap: 20,
    margin: 0
  },
  quote: {
    fontFamily: "'Audrey','Playfair Display','Cormorant Garamond',Georgia,serif",
    fontStyle: "italic",
    fontWeight: 400,
    fontSize: 22,
    lineHeight: 1.46,
    color: "#221A12",
    margin: 0,
    flex: 1
  },
  rule: {
    width: 32,
    height: 1,
    background: "#BE9A6E",
    flexShrink: 0
  },
  name: {
    display: "block",
    fontFamily: "var(--font-ui)",
    fontSize: 13,
    fontWeight: 500,
    letterSpacing: "0.08em",
    color: "#221A12"
  },
  role: {
    display: "block",
    fontFamily: "var(--font-ui)",
    fontSize: 12,
    color: "#9A8A75",
    marginTop: 3
  },
  closing: {
    textAlign: "center",
    fontFamily: "'Audrey','Playfair Display','Cormorant Garamond',Georgia,serif",
    fontStyle: "italic",
    fontWeight: 400,
    fontSize: 22,
    color: "#221A12",
    marginTop: 72,
    marginBottom: 0
  }
};

/* ────────────────────────────────────────────────────
   §7  FOOTER
   ──────────────────────────────────────────────────── */
function SqFooterInner() {
  const cols = [{
    head: "Shop",
    links: [{
      l: "Rent",
      href: "rent.html"
    }, {
      l: "Buy",
      href: "buy.html"
    }, {
      l: "New Arrivals",
      href: "#"
    }, {
      l: "Bestsellers",
      href: "#"
    }, {
      l: "Gift Cards",
      href: "#"
    }]
  }, {
    head: "Company",
    links: [{
      l: "About",
      href: "about.html"
    }, {
      l: "Our Process",
      href: "process.html"
    }, {
      l: "Press",
      href: "#"
    }, {
      l: "Journal",
      href: "#"
    }, {
      l: "Contact",
      href: "#contact"
    }]
  }, {
    head: "Help",
    links: [{
      l: "FAQ",
      href: "#"
    }, {
      l: "Shipping & Returns",
      href: "#"
    }, {
      l: "Care Guide",
      href: "#"
    }, {
      l: "Trade Program",
      href: "#"
    }]
  }];
  return /*#__PURE__*/React.createElement("footer", {
    style: f2.footer,
    "data-theme": "noir",
    id: "contact"
  }, /*#__PURE__*/React.createElement("div", {
    style: f2.inner
  }, /*#__PURE__*/React.createElement("div", {
    style: f2.top
  }, /*#__PURE__*/React.createElement("div", {
    style: f2.brand
  }, /*#__PURE__*/React.createElement(Monogram, {
    variant: "lockup",
    size: 36,
    tagline: true
  }), /*#__PURE__*/React.createElement("p", {
    style: f2.tagline
  }, "Upscale table linen \u2014 Brooklyn."), /*#__PURE__*/React.createElement("span", {
    style: f2.lanes
  }, "Rent \xB7 Buy \xB7 Host")), /*#__PURE__*/React.createElement("div", {
    style: f2.cols
  }, cols.map(col => /*#__PURE__*/React.createElement("div", {
    key: col.head,
    style: f2.col
  }, /*#__PURE__*/React.createElement("h4", {
    style: f2.colH
  }, col.head), col.links.map(lk => /*#__PURE__*/React.createElement("a", {
    key: lk.l,
    href: lk.href,
    style: f2.link,
    onMouseEnter: e => {
      e.currentTarget.style.color = "#BE9A6E";
    },
    onMouseLeave: e => {
      e.currentTarget.style.color = "#9A8A75";
    }
  }, lk.l)))))), /*#__PURE__*/React.createElement("div", {
    style: f2.hairline
  }), /*#__PURE__*/React.createElement("div", {
    style: f2.bottom
  }, /*#__PURE__*/React.createElement("span", {
    style: f2.legal
  }, "\xA9 2026 Sequin Table \xB7 Brooklyn, NY"), /*#__PURE__*/React.createElement("div", {
    style: f2.right
  }, /*#__PURE__*/React.createElement("a", {
    href: "https://www.instagram.com/sequin.table/",
    style: f2.legal,
    target: "_blank",
    rel: "noreferrer"
  }, "@sequin.table"), /*#__PURE__*/React.createElement("a", {
    href: "mailto:sequintable@gmail.com",
    style: f2.legal
  }, "sequintable@gmail.com"), /*#__PURE__*/React.createElement("a", {
    href: "tel:17187901832",
    style: f2.legal
  }, "718-790-1832")))));
}
const f2 = {
  footer: {
    background: "#221A12",
    padding: "80px 44px 44px"
  },
  inner: {
    maxWidth: 1240,
    margin: "0 auto"
  },
  top: {
    display: "grid",
    gridTemplateColumns: "1fr 1.9fr",
    gap: 80,
    alignItems: "start",
    marginBottom: 60
  },
  brand: {
    display: "flex",
    flexDirection: "column",
    gap: 16
  },
  tagline: {
    fontFamily: "var(--font-ui)",
    fontSize: 14,
    color: "#9A8A75",
    margin: 0,
    lineHeight: 1.6
  },
  lanes: {
    fontFamily: "var(--font-ui)",
    fontSize: 10.5,
    fontWeight: 500,
    letterSpacing: "0.24em",
    textTransform: "uppercase",
    color: "#BE9A6E"
  },
  cols: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gap: 40
  },
  col: {
    display: "flex",
    flexDirection: "column",
    gap: 12
  },
  colH: {
    fontFamily: "var(--font-ui)",
    fontSize: 10.5,
    fontWeight: 600,
    letterSpacing: "0.22em",
    textTransform: "uppercase",
    color: "#BE9A6E",
    margin: "0 0 6px"
  },
  link: {
    fontFamily: "var(--font-ui)",
    fontSize: 13.5,
    color: "#9A8A75",
    textDecoration: "none",
    transition: "color .2s"
  },
  hairline: {
    height: 1,
    background: "rgba(190,154,110,.18)",
    marginBottom: 28
  },
  bottom: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 14
  },
  right: {
    display: "flex",
    gap: 28,
    flexWrap: "wrap"
  },
  legal: {
    fontFamily: "var(--font-ui)",
    fontSize: 11.5,
    letterSpacing: "0.07em",
    color: "#6B4F3A",
    textDecoration: "none"
  }
};

/* ── Combined Footer export ── */
function Footer() {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(SqProcess, null), /*#__PURE__*/React.createElement(SqTestimonials, null), /*#__PURE__*/React.createElement(SqFooterInner, null));
}

/* Stubs for old index.html */
function QuoteBand() {
  return null;
}
function Newsletter() {
  return null;
}

/* Standalone exports (used by sub-pages) */
window.SequinProcess = SqProcess;
window.SequinTestimonials = SqTestimonials;
window.SequinQuoteBand = QuoteBand;
window.SequinNewsletter = Newsletter;
window.SequinFooter = Footer;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/storefront/Footer.jsx", error: String((e && e.message) || e) }); }

// ui_kits/storefront/Header.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Sequin storefront — Header v2: full IA, six-link expanded nav */
const {
  IconButton,
  Monogram
} = window.SequinDesignSystem_ec3cc5;
function Header({
  cartCount = 0,
  onCart,
  active,
  onNav
}) {
  const leftLinks = [{
    id: "rent",
    label: "Rent",
    href: "rent.html"
  }, {
    id: "buy",
    label: "Buy",
    href: "buy.html"
  }, {
    id: "collections",
    label: "Collections",
    href: "index.html#catalog"
  }];
  const rightLinks = [{
    id: "about",
    label: "About",
    href: "about.html"
  }, {
    id: "process",
    label: "Process",
    href: "process.html"
  }, {
    id: "contact",
    label: "Contact",
    href: "#contact"
  }];
  const go = (id, href) => {
    if (onNav) {
      onNav(id, href);
      return;
    }
    window.location.href = href;
  };
  const Link = ({
    id,
    label,
    href
  }) => /*#__PURE__*/React.createElement("button", {
    onClick: () => go(id, href),
    style: {
      ...hdS.link,
      ...(active === id ? hdS.active : {})
    },
    "aria-current": active === id ? "page" : undefined
  }, label, active === id && /*#__PURE__*/React.createElement("span", {
    style: hdS.activeLine,
    "aria-hidden": "true"
  }));
  return /*#__PURE__*/React.createElement("header", {
    style: hdS.bar,
    className: "glass"
  }, /*#__PURE__*/React.createElement("nav", {
    style: hdS.left,
    "aria-label": "Shop"
  }, leftLinks.map(l => /*#__PURE__*/React.createElement(Link, _extends({
    key: l.id
  }, l)))), /*#__PURE__*/React.createElement("button", {
    style: hdS.brand,
    onClick: () => go("home", "index.html"),
    "aria-label": "Sequin home"
  }, /*#__PURE__*/React.createElement(Monogram, {
    variant: "lockup",
    size: 30
  })), /*#__PURE__*/React.createElement("div", {
    style: hdS.right
  }, /*#__PURE__*/React.createElement("nav", {
    style: hdS.rightNav,
    "aria-label": "Company"
  }, rightLinks.map(l => /*#__PURE__*/React.createElement(Link, _extends({
    key: l.id
  }, l)))), /*#__PURE__*/React.createElement("div", {
    style: hdS.actions
  }, /*#__PURE__*/React.createElement(IconButton, {
    variant: "bare",
    size: "sm",
    label: "Search"
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "search"
  })), /*#__PURE__*/React.createElement(IconButton, {
    variant: "bare",
    size: "sm",
    label: "Account"
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "user"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement(IconButton, {
    size: "sm",
    label: "Cart",
    onClick: onCart
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "shopping-bag"
  })), cartCount > 0 && /*#__PURE__*/React.createElement("span", {
    style: hdS.badge
  }, cartCount)))));
}
const hdS = {
  bar: {
    position: "sticky",
    top: 0,
    zIndex: 40,
    display: "grid",
    gridTemplateColumns: "1fr auto 1fr",
    alignItems: "center",
    padding: "14px 44px",
    borderRadius: 0,
    borderLeft: 0,
    borderRight: 0,
    borderTop: 0
  },
  left: {
    display: "flex",
    gap: 34,
    alignItems: "center"
  },
  right: {
    display: "flex",
    gap: 22,
    alignItems: "center",
    justifySelf: "end"
  },
  rightNav: {
    display: "flex",
    gap: 28,
    alignItems: "center"
  },
  brand: {
    background: "none",
    border: 0,
    cursor: "pointer",
    justifySelf: "center"
  },
  actions: {
    display: "flex",
    gap: 6,
    alignItems: "center"
  },
  link: {
    position: "relative",
    background: "none",
    border: 0,
    cursor: "pointer",
    padding: "6px 0",
    fontFamily: "var(--font-ui)",
    fontSize: 11.5,
    fontWeight: 500,
    letterSpacing: ".16em",
    textTransform: "uppercase",
    color: "var(--text-soft)",
    transition: "color .22s"
  },
  active: {
    color: "var(--accent-text)"
  },
  activeLine: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 1,
    background: "var(--gold-500)",
    display: "block"
  },
  badge: {
    position: "absolute",
    top: -4,
    right: -4,
    minWidth: 18,
    height: 18,
    padding: "0 4px",
    borderRadius: 999,
    background: "var(--feature)",
    color: "#fff",
    fontSize: 10,
    fontWeight: 700,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }
};
window.SequinHeader = Header;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/storefront/Header.jsx", error: String((e && e.message) || e) }); }

// ui_kits/storefront/Hero.jsx
try { (() => {
/* Sequin storefront — HERO v2.
   The draped tablecloth cutout is the focal point, front-and-center, overlapping
   a giant ghost collection name. Clean espresso background (no photo, no glass card).
   All text sits directly on the background. */

const SQ_HERO_SLIDES = [{
  name: "VERDE",
  img: "assets/cloths/verde-rich.png",
  price: "from $135 / day",
  bg: "#1F3D2C"
}, {
  name: "BORDEAUX",
  img: "assets/cloths/bordeaux-rich.png",
  price: "from $160 / day",
  bg: "#511E29"
}, {
  name: "CHAMPAGNE",
  img: "assets/cloths/champagne-rich.png",
  price: "from $130 / day",
  bg: "#463C30"
}, {
  name: "AURELIA",
  img: "assets/cloths/aurelia-rich.png",
  price: "from $145 / day",
  bg: "#54400F"
}, {
  name: "NOIR",
  img: "assets/cloths/noir-rich.png",
  price: "from $120 / day",
  bg: "#1C1610"
}];
const SQ_HERO_DUR = 650; // master transition
const SQ_HERO_AUTO = 6000; // auto-advance

/* Per-role transform recipe (relative offset from the active slide). */
const SQ_ROLES = {
  center: {
    x: 0,
    y: 0,
    s: 1.36,
    blur: 0,
    op: 1,
    z: 6,
    shadow: 30
  },
  right: {
    x: 320,
    y: 26,
    s: 0.78,
    blur: 2,
    op: 0.8,
    z: 4,
    shadow: 18
  },
  left: {
    x: -320,
    y: 26,
    s: 0.78,
    blur: 2,
    op: 0.8,
    z: 4,
    shadow: 18
  },
  back: {
    x: 0,
    y: -34,
    s: 0.58,
    blur: 4,
    op: 0.42,
    z: 2,
    shadow: 12
  },
  hidden: {
    x: 0,
    y: 30,
    s: 0.5,
    blur: 6,
    op: 0,
    z: 1,
    shadow: 0
  }
};
function Hero({
  onShop
}) {
  const {
    useState,
    useEffect,
    useRef,
    useCallback
  } = React;
  const n = SQ_HERO_SLIDES.length;
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const lockRef = useRef(false);
  const goTo = useCallback(i => {
    if (lockRef.current) return; // lock during the 650ms transition
    lockRef.current = true;
    setActive((i % n + n) % n);
    setTimeout(() => {
      lockRef.current = false;
    }, SQ_HERO_DUR);
  }, [n]);
  const next = useCallback(() => goTo(active + 1), [goTo, active]);
  const prev = useCallback(() => goTo(active - 1), [goTo, active]);

  // auto-advance (respects reduced-motion + pause)
  useEffect(() => {
    if (paused) return undefined;
    const rm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (rm) return undefined;
    const id = setTimeout(() => setActive(a => (a + 1) % n), SQ_HERO_AUTO);
    return () => clearTimeout(id);
  }, [active, paused, n]);

  // keyboard nav
  useEffect(() => {
    const onKey = e => {
      if (e.key === "ArrowRight") next();else if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);
  useEffect(() => {
    window.lucide && window.lucide.createIcons();
  }, [active]);
  const cur = SQ_HERO_SLIDES[active];
  const roleFor = offset => {
    if (offset === 0) return SQ_ROLES.center;
    if (offset === 1) return SQ_ROLES.right;
    if (offset === n - 1) return SQ_ROLES.left;
    if (offset === 2) return SQ_ROLES.back;
    return SQ_ROLES.hidden;
  };
  return /*#__PURE__*/React.createElement("section", {
    "data-theme": "noir",
    className: "sq-hero2 grain" + (paused ? " is-paused" : ""),
    style: {
      ...h2.wrap,
      backgroundColor: cur.bg
    },
    onMouseEnter: () => setPaused(true),
    onMouseLeave: () => setPaused(false),
    onFocusCapture: () => setPaused(true),
    onBlurCapture: () => setPaused(false),
    "aria-roledescription": "carousel",
    "aria-label": "Featured tablecloth collections"
  }, /*#__PURE__*/React.createElement("style", null, `
        .sq-hero2 { --sq-cloth-w: 440px; }
        @keyframes sqGhostIn { from { opacity: 0; transform: translate(-50%, calc(-50% + 26px)); } to { opacity: .9; transform: translate(-50%, -50%); } }
        @keyframes sqBounce { 0%,100% { transform: translateY(0); } 50% { transform: translateY(6px); } }
        .sq-cloth { transition: transform ${SQ_HERO_DUR}ms cubic-bezier(.4,0,.2,1),
            opacity ${SQ_HERO_DUR}ms cubic-bezier(.4,0,.2,1),
            filter ${SQ_HERO_DUR}ms cubic-bezier(.4,0,.2,1); }
        .sq-ghost { animation: sqGhostIn ${SQ_HERO_DUR}ms cubic-bezier(.4,0,.2,1) both; }
        .sq-cta-arrow { transition: background .3s ease, border-color .3s ease, transform .3s ease, color .3s ease; }
        .sq-cta-gold { transition: filter .3s ease, transform .3s ease, box-shadow .3s ease; }
        .sq-cta-gold:hover { transform: translateY(-2px); box-shadow: 0 10px 28px rgba(216,180,132,.30); filter: brightness(1.04); }
        .sq-cta-out { transition: background .3s ease, border-color .3s ease, transform .3s ease; }
        .sq-cta-out:hover { background: rgba(216,180,132,.10); border-color: var(--gold); transform: translateY(-2px); }
        .sq-narrow { transition: background .3s ease, border-color .3s ease, transform .3s ease; }
        .sq-narrow:hover { background: rgba(216,180,132,.12); border-color: var(--gold); transform: translateY(-1px); }
        .sq-scroll { animation: sqBounce 2.4s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .sq-cloth { transition: opacity 200ms linear; }
          .sq-ghost { animation: none; opacity: .9; }
          .sq-scroll { animation: none; }
        }
        @media (max-width: 1024px) { .sq-hero2 { --sq-cloth-w: 360px; } }
        @media (max-width: 640px) {
          .sq-hero2 { --sq-cloth-w: 260px; }
          .sq-hero2 .sq-cloth[data-role="left"],
          .sq-hero2 .sq-cloth[data-role="right"],
          .sq-hero2 .sq-cloth[data-role="back"] { opacity: 0 !important; }
          .sq-hero2 .sq-headline { font-size: 30px !important; }
          .sq-hero2 .sq-cta-out { display: none !important; }
          .sq-hero2 .sq-pricetag { display: none !important; }
        }
      `), /*#__PURE__*/React.createElement("h2", {
    key: active,
    className: "sq-ghost",
    style: h2.ghost
  }, cur.name), /*#__PURE__*/React.createElement("div", {
    style: h2.stage,
    "aria-hidden": "false"
  }, SQ_HERO_SLIDES.map((s, i) => {
    const offset = ((i - active) % n + n) % n;
    const r = roleFor(offset);
    const roleName = offset === 0 ? "center" : offset === 1 ? "right" : offset === n - 1 ? "left" : offset === 2 ? "back" : "hidden";
    return /*#__PURE__*/React.createElement("img", {
      key: s.img,
      src: s.img,
      alt: offset === 0 ? `${s.name} draped tablecloth` : "",
      className: "sq-cloth",
      "data-role": roleName,
      style: {
        position: "absolute",
        left: "50%",
        bottom: -34,
        width: "var(--sq-cloth-w)",
        height: "auto",
        transformOrigin: "bottom center",
        transform: `translateX(calc(-50% + ${r.x}px)) translateY(${r.y}px) scale(${r.s})`,
        opacity: r.op,
        zIndex: r.z,
        filter: `drop-shadow(0 ${r.shadow}px ${r.shadow}px rgba(0,0,0,.55)) blur(${r.blur}px)`,
        pointerEvents: "none",
        userSelect: "none"
      }
    });
  })), /*#__PURE__*/React.createElement("div", {
    style: h2.eyebrow
  }, "Events & Home \xB7 Brooklyn"), /*#__PURE__*/React.createElement("div", {
    style: h2.block
  }, /*#__PURE__*/React.createElement("h1", {
    className: "sq-headline",
    style: h2.headline
  }, "Upscale Table Linen for ", /*#__PURE__*/React.createElement("span", {
    style: {
      fontStyle: "italic",
      color: "var(--gold)"
    }
  }, "Every"), " Celebration"), /*#__PURE__*/React.createElement("p", {
    style: h2.sub
  }, "Linens to rent for the occasion \u2014 or own for always."), /*#__PURE__*/React.createElement("div", {
    style: h2.cta
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "sq-cta-gold",
    style: h2.ctaGold,
    onClick: () => onShop && onShop("rental")
  }, "Explore Rentals"), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "sq-cta-out",
    style: h2.ctaOut,
    onClick: () => onShop && onShop("home")
  }, "Shop Home ", /*#__PURE__*/React.createElement("i", {
    "data-lucide": "arrow-right",
    style: {
      width: 15,
      height: 15
    }
  })))), /*#__PURE__*/React.createElement("div", {
    style: h2.navWrap
  }, /*#__PURE__*/React.createElement("span", {
    className: "sq-pricetag",
    style: h2.priceTag
  }, cur.price), /*#__PURE__*/React.createElement("button", {
    type: "button",
    "aria-label": "Previous collection",
    className: "sq-narrow",
    style: h2.narrow,
    onClick: prev
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "arrow-left",
    style: {
      width: 16,
      height: 16
    }
  })), /*#__PURE__*/React.createElement("button", {
    type: "button",
    "aria-label": "Next collection",
    className: "sq-narrow",
    style: h2.narrow,
    onClick: next
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "arrow-right",
    style: {
      width: 16,
      height: 16
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: h2.counter
  }, String(active + 1).padStart(2, "0"), /*#__PURE__*/React.createElement("span", {
    style: {
      opacity: .5
    }
  }, " / ", String(n).padStart(2, "0")))), /*#__PURE__*/React.createElement("div", {
    style: h2.scrollWrap,
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("span", {
    style: h2.scrollTxt
  }, "Scroll"), /*#__PURE__*/React.createElement("i", {
    "data-lucide": "chevron-down",
    className: "sq-scroll",
    style: {
      width: 18,
      height: 18,
      color: "var(--gold-300)"
    }
  })));
}
const IVORY = "#FBF6EF";
const h2 = {
  wrap: {
    position: "relative",
    minHeight: "92vh",
    overflow: "hidden",
    transition: `background-color ${SQ_HERO_DUR}ms cubic-bezier(.4,0,.2,1)`,
    backgroundColor: "#1F3D2C",
    isolation: "isolate"
  },
  ghost: {
    position: "absolute",
    left: "50%",
    top: "42%",
    transform: "translate(-50%, -50%)",
    margin: 0,
    zIndex: 1,
    fontFamily: "'Audrey', 'Playfair Display', 'Cormorant Garamond', Georgia, serif",
    fontWeight: 500,
    fontSize: "clamp(64px, 22vw, 300px)",
    lineHeight: 1,
    letterSpacing: "-0.02em",
    textTransform: "uppercase",
    color: "#F7F2EA",
    opacity: 0.9,
    whiteSpace: "nowrap",
    pointerEvents: "none",
    userSelect: "none"
  },
  stage: {
    position: "absolute",
    inset: 0,
    zIndex: 2
  },
  eyebrow: {
    position: "absolute",
    top: 34,
    left: 48,
    zIndex: 10,
    fontFamily: "var(--font-ui)",
    fontSize: 10,
    fontWeight: 500,
    letterSpacing: "0.4em",
    textTransform: "uppercase",
    color: "#BE9A6E"
  },
  block: {
    position: "absolute",
    left: 48,
    bottom: 56,
    zIndex: 10,
    maxWidth: 480
  },
  headline: {
    fontFamily: "var(--font-display)",
    fontWeight: 500,
    fontSize: 42,
    lineHeight: 1.08,
    letterSpacing: "0",
    color: IVORY,
    margin: "0 0 14px"
  },
  sub: {
    fontFamily: "var(--font-ui)",
    fontSize: 13,
    lineHeight: 1.6,
    color: "#B6A88F",
    margin: "0 0 24px"
  },
  cta: {
    display: "flex",
    gap: 14,
    flexWrap: "wrap",
    alignItems: "center"
  },
  ctaGold: {
    display: "inline-flex",
    alignItems: "center",
    gap: ".5em",
    background: "var(--gold)",
    color: "#221A12",
    fontFamily: "var(--font-ui)",
    fontWeight: 600,
    fontSize: 12.5,
    letterSpacing: "0.16em",
    textTransform: "uppercase",
    padding: "14px 28px",
    border: "1px solid transparent",
    borderRadius: "12px 0 12px 0",
    cursor: "pointer",
    whiteSpace: "nowrap"
  },
  ctaOut: {
    display: "inline-flex",
    alignItems: "center",
    gap: ".55em",
    background: "transparent",
    color: IVORY,
    fontFamily: "var(--font-ui)",
    fontWeight: 500,
    fontSize: 12.5,
    letterSpacing: "0.16em",
    textTransform: "uppercase",
    padding: "14px 26px",
    border: "1px solid rgba(216,180,132,.55)",
    borderRadius: "12px 0 12px 0",
    cursor: "pointer",
    whiteSpace: "nowrap"
  },
  navWrap: {
    position: "absolute",
    right: 48,
    bottom: 56,
    zIndex: 10,
    display: "flex",
    alignItems: "center",
    gap: 14
  },
  priceTag: {
    fontFamily: "var(--font-ui)",
    fontSize: 11,
    letterSpacing: "0.08em",
    color: "#9A8A75",
    marginRight: 4,
    whiteSpace: "nowrap"
  },
  narrow: {
    width: 42,
    height: 42,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "999px",
    background: "transparent",
    border: "1px solid rgba(216,180,132,.5)",
    color: IVORY,
    cursor: "pointer"
  },
  counter: {
    fontFamily: "var(--font-ui)",
    fontSize: 13,
    fontWeight: 500,
    letterSpacing: "0.18em",
    color: "var(--gold)",
    minWidth: 58,
    textAlign: "right"
  },
  scrollWrap: {
    position: "absolute",
    left: "50%",
    bottom: 26,
    transform: "translateX(-50%)",
    zIndex: 10,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 6
  },
  scrollTxt: {
    fontFamily: "var(--font-ui)",
    fontSize: 9.5,
    fontWeight: 500,
    letterSpacing: "0.34em",
    textTransform: "uppercase",
    color: "#9A8A75"
  }
};
window.SequinHero = Hero;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/storefront/Hero.jsx", error: String((e && e.message) || e) }); }

// ui_kits/storefront/Process.jsx
try { (() => {
/* Sequin storefront — §5 Our Process (espresso lane, editorial numerals) */

function Process() {
  const {
    useEffect,
    useRef
  } = React;
  const ref = useRef(null);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        [...e.target.querySelectorAll(".sq-rv")].forEach((el, i) => {
          el.style.transitionDelay = i * 90 + "ms";
          el.classList.add("sq-show");
        });
      });
    }, {
      threshold: 0.1
    });
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  const steps = [{
    num: "01",
    title: "Curate.",
    body: "Cloths sourced and selected with intention — every weave, weight and colour chosen by hand."
  }, {
    num: "02",
    title: "Press.",
    body: "Hand-finished in-house, Brooklyn. Each piece arrives crisp, clean and ready to lay."
  }, {
    num: "03",
    title: "Deliver.",
    body: "Wrapped and delivered to your door, ready to dress your table exactly as imagined."
  }, {
    num: "04",
    title: "Return.",
    body: "For rentals — collected, cleaned, repeated. Effortless from beginning to end."
  }];
  return /*#__PURE__*/React.createElement("section", {
    ref: ref,
    style: procS.wrap,
    "data-theme": "noir"
  }, /*#__PURE__*/React.createElement("style", null, `
        @media (max-width:1024px) { .sq-proc-grid { grid-template-columns: repeat(2,1fr) !important; } }
        @media (max-width:640px)  { .sq-proc-grid { grid-template-columns: 1fr !important; } }
      `), /*#__PURE__*/React.createElement("div", {
    style: procS.inner
  }, /*#__PURE__*/React.createElement("div", {
    style: procS.intro
  }, /*#__PURE__*/React.createElement("span", {
    className: "sq-rv",
    style: procS.eyebrow
  }, "( Our Process )"), /*#__PURE__*/React.createElement("h2", {
    className: "sq-rv",
    style: procS.headline
  }, "From our studio to", " ", /*#__PURE__*/React.createElement("em", {
    style: {
      fontStyle: "italic",
      color: "#BE9A6E"
    }
  }, "your"), " table."), /*#__PURE__*/React.createElement("div", {
    className: "sq-rv",
    style: procS.rule
  })), /*#__PURE__*/React.createElement("div", {
    className: "sq-proc-grid",
    style: procS.grid
  }, steps.map(s => /*#__PURE__*/React.createElement("div", {
    key: s.num,
    className: "sq-rv",
    style: procS.step
  }, /*#__PURE__*/React.createElement("span", {
    style: procS.numeral
  }, s.num), /*#__PURE__*/React.createElement("div", {
    style: procS.stepContent
  }, /*#__PURE__*/React.createElement("h3", {
    style: procS.stepTitle
  }, s.title), /*#__PURE__*/React.createElement("p", {
    style: procS.stepBody
  }, s.body)))))));
}
const procS = {
  wrap: {
    background: "#221A12",
    padding: "104px 44px"
  },
  inner: {
    maxWidth: 1240,
    margin: "0 auto"
  },
  intro: {
    marginBottom: 72,
    display: "flex",
    flexDirection: "column",
    gap: 22
  },
  eyebrow: {
    fontFamily: "var(--font-ui)",
    fontSize: 10,
    fontWeight: 500,
    letterSpacing: "0.4em",
    textTransform: "uppercase",
    color: "#BE9A6E",
    display: "block"
  },
  headline: {
    fontFamily: "'Audrey','Playfair Display','Cormorant Garamond',Georgia,serif",
    fontWeight: 500,
    fontSize: "clamp(32px,3.5vw,44px)",
    lineHeight: 1.1,
    color: "#FBF6EF",
    margin: 0,
    maxWidth: "22ch"
  },
  rule: {
    width: "100%",
    height: 1,
    background: "rgba(190,154,110,.25)"
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(4,1fr)",
    gap: 44
  },
  step: {
    display: "flex",
    flexDirection: "column",
    gap: 20
  },
  numeral: {
    fontFamily: "'Audrey','Playfair Display','Cormorant Garamond',Georgia,serif",
    fontWeight: 500,
    fontSize: 96,
    lineHeight: 1,
    letterSpacing: "-0.04em",
    color: "#BE9A6E",
    opacity: 0.48,
    display: "block"
  },
  stepContent: {
    display: "flex",
    flexDirection: "column",
    gap: 10
  },
  stepTitle: {
    fontFamily: "'Audrey','Playfair Display','Cormorant Garamond',Georgia,serif",
    fontWeight: 500,
    fontStyle: "italic",
    fontSize: 24,
    color: "#FBF6EF",
    margin: 0
  },
  stepBody: {
    fontFamily: "var(--font-ui)",
    fontSize: 14,
    lineHeight: 1.72,
    color: "#9A8A75",
    margin: 0
  }
};
window.SequinProcess = Process;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/storefront/Process.jsx", error: String((e && e.message) || e) }); }

// ui_kits/storefront/Testimonials.jsx
try { (() => {
/* Sequin storefront — §6 Testimonials (diagonal-corner cards + closing statement) */

function Testimonials() {
  const {
    useEffect,
    useRef
  } = React;
  const ref = useRef(null);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        [...e.target.querySelectorAll(".sq-rv")].forEach((el, i) => {
          el.style.transitionDelay = i * 100 + "ms";
          el.classList.add("sq-show");
        });
      });
    }, {
      threshold: 0.1
    });
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  const quotes = [{
    q: "Sequin made our wedding feel finished. The linens were the first thing every guest commented on.",
    name: "Margot L.",
    role: "Married in Brooklyn, Oct 2025"
  }, {
    q: "The quality is extraordinary. We rented for a dinner party and ended up buying the runner the next week.",
    name: "James & Vera T.",
    role: "Home clients, Williamsburg"
  }, {
    q: "Impeccable service, beautifully pressed. Everything arrived on time and looked even better in person.",
    name: "Claire D.",
    role: "Event planner, New York"
  }];
  return /*#__PURE__*/React.createElement("section", {
    ref: ref,
    style: testS.wrap
  }, /*#__PURE__*/React.createElement("style", null, `
        @media (max-width:900px) { .sq-test-grid { grid-template-columns: 1fr !important; } }
      `), /*#__PURE__*/React.createElement("div", {
    style: testS.inner
  }, /*#__PURE__*/React.createElement("span", {
    className: "sq-rv",
    style: testS.eyebrow
  }, "( In Good Company )"), /*#__PURE__*/React.createElement("div", {
    className: "sq-test-grid",
    style: testS.grid
  }, quotes.map((t, i) => /*#__PURE__*/React.createElement("blockquote", {
    key: i,
    className: "sq-rv",
    style: testS.card
  }, /*#__PURE__*/React.createElement("p", {
    style: testS.quote
  }, "\u201C", t.q, "\u201D"), /*#__PURE__*/React.createElement("div", {
    style: testS.rule
  }), /*#__PURE__*/React.createElement("footer", null, /*#__PURE__*/React.createElement("span", {
    style: testS.name
  }, t.name), /*#__PURE__*/React.createElement("span", {
    style: testS.role
  }, t.role))))), /*#__PURE__*/React.createElement("p", {
    className: "sq-rv",
    style: testS.closing
  }, /*#__PURE__*/React.createElement("em", null, "A table is the first thing a guest remembers."))));
}
const testS = {
  wrap: {
    background: "#F7F2EA",
    padding: "104px 44px"
  },
  inner: {
    maxWidth: 1240,
    margin: "0 auto"
  },
  eyebrow: {
    fontFamily: "var(--font-ui)",
    fontSize: 10,
    fontWeight: 500,
    letterSpacing: "0.4em",
    textTransform: "uppercase",
    color: "#BE9A6E",
    display: "block",
    marginBottom: 52
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(3,1fr)",
    gap: 28
  },
  card: {
    background: "#FBF6EF",
    borderRadius: "20px 0 20px 0",
    border: "1px solid #C8B7A0",
    padding: "36px 36px 32px",
    display: "flex",
    flexDirection: "column",
    gap: 20,
    margin: 0
  },
  quote: {
    fontFamily: "'Audrey','Playfair Display','Cormorant Garamond',Georgia,serif",
    fontStyle: "italic",
    fontWeight: 400,
    fontSize: 22,
    lineHeight: 1.46,
    color: "#221A12",
    margin: 0,
    flex: 1
  },
  rule: {
    width: 32,
    height: 1,
    background: "#BE9A6E",
    flexShrink: 0
  },
  name: {
    display: "block",
    fontFamily: "var(--font-ui)",
    fontSize: 13,
    fontWeight: 500,
    letterSpacing: "0.08em",
    color: "#221A12"
  },
  role: {
    display: "block",
    fontFamily: "var(--font-ui)",
    fontSize: 12,
    color: "#9A8A75",
    marginTop: 3
  },
  closing: {
    textAlign: "center",
    fontFamily: "'Audrey','Playfair Display','Cormorant Garamond',Georgia,serif",
    fontStyle: "italic",
    fontWeight: 400,
    fontSize: 22,
    color: "#221A12",
    marginTop: 72,
    marginBottom: 0
  }
};
window.SequinTestimonials = Testimonials;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/storefront/Testimonials.jsx", error: String((e && e.message) || e) }); }

// ui_kits/storefront/tweaks-panel.jsx
try { (() => {
// @ds-adherence-ignore -- omelette starter scaffold (raw elements/hex/px by design)

/* BEGIN USAGE */
// tweaks-panel.jsx
// Reusable Tweaks shell + form-control helpers.
// Exports (to window): useTweaks, TweaksPanel, TweakSection, TweakRow, TweakSlider,
//   TweakToggle, TweakRadio, TweakSelect, TweakText, TweakNumber, TweakColor, TweakButton.
//
// Owns the host protocol (listens for __activate_edit_mode / __deactivate_edit_mode,
// posts __edit_mode_available / __edit_mode_set_keys / __edit_mode_dismissed) so
// individual prototypes don't re-roll it. Ships a consistent set of controls so you
// don't hand-draw <input type="range">, segmented radios, steppers, etc.
//
// Usage (in an HTML file that loads React + Babel):
//
//   const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
//     "primaryColor": "#D97757",
//     "palette": ["#D97757", "#29261b", "#f6f4ef"],
//     "fontSize": 16,
//     "density": "regular",
//     "dark": false
//   }/*EDITMODE-END*/;
//
//   function App() {
//     const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
//     return (
//       <div style={{ fontSize: t.fontSize, color: t.primaryColor }}>
//         Hello
//         <TweaksPanel>
//           <TweakSection label="Typography" />
//           <TweakSlider label="Font size" value={t.fontSize} min={10} max={32} unit="px"
//                        onChange={(v) => setTweak('fontSize', v)} />
//           <TweakRadio  label="Density" value={t.density}
//                        options={['compact', 'regular', 'comfy']}
//                        onChange={(v) => setTweak('density', v)} />
//           <TweakSection label="Theme" />
//           <TweakColor  label="Primary" value={t.primaryColor}
//                        options={['#D97757', '#2A6FDB', '#1F8A5B', '#7A5AE0']}
//                        onChange={(v) => setTweak('primaryColor', v)} />
//           <TweakColor  label="Palette" value={t.palette}
//                        options={[['#D97757', '#29261b', '#f6f4ef'],
//                                  ['#475569', '#0f172a', '#f1f5f9']]}
//                        onChange={(v) => setTweak('palette', v)} />
//           <TweakToggle label="Dark mode" value={t.dark}
//                        onChange={(v) => setTweak('dark', v)} />
//         </TweaksPanel>
//       </div>
//     );
//   }
//
// TweakRadio is the segmented control for 2–3 short options (auto-falls-back to
// TweakSelect past ~16/~10 chars per label); reach for TweakSelect directly when
// options are many or long. For color tweaks always curate 3-4 options rather than
// a free picker; an option can also be a whole 2–5 color palette (the stored value
// is the array). The Tweak* controls are a floor, not a ceiling — build custom
// controls inside the panel if a tweak calls for UI they don't cover.
/* END USAGE */
// ─────────────────────────────────────────────────────────────────────────────

const __TWEAKS_STYLE = `
  .twk-panel{position:fixed;right:16px;bottom:16px;z-index:2147483646;width:280px;
    max-height:calc(100vh - 32px);display:flex;flex-direction:column;
    transform:scale(var(--dc-inv-zoom,1));transform-origin:bottom right;
    background:rgba(250,249,247,.78);color:#29261b;
    -webkit-backdrop-filter:blur(24px) saturate(160%);backdrop-filter:blur(24px) saturate(160%);
    border:.5px solid rgba(255,255,255,.6);border-radius:14px;
    box-shadow:0 1px 0 rgba(255,255,255,.5) inset,0 12px 40px rgba(0,0,0,.18);
    font:11.5px/1.4 ui-sans-serif,system-ui,-apple-system,sans-serif;overflow:hidden}
  .twk-hd{display:flex;align-items:center;justify-content:space-between;
    padding:10px 8px 10px 14px;cursor:move;user-select:none}
  .twk-hd b{font-size:12px;font-weight:600;letter-spacing:.01em}
  .twk-x{appearance:none;border:0;background:transparent;color:rgba(41,38,27,.55);
    width:22px;height:22px;border-radius:6px;cursor:default;font-size:13px;line-height:1}
  .twk-x:hover{background:rgba(0,0,0,.06);color:#29261b}
  .twk-body{padding:2px 14px 14px;display:flex;flex-direction:column;gap:10px;
    overflow-y:auto;overflow-x:hidden;min-height:0;
    scrollbar-width:thin;scrollbar-color:rgba(0,0,0,.15) transparent}
  .twk-body::-webkit-scrollbar{width:8px}
  .twk-body::-webkit-scrollbar-track{background:transparent;margin:2px}
  .twk-body::-webkit-scrollbar-thumb{background:rgba(0,0,0,.15);border-radius:4px;
    border:2px solid transparent;background-clip:content-box}
  .twk-body::-webkit-scrollbar-thumb:hover{background:rgba(0,0,0,.25);
    border:2px solid transparent;background-clip:content-box}
  .twk-row{display:flex;flex-direction:column;gap:5px}
  .twk-row-h{flex-direction:row;align-items:center;justify-content:space-between;gap:10px}
  .twk-lbl{display:flex;justify-content:space-between;align-items:baseline;
    color:rgba(41,38,27,.72)}
  .twk-lbl>span:first-child{font-weight:500}
  .twk-val{color:rgba(41,38,27,.5);font-variant-numeric:tabular-nums}

  .twk-sect{font-size:10px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;
    color:rgba(41,38,27,.45);padding:10px 0 0}
  .twk-sect:first-child{padding-top:0}

  .twk-field{appearance:none;box-sizing:border-box;width:100%;min-width:0;height:26px;padding:0 8px;
    border:.5px solid rgba(0,0,0,.1);border-radius:7px;
    background:rgba(255,255,255,.6);color:inherit;font:inherit;outline:none}
  .twk-field:focus{border-color:rgba(0,0,0,.25);background:rgba(255,255,255,.85)}
  select.twk-field{padding-right:22px;
    background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'><path fill='rgba(0,0,0,.5)' d='M0 0h10L5 6z'/></svg>");
    background-repeat:no-repeat;background-position:right 8px center}

  .twk-slider{appearance:none;-webkit-appearance:none;width:100%;height:4px;margin:6px 0;
    border-radius:999px;background:rgba(0,0,0,.12);outline:none}
  .twk-slider::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;
    width:14px;height:14px;border-radius:50%;background:#fff;
    border:.5px solid rgba(0,0,0,.12);box-shadow:0 1px 3px rgba(0,0,0,.2);cursor:default}
  .twk-slider::-moz-range-thumb{width:14px;height:14px;border-radius:50%;
    background:#fff;border:.5px solid rgba(0,0,0,.12);box-shadow:0 1px 3px rgba(0,0,0,.2);cursor:default}

  .twk-seg{position:relative;display:flex;padding:2px;border-radius:8px;
    background:rgba(0,0,0,.06);user-select:none}
  .twk-seg-thumb{position:absolute;top:2px;bottom:2px;border-radius:6px;
    background:rgba(255,255,255,.9);box-shadow:0 1px 2px rgba(0,0,0,.12);
    transition:left .15s cubic-bezier(.3,.7,.4,1),width .15s}
  .twk-seg.dragging .twk-seg-thumb{transition:none}
  .twk-seg button{appearance:none;position:relative;z-index:1;flex:1;border:0;
    background:transparent;color:inherit;font:inherit;font-weight:500;min-height:22px;
    border-radius:6px;cursor:default;padding:4px 6px;line-height:1.2;
    overflow-wrap:anywhere}

  .twk-toggle{position:relative;width:32px;height:18px;border:0;border-radius:999px;
    background:rgba(0,0,0,.15);transition:background .15s;cursor:default;padding:0}
  .twk-toggle[data-on="1"]{background:#34c759}
  .twk-toggle i{position:absolute;top:2px;left:2px;width:14px;height:14px;border-radius:50%;
    background:#fff;box-shadow:0 1px 2px rgba(0,0,0,.25);transition:transform .15s}
  .twk-toggle[data-on="1"] i{transform:translateX(14px)}

  .twk-num{display:flex;align-items:center;box-sizing:border-box;min-width:0;height:26px;padding:0 0 0 8px;
    border:.5px solid rgba(0,0,0,.1);border-radius:7px;background:rgba(255,255,255,.6)}
  .twk-num-lbl{font-weight:500;color:rgba(41,38,27,.6);cursor:ew-resize;
    user-select:none;padding-right:8px}
  .twk-num input{flex:1;min-width:0;height:100%;border:0;background:transparent;
    font:inherit;font-variant-numeric:tabular-nums;text-align:right;padding:0 8px 0 0;
    outline:none;color:inherit;-moz-appearance:textfield}
  .twk-num input::-webkit-inner-spin-button,.twk-num input::-webkit-outer-spin-button{
    -webkit-appearance:none;margin:0}
  .twk-num-unit{padding-right:8px;color:rgba(41,38,27,.45)}

  .twk-btn{appearance:none;height:26px;padding:0 12px;border:0;border-radius:7px;
    background:rgba(0,0,0,.78);color:#fff;font:inherit;font-weight:500;cursor:default}
  .twk-btn:hover{background:rgba(0,0,0,.88)}
  .twk-btn.secondary{background:rgba(0,0,0,.06);color:inherit}
  .twk-btn.secondary:hover{background:rgba(0,0,0,.1)}

  .twk-swatch{appearance:none;-webkit-appearance:none;width:56px;height:22px;
    border:.5px solid rgba(0,0,0,.1);border-radius:6px;padding:0;cursor:default;
    background:transparent;flex-shrink:0}
  .twk-swatch::-webkit-color-swatch-wrapper{padding:0}
  .twk-swatch::-webkit-color-swatch{border:0;border-radius:5.5px}
  .twk-swatch::-moz-color-swatch{border:0;border-radius:5.5px}

  .twk-chips{display:flex;gap:6px}
  .twk-chip{position:relative;appearance:none;flex:1;min-width:0;height:46px;
    padding:0;border:0;border-radius:6px;overflow:hidden;cursor:default;
    box-shadow:0 0 0 .5px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.06);
    transition:transform .12s cubic-bezier(.3,.7,.4,1),box-shadow .12s}
  .twk-chip:hover{transform:translateY(-1px);
    box-shadow:0 0 0 .5px rgba(0,0,0,.18),0 4px 10px rgba(0,0,0,.12)}
  .twk-chip[data-on="1"]{box-shadow:0 0 0 1.5px rgba(0,0,0,.85),
    0 2px 6px rgba(0,0,0,.15)}
  .twk-chip>span{position:absolute;top:0;bottom:0;right:0;width:34%;
    display:flex;flex-direction:column;box-shadow:-1px 0 0 rgba(0,0,0,.1)}
  .twk-chip>span>i{flex:1;box-shadow:0 -1px 0 rgba(0,0,0,.1)}
  .twk-chip>span>i:first-child{box-shadow:none}
  .twk-chip svg{position:absolute;top:6px;left:6px;width:13px;height:13px;
    filter:drop-shadow(0 1px 1px rgba(0,0,0,.3))}
`;

// ── useTweaks ───────────────────────────────────────────────────────────────
// Single source of truth for tweak values. setTweak persists via the host
// (__edit_mode_set_keys → host rewrites the EDITMODE block on disk).
function useTweaks(defaults) {
  const [values, setValues] = React.useState(defaults);
  // Accepts either setTweak('key', value) or setTweak({ key: value, ... }) so a
  // useState-style call doesn't write a "[object Object]" key into the persisted
  // JSON block.
  const setTweak = React.useCallback((keyOrEdits, val) => {
    const edits = typeof keyOrEdits === 'object' && keyOrEdits !== null ? keyOrEdits : {
      [keyOrEdits]: val
    };
    setValues(prev => ({
      ...prev,
      ...edits
    }));
    window.parent.postMessage({
      type: '__edit_mode_set_keys',
      edits
    }, '*');
    // Same-window signal so in-page listeners (deck-stage rail thumbnails)
    // can react — the parent message only reaches the host, not peers.
    window.dispatchEvent(new CustomEvent('tweakchange', {
      detail: edits
    }));
  }, []);
  return [values, setTweak];
}

// ── TweaksPanel ─────────────────────────────────────────────────────────────
// Floating shell. Registers the protocol listener BEFORE announcing
// availability — if the announce ran first, the host's activate could land
// before our handler exists and the toolbar toggle would silently no-op.
// The close button posts __edit_mode_dismissed so the host's toolbar toggle
// flips off in lockstep; the host echoes __deactivate_edit_mode back which
// is what actually hides the panel.
function TweaksPanel({
  title = 'Tweaks',
  children
}) {
  const [open, setOpen] = React.useState(false);
  const dragRef = React.useRef(null);
  const offsetRef = React.useRef({
    x: 16,
    y: 16
  });
  const PAD = 16;
  const clampToViewport = React.useCallback(() => {
    const panel = dragRef.current;
    if (!panel) return;
    const w = panel.offsetWidth,
      h = panel.offsetHeight;
    const maxRight = Math.max(PAD, window.innerWidth - w - PAD);
    const maxBottom = Math.max(PAD, window.innerHeight - h - PAD);
    offsetRef.current = {
      x: Math.min(maxRight, Math.max(PAD, offsetRef.current.x)),
      y: Math.min(maxBottom, Math.max(PAD, offsetRef.current.y))
    };
    panel.style.right = offsetRef.current.x + 'px';
    panel.style.bottom = offsetRef.current.y + 'px';
  }, []);
  React.useEffect(() => {
    if (!open) return;
    clampToViewport();
    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', clampToViewport);
      return () => window.removeEventListener('resize', clampToViewport);
    }
    const ro = new ResizeObserver(clampToViewport);
    ro.observe(document.documentElement);
    return () => ro.disconnect();
  }, [open, clampToViewport]);
  React.useEffect(() => {
    const onMsg = e => {
      const t = e?.data?.type;
      if (t === '__activate_edit_mode') setOpen(true);else if (t === '__deactivate_edit_mode') setOpen(false);
    };
    window.addEventListener('message', onMsg);
    window.parent.postMessage({
      type: '__edit_mode_available'
    }, '*');
    return () => window.removeEventListener('message', onMsg);
  }, []);
  const dismiss = () => {
    setOpen(false);
    window.parent.postMessage({
      type: '__edit_mode_dismissed'
    }, '*');
  };
  const onDragStart = e => {
    const panel = dragRef.current;
    if (!panel) return;
    const r = panel.getBoundingClientRect();
    const sx = e.clientX,
      sy = e.clientY;
    const startRight = window.innerWidth - r.right;
    const startBottom = window.innerHeight - r.bottom;
    const move = ev => {
      offsetRef.current = {
        x: startRight - (ev.clientX - sx),
        y: startBottom - (ev.clientY - sy)
      };
      clampToViewport();
    };
    const up = () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseup', up);
    };
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', up);
  };
  if (!open) return null;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("style", null, __TWEAKS_STYLE), /*#__PURE__*/React.createElement("div", {
    ref: dragRef,
    className: "twk-panel",
    "data-omelette-chrome": "",
    style: {
      right: offsetRef.current.x,
      bottom: offsetRef.current.y
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-hd",
    onMouseDown: onDragStart
  }, /*#__PURE__*/React.createElement("b", null, title), /*#__PURE__*/React.createElement("button", {
    className: "twk-x",
    "aria-label": "Close tweaks",
    onMouseDown: e => e.stopPropagation(),
    onClick: dismiss
  }, "\u2715")), /*#__PURE__*/React.createElement("div", {
    className: "twk-body"
  }, children)));
}

// ── Layout helpers ──────────────────────────────────────────────────────────

function TweakSection({
  label,
  children
}) {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "twk-sect"
  }, label), children);
}
function TweakRow({
  label,
  value,
  children,
  inline = false
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: inline ? 'twk-row twk-row-h' : 'twk-row'
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-lbl"
  }, /*#__PURE__*/React.createElement("span", null, label), value != null && /*#__PURE__*/React.createElement("span", {
    className: "twk-val"
  }, value)), children);
}

// ── Controls ────────────────────────────────────────────────────────────────

function TweakSlider({
  label,
  value,
  min = 0,
  max = 100,
  step = 1,
  unit = '',
  onChange
}) {
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label,
    value: `${value}${unit}`
  }, /*#__PURE__*/React.createElement("input", {
    type: "range",
    className: "twk-slider",
    min: min,
    max: max,
    step: step,
    value: value,
    onChange: e => onChange(Number(e.target.value))
  }));
}
function TweakToggle({
  label,
  value,
  onChange
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "twk-row twk-row-h"
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-lbl"
  }, /*#__PURE__*/React.createElement("span", null, label)), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "twk-toggle",
    "data-on": value ? '1' : '0',
    role: "switch",
    "aria-checked": !!value,
    onClick: () => onChange(!value)
  }, /*#__PURE__*/React.createElement("i", null)));
}
function TweakRadio({
  label,
  value,
  options,
  onChange
}) {
  const trackRef = React.useRef(null);
  const [dragging, setDragging] = React.useState(false);
  // The active value is read by pointer-move handlers attached for the lifetime
  // of a drag — ref it so a stale closure doesn't fire onChange for every move.
  const valueRef = React.useRef(value);
  valueRef.current = value;

  // Segments wrap mid-word once per-segment width runs out. The track is
  // ~248px (280 panel − 28 body pad − 4 seg pad), each button loses 12px
  // to its own padding, and 11.5px system-ui averages ~6.3px/char — so 2
  // options fit ~16 chars each, 3 fit ~10. Past that (or >3 options), fall
  // back to a dropdown rather than wrap.
  const labelLen = o => String(typeof o === 'object' ? o.label : o).length;
  const maxLen = options.reduce((m, o) => Math.max(m, labelLen(o)), 0);
  const fitsAsSegments = maxLen <= ({
    2: 16,
    3: 10
  }[options.length] ?? 0);
  if (!fitsAsSegments) {
    // <select> emits strings — map back to the original option value so the
    // fallback stays type-preserving (numbers, booleans) like the segment path.
    const resolve = s => {
      const m = options.find(o => String(typeof o === 'object' ? o.value : o) === s);
      return m === undefined ? s : typeof m === 'object' ? m.value : m;
    };
    return /*#__PURE__*/React.createElement(TweakSelect, {
      label: label,
      value: value,
      options: options,
      onChange: s => onChange(resolve(s))
    });
  }
  const opts = options.map(o => typeof o === 'object' ? o : {
    value: o,
    label: o
  });
  const idx = Math.max(0, opts.findIndex(o => o.value === value));
  const n = opts.length;
  const segAt = clientX => {
    const r = trackRef.current.getBoundingClientRect();
    const inner = r.width - 4;
    const i = Math.floor((clientX - r.left - 2) / inner * n);
    return opts[Math.max(0, Math.min(n - 1, i))].value;
  };
  const onPointerDown = e => {
    setDragging(true);
    const v0 = segAt(e.clientX);
    if (v0 !== valueRef.current) onChange(v0);
    const move = ev => {
      if (!trackRef.current) return;
      const v = segAt(ev.clientX);
      if (v !== valueRef.current) onChange(v);
    };
    const up = () => {
      setDragging(false);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("div", {
    ref: trackRef,
    role: "radiogroup",
    onPointerDown: onPointerDown,
    className: dragging ? 'twk-seg dragging' : 'twk-seg'
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-seg-thumb",
    style: {
      left: `calc(2px + ${idx} * (100% - 4px) / ${n})`,
      width: `calc((100% - 4px) / ${n})`
    }
  }), opts.map(o => /*#__PURE__*/React.createElement("button", {
    key: o.value,
    type: "button",
    role: "radio",
    "aria-checked": o.value === value
  }, o.label))));
}
function TweakSelect({
  label,
  value,
  options,
  onChange
}) {
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("select", {
    className: "twk-field",
    value: value,
    onChange: e => onChange(e.target.value)
  }, options.map(o => {
    const v = typeof o === 'object' ? o.value : o;
    const l = typeof o === 'object' ? o.label : o;
    return /*#__PURE__*/React.createElement("option", {
      key: v,
      value: v
    }, l);
  })));
}
function TweakText({
  label,
  value,
  placeholder,
  onChange
}) {
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("input", {
    className: "twk-field",
    type: "text",
    value: value,
    placeholder: placeholder,
    onChange: e => onChange(e.target.value)
  }));
}
function TweakNumber({
  label,
  value,
  min,
  max,
  step = 1,
  unit = '',
  onChange
}) {
  const clamp = n => {
    if (min != null && n < min) return min;
    if (max != null && n > max) return max;
    return n;
  };
  const startRef = React.useRef({
    x: 0,
    val: 0
  });
  const onScrubStart = e => {
    e.preventDefault();
    startRef.current = {
      x: e.clientX,
      val: value
    };
    const decimals = (String(step).split('.')[1] || '').length;
    const move = ev => {
      const dx = ev.clientX - startRef.current.x;
      const raw = startRef.current.val + dx * step;
      const snapped = Math.round(raw / step) * step;
      onChange(clamp(Number(snapped.toFixed(decimals))));
    };
    const up = () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "twk-num"
  }, /*#__PURE__*/React.createElement("span", {
    className: "twk-num-lbl",
    onPointerDown: onScrubStart
  }, label), /*#__PURE__*/React.createElement("input", {
    type: "number",
    value: value,
    min: min,
    max: max,
    step: step,
    onChange: e => onChange(clamp(Number(e.target.value)))
  }), unit && /*#__PURE__*/React.createElement("span", {
    className: "twk-num-unit"
  }, unit));
}

// Relative-luminance contrast pick — checkmarks drawn over a swatch need to
// read on both #111 and #fafafa without per-option configuration. Hex input
// only (#rgb / #rrggbb); named or rgb()/hsl() colors fall through to "light".
function __twkIsLight(hex) {
  const h = String(hex).replace('#', '');
  const x = h.length === 3 ? h.replace(/./g, c => c + c) : h.padEnd(6, '0');
  const n = parseInt(x.slice(0, 6), 16);
  if (Number.isNaN(n)) return true;
  const r = n >> 16 & 255,
    g = n >> 8 & 255,
    b = n & 255;
  return r * 299 + g * 587 + b * 114 > 148000;
}
const __TwkCheck = ({
  light
}) => /*#__PURE__*/React.createElement("svg", {
  viewBox: "0 0 14 14",
  "aria-hidden": "true"
}, /*#__PURE__*/React.createElement("path", {
  d: "M3 7.2 5.8 10 11 4.2",
  fill: "none",
  strokeWidth: "2.2",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  stroke: light ? 'rgba(0,0,0,.78)' : '#fff'
}));

// TweakColor — curated color/palette picker. Each option is either a single
// hex string or an array of 1-5 hex strings; the card adapts — a lone color
// renders solid, a palette renders colors[0] as the hero (left ~2/3) with the
// rest stacked in a sharp column on the right. onChange emits the
// option in the shape it was passed (string stays string, array stays array).
// Without options it falls back to the native color input for back-compat.
function TweakColor({
  label,
  value,
  options,
  onChange
}) {
  if (!options || !options.length) {
    return /*#__PURE__*/React.createElement("div", {
      className: "twk-row twk-row-h"
    }, /*#__PURE__*/React.createElement("div", {
      className: "twk-lbl"
    }, /*#__PURE__*/React.createElement("span", null, label)), /*#__PURE__*/React.createElement("input", {
      type: "color",
      className: "twk-swatch",
      value: value,
      onChange: e => onChange(e.target.value)
    }));
  }
  // Native <input type=color> emits lowercase hex per the HTML spec, so
  // compare case-insensitively. String() guards JSON.stringify(undefined),
  // which returns the primitive undefined (no .toLowerCase).
  const key = o => String(JSON.stringify(o)).toLowerCase();
  const cur = key(value);
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-chips",
    role: "radiogroup"
  }, options.map((o, i) => {
    const colors = Array.isArray(o) ? o : [o];
    const [hero, ...rest] = colors;
    const sup = rest.slice(0, 4);
    const on = key(o) === cur;
    return /*#__PURE__*/React.createElement("button", {
      key: i,
      type: "button",
      className: "twk-chip",
      role: "radio",
      "aria-checked": on,
      "data-on": on ? '1' : '0',
      "aria-label": colors.join(', '),
      title: colors.join(' · '),
      style: {
        background: hero
      },
      onClick: () => onChange(o)
    }, sup.length > 0 && /*#__PURE__*/React.createElement("span", null, sup.map((c, j) => /*#__PURE__*/React.createElement("i", {
      key: j,
      style: {
        background: c
      }
    }))), on && /*#__PURE__*/React.createElement(__TwkCheck, {
      light: __twkIsLight(hero)
    }));
  })));
}
function TweakButton({
  label,
  onClick,
  secondary = false
}) {
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: secondary ? 'twk-btn secondary' : 'twk-btn',
    onClick: onClick
  }, label);
}
Object.assign(window, {
  useTweaks,
  TweaksPanel,
  TweakSection,
  TweakRow,
  TweakSlider,
  TweakToggle,
  TweakRadio,
  TweakSelect,
  TweakText,
  TweakNumber,
  TweakColor,
  TweakButton
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/storefront/tweaks-panel.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Divider = __ds_scope.Divider;

__ds_ns.Eyebrow = __ds_scope.Eyebrow;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.Monogram = __ds_scope.Monogram;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.Field = __ds_scope.Field;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.ProductCard = __ds_scope.ProductCard;

})();
