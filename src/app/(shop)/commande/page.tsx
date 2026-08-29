"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Truck } from "lucide-react";
import { useCart } from "@/components/shop/CartContext";
import { formatDA } from "@/lib/utils";

const inputClass =
  "w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-sm text-foreground placeholder:text-subtle focus:border-accent/50 focus:outline-none focus:ring-2 focus:ring-accent/20 transition-colors";

const labelClass = "mb-1.5 block text-xs text-muted";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, total, clear } = useCart();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const formData = new FormData(e.currentTarget);

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: formData.get("customerName"),
          phone: formData.get("phone"),
          address: formData.get("address"),
          city: formData.get("city"),
          note: formData.get("note") || undefined,
          items: items.map((i) => ({
            productId: i.productId,
            size: i.size ?? undefined,
            quantity: i.quantity,
          })),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Une erreur est survenue.");
        setSubmitting(false);
        return;
      }
      clear();
      router.push(`/commande/${data.orderId}`);
    } catch {
      setError("Impossible de contacter le serveur.");
      setSubmitting(false);
    }
  }

  if (items.length === 0) {
    return (
      <main className="mx-auto max-w-2xl px-6 py-24 text-center">
        <p className="text-muted">Ton panier est vide.</p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="font-display text-3xl tracking-tight">Finaliser la commande</h1>

      <div className="mt-4 flex items-center gap-2 rounded-lg bg-accent/10 px-4 py-2.5 text-sm text-accent-dark">
        <Truck size={16} />
        Paiement à la livraison — tu payes seulement à réception.
      </div>

      <form onSubmit={onSubmit} className="mt-8 space-y-5">
        {error && (
          <p className="rounded-lg border border-red-400/30 bg-red-400/10 p-3 text-sm text-red-600">
            {error}
          </p>
        )}

        <div>
          <label className={labelClass}>Nom complet *</label>
          <input name="customerName" required className={inputClass} />
        </div>

        <div>
          <label className={labelClass}>Téléphone *</label>
          <input name="phone" type="tel" required className={inputClass} />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className={labelClass}>Adresse *</label>
            <input name="address" required className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Ville *</label>
            <input name="city" required className={inputClass} />
          </div>
        </div>

        <div>
          <label className={labelClass}>Note pour la livraison (optionnel)</label>
          <textarea name="note" className={`${inputClass} min-h-20 resize-none`} />
        </div>

        <div className="flex items-center justify-between border-t border-border pt-5">
          <span className="text-muted">Total</span>
          <span className="font-display text-lg">{formatDA(total)}</span>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-medium text-background transition-transform disabled:opacity-50 hover:scale-[1.01] active:scale-[0.99]"
        >
          {submitting && <Loader2 className="animate-spin" size={16} />}
          Confirmer la commande
        </button>
      </form>
    </main>
  );
}
