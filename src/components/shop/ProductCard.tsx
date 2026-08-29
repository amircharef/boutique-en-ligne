"use client";

import { useState, type MouseEvent } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ImageOff, ShoppingBag, Sparkles } from "lucide-react";
import { formatDA } from "@/lib/utils";
import { useCart } from "@/components/shop/CartContext";

interface ProductCardData {
  id: string;
  slug: string;
  name: string;
  price: number;
  compareAtPrice?: number | null;
  images: string[];
  sizes: string[];
  featured: boolean;
  category: { name: string };
}

export function ProductCard({
  product,
  index = 0,
}: {
  product: ProductCardData;
  index?: number;
}) {
  const [hovered, setHovered] = useState(false);
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();
  const image = product.images[0];
  const onSale = !!product.compareAtPrice && product.compareAtPrice > product.price;
  const discountPct = onSale
    ? Math.round((1 - product.price / product.compareAtPrice!) * 100)
    : 0;

  function quickAdd(e: MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    addItem(
      {
        productId: product.id,
        name: product.name,
        price: product.price,
        image: image ?? null,
        size: product.sizes[0] ?? null,
      },
      1,
    );
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      whileHover={{ y: -6 }}
      transition={{
        opacity: { duration: 0.5, delay: Math.min(index * 0.06, 0.3) },
        y: { type: "spring", stiffness: 300, damping: 24 },
      }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      <Link
        href={`/boutique/${product.slug}`}
        className="group block overflow-hidden rounded-3xl border border-border bg-surface shadow-sm transition-shadow duration-300 hover:shadow-xl hover:shadow-foreground/10"
      >
        <div className="relative aspect-3/4 overflow-hidden bg-surface-hover">
          {image ? (
            <motion.img
              src={image}
              alt={product.name}
              animate={{ scale: hovered ? 1.08 : 1 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-subtle">
              <ImageOff size={32} strokeWidth={1} />
            </div>
          )}

          <div className="absolute top-3 left-3 flex flex-col items-start gap-1.5">
            {product.featured && (
              <span className="flex items-center gap-1 rounded-full bg-background/90 px-2.5 py-1 text-[10px] font-medium tracking-wide text-accent-dark uppercase backdrop-blur">
                <Sparkles size={10} />
                Best-seller
              </span>
            )}
            {onSale && (
              <span className="rounded-full bg-red-500/90 px-2.5 py-1 text-[10px] font-medium tracking-wide text-white uppercase backdrop-blur">
                -{discountPct}%
              </span>
            )}
          </div>

          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-black/55 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

          <AnimatePresence>
            {hovered && (
              <motion.button
                initial={{ y: 14, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 14, opacity: 0 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
                onClick={quickAdd}
                className="absolute inset-x-3 bottom-3 flex items-center justify-center gap-2 rounded-full bg-white py-2.5 text-xs font-medium text-neutral-900 shadow-lg transition-colors hover:bg-accent hover:text-background"
              >
                <ShoppingBag size={13} />
                {added ? "Ajouté ✓" : "Ajout rapide"}
              </motion.button>
            )}
          </AnimatePresence>
        </div>
        <div className="p-4">
          <p className="font-mono text-[11px] tracking-wide text-subtle uppercase">
            {product.category.name}
          </p>
          <h3 className="mt-1 text-[15px] font-medium">{product.name}</h3>
          <div className="mt-1.5 flex items-center gap-2">
            <p className="text-sm text-accent-dark">{formatDA(product.price)}</p>
            {onSale && (
              <p className="text-xs text-subtle line-through">{formatDA(product.compareAtPrice!)}</p>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
