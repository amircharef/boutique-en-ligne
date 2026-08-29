import Link from "next/link";
import { ArrowRight, RotateCcw, ShieldCheck, Truck } from "lucide-react";
import { getAllCategories, getAllProducts, getFeaturedProducts } from "@/lib/products";
import { ProductCard } from "@/components/shop/ProductCard";
import { PosterHero, type HeroProduct } from "@/components/shop/PosterHero";
import { PromoCountdownBanner } from "@/components/shop/PromoCountdownBanner";
import { CategoryTile } from "@/components/shop/CategoryTile";
import { Testimonials } from "@/components/shop/Testimonials";
import { Reveal } from "@/components/shop/Reveal";

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
  const [featured, allProducts, categories] = await Promise.all([
    getFeaturedProducts(),
    getAllProducts(),
    getAllCategories(),
  ]);

  const categoryTiles = categories.map((cat) => {
    const catProducts = allProducts.filter((p) => p.categoryId === cat.id);
    return {
      slug: cat.slug,
      name: cat.name,
      image: catProducts[0]?.images[0] ?? null,
      count: catProducts.length,
    };
  });

  const heroProducts: HeroProduct[] = (featured.length > 0 ? featured : allProducts)
    .filter((p) => p.images[0])
    .slice(0, 3)
    .map((p) => ({
      slug: p.slug,
      name: p.name,
      price: p.price,
      image: p.images[0],
      category: p.category.name,
    }));

  return (
    <main className="flex-1">
      <PosterHero products={heroProducts} />

      <PromoCountdownBanner />

      <section className="mt-16 border-y border-border bg-surface py-10">
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

      {categoryTiles.length > 0 && (
        <section className="mx-auto max-w-6xl px-6 pt-20">
          <Reveal>
            <h2 className="font-display text-2xl tracking-tight">Homme ou Femme</h2>
            <p className="mt-2 text-muted">Survole une catégorie pour aller droit au but.</p>
          </Reveal>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {categoryTiles.map((category, i) => (
              <Reveal key={category.slug} delay={i * 0.08}>
                <CategoryTile category={category} />
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {allProducts.length > 0 && (
        <section className="mx-auto max-w-6xl px-6 py-20">
          <Reveal>
            <div className="flex items-end justify-between">
              <div>
                <h2 className="font-display text-2xl tracking-tight">La collection</h2>
                <p className="mt-2 text-muted">Tous nos hoodies, en une seule vue.</p>
              </div>
              <Link
                href="/boutique"
                className="flex items-center gap-1.5 text-sm text-accent hover:underline"
              >
                Tout voir
                <ArrowRight size={14} />
              </Link>
            </div>
          </Reveal>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {allProducts.map((product, i) => (
              <ProductCard key={product.slug} product={product} index={i} />
            ))}
          </div>
        </section>
      )}

      <Testimonials />
    </main>
  );
}
