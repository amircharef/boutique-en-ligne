"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { ProductCard } from "@/components/shop/ProductCard";

interface ProductData {
  id: string;
  slug: string;
  name: string;
  price: number;
  compareAtPrice?: number | null;
  images: string[];
  sizes: string[];
  featured: boolean;
  tags: string[];
  category: { slug: string; name: string };
}

export function ShopGrid({
  products,
  categories,
  initialCategory,
  initialType,
}: {
  products: ProductData[];
  categories: { slug: string; name: string }[];
  initialCategory?: string;
  initialType?: string;
}) {
  const [active, setActive] = useState<string>(initialCategory ?? "all");
  const [type, setType] = useState<string | undefined>(initialType);

  const filtered = products
    .filter((p) => active === "all" || p.category.slug === active)
    .filter((p) => !type || p.tags.includes(type));

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
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

        {type && (
          <button
            onClick={() => setType(undefined)}
            className="flex items-center gap-1.5 rounded-full border border-accent/40 bg-accent/10 px-4 py-1.5 font-mono text-xs text-accent"
          >
            {type}
            <X size={12} />
          </button>
        )}
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {filtered.length === 0 && (
          <p className="col-span-full py-16 text-center text-sm text-subtle">
            Aucun article dans cette catégorie pour l&apos;instant.
          </p>
        )}
        {filtered.map((product, i) => (
          <ProductCard key={product.slug} product={product} index={i} />
        ))}
      </div>
    </div>
  );
}
