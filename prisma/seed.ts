import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { demoCategories } from "../src/data/demo/products";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const db = new PrismaClient({ adapter });

async function main() {
  // Reset complet : le catalogue change entièrement à chaque pivot de concept boutique.
  await db.orderItem.deleteMany();
  await db.order.deleteMany();
  await db.product.deleteMany();
  await db.productCategory.deleteMany();

  const productIdByKey = new Map<string, string>();

  for (const [catIndex, category] of demoCategories.entries()) {
    const catRecord = await db.productCategory.create({
      data: { id: category.id, name: category.name, slug: category.slug, order: catIndex },
    });

    for (const [prodIndex, product] of category.products.entries()) {
      const record = await db.product.create({
        data: {
          id: product.id,
          slug: product.slug,
          name: product.name,
          description: product.description,
          price: product.price,
          compareAtPrice: product.compareAtPrice,
          material: product.material,
          images: product.images,
          sizes: product.sizes,
          outOfStockSizes: product.outOfStockSizes,
          tags: product.tags,
          stock: product.stock,
          featured: product.featured,
          categoryId: catRecord.id,
          order: prodIndex,
        },
      });
      productIdByKey.set(product.id, record.id);
    }
  }

  const demoOrders = [
    {
      id: "order-demo-1",
      customerName: "Lina Meziane",
      phone: "0555 12 34 56",
      address: "12 rue des Frères Bouadou",
      city: "Alger",
      status: "new" as const,
      note: null,
      items: [{ productId: "prod-hoodie-oversize-noir", size: "M", quantity: 1 }],
    },
    {
      id: "order-demo-2",
      customerName: "Yacine Belkacem",
      phone: "0661 22 33 44",
      address: "5 boulevard Colonel Amirouche",
      city: "Oran",
      status: "confirmed" as const,
      note: "Livrer après 18h si possible",
      items: [
        { productId: "prod-hoodie-print-montrouge", size: "L", quantity: 1 },
        { productId: "prod-hoodie-zippe-bleu", size: "M", quantity: 1 },
      ],
    },
    {
      id: "order-demo-3",
      customerName: "Amira Cherif",
      phone: "0770 45 67 89",
      address: "8 rue Larbi Ben M'hidi",
      city: "Constantine",
      status: "shipped" as const,
      note: null,
      items: [{ productId: "prod-hoodie-lapin-rose", size: "S", quantity: 1 }],
    },
  ];

  for (const order of demoOrders) {
    await db.order.create({
      data: {
        id: order.id,
        customerName: order.customerName,
        phone: order.phone,
        address: order.address,
        city: order.city,
        status: order.status,
        note: order.note,
      },
    });

    for (const line of order.items) {
      const product = await db.product.findUniqueOrThrow({
        where: { id: productIdByKey.get(line.productId) },
      });
      await db.orderItem.create({
        data: {
          orderId: order.id,
          productId: product.id,
          size: line.size,
          quantity: line.quantity,
          unitPrice: product.price,
        },
      });
    }
  }

  console.log(
    `Seed terminé : ${demoCategories.length} catégories, ${productIdByKey.size} produits, ${demoOrders.length} commandes de démo.`,
  );
}

main()
  .catch((err) => {
    console.error(err);
    process.exitCode = 1;
  })
  .finally(async () => {
    await db.$disconnect();
  });
