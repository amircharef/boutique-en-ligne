"use client";

import { createContext, useContext, useSyncExternalStore, type ReactNode } from "react";

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  image: string | null;
  size: string | null;
  quantity: number;
}

const STORAGE_KEY = "boutique-cart";

type Listener = () => void;
let listeners: Listener[] = [];
let cachedItems: CartItem[] = [];

function readStorage(): CartItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

// Populated once at module load, client-side only — read here (not in an
// effect) so useSyncExternalStore's client snapshot is correct from the
// first post-hydration render, with no extra render pass required.
if (typeof window !== "undefined") {
  cachedItems = readStorage();
}

function persist(next: CartItem[]) {
  cachedItems = next;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // ignore storage quota errors
  }
  for (const listener of listeners) listener();
}

function subscribe(listener: Listener) {
  listeners.push(listener);
  return () => {
    listeners = listeners.filter((l) => l !== listener);
  };
}

function getSnapshot() {
  return cachedItems;
}

function getServerSnapshot(): CartItem[] {
  return [];
}

function sameLine(a: { productId: string; size: string | null }, b: typeof a) {
  return a.productId === b.productId && a.size === b.size;
}

interface CartContextValue {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">, quantity: number) => void;
  removeItem: (productId: string, size: string | null) => void;
  setQuantity: (productId: string, size: string | null, quantity: number) => void;
  clear: () => void;
  itemCount: number;
  total: number;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const items = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  function addItem(item: Omit<CartItem, "quantity">, quantity: number) {
    const existing = items.find((l) => sameLine(l, item));
    const next = existing
      ? items.map((l) =>
          sameLine(l, item) ? { ...l, quantity: Math.min(20, l.quantity + quantity) } : l,
        )
      : [...items, { ...item, quantity }];
    persist(next);
  }

  function removeItem(productId: string, size: string | null) {
    persist(items.filter((l) => !sameLine(l, { productId, size })));
  }

  function setQuantity(productId: string, size: string | null, quantity: number) {
    const next =
      quantity <= 0
        ? items.filter((l) => !sameLine(l, { productId, size }))
        : items.map((l) =>
            sameLine(l, { productId, size }) ? { ...l, quantity: Math.min(20, quantity) } : l,
          );
    persist(next);
  }

  function clear() {
    persist([]);
  }

  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);
  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, setQuantity, clear, itemCount, total }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
