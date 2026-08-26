"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/components/shop/CartContext";

export function Navbar() {
  const { itemCount } = useCart();

  return (
    <header className="sticky top-0 z-20 border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-display text-xl font-semibold tracking-tight">
          Boutique<span className="text-accent">.</span>
        </Link>

        <nav className="hidden items-center gap-8 text-sm text-muted sm:flex">
          <Link href="/boutique" className="hover:text-foreground">
            Boutique
          </Link>
          <Link href="/boutique?categorie=femme" className="hover:text-foreground">
            Femme
          </Link>
          <Link href="/boutique?categorie=homme" className="hover:text-foreground">
            Homme
          </Link>
          <Link href="/boutique?categorie=accessoires" className="hover:text-foreground">
            Accessoires
          </Link>
        </nav>

        <Link
          href="/panier"
          className="relative flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground hover:border-border-hover"
          aria-label="Panier"
        >
          <ShoppingBag size={16} />
          {itemCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 flex h-4.5 min-w-4.5 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-medium text-white">
              {itemCount}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
}
