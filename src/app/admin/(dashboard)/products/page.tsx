import Link from "next/link";
import type { Metadata } from "next";
import { Plus, Star, ExternalLink, ImageOff } from "lucide-react";
import { getAllProducts } from "@/lib/products";
import { deleteProduct } from "./actions";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { formatDA } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Produits",
  robots: { index: false, follow: false },
};

export default async function AdminProductsPage() {
  const products = await getAllProducts();

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl">Produits</h1>
          <p className="mt-1 text-sm text-muted">
            {products.length} produit{products.length > 1 ? "s" : ""} au catalogue
          </p>
        </div>
        <Link
          href="/admin/products/new"
          className="flex items-center gap-1.5 rounded-full bg-accent px-4 py-2 text-xs font-medium text-white"
        >
          <Plus size={14} />
          Nouveau produit
        </Link>
      </div>

      <div className="mt-8 space-y-3">
        {products.length === 0 && (
          <p className="rounded-2xl border border-border bg-surface p-8 text-center text-sm text-subtle">
            Aucun produit pour l&apos;instant.
          </p>
        )}

        {products.map((product) => (
          <div
            key={product.id}
            className="flex flex-wrap items-center gap-4 rounded-2xl border border-border bg-surface p-4"
          >
            <div className="h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-surface-hover">
              {product.images[0] ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={product.images[0]} alt="" className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-subtle">
                  <ImageOff size={18} />
                </div>
              )}
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <h3 className="truncate font-display">{product.name}</h3>
                {product.featured && (
                  <Star size={13} className="shrink-0 fill-accent text-accent" />
                )}
                {product.stock <= 0 && (
                  <span className="rounded-full bg-red-500/10 px-2 py-0.5 text-[10px] text-red-600">
                    Rupture
                  </span>
                )}
              </div>
              <p className="mt-0.5 truncate text-xs text-subtle">
                {product.category.name} · {formatDA(product.price)} · Stock : {product.stock}
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-2">
              <Link
                href={`/boutique/${product.slug}`}
                target="_blank"
                className="rounded-lg border border-border p-1.5 text-subtle hover:text-foreground"
                aria-label="Voir sur le site"
              >
                <ExternalLink size={14} />
              </Link>
              <Link
                href={`/admin/products/${product.id}/edit`}
                className="rounded-lg border border-border px-3 py-1.5 text-xs text-muted hover:text-foreground"
              >
                Modifier
              </Link>
              <DeleteButton
                action={deleteProduct.bind(null, product.id, product.slug)}
                confirmMessage={`Supprimer le produit "${product.name}" ?`}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
