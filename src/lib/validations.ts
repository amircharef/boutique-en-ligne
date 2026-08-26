import { z } from "zod";

export const categoryFormSchema = z.object({
  name: z.string().min(2, "Nom trop court."),
  slug: z
    .string()
    .min(2, "Slug trop court.")
    .regex(/^[a-z0-9-]+$/, "Minuscules, chiffres et tirets uniquement."),
  order: z.coerce.number().int().optional().default(0),
});

export type CategoryFormInput = z.infer<typeof categoryFormSchema>;

export const productFormSchema = z.object({
  name: z.string().min(2, "Nom trop court."),
  slug: z
    .string()
    .min(2, "Slug trop court.")
    .regex(/^[a-z0-9-]+$/, "Minuscules, chiffres et tirets uniquement."),
  description: z.string().min(10, "Description trop courte."),
  price: z.coerce.number().int().min(0, "Prix invalide."),
  images: z
    .string()
    .transform((v) =>
      v
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean),
    ),
  sizes: z
    .string()
    .optional()
    .transform((v) =>
      v
        ? v
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean)
        : [],
    ),
  stock: z.coerce.number().int().min(0).optional().default(0),
  categoryId: z.string().min(1, "Catégorie requise."),
  featured: z.boolean().optional(),
  order: z.coerce.number().int().optional().default(0),
});

export type ProductFormInput = z.infer<typeof productFormSchema>;

export const cartItemSchema = z.object({
  productId: z.string(),
  size: z.string().optional(),
  quantity: z.number().int().min(1).max(20),
});

export const placeOrderSchema = z.object({
  customerName: z.string().min(2, "Nom trop court."),
  phone: z.string().min(6, "Numéro de téléphone invalide."),
  address: z.string().min(5, "Adresse trop courte."),
  city: z.string().min(2, "Ville requise."),
  note: z.string().max(300).optional(),
  items: z.array(cartItemSchema).min(1, "Le panier est vide."),
});

export type PlaceOrderInput = z.infer<typeof placeOrderSchema>;
