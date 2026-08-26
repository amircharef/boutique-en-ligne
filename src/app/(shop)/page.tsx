import Link from "next/link";
import { ArrowRight, Truck, RotateCcw, ShieldCheck } from "lucide-react";
import { getFeaturedProducts } from "@/lib/products";
import { ProductCard } from "@/components/shop/ProductCard";

const perks = [
  {
    icon: Truck,
    title: "Livraison partout en Algérie",
    description: "Expédition sous 48h, suivi de commande en temps réel.",
  },
  {
    icon: ShieldCheck,
    title: "Paiement à la livraison",
    description: "Tu payes seulement à réception, en toute confiance.",
  },
  {
    icon: RotateCcw,
    title: "Échange facile",
    description: "Une taille ne convient pas ? On échange sans complication.",
  },
];

export default async function Home() {
  const featured = await getFeaturedProducts();

  return (
    <main className="flex-1">
      <section className="mx-auto max-w-6xl px-6 pt-16 pb-20 text-center sm:pt-24">
        <p className="font-mono text-xs tracking-widest text-accent uppercase">
          Nouvelle collection
        </p>
        <h1 className="font-display mx-auto mt-4 max-w-2xl text-4xl font-semibold tracking-tight sm:text-5xl">
          Des pièces qui durent, un style qui te ressemble
        </h1>
        <p className="mx-auto mt-5 max-w-lg text-muted">
          Mode et accessoires sélectionnés avec soin, livrés chez toi partout en Algérie —
          paiement à la livraison.
        </p>
        <Link
          href="/boutique"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-medium text-white transition-transform hover:scale-[1.02] active:scale-[0.98]"
        >
          Découvrir la boutique
          <ArrowRight size={16} />
        </Link>
      </section>

      <section className="border-y border-border bg-surface py-10">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 sm:grid-cols-3">
          {perks.map((perk) => {
            const Icon = perk.icon;
            return (
              <div key={perk.title} className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
                  <Icon size={16} />
                </div>
                <div>
                  <p className="font-medium">{perk.title}</p>
                  <p className="mt-0.5 text-sm text-muted">{perk.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {featured.length > 0 && (
        <section className="mx-auto max-w-6xl px-6 py-20">
          <div className="flex items-end justify-between">
            <h2 className="font-display text-2xl font-semibold">Sélection du moment</h2>
            <Link
              href="/boutique"
              className="flex items-center gap-1.5 text-sm text-accent hover:underline"
            >
              Tout voir
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
