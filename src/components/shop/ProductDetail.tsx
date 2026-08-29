"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Minus, Plus, ShoppingBag } from "lucide-react";
import { useCart } from "@/components/shop/CartContext";
import { SpinViewer } from "@/components/shop/SpinViewer";
import { formatDA, cn } from "@/lib/utils";

interface ColorVariant {
  name: string;
  hex: string;
  images: string[];
}

function parseColors(raw: unknown): ColorVariant[] {
  if (!Array.isArray(raw)) return [];
  return raw.filter(
    (c): c is ColorVariant =>
      !!c &&
      typeof c === "object" &&
      typeof (c as ColorVariant).name === "string" &&
      Array.isArray((c as ColorVariant).images) &&
      (c as ColorVariant).images.length > 0,
  );
}

interface ProductData {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  compareAtPrice?: number | null;
  material?: string | null;
  images: string[];
  sizes: string[];
  outOfStockSizes?: string[];
  colors?: unknown;
  stock: number;
  category: { name: string };
}

export function ProductDetail({ product }: { product: ProductData }) {
  const router = useRouter();
  const { addItem } = useCart();
  const colors = useMemo(() => parseColors(product.colors), [product.colors]);
  const outOfStockSizes = product.outOfStockSizes ?? [];

  const [colorIndex, setColorIndex] = useState(0);
  const activeImages = colors[colorIndex]?.images ?? product.images;

  const firstAvailableSize = product.sizes.find((s) => !outOfStockSizes.includes(s));
  const [size, setSize] = useState<string | null>(firstAvailableSize ?? null);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const outOfStock = product.stock <= 0;
  const onSale = !!product.compareAtPrice && product.compareAtPrice > product.price;
  const discountPct = onSale
    ? Math.round((1 - product.price / product.compareAtPrice!) * 100)
    : 0;

  function handleAdd() {
    addItem(
      {
        productId: product.id,
        name: product.name + (colors[colorIndex] ? ` — ${colors[colorIndex].name}` : ""),
        price: product.price,
        image: activeImages[0] ?? null,
        size,
      },
      quantity,
    );
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div className="grid gap-10 lg:grid-cols-2">
      <div>
        <SpinViewer images={activeImages} alt={product.name} />
      </div>

      <div>
        <p className="font-mono text-xs tracking-wide text-subtle uppercase">
          {product.category.name}
        </p>
        <h1 className="font-display mt-2 text-3xl tracking-tight">
          {product.name}
        </h1>
        <div className="mt-3 flex items-center gap-3">
          <p className="text-xl text-accent-dark">{formatDA(product.price)}</p>
          {onSale && (
            <>
              <p className="text-base text-subtle line-through">
                {formatDA(product.compareAtPrice!)}
              </p>
              <span className="rounded-full bg-red-500/10 px-2.5 py-1 text-xs font-medium text-red-600">
                -{discountPct}%
              </span>
            </>
          )}
        </div>
        <p className="mt-6 text-muted">{product.description}</p>
        {product.material && (
          <p className="mt-2 font-mono text-xs tracking-wide text-subtle uppercase">
            {product.material}
          </p>
        )}

        {colors.length > 0 && (
          <div className="mt-8">
            <p className="mb-2 text-xs text-muted">
              Couleur{colors[colorIndex] ? ` — ${colors[colorIndex].name}` : ""}
            </p>
            <div className="flex flex-wrap gap-2.5">
              {colors.map((c, i) => (
                <button
                  key={c.name}
                  onClick={() => setColorIndex(i)}
                  aria-label={c.name}
                  title={c.name}
                  className={cn(
                    "h-8 w-8 rounded-full border-2 transition-transform",
                    i === colorIndex
                      ? "border-accent scale-110"
                      : "border-border hover:scale-105",
                  )}
                  style={{ backgroundColor: c.hex }}
                />
              ))}
            </div>
          </div>
        )}

        {product.sizes.length > 0 && (
          <div className="mt-8">
            <p className="mb-2 text-xs text-muted">Taille</p>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((s) => {
                const unavailable = outOfStockSizes.includes(s);
                return (
                  <button
                    key={s}
                    onClick={() => !unavailable && setSize(s)}
                    disabled={unavailable}
                    title={unavailable ? "Rupture de stock" : undefined}
                    className={cn(
                      "relative rounded-lg border px-4 py-2 text-sm transition-colors",
                      unavailable
                        ? "cursor-not-allowed border-border text-subtle line-through"
                        : size === s
                          ? "border-accent bg-accent/10 text-accent-dark"
                          : "border-border text-muted hover:border-border-hover",
                    )}
                  >
                    {s}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        <div className="mt-8 flex items-center gap-2">
          <div className="flex items-center gap-3 rounded-full border border-border px-2 py-1.5">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              aria-label="Retirer"
              className="flex h-7 w-7 items-center justify-center rounded-full text-accent hover:bg-surface-hover"
            >
              <Minus size={14} />
            </button>
            <span className="w-4 text-center text-sm font-semibold">{quantity}</span>
            <button
              onClick={() => setQuantity((q) => Math.min(20, q + 1))}
              aria-label="Ajouter"
              className="flex h-7 w-7 items-center justify-center rounded-full text-accent hover:bg-surface-hover"
            >
              <Plus size={14} />
            </button>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            onClick={handleAdd}
            disabled={outOfStock}
            className="flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-medium text-background transition-transform disabled:opacity-40 hover:scale-[1.02] active:scale-[0.98]"
          >
            <ShoppingBag size={16} />
            {outOfStock ? "Rupture de stock" : added ? "Ajouté au panier ✓" : "Ajouter au panier"}
          </button>
          {added && (
            <button
              onClick={() => router.push("/panier")}
              className="rounded-full border border-border px-6 py-3.5 text-sm font-medium hover:border-border-hover"
            >
              Voir le panier
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
