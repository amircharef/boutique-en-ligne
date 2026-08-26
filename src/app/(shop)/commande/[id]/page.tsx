import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getOrderById } from "@/lib/orders";
import { OrderStatusTracker } from "@/components/shop/OrderStatusTracker";

export const metadata: Metadata = {
  title: "Suivi de commande",
};

export default async function OrderStatusPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const order = await getOrderById(id);
  if (!order) notFound();

  return (
    <OrderStatusTracker
      initialOrder={{
        id: order.id,
        status: order.status,
        customerName: order.customerName,
        items: order.items.map((i) => ({
          name: i.product.name,
          size: i.size,
          quantity: i.quantity,
          unitPrice: i.unitPrice,
        })),
      }}
    />
  );
}
