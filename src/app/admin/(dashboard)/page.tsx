import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { db } from "@/lib/db";
import { getActiveOrders, getTodayStats } from "@/lib/orders";
import { formatDA } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default async function AdminOverviewPage() {
  const [activeOrders, todayStats, productCount] = await Promise.all([
    getActiveOrders(),
    getTodayStats(),
    db.product.count(),
  ]);

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold">Vue d&apos;ensemble</h1>
      <p className="mt-1 text-sm text-muted">Bienvenue dans l&apos;espace admin de la boutique.</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-border bg-surface p-6">
          <p className="font-mono text-xs text-subtle uppercase">Commandes en cours</p>
          <p className="font-display mt-2 text-3xl font-semibold">{activeOrders.length}</p>
        </div>
        <div className="rounded-2xl border border-border bg-surface p-6">
          <p className="font-mono text-xs text-subtle uppercase">Chiffre du jour</p>
          <p className="font-display mt-2 text-3xl font-semibold">
            {formatDA(todayStats.revenue)}
          </p>
        </div>
        <div className="rounded-2xl border border-border bg-surface p-6">
          <p className="font-mono text-xs text-subtle uppercase">Produits au catalogue</p>
          <p className="font-display mt-2 text-3xl font-semibold">{productCount}</p>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap gap-4">
        <Link
          href="/admin/orders"
          className="inline-flex items-center gap-2 text-sm text-accent hover:underline"
        >
          Voir les commandes
          <ArrowRight size={14} />
        </Link>
        <Link
          href="/admin/products"
          className="inline-flex items-center gap-2 text-sm text-accent hover:underline"
        >
          Gérer le catalogue
          <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}
