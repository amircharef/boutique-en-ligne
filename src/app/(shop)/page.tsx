import Link from "next/link";
import { ArrowRight, RotateCcw, ShieldCheck, Truck } from "lucide-react";
import { getAllCategories, getAllProducts, getFeaturedProducts } from "@/lib/products";
import { ProductCard } from "@/components/shop/ProductCard";
import { HeroSection } from "@/components/shop/HeroSection";
import { CategoryTile } from "@/components/shop/CategoryTile";
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

  const heroSource = featured.find((p) => p.images[0]) ?? allProducts.find((p) => p.images[0]);
  const heroProduct = heroSource
    ? {
        slug: heroSource.slug,
        name: heroSource.name,
        price: heroSource.price,
        image: heroSource.images[0],
        category: heroSource.category.name,
      }
    : null;

  const categoryTiles = categories.map((cat) => {
    const catProducts = allProducts.filter((p) => p.categoryId === cat.id);
    return {
      slug: cat.slug,
      name: cat.name,
      image: catProducts[0]?.images[0] ?? null,
      count: catProducts.length,
    };
  });

  const featuredIds = new Set(featured.map((p) => p.id));
  const rest = allProducts.filter((p) => !featuredIds.has(p.id));

  return (
    <main className="flex-1">
      <HeroSection product={heroProduct} />

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

      {categoryTiles.length > 0 && (
        <section className="mx-auto max-w-6xl px-6 pt-20">
          <Reveal>
            <h2 className="font-display text-2xl font-semibold">Explorer par catégorie</h2>
          </Reveal>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {categoryTiles.map((category, i) => (
              <Reveal key={category.slug} delay={i * 0.08}>
                <CategoryTile category={category} />
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {featured.length > 0 && (
        <section className="mx-auto max-w-6xl px-6 py-20">
          <Reveal>
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
          </Reveal>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((product, i) => (
              <ProductCard key={product.slug} product={product} index={i} />
            ))}
          </div>
        </section>
      )}

      {rest.length > 0 && (
        <section className="mx-auto max-w-6xl px-6 pb-24">
          <Reveal>
            <h2 className="font-display text-2xl font-semibold">Toute la collection</h2>
          </Reveal>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {rest.map((product, i) => (
              <ProductCard key={product.slug} product={product} index={i} />
            ))}
          </div>

          <Reveal className="mt-10 flex justify-center">
            <Link
              href="/boutique"
              className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-medium transition-colors hover:border-border-hover hover:bg-surface"
            >
              Voir tout le catalogue
              <ArrowRight size={14} />
            </Link>
          </Reveal>
        </section>
      )}
    </main>
  );
}
