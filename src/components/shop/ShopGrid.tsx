"use client";

import { useState } from "react";
import { ProductCard } from "@/components/shop/ProductCard";

interface ProductData {
  slug: string;
  name: string;
  price: number;
  images: string[];
  category: { slug: string; name: string };
}

export function ShopGrid({
  products,
  categories,
  initialCategory,
}: {
  products: ProductData[];
  categories: { slug: string; name: string }[];
  initialCategory?: string;
}) {
  const [active, setActive] = useState<string>(initialCategory ?? "all");

  const filtered =
    active === "all" ? products : products.filter((p) => p.category.slug === active);

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setActive("all")}
          className={`rounded-full border px-4 py-1.5 font-mono text-xs transition-colors ${
            active === "all"
              ? "border-accent/40 bg-accent/10 text-accent"
              : "border-border text-muted hover:text-foreground"
          }`}
        >
          Tous
        </button>
        {categories.map((c) => (
          <button
            key={c.slug}
            onClick={() => setActive(c.slug)}
            className={`rounded-full border px-4 py-1.5 font-mono text-xs transition-colors ${
              active === c.slug
                ? "border-accent/40 bg-accent/10 text-accent"
                : "border-border text-muted hover:text-foreground"
            }`}
          >
            {c.name}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {filtered.length === 0 && (
          <p className="col-span-full py-16 text-center text-sm text-subtle">
            Aucun article dans cette catégorie pour l&apos;instant.
          </p>
        )}
        {filtered.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
    </div>
  );
}
