"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { categoryFormSchema } from "@/lib/validations";

export interface ActionState {
  error?: string;
}

function parseForm(formData: FormData) {
  return categoryFormSchema.safeParse({
    name: formData.get("name"),
    slug: formData.get("slug"),
    order: formData.get("order") || 0,
  });
}

function revalidateShop() {
  revalidatePath("/");
  revalidatePath("/boutique");
}

function isUniqueConstraintError(err: unknown) {
  return (
    typeof err === "object" &&
    err !== null &&
    "code" in err &&
    (err as { code?: string }).code === "P2002"
  );
}

export async function createCategory(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const parsed = parseForm(formData);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Erreur de validation." };
  }
  try {
    await db.productCategory.create({ data: parsed.data });
  } catch (err) {
    if (isUniqueConstraintError(err)) return { error: "Ce slug existe déjà." };
    return { error: "Une erreur est survenue." };
  }
  revalidateShop();
  redirect("/admin/categories");
}

export async function updateCategory(
  id: string,
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const parsed = parseForm(formData);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Erreur de validation." };
  }
  try {
    await db.productCategory.update({ where: { id }, data: parsed.data });
  } catch (err) {
    if (isUniqueConstraintError(err)) return { error: "Ce slug existe déjà." };
    return { error: "Une erreur est survenue." };
  }
  revalidateShop();
  redirect("/admin/categories");
}

export async function deleteCategory(id: string) {
  await db.productCategory.delete({ where: { id } });
  revalidateShop();
  revalidatePath("/admin/categories");
}
