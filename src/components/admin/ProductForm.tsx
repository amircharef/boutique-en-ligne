"use client";

import { useActionState, useState } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ActionState } from "@/app/admin/(dashboard)/products/actions";

const inputClass =
  "w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-subtle focus:border-accent/50 focus:outline-none focus:ring-2 focus:ring-accent/20 transition-colors";

const labelClass = "mb-1.5 block text-xs text-muted";

function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

interface ColorVariant {
  name: string;
  hex: string;
  images: string[];
}

interface ProductData {
  name: string;
  slug: string;
  description: string;
  price: number;
  compareAtPrice?: number | null;
  material?: string | null;
  images: string[];
  sizes: string[];
  outOfStockSizes?: string[];
  tags?: string[];
  colors?: unknown;
  stock: number;
  categoryId: string;
  featured: boolean;
  order: number;
}

function serializeColors(colors: unknown): string {
  if (!Array.isArray(colors)) return "";
  return colors
    .map((c) => {
      if (!c || typeof c !== "object") return null;
      const variant = c as Partial<ColorVariant>;
      if (!variant.name || !Array.isArray(variant.images)) return null;
      return `${variant.name}|${variant.hex ?? "#000000"}|${variant.images.join(",")}`;
    })
    .filter(Boolean)
    .join("\n");
}

export function ProductForm({
  action,
  product,
  categories,
}: {
  action: (prevState: ActionState, formData: FormData) => Promise<ActionState>;
  product?: ProductData;
  categories: { id: string; name: string }[];
}) {
  const [state, formAction, isPending] = useActionState(action, {});
  const [slug, setSlug] = useState(product?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(!!product);

  return (
    <form action={formAction} className="max-w-2xl space-y-6">
      {state.error && (
        <p className="rounded-lg border border-red-400/30 bg-red-400/10 p-3 text-sm text-red-600">
          {state.error}
        </p>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={labelClass}>Nom *</label>
          <input
            name="name"
            required
            defaultValue={product?.name}
            className={inputClass}
            onChange={(e) => {
              if (!slugTouched) setSlug(slugify(e.target.value));
            }}
          />
        </div>
        <div>
          <label className={labelClass}>Slug *</label>
          <input
            name="slug"
            required
            value={slug}
            onChange={(e) => {
              setSlugTouched(true);
              setSlug(e.target.value);
            }}
            className={cn(inputClass, "font-mono")}
          />
        </div>
      </div>

      <div>
        <label className={labelClass}>Matière (optionnel)</label>
        <input
          name="material"
          placeholder="80% coton, 20% polyester"
          defaultValue={product?.material ?? undefined}
          className={inputClass}
        />
      </div>

      <div>
        <label className={labelClass}>Description *</label>
        <textarea
          name="description"
          required
          defaultValue={product?.description}
          className={cn(inputClass, "min-h-24 resize-none")}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={labelClass}>Prix (DA) *</label>
          <input
            type="number"
            name="price"
            required
            min={0}
            defaultValue={product?.price}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Prix barré avant promo (DA, optionnel)</label>
          <input
            type="number"
            name="compareAtPrice"
            min={0}
            defaultValue={product?.compareAtPrice ?? undefined}
            placeholder="Laisser vide si pas de promo"
            className={inputClass}
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={labelClass}>Catégorie *</label>
          <select
            name="categoryId"
            required
            defaultValue={product?.categoryId ?? ""}
            className={cn(inputClass, "appearance-none")}
          >
            <option value="" disabled>
              Choisir…
            </option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass}>Sous-catégories / mots-clés (virgules)</label>
          <input
            name="tags"
            placeholder="jeans, denim"
            defaultValue={product?.tags?.join(", ")}
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label className={labelClass}>
          Photos (une URL par ligne) * — 2+ photos activent le visualiseur rotatif (glisser)
        </label>
        <textarea
          name="images"
          required
          defaultValue={product?.images.join("\n")}
          placeholder="https://…"
          className={cn(inputClass, "min-h-20 resize-none font-mono text-xs")}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={labelClass}>Tailles (séparées par des virgules, optionnel)</label>
          <input
            name="sizes"
            placeholder="S, M, L, XL"
            defaultValue={product?.sizes.join(", ")}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Stock *</label>
          <input
            type="number"
            name="stock"
            min={0}
            defaultValue={product?.stock ?? 0}
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label className={labelClass}>Tailles en rupture (parmi celles ci-dessus, optionnel)</label>
        <input
          name="outOfStockSizes"
          placeholder="S, XL"
          defaultValue={product?.outOfStockSizes?.join(", ")}
          className={inputClass}
        />
      </div>

      <div>
        <label className={labelClass}>
          Variantes couleur (optionnel) — une par ligne : Nom|#hex|url1,url2
        </label>
        <textarea
          name="colors"
          placeholder={"Bleu marine|#1e3a5f|https://…\nNoir|#111111|https://…"}
          defaultValue={serializeColors(product?.colors)}
          className={cn(inputClass, "min-h-20 resize-none font-mono text-xs")}
        />
      </div>

      <div>
        <label className={labelClass}>Ordre d&apos;affichage</label>
        <input
          type="number"
          name="order"
          defaultValue={product?.order ?? 0}
          className={inputClass}
        />
      </div>

      <label className="flex items-center gap-2 text-sm text-muted">
        <input
          type="checkbox"
          name="featured"
          defaultChecked={product?.featured}
          className="h-4 w-4 rounded border-border accent-accent"
        />
        Mettre en avant sur la page d&apos;accueil
      </label>

      <button
        type="submit"
        disabled={isPending}
        className="flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-white disabled:opacity-50"
      >
        {isPending && <Loader2 className="animate-spin" size={16} />}
        {product ? "Enregistrer" : "Créer le produit"}
      </button>
    </form>
  );
}
