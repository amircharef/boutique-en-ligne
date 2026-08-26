"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { productFormSchema } from "@/lib/validations";

export interface ActionState {
  error?: string;
}

function parseForm(formData: FormData) {
  return productFormSchema.safeParse({
    name: formData.get("name"),
    slug: formData.get("slug"),
    description: formData.get("description"),
    price: formData.get("price"),
    images: formData.get("images") ?? "",
    sizes: formData.get("sizes") || undefined,
    stock: formData.get("stock") || 0,
    categoryId: formData.get("categoryId"),
    featured: formData.get("featured") === "on",
    order: formData.get("order") || 0,
  });
}

function revalidateShop(slug?: string) {
  revalidatePath("/");
  revalidatePath("/boutique");
  if (slug) revalidatePath(`/boutique/${slug}`);
}

function isUniqueConstraintError(err: unknown) {
  return (
    typeof err === "object" &&
    err !== null &&
    "code" in err &&
    (err as { code?: string }).code === "P2002"
  );
}

export async function createProduct(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const parsed = parseForm(formData);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Erreur de validation." };
  }
  const data = parsed.data;
  try {
    await db.product.create({
      data: {
        name: data.name,
        slug: data.slug,
        description: data.description,
        price: data.price,
        images: data.images,
        sizes: data.sizes,
        stock: data.stock,
        categoryId: data.categoryId,
        featured: data.featured ?? false,
        order: data.order,
      },
    });
  } catch (err) {
    if (isUniqueConstraintError(err)) return { error: "Ce slug existe déjà." };
    return { error: "Une erreur est survenue lors de la création." };
  }
  revalidateShop(data.slug);
  redirect("/admin/products");
}

export async function updateProduct(
  id: string,
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const parsed = parseForm(formData);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Erreur de validation." };
  }
  const data = parsed.data;
  try {
    await db.product.update({
      where: { id },
      data: {
        name: data.name,
        slug: data.slug,
        description: data.description,
        price: data.price,
        images: data.images,
        sizes: data.sizes,
        stock: data.stock,
        categoryId: data.categoryId,
        featured: data.featured ?? false,
        order: data.order,
      },
    });
  } catch (err) {
    if (isUniqueConstraintError(err)) return { error: "Ce slug existe déjà." };
    return { error: "Une erreur est survenue lors de la mise à jour." };
  }
  revalidateShop(data.slug);
  redirect("/admin/products");
}

export async function deleteProduct(id: string, slug: string) {
  await db.product.delete({ where: { id } });
  revalidateShop(slug);
  revalidatePath("/admin/products");
}
