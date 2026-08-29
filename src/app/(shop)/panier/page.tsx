"use client";

import Link from "next/link";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "@/components/shop/CartContext";
import { formatDA } from "@/lib/utils";

export default function CartPage() {
  const { items, setQuantity, removeItem, total } = useCart();

  if (items.length === 0) {
    return (
      <main className="mx-auto flex max-w-2xl flex-col items-center px-6 py-24 text-center">
        <ShoppingBag size={40} className="text-subtle" strokeWidth={1} />
        <h1 className="font-display mt-4 text-2xl">Ton panier est vide</h1>
        <p className="mt-2 text-muted">Découvre la boutique pour commencer.</p>
        <Link
          href="/boutique"
          className="mt-6 rounded-full bg-accent px-6 py-3 text-sm font-medium text-background"
        >
          Voir la boutique
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="font-display text-3xl tracking-tight">Ton panier</h1>

      <div className="mt-8 space-y-4">
        {items.map((item) => (
          <div
            key={`${item.productId}-${item.size}`}
            className="flex items-center gap-4 rounded-2xl border border-border bg-surface p-4"
          >
            <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-surface-hover">
              {item.image && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={item.image} alt="" className="h-full w-full object-cover" />
              )}
            </div>

            <div className="min-w-0 flex-1">
              <h3 className="font-medium">{item.name}</h3>
              {item.size && <p className="text-xs text-subtle">Taille : {item.size}</p>}
              <p className="mt-1 text-sm text-accent-dark">{formatDA(item.price)}</p>
            </div>

            <div className="flex items-center gap-2 rounded-full border border-border px-1.5 py-1">
              <button
                onClick={() => setQuantity(item.productId, item.size, item.quantity - 1)}
                aria-label="Retirer"
                className="flex h-7 w-7 items-center justify-center rounded-full text-accent hover:bg-surface-hover"
              >
                <Minus size={14} />
              </button>
              <span className="w-4 text-center text-sm font-semibold">{item.quantity}</span>
              <button
                onClick={() => setQuantity(item.productId, item.size, item.quantity + 1)}
                aria-label="Ajouter"
                className="flex h-7 w-7 items-center justify-center rounded-full text-accent hover:bg-surface-hover"
              >
                <Plus size={14} />
              </button>
            </div>

            <button
              onClick={() => removeItem(item.productId, item.size)}
              aria-label="Supprimer"
              className="text-subtle hover:text-red-600"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8 flex items-center justify-between border-t border-border pt-6">
        <span className="text-muted">Total</span>
        <span className="font-display text-xl">{formatDA(total)}</span>
      </div>

      <Link
        href="/commande"
        className="mt-6 flex w-full items-center justify-center rounded-full bg-accent px-6 py-3.5 text-sm font-medium text-background transition-transform hover:scale-[1.01] active:scale-[0.99]"
      >
        Passer la commande
      </Link>
    </main>
  );
}
