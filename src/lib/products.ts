import { db } from "@/lib/db";

export async function getAllCategories() {
  return db.productCategory.findMany({ orderBy: { order: "asc" } });
}

export async function getCategoryById(id: string) {
  return db.productCategory.findUnique({ where: { id } });
}

export async function getAllProducts() {
  return db.product.findMany({
    orderBy: { order: "asc" },
    include: { category: true },
  });
}

export async function getFeaturedProducts() {
  return db.product.findMany({
    where: { featured: true },
    orderBy: { order: "asc" },
    include: { category: true },
  });
}

export async function getProductBySlug(slug: string) {
  return db.product.findUnique({ where: { slug }, include: { category: true } });
}

export async function getProductById(id: string) {
  return db.product.findUnique({ where: { id } });
}

export async function getRelatedProducts(categoryId: string, excludeId: string, limit = 4) {
  return db.product.findMany({
    where: { categoryId, id: { not: excludeId } },
    orderBy: { order: "asc" },
    include: { category: true },
    take: limit,
  });
}
