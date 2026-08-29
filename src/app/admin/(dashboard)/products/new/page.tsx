import type { Metadata } from "next";
import { ProductForm } from "@/components/admin/ProductForm";
import { getAllCategories } from "@/lib/products";
import { createProduct } from "../actions";

export const metadata: Metadata = {
  title: "Nouveau produit",
  robots: { index: false, follow: false },
};

export default async function NewProductPage() {
  const categories = await getAllCategories();

  return (
    <div>
      <h1 className="font-display text-2xl">Nouveau produit</h1>
      {categories.length === 0 ? (
        <p className="mt-6 text-sm text-muted">
          Crée d&apos;abord une catégorie avant d&apos;ajouter un produit.
        </p>
      ) : (
        <div className="mt-8">
          <ProductForm action={createProduct} categories={categories} />
        </div>
      )}
    </div>
  );
}
