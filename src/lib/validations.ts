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

const commaList = () =>
  z
    .string()
    .optional()
    .transform((v) =>
      v
        ? v
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean)
        : [],
    );

export const colorSchema = z.object({
  name: z.string().min(1),
  hex: z.string().min(1),
  images: z.array(z.string()).min(1),
});

export type ColorVariant = z.infer<typeof colorSchema>;

export const productFormSchema = z.object({
  name: z.string().min(2, "Nom trop court."),
  slug: z
    .string()
    .min(2, "Slug trop court.")
    .regex(/^[a-z0-9-]+$/, "Minuscules, chiffres et tirets uniquement."),
  description: z.string().min(10, "Description trop courte."),
  price: z.coerce.number().int().min(0, "Prix invalide."),
  compareAtPrice: z.coerce.number().int().min(0).optional().nullable(),
  material: z
    .string()
    .optional()
    .transform((v) => (v?.trim() ? v.trim() : undefined)),
  images: z
    .string()
    .transform((v) =>
      v
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean),
    ),
  sizes: commaList(),
  outOfStockSizes: commaList(),
  tags: commaList(),
  // Format admin : une ligne par couleur "Nom|#hex|url1,url2"
  colors: z
    .string()
    .optional()
    .transform((v): ColorVariant[] | undefined => {
      if (!v?.trim()) return undefined;
      const parsed = v
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean)
        .map((line) => {
          const [name, hex, urls] = line.split("|").map((s) => s?.trim() ?? "");
          return {
            name: name ?? "",
            hex: hex ?? "#000000",
            images: (urls ?? "")
              .split(",")
              .map((s) => s.trim())
              .filter(Boolean),
          };
        })
        .filter((c) => c.name && c.images.length > 0);
      return parsed.length > 0 ? parsed : undefined;
    }),
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
