import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { placeOrderSchema } from "@/lib/validations";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = placeOrderSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Commande invalide." },
      { status: 400 },
    );
  }

  const { customerName, phone, address, city, note, items } = parsed.data;

  const products = await db.product.findMany({
    where: { id: { in: items.map((i) => i.productId) } },
  });

  if (products.length !== new Set(items.map((i) => i.productId)).size) {
    return NextResponse.json(
      { error: "Un ou plusieurs articles ne sont plus disponibles." },
      { status: 409 },
    );
  }

  const priceById = new Map(products.map((p) => [p.id, p.price]));

  const order = await db.order.create({
    data: {
      customerName,
      phone,
      address,
      city,
      note,
      items: {
        create: items.map((i) => ({
          productId: i.productId,
          size: i.size,
          quantity: i.quantity,
          unitPrice: priceById.get(i.productId)!,
        })),
      },
    },
  });

  return NextResponse.json({ orderId: order.id });
}
