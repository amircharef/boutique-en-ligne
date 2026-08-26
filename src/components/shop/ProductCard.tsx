import Link from "next/link";
import { ImageOff } from "lucide-react";
import { formatDA } from "@/lib/utils";

interface ProductCardData {
  slug: string;
  name: string;
  price: number;
  images: string[];
  category: { name: string };
}

export function ProductCard({ product }: { product: ProductCardData }) {
  const image = product.images[0];

  return (
    <Link
      href={`/boutique/${product.slug}`}
      className="group block overflow-hidden rounded-2xl border border-border bg-surface transition-colors hover:border-border-hover"
    >
      <div className="relative aspect-3/4 overflow-hidden bg-surface-hover">
        {image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={image}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-subtle">
            <ImageOff size={32} strokeWidth={1} />
          </div>
        )}
      </div>
      <div className="p-4">
        <p className="font-mono text-[11px] tracking-wide text-subtle uppercase">
          {product.category.name}
        </p>
        <h3 className="font-display mt-1 font-semibold">{product.name}</h3>
        <p className="mt-1.5 text-sm text-accent-dark">{formatDA(product.price)}</p>
      </div>
    </Link>
  );
}
