import React from "react";

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
export function ProductCard({
  image, name, category, price, unit = "", flag = null, tilt = true,
  onFavourite, favourited = false, onClick, className = "", ...rest
}) {
  useStyles();
  const ref = React.useRef(null);
  const onMove = (e) => {
    if (!tilt || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    ref.current.style.transform = `perspective(900px) rotateY(${px * 7}deg) rotateX(${-py * 7}deg) translateY(-5px)`;
  };
  const reset = () => { if (ref.current) ref.current.style.transform = ""; };
  return (
    <div ref={ref} className={["sq-pcard", className].filter(Boolean).join(" ")}
      onPointerMove={onMove} onPointerLeave={reset} onClick={onClick} {...rest}>
      <div className="sq-pcard__media">
        {flag && <div className="sq-pcard__flags">{flag}</div>}
        {onFavourite && (
          <button className="sq-pcard__fav sq-iconbtn sq-iconbtn--sm" aria-label="Favourite"
            onClick={(e) => { e.stopPropagation(); onFavourite(); }}>
            <i data-lucide="heart" style={{ fill: favourited ? "var(--feature)" : "none", color: favourited ? "var(--feature)" : "currentColor" }}></i>
          </button>
        )}
        <img src={image} alt={name} />
      </div>
      <div className="sq-pcard__body">
        {category && <span className="sq-pcard__cat">{category}</span>}
        <h3 className="sq-pcard__name">{name}</h3>
        <div className="sq-pcard__foot">
          <span className="sq-pcard__price">{price}</span>
          {unit && <span className="sq-pcard__unit">{unit}</span>}
        </div>
      </div>
    </div>
  );
}
