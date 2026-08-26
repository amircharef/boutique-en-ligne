import { NextResponse } from "next/server";
import { getOrderById } from "@/lib/orders";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const order = await getOrderById(id);
  if (!order) {
    return NextResponse.json({ error: "Commande introuvable." }, { status: 404 });
  }
  return NextResponse.json({
    id: order.id,
    status: order.status,
    customerName: order.customerName,
    createdAt: order.createdAt,
    items: order.items.map((i) => ({
      name: i.product.name,
      size: i.size,
      quantity: i.quantity,
      unitPrice: i.unitPrice,
    })),
  });
}
