"use client";

import { useActionState, useState } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ActionState } from "@/app/admin/(dashboard)/categories/actions";

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

interface CategoryData {
  name: string;
  slug: string;
  order: number;
}

export function CategoryForm({
  action,
  category,
}: {
  action: (prevState: ActionState, formData: FormData) => Promise<ActionState>;
  category?: CategoryData;
}) {
  const [state, formAction, isPending] = useActionState(action, {});
  const [slug, setSlug] = useState(category?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(!!category);

  return (
    <form action={formAction} className="max-w-md space-y-6">
      {state.error && (
        <p className="rounded-lg border border-red-400/30 bg-red-400/10 p-3 text-sm text-red-600">
          {state.error}
        </p>
      )}

      <div>
        <label className={labelClass}>Nom *</label>
        <input
          name="name"
          required
          defaultValue={category?.name}
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

      <div>
        <label className={labelClass}>Ordre d&apos;affichage</label>
        <input
          type="number"
          name="order"
          defaultValue={category?.order ?? 0}
          className={inputClass}
        />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-white disabled:opacity-50"
      >
        {isPending && <Loader2 className="animate-spin" size={16} />}
        {category ? "Enregistrer" : "Créer la catégorie"}
      </button>
    </form>
  );
}
