import Link from "next/link";
import { ArrowRight, RotateCcw, ShieldCheck, Truck } from "lucide-react";
import { getAllCategories, getAllProducts, getFeaturedProducts } from "@/lib/products";
import { ProductCard } from "@/components/shop/ProductCard";
import { HeroCarousel, type HeroSlide } from "@/components/shop/HeroCarousel";
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

function shuffled<T>(items: T[]) {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

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

  const bestSellers = shuffled(allProducts).slice(0, 4);

  const featuredIds = new Set(featured.map((p) => p.id));
  const rest = allProducts.filter((p) => !featuredIds.has(p.id));

  const byCategory = (slug: string) => allProducts.find((p) => p.category.slug === slug && p.images[0]);
  const slideSources = [
    { source: featured.find((p) => p.images[0]) ?? allProducts.find((p) => p.images[0]), eyebrow: "Nouvelle collection", ctaHref: "/boutique", ctaLabel: "Découvrir la boutique" },
    { source: byCategory("homme"), eyebrow: "Collection Homme", ctaHref: "/boutique?categorie=homme", ctaLabel: "Voir Homme" },
    { source: byCategory("femme"), eyebrow: "Collection Femme", ctaHref: "/boutique?categorie=femme", ctaLabel: "Voir Femme" },
  ];

  const slides: HeroSlide[] = slideSources
    .filter((s): s is typeof s & { source: NonNullable<typeof s.source> } => !!s.source)
    .map(({ source, eyebrow, ctaHref, ctaLabel }) => ({
      eyebrow,
      title:
        eyebrow === "Nouvelle collection"
          ? "Des pièces qui durent, un style qui te ressemble"
          : `${source.name} et bien plus encore`,
      subtitle:
        eyebrow === "Nouvelle collection"
          ? "Mode et accessoires sélectionnés avec soin, livrés chez toi partout en Algérie — paiement à la livraison."
          : `À partir de ${new Intl.NumberFormat("fr-DZ").format(source.price)} DA. Paiement à la livraison, échange facile.`,
      image: source.images[0],
      ctaHref,
      ctaLabel,
    }));

  return (
    <main className="flex-1">
      <HeroCarousel slides={slides} />

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
            <h2 className="font-display text-2xl font-semibold">Explorer par catégorie</h2>
            <p className="mt-2 text-muted">Survole une catégorie pour aller droit au but.</p>
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

      {bestSellers.length > 0 && (
        <section className="mx-auto max-w-6xl px-6 py-20">
          <Reveal>
            <h2 className="font-display text-2xl font-semibold">Meilleures ventes</h2>
            <p className="mt-2 text-muted">Les articles préférés de nos clients en ce moment.</p>
          </Reveal>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {bestSellers.map((product, i) => (
              <ProductCard key={product.slug} product={product} index={i} />
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

      <Testimonials />
    </main>
  );
}
