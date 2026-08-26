import Link from "next/link";
import type { Metadata } from "next";
import { Plus } from "lucide-react";
import { getAllCategories } from "@/lib/products";
import { deleteCategory } from "./actions";
import { DeleteButton } from "@/components/admin/DeleteButton";

export const metadata: Metadata = {
  title: "Catégories",
  robots: { index: false, follow: false },
};

export default async function AdminCategoriesPage() {
  const categories = await getAllCategories();

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold">Catégories</h1>
          <p className="mt-1 text-sm text-muted">
            {categories.length} catégorie{categories.length > 1 ? "s" : ""}
          </p>
        </div>
        <Link
          href="/admin/categories/new"
          className="flex items-center gap-1.5 rounded-full bg-accent px-4 py-2 text-xs font-medium text-white"
        >
          <Plus size={14} />
          Nouvelle catégorie
        </Link>
      </div>

      <div className="mt-8 space-y-3">
        {categories.length === 0 && (
          <p className="rounded-2xl border border-border bg-surface p-8 text-center text-sm text-subtle">
            Aucune catégorie pour l&apos;instant.
          </p>
        )}

        {categories.map((category) => (
          <div
            key={category.id}
            className="flex items-center justify-between gap-4 rounded-2xl border border-border bg-surface p-5"
          >
            <div>
              <h3 className="font-display font-semibold">{category.name}</h3>
              <p className="mt-0.5 font-mono text-xs text-subtle">/{category.slug}</p>
            </div>
            <div className="flex items-center gap-2">
              <Link
                href={`/admin/categories/${category.id}/edit`}
                className="rounded-lg border border-border px-3 py-1.5 text-xs text-muted hover:text-foreground"
              >
                Modifier
              </Link>
              <DeleteButton
                action={deleteCategory.bind(null, category.id)}
                confirmMessage={`Supprimer la catégorie "${category.name}" ?`}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
