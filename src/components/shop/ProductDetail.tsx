"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ImageOff, Minus, Plus, ShoppingBag } from "lucide-react";
import { useCart } from "@/components/shop/CartContext";
import { formatDA, cn } from "@/lib/utils";

interface ProductData {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  images: string[];
  sizes: string[];
  stock: number;
  category: { name: string };
}

export function ProductDetail({ product }: { product: ProductData }) {
  const router = useRouter();
  const { addItem } = useCart();
  const [activeImage, setActiveImage] = useState(0);
  const [size, setSize] = useState<string | null>(product.sizes[0] ?? null);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const outOfStock = product.stock <= 0;

  function handleAdd() {
    addItem(
      {
        productId: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0] ?? null,
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
        <div className="aspect-3/4 overflow-hidden rounded-2xl bg-surface-hover">
          {product.images[activeImage] ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={product.images[activeImage]}
              alt={product.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-subtle">
              <ImageOff size={48} strokeWidth={1} />
            </div>
          )}
        </div>
        {product.images.length > 1 && (
          <div className="mt-3 flex gap-2">
            {product.images.map((img, i) => (
              <button
                key={img}
                onClick={() => setActiveImage(i)}
                className={cn(
                  "h-16 w-16 shrink-0 overflow-hidden rounded-lg border-2",
                  i === activeImage ? "border-accent" : "border-transparent",
                )}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      <div>
        <p className="font-mono text-xs tracking-wide text-subtle uppercase">
          {product.category.name}
        </p>
        <h1 className="font-display mt-2 text-3xl font-semibold tracking-tight">
          {product.name}
        </h1>
        <p className="mt-3 text-xl text-accent-dark">{formatDA(product.price)}</p>
        <p className="mt-6 text-muted">{product.description}</p>

        {product.sizes.length > 0 && (
          <div className="mt-8">
            <p className="mb-2 text-xs text-muted">Taille</p>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={cn(
                    "rounded-lg border px-4 py-2 text-sm transition-colors",
                    size === s
                      ? "border-accent bg-accent/10 text-accent-dark"
                      : "border-border text-muted hover:border-border-hover",
                  )}
                >
                  {s}
                </button>
              ))}
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
            className="flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-medium text-white transition-transform disabled:opacity-40 hover:scale-[1.02] active:scale-[0.98]"
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
