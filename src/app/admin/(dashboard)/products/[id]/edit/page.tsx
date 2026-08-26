import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductForm } from "@/components/admin/ProductForm";
import { getProductById, getAllCategories } from "@/lib/products";
import { updateProduct } from "../../actions";

export const metadata: Metadata = {
  title: "Modifier le produit",
  robots: { index: false, follow: false },
};

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [product, categories] = await Promise.all([getProductById(id), getAllCategories()]);
  if (!product) notFound();

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold">Modifier « {product.name} »</h1>
      <div className="mt-8">
        <ProductForm action={updateProduct.bind(null, id)} product={product} categories={categories} />
      </div>
    </div>
  );
}
