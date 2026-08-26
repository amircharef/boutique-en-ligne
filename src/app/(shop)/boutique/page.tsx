import type { Metadata } from "next";
import { getAllProducts, getAllCategories } from "@/lib/products";
import { ShopGrid } from "@/components/shop/ShopGrid";

export const metadata: Metadata = {
  title: "Boutique",
};

export default async function BoutiquePage({
  searchParams,
}: {
  searchParams: Promise<{ categorie?: string; type?: string }>;
}) {
  const { categorie, type } = await searchParams;
  const [products, categories] = await Promise.all([getAllProducts(), getAllCategories()]);

  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
        La boutique
      </h1>
      <p className="mt-2 text-muted">{products.length} articles disponibles</p>

      <div className="mt-8">
        <ShopGrid
          products={products}
          categories={categories}
          initialCategory={categorie}
          initialType={type}
        />
      </div>
    </main>
  );
}
