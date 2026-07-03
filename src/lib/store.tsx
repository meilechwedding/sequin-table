import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { products, type Product } from "../data/products";

export type CartLine = {
  productId: string;
  variant: string;
  qty: number;
  /** rental lines carry the event date */
  date?: string;
};

export type PlacedOrder = {
  id: string;
  placedAt: string;
  lines: CartLine[];
  name: string;
  total: number;
};

type StoreValue = {
  cart: CartLine[];
  saved: string[];
  toast: string;
  drawerOpen: boolean;
  addToCart: (product: Product, variant?: string, qty?: number, date?: string) => void;
  updateQty: (index: number, delta: number) => void;
  removeLine: (index: number) => void;
  setLineDate: (index: number, date: string) => void;
  clearCart: () => void;
  toggleSaved: (productId: string) => void;
  showToast: (message: string) => void;
  setDrawerOpen: (open: boolean) => void;
  placeOrder: (name: string) => PlacedOrder;
  lastOrder: PlacedOrder | null;
};

const StoreContext = createContext<StoreValue | null>(null);

const load = <T,>(key: string, fallback: T): T => {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
};

export const productById = (id: string): Product | undefined =>
  products.find((p) => p.id === id);

export const lineProduct = (line: CartLine): Product | undefined => productById(line.productId);

export const cartTotals = (cart: CartLine[]) => {
  const purchase = cart.filter((l) => (lineProduct(l)?.price ?? 0) > 0);
  const rental = cart.filter((l) => (lineProduct(l)?.price ?? 0) === 0);
  const subtotal = purchase.reduce(
    (sum, l) => sum + (lineProduct(l)?.price ?? 0) * l.qty,
    0,
  );
  return { purchase, rental, subtotal };
};

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartLine[]>(() => load("sequin.cart", []));
  const [saved, setSaved] = useState<string[]>(() => load("sequin.saved", []));
  const [lastOrder, setLastOrder] = useState<PlacedOrder | null>(() =>
    load("sequin.lastOrder", null),
  );
  const [toast, setToast] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    window.localStorage.setItem("sequin.cart", JSON.stringify(cart));
  }, [cart]);
  useEffect(() => {
    window.localStorage.setItem("sequin.saved", JSON.stringify(saved));
  }, [saved]);
  useEffect(() => {
    if (!toast) return;
    const t = window.setTimeout(() => setToast(""), 2400);
    return () => window.clearTimeout(t);
  }, [toast]);

  const showToast = useCallback((message: string) => setToast(message), []);

  const addToCart = useCallback(
    (product: Product, variant?: string, qty = 1, date?: string) => {
      const chosen = variant ?? product.variants[0] ?? "One size";
      setCart((current) => {
        const idx = current.findIndex(
          (l) => l.productId === product.id && l.variant === chosen && l.date === date,
        );
        if (idx >= 0) {
          return current.map((l, i) => (i === idx ? { ...l, qty: l.qty + qty } : l));
        }
        return [...current, { productId: product.id, variant: chosen, qty, date }];
      });
      setToast(product.price > 0 ? "Added to your cart" : "Added to your rental quote");
    },
    [],
  );

  const updateQty = useCallback((index: number, delta: number) => {
    setCart((current) =>
      current
        .map((l, i) => (i === index ? { ...l, qty: Math.max(0, l.qty + delta) } : l))
        .filter((l) => l.qty > 0),
    );
  }, []);

  const removeLine = useCallback((index: number) => {
    setCart((current) => current.filter((_, i) => i !== index));
  }, []);

  const setLineDate = useCallback((index: number, date: string) => {
    setCart((current) => current.map((l, i) => (i === index ? { ...l, date } : l)));
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const toggleSaved = useCallback((productId: string) => {
    setSaved((current) =>
      current.includes(productId)
        ? current.filter((id) => id !== productId)
        : [...current, productId],
    );
  }, []);

  const placeOrder = useCallback(
    (name: string): PlacedOrder => {
      const id = `ST-${String(Math.floor(1000 + Math.random() * 9000))}`;
      const order: PlacedOrder = {
        id,
        placedAt: new Date().toISOString(),
        lines: cart,
        name,
        total: cartTotals(cart).subtotal,
      };
      setLastOrder(order);
      window.localStorage.setItem("sequin.lastOrder", JSON.stringify(order));
      setCart([]);
      return order;
    },
    [cart],
  );

  const value = useMemo(
    () => ({
      cart,
      saved,
      toast,
      drawerOpen,
      addToCart,
      updateQty,
      removeLine,
      setLineDate,
      clearCart,
      toggleSaved,
      showToast,
      setDrawerOpen,
      placeOrder,
      lastOrder,
    }),
    [cart, saved, toast, drawerOpen, addToCart, updateQty, removeLine, setLineDate, clearCart, toggleSaved, showToast, placeOrder, lastOrder],
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside StoreProvider");
  return ctx;
}
