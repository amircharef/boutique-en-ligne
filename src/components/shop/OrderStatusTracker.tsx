"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, Clock, Package, Truck, XCircle } from "lucide-react";
import { formatDA, cn } from "@/lib/utils";

interface OrderData {
  id: string;
  status: string;
  customerName: string;
  items: { name: string; size: string | null; quantity: number; unitPrice: number }[];
}

const steps = [
  { key: "new", label: "Reçue", icon: Clock },
  { key: "confirmed", label: "Confirmée", icon: CheckCircle2 },
  { key: "shipped", label: "Expédiée", icon: Truck },
  { key: "delivered", label: "Livrée", icon: Package },
];

export function OrderStatusTracker({ initialOrder }: { initialOrder: OrderData }) {
  const [order, setOrder] = useState(initialOrder);

  useEffect(() => {
    if (order.status === "delivered" || order.status === "cancelled") return;
    const interval = setInterval(async () => {
      const res = await fetch(`/api/orders/${order.id}`);
      if (res.ok) setOrder(await res.json());
    }, 8000);
    return () => clearInterval(interval);
  }, [order.id, order.status]);

  const total = order.items.reduce((sum, i) => sum + i.quantity * i.unitPrice, 0);
  const currentIndex = steps.findIndex((s) => s.key === order.status);

  if (order.status === "cancelled") {
    return (
      <main className="mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center px-6 text-center">
        <XCircle size={40} className="text-status-cancelled" />
        <h1 className="font-display mt-4 text-xl">Commande annulée</h1>
        <p className="mt-2 text-sm text-muted">
          Cette commande a été annulée. Contacte-nous si besoin.
        </p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-md px-6 py-16">
      <p className="text-center font-mono text-xs text-subtle uppercase">
        Commande #{order.id.slice(-6)}
      </p>
      <h1 className="font-display mt-2 text-center text-2xl">
        Merci, {order.customerName.split(" ")[0]} !
      </h1>
      <p className="mt-1 text-center text-sm text-muted">
        {order.status === "delivered" ? "Commande livrée." : "Ta commande est en cours de traitement."}
      </p>

      <div className="mt-10 flex items-center justify-between">
        {steps.map((step, i) => {
          const Icon = step.icon;
          const active = i <= currentIndex;
          return (
            <div key={step.key} className="flex flex-1 flex-col items-center">
              <div className="flex w-full items-center">
                <div
                  className={cn(
                    "flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 transition-colors",
                    active
                      ? "border-accent bg-accent text-background"
                      : "border-border bg-surface text-subtle",
                  )}
                >
                  <Icon size={16} />
                </div>
                {i < steps.length - 1 && (
                  <div
                    className={cn(
                      "h-0.5 flex-1 transition-colors",
                      i < currentIndex ? "bg-accent" : "bg-border",
                    )}
                  />
                )}
              </div>
              <span
                className={cn(
                  "mt-2 text-center text-[11px] font-medium",
                  active ? "text-foreground" : "text-subtle",
                )}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>

      <div className="mt-10 space-y-3 rounded-2xl border border-border bg-surface p-5">
        {order.items.map((item, i) => (
          <div key={i} className="flex items-center justify-between text-sm">
            <span className="text-muted">
              {item.quantity} × {item.name}
              {item.size && ` (${item.size})`}
            </span>
            <span className="font-medium">{formatDA(item.quantity * item.unitPrice)}</span>
          </div>
        ))}
        <div className="flex items-center justify-between border-t border-border pt-3 text-sm font-semibold">
          <span>Total</span>
          <span className="font-display">{formatDA(total)}</span>
        </div>
      </div>
    </main>
  );
}
